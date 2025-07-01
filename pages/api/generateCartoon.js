import Replicate from "replicate";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // increase as needed for your image size
    },
  },
};

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { imageBase64, prompt } = req.body;

  if (!imageBase64 || !prompt) {
    return res.status(400).json({ error: "Missing image or prompt" });
  }

  try {
    const prediction = await replicate.predictions.create({
      version: "0f1178f5a27e9aa2d2d39c8a43c110f7fa7cbf64062ff04a04cd40899e546065", // flux-kontext-pro 90s cartoon model version ID
      input: {
        input_image: `data:image/png;base64,${imageBase64}`,
        prompt,
        aspect_ratio: "1:1",
        seed: 1234,
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

    const imageUrl = Array.isArray(output) ? output[0] : output;

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Error calling Replicate:", error);
    res.status(500).json({ error: "Failed to generate image" });
  }
}
