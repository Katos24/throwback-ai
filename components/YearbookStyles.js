// components/YearbookStyles.js
import React from "react";

/**
 * YearbookStyles
 * ---------------
 * This component exports all AI art styles available for selection
 * and the 90s character categories (popular, preppy, quirky, iconic).
 * It can be imported wherever you need the style options in the app.
 */

export const availableStyles = [
  { label: "Photographic (Default)", value: "Photographic (Default)" },
  { label: "Cinematic", value: "Cinematic" },
  { label: "Digital Art", value: "Digital Art" },
  { label: "Fantasy Art", value: "Fantasy art" },
  { label: "Neonpunk", value: "Neonpunk" },
  { label: "Enhance", value: "Enhance" },
  { label: "Comic Book", value: "Comic book" },
  { label: "Disney Character", value: "Disney Character" },
  { label: "Lowpoly", value: "Lowpoly" },
  { label: "Line Art", value: "Line art" },
];

export const styleCategories = {
  popular: [
    { 
      label: "🎸 Grunge Legend", 
      value: "grunge", 
      promptDesc: "moody 1990s grunge portrait, alternative rock musician style, wearing flannel shirt and distressed band t-shirt, long messy hair, dark atmospheric lighting, Seattle grunge scene aesthetic", 
      defaultStyle: "Cinematic",
      styleStrength: 25,
      guidanceScale: 6
    },
    { 
      label: "🧢 Hip Hop Star", 
      value: "hiphop", 
      promptDesc: "authentic 90s hip-hop fashion with baggy jeans, oversized jersey, gold chains, Timberland boots, snapback cap, street photography style", 
      defaultStyle: "Cinematic",
      styleStrength: 22,
      guidanceScale: 6,
      referenceImage: "https://throwbackai.app/images/rap-reference.jpg"
    },
    { 
      label: "💿 Mall Goth", 
      value: "mallgoth", 
      promptDesc: "mall goth aesthetic with black fishnets, heavy dark eyeliner, band t-shirt, studded leather accessories, platform boots, moody lighting", 
      defaultStyle: "Enhance",
      styleStrength: 25,
      guidanceScale: 7
    },
    { 
      label: "🏀 Star Athlete", 
      value: "jock", 
      promptDesc: "90s high school athlete with varsity letterman jacket, athletic wear, Nike sneakers, healthy sporty look, school portrait lighting", 
      defaultStyle: "Photographic (Default)",
      styleStrength: 20,
      guidanceScale: 5
    },
    {
      label: "🎽 Retro Track Star",
      value: "trackstar",
      promptDesc: "90s athletic fashion with bold striped windbreaker jacket, silver chain necklace, voluminous hair, soft blue studio background, vibrant colors, nostalgic sportswear styling, VHS texture",
      defaultStyle: "Photographic (Default)",
      styleStrength: 26,
      guidanceScale: 6
    },
    {
      label: "🏫 Bayside High Student", 
      value: "savedbythebell", 
      promptDesc: "iconic early 1990s teen sitcom style, standing confidently in bright colorful high school hallways with blue lockers, wearing vibrant preppy guy outfit with bold geometric patterns, oversized colorful windbreaker or letterman varsity jacket, baggy stone-washed jeans, white high-top sneakers, perfectly styled voluminous hair with side part or frosted tips, bright studio TV lighting, cheerful optimistic expression, classic American high school backdrop with trophy cases and bulletin boards, nostalgic 90s teen comedy aesthetic, Saved by the Bell vibes",
      defaultStyle: "Photographic (Default)", 
      styleStrength: 18,
      guidanceScale: 5,
    },
    {
      label: "🌈 90s Colorblock King", 
      value: "colorblock90s", 
      promptDesc: "authentic early 1990s streetwear style, wearing oversized geometric colorblock windbreaker jacket with bright yellow orange green red pink magenta color sections, dark crew neck t-shirt underneath, silver chain necklace, tousled messy dark hair, relaxed confident pose, clean studio lighting, vibrant bold color blocking fashion, retro athletic wear aesthetic, classic 90s track jacket style",
      defaultStyle: "Photographic (Default)", 
      styleStrength: 20,
      guidanceScale: 6,
    }
  ],
  preppy: [
    { 
      label: "🧼 Prep School Elite", 
      value: "preppy", 
      promptDesc: "classic preppy 90s style with polo shirt, khaki pants, sweater tied around shoulders, boat shoes, clean-cut appearance", 
      defaultStyle: "Photographic (Default)",
      styleStrength: 18,
      guidanceScale: 5
    },
    { 
      label: "🌸 Sweet Valley High", 
      value: "sweetvalley", 
      promptDesc: "sweet 90s teen fashion with pastel colors, crop top, high-waisted jeans, scrunchies, soft dreamy lighting", 
      defaultStyle: "Fantasy art",
      styleStrength: 20,
      guidanceScale: 6
    },
    { 
      label: "👔 Future CEO", 
      value: "business", 
      promptDesc: "young professional 90s look with blazer, crisp dress shirt, silk tie, perfectly styled hair, confident pose", 
      defaultStyle: "Cinematic",
      styleStrength: 22,
      guidanceScale: 6
    },
  ],
  quirky: [
    { 
      label: "🦄 Lisa Frank Dreamer", 
      value: "lisafrank", 
      promptDesc: "colorful Lisa Frank-inspired 90s fashion with neon rainbow colors, glittery accessories, holographic prints, whimsical styling", 
      defaultStyle: "Digital Art",
      styleStrength: 28,
      guidanceScale: 7
    },
    { 
      label: "📼 Tech Nerd", 
      value: "technerd", 
      promptDesc: "90s computer geek with thick wireframe glasses, pocket protector, suspenders, tucked-in plaid shirt, calculator watch", 
      defaultStyle: "Photographic (Default)",
      styleStrength: 20,
      guidanceScale: 6
    },
    { 
      label: "🎨 Art Class Hero", 
      value: "artsy", 
      promptDesc: "creative 90s artist look with paint-splattered clothes, black beret, bohemian accessories, artistic flair", 
      defaultStyle: "Fantasy art",
      styleStrength: 24,
      guidanceScale: 6
    },
    { 
      label: "🕶️ Skater Kid", 
      value: "skater", 
      promptDesc: "90s skater style with baggy cargo pants, graphic band tee, Vans sneakers, backwards baseball cap, rebellious attitude", 
      defaultStyle: "Comic book",
      styleStrength: 23,
      guidanceScale: 6
    },
  ],
  iconic: [
    { 
      label: "📺 Sitcom Star", 
      value: "sitcom", 
      promptDesc: "90s TV show character style with bright bold patterns, iconic fashion trends, studio lighting, classic American teen look", 
      defaultStyle: "Enhance",
      styleStrength: 25,
      guidanceScale: 7
    },
    { 
      label: "🎤 Pop Princess", 
      value: "popstar", 
      promptDesc: "90s pop star look with sparkly crop top, platform shoes, frosted eyeshadow, bold colorful makeup, stage lighting", 
      defaultStyle: "Neonpunk",
      styleStrength: 27,
      guidanceScale: 7
    },
    { 
      label: "🧙‍♂️ Fantasy Enthusiast", 
      value: "fantasy", 
      promptDesc: "90s fantasy fan with D&D graphic t-shirt, long hair, wireframe glasses, fantasy book accessories, nerdy charm", 
      defaultStyle: "Fantasy art",
      styleStrength: 22,
      guidanceScale: 6
    },
    { 
      label: "🐢 Cartoon Fan", 
      value: "cartoonkid", 
      promptDesc: "90s cartoon-loving kid with animated character t-shirt, colorful accessories, playful styling, bright cheerful lighting", 
      defaultStyle: "Disney Character",
      styleStrength: 24,
      guidanceScale: 6
    },
  ]
};
