import Replicate from "replicate";
import { createClient } from "@supabase/supabase-js";

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

const MODEL_COST = 1;

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

export default async function handler(req, res) {
  console.log("REQ METHOD:", req.method, "URL:", req.url, "Headers:", req.headers);

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  // Verify user token with Supabase
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  const user = data?.user;

  if (error || !user) {
    console.error("JWT verification failed:", error);
    return res.status(401).json({ error: "Invalid token" });
  }

  const userId = user.id;

  const { imageBase64, prompt, negativePrompt } = req.body;

  if (!imageBase64 || !prompt) {
    return res.status(400).json({ error: "Missing imageBase64 or prompt" });
  }

  try {
    // Deduct credits first
    await spendCredits(userId, MODEL_COST);

    // Create prediction with correct input key `img`
    const prediction = await replicate.predictions.create({
      version: "0fbacf7afc6c144e5be9767cff80f25aff23e52b0708f17e20f9879b2f21516c",
      input: {
        img: `data:image/png;base64,${imageBase64}`,
        prompt,
        ...(negativePrompt ? { negative_prompt: negativePrompt } : {}),
      },
    });

    // Poll prediction
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

    // Insert AI request with credits used
    const { error: insertError } = await supabaseAdmin.from("ai_requests").insert({
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

    if (insertError) {
      console.error("Supabase insert error:", insertError);
    }

    return res.status(200).json({ imageUrl });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate image or deduct credits" });
  }
}
