import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../../styles/SplitHeroLanding.module.css';

// Primary hero card (full width)
const PRIMARY_HERO = {
  id: 'restore',
  type: 'restore',
  badge: '🏆 PROFESSIONAL QUALITY',
  title: 'Restore Your Family Memories',
  description: 'Repair damage, enhance clarity, and add color to vintage photos. Professional AI restoration that brings your family history back to life.',
  link: '/replicate/restore-premium',
  combinedImage: '/images/restore-before-after-combined.jpg',
  beforeLabel: 'Before',
  afterLabel: 'After',
  features: [
    'Fix scratches, tears, and damage',
    'Enhance faded or blurry photos',
    'Add realistic color to black & white',
    'Choose your enhancement level'
  ], 
  buttonText: 'Start Restoring Free',
  credits: '1-40',
  processingTime: '10-90 seconds'
};

// Secondary features (side by side)
const SECONDARY_FEATURES = [
  {
    id: 'avatar',
    type: 'avatar',
    badge: '✨ NEW',
    title: 'AI Avatar Generator',
    description: 'Transform into fantasy characters, historical figures, or sci-fi heroes. Create stunning AI avatars in seconds.',
    link: '/replicate/avatar',
    combinedImage: '/images/avatarcard.png',
    beforeLabel: 'You',
    afterLabel: 'Avatar',
    tags: [
      { emoji: '🧙', label: 'Fantasy' },
      { emoji: '🚀', label: 'Sci-Fi' },
      { emoji: '🏛️', label: 'Historical' }
    ],
    buttonText: 'Create Avatar',
    credits: '50',
    processingTime: '45 seconds'
  },
  {
    id: 'decades',
    type: 'decades',
    badge: '🔥 TRENDING',
    title: 'Decade Time Machine',
    description: 'Transform your photo into authentic 70s, 80s, 90s, or 2000s yearbook styles. Perfect for social media.',
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
    buttonText: 'Try Decades',
    credits: '50',
    processingTime: '45 seconds'
  }
];

// Primary Hero Card Component
const PrimaryHeroCard = React.memo(({ card, onNavigate }) => (
  <div 
    className={styles.primaryCard}
    data-type={card.type}
    onClick={() => onNavigate(card.link, card.id)}
    role="button"
    tabIndex={0}
  >
    <div className={styles.primaryContent}>
      {/* Left: Text Content */}
      <div className={styles.primaryText}>
        <div className={styles.badge}>{card.badge}</div>
        <h2 className={styles.primaryTitle}>{card.title}</h2>
        <p className={styles.primaryDescription}>{card.description}</p>
        
        <ul className={styles.featureList}>
          {card.features.map((feature, index) => (
            <li key={index}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Right: Image + CTA */}
      <div className={styles.primaryImage}>
        <div className={styles.imageWrapper}>
          <Image
            src={card.combinedImage}
            alt={`${card.title} - Before and After`}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={90}
            priority
          />
          <div className={styles.splitLine}></div>
          <span className={`${styles.imageLabel} ${styles.labelBefore}`}>
            {card.beforeLabel}
          </span>
          <span className={`${styles.imageLabel} ${styles.labelAfter}`}>
            {card.afterLabel}
          </span>
        </div>
        
        {/* CTA Below Image */}
        <div className={styles.primaryCta}>
          <button className={styles.primaryButton}>
            {card.buttonText}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className={styles.meta}>
            <span className={styles.credits}>{card.credits} credits</span>
            <span className={styles.time}>⚡ {card.processingTime}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
));

PrimaryHeroCard.displayName = 'PrimaryHeroCard';

// Secondary Feature Card Component
const SecondaryCard = React.memo(({ card, onNavigate }) => (
  <div 
    className={styles.secondaryCard}
    data-type={card.type}
    onClick={() => onNavigate(card.link, card.id)}
    role="button"
    tabIndex={0}
  >
    <div className={styles.badge}>{card.badge}</div>
    
    <div className={styles.secondaryImage}>
      <div className={styles.imageWrapper}>
        <Image
          src={card.combinedImage}
          alt={`${card.title} - Before and After`}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 500px"
          quality={85}
        />
        <div className={styles.splitLine}></div>
        <span className={`${styles.imageLabel} ${styles.labelBefore}`}>
          {card.beforeLabel}
        </span>
        <span className={`${styles.imageLabel} ${styles.labelAfter}`}>
          {card.afterLabel}
        </span>
      </div>
    </div>
    
    <h3 className={styles.secondaryTitle}>{card.title}</h3>
    <p className={styles.secondaryDescription}>{card.description}</p>
    
    <div className={styles.tags}>
      {card.tags.map((tag, index) => (
        <span key={index} className={styles.tag}>
          {tag.emoji} {tag.label}
        </span>
      ))}
    </div>
    
    <div className={styles.secondaryCta}>
      <button className={styles.secondaryButton}>
        {card.buttonText}
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className={styles.meta}>
        <span className={styles.credits}>{card.credits} credits</span>
        <span className={styles.time}>⚡ {card.processingTime}</span>
      </div>
    </div>
  </div>
));

SecondaryCard.displayName = 'SecondaryCard';

export default function ModernHeroLanding() {
  const router = useRouter();

  const handleNavigation = useCallback((href, cardId) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'hero_card_click', {
        card_type: cardId,
        destination: href
      });
    }
    
    window.scrollTo(0, 0);
    router.push(href);
  }, [router]);

  return (
    <section className={styles.heroSection}>
      {/* Animated Background */}
      <div className={styles.backgroundGradient}>
        <div className={styles.gradientOrb} style={{ top: '10%', left: '10%' }}></div>
        <div className={styles.gradientOrb} style={{ top: '60%', right: '15%' }}></div>
        <div className={styles.gradientOrb} style={{ bottom: '20%', left: '50%' }}></div>
      </div>
      
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.mainTitle}>
            Bring Your Memories to Life with AI
          </h1>
          <p className={styles.mainSubtitle}>
            Professional photo restoration, AI avatars, and vintage transformations.
            Museum-quality results in seconds.
          </p>
          
          <div className={styles.signupBanner}>
            <div className={styles.bannerIcon}>🎁</div>
            <div className={styles.bannerText}>
              <strong>Sign up free</strong>
              <span>Get 50 credits to start</span>
            </div>
          </div>
        </div>

        {/* Primary Hero Card */}
        <PrimaryHeroCard
          card={PRIMARY_HERO}
          onNavigate={handleNavigation}
        />

        {/* Divider */}
        <div className={styles.divider}>
          <span className={styles.dividerLine}></span>
          <span className={styles.dividerText}>Also Available</span>
          <span className={styles.dividerLine}></span>
        </div>

        {/* Secondary Cards Grid */}
        <div className={styles.secondaryGrid}>
          {SECONDARY_FEATURES.map((card) => (
            <SecondaryCard
              key={card.id}
              card={card}
              onNavigate={handleNavigation}
            />
          ))}
        </div>

        {/* Social Proof */}
        <div className={styles.socialProof}>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>50K+</div>
              <div className={styles.statLabel}>Photos Transformed</div>
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