// components/SeventiesPrompts.js

export const SEVENTIES_STYLES = [
  { 
    id: 'hippie', 
    label: "Hippie", 
    emoji: "✌️",
    description: "Peace, love, and flower power vibes"
  },
  { 
    id: 'disco', 
    label: "Disco", 
    emoji: "🕺",
    description: "Saturday Night Fever dance floor energy"
  },
  { 
    id: 'punk', 
    label: "Punk", 
    emoji: "🤘",
    description: "Raw rebellion and edgy attitude"
  },
  { 
    id: 'glam-rock', 
    label: "Glam Rock", 
    emoji: "⭐",
    description: "Glittery theatrical rock star style"
  },
  { 
    id: 'bohemian', 
    label: "Bohemian", 
    emoji: "🌻",
    description: "Free-spirited artistic expression"
  },
  { 
    id: 'preppy', 
    label: "Preppy", 
    emoji: "👔",
    description: "Clean-cut collegiate fashion"
  },
  { 
    id: 'folk', 
    label: "Folk", 
    emoji: "🎸",
    description: "Acoustic music and natural aesthetics"
  },
  { 
    id: 'mod', 
    label: "Mod", 
    emoji: "🎯",
    description: "Sharp tailored British fashion"
  }
];

const STYLE_PROMPTS = {
  hippie: {
    male: "male with shoulder-length feathered hair, thick mustache, paisley button-up shirt with wide collar, love beads necklace, bell-bottom jeans, peace sign pendant",
    female: "female with long straight center-parted hair, flower headband, peasant blouse with puffy sleeves, long flowing skirt, hoop earrings, natural makeup with pale lipstick",
    "non-binary": "person with long feathered hair, headband, loose peasant shirt, bell-bottom pants, beaded jewelry, natural expression"
  },
  disco: {
    male: "male with perfectly feathered hair, thick sideburns, wide-lapel polyester shirt unbuttoned to show chest hair, gold chain necklaces, tight flared pants",
    female: "female with voluminous curled hair, heavy eye makeup with blue eyeshadow, glossy lips, halter top, high-waisted flared pants, platform shoes",
    "non-binary": "person with feathered hair, dramatic makeup, wide-lapel shirt, flared pants, platform shoes"
  },
  punk: {
    male: "male with short spiky hair, leather motorcycle jacket over band t-shirt, ripped skinny jeans, studded belt, safety pin accessories",
    female: "female with choppy layered hair, dark kohl-rimmed eyes, leather jacket, torn fishnet stockings, mini skirt, combat boots",
    "non-binary": "person with edgy asymmetrical hair, leather jacket, torn clothing, safety pins, rebellious expression"
  },
  "glam-rock": {
    male: "male with long teased hair, glittery eye makeup, sequined shirt or vest, tight metallic pants, platform boots, theatrical pose",
    female: "female with big teased hair, dramatic glittery makeup, sequined or metallic top, tight pants, platform shoes, bold jewelry",
    "non-binary": "person with dramatic teased hair, glittery makeup, sequined clothing, platform shoes, theatrical styling"
  },
  bohemian: {
    male: "male with long wavy hair, full beard, corduroy jacket with patches, turtleneck sweater, earth-tone colors, relaxed expression",
    female: "female with long wavy hair, minimal natural makeup, flowing maxi dress, fringe vest, layered jewelry, earth tones",
    "non-binary": "person with long flowing hair, earthy clothing, layered textures, natural fabrics, bohemian accessories"
  },
  preppy: {
    male: "male with neat short hair, clean-shaven or light mustache, button-down shirt, sweater vest, blazer, pressed pants, conservative styling",
    female: "female with neat styled hair, light natural makeup, collared blouse, cardigan sweater, pleated skirt, knee-high socks",
    "non-binary": "person with neat conservative styling, collared shirt, sweater, clean-cut appearance, academic look"
  },
  folk: {
    male: "male with natural unkempt hair, full beard, flannel shirt, denim jacket, acoustic guitar, work boots, authentic rural styling",
    female: "female with long straight hair, minimal makeup, peasant dress, fringe suede vest, earth-tone colors, natural fabrics",
    "non-binary": "person with natural hair, flannel shirt, earth-tone clothing, natural fabrics, authentic folk styling"
  },
  mod: {
    male: "male with sharp geometric haircut, clean-shaven, tailored slim suit, narrow tie, polished shoes, crisp lines, British mod fashion",
    female: "female with geometric bob haircut, dramatic eye makeup, mini dress, go-go boots, bold geometric patterns, mod styling",
    "non-binary": "person with sharp geometric styling, tailored clothing, bold patterns, clean lines, mod fashion"
  }
};

