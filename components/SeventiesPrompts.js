const SEVENTIES_STYLES = [
  {
    id: 'hippie',
    value: "1970s hippie yearbook photo with long center-parted hair, paisley or floral shirt, layered beaded necklaces, round John Lennon-style glasses, relaxed peaceful expression, natural earth-tone palette, soft natural fabric textures, organic/flowing silhouette, vintage flower-power vibe",
    label: "Hippie",
    description: "Flower-power, paisley prints, natural textures and earth tones",
    emoji: "✌️"
  },
  {
    id: 'disco',
    value: "1970s disco yearbook photo with feathered voluminous hair, glossy polyester or halter top, dramatic metallic eyeshadow, gold chain or chunky jewelry, confident nightclub pose, high-shine fabrics and subtle sparkle, saturated color palette, studio lighting with soft highlights",
    label: "Disco",
    description: "Feathered hair, glossy fabrics, nightclub glamour and shine",
    emoji: "🕺"
  },
  {
    id: 'punk',
    value: "1970s punk yearbook photo with choppy or bleached hair, leather jacket with studs or DIY patches, band tee, safety-pin or torn details, hard-edged expression, gritty textures and high-contrast tonality, underground anti-establishment aesthetic",
    label: "Punk",
    description: "Raw DIY rebellion: leather, studs, torn fabrics, attitude",
    emoji: "🤘"
  },
  {
    id: 'glam-rock',
    value: "1970s glam rock yearbook photo with dramatic teased hair, glittery or metallic makeup, androgynous theatrical styling, sequins or metallic fabric, expressive stage-like pose, exaggerated makeup and high-contrast studio lighting, artful and gender-bending look",
    label: "Glam Rock",
    description: "Androgynous theatrical looks, glitter, stage dramatics",
    emoji: "⭐"
  },
  {
    id: 'bohemian',
    value: "1970s bohemian yearbook photo with long flowing hair, layered vintage clothing, natural relaxed expression, warm earth tones, soft bohemian aesthetic",
    label: "Bohemian",
    description: "Soft flowing silhouettes, artisanal textures, layered jewelry",
    emoji: "🌻"
  },
  {
    id: 'preppy',
    value: "1970s preppy yearbook photo with neat side-part or flip hairstyle, collared Oxford or sweater-vest, pearls or simple jewelry, poised tidy smile, clean muted palette, classic collegiate yearbook composition, conservative polished aesthetic",
    label: "Preppy",
    description: "Collegiate neatness: sweaters, collared shirts, clean lines",
    emoji: "👔"
  },
  {
    id: 'folk',
    value: "1970s folk yearbook photo with natural unstyled hair, flannel or denim jacket, acoustic musician presence, soft honest expression, earthy color tones, handmade accessory details, casual authentic folk performer look",
    label: "Folk",
    description: "Acoustic singer aesthetic: denim, flannel, natural feel",
    emoji: "🎸"
  },
  {
    id: 'mod',
    value: "1970s mod-inspired yearbook photo with precise geometric haircut or trimmed bob, bold graphic shapes in clothing, high-contrast monochrome or limited palette, dramatic winged eyeliner, clean architectural styling, confident editorial pose",
    label: "Mod",
    description: "Sharp geometry, clean lines, monochrome contrasts",
    emoji: "🎯"
  }
];

// Build a seventies-style prompt in the same pattern as your Eighties builder
const buildSeventiesPrompt = ({
  gender,
  styleId,
  preserveFacialFeatures = true,
  intensity = 'medium' // 'subtle' | 'medium' | 'strong'
}) => {
  const style = SEVENTIES_STYLES.find(s => s.id === styleId);
  if (!style) return null;

  // Base (style.value already includes the visual/style tokens)
  let prompt = `${gender} ${style.value}`;

  if (preserveFacialFeatures) {
    prompt += ", IMPORTANT: preserve exact facial features, skin tone, ethnicity, and bone structure";
  }

  // IMPROVED: More authentic 70s photography specs
  prompt += ", authentic 1970s yearbook photography: shot on Kodak Ektachrome or Kodacolor film, visible film grain with warm amber-yellow color cast typical of aged 70s prints, soft tungsten studio lighting with slight overexposure, natural edge vignetting, 85mm portrait lens compression";

  // Intensity modifiers
  switch (intensity) {
    case 'subtle':
      prompt += ", subtle vintage styling with minimal era alterations to preserve realism";
      break;
    case 'strong':
      prompt += ", bold and theatrical 1970s transformation with exaggerated period-specific elements and pronounced film character";
      break;
    default: // medium
      prompt += ", balanced 1970s styling with clear era cues while maintaining recognizability";
  }

  // Final anchor
  prompt += ", tight close-up yearbook portrait, preserve facial features and bone structure, no modern elements, photographed in 1975";

  return prompt;
};

export { SEVENTIES_STYLES, buildSeventiesPrompt };
export default SEVENTIES_STYLES;