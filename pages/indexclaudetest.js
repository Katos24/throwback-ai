import React from 'react';
import Head from 'next/head';
import Hero from '../components/newhome/hero';
import Features from '../components/newhome/features';

export default function NewHomePage() {
  // SEO values
  const siteUrl = 'https://throwbackai.app';
  const pageUrl = siteUrl;
  const ogImage = `${siteUrl}/images/throwback-ai-og.png`;
  const facebookPageUrl = 'https://www.facebook.com/profile.php?id=61578072554521';
  const facebookPageId = '61578072554521';

  return (
    <>
      <Head>
        <title>Throwback AI - Transform Your Memories with AI-Powered Photo Magic</title>
        <meta
          name="description"
          content="Restore old photos, create vibrant colorizations, and transform images into 90s cartoon style with Throwback AI. Professional AI-powered photo enhancement and creative transformations."
        />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph */}
        <meta property="og:title" content="Throwback AI - Transform Your Memories with AI-Powered Photo Magic" />
        <meta
          property="og:description"
          content="Restore old photos, create vibrant colorizations, and transform images into 90s cartoon style with Throwback AI. Professional AI-powered photo enhancement and creative transformations."
        />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Throwback AI - AI-powered photo restoration and creative transformations" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Throwback AI" />

        {/* Facebook-specific */}
        <meta property="fb:pages" content={facebookPageId} />
        <meta property="article:publisher" content={facebookPageUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Throwback AI - Transform Your Memories with AI-Powered Photo Magic" />
        <meta
          name="twitter:description"
          content="Restore old photos, create vibrant colorizations, and transform images into 90s cartoon style with Throwback AI. Professional AI-powered photo enhancement and creative transformations."
        />
        <meta name="twitter:image" content={ogImage} />

        {/* Additional Meta Tags */}
        <meta name="keywords" content="AI photo restoration, photo colorization, cartoon style, vintage photos, old photo repair, AI image enhancement, throwback photos, photo transformation" />
        <meta name="author" content="Throwback AI" />
        <meta name="robots" content="index, follow" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />

        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Throwback AI",
              "url": pageUrl,
              "applicationCategory": "Photo Editing",
              "operatingSystem": "Web",
              "description": "AI-powered photo restoration, colorization, and creative transformations. Transform your memories with professional-quality results.",
              "image": ogImage,
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "50000"
              },
              "offers": [
                {
                  "@type": "Offer",
                  "name": "Photo Restoration",
                  "description": "Basic AI-powered photo restoration",
                  "price": "10",
                  "priceCurrency": "credits"
                },
                {
                  "@type": "Offer", 
                  "name": "Premium Colorization",
                  "description": "Advanced AI colorization and restoration",
                  "price": "40", 
                  "priceCurrency": "credits"
                },
                {
                  "@type": "Offer",
                  "name": "90s Cartoon Style",
                  "description": "Transform photos into nostalgic cartoon portraits",
                  "price": "5",
                  "priceCurrency": "credits"
                }
              ],
              "publisher": {
                "@type": "Organization",
                "name": "Throwback AI",
                "url": siteUrl,
                "logo": {
                  "@type": "ImageObject",
                  "url": `${siteUrl}/images/logo.png`
                },
                "sameAs": [facebookPageUrl]
              },
              "potentialAction": {
                "@type": "UseAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${siteUrl}/restore`,
                  "inLanguage": "en-US",
                  "actionPlatform": [
                    "http://schema.org/DesktopWebPlatform",
                    "http://schema.org/MobileWebPlatform"
                  ]
                }
              }
            }),
          }}
        />
      </Head>

      <main>
        {/* Hero Section */}
        <Features />
        <Hero />
        
        
        {/* Placeholder for additional sections */}
        {/* 
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <CallToAction />
        <Footer />
        */}
      </main>
    </>
  );
}