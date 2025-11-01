// components/avatar/videoStyles.js

const VIDEO_STYLES = {
  portrait: [
    { 
      label: "Professional Confidence", 
      prompt: "Animate the uploaded professional portrait. Begin with the person standing still in their business attire. Slowly add subtle motion: a confident slight nod, natural breathing movement in shoulders, eyes blinking naturally. Hair gently moves as if from air conditioning. Background softly bokeh shifts. The person's expression transitions from neutral to a warm professional smile. Add natural office lighting that subtly shifts. Camera slowly zooms in on face. Resolution: 480p. Style: realistic corporate photography.",
      credits: 150 
    },
    { 
      label: "Artistic Movement", 
      prompt: "Animate the uploaded artistic portrait. Begin with dramatic still pose. Slowly introduce motion: fabric of clothing ripples elegantly, hair flows as if caught in gentle breeze. Dramatic shadows shift across face creating depth. Eyes reflect changing light. Background elements subtly blur and shift focus. Person's head turns slightly revealing profile. Cinematic lighting transitions from one angle to another. Slow camera orbit around subject. Resolution: 480p. Style: fine art photography with painterly quality.",
      credits: 150 
    },
    { 
      label: "Vintage Revival", 
      prompt: "Animate the uploaded vintage-style portrait. Begin with classic still pose in sepia tones. Slowly add period-appropriate motion: slight postural shift as if sitting for long exposure, clothing fabric settles naturally. Film grain subtly moves across frame. Light flickers like old photography lamps. Person's expression softens with barely perceptible smile. Background details emerge from shadows. Add vintage camera vignette that pulses gently. Nostalgic film quality throughout. Resolution: 480p. Style: classic 1920s photography aesthetic.",
      credits: 150 
    },
  ],

  holiday: [
    { 
      label: "Santa's Jolly Laugh", 
      prompt: "Animate the uploaded Santa Claus portrait. Begin with Santa standing in his red suit. Slowly build motion: belly begins to shake with laughter, shoulders bounce rhythmically. White beard moves naturally with each 'ho ho ho'. Eyes twinkle with Christmas magic. Red suit fabric ripples. Snow falls gently in background. Christmas lights twinkle and glow warmly. Candy canes and presents subtly shift in background. Camera zooms into Santa's joyful face. Resolution: 480p. Style: festive Coca-Cola Christmas advertising.",
      credits: 150 
    },
    { 
      label: "Elf Workshop Magic", 
      prompt: "Animate the uploaded Christmas elf in costume. Begin with elf standing in Santa's workshop. Slowly add playful motion: elf bounces excitedly on toes, pointed ears twitch with excitement. Green costume bells jingle with movement. Hands gesture toward toy-making tools that glow. Background workshop machinery moves with mechanical precision. Snowflakes drift past windows. Magic sparkles emanate from toy construction. Camera follows elf's energetic movements. Resolution: 480p. Style: whimsical North Pole animation.",
      credits: 150 
    },
    { 
      label: "Grinch Transformation", 
      prompt: "Animate the uploaded Grinch-style character on Mount Crumpit. Begin with mischievous grin. Slowly show transformation: expression shifts from grumpy to thoughtful. Green fur ruffles in mountain wind. Eyes widen with realization. Heart glows through chest growing larger. Snow swirls around character. Whoville lights twinkle in valley below. Character's posture straightens with redemption. Camera pulls back revealing full transformation. Resolution: 480p. Style: Dr. Seuss cinematic adaptation.",
      credits: 150 
    },
  ],

  fantasy: [
    { 
      label: "Wizard Spell Casting", 
      prompt: "Animate the uploaded wizard portrait in mystical robes. Begin with wizard standing still holding ancient staff. Slowly build magical motion: robes begin billowing with arcane energy, staff glows intensifying to brilliant light. Hands trace complex runic patterns in air leaving glowing trails. Eyes illuminate with magical power. Long beard flows with energy waves. Mystical symbols orbit around wizard. Background reality warps with spell energy. Lightning crackles between fingers. Camera circles wizard during incantation. Resolution: 480p. Style: epic fantasy cinematic magic.",
      credits: 150 
    },
    { 
      label: "Warrior Battle Stance", 
      prompt: "Animate the uploaded medieval warrior in full armor. Begin with warrior standing at rest. Slowly transition to combat: warrior shifts into heroic battle stance, armor plates shift and gleam. Weapon draws from sheath with metallic ring. Cape billows dramatically in wind. Muscles tense showing combat readiness. Eyes narrow with determination. Battle scars on armor catch light. Background castle banners wave. Storm clouds gather overhead. Camera moves to low heroic angle. Resolution: 480p. Style: Lord of the Rings epic cinematography.",
      credits: 150 
    },
    { 
      label: "Dragon Rider Launch", 
      prompt: "Animate the uploaded dragon rider in leather armor. Begin with rider standing on cliff edge. Slowly build anticipation: rider adjusts riding gear and harness. Wind intensifies blowing hair and clothing wildly. Dragon shadow passes overhead. Rider looks up with excitement. Boots brace against rocky ground. Background shows massive dragon wings unfurling. Sky fills with swirling clouds. Rider leaps preparing for dragon mount. Camera follows upward motion. Resolution: 480p. Style: How to Train Your Dragon epic scale.",
      credits: 150 
    },
    { 
      label: "Elf Archer Precision", 
      prompt: "Animate the uploaded elven warrior with ethereal beauty. Begin with elf standing in mystical forest. Slowly show ranger skills: elf gracefully draws enchanted bow, arrows glow with magical energy. Pointed ears twitch hearing distant sounds. Hair flows like silk in breeze. Eyes focus with supernatural precision. Leather armor creaks softly. Ancient elvish runes on bow illuminate. Forest background responds to elf presence with glowing flora. Camera tracks bow draw to full extension. Resolution: 480p. Style: Legolas cinematic archery.",
      credits: 150 
    },
    { 
      label: "Dark Sorcerer Power", 
      prompt: "Animate the uploaded dark sorcerer in ominous robes. Begin in shadowy gothic castle. Slowly channel dark power: hands crackle with purple shadow magic, eyes glow menacingly red. Dark robes swirl with supernatural force. Shadows writhe around sorcerer like living entities. Ancient grimoire pages flutter with dark energy. Candles flicker casting dancing shadows. Stone gargoyles seem to shift in background. Thunder rumbles ominously. Camera slowly zooms on glowing eyes. Resolution: 480p. Style: dark fantasy gothic horror.",
      credits: 150 
    },
    { 
      label: "Paladin Divine Light", 
      prompt: "Animate the uploaded holy paladin in gleaming armor. Begin with paladin kneeling in prayer. Slowly reveal divine power: golden holy light emanates from body, blessed sword glows with righteous energy. Armor reflects divine radiance. Sacred symbols on shield pulse with power. Wings of light manifest behind paladin. Healing aura ripples outward. Temple pillars in background illuminate. Heavenly light beams down from above. Camera rises showing full divine majesty. Resolution: 480p. Style: World of Warcraft cinematic paladin.",
      credits: 150 
    },
  ],

  scifi: [
    { 
      label: "Space Bounty Hunter Scan", 
      prompt: "Animate the uploaded image of a space bounty hunter in tactical armor. Begin with the character standing still in the desert-like environment. Slowly add motion: the bounty hunter's cloak flutters in the wind, subtle dust particles swirl around their boots, and their weapon emits a soft glow. The character turns their head slightly to scan the horizon. In the background, faint silhouettes of alien structures shimmer with heat distortion. Add cinematic lighting and a slow camera zoom-in. Resolution: 480p. Style: realistic sci-fi.",
      credits: 150 
    },
    { 
      label: "Cyberpunk Neural Link", 
      prompt: "Animate the uploaded cyberpunk hacker with neural implants. Begin in neon-lit server room. Slowly activate tech: neural implants illuminate sequentially along spine and skull. Holographic interfaces materialize around hacker projected from cyber eyes. Fingers dance across invisible keyboards creating data streams. Matrix-style code cascades in background. Neon signs flicker reflecting off metallic augmentations. Electric current pulses through cybernetic limbs. Camera rotates showing full cyberware integration. Resolution: 480p. Style: Blade Runner 2049 cyberpunk aesthetic.",
      credits: 150 
    },
    { 
      label: "Mech Pilot Activation", 
      prompt: "Animate the uploaded mech pilot in cockpit suit. Begin inside mecha cockpit. Slowly power up sequence: pilot suit panels illuminate with tech readouts, helmet HUD activates displaying targeting systems. Hands grip control sticks triggering mech response. Background mecha cockpit comes alive with glowing displays. Neural link cable pulses with data. Giant robot exterior visible through monitors beginning movement sequence. Warning lights flash amber to green. Camera zooms through cockpit glass. Resolution: 480p. Style: Pacific Rim mecha anime.",
      credits: 150 
    },
    { 
      label: "Space Marine Combat Ready", 
      prompt: "Animate the uploaded space marine in powered armor. Begin in starship hangar bay. Slowly engage combat mode: heavy armor servos activate with mechanical sounds, weapon systems online with targeting lasers. Helmet visor slides down with HUD activation. Shoulder-mounted guns rotate into position. Power armor glows with energy cells charging. Background drop pod opens with steam. Squad mates visible preparing for deployment. Camera shakes with armor weight. Resolution: 480p. Style: Warhammer 40k Astartes cinematic.",
      credits: 150 
    },
    { 
      label: "Android Awakening", 
      prompt: "Animate the uploaded advanced android with synthetic skin. Begin powered down in laboratory. Slowly boot up sequence: eyes illuminate with artificial intelligence awakening, synthetic skin panels separate showing glowing circuitry beneath. Mechanical joints articulate smoothly testing range of motion. Holographic diagnostics scan entire body. Background lab equipment monitors vital signs. LED seams pulse with data transfer. Android gains consciousness with human-like realization. Camera circles examining synthetic perfection. Resolution: 480p. Style: Ex Machina realistic AI.",
      credits: 150 
    },
    { 
      label: "Wasteland Survivor Alert", 
      prompt: "Animate the uploaded post-apocalyptic survivor in makeshift armor. Begin in barren radioactive wasteland. Slowly detect threat: survivor's head snaps toward distant sound, hand moves to improvised weapon. Tattered clothing and armor plates shift with tense movement. Dust storm approaches in background. Geiger counter clicks increasingly rapid. Gas mask filters activate. Rusted metal scraps blow past. Radiation signs flicker. Camera follows survivor's vigilant gaze across desolate horizon. Resolution: 480p. Style: Fallout apocalyptic realism.",
      credits: 150 
    },
  ],

  historical: [
    { 
      label: "Samurai Honor Draw", 
      prompt: "Animate the uploaded samurai warrior in traditional armor. Begin in meditation stance. Slowly perform iaido: samurai rises from seiza position with fluid grace, hand moves to katana handle. Cherry blossoms drift past on wind. Armor plates shift showing craftsmanship. Eyes focus with bushido discipline. Katana draws from saya in perfect arc catching sunlight. Background dojo sliding doors reveal mountain landscape. Camera follows blade trajectory. Resolution: 480p. Style: Kurosawa samurai film cinematography.",
      credits: 150 
    },
    { 
      label: "Viking War Cry", 
      prompt: "Animate the uploaded viking warrior with fur cloak and battle axe. Begin on longship prow. Slowly build battle rage: viking raises battle axe overhead, chest expands for massive war cry. Fur cloak whips wildly in sea wind. Beard braids swing with violent movement. Nordic tattoos seem to glow with berserker rage. Background longship crew joins war cry. Waves crash dramatically. Storm clouds gather. Camera shakes with ferocious energy. Resolution: 480p. Style: Vikings TV series epic scale.",
      credits: 150 
    },
    { 
      label: "Knight Cavalry Charge", 
      prompt: "Animate the uploaded medieval knight in full plate armor. Begin mounted on armored warhorse. Slowly begin charge: knight lowers lance into couched position, horse rears then gallops forward. Chainmail rings with movement. Heraldic banner streams behind. Plate armor reflects battlefield chaos. Castle siege visible in background. Arrows streak past. Dust clouds from cavalry charge. Camera tracks alongside showing momentum. Resolution: 480p. Style: Kingdom of Heaven crusader epic.",
      credits: 150 
    },
    { 
      label: "Spartan Shield Wall", 
      prompt: "Animate the uploaded spartan warrior with bronze helmet and red cape. Begin in phalanx formation. Slowly prepare for battle: spartan slams spear against shield creating battle rhythm, red cape billows dramatically. Bronze helmet tilts forward hiding eyes. Muscles tense for combat. Fellow spartans visible forming shield wall. Persian army approaches in background. Dust rises from marching boots. Camera pushes through shield wall. Resolution: 480p. Style: 300 movie slow-motion combat.",
      credits: 150 
    },
    { 
      label: "Pirate Ship Battle", 
      prompt: "Animate the uploaded pirate captain on ship deck. Begin at ship's wheel. Slowly engage sea battle: pirate draws cutlass with flourish, tricorn hat tips in wind. Coat tails whip in ocean breeze. Ship deck rocks with cannon fire. Background shows enemy vessel approaching. Crew scrambles on rigging. Cannon smoke drifts across deck. Jolly Roger flag waves. Camera sways with ship movement. Resolution: 480p. Style: Pirates of Caribbean swashbuckling action.",
      credits: 150 
    },
    { 
      label: "Wild West Showdown", 
      prompt: "Animate the uploaded Wild West outlaw in dusty frontier town. Begin in gunfighter stance on dirt street. Slowly prepare for duel: hand hovers over revolver holster, fingers twitch ready to draw. Duster coat sways in desert wind. Spurs jingle with subtle weight shift. Tumble weed rolls past. High noon sun creates dramatic shadows. Saloon doors creak. Opponents visible down street. Camera zooms on steely eyes. Resolution: 480p. Style: The Good The Bad The Ugly western standoff.",
      credits: 150 
    },
  ],
};

export default VIDEO_STYLES;