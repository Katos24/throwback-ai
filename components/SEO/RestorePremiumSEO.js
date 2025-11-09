// components/seo/RestorePremiumSEO.js - MAXIMUM SEO OPTIMIZATION + HUMAN SEARCH TERMS
import Head from "next/head";

const siteUrl = "https://throwbackai.app";
const pageUrl = `${siteUrl}/replicate/restore-premium`;
const ogImage = `${siteUrl}/images/restore-preview.webp`;
const twitterImage = ogImage;
const facebookPageUrl = "https://www.facebook.com/profile.php?id=61578072554521";
const facebookPageId = "61578072554521";

const RestorePremiumSEO = ({ 
  customTitle = null,
  customDescription = null,
  customKeywords = null,
  customOgImage = null,
  customCanonicalUrl = null
}) => {
  // UPDATED: Packed with target keywords - restore, enhance, repair, fix, colorize
  const defaultTitle = "Restore Old Photos Free | AI Photo Restoration & Enhancement Tool - Fix Damaged Pictures Online";
  
  // UPDATED: Lead with "restore" and cover all pain points
  const defaultDescription =
    "Free AI photo restoration tool - Restore old photos, enhance blurry pictures, fix damaged images, and colorize black & white photos online. Repair scratches, tears, and fading. Best free photo enhancer and restoration service. Basic restoration 1 credit, premium colorization 40 credits.";
  
  // MASSIVELY EXPANDED: Original technical keywords + Real human searches
  const defaultKeywords =
    // ORIGINAL TECHNICAL/INTERNATIONAL KEYWORDS (KEEPING ALL)
    "how to restore old photos free, fix my old photos, can AI restore damaged photos, restore grandparents photos, make old photos look new, fix blurry photo online free, how do I colorize old photos, restore faded family photos, fix scratched photo free, my photo is damaged how to fix, bring old photos back to life, make black and white photo color, restore photos from the 80s, fix torn picture, enhance grainy photos, restore old wedding photos, fix photo damage online, how to improve photo quality, restore scanned photos, make blurry picture clear, repair vintage family photos, restore ancestors photos, fix old Polaroid photos, how to sharpen old photos, restore photos for free online, what's the best photo restoration tool, enhance low quality photos, fix water damaged photos, restore photo from negative, improve old photo resolution, remove scratches from old photos, restore cracked photos, fix discolored photos, bring faded photos back to life, restore 1960s photos, 1970s photos, 1980s photos, fix wrinkled photo, enhance old digital photos, restore photo for obituary, fix photo for funeral, restore military photos, fix yellowed photos, restore newspaper clippings, enhance old Kodak photos, fix old disposable camera photos, restore photos from slide scanner, memorial photo restoration service, genealogy photo repair, ancestry photo enhancement, restore historical family photos, fix heritage photos, restore photos of deceased loved ones, fix childhood photos, restore parents wedding photos, enhance old graduation photos, restore baby photos, fix vacation photos from the past, restore holiday family photos, photo restoration UK, photo restoration Australia, photo restoration Canada, restore photos online free UK, fix old photos British, repair vintage photographs England, restore family photos Australia, enhance old photos Canada, photo restoration service London, restore pictures online free, photo repair tool free, fix damaged photographs, restore old pictures free, photo enhancement online, vintage photo restoration service, old photo repair near me, professional photo restoration online, restore sepia photos, fix antique photographs, photo colorization service, black and white photo coloring, add color to vintage photos, colorize historical photos, restore Victorian photos, Edwardian photo restoration, restore WW1 photos, WW2 photo restoration, restore 1920s photos, 1930s photos, 1940s photos, 1950s photos, fix old family portraits, restore daguerreotype, restore tintype photos, glass plate negative restoration, restore cabinet card photos, fix carte de visite, restore immigrant ancestor photos, Ellis Island photo restoration, restore passport photos old, fix ID photos vintage, restore driver license photo old, enhance yearbook photos, restore prom photos, fix graduation pictures, restore christening photos, baptism photo repair, restore first communion photos, confirmation photo restoration, restore bar mitzvah photos, bat mitzvah photo repair, quinceañera photo restoration, wedding photo restoration Indian, restore nikah photos, fix walima pictures, restore Hindu wedding photos, Sikh wedding photo repair, restore Chinese wedding photos, Japanese wedding photo restoration, restore photos Philippines, restore photos India, restore photos Mexico, fix fotos viejas, restaurar fotos antiguas, reparar fotos dañadas, colorear fotos blanco y negro, mejorar calidad de fotos, restauration de photos anciennes, réparer des photos abîmées, coloriser photos noir et blanc, alte Fotos wiederherstellen, beschädigte Fotos reparieren, Schwarz-Weiß-Fotos kolorieren, ripristinare vecchie foto, riparare foto danneggiate, colorare foto bianco e nero, restaurar fotos antigas, reparar fotos danificadas, colorir fotos preto e branco, 古い写真を復元, 写真修復, 白黒写真カラー化, 오래된 사진 복원, 사진 복구, 흑백 사진 컬러화, 修复老照片, 修复损坏照片, 黑白照片上色, restore photos Ireland, restore photos Scotland, restore photos Wales, restore photos New Zealand, restore photos South Africa, restore photos Singapore, restore photos Malaysia, restore photos Indonesia, restore photos Thailand, restore photos Vietnam, restore photos Brazil, restore photos Argentina, restore photos Colombia, restore photos Chile, restore photos Europe, restore photos Asia, restore photos Africa, restore photos Middle East, free photo restoration worldwide, international photo repair service, global photo enhancement, " +
    
    // NEW: Desperate/Emotional Searches (Real human pain points)
    "help my photo is ruined, my only photo of grandma is damaged, fix my dead relatives photo, restore photo of my mom who passed away, only picture I have of my dad, bring back memories of deceased loved ones, fix the only photo I have, save my damaged wedding album, rescue my faded family photos, photo of grandpa needs fixing, restore picture before its too late, last photo of my grandmother, precious family photo damaged, sentimental photo restoration, restore irreplaceable photos, save cherished memories, family heirloom photo repair, photo means everything to me, cant lose this photo, photo of loved one who died, memorial photo needs help, " +
    
    // NEW: Question-Based Searches (How people actually ask Google)
    "how do I fix an old picture, what can restore old photos, where can I restore photos for free, is there a free photo fixer, can I fix a blurry photo, how to make old photos clearer, what app restores old photos, best way to fix damaged pictures, how to colorize grandmas photos, can AI fix torn photos, how do you restore faded pictures, what fixes scratched photos, where to get photos restored, who can restore old photos, what program fixes old photos, how much does photo restoration cost, can you fix severely damaged photos, is photo restoration expensive, what removes scratches from photos, how to enhance photo quality free, " +
    
    // NEW: Problem-First Searches (Specific damage types)
    "photo too blurry to see faces, picture is torn how to fix, my photo has water damage, scratches all over old photo, faded colors in family photos, yellowed photo restoration, wrinkled photo needs fixing, cracked photo repair, photo has missing pieces, picture quality is terrible, grainy photo fix, dark photo needs lightening, photo stuck to glass, sunlight damaged photo, fire damaged pictures, mold on old photos, brown spots on pictures, foxing on photographs, photo fading to white, discolored photo fix, bent photo restoration, folded photo repair, ripped photograph help, " +
    
    // NEW: Shopping/Comparison Searches (Competitor research)
    "best free photo restoration tool 2025, remini alternative free, myheritage photo enhancer vs, photoshop alternative for photos, free photo fixer better than remini, photo restoration app reviews, cheapest photo restoration service, photo repair tool comparison, best AI photo enhancer, top rated photo restoration, is remini free, photoshop too expensive alternatives, better than photoshop elements, luminar alternative, topaz photo ai free, gigapixel ai alternative, photoroom vs photo restoration, picsart photo enhancer, snapseed photo restoration, lightroom vs photo fixer, VSCO photo enhancement alternative, facetune old photo restoration, " +
    
    // NEW: Use Case Searches (Specific scenarios)
    "restore photos for funeral, fix picture for obituary, memorial photo restoration, photos for family reunion, restore pics for anniversary gift, fix photo to print and frame, wedding photo restoration service, restore military service photos, genealogy photo repair, ancestry photo enhancement, restore immigration photos, fix passport photo from 1950s, photos for memorial board, funeral home photo services, obituary photo enhancement, celebration of life photos, tribute video photo restoration, slideshow photo enhancement, scrapbook photo repair, photo book restoration, family tree photos fix, " +
    
    // NEW: Specific Damage/Format Types
    "restore scanned photos, fix smartphone photo quality, enhance digital camera photos, restore polaroid pictures, fix kodak film photos, restore photo negatives, slide scanner photo enhancement, disposable camera photo fix, restore photos from old phone, fix low resolution images, scan and restore photos, restore film photos, fix instant camera photos, restore 35mm photos, enhance DSLR photos, fix point and shoot photos, restore medium format photos, fix large format photos, enhance microfiche photos, restore microfilm images, " +
    
    // NEW: Location-Based (Critical for local SEO)
    "photo restoration near me, photo repair shop near me, professional photo restoration local, photo restoration services in my area, photo restorer nearby, local photo enhancement service, photo restoration in my city, photo lab near me restoration, camera shop photo restoration, photo studio restoration services, where to restore photos locally, photo restoration downtown, photo repair store near me, " +
    
    // NEW: Timeframe/Era-Specific
    "restore photos from the 40s, fix 1960s family photos, restore disco era pictures, enhance 80s polaroids, restore 90s disposable camera pics, fix photos from 2000s, vintage photo restoration 1920s, antique photo repair 1800s, Victorian photo restoration, Edwardian era photos, restore Great Depression photos, fix World War 2 pictures, restore Cold War era photos, 1950s housewife photos, 1970s hippie photos, 1980s new wave photos, Y2K era photo restoration, early digital photos 2000s, flip phone camera photos, " +
    
    // NEW: Cultural/Ethnic Specific (Inclusion matters for SEO)
    "restore Chinese family photos, fix Indian wedding photos, restore African American heritage photos, Mexican family photo restoration, Filipino ancestry photos, Jewish family photos restoration, Irish immigration photos, Italian heritage photos, restore photos from home country, Polish family photos, Greek heritage restoration, Puerto Rican family photos, Cuban family pictures, Vietnamese family photos, Korean ancestry photos, Japanese family restoration, Arab family photo repair, Persian heritage photos, Turkish family pictures, Armenian photo restoration, Native American photos, indigenous heritage photos, " +
    
    // NEW: Price-Conscious Searches (Budget buyers)
    "free photo restoration no credit card, restore photos without paying, cheapest way to fix photos, photo restoration under $5, affordable photo repair, restore photos on a budget, no subscription photo tool, one time payment photo restoration, pay per photo restoration, photo restoration discount, cheap photo enhancer, inexpensive photo fixer, photo restoration deals, free trial photo restoration, photo restoration coupon code, budget photo repair service, low cost photo enhancement, economical photo restoration, " +
    
    // NEW: Urgency-Based Searches (Time-sensitive)
    "restore photo fast, quick photo fix needed, same day photo restoration, emergency photo repair, restore photo in minutes, urgent photo enhancement, last minute photo fix, need photo fixed today, restore photo ASAP, rush photo restoration, express photo repair, instant photo enhancement, immediate photo fix, fast turnaround photo restoration, quick photo processing, rapid photo repair, speed photo enhancement, " +
    
    // NEW: Gift-Related Searches
    "restore photos as gift, fathers day photo gift, mothers day photo restoration, birthday photo surprise, anniversary gift photo restoration, christmas photo gift ideas, restored photo frame gift, memorial gift photo, graduation gift photo restoration, valentines day photo gift, wedding gift photo restoration, retirement gift photos, housewarming photo gift, baby shower photo restoration, photo gifts for grandparents, sentimental photo gifts, personalized photo restoration gift, " +
    
    // NEW: Tech-Level Searches (Skill-based)
    "easy photo restoration tool, photo fix for beginners, simple photo enhancer, no skills photo restoration, automatic photo repair, AI photo fixer easy, restore photos without photoshop, photo restoration for dummies, user friendly photo tool, photo restoration no experience needed, beginner photo enhancement, simple photo fixer, easy to use restoration, non-technical photo repair, photo restoration for seniors, straightforward photo tool, " +
    
    // NEW: Results-Focused Searches
    "make photo look professional, photo restoration before and after, photo quality improvement examples, dramatic photo transformation, photo enhancement results, restored photo samples, photo repair success stories, amazing photo restorations, incredible photo transformations, photo restoration portfolio, see restoration examples, photo enhancement showcase, restoration results gallery, before after photo repair, " +
    
    // NEW: Common Typos/Misspellings (People actually search these!)
    "restrore old photos, photo resotration, fix od photos, colorise photos, colourize pictures, phot restoration, resore damaged pictures, enhanse photo quality, photo repare, fix blury photo, photo resoration free, fix picturs, restore pitcures, photo restauration, fix damged photos, photo enhansment, restore phots, fix od pictures, colorize foto, enhance foto quality, restore phto, fix blured photo, photo restauration service, " +
    
    // NEW: Long-Tail Conversational (How people really talk)
    "my grandmas wedding photo is falling apart, can someone fix this old picture for me, need help restoring family photos, looking for photo restoration recommendations, where do people get old photos fixed, what do photographers use to restore photos, how much does photo restoration cost usually, my photo is in really bad shape, photo has been in storage for 50 years, found old photos in attic need restoration, inherited damaged photos need fixing, cleaning out parents house found photos, going through grandparents belongings found pictures, digitizing old albums need enhancement, " +
    
    // NEW: Platform-Specific Searches
    "photo restoration reddit recommendations, best photo tool quora, facebook photo restoration groups, instagram photo enhancement, photo restoration tiktok, youtube photo restoration tutorial, google photos restoration, icloud photo enhancement, photo restoration pinterest, photo repair linkedin, restore photos android app, restore photos iphone app, photo restoration chrome extension, photo fixer browser tool, online photo restoration no download, " +
    
    // NEW: Negative/Avoidance Searches (What they DON'T want)
    "photo restoration no subscription, not photoshop, no watermark photo restoration, doesnt make faces look fake, natural photo enhancement, not AI generated looking, preserve original photo look, authentic restoration not cartoonish, no fake smooth skin, realistic photo restoration, not overly processed, subtle photo enhancement, maintains photo authenticity, natural looking colorization, doesnt look digital, no anime face effect, preserve wrinkles and character, " +
    
    // NEW: Professional/Business Use Cases
    "photo restoration for real estate, enhance property photos, restore historical building photos, museum photo restoration, archive photo digitization, library photo restoration, historical society photo repair, documentary photo enhancement, journalism photo restoration, book publishing photo repair, academic research photo restoration, legal evidence photo enhancement, insurance claim photo restoration, genealogy business photos, historical research photo repair, " +
    
    // NEW: Device/Quality Issues
    "fix pixelated photo, enhance jpg quality, restore compressed photo, fix low resolution picture, upscale small photo, enlarge photo without blur, fix grainy smartphone photo, enhance webcam photo, restore screenshot quality, fix facebook compressed photo, enhance instagram quality loss, restore whatsapp photo quality, fix snapchat photo quality, improve video screenshot, fix heavily compressed image, restore saved photo quality, " +
    
    // NEW: Social Media Use Cases  
    "restore photo for facebook profile, enhance instagram photo quality, fix linkedin headshot, restore twitter profile picture, enhance tiktok photo, profile picture restoration, social media photo enhancement, dating app photo improvement, headshot photo restoration, professional photo enhancement, portfolio photo restoration, resume photo enhancement, about me photo restoration, " +
    
    // NEW: Print/Physical Use Cases
    "restore photo for printing, enlarge photo for poster, enhance photo for canvas, restore photo for frame, photo quality for large print, restore photo for album, enhance photo for scrapbook, restore photo for wall art, photo restoration for photo book, enhance for greeting cards, restore for Christmas cards, photo quality for yearbook, enhance for calendar, restore for thank you cards, " +
    
    // NEW: Family Event Specific
    "restore photos family reunion, fix photos for wedding slideshow, enhance photos for birthday party, restore photos anniversary celebration, fix photos retirement party, enhance photos graduation party, restore photos baby shower, fix photos bridal shower, enhance photos for quinceañera, restore photos sweet 16, fix photos for bar mitzvah, enhance photos for communion, " +
    
    // NEW: Seasonal/Holiday Searches
    "restore photos for Christmas, fix photos for Thanksgiving, enhance photos for Easter, restore photos for Halloween, fix photos for New Years, enhance photos for Valentines, restore photos for Independence Day, fix photos for Memorial Day, enhance photos for Mothers Day, restore photos for Fathers Day, fix photos for holidays, restore family photos for season greetings, " +
    
    // NEW: Medical/Health Related (Sensitive but searched)
    "restore photo of sick relative, enhance hospital photos, restore ICU photos, fix photos before surgery, restore photos end of life, enhance photos for medical records, restore photos health journey, fix photos cancer treatment, restore photos of recovery, enhance photos medical memorial";

  const title = customTitle || defaultTitle;
  const description = customDescription || defaultDescription;
  const keywords = customKeywords || defaultKeywords;
  const imageUrl = customOgImage || ogImage;
  const canonicalUrl = customCanonicalUrl || pageUrl;

  // UPDATED: Structured data emphasizing both basic and premium services
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Photo Restoration & Enhancement Tool",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web",
    "description": description,
    "url": canonicalUrl,
    "offers": [
      {
        "@type": "Offer",
        "name": "Basic Photo Restoration",
        "price": "1",
        "priceCurrency": "credits",
        "availability": "https://schema.org/InStock",
        "description": "Basic AI photo restoration - fix damaged photos, enhance clarity, repair scratches"
      },
      {
        "@type": "Offer",
        "name": "Premium Photo Restoration with Colorization",
        "price": "40",
        "priceCurrency": "credits",
        "availability": "https://schema.org/InStock",
        "description": "Premium AI photo restoration - full colorization, advanced damage repair, professional enhancement"
      }
    ],
    "creator": {
      "@type": "Organization",
      "name": "Throwback AI",
      "url": siteUrl
    },
    "keywords": keywords,
    "softwareVersion": "1.0",
    "featureList": [
      "Restore old and damaged photos",
      "Restore old and damaged photos with AI",
      "Fix scratched photos and remove damage",
      "Repair torn and ripped family pictures",
      "Remove water stains and water damage from photos",
      "Fix faded and yellowed old photos",
      "Restore cracked and wrinkled pictures",
      "Enhance blurry and out-of-focus photos",
      "Fix dark and underexposed pictures",
      "Remove scratches from scanned photos",
      "Repair photos with missing pieces",
      "Colorize black and white photos naturally",
      "Add realistic colors to vintage photos",
      "Restore old wedding and anniversary photos",
      "Fix grandparents and family heirloom photos",
      "Restore photos of deceased loved ones",
      "Repair photos for obituaries and memorials",
      "Fix military and historical photographs",
      "Restore old baby and childhood photos",
      "Repair vintage yearbook pictures",
      "Fix old Polaroid and Kodak photos",
      "Restore photos from film negatives",
      "Enhance scanned family album photos",
      "Remove dust spots and stains",
      "Fix sepia-toned photographs",
      "Restore newspaper clipping photos",
      "Improve photo quality and resolution",
      "Upscale low-resolution images",
      "Remove noise and grain from old photos",
      "Sharpen and enhance photo clarity",
      "Make old photos look new again",
      "Bring old photos back to life",
      "Restore family history and genealogy photos",
      "Professional-grade AI restoration",
      "Free basic photo restoration (1 credit)",
      "Premium colorization service (40 credits)",
      "Fast processing in 30-60 seconds",
      "High-resolution printable output",
      "Preserve precious family memories",
      "Perfect for family reunions",
      "Ready for printing and framing",
      "Secure and private photo processing",
      // Actual human search queries (SEO keywords)
      "restore old photos",
      "photo restoration online",
      "AI photo restoration",
      "fix old pictures",
      "repair damaged photos",
      "restore vintage photos",
      "colorize old photos",
      "make old photos look new",
      "photo restoration service near me",
      "best photo restoration software",
      "free photo restoration tool",
      "restore photos app",
      "online photo repair",
      "restore family photos",
      "restore grandparents pictures",
      "restore wedding photos",
      "restore childhood photos",
      "restore yearbook photos",
      "enhance blurry photo",
      "upscale old photo",
      "remove scratches from photo",
      "fix faded photo",
      // NEW: Emotional/urgent use cases
      "restore photo of deceased loved one",
      "fix only photo I have",
      "restore irreplaceable photo",
      "urgent photo restoration for funeral",
      "emergency photo repair for obituary",
      "last minute memorial photo fix",
      // NEW: Competitor alternatives
      "better than Remini",
      "cheaper than Photoshop",
      "MyHeritage alternative",
      "free Topaz alternative",
      "Gigapixel AI free version",
      // NEW: Problem-specific
      "fix water damaged photo",
      "repair torn photograph",
      "restore fire damaged picture",
      "remove mold from photos",
      "fix photo stuck to glass",
      // NEW: Natural authentic results
      "natural photo restoration",
      "realistic colorization",
      "no fake AI faces",
      "authentic photo enhancement",
      "preserve original character"
    ],
    "potentialAction": {
      "@type": "UseAction",
      "target": canonicalUrl,
      "description": "Restore, enhance, fix, and colorize old photos online"
    },
    "category": "Photo Restoration & Enhancement",
    "genre": ["Photography", "AI Tools", "Photo Editing", "Image Enhancement"]
  };

  // MASSIVELY EXPANDED: FAQ schema with real human questions
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      // ORIGINAL FAQs (KEEPING ALL)
      {
        "@type": "Question",
        "name": "How can I restore old photos for free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use our free AI photo restoration tool with 1 credit per photo. Upload your damaged, faded, or scratched photos and our AI will automatically restore, enhance, and repair them. Get 50 free credits when you sign up - no credit card required."
        }
      },
      {
        "@type": "Question",
        "name": "Can AI restore damaged photos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our AI photo restoration tool can repair scratches, fix tears, remove damage, enhance faded colors, improve blurry images, and restore clarity to old damaged photos. Works on vintage family photos, historical images, and scanned pictures."
        }
      },
      {
        "@type": "Question",
        "name": "How do I colorize black and white photos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Upload your black and white photo and select Premium Restoration (40 credits) for full AI colorization. Our AI adds realistic, natural colors to bring old black and white photos to life with authentic period-accurate tones."
        }
      },
      {
        "@type": "Question",
        "name": "What's the difference between basic and premium photo restoration?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Basic Restoration (1 credit) enhances clarity, fixes minor damage, and improves photo quality. Premium Restoration (40 credits) includes everything plus full colorization of black & white photos, advanced damage repair, and professional-grade enhancement."
        }
      },
      {
        "@type": "Question",
        "name": "Can I enhance blurry photos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our AI photo enhancer can sharpen blurry photos, improve clarity, reduce noise, and enhance overall image quality. Upload your blurry photo and our AI will automatically enhance and restore sharpness."
        }
      },
      {
        "@type": "Question",
        "name": "How long does photo restoration take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Basic photo restoration takes 30-60 seconds. Premium restoration with full colorization takes 60-90 seconds. Our AI processes photos instantly with professional-quality results."
        }
      },
      {
        "@type": "Question",
        "name": "Can you restore photos of deceased loved ones?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we can restore photos of deceased family members for obituaries, memorials, or preserving cherished memories. Our AI respectfully enhances and repairs old photos while maintaining the authenticity of your loved ones' images."
        }
      },
      {
        "@type": "Question",
        "name": "How do I make my grandparents' old photos look new?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply upload your grandparents' photos to our AI restoration tool. We'll automatically fix damage, enhance clarity, remove scratches and fading, and can even add color to black and white photos. The restored photos will look vibrant and clear while preserving the original moment."
        }
      },
      {
        "@type": "Question",
        "name": "Does this work for photos from other countries?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our service works worldwide for photos from any country including UK, Australia, Canada, India, Philippines, Europe, Asia, Africa, and Latin America. We can restore Victorian photos from England, colonial photos from India, immigrant ancestor photos, Ellis Island documentation, and historical photos from any region."
        }
      },
      {
        "@type": "Question",
        "name": "Can you restore very old historical photos like Victorian or daguerreotypes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We can restore Victorian photos, Edwardian portraits, daguerreotypes, tintypes, cabinet cards, carte de visite, glass plate negatives, and photos from the 1800s through modern times. Our AI handles antique photograph formats and historical damage patterns."
        }
      },
      {
        "@type": "Question",
        "name": "Can you restore photos from different cultural events and weddings?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! We restore photos from all cultural and religious events including Christian baptisms, Jewish bar/bat mitzvahs, Greek Easter, quinceañeras, Indian weddings, nikah ceremonies, Hindu and Sikh weddings, Chinese traditional weddings, and cultural celebrations from around the world."
        }
      },
      // NEW: Emotional/Desperate Questions
      {
        "@type": "Question",
        "name": "My grandma's photo is falling apart - can you fix it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We can restore photos with tears, scratches, water damage, and severe fading. Upload your damaged photo and our AI will repair it in 60 seconds. Perfect for preserving the only photos you have of loved ones. Works on photos that are torn, cracked, wrinkled, or falling apart."
        }
      },
      {
        "@type": "Question",
        "name": "This is the only photo I have of my dad - can you save it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. We understand how precious irreplaceable photos are. Our AI can restore severely damaged, faded, or deteriorating photos. Upload your photo and we'll do everything possible to bring it back to life. Perfect for preserving the only memories you have of loved ones."
        }
      },
      // NEW: Competitor Comparison Questions
      {
        "@type": "Question",
        "name": "Is this better than Remini?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unlike Remini which charges monthly subscriptions ($4.99-$9.99/month) and can make faces look unrealistic or overly smooth, we offer pay-per-photo pricing with no subscription. We preserve authentic facial features - perfect for vintage family photos and memorial restorations where maintaining the genuine look of your loved ones matters."
        }
      },
      {
        "@type": "Question",
        "name": "Is this cheaper than Photoshop?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Photoshop costs $22.99/month ($275/year). Our basic restoration is just 1 credit per photo, with 400 credits for $4.99. No monthly subscription, no software to learn, and results in 60 seconds instead of hours of manual editing."
        }
      },
      {
        "@type": "Question",
        "name": "How is this different from MyHeritage photo enhancer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MyHeritage requires a $129/year subscription. We offer pay-per-use pricing with no subscription required. Both use AI, but we focus on natural, authentic restoration that preserves the original character of vintage photos rather than over-processing them."
        }
      },
      // NEW: Urgency Questions
      {
        "@type": "Question",
        "name": "I need a photo fixed for a funeral tomorrow - how fast is this?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI restores photos in 60-90 seconds. Perfect for urgent needs like obituaries, memorial services, or last-minute printing for funerals. Upload now, download immediately, and send to the funeral home or printer right away. No delays, no waiting."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get same-day photo restoration?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our restoration is instant - takes 30-90 seconds per photo. Upload your photos now and have them restored, downloaded, and ready to print or share within minutes. Perfect for last-minute memorial services, obituaries, or urgent family needs."
        }
      },
      // NEW: Quality/Authenticity Questions
      {
        "@type": "Question",
        "name": "Will this make my photo look fake or AI-generated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No! We preserve authenticity. Unlike other AI tools that create unrealistic 'smooth' faces or make people look like different people, we enhance while maintaining the original look of your family photos. We keep wrinkles, character, and genuine facial features. Perfect for preserving real memories, not creating fake ones."
        }
      },
      {
        "@type": "Question",
        "name": "Will the colorization look natural or cartoonish?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI adds realistic, period-appropriate colors. We analyze the era, clothing, and context to apply authentic tones - not bright, cartoonish colors. The result looks like a photo taken in color during that time period, not an artificial colorization."
        }
      },
      // NEW: Technical Questions
      {
        "@type": "Question",
        "name": "Can you fix photos that are stuck to glass?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Take a photo or scan of the image (even if it's stuck to glass), and upload it. Our AI can work with photos of photos, scanned images from glass frames, and photos with glass reflections. We'll restore what's visible and enhance the quality."
        }
      },
      {
        "@type": "Question",
        "name": "What if my photo has water damage or mold spots?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI can remove water stains, mold spots, mildew damage, and water damage patterns from photos. Upload your water-damaged photo and the AI will detect and remove the stains while restoring the underlying image. Works on flood-damaged photos, basement-stored photos, and attic finds."
        }
      },
      {
        "@type": "Question",
        "name": "Can you restore photos that were in a fire?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we can restore fire-damaged photos that have smoke damage, heat damage, or charring around the edges. Upload what's left of the photo and our AI will work to restore the visible portions and enhance what can be recovered."
        }
      },
      // NEW: Use Case Questions
      {
        "@type": "Question",
        "name": "Can I use this for photos in a memorial slideshow?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Our restored photos are perfect for memorial slideshows, celebration of life videos, funeral displays, and tribute presentations. High-resolution output is ready for projection or printing. Restore all your memorial photos in minutes."
        }
      },
      {
        "@type": "Question",
        "name": "Will these photos work for printing and framing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our restoration outputs high-resolution images suitable for printing up to 16x20 inches or larger. Perfect for framing, canvas prints, photo books, scrapbooks, and professional printing. Download and take directly to any photo lab or online printing service."
        }
      },
      {
        "@type": "Question",
        "name": "Can I restore photos for a family reunion gift?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Perfect for that! Restore old family photos and create printed gifts, photo books, framed portraits, or digital albums. Many customers restore family photos as surprise gifts for parents, grandparents, anniversaries, and reunions. Restore dozens of photos quickly and affordably."
        }
      },
      // NEW: Privacy/Security Questions
      {
        "@type": "Question",
        "name": "What happens to my photos after restoration? Are they private?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your photos are automatically deleted from our servers within 1 hour after processing. We never store, save, or use your photos for AI training. Your family photos remain completely private. No one sees your photos except you."
        }
      },
      {
        "@type": "Question",
        "name": "Do you sell or share my restored photos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Never. Your photos are yours. We don't sell them, share them, use them in marketing, or train AI models on them. They're automatically deleted within 1 hour. Complete privacy guaranteed."
        }
      },
      // NEW: Pricing Questions
      {
        "@type": "Question",
        "name": "Is there really a free option?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Basic restoration costs 1 credit per photo. Sign up and get 50 free credits - that's 50 free photo restorations. No credit card required. No subscription. Just upload and restore."
        }
      },
      {
        "@type": "Question",
        "name": "Do I have to pay monthly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No! We hate subscriptions too. Pay only for what you use - no monthly fees. Buy credits once (400 credits for $4.99), and they never expire. Use them whenever you need them. No recurring charges."
        }
      },
      {
        "@type": "Question",
        "name": "How much does it cost to restore one photo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Basic restoration (enhance quality, fix minor damage): 1 credit. Premium restoration (full colorization, advanced repair): 40 credits. With 400 credits for $4.99, that's 400 basic restorations or 10 premium colorizations. Much cheaper than hiring a professional photo restorer ($35-$100 per photo)."
        }
      }
    ]
  };

  // ADDED: HowTo schema for restoration process
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Restore Old Photos with AI",
    "description": "Step-by-step guide to restore, enhance, and fix old damaged photos using AI",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Upload Photo",
        "text": "Upload your old, damaged, faded, or blurry photo. Supports JPG, PNG, HEIC formats.",
        "position": 1
      },
      {
        "@type": "HowToStep",
        "name": "Choose Restoration Level",
        "text": "Select Basic Restoration (1 credit) to fix damage and enhance quality, or Premium (40 credits) for full colorization and advanced repair.",
        "position": 2
      },
      {
        "@type": "HowToStep",
        "name": "AI Processes Photo",
        "text": "Our AI automatically restores, enhances, fixes scratches, improves clarity, and (if premium) adds realistic colors to your photo.",
        "position": 3
      },
      {
        "@type": "HowToStep",
        "name": "Download Restored Photo",
        "text": "Download your enhanced, restored, and improved photo in high resolution. Share or print your renewed family memories.",
        "position": 4
      }
    ],
    "totalTime": "PT2M"
  };

  return (
    <Head>
      {/* Basic Meta Tags - RESTORATION FOCUSED */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* ADDED: Multiple title variations for search engines */}
      <meta property="og:title:alt" content="Free Photo Restoration Tool - Restore & Enhance Old Photos with AI" />
      <meta name="twitter:title:alt" content="Restore Old Photos Free - AI Photo Enhancer & Repair Tool" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Throwback AI - Photo Restoration Tool" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Before and after AI photo restoration showing damaged, faded, scratched vintage photos transformed into vibrant, clear, enhanced images with colorization" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@throwbackai" />
      <meta name="twitter:creator" content="@throwbackai" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twitterImage} />
      <meta name="twitter:image:alt" content="Transform damaged vintage photos - restore, enhance, fix, and colorize old pictures with AI photo restoration tool" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#a855f7" />
      <meta name="msapplication-TileColor" content="#a855f7" />
      <meta name="application-name" content="AI Photo Restoration Tool - Throwback AI" />
      <meta name="apple-mobile-web-app-title" content="Restore Photos - AI Tool" />
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

      {/* ADDED: Service-specific meta tags for photo restoration */}
      <meta name="service-type" content="photo-restoration,photo-enhancement,photo-repair,photo-colorization" />
      <meta name="service-category" content="AI-restoration,image-enhancement,photo-repair-tool" />
      <meta name="target-photos" content="vintage,damaged,faded,blurry,scratched,torn,black-white,family-photos,old-pictures" />
      <meta name="restoration-features" content="colorization,damage-repair,enhancement,AI-powered,scratch-removal,clarity-improvement,denoise,upscale" />
      <meta name="tool-capabilities" content="restore,enhance,fix,repair,colorize,sharpen,improve,upscale,denoise" />
      <meta name="use-cases" content="genealogy,family-history,memorial,vintage-restoration,historical-preservation" />
      
      {/* ADDED: International and multilingual tags */}
      <meta name="geo.position" content="global" />
      <meta name="geo.placename" content="Worldwide" />
      <meta name="geo.region" content="US;GB;CA;AU;NZ;IE;IN;PH;SG;MY;ZA;BR;MX;AR;CO;CL;ES;FR;DE;IT;PT;JP;KR;CN;TH;VN;ID" />
      <meta name="available-countries" content="United States, United Kingdom, Canada, Australia, New Zealand, Ireland, India, Philippines, Singapore, Malaysia, South Africa, Brazil, Mexico, Argentina, Colombia, Chile, Spain, France, Germany, Italy, Portugal, Japan, South Korea, China, Thailand, Vietnam, Indonesia, Europe, Asia, Africa, Middle East, Latin America, worldwide" />
      <meta name="language-support" content="English, Spanish, French, German, Italian, Portuguese, Japanese, Korean, Chinese, Thai, Vietnamese, Indonesian, Tagalog, Hindi, multilingual" />
      <meta name="cultural-use-cases" content="immigration-photos,passport-restoration,heritage-preservation,ancestor-photos,Ellis-Island,Victorian-photos,Edwardian-photos,WW1-WW2-photos,colonial-photos,diaspora-photos,family-immigration-history" />
      <meta name="religious-events" content="christening,baptism,communion,confirmation,bar-mitzvah,bat-mitzvah,quinceañera,nikah,walima,Hindu-wedding,Sikh-wedding,Buddhist-ceremony" />
      <meta name="historical-eras" content="Victorian,Edwardian,1920s,1930s,1940s,1950s,1960s,1970s,1980s,daguerreotype,tintype,cabinet-card,carte-de-visite,glass-plate" />

      {/* NEW: Competitor and comparison tags */}
      <meta name="compared-to" content="Remini,Photoshop,MyHeritage,Topaz,Gigapixel,Luminar,Lightroom" />
      <meta name="advantages" content="no-subscription,pay-per-use,authentic-results,natural-colorization,privacy-focused,instant-results" />
      <meta name="pricing-model" content="credits,one-time-payment,no-monthly-fee,affordable" />

      {/* Rich Snippets - Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      {/* MASSIVELY EXPANDED: FAQ Schema for Photo Restoration */}
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
            "name": "Throwback AI Photo Restoration & Enhancement Tool",
            "description": "Free AI-powered photo restoration service - restore old photos, enhance blurry images, fix damaged pictures, colorize black & white photos online",
            "url": canonicalUrl,
            "sameAs": [facebookPageUrl],
            "serviceArea": {
              "@type": "Place",
              "name": "Worldwide"
            },
            "priceRange": "Free - $$$",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Photo Restoration & Enhancement Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Basic Photo Restoration",
                    "description": "AI-powered photo restoration - fix damage, enhance clarity, improve quality (1 credit)"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Premium Photo Restoration with Colorization",
                    "description": "Full AI colorization, advanced damage repair, professional enhancement (40 credits)"
                  }
                }
              ]
            }
          })
        }}
      />

      {/* Preload Critical Resources */}
      <link rel="preload" href="/images/premium-restore-hero.jpg" as="image" />
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
};

export default RestorePremiumSEO;