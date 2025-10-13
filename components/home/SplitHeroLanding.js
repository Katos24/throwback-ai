import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../../styles/SplitHeroLanding.module.css';

// Primary hero card (full width)
const PRIMARY_HERO = {
  id: 'restore',
  type: 'restore',
  badge: '🏆 PROFESSIONAL QUALITY',
  badgeClass: 'qualityBadge',
  title: 'Restore Your Family Memories',
  description: 'Repair damage, enhance clarity, and add color to vintage photos. Professional AI restoration that brings your family history back to life.',
  link: '/replicate/restore-premium',
  combinedImage: '/images/restore-before-after-combined.jpg',
  beforeLabel: 'Before',
  afterLabel: 'After',
  tags: [
    { emoji: '⚡', label: 'Quick Repair (1 credit)' },
    { emoji: '🎨', label: 'Premium Colorization (40 credits)' },
  ],
  features: [
    'Fix scratches, tears, and damage',
    'Enhance faded or blurry photos',
    'Add realistic color to black & white',
    'Choose your enhancement level'
  ],
  buttonText: 'Start Restoring Free →',
  buttonClass: 'restoreButton',
  credits: '1-40',
  processingTime: '⚡ 10-90 seconds'
};

// Secondary feature (decade transformations)
const SECONDARY_FEATURE = {
  id: 'decades',
  type: 'viral',
  badge: '🔥 TRENDING',
  badgeClass: 'trendingBadge',
  title: 'Or Travel Back in Time',
  description: 'Transform your photo into authentic 70s, 80s, 90s, or 2000s yearbook styles. Perfect for social media and nostalgia.',
  link: '/decades',
  combinedImage: '/images/decades-before-after-combined.jpg',
  beforeLabel: 'Today',
  afterLabel: '1995',
  tags: [
    { emoji: '📼', label: '90s' },
    { emoji: '🎸', label: '80s' },
    { emoji: '✌️', label: '70s' },
    { emoji: '💿', label: '2000s' }
  ],
  buttonText: 'Try 90s AI Free →',
  buttonClass: 'viralButton',
  credits: '50',
  processingTime: '⚡ 45 seconds'
};

// Primary Hero Card Component (Full Width)
const PrimaryHeroCard = React.memo(({ card, onNavigate }) => (
  <div 
    className={`${styles.primaryHeroCard} ${styles[card.type]}`}
    onClick={() => onNavigate(card.link, card.id)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onNavigate(card.link, card.id);
      }
    }}
  >
    <div className={styles.primaryHeroContent}>
      {/* Left Side: Text Content */}
      <div className={styles.primaryHeroText}>
        <div className={`${styles.badge} ${styles[card.badgeClass]}`}>
          {card.badge}
        </div>
        
        <h2 className={styles.primaryHeroTitle}>{card.title}</h2>
        <p className={styles.primaryHeroDescription}>{card.description}</p>
        
        {/* Features List */}
        {card.features && (
          <ul className={styles.primaryFeatureList}>
            {card.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        )}
        
        {/* Tags */}
        <div className={styles.tags}>
          {card.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag.emoji} {tag.label}
            </span>
          ))}
        </div>
        
        {/* CTA Button */}
        <div className={styles.primaryHeroCta}>
          <button className={`${styles.btnPrimary} ${styles[card.buttonClass]}`}>
            {card.buttonText}
          </button>
          
          <div className={styles.primaryHeroMeta}>
            <span className={styles.credits}>
              <strong>{card.credits}</strong> credits
            </span>
            <span className={styles.processingTime}>{card.processingTime}</span>
          </div>
        </div>
      </div>
      
      {/* Right Side: Before/After Image */}
      <div className={styles.primaryHeroImage}>
        <div className={styles.combinedImageContainer}>
          {card.combinedImage ? (
            <Image
              src={card.combinedImage}
              alt={`${card.title} - Before and After comparison`}
              fill
              className={styles.combinedImage}
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={85}
              priority={true}
            />
          ) : (
            <div className={styles.placeholder}>Before/After Preview</div>
          )}
          <div className={styles.splitLine}></div>
          <span className={`${styles.imageLabel} ${styles.labelBefore}`}>
            {card.beforeLabel}
          </span>
          <span className={`${styles.imageLabel} ${styles.labelAfter}`}>
            {card.afterLabel}
          </span>
        </div>
      </div>
    </div>
  </div>
));

PrimaryHeroCard.displayName = 'PrimaryHeroCard';

