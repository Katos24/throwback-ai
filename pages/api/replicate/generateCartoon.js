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

// Deduct credits from user; throws if insufficient
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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { imageBase64, prompt } = req.body;
  if (!imageBase64 || !prompt) {
    return res.status(400).json({ error: "Missing image or prompt" });
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

  try {
    // Simplify prompt to avoid safety issues
    const simplifiedPrompt = prompt.length > 100 ? 
      `Convert this to 90s cartoon style while preserving the person's appearance` : 
      prompt;

    console.log("Creating cartoon generation for user:", userId);

    // Format image properly
    let inputImage;
    if (imageBase64.startsWith("data:")) {
      inputImage = imageBase64;
    } else {
      inputImage = `data:image/jpeg;base64,${imageBase64}`;
    }

    // Create prediction to get ID for cancellation control
    console.log("Creating FLUX Kontext prediction...");
    const prediction = await replicate.predictions.create({
      model: "black-forest-labs/flux-kontext-pro",
      input: {
        prompt: simplifiedPrompt,
        input_image: inputImage,
      }
    });

    predictionId = prediction.id;
    console.log("Prediction created:", predictionId);

    // Set up cancellation timeout (60 seconds for cartoon generation)
    const cancelTimeout = setTimeout(async () => {
      try {
        console.log(`Cancelling cartoon prediction ${predictionId} due to timeout`);
        await replicate.predictions.cancel(predictionId);
      } catch (cancelError) {
        console.log("Failed to cancel prediction:", cancelError.message);
      }
    }, 60000); // 60 second timeout for cartoon generation

    // Poll for result and handle streaming output
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
            throw new Error(result.error || "Cartoon generation failed");
          }
          
          if (result.status === "canceled") {
            clearTimeout(cancelTimeout);
            throw new Error("Cartoon generation was cancelled due to timeout");
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
      
      throw new Error("Cartoon generation timed out after 60 seconds");
    };

    const output = await pollForResult(predictionId);

    // Handle the output
    let imageUrl;
    if (output && typeof output.url === 'function') {
      imageUrl = output.url();
    } else if (typeof output === 'string') {
      imageUrl = output;
    } else if (Array.isArray(output)) {
      imageUrl = output[0];
    } else {
      console.log("Raw output:", output);
      imageUrl = output;
    }

    if (!imageUrl) {
      throw new Error("No image URL returned from cartoon generation");
    }

    // ✅ Only deduct credits after successful generation
    await spendCredits(userId, modelCosts.cartoon || 40);
    console.log(`✅ Successfully generated cartoon and deducted ${modelCosts.cartoon || 40} credits`);

    console.log("✅ Cartoon generation successful:", { predictionId, hasUrl: !!imageUrl });
    res.status(200).json({ imageUrl });

  } catch (error) {
    console.error("Error:", {
      predictionId,
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

    // Handle specific error types
    if (error.message.includes('timed out') || error.message.includes('cancelled')) {
      return res.status(408).json({ 
        error: "Cartoon generation timed out after 60 seconds. Please try again with a smaller image.",
        details: "Prediction was automatically cancelled to prevent queue blocking"
      });
    }

    if (error.message.includes('Insufficient credits')) {
      return res.status(402).json({ 
        error: "Insufficient credits. Please purchase more credits to continue.",
        details: "No credits were deducted"
      });
    }

    res.status(500).json({ 
      error: error.message || "Failed to generate cartoon",
      details: predictionId ? `Prediction ID: ${predictionId}` : "Failed to create prediction"
    });
  }
}