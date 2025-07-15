import Replicate from "replicate";
import { createClient } from "@supabase/supabase-js";
import { modelCosts, modelVersions } from "../../lib/modelCosts";

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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { imageBase64, prompt, negativePrompt, userId } = req.body;

  if (!imageBase64 || !prompt || !userId) {
    return res.status(400).json({ error: "Missing image, prompt, or userId" });
  }

  try {
    // Deduct credits first
    await spendCredits(userId, MODEL_COST);

    // Create prediction as usual
    const prediction = await replicate.predictions.create({
      version: "ddfc2b08d209f9fa8c1eca692712918bd449f695dabb4a958da31802a9570fe4",
      input: {
        input_image: `data:image/png;base64,${imageBase64}`,
        prompt,
        ...(negativePrompt ? { negative_prompt: negativePrompt } : {}),
      },
    });

    // Poll for prediction result
    const poll = async (id) => {
      while (true) {
        const result = await replicate.predictions.get(id);
        if (result.status === "succeeded") return result.output;
        if (result.status === "failed") throw new Error("Prediction failed");
        await new Promise((r) => setTimeout(r, 1500));
      }
    };

    const output = await poll(prediction.id);
    const imageUrl = Array.isArray(output) ? output[0] : output;

    // Insert AI request with credits_used
    const { error } = await supabaseAdmin.from("ai_requests").insert({
      user_id: userId,
      request_data: {
        prompt,
        negativePrompt: negativePrompt || null,
        prediction_id: prediction.id,
      },
      status: "succeeded",
      result_url: imageUrl,
      credits_used: MODEL_COST,
    }, { returning: "minimal" });

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ error: "Failed to save AI request" });
    }

    res.status(200).json({ imageUrl });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate image or deduct credits" });
  }
}
