import Replicate from "replicate";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // increase from default 1MB to handle base64 image data
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

  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Image URL is required" });
    }

    console.log("🎮 Generating quest for avatar:", imageUrl);

    // Call LLaVA to analyze avatar and generate quest
    const output = await replicate.run(
      "yorickvp/llava-13b:2facb4a474a0462c15041b78b1ad70952ea46b5ec6ad29583c0b29dbd4249591",
      {
        input: {
          image: imageUrl,
          prompt: `Analyze this character avatar and create a short RPG quest.

Describe their appearance briefly, then create a 3-scene adventure:

CHARACTER: [Brief description]
QUEST: "[Title]"

SCENE 1: [Story text]
Choice A: [option]
Choice B: [option]
Choice C: [option]

SCENE 2: [Story continues]
Choice A: [option]
Choice B: [option]
Choice C: [option]

SCENE 3: [Final scene]
Choice A: [option]
Choice B: [option]
Choice C: [option]

REWARD: [Credits/items earned]`,
          max_tokens: 800,
          temperature: 0.8,
        },
      }
    );

    const questText = Array.isArray(output) ? output.join("") : output;

    console.log("✅ Quest generated");

    return res.status(200).json({
      success: true,
      questText: questText,
    });

  } catch (error) {
    console.error("❌ Quest generation error:", error);
    return res.status(500).json({
      error: "Failed to generate quest",
      details: error.message,
    });
  }
}
