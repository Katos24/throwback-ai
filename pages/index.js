// pages/index.js
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { Suspense } from 'react';

// Lazy-load sections - Updated to use DemoSection
const HeroGridLanding = dynamic(() => import('../components//home/HeroGridLanding'));
const TopBanner = dynamic(() => import('../components/home/TopBanner'));
const FeaturesSection = dynamic(() => import('../components/home/FeaturesSection')); 
const DemoSection = dynamic(() => import('../components/home/DemoSection')); // Modern AI demo section
const CustomerSuccess = dynamic(() => import('../components/home/SuccessStories'));
const HowItWorks = dynamic(() => import('../components/home/HowItWorksSection'));
const PricingSection = dynamic(() => import('../components/home/PricingSection'));
const CTASection = dynamic(() => import('../components/home/CTASection'));

// Loader fallback
const Loader = () => <div className="my-32 text-center text-gray-500">Loading...</div>;

export default function Home() {
  const siteUrl = 'https://throwbackai.app';
  const pagePath = '/';
  const pageUrl = `${siteUrl}${pagePath}`;
  const ogImage = `${siteUrl}/images/throwback-ai.jpg`;
  const twitterImage = `${siteUrl}/images/throwback-ai.jpg`;
  const facebookPageUrl = 'https://www.facebook.com/profile.php?id=61578072554521';
  const facebookPageId = '61578072554521';

  // Intersection Observers
  const [heroGridRef, heroGridInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [topBannerRef, topBannerInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [demoSectionRef, demoSectionInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' }); 
  const [successRef, successInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [howItWorksRef, howItWorksInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [pricingRef, pricingInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });

  return (
    <>
      <Head>
        {/* Primary SEO - Updated for Social/Viral Focus */}
        <title>Transform Any Photo Into Something Amazing | Throwback AI</title>
        <meta name="description" content="Transform photos instantly with AI! Restore family memories, create viral avatars, add historical colors, and make cartoon art. From preserving the past to reimagining the present." />
        <meta name="keywords" content="AI photo transformation, photo restoration, AI colorization, avatar creator, cartoon art, 90s yearbook photos, family photo repair, AI image editing" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph - Updated for Broader Appeal */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Throwback AI" />
        <meta property="og:title" content="Transform Any Photo Into Something Amazing | Throwback AI" />
        <meta property="og:description" content="Transform photos instantly with AI! Restore family memories, create viral avatars, add historical colors, and make cartoon art. From preserving the past to reimagining the present." />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="AI photo transformations - before and after examples by Throwback AI" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Facebook-specific */}
        <meta property="fb:pages" content={facebookPageId} />
        <meta property="article:publisher" content={facebookPageUrl} />

        {/* Twitter - Updated for Broader Appeal */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Transform Any Photo Into Something Amazing" />
        <meta name="twitter:description" content="Transform photos instantly with AI! Restore family memories, create viral avatars, add historical colors, and make cartoon art." />
        <meta name="twitter:image" content={twitterImage} />

        {/* Theme color */}
        <meta name="theme-color" content="#111827" />

        {/* Structured data (JSON-LD) - Updated */}
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
                  "description": "AI-powered photo transformation tools for restoring memories and creating viral content.",
                  "publisher": {
                    "@type": "Organization",
                    "name": "Throwback AI",
                    "url": siteUrl,
                    "sameAs": [facebookPageUrl]
                  }
                },
                {
                  "@type": "WebPage",
                  "@id": `${pageUrl}#webpage`,
                  "url": pageUrl,
                  "name": "Transform Any Photo Into Something Amazing | Throwback AI",
                  "isPartOf": { "@id": `${siteUrl}#website` },
                  "description": "Transform photos instantly with AI! Restore family memories, create viral avatars, add historical colors, and make cartoon art."
                },
                {
                  "@type": "Service",
                  "name": "AI Photo Transformation",
                  "description": "Professional AI photo transformation services for family restoration and creative content creation.",
                  "provider": {
                    "@type": "Organization",
                    "name": "Throwback AI"
                  },
                  "serviceType": "AI Photo Processing",
                  "hasOfferingCatalog": {
                    "@type": "OfferingCatalog",
                    "name": "Photo Transformation Services",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": { "@type": "Service", "name": "Photo Restoration", "description": "Repair damaged family photos and restore faded memories" }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": { "@type": "Service", "name": "Historical Colorization", "description": "Add historically accurate colors to black and white photos" }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": { "@type": "Service", "name": "Creative Transformations", "description": "Create cartoons, avatars, and artistic transformations" }
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
        {/* Hero Grid Landing */}
        <div ref={heroGridRef}>
          {heroGridInView && <Suspense fallback={<Loader />}><HeroGridLanding /></Suspense>}
        </div>

        {/* Top Banner */}
        <div ref={topBannerRef}>
          {topBannerInView && <Suspense fallback={<Loader />}><TopBanner /></Suspense>}
        </div>

        {/* Features Section - Your enhanced features */}
        <div ref={featuresRef} id="features">
          {featuresInView && <Suspense fallback={<Loader />}><FeaturesSection /></Suspense>}
        </div>

        {/* Modern AI Demo Section */}
        <div ref={demoSectionRef}>
          {demoSectionInView && <Suspense fallback={<Loader />}><DemoSection /></Suspense>}
        </div>

        {/* Customer Success */}
        <div ref={successRef}>
          {successInView && <Suspense fallback={<Loader />}><CustomerSuccess /></Suspense>}
        </div>

        {/* How It Works */}
        <div ref={howItWorksRef}>
          {howItWorksInView && <Suspense fallback={<Loader />}><HowItWorks /></Suspense>}
        </div>

        {/* Pricing Section */}
        <div ref={pricingRef}>
          {pricingInView && <Suspense fallback={<Loader />}><PricingSection /></Suspense>}
        </div>

        {/* CTA Section */}
        <div ref={ctaRef}>
          {ctaInView && <Suspense fallback={<Loader />}><CTASection /></Suspense>}
        </div>
      </main>
    </>
  );
}