// /pages/api/restore.js
import Replicate from "replicate";
import { supabaseAdmin } from "../../lib/supabaseAdmin";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { imageBase64, aligned = false } = req.body;

  if (!imageBase64) {
    return res.status(400).json({ error: "Missing imageBase64 in request body" });
  }

  try {
    // Convert base64 string to Buffer
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const imgBuffer = Buffer.from(base64Data, "base64");

    // Create a unique filename
    const filename = `restore-${Date.now()}.png`;

    // Upload to Supabase Storage
    const { data, error: uploadError } = await supabaseAdmin.storage
      .from("images")
      .upload(filename, imgBuffer, {
        contentType: "image/png",
        upsert: true,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return res.status(500).json({ error: "Failed to upload image to storage" });
    }

    // Get the public URL of the uploaded image
    const { publicURL } = supabaseAdmin.storage.from("images").getPublicUrl(filename);

    if (!publicURL) {
      return res.status(500).json({ error: "Failed to get public URL of uploaded image" });
    }

    // Call Replicate with the public URL
    const prediction = await replicate.predictions.create({
      version: "f9085ea5bf9c8f2d7e5c64564234ab41b5bcd8cd61a58b59a3dde5cbb487721a",
      input: {
        image: publicURL,
        aligned,
      },
    });

    // Poll the prediction status until done
    const poll = async (id) => {
      while (true) {
        const result = await replicate.predictions.get(id);
        if (result.status === "succeeded") return result.output;
        if (result.status === "failed") throw new Error("Prediction failed: " + (result.error || ""));
        await new Promise((r) => setTimeout(r, 1500));
      }
    };

    const output = await poll(prediction.id);

    // Output is an array of objects with 'image' property
    const restoredImageUrl = Array.isArray(output) ? output[0].image : output.image;

    res.status(200).json({ restoredImageUrl });
  } catch (error) {
    console.error("Error in /api/restore:", error);
    res.status(500).json({ error: "Failed to restore image" });
  }
}
