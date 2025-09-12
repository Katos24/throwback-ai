// components/NinetiesPrompts.js

const NINETIES_STYLES = [
  {
    id: 'grunge',
    value: "1990s grunge yearbook photo with disheveled layered hair, flannel shirt or band t-shirt, dark smoky eye makeup with smudged eyeliner, pale foundation, burgundy or dark lipstick, moody lighting with natural shadows, authentic Seattle grunge aesthetic",
    label: "Grunge Style",
    description: "Disheveled hair, flannel shirts, dark makeup, Seattle aesthetic",
    emoji: "🎸"
  },
  {
    id: 'hip-hop',
    value: "1990s hip hop yearbook photo with high-top fade or cornrows, oversized jersey or baggy clothing, gold jewelry chains, confident expression, urban street style, bold graphic tees, sneakers, authentic East/West Coast hip hop culture",
    label: "Hip Hop Vibe",
    description: "High-top fades, oversized clothing, gold chains, urban style",
    emoji: "🎤"
  },
  {
    id: 'preppy',
    value: "1990s preppy yearbook photo with perfectly styled hair using gel or mousse, polo shirt or sweater vest, natural makeup with frosted eyeshadow, clean-cut American collegiate style, bright studio lighting, traditional yearbook composition",
    label: "Preppy Look",
    description: "Clean-cut styling, polo shirts, frosted eyeshadow, collegiate",
    emoji: "👔"
  },
  {
    id: 'alternative-rock',
    value: "1990s alternative rock yearbook photo with messy textured hair, vintage band t-shirt or thrift store finds, minimal makeup with dark eyeliner, indie rock aesthetic, muted colors, artistic lighting, underground music scene influence",
    label: "Alternative Rock",
    description: "Textured hair, band tees, minimal dark makeup, indie aesthetic",
    emoji: "🎵"
  },
  {
    id: 'rave-culture',
    value: "1990s rave culture yearbook photo with colorful streaked hair or space buns, bright neon clothing or oversized t-shirts, glittery makeup with bold colors, pacifier or candy jewelry accessories, electronic music scene aesthetic",
    label: "Rave Culture",
    description: "Colorful hair, neon clothing, glittery makeup, electronic scene",
    emoji: "💿"
  },
  {
    id: 'skater',
    value: "1990s skater yearbook photo with long shaggy hair or buzz cut, oversized skateboard brand t-shirt or hoodie, relaxed casual style, minimal makeup, laid-back California skate culture, baggy jeans, sneakers",
    label: "Skater Style",
    description: "Shaggy hair, skate brands, baggy clothes, California vibes",
    emoji: "🛹"
  },
  {
    id: 'minimalist',
    value: "1990s minimalist yearbook photo with sleek straight hair or simple bob cut, neutral colors like black or white clothing, clean natural makeup with nude tones, sophisticated simplicity, clean lines, Calvin Klein inspired aesthetic",
    label: "Minimalist 90s",
    description: "Sleek hair, neutral colors, clean makeup, sophisticated simplicity",
    emoji: "⚪"
  },
  {
    id: 'punk',
    value: "1990s punk yearbook photo with spiked or brightly colored hair, leather jacket with patches or safety pins, heavy black eyeliner and dark lipstick, rebellious expression, DIY aesthetic, underground punk rock culture",
    label: "90s Punk",
    description: "Spiked hair, leather with patches, heavy makeup, rebellious",
    emoji: "🤘"
  },
  {
    id: 'riot-grrrl',
    value: "1990s riot grrrl yearbook photo with choppy layered hair or bold colored streaks, vintage band merch or DIY customized clothing, bold red lipstick with minimal eye makeup, feminist punk aesthetic, empowered expression",
    label: "Riot Grrrl",
    description: "Choppy hair, band merch, bold red lips, feminist punk",
    emoji: "✊"
  },
  {
    id: 'gangsta-rap',
    value: "1990s gangsta rap yearbook photo with slicked-back hair or tight braids, oversized plaid shirt or sports jersey, dark sunglasses, gold chains and jewelry, serious expression, West Coast hip hop aesthetic",
    label: "Gangsta Rap",
    description: "Slicked hair, plaid shirts, sunglasses, gold jewelry, serious look",
    emoji: "🕶️"
  },
  // ───────────────────────────────────────────────────────
  // NEW PRESET: 2K Windbreaker
  {
    id: '2k-windbreaker',
    value: "1990s Y2K windbreaker yearbook photo with black, orange, red, pink, and yellow horizontal stripes, dark voluminous hair and beard, silver chain necklace, plain light blue background, bold color-block streetwear aesthetic",
    label: "2K Windbreaker",
    description: "Black/orange/red/pink/yellow windbreaker, 2K patch, chain necklace",
    emoji: "🧥"
  }
];


// Enhanced prompt builder that combines style with user preferences
const buildNinetiesPrompt = ({
  gender,
  styleId,
  preserveFacialFeatures = true,
  intensity = 'medium'
}) => {
  const style = NINETIES_STYLES.find(s => s.id === styleId);
  if (!style) return null;

  let prompt = `${gender} ${style.value}`;

  if (preserveFacialFeatures) {
    prompt += ", IMPORTANT: preserve exact facial features, skin tone, ethnicity, and bone structure";
  }

  prompt += ", authentic 1990s photography style with period-accurate lighting and composition";

  switch (intensity) {
    case 'subtle':
      prompt += ", subtle vintage styling maintaining natural appearance";
      break;
    case 'strong':
      prompt += ", bold dramatic 1990s transformation with exaggerated period elements";
      break;
    default:
      prompt += ", balanced vintage styling with authentic 1990s elements";
  }

  return prompt;
};

export { NINETIES_STYLES, buildNinetiesPrompt };
export default NINETIES_STYLES;
