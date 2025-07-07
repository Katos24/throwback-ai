import Replicate from "replicate";
import { createClient } from "@supabase/supabase-js";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { imageBase64, version = "v1.4", scale = 2, userId } = req.body;

  if (!imageBase64) {
    return res.status(400).json({ error: "Missing imageBase64" });
  }
  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  try {
    // Step 1: Insert new ai_requests row with status 'pending'
    const { data: insertData, error: insertError } = await supabase
      .from("ai_requests")
      .insert({
        user_id: userId,
        request_data: { version, scale },
        status: "pending",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting ai_request:", insertError);
      return res.status(500).json({ error: "Failed to create AI request" });
    }

    const requestId = insertData.id;

    // Step 2: Call Replicate API
    const prediction = await replicate.predictions.create({
      version: "0fbacf7afc6c144e5be9767cff80f25aff23e52b0708f17e20f9879b2f21516c", // GFPGAN model version ID
      input: {
        img: `data:image/png;base64,${imageBase64}`,
        version,
        scale,
      },
    });

    // Poll for completion
    const poll = async (id, maxAttempts = 30, interval = 1500) => {
      let attempts = 0;
      while (attempts < maxAttempts) {
        const result = await replicate.predictions.get(id);
        if (result.status === "succeeded") return result.output;
        if (result.status === "failed") throw new Error("Prediction failed");
        await new Promise((r) => setTimeout(r, interval));
        attempts++;
      }
      throw new Error("Prediction polling timed out");
    };

    const output = await poll(prediction.id);

    // Step 3: Update ai_requests row with result_url and status 'completed'
    const { error: updateError } = await supabase
      .from("ai_requests")
      .update({
        result_url: output,
        status: "completed",
        updated_at: new Date().toISOString(),
      })
      .eq("id", requestId);

    if (updateError) {
      console.error("Error updating ai_request:", updateError);
      return res.status(500).json({ error: "Image restored but failed to update request" });
    }

    res.status(200).json({ imageUrl: output, requestId });
  } catch (error) {
    console.error("Error calling Replicate restore model:", error);

    // Optional: update ai_requests status to 'failed' if requestId exists
    if (requestId) {
      await supabase
        .from("ai_requests")
        .update({
          status: "failed",
          updated_at: new Date().toISOString(),
        })
        .eq("id", requestId);
    }

    res.status(500).json({ error: "Failed to restore image" });
  }
}
