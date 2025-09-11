const AVATAR_STYLES_DECADES = {
  // 1990s Styles
  nineties: {
    name: "90s Nostalgia",
    description: "Authentic 1990s photo styles and fashion",
    styles: [
      { label: "90s High School Yearbook", value: "90s high school yearbook photo, retro windbreaker jacket, big hair, bright neon colors, soft lighting, vintage Kodak film grain, centered school portrait, cheesy smile, plain background, 1990s fashion aesthetic" },
      { label: "90s Mall Portrait", value: "90s mall portrait studio photo, professional lighting, classic 1990s hairstyle, formal pose, pastel background, shopping mall photo studio aesthetic, vintage film quality" },
      { label: "90s School Dance", value: "90s school dance formal photo, prom or homecoming style, elegant 1990s formal wear, corsage, boutonniere, classic formal pose, gymnasium backdrop, nostalgic school event photography" },
      { label: "90s Graduation Portrait", value: "90s graduation photo, cap and gown, diploma, proud graduate pose, traditional school colors, formal graduation photography, vintage 1990s academic portrait" },
      { label: "90s Class Picture", value: "90s class picture style, seated formal pose, classic school portrait background, traditional school photography lighting, vintage yearbook aesthetic" },
      { label: "90s Sports Team Photo", value: "90s sports team portrait, athletic uniform, school letterman jacket, sports equipment, team photo formation, classic high school athletics photography" },
      { label: "90s Club Photo", value: "90s school club portrait, academic club or extracurricular group, formal group pose, school banner or logo, classic institutional photography" },
      { label: "90s Senior Portrait", value: "90s senior portrait, cap and gown with casual outfit change, outdoor and studio combination, classic senior year photography package style" }
    ]
  },

  // 2000s Styles
  twothousands: {
    name: "2000s Throwback",
    description: "Y2K and early 2000s photo aesthetics",
    styles: [
      { label: "2000s Digital Yearbook", value: "early 2000s digital yearbook photo, frosted tips hairstyle, low-rise fashion, digital camera quality, Y2K aesthetic, millennium school portrait style" },
      { label: "2000s MySpace Profile", value: "2000s MySpace era profile photo, digital camera selfie style, emo or scene fashion, dramatic angles, early social media photography aesthetic" },
      { label: "2000s Flip Phone Camera", value: "early 2000s flip phone camera quality, low resolution, grainy digital photo, nostalgic early mobile photography, authentic 2000s tech limitations" },
      { label: "2000s School Dance", value: "2000s school formal dance photo, millennium fashion trends, digital photography, formal pose with Y2K styling and accessories" },
      { label: "2000s Graduation", value: "2000s graduation portrait, digital photography quality, millennium cap and gown style, early digital camera aesthetic" },
      { label: "2000s Sports Portrait", value: "2000s athletic portrait, digital sports photography, millennium era uniforms and equipment, early 2000s team photo style" },
      { label: "2000s Class Officer", value: "2000s student government or class officer portrait, formal school leadership photo, millennium era student portrait style" },
      { label: "2000s Candid School", value: "2000s candid school photo, hallway or classroom setting, authentic early 2000s student life, digital camera documentary style" }
    ]
  },

  // 1980s Styles
  eighties: {
    name: "80s Retro",
    description: "Radical 1980s photo styles and fashion",
    styles: [
      { label: "80s Yearbook Portrait", value: "1980s high school yearbook photo, big permed hair, bold shoulder pads, neon colors, classic 80s fashion, vintage school portrait lighting" },
      { label: "80s Mall Glamour", value: "1980s mall glamour shot, professional studio lighting, big hair, dramatic makeup, colorful backgrounds, classic 80s portrait photography" },
      { label: "80s Prom Photo", value: "1980s prom portrait, elaborate formal wear, corsage, dramatic poses, classic prom photography with 80s styling and fashion" },
      { label: "80s Class Picture", value: "1980s class portrait, traditional school photography, 80s hairstyles and fashion, classic institutional photography style" },
      { label: "80s Sports Team", value: "1980s sports team photo, retro athletic uniforms, classic team formation, vintage sports photography aesthetic" },
      { label: "80s Senior Portrait", value: "1980s senior portrait, cap and gown with casual outfit, outdoor setting, classic 80s graduation photography" },
      { label: "80s Activity Club", value: "1980s school activity portrait, drama club, band, or academic group, formal club photography with 80s styling" },
      { label: "80s Candid School", value: "1980s candid school photo, authentic classroom or hallway setting, natural 80s student life photography" }
    ]
  },

  // 1970s Styles
  seventies: {
    name: "70s Vintage",
    description: "Far out 1970s photo styles and fashion",
    styles: [
      { label: "70s Yearbook Portrait", value: "1970s high school yearbook photo, feathered hair, earth tone clothing, vintage school portrait with classic 70s styling and photography" },
      { label: "70s Class Picture", value: "1970s class portrait, traditional school photography, 70s hairstyles and fashion, warm vintage color tones" },
      { label: "70s Graduation", value: "1970s graduation portrait, cap and gown, classic graduation pose, vintage academic photography with 70s aesthetic" },
      { label: "70s Sports Portrait", value: "1970s athletic portrait, vintage sports uniforms, classic team photography, retro sports aesthetic" },
      { label: "70s Prom Photo", value: "1970s prom portrait, formal dance attire, classic prom poses, vintage formal photography with 70s styling" },
      { label: "70s School Dance", value: "1970s school dance photo, casual dance attire, authentic 70s student social event photography" },
      { label: "70s Activity Photo", value: "1970s school activity portrait, club or organization photo, formal group photography with 70s styling" },
      { label: "70s Senior Portrait", value: "1970s senior portrait, outdoor and studio combination, classic senior photography with vintage 70s aesthetic" }
    ]
  },

  // 1960s Styles
  sixties: {
    name: "60s Classic",
    description: "Groovy 1960s photo styles and fashion",
    styles: [
      { label: "60s Yearbook Portrait", value: "1960s high school yearbook photo, bouffant hairstyle, mod fashion, classic 60s school portrait photography" },
      { label: "60s Class Picture", value: "1960s class portrait, traditional formal school photography, 60s hairstyles and conservative school attire" },
      { label: "60s Graduation", value: "1960s graduation portrait, traditional cap and gown, formal graduation pose, classic academic photography" },
      { label: "60s Sports Team", value: "1960s sports team photo, vintage athletic uniforms, classic team formation, traditional sports photography" },
      { label: "60s Prom Portrait", value: "1960s prom photo, formal dance attire, classic prom poses, elegant formal photography with 60s styling" },
      { label: "60s Student Council", value: "1960s student government portrait, formal leadership photo, traditional student organization photography" },
      { label: "60s Activity Club", value: "1960s school club portrait, academic or extracurricular group, formal institutional photography" },
      { label: "60s Senior Portrait", value: "1960s senior portrait, traditional graduation photography, classic senior year portrait with 60s aesthetic" }
    ]
  },

  // Modern Yearbook Styles (for comparison)
  modern: {
    name: "Modern Yearbook",
    description: "Contemporary yearbook and school photo styles",
    styles: [
      { label: "Modern Senior Portrait", value: "modern senior portrait, professional digital photography, contemporary fashion, outdoor location, natural lighting" },
      { label: "Modern Yearbook Photo", value: "modern high school yearbook photo, digital photography, contemporary hairstyle and fashion, professional school portrait" },
      { label: "Modern Graduation", value: "modern graduation portrait, digital photography, contemporary cap and gown, professional graduation photography" },
      { label: "Modern Sports Portrait", value: "modern athletic portrait, professional sports photography, contemporary uniforms, dynamic sports lighting" },
      { label: "Modern Class Picture", value: "modern class portrait, digital school photography, contemporary styling, professional institutional photography" },
      { label: "Modern Prom Photo", value: "modern prom portrait, professional formal photography, contemporary formal wear, elegant prom photography" },
      { label: "Modern Activity Photo", value: "modern school activity portrait, digital club photography, contemporary school organization photo" },
      { label: "Modern Candid School", value: "modern candid school photo, natural digital photography, authentic contemporary student life" }
    ]
  }
};

