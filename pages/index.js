// pages/index.js
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { Suspense } from 'react';
import HomepageSEO from '../components/SEO/HomepageSEO';

// Lazy-load sections - Updated order with DecadesSection moved up
const HeroGridLanding = dynamic(() => import('../components//home/HeroGridLanding'));
const TopBanner = dynamic(() => import('../components/home/TopBanner'));
const DecadesSection = dynamic(() => import('../components/home/DecadesSection')); // MOVED UP
const FeaturesSection = dynamic(() => import('../components/home/FeaturesSection')); 
const DemoSection = dynamic(() => import('../components/home/DemoSection')); // Modern AI demo section
const CustomerSuccess = dynamic(() => import('../components/home/SuccessStories'));
const HowItWorks = dynamic(() => import('../components/home/HowItWorksSection'));
const PricingSection = dynamic(() => import('../components/home/PricingSection'));
const CTASection = dynamic(() => import('../components/home/CTASection'));

// Loader fallback
const Loader = () => <div className="my-32 text-center text-gray-500">Loading...</div>;

export default function Home() {
  // Intersection Observers - Reordered to match new layout
  const [heroGridRef, heroGridInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [topBannerRef, topBannerInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [decadesRef, decadesInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' }); // MOVED UP
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [demoSectionRef, demoSectionInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' }); 
  const [successRef, successInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [howItWorksRef, howItWorksInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [pricingRef, pricingInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });

  return (
    <>
      {/* SEO Component with all restoration + decades keywords */}
      <HomepageSEO />

      <main>
        {/* 1. Hero Grid Landing */}
        <div ref={heroGridRef}>
          {heroGridInView && <Suspense fallback={<Loader />}><HeroGridLanding /></Suspense>}
        </div>

        {/* 2. Top Banner */}
        <div ref={topBannerRef}>
          {topBannerInView && <Suspense fallback={<Loader />}><TopBanner /></Suspense>}
        </div>

        {/* 3. Decades Section - Time Travel Transformations (MOVED UP) */}
        <div ref={decadesRef}>
          {decadesInView && <Suspense fallback={<Loader />}><DecadesSection /></Suspense>}
        </div>

        {/* 4. Features Section - Your enhanced features */}
        <div ref={featuresRef} id="features">
          {featuresInView && <Suspense fallback={<Loader />}><FeaturesSection /></Suspense>}
        </div>

        {/* 5. Modern AI Demo Section */}
        <div ref={demoSectionRef}>
          {demoSectionInView && <Suspense fallback={<Loader />}><DemoSection /></Suspense>}
        </div>

        {/* 6. Customer Success */}
        <div ref={successRef}>
          {successInView && <Suspense fallback={<Loader />}><CustomerSuccess /></Suspense>}
        </div>

        {/* 7. How It Works */}
        <div ref={howItWorksRef}>
          {howItWorksInView && <Suspense fallback={<Loader />}><HowItWorks /></Suspense>}
        </div>

        {/* 8. Pricing Section */}
        <div ref={pricingRef}>
          {pricingInView && <Suspense fallback={<Loader />}><PricingSection /></Suspense>}
        </div>

        {/* 9. CTA Section */}
        <div ref={ctaRef}>
          {ctaInView && <Suspense fallback={<Loader />}><CTASection /></Suspense>}
        </div>
      </main>
    </>
  );
}