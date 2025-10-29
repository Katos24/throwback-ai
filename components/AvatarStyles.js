const AVATAR_STYLES = {

  portrait: [
    // ORIGINAL 4 - KEEPING ALL
    { label: "Professional Headshot", value: "professional headshot, corporate style, clean background, business attire" },
    { label: "Artistic Portrait", value: "artistic portrait, dramatic lighting, creative composition, fine art photography style" },
    { label: "Vintage Portrait", value: "vintage portrait, classic photography, sepia tones, timeless elegance" },
    // BEST NEW ADDITIONS - 4 MORE
    { label: "LinkedIn Professional", value: "LinkedIn professional headshot, corporate background, confident smile, business casual attire, high-quality studio lighting" },
  ],

  holiday: [
    // CLASSIC CHRISTMAS MOVIES
    { label: "Christmas Vacation Family", value: "Christmas Vacation style, ugly Christmas sweater, family photo, festive chaos, Griswold family aesthetic, comedic holiday portrait" },
    { label: "Elf Costume", value: "Elf movie style, green elf costume, Santa's workshop, cheerful holiday spirit, Buddy the Elf aesthetic, North Pole magic" },
    { label: "Santa Claus", value: "Santa Claus, red suit, white beard, jolly expression, workshop background, gift sack, ho ho ho Christmas spirit" },
    { label: "Mrs. Claus", value: "Mrs. Claus, festive dress, warm smile, cookie baking, cozy North Pole kitchen, nurturing holiday spirit" },
    { label: "Christmas Elf", value: "Christmas elf, pointed ears, festive outfit, toy workshop, cheerful helper, Santa's assistant aesthetic" },
    { label: "Grinch Style", value: "Grinch style, green fur, mischievous grin, Mount Crumpit, heart growing, reluctant holiday spirit" },
    { label: "Nutcracker", value: "Nutcracker character, toy soldier uniform, ballet aesthetic, Christmas magic, Clara's dream, festive performance" },
    { label: "Ugly Sweater Party", value: "ugly Christmas sweater party, tacky festive sweater, holiday party, eggnog in hand, office party vibes, comedic holiday spirit" },
    { label: "Hallmark Christmas", value: "Hallmark movie style, cozy winter town, romantic holiday, snow falling, small town Christmas magic, wholesome romance" },
  ],

  fantasy: [
    // ORIGINAL 4 - KEEPING ALL
    { label: "Medieval Warrior", value: "medieval fantasy warrior, armor, sword, epic fantasy art style" },
    { label: "Magical Wizard", value: "powerful wizard, magical robes, staff, mystical aura, fantasy art" },
    { label: "Elf Warrior", value: "elegant elven warrior, ethereal beauty, fantasy armor, mystical background" },
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
    // BEST NEW ADDITIONS - 8 MORE
    { label: "Cyberpunk Hacker", value: "cyberpunk hacker, neural implants, holographic interface, matrix code, neon-lit server room, digital ghost aesthetic" },
    { label: "Mech Pilot", value: "mech pilot, cockpit suit, giant robot background, military sci-fi, armored exosuit, anime-inspired mecha" },
    { label: "Space Marine", value: "space marine, powered armor, heavy weapons, military sci-fi, Starship Troopers aesthetic, elite soldier" },
    { label: "Space Bounty Hunter", value: "sci-fi bounty hunter, tactical gear, plasma weapon, gritty spaceport, mercenary aesthetic, lone wolf hunter" },
    { label: "Android", value: "advanced android, synthetic skin, glowing seams, artificial intelligence, humanoid robot, realistic synthetic being" },
    { label: "Wasteland Survivor", value: "post-apocalyptic survivor, makeshift armor, improvised weapons, barren wasteland, Fallout aesthetic, nuclear aftermath" },
    { label: "Starship Captain", value: "starship captain, command uniform, bridge background, leadership presence, Star Trek aesthetic, fleet commander" },
    { label: "Cyborg", value: "augmented human, cybernetic limbs, glowing implants, tech-enhanced body, transhumanism, Deus Ex style" },
  ],

  historical: [
    // TOP WARRIORS (Gaming + Movie Crossover)
    { label: "Samurai Warrior", value: "samurai warrior, traditional armor, katana sword, feudal Japan, bushido code, honor and discipline" },
    { label: "Viking Warrior", value: "viking warrior, fur cloak, battle axe, nordic runes, longship background, Norse mythology aesthetic" },
    { label: "Medieval Knight", value: "medieval knight, full plate armor, castle background, coat of arms, chivalric honor, crusader warrior" },
    { label: "Spartan Warrior", value: "spartan warrior, bronze helmet, red cape, spear and shield, 300 movie aesthetic, ancient Greek soldier" },
    { label: "Pirate Captain", value: "pirate captain, tricorn hat, cutlass sword, ship deck, treasure chest, Caribbean seas, swashbuckling adventure" },
    { label: "Wild West Outlaw", value: "Wild West Outlaw, cowboy/cowgirl attire, dusty frontier town, western aesthetic" },
    { label: "Roman Gladiator", value: "roman gladiator, arena warrior, leather armor, sword and shield, Colosseum background, ancient Rome fighter" },
    { label: "Egyptian Pharaoh", value: "ancient Egyptian pharaoh, gold headdress, royal regalia, throne room, ancient power, god-king aesthetic" },
    { label: "Ninja Assassin", value: "ninja assassin, black outfit, katana and shuriken, rooftop shadows, feudal Japan, stealth warrior aesthetic" },
    { label: "Mongol Warrior", value: "mongol warrior, fur hat, composite bow, horseback rider, steppe landscape, Genghis Khan era, nomadic conqueror" },
  ],

  // ==================== ANIME - DISABLED FOR LAUNCH ====================
  // Uncomment below to enable anime category in the future
  // Remove from categories array in CategoryTabGallery.jsx to fully hide
  
  /* 
  anime: [
    // ORIGINAL 4 - KEEPING ALL
    { label: "Anime Hero", value: "anime style, heroic pose, dynamic lighting, Japanese animation aesthetic" },
    { label: "Kawaii Style", value: "kawaii anime style, cute aesthetic, pastel colors, adorable features" },
    { label: "Dark Anime", value: "dark anime style, dramatic shadows, intense expression, gothic elements" },
    // BEST NEW ADDITIONS - 8 MORE
    { label: "Shonen Hero", value: "shonen anime hero, spiky hair, determined expression, action pose, power aura, Dragon Ball Z style" },
    { label: "Magical Girl", value: "magical girl anime, transformation sequence, sparkles and ribbons, cute costume, Sailor Moon aesthetic" },
    { label: "Mecha Pilot", value: "mecha anime pilot, plugsuit, cockpit setting, giant robot, Evangelion or Gundam style" },
    { label: "Demon Slayer Style", value: "demon slayer style, breathing technique effects, traditional Japanese patterns, Kimetsu no Yaiba aesthetic" },
    { label: "Studio Ghibli", value: "Studio Ghibli style, soft watercolor aesthetic, whimsical atmosphere, Miyazaki-inspired, gentle fantasy" },
  ],
  */
};

export default AVATAR_STYLES;