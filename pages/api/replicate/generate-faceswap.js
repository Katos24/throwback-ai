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
const MAX_IMAGE_SIZE_MB = 10;
const REQUEST_TIMEOUT_MS = 120000; // 2 minutes
const MAX_POLL_ATTEMPTS = 60;
const POLL_INTERVAL_MS = 2000;

// Validate required environment variables
const validateEnv = () => {
  const required = [
    'REPLICATE_API_TOKEN',
    'SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error(`Missing required environment variables: ${missing.join(', ')}`);
    throw new Error('Server configuration error');
  }
};

validateEnv();

// Template URL mapping
const TEMPLATE_URLS = {
  'ghostface-phone': `${process.env.NEXT_PUBLIC_APP_URL || 'https://throwbackai.app'}/templates/halloween/ghostface-phone.jpg`,
  'freddy-krueger': `${process.env.NEXT_PUBLIC_APP_URL || 'https://throwbackai.app'}/templates/halloween/freddy-krueger.jpg`,
  'michael-myers': `${process.env.NEXT_PUBLIC_APP_URL || 'https://throwbackai.app'}/templates/halloween/michael-myers.jpg`,
  'pennywise': `${process.env.NEXT_PUBLIC_APP_URL || 'https://throwbackai.app'}/templates/halloween/pennywise.jpg`,
  'video-store': `${process.env.NEXT_PUBLIC_APP_URL || 'https://throwbackai.app'}/templates/halloween/video-store.jpg`,
  'the-ring': `${process.env.NEXT_PUBLIC_APP_URL || 'https://throwbackai.app'}/templates/halloween/the-ring.jpg`,
};

// Rate limiting cache (use Redis in production)
const rateLimitCache = new Map();

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

function getUserFriendlyError(error) {
  const errorMessage = error.message || '';
  
  // NSFW or content policy violations
  if (errorMessage.includes('NSFW') || errorMessage.includes('content policy')) {
    return "Image contains content that cannot be processed. Please use a different photo.";
  }
  
  // Face detection issues
  if (errorMessage.includes('No face detected') || errorMessage.includes('no face found')) {
    return "No face detected in your photo. Please upload a clear photo with a visible face.";
  }
  
  if (errorMessage.includes('Multiple faces') || errorMessage.includes('more than one face')) {
    return "Multiple faces detected. Please upload a photo with only one person.";
  }
  
  // Image quality issues
  if (errorMessage.includes('image quality') || errorMessage.includes('resolution')) {
    return "Image quality is too low. Please upload a higher quality photo.";
  }
  
  // Timeout errors
  if (errorMessage.includes('timed out') || errorMessage.includes('timeout')) {
    return "Processing took too long. Please try again with a different photo.";
  }
  
  // Rate limit
  if (errorMessage.includes('rate limit')) {
    return "Too many requests. Please wait a moment and try again.";
  }
  
  // Generic fallback
  return errorMessage || "Failed to generate face swap. Please try again.";
}

