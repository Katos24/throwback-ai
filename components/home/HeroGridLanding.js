import React, { useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../../styles/HeroGridLanding.module.css';

// Updated feature options - all three main features with equal prominence
const FEATURE_OPTIONS = [
  {
    id: 'colorize',
    title: 'Premium Colorization',
    description: 'Transform black and white family photos with museum-quality, historically accurate colorization.',
    credits: 40,
    badge: 'Try Free',
    badgeColor: 'free',
    link: '/replicate/restore-premium',
    combinedImage: '/images/colorize-before-after-combined.jpg',
    buttonText: 'Try Premium Free',
    beforeLabel: 'Before',
    afterLabel: 'After'
  },
  {
    id: 'decades',
    title: 'Decades Time Travel',
    description: 'Transform your selfies into viral social media content with authentic 70s, 80s, 90s, and 2000s styling.',
    credits: 50,
    badge: 'Viral Content',
    badgeColor: 'viral',
    link: '/decades',
    combinedImage: '/images/decades-before-after-combined.jpg',
    buttonText: 'Explore Decades',
    beforeLabel: 'Now',
    afterLabel: '80s'
  },
  {
    id: 'restore-basic',
    title: 'Photo Restoration',
    description: 'Repair scratches, tears, water damage, and fading from irreplaceable family photos instantly.',
    credits: 1,
    badge: 'Lightning Fast',
    badgeColor: 'fast',
    link: '/replicate/restore-premium',
    combinedImage: '/images/restore-before-after-combined.jpg',
    buttonText: 'Restore Now',
    beforeLabel: 'Damaged',
    afterLabel: 'Restored'
  }
];

// Memoized FeatureCard component
const FeatureCard = React.memo(({ feature, index, onNavigate }) => (
  <div className={styles.featureCardWrapper}>
    <button 
      className={styles.featureCardLink}
      onClick={() => onNavigate(feature.link)}
      style={{ all: 'unset', cursor: 'pointer', display: 'block', width: '100%' }}
      aria-label={`${feature.title} - ${feature.description}`}
    >
      <div className={styles.featureCard}>
        {/* Badge */}
        {feature.badge && (
          <div className={`${styles.featureBadge} ${styles[`badge-${feature.badgeColor}`]}`}>
            {feature.badge}
          </div>
        )}
        
        {/* Before/After Image Container */}
        <div className={styles.featureImage}>
          <div className={styles.combinedImageContainer}>
            <Image
              src={feature.combinedImage}
              alt={`${feature.title} - Before and After comparison`}
              fill
              className={styles.combinedImage}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "auto"}
              quality={75}
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className={styles.splitLine}></div>
            <div className={`${styles.imageLabel} ${styles.labelBefore}`}>
              {feature.beforeLabel}
            </div>
            <div className={`${styles.imageLabel} ${styles.labelAfter}`}>
              {feature.afterLabel}
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className={styles.featureContent}>
          <h3 className={styles.featureTitle}>{feature.title}</h3>
          <p className={styles.featureDescription}>{feature.description}</p>
          
          <div className={styles.featureFooter}>
            <div className={styles.credits}>
              <span className={styles.creditsNumber}>{feature.credits}</span>
              <span className={styles.creditsLabel}>{feature.credits === 1 ? 'credit' : 'credits'}</span>
            </div>
            <button className={styles.featureButton}>
              {feature.buttonText}
            </button>
          </div>
        </div>
      </div>
    </button>
  </div>
));

FeatureCard.displayName = 'FeatureCard';

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
        
        {/* Floating Particles Background */}
        <div className={styles.floatingParticles}>
          <div className={styles.particle} style={{left: '10%', animationDelay: '0s'}}></div>
          <div className={styles.particle} style={{left: '20%', animationDelay: '1s'}}></div>
          <div className={styles.particle} style={{left: '30%', animationDelay: '2s'}}></div>
          <div className={styles.particle} style={{left: '70%', animationDelay: '3s'}}></div>
          <div className={styles.particle} style={{left: '80%', animationDelay: '4s'}}></div>
          <div className={styles.particle} style={{left: '90%', animationDelay: '5s'}}></div>
        </div>

        {/* Hero Header */}
        <div className={styles.heroHeader}>
          <h1 className={styles.heroTitle}>
            AI Photo Magic
            <br />
            <span className={styles.gradientText}>in Seconds</span>
          </h1>
          <p className={styles.heroSubtitle}>
            AI-powered photo tools: Restore damaged vintage photos to vivid clarity, 
            or transform yourself into iconic decades (70s, 80s, 90s, 2000s). 
            Preserve family history or create viral social content in seconds.
          </p>

          {/* Signup Bonus Banner */}
          <div className={styles.signupBonus}>
            <span className={styles.bonusIcon}>🎁</span>
            <div className={styles.bonusText}>
              <strong>Sign up now and get 50 free credits</strong> - Try everything at no cost!
            </div>
          </div>
        </div>
          
        {/* Main Features Grid */}
        <div className={styles.featuresGrid}>
          {FEATURE_OPTIONS.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
              onNavigate={handleNavigation}
            />
          ))}
        </div>

        {/* Value Props */}
        <div className={styles.valueProps}>
          <div className={styles.valueProp}>
            <span className={styles.valueIcon}>⚡</span>
            <div className={styles.valueTitle}>45-Second Processing</div>
            <div className={styles.valueDesc}>AI magic happens instantly</div>
          </div>
          <div className={styles.valueProp}>
            <span className={styles.valueIcon}>🎯</span>
            <div className={styles.valueTitle}>Specialized Photo AI</div>
            <div className={styles.valueDesc}>Trained on 50K+ vintage images</div>
          </div>
          <div className={styles.valueProp}>
            <span className={styles.valueIcon}>💰</span>
            <div className={styles.valueTitle}>No Subscriptions</div>
            <div className={styles.valueDesc}>Pay per use, own forever</div>
          </div>
          <div className={styles.valueProp}>
            <span className={styles.valueIcon}>🎨</span>
            <div className={styles.valueTitle}>Museum Quality</div>
            <div className={styles.valueDesc}>Professional-grade results</div>
          </div>
        </div>

      </div>
    </section>
  );
}