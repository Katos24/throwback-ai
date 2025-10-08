// components/seo/HalloweenSEO.js
import Head from "next/head";

const siteUrl = "https://throwbackai.app";
const pageUrl = `${siteUrl}/replicate/halloween`;
const ogImage = `${siteUrl}/images/halloween-seo.jpg`;
const twitterImage = ogImage;
const facebookPageUrl = "https://www.facebook.com/profile.php?id=61578072554521";
const facebookPageId = "61578072554521";

const HalloweenSEO = ({ 
  customTitle = null,
  customDescription = null,
  customKeywords = null,
  customOgImage = null,
  customCanonicalUrl = null
}) => {
  const defaultTitle = "Halloween Face Swap AI 2024 | Put Yourself in Iconic Horror Movie Scenes";
  const defaultDescription =
    "Free Halloween AI face swap - transform yourself into 10 iconic horror movie scenes including Ghostface, Freddy Krueger, The Shining, Saw, and more. Sign up free and get 50 credits to create spooky content!";
  const defaultKeywords =
    "halloween face swap, horror movie face swap, AI halloween, ghostface face swap, freddy krueger AI, halloween AI 2024, scary face swap, horror scene generator, spooky AI, halloween photo editor, free halloween face swap, scream face swap, the shining AI, saw face swap, pennywise face swap, halloween content creator";

  const title = customTitle || defaultTitle;
  const description = customDescription || defaultDescription;
  const keywords = customKeywords || defaultKeywords;
  const imageUrl = customOgImage || ogImage;
  const canonicalUrl = customCanonicalUrl || pageUrl;

  // Structured data for Halloween face swap
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Halloween Face Swap AI",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web",
    "description": description,
    "url": canonicalUrl,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "description": "Free Halloween AI face swap with 50 free credits on signup"
    },
    "creator": {
      "@type": "Organization",
      "name": "Throwback AI",
      "url": siteUrl
    },
    "keywords": keywords,
    "softwareVersion": "1.0",
    "featureList": [
      "Ghostface phone call scene",
      "Freddy Krueger nightmare",
      "The Ring TV static",
      "Pennywise storm drain",
      "Michael Myers stalker",
      "Video store horror",
      "The Shining hallway",
      "Saw jigsaw game",
      "Stranger Things scenes",
      "10 iconic horror movie transformations"
    ],
    "potentialAction": {
      "@type": "UseAction",
      "target": canonicalUrl,
      "description": "Create Halloween horror movie face swaps"
    }
  };

  // FAQ Schema for Halloween face swap
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is the Halloween face swap free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Sign up free and get 50 credits to try the Halloween face swap. Each face swap costs 50 credits, so you can create your first horror movie scene completely free."
        }
      },
      {
        "@type": "Question",
        "name": "What horror movie scenes are available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer 10 iconic horror scenes including Ghostface phone call (Scream), Freddy Krueger's nightmare, The Shining hallway, Saw's jigsaw game, Pennywise storm drain (IT), Michael Myers stalker (Halloween), The Ring TV static, and more."
        }
      },
      {
        "@type": "Question",
        "name": "How does the Halloween AI face swap work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply upload your photo, choose one of 10 iconic horror movie scenes, and our AI will swap your face into the scene within seconds. The results are high-quality and perfect for Halloween content."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use these for social media?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! All generated Halloween face swaps can be downloaded and shared on TikTok, Instagram, Facebook, and other social media platforms. Perfect for Halloween content creation."
        }
      }
    ]
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Throwback AI" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Halloween AI face swap showing transformation into iconic horror movie scenes including Ghostface, Freddy Krueger, and more" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@throwbackai" />
      <meta name="twitter:creator" content="@throwbackai" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twitterImage} />
      <meta name="twitter:image:alt" content="Transform into horror movie characters with free Halloween AI face swap" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#ff6b00" />
      <meta name="msapplication-TileColor" content="#ff6b00" />
      <meta name="application-name" content="Throwback AI - Halloween" />
      <meta name="apple-mobile-web-app-title" content="Halloween Face Swap" />
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
      <meta name="copyright" content="© 2024 Throwback AI" />

      {/* Halloween-specific meta tags */}
      <meta name="season" content="halloween" />
      <meta name="holiday" content="halloween-2024" />
      <meta name="service-type" content="face-swap" />
      <meta name="service-category" content="halloween-horror" />
      <meta name="target-audience" content="horror-fans,halloween-enthusiasts,content-creators" />
      <meta name="featured-movies" content="scream,nightmare-on-elm-street,the-shining,saw,it,halloween,the-ring" />

      {/* Rich Snippets - Structured Data */}
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

      {/* Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Throwback AI Halloween Face Swap",
            "description": "Free AI-powered Halloween face swap service for horror movie scenes",
            "url": canonicalUrl,
            "sameAs": [facebookPageUrl],
            "priceRange": "Free",
            "serviceArea": {
              "@type": "Place",
              "name": "Worldwide"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Halloween Face Swap Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Halloween Horror Movie Face Swap",
                    "description": "AI-powered face swap into 10 iconic horror movie scenes"
                  }
                }
              ]
            }
          })
        }}
      />

      {/* Preload Critical Resources */}
      <link rel="preload" href="/templates/halloween/ghostface-phone.jpg" as="image" />
      <link rel="preload" href="/fonts/modern-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//replicate.com" />
      <link rel="dns-prefetch" href="//supabase.co" />
      
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
      <meta name="revisit-after" content="1 days" />
      <meta name="distribution" content="global" />
      <meta name="target" content="all" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      
      {/* Event Schema for Halloween 2024 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "Halloween 2024 Face Swap",
            "description": "Free Halloween AI face swap experience",
            "startDate": "2024-10-01",
            "endDate": "2024-10-31",
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
            "location": {
              "@type": "VirtualLocation",
              "url": canonicalUrl
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "url": canonicalUrl
            }
          })
        }}
      />
    </Head>
  );
};

export default HalloweenSEO;