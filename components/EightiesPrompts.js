// components/EightiesPrompts.js

const EIGHTIES_STYLES = [
  {
    id: 'new-wave',
    value: "1980s new wave yearbook photo with dramatic asymmetrical haircut, bold geometric makeup with bright eyeshadow, wearing oversized shoulder pads blazer or avant-garde fashion, stark lighting with deep shadows, high contrast black and white or neon color palette, experimental composition",
    label: "New Wave",
    description: "Dramatic asymmetrical cuts, geometric makeup, avant-garde fashion",
    emoji: "🎹"
  },
  {
    id: 'rock-metal',
    value: "1980s rock and heavy metal yearbook photo with big voluminous teased hair, leather jacket or band t-shirt, dramatic smoky eye makeup, rebellious expression, moody studio lighting, authentic 1980s rock aesthetic with denim and metal accessories",
    label: "Rock & Metal",
    description: "Big hair, leather jackets, smoky eyes, rebellious attitude",
    emoji: "🎸"
  },
  {
    id: 'pop-culture',
    value: "1980s pop culture yearbook photo with bright neon colors, perfectly feathered hair with volume, pastel or electric blue eyeshadow, wearing iconic 80s fashion like windbreaker or colorful sweater, cheerful expression, studio lighting with colored gels, MTV generation aesthetic",
    label: "Pop Culture",
    description: "Bright colors, feathered hair, cheerful MTV generation look",
    emoji: "🎤"
  },
  {
    id: 'preppy',
    value: "1980s preppy yearbook photo with perfectly coiffed conservative hairstyle, wearing polo shirt or sweater vest, natural makeup with subtle pink tones, classic American collegiate style, clean studio lighting, traditional yearbook composition, upper-class aesthetic",
    label: "Preppy Style",
    description: "Conservative styling, polo shirts, collegiate American look",
    emoji: "👔"
  },
  {
    id: 'punk-rock',
    value: "1980s punk rock yearbook photo with spiky colorful hair or mohawk, dark dramatic makeup with heavy eyeliner, wearing leather jacket with studs or safety pins, defiant expression, harsh lighting creating strong contrasts, underground scene aesthetic",
    label: "Punk Rock",
    description: "Spiky hair, heavy eyeliner, leather with studs, defiant look",
    emoji: "🤘"
  },
  {
    id: 'valley-girl',
    value: "1980s valley girl yearbook photo with big blonde permed hair, bright pink or coral lipstick, pastel makeup with frosted eyeshadow, wearing trendy 80s clothing like off-shoulder tops, bubbly expression, soft glamour lighting, California teen aesthetic",
    label: "Valley Girl",
    description: "Big blonde hair, pastel makeup, trendy 80s teen fashion",
    emoji: "💅"
  },
  {
    id: 'corporate',
    value: "1980s corporate professional yearbook photo with structured power suit with massive shoulder pads, perfectly styled business hair, conservative makeup, serious professional expression, clean corporate lighting, Wall Street yuppie aesthetic, power dressing era",
    label: "Corporate",
    description: "Power suits, shoulder pads, professional business styling",
    emoji: "💼"
  },
  {
    id: 'neon-aesthetic',
    value: "1980s neon aesthetic yearbook photo with electric color palette of hot pink, cyan, and purple, futuristic styling with metallic accents, bold geometric makeup, wearing shiny or iridescent clothing, dramatic lighting with neon glow effects, cyberpunk influence",
    label: "Neon Aesthetic",
    description: "Electric colors, metallic styling, cyberpunk influence",
    emoji: "⚡"
  },
  {
    id: 'glam-rock',
    value: "1980s glam rock yearbook photo with theatrical makeup including glitter and bold colors, androgynous styling with dramatic hair, wearing flamboyant clothing with sequins or metallic fabrics, artistic lighting with theatrical shadows, David Bowie influenced aesthetic",
    label: "Glam Rock",
    description: "Theatrical makeup, androgynous styling, glitter and sequins",
    emoji: "✨"
  },
  {
    id: 'synthwave',
    value: "1980s synthwave yearbook photo with retro-futuristic styling, neon color grading with purple and cyan tones, sleek geometric haircut, wearing futuristic or tech-inspired clothing, dramatic backlighting creating silhouettes, Blade Runner aesthetic influence",
    label: "Synthwave",
    description: "Retro-futuristic styling, neon colors, tech-inspired look",
    emoji: "🔮"
  }
];

// Enhanced prompt builder that combines style with user preferences
const buildEightiesPrompt = ({
  gender,
  styleId,
  preserveFacialFeatures = true,
  intensity = 'medium'
}) => {
  const style = EIGHTIES_STYLES.find(s => s.id === styleId);
  if (!style) return null;

  let prompt = `${gender} ${style.value}`;
  
  if (preserveFacialFeatures) {
    prompt += ", IMPORTANT: preserve exact facial features, skin tone, ethnicity, and bone structure";
  }
  
  prompt += ", authentic 1980s photography style with period-accurate lighting and composition";
  
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