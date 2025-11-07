// components/seo/EightiesSEO.js - OPTIMIZED FOR NATURAL HUMAN SEARCHES
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
  // UPDATED: Natural search terms with 80s slang and pop culture
  const defaultTitle = "80s AI Photo Generator Free | Make Me Look Like the 80s - Neon, Synthwave, Miami Vice & Big Hair Creator";
  
  // UPDATED: Emotional, nostalgic description hitting all the 80s vibes
  const defaultDescription = "Free 80s AI photo generator - Transform into authentic 1980s style! Create neon synthwave looks, Miami Vice aesthetics, big hair, mullets, power suits, and vintage yearbook photos. Relive the era of MTV, arcade games, Breakfast Club, and totally radical fashion. Make yourself look gnarly with AI-powered 80s transformations. Try free - no credit card required!";
  
  // UPDATED: How people ACTUALLY search for 80s content - nostalgic, specific, pop culture heavy
  const defaultKeywords = "make me look like the 80s, turn my photo into 80s style, how to look like 80s neon, AI 80s photo generator free, make myself look 80s, 80s yearbook photo creator, synthwave aesthetic photo, create 80s style picture, transform photo to 1980s, 80s AI filter free, look like I'm from the 80s, vintage 80s photo effect, make my photo look 80s, retro 80s picture maker, eighties style generator, Miami Vice style photo, neon 80s aesthetic, Breakfast Club look, Back to the Future style, Stranger Things 80s aesthetic, synthwave photo creator, vaporwave aesthetic, give me big 80s hair, mullet generator, 80s power suit photo, Valley Girl aesthetic, Madonna 80s look, Michael Jackson style photo, Prince purple rain aesthetic, 80s rock hair band look, hair metal style, new wave fashion photo, arcade aesthetic 80s, Pac-Man era photo, Rubik's cube generation, Walkman aesthetic, boom box photo, leg warmers style, shoulder pads fashion, neon windbreaker look, tracksuits 80s style, jazzercise aesthetic, aerobics outfit photo, Member's Only jacket, parachute pants look, Trapper Keeper aesthetic, mall culture 80s, roller skating aesthetic, DeLorean car photo, cassette tape aesthetic, VHS tracking lines, wood paneling background, geometric shapes 80s, chrome aesthetic, pastel colors photo, neon pink and blue, retro futuristic look, totally tubular photo, radical 80s transformation, gnarly photo maker, bodacious style creator, like totally 80s, gag me with a spoon aesthetic, 80s themed party photo, decade day costume 80s, spirit week eighties, Halloween 80s costume, 80s prom photo, homecoming 80s theme, 80s wedding aesthetic, 80s birthday party, create 80s look for party, what would I look like in 80s, time travel to 80s photo, 80s me challenge, throwback Thursday 80s, TBT 80s style, MTV generation look, arcade generation photo, before cell phones look, Reagan era photo, Cold War aesthetic, Berlin Wall era";

  const title = customTitle || defaultTitle;
  const description = customDescription || defaultDescription;
  const keywords = customKeywords || defaultKeywords;
  const imageUrl = customOgImage || ogImage;
  const canonicalUrl = customCanonicalUrl || pageUrl;

  // UPDATED: Structured data with nostalgic emphasis
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
    "creator": {
      "@type": "Organization",
      "name": "Throwback AI",
      "url": siteUrl
    },
    "keywords": keywords,
    "softwareVersion": "1.0",
    "featureList": [
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
      "Perfect for themed parties and nostalgia"
    ],
    "potentialAction": {
      "@type": "UseAction",
      "target": canonicalUrl,
      "description": "Transform your photos into totally tubular 80s style online"
    },
    "category": "AI Photo Generator & Vintage Style Creator",
    "genre": ["Photography", "AI Tools", "Nostalgia", "80s Culture", "Retro Style", "Synthwave"]
  };

  // COMPREHENSIVE FAQ for 80s searches
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
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
      }
    ]
  };

  // HowTo schema for creating 80s looks
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