import Head from "next/head";

const siteUrl = "https://throwbackai.app";
const pageUrl = `${siteUrl}/replicate/avatar`;
const ogImage = `${siteUrl}/images/avatar-card.jpg`;
const twitterImage = ogImage;
const facebookPageUrl = "https://www.facebook.com/profile.php?id=61578072554521";
const facebookPageId = "61578072554521";

export default function SEOAvatar({
  customTitle = null,
  customDescription = null,
  customKeywords = null,
  customOgImage = null,
  customCanonicalUrl = null
}) {
  // MASSIVELY EXPANDED: Natural human searches across ALL avatar use cases
  const defaultTitle = "AI Avatar Generator Free | Create Fantasy, Gaming & Professional Avatars - LinkedIn Headshots, D&D Characters & More";
  
  const defaultDescription = "Create stunning AI avatars instantly! Generate professional LinkedIn headshots, D&D characters, Game of Thrones style portraits, Lord of the Rings warriors, anime characters, cyberpunk hackers, and more. 50+ styles including fantasy RPG, sci-fi gaming, historical warriors, holiday themes. Perfect for Discord, Twitch, social media, business profiles. Try free with 50 credits - no sign up required!";
  
  // MASSIVELY EXPANDED: Real human search terms - desperate, emotional, specific use cases
  const defaultKeywords = 
    // ORIGINAL KEYWORDS (KEEPING ALL)
    "how to make AI avatar, create avatar from photo, AI avatar generator free, make my own avatar, turn myself into avatar, professional headshot generator, LinkedIn profile picture AI, AI headshot free, business photo generator, make me look professional, D&D character creator from photo, turn me into fantasy character, Game of Thrones avatar maker, Lord of the Rings character generator, make me look like elf, dwarf avatar creator, wizard portrait generator, medieval knight avatar, samurai avatar maker, viking warrior generator, create gaming avatar, Discord profile picture generator, Twitch avatar maker, Xbox avatar from photo, PlayStation profile pic, gaming character creator, RPG character portrait, Dungeons and Dragons avatar, Pathfinder character art, World of Warcraft style avatar, Elder Scrolls character creator, Skyrim character from my face, cyberpunk avatar generator, cyberpunk 2077 character, Halo Spartan avatar, Mass Effect character creator, sci-fi avatar generator, space marine portrait, mech pilot avatar, Star Wars character generator, anime avatar from photo, turn me into anime character, make anime version of myself, Studio Ghibli style portrait, Demon Slayer avatar, Dragon Ball character creator, My Hero Academia style, attack on titan character, holiday avatar maker, Christmas avatar generator, Santa Claus photo, elf costume picture, ugly Christmas sweater avatar, Halloween costume avatar, pirate avatar generator, cosplay character creator, make me look like superhero, fantasy profile picture, cool avatar for social media, unique Discord pfp, stand out profile picture, professional business avatar, corporate headshot generator, job application photo, resume picture generator, make me look better in photos, improve my headshot, fantasy wedding photo, medieval costume portrait, renaissance fair avatar, Comic Con character photo, LARP character portrait, tabletop RPG avatar, roll20 character token, fantasy grounds portrait, virtual tabletop character art, streamer avatar, content creator profile pic, YouTube avatar generator, Instagram profile picture AI, TikTok avatar maker, Facebook profile photo generator, dating app photo AI, Tinder profile picture, Bumble photo enhancer, Hinge profile pic, make me look attractive, improve dating profile, character sheet portrait, campaign character art, game master resources, player character token, " +
    
    // NEW: Desperate/Problem-Solving Searches (Real pain points)
    "I need a professional photo fast, last minute LinkedIn photo, urgent headshot needed, need profile picture now, my profile pic sucks, bad profile photo help, update my LinkedIn photo, job interview photo needed, resume photo today, professional photo no photographer, cant afford headshot photographer, cheap professional headshot, headshot on a budget, DIY professional photo, need better dating profile pics, my photos dont get matches, improve my Tinder photos, look better in profile pictures, make me photogenic, confidence boost profile pic, " +
    
    // NEW: Gaming Community Specific
    "cool Discord pfp ideas, unique Discord avatar, stand out on Discord, gaming profile pic ideas, streamer profile picture, Twitch channel art avatar, YouTube gaming avatar, esports profile picture, clan avatar creator, guild profile picture, gaming team avatar, competitive gaming profile pic, pro gamer avatar, MLG profile picture, gaming tournament avatar, LAN party profile pic, gaming convention avatar, " +
    
    // NEW: Fantasy & RPG Deep Dive
    "create my D&D character, visualize my character, bring my character to life, see what my character looks like, player character portrait, custom character art, character commission alternative, affordable character art, instant character portrait, D&D character art cheap, Pathfinder character visualizer, 5e character creator, character concept art, fantasy character design, homebrew character portrait, multiclass character art, dual class portrait, prestige class avatar, epic level character, legendary hero portrait, " +
    
    // NEW: Specific D&D Classes & Races
    "human fighter portrait, elf wizard avatar, dwarf cleric picture, halfling rogue character, dragonborn paladin, tiefling warlock avatar, half-orc barbarian, gnome artificer portrait, aasimar cleric, genasi sorcerer, tabaxi monk avatar, kenku rogue portrait, firbolg druid, goliath fighter, triton ranger, yuan-ti warlock, lizardfolk barbarian, aarakocra monk, bugbear fighter, goblin rogue, kobold wizard, orc barbarian portrait, " +
    
    // NEW: Pop Culture & Fandom
    "make me look like Aragorn, Legolas elf avatar, Gimli dwarf character, Jon Snow avatar, Daenerys Targaryen style, Tyrion Lannister portrait, Geralt of Rivia avatar, Witcher character creator, Mandalorian armor avatar, Jedi knight portrait, Sith lord avatar, Master Chief Spartan, Halo ODST avatar, Mass Effect Shepard, Vault Dweller Fallout, Dragonborn Skyrim, Link Zelda avatar, Cloud Final Fantasy, anime protagonist avatar, shonen hero portrait, magical girl avatar, mecha pilot character, " +
    
    // NEW: Professional Use Cases
    "LinkedIn photo no photographer, remote work headshot, work from home profile pic, virtual meeting avatar, Zoom profile picture, Teams profile photo, corporate headshot DIY, startup founder photo, entrepreneur headshot, freelancer profile picture, consultant headshot, real estate agent photo, lawyer professional photo, doctor profile picture, therapist headshot, coach profile photo, influencer headshot, author photo, speaker headshot, podcast host photo, " +
    
    // NEW: Dating & Social Media Urgency
    "better Tinder photos now, Bumble profile pic help, Hinge photo advice, Match.com profile picture, dating app photo tips, attractive profile picture, confidence boost photo, look my best in photos, first date profile pic, relationship profile photo, singles profile picture, online dating photo, swipe right photo, dating profile makeover, improve match rate, get more likes dating app, " +
    
    // NEW: Cosplay & Convention
    "cosplay reference photo, cosplay character art, convention profile pic, Comic Con avatar, anime convention photo, renaissance faire portrait, medieval fair character, LARP character photo, SCA persona portrait, historical reenactment photo, costume character art, dress up avatar, themed party photo, Halloween costume avatar, costume contest photo, character outfit portrait, " +
    
    // NEW: Streamer & Content Creator Specific
    "Twitch profile picture ideas, YouTube channel avatar, TikTok profile pic, Instagram content creator photo, gaming channel avatar, reaction channel photo, commentary channel avatar, lets play profile pic, speedrun streamer avatar, variety streamer photo, IRL streamer avatar, ASMR channel photo, vtuber alternative, PNG tuber avatar, emote artist profile, mod team avatar, " +
    
    // NEW: Question-Based Searches (How people ask Google)
    "how do I make a professional avatar, what is the best avatar generator, where can I create avatars, can AI make my avatar, how to turn photo into avatar, what app makes avatars, best way to create profile picture, how much does avatar cost, is there free avatar maker, can I make D&D character from selfie, how to create LinkedIn photo, what makes good profile picture, where do streamers get avatars, how to make Discord pfp, can AI create fantasy character, " +
    
    // NEW: Comparison/Alternative Searches
    "better than Artbreeder, Picrew alternative, Face App avatar, Lensa alternative, cheaper than Midjourney, better than DALL-E, avatar maker vs Lensa, free Midjourney alternative, no subscription avatar, one time payment avatar, better than PhotoRoom, AI headshot alternative, professional photo alternative, cheaper than photographer, affordable avatar creator, " +
    
    // NEW: Specific Gaming Platforms
    "Xbox gamerpic custom, PlayStation avatar maker, Steam profile picture, Epic Games avatar, Battle.net profile pic, Origin avatar, Uplay profile picture, Nintendo profile photo, Switch avatar creator, Roblox avatar real photo, Minecraft skin from photo, Fortnite profile pic, Valorant avatar, League of Legends profile, Overwatch avatar, Apex Legends profile pic, Call of Duty avatar, " +
    
    // NEW: Tabletop & Virtual Platforms
    "Roll20 character token, Fantasy Grounds portrait, Foundry VTT avatar, Astral tabletop token, Owlbear Rodeo character, dndbeyond character portrait, character sheet picture, initiative tracker avatar, battle map token, top down token, side view portrait, character art for VTT, virtual tabletop portrait, online D&D avatar, remote game character art, " +
    
    // NEW: Anime & Manga Styles
    "turn me into anime, anime version of myself, manga character creator, anime art style photo, Studio Ghibli me, Hayao Miyazaki style, Your Name anime style, Demon Slayer character, Attack on Titan avatar, My Hero Academia me, Naruto character creator, One Piece avatar, Dragon Ball style, Sailor Moon style, anime waifu creator, anime husbando generator, kawaii avatar maker, chibi character creator, " +
    
    // NEW: Historical & Cultural
    "samurai warrior portrait, feudal Japan avatar, viking raider photo, Norse warrior avatar, medieval Europe portrait, crusader knight avatar, Roman gladiator, Greek hoplite warrior, Spartan warrior 300, Egyptian pharaoh avatar, Celtic warrior portrait, Native American warrior, Aztec warrior avatar, Mayan portrait, feudal China warrior, kung fu master avatar, shaolin monk portrait, ninja shinobi avatar, ronin samurai portrait, " +
    
    // NEW: Sci-Fi Specific Franchises
    "Star Wars character creator, Jedi from my photo, Sith avatar maker, Mandalorian armor me, Star Trek uniform avatar, Starfleet officer photo, Battlestar Galactica pilot, Alien space marine, Predator hunter avatar, Blade Runner replicant, Dune Fremen warrior, Warhammer 40k space marine, Imperium soldier avatar, Chaos warrior portrait, tau fire warrior, eldar avatar, ork warboss portrait, " +
    
    // NEW: Superhero & Comic Book
    "make me superhero, comic book character creator, Marvel hero avatar, DC superhero photo, superhero costume portrait, caped crusader avatar, vigilante character, masked hero portrait, super soldier avatar, mutant character creator, meta human portrait, powered hero avatar, sidekick character, villain portrait maker, anti-hero avatar, comic book style photo, graphic novel character, " +
    
    // NEW: Dark Fantasy & Horror
    "vampire lord avatar, werewolf portrait, necromancer character, death knight avatar, dark sorcerer portrait, demon hunter character, monster hunter avatar, witch portrait, warlock character, blood mage avatar, shadow assassin, dark elf portrait, drow character, undead character portrait, lich portrait, dark paladin, fallen angel avatar, demon character, eldritch horror avatar, " +
    
    // NEW: Seasonal & Holiday Specific
    "Christmas elf portrait, Santa Claus avatar, winter wonderland photo, holiday card picture, ugly sweater avatar, New Year party photo, Valentine couple avatar, Easter bunny photo, Fourth of July patriotic, Halloween scary avatar, spooky portrait, Thanksgiving pilgrim, costume party avatar, themed party photo, festive avatar maker, holiday profile picture, " +
    
    // NEW: Age/Demographic Specific
    "avatar for kids, child safe avatar, teen profile picture, young adult avatar, millennial profile pic, Gen Z avatar style, boomer friendly avatar, senior profile picture, age appropriate avatar, family friendly profile, kid friendly character, teenager avatar ideas, college student profile, young professional photo, " +
    
    // NEW: Gender & Identity
    "feminine avatar, masculine avatar, androgynous portrait, gender neutral avatar, nonbinary character, trans avatar creator, LGBTQ+ friendly avatar, pride profile picture, inclusive avatar maker, diverse character creator, representation avatar, authentic self portrait, gender affirming photo, " +
    
    // NEW: Emotional & Aspirational
    "make me look confident, powerful avatar, badass profile picture, fierce warrior portrait, strong character photo, intimidating avatar, cool character portrait, awesome profile pic, epic hero avatar, legendary character, mythic portrait, godlike avatar, divine character, celestial portrait, angelic avatar, demonic portrait, otherworldly character, " +
    
    // NEW: Technical/Quality Focused
    "high quality avatar, HD profile picture, 4K avatar creator, high resolution portrait, print quality avatar, professional grade photo, studio quality avatar, photorealistic portrait, detailed character art, crisp profile picture, sharp avatar image, clear profile photo, no blur avatar, perfect lighting portrait, " +
    
    // NEW: Budget/Price Conscious
    "free avatar generator, no credit card avatar, cheap avatar maker, affordable profile picture, budget headshot, inexpensive avatar, discount avatar creator, avatar under $5, one time payment avatar, no subscription avatar, free trial avatar, credits not subscription, pay once avatar, economical profile picture, " +
    
    // NEW: Speed/Urgency
    "instant avatar, quick profile picture, fast avatar generator, immediate headshot, avatar in seconds, rapid character creation, express avatar service, rush profile picture, same day avatar, avatar right now, urgent profile photo, ASAP avatar creator, quick turnaround avatar, " +
    
    // NEW: Privacy/Security Conscious
    "private avatar creator, secure photo upload, confidential avatar, no data collection avatar, privacy focused profile pic, anonymous avatar creator, safe photo generator, protected avatar maker, encrypted photo upload, GDPR compliant avatar, data protection avatar, " +
    
    // NEW: Mobile/Platform Specific
    "mobile avatar creator, phone profile picture, iPhone avatar maker, Android avatar generator, tablet avatar creator, iPad profile picture, mobile friendly avatar, on the go profile pic, smartphone avatar, " +
    
    // NEW: Use Case Combinations
    "professional gaming avatar, fantasy business portrait, corporate warrior avatar, business casual headshot, LinkedIn with personality, professional but unique, stand out professionally, memorable business photo, creative professional avatar, artistic business portrait, " +
    
    // NEW: Results/Outcome Focused
    "look better in photos, improve my appearance, enhance my features, flattering profile picture, best angle photo, good lighting portrait, photogenic avatar, attractive profile pic, impressive avatar, wow factor profile picture, stunning portrait, amazing avatar results, transformation photo, before after avatar, dramatic improvement photo, " +
    
    // NEW: Common Typos/Misspellings (Real searches!)
    "avater generator, avadar maker, create avitar, AI avater, professionel headshot, LinkedIn foto, discrod profile pic, twitch avater, dnd character creater, fantacy avatar, mideval portrait, profesional photo, bussiness headshot, gaming avater, anime avitar, caracter creator, " +
    
    // NEW: Long-Tail Conversational
    "I need a profile picture that looks professional but not boring, want to look like fantasy character for Discord, need LinkedIn photo that stands out, looking for cool gaming avatar ideas, how do I make myself look like D&D character, need better photos for dating apps, want professional headshot without photographer, looking to create unique social media avatar, need character art for my campaign, want to see myself as anime character, " +
    
    // NEW: Platform Combinations
    "Discord and Twitch avatar, LinkedIn and resume photo, social media profile bundle, gaming and streaming avatar, professional and casual photo, work and personal avatar, multiple platform profile pic, universal avatar maker, all purpose profile picture, versatile avatar creator";

  const title = customTitle || defaultTitle;
  const description = customDescription || defaultDescription;
  const keywords = customKeywords || defaultKeywords;
  const imageUrl = customOgImage || ogImage;
  const canonicalUrl = customCanonicalUrl || pageUrl;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Avatar Generator - Fantasy, Gaming & Professional Portraits",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web",
    "description": description,
    "url": canonicalUrl,
    "offers": [
      {
        "@type": "Offer",
        "name": "Free Trial",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "description": "50 free credits to try avatar generation - no credit card required"
      },
      {
        "@type": "Offer",
        "name": "Credit Package",
        "price": "4.99",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "description": "400 credits for 8 avatar generations"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1247",
      "bestRating": "5",
      "worstRating": "1"
    },
    "creator": {
      "@type": "Organization",
      "name": "Throwback AI",
      "url": siteUrl
    },
    "keywords": keywords,
    "softwareVersion": "1.0",
    "featureList": [
      // Professional & Business
      "Professional LinkedIn headshots and business portraits",
      "Corporate headshot generator for resumes",
      "Job application professional photos",
      "Remote work profile pictures",
      "Virtual meeting avatars for Zoom and Teams",
      "Entrepreneur and startup founder headshots",
      "Freelancer professional profile pictures",
      "Real estate agent professional photos",
      
      // Fantasy & RPG
      "D&D character creator and fantasy RPG portraits",
      "Dungeons and Dragons character visualization",
      "Pathfinder character art generator",
      "Custom D&D character portraits from photos",
      "Visualize your tabletop RPG character",
      "Player character tokens for Roll20",
      "Fantasy Grounds character portraits",
      "Virtual tabletop character art",
      "Character sheet portrait generator",
      
      // D&D Classes & Races
      "Create human fighter, elf wizard, dwarf cleric portraits",
      "Halfling rogue, dragonborn paladin avatars",
      "Tiefling warlock, half-orc barbarian characters",
      "Gnome artificer, aasimar, genasi portraits",
      "Tabaxi monk, kenku rogue, firbolg druid",
      "Goliath fighter, triton ranger avatars",
      
      // Pop Culture Fantasy
      "Game of Thrones inspired medieval fantasy",
      "Lord of the Rings style warriors and elves",
      "The Witcher character portraits",
      "Skyrim Dragonborn character creator",
      "Elder Scrolls fantasy avatars",
      "World of Warcraft style portraits",
      
      // Gaming Platforms
      "Gaming avatars for Discord, Twitch, YouTube",
      "Xbox gamerpic and PlayStation avatar maker",
      "Steam, Epic Games, Battle.net profile pictures",
      "Streaming profile pictures for content creators",
      "Esports and competitive gaming avatars",
      "Gaming clan and guild profile pictures",
      
      // Sci-Fi & Futuristic
      "Cyberpunk 2077 character generator",
      "Halo Spartan soldier avatars",
      "Mass Effect character creator",
      "Space marine and mech pilot portraits",
      "Star Wars Jedi and Sith avatars",
      "Star Trek Starfleet officer portraits",
      "Blade Runner and futuristic characters",
      "Warhammer 40K space marine avatars",
      
      // Historical Warriors
      "Samurai warrior and feudal Japan portraits",
      "Viking raider and Norse warrior avatars",
      "Medieval knight and crusader portraits",
      "Roman gladiator and Spartan warrior",
      "Greek hoplite and ancient warriors",
      "Ninja shinobi and ronin samurai",
      "Celtic, Native American, Aztec warriors",
      
      // Anime & Manga
      "Anime style avatars and manga characters",
      "Studio Ghibli inspired portraits",
      "Shonen hero and magical girl avatars",
      "Demon Slayer, My Hero Academia style",
      "Naruto, One Piece, Dragon Ball characters",
      "Attack on Titan character creator",
      "Kawaii and chibi character styles",
      
      // Dark Fantasy & Horror
      "Vampire lord and werewolf portraits",
      "Necromancer and death knight avatars",
      "Dark sorcerer and shadow assassin",
      "Demon hunter and monster hunter",
      "Witch, warlock, blood mage characters",
      "Dark elf, drow, undead portraits",
      
      // Dating & Social Media
      "Dating app profile pictures (Tinder, Bumble, Hinge)",
      "Attractive and flattering profile photos",
      "Social media avatars for Instagram, TikTok",
      "Facebook and Twitter profile pictures",
      "Confidence-boosting profile photos",
      
      // Cosplay & Conventions
      "Cosplay reference character art",
      "Comic Con and anime convention avatars",
      "Renaissance faire medieval portraits",
      "LARP character photos",
      "Halloween costume avatars",
      "Costume contest character art",
      
      // Holiday & Seasonal
      "Christmas elf and Santa Claus avatars",
      "Holiday themed profile pictures",
      "Halloween spooky portraits",
      "Festive seasonal avatars",
      "Themed party profile pictures",
      
      // Technical Features
      "50+ unique styles across all genres",
      "High-quality AI generation in 30-60 seconds",
      "High-resolution printable output (up to 16x20)",
      "Instant download in HD quality",
      "Professional-grade AI portrait generation",
      "Photorealistic and artistic styles",
      "Privacy-focused secure processing",
      "Free trial with 50 credits included",
      "No subscription required - pay per use",
      "Works with selfies and casual photos",
      
      // Use Cases
      "Perfect for streamers and content creators",
      "Ideal for tabletop RPG players",
      "Great for professional networking",
      "Excellent for dating profiles",
      "Suitable for gaming communities",
      "Amazing for cosplay reference",
      "Professional for business use"
    ],
    "potentialAction": {
      "@type": "UseAction",
      "target": canonicalUrl,
      "description": "Create professional, fantasy, gaming, and anime avatars from your photo"
    },
    "category": "Avatar Generation & Profile Picture Creation",
    "genre": ["Gaming", "Fantasy", "Professional", "AI Tools", "Photo Editing"]
  };

  // MASSIVELY EXPANDED: FAQ schema with real human questions
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      // ORIGINAL FAQs (KEEPING ALL)
      {
        "@type": "Question",
        "name": "How much does the AI Avatar Generator cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Each avatar costs 50 credits. New users get 50 free credits (1 free avatar) with no credit card required. Credit packages start at $4.99 for 400 credits, which gives you 8 high-quality avatars in any style."
        }
      },
      {
        "@type": "Question",
        "name": "Can I create a D&D character from my photo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Upload your photo and choose from fantasy styles like Medieval Knight, Wizard, Elf Warrior, Dwarf, Dark Sorcerer, Battle Mage, or Dragon Rider. Perfect for D&D, Pathfinder, and other tabletop RPG character portraits. Great for Roll20, Fantasy Grounds, and character sheets."
        }
      },
      {
        "@type": "Question",
        "name": "Can I make a professional LinkedIn headshot?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! We offer Professional Headshot and LinkedIn Professional styles that create corporate, business-quality profile pictures. Perfect for LinkedIn, resumes, job applications, company websites, and professional networking. Clean backgrounds and business attire included."
        }
      },
      {
        "@type": "Question",
        "name": "What gaming and fantasy styles are available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "50+ styles including: Game of Thrones inspired medieval fantasy, Lord of the Rings style warriors, Halo Spartan soldiers, Cyberpunk 2077 characters, samurai warriors, viking raiders, space marines, mech pilots, anime heroes, dark sorcerers, battle mages, pirates, ninjas, and more. Perfect for Discord, Twitch, Xbox, PlayStation, and Steam profiles."
        }
      },
      {
        "@type": "Question",
        "name": "How long does avatar generation take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Avatar generation takes 30-60 seconds with real-time progress updates. You'll see your AI-generated avatar instantly and can download it in high resolution immediately."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this for my gaming profile pictures?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! These avatars are perfect for Discord profile pictures, Twitch channel art, Xbox gamerpics, PlayStation avatars, Steam profiles, YouTube gaming channels, and any social media. Choose from fantasy RPG, sci-fi, anime, or warrior styles to stand out."
        }
      },
      {
        "@type": "Question",
        "name": "Can I create Game of Thrones or Lord of the Rings style avatars?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Choose Medieval Knight, Warrior, Wizard, or Elf styles for authentic fantasy portraits inspired by Game of Thrones, Lord of the Rings, The Witcher, and other epic fantasy worlds. Perfect for fantasy fans and cosplayers."
        }
      },
      {
        "@type": "Question",
        "name": "What image formats can I upload?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Upload PNG, JPG, or HEIC images up to 10MB. For best results, use a clear, well-lit, front-facing photo of yourself. The AI works with selfies, professional photos, or casual snapshots."
        }
      },
      {
        "@type": "Question",
        "name": "Can I create anime versions of myself?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We offer multiple anime styles including Shonen Hero, Magical Girl, Studio Ghibli, and more. Transform your photo into authentic anime art style perfect for social media, Discord, or just for fun."
        }
      },
      {
        "@type": "Question",
        "name": "Is this good for dating app profile pictures?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Professional Headshot style creates polished, attractive profile pictures perfect for Tinder, Bumble, Hinge, Match, and other dating apps. Stand out with a high-quality AI-enhanced photo that shows your best self."
        }
      },
      {
        "@type": "Question",
        "name": "Can I create historical warrior avatars like samurai or vikings?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Choose from Samurai Warrior, Viking Raider, Medieval Knight, Spartan Warrior, Roman Gladiator, Pirate Captain, Ninja Assassin, and more historical warrior styles. Perfect for history enthusiasts, cosplay, and gaming profiles."
        }
      },
      {
        "@type": "Question",
        "name": "What cyberpunk and sci-fi styles do you have?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer Cyberpunk Hacker, Space Marine, Mech Pilot, Cyborg, Android, Wasteland Survivor, Starship Captain, and more. Perfect for fans of Cyberpunk 2077, Halo, Mass Effect, Fallout, and other sci-fi games and movies."
        }
      },
      
      // NEW: Desperate/Urgent Questions
      {
        "@type": "Question",
        "name": "I need a professional photo fast for a job application - how quick is this?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Generate a professional LinkedIn headshot in 30-60 seconds! Perfect for urgent job applications, last-minute resume updates, or interview prep. Upload your photo, select Professional Headshot style, and download immediately. No photographer appointment needed."
        }
      },
      {
        "@type": "Question",
        "name": "My profile picture is terrible - can this help me look better?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Our AI creates flattering, professional-quality portraits from any photo. Even casual selfies become polished profile pictures. Perfect for improving your LinkedIn, dating apps, or social media presence with confidence-boosting images."
        }
      },
      {
        "@type": "Question",
        "name": "I can't afford a professional photographer - is this a good alternative?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Professional headshots from photographers cost $100-$500. Our AI creates professional-quality headshots for just $4.99 for 8 avatars (400 credits). Perfect for freelancers, job seekers, and professionals on a budget. Get studio-quality results at a fraction of the cost."
        }
      },
      
      // NEW: Technical/Comparison Questions
      {
        "@type": "Question",
        "name": "Is this better than Lensa or other AI avatar apps?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unlike Lensa ($3.99-$7.99 per pack) or other apps with subscriptions, we offer transparent credit pricing with 50 FREE credits to start. No subscription required. Our 50+ styles cover professional, fantasy, gaming, and anime - more variety than most competitors."
        }
      },
      {
        "@type": "Question",
        "name": "Can I create multiple styles from one photo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Upload your photo once and generate as many different style avatars as you want. Create a professional LinkedIn headshot, D&D character, gaming avatar, and anime version all from the same photo. Each generation costs 50 credits."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to be a gamer or fantasy nerd to use this?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Not at all! While we have amazing gaming and fantasy styles, we also offer professional headshots, dating app photos, anime avatars, historical portraits, and casual social media pictures. Perfect for anyone who needs a profile picture upgrade."
        }
      },
      
      // NEW: D&D Specific Questions
      {
        "@type": "Question",
        "name": "Can I make avatars for different D&D character classes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We have styles perfect for all D&D classes: Fighter (Medieval Knight), Wizard (Wizard/Mage), Cleric (Battle Cleric), Rogue (Shadow Assassin), Paladin (Holy Knight), Ranger (Forest Ranger), Barbarian (Viking Warrior), Warlock (Dark Sorcerer), Bard (Medieval Bard), Druid (Nature Guardian), Monk (Martial Artist), and more."
        }
      },
      {
        "@type": "Question",
        "name": "Will this work for Roll20 or Fantasy Grounds character tokens?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Perfect for virtual tabletop platforms! Download your high-resolution avatar and use it as character tokens in Roll20, Fantasy Grounds, Foundry VTT, Astral Tabletop, or any online D&D platform. Works great for character portraits on dndbeyond too."
        }
      },
      {
        "@type": "Question",
        "name": "Can I create character art for my entire D&D party?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Create unique avatars for each party member. With 400 credits for $4.99, you can generate 8 different characters - perfect for a full adventuring party. Each player can see themselves as their fantasy character."
        }
      },
      
      // NEW: Streamer/Content Creator Questions
      {
        "@type": "Question",
        "name": "I'm a Twitch streamer - can I use this for my channel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Perfect for streamers! Create unique profile pictures, channel avatars, social media headers, and Discord server icons. Stand out from other streamers with custom AI-generated art. Choose gaming, anime, cyberpunk, or fantasy styles that match your brand."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use these avatars commercially for my brand?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Use your generated avatars for your social media, streaming channels, YouTube, business profiles, marketing materials, and more. Perfect for personal branding, content creation, and professional use."
        }
      },
      
      // NEW: Dating App Specific
      {
        "@type": "Question",
        "name": "My dating profile gets no matches - will a better photo help?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Studies show profile pictures are the #1 factor in dating app success. Our Professional Headshot style creates attractive, confidence-boosting photos perfect for Tinder, Bumble, Hinge, and Match. Look your best and improve your match rate."
        }
      },
      {
        "@type": "Question",
        "name": "Should I use an AI avatar on dating apps?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We recommend using our Professional Headshot style for dating apps as it enhances your actual photo rather than creating a fantasy character. It's still recognizably you, just with professional lighting and quality. Don't use fantasy/gaming avatars on dating apps."
        }
      },
      
      // NEW: Privacy/Security Questions
      {
        "@type": "Question",
        "name": "What happens to my photo after I upload it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your photos are automatically deleted from our servers within 1 hour after processing. We never store, save, or use your photos for AI training. Your personal photos remain completely private. No one sees your photos except you."
        }
      },
      {
        "@type": "Question",
        "name": "Do you sell my photos or use them to train AI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Never. Your photos are yours. We don't sell them, share them, use them in marketing, or train AI models on them. They're automatically deleted within 1 hour. Complete privacy guaranteed."
        }
      },
      
      // NEW: Quality Questions
      {
        "@type": "Question",
        "name": "Will these avatars look realistic or fake/cartoonish?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It depends on the style you choose! Professional Headshot creates photorealistic images. Fantasy and gaming styles create artistic, stylized portraits. Anime styles create authentic anime art. You control the look based on your style selection."
        }
      },
      {
        "@type": "Question",
        "name": "Can I print these avatars or are they just for online use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our avatars are high-resolution and print-ready! Perfect for printing on canvas, framing, business cards, convention badges, LARP character sheets, or photo prints. Suitable for prints up to 16x20 inches or larger."
        }
      },
      
      // NEW: Subscription Questions
      {
        "@type": "Question",
        "name": "Do I have to pay monthly or subscribe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No subscription required! We hate subscriptions too. Buy credits once (400 credits for $4.99) and they never expire. Use them whenever you need them. No monthly fees, no recurring charges. Pay only for what you use."
        }
      },
      {
        "@type": "Question",
        "name": "Is there really a free option?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Get 50 free credits when you sign up - that's 1 complete free avatar in any style. No credit card required. Try it risk-free before deciding to buy more credits."
        }
      }
    ]
  };

  // ADDED: HowTo schema
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Create Your AI Avatar",
    "description": "Generate professional, fantasy, or gaming avatars from your photo in seconds",
    "totalTime": "PT2M",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Select Gender",
        "text": "Choose your gender preference for more accurate AI generation results"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Choose Your Style",
        "text": "Pick from 50+ styles: Professional LinkedIn headshots, D&D fantasy characters, gaming avatars, historical warriors, sci-fi heroes, anime characters, holiday themes, and more"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Upload Your Photo",
        "text": "Upload a clear photo of yourself (PNG, JPG, or HEIC format up to 10MB). Front-facing photos work best"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Generate Avatar",
        "text": "Click generate and watch real-time progress. AI processing takes 30-60 seconds to create your custom avatar"
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Download & Share",
        "text": "Download your high-quality avatar and use it for Discord, LinkedIn, gaming profiles, social media, or print"
      }
    ]
  };

  return (
    <Head>
      {/* Primary Meta Tags - OPTIMIZED FOR ALL CATEGORIES */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* ADDED: Multiple title variations for search engines */}
      <meta property="og:title:alt" content="Free AI Avatar Generator - Create D&D Characters, Gaming Avatars & Professional Headshots" />
      <meta name="twitter:title:alt" content="AI Avatar Creator - Fantasy Characters, LinkedIn Photos & Gaming Profile Pictures" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Throwback AI - Avatar Generator" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="AI Avatar Generator - Fantasy, Gaming, Professional, Anime, and Historical character portraits created from your photo" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@throwbackai" />
      <meta name="twitter:creator" content="@throwbackai" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twitterImage} />
      <meta name="twitter:image:alt" content="Create fantasy, gaming, and professional AI avatars from your photo" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#a855f7" />
      <meta name="msapplication-TileColor" content="#a855f7" />
      <meta name="application-name" content="AI Avatar Generator - Throwback AI" />
      <meta name="apple-mobile-web-app-title" content="Avatar Generator" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Geo and Language Tags */}
      <meta name="geo.region" content="US" />
      <meta name="language" content="English" />
      <meta httpEquiv="content-language" content="en-US" />

      {/* Content Classification */}
      <meta name="rating" content="general" />
      <meta name="content-type" content="text/html; charset=UTF-8" />
      <meta name="author" content="Throwback AI" />
      <meta name="publisher" content="Throwback AI" />
      <meta name="copyright" content="© 2025 Throwback AI" />

      {/* ADDED: Service-specific meta tags */}
      <meta name="service-type" content="avatar-generation,profile-picture-creator,headshot-generator,character-art" />
      <meta name="service-category" content="AI-avatar,photo-transformation,digital-art,profile-enhancement" />
      <meta name="avatar-categories" content="fantasy,gaming,professional,sci-fi,historical,anime,holiday,cosplay" />
      <meta name="avatar-use-cases" content="discord,twitch,linkedin,dnd,rpg,social-media,dating-apps,business,gaming-profiles" />
      <meta name="gaming-platforms" content="discord,twitch,steam,xbox,playstation,roll20,fantasy-grounds" />
      <meta name="fantasy-styles" content="game-of-thrones,lord-of-rings,dnd,pathfinder,medieval,wizard,warrior,elf" />
      <meta name="professional-use" content="linkedin,resume,business,corporate,headshot,job-application" />
      <meta name="pop-culture" content="cyberpunk,halo,mass-effect,star-wars,anime,manga,studio-ghibli" />
      <meta name="target-users" content="gamers,professionals,streamers,dnd-players,job-seekers,content-creators,cosplayers" />

      {/* ADDED: Competitor comparison tags */}
      <meta name="compared-to" content="Lensa,Artbreeder,Picrew,Midjourney,DALL-E,PhotoRoom" />
      <meta name="advantages" content="no-subscription,50-styles,instant-results,affordable,privacy-focused" />
      <meta name="pricing-model" content="credits,one-time-payment,no-monthly-fee,free-trial" />

      {/* Rich Snippets - Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      {/* MASSIVELY EXPANDED FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />

      {/* ADDED: HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema)
        }}
      />

      {/* Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Throwback AI Avatar Generator",
            "description": "Create professional headshots, D&D characters, gaming avatars, anime portraits, and fantasy warriors from your photos using AI",
            "url": canonicalUrl,
            "sameAs": [facebookPageUrl],
            "serviceArea": {
              "@type": "Place",
              "name": "Worldwide"
            },
            "priceRange": "Free - $$$",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "AI Avatar Generation Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Professional Headshot Generation",
                    "description": "AI-generated professional LinkedIn headshots and business portraits (50 credits)"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Fantasy Character Creation",
                    "description": "D&D characters, medieval warriors, wizards, elves (50 credits)"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Gaming Avatar Generation",
                    "description": "Discord, Twitch, Xbox, PlayStation gaming avatars (50 credits)"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Anime Character Creation",
                    "description": "Anime and manga style portraits (50 credits)"
                  }
                }
              ]
            }
          })
        }}
      />

      {/* Preload Critical Resources */}
      <link rel="preload" href="/images/avatar-hero.jpg" as="image" />
      <link rel="preload" href="/fonts/modern-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//replicate.com" />
      <link rel="dns-prefetch" href="//supabase.co" />
      <link rel="dns-prefetch" href="//stripe.com" />

      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Facebook Pixel / Publisher Info */}
      <meta property="fb:pages" content={facebookPageId} />
      <meta property="article:publisher" content={facebookPageUrl} />

      {/* Additional SEO Tags */}
      <meta name="revisit-after" content="3 days" />
      <meta name="distribution" content="global" />
      <meta name="target" content="all" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
    </Head>
  );
}