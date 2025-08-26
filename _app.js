// pages/_app.js
import Head from "next/head";
import ScrollToTop from "../components/ScrollToTop";
import "../styles/globals.css"; // Import global CSS

export default function MyApp({ Component, pageProps }) {
  const defaultTitle = "Throwback AI – Advanced AI Photo Restoration & Enhancement Suite";
  const defaultDescription = 
    "Transform your vintage photos with Throwback AI's powerful suite. Restore damaged photos, add stunning colors to black & white images, and create cartoon art. Professional AI-powered photo restoration, colorization, and creative effects.";
  const defaultUrl = "https://throwbackai.app";
  const defaultImage = "https://throwbackai.app/images/greek-after.png";
  const keywords = "AI photo restoration, photo colorization, vintage photo repair, black and white colorization, AI photo enhancement, cartoon creator, photo damage repair, old photo restoration, AI art generator";

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{defaultTitle}</title>
        <meta name="description" content={defaultDescription} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Enhanced SEO Meta Tags */}
        <meta name="author" content="Throwback AI" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={defaultUrl} />
        <meta property="og:title" content={defaultTitle} />
        <meta property="og:description" content={defaultDescription} />
        <meta property="og:image" content={defaultImage} />
        <meta property="og:image:alt" content="Before and after example of AI photo restoration by Throwback AI" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Throwback AI" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={defaultUrl} />
        <meta name="twitter:title" content={defaultTitle} />
        <meta name="twitter:description" content={defaultDescription} />
        <meta name="twitter:image" content={defaultImage} />
        <meta name="twitter:image:alt" content="AI-powered photo restoration and enhancement results" />
        <meta name="twitter:site" content="@ThrowbackAI" />
        <meta name="twitter:creator" content="@ThrowbackAI" />
        
        {/* Additional Meta Tags for AI/Tech */}
        <meta name="application-name" content="Throwback AI" />
        <meta name="apple-mobile-web-app-title" content="Throwback AI" />
        <meta name="theme-color" content="#00d4ff" />
        <meta name="msapplication-TileColor" content="#00d4ff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={defaultUrl} />
        
        {/* Preload Critical Resources */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" as="style" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Structured Data for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Throwback AI",
              "description": defaultDescription,
              "url": defaultUrl,
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1250"
              },
              "creator": {
                "@type": "Organization",
                "name": "Throwback AI",
                "url": defaultUrl
              },
              "featureList": [
                "AI Photo Restoration",
                "Photo Colorization",
                "Cartoon Art Creator",
                "Vintage Photo Enhancement",
                "Damage Repair",
                "Black & White Colorization"
              ],
              "screenshot": defaultImage,
              "softwareVersion": "2.0",
              "datePublished": "2024-01-01",
              "dateModified": "2025-01-01"
            })
          }}
        />
        
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Throwback AI",
              "url": defaultUrl,
              "logo": `${defaultUrl}/logo.png`,
              "description": "Leading AI-powered photo restoration and enhancement platform",
              "founder": "Throwback AI Team",
              "foundingDate": "2024",
              "industry": "Artificial Intelligence",
              "numberOfEmployees": "10-50",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              },
              "sameAs": [
                "https://twitter.com/ThrowbackAI",
                "https://linkedin.com/company/throwback-ai",
                "https://instagram.com/throwbackai"
              ]
            })
          }}
        />
      </Head>
      <Component {...pageProps} />
      <ScrollToTop />
    </>
  );
}