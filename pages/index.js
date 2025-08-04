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
  return (
    <main>
     <HeroSection />
     <TopBanner />
      <FeaturesSection />
      <HowItWorks />
      <CustomerSuccess />
      <AiShowcase />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
