import Replicate from "replicate";
import { createClient } from "@supabase/supabase-js";
import { modelCosts, modelVersions } from "../../../lib/replicate/modelCosts";

export const config = {
  api: {
    bodyParser: { sizeLimit: "25mb" },
  },
};

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ---------- Helper Functions ----------
function getBase64SizeKB(base64String) {
  if (!base64String) return null;
  const sizeInBytes = (base64String.length * 3) / 4;
  return Math.round(sizeInBytes / 1024);
}

function generateSessionId() {
  return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function getClientIP(req) {
  return req.headers["x-forwarded-for"]?.split(",")[0] ||
         req.headers["x-real-ip"] ||
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

// Enhanced logging
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
    featureType = "yearbook"
  } = data;

  const totalDuration = endTime && startTime ? endTime - startTime : null;
  const queueWaitTime = processingStartTime && queueStartTime ?
    processingStartTime - queueStartTime : null;

  try {
    await supabaseAdmin.from("ai_requests").insert({
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
      file_format: "png",
      user_agent: userAgent,
      ip_address: ipAddress,
      session_id: sessionId,
      referrer_url: referrerUrl,
      feature_type: featureType,
      model_version: requestData?.model || modelVersions.defaultModel,
      cost_usd: creditsUsed * 0.01
    }, { returning: "minimal" });
  } catch (err) {
    console.error("Failed to log AI request:", err);
  }
}

// ---------- Main Handler ----------
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Metadata
  const userAgent = req.headers["user-agent"];
  const ipAddress = getClientIP(req);
  const referrerUrl = req.headers.referer;
  const sessionId = generateSessionId();

  // Extract parameters from request body
  const { 
    imageBase64, 
    prompt, 
    negativePrompt, 
    userId, 
    referenceImage,
    styleName,
    styleStrength,
    guidanceScale 
  } = req.body;

  if (!imageBase64 || !prompt) {
    return res.status(400).json({ error: "Missing image or prompt" });
  }

  const MODEL_COST = 20;
  // Keep your existing model version that supports input_image2
  const MODEL_VERSION = "467d062309da518648ba89d226490e02b8ed09b5abc15026e54e31c5a8cd0769";

  let predictionId = null;
  let creditsDeducted = false;
  const startTime = Date.now();
  let queueStartTime = null;
  let processingStartTime = null;

  try {
    // Deduct credits
    if (userId) {
      await spendCredits(userId, MODEL_COST);
      creditsDeducted = true;
      console.log(`Deducted ${MODEL_COST} credits from user ${userId}`);
    }

    // Create prediction with input_image2 support
    queueStartTime = Date.now();
    
    console.log("Reference image received:", referenceImage);
    
    // Build input data matching the successful example format
    const inputData = {
      input_image: `data:image/png;base64,${imageBase64}`,
      prompt,
      negative_prompt: negativePrompt || "nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry",
      style_name: styleName || "(No style)",
      style_strength_ratio: styleStrength || 20,
      guidance_scale: guidanceScale || 5,
      num_steps: 30,
      num_outputs: 1,
    };

    // Add reference image as input_image2 if provided
    if (referenceImage) {
      const fullReferenceUrl = referenceImage.startsWith('http') 
        ? referenceImage 
        : `https://throwbackai.app${referenceImage}`;
      
      console.log("Adding input_image2:", fullReferenceUrl);
      inputData.input_image2 = fullReferenceUrl;
    }

    console.log("Final input data:", JSON.stringify(inputData, null, 2));

    const prediction = await replicate.predictions.create({
      version: MODEL_VERSION,
      input: inputData,
    });

    predictionId = prediction.id;
    console.log("Prediction created:", predictionId);

    const cancelTimeout = setTimeout(async () => {
      try {
        await replicate.predictions.cancel(predictionId);
        console.log(`Cancelled prediction ${predictionId} due to timeout`);
      } catch (err) {
        console.log("Cancel error:", err.message);
      }
    }, 60000);

    // Poll for result
    const pollForResult = async (id, maxAttempts = 40, interval = 1500) => {
      for (let attempts = 0; attempts < maxAttempts; attempts++) {
        const result = await replicate.predictions.get(id);
        console.log(`Poll ${attempts + 1}: ${result.status}`);

        if (result.status === "processing" && !processingStartTime) {
          processingStartTime = Date.now();
        }

        if (result.status === "succeeded") {
          clearTimeout(cancelTimeout);
          console.log("Final prediction input processed:", JSON.stringify(result.input, null, 2));
          return result.output;
        }
        if (["failed", "canceled"].includes(result.status)) {
          clearTimeout(cancelTimeout);
          throw new Error(result.error || "Prediction failed or canceled");
        }
        await new Promise(r => setTimeout(r, interval));
      }
      clearTimeout(cancelTimeout);
      await replicate.predictions.cancel(id);
      throw new Error("Prediction polling timed out");
    };

    const output = await pollForResult(predictionId);
    const imageUrl = Array.isArray(output) ? output[0] : output;
    const endTime = Date.now();

    // Log the request
    await logEnhancedRequest({
      userId,
      predictionId,
      status: "succeeded",
      requestData: { 
        prompt, 
        negativePrompt, 
        referenceImage: referenceImage || null,
        styleName,
        styleStrength,
        guidanceScale,
        prediction_id: predictionId, 
        model: MODEL_VERSION 
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
      sessionId
    });

    return res.status(200).json({ imageUrl });

  } catch (error) {
    const endTime = Date.now();

    if (predictionId) {
      try { await replicate.predictions.cancel(predictionId); } catch {}
    }

    if (creditsDeducted && userId) {
      await refundCredits(userId, MODEL_COST, predictionId || "error");
    }

    // Log the error
    await logEnhancedRequest({
      userId,
      predictionId,
      status: "failed",
      requestData: { 
        prompt, 
        negativePrompt, 
        referenceImage: referenceImage || null,
        styleName,
        styleStrength,
        guidanceScale,
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
      sessionId
    });

    if (error.message.includes("timed out")) {
      return res.status(408).json({
        error: "Request timed out. Credits refunded.",
        creditsRefunded: creditsDeducted
      });
    }

    if (error.message.includes("Insufficient credits")) {
      return res.status(403).json({
        error: "Insufficient credits. Please purchase more."
      });
    }

    return res.status(500).json({
      error: error.message,
      creditsRefunded: creditsDeducted
    });
  }
}