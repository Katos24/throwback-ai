// pages/index.js
import Head from 'next/head';
import HeroSection from '../components/home/HeroSection';
import TopBanner from '../components/home/TopBanner';
import ImageCompare from '../components/home/ImageCompareSection';
import FeaturesSection from '../components/home/FeaturesSection';
import HowItWorks from '../components/home/HowItWorksSection';
import AiShowcase from '../components/home/AIShowcaseSection';
import PricingSection from '../components/home/PricingSection';
import CustomerSuccess from '../components/home/SuccessStories';
import FAQSection from '../components/home/FAQSection';
import CTASection from '../components/home/CTASection';

export default function Home() {
  const siteUrl = 'https://throwbackai.app';
  const pagePath = '/';
  const pageUrl = `${siteUrl}${pagePath}`;
  const ogImage = `${siteUrl}/images/greek-after.png`; // hero/share image
  const twitterImage = `${siteUrl}/images/greek-after.png`;
  const facebookPageUrl = 'https://www.facebook.com/profile.php?id=61578072554521';
  const facebookPageId = '61578072554521';

  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>Throwback AI — AI Photo Restoration, Colorization & Enhancement</title>
        <meta
          name="description"
          content="Restore, enhance and colorize your vintage photos with Throwback AI. Fast AI-powered photo restoration to remove scratches, improve clarity, and bring old memories back to life."
        />
        <meta name="keywords" content="photo restoration, colorize photos, AI photo restore, vintage photo repair, photo enhancement" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph (Facebook + general) */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Throwback AI" />
        <meta property="og:title" content="Throwback AI — AI Photo Restoration, Colorization & Enhancement" />
        <meta
          property="og:description"
          content="Restore, enhance and colorize your vintage photos with Throwback AI. Fast AI-powered photo restoration to remove scratches, improve clarity, and bring old memories back to life."
        />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Example of restored photo by Throwback AI" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Facebook-specific links */}
        <meta property="fb:pages" content={facebookPageId} />
        <meta property="article:publisher" content={facebookPageUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Throwback AI — AI Photo Restoration, Colorization & Enhancement" />
        <meta
          name="twitter:description"
          content="Restore, enhance and colorize your vintage photos with Throwback AI. Fast AI-powered photo restoration to remove scratches, improve clarity, and bring old memories back to life."
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
                  "description": "AI-powered tools to restore, enhance and colorize vintage photos.",
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
                  "name": "Throwback AI — Home",
                  "isPartOf": { "@id": `${siteUrl}#website` },
                  "description": "Restore, enhance and colorize vintage photos with Throwback AI. Fast AI-powered photo restoration to remove scratches, improve clarity, and bring old memories back to life."
                }
              ]
            }),
          }}
        />
      </Head>

      <main>
        <HeroSection />
        <TopBanner />
        <CustomerSuccess />
        <FeaturesSection />
        <HowItWorks />
        <PricingSection />
        <AiShowcase />
        <FAQSection />
        <CTASection />
      </main>
    </>
  );
}
