export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
};

import Replicate from "replicate";
import { createClient } from "@supabase/supabase-js";
import { modelCosts } from "../../../lib/replicate/modelCosts";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Helper functions for enhanced tracking
function getBase64SizeKB(base64String) {
  if (!base64String) return null;
  const sizeInBytes = (base64String.length * 3) / 4;
  return Math.round(sizeInBytes / 1024);
}

function generateSessionId() {
  return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function getClientIP(req) {
  return req.headers['x-forwarded-for']?.split(',')[0] || 
         req.headers['x-real-ip'] || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress ||
         (req.connection.socket ? req.connection.socket.remoteAddress : null);
}

// Enhanced logging function for ai_requests table
async function logEnhancedRequest(data) {
  const {
    userId,
    predictionId,
    status,
    requestData,
    startTime,
    endTime,
    queueStartTime,
    processingStartTime,
    imageBase64,
    resultUrl,
    creditsUsed,
    errorMessage,
    userAgent,
    ipAddress,
    referrerUrl,
    sessionId,
    featureType = "premium_restore"
  } = data;

  const totalDuration = endTime && startTime ? endTime - startTime : null;
  const queueWaitTime = processingStartTime && queueStartTime ? 
    processingStartTime - queueStartTime : null;

  const requestLog = {
    user_id: userId,
    request_data: requestData,
    status,
    result_url: resultUrl,
    credits_used: creditsUsed,
    error_message: errorMessage,
    
    // Enhanced tracking fields
    processing_duration_ms: totalDuration,
    queue_wait_time_ms: queueWaitTime,
    started_at: processingStartTime ? new Date(processingStartTime) : null,
    completed_at: endTime ? new Date(endTime) : null,
    input_image_size_kb: getBase64SizeKB(imageBase64),
    input_dimensions: 'unknown',
    file_format: 'png',
    user_agent: userAgent,
    ip_address: ipAddress,
    feature_type: featureType,
    retry_count: 0,
    model_version: requestData?.model || "flux-kontext-apps/restore-image",
    cost_usd: creditsUsed * 0.01,
    session_id: sessionId,
    referrer_url: referrerUrl
  };

  try {
    const { error } = await supabaseAdmin
      .from("ai_requests")
      .insert(requestLog, { returning: "minimal" });
    
    if (error) {
      console.error("Failed to log enhanced AI request:", error);
    } else {
      console.log(`✅ Enhanced log: ${status} ${featureType}`, {
        predictionId,
        duration: totalDuration ? `${totalDuration}ms` : 'unknown',
        userId: userId || 'guest',
        imageSize: requestLog.input_image_size_kb ? `${requestLog.input_image_size_kb}KB` : 'unknown'
      });
    }
  } catch (err) {
    console.error("Error logging enhanced AI request:", err);
  }
}

async function spendCredits(userId, amount) {
  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("credits_remaining")
    .eq("id", userId)
    .single();

  if (profileError) throw profileError;
  if (!profile || profile.credits_remaining < amount) {
    throw new Error("Insufficient credits");
  }

  const { error: rpcError } = await supabaseAdmin.rpc("deduct_credits", {
    uid: userId,
    amt: amount,
  });

  if (rpcError) throw rpcError;

  const { error: insertError } = await supabaseAdmin
    .from("credit_transactions")
    .insert({
      user_id: userId,
      amount: -amount,
      type: "spend",
    });

  if (insertError) throw insertError;
}

async function refundCredits(userId, amount, reason = "prediction_failed") {
  if (!userId) return false;
  
  try {
    const { error: rpcError } = await supabaseAdmin.rpc("add_credits", {
      uid: userId,
      amt: amount,
    });

    if (rpcError) {
      console.error("Failed to refund credits:", rpcError);
      return false;
    }

    const { error: insertError } = await supabaseAdmin
      .from("credit_transactions")
      .insert({
        user_id: userId,
        amount: amount,
        type: "refund",
        reference_id: reason,
      });

    if (insertError) {
      console.error("Failed to log refund transaction:", insertError);
    }

    console.log(`Refunded ${amount} credits to user ${userId} for ${reason}`);
    return true;
  } catch (error) {
    console.error("Error refunding credits:", error);
    return false;
  }
}

// Helper to concatenate Uint8Arrays
function concatUint8Arrays(arrays) {
  let totalLength = arrays.reduce((sum, arr) => sum + arr.length, 0);
  let result = new Uint8Array(totalLength);
  let offset = 0;
  for (let arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}

// Helper to convert Uint8Array to base64 string
function uint8ToBase64(u8Arr) {
  let binary = "";
  for (let i = 0; i < u8Arr.length; i++) {
    binary += String.fromCharCode(u8Arr[i]);
  }
  return Buffer.from(binary, "binary").toString("base64");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Enhanced request metadata extraction
  const userAgent = req.headers['user-agent'];
  const ipAddress = getClientIP(req);
  const referrerUrl = req.headers.referer;
  const sessionId = generateSessionId();

  const { imageBase64 } = req.body;
  if (!imageBase64) {
    return res.status(400).json({ error: "Missing imageBase64" });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  const user = data?.user;
  if (error || !user) {
    console.error("JWT verification failed:", error);
    return res.status(401).json({ error: "Invalid token" });
  }

  const userId = user.id;
  let predictionId = null;
  let creditsDeducted = false;
  
  // Timing tracking
  const startTime = Date.now();
  let queueStartTime = null;
  let processingStartTime = null;

  try {
    const input = {
      input_image: `data:image/png;base64,${imageBase64}`,
    };

    console.log("Creating image restoration prediction...");
    queueStartTime = Date.now();
    
    const prediction = await replicate.predictions.create({
      model: "flux-kontext-apps/restore-image",
      input: input
    });

    predictionId = prediction.id;
    console.log("Prediction created:", predictionId);

    const cancelTimeout = setTimeout(async () => {
      try {
        console.log(`Cancelling restoration prediction ${predictionId} due to timeout`);
        await replicate.predictions.cancel(predictionId);
      } catch (cancelError) {
        console.log("Failed to cancel prediction:", cancelError.message);
      }
    }, 45000);

    // Enhanced polling with timing tracking
    const pollForResult = async (id, maxAttempts = 30, interval = 1500) => {
      let attempts = 0;
      
      while (attempts < maxAttempts) {
        try {
          const result = await replicate.predictions.get(id);
          console.log(`Poll ${attempts + 1}: ${result.status}`);
          
          // Track when processing actually started
          if (result.status === 'processing' && !processingStartTime) {
            processingStartTime = Date.now();
            console.log(`Processing started after ${processingStartTime - queueStartTime}ms queue time`);
          }
          
          if (result.status === "succeeded") {
            clearTimeout(cancelTimeout);
            return result.output;
          }
          
          if (result.status === "failed") {
            clearTimeout(cancelTimeout);
            throw new Error(result.error || "Image restoration failed");
          }
          
          if (result.status === "canceled") {
            clearTimeout(cancelTimeout);
            throw new Error("Image restoration was cancelled due to timeout");
          }
          
          await new Promise(resolve => setTimeout(resolve, interval));
          attempts++;
          
        } catch (pollError) {
          clearTimeout(cancelTimeout);
          throw pollError;
        }
      }
      
      clearTimeout(cancelTimeout);
      
      try {
        await replicate.predictions.cancel(id);
        console.log("Cancelled prediction due to polling timeout");
      } catch (cancelError) {
        console.log("Failed to cancel after polling timeout:", cancelError.message);
      }
      
      throw new Error("Image restoration timed out after 45 seconds");
    };

    const output = await pollForResult(predictionId);

    // Handle output - could be URL or stream
    let imageUrl;
    
    if (typeof output === 'string') {
      imageUrl = output;
    } else if (output?.getReader) {
      console.log("Processing output stream...");
      const reader = output.getReader();
      let chunks = [];
      
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
        }
        
        const fullBytes = concatUint8Arrays(chunks);
        const base64Image = uint8ToBase64(fullBytes);
        imageUrl = `data:image/png;base64,${base64Image}`;
      } catch (streamError) {
        throw new Error(`Stream processing failed: ${streamError.message}`);
      }
    } else if (Array.isArray(output)) {
      imageUrl = output[0];
    } else {
      console.log("Unexpected output format:", typeof output);
      imageUrl = output;
    }

    if (!imageUrl) {
      throw new Error("No image data returned from restoration");
    }

    // ✅ Only deduct credits after successful restoration
    await spendCredits(userId, modelCosts.restorePremium);
    creditsDeducted = true;
    console.log(`✅ Successfully restored image and deducted ${modelCosts.restorePremium} credits`);

    const endTime = Date.now();

    // Enhanced successful request logging
    await logEnhancedRequest({
      userId,
      predictionId,
      status: "succeeded",
      requestData: {
        prediction_id: predictionId,
        model: "flux-kontext-apps/restore-image",
      },
      startTime,
      endTime,
      queueStartTime,
      processingStartTime,
      imageBase64,
      resultUrl: imageUrl,
      creditsUsed: modelCosts.restorePremium,
      userAgent,
      ipAddress,
      referrerUrl,
      sessionId,
      featureType: "premium_restore"
    });

    console.log("Premium restoration successful:", { 
      predictionId, 
      hasUrl: !!imageUrl, 
      userId,
      totalTime: `${endTime - startTime}ms`,
      queueTime: processingStartTime ? `${processingStartTime - queueStartTime}ms` : 'unknown',
      processingTime: processingStartTime ? `${endTime - processingStartTime}ms` : 'unknown'
    });
    
    res.status(200).json({ imageUrl });

  } catch (error) {
    const endTime = Date.now();
    
    console.error("Error:", {
      predictionId,
      creditsDeducted,
      message: error.message,
      userId,
      totalTime: `${endTime - startTime}ms`
    });

    // Cancel prediction if it exists
    if (predictionId) {
      try {
        await replicate.predictions.cancel(predictionId);
        console.log("Cancelled prediction due to error:", predictionId);
      } catch (cancelError) {
        console.log("Failed to cancel prediction after error:", cancelError.message);
      }
    }

    // Refund credits if they were deducted
    if (creditsDeducted) {
      const refundSuccess = await refundCredits(userId, modelCosts.restorePremium, predictionId || "unknown_error");
      console.log(`Credit refund ${refundSuccess ? "successful" : "failed"} for user ${userId}`);
    }

    // Enhanced failed request logging
    await logEnhancedRequest({
      userId,
      predictionId,
      status: "failed",
      requestData: {
        prediction_id: predictionId,
        model: "flux-kontext-apps/restore-image",
      },
      startTime,
      endTime,
      queueStartTime,
      processingStartTime,
      imageBase64,
      creditsUsed: creditsDeducted ? 0 : 0,
      errorMessage: error.message,
      userAgent,
      ipAddress,
      referrerUrl,
      sessionId,
      featureType: "premium_restore"
    });

    // Handle specific error types
    if (error.message.includes('timed out') || error.message.includes('cancelled')) {
      const errorMessage = creditsDeducted 
        ? "Image restoration timed out after 45 seconds. Your credits have been refunded. Please try again with a smaller image."
        : "Image restoration timed out after 45 seconds. Please try again with a smaller image.";
      
      return res.status(408).json({ 
        error: errorMessage,
        details: "Prediction was automatically cancelled to prevent queue blocking",
        creditsRefunded: creditsDeducted
      });
    }

    if (error.message.includes('Insufficient credits')) {
      return res.status(402).json({ 
        error: "Insufficient credits. Please purchase more credits to continue.",
        details: "No credits were deducted"
      });
    }

    res.status(500).json({ 
      error: error.message || "Failed to restore image",
      details: predictionId ? `Prediction ID: ${predictionId}` : "Failed to create prediction",
      creditsRefunded: creditsDeducted
    });
  }
}