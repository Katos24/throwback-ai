// components/TwothousandsPrompts.js

export const TWOTHOUSANDS_STYLES = [
  { id: 'emo', value: "early-2000s emo yearbook photo: long side-swept black hair covering one eye, heavy dark eyeliner, skinny jeans, band t-shirt, studded belt, layered bracelets, introspective expression, moody attitude", label: "Emo", emoji: "🖤", description: "Emotional hardcore with dark styling" },
  { id: 'scene', value: "early-2000s scene kid yearbook photo: brightly teased hair with neon streaks, chunky bangs, colorful heavy eyeliner and eyeshadow, skinny jeans, bright accessories, playful energetic expression, exaggerated colorful styling", label: "Scene Kid", emoji: "💖", description: "Colorful hair and bold makeup" },
  { id: 'pop-punk', value: "early-2000s pop-punk yearbook photo: spiky or choppy hair with blonde highlights, band tee (Blink-182 style), skinny jeans or cargo shorts, Vans sneakers, casual confident grin, youthful rebellious energy", label: "Pop Punk", emoji: "🎸", description: "Skater-inspired alternative style" },
  { id: 'hipster', value: "early-2000s indie/hipster portrait: carefully messy hair, thick-rimmed glasses, vintage band tee or cardigan, slim jeans, ironic accessories, casual smile, slightly retro/quirky aesthetic", label: "Hipster", emoji: "🤓", description: "Indie aesthetic with vintage elements" },
  { id: 'preppy', value: "early-2000s preppy yearbook photo: neat polo or sweater-vest, clean-cut hair, polished smile, classic collegiate look, understated jewelry, tidy composition", label: "Preppy", emoji: "👔", description: "Clean-cut collegiate fashion" },
  { id: 'cyber-goth', value: "early-2000s cyber-goth portrait: synthetic hair or neon accents, black PVC or vinyl details, platform boots, dramatic dark makeup with neon highlights, futuristic/industrial vibe", label: "Cyber Goth", emoji: "⚡", description: "Futuristic industrial styling" },
  { id: 'skater', value: "early-2000s skater portrait: medium-length relaxed hair, oversized graphic tee or hoodie, baggy jeans or cargo pants, skate shoes, relaxed casual expression", label: "Skater", emoji: "🛹", description: "Baggy clothes and casual street wear" },
  { id: 'metrosexual', value: "early-2000s polished metrosexual portrait: carefully styled hair with gel, fitted shirt, designer-casual look, groomed appearance, confident poised expression", label: "Metrosexual", emoji: "✨", description: "Polished urban fashion-forward style" }
];

// Per-gender style detail (keeps fine-grained tokens)
const STYLE_PROMPTS = {
  emo: {
    male: "male with long side-swept black hair covering one eye, black eyeliner, band tee, skinny jeans, studded belt, layered bracelets, black Converse, introspective expression",
    female: "female with choppy black hair with colored streaks, heavy black eyeliner, dark eyeshadow, skinny jeans, striped arm warmers, black boots, moody expression",
    "non-binary": "person with asymmetrical black hair, dark makeup, black clothing, band merchandise, alternative accessories, moody expression"
  },
  scene: {
    male: "male with teased neon hair, skinny jeans, tight graphic tee, colorful bracelets, checkered shoes, playful energetic face",
    female: "female with big teased neon hair, bright eyeshadow, hair bows/accessories, skinny jeans, colorful layered bracelets, hyper-energetic expression",
    "non-binary": "person with vibrant teased hair, colorful makeup, bright clothing, scene accessories, lively expression"
  },
  "pop-punk": {
    male: "male with spiky hair with blonde highlights, band tee, skinny jeans or cargo shorts, Vans, wristbands, confident grin",
    female: "female with layered hair and chunky highlights, band tee, low-rise jeans, studded belt, Converse, edgy smile",
    "non-binary": "person with alternative hair, band merchandise, punk-inspired casual clothes"
  },
  hipster: {
    male: "male with carefully messy hair, thick-rimmed glasses, vintage band tee, slim jeans, vintage sneakers, slight smirk",
    female: "female with bangs and retro hair, thick glasses, indie dress or band tee with cardigan, quirky smile",
    "non-binary": "person with indie styling, vintage clothing, thick-rimmed glasses, unique accessories"
  },
  preppy: {
    male: "male with neat side-part, polo or button-down, khakis or chinos, clean shoes, classic watch, poised smile",
    female: "female with straight styled hair, collared blouse or sweater, pleated skirt or jeans, modest makeup, tidy smile",
    "non-binary": "person with polished preppy styling, collared shirt, sweater, neat grooming"
  },
  "cyber-goth": {
    male: "male with black hair with neon streaks, dark dramatic makeup, black PVC or vinyl elements, platform boots, futuristic accessories",
    female: "female with synthetic bright extensions, heavy dark eye makeup with neon accents, vinyl outfit, platform boots, fierce look",
    "non-binary": "person with synthetic hair colors, industrial accessories, neon accents, dramatic futuristic makeup"
  },
  skater: {
    male: "male with medium-length hair, oversized hoodie or graphic tee, baggy jeans, skate shoes, relaxed smile",
    female: "female with casual hair, oversized hoodie or tee, low-rise jeans or skate pants, skate shoes, casual expression",
    "non-binary": "person with comfortable skater styling, oversized clothing, skate shoes"
  },
  metrosexual: {
    male: "male with perfectly styled hair (gel/pomade), fitted designer shirt, dark jeans, polished shoes, well-groomed look",
    female: "female with sleek styled hair, fashionable top, tailored jeans or skirt, polished urban accessories",
    "non-binary": "person with fashionable fitted clothing, groomed appearance, designer-accessory details"
  }
};

