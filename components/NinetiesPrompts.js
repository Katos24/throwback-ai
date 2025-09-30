// ==============================
// NinetiesPrompts.js
// ==============================

// Core 90s style presets
export const NINETIES_STYLES = [
  { id: 'grunge', value: "mid-1990s grunge yearbook photo: messy layered hair, oversized flannel, band tee, ripped jeans, Doc Martens, rebellious expression", label: "Grunge", emoji: "🎸" },
  { id: 'hip-hop', value: "mid-1990s hip-hop yearbook photo: cornrows or fade, oversized jersey, baggy jeans, Timberlands, confident stance", label: "Hip-Hop", emoji: "🎤" },
  { id: 'pop-star', value: "mid-1990s teen pop yearbook photo: butterfly clips, frosted eyeshadow, glossy lips, crop top, low-rise jeans, platform sneakers", label: "Pop Star", emoji: "💿" },
  { id: 'skater', value: "mid-1990s skater yearbook photo: shaggy hair, backwards cap, oversized tee, baggy cargo shorts, Vans, laid-back expression", label: "Skater", emoji: "🛹" },
  { id: 'rnb', value: "mid-1990s R&B yearbook photo: finger waves, satin outfit, bamboo earrings, glossy lips, sultry confident expression", label: "R&B Style", emoji: "✨" },
  { id: 'preppy', value: "mid-1990s preppy yearbook photo: center-parted hair, polo shirt, cardigan, khakis or pleated skirt, friendly smile", label: "Preppy", emoji: "👔" },
  { id: 'rave', value: "mid-1990s rave kid yearbook photo: space buns, glitter makeup, neon windbreaker, glow stick bracelets, playful expression", label: "Rave Kid", emoji: "🌈" },
  { id: 'mall-goth', value: "mid-1990s mall goth yearbook photo: dark eyeliner, black lipstick, band tee, fishnet layers, chains, brooding expression", label: "Mall Goth", emoji: "🖤" },
{ 
  id: 'boy-band',
  value: "mid-1990s boy band yearbook photo: frosted tips or gelled spiky hair, matching coordinated outfit with other members (denim-on-denim, shiny satin shirts, or all-white ensembles), subtle makeup for camera-ready polish, silver chain necklace, charming synchronized smile, polished teen heartthrob aesthetic straight out of Tiger Beat or TRL",
  label: "Boy Band",
  emoji: "🎶"
},
{ 
  id: 'windbreaker',
  value: "mid-1990s colorful windbreaker yearbook photo: oversized nylon jacket with bold geometric color blocks (teal, purple, hot pink, neon green), high-waisted jeans or track pants, chunky sneakers, casual confident expression, retro athletic vibe",
  label: "Colorful Windbreaker",
  emoji: "🧥"
}
];

// Per-gender style details
const STYLE_PROMPTS = {
  grunge: {
    male: "male with shoulder-length messy hair, stubble, oversized flannel, band tee, ripped jeans, Doc Martens",
    female: "female with layered messy hair, smudged eyeliner, oversized flannel, slip dress over tee, combat boots",
    "non-binary": "person with alternative grunge styling, flannel layers, band merchandise, combat boots"
  },
  "hip-hop": {
    male: "male with fade or cornrows, gold chain, oversized sports jersey, baggy jeans, Timberlands",
    female: "female with high ponytail and baby hairs, hoop earrings, crop top with baggy jeans, Air Force 1s",
    "non-binary": "person with urban hip-hop styling, baggy clothes, bold accessories"
  },
  minimalist: {
    male: "male with clean short hair, simple turtleneck or button-down, dark jeans, minimal accessories",
    female: "female with sleek straight hair or low bun, nude makeup, slip dress or simple turtleneck",
    "non-binary": "person with clean minimalist styling, monochrome clothing, understated accessories"
  },
  "pop-star": {
    male: "male with frosted tips or bleached hair, leather jacket, cargo pants, chain necklace",
    female: "female with butterfly clips or crimped hair, frosted eyeshadow, glossy lips, crop top, platform shoes",
    "non-binary": "person with vibrant teen pop styling, colorful accessories, platform shoes"
  },
  skater: {
    male: "male with shaggy hair or backwards cap, oversized graphic tee, baggy cargo shorts, Vans",
    female: "female with messy ponytail or loose hair, oversized band tee, baggy jeans, DC shoes",
    "non-binary": "person with comfortable skater styling, oversized clothing, skate shoes"
  },
  rnb: {
    male: "male with waves or cornrows, silk shirt, baggy jeans, gold chain, Timberlands",
    female: "female with finger waves, brown lip liner with gloss, satin or velvet outfit, bamboo earrings",
    "non-binary": "person with smooth R&B styling, satin fabrics, gold jewelry"
  },
  preppy: {
    male: "male with neat side-part hair, polo shirt or sweater vest, khakis, loafers",
    female: "female with center-parted straight hair or headband, cardigan over collared shirt, pleated skirt",
    "non-binary": "person with clean preppy styling, polo or collared shirt, neat grooming"
  },
  rave: {
    male: "male with spiked hair or bucket hat, neon windbreaker, baggy pants, glow stick accessories",
    female: "female with space buns, glitter makeup, neon crop top, platform shoes, fuzzy accessories",
    "non-binary": "person with colorful rave styling, neon clothing, glow accessories"
  },
  "mall-goth": {
    male: "male with dark dyed hair, black eyeliner, band t-shirt, wide-leg black jeans, chains",
    female: "female with dark hair, heavy eyeliner, dark lipstick, fishnet sleeves, band tee, choker",
    "non-binary": "person with dark alternative styling, band merchandise, fishnet layers, chains"
  },
  "boy-band": {
    male: "male with frosted tips or styled spikes, leather jacket, cargo pants, chain necklace",
    female: "female with styled hair or space buns, coordinated girl group outfit, platform shoes",
    "non-binary": "person with coordinated pop styling, trendy 90s fashion, platform accessories"
  },
  windbreaker: {
  male: "male with short spiky or bowl cut hair, oversized colorful windbreaker jacket with bold geometric blocks, high-waisted jeans or track pants, chunky sneakers",
  female: "female with scrunchie ponytail, oversized neon windbreaker, mom jeans or leggings, chunky sneakers, playful smile",
  "non-binary": "person with oversized 90s windbreaker in bright color blocks, casual retro sportswear styling, chunky sneakers"
}

};

