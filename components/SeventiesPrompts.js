// ==============================
// SeventiesPrompts.js (Dazed-and-Confused Vibe — Trademark-safe)
// ==============================

export const SEVENTIES_STYLES = [
  {
    id: "campus-haze",
    label: "Campus Haze",
    value:
      "long relaxed hair, vintage denim jacket or corduroy blazer, loose collared shirt, mellow sun-faded tones, cigarette-in-hand pose optional, dreamy laid-back expression",
    description: "College-town haze, hazy afternoons, retro roadtrip & campus nostalgia"
  },
  {
    id: "disco-glam",
    label: "Disco Glam",
    value:
      "feathered voluminous hair, glossy high-shine blouse or halter, statement jewelry, confident nightclub pose, studio gloss and sparkle, saturated color highlight",
    description: "Nightclub lights, sequins, glamour and movement"
  },
  {
    id: "punk-rebel",
    label: "Punk Rebel",
    value:
      "choppy or bleached hair, worn leather jacket with DIY patches, distressed denim, safety-pin or torn details, direct defiant stare, gritty texture and contrast",
    description: "Raw DIY rebellion, underground edge and attitude"
  },
  {
    id: "glam-performer",
    label: "Glam Performer",
    value:
      "androgynous glam styling, exaggerated makeup and glitter accents, theatrical costume elements, dramatic pose, high-contrast studio lighting, bold colors",
    description: "Stage-ready, theatrical and gender-fluid glam"
  },
  {
    id: "boho-folk",
    label: "Boho Folk",
    value:
      "long flowing hair, layered vintage fabrics, embroidered tops, acoustic instrument or open-road props, warm earth-tone palette, honest relaxed smile",
    description: "Singer-songwriter, natural textures, festival & road-trip warmth"
  },
  {
    id: "preppy-collegiate",
    label: "Preppy Collegiate",
    value:
      "neat flip or side-part hairstyle, collared shirt or sweater-vest, tidy smile, muted classic palette, poised tidy yearbook composition",
    description: "Collegiate neatness and classic portrait polish"
  },
  {
    id: "mod-graphic",
    label: "Mod Graphic",
    value:
      "precise geometric haircut or sharp bob, bold graphic patterns, limited high-contrast palette, editorial makeup (winged liner), confident editorial pose",
    description: "Sharp geometry, bold contrasts, editorial 70s fashion"
  },
  {
    id: "farrah-feathered",
    label: "Farrah Feathered",
    value:
      "iconic feathered layered hair with perfect volume, athletic tan, casual chic outfit, confident all-American smile, soft glamour lighting, Charlie's Angels aesthetic",
    description: "Feathered hair icon, TV heartthrob, all-American charm"
  },
  {
    id: "soul-style",
    label: "Soul Style",
    value:
      "big Afro or cornrows, platform boots, wide-collar shirt, bell-bottom pants, leather coat or jumpsuit, gold chains, confident powerful expression, Blaxploitation aesthetic",
    description: "Afro power, platforms, Shaft and Super Fly vibes"
  },
  {
    id: "roller-disco",
    label: "Roller Disco",
    value:
      "feathered or crimped hair, satin shorts or sparkly outfit, platform roller skates, athletic build, fun energetic smile, colorful disco lighting, Xanadu aesthetic",
    description: "Platform skates, disco fun, roller rink vibes"
  }
];

