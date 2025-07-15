// lib/replicate/restore.js
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function restoreImage(imageBase64, version = "v1.4", scale = 2) {
  try {
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
    return output;
  } catch (error) {
    console.error("Error calling Replicate restore model:", error);
    throw error;
  }
}
