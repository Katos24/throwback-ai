// pages/index.js
import Head from 'next/head';
import HeroSection from '../components/home/HeroSection';
import TopBanner from '../components/home/TopBanner';
import FeaturesSection from '../components/home/FeaturesSection';
import CustomerSuccess from '../components/home/SuccessStories';
import HowItWorks from '../components/home/HowItWorksSection';
import PricingSection from '../components/home/PricingSection';
import CTASection from '../components/home/CTASection';
import TestHeroSection from '../components/home/Testhero';


export default function Home() {
  const siteUrl = 'https://throwbackai.app';
  const pagePath = '/';
  const pageUrl = `${siteUrl}${pagePath}`;
  const ogImage = `${siteUrl}/images/throwback-ai.jpg`; // hero/share image
  const twitterImage = `${siteUrl}/images/throwback-ai.jpg`;
  const facebookPageUrl = 'https://www.facebook.com/profile.php?id=61578072554521';
  const facebookPageId = '61578072554521';

  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>Throwback AI — AI Photo Restoration, Colorization & Cartoon Creation</title>
        <meta
          name="description"
          content="Transform your vintage photos with 3 powerful AI engines: restore damaged photos, add historically accurate colors, or create cartoon artwork. Fast, secure, and professional results."
        />
        <meta name="keywords" content="AI photo restoration, photo colorization, cartoon creator, vintage photo repair, photo enhancement, family memories, genealogy photos" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph (Facebook + general) */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Throwback AI" />
        <meta property="og:title" content="Throwback AI — AI Photo Restoration, Colorization & Cartoon Creation" />
        <meta
          property="og:description"
          content="Transform your vintage photos with 3 powerful AI engines: restore damaged photos, add historically accurate colors, or create cartoon artwork. Fast, secure, and professional results."
        />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="AI-powered photo transformation examples by Throwback AI" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Facebook-specific links */}
        <meta property="fb:pages" content={facebookPageId} />
        <meta property="article:publisher" content={facebookPageUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Throwback AI — AI Photo Restoration, Colorization & Cartoon Creation" />
        <meta
          name="twitter:description"
          content="Transform your vintage photos with 3 powerful AI engines: restore damaged photos, add historically accurate colors, or create cartoon artwork."
        />
        <meta name="twitter:image" content={twitterImage} />

        {/* Optional: theme color */}
        <meta name="theme-color" content="#111827" />

        {/* Structured data (JSON-LD): WebSite + WebPage + Publisher */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}#website`,
                  "url": siteUrl,
                  "name": "Throwback AI",
                  "description": "AI-powered tools to restore, colorize, and transform vintage photos into modern artwork.",
                  "publisher": {
                    "@type": "Organization",
                    "name": "Throwback AI",
                    "url": siteUrl,
                    "sameAs": [
                      facebookPageUrl
                    ]
                  }
                },
                {
                  "@type": "WebPage",
                  "@id": `${pageUrl}#webpage`,
                  "url": pageUrl,
                  "name": "Throwback AI — Transform Your Vintage Photos",
                  "isPartOf": { "@id": `${siteUrl}#website` },
                  "description": "Transform your vintage photos with 3 powerful AI engines: restore damaged photos, add historically accurate colors, or create cartoon artwork. Fast, secure, and professional results."
                },
                {
                  "@type": "Service",
                  "name": "AI Photo Restoration",
                  "description": "Professional photo restoration service using advanced AI to repair damage, enhance quality, and preserve family memories.",
                  "provider": {
                    "@type": "Organization",
                    "name": "Throwback AI"
                  },
                  "serviceType": "Photo Restoration",
                  "hasOfferingCatalog": {
                    "@type": "OfferingCatalog",
                    "name": "AI Photo Services",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Photo Restoration",
                          "description": "Repair scratches, tears, and fading in vintage photos"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Photo Colorization",
                          "description": "Add historically accurate colors to black and white photos"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Cartoon Creator",
                          "description": "Transform photos into professional cartoon artwork"
                        }
                      }
                    ]
                  }
                }
              ]
            }),
          }}
        />
      </Head>

      <main>
        {/* Updated Hero with streamlined value prop */}
        <TestHeroSection />
        <HeroSection />
        
        {/* AI Transformation Showcase - your updated TopBanner */}
        <TopBanner />
        
        {/* What Makes Us Different - updated with cartoon features */}
        <FeaturesSection />
        
        {/* Customer Success Stories - your rebuilt section with filtering */}
        <CustomerSuccess />

        {/* How It Works - process explanation */}
        <HowItWorks />
        
        {/* Pricing - transparent pricing */}
        <PricingSection />
        
        {/* Final CTA */}
        <CTASection />
      </main>
    </>
  );
}