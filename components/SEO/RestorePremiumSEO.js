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
  
  // UPDATED: MASSIVE keyword list covering all variations
  const defaultKeywords =
    "restore old photos, restore photos, photo restoration, AI photo restoration, restore old photos free, enhance photo, enhance photos online, fix blurry photos, repair old photos, damaged photo repair, restore damaged photos, colorize photos, colorize black and white photos, photo colorization, vintage photo restoration, old photo restoration, restore faded photos, fix scratched photos, enhance old photos, photo enhancer, image restoration, picture restoration, restore pictures, fix old photos, repair vintage photos, restore family photos, enhance image quality, improve photo quality, upscale photos, denoise photos, remove scratches from photos, fix torn photos, restore torn pictures, black and white to color, AI photo enhancer, photo repair tool, restore photo online, enhance photo free, fix photo quality, old picture restoration, antique photo restoration, restore historical photos, enhance blurry images, sharpen photos, restore photo clarity, fix photo damage, photo restoration service, free photo restoration, online photo restoration, AI image enhancement, photo restoration software, restore scanned photos, enhance photo resolution, fix old family photos, genealogy photo restoration, memorial photo restoration";

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
      "Restore old and damaged photos with AI",
      "Enhance blurry and faded photos",
      "Fix scratches, tears, and damage",
      "Colorize black and white photos",
      "Improve photo quality and resolution",
      "Remove noise and grain",
      "Sharpen and enhance clarity",
      "Repair vintage family photos",
      "Professional-grade AI restoration",
      "Free basic photo restoration (1 credit)",
      "Premium colorization service (40 credits)",
      "Fast photo enhancement processing",
      "High-resolution output",
      "Preserve family memories and genealogy"
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