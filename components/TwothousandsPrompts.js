// components/TwothousandsPrompts.js

export const TWOTHOUSANDS_STYLES = [
  { 
    id: 'emo', 
    label: "Emo", 
    emoji: "🖤",
    description: "Emotional hardcore with dark styling"
  },
  { 
    id: 'scene', 
    label: "Scene Kid", 
    emoji: "💖",
    description: "Colorful hair and bold makeup"
  },
  { 
    id: 'pop-punk', 
    label: "Pop Punk", 
    emoji: "🎸",
    description: "Skater-inspired alternative style"
  },
  { 
    id: 'hipster', 
    label: "Hipster", 
    emoji: "🤓",
    description: "Indie aesthetic with vintage elements"
  },
  { 
    id: 'preppy', 
    label: "Preppy", 
    emoji: "👔",
    description: "Clean-cut collegiate fashion"
  },
  { 
    id: 'cyber-goth', 
    label: "Cyber Goth", 
    emoji: "⚡",
    description: "Futuristic industrial styling"
  },
  { 
    id: 'skater', 
    label: "Skater", 
    emoji: "🛹",
    description: "Baggy clothes and casual street wear"
  },
  { 
    id: 'metrosexual', 
    label: "Metrosexual", 
    emoji: "✨",
    description: "Polished urban fashion-forward style"
  }
];

const STYLE_PROMPTS = {
  emo: {
    male: "male with long side-swept black hair covering one eye, black eyeliner, black skinny jeans, band t-shirt (My Chemical Romance, Fall Out Boy), studded belt, black Converse sneakers, multiple bracelets",
    female: "female with choppy black hair with colored streaks (pink, red, or blue), heavy black eyeliner, dark eyeshadow, black skinny jeans, band t-shirt, striped arm warmers, black Converse or boots",
    "non-binary": "person with asymmetrical black hair, dark makeup, black clothing, band merchandise, alternative accessories"
  },
  scene: {
    male: "male with colorful teased hair (neon colors), skinny jeans, tight graphic t-shirt, multiple colorful bracelets, checkered Vans, scene kid accessories",
    female: "female with big teased hair in bright colors (pink, blue, green), heavy makeup with bright eyeshadow, skinny jeans, colorful accessories, Hello Kitty or anime merchandise",
    "non-binary": "person with vibrant teased hair, colorful makeup, bright clothing, scene accessories"
  },
  "pop-punk": {
    male: "male with spiky hair with blonde highlights, band t-shirt (Blink-182, Green Day), cargo shorts or skinny jeans, Vans sneakers, wristbands, simple chain necklace",
    female: "female with layered hair with chunky highlights, band t-shirt, low-rise jeans, belt with studded details, Converse sneakers, multiple ear piercings",
    "non-binary": "person with alternative hair styling, band merchandise, casual punk-inspired clothing"
  },
  hipster: {
    male: "male with carefully messy hair, thick-rimmed glasses, vintage band t-shirt, slim-fit jeans, Converse or vintage sneakers, messenger bag, ironic accessories",
    female: "female with bangs and vintage-styled hair, thick glasses, vintage dress or indie band t-shirt with cardigan, tights, vintage shoes, quirky accessories",
    "non-binary": "person with indie styling, vintage clothing, thick-rimmed glasses, alternative accessories"
  },
  preppy: {
    male: "male with clean-cut hair, polo shirt or button-down, khaki pants or jeans, boat shoes or clean sneakers, classic watch, neat appearance",
    female: "female with styled straight hair, polo shirt or blouse, pleated skirt or nice jeans, ballet flats or low heels, pearl jewelry, polished look",
    "non-binary": "person with clean preppy styling, collared shirts, neat appearance, classic accessories"
  },
  "cyber-goth": {
    male: "male with black hair with neon accents, dark makeup, black clothing with neon details, platform boots, cyberpunk accessories, LED elements",
    female: "female with colorful synthetic hair extensions, dramatic dark makeup with neon accents, black vinyl or PVC clothing, platform boots, futuristic accessories",
    "non-binary": "person with futuristic styling, synthetic hair colors, cyberpunk fashion, industrial accessories"
  },
  skater: {
    male: "male with medium-length hair, oversized graphic t-shirt or hoodie, baggy jeans or cargo pants, skate shoes (Vans, DC, Etnies), beanie or baseball cap",
    female: "female with casual styled hair, oversized hoodie or fitted t-shirt, low-rise jeans or skate-style pants, skate shoes, casual accessories",
    "non-binary": "person with casual skater styling, comfortable oversized clothing, skate shoes"
  },
  metrosexual: {
    male: "male with perfectly styled hair with gel or pomade, fitted designer shirt, dark jeans or dress pants, polished shoes, watch, well-groomed appearance",
    female: "female with sleek styled hair, fashionable top, designer jeans or skirt, stylish shoes, designer accessories, polished urban look",
    "non-binary": "person with polished urban styling, well-fitted clothes, designer accessories, fashionable appearance"
  }
};

