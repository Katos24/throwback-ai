// components/EightiesPrompts.js - UPDATED with 3 new styles

const EIGHTIES_STYLES = [
  {
    id: 'new-wave',
    value: "1980s new wave portrait, dramatic asymmetrical haircut, bold geometric makeup, bright eyeshadow, oversized shoulder pads, stark lighting, high contrast aesthetic",
    label: "New Wave",
    description: "Dramatic asymmetrical cuts, geometric makeup, avant-garde fashion",
    emoji: "🎹"
  },
  {
    id: 'rock-metal',
    value: "1980s rock portrait, big teased hair, leather jacket, smoky eye makeup, rebellious expression, moody studio lighting, metal aesthetic",
    label: "Rock & Metal",
    description: "Big hair, leather jackets, smoky eyes, rebellious attitude",
    emoji: "🎸"
  },
  {
    id: 'pop-culture',
    value: "1980s pop culture portrait, bright neon colors, feathered hair with volume, electric blue eyeshadow, colorful windbreaker, cheerful expression, MTV generation aesthetic",
    label: "Pop Culture",
    description: "Bright colors, feathered hair, cheerful MTV generation look",
    emoji: "🎤"
  },
  {
    id: 'preppy',
    value: "1980s preppy portrait, perfectly coiffed hair, polo shirt or sweater vest, natural makeup, subtle pink tones, clean studio lighting, collegiate American aesthetic",
    label: "Preppy Style",
    description: "Conservative styling, polo shirts, collegiate American look",
    emoji: "👔"
  },
  {
    id: 'punk-rock',
    value: "1980s punk rock portrait, spiky colorful hair, heavy dark eyeliner, leather jacket with studs, defiant expression, harsh lighting, underground aesthetic",
    label: "Punk Rock",
    description: "Spiky hair, heavy eyeliner, leather with studs, defiant look",
    emoji: "🤘"
  },
  {
    id: 'corporate',
    value: "1980s corporate portrait, power suit with massive shoulder pads, structured business hair, conservative makeup, serious professional expression, Wall Street yuppie aesthetic",
    label: "Corporate",
    description: "Power suits, shoulder pads, professional business styling",
    emoji: "💼"
  },
  {
    id: 'neon-aesthetic',
    value: "1980s neon portrait, electric hot pink and cyan colors, metallic accents, bold geometric makeup, shiny iridescent clothing, dramatic neon glow, cyberpunk influence",
    label: "Neon Aesthetic",
    description: "Electric colors, metallic styling, cyberpunk influence",
    emoji: "⚡"
  },
  {
    id: 'glam-rock',
    value: "1980s glam rock portrait, theatrical glitter makeup, bold colors, dramatic androgynous hair, sequins and metallic fabrics, artistic theatrical lighting, David Bowie aesthetic",
    label: "Glam Rock",
    description: "Theatrical makeup, androgynous styling, glitter and sequins",
    emoji: "✨"
  },
  {
    id: 'synthwave',
    value: "1980s synthwave portrait, retro-futuristic styling, neon purple and cyan tones, sleek geometric haircut, dramatic backlighting, Blade Runner aesthetic",
    label: "Synthwave",
    description: "Retro-futuristic styling, neon colors, tech-inspired look",
    emoji: "🔮"
  },
  // 🆕 NEW ADDITIONS
  {
    id: 'wedding-singer',
    value: "1980s wedding singer portrait, powder blue tuxedo with ruffled shirt, feathered mullet hairstyle, oversized bow tie, holding microphone, cheesy lounge singer smile",
    label: "Wedding Singer",
    description: "Powder blue tux, mullet, ruffled shirt, lounge performer",
    emoji: "🎤"
  },
  {
    id: 'aerobics',
    value: "1980s aerobics portrait, bright neon headband, crimped voluminous hair, colorful athletic wear, leg warmers, energetic expression, fitness craze aesthetic",
    label: "Aerobics Instructor",
    description: "Headband, leg warmers, bright workout gear, fitness craze",
    emoji: "🏃"
  },
  {
    id: 'miami-vice',
    value: "1980s Miami Vice portrait, pastel suit jacket, t-shirt underneath,  rolled sleeves, styled hair with gel, cool confident expression, Florida detective aesthetic",
    label: "Miami Vice",
    description: "Pastel suits, Ray-Bans, cool detective styling",
    emoji: "🌴"
  }
];

// Enhanced prompt builder
const buildEightiesPrompt = ({
  gender,
  styleId,
  preserveFacialFeatures = true,
  intensity = 'medium'
}) => {
  const style = EIGHTIES_STYLES.find(s => s.id === styleId);
  if (!style) return null;

  let prompt = `${gender} ${style.value}`;
  
  // Wedding Singer gender-specific details
  if (styleId === 'wedding-singer') {
    if (gender === 'male') {
      prompt = `male 1980s wedding singer portrait, powder blue tuxedo with ruffled shirt, feathered mullet hairstyle, oversized bow tie, holding microphone, cheesy lounge singer smile, Adam Sandler Wedding Singer aesthetic`;
    } else if (gender === 'female') {
      prompt = `female 1980s waitress portrait, big teased permed hair, bright patterned dress, bold makeup with frosted eyeshadow, hoop earrings, fun confident smile, Holly from Wedding Singer aesthetic`;
    }
  }
  
  if (preserveFacialFeatures) {
    prompt += ", preserve exact facial features, skin tone, ethnicity, and bone structure";
  }
  
  // Add intensity modifiers
  switch (intensity) {
    case 'subtle':
      prompt += ", subtle vintage styling maintaining natural appearance";
      break;
    case 'strong':
      prompt += ", bold dramatic 1980s transformation with exaggerated period elements";
      break;
    default: // medium
      prompt += ", balanced vintage styling with authentic 1980s elements";
  }
  
  return prompt;
};

export { EIGHTIES_STYLES, buildEightiesPrompt };
export default EIGHTIES_STYLES;