function checkRateLimit(identifier, maxRequests = 10, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const userRequests = rateLimitCache.get(identifier) || [];
  
  // Remove expired requests
  const validRequests = userRequests.filter(timestamp => now - timestamp < windowMs);
  
  if (validRequests.length >= maxRequests) {
    return false;
  }
  
  validRequests.push(now);
  rateLimitCache.set(identifier, validRequests);
  
  // Clean up old entries periodically
  if (rateLimitCache.size > 10000) {
    const keysToDelete = Array.from(rateLimitCache.keys()).slice(0, 1000);
    keysToDelete.forEach(key => rateLimitCache.delete(key));
  }
  
  return true;
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

async function spendCredits(userId, amount, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
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
      
      return true;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      if (error.message.includes('Insufficient credits')) throw error;
      
      console.log(`Credit deduction attempt ${i + 1} failed, retrying...`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
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

async function pollForResult(predictionId, cancelTimeout) {
  let attempts = 0;
  let processingStartTime = null;
  
  while (attempts < MAX_POLL_ATTEMPTS) {
    try {
      const result = await replicate.predictions.get(predictionId);
      console.log(`Poll ${attempts + 1}/${MAX_POLL_ATTEMPTS}: ${result.status}`);
      
      if (result.status === 'processing' && !processingStartTime) {
        processingStartTime = Date.now();
        console.log(`Processing started`);
      }
      
      if (result.status === "succeeded") {
        clearTimeout(cancelTimeout);
        return { output: result.output, processingStartTime };
      }
      
      if (result.status === "failed") {
        clearTimeout(cancelTimeout);
        throw new Error(result.error || "Face swap failed");
      }
      
      if (result.status === "canceled") {
        clearTimeout(cancelTimeout);
        throw new Error("Face swap was cancelled due to timeout");
      }
      
      await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL_MS));
      attempts++;
      
    } catch (pollError) {
      clearTimeout(cancelTimeout);
      throw pollError;
    }
  }
  
  clearTimeout(cancelTimeout);
  
  try {
    await replicate.predictions.cancel(predictionId);
    console.log("Cancelled prediction due to polling timeout");
  } catch (cancelError) {
    console.log("Failed to cancel after polling timeout:", cancelError.message);
  }
  
  throw new Error("Face swap timed out after 2 minutes");
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
  
  // Validate required fields
  if (!imageBase64) {
    return res.status(400).json({ error: "Missing image data" });
  }

  if (!templateId) {
    return res.status(400).json({ error: "Please select a Halloween scene" });
  }

  // Validate image size
  const imageSizeKB = getBase64SizeKB(imageBase64);
  if (imageSizeKB > MAX_IMAGE_SIZE_MB * 1024) {
    return res.status(400).json({ 
      error: `Image too large. Maximum size is ${MAX_IMAGE_SIZE_MB}MB`,
      currentSize: `${(imageSizeKB / 1024).toFixed(2)}MB`
    });
  }

  // Validate template ID
  const templateUrl = TEMPLATE_URLS[templateId];
  if (!templateUrl) {
    return res.status(400).json({ error: "Invalid Halloween scene selected" });
  }

  // Verify authorization
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

  // Check rate limit
  const rateLimitKey = `${userId}:${ipAddress}`;
  if (!checkRateLimit(rateLimitKey, 10, 15 * 60 * 1000)) {
    return res.status(429).json({ 
      error: "Too many requests. Please wait a few minutes and try again." 
    });
  }

  let predictionId = null;
  let creditsDeducted = false;
  
  const startTime = Date.now();
  let queueStartTime = null;
  let processingStartTime = null;

  try {
    console.log(`[${userId}] Starting face swap with template: ${templateId}`);
    console.log(`[${userId}] Image size: ${imageSizeKB}KB`);
    
    const input = {
      swap_image: `data:image/png;base64,${imageBase64}`,
      target_image: templateUrl,
      hair_source: "target"
    };

    console.log(`[${userId}] Creating face swap prediction...`);
    queueStartTime = Date.now();
    
    const prediction = await replicate.predictions.create({
      model: "easel/advanced-face-swap",
      input: input
    });

    predictionId = prediction.id;
    console.log(`[${userId}] Prediction created: ${predictionId}`);

    // Set timeout to cancel prediction if it takes too long
    const cancelTimeout = setTimeout(async () => {
      try {
        console.log(`[${userId}] Cancelling prediction ${predictionId} due to timeout`);
        await replicate.predictions.cancel(predictionId);
      } catch (cancelError) {
        console.log(`[${userId}] Failed to cancel prediction:`, cancelError.message);
      }
    }, REQUEST_TIMEOUT_MS);

    // Poll for result
    const { output, processingStartTime: procStart } = await pollForResult(predictionId, cancelTimeout);
    processingStartTime = procStart;

    // Extract image URL from output
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

    // Deduct credits after successful generation
    await spendCredits(userId, FACE_SWAP_COST);
    creditsDeducted = true;
    
    const endTime = Date.now();
    const totalTime = endTime - startTime;
    
    console.log(`[${userId}] ✅ Face swap completed successfully in ${totalTime}ms`);
    console.log(`[${userId}] Deducted ${FACE_SWAP_COST} credits`);

    // Log successful request
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
    
    res.status(200).json({ imageUrl });

  } catch (error) {
    const endTime = Date.now();
    const totalTime = endTime - startTime;
    
    console.error(`[${userId}] Error after ${totalTime}ms:`, {
      predictionId,
      creditsDeducted,
      message: error.message,
      templateId
    });

    // Cancel prediction if it exists
    if (predictionId) {
      try {
        await replicate.predictions.cancel(predictionId);
        console.log(`[${userId}] Cancelled prediction due to error: ${predictionId}`);
      } catch (cancelError) {
        console.log(`[${userId}] Failed to cancel prediction:`, cancelError.message);
      }
    }

    // Refund credits if they were deducted
    if (creditsDeducted) {
      const refundSuccess = await refundCredits(userId, FACE_SWAP_COST, predictionId || "unknown_error");
      console.log(`[${userId}] Credit refund ${refundSuccess ? "successful" : "failed"}`);
    }

    // Log failed request
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

    // Determine appropriate status code and message
    if (error.message.includes('Insufficient credits')) {
      return res.status(402).json({ 
        error: "Insufficient credits. Please purchase more credits to continue.",
      });
    }

    if (error.message.includes('timed out') || error.message.includes('cancelled')) {
      const errorMessage = creditsDeducted 
        ? "Processing took too long. Your credits have been refunded."
        : "Processing took too long. Please try again with a different photo.";
      
      return res.status(408).json({ 
        error: errorMessage,
        creditsRefunded: creditsDeducted
      });
    }

    if (error.message.includes('rate limit')) {
      return res.status(429).json({ 
        error: getUserFriendlyError(error)
      });
    }

    // Generic error response with user-friendly message
    res.status(500).json({ 
      error: getUserFriendlyError(error),
      creditsRefunded: creditsDeducted
    });
  }
}