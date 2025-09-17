// components/seo/EightiesSEO.js
import Head from "next/head";

const EightiesSEO = ({ 
  customTitle = null,
  customDescription = null,
  customKeywords = null,
  ogImage = null,
  canonicalUrl = "https://throwbackai.app/replicate/80s"
}) => {
  const defaultTitle = "80s Yearbook Photo Generator | Throwback AI - Create Totally Awesome 80s Style Photos";
  const defaultDescription = "Transform your photo into an authentic 80s yearbook photo with AI. Choose from new wave, rock, pop, and neon styles. Create totally awesome retro photos in seconds with vintage 1980s effects.";
  const defaultKeywords = "80s photo generator, 1980s yearbook photos, retro photo AI, vintage photo effects, new wave photo style, neon 80s photos, 80s fashion generator, totally awesome photo maker, eighties AI, retro yearbook creator, vintage portrait generator, 80s style transformation, synthwave photos";

  const title = customTitle || defaultTitle;
  const description = customDescription || defaultDescription;
  const keywords = customKeywords || defaultKeywords;
  const imageUrl = ogImage || "https://throwbackai.app/images/80sCard.jpg";

  // Structured data for the 80s photo generator
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "80s Yearbook Photo Generator",
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
      "AI-powered 80s photo transformation",
      "Multiple 80s style options (new wave, rock, pop, neon)",
      "Instant photo processing",
      "High-resolution downloads",
      "Authentic 1980s yearbook effects",
      "Synthwave and neon aesthetic options"
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
      <meta property="og:image:alt" content="80s yearbook photo transformation example showing before and after AI enhancement with neon effects" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@throwbackai" />
      <meta name="twitter:creator" content="@throwbackai" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content="Transform your photo into totally awesome 80s yearbook style with AI" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#FF00FF" />
      <meta name="msapplication-TileColor" content="#FF00FF" />
      <meta name="application-name" content="Throwback AI - 80s Generator" />
      <meta name="apple-mobile-web-app-title" content="80s Photo Generator" />
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

      {/* Preload Critical Resources */}
      <link rel="preload" href="/fonts/retro-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/images/computer-monitor.png" as="image" />

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
      <meta name="style-categories" content="synthwave,neon,new-wave,rock,pop" />
      <meta name="target-audience" content="millennials,gen-x,nostalgia,retro-enthusiasts" />
    </Head>
  );
};

export default EightiesSEO;