// Authentic early-2000s photo look
const PHOTO_QUALITY_BASE = `
shot on early consumer digital camera (3-5 MP),
slight digital noise and compression artifacts,
mild over-saturation and early auto-white-balance tint,
flash or indoor soft studio lighting, slight pixelation,
typical early-2000s school portrait framing
`.replace(/\s+/g, ' ').trim();

const PHOTOGRAPHY_STYLES = {
  "HyperRealistic-likeness": `${PHOTO_QUALITY_BASE}, sharp facial focus typical of professional school portraits, clear subject exposure`,
  "Realistic": `${PHOTO_QUALITY_BASE}, standard early-2000s yearbook texture and exposure`,
  "Stylistic": `${PHOTO_QUALITY_BASE}, creative early-digital effects, enhanced color casts or vignetting`
};

// Period-specific background details
const TWOTHOUSANDS_ENVIRONMENT = `
early 2000s yearbook backdrop (muted neutral or soft gradient),
school portrait studio lighting, indoor classroom/backdrop context,
authentic early-digital processing and composition
`.replace(/\s+/g, ' ').trim();

// Negative prompt to avoid modern anachronisms
export const NEGATIVE_PROMPT = [
  "no smartphones", "no modern smartwatches", "no recent fashion brand logos", "no modern eyeglass shapes",
  "no visible modern tattoos (unless requested)", "no modern high-fashion makeup trends", "no green-screen/backdrop artifacts",
  "no ultra-high-resolution HDR artifacts"
].join(", ");

// Build function returns both prompt and negative prompt for easy copy/paste
export function buildTwothousandsPrompt(userGender, selectedStyle, workflowType = "HyperRealistic-likeness", styleStrength = 20) {
  const baseStyle = STYLE_PROMPTS[selectedStyle]?.[userGender] || STYLE_PROMPTS[selectedStyle]?.["non-binary"] || "";
  const photoStyle = PHOTOGRAPHY_STYLES[workflowType] || PHOTOGRAPHY_STYLES["HyperRealistic-likeness"];

  const intensityDescriptor = styleStrength >= 35 ? "strong early-2000s transformation" : styleStrength >= 20 ? "moderate period styling" : "subtle period cues";
  const photographicNotes = styleStrength >= 35 ? "pronounced compression and color casts" : styleStrength >= 20 ? "noticeable early-digital character" : "light early-digital character";

  const prompt = [
    baseStyle,
    `${intensityDescriptor}, ${photographicNotes}`,
    photoStyle,
    TWOTHOUSANDS_ENVIRONMENT,
    "CRITICAL: preserve exact facial features, bone structure, skin tone, and ethnicity",
    "head-and-shoulders school/yearbook composition, natural or slight smile, direct eye contact",
    "no modern elements or anachronisms, looks authentic to 2000-2006"
  ].filter(Boolean).join(", ");

  return {
    prompt,
    negative_prompt: NEGATIVE_PROMPT
  };
}

// Helpers
export function getStyleDescription(styleId) {
  return TWOTHOUSANDS_STYLES.find(s => s.id === styleId)?.description || "";
}

export const AVAILABLE_GENDERS = ["male", "female", "non-binary"];
export const WORKFLOW_TYPES = [
  { value: "HyperRealistic-likeness", label: "HyperRealistic" },
  { value: "Realistic", label: "Realistic" },
  { value: "Stylistic", label: "Stylistic" }
];
export default TWOTHOUSANDS_STYLES;
