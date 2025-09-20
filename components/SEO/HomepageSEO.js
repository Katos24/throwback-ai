// components/seo/HomepageSEO.js
import Head from "next/head";

const HomepageSEO = ({ 
  customTitle = null,
  customDescription = null,
  customKeywords = null,
  ogImage = null,
  canonicalUrl = "https://throwbackai.app"
}) => {
  const defaultTitle = "Restore Old Photos & Add Color to Black and White Pictures | 70s 80s 90s 2000s Photo Styles | Throwback AI";
  const defaultDescription = "Restore family photos, wedding pictures, and vintage memories. Add color to old black and white photos. Create viral 70s, 80s, 90s yearbook photos, and 2000s Y2K style transformations. AI photo restoration in seconds.";
  const defaultKeywords = "restore old photos, add color to old photos, colorize black and white photos, family photo restoration, wedding photo restoration, 70s style photos, 80s style photos, 90s yearbook photos, 2000s Y2K photos, vintage photo repair, retro photo filter, decades photo transformation, fix old photos, photo colorization service, AI photo restoration";

  const title = customTitle || defaultTitle;
  const description = customDescription || defaultDescription;
  const keywords = customKeywords || defaultKeywords;
  const imageUrl = ogImage || "https://throwbackai.app/images/throwback-ai.jpg";
  const twitterImage = imageUrl;
  const facebookPageUrl = 'https://www.facebook.com/profile.php?id=61578072554521';
  const facebookPageId = '61578072554521';

  // Structured data for homepage
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${canonicalUrl}#website`,
        "url": canonicalUrl,
        "name": "Throwback AI",
        "description": "Professional AI photo restoration service specializing in family photos, wedding pictures, vintage memories, and retro decade transformations.",
        "publisher": {
          "@type": "Organization",
          "name": "Throwback AI",
          "url": canonicalUrl,
          "sameAs": [facebookPageUrl]
        }
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        "url": canonicalUrl,
        "name": title,
        "isPartOf": { "@id": `${canonicalUrl}#website` },
        "description": description
      },
      {
        "@type": "Service",
        "name": "AI Photo Restoration",
        "description": "Professional photo restoration service for family photos, wedding pictures, vintage memories, and retro decade transformations with AI colorization.",
        "provider": {
          "@type": "Organization",
          "name": "Throwback AI"
        },
        "serviceType": "Photo Restoration Service",
        "hasOfferingCatalog": {
          "@type": "OfferingCatalog",
          "name": "Photo Restoration & Transformation Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": { 
                "@type": "Service", 
                "name": "Family Photo Restoration", 
                "description": "Repair damaged family photos, fix tears, scratches, and restore faded memories" 
              }
            },
            {
              "@type": "Offer",
              "itemOffered": { 
                "@type": "Service", 
                "name": "Wedding Photo Restoration", 
                "description": "Restore vintage wedding pictures and anniversary photos" 
              }
            },
            {
              "@type": "Offer",
              "itemOffered": { 
                "@type": "Service", 
                "name": "Black and White Photo Colorization", 
                "description": "Add historically accurate colors to old black and white photographs" 
              }
            },
            {
              "@type": "Offer",
              "itemOffered": { 
                "@type": "Service", 
                "name": "70s Style Photo Transformation", 
                "description": "Transform photos into groovy 70s hippie and disco style" 
              }
            },
            {
              "@type": "Offer",
              "itemOffered": { 
                "@type": "Service", 
                "name": "80s Yearbook Photo Generator", 
                "description": "Create authentic 80s yearbook photos with neon and new wave effects" 
              }
            },
            {
              "@type": "Offer",
              "itemOffered": { 
                "@type": "Service", 
                "name": "90s Yearbook Photo Generator", 
                "description": "Transform photos into 90s grunge and alternative yearbook style" 
              }
            },
            {
              "@type": "Offer",
              "itemOffered": { 
                "@type": "Service", 
                "name": "2000s Y2K Photo Transformation", 
                "description": "Create Y2K era photos with emo, scene, and digital aesthetics" 
              }
            },
            {
              "@type": "Offer",
              "itemOffered": { 
                "@type": "Service", 
                "name": "Vintage Photo Repair", 
                "description": "Fix water damage, tears, and age-related deterioration in old photographs" 
              }
            }
          ]
        }
      }
    ]
  };

  return (
    <Head>
      {/* Primary SEO - Combining Restoration + All Decades Content */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph - Combining Restoration + Decades Content */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Throwback AI" />
      <meta property="og:title" content="Restore Old Photos & Create 70s 80s 90s 2000s Style Pictures | Throwback AI" />
      <meta property="og:description" content="Restore family photos, wedding pictures, and vintage memories. Add color to old black and white photos. Create viral 70s, 80s, 90s yearbook photos, and 2000s Y2K transformations with AI in seconds." />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content="Before and after examples of restored family photos, colorized black and white pictures, and retro decade style transformations from 70s to 2000s" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Facebook-specific */}
      <meta property="fb:pages" content={facebookPageId} />
      <meta property="article:publisher" content={facebookPageUrl} />

      {/* Twitter - Combining Restoration + Decades Content */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@throwbackai" />
      <meta name="twitter:creator" content="@throwbackai" />
      <meta name="twitter:title" content="Restore Old Photos & Create 70s 80s 90s 2000s Style Pictures" />
      <meta name="twitter:description" content="Restore family photos and vintage memories. Create viral 70s, 80s, 90s yearbook photos, and 2000s Y2K transformations with AI in seconds." />
      <meta name="twitter:image" content={twitterImage} />
      <meta name="twitter:image:alt" content="Transform photos with AI - restore old pictures and create retro decade styles from 70s to 2000s" />

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

      {/* Service-specific meta tags for enhanced discoverability */}
      <meta name="service-categories" content="photo-restoration,photo-colorization,retro-transformation" />
      <meta name="target-photos" content="family-photos,wedding-photos,vintage-photos,black-white-photos" />
      <meta name="decades-available" content="70s,80s,90s,2000s" />
      <meta name="transformation-styles" content="hippie,disco,neon,grunge,alternative,y2k,emo" />
      <meta name="target-audience" content="families,millennials,gen-x,gen-z,nostalgia-enthusiasts" />

      {/* Rich Snippets - Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      {/* Preload Critical Resources */}
      <link rel="preload" href="/images/throwback-ai.jpg" as="image" />
      <link rel="preload" href="/fonts/modern-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

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

export default HomepageSEO;