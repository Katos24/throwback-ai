import Replicate from "replicate";
import { createClient } from "@supabase/supabase-js";
import { modelCosts, modelVersions } from "../../../lib/replicate/modelCosts";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "25mb",
    },
  },
};

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

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
}

async function refundCredits(userId, amount, reason = "prediction_failed") {
  if (!userId) return false;
  
  try {
    // ✅ Fixed parameter order: uid first, then amt
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
    featureType = "ddcolor"
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
    model_version: requestData?.model || "piddnad/ddcolor",
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

export default async function handler(req, res) {
  console.log("REQ METHOD:", req.method, "URL:", req.url);

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // ✅ Move MODEL_COST and MODEL_VERSION to top of handler
  const MODEL_COST = modelCosts.ddcolor;
  const MODEL_VERSION = modelVersions.ddcolor;

  const userAgent = req.headers['user-agent'];
  const ipAddress = getClientIP(req);
  const referrerUrl = req.headers.referer;
  const sessionId = generateSessionId();

  const authHeader = req.headers.authorization;
  let userId = null;
  let creditsDeducted = false;
  let predictionId = null;
  
  const startTime = Date.now();
  let queueStartTime = null;
  let processingStartTime = null;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    const user = data?.user;

    if (error || !user) {
      console.error("JWT verification failed:", error);
      return res.status(401).json({ error: "Invalid token" });
    }
    userId = user.id;
  }

  const { imageBase64 } = req.body;

  if (!imageBase64) {
    return res.status(400).json({ error: "Missing imageBase64" });
  }

  try {
    // Check and deduct credits for logged-in users
    if (userId) {
      const { data: profile, error: profileError } = await supabaseAdmin
        .from("profiles")
        .select("credits_remaining")
        .eq("id", userId)
        .single();

      if (profileError) {
        console.error("Error fetching profile credits:", profileError);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (!profile || profile.credits_remaining < MODEL_COST) {
        return res.status(403).json({ error: "Insufficient credits" });
      }

      await spendCredits(userId, MODEL_COST);
      creditsDeducted = true;
      console.log(`Deducted ${MODEL_COST} credits from user ${userId}`);
    } else {
      console.log("Guest ddcolor: skipping credit deduction");
    }

    // Create prediction
queueStartTime = Date.now();
const prediction = await replicate.predictions.create({
  version: MODEL_VERSION,
  input: {
    image: `data:image/png;base64,${imageBase64}`, // ✅ Changed from input_image to image
    model_size: "large" // ✅ Optional: add model_size parameter
  },
});

    predictionId = prediction.id;
    console.log("DDColor prediction created:", predictionId);

    const cancelTimeout = setTimeout(async () => {
      try {
        console.log(`Cancelling ddcolor prediction ${predictionId} due to timeout`);
        await replicate.predictions.cancel(predictionId);
      } catch (cancelError) {
        console.log("Failed to cancel prediction:", cancelError.message);
      }
    }, 60000);

    // Poll for result
    const pollForResult = async (id, maxAttempts = 40, interval = 1500) => {
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
            throw new Error(result.error || "DDColor prediction failed");
          }
          
          if (result.status === "canceled") {
            clearTimeout(cancelTimeout);
            throw new Error("DDColor was cancelled due to timeout");
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
      
      throw new Error("DDColor timed out after 60 seconds");
    };

    const output = await pollForResult(predictionId);
    const imageUrl = Array.isArray(output) ? output[0] : output;

    if (!imageUrl) {
      throw new Error("No image URL returned from DDColor");
    }

    const endTime = Date.now();

    // Log successful request
    await logEnhancedRequest({
      userId,
      predictionId,
      status: "succeeded",
      requestData: {
        prediction_id: predictionId,
        model: MODEL_VERSION,
        model_type: "artistic"
      },
      startTime,
      endTime,
      queueStartTime,
      processingStartTime,
      imageBase64,
      resultUrl: imageUrl,
      creditsUsed: MODEL_COST,
      userAgent,
      ipAddress,
      referrerUrl,
      sessionId,
      featureType: "ddcolor"
    });

    console.log("DDColor successful:", { 
      predictionId, 
      hasUrl: !!imageUrl, 
      userId: userId || "guest",
      totalTime: `${endTime - startTime}ms`,
      queueTime: processingStartTime ? `${processingStartTime - queueStartTime}ms` : 'unknown',
      processingTime: processingStartTime ? `${endTime - processingStartTime}ms` : 'unknown'
    });
    
    return res.status(200).json({ imageUrl });

  } catch (error) {
    const endTime = Date.now();
    
    console.error("DDColor Error:", {
      predictionId,
      creditsDeducted,
      userId: userId || "guest",
      message: error.message,
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
    if (creditsDeducted && userId) {
      const refundSuccess = await refundCredits(userId, MODEL_COST, predictionId || "unknown_error");
      console.log(`Credit refund ${refundSuccess ? "successful" : "failed"} for user ${userId}`);
    }

    // Log failed request
    await logEnhancedRequest({
      userId,
      predictionId,
      status: "failed",
      requestData: {
        prediction_id: predictionId,
        model: MODEL_VERSION
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
      featureType: "ddcolor"
    });

    if (error.message.includes('timed out') || error.message.includes('cancelled')) {
      const errorMessage = userId 
        ? "Request timed out after 60 seconds. Your credits have been refunded. Please try again."
        : "Request timed out after 60 seconds. Please try again.";
      
      return res.status(408).json({ 
        error: errorMessage,
        creditsRefunded: creditsDeducted && userId
      });
    }

    if (error.message.includes('Insufficient credits')) {
      return res.status(403).json({ 
        error: "Insufficient credits. Please purchase more credits to continue.",
      });
    }

    return res.status(500).json({ 
      error: error.message || "Failed to colorize image",
      creditsRefunded: creditsDeducted && userId
    });
  }
}