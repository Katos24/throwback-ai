// components/seo/NinetiesSEO.js - IMPROVED FOR "90S AI GENERATOR"
import Head from "next/head";

const NinetiesSEO = ({ 
  customTitle = null,
  customDescription = null,
  customKeywords = null,
  ogImage = null,
  canonicalUrl = "https://throwbackai.app/replicate/90s"
}) => {
  // UPDATED: Added "AI generator" prominently
  const defaultTitle = "90s AI Photo Generator | 1990s Yearbook Creator & Grunge AI Filter - Throwback AI";
  
  // UPDATED: Lead with "AI generator" language + specific 90s styles
  const defaultDescription = "Free 90s AI photo generator - Transform any photo into authentic 1990s style with AI. Create grunge, hip hop, alternative rock yearbook photos instantly. Best AI generator for vintage 90s effects and totally radical transformations.";
  
  // UPDATED: Added comprehensive AI generator keyword variations
  const defaultKeywords = "90s AI generator, 90s photo AI, AI 90s filter, 1990s AI generator, retro AI photo generator, 90s yearbook AI, vintage photo AI generator, nineties AI creator, AI grunge photo maker, AI hip hop generator, 90s style AI, retro AI transformation, AI vintage filter 90s, 1990s AI photo creator, radical AI generator, AI 90s yearbook maker, grunge AI filter, alternative rock AI generator";

  const title = customTitle || defaultTitle;
  const description = customDescription || defaultDescription;
  const keywords = customKeywords || defaultKeywords;
  const imageUrl = ogImage || "https://throwbackai.app/images/90sCard.jpg";

  // UPDATED: Structured data emphasizes AI generator capabilities
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "90s AI Photo Generator",
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
      "AI-powered 90s photo generation and transformation",
      "Artificial intelligence 1990s style creator",
      "Multiple AI-generated 90s styles (grunge, hip hop, alternative, skater)",
      "Instant AI photo processing",
      "High-resolution AI-generated downloads",
      "Authentic 1990s yearbook effects using AI",
      "Free AI photo generator for 90s vintage looks",
      "Grunge and alternative rock aesthetics with AI"
    ],
    // ADDED: More specific categorization for AI tools
    "category": "AI Photo Generator",
    "genre": ["Photography", "AI Tools", "Photo Editing", "Nostalgia"]
  };

  // ADDED: FAQ schema for "90s AI generator" questions
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a 90s AI photo generator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A 90s AI photo generator uses artificial intelligence to transform modern photos into authentic 1990s style images with grunge effects, retro clothing, iconic 90s hairstyles, and color grading typical of the alternative rock and hip hop era."
        }
      },
      {
        "@type": "Question",
        "name": "How does the 90s AI generator work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI analyzes your photo and applies authentic 90s transformations including period-accurate grunge fashion, flannel shirts, baggy jeans, frosted tips, and vintage photo effects to create realistic 1990s yearbook-style images."
        }
      },
      {
        "@type": "Question",
        "name": "Is the 90s AI photo generator free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can try the 90s AI generator for free with sign-up credits. Generate authentic 1990s grunge, hip hop, and alternative style photos without subscription fees."
        }
      },
      {
        "@type": "Question",
        "name": "What 90s styles can the AI generator create?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our 90s AI generator creates grunge, hip hop, alternative rock, pop punk, skater, preppy, and rave styles. Get flannel-clad grunge looks, baggy hip hop fashion, or alternative rock aesthetics with AI."
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
      <meta property="og:title:alt" content="Free 90s AI Generator - Create 1990s Grunge Style Photos" />
      <meta name="twitter:title:alt" content="90s AI Photo Generator - Vintage Grunge Creator" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Throwback AI - 90s Photo Generator" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="90s AI generator showing before and after transformation - grunge and hip hop style photos created with AI" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@throwbackai" />
      <meta name="twitter:creator" content="@throwbackai" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content="Transform photos into totally radical 90s style with AI generator - grunge, hip hop, alternative effects" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#800080" />
      <meta name="msapplication-TileColor" content="#800080" />
      <meta name="application-name" content="90s AI Generator - Throwback AI" />
      <meta name="apple-mobile-web-app-title" content="90s AI Photo Generator" />
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
      <link rel="preload" href="/fonts/grunge-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/images/crt-monitor.png" as="image" />
      <link rel="preload" href="/images/90s-posters.png" as="image" />

      {/* DNS Prefetch for External Resources */}
      <link rel="dns-prefetch" href="//replicate.com" />
      <link rel="dns-prefetch" href="//supabase.co" />
      
      {/* Favicon Links */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* 90s-specific meta for enhanced discoverability */}
      <meta name="decade" content="1990s" />
      <meta name="era" content="nineties" />
      <meta name="style-categories" content="grunge,hip-hop,alternative,skater,flannel,AI-generated" />
      <meta name="target-audience" content="millennials,gen-x,nostalgia,alternative-music-fans,AI-tool-users" />
      <meta name="cultural-references" content="nirvana,pearl-jam,tupac,biggie,friends,fresh-prince,grunge-fashion" />

      {/* Additional 90s cultural context */}
      <meta name="music-genres" content="grunge,alternative-rock,hip-hop,r&b,pop-punk" />
      <meta name="fashion-trends" content="flannel,baggy-jeans,chokers,platform-shoes,backwards-caps,frosted-tips" />
      <meta name="tech-nostalgia" content="crt-monitor,floppy-disk,dial-up,aol,cd-rom,AI-photo-generator" />
      
      {/* ADDED: AI-specific categorization */}
      <meta name="ai-features" content="photo-transformation,style-transfer,vintage-effects,AI-generation" />
      <meta name="tool-type" content="AI-generator,photo-editor,style-creator,yearbook-maker" />
    </Head>
  );
};

export default NinetiesSEO;