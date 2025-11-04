// pages/index.js
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { Suspense } from 'react';
import HomepageSEO from '../components/SEO/HomepageSEO';

// Critical - Load immediately

import SplitHeroLanding from '../components/newhome/SplitHeroLanding';
import AIDemoShowcase from '../components/newhome/AIDemoShowcase';
import SimplePricingTeaser from '../components/newhome/SimplePricingTeaser';
import SignupBanner from '../components/home/SignupBanner';
import FeatureShowcase from 'components/newhome/FeatureShowcase';

// Below fold - Lazy load
const HowItWorksSection = dynamic(() => import('../components/home/HowItWorksSection'));
const TestimonialsSection = dynamic(() => import('../components/home/TestimonialsSection'));
const PricingTeaser = dynamic(() => import('../components/home/PricingTeaser'));
const FinalCTA = dynamic(() => import('../components/home/FinalCTA'));

const Loader = () => <div className="my-32 text-center text-gray-500">Loading...</div>;

export default function Home() {
  const [demoRef, demoInView] = useInView({ triggerOnce: true, rootMargin: '200px' });
  const [howItWorksRef, howItWorksInView] = useInView({ triggerOnce: true, rootMargin: '200px' });
  const [testimonialsRef, testimonialsInView] = useInView({ triggerOnce: true, rootMargin: '200px' });
  const [pricingRef, pricingInView] = useInView({ triggerOnce: true, rootMargin: '200px' });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, rootMargin: '200px' });

 return (
    <>
      <HomepageSEO />
      
      {/* Hero with ChatGPT comparison */}
      <SplitHeroLanding />

      <main>
        {/* Animated demo showcase */}
        <AIDemoShowcase />

        {/* 🆕 SIMPLE PRICING - Show costs early! */}
        <SimplePricingTeaser />

        {/* Signup banner */}
        <SignupBanner />


        {/* Feature showcase */}
        <FeatureShowcase />
        
    {/* 5. HOW IT WORKS - 3 simple steps (MOVED UP)
<div ref={howItWorksRef}>
  {howItWorksInView && (
    <Suspense fallback={<Loader />}>
      <HowItWorksSection />
    </Suspense>
  )}
</div>
*/}

        

        {/* 8. TESTIMONIALS - User reviews (KEEP) */}
        <div ref={testimonialsRef}>
          {testimonialsInView && (
            <Suspense fallback={<Loader />}>
              <TestimonialsSection />
            </Suspense>
          )}
        </div>
        
        {/* 9. PRICING - Show costs clearly (KEEP) */}
        <div ref={pricingRef}>
          {pricingInView && (
            <Suspense fallback={<Loader />}>
              <PricingTeaser />
            </Suspense>
          )}
        </div>
        
        {/* 10. FINAL CTA - Last chance conversion (KEEP) */}
        <div ref={ctaRef}>
          {ctaInView && (
            <Suspense fallback={<Loader />}>
              <FinalCTA />
            </Suspense>
          )}
        </div>
      </main>
    </>
  );
}