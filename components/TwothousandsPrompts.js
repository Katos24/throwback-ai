// ==============================
// TwoThousandsPrompts.js (V2 — Viral + Clean)
// ==============================
//
// Compact, production-ready 2000s presets with gendered details,
// scene vs portrait modes, photography notes, negative prompt,
// and share captions for virality.
//
// Use buildTwothousandsPrompt(userGender, styleId, workflowType, styleStrength, sceneMode)
// to produce a generation-ready prompt for your image model.
//
// ==============================

// Core 2000s presets (character + vibe)
export const TWOTHOUSANDS_STYLES = [
  {
    id: "emo",
    label: "Emo",
    emoji: "🖤",
    value:
      "long side-swept hair covering one eye or choppy bangs, heavy dark eyeliner, layered band tee or fitted cardigan, skinny jeans, studded belt, layered bracelets, introspective expression"
  },
  {
    id: "scene",
    label: "Scene Kid",
    emoji: "💖",
    value:
      "big teased or crimped hair with neon streaks, bold colorful eyeshadow and liner, tight graphic tees, skinny jeans, bright accessories (hair bows, layered bracelets), playful high-energy expression"
  },
  {
    id: "pop_punk",
    label: "Pop-Punk",
    emoji: "🎸",
    value:
      "choppy spiky hair with blonde or colored tips, band tee or zip hoodie, skinny jeans or cargo shorts, skate shoes, wristbands, casual confident grin"
  },
  {
    id: "indie_hipster",
    label: "Indie / Low-Key Hipster",
    emoji: "🤓",
    value:
      "carefully messy hair or side-swept fringe, thick-rimmed glasses or beanie, vintage band tee or cardigan, slim jeans, retro accessories, ironic smile"
  },
  {
    id: "preppy",
    label: "Preppy",
    emoji: "👔",
    value:
      "neat side-part or layered bob, polo or sweater-vest, collared shirt, chinos or pleated skirt, clean shoes, polished smile — classic collegiate look"
  },
  {
    id: "cybergoth",
    label: "Cyber-Goth / Raver",
    emoji: "⚡",
    value:
      "synthetic hair extensions or bright accents, glossy or PVC details, platform boots or chunky shoes, neon makeup accents or face gems, futuristic-club energy"
  },
  {
    id: "skater",
    label: "Skater Casual",
    emoji: "🛹",
    value:
      "medium-length relaxed hair, oversized graphic tee or hoodie, baggy jeans or cargo pants, skate shoes, casual relaxed expression, slight scuff on sneakers"
  },
  {
    id: "metrosexual",
    label: "Polished / Metro",
    emoji: "✨",
    value:
      "slicked or perfectly styled hair with gel, fitted designer-casual shirt or jacket, tailored jeans, polished shoes, well-groomed confident posture"
  }
];

// Gender-aware detail snippets used to improve prompt specificity
export const STYLE_PROMPTS = {
  emo: {
    male:
      "male with long side-swept black hair partially covering one eye, dark eyeliner, band tee under fitted jacket, skinny jeans, studded belt, layered wristbands, introspective gaze",
    female:
      "female with choppy layered black hair, heavy eyeliner and smudged shadow, fitted cardigan over band tee, skinny jeans, striped arm warmers, moody expression",
    "non-binary":
      "person with asymmetrical hair, dramatic dark eye makeup, layered alternative clothing, band details, contemplative expression"
  },
  scene: {
    male:
      "male with teased neon-streaked hair, colorful heavy eyeliner, tight graphic tee, skinny jeans, checkerboard or bright accessories, exaggerated energetic expression",
    female:
      "female with big colorful teased hair, bold bright eyeshadow, layered hair clips and bracelets, tight top and skinny jeans, high-energy grin",
    "non-binary":
      "person with vibrant multi-colored teased hair, bright makeup accents, flashy accessories, lively playful expression"
  },
  pop_punk: {
    male:
      "male with choppy spiky hair and subtle blonde highlights, zip hoodie or band tee, skinny jeans, skate shoes, confident casual grin",
    female:
      "female with layered choppy hair with highlights, studded belt, band tee or cropped hoodie, low-rise jeans, cheeky smile",
    "non-binary":
      "person with punk-inflected hair, band merch, casual skater layers, playful defiant look"
  },
  indie_hipster: {
    male:
      "male with carefully messy fringe, thick-rimmed glasses, vintage band tee or cardigan, slim jeans, retro sneakers, slight smirk",
    female:
      "female with soft bangs, oversized glasses or beanie, indie dress or cardigan with band tee, quirky smile",
    "non-binary":
      "person with vintage-inspired accessories, retro layers, subtle ironic expression"
  },
  preppy: {
    male:
      "male with neat side-part hair, collared polo or sweater-vest, chinos or khakis, clean loafers, polite confident smile",
    female:
      "female with straight polished hair, collared blouse or sweater, pleated skirt or neat jeans, modest makeup, tidy smile",
    "non-binary":
      "person with polished preppy layers, clean grooming, pleasant approachable expression"
  },
  cybergoth: {
    male:
      "male with synthetic hair accents or dyed streaks, dark glossy jacket with neon trim, platform boots, dramatic makeup accents, fierce look",
    female:
      "female with bright synthetic extensions, neon face accents or gems, PVC or shiny details, platform shoes, fierce stage-ready pose",
    "non-binary":
      "person with industrial-futuristic styling, neon accents, bold accessories, confident intense expression"
  },
  skater: {
    male:
      "male with medium-length tousled hair, oversized hoodie or tee, baggy jeans, skate shoes, relaxed confident posture",
    female:
      "female with casual hair, loose hoodie or tee, skate pants or shorts, sneakers, easygoing smile",
    "non-binary":
      "person with laid-back skater layers, visible skate shoes, relaxed playful expression"
  },
  metrosexual: {
    male:
      "male with perfectly styled hair (gel/pomade), fitted designer-casual shirt or blazer, slim jeans, polished shoes, poised confident gaze",
    female:
      "female with sleek polished hair, fashionable top and tailored jeans or skirt, refined accessories, poised look",
    "non-binary":
      "person with tailored fashionable clothing, neat grooming, confident modern-yet-2000s vibe"
  }
};

