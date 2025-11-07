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
  // UPDATED: Natural human searches - gaming, fantasy, professional, pop culture
  const defaultTitle = "AI Avatar Generator Free | Create Fantasy, Gaming & Professional Avatars - LinkedIn Headshots, D&D Characters & More";
  
  // UPDATED: Covers all major use cases with emotional appeal
  const defaultDescription = "Create stunning AI avatars instantly! Generate professional LinkedIn headshots, D&D characters, Game of Thrones style portraits, Lord of the Rings warriors, anime characters, cyberpunk hackers, and more. 50+ styles including fantasy RPG, sci-fi gaming, historical warriors, holiday themes. Perfect for Discord, Twitch, social media, business profiles. Try free with 50 credits - no sign up required!";
  
  // UPDATED: MASSIVE natural search terms - gaming, fantasy, professional, pop culture
  const defaultKeywords = "how to make AI avatar, create avatar from photo, AI avatar generator free, make my own avatar, turn myself into avatar, professional headshot generator, LinkedIn profile picture AI, AI headshot free, business photo generator, make me look professional, D&D character creator from photo, turn me into fantasy character, Game of Thrones avatar maker, Lord of the Rings character generator, make me look like elf, dwarf avatar creator, wizard portrait generator, medieval knight avatar, samurai avatar maker, viking warrior generator, create gaming avatar, Discord profile picture generator, Twitch avatar maker, Xbox avatar from photo, PlayStation profile pic, gaming character creator, RPG character portrait, Dungeons and Dragons avatar, Pathfinder character art, World of Warcraft style avatar, Elder Scrolls character creator, Skyrim character from my face, cyberpunk avatar generator, cyberpunk 2077 character, Halo Spartan avatar, Mass Effect character creator, sci-fi avatar generator, space marine portrait, mech pilot avatar, Star Wars character generator, anime avatar from photo, turn me into anime character, make anime version of myself, Studio Ghibli style portrait, Demon Slayer avatar, Dragon Ball character creator, My Hero Academia style, attack on titan character, holiday avatar maker, Christmas avatar generator, Santa Claus photo, elf costume picture, ugly Christmas sweater avatar, Halloween costume avatar, pirate avatar generator, cosplay character creator, make me look like superhero, fantasy profile picture, cool avatar for social media, unique Discord pfp, stand out profile picture, professional business avatar, corporate headshot generator, job application photo, resume picture generator, make me look better in photos, improve my headshot, fantasy wedding photo, medieval costume portrait, renaissance fair avatar, Comic Con character photo, LARP character portrait, tabletop RPG avatar, roll20 character token, fantasy grounds portrait, virtual tabletop character art, streamer avatar, content creator profile pic, YouTube avatar generator, Instagram profile picture AI, TikTok avatar maker, Facebook profile photo generator, dating app photo AI, Tinder profile picture, Bumble photo enhancer, Hinge profile pic, make me look attractive, improve dating profile, character sheet portrait, campaign character art, game master resources, player character token";

  const title = customTitle || defaultTitle;
  const description = customDescription || defaultDescription;
  const keywords = customKeywords || defaultKeywords;
  const imageUrl = customOgImage || ogImage;
  const canonicalUrl = customCanonicalUrl || pageUrl;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // WebPage
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        "url": canonicalUrl,
        "name": title,
        "description": description,
        "inLanguage": "en-US",
        "isPartOf": {
          "@id": `${siteUrl}/#website`
        },
        "primaryImageOfPage": {
          "@id": `${imageUrl}#primaryimage`
        },
        "datePublished": "2024-01-01T00:00:00+00:00",
        "dateModified": new Date().toISOString(),
        "breadcrumb": {
          "@id": `${canonicalUrl}#breadcrumb`
        }
      },
      // WebSite
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "Throwback AI",
        "description": "AI-powered avatar and photo transformation tools for gaming, fantasy, professional, and creative use",
        "publisher": {
          "@id": `${siteUrl}/#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${siteUrl}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      // Organization
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "Throwback AI",
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/logo.png`,
          "width": 512,
          "height": 512
        },
        "sameAs": [facebookPageUrl]
      },
      // SoftwareApplication - UPDATED with comprehensive feature list
      {
        "@type": "SoftwareApplication",
        "name": "AI Avatar Generator - Fantasy, Gaming & Professional Portraits",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Web Browser",
        "description": description,
        "url": canonicalUrl,
        "offers": [
          {
            "@type": "Offer",
            "name": "Free Trial",
            "price": "0",
            "priceCurrency": "USD",
            "description": "50 free credits to try avatar generation - no credit card required"
          },
          {
            "@type": "Offer",
            "name": "Credit Package",
            "price": "4.99",
            "priceCurrency": "USD",
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
        "featureList": [
          "Professional LinkedIn headshots and business portraits",
          "D&D character creator and fantasy RPG portraits",
          "Game of Thrones and Lord of the Rings style avatars",
          "Gaming avatars for Discord, Twitch, Xbox, PlayStation",
          "Medieval fantasy warriors - knights, wizards, elves, dwarves",
          "Samurai, Viking, Spartan historical warrior portraits",
          "Cyberpunk and sci-fi character generation",
          "Space marines, mech pilots, futuristic soldiers",
          "Anime style avatars and manga characters",
          "Holiday themed avatars - Christmas, Halloween, costumes",
          "Pirate captains and swashbucklers",
          "Dark fantasy - necromancers, dark sorcerers",
          "Battle mages and elemental casters",
          "Corporate and business professional headshots",
          "Dating app profile picture enhancement",
          "Social media profile pictures for all platforms",
          "Tabletop RPG character tokens (Roll20, Fantasy Grounds)",
          "Cosplay and costume character portraits",
          "Virtual tabletop character art",
          "Streamer and content creator avatars",
          "50+ unique styles across all genres",
          "High-quality AI generation in 30-60 seconds",
          "Instant download in high resolution",
          "Free trial with 50 credits included"
        ]
      },
      // BreadcrumbList
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "AI Tools",
            "item": `${siteUrl}/replicate`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Avatar Generator",
            "item": canonicalUrl
          }
        ]
      },
      // HowTo - UPDATED with more detail
      {
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
      }
    ]
  };

  // COMPREHENSIVE FAQ targeting all use cases
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
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
      }
    ]
  };

  return (
    <Head>
      {/* Primary Meta Tags - OPTIMIZED FOR ALL CATEGORIES */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Robots & Indexing */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Language & Region */}
      <meta name="language" content="English" />
      <meta httpEquiv="content-language" content="en-US" />
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Throwback AI - Avatar Generator" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:alt" content="AI Avatar Generator - Fantasy, Gaming, Professional, Anime, and Historical character portraits created from your photo" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twitterImage} />
      <meta name="twitter:image:alt" content="Create fantasy, gaming, and professional AI avatars from your photo" />
      <meta name="twitter:site" content="@throwbackai" />
      <meta name="twitter:creator" content="@throwbackai" />
      
      {/* Additional SEO */}
      <meta name="author" content="Throwback AI" />
      <meta name="publisher" content="Throwback AI" />
      <meta name="copyright" content="© 2025 Throwback AI" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#a855f7" />
      <meta name="msapplication-TileColor" content="#a855f7" />
      <meta name="color-scheme" content="dark light" />
      
      {/* ADDED: Category-specific meta tags */}
      <meta name="avatar-categories" content="fantasy,gaming,professional,sci-fi,historical,anime,holiday,cosplay" />
      <meta name="avatar-use-cases" content="discord,twitch,linkedin,dnd,rpg,social-media,dating-apps,business,gaming-profiles" />
      <meta name="gaming-platforms" content="discord,twitch,steam,xbox,playstation,roll20,fantasy-grounds" />
      <meta name="fantasy-styles" content="game-of-thrones,lord-of-rings,dnd,pathfinder,medieval,wizard,warrior,elf" />
      <meta name="professional-use" content="linkedin,resume,business,corporate,headshot,job-application" />
      <meta name="pop-culture" content="cyberpunk,halo,mass-effect,star-wars,anime,manga,studio-ghibli" />
      
      {/* Mobile App Meta */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Avatar Generator" />
      <meta name="application-name" content="AI Avatar Generator - Throwback AI" />
      
      {/* Performance & Security */}
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <link rel="dns-prefetch" href="//throwbackai.app" />
      <link rel="dns-prefetch" href="//replicate.delivery" />
      <link rel="dns-prefetch" href="//replicate.com" />
      <link rel="preconnect" href="https://replicate.delivery" crossOrigin="anonymous" />
      
      {/* Favicon & Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Facebook Pixel / Publisher Info */}
      <meta property="fb:pages" content={facebookPageId} />
      <meta property="article:publisher" content={facebookPageUrl} />
      
      {/* Structured Data (JSON-LD) - Main Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      {/* FAQ Schema - Comprehensive Questions */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      
      {/* Additional Metadata */}
      <meta name="revisit-after" content="3 days" />
      <meta name="distribution" content="global" />
      <meta name="target" content="all" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      <meta name="rating" content="general" />
    </Head>
  );
}