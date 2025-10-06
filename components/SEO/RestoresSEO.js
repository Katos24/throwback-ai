// components/SEO/RestoresSEO.js
import Head from "next/head";

const RestoresSEO = ({ 
  customTitle = null,
  customDescription = null,
  customKeywords = null,
  ogImage = null,
  canonicalUrl = "https://throwbackai.app/restores"
}) => {
  const defaultTitle = "Professional Photo Restoration & Colorization Service | Restore Old Photos | Throwback AI";
  const defaultDescription = "Fast, specialized AI for photo restoration. Transform black and white photos into vivid color, repair damaged family photos, fix scratches and tears. Museum-quality results in seconds. Get 50 free credits.";
  const defaultKeywords = "photo restoration service, restore old photos, colorize black and white photos, photo repair, damaged photo restoration, family photo restoration, wedding photo restoration, vintage photo repair, AI photo colorization, professional photo restoration, fix old photos, photo damage repair, scratch removal, tear repair, water damage photos";

  const title = customTitle || defaultTitle;
  const description = customDescription || defaultDescription;
  const keywords = customKeywords || defaultKeywords;
  const imageUrl = ogImage || "https://throwbackai.app/images/restore-before-after-og.jpg";
  const twitterImage = imageUrl;
  const facebookPageUrl = 'https://www.facebook.com/profile.php?id=61578072554521';
  const facebookPageId = '61578072554521';

  // Structured data for restoration services
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        "url": canonicalUrl,
        "name": title,
        "description": description,
        "isPartOf": { "@id": "https://throwbackai.app#website" },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://throwbackai.app"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Photo Restoration",
              "item": canonicalUrl
            }
          ]
        }
      },
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        "name": "Professional Photo Restoration Service",
        "description": "Fast, specialized AI-powered photo restoration service for repairing damaged photos, colorizing black and white images, and preserving family memories.",
        "provider": {
          "@type": "Organization",
          "name": "Throwback AI",
          "url": "https://throwbackai.app",
          "sameAs": [facebookPageUrl]
        },
        "serviceType": "Photo Restoration and Colorization",
        "areaServed": "Worldwide",
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": canonicalUrl,
          "serviceType": "Online Service"
        },
        "hasOfferingCatalog": {
          "@type": "OfferingCatalog",
          "name": "Photo Restoration Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": { 
                "@type": "Service", 
                "name": "Professional Photo Colorization",
                "description": "Museum-quality colorization for black and white photos with historically accurate colors",
                "category": "Premium Restoration"
              },
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "0.50",
                "priceCurrency": "USD",
                "description": "40 credits per photo"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": { 
                "@type": "Service", 
                "name": "Quick Photo Repair",
                "description": "Fast repair service for scratches, tears, water damage, and fading",
                "category": "Basic Restoration"
              },
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "0.01",
                "priceCurrency": "USD",
                "description": "1 credit per photo"
              }
            }
          ]
        },
        "offers": {
          "@type": "Offer",
          "price": "0.01",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": "2025-12-31",
          "url": canonicalUrl
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How long does photo restoration take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our AI photo restoration is incredibly fast. Basic repairs complete in under 10 seconds, while premium colorization takes 10-30 seconds."
            }
          },
          {
            "@type": "Question",
            "name": "Can you restore damaged family photos?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Our AI can repair scratches, tears, water damage, and fading. We specialize in restoring precious family photos, wedding pictures, and vintage memories."
            }
          },
          {
            "@type": "Question",
            "name": "How much does photo restoration cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Basic photo repair starts at just $0.01 per photo (1 credit). Professional colorization is $0.50 per photo (40 credits). New users get 50 free credits to try any restoration risk-free."
            }
          },
          {
            "@type": "Question",
            "name": "Can you add color to black and white photos?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely! Our premium colorization service transforms black and white photos into vivid color with historically accurate, museum-quality results in seconds."
            }
          }
        ]
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
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Throwback AI" />
      <meta property="og:title" content="Professional Photo Restoration & Colorization | Restore Old Photos" />
      <meta property="og:description" content="Fast, specialized AI for photo restoration. Transform black and white photos into vivid color, repair damaged family photos. Museum-quality results in seconds." />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content="Before and after examples of restored and colorized family photos showing dramatic transformations" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Facebook-specific */}
      <meta property="fb:pages" content={facebookPageId} />
      <meta property="article:publisher" content={facebookPageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@throwbackai" />
      <meta name="twitter:creator" content="@throwbackai" />
      <meta name="twitter:title" content="Professional Photo Restoration & Colorization Service" />
      <meta name="twitter:description" content="Restore damaged photos, add color to black and white pictures. Fast, specialized AI delivers museum-quality results in seconds." />
      <meta name="twitter:image" content={twitterImage} />
      <meta name="twitter:image:alt" content="Photo restoration before and after examples" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#111827" />
      <meta name="msapplication-TileColor" content="#111827" />
      <meta name="application-name" content="Throwback AI" />
      <meta name="apple-mobile-web-app-title" content="Throwback AI" />
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

      {/* Service-specific meta tags */}
      <meta name="service-type" content="photo-restoration,photo-colorization,photo-repair" />
      <meta name="restoration-types" content="scratch-removal,tear-repair,water-damage,colorization,fading-repair" />
      <meta name="photo-types" content="family-photos,wedding-photos,vintage-photos,black-white-photos,damaged-photos" />
      <meta name="processing-speed" content="seconds" />
      <meta name="pricing-model" content="pay-per-photo,credit-based" />

      {/* Rich Snippets - Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      {/* Preload Critical Resources */}
      <link rel="preload" href="/videos/restore-demo.mp4" as="video" type="video/mp4" />
      <link rel="preload" href="/images/restore-before-after-og.jpg" as="image" />

      {/* DNS Prefetch for External Resources */}
      <link rel="dns-prefetch" href="//replicate.com" />
      <link rel="dns-prefetch" href="//supabase.co" />
      <link rel="dns-prefetch" href="//stripe.com" />
      
      {/* Favicon Links */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Additional SEO Tags */}
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="target" content="all" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
    </Head>
  );
};

export default RestoresSEO;