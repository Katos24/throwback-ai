// pages/api/replicate/avatarVideo.js
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
  maxDuration: 120, // longer timeout for video generation
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

// Helper to convert base64 to public URL
async function uploadBase64ToStorage(base64String, userId) {
  // Just return it - Replicate accepts data URIs for the "image" field
  console.log('✅ Using image directly');
  return base64String;
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
    imageUrl,
    resultUrl,
    creditsUsed,
    errorMessage,
    userAgent,
    ipAddress,
    referrerUrl,
    sessionId,
    featureType = "avatar_video"
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
    input_image_size_kb: null, // N/A for URL input
    input_dimensions: 'unknown',
    file_format: 'video',
    user_agent: userAgent,
    ip_address: ipAddress,
    feature_type: featureType,
    retry_count: 0,
    model_version: "bytedance/seedance-1-lite",
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
        userId: userId || 'guest'
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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Enhanced request metadata extraction
  const userAgent = req.headers['user-agent'];
  const ipAddress = getClientIP(req);
  const referrerUrl = req.headers.referer;
  const sessionId = generateSessionId();

  const { imageUrl, prompt } = req.body;
  if (!imageUrl) {
    return res.status(400).json({ error: "Missing imageUrl" });
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
    // Convert base64 to URL if needed
    console.log('Processing image URL...');
    const finalImageUrl = await uploadBase64ToStorage(imageUrl, userId);
    console.log('Final image URL:', finalImageUrl);

   const input = {
      fps: 24,
      duration: 5,
      resolution: "480p",
      aspect_ratio: "16:9",
      camera_fixed: false,
      image: finalImageUrl,  // ✅ CORRECT - it's "image" not "image_url"
      prompt: prompt || "subtle movement"
    };

    console.log("Creating avatar video prediction with input:", input);
    queueStartTime = Date.now();
    
    const prediction = await replicate.predictions.create({
      model: "bytedance/seedance-1-lite",
      input: input
    });

    predictionId = prediction.id;
    console.log("Video prediction created:", predictionId);

    // Longer timeout for video generation (2 minutes)
    const cancelTimeout = setTimeout(async () => {
      try {
        console.log(`Cancelling video prediction ${predictionId} due to timeout`);
        await replicate.predictions.cancel(predictionId);
      } catch (cancelError) {
        console.log("Failed to cancel prediction:", cancelError.message);
      }
    }, 120000); // 2 minutes

    // Enhanced polling with timing tracking
    const pollForResult = async (id, maxAttempts = 80, interval = 1500) => {
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
            throw new Error(result.error || "Video generation failed");
          }
          
          if (result.status === "canceled") {
            clearTimeout(cancelTimeout);
            throw new Error("Video generation was cancelled due to timeout");
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
      
      throw new Error("Video generation timed out after 2 minutes");
    };

    const output = await pollForResult(predictionId);

    // Handle output - expect video URL
    let videoUrl;
    
    if (typeof output === 'string') {
      videoUrl = output;
    } else if (output?.video) {
      videoUrl = output.video;
    } else if (Array.isArray(output)) {
      videoUrl = output[0];
    } else {
      console.log("Unexpected output format:", typeof output);
      videoUrl = output;
    }

    if (!videoUrl) {
      throw new Error("No video data returned from generation");
    }

    // ✅ Only deduct credits after successful generation
    await spendCredits(userId, modelCosts.avatarVideo);
    creditsDeducted = true;
    console.log(`✅ Successfully generated video and deducted ${modelCosts.avatarVideo} credits`);

    const endTime = Date.now();

    // Enhanced successful request logging
    await logEnhancedRequest({
      userId,
      predictionId,
      status: "succeeded",
      requestData: {
        prediction_id: predictionId,
        model: "bytedance/seedance-1-lite",
        image_url: finalImageUrl,
        prompt: prompt || "subtle movement"
      },
      startTime,
      endTime,
      queueStartTime,
      processingStartTime,
      imageUrl: finalImageUrl,
      resultUrl: videoUrl,
      creditsUsed: modelCosts.avatarVideo,
      userAgent,
      ipAddress,
      referrerUrl,
      sessionId,
      featureType: "avatar_video"
    });

    console.log("Avatar video generation successful:", { 
      predictionId, 
      hasUrl: !!videoUrl, 
      userId,
      totalTime: `${endTime - startTime}ms`,
      queueTime: processingStartTime ? `${processingStartTime - queueStartTime}ms` : 'unknown',
      processingTime: processingStartTime ? `${endTime - processingStartTime}ms` : 'unknown'
    });
    
    res.status(200).json({ videoUrl });

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
      const refundSuccess = await refundCredits(userId, modelCosts.avatarVideo, predictionId || "unknown_error");
      console.log(`Credit refund ${refundSuccess ? "successful" : "failed"} for user ${userId}`);
    }

    // Enhanced failed request logging
    await logEnhancedRequest({
      userId,
      predictionId,
      status: "failed",
      requestData: {
        prediction_id: predictionId,
        model: "bytedance/seedance-1-lite",
        image_url: imageUrl,
        prompt: prompt || "subtle movement"
      },
      startTime,
      endTime,
      queueStartTime,
      processingStartTime,
      imageUrl,
      creditsUsed: creditsDeducted ? 0 : 0,
      errorMessage: error.message,
      userAgent,
      ipAddress,
      referrerUrl,
      sessionId,
      featureType: "avatar_video"
    });

    // Handle specific error types
    if (error.message.includes('timed out') || error.message.includes('cancelled')) {
      const errorMessage = creditsDeducted 
        ? "Video generation timed out after 2 minutes. Your credits have been refunded. Please try again."
        : "Video generation timed out after 2 minutes. Please try again.";
      
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
      error: error.message || "Failed to generate video",
      details: predictionId ? `Prediction ID: ${predictionId}` : "Failed to create prediction",
      creditsRefunded: creditsDeducted
    });
  }
}