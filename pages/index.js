// pages/index.js
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { Suspense } from 'react';
import HomepageSEO from '../components/SEO/HomepageSEO';

// NEW - Split Hero for testing
const SplitHeroLanding = dynamic(() => import('../components/home/SplitHeroLanding'));

// Lazy-load sections - Reordered with Success Stories moved up
const CustomerSuccess = dynamic(() => import('../components/home/SuccessStories')); // #2
const AutoScrollCarousel = dynamic(() => import('../components/home/AutoScrollCarousel')); // NEW - #3
const TopBanner = dynamic(() => import('../components/home/TopBanner')); // Technical restoration demo
const DecadesSection = dynamic(() => import('../components/home/DecadesSection')); 
const FeaturesSection = dynamic(() => import('../components/home/FeaturesSection')); 
const DemoSection = dynamic(() => import('../components/home/DemoSection')); 
const HowItWorks = dynamic(() => import('../components/home/HowItWorksSection'));
const PricingSection = dynamic(() => import('../components/home/PricingSection'));
const CTASection = dynamic(() => import('../components/home/CTASection'));

// Loader fallback
const Loader = () => <div className="my-32 text-center text-gray-500">Loading...</div>;

export default function Home() {
  // Intersection Observers
  const [splitHeroRef, splitHeroInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' }); // NEW
  const [successRef, successInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [carouselRef, carouselInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [topBannerRef, topBannerInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [decadesRef, decadesInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [demoSectionRef, demoSectionInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' }); 
  const [howItWorksRef, howItWorksInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [pricingRef, pricingInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });

  return (
    <>
      {/* SEO Component with all restoration + decades keywords */}
      <HomepageSEO />

      <main>
        {/* NEW - Split Hero Landing - Testing new layout */}
        <div ref={splitHeroRef}>
          {splitHeroInView && <Suspense fallback={<Loader />}><SplitHeroLanding /></Suspense>}
        </div>



        {/* 2. Customer Success Stories - Immediate social proof with tabs */}
        <div ref={successRef}>
          {successInView && <Suspense fallback={<Loader />}><CustomerSuccess /></Suspense>}
        </div>

        {/* 3. Auto-Scrolling Photo Carousel - Visual showcase */}
        <div ref={carouselRef}>
          {carouselInView && <Suspense fallback={<Loader />}><AutoScrollCarousel /></Suspense>}
        </div>

        {/* 4. Top Banner - Technical restoration demo (how AI works) */}
        <div ref={topBannerRef}>
          {topBannerInView && <Suspense fallback={<Loader />}><TopBanner /></Suspense>}
        </div>

        {/* 5. Decades Section - Deep dive into each decade */}
        <div ref={decadesRef}>
          {decadesInView && <Suspense fallback={<Loader />}><DecadesSection /></Suspense>}
        </div>

        {/* 6. Features Section */}
        <div ref={featuresRef} id="features">
          {featuresInView && <Suspense fallback={<Loader />}><FeaturesSection /></Suspense>}
        </div>

        {/* 7. Demo Section */}
        <div ref={demoSectionRef}>
          {demoSectionInView && <Suspense fallback={<Loader />}><DemoSection /></Suspense>}
        </div>

        {/* 8. How It Works */}
        <div ref={howItWorksRef}>
          {howItWorksInView && <Suspense fallback={<Loader />}><HowItWorks /></Suspense>}
        </div>

        {/* 9. Pricing Section */}
        <div ref={pricingRef}>
          {pricingInView && <Suspense fallback={<Loader />}><PricingSection /></Suspense>}
        </div>

        {/* 10. CTA Section */}
        <div ref={ctaRef}>
          {ctaInView && <Suspense fallback={<Loader />}><CTASection /></Suspense>}
        </div>
      </main>
    </>
  );
}