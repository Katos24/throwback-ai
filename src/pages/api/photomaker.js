import Replicate from "replicate";

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
      version: "ddfc2b08d209f9fa8c1eca692712918bd449f695dabb4a958da31802a9570fe4",
      input: {
        input_image: `data:image/png;base64,${imageBase64}`,
        prompt,
      },
    });

    // Wait for the prediction to finish
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

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Error calling Replicate:", error);
    res.status(500).json({ error: "Failed to generate image" });
  }
}
