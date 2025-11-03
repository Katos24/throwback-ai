// pages/index.js
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { Suspense } from 'react';
import HomepageSEO from '../components/SEO/HomepageSEO';

// Hero Components
import SplitHeroLanding from '../components/home/SplitHeroLanding';
import AIProcessDemo from '../components/home/AIProcessDemo';
import DemoSection from '../components/home/DemoSection';

// Other Components
import StatsBar from '../components/home/StatsBar';
import FeatureShowcase from '../components/home/FeatureShowcase';
import TestimonialsSection from '../components/home/TestimonialsSection';
import PricingTeaser from '../components/home/PricingTeaser';
import FinalCTA from '../components/home/FinalCTA';
import RestorationCounter from '../components/RestorationCounter';
import HowItWorksSection from '../components/home/HowItWorksSection'

const Loader = () => <div className="my-32 text-center text-gray-500">Loading...</div>;

// Features data for home page showcase
export const HOME_FEATURES = [
  {
    id: 'avatar',
    title: 'AI Avatar Generation',
    tagline: 'Transform Into Any Character',
    description: 'Create stunning AI avatars in fantasy, sci-fi, and historical themes. Perfect for gaming profiles, social media, or just having fun with your imagination.',
    image: '/images/home/elf-warrior.jpg',
    link: '/replicate/avatar',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    accentColor: '#667eea',
    badge: 'MOST POPULAR',
    highlights: [
      'Fantasy wizards, warriors & mythical beings',
      'Sci-fi astronauts, cyborgs & futuristic heroes',
      'Historical figures from any era',
      '30+ unique character styles'
    ],
    credits: '50',
    time: '~45 sec',
    samples: '30+',
    buttonText: 'Create Your Avatar'
  },
  {
    id: 'decades',
    title: 'Decades Time Machine',
    tagline: 'Vintage Yearbook Photos',
    description: 'Step into the 70s disco era, 80s neon dreams, 90s grunge vibes, or Y2K aesthetic. Create authentic vintage yearbook photos that look like they came straight from the past.',
    image: '/images/decades/90s-example.png',
    link: '/decades',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    accentColor: '#f093fb',
    badge: 'TRENDING',
    highlights: [
      '70s disco fever with bell-bottoms & feathered hair',
      '80s neon dreams with big hair & bold fashion',
      '90s grunge era with flannel & alternative vibes',
      'Y2K millennium with low-rise jeans & bling'
    ],
    credits: '50',
    time: '~45 sec',
    samples: '40+',
    buttonText: 'Try Time Machine'
  },
  {
    id: 'restore',
    title: 'Photo Restoration',
    tagline: 'Bring Old Photos Back to Life',
    description: 'Fix damaged, faded, or torn family photos with AI. Remove scratches, enhance clarity, and add realistic color to black & white memories. Perfect for preserving family history.',
    image: '/images/restorehero.jpg',
    link: '/replicate/restore-premium',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    accentColor: '#4facfe',
    badge: 'PRESERVE MEMORIES',
    highlights: [
      'Remove tears, scratches & damage',
      'Enhance blurry or faded photos',
      'Colorize black & white photos realistically',
      'Perfect for genealogy & family archives'
    ],
    credits: '1-40',
    time: '30-90 sec',
    buttonText: 'Restore Photos'
  }
];

export default function Home() {
  const [aiProcessRef, aiProcessInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [demoSectionRef, demoSectionInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [testimonialsRef, testimonialsInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [pricingRef, pricingInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });

  return (
    <>
      <HomepageSEO />
      
      <main>
        {/* 1. Split Hero Landing */}
        <SplitHeroLanding />
        
        <RestorationCounter />

        {/* 2. AI Process Demo - Animated restoration process */}
        <div ref={aiProcessRef}>
          {aiProcessInView && (
            <Suspense fallback={<Loader />}>
              <AIProcessDemo />
            </Suspense>
          )}
        </div>

        {/* 3. Stats Bar */}
        <div ref={statsRef}>
          {statsInView && <Suspense fallback={<Loader />}><StatsBar /></Suspense>}
        </div>

        {/* 4. Demo Section - Interactive sliders */}
        <div ref={demoSectionRef}>
          {demoSectionInView && (
            <Suspense fallback={<Loader />}>
              <DemoSection />
            </Suspense>
          )}
        </div>

        {/* 5. Feature Showcase - Avatar & Decades */}
        <div ref={featuresRef}>
          {featuresInView && (
            <Suspense fallback={<Loader />}>
              <FeatureShowcase features={HOME_FEATURES} />
            </Suspense>
          )}
        </div>

    
        {/* 6. Testimonials */}
        <div ref={testimonialsRef}>
          {testimonialsInView && <Suspense fallback={<Loader />}><TestimonialsSection /></Suspense>}
        </div>

        {/* 7. Pricing Teaser */}
        <div ref={pricingRef}>
          {pricingInView && <Suspense fallback={<Loader />}><PricingTeaser /></Suspense>}
        </div>

    {/* 5. How it works section*/}
                      <HowItWorksSection />


        {/* 8. Final CTA */}
        <div ref={ctaRef}>
          {ctaInView && <Suspense fallback={<Loader />}><FinalCTA /></Suspense>}
        </div>
      </main>
    </>
  );
}