// ==============================
// NinetiesPrompts.js (Viral Core + Backgrounds)
// ==============================

// Core 90s style presets
export const NINETIES_STYLES = [
  { 
    id: 'clueless-prep',
    value: "mid-1990s Beverly Hills prep yearbook photo: plaid skirt suit set, knee-high socks, Mary Janes, mini backpack, glossy hair, confident valley-girl smile",
    label: "Clueless Prep",
    emoji: "💁‍♀️"
  },
  { 
    id: 'hip-hop',
    value: "mid-1990s hip-hop yearbook photo: fade or cornrows, oversized jersey, baggy jeans, Timberlands, gold chain, confident stance",
    label: "Hip-Hop",
    emoji: "🎤"
  },
  { 
    id: 'grunge',
    value: "mid-1990s grunge yearbook photo: messy layered hair, oversized flannel, band tee, ripped jeans, Doc Martens, rebellious expression",
    label: "Grunge",
    emoji: "🎸"
  },
  { 
    id: 'boy-band',
    value: "mid-1990s boy band yearbook photo: frosted tips or gelled spiky hair, coordinated satin or denim outfits, silver chain necklace, charming synchronized smile, polished teen heartthrob aesthetic",
    label: "Boy Band",
    emoji: "🎶"
  },
  { 
    id: 'mall-goth',
    value: "mid-1990s mall goth yearbook photo: dark eyeliner, black lipstick, band tee, fishnet layers, chains, brooding expression",
    label: "Mall Goth",
    emoji: "🖤"
  },
  { 
    id: 'windbreaker',
    value: "mid-1990s colorful windbreaker yearbook photo: oversized nylon jacket with bold geometric color blocks (teal, purple, hot pink, neon green), high-waisted jeans or track pants, chunky sneakers, casual confident expression",
    label: "Colorful Windbreaker",
    emoji: "🧥"
  },
  { 
    id: 'sitcom-casual',
    value: "mid-1990s sitcom casual yearbook photo: layered t-shirt under button-down, relaxed-fit jeans, chunky sneakers, approachable smile, Friends/Seinfeld vibe",
    label: "Sitcom Casual",
    emoji: "📺"
  }
];

// Per-gender style details
const STYLE_PROMPTS = {
  "clueless-prep": {
    male: "male with neat parted hair, pastel sweater vest or blazer, khakis, polished shoes",
    female: "female with plaid skirt suit, knee-high socks, Mary Janes, glossy hair, mini backpack",
    "non-binary": "person with coordinated plaid prep styling, pastel layers, polished accessories"
  },
  "hip-hop": {
    male: "male with fade or cornrows, gold chain, oversized sports jersey, baggy jeans, Timberlands",
    female: "female with high ponytail and baby hairs, hoop earrings, crop top with baggy jeans, Air Force 1s",
    "non-binary": "person with urban hip-hop styling, baggy clothes, bold accessories"
  },
  "grunge": {
    male: "male with shoulder-length messy hair, stubble, oversized flannel, band tee, ripped jeans, Doc Martens",
    female: "female with layered messy hair, smudged eyeliner, oversized flannel, slip dress over tee, combat boots",
    "non-binary": "person with alternative grunge styling, flannel layers, band merchandise, combat boots"
  },
  "boy-band": {
    male: "male with frosted tips or styled spikes, coordinated satin or denim outfit, silver chain necklace, charming synchronized smile",
    female: "female with styled hair or space buns, coordinated girl group outfit, platform shoes",
    "non-binary": "person with coordinated pop styling, trendy 90s fashion, platform accessories"
  },
  "mall-goth": {
    male: "male with dark dyed hair, black eyeliner, band t-shirt, wide-leg black jeans, chains",
    female: "female with dark hair, heavy eyeliner, dark lipstick, fishnet sleeves, band tee, choker",
    "non-binary": "person with dark alternative styling, band merchandise, fishnet layers, chains"
  },
  "windbreaker": {
    male: "male with short spiky or bowl cut hair, oversized colorful windbreaker jacket with bold geometric blocks, high-waisted jeans or track pants, chunky sneakers",
    female: "female with scrunchie ponytail, oversized neon windbreaker, mom jeans or leggings, chunky sneakers, playful smile",
    "non-binary": "person with oversized 90s windbreaker in bright color blocks, casual retro sportswear styling, chunky sneakers"
  },
  "sitcom-casual": {
    male: "male with floppy hair, layered t-shirt under button-down, relaxed-fit jeans, chunky sneakers",
    female: "female with layered casual top, straight-leg jeans, sneakers, approachable smile",
    "non-binary": "person with relaxed sitcom-inspired styling, layered casual clothing, approachable vibe"
  }
};

// Background scenery (lightweight, era-specific)
export const NINETIES_BACKGROUNDS = {
  "clueless-prep": "soft pastel gradient backdrop, lockers or Beverly Hills high school vibe",
  "hip-hop": "graffiti wall, basketball court chain-link fence, urban street corner",
  "grunge": "garage band basement, dingy high school hallway, Seattle coffee shop wall",
  "boy-band": "TRL stage lights, glossy photo studio with colored gels, mall photo booth",
  "mall-goth": "shopping mall atrium, Hot Topic storefront, dim arcade corner",
  "windbreaker": "roller rink neon lights, playground basketball court, suburban park",
  "sitcom-casual": "living room set with plaid couch, school cafeteria backdrop, neutral yearbook gradient"
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

// Period-specific environment
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
  const background = NINETIES_BACKGROUNDS[selectedStyle] || "";

  const intensityDescriptor = styleStrength >= 35 ? "strong mid-1990s transformation" : styleStrength >= 20 ? "moderate period styling" : "subtle period cues";
  const photographicNotes = styleStrength >= 35 ? "pronounced vintage film character" : styleStrength >= 20 ? "noticeable 90s photographic feel" : "light nostalgic character";

  const prompt = [
    baseStyle,
    `${intensityDescriptor}, ${photographicNotes}`,
    photoStyle,
    NINETIES_ENVIRONMENT,
    background,
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
