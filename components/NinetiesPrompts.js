// ==============================
// NinetiesPrompts.js (Viral + Detailed)
// ==============================
//
// Expanded, viral-ready 90s presets with gendered details,
// scene vs portrait modes, photography notes, and share captions.
//
// Use buildNinetiesPrompt(userGender, selectedStyle, workflowType, styleStrength, sceneMode)
// to produce a full generation prompt for your image model.
//
// ==============================

// Core 90s presets (character + vibe + short prompt base)
export const NINETIES_STYLES = [
  {
    id: "mall_rat",
    label: "Mall Rat",
    emoji: "🛍️",
    value: "baggy jeans, branded crop hoodie (PacSun/No Fear vibes), frosted tips or chunky highlights, scrunchie or small backpack, pager or Tamagotchi accessory, casual confident stance"
  },
  {
    id: "trl_superstar",
    label: "TRL Superstar",
    emoji: "🎤",
    value: "spiky or gelled hair, butterfly clips or subtle glitter, layered chokers, glossy teen-pop outfit, confident stage smile and hand-wave pose"
  },
  {
    id: "roller_rink",
    label: "Roller Rink Kid",
    emoji: "🛼",
    value: "neon windbreaker or track jacket, high socks/scrunch socks, fanny pack, roller skates, playful grin under disco ball lighting"
  },
  {
    id: "blockbuster",
    label: "Blockbuster Night",
    emoji: "📼",
    value: "oversized hoodie, stacked VHS tapes or movie poster props, popcorn cup, casual lanky posture among rows of rentals"
  },
  {
    id: "yearbook",
    label: "Yearbook Classic",
    emoji: "📸",
    value: "sweater vest or cardigan, stiff polite smile or awkward grin, classic laser-gradient backdrop or cloudy studio gradient"
  },
  {
    id: "skater_punk",
    label: "Skater Punk",
    emoji: "🛹",
    value: "baggy cargo pants or shorts, Vans or skate shoes, chain wallet, band tee layered under hoodie, half-pipe or graffiti backdrop"
  },
  {
    id: "boyband",
    label: "Boy Band / Pop Star",
    emoji: "🎶",
    value: "coordinated satin or denim outfits, frosted tips or styled spikes, synchronized smile or soft smolder, performance-ready pose"
  },
  {
    id: "grunge",
    label: "Grunge Kid",
    emoji: "🎸",
    value: "oversized flannel over band tee, ripped jeans, Doc Martens, messy layered hair, brooding expression in dim garage/coffee shop"
  },
  {
    id: "arcade",
    label: "Arcade Champion",
    emoji: "👾",
    value: "bucket hat or backwards cap, glowing joystick/quarter prop, graphic tee, neon-lit arcade cabinets (Pac-Man / Street Fighter) in background"
  },
  {
    id: "raver",
    label: "Raver / Club Kid",
    emoji: "🎧",
    value: "neon fishnet, bright reflective accessories, kandi bracelets, smiley faces, layered glow-sticks or festival vibes"
  },
  {
    id: "bucket_hat",
    label: "Bucket Hat Casual",
    emoji: "🧢",
    value: "iconic bucket hat, oversized tee or windbreaker, relaxed hands-in-pocket posture, minimal accessories"
  },
  {
    id: "preppy_athlete",
    label: "Preppy Athlete",
    emoji: "🏈",
    value: "sweater tied around shoulders or varsity jacket, polo or team jersey, clean athletic sneakers, approachable smile"
  },
  {
    id: "emo_popunk",
    label: "Pop-Punk / Emo Teen",
    emoji: "🖤",
    value: "black eyeliner, layered dark accessories, band tee + skinny jeans or studded belt, side-swept bangs or dyed tips"
  }
];

