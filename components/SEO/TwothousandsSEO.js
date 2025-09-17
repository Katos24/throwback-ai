// components/seo/TwothousandsSEO.js
import Head from "next/head";

const TwothousandsSEO = ({ 
  customTitle = null,
  customDescription = null,
  customKeywords = null,
  ogImage = null,
  canonicalUrl = "https://throwbackai.app/replicate/2000s"
}) => {
  const defaultTitle = "2000s Yearbook Photo Generator | Throwback AI - Create Y2K Era Style Photos";
  const defaultDescription = "Transform your photo into an authentic 2000s yearbook photo with AI. Choose from emo, scene, pop punk, and hipster styles. Create Y2K millennium photos in seconds with vintage 2000s effects.";
  const defaultKeywords = "2000s photo generator, Y2K yearbook photos, retro photo AI, vintage photo effects, emo photo style, scene kid photos, 2000s fashion generator, Y2K photo maker, millennium AI, retro yearbook creator, vintage portrait generator, 2000s style transformation, pop punk aesthetic, early 2000s nostalgia";

  const title = customTitle || defaultTitle;
  const description = customDescription || defaultDescription;
  const keywords = customKeywords || defaultKeywords;
  const imageUrl = ogImage || "https://throwbackai.app/images/og/2000s-yearbook-og.jpg";

  // Structured data for the 2000s photo generator
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "2000s Yearbook Photo Generator",
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
      "AI-powered 2000s photo transformation",
      "Multiple Y2K style options (emo, scene, pop punk, hipster)",
      "Instant photo processing",
      "High-resolution downloads",
      "Authentic 2000s yearbook effects",
      "Y2K millennium aesthetic"
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
      <meta property="og:image:alt" content="2000s yearbook photo transformation example showing before and after AI enhancement with Y2K effects" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@throwbackai" />
      <meta name="twitter:creator" content="@throwbackai" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content="Transform your photo into Y2K millennium 2000s yearbook style with AI" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#00CED1" />
      <meta name="msapplication-TileColor" content="#00CED1" />
      <meta name="application-name" content="Throwback AI - 2000s Generator" />
      <meta name="apple-mobile-web-app-title" content="2000s Photo Generator" />
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
      <link rel="preload" href="/fonts/y2k-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/images/windows-xp-ui.png" as="image" />
      <link rel="preload" href="/images/y2k-wallpaper.jpg" as="image" />

      {/* DNS Prefetch for External Resources */}
      <link rel="dns-prefetch" href="//replicate.com" />
      <link rel="dns-prefetch" href="//supabase.co" />
      
      {/* Favicon Links */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* 2000s-specific meta for enhanced discoverability */}
      <meta name="decade" content="2000s" />
      <meta name="era" content="y2k,millennium,early-2000s" />
      <meta name="style-categories" content="emo,scene,pop-punk,hipster,y2k-fashion" />
      <meta name="target-audience" content="millennials,gen-z,nostalgia,emo-revival,scene-kids" />
      <meta name="cultural-references" content="myspace,aim,limewire,friendster,ipod,flip-phones" />

      {/* Y2K aesthetic and tech nostalgia */}
      <meta name="music-genres" content="emo,pop-punk,nu-metal,early-hip-hop,bubblegum-pop" />
      <meta name="fashion-trends" content="low-rise-jeans,trucker-hats,popcorn-shirts,butterfly-clips,frosted-tips" />
      <meta name="tech-nostalgia" content="windows-xp,dial-up,cd-burning,mp3-players,digital-cameras" />
      <meta name="social-platforms" content="myspace,friendster,livejournal,aim,msn-messenger" />

      {/* Additional Y2K context for search engines */}
      <meta name="millennium-bug" content="y2k-celebration,new-millennium,turn-of-century" />
      <meta name="early-internet" content="web-1.0,geocities,flash-animation,animated-gifs" />
    </Head>
  );
};

export default TwothousandsSEO;