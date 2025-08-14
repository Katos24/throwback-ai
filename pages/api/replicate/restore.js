import Replicate from "replicate";
import { createClient } from "@supabase/supabase-js";
import { modelCosts, modelVersions } from "../../../lib/replicate/modelCosts"; // adjust path as needed

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
  if (!userId) return false; // Guest users don't get refunds
  
  try {
    // Add credits back
    const { error: rpcError } = await supabaseAdmin.rpc("add_credits", {
      uid: userId,
      amt: amount,
    });

    if (rpcError) {
      console.error("Failed to refund credits:", rpcError);
      return false;
    }

    // Log refund transaction
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
  console.log("REQ METHOD:", req.method, "URL:", req.url, "Headers:", req.headers);

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const authHeader = req.headers.authorization;
  let userId = null;
  let creditsDeducted = false;
  let predictionId = null;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    // Verify user token with Supabase
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    const user = data?.user;

    if (error || !user) {
      console.error("JWT verification failed:", error);
      return res.status(401).json({ error: "Invalid token" });
    }
    userId = user.id;
  }

  const { imageBase64, prompt, negativePrompt } = req.body;

  if (!imageBase64 || !prompt) {
    return res.status(400).json({ error: "Missing imageBase64 or prompt" });
  }

  try {
    const MODEL_COST = modelCosts.restoreBasic;
    const MODEL_VERSION = modelVersions.restoreBasic;

    // Check credits for logged-in user before deducting
    if (userId) {
      // Check if user has enough credits
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

      // Deduct credits
      await spendCredits(userId, MODEL_COST);
      creditsDeducted = true;
      console.log(`Deducted ${MODEL_COST} credits from user ${userId}`);
    } else {
      // Guest user: no credit deduction here
      console.log("Guest restore: skipping credit deduction");
    }

    // Create prediction
    const prediction = await replicate.predictions.create({
      version: MODEL_VERSION,
      input: {
        img: `data:image/png;base64,${imageBase64}`,
        prompt,
        ...(negativePrompt ? { negative_prompt: negativePrompt } : {}),
      },
    });

    predictionId = prediction.id;
    console.log("Prediction created:", predictionId);

    // Set up cancellation timeout (50 seconds for basic restore)
    const cancelTimeout = setTimeout(async () => {
      try {
        console.log(`Cancelling basic restore prediction ${predictionId} due to timeout`);
        await replicate.predictions.cancel(predictionId);
      } catch (cancelError) {
        console.log("Failed to cancel prediction:", cancelError.message);
      }
    }, 50000); // 50 second timeout

    // Poll for prediction result with timeout protection
    const pollForResult = async (id, maxAttempts = 35, interval = 1500) => {
      let attempts = 0;
      
      while (attempts < maxAttempts) {
        try {
          const result = await replicate.predictions.get(id);
          console.log(`Poll ${attempts + 1}: ${result.status}`);
          
          if (result.status === "succeeded") {
            clearTimeout(cancelTimeout);
            return result.output;
          }
          
          if (result.status === "failed") {
            clearTimeout(cancelTimeout);
            throw new Error(result.error || "Basic restore prediction failed");
          }
          
          if (result.status === "canceled") {
            clearTimeout(cancelTimeout);
            throw new Error("Basic restore was cancelled due to timeout");
          }
          
          await new Promise(resolve => setTimeout(resolve, interval));
          attempts++;
          
        } catch (pollError) {
          clearTimeout(cancelTimeout);
          throw pollError;
        }
      }
      
      // Polling timed out
      clearTimeout(cancelTimeout);
      
      try {
        await replicate.predictions.cancel(id);
        console.log("Cancelled prediction due to polling timeout");
      } catch (cancelError) {
        console.log("Failed to cancel after polling timeout:", cancelError.message);
      }
      
      throw new Error("Basic restore timed out after 50 seconds");
    };

    const output = await pollForResult(predictionId);
    const imageUrl = Array.isArray(output) ? output[0] : output;

    if (!imageUrl) {
      throw new Error("No image URL returned from basic restore");
    }

    // Insert AI request record only if logged in
    if (userId) {
      const { error: insertError } = await supabaseAdmin.from("ai_requests").insert({
        user_id: userId,
        request_data: {
          prompt,
          negativePrompt: negativePrompt || null,
          prediction_id: predictionId,
        },
        status: "succeeded",
        result_url: imageUrl,
        credits_used: MODEL_COST,
      }, { returning: "minimal" });

      if (insertError) {
        console.error("Supabase insert error:", insertError);
        // Don't fail the request for logging issues
      }
    }

    console.log("Basic restore successful:", { predictionId, hasUrl: !!imageUrl, userId: userId || "guest" });
    return res.status(200).json({ imageUrl });

  } catch (error) {
    console.error("Error:", {
      predictionId,
      creditsDeducted,
      userId: userId || "guest",
      message: error.message
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

    // Refund credits if they were deducted (only for logged-in users)
    if (creditsDeducted && userId) {
      const refundSuccess = await refundCredits(userId, modelCosts.restoreBasic, predictionId || "unknown_error");
      console.log(`Credit refund ${refundSuccess ? "successful" : "failed"} for user ${userId}`);
    }

    // Log failed AI request (only for logged-in users)
    if (predictionId && userId) {
      try {
        await supabaseAdmin.from("ai_requests").insert({
          user_id: userId,
          request_data: {
            prompt,
            negativePrompt: negativePrompt || null,
            prediction_id: predictionId,
          },
          status: "failed",
          error_message: error.message,
          credits_used: 0, // Credits were refunded
        }, { returning: "minimal" });
      } catch (logError) {
        console.error("Failed to log failed request:", logError);
      }
    }

    // Handle specific error types
    if (error.message.includes('timed out') || error.message.includes('cancelled')) {
      const errorMessage = userId 
        ? "Request timed out after 50 seconds. Your credits have been refunded. Please try again with a smaller image."
        : "Request timed out after 50 seconds. Please try again with a smaller image.";
      
      return res.status(408).json({ 
        error: errorMessage,
        details: "Prediction was automatically cancelled to prevent queue blocking",
        creditsRefunded: creditsDeducted && userId
      });
    }

    if (error.message.includes('Insufficient credits')) {
      return res.status(403).json({ 
        error: "Insufficient credits. Please purchase more credits to continue.",
        details: "No credits were deducted"
      });
    }

    return res.status(500).json({ 
      error: error.message || "Failed to generate image",
      details: predictionId ? `Prediction ID: ${predictionId}` : "Failed to create prediction",
      creditsRefunded: creditsDeducted && userId
    });
  }
}