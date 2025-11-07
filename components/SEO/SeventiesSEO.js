// components/seo/SeventiesSEO.js - OPTIMIZED FOR NATURAL HUMAN SEARCHES
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
  // UPDATED: Natural search terms with 70s slang and culture
  const defaultTitle = "70s AI Photo Generator Free | Make Me Look Like the 70s - Disco, Hippie, Bell Bottoms & Afro Creator";
  
  // UPDATED: Emotional, nostalgic description hitting all the 70s vibes
  const defaultDescription = "Free 70s AI photo generator - Transform into authentic 1970s style! Create disco fever looks, hippie peace & love, funk & soul fashion, bell bottoms, afros, and vintage yearbook photos. Relive the era of Studio 54, Saturday Night Fever, peace signs, and groovy vibes. Make yourself look far out with AI-powered 70s transformations. Try free - no credit card required!";
  
  // UPDATED: How people ACTUALLY search for 70s content - nostalgic, groovy, specific
  const defaultKeywords = "make me look like the 70s, turn my photo into 70s style, how to look like 70s disco, AI 70s photo generator free, make myself look 70s, 70s yearbook photo creator, disco aesthetic photo, create 70s style picture, transform photo to 1970s, 70s AI filter free, look like I'm from the 70s, vintage 70s photo effect, make my photo look 70s, retro 70s picture maker, seventies style generator, Studio 54 style photo, disco fever aesthetic, Saturday Night Fever look, hippie aesthetic photo, peace and love style, flower power generator, bell bottoms photo, afro hair generator, 70s funk style, soul train aesthetic, platform shoes look, leisure suit photo, farrah fawcett hair, shag haircut generator, feathered hair 70s, sideburns generator, mutton chops look, tinted glasses 70s, aviator sunglasses style, wood paneling background, shag carpet aesthetic, lava lamp vibes, peace sign photo, disco ball background, roller disco style, roller skating 70s, van life hippie, VW bus aesthetic, tie dye shirt photo, fringe vest look, headband hippie style, love beads aesthetic, puka shell necklace, mood ring photo, pet rock era, smiley face 70s, have a nice day aesthetic, earth tones photo, harvest gold color, avocado green style, burnt orange aesthetic, brown and orange 70s, groovy photo maker, far out transformation, right on style creator, outta sight photo, can you dig it aesthetic, solid style generator, dyno-mite look, keep on truckin photo, 70s themed party photo, decade day costume 70s, spirit week seventies, Halloween 70s costume, disco party photo, Studio 54 party, Saturday night fever costume, hippie costume photo, woodstock aesthetic, flower child look, bohemian 70s style, boho hippie photo, peace love happiness, free spirit aesthetic, dashiki style photo, peasant blouse look, maxi dress 70s, hot pants style, tube top photo, vest over nothing look, polyester suit aesthetic, wide collar shirt, butterfly collar, medallion necklace style, chest hair 70s look, gold chains photo, platform boots style, clogs aesthetic, earth shoes look, Pong game era, rotary phone aesthetic, 8-track player, record player vibes, vinyl collection 70s, AM radio generation, TV antenna era, console TV aesthetic, Brady Bunch style, Partridge Family look, Starsky and Hutch aesthetic, Charlie's Angels style, Bionic Woman look, Welcome Back Kotter vibes, Happy Days 70s, Laverne and Shirley style, ABBA costume photo, Bee Gees style, Donna Summer disco, Elton John glasses, David Bowie glam, Cher 70s look, Elvis jumpsuit style, John Travolta pose, Farrah poster recreation";

  const title = customTitle || defaultTitle;
  const description = customDescription || defaultDescription;
  const keywords = customKeywords || defaultKeywords;
  const imageUrl = customOgImage || ogImage;
  const canonicalUrl = customCanonicalUrl || pageUrl;

  // UPDATED: Structured data with groovy emphasis
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
    "creator": {
      "@type": "Organization",
      "name": "Throwback AI",
      "url": siteUrl
    },
    "keywords": keywords,
    "softwareVersion": "1.0",
    "featureList": [
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
      "Perfect for themed parties and nostalgia"
    ],
    "potentialAction": {
      "@type": "UseAction",
      "target": canonicalUrl,
      "description": "Transform your photos into far out 70s style online"
    },
    "category": "AI Photo Generator & Vintage Style Creator",
    "genre": ["Photography", "AI Tools", "Nostalgia", "70s Culture", "Retro Style", "Disco"]
  };

  // COMPREHENSIVE FAQ for 70s searches
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
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
      }
    ]
  };

  // HowTo schema for creating 70s looks
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