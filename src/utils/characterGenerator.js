// src/utils/characterGenerator.js

export function generateCharacter(vibe) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const character = {
        name: "Rad Ricky",
        archetype: "Skater Rebel",
        outfit: "Backwards cap, torn jeans, and neon windbreaker",
        quote: "Catch ya on the flip side!",
        description: `Rad Ricky loves cereal, cartoons, and rollerblading at dawn. Born straight from a VHS tape. Your vibe: "${vibe}"`,
      };
      resolve(character);
    }, 1200); // simulates async delay
  });
}
