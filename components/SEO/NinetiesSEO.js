// components/seo/NinetiesSEO.js - MAXIMUM SEO OPTIMIZATION + HUMAN SEARCH TERMS
import Head from "next/head";

const siteUrl = "https://throwbackai.app";
const pageUrl = `${siteUrl}/replicate/90s`;
const ogImage = `${siteUrl}/images/decades/90sCardSEO.png`;
const twitterImage = ogImage;
const facebookPageUrl = "https://www.facebook.com/profile.php?id=61578072554521";
const facebookPageId = "61578072554521";

const NinetiesSEO = ({ 
  customTitle = null,
  customDescription = null,
  customKeywords = null,
  customOgImage = null,
  customCanonicalUrl = null
}) => {
  const defaultTitle = "90s AI Photo Generator Free | Make Me Look Like the 90s - Grunge, Hip Hop & Yearbook Style Creator";
  
  const defaultDescription = "Free 90s AI photo generator - Transform into authentic 1990s style! Create grunge flannel looks, hip hop baggy jeans, frosted tips, Rachel haircuts, and vintage yearbook photos. Relive the era of Nirvana, Friends, Fresh Prince, and dial-up internet. Make yourself look totally rad with AI-powered 90s transformations. Try free - no credit card required!";
  
  // MASSIVELY EXPANDED: Real human searches - nostalgic, emotional, specific use cases
  const defaultKeywords = 
    // ORIGINAL KEYWORDS (KEEPING ALL)
    "make me look like the 90s, turn my photo into 90s style, how to look like 90s grunge, AI 90s photo generator free, make myself look 90s, 90s yearbook photo creator, grunge aesthetic photo, create 90s style picture, transform photo to 1990s, 90s AI filter free, look like I'm from the 90s, vintage 90s photo effect, make my photo look 90s, retro 90s picture maker, nineties style generator, Friends TV show style photo, Fresh Prince aesthetic, Nirvana grunge look, 90s hip hop photo, baggy jeans aesthetic, flannel shirt photo effect, Rachel haircut generator, frosted tips creator, 90s mall photo booth, throwback 90s picture, totally rad photo maker, as if 90s aesthetic, Clueless movie style, 90s high school yearbook, alternative rock look, skater aesthetic 90s, pop punk style photo, 90s rave aesthetic, JNCO jeans photo, backwards hat look, choker necklace aesthetic, platform shoes style, scrunchie hair photo, 90s nostalgia generator, millennial childhood photos, gen x aesthetic, bring back the 90s, I miss the 90s photo, 90s themed party photo, decade day costume, spirit week 90s day, Halloween 90s costume, 90s prom photo, homecoming 90s theme, wedding 90s aesthetic, 90s birthday party, create 90s look for party, 90s fashion recreate, what would I look like in 90s, time travel to 90s photo, 90s me challenge, throwback Thursday 90s, TBT 90s style, before social media look, dial-up era photo, VHS aesthetic, AOL instant messenger era, MTV generation look, TRL era photo, Walkman generation, CD collection aesthetic, Game Boy era photo, Tamagotchi generation, Blockbuster video aesthetic, " +
    
    // NEW: Nostalgic/Emotional Searches (How millennials remember the 90s)
    "best decade ever 90s, when life was simple 90s, before smartphones ruined everything, childhood in the 90s, growing up in the nineties, elementary school 90s, middle school nineties, high school 90s style, college 90s fashion, 90s kid memories, millennial childhood aesthetic, last analog generation, first digital generation, pre-internet nostalgia, dial-up modem sound, waiting for photos to develop, no cell phones era, playing outside 90s, Saturday morning cartoons, after school snacks 90s, summer vacation nineties, no social media pressure, simpler times 90s, " +
    
    // NEW: Specific Year Searches
    "1990 style photo, 1991 aesthetic, 1992 grunge beginning, 1993 alternative rock, 1994 Nirvana peak, 1995 hip hop golden age, 1996 Tupac Biggie era, 1997 pop explosion, 1998 boy bands peak, 1999 Y2K prep, early 90s grunge, mid 90s hip hop, late 90s boy bands, turn of millennium 1999, almost 2000s style, pre-Y2K aesthetic, " +
    
    // NEW: Grunge Deep Dive (Specific grunge searches)
    "Nirvana Kurt Cobain look, Eddie Vedder Pearl Jam style, Chris Cornell Soundgarden aesthetic, Stone Temple Pilots grunge, Alice in Chains Seattle sound, Smashing Pumpkins alternative, Hole Courtney Love style, Sonic Youth noise rock, Mudhoney grunge pioneers, flannel shirt layered, ripped jeans authentic grunge, combat boots Doc Martens, thermal underwear showing, oversized cardigan Kurt Cobain, messy hair unwashed look, anti-fashion grunge attitude, Seattle music scene aesthetic, Sub Pop records era, Generation X slacker, disaffected youth 90s, angst aesthetic grunge, " +
    
    // NEW: Hip Hop Golden Age Deep Dive
    "Tupac 2Pac bandana style, Biggie Notorious BIG crown, Wu-Tang Clan logo, Jay-Z Reasonable Doubt era, Nas Illmatic aesthetic, Snoop Dogg G-funk style, Dr Dre chronic era, Ice Cube gangsta rap, Method Man Redman style, Busta Rhymes wild style, Missy Elliott futuristic 90s, Lauryn Hill Fugees look, Queen Latifah empowerment, Salt-N-Pepa strong women, TLC baggy overalls, Aaliyah tomboy chic, baggy jeans sagging, Timberland boots hip hop, FUBU clothing brand, Karl Kani style, Cross Colours fashion, Tommy Hilfiger hip hop, starter jackets 90s, gold chains rope, platinum grills beginning, cornrows braids 90s, " +
    
    // NEW: Boy Bands & Pop Stars Specific
    "Backstreet Boys frosted tips, *NSYNC Justin Timberlake ramen hair, 98 Degrees Nick Lachey, Boyz II Men suits, Hanson MMMBop hair, Spice Girls platform shoes, Britney Spears schoolgirl, Christina Aguilera genie bottle, Jessica Simpson blonde, Mandy Moore teen pop, Brandy braids box, Monica R&B style, Destiny's Child matching outfits, TLC left eye glasses, All Saints combat boots pop, " +
    
    // NEW: TV Show Character Specific
    "Rachel Green haircut Friends, Monica Geller style, Phoebe Buffay boho, Chandler Bing dad style, Joey Tribbiani leather jacket, Ross Geller professor, Will Smith Fresh Prince, Carlton Banks preppy, Kelly Kapowski Saved by Bell, Zack Morris blonde hair, AC Slater mullet, Topanga Boy Meets World, Cory Matthews 90s boy, Sabrina teenage witch, Clarissa Explains overalls, Doug Funnie sweatervest, Blossom hat collection, Six from Blossom, DJ Tanner Full House, Uncle Jesse mullet, " +
    
    // NEW: Movie Character & Icon Specific
    "Cher Horowitz Clueless plaid, Dionne Clueless style, Tai makeover Clueless, Kat Stratford 10 Things, Bianca Stratford preppy, Patrick Verona Heath Ledger, Romy Michele reunion, Daria sarcastic style, Beavis and Butthead metalhead, Wayne's World long hair, Garth algar glasses, Austin Powers shagadelic, Neo Matrix trench coat, Trinity Matrix leather, Morpheus sunglasses, Mulder X-Files suit, Scully X-Files blazer, Buffy vampire slayer fashion, Xena warrior princess, Hercules TV show, Power Rangers costumes, " +
    
    // NEW: Fashion Specific Searches  
    "how to dress 90s without looking costume, subtle 90s aesthetic, modern 90s inspired, contemporary grunge, wearable 90s style, everyday nineties look, casual 90s outfit, authentic 90s not Halloween, genuine vintage 90s, period accurate nineties fashion, historically correct 90s, what people actually wore, real 90s street fashion, mall fashion 90s, Gap Kids aesthetic, Limited Too style, Delia's catalog fashion, Abercrombie & Fitch 90s, American Eagle nineties, Hot Topic goth 90s, Pacific Sunwear skater, Anchor Blue style, Wet Seal mall brand, Charlotte Russe 90s, " +
    
    // NEW: Hairstyle Deep Dive
    "Rachel haircut Jennifer Aniston, how to get the Rachel, layered shag 90s, face-framing layers, frosted tips bleach blonde, spiky hair gel, liberty spikes punk, two-toned hair 90s, chunky highlights, butterfly clips everywhere, zigzag part hair, crimped hair iron, scrunched hair gel, wet look gel, slicked back ponytail, messy bun scrunchie, space buns Princess Leia, pigtails with butterfly clips, bandana headband, hair wraps vacation braids, beaded braids, cornrows white people appropriation, box braids 90s, twists natural hair, Caesar cut short, high top fade, buzz cut, bowl cut unfortunate, curtains middle part DiCaprio, " +
    
    // NEW: Accessories & Details
    "choker necklace black velvet, tattoo choker stretchy, hemp necklace puka shells, mood ring color change, slap bracelets snap, jelly bracelets colorful, friendship bracelets embroidery, WWJD bracelet Christian, Livestrong before yellow, safety pin punk, chain wallet attached, carabiner keys, lanyard ID holder, beeper pager clip, cell phone belt clip, Discman anti-skip, Walkman headphones, hoop earrings huge, stud earrings cubic zirconia, eyebrow piercing, tongue piercing, belly button ring, nose ring septum beginning, " +
    
    // NEW: Technology Nostalgia Specific
    "dial-up modem sound, AOL You've Got Mail, AIM away messages, ICQ uh oh, MSN Messenger, Yahoo chat rooms, GeoCities website, Angelfire page, NeoPets virtual pet, Neopets aesthetic, VHS tape rewind, be kind rewind, Blockbuster Friday night, Hollywood Video rental, VHS tracking adjust, CRT monitor curved screen, Windows 95 start button, Windows 98 aesthetic, Encarta encyclopedia CD, Oregon Trail game, Carmen Sandiego where in world, Minesweeper addiction, floppy disk save icon, ZIP drive backup, CD-ROM games, Game Boy original, Game Boy Color, Nintendo 64 goldeneye, PlayStation 1 memory card, Sega Dreamcast, Tamagotchi digital pet, Furby creepy toy, Bop It game, Giga Pets, " +
    
    // NEW: Music Video & MTV Specific
    "MTV unplugged aesthetic, Behind the Music documentary, TRL Total Request Live, Carson Daly hosting, MTV Cribs houses, Yo MTV Raps, 120 Minutes alternative, Beavis and Butthead videos, Daria MTV, Real World MTV, Road Rules challenge, music video before YouTube, waiting for video to play, recording on VHS, MTV Video Music Awards, Britney snake performance, Madonna Britney kiss, Eminem bleach blonde, " +
    
    // NEW: Sports & Athletes 90s
    "Michael Jordan Bulls 90s, Space Jam aesthetic, Dennis Rodman wild hair, Shaquille O'Neal Orlando, Penny Hardaway style, Allen Iverson cornrows, Grant Hill clean cut, Ken Griffey Jr backwards hat, Derek Jeter Yankees, Cal Ripken streak, Mark McGwire home runs, Sammy Sosa corked bat, Brett Favre tough guy, Emmitt Smith Cowboys, Deion Sanders Prime Time, Jerry Rice 49ers, Wayne Gretzky hockey, Mario Lemieux Penguins, Patrick Roy goalie, Pete Sampras tennis, Andre Agassi mullet then bald, Tiger Woods emergence, Lance Armstrong before scandal, Tony Hawk skateboard, extreme sports X Games, " +
    
    // NEW: Cartoon & Kids Show Specific
    "Rugrats Tommy Pickles, Chuckie Finster glasses, Doug Funnie sweatervest, Patti Mayonnaise, Hey Arnold football head, Helga pigtails, Animaniacs zany, Tiny Toon Adventures, Batman animated series, X-Men animated, Spider-Man animated 90s, Teenage Mutant Ninja Turtles, Power Rangers Mighty Morphin, Captain Planet mullet, Magic School Bus, Bill Nye Science Guy, Where in World Carmen Sandiego, Wishbone dog Shakespeare, Arthur aardvark glasses, Recess playground gang, Pepper Ann quirky, Dexter's Laboratory accent, Johnny Bravo muscles, Cow and Chicken weird, I Am Weasel, Ed Edd n Eddy, CatDog conjoined, Angry Beavers, " +
    
    // NEW: Video Game Aesthetic
    "Nintendo 64 controller, PlayStation 1 startup, Sega Genesis blast processing, Super Nintendo 16-bit, Game Boy brick, Pokemon Red Blue, Pokemon cards original, Pikachu everywhere, Mario 64 3D, Goldeneye split screen, Perfect Dark, Banjo Kazooie, Donkey Kong 64, Ocarina of Time, Majora's Mask, Super Smash Bros original, Tony Hawk Pro Skater, Crash Bandicoot, Spyro the Dragon, Final Fantasy VII, Metal Gear Solid, Resident Evil, Silent Hill, Tomb Raider Lara Croft, Duke Nukem, Half-Life, Starcraft, Diablo, Warcraft, Counter-Strike beginning, " +
    
    // NEW: Food & Snacks 90s
    "Lunchables pizza, Dunkaroos kangaroo, Fruit by the Foot, Fruit Roll-Ups, Gushers burst, Fruit Stripe gum zebra, Big League Chew, Bubble Tape, Push Pop lollipop, Ring Pop candy, Warheads sour, Nerds candy, Fun Dip, Pixy Stix, Pop Rocks, Surge soda green, Orbitz drink balls, OK Soda alternative, Clearly Canadian sparkling, Snapple facts, Arizona iced tea, Sunny D orange drink, Capri Sun pouch, Squeezit bottle, Kool-Aid Bursts, Crystal Pepsi clear, Jolt Cola caffeine, Mountain Dew extreme, Hot Pockets microwave, Bagel Bites, Pizza Bagels, Totino's Pizza Rolls, Kid Cuisine penguin, " +
    
    // NEW: Mall Culture 90s
    "hanging at the mall, mall rats Kevin Smith, food court hangout, Orange Julius smoothie, Sbarro pizza slice, Hot Dog on a Stick, Auntie Anne's pretzels, Cinnabon cinnamon rolls, arcade games mall, photo booth strips, Spencer's Gifts mall, Sam Goody music store, Suncoast video, FYE music movies, Tower Records, Borders bookstore coffee, Waldenbooks mall, KB Toys, Electronics Boutique, Babbages video games, Software Etc, Claire's Accessories piercing, Icing by Claire's, The Body Shop mall, Bath & Body Works, Victoria's Secret Pink beginning, " +
    
    // NEW: School & Education 90s
    "Trapper Keeper binder, Lisa Frank stickers rainbow, Pee Chee folder, mechanical pencil click, gel pens glitter, scented markers, overhead projector transparent, VHS in classroom, TV cart wheeled in, computer lab class, typing class Mavis Beacon, Oregon Trail died of dysentery, Carmen Sandiego computer, Number Munchers math, Reader Rabbit, Where in Time, floppy disk computer lab, iMac colorful computers, Gateway cow boxes, scholastic book fair, book orders monthly, AR reading points, Book-It Pizza Hut, " +
    
    // NEW: Party & Event Themes
    "90s birthday party ideas, nineties costume party, grunge themed party, Fresh Prince party, Friends themed event, Clueless party outfit, totally 90s party, radical nineties party, decade party 90s, themed birthday nineties, 30th birthday 90s theme (born in 90s), spirit week 90s day outfit, homecoming 90s theme, prom 90s aesthetic, wedding 90s nostalgia, bachelorette 90s party, reunion 90s theme, throwback party nineties, " +
    
    // NEW: Workplace & Professional 90s
    "business casual 90s, Dockers khakis, polo shirt tucked in, pleated pants, suspenders nerd, pocket protector, briefcase leather, Trapper Keeper adult, Palm Pilot PDA, Blackberry precursor, pager beeper business, car phone bag, Motorola flip phone, Nokia brick phone, cubicle office space, fax machine important, Rolodex contacts, Daytimer planner, Franklin Covey system, Post-It notes everywhere, Wite-Out correction, electric typewriter, laser printer, dot matrix printer, " +
    
    // NEW: Holiday Specific 90s
    "90s Christmas aesthetic, Furby under tree, Tickle Me Elmo, Beanie Babies gift, Pokemon cards present, Nintendo 64 Christmas, Tamagotchi stocking, Skip-It toy, Moon Shoes, Pogs slammers, inflatable furniture, lava lamp gift, blacklight posters, Halloween 90s costumes, Scream Ghostface mask, Mighty Morphin costume, Princess Leia costume, Spice Girls Halloween, Britney Spears costume, " +
    
    // NEW: Regional/Geographic 90s
    "Seattle grunge scene, New York hip hop, LA gangsta rap, Atlanta dirty south beginning, Detroit techno, Chicago house music, Miami bass music, New Orleans bounce, Bay Area hyphy beginning, Texas chopped and screwed, UK britpop, Manchester Madchester, London rave scene, Ibiza club culture, Berlin techno, Tokyo street fashion beginning, " +
    
    // NEW: Subculture Specific
    "straightedge hardcore, vegan hardcore, SHARP skinheads, traditional skinheads, punk not dead, crusty punks, gutter punks, riot grrrl feminist, Kathleen Hanna Bikini Kill, third wave feminism, zine culture DIY, photocopied zines, record label indie, indie rock aesthetic, college radio, pirate radio, rave culture PLUR, candy kid raver, jnco jeans raver, pacifier necklace controversy, glow sticks rave, warehouse parties, underground clubs, " +
    
    // NEW: Question-Based Searches
    "what did people wear in the 90s really, did everyone wear baggy jeans, was grunge actually popular everywhere, when did boy bands peak, what year frosted tips, when did the Rachel haircut happen, difference between early and late 90s, grunge vs alternative rock difference, hip hop vs gangsta rap 90s, when did rave culture start, what came after grunge, transition from 80s to 90s fashion, when did 90s style change, 90s vs 2000s fashion difference, how to tell photo is from 90s, dating old photos 90s clues, " +
    
    // NEW: Comparison Searches
    "90s vs 80s style difference, 90s vs 2000s which better, early 90s vs late 90s fashion, grunge vs preppy 90s, hip hop vs alternative 90s, Friends vs Seinfeld style, boy bands vs rock bands 90s, *NSYNC vs Backstreet Boys, Britney vs Christina, Tupac vs Biggie, East Coast vs West Coast, Seattle sound vs LA sound, MTV vs VH1, Nintendo vs PlayStation, " +
    
    // NEW: Specific Photo Types
    "90s school picture day laser background, class photo 1990s, team photo nineties, prom photo 90s style, homecoming dance 90s, graduation portrait nineties, senior picture 90s yearbook, engagement photo 90s disposable camera, wedding photo nineties aesthetic, family portrait 90s Sears, Christmas card photo 90s sweaters, vacation photo disposable camera, road trip picture 90s, camping photo nineties, beach photo 90s, pool party disposable, backyard photo 90s, birthday party 90s, baby photo 90s, ultrasound 90s black white grainy, " +
    
    // NEW: Age/Generation Specific
    "born in the 90s aesthetic, 90s baby photo, millennial childhood 90s, elder millennial nineties, younger millennial late 90s, Gen X 90s style, teenager in the 90s, young adult nineties, college student 90s style, working professional nineties, stay at home mom 90s, dad fashion nineties, soccer mom 90s, blue collar 90s, white collar nineties, " +
    
    // NEW: Emotional/Personal Searches
    "recreate parents 90s wedding, mom in high school 90s, dad's yearbook nineties, grandparents 90s style, sibling childhood photos 90s, family photos nineties recreation, my childhood in the 90s, when I was a kid aesthetic, elementary school memories, middle school cringe 90s, high school glory days, college years nineties, first job 90s, first apartment nineties, first car 90s, coming of age nineties, finding myself 90s, " +
    
    // NEW: Social Media Use Cases
    "Throwback Thursday 90s, TBT nineties style, Flashback Friday 90s, vintage aesthetic Instagram, retro feed nineties, nostalgia content 90s, millennial content creator, Gen X memories nineties, TikTok 90s trend, Instagram 90s filter, Facebook 90s profile pic, dating profile 90s aesthetic, unique profile picture nineties, stand out social media 90s, viral 90s photo, trending nineties content, 90s challenge social media, decades challenge nineties, " +
    
    // NEW: Rave & Club Culture
    "rave culture PLUR, peace love unity respect, candy raver bracelets, kandi bracelets trading, pacifier necklace rave, baby bottle rave, glow sticks dancing, light shows rave, poi spinning, liquid dancing, Melbourne shuffle, drum and bass rave, jungle music, breakbeat hardcore, happy hardcore, gabber hardcore, trance music, house music rave, techno warehouse, electronica, trip hop, big beat, chemical brothers, prodigy firestarter, fatboy slim, basement jaxx, daft punk, " +
    
    // NEW: Extreme Sports & Action
    "Tony Hawk skateboarding, Bam Margera CKY, Rodney Mullen tech, Bob Burnquist vert, skateboard video game, X Games extreme sports, BMX freestyle, Dave Mirra BMX, Mat Hoffman BMX, inline skating aggressive, rollerblading, snowboarding, wakeboarding, surfing extreme, motocross, FMX freestyle, street luge, " +
    
    // NEW: Common Typos/Misspellings
    "90's photo generator, ninetys style, 1990's aesthetic, grunge aestetic, flanell shirt, bagy jeans, frosted tipps, Rachel haircut, *NSINK, Backstreet Boyz, Brittney Spears, Christina Aguilara, Fresh Prinse, Nirvanna band, Pearl Jam, Tupak, Biggie Smalls, disposible camera, yearbook phot, mall foto booth, " +
    
    // NEW: Long-Tail Conversational
    "I want to look like I'm in Friends, show me as Rachel from Friends, make me into a grunge rocker, what would I look like with frosted tips, turn me into Fresh Prince style, I need 90s costume for party, help me win decade day at school, want to recreate family photos from 90s, looking for authentic yearbook 90s style, need realistic 90s not cheesy, want to see myself in JNCO jeans, curious how I'd look with Rachel haircut, show me in baggy 90s hip hop, transport me back to TRL era, make me a 90s teen, " +
    
    // NEW: Content Creator Specific
    "90s content creator ideas, nostalgia content nineties, throwback content strategy, vintage aesthetic influencer 90s, retro brand ambassador nineties, 90s themed content series, decade content nineties, millennial nostalgia posts, Gen X throwback content, family history 90s stories, ancestry storytelling nineties, generational content 90s, viral nostalgia marketing, throwback Thursday strategy, before after 90s transformation";

  const title = customTitle || defaultTitle;
  const description = customDescription || defaultDescription;
  const keywords = customKeywords || defaultKeywords;
  const imageUrl = customOgImage || ogImage;
  const canonicalUrl = customCanonicalUrl || pageUrl;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "90s AI Photo Generator - Grunge, Hip Hop & Yearbook Creator",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web",
    "description": description,
    "url": canonicalUrl,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "description": "Free 90s AI photo transformation with sign-up credits"
    },
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
      // ORIGINAL FEATURES (KEEPING ALL)
      "Transform photos into authentic 1990s style with AI",
      "Grunge aesthetic with flannel shirts and ripped jeans",
      "Hip hop style with baggy jeans and backwards caps",
      "Alternative rock look inspired by Nirvana, Pearl Jam",
      "90s yearbook photo recreation",
      "Fresh Prince and Friends TV show aesthetics",
      "Frosted tips and Rachel haircut generation",
      "Pop punk and skater looks",
      "90s rave and club kid aesthetics",
      "Vintage mall photo booth effects",
      "VHS and CRT monitor vintage filters",
      "Authentic 1990s fashion and hairstyles",
      "Nostalgic throwback transformations",
      "Free AI-powered 90s generation",
      "High-resolution 90s style downloads",
      "Perfect for themed parties and nostalgia",
      
      // NEW: Specific Style Features
      "Kurt Cobain Nirvana grunge flannel and ripped jeans",
      "Tupac bandana and baggy jeans West Coast",
      "Biggie Notorious BIG East Coast style",
      "Rachel Green haircut Friends Jennifer Aniston",
      "Will Smith Fresh Prince colorful hip hop",
      "Cher Horowitz Clueless plaid skirt suit",
      "Justin Timberlake *NSYNC frosted tips ramen hair",
      "Britney Spears schoolgirl and crop tops",
      "Backstreet Boys boy band coordinated outfits",
      "Spice Girls platform shoes and girl power",
      "TLC baggy overalls and condom glasses",
      "Aaliyah tomboy chic and bandana top",
      
      // NEW: Fashion Details
      "Flannel shirts over band tees",
      "Ripped jeans authentic distressed",
      "JNCO jeans extremely wide leg",
      "Baggy jeans sagging style",
      "Carpenter jeans with hammer loop",
      "Overalls one strap down",
      "Cargo pants multiple pockets",
      "Track pants sporty casual",
      "Windbreaker jackets colorful",
      "Starter jackets sports teams",
      "Leather jackets grunge",
      "Denim jackets oversized",
      "Combat boots Doc Martens",
      "Platform shoes Spice Girls style",
      "Timberland boots hip hop",
      "Airwalk sneakers skater",
      "Vans checkerboard skater",
      "Converse Chuck Taylor high tops",
      "Nike Air Jordans basketball",
      "Reebok Pumps inflate",
      
      // NEW: Hairstyle Variations
      "Frosted tips bleached blonde spiky",
      "Rachel haircut layered shag face-framing",
      "Crimped hair zigzag texture",
      "Space buns Princess Leia style",
      "Butterfly clips all over head",
      "Zigzag part with clips",
      "Cornrows braids appropriation controversy",
      "Box braids 90s R&B",
      "Bandana headband Tupac style",
      "Backwards baseball cap",
      "Slicked back ponytail gel",
      "Messy bun with scrunchie",
      "Two-toned hair dye",
      "Chunky highlights contrasting",
      "Curtains middle part Leo DiCaprio",
      "Caesar cut short fade",
      "High top fade hip hop",
      "Bowl cut unfortunate",
      
      // NEW: Accessories & Props
      "Choker necklace black velvet or tattoo style",
      "Chain wallet attached to belt loop",
      "Slap bracelet snap wrist",
      "Mood ring color changing",
      "Pager beeper on belt",
      "Discman portable CD player",
      "Walkman cassette player",
      "Game Boy handheld gaming",
      "Tamagotchi digital pet keychain",
      "Disposable camera Kodak",
      "VHS tape rewinding",
      "Floppy disk save icon",
      "AOL CD-ROM coasters",
      
      // NEW: Color & Aesthetic Features
      "Faded film camera color grading",
      "Warm nostalgic tones",
      "Slight grain texture vintage",
      "Mall photo booth strip aesthetic",
      "Laser background yearbook",
      "VHS tape static effect",
      "CRT monitor scan lines",
      "Disposable camera flash washout",
      "Overexposed highlights 90s",
      "Muted colors authentic period",
      
      // NEW: Background Options
      "Laser background yearbook portrait",
      "Mall interior 90s aesthetic",
      "Arcade games background",
      "Food court tables",
      "Bedroom posters on walls",
      "Living room wood paneling ending",
      "School hallway lockers",
      "Basketball court outdoor",
      "Skate park ramps",
      "Record store aisles",
      "Blockbuster video shelves",
      "Bedroom with PC",
      
      // NEW: Use Case Features
      "Perfect for 90s themed costume parties",
      "Decade Day school spirit week winner",
      "Halloween authentic 90s costume reference",
      "Throwback Thursday millennial nostalgia",
      "30th birthday party (born 1994-95)",
      "Friends themed party outfit ideas",
      "Fresh Prince themed event",
      "Grunge party flannel aesthetic",
      "Hip hop throwback party",
      "90s prom or homecoming theme",
      "Wedding 90s nostalgia photos",
      "Family reunion 90s recreation",
      "Yearbook throwback comparison",
      "Class reunion costume ideas",
      
      // NEW: Pop Culture Features
      "Friends Central Perk coffee shop aesthetic",
      "Fresh Prince colorful living room",
      "Saved by the Bell Bayside High",
      "Boy Meets World hallway",
      "Full House San Francisco",
      "Clueless Beverly Hills high school",
      "Dazed and Confused last day school",
      "MTV TRL studio audience",
      "Saturday Night Live 90s cast",
      "In Living Color sketch comedy",
      
      // NEW: Technical Features
      "Instant 30-60 second generation",
      "High-resolution printable output",
      "Authentic period-accurate details",
      "Natural-looking not costume-y unless desired",
      "Historically accurate 90s fashion",
      "Era-appropriate color palettes",
      "Genuine vintage film look",
      "Professional photo quality",
      "Download and share immediately",
      "Multiple style options per decade",
      "Grunge, hip hop, prep, rave, skater variants"
    ],
    "potentialAction": {
      "@type": "UseAction",
      "target": canonicalUrl,
      "description": "Transform your photos into totally rad 90s style online"
    },
    "category": "AI Photo Generator & Vintage Style Creator",
    "genre": ["Photography", "AI Tools", "Nostalgia", "90s Culture", "Retro Style"]
  };

  // MASSIVELY EXPANDED FAQ with real human questions
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      // ORIGINAL FAQs (KEEPING ALL)
      {
        "@type": "Question",
        "name": "How can I make myself look like the 90s?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Upload your photo to our free 90s AI generator and choose from styles like grunge (flannel shirts, ripped jeans), hip hop (baggy clothes, backwards caps), alternative rock, or pop punk. Our AI instantly transforms you into authentic 1990s style with period-accurate fashion, hairstyles like frosted tips or the Rachel cut, and vintage photo effects."
        }
      },
      {
        "@type": "Question",
        "name": "What is 90s grunge aesthetic?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "90s grunge aesthetic includes flannel shirts, ripped jeans, combat boots, messy hair, dark colors, and an anti-fashion attitude inspired by bands like Nirvana, Pearl Jam, and Soundgarden. Our AI recreates this iconic Seattle sound era look with authentic grunge fashion and moody vintage effects."
        }
      },
      {
        "@type": "Question",
        "name": "Can I create a 90s yearbook photo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our 90s AI generator creates authentic yearbook-style photos with laser backgrounds, awkward poses, 90s hairstyles (frosted tips, butterfly clips, Rachel cut), and that classic school portrait look. Perfect for throwback Thursday, themed parties, or reliving your high school years."
        }
      },
      {
        "@type": "Question",
        "name": "What 90s styles can I create?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Choose from grunge (flannel and attitude), hip hop (baggy jeans and bling), alternative rock, pop punk, skater, preppy (as if from Clueless), rave/club kid, or Fresh Prince style. Each captures authentic 90s fashion, hairstyles, and the vibe of that totally rad decade."
        }
      },
      {
        "@type": "Question",
        "name": "Is this good for 90s themed parties?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Perfect for 90s themed parties, spirit week decade day, Halloween costumes, throwback birthdays, or weddings with 90s themes. Create your look before the party or use it for invitations and social media. Totally rad for any nostalgic celebration!"
        }
      },
      {
        "@type": "Question",
        "name": "What TV shows and movies inspired these styles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our 90s styles are inspired by iconic shows and movies like Friends (the Rachel haircut), Fresh Prince of Bel-Air (hip hop fashion), Clueless (preppy style), Dazed and Confused (alternative looks), and the MTV generation. Capture the essence of your favorite 90s pop culture moments."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get frosted tips or the Rachel haircut?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our AI can add iconic 90s hairstyles including frosted tips (like *NSYNC and Backstreet Boys), the Rachel cut from Friends, butterfly clips, zigzag parts, crimped hair, space buns, and more. Choose your style and let the AI transform your hair into peak 90s fashion."
        }
      },
      {
        "@type": "Question",
        "name": "How long does the 90s transformation take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your 90s transformation takes 30-60 seconds. Upload your photo, pick your style (grunge, hip hop, alternative, etc.), and our AI instantly transports you back to the most radical decade. Download your totally awesome 90s photo immediately."
        }
      },
      {
        "@type": "Question",
        "name": "Is the 90s AI generator free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Get free credits when you sign up (no credit card required) to try our 90s AI generator. Transform yourself into grunge, hip hop, or any 90s style for free. Additional credits available if you want to create multiple looks or try different decades."
        }
      },
      {
        "@type": "Question",
        "name": "What makes a photo look authentically 90s?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Authentic 90s photos have specific color grading (slightly faded, warm tones), grain texture like film cameras, period-accurate fashion (flannel, baggy jeans, chokers), iconic hairstyles, and that mall photo booth or yearbook portrait aesthetic. Our AI captures all these elements to make your photo genuinely look like it's from 1990-1999."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this for social media throwbacks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Perfect for Throwback Thursday (#TBT), Instagram nostalgia posts, Facebook memories, and TikTok trends. Create authentic-looking 90s photos that'll make your followers think you found old yearbook pictures. Great for millennial and Gen X content creators reliving the glory days."
        }
      },
      
      // NEW: Family & Personal Questions
      {
        "@type": "Question",
        "name": "Can I recreate my parents' 90s style?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Upload your photo and transform into your parents' 90s era - whether they were grunge rockers, hip hop heads, preppy mall shoppers, or just regular folks with butterfly clips and baggy jeans. Perfect for seeing yourself in your parents' high school or college years."
        }
      },
      {
        "@type": "Question",
        "name": "What if I was born in the 90s - can I see my baby/childhood aesthetic?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! If you're a 90s baby (born 1990-1999), recreate that childhood aesthetic with 90s kid fashion, disposable camera quality, VHS home video look, or those awkward school photos with laser backgrounds. Perfect for nostalgic millennial content about growing up in the best decade."
        }
      },
      
      // NEW: Specific Icon/Character Questions
      {
        "@type": "Question",
        "name": "Can I look like Kurt Cobain from Nirvana?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Choose our grunge style for authentic Kurt Cobain aesthetic - oversized flannel shirts, ripped jeans, messy blonde hair, combat boots, and that iconic anti-establishment attitude. Perfect for capturing the Seattle grunge scene and Generation X angst."
        }
      },
      {
        "@type": "Question",
        "name": "How do I get the Rachel haircut from Friends?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI can transform your hair into the iconic Rachel Green layered shag made famous by Jennifer Aniston in Friends. This was THE most requested haircut of the 90s with face-framing layers and that bouncy, voluminous look."
        }
      },
      {
        "@type": "Question",
        "name": "Can I create a Tupac or Biggie hip hop look?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Choose our hip hop style for authentic golden age rap aesthetic - Tupac's bandana and baggy jeans West Coast style, or Biggie's East Coast fashion with Coogi sweaters and Versace. Capture the era when hip hop ruled MTV and TRL."
        }
      },
      {
        "@type": "Question",
        "name": "What about boy band frosted tips?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Get those iconic bleached frosted tips made famous by Justin Timberlake (*NSYNC), Nick Carter (Backstreet Boys), and every boy band of the late 90s. That spiky, blonde-tipped hair with dark roots was everywhere from 1998-2002!"
        }
      },
      
      // NEW: Specific Style Questions
      {
        "@type": "Question",
        "name": "What's the difference between early 90s and late 90s style?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Early 90s (1990-1994) was peak grunge - flannel, darker colors, anti-fashion, alternative rock dominance. Mid-90s (1995-1997) saw hip hop golden age and the rise of pop punk. Late 90s (1998-1999) brought boy bands, pop princesses, frosted tips, and Y2K metallic fashion beginning. Our AI can capture any era within the decade."
        }
      },
      {
        "@type": "Question",
        "name": "Can I create a Clueless preppy look?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "As if! Yes, choose our preppy style for Cher Horowitz aesthetic - plaid skirt suits, knee-high socks, headbands, and that Beverly Hills fashion. Perfect for recreating Clueless, that iconic 90s teen movie that defined preppy fashion."
        }
      },
      {
        "@type": "Question",
        "name": "What about 90s rave culture?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our rave/club kid style creates authentic 90s rave aesthetic with candy bracelets (kandi), baggy JNCO jeans, platform shoes, bright colors, pacifier necklaces, and glow sticks. Capture the PLUR (Peace Love Unity Respect) era of underground warehouse parties and electronic music."
        }
      },
      
      // NEW: Technical/Quality Questions
      {
        "@type": "Question",
        "name": "Will this look like a real 90s photo or obviously AI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI creates authentic-looking 90s photos with period-accurate fashion, hairstyles, and that genuine disposable camera or yearbook quality. We focus on historical accuracy - not costume-y exaggerations. The result looks like it was actually taken between 1990-1999."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get that disposable camera or VHS quality?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our 90s generator can add authentic vintage effects like disposable camera flash washout, VHS tape scan lines, film grain, slight blur, and that characteristic 90s color grading. Makes your photo look like it's from an old family album or home video."
        }
      },
      
      // NEW: Use Case Questions
      {
        "@type": "Question",
        "name": "Is this good for a 30th birthday party (born in 1994-95)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Perfect! Create 90s baby aesthetic for your 30th birthday. Show yourself as a 90s kid with authentic fashion from your childhood decade. Great for party invitations, decorations, or social media posts celebrating being a 90s baby turning 30."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this for decade day at school?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Totally rad for spirit week! Preview different 90s looks before committing to a costume - grunge flannel, hip hop baggy jeans, boy band frosted tips, or Clueless preppy. See which style suits you best and definitely win best dressed for 90s day!"
        }
      },
      {
        "@type": "Question",
        "name": "What about a Friends themed party?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Perfect! Create Friends character looks - Rachel's haircut, Monica's chef style, Phoebe's boho fashion, or the guys' casual 90s looks. Great for Friends-themed birthdays, Halloween costumes, or just celebrating the most iconic 90s sitcom."
        }
      },
      
      // NEW: Technology & Nostalgia
      {
        "@type": "Question",
        "name": "Can you add 90s technology like pagers or Discmans?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our AI can include authentic 90s tech props like pagers on belts, Discman CD players, Walkmans, Game Boys, flip phones, and other nostalgic technology. Perfect for capturing that pre-smartphone era when we all had beepers and actually talked on phones."
        }
      },
      {
        "@type": "Question",
        "name": "What about mall photo booth aesthetic?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! We can recreate that classic 90s mall photo booth strip look - black and white or color, photo booth border, multiple poses, and that grainy quality. Perfect for nostalgia about hanging out at the mall with friends before smartphones existed."
        }
      },
      
      // NEW: Music & Pop Culture
      {
        "@type": "Question",
        "name": "Can I look like I'm on MTV TRL?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Create that MTV Total Request Live studio audience aesthetic from 1998-1999 when Carson Daly hosted and Britney, *NSYNC, and Backstreet Boys ruled. Capture peak late 90s pop culture when everyone rushed home after school to watch TRL."
        }
      },
      {
        "@type": "Question",
        "name": "What about alternative rock style?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Choose our alternative rock style for bands like Pearl Jam, Soundgarden, Smashing Pumpkins aesthetic - flannel, band tees, ripped jeans, combat boots, messy hair, and that disaffected Generation X attitude. Perfect for 90s alternative music fans."
        }
      },
      
      // NEW: Comparison Questions
      {
        "@type": "Question",
        "name": "Is this better than just using a 90s filter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We don't just add a filter - our AI transforms your entire photo with authentic 90s fashion, hairstyles, accessories, backgrounds, and period-accurate details. Filters only change colors; we recreate the complete 90s aesthetic from hair to shoes to photo quality."
        }
      },
      
      // NEW: Privacy Questions
      {
        "@type": "Question",
        "name": "What happens to my photos after generation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your photos are automatically deleted from our servers within 1 hour after processing. We never store, save, or use your photos for AI training. Your personal photos and 90s transformations remain completely private. We respect your nostalgia and privacy!"
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Transform Your Photo into 90s Style",
    "description": "Create authentic 1990s grunge, hip hop, or yearbook style photos with AI",
    "totalTime": "PT2M",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Upload Your Photo",
        "text": "Upload a clear photo of yourself. Modern selfies work great! The AI will transform it into authentic 90s style.",
        "image": `${siteUrl}/images/howto/upload-90s.jpg`
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Choose Your 90s Style",
        "text": "Pick from grunge (flannel and attitude), hip hop (baggy jeans), alternative rock, pop punk, skater, preppy (Clueless vibes), or rave aesthetics. Each captures a different vibe of the totally rad decade.",
        "image": `${siteUrl}/images/howto/choose-90s-style.jpg`
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "AI Generates Your 90s Look",
        "text": "Our AI transforms your photo with authentic 90s fashion, hairstyles (frosted tips, Rachel cut), vintage color grading, and that iconic yearbook or mall photo booth aesthetic. Takes 30-60 seconds.",
        "image": `${siteUrl}/images/howto/ai-processing-90s.jpg`
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Download & Share",
        "text": "Download your totally awesome 90s transformation in high resolution. Perfect for social media throwbacks, themed parties, or just reliving the best decade ever!",
        "image": `${siteUrl}/images/howto/download-90s.jpg`
      }
    ]
  };

  return (
    <Head>
      {/* Basic Meta Tags - NOSTALGIA OPTIMIZED */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={canonicalUrl} />

      {/* ADDED: Multiple title variations */}
      <meta property="og:title:alt" content="Make Me Look Like the 90s - Free Grunge & Hip Hop AI Generator" />
      <meta name="twitter:title:alt" content="90s Style Photo Creator - Totally Rad AI Transformation" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Throwback AI - 90s Photo Generator" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Transform into authentic 90s style - grunge flannel, hip hop baggy jeans, frosted tips, Rachel haircut, yearbook photos with AI generator" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@throwbackai" />
      <meta name="twitter:creator" content="@throwbackai" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twitterImage} />
      <meta name="twitter:image:alt" content="Create totally rad 90s photos with AI - grunge, hip hop, alternative rock, yearbook style transformations" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#800080" />
      <meta name="msapplication-TileColor" content="#800080" />
      <meta name="application-name" content="90s AI Generator - Throwback AI" />
      <meta name="apple-mobile-web-app-title" content="90s Photo Generator" />
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

      {/* ADDED: 90s culture-specific meta tags */}
      <meta name="decade" content="1990s,nineties,90s" />
      <meta name="era" content="grunge-era,hip-hop-golden-age,alternative-rock,MTV-generation" />
      <meta name="style-categories" content="grunge,hip-hop,alternative,pop-punk,skater,preppy,rave" />
      <meta name="fashion-trends" content="flannel,baggy-jeans,chokers,platform-shoes,backwards-caps,frosted-tips,rachel-haircut,butterfly-clips,JNCO-jeans" />
      <meta name="music-references" content="nirvana,pearl-jam,tupac,biggie,backstreet-boys,nsync,spice-girls,soundgarden,sublime" />
      <meta name="tv-movie-references" content="friends,fresh-prince,clueless,saved-by-the-bell,boy-meets-world,dazed-and-confused,MTV" />
      <meta name="target-audience" content="millennials,gen-x,nostalgia,90s-kids,throwback-enthusiasts" />
      <meta name="use-cases" content="themed-parties,spirit-week,halloween,throwback-thursday,social-media,yearbook-recreation" />
      <meta name="tech-nostalgia" content="dial-up,AOL,VHS,cassette,walkman,game-boy,tamagotchi,CRT-monitor,floppy-disk" />
      <meta name="cultural-keywords" content="totally-rad,as-if,talk-to-the-hand,all-that,what-ever,phat,da-bomb,MTV-cribs,TRL" />

      {/* Facebook Pixel / Publisher Info */}
      <meta property="fb:pages" content={facebookPageId} />
      <meta property="article:publisher" content={facebookPageUrl} />

      {/* Structured Data - Main Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />

      {/* HowTo Schema */}
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
            "name": "Throwback AI - 90s Photo Generator",
            "description": "Free AI-powered 90s photo transformation service - create grunge, hip hop, and authentic 1990s style photos online",
            "url": canonicalUrl,
            "sameAs": [facebookPageUrl],
            "serviceArea": {
              "@type": "Place",
              "name": "Worldwide"
            },
            "priceRange": "Free",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "90s Photo Transformation Styles",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Grunge Style Transformation",
                    "description": "Transform into authentic 90s grunge aesthetic with flannel, ripped jeans, and Seattle sound vibes"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Hip Hop Style Generation",
                    "description": "Create 90s hip hop looks with baggy jeans, backwards caps, and golden age rap aesthetics"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "90s Yearbook Photo Creator",
                    "description": "Generate authentic yearbook-style portraits with laser backgrounds and iconic 90s hairstyles"
                  }
                }
              ]
            }
          })
        }}
      />

      {/* Preload Critical Resources */}
      <link rel="preload" href="/fonts/grunge-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/images/crt-monitor.png" as="image" />

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//replicate.com" />
      <link rel="dns-prefetch" href="//supabase.co" />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Additional SEO Tags */}
      <meta name="revisit-after" content="3 days" />
      <meta name="distribution" content="global" />
      <meta name="target" content="all" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
    </Head>
  );
};

export default NinetiesSEO;