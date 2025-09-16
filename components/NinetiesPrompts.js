const NINETIES_STYLES = [
    {
    id: 'teen-sitcom',
    label: "90s Teen Sitcom Star",
    value: "iconic early 1990s teen sitcom style, standing confidently in bright colorful high school hallways with blue lockers, wearing vibrant preppy outfit with bold geometric patterns, oversized colorful windbreaker or letterman varsity jacket, baggy stone-washed jeans, white high-top sneakers, perfectly styled voluminous hair with side part or frosted tips, bright studio TV lighting, cheerful optimistic expression, classic American high school backdrop with trophy cases and bulletin boards, nostalgic 90s teen comedy aesthetic, Saved by the Bell vibes",
    description: "Bright, colorful teen sitcom vibes with varsity jackets and blue lockers",
    emoji: "🏫"
  },
    {
    id: 'high-school-yearbook',
    label: "90s High School Yearbook",
    value: "90s high school yearbook photo, retro windbreaker jacket, big hair, bright neon colors, soft lighting, vintage Kodak film grain, centered school portrait, cheesy smile, plain background, 1990s fashion aesthetic",
    description: "Classic yearbook look with neon windbreaker and big hair",
    emoji: "🎓"
  },
  {
    id: 'mall-goth',
    label: "90s Mall Goth",
    value: "90s mall goth, black eyeliner, dark lipstick, fishnet sleeves, band t-shirt, chunky platform boots, Hot Topic aesthetic, moody lighting, alternative 1990s style",
    description: "Dark eyeliner, band tees, platform boots, moody mall goth vibe",
    emoji: "🖤"
  },
  {
    id: 'hip-hop',
    label: "90s Hip-Hop Style",
    value: "90s hip-hop fashion, baggy jeans, oversized jersey, backwards baseball cap, gold chain, boom box, urban street style, East Coast 90s vibe, grainy film photography",
    description: "Baggy jeans, oversized jersey, gold chain, urban street look",
    emoji: "🎤"
  },
  {
    id: 'grunge',
    label: "90s Grunge Kid",
    value: "90s grunge aesthetic, flannel shirt, ripped jeans, Doc Martens, messy hair, guitar in background, Seattle music scene vibe, authentic 1990s alternative style",
    description: "Flannel, ripped jeans, Doc Martens, messy hair, grunge scene",
    emoji: "🎸"
  },
  {
    id: 'preppy',
    label: "90s Preppy Kid",
    value: "90s preppy style, polo shirt, khaki pants, letterman jacket, perfectly styled hair, country club background, clean-cut All-American 1990s look",
    description: "Polo shirts, letterman jackets, clean-cut preppy teen",
    emoji: "👔"
  },
  {
    id: 'rave',
    label: "90s Rave Kid",
    value: "90s rave culture, neon colors, glow sticks, bucket hat, oversized pants, smiley face accessories, club lighting, underground dance scene aesthetic",
    description: "Neon outfits, glow sticks, dance club vibe",
    emoji: "💿"
  },
  {
    id: 'skater',
    label: "90s Skater",
    value: "90s skater style, baggy shorts, graphic t-shirt, backwards snapback, skateboard, half-pipe background, X-Games era aesthetic, rebellious 1990s youth culture",
    description: "Baggy clothes, snapback, skateboard, X-Games vibe",
    emoji: "🛹"
  },
  {
    id: 'boy-band',
    label: "90s Boy Band Member",
    value: "90s boy band style, frosted tips, leather jacket, chain necklace, dramatic pose, concert stage lighting, teen heartthrob aesthetic, NSYNC/Backstreet Boys era",
    description: "Frosted tips, leather jacket, teen heartthrob pose",
    emoji: "🎶"
  },
  {
    id: 'girl-group',
    label: "90s Girl Group Singer",
    value: "90s girl group style, crop top, low-rise jeans, platform shoes, butterfly hair clips, glossy lips, pop star pose, Spice Girls era aesthetic",
    description: "Pop star outfit, platform shoes, butterfly clips",
    emoji: "🎤"
  },
  {
    id: 'sitcom-character',
    label: "90s Sitcom Character",
    value: "90s family sitcom style, casual home setting, laugh track era fashion, wholesome family values aesthetic, Full House/Fresh Prince vibes",
    description: "Casual home look, sitcom-inspired fashion",
    emoji: "📺"
  },
  {
    id: 'tech-enthusiast',
    label: "90s Tech Enthusiast",
    value: "90s computer nerd, thick glasses, button-up shirt, pocket protector, early internet cafe background, dial-up modem era, tech pioneer aesthetic",
    description: "Glasses, pocket protector, early tech vibes",
    emoji: "💻"
  },
  {
    id: 'cartoon-character',
    label: "90s Cartoon Character",
    value: "90s animated style, bold outlines, bright saturated colors, Nickelodeon/Cartoon Network aesthetic, nostalgic childhood cartoon vibes",
    description: "Bright colors, bold outlines, cartoon aesthetic",
    emoji: "🖍️"
  },
  {
    id: 'video-store-employee',
    label: "90s Video Store Employee",
    value: "90s video rental store, employee vest, surrounded by VHS tapes, movie posters, Blockbuster era nostalgia, weekend night shift vibes",
    description: "VHS store employee, Blockbuster nostalgia",
    emoji: "📼"
  },
  {
    id: 'arcade-gamer',
    label: "90s Arcade Gamer",
    value: "90s arcade setting, quarters in hand, Street Fighter cabinet, neon arcade lighting, competitive gaming culture, pre-internet gaming era",
    description: "Arcade lighting, retro gaming vibes, competitive fun",
    emoji: "🕹️"
  },
  {
    id: 'roller-blader',
    label: "90s Roller Blader",
    value: "90s inline skating, neon rollerblades, safety pads, windbreaker, sunny park setting, extreme sports culture, weekend warrior aesthetic",
    description: "Neon rollerblades, windbreaker, park skating vibes",
    emoji: "🛼"
  }
];

const buildNinetiesPrompt = ({
  gender,
  styleId,
  preserveFacialFeatures = true,
  intensity = 'medium'
}) => {
  const style = NINETIES_STYLES.find(s => s.id === styleId);
  if (!style) return null;

  let prompt = `${gender} ${style.value}`;

  if (preserveFacialFeatures) {
    prompt += ", IMPORTANT: preserve exact facial features, skin tone, ethnicity, and bone structure";
  }

  prompt += ", authentic 1990s photography style with period-accurate lighting and composition";

  switch (intensity) {
    case 'subtle':
      prompt += ", subtle vintage styling maintaining natural appearance";
      break;
    case 'strong':
      prompt += ", bold dramatic 1990s transformation with exaggerated period elements";
      break;
    default:
      prompt += ", balanced vintage styling with authentic 1990s elements";
  }

  return prompt;
};

export { NINETIES_STYLES, buildNinetiesPrompt };
export default NINETIES_STYLES;
