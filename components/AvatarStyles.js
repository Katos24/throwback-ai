const AVATAR_STYLES = {
  portrait: [
    // ORIGINAL 4 - KEEPING ALL
    { label: "Professional Headshot", value: "professional headshot, corporate style, clean background, business attire" },
    { label: "Artistic Portrait", value: "artistic portrait, dramatic lighting, creative composition, fine art photography style" },
    { label: "Vintage Portrait", value: "vintage portrait, classic photography, sepia tones, timeless elegance" },
    { label: "Modern Casual", value: "modern casual portrait, natural lighting, contemporary style, relaxed pose" },
    // BEST NEW ADDITIONS - 4 MORE
    { label: "LinkedIn Professional", value: "LinkedIn professional headshot, corporate background, confident smile, business casual attire, high-quality studio lighting" },
    { label: "Magazine Cover", value: "magazine cover portrait, editorial quality, bold lighting, cover-ready composition, celebrity aesthetic" },
    { label: "Actor Headshot", value: "actor headshot, theatrical lighting, captivating expression, casting-ready portrait, Hollywood style" },
    { label: "Wedding Portrait", value: "elegant wedding portrait, romantic lighting, formal attire, celebration atmosphere, timeless elegance" },
  ],
  
  nineties: [
    // ORIGINAL 15 - KEEPING ALL
    { label: "90s High School Yearbook", value: "90s high school yearbook photo, retro windbreaker jacket, big hair, bright neon colors, soft lighting, vintage Kodak film grain, centered school portrait, plain background, 1990s fashion aesthetic" },
    { label: "90s Mall Goth", value: "90s mall goth, black eyeliner, dark lipstick, fishnet sleeves, band t-shirt, chunky platform boots, Hot Topic aesthetic, moody lighting, alternative 1990s style" },
    { label: "90s Hip-Hop Style", value: "90s hip-hop fashion, baggy jeans, oversized jersey, backwards baseball cap, gold chain, boom box, urban street style, East Coast 90s vibe, grainy film photography" },
    { label: "90s Grunge", value: "90s grunge aesthetic, flannel shirt, ripped jeans, Doc Martens, messy hair, guitar in background, Seattle music scene vibe, authentic 1990s alternative style" },
    { label: "90s Preppy", value: "90s preppy style, polo shirt, khaki pants, letterman jacket, perfectly styled hair, country club background, clean-cut All-American 1990s look" },
    { label: "90s Rave", value: "90s rave culture, neon colors, glow sticks, bucket hat, oversized pants, smiley face accessories, club lighting, underground dance scene aesthetic" },
    { label: "90s Skater", value: "90s skater style, baggy shorts, graphic t-shirt, backwards snapback, skateboard, half-pipe background, X-Games era aesthetic, rebellious 1990s youth culture" },
    { label: "90s Boy Band Member", value: "90s boy band style, frosted tips, leather jacket, chain necklace, dramatic pose, concert stage lighting, teen heartthrob aesthetic, NSYNC/Backstreet Boys era" },
    { label: "90s Girl Group Singer", value: "90s girl group style, crop top, low-rise jeans, platform shoes, butterfly hair clips, glossy lips, pop star pose, Spice Girls era aesthetic" },
    { label: "90s Sitcom Character", value: "90s family sitcom style, casual home setting, laugh track era fashion, wholesome family values aesthetic, Full House/Fresh Prince vibes" },
    { label: "90s Tech Enthusiast", value: "90s computer nerd, thick glasses, button-up shirt, pocket protector, early internet cafe background, dial-up modem era, tech pioneer aesthetic" },
    { label: "90s Cartoon Character", value: "90s animated style, bold outlines, bright saturated colors, Nickelodeon/Cartoon Network aesthetic, nostalgic childhood cartoon vibes" },
    { label: "90s Video Store Employee", value: "90s video rental store, employee vest, surrounded by VHS tapes, movie posters, Blockbuster era nostalgia, weekend night shift vibes" },
    { label: "90s Arcade Gamer", value: "90s arcade setting, quarters in hand, Street Fighter cabinet, neon arcade lighting, competitive gaming culture, pre-internet gaming era" },
    { label: "90s Roller Blader", value: "90s inline skating, neon rollerblades, safety pads, windbreaker, sunny park setting, extreme sports culture, weekend warrior aesthetic" },
    // BEST NEW ADDITIONS - 3 MORE
    { label: "90s Fresh Prince", value: "90s Fresh Prince style, colorful street fashion, backwards cap, Air Jordans, Bel-Air mansion background, iconic 90s hip-hop sitcom vibes" },
    { label: "90s R&B Singer", value: "90s R&B style, silk shirt, medallion necklace, smooth lighting, slow jam aesthetic, Boyz II Men era romance" },
    { label: "90s Saved by the Bell", value: "90s teen sitcom style, bright colors, high school hallway, letterman jacket, scrunchies, quintessential 1990s teen TV aesthetic" },
  ],

  fantasy: [
    // ORIGINAL 4 - KEEPING ALL
    { label: "Medieval Warrior", value: "medieval fantasy warrior, armor, sword, epic fantasy art style" },
    { label: "Magical Wizard", value: "powerful wizard, magical robes, staff, mystical aura, fantasy art" },
    { label: "Elven Noble", value: "elegant elven noble, ethereal beauty, fantasy clothing, mystical background" },
    { label: "Dragon Rider", value: "dragon rider, leather armor, adventurous spirit, fantasy landscape" },
    // BEST NEW ADDITIONS - 8 MORE
    { label: "Dark Sorcerer", value: "dark sorcerer, shadow magic, ominous robes, crackling dark energy, gothic castle background, sinister mystical power" },
    { label: "Paladin Knight", value: "holy paladin, gleaming armor, blessed sword, divine light, righteous warrior, sacred champion" },
    { label: "Battle Mage", value: "battle mage, spellblade, arcane armor, elemental magic, warrior-wizard hybrid, combat sorcery" },
    { label: "Viking Warrior", value: "viking warrior, fur cloak, battle axe, nordic runes, longship background, Norse mythology aesthetic" },
    { label: "Pirate Captain", value: "fantasy pirate captain, tricorn hat, cutlass, treasure map, ship deck, swashbuckling adventure" },
    { label: "Ice Mage", value: "ice mage, frost magic, crystalline staff, snowy landscape, frozen powers, winter sorcery" },
    { label: "Fire Elementalist", value: "fire elementalist, flame magic, burning hands, volcanic background, heat distortion, phoenix companion" },
    { label: "Necromancer", value: "necromancer, death magic, skeletal minions, dark purple energy, graveyard setting, undead master aesthetic" },
  ],

  scifi: [
    // ORIGINAL 4 - KEEPING ALL
    { label: "Cyberpunk Character", value: "cyberpunk character, neon lights, futuristic clothing, urban dystopia" },
    { label: "Space Explorer", value: "space explorer, futuristic spacesuit, cosmic background, sci-fi aesthetic" },
    { label: "Robot Companion", value: "humanoid robot, sleek metallic design, glowing elements, sci-fi technology" },
    { label: "Alien Diplomat", value: "alien diplomat, otherworldly features, formal alien attire, cosmic setting" },
    // BEST NEW ADDITIONS - 8 MORE
    { label: "Cyberpunk Hacker", value: "cyberpunk hacker, neural implants, holographic interface, matrix code, neon-lit server room, digital ghost aesthetic" },
    { label: "Mech Pilot", value: "mech pilot, cockpit suit, giant robot background, military sci-fi, armored exosuit, anime-inspired mecha" },
    { label: "Space Marine", value: "space marine, powered armor, heavy weapons, military sci-fi, Starship Troopers aesthetic, elite soldier" },
    { label: "Bounty Hunter", value: "sci-fi bounty hunter, tactical gear, plasma weapon, gritty spaceport, mercenary aesthetic, lone wolf hunter" },
    { label: "Android", value: "advanced android, synthetic skin, glowing seams, artificial intelligence, humanoid robot, realistic synthetic being" },
    { label: "Wasteland Survivor", value: "post-apocalyptic survivor, makeshift armor, improvised weapons, barren wasteland, Fallout aesthetic, nuclear aftermath" },
    { label: "Starship Captain", value: "starship captain, command uniform, bridge background, leadership presence, Star Trek aesthetic, fleet commander" },
    { label: "Augmented Human", value: "augmented human, cybernetic limbs, glowing implants, tech-enhanced body, transhumanism, Deus Ex style" },
  ],

  historical: [
    // ORIGINAL 4 - KEEPING ALL
    { label: "Victorian Gentleman/Lady", value: "Victorian era, elegant period clothing, formal pose, historical accuracy" },
    { label: "1920s Flapper/Gentleman", value: "1920s style, Art Deco background, period fashion, Jazz Age aesthetic" },
    { label: "Renaissance Noble", value: "Renaissance nobility, rich fabrics, classical pose, period appropriate" },
    { label: "Wild West Character", value: "Wild West, cowboy/cowgirl attire, dusty frontier town, western aesthetic" },
    // BEST NEW ADDITIONS - 8 MORE
    { label: "Ancient Egyptian", value: "ancient Egyptian, pharaoh clothing, gold jewelry, hieroglyphic background, pyramids, classical Egypt aesthetic" },
    { label: "Samurai Warrior", value: "samurai warrior, traditional armor, katana sword, feudal Japan, bushido code, honor and discipline" },
    { label: "Medieval Knight", value: "medieval knight, full plate armor, castle background, coat of arms, chivalric honor, historical crusader" },
    { label: "1950s Greaser", value: "1950s greaser, leather jacket, slicked hair, vintage motorcycle, rebel without a cause, rockabilly style" },
    { label: "1960s Hippie", value: "1960s hippie, peace sign, flower crown, psychedelic colors, Woodstock vibes, counterculture fashion" },
    { label: "1970s Disco", value: "1970s disco, bell bottoms, platform shoes, disco ball lighting, Saturday Night Fever, glam era" },
    { label: "1980s New Wave", value: "1980s new wave, neon colors, geometric patterns, synthesizer aesthetic, MTV era fashion" },
    { label: "Ancient Greek", value: "ancient Greek, toga and sandals, laurel wreath, marble columns, classical Athens, philosopher aesthetic" },
  ],

  anime: [
    // ORIGINAL 4 - KEEPING ALL
    { label: "Anime Hero", value: "anime style, heroic pose, dynamic lighting, Japanese animation aesthetic" },
    { label: "Manga Character", value: "manga style, expressive eyes, stylized features, black and white shading" },
    { label: "Kawaii Style", value: "kawaii anime style, cute aesthetic, pastel colors, adorable features" },
    { label: "Dark Anime", value: "dark anime style, dramatic shadows, intense expression, gothic elements" },
    // BEST NEW ADDITIONS - 8 MORE
    { label: "Shonen Hero", value: "shonen anime hero, spiky hair, determined expression, action pose, power aura, Dragon Ball Z style" },
    { label: "Magical Girl", value: "magical girl anime, transformation sequence, sparkles and ribbons, cute costume, Sailor Moon aesthetic" },
    { label: "Mecha Pilot", value: "mecha anime pilot, plugsuit, cockpit setting, giant robot, Evangelion or Gundam style" },
    { label: "Demon Slayer Style", value: "demon slayer style, breathing technique effects, traditional Japanese patterns, Kimetsu no Yaiba aesthetic" },
    { label: "Studio Ghibli", value: "Studio Ghibli style, soft watercolor aesthetic, whimsical atmosphere, Miyazaki-inspired, gentle fantasy" },
    { label: "Cyberpunk Anime", value: "cyberpunk anime, neon city, tech implants, Ghost in the Shell aesthetic, futuristic Japan" },
    { label: "Chibi Style", value: "chibi anime style, super deformed, big head small body, ultra cute, comedic proportions" },
    { label: "Battle Shonen", value: "battle shonen, power-up transformation, energy blast, intense fight scene, One Piece or Bleach style" },
  ]
};

export default AVATAR_STYLES;