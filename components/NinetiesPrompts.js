// components/NinetiesPrompts.js

const NINETIES_STYLES = [
  {
    id: 'classic',
    value: "1990s yearbook photo, neat sweater vest, perfectly parted hair, polite smile, laser gradient backdrop, soft studio lighting, Olan Mills aesthetic",
    label: "Classic Yearbook",
    description: "Neat hair, sweater vest, classic laser backdrop",
  },
  {
    id: 'grunge',
    value: "1990s grunge yearbook photo, flannel shirt over band tee, messy layered hair, subtle smirk, laser gradient backdrop, Seattle alternative style",
    label: "Grunge Kid",
    description: "Flannel, messy hair, alternative Seattle vibe",
  },
  {
    id: 'hip-hop',
    value: "1990s hip-hop yearbook photo, oversized jersey, backwards cap, gold chain, baggy jeans, confident expression, East Coast urban style",
    label: "Hip-Hop",
    description: "Baggy clothes, backwards cap, gold chain, urban style",
  },
  {
    id: 'pop-star',
    value: "1990s pop yearbook photo, frosted tips or butterfly clips, shiny coordinated outfit, glossy makeup, bright smile, TRL era teen pop aesthetic",
    label: "Pop Star",
    description: "Frosted tips, shiny clothes, teen pop vibes",
  },
  {
    id: 'skater',
    value: "1990s skater yearbook photo, graphic skate brand tee, backwards snapback, chain wallet, relaxed smile, X-Games era youth culture",
    label: "Skater",
    description: "Skate brand tee, backwards cap, chain wallet",
  },
  {
    id: 'preppy',
    value: "1990s preppy yearbook photo, polo shirt or varsity jacket, perfectly styled hair, clean-cut appearance, All-American collegiate style",
    label: "Preppy Jock",
    description: "Polo shirt, varsity jacket, clean-cut All-American",
  },
  {
    id: 'goth',
    value: "1990s goth yearbook photo, black band tee, dark eyeliner, dyed hair, serious expression, Hot Topic mall goth alternative style",
    label: "Goth / Emo",
    description: "Black clothes, dark eyeliner, mall goth aesthetic",
  },
  {
    id: 'mall-rat',
    value: "1990s mall rat yearbook photo, baggy branded hoodie, frosted tips or chunky highlights, confident smile, mall culture aesthetic",
    label: "Mall Rat",
    description: "Baggy hoodie, frosted tips, mall culture vibes",
  },
  {
    id: 'raver',
    value: "1990s raver yearbook photo, neon windbreaker, bucket hat, kandi bracelets, colorful accessories, playful grin, underground rave scene aesthetic",
    label: "Raver",
    description: "Neon colors, bucket hat, kandi bracelets, rave scene",
  },
  {
    id: 'rachel-hair',
    value: "1990s Friends era yearbook photo, Rachel layered haircut, casual chic outfit, natural makeup, effortless smile, must-see TV sitcom aesthetic",
    label: "The Rachel",
    description: "Iconic Rachel haircut, Friends era, casual chic",
  }
];

// Build function for 90s prompts - matches hook calling pattern
export function buildNinetiesPrompt(gender, styleId, workflowType, styleStrength) {
  const style = NINETIES_STYLES.find(s => s.id === styleId);
  if (!style) return null;

  let prompt = `${gender} ${style.value}`;
  
  // Always preserve facial features
  prompt += ", preserve exact facial features, skin tone, ethnicity, and bone structure";
  
  // Add intensity based on styleStrength
  const intensity = styleStrength > 25 ? 'strong' : styleStrength < 15 ? 'subtle' : 'medium';
  
  switch (intensity) {
    case 'subtle':
      prompt += ", subtle vintage styling maintaining natural appearance";
      break;
    case 'strong':
      prompt += ", bold dramatic 1990s transformation with exaggerated period elements";
      break;
    default: // medium
      prompt += ", balanced vintage styling with authentic 1990s elements";
  }
  
  return prompt;
}

export { NINETIES_STYLES };
export default NINETIES_STYLES;