// components/seo/SeventiesSEO.js - MAXIMUM SEO OPTIMIZATION + HUMAN SEARCH TERMS
import Head from "next/head";

const siteUrl = "https://throwbackai.app";
const pageUrl = `${siteUrl}/replicate/70s`;
const ogImage = `${siteUrl}/images/decades/70sCardSEO.png`;
const twitterImage = ogImage;
const facebookPageUrl = "https://www.facebook.com/profile.php?id=61578072554521";
const facebookPageId = "61578072554521";

const SeventiesSEO = ({ 
  customTitle = null,
  customDescription = null,
  customKeywords = null,
  customOgImage = null,
  customCanonicalUrl = null
}) => {
  const defaultTitle = "70s AI Photo Generator Free | Make Me Look Like the 70s - Disco, Hippie, Bell Bottoms & Afro Creator";
  
  const defaultDescription = "Free 70s AI photo generator - Transform into authentic 1970s style! Create disco fever looks, hippie peace & love, funk & soul fashion, bell bottoms, afros, and vintage yearbook photos. Relive the era of Studio 54, Saturday Night Fever, peace signs, and groovy vibes. Make yourself look far out with AI-powered 70s transformations. Try free - no credit card required!";
  
  // MASSIVELY EXPANDED: Real human searches - nostalgic, emotional, specific use cases
  const defaultKeywords = 
    // ORIGINAL KEYWORDS (KEEPING ALL)
    "make me look like the 70s, turn my photo into 70s style, how to look like 70s disco, AI 70s photo generator free, make myself look 70s, 70s yearbook photo creator, disco aesthetic photo, create 70s style picture, transform photo to 1970s, 70s AI filter free, look like I'm from the 70s, vintage 70s photo effect, make my photo look 70s, retro 70s picture maker, seventies style generator, Studio 54 style photo, disco fever aesthetic, Saturday Night Fever look, hippie aesthetic photo, peace and love style, flower power generator, bell bottoms photo, afro hair generator, 70s funk style, soul train aesthetic, platform shoes look, leisure suit photo, farrah fawcett hair, shag haircut generator, feathered hair 70s, sideburns generator, mutton chops look, tinted glasses 70s, aviator sunglasses style, wood paneling background, shag carpet aesthetic, lava lamp vibes, peace sign photo, disco ball background, roller disco style, roller skating 70s, van life hippie, VW bus aesthetic, tie dye shirt photo, fringe vest look, headband hippie style, love beads aesthetic, puka shell necklace, mood ring photo, pet rock era, smiley face 70s, have a nice day aesthetic, earth tones photo, harvest gold color, avocado green style, burnt orange aesthetic, brown and orange 70s, groovy photo maker, far out transformation, right on style creator, outta sight photo, can you dig it aesthetic, solid style generator, dyno-mite look, keep on truckin photo, 70s themed party photo, decade day costume 70s, spirit week seventies, Halloween 70s costume, disco party photo, Studio 54 party, Saturday night fever costume, hippie costume photo, woodstock aesthetic, flower child look, bohemian 70s style, boho hippie photo, peace love happiness, free spirit aesthetic, dashiki style photo, peasant blouse look, maxi dress 70s, hot pants style, tube top photo, vest over nothing look, polyester suit aesthetic, wide collar shirt, butterfly collar, medallion necklace style, chest hair 70s look, gold chains photo, platform boots style, clogs aesthetic, earth shoes look, Pong game era, rotary phone aesthetic, 8-track player, record player vibes, vinyl collection 70s, AM radio generation, TV antenna era, console TV aesthetic, Brady Bunch style, Partridge Family look, Starsky and Hutch aesthetic, Charlie's Angels style, Bionic Woman look, Welcome Back Kotter vibes, Happy Days 70s, Laverne and Shirley style, ABBA costume photo, Bee Gees style, Donna Summer disco, Elton John glasses, David Bowie glam, Cher 70s look, Elvis jumpsuit style, John Travolta pose, Farrah poster recreation, " +
    
    // NEW: Nostalgic/Emotional Searches (How people really remember the 70s)
    "what my parents looked like in the 70s, 70s generator, 70s ai generator, 70s ai, show me my mom in 70s style, recreate my dad's yearbook photo, look like my parents wedding, vintage family photo 70s, grandparents in the seventies, retro family portrait 70s, old school family photo, throwback to parents youth, see myself in my parents era, relive my childhood decade, when I was born aesthetic, the year I was born 70s, nostalgia trip 70s, memories of the seventies, growing up in the 70s, childhood in the 1970s, elementary school 70s, high school yearbook 70s, college days seventies, when life was simpler 70s, back when times were better, the good old days 70s, " +
    
    // NEW: Specific Year Searches
    "1970 style photo, 1971 aesthetic, 1972 look, 1973 fashion, 1974 yearbook, 1975 disco era, 1976 bicentennial style, 1977 punk meets disco, 1978 Saturday Night Fever, 1979 late disco, early 70s hippie, mid 70s disco transition, late 70s punk, turn of the decade 1970, end of sixties vibe, almost 80s 1979, " +
    
    // NEW: Disco Deep Dive (Specific disco searches)
    "Studio 54 costume ideas, Saturday Night Fever John Travolta, disco ball party photo, mirror ball aesthetic, dance floor lighting 70s, nightclub 70s style, discotheque aesthetic, roller disco outfit, roller skate disco, hustle dance outfit, disco diva look, disco king style, shiny polyester shirt, metallic disco outfit, sequin disco dress, glitter jumpsuit 70s, white suit John Travolta, Bee Gees Saturday Night Fever, disco inferno style, boogie nights aesthetic, KC and Sunshine Band look, Village People YMCA costume, Donna Summer hot stuff look, Gloria Gaynor I will survive style, Chic le freak aesthetic, " +
    
    // NEW: Hippie Culture Deep Dive
    "Woodstock festival look, summer of love aesthetic, hippie commune style, back to the land movement, organic living 70s, natural lifestyle hippie, peace protest aesthetic, anti-war movement style, counterculture 70s, bohemian lifestyle photo, nomadic hippie van life, VW bus road trip, hitchhiking hippie era, free love generation, consciousness expansion 70s, spiritual awakening aesthetic, meditation hippie style, yoga 70s beginning, vegetarian hippie look, environmental movement 70s, Mother Earth News aesthetic, Whole Earth Catalog style, commune living photo, geodesic dome hippie, teepee living 70s, organic garden hippie, " +
    
    // NEW: Funk & Soul Specific
    "Soul Train line dance, Don Cornelius style, afro pick in hair, black power fist 70s, African American 70s fashion, dashiki and kufi, black is beautiful movement, natural hair 70s, Jackson 5 afro style, Shaft movie aesthetic, Super Fly style, blaxploitation fashion, platform pimp shoes, wide brim hat 70s, fur coat pimp style, James Brown funk style, Parliament Funkadelic look, Earth Wind and Fire aesthetic, Marvin Gaye style, Stevie Wonder 70s, Curtis Mayfield look, Isaac Hayes shaft style, Rick James funk fashion, George Clinton costume, " +
    
    // NEW: Glam Rock Specific
    "David Bowie Ziggy Stardust, glitter rock aesthetic, androgynous 70s style, makeup on men 70s, platform boots glam, feather boa 70s, sequin jumpsuit glam rock, Elton John outrageous glasses, Freddie Mercury 70s style, Marc Bolan T.Rex look, New York Dolls aesthetic, Alice Cooper shock rock, KISS makeup 70s, Lou Reed glam style, Iggy Pop raw power, Mott the Hoople look, Roxy Music glam, Gary Glitter costume, Sweet band aesthetic, Slade glam rock, Queen 70s fashion, " +
    
    // NEW: Fashion Specific Searches
    "how to look 70s without costume, subtle 70s aesthetic, modern 70s inspired, contemporary 70s fashion, wearable 70s style, everyday 70s look, casual seventies outfit, authentic 70s not costume, genuine vintage 70s, period accurate 70s fashion, historically correct seventies, what people actually wore 70s, real 70s street fashion, working class 70s style, suburban 70s look, mall fashion 70s, department store seventies, Sears catalog 70s, JCPenney fashion seventies, " +
    
    // NEW: Hairstyle Deep Dive
    "Dorothy Hamill wedge cut, Farrah Fawcett feathered hair how to, shag haircut 70s tutorial, how to get 70s hair, afro hair 70s authentic, pick out afro, natural texture 70s, jheri curl origins, pageboy haircut 70s, bowl cut seventies, long straight center part, hair iron 70s, Cher long straight hair, feathering technique 70s, layered hair seventies, blow dryer style 70s, hot rollers seventies, curling iron waves 70s, perm 70s style, body wave perm, sideburns how to grow, mutton chops style, handlebar mustache 70s, fu manchu mustache, porn stache aesthetic, " +
    
    // NEW: TV Show Character Specific
    "look like Brady Bunch character, Marcia Brady hair, Greg Brady style, Carol Brady shag, Mike Brady sideburns, Charlie's Angels Farrah, Kate Jackson style, Jaclyn Smith 70s look, Sabrina Kelly Jill, Starsky red cardigan, Hutch blonde hair, Huggy Bear pimp style, Laverne DeFazio L shirt, Shirley Feeney 50s meets 70s, Fonzie Happy Days 50s in 70s, Richie Cunningham style, Joanie loves Chachi, Mr Kotter afro, Sweathogs look, welcome back style, Hawkeye Pierce MASH, Radar O'Reilly innocence, Hot Lips Houlihan, Barney Miller squad room, Archie Bunker chair, Edith Bunker housewife, Meathead liberal 70s, Gloria Bunker style, Mary Tyler Moore working woman, Rhoda Morgenstern boho, Phyllis Lindstrom, Lou Grant newsroom, Ted Baxter pompous, " +
    
    // NEW: Music Icon Specific
    "ABBA Dancing Queen costume, Frida red hair, Agnetha blonde, Benny and Bjorn suits, Bee Gees white suits, Barry Gibb falsetto era, Robin Gibb, Maurice Gibb, Fleetwood Mac Rumours era, Stevie Nicks bohemian witch, Christine McVie style, Lindsey Buckingham, Eagles laid back style, Jackson Browne sensitive singer, James Taylor folk style, Carole King Tapestry look, Carly Simon sophisticated 70s, Linda Ronstadt country rock, Heart Ann Wilson, Nancy Wilson style, Joan Jett Runaways beginning, Debbie Harry Blondie punk meets disco, Patti Smith punk poet, Suzi Quatro leather jumpsuit, Led Zeppelin Robert Plant, Jimmy Page wizard, Pink Floyd Dark Side era, The Who 70s rock opera, Rolling Stones Mick Jagger 70s, Keith Richards pirate style, " +
    
    // NEW: Sports & Athletes 70s
    "70s sports aesthetic, vintage sports photo 70s, short shorts athletes, tube socks pulled up, headbands sports 70s, sweatbands wrist and head, tennis whites 70s, Bjorn Borg headband, John McEnroe style, Chris Evert 70s tennis, Billie Jean King battle of sexes, basketball short shorts, Kareem Abdul Jabbar afro, Dr J afro Julius Erving, Pete Maravich floppy hair, pistol pete style, baseball stirrups 70s, Reggie Jackson Oakland A's, Catfish Hunter mustache, Rollie Fingers handlebar, Mark Spitz swimmer mustache, Bruce Jenner decathlon 70s, Dorothy Hamill figure skating, Olga Korbut gymnastics, Nadia Comaneci perfect 10, Muhammad Ali 70s greatest, Joe Frazier afro, George Foreman intimidating, Evel Knievel daredevil jumpsuit, " +
    
    // NEW: Movie Character Specific
    "Rocky Balboa 1976 look, Adrian Rocky shy style, Paulie Rocky working class, Apollo Creed flashy style, Taxi Driver Travis Bickle, Robert De Niro mohawk, Jodie Foster teen 70s, The Godfather Pacino 70s, Diane Keaton Annie Hall style, Woody Allen neurotic 70s, Carrie White prom massacre, Jaws beach 70s aesthetic, Amity Island style, Chief Brody practical, Hooper oceanographer, Quint crusty sailor, Star Wars 77 premiere fans, Princess Leia buns, Luke Skywalker farm boy, Han Solo swagger, Close Encounters Richard Dreyfuss, Alien Ripley working class space, Superman Christopher Reeve 78, Grease 50s nostalgia in 78, Olivia Newton John Sandy, John Travolta Danny Zuko, Animal House toga party, Bluto Belushi style, " +
    
    // NEW: Cultural Moments & Events
    "Bicentennial 1976 celebration, America 200th birthday, red white blue 76, Spirit of 76 aesthetic, Tall Ships 1976, Patty Hearst SLA beret, Watergate era fashion, Nixon resignation style, Ford pardon era, Carter sweater presidency, energy crisis 70s, gas shortage lines, oil embargo aesthetic, Three Mile Island era, Kent State protest style, Vietnam War end 1975, fall of Saigon aesthetic, POW MIA bracelet, peace symbol everywhere, Earth Day original 1970, environmental awakening, women's lib movement style, ERA activism 70s, bra burning myth, Ms Magazine founding, Title IX sports equality, Roe v Wade era, civil rights continued 70s, busing crisis Boston, Son of Sam summer 77, blackout New York 1977, Studio 54 opening night, " +
    
    // NEW: Technology & Products 70s
    "what 70s technology looked like, retro tech aesthetic, wood grain electronics, fake wood paneling, harvest gold appliances, avocado green fridge, burnt orange kitchen, brown bathroom 70s, shag carpet colors, conversation pit furniture, bean bag chair 70s, waterbed aesthetic, lava lamp glow, black light posters, velvet paintings 70s, macrame plant hangers, hanging basket chair, papasan chair style, rattan furniture peacock chair, beaded curtain doorway, mirrored wall tiles disco, foil wallpaper 70s, geometric patterns wallpaper, earth tone interior design, Brady Bunch split level, ranch house 70s, colonial revival suburban, " +
    
    // NEW: Toys & Games 70s
    "Pong video game aesthetic, Atari 2600 era, Asteroids arcade, Space Invaders 70s, Pac-Man almost 80s, pet rock photo op, mood ring colors, sea monkeys ad, X-ray specs comic book, Weebles wobble toy, Lite Brite creation, Simon says game, Merlin handheld game, Speak and Spell 70s, Micronauts toys, Star Wars action figures original, Mego superheroes, Six Million Dollar Man toy, Evel Knievel stunt cycle, Big Wheel riding, Green Machine drift, Hot Wheels track, Matchbox cars collection, " +
    
    // NEW: Food & Dining 70s
    "70s dinner party aesthetic, fondue party photo, shrimp cocktail retro, deviled eggs 70s, cheese ball party, Ritz crackers spread, cocktail weenies, pigs in blanket 70s, Swedish meatballs party, ambrosia salad 70s, jello mold horror, tuna casserole aesthetic, TV dinner 70s, Swanson meal tray, Tang orange drink, Space Food Sticks, Pop Rocks candy, Pixie Stix sugar, Lik-m-aid Fun Dip, Zotz fizzy candy, bottle caps candy, Wacky Packages stickers, McDonald's 70s aesthetic, Burger King 70s style, pizza parlor 70s vibes, salad bar sneeze guard, all you can eat buffet, " +
    
    // NEW: Car Culture 70s
    "70s muscle car aesthetic, Trans Am Smokey Bandit, Pontiac Firebird style, Camaro Z28 70s, Dodge Charger General Lee, Plymouth Road Runner, AMC Gremlin compact, Pinto economy car, Chevette cheap style, wood paneled station wagon, Country Squire wagon, Vista Cruiser Oldsmobile, conversion van customized, shag carpet van interior, waterbed van, captain's chairs van, porthole windows, mag wheels 70s, chrome bumpers era, vinyl roof landau, hood scoops functional, CB radio era, convoy culture, Smokey and the Bandit, truckers 70s style, " +
    
    // NEW: School & Education 70s
    "70s classroom aesthetic, chalkboard and filmstrip, overhead projector, ditto machine purple, mimeograph smell, SRA reading box, card catalog library, encyclopedia Britannica, World Book Encyclopedia, typing class manual, home economics class, wood shop class, metal shop, driver's ed car, film projector 16mm, safety films 70s, educational TV, Schoolhouse Rock, Electric Company PBS, Sesame Street 70s, Mr Rogers sweater, Bob Ross beginnings, Reading Rainbow almost, " +
    
    // NEW: Party & Celebration Themes
    "70s birthday party photo, disco ball cake topper, bell bottom cookies, afro cupcakes, peace sign decorations, tie dye tablecloth, lava lamp centerpiece, record player decorations, cassette tape theme, 8-track party favors, vintage 70s invitations, groovy party banner, far out photo booth, Studio 54 entrance, velvet rope party, disco dance floor rental, mirror ball hanging, retro candy bar 70s, fondue fountain party, shag carpet lounge area, bean bags seating party, " +
    
    // NEW: Workplace & Office 70s
    "70s office aesthetic, secretary pool style, typing pool fashion, stenographer look, IBM Selectric typewriter, carbon copy paper, white out correction, file cabinet beige, cubicle farm original, open plan office 70s, wood veneer desk, executive leather chair, rotary phone beige, intercom system, Muzak elevator music, water cooler gossip, smoke break era, smoking in office 70s, three martini lunch, power suit beginning 70s, leisure suit businessman, wide tie patterns, tie clip 70s, briefcase attaché, " +
    
    // NEW: Holiday Specific 70s
    "70s Christmas aesthetic, tinsel icicles tree, bubble lights vintage, aluminum Christmas tree, color wheel tree, shiny brite ornaments, Norelco Santa commercial, Rudolf Burl Ives, Frosty the Snowman, Charlie Brown Christmas, Grinch Boris Karloff, Christmas Story almost 80s but 70s vibe, Santa beard style 70s, Mrs Claus 70s look, elf costume 70s style, Thanksgiving 70s family, harvest decorations seventies, Halloween 70s costumes, store bought plastic masks, Ben Cooper costume box, pumpkin bucket candy, " +
    
    // NEW: Regional/Geographic 70s
    "California 70s laid back, Southern California surf style, Venice Beach 70s, San Francisco hippie leftover, Haight Ashbury post 60s, New York City 70s grit, CBGB punk beginning, Times Square seedy 70s, Brooklyn working class, Queens suburban 70s, Bronx burned 70s, Detroit Motown decline, Motor City 70s, Chicago soul 70s, Miami Vice pre-cursor, Florida retirement 70s, Arizona desert aesthetic, Southwest 70s style, Texas cowboy disco, Nashville country 70s, " +
    
    // NEW: Question-Based Searches
    "how did people dress in the 70s really, what did normal people wear 70s, were bell bottoms actually popular, did everyone have an afro, was disco really that big, when did disco die, what year disco ended, difference between early and late 70s, when did 70s style change, what came after hippie era, transition from 60s to 70s, did punk start in 70s, when did punk begin, 70s vs 80s fashion, how to tell decade in photos, dating old photos 70s clues, " +
    
    // NEW: Comparison Searches
    "70s vs 60s style difference, 70s vs 80s which is better, early 70s vs late 70s fashion, disco vs punk 70s, hippie vs disco which came first, bell bottoms vs flares difference, afro vs jheri curl timeline, 70s authentic vs 70s costume, real 70s vs That 70s Show, accurate 70s vs Hollywood 70s, 70s filter vs actual 70s photo, AI 70s vs real vintage, modern 70s aesthetic vs original, " +
    
    // NEW: Specific Photo Types
    "70s school picture day, class photo 1970s, team photo seventies, prom photo 70s style, homecoming dance 70s, graduation portrait seventies, senior picture 70s, engagement photo 70s style, wedding photo seventies aesthetic, family portrait 70s formal, Christmas card photo 70s, vacation photo seventies, road trip picture 70s, camping photo aesthetic, beach photo 70s, pool party picture, backyard BBQ 70s, block party photo, church directory 70s, work ID badge photo seventies, driver license photo 70s, passport photo seventies, " +
    
    // NEW: Age/Generation Specific
    "born in the 70s photo, 70s baby boomer style, Gen X childhood 70s, teenager in the 70s, young adult seventies, college student 70s style, working professional seventies, stay at home mom 70s, housewife aesthetic seventies, blue collar worker 70s, factory worker style, construction worker seventies, office worker 70s, businessman seventies, career woman 70s breakthrough, single working woman seventies, divorcee 70s independence, senior citizen 70s style, retirement age seventies, " +
    
    // NEW: Emotional/Personal Searches
    "recreate my parents 70s wedding photo, look like mom in high school, dad in his yearbook, grandpa in the service 70s, grandma's wedding dress seventies, uncle's prom photo recreation, aunt's graduation picture, family reunion 70s style, ancestry photo seventies era, genealogy 70s photos, heritage photos seventies, immigrant family 70s, American dream seventies, melting pot 70s, cultural identity seventies, roots TV series era, finding family history 70s, connecting with past seventies, nostalgia for simpler times, when life was easier 70s, before technology took over, " +
    
    // NEW: Social Media Use Cases
    "Throwback Thursday 70s, TBT seventies style, Flashback Friday 70s, vintage aesthetic Instagram, retro feed 70s, nostalgia content seventies, boomer content 70s, Gen X memories, millennial parents 70s recreation, TikTok 70s trend, Instagram 70s filter, Facebook 70s profile pic, Twitter 70s header, dating profile 70s aesthetic, unique profile picture seventies, stand out social media 70s, viral 70s photo, trending seventies content, 70s challenge social media, decades challenge 70s, " +
    
    // NEW: Common Typos/Misspellings
    "70's photo generator, seventys style, 1970's aesthetic, discoe fever, hippee style, bellbottoms one word, afroe hair, farrah fawcet, studeo 54, saterday night fever, john travolta fever, peacesign, flowerpowwr, tiedye, leasure suit, plaform shoes, aviater glasses, polyster suit, dashicki, peasent blouse, " +
    
    // NEW: Long-Tail Conversational
    "I want to look like my mom did in the 70s, show me what I would look like as a disco dancer, make me into a hippie from Woodstock, what would I look like with an afro, turn me into John Travolta Saturday Night Fever, I need a 70s costume for a party, help me win decade day at school, want to recreate family photos from 70s, looking for authentic 70s yearbook style, need realistic 70s not cheesy costume, want to see myself in bell bottoms, curious how I'd look with feathered hair, show me in groovy 70s fashion, transport me back to Studio 54, make me a flower child, " +
    
    // NEW: Influencer/Creator Specific
    "70s content creator ideas, vintage aesthetic influencer, retro brand ambassador 70s, nostalgia marketing seventies, 70s themed content, decade content series, throwback content strategy, vintage fashion blogger 70s, retro lifestyle influencer, nostalgic storytelling 70s, generational content seventies, boomer appeal content, Gen X nostalgia posts, family history content 70s, ancestry storytelling seventies";

  const title = customTitle || defaultTitle;
  const description = customDescription || defaultDescription;
  const keywords = customKeywords || defaultKeywords;
  const imageUrl = customOgImage || ogImage;
  const canonicalUrl = customCanonicalUrl || pageUrl;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "70s AI Photo Generator - Disco, Hippie & Funk Creator",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web",
    "description": description,
    "url": canonicalUrl,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "description": "Free 70s AI photo transformation with sign-up credits"
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
      "Transform photos into authentic 1970s style with AI",
      "Disco fever and Studio 54 aesthetics",
      "Hippie peace & love and flower power looks",
      "Funk and Soul Train fashion",
      "Bell bottoms and platform shoes generation",
      "Afro hairstyles and feathered hair (Farrah Fawcett)",
      "70s yearbook photo recreation",
      "Saturday Night Fever disco style",
      "Woodstock and bohemian hippie vibes",
      "Glam rock and David Bowie aesthetics",
      "Leisure suits and polyester fashion",
      "Wide collars and butterfly collars",
      "Earth tones and harvest gold colors",
      "Tie-dye and fringe vest looks",
      "Aviator sunglasses and tinted glasses",
      "Wood paneling and shag carpet backgrounds",
      "Peace signs and flower power symbols",
      "Roller disco and skating aesthetics",
      "Free AI-powered 70s generation",
      "High-resolution groovy downloads",
      "Perfect for themed parties and nostalgia",
      
      // NEW: Specific Style Features
      "John Travolta Saturday Night Fever white suit style",
      "Bee Gees disco group aesthetic",
      "ABBA Dancing Queen glittery outfits",
      "Charlie's Angels Farrah Fawcett wings",
      "Brady Bunch family portrait style",
      "Starsky & Hutch detective fashion",
      "Soul Train line dance party aesthetic",
      "Jackson 5 afro and sparkles",
      "David Bowie Ziggy Stardust glam",
      "Elton John outrageous glasses and sequins",
      "Cher long straight hair goddess look",
      "Elvis 70s jumpsuit era",
      
      // NEW: Fashion Details
      "Bell bottoms with perfect flare",
      "Platform shoes 4-6 inches high",
      "Hot pants and tube tops",
      "Maxi dresses floor-length",
      "Leisure suits polyester shine",
      "Dashiki African print shirts",
      "Peasant blouses embroidered",
      "Fringe vests suede or leather",
      "Headbands across forehead",
      "Love beads long strands",
      "Puka shell necklaces surfer style",
      "Medallions on chest hair",
      "Gold chains multiple layers",
      "Mood rings color-changing",
      "Clogs and earth shoes comfort",
      
      // NEW: Hairstyle Variations
      "Natural afro with pick",
      "Farrah Fawcett feathered wings",
      "Dorothy Hamill wedge cut",
      "Shag haircut layered",
      "Long straight center part",
      "Feathered sides blown back",
      "Sideburns to jaw level",
      "Mutton chops facial hair",
      "Handlebar mustache curled",
      "Fu Manchu drooping mustache",
      "Permed curly hair",
      "Body wave subtle curl",
      
      // NEW: Color & Aesthetic Features
      "Warm earth tone color grading",
      "Harvest gold yellows",
      "Avocado green hues",
      "Burnt orange warmth",
      "Brown and tan combinations",
      "Faded photo film look",
      "Slight grain vintage texture",
      "Warm lighting golden hour",
      "Soft focus romantic glow",
      
      // NEW: Background Options
      "Wood paneling wall authentic",
      "Shag carpet floor thick pile",
      "Disco ball mirror reflection",
      "Lava lamp ambient glow",
      "Beaded curtain doorway",
      "Macrame wall hanging",
      "Velvet painting backdrop",
      "Conversation pit seating",
      "Bean bag chair lounging",
      "Waterbed bedroom scene",
      "VW bus hippie van",
      "Record player vinyl spinning",
      
      // NEW: Use Case Features
      "Perfect for 70s themed costume parties",
      "Decade Day school spirit week winner",
      "Halloween authentic 70s costume reference",
      "Throwback Thursday social media posts",
      "Family history recreation",
      "Yearbook recreation authentic style",
      "Wedding or prom throwback recreation",
      "Genealogy ancestry photo matching",
      "Parent or grandparent youth recreation",
      "Nostalgia content for social media",
      "Boomer generation memories",
      "Gen X childhood aesthetic",
      
      // NEW: Technical Features
      "Instant 30-60 second generation",
      "High-resolution printable output",
      "Authentic period-accurate details",
      "Natural-looking not costume-y",
      "Historically accurate fashion",
      "Era-appropriate color palettes",
      "Genuine vintage film look",
      "Professional photo quality",
      "Download and share immediately"
    ],
    "potentialAction": {
      "@type": "UseAction",
      "target": canonicalUrl,
      "description": "Transform your photos into far out 70s style online"
    },
    "category": "AI Photo Generator & Vintage Style Creator",
    "genre": ["Photography", "AI Tools", "Nostalgia", "70s Culture", "Retro Style", "Disco"]
  };

  // MASSIVELY EXPANDED FAQ with real human questions
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      // ORIGINAL FAQs (KEEPING ALL)
      {
        "@type": "Question",
        "name": "How can I make myself look like the 70s?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Upload your photo to our free 70s AI generator and choose from styles like disco fever (bell bottoms, platform shoes), hippie peace & love (tie-dye, headbands), funk & soul (afros, dashikis), or glam rock. Our AI instantly transforms you into authentic 1970s style with period-accurate fashion, hairstyles like afros and feathered hair, earth tone colors, and vintage photo effects."
        }
      },
      {
        "@type": "Question",
        "name": "What is 70s disco aesthetic?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "70s disco aesthetic includes bell bottoms, platform shoes, leisure suits, wide collars, disco ball backgrounds, Studio 54 vibes, shiny polyester fabrics, gold chains, medallion necklaces, and dance floor lighting. Our AI recreates the Saturday Night Fever era with authentic disco fashion and that groovy dance club atmosphere."
        }
      },
      {
        "@type": "Question",
        "name": "Can I create a hippie flower power look?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our hippie style creates the authentic peace & love look with tie-dye shirts, fringe vests, headbands, love beads, peasant blouses, long flowing hair, peace signs, and bohemian vibes. Perfect for recreating Woodstock-era flower child aesthetics or just spreading groovy peace and love vibes."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get an afro or Farrah Fawcett feathered hair?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Our AI can add iconic 70s hairstyles including big afros, feathered hair (Farrah Fawcett style), shag cuts, long center parts, sideburns, mutton chops, perms, and that natural flowing hippie hair. Choose your style and rock that far out 70s hair!"
        }
      },
      {
        "@type": "Question",
        "name": "What 70s styles can I create?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Choose from disco fever (Studio 54, Saturday Night Fever), hippie/flower power (Woodstock, bohemian), funk & soul (Soul Train, afros), glam rock (David Bowie, Elton John), casual 70s (bell bottoms, earth tones), or yearbook styles. Each captures authentic 70s fashion, colors, and that groovy decade's unique vibe."
        }
      },
      {
        "@type": "Question",
        "name": "Is this good for 70s themed parties?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Far out! Perfect for 70s themed parties, disco parties, spirit week decade day, Halloween costumes (Saturday Night Fever, hippie, Charlie's Angels), throwback birthdays, or Studio 54 themed events. Create your look before the party or use it for invitations and social media. Groovy for any nostalgic celebration!"
        }
      },
      {
        "@type": "Question",
        "name": "What TV shows and movies inspired these styles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our 70s styles are inspired by iconic shows and movies like Saturday Night Fever (disco), The Brady Bunch, Charlie's Angels (feathered hair), Starsky & Hutch, Happy Days, Soul Train (funk fashion), That '70s Show, Dazed and Confused, and music icons like ABBA, Bee Gees, Donna Summer, David Bowie, and Cher. Capture the essence of your favorite 70s pop culture moments."
        }
      },
      {
        "@type": "Question",
        "name": "Can I create a Studio 54 disco look?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our Studio 54/disco style creates that legendary nightclub aesthetic with glittery outfits, platform shoes, disco ball lighting, dance floor vibes, and the glamorous party atmosphere of the most famous disco club ever. Perfect for recreating Saturday night fever!"
        }
      },
      {
        "@type": "Question",
        "name": "How long does the 70s transformation take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your 70s transformation takes 30-60 seconds. Upload your photo, pick your style (disco, hippie, funk, glam rock, etc.), and our AI instantly transports you back to the grooviest decade. Download your far out 70s photo immediately."
        }
      },
      {
        "@type": "Question",
        "name": "Is the 70s AI generator free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Right on! Get free credits when you sign up (no credit card required) to try our 70s AI generator. Transform yourself into disco, hippie, funk, or any 70s style for free. Additional credits available if you want to create multiple looks or try different decades."
        }
      },
      {
        "@type": "Question",
        "name": "What makes a photo look authentically 70s?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Authentic 70s photos have warm earth tones (browns, oranges, harvest gold, avocado green), specific color grading with slightly faded warm colors, period-accurate fashion (bell bottoms, platform shoes, wide collars), iconic hairstyles (afros, feathered, shags), wood paneling or shag carpet backgrounds, and that vintage film camera grain. Our AI captures all these groovy elements to make your photo genuinely look like it's from 1970-1979."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this for social media throwbacks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Far out, man! Perfect for Throwback Thursday (#TBT), Instagram nostalgia posts, Facebook memories, and TikTok trends. Create authentic-looking 70s photos that'll make your followers think you found old family photos from the disco era. Great for Gen X and boomer content creators reliving the groovy days of peace, love, and platform shoes."
        }
      },
      
      // NEW: Family & Personal Questions
      {
        "@type": "Question",
        "name": "Can I recreate my parents' wedding photo from the 70s?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Upload your photo and our AI will transform you into authentic 70s wedding style - think wide-collared tuxedos, ruffled shirts, bow ties, flowing lace dresses, daisies and baby's breath bouquets, and that warm vintage photo quality. Perfect for anniversary surprises or seeing yourself in your parents' era."
        }
      },
      {
        "@type": "Question",
        "name": "What would I look like in my mom's yearbook?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our 70s yearbook style recreates authentic high school portraits from the decade - feathered hair, soft focus photography, earth tone backgrounds, genuine smiles (not forced), and that classic yearbook lighting. See yourself as a 70s teenager just like your parents' yearbook photos."
        }
      },
      {
        "@type": "Question",
        "name": "Can I see what my dad looked like in the 70s?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Choose from various 70s men's styles: disco with wide collars and medallions, casual with bell bottoms and earth tones, hippie with long hair and tie-dye, funk with afros and dashikis, or professional with leisure suits. Add period-accurate sideburns, mustaches, and that laid-back 70s vibe."
        }
      },
      
      // NEW: Specific Style Questions
      {
        "@type": "Question",
        "name": "How do I look like John Travolta in Saturday Night Fever?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Choose our disco fever style for the iconic white three-piece suit, black shirt, platform shoes, pointing pose, and Studio 54 dance floor lighting. Our AI captures that legendary Saturday Night Fever aesthetic with authentic disco fashion and confident dance floor swagger."
        }
      },
      {
        "@type": "Question",
        "name": "Can I create a Soul Train dancer look?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Right on! Our funk & soul style creates authentic Soul Train aesthetics with afros, dashikis, platform shoes, bell bottoms, colorful funk fashion, and that dance line energy. Perfect for recreating the iconic Don Cornelius era and the best dancers in America."
        }
      },
      {
        "@type": "Question",
        "name": "What's the difference between early 70s and late 70s style?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Early 70s (1970-1973) carried over hippie and folk styles - natural hair, earth tones, fringe, tie-dye, bohemian looks. Mid-70s (1974-1976) saw the rise of disco and glam - platform shoes, bell bottoms peaked, polyester everywhere. Late 70s (1977-1979) was peak disco then punk emergence - Studio 54, Saturday Night Fever, but also rawer edge. Our AI can capture any era within the decade."
        }
      },
      
      // NEW: Technical/Quality Questions
      {
        "@type": "Question",
        "name": "Will this look like a real 70s photo or obviously AI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI creates authentic-looking 70s photos with period-accurate fashion, hairstyles, colors, and that genuine vintage film quality. We focus on historical accuracy - not costume-y or exaggerated. The result looks like a real family photo or yearbook picture from 1970-1979, not a modern person in a costume."
        }
      },
      {
        "@type": "Question",
        "name": "Can I print these photos for a family album?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our 70s photos are high-resolution and perfect for printing. Create authentic-looking vintage family photos to add to albums, frame for walls, use in scrapbooks, or give as gifts. The quality is suitable for prints up to 16x20 inches or larger."
        }
      },
      
      // NEW: Use Case Questions
      {
        "@type": "Question",
        "name": "Is this good for Decade Day at school?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Perfect for spirit week! Create your 70s look ahead of time to plan your costume - see yourself in bell bottoms, afro, platform shoes, or disco style before buying anything. Use it for social media posts during spirit week. Way easier than finding authentic 70s clothes, and you'll definitely win best dressed!"
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this for a 70s Halloween costume idea?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Groovy idea! Use our generator to preview different 70s costume options - disco dancer, hippie, John Travolta, Charlie's Angel, David Bowie, or Soul Train dancer. See which style suits you best before committing to a costume. Perfect reference photos for your Halloween look."
        }
      },
      {
        "@type": "Question",
        "name": "What about a 70s themed birthday party?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Far out for parties! Create 70s photos for party invitations, use as decorations, make a photo booth backdrop, or have guests generate their 70s looks. Perfect for 50th birthday parties (born in the 70s!), disco parties, or anyone who wants to relive the grooviest decade."
        }
      },
      
      // NEW: Music & Pop Culture Questions
      {
        "@type": "Question",
        "name": "Can I look like a 70s rock star?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Choose our glam rock style for David Bowie Ziggy Stardust looks, Elton John outrageous glasses, platform boots, sequins, feather boas, androgynous style, or go with classic rock - long hair, leather, denim, and that rebellious edge. Capture 70s rock & roll attitude."
        }
      },
      {
        "@type": "Question",
        "name": "What if I want a Charlie's Angels look?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Get that iconic feathered Farrah Fawcett hair, 70s detective fashion, flowy hair, confident poses, and the glamorous but action-ready aesthetic of Kate Jackson, Jaclyn Smith, and Farrah. Perfect for 70s female empowerment vibes with style!"
        }
      },
      
      // NEW: Regional/Cultural Questions
      {
        "@type": "Question",
        "name": "What's California 70s style vs New York 70s?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "California 70s was laid-back surf and hippie - natural hair, earth tones, bohemian, VW buses, beach vibes. New York 70s was grittier and more disco - Studio 54, punk beginning at CBGB, urban edge, street fashion. Both authentic 70s but different regional flavors. Choose your vibe!"
        }
      },
      
      // NEW: Privacy/Usage Questions
      {
        "@type": "Question",
        "name": "What happens to my photo after I create a 70s version?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your photos are automatically deleted from our servers within 1 hour after processing. We never store, save, or use your photos for AI training. Your personal photos and your groovy 70s transformations remain completely private."
        }
      },
      
      // NEW: Comparison Questions
      {
        "@type": "Question",
        "name": "Is this better than using a 70s filter app?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI doesn't just apply a filter - it transforms your entire photo with authentic 70s fashion, hairstyles, backgrounds, and period-accurate details. Simple filters just change colors, but we recreate the complete 70s aesthetic including clothing, hair, accessories, and that genuine vintage photo quality."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Transform Your Photo into 70s Style",
    "description": "Create authentic 1970s disco, hippie, or funk style photos with AI",
    "totalTime": "PT2M",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Upload Your Photo",
        "text": "Upload a clear photo of yourself. Modern selfies work great! The AI will transform it into authentic 70s style with groovy vibes and far out fashion.",
        "image": `${siteUrl}/images/howto/upload-70s.jpg`
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Choose Your 70s Style",
        "text": "Pick from disco fever (bell bottoms, platform shoes), hippie flower power (tie-dye, peace signs), funk & soul (afros, Soul Train vibes), glam rock (David Bowie style), or casual 70s (earth tones, shag carpet). Each captures a different vibe of the grooviest decade.",
        "image": `${siteUrl}/images/howto/choose-70s-style.jpg`
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "AI Generates Your 70s Look",
        "text": "Our AI transforms your photo with authentic 70s fashion, hairstyles (afros, feathered hair, shags), warm earth tone color grading, disco or hippie aesthetics, and that iconic yearbook or family photo look. Takes 30-60 seconds.",
        "image": `${siteUrl}/images/howto/ai-processing-70s.jpg`
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Download & Share",
        "text": "Download your far out 70s transformation in high resolution. Perfect for social media throwbacks, themed parties, or just reliving the grooviest decade of peace, love, and disco!",
        "image": `${siteUrl}/images/howto/download-70s.jpg`
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
      <meta property="og:title:alt" content="Make Me Look Like the 70s - Free Disco & Hippie AI Generator" />
      <meta name="twitter:title:alt" content="70s Style Photo Creator - Far Out AI Transformation" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Throwback AI - 70s Photo Generator" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Transform into authentic 70s style - disco bell bottoms, hippie tie-dye, afros, feathered hair, yearbook photos with AI generator" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@throwbackai" />
      <meta name="twitter:creator" content="@throwbackai" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twitterImage} />
      <meta name="twitter:image:alt" content="Create groovy 70s photos with AI - disco, hippie, funk, glam rock transformations" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#8B4513" />
      <meta name="msapplication-TileColor" content="#8B4513" />
      <meta name="application-name" content="70s AI Generator - Throwback AI" />
      <meta name="apple-mobile-web-app-title" content="70s Photo Generator" />
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

      {/* ADDED: 70s culture-specific meta tags */}
      <meta name="decade" content="1970s,seventies,70s" />
      <meta name="era" content="disco-era,hippie-era,funk-soul-era,flower-power,studio-54" />
      <meta name="style-categories" content="disco,hippie,funk,soul,glam-rock,bohemian,flower-power,peace-love" />
      <meta name="fashion-trends" content="bell-bottoms,platform-shoes,leisure-suits,tie-dye,afros,feathered-hair,wide-collars,fringe-vests,headbands,love-beads,dashiki,hot-pants,tube-tops,maxi-dresses" />
      <meta name="music-references" content="disco,funk,soul-train,ABBA,bee-gees,donna-summer,david-bowie,elton-john,cher,stevie-wonder,marvin-gaye,earth-wind-fire" />
      <meta name="tv-movie-references" content="saturday-night-fever,studio-54,brady-bunch,charlies-angels,starsky-hutch,happy-days,soul-train,that-70s-show,dazed-and-confused,woodstock" />
      <meta name="target-audience" content="gen-x,baby-boomers,millennials,nostalgia,70s-kids,disco-enthusiasts,hippie-culture-fans" />
      <meta name="use-cases" content="themed-parties,disco-parties,spirit-week,halloween,throwback-thursday,social-media,yearbook-recreation,costume-parties" />
      <meta name="tech-nostalgia" content="rotary-phone,8-track,record-player,vinyl,pong,console-tv,tv-antenna,AM-radio,cassette-recorder" />
      <meta name="visual-aesthetic" content="earth-tones,harvest-gold,avocado-green,burnt-orange,browns,wood-paneling,shag-carpet,disco-balls,peace-signs,flower-power-symbols" />
      <meta name="cultural-keywords" content="groovy,far-out,right-on,outta-sight,can-you-dig-it,solid,dyno-mite,keep-on-truckin,peace-love-happiness,flower-child,free-spirit" />
      <meta name="hairstyles" content="afro,feathered-hair,farrah-fawcett,shag-cut,sideburns,mutton-chops,center-part,natural-hair,perms,long-flowing-hair" />

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
            "name": "Throwback AI - 70s Photo Generator",
            "description": "Free AI-powered 70s photo transformation service - create disco, hippie, funk, and authentic 1970s style photos online",
            "url": canonicalUrl,
            "sameAs": [facebookPageUrl],
            "serviceArea": {
              "@type": "Place",
              "name": "Worldwide"
            },
            "priceRange": "Free",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "70s Photo Transformation Styles",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Disco Fever Transformation",
                    "description": "Transform into authentic 70s disco aesthetic with bell bottoms, platform shoes, and Studio 54 vibes"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Hippie Flower Power Style",
                    "description": "Create hippie peace & love looks with tie-dye, headbands, and Woodstock-era bohemian vibes"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "70s Yearbook Photo Creator",
                    "description": "Generate authentic yearbook-style portraits with feathered hair, earth tones, and iconic 70s fashion"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Funk & Soul Train Style",
                    "description": "Create funk and soul aesthetics with afros, dashikis, and Soul Train dance floor vibes"
                  }
                }
              ]
            }
          })
        }}
      />

      {/* Preload Critical Resources */}
      <link rel="preload" href="/fonts/groovy-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

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

export default SeventiesSEO;