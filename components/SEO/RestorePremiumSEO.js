// components/seo/RestorePremiumSEO.js - MAXIMUM SEO OPTIMIZATION
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
  
  // UPDATED: Natural human searches - question-based and conversational + INTERNATIONAL
  const defaultKeywords =
    "how to restore old photos free, fix my old photos, can AI restore damaged photos, restore grandparents photos, make old photos look new, fix blurry photo online free, how do I colorize old photos, restore faded family photos, fix scratched photo free, my photo is damaged how to fix, bring old photos back to life, make black and white photo color, restore photos from the 80s, fix torn picture, enhance grainy photos, restore old wedding photos, fix photo damage online, how to improve photo quality, restore scanned photos, make blurry picture clear, repair vintage family photos, restore ancestors photos, fix old Polaroid photos, how to sharpen old photos, restore photos for free online, what's the best photo restoration tool, enhance low quality photos, fix water damaged photos, restore photo from negative, improve old photo resolution, remove scratches from old photos, restore cracked photos, fix discolored photos, bring faded photos back to life, restore 1960s photos, 1970s photos, 1980s photos, fix wrinkled photo, enhance old digital photos, restore photo for obituary, fix photo for funeral, restore military photos, fix yellowed photos, restore newspaper clippings, enhance old Kodak photos, fix old disposable camera photos, restore photos from slide scanner, memorial photo restoration service, genealogy photo repair, ancestry photo enhancement, restore historical family photos, fix heritage photos, restore photos of deceased loved ones, fix childhood photos, restore parents wedding photos, enhance old graduation photos, restore baby photos, fix vacation photos from the past, restore holiday family photos, photo restoration UK, photo restoration Australia, photo restoration Canada, restore photos online free UK, fix old photos British, repair vintage photographs England, restore family photos Australia, enhance old photos Canada, photo restoration service London, restore pictures online free, photo repair tool free, fix damaged photographs, restore old pictures free, photo enhancement online, vintage photo restoration service, old photo repair near me, professional photo restoration online, restore sepia photos, fix antique photographs, photo colorization service, black and white photo coloring, add color to vintage photos, colorize historical photos, restore Victorian photos, Edwardian photo restoration, restore WW1 photos, WW2 photo restoration, restore 1920s photos, 1930s photos, 1940s photos, 1950s photos, fix old family portraits, restore daguerreotype, restore tintype photos, glass plate negative restoration, restore cabinet card photos, fix carte de visite, restore immigrant ancestor photos, Ellis Island photo restoration, restore passport photos old, fix ID photos vintage, restore driver license photo old, enhance yearbook photos, restore prom photos, fix graduation pictures, restore christening photos, baptism photo repair, restore first communion photos, confirmation photo restoration, restore bar mitzvah photos, bat mitzvah photo repair, quinceañera photo restoration, wedding photo restoration Indian, restore nikah photos, fix walima pictures, restore Hindu wedding photos, Sikh wedding photo repair, restore Chinese wedding photos, Japanese wedding photo restoration, restore photos Philippines, restore photos India, restore photos Mexico, fix fotos viejas, restaurar fotos antiguas, reparar fotos dañadas, colorear fotos blanco y negro, mejorar calidad de fotos, restauration de photos anciennes, réparer des photos abîmées, coloriser photos noir et blanc, alte Fotos wiederherstellen, beschädigte Fotos reparieren, Schwarz-Weiß-Fotos kolorieren, ripristinare vecchie foto, riparare foto danneggiate, colorare foto bianco e nero, restaurar fotos antigas, reparar fotos danificadas, colorir fotos preto e branco, 古い写真を復元, 写真修復, 白黒写真カラー化, 오래된 사진 복원, 사진 복구, 흑백 사진 컬러화, 修复老照片, 修复损坏照片, 黑白照片上色, restore photos Ireland, restore photos Scotland, restore photos Wales, restore photos New Zealand, restore photos South Africa, restore photos Singapore, restore photos Malaysia, restore photos Indonesia, restore photos Thailand, restore photos Vietnam, restore photos Brazil, restore photos Argentina, restore photos Colombia, restore photos Chile, restore photos Europe, restore photos Asia, restore photos Africa, restore photos Middle East, free photo restoration worldwide, international photo repair service, global photo enhancement";

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
      "fix faded photo"
        ],
    "potentialAction": {
      "@type": "UseAction",
      "target": canonicalUrl,
      "description": "Restore, enhance, fix, and colorize old photos online"
    },
    "category": "Photo Restoration & Enhancement",
    "genre": ["Photography", "AI Tools", "Photo Editing", "Image Enhancement"]
  };

  // ADDED: Comprehensive FAQ schema for restoration queries
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
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

      {/* Rich Snippets - Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      {/* ADDED: FAQ Schema for Photo Restoration */}
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