// Gender-aware prompts to add fidelity; used in prompt builder
export const STYLE_PROMPTS = {
  campus_haze: {
    male:
      "male with long center-parted hair or relaxed shag, worn denim jacket or corduroy blazer, vintage tee or collared shirt, casual slouchy posture, mellow gaze",
    female:
      "female with loose natural waves or layered shag, boho blouse or denim jacket, layered necklaces, sunlit relaxed smile",
    "non-binary":
      "person with mid-length relaxed hair, loose retro layers, neutral-toned accessories, contemplative soft expression"
  },
  disco_glam: {
    male:
      "male with feathered glossy hair, shiny blouse or tailored jacket, statement necklace or chains, confident nightclub pose, slight sheen on skin",
    female:
      "female with voluminous feathered hair, halter or sequined top, bold metallic eyeshadow, long dangling earrings, poised glam smile",
    "non-binary":
      "person with high-shine wardrobe, dramatic makeup accents, theatrical confident pose"
  },
  punk_rebel: {
    male:
      "male with short choppy or bleached hair, studded leather jacket, ripped jeans, visible safety-pins, hardened expression",
    female:
      "female with asymmetrical chopped hair, dark smudged eyeliner, leather or DIY patched jacket, defiant stare",
    "non-binary":
      "person with aggressive punk styling, DIY accessories, gritty confident presence"
  },
  glam_performer: {
    male:
      "male with androgynous theatrical makeup, glitter accents, tailored stage jacket or sequined vest, expressive stage pose",
    female:
      "female with high-glam makeup, glitter or metallic face accents, dramatic costume piece, performance-ready posture",
    "non-binary":
      "person with gender-fluid glam styling, bold stage makeup, striking theatrical expression"
  },
  boho_folk: {
    male:
      "male with long sun-bleached hair, embroidered shirt or loose knit, acoustic guitar or road-trip prop, honest relaxed expression",
    female:
      "female with flowing hair and layered vintage garments, handmade jewelry, soft natural smile",
    "non-binary":
      "person with artisanal layers, natural textures, calm open expression"
  },
  preppy_collegiate: {
    male:
      "male with neat side-part or flip hairstyle, collared shirt or sweater-vest, crisp posture, polite smile",
    female:
      "female with tidy hair and simple jewelry, collared blouse or sweater, composed friendly smile",
    "non-binary":
      "person with tidy collegiate layers, calm poised expression"
  },
  mod_graphic: {
    male:
      "male with precise cropped haircut, clean geometric-patterned shirt or jacket, strong jawline accent, editorial look",
    female:
      "female with sharp bob or geometric haircut, bold patterned dress, dramatic winged liner, editorial confident gaze",
    "non-binary":
      "person with striking geometric styling, monochrome or limited palette clothing, poised editorial expression"
  },
  "farrah-feathered": {
    male:
      "male with perfectly feathered layered hair (Shaun Cassidy style), open-collar shirt, athletic tan, confident teen heartthrob smile",
    female:
      "female with iconic feathered layered hair with volume, athletic sun-kissed tan, casual athletic top, radiant all-American smile",
    "non-binary":
      "person with feathered layered hair, casual chic sporty outfit, confident healthy glow"
  },
  "soul-style": {
    male:
      "male with big natural Afro, platform boots, wide-collar patterned shirt, bell-bottom pants, leather coat, gold chain necklace, powerful confident stance",
    female:
      "female with voluminous Afro or cornrows, bell-bottom jumpsuit, platform heels, large hoop earrings, bold makeup, strong powerful expression",
    "non-binary":
      "person with natural Afro styling, platform footwear, wide-collar outfit, bold confident presence"
  },
  "roller-disco": {
    male:
      "male with feathered hair, satin athletic shorts, platform roller skates, shirtless or tank top, athletic build, fun energetic smile",
    female:
      "female with feathered or crimped hair, sparkly crop top or leotard, short athletic shorts, platform roller skates, playful energetic expression",
    "non-binary":
      "person with feathered hair, colorful athletic outfit, platform roller skates, joyful energetic pose"
  }
};

// Background / scene descriptors for 'scene' mode
export const SEVENTIES_BACKGROUNDS = {
  campus_haze: "sunlit college quad or campus lawn with vintage cars in the distance, postered bulletin boards, laid-back outdoor bench",
  disco_glam: "nightclub interior with mirrored panels, soft haze, colored spotlights and parquet dance floor",
  punk_rebel: "gritty club alley or underground venue with spray-painted walls, band posters and dim practical lighting",
  glam_performer: "theatrical stage with colored gels, risers, and glossy floor, dramatic rim lighting",
  boho_folk: "outdoor festival field or cozy coffeehouse stage with acoustic setup, woven tapestries and warm lantern light",
  preppy_collegiate: "school portrait studio or brick quad with tidy hedges and classic campus banners",
  mod_graphic: "minimal editorial studio with bold patterned backdrop or high-contrast graphic paneling",
  "farrah-feathered": "sun-drenched California beach or bright studio with soft glamour lighting",
  "soul-style": "urban street corner with vintage cars, disco club entrance with neon signs",
  "roller-disco": "colorful roller rink with mirror ball, neon lights, and wooden floor"
};

// Authentic 1970s photo look + photography options
const PHOTO_QUALITY_BASE = `
shot on 35mm film or period consumer SLR, warm amber-yellow film cast, gentle film grain, soft tungsten or natural window lighting,
slight emulsion fade & mild vignetting, softened contrast in highlights, subtle film halation at light sources
`.replace(/\s+/g, " ").trim();

const PHOTOGRAPHY_STYLES = {
  "HyperRealistic-likeness":
    `${PHOTO_QUALITY_BASE}, sharp facial focal plane typical of studio portraits while retaining natural skin texture`,
  Realistic:
    `${PHOTO_QUALITY_BASE}, true-to-era 1970s film character with moderate grain and warm color balance`,
  Stylistic:
    `${PHOTO_QUALITY_BASE}, heightened nostalgic palette with saturated highlights, soft bloom, and vintage film artifacts`
};

// Period environment anchor used in prompt assembly
const SEVENTIES_ENVIRONMENT = `
authentic mid-to-late 1970s scene or portrait setting,
era-appropriate props and signage, no modern logos or devices,
nostalgic film processing characteristics
`.replace(/\s+/g, " ").trim();

// Negative prompt to avoid modern artifacts and anachronisms
export const NEGATIVE_PROMPT = [
  "no smartphones", "no modern watches", "no visible modern logos",
  "no modern eyeglass shapes", "no AirPods", "no modern cars", "no Instagram filters",
  "no ultra-HDR artifacts", "no modern makeup trends"
].join(", ");