// Helper function to get all decades
export function getAllDecades() {
  return Object.keys(AVATAR_STYLES_DECADES).map(key => ({
    key,
    ...AVATAR_STYLES_DECADES[key]
  }));
}

// Helper function to get styles for a specific decade
export function getDecadeStyles(decade) {
  return AVATAR_STYLES_DECADES[decade] || null;
}

// Helper function to get all styles across all decades
export function getAllDecadeStyles() {
  const allStyles = [];
  Object.keys(AVATAR_STYLES_DECADES).forEach(decade => {
    const decadeData = AVATAR_STYLES_DECADES[decade];
    decadeData.styles.forEach(style => {
      allStyles.push({
        ...style,
        decade,
        decadeName: decadeData.name
      });
    });
  });
  return allStyles;
}

// Function to get popular decade combinations
export function getPopularDecadeCombos() {
  return [
    {
      name: "90s vs 2000s",
      decades: ["nineties", "twothousands"],
      description: "Compare the transition from analog to digital"
    },
    {
      name: "Through the Decades",
      decades: ["sixties", "seventies", "eighties", "nineties"],
      description: "See how yearbook styles evolved over time"
    },
    {
      name: "Retro vs Modern",
      decades: ["eighties", "nineties", "modern"],
      description: "Classic vintage styles compared to today"
    }
  ];
}

export default AVATAR_STYLES_DECADES;