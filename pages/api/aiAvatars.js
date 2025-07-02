import Replicate from "replicate";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb", // increase limit here
    },
  },
};

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function pollPrediction(id, maxAttempts = 60, interval = 2000) {
  let attempts = 0;
  while (attempts < maxAttempts) {
    const result = await replicate.predictions.get(id);
    if (result.status === "succeeded") return result.output;
    if (result.status === "failed") {
      console.error("Prediction failed:", result.error);
      throw new Error(result.error || "Prediction failed");
    }
    await new Promise((r) => setTimeout(r, interval));
    attempts++;
  }
  throw new Error("Prediction polling timed out");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
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

    const output = await pollPrediction(prediction.id);
    const imageUrl = Array.isArray(output) ? output[0] : output;

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Error calling easel/ai-avatars:", error);
    res.status(500).json({ error: "Failed to generate avatar" });
  }
}
