// ==============================
// NinetiesPrompts.js (Yearbook Format Only)
// ==============================
// All styles are yearbook photos with different character types

export const NINETIES_STYLES = [
  {
    id: "classic",
    label: "Classic Yearbook",
    emoji: "📸",
    value: "90s high school yearbook photo, sweater vest or cardigan, neat parted hair, polite smile, classic laser-gradient backdrop, soft studio lighting, vintage Kodak film grain, centered portrait, 1990s fashion"
  },
  {
    id: "mall_rat",
    label: "Mall Rat",
    emoji: "🛍️",
    value: "90s high school yearbook photo, baggy branded hoodie, PacSun or No Fear logo, frosted tips or chunky highlights, casual confident smile, laser-gradient backdrop, soft studio lighting, vintage film grain, 1990s mall culture aesthetic"
  },
  {
    id: "grunge",
    label: "Grunge Kid",
    emoji: "🎸",
    value: "90s high school yearbook photo, flannel shirt over band tee, messy layered hair, Doc Martens visible, subtle smirk, laser-gradient backdrop, soft studio lighting, vintage film grain, Seattle alternative 1990s style"
  },
  {
    id: "skater",
    label: "Skater",
    emoji: "🛹",
    value: "90s high school yearbook photo, graphic skateboard brand tee, backwards snapback or beanie, chain wallet visible, relaxed smile, laser-gradient backdrop, soft studio lighting, vintage film grain, X-Games era 1990s youth culture"
  },
  {
    id: "preppy",
    label: "Preppy",
    emoji: "🎾",
    value: "90s high school yearbook photo, polo shirt or varsity jacket, perfectly styled hair, clean-cut appearance, confident smile, laser-gradient backdrop, soft studio lighting, vintage film grain, All-American 1990s preppy aesthetic"
  },
  {
    id: "pop_star",
    label: "Pop Star",
    emoji: "🎤",
    value: "90s high school yearbook photo, shiny coordinated outfit, frosted tips or butterfly clips, glossy makeup, bright confident smile, laser-gradient backdrop, soft studio lighting, vintage film grain, teen pop NSYNC Spice Girls era aesthetic"
  },
  {
    id: "goth",
    label: "Goth / Alternative",
    emoji: "🖤",
    value: "90s high school yearbook photo, black band tee, dark eyeliner, dyed hair tips or side-swept bangs, subtle serious expression, laser-gradient backdrop, soft studio lighting, vintage film grain, Hot Topic mall goth 1990s alternative style"
  },
  {
    id: "jock",
    label: "Jock / Athlete",
    emoji: "🏈",
    value: "90s high school yearbook photo, letterman jacket or team jersey, athletic neat hair, approachable confident smile, laser-gradient backdrop, soft studio lighting, vintage film grain, 1990s high school sports culture"
  },
  {
    id: "raver",
    label: "Raver",
    emoji: "🎧",
    value: "90s high school yearbook photo, neon windbreaker or bucket hat, colorful accessories, kandi bracelets, playful grin, laser-gradient backdrop, soft studio lighting, vintage film grain, 1990s underground rave scene aesthetic"
  },
  {
    id: "nerd",
    label: "Tech Nerd",
    emoji: "💾",
    value: "90s high school yearbook photo, button-up shirt, pocket protector, thick glasses, neat parted hair, awkward polite smile, laser-gradient backdrop, soft studio lighting, vintage film grain, early internet era tech enthusiast 1990s style"
  },
  {
    id: "hip_hop",
    label: "Hip-Hop Kid",
    emoji: "🎤",
    value: "90s high school yearbook photo, oversized jersey or baggy shirt, backwards baseball cap, gold chain, confident expression, laser-gradient backdrop, soft studio lighting, vintage film grain, East Coast 1990s hip-hop culture"
  },
  {
    id: "scene",
    label: "Theater / Drama Kid",
    emoji: "🎭",
    value: "90s high school yearbook photo, expressive artsy outfit, creative hair styling, theatrical expression, laser-gradient backdrop, soft studio lighting, vintage film grain, 1990s drama club aesthetic"
  }
];

// Build function with consistency improvements
export function buildNinetiesPrompt(userGender, selectedStyle, workflowType, styleStrength) {
  const styleObj = NINETIES_STYLES.find(s => s.id === selectedStyle) || NINETIES_STYLES[0];
  
  // Add consistency elements
  const consistentPrompt = [
    "high quality professional portrait photograph",
    styleObj.value,
    "frontal view, facing camera directly",
    "centered composition, head and shoulders framing",
    "direct eye contact with camera",
    "even lighting on face",
    "sharp focus, clear facial features"
  ].join(", ");
  
  // Enhanced negative prompt for consistency
  const negativePrompt = [
    "modern technology", "smartphones", "2000s fashion", "2010s fashion",
    "modern logos", "AirPods", "Instagram filters", "modern watches",
    "blurry", "low quality", "distorted face", "multiple faces",
    "side profile", "turned head", "looking away from camera",
    "uneven lighting", "shadows on face", "profile view",
    "modern hairstyles", "modern makeup trends"
  ].join(", ");
  
  return {
    prompt: consistentPrompt,
    negative_prompt: negativePrompt
  };
}

export default NINETIES_STYLES;