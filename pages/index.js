// pages/index.js
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { Suspense } from 'react';

// Lazy-load sections
const HeroSection = dynamic(() => import('../components/home/HeroSection'));
const TopBanner = dynamic(() => import('../components/home/TopBanner'));
const FeaturesSection = dynamic(() => import('../components/home/FeaturesSection'));
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
  const [heroRef, heroInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [topBannerRef, topBannerInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [socialHeroRef, socialHeroInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [successRef, successInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [howItWorksRef, howItWorksInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [pricingRef, pricingInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });

  return (
    <>
      <Head>
        {/* Primary SEO - Updated for Social/Viral Focus */}
        <title>Create Viral AI Content — Avatar Creator, 90s Yearbook & More | Throwback AI</title>
        <meta name="description" content="Create viral social media content with AI! Generate stunning avatars (50 credits), nostalgic 90s yearbook photos (20 credits), and more. Perfect for TikTok, Instagram & sharing with friends." />
        <meta name="keywords" content="AI avatar creator, 90s yearbook photos, viral social media content, AI profile pictures, retro photo generator, TikTok content, Instagram photos, social sharing" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph - Updated for Social Appeal */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Throwback AI" />
        <meta property="og:title" content="Create Viral AI Content — Avatar Creator, 90s Yearbook & More" />
        <meta property="og:description" content="Create viral social media content with AI! Generate stunning avatars, nostalgic 90s yearbook photos, and more. Perfect for TikTok, Instagram & sharing with friends." />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="AI-powered viral content creation examples by Throwback AI" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Facebook-specific */}
        <meta property="fb:pages" content={facebookPageId} />
        <meta property="article:publisher" content={facebookPageUrl} />

        {/* Twitter - Updated for Social Appeal */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Create Viral AI Content — Avatar Creator, 90s Yearbook & More" />
        <meta name="twitter:description" content="Create viral social media content with AI! Generate stunning avatars, nostalgic 90s yearbook photos, and more. Perfect for sharing!" />
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
                  "description": "AI-powered tools to create viral social media content, avatars, and nostalgic photo transformations.",
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
                  "name": "Throwback AI — Create Viral AI Content",
                  "isPartOf": { "@id": `${siteUrl}#website` },
                  "description": "Create viral social media content with AI! Generate stunning avatars, nostalgic 90s yearbook photos, and more. Perfect for TikTok, Instagram & sharing with friends."
                },
                {
                  "@type": "Service",
                  "name": "AI Content Creator",
                  "description": "Professional AI content creation service for social media, avatars, and viral photo transformations.",
                  "provider": {
                    "@type": "Organization",
                    "name": "Throwback AI"
                  },
                  "serviceType": "AI Content Creation",
                  "hasOfferingCatalog": {
                    "@type": "OfferingCatalog",
                    "name": "AI Social Media Services",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": { "@type": "Service", "name": "AI Avatar Creator", "description": "Create stunning AI avatars perfect for social media profiles and viral content" }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": { "@type": "Service", "name": "90s Yearbook Photos", "description": "Transform photos into nostalgic 90s yearbook style that goes viral on social media" }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": { "@type": "Service", "name": "Photo Restoration", "description": "Restore vintage photos for sharing precious family memories" }
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
        {/* Original Hero Section - Keep or Replace */}
        <div ref={heroRef}>
          {heroInView && <Suspense fallback={<Loader />}><HeroSection /></Suspense>}
        </div>

        {/* Top Banner */}
        <div ref={topBannerRef}>
          {topBannerInView && <Suspense fallback={<Loader />}><TopBanner /></Suspense>}
        </div>

        {/* Features Section */}
        <div ref={featuresRef}>
          {featuresInView && <Suspense fallback={<Loader />}><FeaturesSection /></Suspense>}
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