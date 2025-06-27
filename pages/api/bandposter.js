import Replicate from "replicate";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb", // allow larger images
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

  const { imageBase64, genre } = req.body;

  if (!imageBase64 || !genre) {
    return res.status(400).json({ error: "Missing image or genre" });
  }

  // Genre prompt map
  const genrePrompts = {
    grunge:
      "A 1990s grunge band poster with gritty textures, dark moody colors, distorted fonts, vintage concert flyer look. Place the person realistically in the poster.",
    pop:
      "A 1990s pop music concert poster with neon colors, sparkles, bold fonts, bubblegum pop style. Make the person look like the star of the show.",
    hiphop:
      "A 1990s hip-hop flyer with graffiti fonts, urban textures, boombox props, and colorful street-style layout. Make it look like a rap concert promo.",
  };

  const prompt = genrePrompts[genre.toLowerCase()];
  if (!prompt) {
    return res.status(400).json({ error: "Invalid genre selected" });
  }

  try {
    const prediction = await replicate.predictions.create({
      version: "ddfc2b08d209f9fa8c1eca692712918bd449f695dabb4a958da31802a9570fe4", // same version as your working one
      input: {
        input_image: `data:image/png;base64,${imageBase64}`,
        prompt,
      },
    });

    // Polling the result
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

    return res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Error calling Replicate (bandposter):", error);
    return res.status(500).json({ error: "Failed to generate image" });
  }
}
