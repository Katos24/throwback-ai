// components/seo/TwothousandsSEO.js - OPTIMIZED FOR NATURAL HUMAN SEARCHES
import Head from "next/head";

const siteUrl = "https://throwbackai.app";
const pageUrl = `${siteUrl}/replicate/2000s`;
const ogImage = `${siteUrl}/images/2000sCard.jpg`;
const twitterImage = ogImage;
const facebookPageUrl = "https://www.facebook.com/profile.php?id=61578072554521";
const facebookPageId = "61578072554521";

const TwothousandsSEO = ({ 
  customTitle = null,
  customDescription = null,
  customKeywords = null,
  customOgImage = null,
  customCanonicalUrl = null
}) => {
  // UPDATED: Natural search terms with 2000s slang and MySpace energy
  const defaultTitle = "2000s AI Photo Generator Free | Make Me Look Like the 2000s - Emo, Scene, MySpace & Y2K Creator";
  
  // UPDATED: Emotional, nostalgic description hitting all the Y2K vibes
  const defaultDescription = "Free 2000s AI photo generator - Transform into authentic early 2000s style! Create emo scene kid looks, MySpace profile pics, pop punk fashion, Y2K millennium vibes, and vintage yearbook photos. Relive the era of flip phones, AIM away messages, iPods, and side-swept bangs. Make yourself look totally scene with AI-powered 2000s transformations. Try free - no credit card required!";
  
  // UPDATED: How people ACTUALLY search for 2000s content - nostalgic, specific, MySpace energy
  const defaultKeywords = "make me look like the 2000s, turn my photo into 2000s style, how to look emo 2000s, AI 2000s photo generator free, make myself look 2000s, 2000s yearbook photo creator, emo scene aesthetic photo, create 2000s style picture, transform photo to early 2000s, 2000s AI filter free, look like I'm from the 2000s, vintage 2000s photo effect, make my photo look 2000s, retro 2000s picture maker, Y2K style generator, MySpace profile picture creator, scene kid aesthetic, emo hair generator, side swept bangs photo, raccoon eyeliner look, studded belt aesthetic, skinny jeans photo, band tee style, Converse shoes look, Vans wardrobe aesthetic, Hot Topic fashion, pop punk style photo, scene queen look, emo kid aesthetic, rawr XD photo, scene hair generator, teased hair 2000s, layered hair scene, colored streaks hair, lip piercing aesthetic, gauge earrings look, wristband stacks photo, checkered pattern style, stripes and skulls aesthetic, band merch photo, My Chemical Romance style, Fall Out Boy aesthetic, Panic at the Disco look, Paramore style photo, Good Charlotte vibe, Simple Plan aesthetic, Avril Lavigne style, skater boy look, sk8er boi aesthetic, low rise jeans photo, trucker hat style, Von Dutch hat, popcorn shirt look, Juicy Couture tracksuit, Ugg boots aesthetic, butterfly clips 2000s, chunky highlights hair, frosted tips 2000s, spiky hair gel, faux hawk style, emo fringe cut, scene kid makeup, heavy eyeliner look, MySpace angle photo, bathroom mirror selfie, digital camera quality, grainy photo 2000s, Windows XP aesthetic, AIM away message vibe, MSN messenger era, LiveJournal aesthetic, Xanga blog style, iPod generation, flip phone era, Razr phone aesthetic, Sidekick phone, CD player generation, mp3 player vibes, LimeWire era, Napster generation, burnt CD aesthetic, mix CD photo, Blockbuster video 2000s, DVD collection era, PS2 generation, Xbox original aesthetic, GameCube era, Nintendo DS photo, PSP aesthetic, mall emo kid, Hot Topic shopping, Spencer's gifts vibe, Claire's accessories, 2000s themed party photo, decade day costume 2000s, spirit week early 2000s, Halloween emo costume, scene kid party, MySpace memorial photo, bring back 2000s, I miss the 2000s photo, Y2K millennium bug, turn of century aesthetic, pre-smartphone era, before Instagram look, before TikTok style, Tumblr aesthetic origin, emo revival 2020s, scene kid comeback, throwback 2000s style, TBT early 2000s";

  const title = customTitle || defaultTitle;
  const description = customDescription || defaultDescription;
  const keywords = customKeywords || defaultKeywords;
  const imageUrl = customOgImage || ogImage;
  const canonicalUrl = customCanonicalUrl || pageUrl;

  // UPDATED: Structured data with Y2K emphasis
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "2000s AI Photo Generator - Emo, Scene, MySpace & Y2K Creator",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web",
    "description": description,
    "url": canonicalUrl,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "description": "Free 2000s AI photo transformation with sign-up credits"
    },
    "creator": {
      "@type": "Organization",
      "name": "Throwback AI",
      "url": siteUrl
    },
    "keywords": keywords,
    "softwareVersion": "1.0",
    "featureList": [
      "Transform photos into authentic 2000s style with AI",
      "Emo and scene kid aesthetics with side-swept bangs",
      "MySpace profile picture recreation with angle shot",
      "Pop punk and alternative fashion styles",
      "Y2K millennium era looks and vibes",
      "Band tee and skinny jeans generation",
      "Hot Topic and mall emo fashion",
      "Side-swept bangs and teased scene hair",
      "Raccoon eyeliner and heavy makeup looks",
      "Low-rise jeans and trucker hat aesthetics",
      "Flip phone and iPod era vibes",
      "Digital camera grainy photo effects",
      "Windows XP and AIM messenger aesthetics",
      "2000s yearbook photo recreation",
      "My Chemical Romance inspired looks",
      "Fall Out Boy and Paramore aesthetics",
      "Avril Lavigne sk8er style",
      "Chunky highlights and frosted tips",
      "Studded belts and Converse shoes",
      "Free AI-powered 2000s generation",
      "High-resolution scene downloads",
      "Perfect for themed parties and nostalgia"
    ],
    "potentialAction": {
      "@type": "UseAction",
      "target": canonicalUrl,
      "description": "Transform your photos into totally scene 2000s style online"
    },
    "category": "AI Photo Generator & Vintage Style Creator",
    "genre": ["Photography", "AI Tools", "Nostalgia", "2000s Culture", "Y2K Style", "Emo Scene"]
  };

  // COMPREHENSIVE FAQ for 2000s searches
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How can I make myself look like the 2000s?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Upload your photo to our free 2000s AI generator and choose from styles like emo/scene (side-swept bangs, skinny jeans, band tees), pop punk, Y2K millennium (low-rise jeans, trucker hats), or MySpace aesthetic. Our AI instantly transforms you into authentic early 2000s style with period-accurate fashion, hairstyles like side-swept bangs and scene hair, and vintage digital camera photo effects."
        }
      },
      {
        "@type": "Question",
        "name": "What is emo scene aesthetic?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Emo scene aesthetic from the 2000s includes side-swept bangs covering one eye, teased and layered hair (often with colored streaks), heavy raccoon eyeliner, skinny jeans, band tees (My Chemical Romance, Fall Out Boy), studded belts, Converse or Vans shoes, and wristband stacks. Our AI recreates this iconic mall emo and Hot Topic fashion era with authentic scene kid vibes."
        }
      },
      {
        "@type": "Question",
        "name": "Can I create a MySpace profile picture?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our MySpace style creates the iconic profile pic aesthetic with the classic high-angle bathroom mirror selfie, digital camera grain, emo/scene styling, and that authentic 2000s social media vibe. Perfect for recreating your Top 8 glory days or reliving the pre-Facebook era of customizable profiles and HTML codes."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get scene hair or emo bangs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Our AI can add iconic 2000s hairstyles including side-swept emo bangs, teased scene hair with volume, layered cuts, colored streaks (pink, blue, blonde highlights), choppy layers, spiky gel hair, faux hawks, and that classic one-eye-covered look. Choose your style and rock that totally scene hair!"
        }
      },
      {
        "@type": "Question",
        "name": "What 2000s styles can I create?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Choose from emo/scene kid (band tees, skinny jeans, side-swept hair), pop punk (Avril Lavigne sk8er style), Y2K millennium (low-rise jeans, belly button rings, trucker hats), preppy 2000s (Juicy Couture, Ugg boots), skater style, or mall culture looks. Each captures authentic early 2000s fashion and that pre-smartphone era vibe."
        }
      },
      {
        "@type": "Question",
        "name": "Is this good for 2000s themed parties?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "So scene! Perfect for 2000s themed parties, emo nights, spirit week decade day, Halloween costumes (emo kid, scene queen, Avril Lavigne), throwback birthdays, or MySpace memorial events. Create your look before the party or use it for invitations and social media. Totally perfect for any nostalgic celebration! Rawr XD!"
        }
      },
      {
        "@type": "Question",
        "name": "What bands and pop culture inspired these styles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our 2000s styles are inspired by iconic bands and culture like My Chemical Romance, Fall Out Boy, Panic! at the Disco, Paramore, Good Charlotte, Simple Plan, Avril Lavigne (sk8er boi era), Taking Back Sunday, Dashboard Confessional, and the MySpace/AIM messenger generation. Capture the essence of Hot Topic mall culture, Warped Tour, and emo music video aesthetics."
        }
      },
      {
        "@type": "Question",
        "name": "Can I recreate the Y2K millennium look?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our Y2K millennium style captures turn-of-the-century fashion with low-rise jeans, trucker hats, Von Dutch, Juicy Couture tracksuits, belly button rings, butterfly clips, chunky highlights, popcorn shirts, and that optimistic new millennium energy. Perfect for reliving the flip phone and iPod era!"
        }
      },
      {
        "@type": "Question",
        "name": "How long does the 2000s transformation take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your 2000s transformation takes 30-60 seconds. Upload your photo, pick your style (emo, scene, pop punk, Y2K, etc.), and our AI instantly transports you back to the era of MySpace, AIM away messages, and flip phones. Download your totally scene 2000s photo immediately."
        }
      },
      {
        "@type": "Question",
        "name": "Is the 2000s AI generator free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rawr XD, yes! Get free credits when you sign up (no credit card required) to try our 2000s AI generator. Transform yourself into emo, scene, Y2K, or any early 2000s style for free. Additional credits available if you want to create multiple looks or try different decades."
        }
      },
      {
        "@type": "Question",
        "name": "What makes a photo look authentically 2000s?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Authentic 2000s photos have digital camera grain texture, specific color saturation (slightly oversaturated), period-accurate fashion (skinny jeans, band tees, low-rise jeans), iconic hairstyles (side-swept bangs, scene hair, chunky highlights), MySpace angle composition, and that pre-iPhone photo quality. Our AI captures all these elements including the bathroom mirror selfie aesthetic to make your photo genuinely look like it's from 2000-2009."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this for social media throwbacks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "So scene! Perfect for Throwback Thursday (#TBT), Instagram nostalgia posts, Facebook memories, and TikTok emo revival trends. Create authentic-looking 2000s photos that'll make your followers think you found old MySpace pics. Great for millennial and Gen Z content creators reliving the glory days of AIM, flip phones, and scene hair. Rawr means I love you in dinosaur!"
        }
      }
    ]
  };

  // HowTo schema for creating 2000s looks
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Transform Your Photo into 2000s Style",
    "description": "Create authentic early 2000s emo, scene, MySpace, or Y2K style photos with AI",
    "totalTime": "PT2M",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Upload Your Photo",
        "text": "Upload a clear photo of yourself. Modern selfies work great! The AI will transform it into authentic 2000s style with scene vibes and Y2K energy.",
        "image": `${siteUrl}/images/howto/upload-2000s.jpg`
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Choose Your 2000s Style",
        "text": "Pick from emo/scene kid (side-swept bangs, band tees), pop punk (Avril Lavigne style), Y2K millennium (low-rise jeans, trucker hats), preppy 2000s (Juicy Couture), or MySpace aesthetic. Each captures a different vibe of the totally scene decade.",
        "image": `${siteUrl}/images/howto/choose-2000s-style.jpg`
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "AI Generates Your 2000s Look",
        "text": "Our AI transforms your photo with authentic 2000s fashion, hairstyles (side-swept bangs, scene hair, chunky highlights), digital camera grain, MySpace angle composition, and that iconic mall emo or Y2K aesthetic. Takes 30-60 seconds.",
        "image": `${siteUrl}/images/howto/ai-processing-2000s.jpg`
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Download & Share",
        "text": "Download your totally scene 2000s transformation in high resolution. Perfect for social media throwbacks, emo nights, themed parties, or just reliving the best era of MySpace, AIM, and flip phones! Rawr XD!",
        "image": `${siteUrl}/images/howto/download-2000s.jpg`
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
      <meta property="og:title:alt" content="Make Me Look Like the 2000s - Free Emo & Scene AI Generator" />
      <meta name="twitter:title:alt" content="2000s Style Photo Creator - Totally Scene AI Transformation" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Throwback AI - 2000s Photo Generator" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Transform into authentic 2000s style - emo scene hair, MySpace pics, side-swept bangs, skinny jeans, band tees, Y2K fashion with AI generator" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@throwbackai" />
      <meta name="twitter:creator" content="@throwbackai" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twitterImage} />
      <meta name="twitter:image:alt" content="Create totally scene 2000s photos with AI - emo, MySpace, Y2K, pop punk transformations" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#00CED1" />
      <meta name="msapplication-TileColor" content="#00CED1" />
      <meta name="application-name" content="2000s AI Generator - Throwback AI" />
      <meta name="apple-mobile-web-app-title" content="2000s Photo Generator" />
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

      {/* ADDED: 2000s culture-specific meta tags */}
      <meta name="decade" content="2000s,early-2000s,y2k,millennium" />
      <meta name="era" content="emo-era,scene-kid-era,myspace-generation,y2k-millennium,pre-smartphone" />
      <meta name="style-categories" content="emo,scene,pop-punk,y2k,mall-emo,hot-topic,alternative,skater" />
      <meta name="fashion-trends" content="side-swept-bangs,skinny-jeans,band-tees,studded-belts,low-rise-jeans,trucker-hats,converse,vans,juicy-couture,ugg-boots,butterfly-clips,chunky-highlights" />
      <meta name="music-references" content="my-chemical-romance,fall-out-boy,panic-at-the-disco,paramore,good-charlotte,simple-plan,avril-lavigne,taking-back-sunday,dashboard-confessional,warped-tour" />
      <meta name="hairstyles" content="side-swept-bangs,emo-fringe,scene-hair,teased-hair,colored-streaks,layered-hair,choppy-layers,faux-hawk,spiky-gel-hair,one-eye-covered" />
      <meta name="makeup-style" content="raccoon-eyeliner,heavy-eyeliner,black-eyeliner,scene-makeup,emo-makeup" />
      <meta name="accessories" content="studded-belt,wristbands,gauge-earrings,lip-piercing,checkered-pattern,band-merch" />
      <meta name="target-audience" content="millennials,gen-z,emo-revival,scene-kids,nostalgia,myspace-generation,warped-tour-kids" />
      <meta name="use-cases" content="themed-parties,emo-nights,spirit-week,halloween,throwback-thursday,social-media,yearbook-recreation,myspace-memorial" />
      <meta name="tech-nostalgia" content="myspace,aim,msn-messenger,livejournal,xanga,limewire,napster,ipod,flip-phone,razr,sidekick,digital-camera,windows-xp,cd-burning,mp3-player" />
      <meta name="social-platforms" content="myspace,friendster,livejournal,aim-away-messages,msn-messenger,xanga,top-8" />
      <meta name="cultural-keywords" content="rawr-xd,totally-scene,emo-kid,scene-queen,mall-emo,hot-topic,pre-instagram,before-smartphones,flip-phone-era" />
      <meta name="gaming-era" content="ps2,xbox-original,gamecube,nintendo-ds,psp,world-of-warcraft,halo-2" />

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
            "name": "Throwback AI - 2000s Photo Generator",
            "description": "Free AI-powered 2000s photo transformation service - create emo, scene, MySpace, Y2K, and authentic early 2000s style photos online",
            "url": canonicalUrl,
            "sameAs": [facebookPageUrl],
            "serviceArea": {
              "@type": "Place",
              "name": "Worldwide"
            },
            "priceRange": "Free",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "2000s Photo Transformation Styles",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Emo Scene Kid Transformation",
                    "description": "Transform into authentic emo/scene aesthetic with side-swept bangs, band tees, and mall emo vibes"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "MySpace Profile Picture Style",
                    "description": "Create iconic MySpace profile pics with high-angle shots, digital camera grain, and scene styling"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Y2K Millennium Look",
                    "description": "Generate Y2K turn-of-century style with low-rise jeans, trucker hats, and millennium fashion"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Pop Punk Style",
                    "description": "Create pop punk and skater aesthetics inspired by Avril Lavigne, Warped Tour, and alternative fashion"
                  }
                }
              ]
            }
          })
        }}
      />

      {/* Preload Critical Resources */}
      <link rel="preload" href="/fonts/y2k-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

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

export default TwothousandsSEO;