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
const REQUEST_TIMEOUT_MS = 120000;

// Template URL mapping
const TEMPLATE_URLS = {
  'ghostface-phone': `${process.env.NEXT_PUBLIC_APP_URL || 'https://throwbackai.app'}/templates/halloween/ghostface-phone.jpg`,
  'freddy-krueger': `${process.env.NEXT_PUBLIC_APP_URL || 'https://throwbackai.app'}/templates/halloween/freddy-krueger.jpg`,
  'michael-myers': `${process.env.NEXT_PUBLIC_APP_URL || 'https://throwbackai.app'}/templates/halloween/michael-myers.jpg`,
  'pennywise': `${process.env.NEXT_PUBLIC_APP_URL || 'https://throwbackai.app'}/templates/halloween/pennywise.jpg`,
  'video-store': `${process.env.NEXT_PUBLIC_APP_URL || 'https://throwbackai.app'}/templates/halloween/video-store.jpg`,
  'the-ring': `${process.env.NEXT_PUBLIC_APP_URL || 'https://throwbackai.app'}/templates/halloween/the-ring.jpg`,
};

// Rate limiting cache
const rateLimitCache = new Map();

// Helpers
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
  
  if (errorMessage.includes('NSFW') || errorMessage.includes('content policy')) {
    return "Image contains content that cannot be processed. Please use a different photo.";
  }
  
  if (errorMessage.includes('No face detected') || errorMessage.includes('no face found')) {
    return "No face detected in your photo. Please upload a clear photo with a visible face.";
  }
  
  if (errorMessage.includes('Multiple faces') || errorMessage.includes('more than one face')) {
    return "Multiple faces detected. Please upload a photo with only one person.";
  }
  
  if (errorMessage.includes('image quality') || errorMessage.includes('resolution')) {
    return "Image quality is too low. Please upload a higher quality photo.";
  }
  
  if (errorMessage.includes('timed out') || errorMessage.includes('timeout')) {
    return "Processing took too long. Please try again with a different photo.";
  }
  
  if (errorMessage.includes('rate limit')) {
    return "Too many requests. Please wait a moment and try again.";
  }
  
  return errorMessage || "Failed to generate face swap. Please try again.";
}

function checkRateLimit(identifier, maxRequests = 10, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const userRequests = rateLimitCache.get(identifier) || [];
  const validRequests = userRequests.filter(timestamp => now - timestamp < windowMs);

  if (validRequests.length >= maxRequests) return false;

  validRequests.push(now);
  rateLimitCache.set(identifier, validRequests);

  if (rateLimitCache.size > 10000) {
    const keysToDelete = Array.from(rateLimitCache.keys()).slice(0, 1000);
    keysToDelete.forEach(key => rateLimitCache.delete(key));
  }

  return true;
}