// Scene / environment cues mapped to style ids
export const TWOTHOUSANDS_BACKGROUNDS = {
  emo: "dim club or small venue with band posters and string lights, bedroom poster wall with cassette tapes and band stickers",
  scene: "brightly decorated bedroom or photo booth with neon posters and fluffy accessories, colorful party backdrop",
  pop_punk: "house party living room with band posters, skateboard or amp in background",
  indie_hipster: "cozy coffee shop corner or small indie venue with posters and warm lighting",
  preppy: "school hallway or college quad with banners, neat lockers or brick campus backdrop",
  cybergoth: "underground club or rave with strobes and neon signage, industrial set pieces",
  skater: "outdoor skatepark with graffiti, chain-link fence and ramps",
  metrosexual: "urban street corner or stylish bar exterior with clean modern signage"
};

// Early-2000s photo aesthetic base + photography styles
const PHOTO_QUALITY_BASE = `
shot on early consumer digital camera (approx 2-6MP),
slight digital noise and JPEG compression artifacts,
mild auto-white-balance tint (cool or warm cast), occasional built-in flash or indoor tungsten tint,
soft focus with small pixelation, typical 2000s school portrait framing
`.replace(/\s+/g, " ").trim();

const PHOTOGRAPHY_STYLES = {
  "HyperRealistic-likeness":
    `${PHOTO_QUALITY_BASE}, sharp facial focus typical of studio portraits, preserve natural skin texture`,
  Realistic: `${PHOTO_QUALITY_BASE}, true-to-era early-digital texture with moderate compression and contrast`,
  Stylistic: `${PHOTO_QUALITY_BASE}, early-digital aesthetic with playful color casts, light vignetting, and mild halation`
};

// Environment summary used in prompts
const TWOTHOUSANDS_ENVIRONMENT = `
authentic early-2000s portrait or scene setting,
era-appropriate props and signage (no modern logos),
nostalgic early-digital camera characteristics
`.replace(/\s+/g, " ").trim();

// Negative prompt: avoid modern artifacts, logos, and anachronisms
export const NEGATIVE_PROMPT = [
  "no smartphones", "no modern smartwatches", "no modern brand logos", "no modern eyeglass shapes",
  "no AirPods", "no modern cars", "no ultra-hd hyperreal lighting", "no modern makeup trends", "no Instagram-style filters"
].join(", ");

