// components/seo/HomepageUltraMaxSEO.js
import Head from "next/head";

const siteUrl = "https://throwbackai.app";
const canonicalUrl = siteUrl;
const defaultOgImage = `${siteUrl}/images/restore-preview.png`;
const facebookPageUrl = "https://www.facebook.com/profile.php?id=61578072554521";
const facebookPageId = "61578072554521";

const HomepageUltraMaxSEO = ({
  customTitle = null,
  customDescription = null,
  customKeywords = null,
  customOgImage = null,
  customCanonicalUrl = null
}) => {

  // Title & descriptions (packed, long-tail heavy)
  const title = customTitle || "AI Photo Restoration, Retro Decades, Colorization & Game/Fantasy Avatars | Throwback AI - Restore, Transform & Create";
  const description = customDescription || (
    "Throwback AI: industry-leading AI photo restoration, colorization, decade-specific retro transformations and avatar generation. " +
    "Restore old family and wedding photos, repair scratches, tears, stains, and faded colors. Colorize black & white images with period-accurate palettes. " +
    "Create authentic 70s, 80s, 90s and 2000s styles (think disco, neon, grunge, Y2K), generate Dungeons & Dragons, Game of Thrones-inspired, Halo-like, Cyberpunk, steampunk, and other gaming/fantasy avatars. " +
    "Fast, secure, high-resolution results for genealogy, memorials, historical archives, creative projects, cosplay, and social media."
  );

  // Ultra long-tail keywords covering everything the user asked for
  const keywords = customKeywords || [
    // core restoration
    "restore old photos", "restore damaged photos", "repair torn photos", "fix scratched photos", "remove water stains from photos",
    "restore faded photos", "fix faded pictures", "restore scanned photos", "photo restoration online", "AI photo restoration",
    "colorize black and white photos", "photo colorization", "colorize old photos online",
    "enhance blurry photos", "denoise photos", "sharpen photos", "upscale photos", "increase photo resolution",
    // damage types
    "remove creases from photos", "fix creased photos", "remove dust from scanned photos", "remove fold lines", "repair torn edges",
    "repair split photos", "fix sepia tone", "remove yellowing from old photos", "water damage photo repair",
    // use cases
    "family photo restoration", "wedding photo restoration", "historical photo restoration", "genealogy photo restoration",
    "memorial photo restoration", "old picture restoration", "antique photo restoration",
    // decades & substyles
    "70s photo style", "1970s disco photo", "70s hippie photo", "70s funk photo",
    "80s photo style", "1980s neon photo", "80s new wave photo", "80s rock photo", "Saved By The Bell photo style",
    "90s photo style", "1990s grunge photo", "90s yearbook photo", "Buffy the Vampire Slayer photo style", "Dazed and Confused photo vibe",
    "2000s photo style", "Y2K photo edit", "early 2000s emo photo", "Back to the Future inspired photo",
    // pop culture references (presented as inspiration - not affiliated)
    "Saved by the Bell style photo", "Buffy inspired portrait", "Back to the Future retro look", "Dazed and Confused nostalgic photo",
    // avatars - fantasy & gaming
    "Dungeons & Dragons avatars", "D&D avatar generator", "fantasy avatar creator", "wizard avatar", "rogue avatar", "paladin avatar",
    "cleric avatar", "elf avatar", "orc avatar", "dragon avatar", "Game of Thrones style avatar", "GoT inspired portrait",
    "Halo avatar generator", "Spartan avatar", "ODST avatar", "sci-fi soldier avatar",
    "Cyberpunk avatar", "neon samurai avatar", "hacker avatar", "cyborg avatar", "streetpunk avatar",
    "steampunk avatar", "mech pilot avatar", "retro gaming avatar", "video game style avatar", "avatar for Twitch, Discord, Twitter",
    // technical & transactional
    "1 credit photo restore", "premium colorization 40 credits", "AI restoration free credits", "buy credits photo restore",
    "fast AI photo processing", "high resolution output", "secure photo processing", "photos deleted after processing",
    // extra long-tail queries
    "how to restore old photos online", "best online photo restoration", "colorize old family photos historically accurate",
    "how to make photo look 90s", "how to make photo look 80s", "how to make photo look 70s", "how to make photo look Y2K",
    "create D&D character portrait from photo", "make a Game of Thrones style avatar from photo", "create Halo style game avatar",
    "make cyberpunk portrait from photo", "best AI avatar generator for fantasy characters"
  ].join(", ");

  const imageUrl = customOgImage || defaultOgImage;
  const canonical = customCanonicalUrl || canonicalUrl;

  // Build very large structuredData graph with decades, avatar types, offers, FAQ, HowTo, LocalBusiness
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${canonical}#website`,
        "url": canonical,
        "name": "Throwback AI",
        "description": description,
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
      // WebApplication entry
      {
        "@type": "WebApplication",
        "name": "Throwback AI - Photo Restoration, Colorization & Avatar Generator",
        "url": canonical,
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Web",
        "description": description,
        "creator": { "@type": "Organization", "name": "Throwback AI", "url": canonical },
        "featureList": [
          "Restore scratches, tears, water damage, creases, and dust",
          "Colorize black & white photos with period-accurate palettes",
          "Transform photos into 70s, 80s, 90s, and 2000s styles",
          "Generate fantasy and game-inspired avatars (D&D, Game of Thrones, Halo, Cyberpunk, Steampunk)",
          "Upscale, denoise, sharpen, and improve resolution",
          "Fast processing and secure deletion of user uploads"
        ]
      },
      // Services and OfferCatalog - extremely detailed
      {
        "@type": "Service",
        "name": "AI Photo Restoration & Retro/Avatar Transformations",
        "provider": { "@type": "Organization", "name": "Throwback AI", "url": canonical },
        "description": "Comprehensive AI-powered photo restoration, colorization, retro transformations, and avatar generation services.",
        "hasOfferCatalog": {
          "@type": "OfferingCatalog",
          "name": "Throwback AI Offerings",
          "itemListElement": [
            // Restoration Offers
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Basic Photo Restoration",
                "description": "Quick repair of scratches, minor tears, fading and contrast issues. 1 credit."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Premium Photo Restoration & Colorization",
                "description": "Full damage repair, advanced reconstruction, and historically accurate colorization of black & white photos. 40 credits."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Vintage Photo Repair (Deep Restore)",
                "description": "Extensive repair for water stains, creases, torn edges, missing regions, and heavy discoloration."
              }
            },
            // Decades Offers (detailed)
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "70s Transformations",
                "description": "70s disco, hippie, funk, analog film grain, warm tones, and era-correct color palettes."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "80s Transformations",
                "description": "1980s neon, synthwave, new wave, pop, high-saturation color grading and classic yearbook looks."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "90s Transformations",
                "description": "1990s grunge, alternative, hip hop and authentic 90s school/yearbook aesthetics (Buffy, Dazed and Confused vibes)."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "2000s / Y2K Transformations",
                "description": "Early 2000s digital effects, emo, scene, glossy edits, and Y2K pop-culture photo styles (Back to the Future nostalgia included as inspiration)."
              }
            },
            // Avatar & gaming style offers
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Dungeons & Dragons Avatars",
                "description": "Generate RPG fantasy avatars: wizard, paladin, rogue, cleric, ranger, druid with armor, spells, and epic lighting."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Game of Thrones-Inspired Portraits",
                "description": "GOT-inspired medieval/fantasy royalty portraits, fur, leather, armor, and cinematic moody lighting. (Inspired-by styling; not affiliated.)"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Halo-Style Sci-Fi Avatars",
                "description": "Spartan/armored sci-fi soldier portraits, high-detail helmet and armor renders, cinematic lighting (inspired-by)."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Cyberpunk & Neon Avatars",
                "description": "Futuristic cyberpunk portraits: neon signs, chrome implants, holograms, cybernetic enhancements."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Steampunk & Victorian Fantasy Avatars",
                "description": "Gears, goggles, brass, and Victorian sci-fi steampunk character portraits."
              }
            }
          ]
        }
      },
      // FAQ (extended)
      {
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I restore old photos online?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Upload your photo (JPG, PNG, HEIC), pick Basic or Premium restoration, let our AI process it, then preview and download. Basic repairs minor damage; Premium includes advanced reconstruction and colorization."
            }
          },
          {
            "@type": "Question",
            "name": "What photo problems can AI fix?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "AI can fix scratches, tears, staining, water damage, yellowing, creases, dust, fading, blur, low resolution, and missing small regions by reconstructing content using learned image priors."
            }
          },
          {
            "@type": "Question",
            "name": "Can you colorize black and white photos accurately?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our premium colorization uses reference palettes and historical color profiles to produce natural, period-accurate colors while preserving skin tones and materials."
            }
          },
          {
            "@type": "Question",
            "name": "How fast is processing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Typical processing times: Basic restoration 30–60 seconds; Premium colorization 60–120 seconds depending on image complexity and queue."
            }
          },
          {
            "@type": "Question",
            "name": "Are restored photos private?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Uploaded photos are processed on secure servers and deleted after a short retention period. We do not publish or sell user images."
            }
          },
          {
            "@type": "Question",
            "name": "Can I create avatars based on games or TV shows?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes — we generate avatars inspired by popular genres and aesthetics such as fantasy, medieval, sci-fi, and cyberpunk. We do not claim affiliation with trademarked IP; styles are 'inspired-by' and custom generated."
            }
          },
          {
            "@type": "Question",
            "name": "Do I own the images and avatars I create?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes — once you download your restored or generated image, it's yours to use commercially or personally as allowed by our terms of service."
            }
          },
          {
            "@type": "Question",
            "name": "What file formats do you support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We support JPG, JPEG, PNG, HEIC and common image formats. Output can be downloaded as high-quality JPG or PNG."
            }
          },
          {
            "@type": "Question",
            "name": "Does it cost money?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer a free trial credit and pay-per-use credits for Basic and Premium operations. Pricing is clearly displayed on the pricing page."
            }
          }
        ]
      },
      // HowTo (expanded)
      {
        "@type": "HowTo",
        "@id": `${canonical}#howto`,
        "name": "How to use Throwback AI for photo restoration, decade transformations and avatar generation",
        "description": "Complete step-by-step guide for restoring photos, transforming styles, and generating avatars.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Choose your photo or reference",
            "text": "Pick a high-resolution scan or photo and upload it to Throwback AI. For avatars, attach reference images or choose a style (fantasy, cyberpunk, Halo, GOT-inspired)."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Select restoration or transformation type",
            "text": "Choose Basic, Premium, or Deep Restore for repairs; select 'Decade' to apply 70s/80s/90s/2000s looks; choose 'Avatar' and pick a style or genre for character generation."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Customize and preview",
            "text": "Use available sliders to tune strength (repair, colorization, grain, vignette) and preview before finalizing."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Process and download",
            "text": "Process the image. When finished, download your high-resolution result. Use it for prints, social media, genealogy, gaming avatars, cosplay or creative projects."
          }
        ],
        "totalTime": "PT3M"
      },
      // LocalBusiness & contact-ish data
      {
        "@type": "LocalBusiness",
        "name": "Throwback AI Photo Restoration & Avatar Generator",
        "description": "AI-powered online photo restoration, colorization, retro transformations and avatar generation service.",
        "url": canonical,
        "sameAs": [facebookPageUrl],
        "serviceArea": { "@type": "Place", "name": "Worldwide" },
        "priceRange": "Free - $$$",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Throwback AI Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Basic Restoration (1 credit)" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Premium Colorization (40 credits)" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Avatar Generation (varies)" } }
          ]
        }
      },
      // ImageObject examples for social previews (multiple)
      {
        "@type": "ImageObject",
        "contentUrl": `${siteUrl}/images/restore-preview.png`,
        "description": "Before and after example: restored family portrait"
      },
      {
        "@type": "ImageObject",
        "contentUrl": `${siteUrl}/images/decades/80s-sample.jpg`,
        "description": "80s neon sample transformation"
      },
      {
        "@type": "ImageObject",
        "contentUrl": `${siteUrl}/images/avatars/fantasy-sample.jpg`,
        "description": "Fantasy avatar sample"
      }
    ]
  };

  // Additional micro-FAQ entries and long-tail snippets as meta (helps some crawlers)
  const additionalSnippets = [
    "Fix torn old photos online, remove water damage, restore family heirlooms",
    "Make a photo look 80s neon, 90s grunge, or Y2K glossy",
    "Generate a D&D character portrait from a selfie",
    "Create Game of Thrones inspired royalty portraits (style inspired, not affiliated)",
    "Make a Halo-like armored soldier avatar",
    "Generate cyberpunk neon avatars for streaming, social, and gaming profiles",
    "Restore wedding album photos and print-ready high resolution files"
  ];

  return (
    <Head>
      {/* Primary SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Social */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Throwback AI" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content="Restore old photos, colorize black & white, and create retro & fantasy avatars with Throwback AI" />
      <meta property="fb:pages" content={facebookPageId} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@throwbackai" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Additional meta for devices and indexing */}
      <meta name="theme-color" content="#a855f7" />
      <meta name="msapplication-TileColor" content="#a855f7" />
      <meta name="application-name" content="Throwback AI" />
      <meta name="apple-mobile-web-app-title" content="Throwback AI" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="language" content="English" />
      <meta httpEquiv="content-language" content="en-US" />

      {/* Extra micro-snippets */}
      {additionalSnippets.map((s, i) => (
        <meta key={`snippet-${i}`} name={`og:extra:${i}`} content={s} />
      ))}

      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* Helpful preloads (hero images / fonts) */}
      <link rel="preload" as="image" href={`${siteUrl}/images/restore-preview.png`} />
      <link rel="preload" as="image" href={`${siteUrl}/images/decades/80s-sample.jpg`} />
      <link rel="preload" as="image" href={`${siteUrl}/images/avatars/fantasy-sample.jpg`} />
      <link rel="dns-prefetch" href="//replicate.com" />
      <link rel="dns-prefetch" href="//supabase.co" />
      <link rel="dns-prefetch" href="//stripe.com" />
    </Head>
  );
};

export default HomepageUltraMaxSEO;
