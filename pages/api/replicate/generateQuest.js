import Replicate from "replicate";

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
      return res.status(400).json({ error: "imageUrl is required" });
    }

    console.log("🎮 Generating quest for avatar:", imageUrl);

    // Call LLaVA to analyze the avatar and generate a quest
    const output = await replicate.run(
      "yorickvp/llava-13b:2facb4a474a0462c15041b78b1ad70952ea46b5ec6ad29583c0b29dbd4249591",
      {
        input: {
          image: imageUrl,
          prompt: `Analyze this fantasy character avatar and create a personalized RPG quest.

INSTRUCTIONS:
1. First, describe the character based on their appearance:
   - Armor/clothing style and details
   - Weapons or equipment visible
   - Overall vibe and personality they project
   - What kind of hero archetype they represent

2. Then create a 3-scene quest that matches their style:
   - Quest should fit their character type (knight, mage, rogue, etc.)
   - Each scene needs: story text (2-3 sentences) + 3 choices
   - Choices should reflect different approaches (combat, stealth, diplomacy, magic)
   - Make it exciting and immersive

FORMAT YOUR RESPONSE EXACTLY LIKE THIS:

CHARACTER DESCRIPTION:
[Detailed description of what you see in the image]

QUEST TITLE: "[Epic quest name]"

SCENE 1: [Scene title]
[2-3 sentences of story text describing the situation]

Choice A: [Action option] - [What stat/skill this uses]
Choice B: [Action option] - [What stat/skill this uses]  
Choice C: [Action option] - [What stat/skill this uses]

SCENE 2: [Scene title]
[Story continues based on a successful Scene 1]

Choice A: [Action option] - [What stat/skill this uses]
Choice B: [Action option] - [What stat/skill this uses]
Choice C: [Action option] - [What stat/skill this uses]

SCENE 3: [Final scene title]
[Climactic conclusion setup]

Choice A: [Final option leading to victory]
Choice B: [Final option leading to victory]
Choice C: [Final option leading to victory]

REWARDS: [What the player earns - credits, items, titles]

Now analyze the avatar and create the quest!`,
          max_tokens: 1000,
          temperature: 0.8,
        },
      }
    );

    // LLaVA returns an array of text chunks, join them
    const questText = Array.isArray(output) ? output.join("") : output;

    console.log("✅ Quest generated successfully");
    console.log("Quest preview:", questText.substring(0, 200) + "...");

    // Return the raw quest text
    // You can parse this into structured JSON on the frontend if needed
    return res.status(200).json({
      success: true,
      questText: questText,
      imageUrl: imageUrl,
    });

  } catch (error) {
    console.error("❌ Error generating quest:", error);
    return res.status(500).json({
      error: "Failed to generate quest",
      details: error.message,
    });
  }
}