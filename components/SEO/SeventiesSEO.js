// components/seo/SeventiesSEO.js - IMPROVED FOR "70S AI GENERATOR"
import Head from "next/head";

const SeventiesSEO = ({ 
  customTitle = null,
  customDescription = null,
  customKeywords = null,
  ogImage = null,
  canonicalUrl = "https://throwbackai.app/replicate/70s"
}) => {
  // UPDATED: Added "AI generator" prominently
  const defaultTitle = "70s AI Photo Generator | 1970s Yearbook Creator & Retro AI Filter - Throwback AI";
  
  // UPDATED: Lead with "AI generator" language
  const defaultDescription = "Free 70s AI photo generator - Transform any photo into authentic 1970s style with AI. Create groovy disco, hippie, punk rock yearbook photos instantly. Best AI generator for vintage 70s effects and retro transformations.";
  
  // UPDATED: Added AI generator keyword variations
  const defaultKeywords = "70s AI generator, 70s photo AI, AI 70s filter, 1970s AI generator, retro AI photo generator, 70s yearbook AI, vintage photo AI generator, seventies AI creator, AI disco photo maker, AI hippie generator, 70s style AI, retro AI transformation, AI vintage filter 70s, 1970s AI photo creator, groovy AI generator, AI 70s yearbook maker";

  const title = customTitle || defaultTitle;
  const description = customDescription || defaultDescription;
  const keywords = customKeywords || defaultKeywords;
  const imageUrl = ogImage || "https://throwbackai.app/images/70sCard.jpg";

  // UPDATED: Structured data emphasizes AI generator capabilities
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "70s AI Photo Generator",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web",
    "description": description,
    "url": canonicalUrl,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "creator": {
      "@type": "Organization",
      "name": "Throwback AI",
      "url": "https://throwbackai.app"
    },
    "keywords": keywords,
    "softwareVersion": "1.0",
    "featureList": [
      "AI-powered 70s photo generation and transformation",
      "Artificial intelligence 1970s style creator",
      "Multiple AI-generated 70s styles (disco, hippie, punk, glam)",
      "Instant AI photo processing",
      "High-resolution AI-generated downloads",
      "Authentic 1970s yearbook effects using AI",
      "Free AI photo generator for 70s vintage looks"
    ],
    // ADDED: More specific categorization for AI tools
    "category": "AI Photo Generator",
    "genre": ["Photography", "AI Tools", "Photo Editing"]
  };

  // ADDED: FAQ schema for "70s AI generator" questions
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a 70s AI photo generator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A 70s AI photo generator uses artificial intelligence to transform modern photos into authentic 1970s style images with vintage effects, retro clothing, hairstyles, and color grading typical of the disco era."
        }
      },
      {
        "@type": "Question",
        "name": "How does the 70s AI generator work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI analyzes your photo and applies authentic 70s transformations including period-accurate fashion, hairstyles, makeup, and vintage photo effects to create realistic 1970s yearbook-style images."
        }
      },
      {
        "@type": "Question",
        "name": "Is the 70s AI photo generator free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can try the 70s AI generator for free with sign-up credits. Generate authentic 1970s style photos without subscription fees."
        }
      }
    ]
  };

  return (
    <Head>
      {/* Basic Meta Tags - AI GENERATOR OPTIMIZED */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* ADDED: Alternate titles for search engines */}
      <meta property="og:title:alt" content="Free 70s AI Generator - Create 1970s Style Photos" />
      <meta name="twitter:title:alt" content="70s AI Photo Generator - Vintage Style Creator" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Throwback AI - 70s Photo Generator" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="70s AI generator showing before and after transformation - disco and hippie style photos created with AI" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@throwbackai" />
      <meta name="twitter:creator" content="@throwbackai" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content="Transform photos into groovy 70s style with AI generator - disco, hippie, punk rock effects" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#8B4513" />
      <meta name="msapplication-TileColor" content="#8B4513" />
      <meta name="application-name" content="70s AI Generator - Throwback AI" />
      <meta name="apple-mobile-web-app-title" content="70s AI Photo Generator" />
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

      {/* Rich Snippets - Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      {/* ADDED: FAQ Schema for AI Generator Questions */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />

      {/* Preload Critical Resources */}
      <link rel="preload" href="/fonts/groovy-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/images/tv-frame.png" as="image" />

      {/* DNS Prefetch for External Resources */}
      <link rel="dns-prefetch" href="//replicate.com" />
      <link rel="dns-prefetch" href="//supabase.co" />
      
      {/* Favicon Links */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
};

export default SeventiesSEO;