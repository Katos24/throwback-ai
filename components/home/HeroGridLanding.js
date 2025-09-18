import React, { useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../../styles/HeroGridLanding.module.css';

// Restore options data - COLORIZATION FIRST
const RESTORE_OPTIONS = [
  {
    id: 'colorize',
    title: 'Colorize B&W Photos',
    description: 'Add historically accurate, vibrant colors to black and white family photos',
    credits: 40,
    badge: 'Most Popular',
    badgeColor: 'popular',
    link: '/replicate/restore-premium',
    combinedImage: '/images/colorize-before-after-combined.jpg',
    buttonText: 'Add Color'
  },
  {
    id: 'restore-basic',
    title: 'Photo Restoration',
    description: 'Repair scratches, tears, water damage, and fading from irreplaceable family photos',
    credits: 1,
    badge: 'Try Free',
    badgeColor: 'success',
    link: '/replicate/restore-basic',
    combinedImage: '/images/restore-before-after-combined.jpg',
    buttonText: 'Restore (Try Free)'
  }
];

// Memoized RestoreCard component
const RestoreCard = React.memo(({ option, index, onNavigate }) => (
  <div className={styles.restoreCardWrapper}>
    <button 
      className={styles.restoreCardLink}
      onClick={() => onNavigate(option.link)}
      style={{ all: 'unset', cursor: 'pointer', display: 'block', width: '100%' }}
      aria-label={`${option.title} - ${option.description}`}
    >
      <div className={styles.restoreCard}>
        {/* Badge */}
        {option.badge && (
          <div className={`${styles.badge} ${styles[option.badgeColor]}`}>
            {option.badge}
          </div>
        )}
        
        {/* Combined Before/After Image */}
        <div className={styles.combinedImageContainer}>
          <Image
            src={option.combinedImage}
            alt={`${option.title} - Before and After comparison`}
            fill
            className={styles.combinedImage}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index === 0}
            fetchPriority={index === 0 ? "high" : "auto"}
            quality={75}
            loading={index === 0 ? "eager" : "lazy"}
            />
          <div className={styles.splitLine}></div>
          <div className={styles.beforeLabel}>Before</div>
          <div className={styles.afterLabel}>After</div>
        </div>
        
        {/* Content */}
        <h3 className={styles.restoreTitle}>{option.title}</h3>
        <p className={styles.restoreDescription}>{option.description}</p>
        
        {/* Credits and Button */}
        <div className={styles.restoreFooter}>
          <div className={styles.creditsInfo}>
            <span className={styles.creditsNumber}>{option.credits}</span>
            <span className={styles.creditsLabel}>{option.credits === 1 ? 'credit' : 'credits'}</span>
          </div>
          <div className={styles.restoreButton}>
            {option.buttonText}
          </div>
        </div>
      </div>
    </button>
  </div>
));

RestoreCard.displayName = 'RestoreCard';

export default function HeroGridLanding() {
  const router = useRouter();

  // Optimized navigation handler with useCallback
  const handleNavigation = useCallback((href) => {
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Navigate to the page
    router.push(href);
  }, [router]);

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        
        {/* Hero Section */}
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Bring Your Photos
            <span className={styles.gradientText}> Back to Life</span>
          </h1>
          <p className={styles.heroDescription}>
            Professional photo restoration powered by AI trained on 50,000+ vintage images. 
            Unlike generic AI tools, we specialize in family photos with historically accurate results in seconds, not hours.
          </p>

          {/* Value Props Bar */}
          <div className={styles.valueProps}>
            <div className={styles.valueProp}>
              <span className={styles.valueIcon}>⚡</span>
              <span>45-second processing</span>
            </div>
            <div className={styles.valueProp}>
              <span className={styles.valueIcon}>🎯</span>
              <span>Specialized photo AI</span>
            </div>
            <div className={styles.valueProp}>
              <span className={styles.valueIcon}>💰</span>
              <span>No subscriptions</span>
            </div>
            <div className={styles.valueProp}>
              <span className={styles.valueIcon}>🎨</span>
              <span>Museum-quality results</span>
            </div>
          </div>
          
          {/* Main Restoration Options */}
          <div className={styles.restoreGrid}>
            {RESTORE_OPTIONS.map((option, index) => (
              <RestoreCard
                key={option.id}
                option={option}
                index={index}
                onNavigate={handleNavigation}
              />
            ))}
          </div>

          {/* Professional Pricing Section */}
          <div className={styles.pricingInfo}>
            <div className={styles.pricingCard}>
              <div className={styles.pricingHeader}>
                <h3 className={styles.pricingTitle}>Transparent, Pay-Per-Use Pricing</h3>
                <span className={styles.pricingBadge}>No Subscriptions</span>
              </div>
              
              <div className={styles.pricingDetails}>
                <div className={styles.pricingItem}>
                  <span className={styles.pricingLabel}>Try Free:</span>
                  <span className={styles.pricingValue}>Basic restoration included</span>
                </div>
                
                <div className={styles.pricingItem}>
                  <span className={styles.pricingLabel}>Get Started:</span>
                  <span className={styles.pricingValue}>$4.99 for 400 credits</span>
                </div>
                
                <div className={styles.pricingItem}>
                  <span className={styles.pricingLabel}>Professional Colorization:</span>
                  <span className={styles.pricingValue}>$0.48 per photo (vs $5-15 industry standard)</span>
                </div>
              </div>
              
              <div className={styles.valueProposition}>
                <div className={styles.valueStats}>
                  <div className={styles.valueStat}>
                    <span className={styles.valueNumber}>90%</span>
                    <span className={styles.valueDesc}>Cost Savings</span>
                  </div>
                  <div className={styles.valueStat}>
                    <span className={styles.valueNumber}>10×</span>
                    <span className={styles.valueDesc}>Faster Processing</span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={styles.bottomCta}>
          <div className={styles.ctaCard}>
            <h3 className={styles.ctaTitle}>Ready to Get Started?</h3>
            <p className={styles.ctaDescription}>Try photo restoration for free</p>
            <Link href="/pricing" className={styles.ctaButton}>
              Get 5 Free Credits
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}