// Per-style, per-gender detail (used to build more accurate prompts)
export const STYLE_PROMPTS = {
  "mall_rat": {
    male: "male with frosted highlights or short spiky bangs, oversized PacSun hoodie, baggy jeans, visible pager, casual hands-in-pockets pose",
    female: "female with soft highlights, crop hoodie or butterfly clips, low-rise baggy jeans, mini backpack or scrunchie, playful smile",
    "non-binary": "person with relaxed mall-style layers, mid-length hair with soft highlights, casual branded hoodie and loose jeans"
  },
  "trl_superstar": {
    male: "male with styled spikes or frosted tips, glossy stage jacket, light makeup, confident wave",
    female: "female with butterfly clips or space buns, layered chokers, glossy lip, sparkly top",
    "non-binary": "person with stage-ready glam, light sheen makeup, trendy 90s performance outfit"
  },
  "roller_rink": {
    male: "male with short spiky or bowl cut hair, bright windbreaker, scrunch socks, skates slung over shoulder",
    female: "female with scrunchie ponytail, neon windbreaker, roller skates on feet, joyful smile",
    "non-binary": "person in retro athletic windbreaker, scrunch socks, brass roller skates"
  },
  "blockbuster": {
    male: "male in oversized hoodie, casual stance stacking VHS tapes, slightly messy hair",
    female: "female in vintage movie tee and denim, holding VHS case, friendly grin",
    "non-binary": "person with relaxed hoodie, tote bag full of VHS tapes, curious expression"
  },
  "yearbook": {
    male: "male with neat parted hair or gelled fringe, sweater vest or blazer, polite stiff smile",
    female: "female with glossy hair, blouse or sweater, classic yearbook smile",
    "non-binary": "person with neat retro styling, slightly reserved friendly expression"
  },
  "skater_punk": {
    male: "male with tousled hair, chain wallet, oversized band tee, knee pads or scuffs on shoes",
    female: "female with bandana or beanie, oversized tee, ripped jeans, confident edge",
    "non-binary": "person with skater layers, baggy cargo pants, worn sneakers"
  },
  "boyband": {
    male: "male with frosted tips, coordinated jacket, subtle stage makeup, charming smile",
    female: "female with coordinated girl-group styling, platform shoes, polished hair",
    "non-binary": "person with coordinated pop styling, polished stage look"
  },
  "grunge": {
    male: "male with shoulder-length messy hair, stubble, flannel tied around waist, brooding stance",
    female: "female with messy layered hair, smudged eyeliner, slip dress over tee, combat boots",
    "non-binary": "person with layered flannel, band tee, heavy boots"
  },
  "nickelodeon": {
    male: "male in striped tee and overalls, silly grin, prepping to be slimed",
    female: "female in colorful overalls, playful expression, stage-ready energy",
    "non-binary": "person in colorful vintage kids-TV outfit with playful expression"
  },
  "arcade": {
    male: "male with bucket hat or backwards cap, joystick in hand, slightly competitive smirk",
    female: "female with neon hair clip or bandana, glowing arcade buttons reflected in eyes",
    "non-binary": "person with pixel-era tee and retro accessories, focused playful expression"
  },
  "raver": {
    male: "male with neon facepaint accents, kandi bracelets, mesh top, high-energy pose",
    female: "female with colorful hair clips, neon makeup, festival bracelets, dance-ready posture",
    "non-binary": "person with brightly colored rave accessories and playful grin"
  },
  "bucket_hat": {
    male: "male with relaxed bucket hat, oversized tee, subtle streetwear vibe",
    female: "female with floral or patterned bucket hat, casual tee, effortless smile",
    "non-binary": "person with neutral-tone bucket hat and relaxed retro styling"
  },
  "preppy_athlete": {
    male: "male in varsity jacket or polo with team patch, neat hair, confident posture",
    female: "female with sporty polo and preppy accessories, friendly confident smile",
    "non-binary": "person in preppy athletic layers, neat hair, pleasant expression"
  },
  "emo_popunk": {
    male: "male with side-swept bangs, dyed tips, eyeliner accent, studded belt",
    female: "female with choppy bangs, dark lipstick accent, layered necklaces",
    "non-binary": "person with moody pop-punk styling, dark accessories, introspective expression"
  }
};

// Background scenery (expanded, scene-specific descriptors)
export const NINETIES_BACKGROUNDS = {
  "mall_rat": "neon-lit mall food court, store signage (Spencer's, Hot Topic, KB Toys), tile floors and faux-plants",
  "trl_superstar": "MTV TRL stage in Times Square with crowd barricades, camera rigs, and stage lights",
  "roller_rink": "roller rink interior with disco ball, polished wood floor, neon arcade zone visible",
  "blockbuster": "Blockbuster video aisles with VHS spine rows, poster displays, popcorn cart or promo stand",
  "yearbook": "classic cloudy/laser gradient yearbook backdrop or studio soft gradient with subtle vignetting",
  "skater_punk": "outdoor skate park halfpipe with graffiti, chain-link fences, and spray paint tags",
  "boyband": "studio stage with colored gel lights and glossy floor, or mall mini-concert setup",
  "grunge": "dim garage band rehearsal space with posters, amps, and worn equipment",
  "nickelodeon": "kids TV show stage with slime bucket, colorful set pieces and bold logo elements",
  "arcade": "classic 90s arcade with CRT cabinet glows, neon signage, token machine",
  "raver": "underground club with colored strobes, fog, and neon posters",
  "bucket_hat": "sunny suburban corner or casual boardwalk with 90s storefronts",
  "preppy_athlete": "high school track or stadium with banners and bleachers",
  "emo_popunk": "small club stage with posters and moody colored lighting"
};

