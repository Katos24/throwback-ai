export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // or even '25mb' if needed
    },
  },
};


import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { imageBase64, prompt, n_prompt } = req.body;

  if (!imageBase64 || !prompt) {
    return res.status(400).json({ error: "Missing image or prompt" });
  }

  try {
    const prediction = await replicate.predictions.create({
      version: "467d062309da518648ba89d226490e02b8ed09b5abc15026e54e31c5a8cd0769",
      input: {
        input_image: `data:image/png;base64,${imageBase64}`,
        prompt,
        negative_prompt: n_prompt || "",
        guidance_scale: 7.5,
        num_outputs: 1,
        num_inference_steps: 50,
      },
    });

    const poll = async (id, maxAttempts = 30, interval = 1500) => {
      let attempts = 0;
      while (attempts < maxAttempts) {
        const result = await replicate.predictions.get(id);
        if (result.status === "succeeded") return result.output;
        if (result.status === "failed") {
          console.error("Prediction failed with error:", result.error);
          throw new Error(result.error || "Prediction failed");
        }
        await new Promise((r) => setTimeout(r, interval));
        attempts++;
      }
      throw new Error("Prediction polling timed out");
    };

    const output = await poll(prediction.id);
    const imageUrl = Array.isArray(output) ? output[0] : output;

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Error calling Replicate photomaker-style:", error);
    res.status(500).json({ error: error.message || "Failed to generate image" });
  }
}
