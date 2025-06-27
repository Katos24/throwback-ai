import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  try {
    const { imageBase64, prompt } = req.body;

    const output = await replicate.run(
      "your-username/your-premium-model:latest", // replace with your premium model
      {
        input: {
          prompt,
          image: `data:image/jpeg;base64,${imageBase64}`,
        },
      }
    );

    res.status(200).json({ imageUrl: output });
  } catch (err) {
    console.error("Premium error:", err);
    res.status(500).json({ error: err.message });
  }
}
