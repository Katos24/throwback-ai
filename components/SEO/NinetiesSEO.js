// components/seo/NinetiesSEO.js
import Head from "next/head";

const NinetiesSEO = ({ 
  customTitle = null,
  customDescription = null,
  customKeywords = null,
  ogImage = null,
  canonicalUrl = "https://throwbackai.app/replicate/90s"
}) => {
  const defaultTitle = "90s Yearbook Photo Generator | Throwback AI - Create Totally Radical 90s Style Photos";
  const defaultDescription = "Transform your photo into an authentic 90s yearbook photo with AI. Choose from grunge, hip hop, alternative, and skater styles. Create totally radical retro photos in seconds with vintage 1990s effects.";
  const defaultKeywords = "90s photo generator, 1990s yearbook photos, retro photo AI, vintage photo effects, grunge photo style, hip hop 90s photos, 90s fashion generator, totally radical photo maker, nineties AI, retro yearbook creator, vintage portrait generator, 90s style transformation, alternative rock photos, skater aesthetic";

  const title = customTitle || defaultTitle;
  const description = customDescription || defaultDescription;
  const keywords = customKeywords || defaultKeywords;
  const imageUrl = ogImage || "https://throwbackai.app/images/og/90s-yearbook-og.jpg";

  // Structured data for the 90s photo generator
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "90s Yearbook Photo Generator",
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
      "AI-powered 90s photo transformation",
      "Multiple 90s style options (grunge, hip hop, alternative, skater)",
      "Instant photo processing",
      "High-resolution downloads",
      "Authentic 1990s yearbook effects",
      "Grunge and alternative rock aesthetics"
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
      <meta property="og:image:alt" content="90s yearbook photo transformation example showing before and after AI enhancement with grunge effects" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@throwbackai" />
      <meta name="twitter:creator" content="@throwbackai" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content="Transform your photo into totally radical 90s yearbook style with AI" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#800080" />
      <meta name="msapplication-TileColor" content="#800080" />
      <meta name="application-name" content="Throwback AI - 90s Generator" />
      <meta name="apple-mobile-web-app-title" content="90s Photo Generator" />
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
      <meta name="style-categories" content="grunge,hip-hop,alternative,skater,flannel" />
      <meta name="target-audience" content="millennials,gen-x,nostalgia,alternative-music-fans" />
      <meta name="cultural-references" content="nirvana,pearl-jam,tupac,biggie,friends,fresh-prince" />

      {/* Additional 90s cultural context */}
      <meta name="music-genres" content="grunge,alternative-rock,hip-hop,r&b,pop-punk" />
      <meta name="fashion-trends" content="flannel,baggy-jeans,chokers,platform-shoes,backwards-caps" />
      <meta name="tech-nostalgia" content="crt-monitor,floppy-disk,dial-up,aol,cd-rom" />
    </Head>
  );
};

export default NinetiesSEO;