// Secondary Feature Card Component (Smaller, Less Prominent)
const SecondaryFeatureCard = React.memo(({ card, onNavigate }) => (
  <div className={styles.secondaryFeatureSection}>
    <div className={styles.secondaryFeatureHeader}>
      <h3 className={styles.secondaryFeatureTitle}>{card.title}</h3>
      <div className={`${styles.badge} ${styles[card.badgeClass]}`}>
        {card.badge}
      </div>
    </div>
    
    <div 
      className={`${styles.secondaryFeatureCard} ${styles[card.type]}`}
      onClick={() => onNavigate(card.link, card.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onNavigate(card.link, card.id);
        }
      }}
    >
      {/* Before/After Image */}
      <div className={styles.secondaryFeatureImage}>
        <div className={styles.combinedImageContainer}>
          {card.combinedImage ? (
            <Image
              src={card.combinedImage}
              alt={`${card.title} - Before and After comparison`}
              fill
              className={styles.combinedImage}
              sizes="(max-width: 768px) 100vw, 600px"
              quality={75}
            />
          ) : (
            <div className={styles.placeholder}>Before/After Preview</div>
          )}
          <div className={styles.splitLine}></div>
          <span className={`${styles.imageLabel} ${styles.labelBefore}`}>
            {card.beforeLabel}
          </span>
          <span className={`${styles.imageLabel} ${styles.labelAfter}`}>
            {card.afterLabel}
          </span>
        </div>
      </div>
      
      <p className={styles.secondaryFeatureDescription}>{card.description}</p>
      
      {/* Tags */}
      <div className={styles.secondaryTags}>
        {card.tags.map((tag, index) => (
          <span key={index} className={styles.tag}>
            {tag.emoji} {tag.label}
          </span>
        ))}
      </div>
      
      {/* CTA */}
      <div className={styles.secondaryFeatureCta}>
        <button className={`${styles.btnSecondary} ${styles[card.buttonClass]}`}>
          {card.buttonText}
        </button>
        
        <div className={styles.secondaryFeatureMeta}>
          <span className={styles.credits}>
            <strong>{card.credits}</strong> credits
          </span>
          <span className={styles.processingTime}>{card.processingTime}</span>
        </div>
      </div>
    </div>
  </div>
));

SecondaryFeatureCard.displayName = 'SecondaryFeatureCard';

export default function SplitHeroLanding() {
  const router = useRouter();

  // Optimized navigation with tracking
  const handleNavigation = useCallback((href, cardId) => {
    // Track which card was clicked
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'hero_card_click', {
        card_type: cardId,
        destination: href
      });
    }
    
    console.log(`Hero card clicked: ${cardId} -> ${href}`);
    
    // Force scroll to top
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Navigate
    router.push(href);
  }, [router]);

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        
        {/* Floating Particles Background */}
        <div className={styles.floatingParticles}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i}
              className={styles.particle} 
              style={{
                left: `${10 + i * 15}%`, 
                animationDelay: `${i}s`
              }}
            />
          ))}
        </div>

        {/* Top Header */}
        <div className={styles.topHeader}>
          <h1 className={styles.mainTitle}>Bring Your Family History Back to Life</h1>
          <p className={styles.mainSubtitle}>
            Professional AI restoration for damaged, faded, and black & white photos. Museum-quality results in seconds.
          </p>
                    
          {/* Signup Banner */}
          <div className={styles.signupBanner}>
            <div className={styles.bannerText}>
              <strong>Sign up free - Get 50 credits</strong>
              <span className={styles.bannerSubtext}>
                Try restoration at no cost
              </span>
            </div>
          </div>
        </div>

        {/* Primary Hero Card - RESTORATION (Full Width, Prominent) */}
        <PrimaryHeroCard
          card={PRIMARY_HERO}
          onNavigate={handleNavigation}
        />

        {/* Divider */}
        <div className={styles.featureDivider}>
          <span className={styles.dividerLine}></span>
          <span className={styles.dividerText}>Also Available</span>
          <span className={styles.dividerLine}></span>
        </div>

        {/* Secondary Feature Card - DECADES (Smaller, Less Prominent) */}
        <SecondaryFeatureCard
          card={SECONDARY_FEATURE}
          onNavigate={handleNavigation}
        />

        {/* Social Proof */}
        <div className={styles.socialProof}>
          <div className={styles.socialProofStats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>10-90 sec</div>
              <div className={styles.statLabel}>Processing Time</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>4.9★</div>
              <div className={styles.statLabel}>User Rating</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>Pay Per Use</div>
              <div className={styles.statLabel}>No Subscriptions</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}