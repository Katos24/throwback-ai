// components/seo/NinetiesSEO.js - OPTIMIZED FOR NATURAL HUMAN SEARCHES
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
  // UPDATED: Natural search terms people actually use
  const defaultTitle = "90s AI Photo Generator Free | Make Me Look Like the 90s - Grunge, Hip Hop & Yearbook Style Creator";
  
  // UPDATED: Emotional, nostalgic description hitting all the feels
  const defaultDescription = "Free 90s AI photo generator - Transform into authentic 1990s style! Create grunge flannel looks, hip hop baggy jeans, frosted tips, Rachel haircuts, and vintage yearbook photos. Relive the era of Nirvana, Friends, Fresh Prince, and dial-up internet. Make yourself look totally rad with AI-powered 90s transformations. Try free - no credit card required!";
  
  // UPDATED: How people ACTUALLY search for 90s content - nostalgic, specific, emotional
  const defaultKeywords = "make me look like the 90s, turn my photo into 90s style, how to look like 90s grunge, AI 90s photo generator free, make myself look 90s, 90s yearbook photo creator, grunge aesthetic photo, create 90s style picture, transform photo to 1990s, 90s AI filter free, look like I'm from the 90s, vintage 90s photo effect, make my photo look 90s, retro 90s picture maker, nineties style generator, Friends TV show style photo, Fresh Prince aesthetic, Nirvana grunge look, 90s hip hop photo, baggy jeans aesthetic, flannel shirt photo effect, Rachel haircut generator, frosted tips creator, 90s mall photo booth, throwback 90s picture, totally rad photo maker, as if 90s aesthetic, Clueless movie style, 90s high school yearbook, alternative rock look, skater aesthetic 90s, pop punk style photo, 90s rave aesthetic, JNCO jeans photo, backwards hat look, choker necklace aesthetic, platform shoes style, scrunchie hair photo, 90s nostalgia generator, millennial childhood photos, gen x aesthetic, bring back the 90s, I miss the 90s photo, 90s themed party photo, decade day costume, spirit week 90s day, Halloween 90s costume, 90s prom photo, homecoming 90s theme, wedding 90s aesthetic, 90s birthday party, create 90s look for party, 90s fashion recreate, what would I look like in 90s, time travel to 90s photo, 90s me challenge, throwback Thursday 90s, TBT 90s style, before social media look, dial-up era photo, VHS aesthetic, AOL instant messenger era, MTV generation look, TRL era photo, Walkman generation, CD collection aesthetic, Game Boy era photo, Tamagotchi generation, Blockbuster video aesthetic";

  const title = customTitle || defaultTitle;
  const description = customDescription || defaultDescription;
  const keywords = customKeywords || defaultKeywords;
  const imageUrl = customOgImage || ogImage;
  const canonicalUrl = customCanonicalUrl || pageUrl;

  // UPDATED: Structured data with nostalgic emphasis
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
    "creator": {
      "@type": "Organization",
      "name": "Throwback AI",
      "url": siteUrl
    },
    "keywords": keywords,
    "softwareVersion": "1.0",
    "featureList": [
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
      "Perfect for themed parties and nostalgia"
    ],
    "potentialAction": {
      "@type": "UseAction",
      "target": canonicalUrl,
      "description": "Transform your photos into totally rad 90s style online"
    },
    "category": "AI Photo Generator & Vintage Style Creator",
    "genre": ["Photography", "AI Tools", "Nostalgia", "90s Culture", "Retro Style"]
  };

  // COMPREHENSIVE FAQ for 90s searches
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
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
      }
    ]
  };

  // HowTo schema for creating 90s looks
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