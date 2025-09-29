// components/NinetiesPrompts.js

export const NINETIES_STYLES = [
  { id: 'grunge', value: "mid-1990s grunge yearbook photo: messy layered hair, minimal smudged eyeliner, oversized flannel over band tee, ripped jeans, Doc Martens, laid-back rebellious expression, Seattle alternative scene aesthetic", label: "Grunge", emoji: "🎸", description: "Seattle sound with flannel and rebellion" },
  { id: 'hip-hop', value: "mid-1990s hip-hop yearbook photo: cornrows or high ponytail with baby hairs, bold hoop earrings, oversized jersey or baggy jeans with crop top, Timberlands or Air Force 1s, confident attitude, East Coast golden era style", label: "Hip-Hop", emoji: "🎤", description: "Urban street style with bold accessories" },
  { id: 'minimalist', value: "mid-1990s minimalist yearbook photo: sleek straight hair or low bun, nude makeup with brown lip liner, simple slip dress or turtleneck, clean understated jewelry, serene expression, Calvin Klein era aesthetic", label: "Minimalist Chic", emoji: "🤍", description: "Clean lines and understated elegance" },
  { id: 'pop-star', value: "mid-1990s teen pop yearbook photo: butterfly clips or crimped hair, frosted eyeshadow and glossy lips, platform sneakers with crop top and low-rise jeans, chunky highlights, bubbly energetic smile, MTV generation vibe", label: "Pop Star", emoji: "💿", description: "Teen pop with platforms and glitter" },
  { id: 'skater', value: "mid-1990s skater yearbook photo: shaggy hair or backwards cap, oversized graphic tee, baggy cargo pants or shorts, Vans or DC shoes, laid-back expression, X-Games era alternative youth culture", label: "Skater", emoji: "🛹", description: "Baggy clothes and skate culture attitude" },
  { id: 'rnb', value: "mid-1990s R&B yearbook photo: smooth laid edges or finger waves, brown lip liner with gloss, satin or velvet outfit, gold bamboo earrings, sultry confident expression, warm studio lighting, TLC and Aaliyah era style", label: "R&B Style", emoji: "✨", description: "Smooth sophistication with soul" },
  { id: 'preppy', value: "mid-1990s preppy yearbook photo: center-parted straight hair or headband, natural makeup with clear lip gloss, polo shirt or cardigan over collared shirt, khakis or pleated skirt, friendly smile, classic American teen look", label: "Preppy", emoji: "👔", description: "Clean-cut collegiate fashion" },
  { id: 'rave', value: "mid-1990s rave kid yearbook photo: space buns or colorful streaks, glitter makeup, neon windbreaker or bucket hat, smiley face accessories, glow stick bracelets, energetic expression, underground club aesthetic", label: "Rave Kid", emoji: "🌈", description: "Neon colors and dance culture energy" },
  { id: 'mall-goth', value: "mid-1990s mall goth yearbook photo: dark hair with heavy black eyeliner, dark lipstick with pale foundation, black band t-shirt, fishnet layers, choker, silver chains, brooding expression, Hot Topic alternative style", label: "Mall Goth", emoji: "🖤", description: "Dark alternative with band merchandise" },
  { id: 'boy-band', value: "mid-1990s boy band yearbook photo: frosted tips or gelled spiky hair, subtle groomed makeup, leather jacket or coordinated outfit, cargo pants, chain necklace, charming smile, teen heartthrob appeal", label: "Boy Band", emoji: "🎶", description: "Teen idol with coordinated styling" }
];

