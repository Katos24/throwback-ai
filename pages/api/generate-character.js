export default function handler(req, res) {
  const { input } = req.body;

  // Simple fake response (replace with OpenAI later)
  const character = {
    name: "Rad Ricky",
    archetype: "Cereal-Addicted Skater",
    outfit: "Baggy jeans, slime green windbreaker, and light-up sneakers",
    quote: "I do my best ollies after breakfast!",
    description:
      "Rad Ricky is a cartoon sidekick who rides his board through cereal rainbows and makes mixtapes in his treehouse.",
  };

  res.status(200).json({ character });
}