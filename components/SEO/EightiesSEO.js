// components/seo/EightiesSEO.js - IMPROVED FOR "80S AI GENERATOR"
import Head from "next/head";

const EightiesSEO = ({ 
  customTitle = null,
  customDescription = null,
  customKeywords = null,
  ogImage = null,
  canonicalUrl = "https://throwbackai.app/replicate/80s"
}) => {
  // UPDATED: Added "AI generator" prominently
  const defaultTitle = "80s AI Photo Generator | 1980s Yearbook Creator & Neon AI Filter - Throwback AI";
  
  // UPDATED: Lead with "AI generator" language + specific 80s styles
  const defaultDescription = "Free 80s AI photo generator - Transform any photo into authentic 1980s style with AI. Create neon, new wave, rock & roll, Miami Vice yearbook photos instantly. Best AI generator for vintage 80s effects and totally radical transformations.";
  
  // UPDATED: Added comprehensive AI generator keyword variations
  const defaultKeywords = "80s AI generator, 80s photo AI, AI 80s filter, 1980s AI generator, retro AI photo generator, 80s yearbook AI, vintage photo AI generator, eighties AI creator, AI neon photo maker, AI new wave generator, 80s style AI, retro AI transformation, AI vintage filter 80s, 1980s AI photo creator, radical AI generator, AI 80s yearbook maker, synthwave AI filter, neon AI generator, Miami Vice AI, mullet AI generator, big hair AI photo";

  const title = customTitle || defaultTitle;
  const description = customDescription || defaultDescription;
  const keywords = customKeywords || defaultKeywords;
  const imageUrl = ogImage || "https://throwbackai.app/images/80sCard.jpg";

  // UPDATED: Structured data emphasizes AI generator capabilities
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "80s AI Photo Generator",
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
      "AI-powered 80s photo generation and transformation",
      "Artificial intelligence 1980s style creator",
      "Multiple AI-generated 80s styles (neon, new wave, rock, Miami Vice)",
      "Instant AI photo processing",
      "High-resolution AI-generated downloads",
      "Authentic 1980s yearbook effects using AI",
      "Free AI photo generator for 80s vintage looks",
      "Synthwave and neon aesthetic with AI"
    ],
    // ADDED: More specific categorization for AI tools
    "category": "AI Photo Generator",
    "genre": ["Photography", "AI Tools", "Photo Editing", "Nostalgia", "Retro"]
  };

  // ADDED: FAQ schema for "80s AI generator" questions
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is an 80s AI photo generator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An 80s AI photo generator uses artificial intelligence to transform modern photos into authentic 1980s style images with neon effects, big hair, retro clothing, and color grading typical of the new wave and rock era. Get Miami Vice vibes, synthwave aesthetics, and classic 80s yearbook looks."
        }
      },
      {
        "@type": "Question",
        "name": "How does the 80s AI generator work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI analyzes your photo and applies authentic 80s transformations including period-accurate neon fashion, big hair styles, mullets, power suits, and vintage photo effects to create realistic 1980s yearbook-style images with synthwave and new wave aesthetics."
        }
      },
      {
        "@type": "Question",
        "name": "Is the 80s AI photo generator free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can try the 80s AI generator for free with sign-up credits. Generate authentic 1980s neon, new wave, rock, and Miami Vice style photos without subscription fees."
        }
      },
      {
        "@type": "Question",
        "name": "What 80s styles can the AI generator create?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our 80s AI generator creates new wave, rock & metal, pop culture, Miami Vice, synthwave, neon aesthetics, aerobics style, and Valley Girl looks. Get big hair, mullets, power suits, and totally radical 80s vibes with AI."
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
      <meta property="og:title:alt" content="Free 80s AI Generator - Create 1980s Neon Style Photos" />
      <meta name="twitter:title:alt" content="80s AI Photo Generator - Vintage Synthwave Creator" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Throwback AI - 80s Photo Generator" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="80s AI generator showing before and after transformation - neon, new wave, and Miami Vice style photos created with AI" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@throwbackai" />
      <meta name="twitter:creator" content="@throwbackai" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content="Transform photos into totally radical 80s style with AI generator - neon, synthwave, new wave effects" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#FF00FF" />
      <meta name="msapplication-TileColor" content="#FF00FF" />
      <meta name="application-name" content="80s AI Generator - Throwback AI" />
      <meta name="apple-mobile-web-app-title" content="80s AI Photo Generator" />
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
      <link rel="preload" href="/fonts/retro-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

      {/* DNS Prefetch for External Resources */}
      <link rel="dns-prefetch" href="//replicate.com" />
      <link rel="dns-prefetch" href="//supabase.co" />
      
      {/* Favicon Links */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* 80s-specific meta for enhanced discoverability */}
      <meta name="decade" content="1980s" />
      <meta name="era" content="eighties" />
      <meta name="style-categories" content="synthwave,neon,new-wave,rock,pop,Miami-Vice,AI-generated" />
      <meta name="target-audience" content="millennials,gen-x,nostalgia,retro-enthusiasts,AI-tool-users" />
      <meta name="cultural-references" content="Miami-Vice,Breakfast-Club,Back-to-the-Future,MTV,arcade-games" />
      
      {/* Additional 80s cultural context */}
      <meta name="music-genres" content="new-wave,synthpop,rock,hair-metal,pop" />
      <meta name="fashion-trends" content="neon,big-hair,mullets,power-suits,leg-warmers,shoulder-pads" />
      <meta name="visual-aesthetic" content="synthwave,neon-lights,geometric-shapes,chrome,pastels" />
      
      {/* ADDED: AI-specific categorization */}
      <meta name="ai-features" content="photo-transformation,style-transfer,vintage-effects,AI-generation,neon-filter" />
      <meta name="tool-type" content="AI-generator,photo-editor,style-creator,yearbook-maker,synthwave-generator" />
    </Head>
  );
};

export default EightiesSEO;