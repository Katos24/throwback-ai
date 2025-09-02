import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ImageCompareSlider from "../ImageCompareSlider";
import heroStyles from '../../styles/Hero.module.css';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero carousel data - your best transformations
  const heroSlides = [
    {
      id: 'restore',
      headline: "Restore Damaged Family Photos",
      subline: "Repair scratches, tears, and fading from irreplaceable memories",
      beforeAfter: {
        before: "/images/basicpage-before.jpg",
        after: "/images/basicpage-after.jpg"
      },
      cta: "Try Free Restoration",
      link: "/replicate/restore-basic",
      badge: "Most Popular"
    },
    {
      id: 'colorize',
      headline: "Bring Black & White Photos to Life",
      subline: "Watch your ancestors come alive with historically accurate colors",
      beforeAfter: {
        before: "/images/before6.jpg",
        after: "/images/after6.jpg"
      },
      cta: "Add Color Now",
      link: "/replicate/restore-premium",
      badge: "AI Powered"
    },
    {
      id: 'cartoon',
      headline: "Transform Into Stunning Cartoon Art",
      subline: "Perfect for gifts, social media, or just having fun",
      beforeAfter: {
        before: "/images/cartoon-before.jpg",
        after: "/images/cartoon-example.jpg"
      },
      cta: "Make Cartoon",
      link: "/replicate/cartoon",
      badge: "Trending"
    }
  ];

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className={heroStyles.hero}>
      {/* Background Elements */}
      <div className={heroStyles.backgroundGrid}></div>
      <div className={heroStyles.gradientOrb}></div>
      
      <div className={heroStyles.heroContainer}>
        {/* Main Content */}
        <div className={heroStyles.heroContent}>
          {/* Left Side - Text Content */}
          <div className={heroStyles.heroText}>
            {/* Badge */}
            <div className={heroStyles.heroBadge}>
              <span className={heroStyles.badgeIcon}>✨</span>
              {currentSlideData.badge}
            </div>

            {/* Dynamic Headlines */}
            <h1 className={heroStyles.heroTitle}>
              <span className={heroStyles.slideText} key={currentSlide}>
                {currentSlideData.headline}
              </span>
            </h1>
            
            <p className={heroStyles.heroSubtitle}>
              <span className={heroStyles.slideText} key={`sub-${currentSlide}`}>
                {currentSlideData.subline}
              </span>
            </p>

            {/* CTA Button */}
            <div className={heroStyles.heroActions}>
              <Link href={currentSlideData.link} className={heroStyles.primaryCTA}>
                {currentSlideData.cta}
                <span className={heroStyles.ctaArrow}>→</span>
              </Link>
              
              <Link href="#features" className={heroStyles.secondaryCTA}>
                See All Features
              </Link>
            </div>

            {/* Quick Stats */}
            <div className={heroStyles.quickStats}>
              <div className={heroStyles.stat}>
                <span className={heroStyles.statNumber}>50K+</span>
                <span className={heroStyles.statLabel}>Photos Transformed</span>
              </div>
              <div className={heroStyles.stat}>
                <span className={heroStyles.statNumber}>2.3s</span>
                <span className={heroStyles.statLabel}>Average Speed</span>
              </div>
              <div className={heroStyles.stat}>
                <span className={heroStyles.statNumber}>98%</span>
                <span className={heroStyles.statLabel}>Love Results</span>
              </div>
            </div>
          </div>

          {/* Right Side - Image Carousel */}
          <div className={heroStyles.heroVisual}>
            <div className={heroStyles.imageCarousel}>
              <ImageCompareSlider
                key={currentSlide} // Force re-render on slide change
                beforeImage={currentSlideData.beforeAfter.before}
                afterImage={currentSlideData.beforeAfter.after}
              />
            </div>

            {/* Carousel Dots */}
            <div className={heroStyles.carouselDots}>
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  className={`${heroStyles.dot} ${index === currentSlide ? heroStyles.activeDot : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className={heroStyles.trustBar}>
          <div className={heroStyles.trustItem}>
            <span className={heroStyles.checkmark}>✓</span>
            <span>100% Private & Secure</span>
          </div>
          <div className={heroStyles.trustItem}>
            <span className={heroStyles.checkmark}>✓</span>
            <span>Photos Deleted After 1 Hour</span>
          </div>
          <div className={heroStyles.trustItem}>
            <span className={heroStyles.checkmark}>✓</span>
            <span>Instant AI Results</span>
          </div>
          <div className={heroStyles.trustItem}>
            <span className={heroStyles.checkmark}>✓</span>
            <span>No Signup Required</span>
          </div>
        </div>
      </div>
    </section>
  );
}