// Build function: accepts an options object and returns { prompt, negative_prompt }
export function buildSeventiesPrompt({
  gender = "non-binary",
  styleId = "campus-haze",
  workflowType = "Realistic",
  intensity = "medium",
  sceneMode = "portrait",
  preserveFacialFeatures = true
} = {}) {
  const style = SEVENTIES_STYLES.find((s) => s.id === styleId) || SEVENTIES_STYLES[0];
  const genderSnippet =
    (STYLE_PROMPTS[styleId] && STYLE_PROMPTS[styleId][gender]) || STYLE_PROMPTS[styleId]?.["non-binary"] || style.value;
  const photoStyle = PHOTOGRAPHY_STYLES[workflowType] || PHOTOGRAPHY_STYLES["Realistic"];
  const backgroundText = SEVENTIES_BACKGROUNDS[styleId] || "";

  const intensityDescriptor =
    intensity === "strong"
      ? "strong theatrical 1970s transformation with pronounced period-specific wardrobe and props"
      : intensity === "subtle"
      ? "subtle 1970s accents preserving most contemporary traits"
      : "balanced 1970s styling with clear era cues while preserving identity";

  const photographicNotes =
    intensity === "strong"
      ? "pronounced warm amber film cast, visible grain and halation"
      : intensity === "subtle"
      ? "light vintage film character"
      : "noticeable 1970s film texture and warm color balance";

  const framing =
    sceneMode === "scene"
      ? "medium or full-body composition, include era-appropriate props and visible background elements"
      : "tight head-and-shoulders portrait or yearbook framing, natural expression, direct eye contact";

  const preserveText = preserveFacialFeatures ? "CRITICAL: preserve exact facial features, bone structure, skin tone, and ethnicity; do not alter identity" : "";

  const promptParts = [
    genderSnippet,
    intensityDescriptor,
    photographicNotes,
    photoStyle,
    SEVENTIES_ENVIRONMENT,
    backgroundText,
    framing,
    preserveText,
    "authentic 1970s aesthetic, no modern elements, looks like mid-late 1970s"
  ]
    .filter(Boolean)
    .map((p) => p.trim())
    .join(", ");

  return {
    prompt: promptParts,
    negative_prompt: NEGATIVE_PROMPT
  };
}

// Share captions + hashtag bundles
export const SHARE_DATA = {
  "campus-haze": {
    caption: "Took a detour back to college days — which 70s vibe should I try next?",
    hashtags: ["#70sVibe", "#ThrowbackAI", "#CampusHaze", "#Retro"]
  },
  "disco-glam": {
    caption: "Disco lights and mirror floors — bring the glam back!",
    hashtags: ["#Disco", "#70sGlam", "#ThrowbackAI", "#RetroParty"]
  },
  "punk-rebel": {
    caption: "Channeling that raw underground energy — tag your rebel friend.",
    hashtags: ["#Punk", "#70sStyle", "#ThrowbackAI", "#Rebel"]
  },
  "glam-performer": {
    caption: "Stage-ready glam — which era should I perform next?",
    hashtags: ["#Glam", "#StageStyle", "#ThrowbackAI", "#70s"]
  },
  "boho-folk": {
    caption: "Roadtrip folk vibes — acoustic afternoons and sun-faded denim.",
    hashtags: ["#Boho", "#Folk", "#ThrowbackAI", "#Roadtrip"]
  },
  "preppy-collegiate": {
    caption: "Classic campus portrait — who rocked the sweater-vest?",
    hashtags: ["#Yearbook", "#70sYearbook", "#ThrowbackAI", "#Preppy"]
  },
  "mod-graphic": {
    caption: "Sharp lines and bold graphics — vintage editorial energy.",
    hashtags: ["#Mod", "#GraphicStyle", "#ThrowbackAI", "#70sFashion"]
  },
  "farrah-feathered": {
    caption: "Channeling that iconic feathered hair — Charlie's Angels vibes!",
    hashtags: ["#FarrahHair", "#70sIcon", "#ThrowbackAI", "#Feathered"]
  },
  "soul-style": {
    caption: "Afro power and platform boots — bringing the soul!",
    hashtags: ["#SoulStyle", "#70sAfro", "#ThrowbackAI", "#BlackExcellence"]
  },
  "roller-disco": {
    caption: "Rolling into the weekend like it's 1979!",
    hashtags: ["#RollerDisco", "#70sFun", "#ThrowbackAI", "#Xanadu"]
  }
};

export function getShareData(styleId) {
  return SHARE_DATA[styleId] || { caption: "Which 70s vibe are you?", hashtags: ["#ThrowbackAI", "#70s"] };
}

export const AVAILABLE_GENDERS = ["male", "female", "non-binary"];
export const WORKFLOW_TYPES = [
  { value: "HyperRealistic-likeness", label: "HyperRealistic" },
  { value: "Realistic", label: "Realistic" },
  { value: "Stylistic", label: "Stylistic" }
];

export default SEVENTIES_STYLES;