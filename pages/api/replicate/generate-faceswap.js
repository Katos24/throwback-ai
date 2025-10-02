// pages/api/replicate/generate-faceswap.js

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

import Replicate from "replicate";
import { createClient } from "@supabase/supabase-js";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const FACE_SWAP_COST = 50;

// Template URL mapping
const TEMPLATE_URLS = {
  'ghostface-phone': `${process.env.NEXT_PUBLIC_APP_URL || 'https://throwbackai.app'}/templates/halloween/ghostface-phone.jpg`,
  'freddy-krueger': `${process.env.NEXT_PUBLIC_APP_URL || 'https://throwbackai.app'}/templates/halloween/freddy-krueger.jpg`,
  'michael-myers': `${process.env.NEXT_PUBLIC_APP_URL || 'https://throwbackai.app'}/templates/halloween/michael-myers.jpg`,
  'pennywise': `${process.env.NEXT_PUBLIC_APP_URL || 'https://throwbackai.app'}/templates/halloween/pennywise.jpg`,
  'video-store': `${process.env.NEXT_PUBLIC_APP_URL || 'https://throwbackai.app'}/templates/halloween/video-store.jpg`,
  'the-ring': `${process.env.NEXT_PUBLIC_APP_URL || 'https://throwbackai.app'}/templates/halloween/the-ring.jpg`,
};

// Helper functions
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
    featureType = "halloween_faceswap"
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
    model_version: requestData?.model || "easel/advanced-face-swap",
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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const userAgent = req.headers['user-agent'];
  const ipAddress = getClientIP(req);
  const referrerUrl = req.headers.referer;
  const sessionId = generateSessionId();

  const { imageBase64, templateId } = req.body;
  
  if (!imageBase64) {
    return res.status(400).json({ error: "Missing imageBase64" });
  }

  if (!templateId) {
    return res.status(400).json({ error: "Missing templateId" });
  }

  // Validate template ID
  const templateUrl = TEMPLATE_URLS[templateId];
  if (!templateUrl) {
    return res.status(400).json({ error: "Invalid templateId" });
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
  
  const startTime = Date.now();
  let queueStartTime = null;
  let processingStartTime = null;

  try {
    console.log("Template URL being used:", templateUrl);
    console.log("Template ID:", templateId);
    
    const input = {
      swap_image: `data:image/png;base64,${imageBase64}`,
      target_image: templateUrl,
      hair_source: "target"
    };

    console.log("Creating face swap prediction...");
    queueStartTime = Date.now();
    
    const prediction = await replicate.predictions.create({
      model: "easel/advanced-face-swap",
      input: input
    });

    predictionId = prediction.id;
    console.log("Prediction created:", predictionId);

    const cancelTimeout = setTimeout(async () => {
      try {
        console.log(`Cancelling face swap prediction ${predictionId} due to timeout`);
        await replicate.predictions.cancel(predictionId);
      } catch (cancelError) {
        console.log("Failed to cancel prediction:", cancelError.message);
      }
    }, 120000);

    const pollForResult = async (id, maxAttempts = 60, interval = 2000) => {
      let attempts = 0;
      
      while (attempts < maxAttempts) {
        try {
          const result = await replicate.predictions.get(id);
          console.log(`Poll ${attempts + 1}: ${result.status}`);
          
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
            throw new Error(result.error || "Face swap failed");
          }
          
          if (result.status === "canceled") {
            clearTimeout(cancelTimeout);
            throw new Error("Face swap was cancelled due to timeout");
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
      
      throw new Error("Face swap timed out after 2 minutes");
    };

    const output = await pollForResult(predictionId);

    let imageUrl;
    if (typeof output === 'string') {
      imageUrl = output;
    } else if (Array.isArray(output)) {
      imageUrl = output[0];
    } else {
      imageUrl = output;
    }

    if (!imageUrl) {
      throw new Error("No image URL returned from face swap");
    }

    await spendCredits(userId, FACE_SWAP_COST);
    creditsDeducted = true;
    console.log(`✅ Successfully completed face swap and deducted ${FACE_SWAP_COST} credits`);

    const endTime = Date.now();

    await logEnhancedRequest({
      userId,
      predictionId,
      status: "succeeded",
      requestData: {
        template: templateId,
        prediction_id: predictionId,
        model: "easel/advanced-face-swap"
      },
      startTime,
      endTime,
      queueStartTime,
      processingStartTime,
      imageBase64,
      resultUrl: imageUrl,
      creditsUsed: FACE_SWAP_COST,
      userAgent,
      ipAddress,
      referrerUrl,
      sessionId,
      featureType: "halloween_faceswap"
    });

    console.log("Face swap successful:", { 
      predictionId, 
      hasUrl: !!imageUrl, 
      userId,
      templateId,
      totalTime: `${endTime - startTime}ms`
    });
    
    res.status(200).json({ imageUrl });

  } catch (error) {
    const endTime = Date.now();
    
    console.error("Error:", {
      predictionId,
      creditsDeducted,
      message: error.message,
      userId,
      templateId,
      totalTime: `${endTime - startTime}ms`
    });

    if (predictionId) {
      try {
        await replicate.predictions.cancel(predictionId);
        console.log("Cancelled prediction due to error:", predictionId);
      } catch (cancelError) {
        console.log("Failed to cancel prediction after error:", cancelError.message);
      }
    }

    if (creditsDeducted) {
      const refundSuccess = await refundCredits(userId, FACE_SWAP_COST, predictionId || "unknown_error");
      console.log(`Credit refund ${refundSuccess ? "successful" : "failed"} for user ${userId}`);
    }

    await logEnhancedRequest({
      userId,
      predictionId,
      status: "failed",
      requestData: {
        template: templateId,
        prediction_id: predictionId,
        model: "easel/advanced-face-swap"
      },
      startTime,
      endTime,
      queueStartTime,
      processingStartTime,
      imageBase64,
      creditsUsed: 0,
      errorMessage: error.message,
      userAgent,
      ipAddress,
      referrerUrl,
      sessionId,
      featureType: "halloween_faceswap"
    });

    if (error.message.includes('timed out') || error.message.includes('cancelled')) {
      const errorMessage = creditsDeducted 
        ? "Face swap timed out. Your credits have been refunded."
        : "Face swap timed out. Please try again.";
      
      return res.status(408).json({ 
        error: errorMessage,
        creditsRefunded: creditsDeducted
      });
    }

    if (error.message.includes('Insufficient credits')) {
      return res.status(402).json({ 
        error: "Insufficient credits. Please purchase more credits.",
      });
    }

    res.status(500).json({ 
      error: error.message || "Failed to generate face swap",
      creditsRefunded: creditsDeducted
    });
  }
}