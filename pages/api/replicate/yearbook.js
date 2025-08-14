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

const MODEL_COST = 1; // cost in credits for this model

async function spendCredits(userId, amount, referenceId = null) {
  // 1. Check user's current credits
  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("credits_remaining")
    .eq("id", userId)
    .single();

  if (profileError) throw profileError;
  if (!profile || profile.credits_remaining < amount) {
    throw new Error("Insufficient credits");
  }

  // 2. Deduct credits atomically with your RPC function
  const { error: rpcError } = await supabaseAdmin.rpc("deduct_credits", {
    uid: userId,
    amt: amount,
  });

  if (rpcError) throw rpcError;

  // 3. Log credit spend transaction
  const { error: insertError } = await supabaseAdmin
    .from("credit_transactions")
    .insert({
      user_id: userId,
      amount: -amount,
      type: "spend",
      reference_id: referenceId,
    });

  if (insertError) throw insertError;
}

async function refundCredits(userId, amount, reason = "prediction_failed") {
  try {
    // 1. Add credits back
    const { error: rpcError } = await supabaseAdmin.rpc("add_credits", {
      uid: userId,
      amt: amount,
    });

    if (rpcError) {
      console.error("Failed to refund credits:", rpcError);
      return false;
    }

    // 2. Log refund transaction
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
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { imageBase64, prompt, negativePrompt, userId } = req.body;

  if (!imageBase64 || !prompt || !userId) {
    return res.status(400).json({ error: "Missing image, prompt, or userId" });
  }

  let predictionId = null;
  let creditsDeducted = false;

  try {
    // Deduct credits first
    await spendCredits(userId, MODEL_COST);
    creditsDeducted = true;
    console.log(`Deducted ${MODEL_COST} credits from user ${userId}`);

    // Create prediction
    const prediction = await replicate.predictions.create({
      version: "ddfc2b08d209f9fa8c1eca692712918bd449f695dabb4a958da31802a9570fe4",
      input: {
        input_image: `data:image/png;base64,${imageBase64}`,
        prompt,
        ...(negativePrompt ? { negative_prompt: negativePrompt } : {}),
      },
    });

    predictionId = prediction.id;
    console.log("Prediction created:", predictionId);

    // Set up cancellation timeout (60 seconds)
    const cancelTimeout = setTimeout(async () => {
      try {
        console.log(`Cancelling prediction ${predictionId} due to timeout`);
        await replicate.predictions.cancel(predictionId);
      } catch (cancelError) {
        console.log("Failed to cancel prediction:", cancelError.message);
      }
    }, 60000);

    // Poll for prediction result with timeout protection
    const pollForResult = async (id, maxAttempts = 40, interval = 1500) => {
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
            throw new Error(result.error || "Prediction failed");
          }
          
          if (result.status === "canceled") {
            clearTimeout(cancelTimeout);
            throw new Error("Prediction was cancelled due to timeout");
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
      
      throw new Error("Prediction polling timed out after 60 seconds");
    };

    const output = await pollForResult(predictionId);
    const imageUrl = Array.isArray(output) ? output[0] : output;

    if (!imageUrl) {
      throw new Error("No image URL returned from prediction");
    }

    // Insert successful AI request
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
      // Don't fail the request for logging issues, user already got their image
    }

    console.log("Generation successful:", { predictionId, hasUrl: !!imageUrl });
    return res.status(200).json({ imageUrl });

  } catch (error) {
    console.error("Error:", {
      predictionId,
      creditsDeducted,
      message: error.message,
      userId
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
      const refundSuccess = await refundCredits(userId, MODEL_COST, predictionId || "unknown_error");
      console.log(`Credit refund ${refundSuccess ? "successful" : "failed"} for user ${userId}`);
    }

    // Log failed AI request
    if (predictionId) {
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
      return res.status(408).json({ 
        error: "Request timed out after 60 seconds. Your credits have been refunded. Please try again with a smaller image.",
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

    return res.status(500).json({ 
      error: error.message || "Failed to generate image",
      details: predictionId ? `Prediction ID: ${predictionId}` : "Failed to create prediction",
      creditsRefunded: creditsDeducted
    });
  }
}