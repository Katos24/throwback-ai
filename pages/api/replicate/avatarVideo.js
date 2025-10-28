// pages/api/replicate/avatarVideo.js
import { supabase } from "../../../lib/supabaseClient";
import Replicate from "replicate";
import { modelCosts } from "../../../lib/replicate/modelCosts";

export const config = {
  maxDuration: 120, // longer timeout for video generation
};

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { session, imageUrl, prompt } = req.body;
    if (!session?.user?.id) return res.status(401).json({ error: "Unauthorized" });
    if (!imageUrl) return res.status(400).json({ error: "Image required" });

    const userId = session.user.id;
    const cost = modelCosts.avatarVideo || 100;

    // Fetch and verify credits
    const { data: user, error: userError } = await supabase
      .from("profiles")
      .select("credits")
      .eq("id", userId)
      .single();
    if (userError || !user) return res.status(400).json({ error: "User not found" });
    if (user.credits < cost) return res.status(400).json({ error: "Not enough credits" });

    // Deduct credits upfront
    await supabase
      .from("profiles")
      .update({ credits: user.credits - cost })
      .eq("id", userId);

    // Generate the video using ByteDance's model
    const output = await replicate.run("bytedance/seedance-1-lite", {
      input: {
        motion_seed: 0,
        seconds: 3, // default length
        resolution: "480p",
        image_url: imageUrl,
        prompt: prompt || "AI animated avatar video"
      },
    });

    // Ensure output is valid
    if (!output || !output.video) {
      // Refund credits if no result
      await supabase
        .from("profiles")
        .update({ credits: user.credits })
        .eq("id", userId);
      return res.status(500).json({ error: "Video generation failed" });
    }

    // Log to history
    await supabase.from("activity_log").insert([
      {
        user_id: userId,
        action: "avatarVideo_generation",
        details: JSON.stringify({ imageUrl, output }),
        credits_spent: cost,
      },
    ]);

    return res.status(200).json({ success: true, videoUrl: output.video });
  } catch (err) {
    console.error("avatarVideo error:", err);
    return res.status(500).json({ error: err.message });
  }
}
