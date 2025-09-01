export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
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
    featureType = "avatar_generation"
  } = data;

  const totalDuration = endTime && startTime ? endTime - startTime : null;
  const queueWaitTime = processingStartTime && queueStartTime ? 
    processingStartTime - queueStartTime : null;

  const requestLog = {
    user_id: userId,
    is_guest: !userId,
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
    file_format: 'png', // Avatar generation typically uses PNG
    user_agent: userAgent,
    ip_address: ipAddress,
    feature_type: featureType,
    retry_count: 0,
    model_version: requestData?.model || "easel/ai-avatars",
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

// Enhanced polling with timing and file verification
async function pollPrediction(predictionId, maxAttempts = 60, interval = 2000, processingStartTimeRef) {
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    try {
      const result = await replicate.predictions.get(predictionId);
      console.log(`Poll ${attempts + 1}: ${result.status}`);
      
      // Track when processing actually started
      if (result.status === 'processing' && !processingStartTimeRef.current) {
        processingStartTimeRef.current = Date.now();
        console.log(`Avatar processing started after queue time`);
      }
      
      if (result.status === "succeeded") {
        const outputUrl = Array.isArray(result.output) ? result.output[0] : result.output;
        
        // HEAD request to confirm file is ready
        try {
          const headRes = await fetch(outputUrl, { method: "HEAD" });
          if (headRes.status === 200) {
            return outputUrl;
          } else if (headRes.status === 403) {
            console.log(`File not ready yet (403). Attempt ${attempts + 1}/${maxAttempts}`);
          } else {
            console.log(`Unexpected HEAD status: ${headRes.status}, continuing...`);
            return outputUrl; // Return anyway, might still work
          }
        } catch (err) {
          console.error("Error checking file status:", err);
          return outputUrl; // Return anyway, might still work
        }
      }
      
      if (result.status === "failed") {
        throw new Error(result.error || "Avatar generation failed");
      }
      
      if (result.status === "canceled") {
        throw new Error("Avatar generation was cancelled due to timeout");
      }
      
      await new Promise(resolve => setTimeout(resolve, interval));
      attempts++;
      
    } catch (pollError) {
      throw pollError;
    }
  }
  
  throw new Error("Avatar generation timed out after 2 minutes");
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

  const { imageBase64, prompt, user_gender, styleStrength, workflow_type } = req.body;
  
  if (!imageBase64 || !prompt) {
    return res.status(400).json({ error: "Missing imageBase64 or prompt" });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  // Verify JWT token to get user
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
  const processingStartTimeRef = { current: null };

  try {
    console.log("Creating avatar generation for user:", userId);

    // Build the final input for easel/ai-avatars
    const input = {
      face_image: `data:image/png;base64,${imageBase64}`,
      prompt: prompt,
      workflow_type: workflow_type || "HyperRealistic-likeness",
    };

    if (user_gender) input.user_gender = user_gender;
    if (styleStrength) input.style_strength = styleStrength;

    // Create prediction to get ID for cancellation control
    console.log("Creating AI Avatar prediction...");
    queueStartTime = Date.now();
    
    const prediction = await replicate.predictions.create({
      model: "easel/ai-avatars",
      input,
    });

    predictionId = prediction.id;
    console.log("Prediction created:", predictionId);

    // Set up cancellation timeout (2 minutes for avatar generation)
    const cancelTimeout = setTimeout(async () => {
      try {
        console.log(`Cancelling avatar prediction ${predictionId} due to timeout`);
        await replicate.predictions.cancel(predictionId);
      } catch (cancelError) {
        console.log("Failed to cancel prediction:", cancelError.message);
      }
    }, 120000); // 2 minute timeout for avatar generation

    // Enhanced polling with timing tracking
    const finalUrl = await pollPrediction(predictionId, 60, 2000, processingStartTimeRef);
    clearTimeout(cancelTimeout);

    if (!finalUrl) {
      throw new Error("No image URL returned from avatar generation");
    }

    // ✅ Only deduct credits after successful generation
    const AVATAR_COST = modelCosts.avatar ||50;
    await spendCredits(userId, AVATAR_COST);
    creditsDeducted = true;
    console.log(`✅ Successfully generated avatar and deducted ${AVATAR_COST} credits`);

    const endTime = Date.now();

    // Enhanced successful request logging
    await logEnhancedRequest({
      userId,
      predictionId,
      status: "succeeded",
      requestData: {
        prompt: prompt,
        user_gender: user_gender,
        style_strength: styleStrength,
        workflow_type: workflow_type,
        prediction_id: predictionId,
        model: "easel/ai-avatars"
      },
      startTime,
      endTime,
      queueStartTime,
      processingStartTime: processingStartTimeRef.current,
      imageBase64,
      resultUrl: finalUrl,
      creditsUsed: AVATAR_COST,
      userAgent,
      ipAddress,
      referrerUrl,
      sessionId,
      featureType: "avatar_generation"
    });

    console.log("Avatar generation successful:", { 
      predictionId, 
      hasUrl: !!finalUrl, 
      userId,
      totalTime: `${endTime - startTime}ms`,
      queueTime: processingStartTimeRef.current ? `${processingStartTimeRef.current - queueStartTime}ms` : 'unknown',
      processingTime: processingStartTimeRef.current ? `${endTime - processingStartTimeRef.current}ms` : 'unknown'
    });
    
    res.status(200).json({ imageUrl: finalUrl });

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
      const refundSuccess = await refundCredits(userId, modelCosts.avatar || 50, predictionId || "unknown_error");
      console.log(`Credit refund ${refundSuccess ? "successful" : "failed"} for user ${userId}`);
    }

    // Enhanced failed request logging
    await logEnhancedRequest({
      userId,
      predictionId,
      status: "failed",
      requestData: {
        prompt: prompt,
        user_gender: user_gender,
        style_strength: styleStrength,
        workflow_type: workflow_type,
        prediction_id: predictionId,
        model: "easel/ai-avatars"
      },
      startTime,
      endTime,
      queueStartTime,
      processingStartTime: processingStartTimeRef.current,
      imageBase64,
      creditsUsed: 0, // Credits were refunded
      errorMessage: error.message,
      userAgent,
      ipAddress,
      referrerUrl,
      sessionId,
      featureType: "avatar_generation"
    });

    // Handle specific error types
    if (error.message.includes('timed out') || error.message.includes('cancelled')) {
      const errorMessage = creditsDeducted 
        ? "Avatar generation timed out after 2 minutes. Your credits have been refunded. Please try again with a smaller image."
        : "Avatar generation timed out after 2 minutes. Please try again with a smaller image.";
      
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
      error: error.message || "Failed to generate avatar",
      details: predictionId ? `Prediction ID: ${predictionId}` : "Failed to create prediction",
      creditsRefunded: creditsDeducted
    });
  }
}