// Build function supporting portrait vs scene, gender, and strength tuning
// sceneMode: 'portrait' (head+shoulders) or 'scene' (half/full body + background)
export function buildTwothousandsPrompt(
  userGender,
  selectedStyle,
  workflowType = "Realistic",
  styleStrength = 20,
  sceneMode = "portrait" // 'portrait' or 'scene'
) {
  const styleObj = TWOTHOUSANDS_STYLES.find((s) => s.id === selectedStyle) || TWOTHOUSANDS_STYLES[0];
  const baseStyle = styleObj?.value || "";
  const genderText =
    (STYLE_PROMPTS[selectedStyle] && STYLE_PROMPTS[selectedStyle][userGender]) ||
    STYLE_PROMPTS[selectedStyle]?.["non-binary"] ||
    "";
  const photoStyle = PHOTOGRAPHY_STYLES[workflowType] || PHOTOGRAPHY_STYLES["Realistic"];
  const backgroundText = TWOTHOUSANDS_BACKGROUNDS[selectedStyle] || "";

  const intensityDescriptor =
    styleStrength >= 40
      ? "strong, era-authentic 2000s styling and wardrobe"
      : styleStrength >= 25
      ? "noticeable early-2000s styling and accessories"
      : "subtle early-2000s cues";

  const photographicNotes =
    styleStrength >= 40
      ? "pronounced early-digital compression and color cast"
      : styleStrength >= 25
      ? "clear early-digital camera texture and mild compression"
      : "light early-digital character";

  const framing =
    sceneMode === "scene"
      ? "medium or full-body composition, include era-appropriate props and visible background elements"
      : "tight close-up portrait or head-and-shoulders yearbook framing, natural or slight smile, direct eye contact";

  // Use genderText if available to make prompt more specific
  const primaryText = genderText || baseStyle;

  const promptParts = [
    primaryText,
    intensityDescriptor,
    photographicNotes,
    photoStyle,
    TWOTHOUSANDS_ENVIRONMENT,
    backgroundText,
    framing,
    "CRITICAL: preserve exact facial features, bone structure, skin tone, and ethnicity; do not alter identity",
    "authentic early-2000s aesthetic, no modern elements, looks like 2000-2006"
  ]
    .filter(Boolean)
    .map((p) => p.trim())
    .join(", ");

  return {
    prompt: promptParts,
    negative_prompt: NEGATIVE_PROMPT
  };
}

// Quick helper for experiments
export function buildShortPrompt(userGender, selectedStyle) {
  const style = TWOTHOUSANDS_STYLES.find((s) => s.id === selectedStyle) || TWOTHOUSANDS_STYLES[0];
  const gender = (STYLE_PROMPTS[selectedStyle] && STYLE_PROMPTS[selectedStyle][userGender]) || "";
  return `${gender || style.value}, early-2000s vibe, early-digital camera texture, head-and-shoulders portrait`;
}

// Share captions + hashtag bundles tuned for millennial virality
export const SHARE_DATA = {
  emo: {
    caption: "Tried the early-2000s emo look — full feels. Which style next?",
    hashtags: ["#2000sKid", "#Emo", "#ThrowbackAI", "#Nostalgia"]
  },
  scene: {
    caption: "Scene kid energy activated. Who remembers the bright hair and band bracelets?",
    hashtags: ["#SceneKid", "#2000s", "#ThrowbackAI", "#Nostalgia"]
  },
  pop_punk: {
    caption: "Pop-punk vibes — now where's my skateboard?",
    hashtags: ["#PopPunk", "#2000sAesthetic", "#ThrowbackAI", "#Retro"]
  },
  indie_hipster: {
    caption: "Low-key indie vibes. Coffee, cassette mixtapes, and that slightly ironic smile.",
    hashtags: ["#Indie", "#2000s", "#ThrowbackAI", "#RetroStyle"]
  },
  preppy: {
    caption: "Preppy days — who rocked sweater vests in school?",
    hashtags: ["#Preppy", "#2000sYearbook", "#ThrowbackAI", "#Nostalgia"]
  },
  cybergoth: {
    caption: "Futuristic club look — neon accents and platform boots. Which look should I try next?",
    hashtags: ["#Rave", "#CyberGoth", "#ThrowbackAI", "#2000s"]
  },
  skater: {
    caption: "Skater casual — tag a friend you used to skate with.",
    hashtags: ["#Skater", "#2000sStyle", "#ThrowbackAI", "#RetroSkate"]
  },
  metrosexual: {
    caption: "Polished and ready — the metro look for the early 2000s.",
    hashtags: ["#2000sFashion", "#Metro", "#ThrowbackAI", "#Retro"]
  }
};

// Helper to get share data
export function getShareData(styleId) {
  return SHARE_DATA[styleId] || { caption: "Which 2000s vibe are you?", hashtags: ["#ThrowbackAI", "#2000s"] };
}

// Exports for UI
export const AVAILABLE_GENDERS = ["male", "female", "non-binary"];
export const WORKFLOW_TYPES = [
  { value: "HyperRealistic-likeness", label: "HyperRealistic" },
  { value: "Realistic", label: "Realistic" },
  { value: "Stylistic", label: "Stylistic" }
];

export default TWOTHOUSANDS_STYLES;