// Authentic mid-1990s photo look
const PHOTO_QUALITY_BASE = `
shot on 35mm film or early consumer point-and-shoot camera,
Kodak Gold 200 tones with warm highlights and muted shadows,
slight film grain and subtle lens softness,
built-in flash with occasional glare or red-eye,
matte printed finish with authentic 1990s color palette,
school portrait or casual studio lighting,
typical mid-1990s yearbook framing and composition
`.replace(/\s+/g, ' ').trim();


const PHOTOGRAPHY_STYLES = {
  "HyperRealistic-likeness": `${PHOTO_QUALITY_BASE}, sharp facial focus typical of professional school portraits, clear subject exposure`,
  "Realistic": `${PHOTO_QUALITY_BASE}, standard mid-1990s yearbook texture and authentic period feel`,
  "Stylistic": `${PHOTO_QUALITY_BASE}, enhanced nostalgic feel with period-accurate styling emphasis`
};

// Period-specific background details
const NINETIES_ENVIRONMENT = `
mid-1990s yearbook backdrop (plain neutral or soft gradient),
school portrait studio or casual setting,
authentic 1990s photography processing and composition
`.replace(/\s+/g, ' ').trim();

// Negative prompt to avoid modern elements
export const NEGATIVE_PROMPT = [
  "no smartphones", "no modern technology", "no 2000s fashion", "no 2010s styling",
  "no modern makeup trends", "no Instagram filters", "no modern hair techniques",
  "no ultra-HD quality", "no modern accessories"
].join(", ");

// Build function
export function buildNinetiesPrompt(userGender, selectedStyle, workflowType = "HyperRealistic-likeness", styleStrength = 20) {
  const baseStyle = STYLE_PROMPTS[selectedStyle]?.[userGender] || STYLE_PROMPTS[selectedStyle]?.["non-binary"] || "";
  const photoStyle = PHOTOGRAPHY_STYLES[workflowType] || PHOTOGRAPHY_STYLES["HyperRealistic-likeness"];

  const intensityDescriptor = styleStrength >= 35 ? "strong mid-1990s transformation" : styleStrength >= 20 ? "moderate period styling" : "subtle period cues";
  const photographicNotes = styleStrength >= 35 ? "pronounced vintage film character" : styleStrength >= 20 ? "noticeable 90s photographic feel" : "light nostalgic character";

  const prompt = [
    baseStyle,
    `${intensityDescriptor}, ${photographicNotes}`,
    photoStyle,
    NINETIES_ENVIRONMENT,
    "CRITICAL: preserve exact facial features, bone structure, skin tone, and ethnicity",
    "tight close-up yearbook portrait, head and upper shoulders only, natural expression, direct eye contact",
    "authentic 1990s aesthetic, no modern elements, period-accurate styling from 1993-1999"
  ].filter(Boolean).join(", ");

  return {
    prompt,
    negative_prompt: NEGATIVE_PROMPT
  };
}
// Helpers
export function getStyleDescription(styleId) {
  return NINETIES_STYLES.find(s => s.id === styleId)?.description || "";
}

export const AVAILABLE_GENDERS = ["male", "female", "non-binary"];
export const WORKFLOW_TYPES = [
  { value: "HyperRealistic-likeness", label: "HyperRealistic" },
  { value: "Realistic", label: "Realistic" },
  { value: "Stylistic", label: "Stylistic" }
];
export default NINETIES_STYLES;