// Photo quality base + photography styles (tweakable)
const PHOTO_QUALITY_BASE = `
shot on 35mm film or early consumer point-and-shoot camera,
Kodak Gold 200 or Fujifilm Superia tones with warm highlights and muted shadows,
slight film grain and subtle lens softness,
built-in flash or tungsten studio lighting with occasional glare or red-eye,
matte printed finish, authentic 1990s color palette and film processing artifacts
`.replace(/\s+/g, ' ').trim();

const PHOTOGRAPHY_STYLES = {
  "HyperRealistic-likeness": `${PHOTO_QUALITY_BASE}, sharp facial focus typical of studio portraits, natural skin texture retained`,
  "Realistic": `${PHOTO_QUALITY_BASE}, true-to-era yearbook/casual photo texture with moderate grain and soft contrast`,
  "Stylistic": `${PHOTO_QUALITY_BASE}, nostalgic boost: slightly saturated highlights, film warm cast, light vignetting and subtle haze`
};

// Period environment summary (used in prompts)
const NINETIES_ENVIRONMENT = `
authentic mid-1990s scene or portrait setting,
era-appropriate props and signage (no modern logos),
nostalgic in-camera film characteristics
`.replace(/\s+/g, ' ').trim();

// Negative prompt to avoid modern artifacts and undesired traits
export const NEGATIVE_PROMPT = [
  "no smartphones", "no modern watches", "no modern technology",
  "no 2000s fashion", "no 2010s styling", "no modern makeup trends",
  "no Instagram filters", "no ultra-HD hyperreal studio lighting",
  "no AirPods", "no visible modern logos", "no modern cars"
].join(", ");

// Build function: supports portrait vs scene mode, gender, style strength, and workflow type
// sceneMode: 'portrait' (tight head+shoulders) or 'scene' (half or full body + environment)
export function buildNinetiesPrompt(
  userGender,
  selectedStyle,
  workflowType = "HyperRealistic-likeness",
  styleStrength = 22,
  sceneMode = "portrait" // 'portrait' or 'scene'
) {
  // safe defaults
  const styleObj = NINETIES_STYLES.find(s => s.id === selectedStyle) || NINETIES_STYLES.find(s => s.id === "yearbook");
  const baseStyleText = styleObj?.value || "";
  const genderText = (STYLE_PROMPTS[selectedStyle] && STYLE_PROMPTS[selectedStyle][userGender]) || STYLE_PROMPTS[selectedStyle]?.["non-binary"] || "";
  const photoStyle = PHOTOGRAPHY_STYLES[workflowType] || PHOTOGRAPHY_STYLES["Realistic"];
  const backgroundText = NINETIES_BACKGROUNDS[selectedStyle] || "";

  // intensity descriptors
  const intensityDescriptor = styleStrength >= 45 ? "strong, transformative 1990s styling and wardrobe" :
                              styleStrength >= 30 ? "noticeable 1990s period styling and props" :
                              styleStrength >= 15 ? "moderate 1990s cues and accessories" :
                              "subtle 1990s accents";

  const photographicNotes = styleStrength >= 45 ? "distinct vintage film character with pronounced grain and warm cast" :
                            styleStrength >= 30 ? "clear 90s film texture and tones" :
                            "light nostalgic film cues";

  // framing based on sceneMode
  const framing = sceneMode === "scene"
    ? "medium shot to half-body or full-body composition, include era-appropriate props and background elements"
    : "tight close-up portrait or head-and-shoulders yearbook framing, natural expression, direct eye contact";

  // final prompt assembly
  const promptParts = [
    genderText || baseStyleText,                       // gender-specific description preferred
    baseStyleText && genderText ? "" : baseStyleText, // avoid duplication if genderText already contains base elements
    intensityDescriptor,
    photographicNotes,
    photoStyle,
    NINETIES_ENVIRONMENT,
    backgroundText,
    framing,
    "CRITICAL: preserve exact facial features, bone structure, skin tone, and ethnicity; do not alter identity",
    "authentic 1990s aesthetic, no modern elements, period-accurate styling from 1990-1999"
  ].filter(Boolean).map(p => p.trim()).join(", ");

  return {
    prompt: promptParts,
    negative_prompt: NEGATIVE_PROMPT
  };
}

