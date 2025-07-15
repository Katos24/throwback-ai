// pages/api/replicate/webhook.js

import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const prediction = req.body;

  if (!prediction || !prediction.id) {
    return res.status(400).json({ error: "Missing prediction data" });
  }

  // Determine final status & output
  const status = prediction.status;
  const output = prediction.output;

  let resultUrl = null;
  if (status === "succeeded") {
    resultUrl = Array.isArray(output) ? output[0] : output;
  }

  const { error } = await supabaseAdmin
    .from("ai_requests")
    .update({
      status: status,
      result_url: resultUrl
    })
    .eq("prediction_id", prediction.id);

  if (error) {
    console.error("Webhook DB update error:", error);
    return res.status(500).json({ error: "Failed to update request" });
  }

  return res.status(200).json({ success: true });
}
