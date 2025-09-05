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
      label: "🏫 Bayside High Student", 
      value: "savedbythebell", 
      promptDesc: "iconic early 1990s teen sitcom style, standing confidently in bright colorful high school hallways with blue lockers, wearing vibrant preppy guy outfit with bold geometric patterns, oversized colorful windbreaker or letterman varsity jacket, baggy stone-washed jeans, white high-top sneakers, perfectly styled voluminous hair with side part or frosted tips, bright studio TV lighting, cheerful optimistic expression, classic American high school backdrop with trophy cases and bulletin boards, nostalgic 90s teen comedy aesthetic, Saved by the Bell vibes",
      defaultStyle: "Photographic (Default)", 
      styleStrength: 18,
      guidanceScale: 8,
      isPopular: true, // Will show "Popular" badge
      isNew: false,
      isPremium: false,
      isBeta: false,
      isRecommended: false
    },
    {
      label: "🌈 90s Windbreaker", 
      value: "colorblock90s", 
      promptDesc: "authentic early 1990s streetwear style, wearing oversized geometric colorblock windbreaker jacket with bright yellow orange green red pink magenta color sections, dark crew neck t-shirt underneath, silver chain necklace, relaxed confident pose, clean studio lighting, vibrant bold color blocking fashion, retro athletic wear aesthetic, classic 90s track jacket style",
      defaultStyle: "Photographic (Default)", 
      styleStrength: 15,
      guidanceScale: 8,
       isPopular: true, // Will show "Popular" badge
      isNew: false,
      isPremium: false,
      isBeta: false,
      isRecommended: false
    },
    {
      label: "🎸 Grunge Legend",
      value: "grunge",
      promptDesc: "1990s grunge musician portrait, flannel shirt and distressed band tee, long messy hair, moody dark lighting, alternative rock vibe, Seattle grunge aesthetic",
      defaultStyle: "Cinematic",
      styleStrength: 25,
      guidanceScale: 6
    },
    { 
      label: "🧢 Hip Hop Star", 
      value: "hiphop", 
      promptDesc: "authentic 90s hip-hop fashion with baggy jeans, oversized jersey, gold chains, Timberland boots, snapback cap, street photography style", 
      defaultStyle: "Cinematic",
      styleStrength: 15,
      guidanceScale: 7
    },
    { 
      label: "💿 Mall Goth", 
      value: "mallgoth", 
      promptDesc: "mall goth aesthetic, heavy dark eyeliner, band t-shirt, studded leather accessories, moody lighting", 
      defaultStyle: "Enhance",
      styleStrength: 15,
      guidanceScale: 7
    },
    { 
      label: "🏀 Star Athlete", 
      value: "jock", 
      promptDesc: "90s athlete with varsity letterman jacket, athletic wear, Nike sneakers, healthy sporty look, school portrait lighting", 
      defaultStyle: "Photographic (Default)",
      styleStrength: 15,
      guidanceScale: 8
    },
    {
      label: "🎽 Retro Track Star",
      value: "trackstar",
      promptDesc: "90s athletic fashion with bold striped windbreaker jacket, silver chain necklace, soft blue studio background, vibrant colors, nostalgic sportswear styling, VHS texture",
      defaultStyle: "Photographic (Default)",
      styleStrength: 15,
      guidanceScale: 8
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
  label: "💅 Clueless Queen", 
  value: "clueless", 
  promptDesc: "iconic 1995 Clueless movie style, yellow plaid blazer and matching mini skirt set, white button-down shirt, white knee-high socks, black Mary Jane shoes, long straight blonde hair with center part, frosted pink lipstick, minimal natural makeup, holding a small designer handbag, confident wealthy Beverly Hills teenager pose, bright clean studio lighting, exact Cher Horowitz fashion aesthetic from the movie", 
  defaultStyle: "Photographic (Default)",
  styleStrength: 25,
  guidanceScale: 8,
  isNew: true,
},
  // NEW PREPPY ADDITIONS:
  { 
    label: "🏌️ Country Club Kid", 
    value: "countryclub", 
    promptDesc: "affluent 90s country club style with cable knit sweater vest, crisp white button-down shirt, pleated khakis, loafers with tassels, perfectly styled hair with side part", 
    defaultStyle: "Photographic (Default)",
    styleStrength: 20,
    guidanceScale: 7
  },
  { 
    label: "⛵ Yacht Club Member", 
    value: "nautical", 
    promptDesc: "preppy nautical 90s fashion with navy blazer, white dress pants, boat shoes, striped tie, classic New England sailing club aesthetic", 
    defaultStyle: "Photographic (Default)",
    styleStrength: 18,
    guidanceScale: 6
  },
  { 
    label: "🎾 Tennis Academy", 
    value: "tennis", 
    promptDesc: "90s tennis preppy look with polo shirt, tennis skirt or shorts, headband, pristine white sneakers, athletic country club vibe", 
    defaultStyle: "Enhance",
    styleStrength: 16,
    guidanceScale: 7
  },
  { 
    label: "📚 Ivy League Bound", 
    value: "ivyleague", 
    promptDesc: "academic preppy 90s style with argyle sweater, oxford shirt, chino pants, penny loafers, bookish intelligent appearance", 
    defaultStyle: "Photographic (Default)",
    styleStrength: 19,
    guidanceScale: 6
  },
  { 
    label: "🌸 Debutante", 
    value: "debutante", 
    promptDesc: "elegant 90s debutante style with pearl necklace, cashmere cardigan, A-line skirt, Mary Jane shoes, refined Southern charm", 
    defaultStyle: "Cinematic",
    styleStrength: 22,
    guidanceScale: 6
  }
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
      promptDesc: "90s computer enthusiast with thick wireframe glasses, pocket protector, suspenders, tucked-in plaid shirt, and a classic calculator watch. Styled like a professional studio portrait from the 1990s, with authentic period-appropriate hair, clothing, and accessories.", 
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
  label: "🛹 Skater",
  value: "skater",
  promptDesc: "1990s skateboard punk aesthetic with ripped baggy jeans, Thrasher magazine t-shirt, worn-out Vans Old Skool sneakers, backwards baseball cap, chain wallet, defiant expression, authentic street skate culture vibe from the 90s",
  defaultStyle: "Comic book", 
  styleStrength: 15,
  guidanceScale: 6
}
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
