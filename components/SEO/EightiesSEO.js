// components/seo/EightiesSEO.js - MAXIMUM SEO OPTIMIZATION + HUMAN SEARCH TERMS
import Head from "next/head";

const siteUrl = "https://throwbackai.app";
const pageUrl = `${siteUrl}/replicate/80s`;
const ogImage = `${siteUrl}/images/decades/80sSEO.png`;
const twitterImage = ogImage;
const facebookPageUrl = "https://www.facebook.com/profile.php?id=61578072554521";
const facebookPageId = "61578072554521";

const EightiesSEO = ({ 
  customTitle = null,
  customDescription = null,
  customKeywords = null,
  customOgImage = null,
  customCanonicalUrl = null
}) => {
  const defaultTitle = "80s AI Photo Generator Free | Make Me Look Like the 80s - Neon, Synthwave, Miami Vice & Big Hair Creator";
  
  const defaultDescription = "Free 80s AI photo generator - Transform into authentic 1980s style! Create neon synthwave looks, Miami Vice aesthetics, big hair, mullets, power suits, and vintage yearbook photos. Relive the era of MTV, arcade games, Breakfast Club, and totally radical fashion. Make yourself look gnarly with AI-powered 80s transformations. Try free - no credit card required!";
  
  // MASSIVELY EXPANDED: Real human searches - nostalgic, emotional, specific use cases
  const defaultKeywords = 
    // ORIGINAL KEYWORDS (KEEPING ALL)
    "make me look like the 80s, turn my photo into 80s style, how to look like 80s neon, AI 80s photo generator free, make myself look 80s, 80s yearbook photo creator, synthwave aesthetic photo, create 80s style picture, transform photo to 1980s, 80s AI filter free, look like I'm from the 80s, vintage 80s photo effect, make my photo look 80s, retro 80s picture maker, eighties style generator, Miami Vice style photo, neon 80s aesthetic, Breakfast Club look, Back to the Future style, Stranger Things 80s aesthetic, synthwave photo creator, vaporwave aesthetic, give me big 80s hair, mullet generator, 80s power suit photo, Valley Girl aesthetic, Madonna 80s look, Michael Jackson style photo, Prince purple rain aesthetic, 80s rock hair band look, hair metal style, new wave fashion photo, arcade aesthetic 80s, Pac-Man era photo, Rubik's cube generation, Walkman aesthetic, boom box photo, leg warmers style, shoulder pads fashion, neon windbreaker look, tracksuits 80s style, jazzercise aesthetic, aerobics outfit photo, Member's Only jacket, parachute pants look, Trapper Keeper aesthetic, mall culture 80s, roller skating aesthetic, DeLorean car photo, cassette tape aesthetic, VHS tracking lines, wood paneling background, geometric shapes 80s, chrome aesthetic, pastel colors photo, neon pink and blue, retro futuristic look, totally tubular photo, radical 80s transformation, gnarly photo maker, bodacious style creator, like totally 80s, gag me with a spoon aesthetic, 80s themed party photo, decade day costume 80s, spirit week eighties, Halloween 80s costume, 80s prom photo, homecoming 80s theme, 80s wedding aesthetic, 80s birthday party, create 80s look for party, what would I look like in 80s, time travel to 80s photo, 80s me challenge, throwback Thursday 80s, TBT 80s style, MTV generation look, arcade generation photo, before cell phones look, Reagan era photo, Cold War aesthetic, Berlin Wall era, " +
    
    // NEW: Nostalgic/Emotional Searches (How Gen X remembers the 80s)
    "best decade ever 80s, when MTV actually played music, golden age of arcade games, childhood in the 80s, growing up in the eighties, elementary school 80s, middle school eighties, high school 80s style, college 80s fashion, 80s kid memories, Gen X childhood aesthetic, latchkey kids generation, Saturday morning cartoons 80s, after school special, summer vacation eighties, no internet simple times, playing outside until dark, before helicopter parents, freedom of 80s childhood, riding bikes everywhere, mall rats hanging out, arcade tokens quarters, " +
    
    // NEW: Specific Year Searches
    "1980 style photo, 1981 aesthetic, 1982 ET era, 1983 Return of Jedi, 1984 Ghostbusters style, 1985 Back to Future, 1986 Top Gun Maverick, 1987 Dirty Dancing, 1988 Coming to America, 1989 Batman movie, early 80s new wave, mid 80s MTV peak, late 80s hair metal, turn of decade 1980, almost 90s 1989, pre-grunge 80s, " +
    
    // NEW: Synthwave/Neon Deep Dive (Specific aesthetic searches)
    "outrun aesthetic 80s, retrowave neon, cyberpunk 80s origins, neon grid sunset, purple pink blue gradient, geometric grid background, chrome logo effect, scanline VHS effect, retro futuristic car, DeLorean time machine, TRON lightcycle aesthetic, Blade Runner neon city, neon palm trees Miami, sunset grid horizon, laser background, digital rain matrix, CRT screen glow, arcade cabinet neon, sunset drive aesthetic, night drive 80s, Tokyo neon nights beginning, vaporwave statue bust, Greek statue neon, " +
    
    // NEW: Miami Vice Deep Dive
    "Don Johnson stubble, pastel pink suit, white linen suit, rolled up sleeves 80s, loafers no socks, Ferrari Testarossa, speedboat Miami, palm tree sunset, art deco buildings, Ocean Drive aesthetic, South Beach 80s, tropical noir style, detective fashion 80s, aviator sunglasses Ray-Ban, slicked back hair Miami Vice, Crockett and Tubbs style, Philip Michael Thomas look, pastel teal and pink, tropical crime aesthetic, " +
    
    // NEW: Music Icons Specific (How people search for 80s music looks)
    "Madonna Like a Virgin look, Material Girl costume, Madonna cone bra, lace gloves fingerless, Madonna crucifix jewelry, Michael Jackson Thriller jacket, red leather jacket MJ, one white glove sequin, jheri curl Michael Jackson, moonwalk pose, Prince Purple Rain outfit, ruffled shirt Prince, raspberry beret, paisley park aesthetic, Cyndi Lauper girls just wanna have fun, colorful crazy 80s, Boy George Culture Club makeup, George Michael Wham! choose life, Duran Duran new romantic, Simon Le Bon style, Depeche Mode synth pop, The Cure Robert Smith hair, goth 80s beginning, Siouxsie Sioux makeup, Blondie Debbie Harry style, Pat Benatar hit me with your best shot, Joan Jett rocker, Heart Ann Wilson, Stevie Nicks 80s witchy, Whitney Houston diva, Tina Turner Private Dancer, " +
    
    // NEW: Rock & Hair Metal Deep Dive
    "Bon Jovi big hair, Jon Bon Jovi Slippery When Wet, Mötley Crüe leather, Nikki Sixx bass, Vince Neil blonde hair, Poison glam metal, Bret Michaels bandana, unskinny bop style, Def Leppard one armed drummer, pour some sugar on me, Guns N Roses Appetite, Axl Rose bandana, Slash top hat, Van Halen jump era, David Lee Roth splits, Eddie Van Halen striped guitar, Whitesnake here I go again, Warrant cherry pie, Twisted Sister we're not gonna take it, Dee Snider makeup, Quiet Riot metal health, Ratt round and round, Skid Row Sebastian Bach, " +
    
    // NEW: Pop Culture Icons & Celebrities
    "Tom Cruise Top Gun, Maverick aviators, flight suit costume, Tom Cruise Risky Business, white shirt underwear dance, Patrick Swayze Dirty Dancing, nobody puts baby in corner, Ralph Macchio Karate Kid, wax on wax off, headband karate, Eddie Murphy Beverly Hills Cop, Axel Foley jacket, Eddie Murphy Coming to America, Michael J Fox Back to Future, Marty McFly vest, life preserver, DeLorean pose, Michael J Fox Family Ties, Alex P Keaton preppy, Arnold Schwarzenegger Terminator, I'll be back leather, Sylvester Stallone Rambo, headband muscles, Rocky IV training, Harrison Ford Indiana Jones, fedora whip, Molly Ringwald Breakfast Club, pink dress, Pretty in Pink style, " +
    
    // NEW: TV Show Character Specific
    "A-Team Mr T mohawk, BA Baracus gold chains, Miami Vice Crockett, Magnum PI Tom Selleck mustache, Hawaiian shirt Magnum, Knight Rider KITT car, David Hasselhoff Michael Knight, leather jacket talking car, MacGyver mullet, Richard Dean Anderson resourceful, Airwolf helicopter, Blue Thunder, ALF alien puppet sitcom, Family Ties Mallory fashion, Growing Pains Kirk Cameron, Who's the Boss Tony Danza, Cheers bar aesthetic, Night Court quirky, Hill Street Blues police, St Elsewhere hospital, Moonlighting Bruce Willis, Cybill Shepherd glamour, Dynasty shoulder pads, Joan Collins Alexis, Dallas JR Ewing cowboy hat, Larry Hagman villain, Falcon Crest wine country, Knots Landing soap opera, " +
    
    // NEW: Movie Character & Icon Specific
    "Indiana Jones fedora whip, Han Solo Return of Jedi, Luke Skywalker Jedi, Princess Leia Endor, Ghostbusters proton pack, Slimer ghost, Stay Puft Marshmallow Man, Goonies treasure hunt, Sloth hey you guys, Chunk truffle shuffle, Mouth Sean Astin, E.T. phone home, Elliot BMX bike, Elliott and ET, Ferris Bueller day off, Cameron Frye nervous, Sloane Peterson girlfriend, save Ferris, Breakfast Club detention, John Bender fist pump, Claire Standish popular, Allison Reynolds basket case, Andrew Clark athlete, Brian Johnson brain, Fast Times Ridgemont High, Jeff Spicoli Sean Penn, surfer dude pizza, Sixteen Candles Molly Ringwald, Jake Ryan heartthrob, Long Duk Dong, Pretty in Pink Duckie, " +
    
    // NEW: Fashion Specific Searches
    "how to dress 80s not costume, subtle 80s aesthetic, modern 80s inspired, contemporary neon style, wearable eighties look, everyday 80s outfit, casual 80s fashion, authentic 80s not Halloween, genuine vintage 80s, period accurate eighties fashion, historically correct 80s, what people actually wore, real 80s street fashion, mall fashion 80s, Esprit clothing brand, Benetton colors, Guess jeans triangle, Jordache jeans, Gloria Vanderbilt designer, Calvin Klein jeans, Sergio Valente, Sasson jeans, Sassoon jeans, Izod Lacoste alligator, polo shirt collar up, preppy 80s style, " +
    
    // NEW: Hairstyle Deep Dive
    "mullet business front party back, how to get 80s hair, big hair hairspray, teased hair volume, feathered hair Farrah continuation, permed hair 80s spiral, crimped hair zigzag, side ponytail scrunchie, high ponytail aerobics, banana clip hair, claw clip plastic, Aqua Net hairspray, mousse styling foam, gel wet look, hair pick afro, rat tail hair, shaved designs, asymmetrical cut 80s, mohawk punk, liberty spikes, Billy Idol platinum blonde, flock of seagulls haircut, tail in back, wedge haircut Dorothy Hamill continuing, " +
    
    // NEW: Accessories & Details
    "Ray-Ban Wayfarer sunglasses, aviator sunglasses Top Gun, neon sunglasses, Jelly bracelets colorful, slap bracelets snap, Swatch watch colorful, calculator watch nerd, friendship pins safety pins, Member's Only jacket collar, Izod Lacoste shirt, polo collar popped, bandana headband workout, sweatband wrist and head, leg warmers over jeans, slouch socks scrunched, scrunchie ponytail holder, banana clip giant, side comb decorative, hair crimper tool, Walkman Sony cassette, boom box shoulder, Rubik's cube solving, " +
    
    // NEW: Technology & Gaming Nostalgia
    "arcade games quarters, Pac-Man fever, Ms Pac-Man, Donkey Kong barrels, Galaga spaceship, Asteroids vector, Centipede trackball, Defender joystick, Tempest spinner, Tron arcade, Dragon's Lair laser disc, Atari 2600 console, Atari joystick, ColecoVision, Intellivision, Nintendo NES original, Super Mario Bros, The Legend of Zelda, Duck Hunt light gun, R.O.B. robot, Commodore 64 computer, Apple II computer lab, IBM PC beige, Tandy Radio Shack, TRS-80, floppy disk 5.25 inch, cassette tape data storage, dot matrix printer, green screen monitor, " +
    
    // NEW: MTV & Music Video Specific
    "MTV moon man logo, I want my MTV, Video Killed the Radio Star first video, MTV VJ original, Downtown Julie Brown, Martha Quinn, Alan Hunter, Mark Goodman, Nina Blackwood, music video 80s style, Thriller music video zombies, Michael Jackson videos, Madonna Material Girl Marilyn Monroe, Like a Prayer controversy, Take On Me rotoscope animation, A-ha pencil sketch, Peter Gabriel Sledgehammer claymation, Money for Nothing CGI, Dire Straits animation, " +
    
    // NEW: Sports & Athletes 80s
    "Michael Jordan rookie, Air Jordan sneakers, Bulls 80s beginning, Magic Johnson Lakers showtime, Larry Bird Celtics rivalry, Wayne Gretzky Oilers domination, Mike Tyson youngest champion, Sugar Ray Leonard boxing, Hulk Hogan Hulkamania, Macho Man Randy Savage, Ultimate Warrior face paint, Andre the Giant, Ric Flair Nature Boy, WWF wrestling 80s, John McEnroe superbrat, Bjorn Borg rivalry, Martina Navratilova, Chris Evert tennis, Carl Lewis Olympics, Mary Lou Retton gymnastics perfect 10, Florence Griffith Joyner Flo Jo nails, Bo Jackson two sports, " +
    
    // NEW: Cartoon & Kids Show Specific
    "He-Man Masters of Universe, She-Ra Princess of Power, Thundercats Sword of Omens, Lion-O, Transformers Optimus Prime, GI Joe knowing is half the battle, Voltron defender universe, Teenage Mutant Ninja Turtles cartoon, Cowabunga dude, Smurfs little blue, Care Bears belly badge, My Little Pony original, Rainbow Brite colorful, Strawberry Shortcake scented, Jem and the Holograms truly outrageous, Inspector Gadget go go, DuckTales Scrooge McDuck, Chip n Dale Rescue Rangers, TaleSpin, Gummi Bears bouncing, Alvin and the Chipmunks, Muppet Babies, " +
    
    // NEW: Toy & Product Nostalgia
    "Cabbage Patch Kids adoption, Garbage Pail Kids gross, Pound Puppies, Teddy Ruxpin talking bear, Transformers toys, GI Joe action figures, He-Man figures Castle Grayskull, She-Ra Crystal Castle, My Little Pony ponies, Care Bears plush, Strawberry Shortcake dolls, Rainbow Brite doll, Barbie and the Rockers, Hot Wheels tracks, Matchbox cars, Lego classic bricks, Lite-Brite colorful pegs, Simon electronic game, Trivial Pursuit board game, Pictionary drawing, Speak & Spell Texas Instruments, Merlin handheld game, Coleco handheld, Game & Watch Nintendo, " +
    
    // NEW: Food & Snacks 80s
    "New Coke failure, Classic Coke return, Cherry Coke introduction, Jolt Cola caffeine, Tab diet soda, Hawaiian Punch, Hi-C Ecto Cooler Ghostbusters, Capri Sun pouch, Kool-Aid Man oh yeah, Crystal Light aerobics, Pop Rocks candy, Ring Pop, Push Pop lollipop, Nerds candy, Runts fruit shaped, Bottle Caps, SweeTarts, Pixie Stix, Fun Dip Lik-m-aid, Warheads not yet, Fruit Roll-Ups, Fruit by the Foot, Gushers coming soon, Dunkaroos almost, Hot Pockets microwave revolution, Lean Cuisine diet craze, " +
    
    // NEW: Mall Culture 80s
    "hanging at the mall 80s, food court pizza, Orange Julius mall, Sbarro slice, Hot Dog on a Stick, Auntie Anne's pretzels, Cinnabon smell, arcade in mall, movie theater multiplex, Sam Goody records, Tower Records, Waldenbooks, B Dalton Bookseller, Radio Shack electronics, Toys R Us, Kay-Bee Toys, Spencer's Gifts gag, Footlocker sneakers, Athlete's Foot shoes, Kinney Shoes, Bakers shoes, The Limited clothing, Express fashion, Gap colorful, Benetton United Colors, Esprit bright colors, Chess King urban, Merry Go Round, " +
    
    // NEW: School & Education 80s
    "Trapper Keeper organized, Pee-Chee folder surf, Lisa Frank rainbow unicorn, sticker collection trading, puffy stickers 3D, scratch and sniff stickers, pencil grip rubber, erasers collection shaped, mechanical pencil lead, ruler wooden, compass geometry, protractor math, Oregon Trail computer game, Where in World Carmen Sandiego, Number Munchers, Reader Rabbit, typing class electric typewriter, ditto master purple, mimeograph smell, overhead projector transparent, filmstrip beep advance, " +
    
    // NEW: Aerobics & Fitness Craze
    "Jane Fonda workout tape, Feel the Burn, leg warmers aerobics class, leotard and tights, headband sweatband, high cut leotard, thong leotard, Jazzercise dance fitness, aerobics VHS tape, Richard Simmons Sweatin to the Oldies, Denise Austin fitness, Jake Body by Jake, 20 Minute Workout, Buns of Steel, Abs of Steel, Tae Bo almost, Step aerobics bench, Thighmaster Suzanne Somers, " +
    
    // NEW: Party & Event Themes
    "80s birthday party ideas, totally 80s party, radical eighties party, decade party 80s costume, themed birthday neon, 40th birthday 80s theme (born in 80s), spirit week 80s day outfit, homecoming 80s theme dance, prom 80s aesthetic, wedding 80s nostalgia, bachelorette 80s party, reunion 80s theme, throwback party eighties, Stranger Things birthday party, Miami Vice themed event, " +
    
    // NEW: Cold War & Historical Context
    "Reagan era America, Cold War tension, Berlin Wall standing, Soviet Union enemy, nuclear threat fear, Red Dawn movie paranoia, WarGames WOPR computer, The Day After TV movie, nuclear winter fear, Star Wars defense initiative, Just Say No drugs, DARE program, Challenger explosion 1986, Live Aid concert, We Are the World, Farm Aid, Hands Across America, " +
    
    // NEW: Regional/Geographic 80s
    "New York City 80s gritty, Times Square seedy before cleanup, Studio 54 closing, Limelight club, CBGB punk continuing, hip hop birth Bronx, West Coast hip hop beginning, Los Angeles hair metal Sunset Strip, Whisky a Go Go, Troubadour, Roxy Theatre, Miami Vice Ocean Drive, San Francisco yuppie boom, Chicago house music birth, Detroit techno origins, Minneapolis Prince sound, Seattle pre-grunge, " +
    
    // NEW: Subculture Specific
    "new wave fashion, new romantic makeup men, goth 80s beginning, The Cure fans, Depeche Mode devotees, punk 80s hardcore, straight edge X on hands, skateboard culture Bones Brigade, Tony Hawk young, surf culture neon, hip hop breakdancing, b-boy culture, graffiti art subway, beatbox human, scratch DJ turntables, yuppie culture preppy, power lunch, suspenders Wall Street, Miami Vice lookalike contests, " +
    
    // NEW: Question-Based Searches
    "what did people wear in the 80s really, was everyone's hair really that big, did people actually dress neon, when did Miami Vice air, what year was Thriller, when did MTV start, 1981 music television, what came before 80s fashion, transition from 70s to 80s, when did new wave start, grunge killed hair metal, difference between early and late 80s, 80s vs 90s fashion, how to tell photo from 80s, dating old photos 80s clues, " +
    
    // NEW: Comparison Searches
    "80s vs 70s style difference, 80s vs 90s which decade better, early 80s vs late 80s fashion, new wave vs hair metal, Madonna vs Cyndi Lauper, Michael Jackson vs Prince, Breakfast Club vs Sixteen Candles, Miami Vice vs Magnum PI, Coke vs Pepsi 80s, Nintendo vs Sega beginning, Atari vs Commodore, MTV vs VH1 difference, " +
    
    // NEW: Specific Photo Types
    "80s school picture day laser background, class photo 1980s geometric, team photo eighties, prom photo 80s big hair, homecoming dance 80s, graduation portrait eighties, senior picture 80s style, engagement photo 80s aesthetic, wedding photo eighties fashion, family portrait 80s Sears, Christmas card photo 80s sweaters, vacation photo 80s disposable camera, road trip picture eighties, camping photo 80s, beach photo eighties, Glamour Shots mall portrait, " +
    
    // NEW: Age/Generation Specific
    "born in the 80s aesthetic, 80s baby photo, Gen X childhood 80s, latchkey kid generation, teenager in the 80s, young adult eighties, college student 80s style, yuppie professional, stay at home mom 80s, dad fashion eighties, soccer mom beginning, blue collar 80s, factory worker Reagan, white collar power suit, " +
    
    // NEW: Emotional/Personal Searches
    "recreate parents 80s wedding photo, mom in the 80s high school, dad's mullet yearbook, grandparents 80s fashion, my childhood in the 80s, when I was born 1980s, elementary school memories 80s, middle school cringe eighties, high school glory days 80s, college years eighties, first job 80s, first apartment Reagan era, coming of age eighties, finding identity 80s, " +
    
    // NEW: Social Media Use Cases
    "Throwback Thursday 80s, TBT eighties style, Flashback Friday 80s, vintage aesthetic Instagram neon, retro feed eighties, nostalgia content 80s, Gen X content creator, boomer late content 80s, TikTok 80s trend Stranger Things, Instagram 80s filter, dating profile 80s aesthetic unique, viral 80s photo, trending eighties content, 80s challenge social media, decades challenge eighties, " +
    
    // NEW: Synthwave Music & Culture
    "synthwave music genre, outrun music driving, retrowave artist, Kavinsky Nightcall, Perturbator dark synthwave, Carpenter Brut metal synth, Com Truise chillwave, The Midnight synthwave band, FM-84 Running in the Night, Gunship synthwave, Timecop1983 nostalgia, Power Glove video game, Lazerhawk space, Miami Nights neon palm trees, " +
    
    // NEW: Common Typos/Misspellings
    "80's photo generator, eightys style, 1980's aesthetic, synthwave aethetic, Miami Vise, Breakfast Club, mullett haircut, Ray Ban sunglases, leg warmers legwarmers, shoulder pads shoulderpads, Pac Man, Rubix cube, Cyndi Lauper, Cindy Lauper, Def Leopard, Motley Crue, Ferris Bueller, Ferris Bueler, " +
    
    // NEW: Long-Tail Conversational
    "I want to look like I'm in Miami Vice, show me as Marty McFly, make me into a hair metal rocker, what would I look like with big 80s hair, turn me into Madonna 80s style, I need 80s costume for party, help me win decade day at school, want to recreate family photos from 80s, looking for authentic yearbook 80s style, need realistic 80s not cheesy, want to see myself in neon, curious how I'd look with a mullet, show me in power suit 80s, transport me back to MTV era, make me a totally tubular 80s teen, " +
    
    // NEW: Content Creator Specific
    "80s content creator ideas, synthwave aesthetic influencer, nostalgia content eighties, throwback content strategy 80s, vintage aesthetic influencer neon, retro brand ambassador eighties, 80s themed content series, decade content eighties, Gen X nostalgia posts, family history 80s stories, ancestry storytelling eighties, generational content 80s, viral nostalgia marketing, Stranger Things aesthetic content, outrun vaporwave creator";

  const title = customTitle || defaultTitle;
  const description = customDescription || defaultDescription;
  const keywords = customKeywords || defaultKeywords;
  const imageUrl = customOgImage || ogImage;
  const canonicalUrl = customCanonicalUrl || pageUrl;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "80s AI Photo Generator - Neon, Synthwave & Miami Vice Creator",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web",
    "description": description,
    "url": canonicalUrl,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "description": "Free 80s AI photo transformation with sign-up credits"
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
      "Transform photos into authentic 1980s style with AI",
      "Neon synthwave and vaporwave aesthetics",
      "Miami Vice inspired looks with pastel suits",
      "Big hair, mullets, and feathered hairstyles",
      "New wave fashion and geometric patterns",
      "Rock and hair metal band aesthetics",
      "80s yearbook photo recreation",
      "Breakfast Club and Back to the Future vibes",
      "Stranger Things authentic 80s styling",
      "Power suits and shoulder pads generation",
      "Valley Girl and Madonna-inspired looks",
      "Arcade and video game aesthetic",
      "VHS and cassette tape vintage filters",
      "Leg warmers and aerobics fashion",
      "Chrome effects and geometric shapes",
      "Pastel neon color grading",
      "Authentic 1980s fashion and hairstyles",
      "MTV generation transformation",
      "Free AI-powered 80s generation",
      "High-resolution totally radical downloads",
      "Perfect for themed parties and nostalgia",
      
      // NEW: Specific Style Features
      "Don Johnson Miami Vice pastel suit and stubble",
      "Tom Cruise Top Gun Maverick aviators and flight suit",
      "Michael Jackson Thriller red leather jacket",
      "Madonna Like a Virgin lace and crucifix",
      "Prince Purple Rain ruffled shirt and purple",
      "Molly Ringwald Pretty in Pink dress",
      "Michael J Fox Marty McFly vest and vest",
      "Patrick Swayze Dirty Dancing dance pose",
      "Eddie Murphy Beverly Hills Cop leather jacket",
      "Arnold Schwarzenegger Terminator leather and shades",
      "Cyndi Lauper Girls Just Wanna Have Fun colors",
      "Boy George Culture Club androgynous makeup",
      
      // NEW: Fashion Details
      "Neon windbreakers bright colors",
      "Member's Only jacket with collar",
      "Parachute pants shiny MC Hammer style",
      "Leg warmers over jeans aerobics",
      "Shoulder pads power dressing",
      "Power suits women breaking through",
      "Preppy polo shirts collar popped",
      "Izod Lacoste alligator logo",
      "Guess jeans triangle logo",
      "Jordache jeans designer denim",
      "Acid wash jeans stonewashed",
      "Ripped jeans punk influence",
      "Leather jackets motorcycle style",
      "Denim jackets oversized",
      "Letterman jackets varsity",
      "Bomber jackets Top Gun",
      "Track suits Adidas stripes",
      "Jelly shoes plastic",
      "Reebok high-tops aerobics",
      "Nike Air Jordans basketball",
      
      // NEW: Hairstyle Variations
      "Mullet business in front party in back",
      "Big teased hair Aqua Net hairspray",
      "Feathered hair Farrah continuation",
      "Permed hair spiral curls",
      "Crimped hair zigzag texture",
      "Side ponytail scrunchie holder",
      "High ponytail aerobics style",
      "Rat tail hair long back strand",
      "Mohawk punk rock standing",
      "Liberty spikes Billy Idol",
      "Flock of Seagulls asymmetrical swoop",
      "New wave geometric cuts",
      
      // NEW: Accessories & Props
      "Ray-Ban Wayfarer sunglasses Risky Business",
      "Aviator sunglasses Top Gun",
      "Jelly bracelets stacked colorful",
      "Slap bracelets snap on wrist",
      "Swatch watch colorful Swiss",
      "Calculator watch Casio nerd",
      "Walkman Sony portable music",
      "Boom box shoulder stereo",
      "Rubik's Cube puzzle toy",
      "Bandana headband workout",
      "Sweatband wrist and forehead",
      "Scrunchie ponytail holder fabric",
      "Banana clip giant hair clip",
      
      // NEW: Technology Props
      "Atari 2600 game console",
      "Nintendo NES with Zapper",
      "Commodore 64 computer beige",
      "Apple II computer green screen",
      "Cassette tape Walkman",
      "VHS tape rental movie",
      "Arcade cabinet Pac-Man",
      "Boom box ghetto blaster",
      "Rotary phone landline",
      "Cordless phone brick",
      
      // NEW: Color & Aesthetic Features
      "Neon pink and blue electric",
      "Pastel Miami Vice teal and pink",
      "Geometric grid sunset background",
      "Chrome metallic shine effect",
      "VHS tracking lines scan effect",
      "CRT monitor glow scan lines",
      "Laser background yearbook photo",
      "Sunset gradient purple pink orange",
      "Retro-futuristic grid floor",
      "Outrun aesthetic driving sunset",
      
      // NEW: Background Options
      "Laser background yearbook geometric",
      "Neon city skyline night",
      "Palm trees sunset Miami",
      "Grid horizon synthwave",
      "Arcade games in background",
      "Mall interior 80s stores",
      "Bedroom posters on walls 80s bands",
      "Wood paneling last gasp",
      "Living room TV console",
      "School hallway lockers painted",
      "Roller rink disco lights",
      "Gym aerobics class",
      
      // NEW: Use Case Features
      "Perfect for 80s themed costume parties",
      "Decade Day school spirit week winner",
      "Halloween authentic 80s costume reference",
      "Throwback Thursday Gen X nostalgia",
      "40th birthday party (born 1984-85)",
      "Stranger Things themed party outfits",
      "Miami Vice themed event",
      "Back to the Future party",
      "Breakfast Club detention theme",
      "80s prom or homecoming theme dance",
      "Wedding 80s nostalgia photos",
      "Synthwave music video aesthetic",
      "Vaporwave art reference",
      
      // NEW: Pop Culture Features
      "MTV Music Television original era",
      "Miami Vice Ocean Drive detective",
      "Top Gun fighter pilot Maverick",
      "Back to the Future DeLorean time travel",
      "Ghostbusters proton pack uniform",
      "Breakfast Club detention Saturday",
      "Ferris Bueller's Day Off Chicago",
      "Fast Times at Ridgemont High",
      "The Goonies treasure adventure",
      "E.T. phone home bicycle",
      
      // NEW: Music Video Aesthetics
      "MTV music video 80s style",
      "Thriller zombie dance Michael Jackson",
      "Material Girl Marilyn Monroe Madonna",
      "Take On Me rotoscope animation",
      "Peter Gabriel Sledgehammer stop motion",
      "Money for Nothing CGI Dire Straits",
      "Purple Rain Prince motorcycle",
      "Girls Just Want to Have Fun parade",
      
      // NEW: Technical Features
      "Instant 30-60 second generation",
      "High-resolution printable output up to poster size",
      "Authentic period-accurate 1980-1989 details",
      "Natural-looking not costume-y unless desired",
      "Historically accurate 80s fashion",
      "Era-appropriate neon color palettes",
      "Genuine vintage film and VHS look",
      "Professional photo quality",
      "Download and share immediately",
      "Multiple style options: neon, preppy, rock, new wave",
      "Synthwave vaporwave aesthetic modes"
    ],
    "potentialAction": {
      "@type": "UseAction",
      "target": canonicalUrl,
      "description": "Transform your photos into totally tubular 80s style online"
    },
    "category": "AI Photo Generator & Vintage Style Creator",
    "genre": ["Photography", "AI Tools", "Nostalgia", "80s Culture", "Retro Style", "Synthwave"]
  };

  // MASSIVELY EXPANDED FAQ with real human questions
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      // ORIGINAL FAQs (KEEPING ALL)
      {
        "@type": "Question",
        "name": "How can I make myself look like the 80s?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Upload your photo to our free 80s AI generator and choose from styles like neon synthwave, Miami Vice (pastel suits), new wave fashion, rock/hair metal (big hair), or pop culture looks. Our AI instantly transforms you into authentic 1980s style with period-accurate fashion, hairstyles like mullets and big hair, neon colors, and vintage photo effects."
        }
      },
      {
        "@type": "Question",
        "name": "What is 80s synthwave aesthetic?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "80s synthwave aesthetic features neon pink and blue colors, geometric grids, chrome effects, retro-futuristic vibes, and inspiration from Miami Vice, arcade games, and electronic music. Our AI recreates this iconic visual style with authentic neon glow, VHS tracking lines, and that totally radical 80s vibe."
        }
      },
      {
        "@type": "Question",
        "name": "Can I create a Miami Vice style photo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our Miami Vice style creates the iconic pastel suit look with pink and teal colors, palm tree vibes, sunset backgrounds, and that sleek 1980s detective aesthetic. Perfect for recreating the iconic TV show's fashion and atmosphere."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get big 80s hair or a mullet?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Our AI can add iconic 80s hairstyles including big teased hair, mullets (business in front, party in back), feathered hair, perms, crimped styles, side ponytails, and hair metal band looks. Choose your style and rock that totally tubular hair!"
        }
      },
      {
        "@type": "Question",
        "name": "What 80s styles can I create?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Choose from neon synthwave, Miami Vice, new wave fashion, rock/hair metal, pop culture (Madonna, Michael Jackson), Valley Girl preppy, arcade gamer, aerobics/jazzercise, power suits, and yearbook styles. Each captures authentic 80s fashion, colors, and that radical decade's unique vibe."
        }
      },
      {
        "@type": "Question",
        "name": "Is this good for 80s themed parties?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Totally! Perfect for 80s themed parties, spirit week decade day, Halloween costumes (Breakfast Club, Back to the Future, Miami Vice), throwback birthdays, or weddings with 80s themes. Create your look before the party or use it for invitations and social media. Gnarly for any nostalgic celebration!"
        }
      },
      {
        "@type": "Question",
        "name": "What TV shows and movies inspired these styles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our 80s styles are inspired by iconic shows and movies like Miami Vice (pastel suits), The Breakfast Club (varied 80s fashion), Back to the Future (casual 80s), Stranger Things (authentic 80s recreation), MTV music videos, Fast Times at Ridgemont High, Sixteen Candles, and The Goonies. Capture the essence of your favorite 80s pop culture moments."
        }
      },
      {
        "@type": "Question",
        "name": "Can I create a Stranger Things style photo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Stranger Things is set in the authentic 1980s. Choose from our various 80s styles to recreate that nostalgic 80s aesthetic with period-accurate fashion, hairstyles, and the show's vintage photography style. Perfect for fans wanting that Hawkins, Indiana vibe."
        }
      },
      {
        "@type": "Question",
        "name": "How long does the 80s transformation take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your 80s transformation takes 30-60 seconds. Upload your photo, pick your style (synthwave, Miami Vice, new wave, rock, etc.), and our AI instantly transports you back to the most radical decade. Download your totally tubular 80s photo immediately."
        }
      },
      {
        "@type": "Question",
        "name": "Is the 80s AI generator free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Get free credits when you sign up (no credit card required) to try our 80s AI generator. Transform yourself into synthwave, neon, Miami Vice, or any 80s style for free. Additional credits available if you want to create multiple looks or try different decades."
        }
      },
      {
        "@type": "Question",
        "name": "What makes a photo look authentically 80s?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Authentic 80s photos have neon colors (pink, blue, purple), specific color grading with high saturation, period-accurate fashion (power suits, leg warmers, neon windbreakers), iconic hairstyles (big hair, mullets), geometric patterns, chrome effects, VHS grain texture, and that yearbook or mall photo aesthetic. Our AI captures all these elements to make your photo genuinely look like it's from 1980-1989."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this for social media throwbacks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Totally tubular! Perfect for Throwback Thursday (#TBT), Instagram nostalgia posts, Facebook memories, and TikTok trends. Create authentic-looking 80s photos that'll make your followers think you found old yearbook pictures or family photos. Great for Gen X and millennial content creators reliving the gnarly days of MTV and arcade games."
        }
      },
      
      // NEW: Family & Personal Questions
      {
        "@type": "Question",
        "name": "Can I recreate my parents' 80s wedding photo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Upload your photo and transform into authentic 80s wedding style - think big puffy sleeves, shoulder pads, ruffled tuxedo shirts, bow ties, and that classic 80s color photography. Perfect for anniversary surprises or seeing yourself in your parents' Reagan-era wedding."
        }
      },
      {
        "@type": "Question",
        "name": "What would I look like in my mom's yearbook?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our 80s yearbook style recreates authentic high school portraits - big teased hair, laser geometric backgrounds, feathered bangs, soft focus photography, and that classic yearbook lighting. See yourself as an 80s teenager just like your parents' yearbook from 1980-1989."
        }
      },
      
      // NEW: Specific Icon/Character Questions
      {
        "@type": "Question",
        "name": "Can I look like Tom Cruise in Top Gun?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Choose our Top Gun/Miami Vice style for Maverick's iconic aviator sunglasses, bomber jacket, and that fighter pilot swagger. Perfect for recreating one of the most iconic 80s movie looks with volleyball beach scenes or flight deck vibes."
        }
      },
      {
        "@type": "Question",
        "name": "How do I get Madonna's 80s look?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI can transform you into Madonna's iconic 80s aesthetic - lace gloves, layered jewelry with crucifixes, messy teased hair with bow, Like a Virgin or Material Girl era fashion. Capture the Material Girl's rebellious style that defined 80s pop culture."
        }
      },
      {
        "@type": "Question",
        "name": "Can I create a Michael Jackson Thriller look?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Get that iconic MJ Thriller red leather jacket with zipper details, jheri curl hairstyle, and the King of Pop's signature style. Perfect for the most watched music video of all time aesthetic and moonwalk-ready poses."
        }
      },
      {
        "@type": "Question",
        "name": "What about hair metal band looks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rock out with our hair metal style - massive teased hair (bigger is better!), leather jackets and pants, bandanas, and that Sunset Strip glam rock aesthetic. Think Bon Jovi, Mötley Crüe, Poison, Def Leppard, and Guns N' Roses peak 80s excess."
        }
      },
      
      // NEW: Specific Style Questions
      {
        "@type": "Question",
        "name": "What's the difference between early 80s and late 80s style?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Early 80s (1980-1984) had new wave influence, geometric patterns, pastels, and transition from 70s disco. Mid-80s (1985-1987) brought neon explosion, Miami Vice pastel suits, and power dressing. Late 80s (1988-1989) peaked with hair metal, extreme big hair, acid wash, and brighter neon before grunge killed it all. Our AI captures any era within the decade."
        }
      },
      {
        "@type": "Question",
        "name": "Can I create a Breakfast Club character look?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Choose from the five iconic Breakfast Club archetypes - the Brain (preppy sweater vest), the Athlete (letterman jacket), the Basket Case (all black layers), the Princess (pink preppy), or the Criminal (punk denim). Each represents a different 80s high school subculture."
        }
      },
      {
        "@type": "Question",
        "name": "What's outrun/synthwave aesthetic?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Outrun/synthwave is the retro-futuristic 80s aesthetic with neon grids, sunset gradients, chrome elements, and endless highway vibes. Think Miami Vice meets TRON meets arcade games. Our AI creates authentic outrun aesthetics with geometric grids, purple-pink sunsets, and that night drive feeling."
        }
      },
      
      // NEW: Technical/Quality Questions
      {
        "@type": "Question",
        "name": "Will this look like a real 80s photo or obviously AI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI creates authentic-looking 80s photos with period-accurate fashion, hairstyles, neon colors, and that genuine vintage photography quality. We focus on historical accuracy with proper VHS grain, yearbook aesthetics, or family photo warmth. Results look like they're genuinely from 1980-1989."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get VHS or arcade game effects?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our 80s generator can add authentic vintage effects like VHS tracking lines, CRT scan lines, film grain, arcade cabinet glow, and that characteristic 80s color saturation. Makes your photo look like it was recorded on a camcorder or shot in a photo booth."
        }
      },
      
      // NEW: Use Case Questions
      {
        "@type": "Question",
        "name": "Is this good for a 40th birthday party (born in 1984-85)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Perfect! Create 80s baby aesthetic for your 40th birthday. Show yourself in the decade you were born with authentic 80s fashion, toys, and style. Great for party invitations, decorations, and celebrating being an 80s kid turning 40."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this for synthwave music or art?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Our synthwave/outrun aesthetic is perfect for album covers, music videos, vaporwave art, retro gaming content, and 80s-inspired creative projects. Get that authentic neon grid sunset, chrome logo, and retro-futuristic look for your artistic work."
        }
      },
      {
        "@type": "Question",
        "name": "What about Stranger Things themed party?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Perfect for Stranger Things parties! The show is set in authentic 1983-1986 Indiana. Create period-accurate 80s looks that match the show's aesthetic - arcade fashion, mall culture, new wave style, and that Hawkins Middle School vibe. Great for Halloween or themed events."
        }
      },
      
      // NEW: Technology & Nostalgia
      {
        "@type": "Question",
        "name": "Can you add 80s technology like Walkmans or boom boxes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our AI can include authentic 80s tech props - Walkman cassette players, boom box stereos, Rubik's Cubes, Atari controllers, arcade joysticks, and other nostalgic technology. Perfect for capturing that pre-smartphone era when music meant cassettes and gaming meant quarters."
        }
      },
      
      // NEW: Comparison Questions
      {
        "@type": "Question",
        "name": "Is this better than just using an 80s filter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We don't just add neon colors - our AI transforms your entire photo with authentic 80s fashion, hairstyles, accessories, backgrounds, and period-accurate details. Filters only adjust colors; we recreate the complete 80s aesthetic from hair to shoes to photo quality."
        }
      },
      
      // NEW: Privacy Questions
      {
        "@type": "Question",
        "name": "What happens to my photos after generation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your photos are automatically deleted from our servers within 1 hour after processing. We never store, save, or use your photos for AI training. Your personal photos and totally tubular 80s transformations remain completely private."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Transform Your Photo into 80s Style",
    "description": "Create authentic 1980s neon, synthwave, Miami Vice, or rock style photos with AI",
    "totalTime": "PT2M",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Upload Your Photo",
        "text": "Upload a clear photo of yourself. Modern selfies work great! The AI will transform it into authentic 80s style with neon colors and radical vibes.",
        "image": `${siteUrl}/images/howto/upload-80s.jpg`
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Choose Your 80s Style",
        "text": "Pick from neon synthwave, Miami Vice (pastel suits), new wave fashion, rock/hair metal (big hair), pop culture (Madonna, Michael Jackson), Valley Girl preppy, or arcade aesthetics. Each captures a different vibe of the totally tubular decade.",
        "image": `${siteUrl}/images/howto/choose-80s-style.jpg`
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "AI Generates Your 80s Look",
        "text": "Our AI transforms your photo with authentic 80s fashion, hairstyles (big hair, mullets, feathered), neon color grading, geometric patterns, and that iconic yearbook or MTV music video aesthetic. Takes 30-60 seconds.",
        "image": `${siteUrl}/images/howto/ai-processing-80s.jpg`
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Download & Share",
        "text": "Download your totally radical 80s transformation in high resolution. Perfect for social media throwbacks, themed parties, or just reliving the most gnarly decade ever!",
        "image": `${siteUrl}/images/howto/download-80s.jpg`
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
      <meta property="og:title:alt" content="Make Me Look Like the 80s - Free Neon & Synthwave AI Generator" />
      <meta name="twitter:title:alt" content="80s Style Photo Creator - Totally Tubular AI Transformation" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Throwback AI - 80s Photo Generator" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Transform into authentic 80s style - neon synthwave, Miami Vice, big hair, mullets, power suits, yearbook photos with AI generator" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@throwbackai" />
      <meta name="twitter:creator" content="@throwbackai" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twitterImage} />
      <meta name="twitter:image:alt" content="Create totally tubular 80s photos with AI - neon, synthwave, Miami Vice, new wave transformations" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#FF00FF" />
      <meta name="msapplication-TileColor" content="#FF00FF" />
      <meta name="application-name" content="80s AI Generator - Throwback AI" />
      <meta name="apple-mobile-web-app-title" content="80s Photo Generator" />
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

      {/* ADDED: 80s culture-specific meta tags */}
      <meta name="decade" content="1980s,eighties,80s" />
      <meta name="era" content="synthwave-era,MTV-generation,arcade-generation,Reagan-era,new-wave" />
      <meta name="style-categories" content="synthwave,neon,new-wave,rock,hair-metal,miami-vice,pop-culture,arcade,vaporwave" />
      <meta name="fashion-trends" content="neon-colors,big-hair,mullets,power-suits,leg-warmers,shoulder-pads,parachute-pants,members-only-jacket,windbreakers" />
      <meta name="music-references" content="MTV,synthpop,new-wave,hair-metal,madonna,michael-jackson,prince,duran-duran,depeche-mode,the-cure" />
      <meta name="tv-movie-references" content="miami-vice,breakfast-club,back-to-the-future,stranger-things,goonies,fast-times,sixteen-candles,ferris-bueller" />
      <meta name="target-audience" content="gen-x,millennials,nostalgia,80s-kids,throwback-enthusiasts,synthwave-fans" />
      <meta name="use-cases" content="themed-parties,spirit-week,halloween,throwback-thursday,social-media,yearbook-recreation,synthwave-art" />
      <meta name="tech-nostalgia" content="arcade-games,walkman,cassette-tapes,VHS,boom-box,pac-man,rubiks-cube,atari,commodore-64" />
      <meta name="visual-aesthetic" content="neon-pink-blue,geometric-patterns,chrome-effects,pastel-colors,grid-backgrounds,sunset-gradients,VHS-grain" />
      <meta name="cultural-keywords" content="totally-tubular,radical,gnarly,bodacious,gag-me-with-a-spoon,like-totally,grody,tubular,awesome,excellent" />

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
            "name": "Throwback AI - 80s Photo Generator",
            "description": "Free AI-powered 80s photo transformation service - create neon synthwave, Miami Vice, and authentic 1980s style photos online",
            "url": canonicalUrl,
            "sameAs": [facebookPageUrl],
            "serviceArea": {
              "@type": "Place",
              "name": "Worldwide"
            },
            "priceRange": "Free",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "80s Photo Transformation Styles",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Neon Synthwave Transformation",
                    "description": "Transform into authentic 80s synthwave aesthetic with neon colors, geometric grids, and retro-futuristic vibes"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Miami Vice Style Generation",
                    "description": "Create Miami Vice looks with pastel suits, tropical backgrounds, and sleek detective aesthetics"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "80s Yearbook Photo Creator",
                    "description": "Generate authentic yearbook-style portraits with big hair, laser backgrounds, and iconic 80s fashion"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Rock & Hair Metal Style",
                    "description": "Create rock and hair metal band looks with big teased hair, leather, and concert aesthetics"
                  }
                }
              ]
            }
          })
        }}
      />

      {/* Preload Critical Resources */}
      <link rel="preload" href="/fonts/retro-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

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

export default EightiesSEO;