// Optional: quick helper to return a shorter prompt (e.g., for faster experiments)
export function buildShortPrompt(userGender, selectedStyle) {
  const style = NINETIES_STYLES.find(s => s.id === selectedStyle) || NINETIES_STYLES[0];
  const gender = (STYLE_PROMPTS[selectedStyle] && STYLE_PROMPTS[selectedStyle][userGender]) || "";
  return `${gender || style.value}, 1990s vibe, mid-90s styling, authentic film grain, head and shoulders portrait`;
}

// Share captions + hashtag bundles (use when user shares result to social platforms)
export const SHARE_DATA = {
  mall_rat: {
    caption: "I tried the Mall Rat 90s look — straight out of the food court era. Which 90s vibe should I try next?",
    hashtags: ["#90sKid","#ThrowbackAI","#MallRat","#Nostalgia","#90sFashion"]
  },
  trl_superstar: {
    caption: "TRL energy — who remembers staying up for the countdown? ✨",
    hashtags: ["#TRL","#90sPop","#ThrowbackAI","#90sVibes","#MillennialNostalgia"]
  },
  roller_rink: {
    caption: "Roller rink nights and disco balls. Which decade should I skate back to?",
    hashtags: ["#RollerRink","#90sAesthetic","#ThrowbackAI","#Retro","#Nostalgia"]
  },
  blockbuster: {
    caption: "Friday night at Blockbuster — what movie would you rent?",
    hashtags: ["#Blockbuster","#90sMovies","#ThrowbackAI","#VHS","#90sNight"]
  },
  yearbook: {
    caption: "That classic yearbook vibe. Who else had the awkward laser background?",
    hashtags: ["#Yearbook","#90sYearbook","#ThrowbackAI","#RetroPortrait","#Nostalgia"]
  },
  skater_punk: {
    caption: "Skater punk energy — tag a friend who used to skate all day.",
    hashtags: ["#Skater","#Punk","#ThrowbackAI","#90sStyle","#RetroSkate"]
  },
  boyband: {
    caption: "Which boy band would you join? ✨",
    hashtags: ["#BoyBand","#90sPop","#ThrowbackAI","#ThrowbackChallenge","#Nostalgia"]
  },
  grunge: {
    caption: "Grunge days in the garage. Who remembers mixtapes and flannel?",
    hashtags: ["#Grunge","#90sMusic","#ThrowbackAI","#Nirvana","#90sKids"]
  },
  nickelodeon: {
    caption: "Getting slimed again — Nickelodeon energy activated. 🟢",
    hashtags: ["#Nickelodeon","#Slimed","#ThrowbackAI","#90sTV","#ChildhoodMemories"]
  },
  arcade: {
    caption: "Arcade champion mode. High score or get out of my way. 👾",
    hashtags: ["#Arcade","#RetroGaming","#ThrowbackAI","#90s","#PixelArt"]
  },
  raver: {
    caption: "Rave kid fantasy — emojis, glow, and neon. Which look next?",
    hashtags: ["#Rave","#90sRave","#ThrowbackAI","#FestivalVibes","#RetroScene"]
  },
  bucket_hat: {
    caption: "Bucket hat season — bring back the chill 90s vibes.",
    hashtags: ["#BucketHat","#90sStyle","#ThrowbackAI","#Streetwear","#Nostalgia"]
  },
  preppy_athlete: {
    caption: "Varsity days and preppy vibes. Who was your high school rival?",
    hashtags: ["#Varsity","#Preppy","#ThrowbackAI","#90sSport","#Retro"]
  },
  emo_popunk: {
    caption: "Pop-punk energy — dark eyeliner, loud guitar, big feels.",
    hashtags: ["#PopPunk","#Emo","#ThrowbackAI","#90sMusic","#Scene"]
  }
};

// Helper: get share data fallback
export function getShareData(styleId) {
  return SHARE_DATA[styleId] || { caption: "Which 90s vibe are you?", hashtags: ["#ThrowbackAI","#90s"] };
}

// Export lists for UI population
export const AVAILABLE_GENDERS = ["male", "female", "non-binary"];
export const WORKFLOW_TYPES = [
  { value: "HyperRealistic-likeness", label: "HyperRealistic" },
  { value: "Realistic", label: "Realistic" },
  { value: "Stylistic", label: "Stylistic" }
];

export default NINETIES_STYLES;
