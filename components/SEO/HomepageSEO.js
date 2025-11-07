// components/seo/HomepageUltraMaxSEO.js - OPTIMIZED FOR NATURAL HUMAN SEARCHES
import Head from "next/head";

const siteUrl = "https://throwbackai.app";
const canonicalUrl = siteUrl;
const defaultOgImage = `${siteUrl}/images/restore-preview.webp`;
const facebookPageUrl = "https://www.facebook.com/profile.php?id=61578072554521";
const facebookPageId = "61578072554521";

const HomepageUltraMaxSEO = ({
  customTitle = null,
  customDescription = null,
  customKeywords = null,
  customOgImage = null,
  customCanonicalUrl = null
}) => {

  // UPDATED: Natural, comprehensive title covering all features
  const title = customTitle || "Free AI Photo Restoration & Vintage Style Creator | Fix Old Photos, Create 70s-2000s Looks & Fantasy Gaming Avatars";
  
  // UPDATED: Emotional, benefit-focused description
  const description = customDescription || (
    "Transform your photos with AI! Restore damaged family photos for free, fix scratches and tears, colorize black & white pictures. " +
    "Make yourself look like the 70s, 80s, 90s, or 2000s with authentic disco, neon, grunge, and emo styles. " +
    "Create epic D&D characters, Game of Thrones warriors, cyberpunk hackers, and professional LinkedIn headshots. " +
    "Perfect for genealogy, social media throwbacks, gaming profiles, and themed parties. Try free with 50 credits!"
  );

  // UPDATED: MASSIVE natural search keywords - how people actually search
  const keywords = customKeywords || [
    // Photo Restoration - Natural Searches
    "how to restore old photos free", "fix my damaged photos", "restore grandparents photos", "repair torn family pictures",
    "fix scratched photo online", "restore faded wedding photos", "make old photos look new", "bring old photos back to life",
    "fix blurry photo free", "enhance old family photos", "restore photos for obituary", "fix photo for funeral",
    "colorize black and white photos", "make black and white photo color", "add color to old photos",
    "restore photos of deceased loved ones", "fix water damaged photos", "remove scratches from old photos",
    
    // Decades - Natural Searches
    "make me look like the 70s", "turn my photo into 70s style", "disco photo generator", "hippie aesthetic photo",
    "Studio 54 style photo", "bell bottoms photo", "afro hair generator", "farrah fawcett hair",
    "make me look like the 80s", "turn my photo into 80s style", "neon 80s aesthetic", "Miami Vice style photo",
    "synthwave photo creator", "big 80s hair", "mullet generator", "Stranger Things 80s aesthetic",
    "make me look like the 90s", "turn my photo into 90s style", "grunge aesthetic photo", "Friends TV show style",
    "Fresh Prince aesthetic", "Rachel haircut generator", "frosted tips creator", "90s yearbook photo",
    "make me look like the 2000s", "turn my photo into 2000s style", "emo scene aesthetic", "MySpace profile picture",
    "side swept bangs photo", "Y2K style generator", "scene hair generator", "pop punk aesthetic",
    
    // Gaming & Fantasy Avatars - Natural Searches
    "create D&D character from photo", "turn myself into fantasy character", "make me look like elf",
    "Game of Thrones avatar maker", "Lord of the Rings character generator", "medieval knight avatar",
    "make gaming avatar", "Discord profile picture generator", "Twitch avatar maker",
    "create professional LinkedIn headshot", "AI headshot free", "make me look professional",
    "cyberpunk avatar generator", "Halo Spartan avatar", "sci-fi character creator",
    "samurai avatar maker", "viking warrior generator", "wizard portrait generator",
    "create avatar for Xbox", "PlayStation profile pic", "gaming character creator",
    
    // Use Cases - Natural Searches
    "what's the best photo restoration tool", "how do I fix old family photos", "restore photos for family reunion",
    "create 80s costume photo", "make 90s themed party picture", "Halloween costume photo generator",
    "spirit week decade day photo", "throwback Thursday photo creator", "vintage photo for social media",
    "improve dating profile photo", "Tinder profile picture AI", "enhance profile photo",
    
    // Technical & Long-tail
    "AI photo restoration online free", "best free photo enhancer", "photo repair tool online",
    "vintage photo filter", "retro photo maker", "decades photo generator", "yearbook photo creator",
    "fantasy character portrait generator", "RPG character art creator", "tabletop gaming avatar",
    "professional headshot generator", "business photo AI", "avatar creator for gamers"
  ].join(", ");

  const imageUrl = customOgImage || defaultOgImage;
  const canonical = customCanonicalUrl || canonicalUrl;

  // COMPREHENSIVE structured data with natural language
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${canonical}#website`,
        "url": canonical,
        "name": "Throwback AI",
        "description": "AI-powered photo restoration, vintage decade transformations, and fantasy gaming avatar generator",
        "publisher": {
          "@type": "Organization",
          "name": "Throwback AI",
          "url": canonical,
          "sameAs": [facebookPageUrl]
        }
      },
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        "url": canonical,
        "name": title,
        "isPartOf": { "@id": `${canonical}#website` },
        "description": description
      },
      {
        "@type": "WebApplication",
        "name": "Throwback AI - Photo Restoration, Vintage Transformations & Avatar Generator",
        "url": canonical,
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Web",
        "description": description,
        "creator": { "@type": "Organization", "name": "Throwback AI", "url": canonical },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "description": "Free trial with 50 credits - restore photos, create vintage looks, generate avatars"
        },
        "featureList": [
          "Restore old damaged photos - fix scratches, tears, fading, water damage",
          "Colorize black and white photos with authentic period colors",
          "Transform photos into 70s disco, hippie, and funk styles",
          "Create 80s neon, synthwave, and Miami Vice looks",
          "Generate 90s grunge, hip hop, and Friends-era aesthetics",
          "Make 2000s emo, scene, MySpace, and Y2K transformations",
          "Create D&D fantasy characters and RPG avatars",
          "Generate Game of Thrones inspired medieval warriors",
          "Make professional LinkedIn headshots and business photos",
          "Create gaming avatars for Discord, Twitch, Xbox, PlayStation",
          "Generate cyberpunk, sci-fi, and futuristic characters",
          "Make historical warrior avatars - samurai, vikings, knights",
          "Free trial with 50 credits included",
          "Fast processing (30-60 seconds)",
          "High-resolution downloads",
          "Secure and private - photos deleted after processing"
        ]
      },
      {
        "@type": "Service",
        "name": "AI Photo Restoration, Vintage Transformations & Avatar Generation",
        "provider": { "@type": "Organization", "name": "Throwback AI", "url": canonical },
        "description": "Complete AI-powered photo transformation service for restoration, vintage styles, and character creation",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Throwback AI Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Photo Restoration & Repair",
                "description": "Fix damaged, torn, scratched, faded family photos. Remove water damage, restore clarity, enhance quality. Basic (1 credit) or Premium with colorization (40 credits)."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "70s Style Transformations",
                "description": "Transform into authentic 1970s looks: disco fever, hippie flower power, funk & soul, Studio 54 vibes, bell bottoms, afros, and groovy aesthetics."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "80s Style Transformations",
                "description": "Create 1980s neon synthwave, Miami Vice, new wave, big hair, mullets, and totally tubular looks inspired by Stranger Things and classic 80s culture."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "90s Style Transformations",
                "description": "Generate 1990s grunge, hip hop, alternative rock, Friends-era fashion, Fresh Prince style, frosted tips, and totally rad 90s yearbook photos."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "2000s/Y2K Style Transformations",
                "description": "Create early 2000s emo scene, MySpace profile pics, Y2K millennium fashion, pop punk looks, side-swept bangs, and digital camera aesthetics."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "D&D & Fantasy Avatars",
                "description": "Generate Dungeons & Dragons characters, wizards, warriors, elves, dwarves, and epic fantasy RPG portraits for tabletop gaming and Roll20."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Gaming Avatars",
                "description": "Create Game of Thrones inspired warriors, Lord of the Rings characters, Halo Spartans, cyberpunk hackers, and sci-fi soldiers for Discord, Twitch, Xbox, PlayStation."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Professional Headshots",
                "description": "Generate LinkedIn professional photos, business headshots, corporate portraits, and polished profile pictures for careers and dating apps."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Historical Warriors",
                "description": "Create samurai, viking, medieval knight, spartan, pirate captain, and ninja assassin avatars for gaming and cosplay."
              }
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How can I restore my old family photos for free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sign up for Throwback AI and get 50 free credits. Upload your damaged, faded, or scratched photo and choose Basic Restoration (1 credit). Our AI automatically fixes scratches, tears, fading, and damage in 30-60 seconds. Download your restored photo in high resolution."
            }
          },
          {
            "@type": "Question",
            "name": "Can I make my photo look like the 80s or 90s?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Choose from 70s (disco, hippie), 80s (neon, Miami Vice, synthwave), 90s (grunge, hip hop, Friends-era), or 2000s (emo, MySpace, Y2K) styles. Upload your photo, select your decade and specific style, and our AI transforms it with authentic fashion, hairstyles, and photo effects from that era."
            }
          },
          {
            "@type": "Question",
            "name": "Can I create a D&D character or gaming avatar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely! Upload your photo and choose from 50+ styles including D&D fantasy characters (wizards, warriors, elves), Game of Thrones inspired warriors, cyberpunk hackers, Halo-style soldiers, samurai, vikings, and more. Perfect for Discord, Twitch, tabletop RPG games like Roll20, and gaming profiles."
            }
          },
          {
            "@type": "Question",
            "name": "How much does it cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Get 50 free credits when you sign up (no credit card required). Basic photo restoration costs 1 credit, premium colorization costs 40 credits, and avatars cost 50 credits. Credit packages start at $4.99 for 400 credits."
            }
          },
          {
            "@type": "Question",
            "name": "Can AI really fix badly damaged photos?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Our AI can repair scratches, tears, water damage, fading, yellowing, cracks, wrinkles, and missing pieces. It works on old wedding photos, family portraits, military photos, and historical images. For severe damage, use Premium Restoration (40 credits) for advanced repair and colorization."
            }
          },
          {
            "@type": "Question",
            "name": "Is this good for themed parties and Halloween?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Perfect for it! Create authentic 70s, 80s, 90s, or 2000s looks for themed parties, spirit week decade day, Halloween costumes, throwback birthdays, and social media. Also great for cosplay with fantasy warrior and gaming character avatars."
            }
          },
          {
            "@type": "Question",
            "name": "Can I create a professional LinkedIn headshot?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Our Professional Headshot and LinkedIn Professional styles create high-quality business photos with clean backgrounds and professional attire. Perfect for LinkedIn, resumes, company websites, and dating apps like Tinder, Bumble, and Hinge."
            }
          },
          {
            "@type": "Question",
            "name": "How long does processing take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Basic restoration takes 30-60 seconds. Premium colorization takes 60-90 seconds. Vintage decade transformations take 30-60 seconds. Avatar generation takes 30-60 seconds. All with real-time progress updates."
            }
          },
          {
            "@type": "Question",
            "name": "Are my photos private and secure?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Your photos are processed on secure servers and automatically deleted after a short retention period. We never publish, share, or sell your images. Your privacy is our priority."
            }
          },
          {
            "@type": "Question",
            "name": "What can I use these photos for?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use restored photos for: family reunions, genealogy, memorials, obituaries, printing, framing. Use vintage transformations for: social media throwbacks, themed parties, Halloween, spirit week. Use avatars for: Discord, Twitch, gaming profiles, D&D campaigns, LinkedIn, dating apps, cosplay."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": `${canonical}#howto`,
        "name": "How to Use Throwback AI for Photo Restoration, Vintage Styles & Avatars",
        "description": "Complete guide for restoring photos, creating retro looks, and generating gaming avatars",
        "totalTime": "PT2M",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Sign Up & Get Free Credits",
            "text": "Create your free Throwback AI account and receive 50 free credits instantly. No credit card required."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Upload Your Photo",
            "text": "Upload the photo you want to restore, transform, or turn into an avatar. Supports JPG, PNG, HEIC formats up to 10MB."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Choose Your Transformation",
            "text": "Select Photo Restoration (fix damage, colorize), Vintage Decades (70s, 80s, 90s, 2000s styles), or Avatar Generator (D&D, gaming, professional). Pick your specific style."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "AI Processes Your Photo",
            "text": "Watch real-time progress as our AI transforms your photo. Takes 30-90 seconds depending on the service."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Download & Share",
            "text": "Download your restored, transformed, or avatar image in high resolution. Use for printing, social media, gaming profiles, or keep as a digital memory!"
          }
        ]
      },
      {
        "@type": "LocalBusiness",
        "name": "Throwback AI - Photo Restoration & Avatar Generator",
        "description": "AI-powered photo restoration, vintage decade transformations, and fantasy gaming avatar creation service",
        "url": canonical,
        "sameAs": [facebookPageUrl],
        "serviceArea": { "@type": "Place", "name": "Worldwide" },
        "priceRange": "Free - $$$",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Throwback AI Complete Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Photo Restoration (1 credit)" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Premium Colorization (40 credits)" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Vintage Decade Transformations" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Avatar Generation (50 credits)" } }
          ]
        }
      }
    ]
  };

  return (
    <Head>
      {/* Primary SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <link rel="canonical" href={canonical} />

      {/* Language & Region */}
      <meta name="language" content="English" />
      <meta httpEquiv="content-language" content="en-US" />
      <link rel="alternate" hrefLang="en" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Throwback AI" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Restore old photos, create vintage 70s-2000s styles, and generate fantasy gaming avatars with AI" />
      <meta property="og:locale" content="en_US" />
      <meta property="fb:pages" content={facebookPageId} />
      <meta property="article:publisher" content={facebookPageUrl} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@throwbackai" />
      <meta name="twitter:creator" content="@throwbackai" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content="AI photo restoration, vintage decade transformations, and gaming avatar generator" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#a855f7" />
      <meta name="msapplication-TileColor" content="#a855f7" />
      <meta name="application-name" content="Throwback AI - Photo Restoration & Avatar Generator" />
      <meta name="apple-mobile-web-app-title" content="Throwback AI" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="author" content="Throwback AI" />
      <meta name="publisher" content="Throwback AI" />
      <meta name="copyright" content="© 2025 Throwback AI" />

      {/* Content Classification */}
      <meta name="rating" content="general" />
      <meta name="content-type" content="text/html; charset=UTF-8" />

      {/* ADDED: Service-specific meta tags */}
      <meta name="service-categories" content="photo-restoration,vintage-transformations,avatar-generation,ai-photo-editing" />
      <meta name="restoration-features" content="fix-damage,colorization,enhancement,scratch-removal,tear-repair,water-damage,fading" />
      <meta name="decades-available" content="1970s,1980s,1990s,2000s,disco,neon,grunge,emo,y2k" />
      <meta name="avatar-categories" content="fantasy,gaming,professional,dnd,medieval,sci-fi,cyberpunk,historical" />
      <meta name="use-cases" content="family-photos,genealogy,social-media,gaming-profiles,themed-parties,cosplay,linkedin,dating-apps" />
      <meta name="target-audience" content="families,genealogists,gamers,millennials,gen-x,gen-z,professionals,content-creators" />

      {/* Structured Data */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} 
      />

      {/* Preload Critical Resources */}
      <link rel="preload" href={`${siteUrl}/images/restore-preview.webp`} as="image" />
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

      {/* Additional SEO Tags */}
      <meta name="revisit-after" content="3 days" />
      <meta name="distribution" content="global" />
      <meta name="target" content="all" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
    </Head>
  );
};

export default HomepageUltraMaxSEO;