// Spend/refund credits and logging (same as your current logic)
async function spendCredits(userId, amount, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const { data: profile, error: profileError } = await supabaseAdmin
        .from("profiles")
        .select("credits_remaining")
        .eq("id", userId)
        .single();

      if (profileError) throw profileError;
      if (!profile || profile.credits_remaining < amount) throw new Error("Insufficient credits");

      const { error: rpcError } = await supabaseAdmin.rpc("deduct_credits", { uid: userId, amt: amount });
      if (rpcError) throw rpcError;

      await supabaseAdmin.from("credit_transactions").insert({ user_id: userId, amount: -amount, type: "spend" });
      return true;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      if (error.message.includes('Insufficient credits')) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

async function refundCredits(userId, amount, reason = "prediction_failed") {
  if (!userId) return false;
  try {
    await supabaseAdmin.rpc("add_credits", { uid: userId, amt: amount });
    await supabaseAdmin.from("credit_transactions").insert({ user_id: userId, amount, type: "refund", reference_id: reason });
    return true;
  } catch (error) {
    console.error("Error refunding credits:", error);
    return false;
  }
}

async function logEnhancedRequest(data) {
  const { userId, predictionId, status, requestData, startTime, endTime, queueStartTime, processingStartTime, imageBase64, resultUrl, creditsUsed, errorMessage, userAgent, ipAddress, referrerUrl, sessionId, featureType = "halloween_faceswap" } = data;
  const totalDuration = endTime && startTime ? endTime - startTime : null;
  const queueWaitTime = processingStartTime && queueStartTime ? processingStartTime - queueStartTime : null;

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
    model_version: requestData?.model || "cdingram/face-swap",
    cost_usd: creditsUsed * 0.01,
    session_id: sessionId,
    referrer_url: referrerUrl
  };

  try {
    await supabaseAdmin.from("ai_requests").insert(requestLog, { returning: "minimal" });
  } catch (err) {
    console.error("Error logging enhanced AI request:", err);
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const userAgent = req.headers['user-agent'];
  const ipAddress = getClientIP(req);
  const referrerUrl = req.headers.referer;
  const sessionId = generateSessionId();
  const startTime = Date.now();
  let queueStartTime = null;

  const { imageBase64, templateId } = req.body;
  if (!imageBase64) return res.status(400).json({ error: "Missing image data" });
  if (!templateId) return res.status(400).json({ error: "Please select a Halloween scene" });

  const imageSizeKB = getBase64SizeKB(imageBase64);
  if (imageSizeKB > MAX_IMAGE_SIZE_MB * 1024) {
    return res.status(400).json({ error: `Image too large. Maximum size ${MAX_IMAGE_SIZE_MB}MB`, currentSize: `${(imageSizeKB / 1024).toFixed(2)}MB` });
  }

  const templateUrl = TEMPLATE_URLS[templateId];
  if (!templateUrl) return res.status(400).json({ error: "Invalid Halloween scene selected" });

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Missing Authorization header" });
  const token = authHeader.split(" ")[1];

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  const user = data?.user;
  if (error || !user) return res.status(401).json({ error: "Invalid token" });

  const userId = user.id;
  const rateLimitKey = `${userId}:${ipAddress}`;
  if (!checkRateLimit(rateLimitKey)) return res.status(429).json({ error: "Too many requests. Please wait a few minutes and try again." });

  let creditsDeducted = false;
  let predictionId = null;

  try {
  queueStartTime = Date.now();
  const input = {
    input_image: templateUrl, // Keep this as is!
    swap_image: `data:image/png;base64,${imageBase64}` // Keep this as is!
  };
  
  console.log(`[${userId}] Creating face swap prediction...`);
  const result = await replicate.run(
    "cdingram/face-swap:d1d6ea8c8be89d664a07a457526f7128109dee7030fdac424788d762c71ed111", 
    { input }
  );
  
  console.log(`[${userId}] Replicate result type:`, typeof result);
  console.log(`[${userId}] Replicate result:`, result);
  
  // Handle different output formats
  let imageUrl;
  if (typeof result === 'string') {
    imageUrl = result;
  } else if (result && result.output) {
    // If wrapped in an object with output property
    imageUrl = typeof result.output === 'string' ? result.output : result.output[0];
  } else if (Array.isArray(result)) {
    imageUrl = result[0];
  } else {
    console.error(`[${userId}] Unexpected result format:`, result);
    throw new Error("Unexpected output format from face swap");
  }
  
  if (!imageUrl || !imageUrl.startsWith('http')) {
    throw new Error("No valid output image URL generated");
  }
  
  console.log(`[${userId}] Final image URL:`, imageUrl);
  
  await spendCredits(userId, FACE_SWAP_COST);
  creditsDeducted = true;

    const endTime = Date.now();
    await logEnhancedRequest({
      userId,
      predictionId,
      status: "succeeded",
      requestData: { template: templateId, model: "cdingram/face-swap" },
      startTime,
      endTime,
      queueStartTime,
      processingStartTime: startTime,
      imageBase64,
      resultUrl: output,
      creditsUsed: FACE_SWAP_COST,
      userAgent,
      ipAddress,
      referrerUrl,
      sessionId
    });

    res.status(200).json({ imageUrl: output });

  } catch (error) {
    const endTime = Date.now();
    if (creditsDeducted) await refundCredits(userId, FACE_SWAP_COST, "prediction_failed");
    await logEnhancedRequest({
      userId,
      predictionId,
      status: "failed",
      requestData: { template: templateId, model: "cdingram/face-swap" },
      startTime,
      endTime,
      queueStartTime,
      processingStartTime: startTime,
      imageBase64,
      creditsUsed: 0,
      errorMessage: error.message,
      userAgent,
      ipAddress,
      referrerUrl,
      sessionId
    });

    if (error.message.includes('Insufficient credits')) return res.status(402).json({ error: "Insufficient credits. Please purchase more." });
    if (error.message.includes('rate limit')) return res.status(429).json({ error: getUserFriendlyError(error) });

    res.status(500).json({ error: getUserFriendlyError(error), creditsRefunded: creditsDeducted });
  }
}