// CRITICAL: Authentic 2000s photo quality characteristics
const PHOTO_QUALITY_BASE = `
shot on early digital camera with 3-5 megapixel resolution,
slight digital noise and compression artifacts,
colors typical of early 2000s digital photography,
slightly oversaturated with digital processing,
flash photography lighting or natural indoor lighting,
authentic 2000s yearbook digital photo quality,
classic early digital portrait composition,
slight pixelation typical of low-resolution digital cameras,
natural skin texture with early digital smoothing,
authentic early 2000s image processing
`;

const PHOTOGRAPHY_STYLES = {
  "HyperRealistic-likeness": `${PHOTO_QUALITY_BASE}, professional school digital photographer quality, good focus on subject, proper exposure, clean background`,
  
  "Realistic": `${PHOTO_QUALITY_BASE}, standard yearbook digital photo quality, decent lighting, clear features, typical early digital camera quality`,
  
  "Stylistic": `${PHOTO_QUALITY_BASE}, artistic early digital portrait, creative lighting, enhanced early 2000s digital effects, more dramatic composition`
};

// Period-specific background and environment details
const TWOTHOUSANDS_ENVIRONMENT = `
early 2000s high school yearbook photo background,
classic school portrait backdrop in neutral colors,
early digital photography studio lighting,
typical early 2000s yearbook photography composition and framing,
authentic early digital camera photo appearance,
slight digital compression typical of early 2000s photography,
natural early digital color processing
`;

export function buildTwothousandsPrompt(userGender, selectedStyle, workflowType, styleStrength) {
  // Get base style description
  const baseStyle = STYLE_PROMPTS[selectedStyle]?.[userGender] || STYLE_PROMPTS[selectedStyle]?.["non-binary"] || "";
  
  // Get photography style
  const photoStyle = PHOTOGRAPHY_STYLES[workflowType] || PHOTOGRAPHY_STYLES["HyperRealistic-likeness"];
  
  // Adjust style intensity based on strength
  const styleIntensity = styleStrength > 25 ? "strong authentic" : styleStrength > 15 ? "moderate" : "subtle";
  
  // Build the complete prompt with extreme specificity
  const prompt = `
    ${baseStyle},
    ${styleIntensity} early 2000s ${selectedStyle} style,
    ${photoStyle},
    ${TWOTHOUSANDS_ENVIRONMENT},
    CRITICAL: preserve exact facial features, bone structure, skin tone, and ethnicity,
    authentic early 2000s yearbook portrait pose with natural smile,
    head and shoulders composition typical of school photos,
    direct eye contact with camera,
    no modern elements or anachronisms,
    perfect period authenticity in every detail,
    looks exactly like it was photographed in 2002-2005,
    early digital camera quality with authentic compression artifacts
  `.replace(/\s+/g, ' ').trim();

  return prompt;
}

// Helper function to get style description
export function getStyleDescription(styleId) {
  return TWOTHOUSANDS_STYLES.find(style => style.id === styleId)?.description || "";
}

// Helper function to get all available genders
export const AVAILABLE_GENDERS = ["male", "female", "non-binary"];

// Helper function to get all workflow types
export const WORKFLOW_TYPES = [
  { value: "HyperRealistic-likeness", label: "HyperRealistic" },
  { value: "Realistic", label: "Realistic" },
  { value: "Stylistic", label: "Stylistic" }
];