// CRITICAL: Authentic 70s photo quality characteristics
const PHOTO_QUALITY_BASE = `
shot on vintage 35mm camera with Kodak film stock,
soft natural film grain texture,
slightly oversaturated colors typical of 1970s photography,
warm color temperature with golden undertones,
soft focus with natural vignetting,
authentic 1970s yearbook studio lighting setup,
classic portrait composition with centered subject,
period-accurate depth of field,
vintage lens characteristics with slight chromatic aberration,
natural skin texture without digital smoothing
`;

const PHOTOGRAPHY_STYLES = {
  "HyperRealistic-likeness": `${PHOTO_QUALITY_BASE}, professional school photographer quality, sharp focus on eyes, perfect exposure, clean background with subtle gradient`,
  
  "Realistic": `${PHOTO_QUALITY_BASE}, standard yearbook photo quality, good lighting, clear features, slightly softer focus, natural school portrait setup`,
  
  "Stylistic": `${PHOTO_QUALITY_BASE}, artistic school portrait, creative lighting with shadows, vintage photo effects, more dramatic composition, enhanced 70s aesthetic`
};

// Period-specific background and environment details
const SEVENTIES_ENVIRONMENT = `
1970s high school yearbook photo background,
classic school portrait backdrop in muted earth tones or soft blue,
period-accurate studio lighting with warm tungsten bulbs,
typical 1970s yearbook photography composition and framing,
authentic vintage photo paper appearance,
slight yellowing or aging typical of 1970s color photography
`;

export function buildSeventiesPrompt(userGender, selectedStyle, workflowType, styleStrength) {
  // Get base style description
  const baseStyle = STYLE_PROMPTS[selectedStyle]?.[userGender] || STYLE_PROMPTS[selectedStyle]?.["non-binary"] || "";
  
  // Get photography style
  const photoStyle = PHOTOGRAPHY_STYLES[workflowType] || PHOTOGRAPHY_STYLES["HyperRealistic-likeness"];
  
  // Adjust style intensity based on strength
  const styleIntensity = styleStrength > 25 ? "strong authentic" : styleStrength > 15 ? "moderate" : "subtle";
  
  // Build the complete prompt with extreme specificity
  const prompt = `
    ${baseStyle},
    ${styleIntensity} 1970s ${selectedStyle} style,
    ${photoStyle},
    ${SEVENTIES_ENVIRONMENT},
    CRITICAL: preserve exact facial features, bone structure, skin tone, and ethnicity,
    authentic 1970s yearbook portrait pose with slight smile,
    head and shoulders composition typical of school photos,
    direct eye contact with camera,
    no modern elements or anachronisms,
    perfect period authenticity in every detail,
    looks exactly like it was photographed in 1975
  `.replace(/\s+/g, ' ').trim();

  return prompt;
}

// Helper function to get style description
export function getStyleDescription(styleId) {
  return SEVENTIES_STYLES.find(style => style.id === styleId)?.description || "";
}

// Helper function to get all available genders
export const AVAILABLE_GENDERS = ["male", "female", "non-binary"];

// Helper function to get all workflow types
export const WORKFLOW_TYPES = [
  { value: "HyperRealistic-likeness", label: "HyperRealistic" },
  { value: "Realistic", label: "Realistic" },
  { value: "Stylistic", label: "Stylistic" }
];