// Per-gender style details
const STYLE_PROMPTS = {
  grunge: {
    male: "male with shoulder-length messy hair, slight stubble, oversized flannel, band tee, ripped jeans, Doc Martens, rebellious expression",
    female: "female with layered messy hair, minimal makeup with smudged eyeliner, oversized flannel, slip dress over tee, combat boots, laid-back attitude",
    "non-binary": "person with alternative grunge styling, flannel layers, band merchandise, combat boots, authentic Seattle scene look"
  },
  "hip-hop": {
    male: "male with fade or cornrows, gold chain, oversized sports jersey, baggy jeans, Timberlands, confident stance",
    female: "female with high ponytail and baby hairs, bold hoop earrings, crop top with baggy jeans, bamboo earrings, Air Force 1s, fierce expression",
    "non-binary": "person with urban hip-hop styling, baggy clothes, bold accessories, confident attitude"
  },
  minimalist: {
    male: "male with clean short hair, simple turtleneck or button-down, dark jeans, minimal accessories, understated elegance",
    female: "female with sleek straight hair or low bun, nude makeup with brown lip liner, slip dress or simple turtleneck, minimal jewelry, serene look",
    "non-binary": "person with clean minimalist styling, simple monochrome clothing, understated accessories"
  },
  "pop-star": {
    male: "male with frosted tips or bleached hair, leather jacket, cargo pants, chain necklace, boy band styling, charming smile",
    female: "female with butterfly clips or crimped hair, frosted eyeshadow, glossy lips, crop top with low-rise jeans, platform shoes, bubbly expression",
    "non-binary": "person with vibrant teen pop styling, colorful accessories, platform shoes, energetic look"
  },
  skater: {
    male: "male with shaggy hair or backwards cap, oversized graphic tee, baggy cargo shorts, Vans, relaxed smile",
    female: "female with messy ponytail or loose hair, oversized band tee, baggy jeans, Vans or DC shoes, casual laid-back vibe",
    "non-binary": "person with comfortable skater styling, oversized clothing, skate shoes, laid-back attitude"
  },
  rnb: {
    male: "male with waves or cornrows, silk shirt or jersey, baggy jeans, gold chain, Timberlands, smooth confident look",
    female: "female with smooth laid edges or finger waves, brown lip liner with gloss, satin or velvet outfit, bamboo earrings, sultry expression",
    "non-binary": "person with smooth R&B styling, satin fabrics, gold jewelry, confident presence"
  },
  preppy: {
    male: "male with neat side-part hair, polo shirt or sweater vest, khakis, boat shoes or loafers, friendly smile",
    female: "female with center-parted straight hair or headband, natural makeup, cardigan over collared shirt, pleated skirt or khakis, pearl earrings, warm smile",
    "non-binary": "person with clean preppy styling, polo or collared shirt, neat grooming, classic accessories"
  },
  rave: {
    male: "male with messy spiked hair or bucket hat, neon windbreaker, baggy pants, glow stick accessories, energetic smile",
    female: "female with space buns or colorful hair, glitter makeup, neon crop top, platform shoes, fuzzy accessories, playful expression",
    "non-binary": "person with colorful rave styling, neon clothing, glow accessories, energetic vibe"
  },
  "mall-goth": {
    male: "male with dark dyed hair, black eyeliner, band t-shirt, wide-leg black jeans, chains, studded accessories, moody expression",
    female: "female with dark hair, heavy black eyeliner, dark lipstick, fishnet sleeves, band tee, layered chains, choker, brooding look",
    "non-binary": "person with dark alternative styling, band merchandise, fishnet layers, chains, moody aesthetic"
  },
  "boy-band": {
    male: "male with frosted tips or styled spikes, leather jacket, cargo pants, chain necklace, coordinated outfit, confident heartthrob smile",
    female: "female with styled hair or space buns, coordinated girl group outfit, platform shoes, butterfly clips, pop star energy",
    "non-binary": "person with coordinated pop styling, trendy 90s fashion, platform accessories"
  }
};

// Authentic mid-1990s photo look
const PHOTO_QUALITY_BASE = `
shot on 35mm film or early consumer camera,
slight film grain or digital noise,
natural saturation with period-accurate color tones,
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

// Build function returns both prompt and negative prompt
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