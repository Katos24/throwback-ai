import Replicate from "replicate";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb", // Increase limit as needed
    },
  },
};

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Improved polling with file availability check
async function pollPrediction(predictionId, maxAttempts = 60, interval = 2000) {
  let attempts = 0;

  while (attempts < maxAttempts) {
    const result = await replicate.predictions.get(predictionId);

    if (result.status === "succeeded") {
      const outputUrl = Array.isArray(result.output) ? result.output[0] : result.output;

      // HEAD request to confirm file is ready
      try {
        const headRes = await fetch(outputUrl, { method: "HEAD" });
        if (headRes.status === 200) {
          return outputUrl;
        } else if (headRes.status === 403) {
          console.log(`File not ready yet (403). Attempt ${attempts + 1}/${maxAttempts}`);
        } else {
          throw new Error(`Unexpected HEAD status: ${headRes.status}`);
        }
      } catch (err) {
        console.error("Error checking file status:", err);
      }
    }

    if (result.status === "failed") {
      console.error("Prediction failed:", result.error);
      throw new Error(result.error || "Prediction failed");
    }

    await new Promise((r) => setTimeout(r, interval));
    attempts++;
  }

  throw new Error("Prediction polling timed out. File may still be processing.");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { imageBase64, prompt } = req.body;

  if (!imageBase64 || !prompt) {
    return res.status(400).json({ error: "Missing imageBase64 or prompt" });
  }

  try {
    const prediction = await replicate.predictions.create({
      model: "easel/ai-avatars",
      input: {
        face_image: `data:image/png;base64,${imageBase64}`,
        prompt,
      },
    });

    const finalUrl = await pollPrediction(prediction.id);
    res.status(200).json({ imageUrl: finalUrl });
  } catch (error) {
    console.error("Error calling easel/ai-avatars:", error);
    res.status(500).json({
      error:
        error.message || "Failed to generate avatar. Please try again shortly.",
    });
  }
}
