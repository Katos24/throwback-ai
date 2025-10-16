import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../../styles/SplitHeroLanding.module.css';

// Hero data
const PRIMARY_HERO = {
  id: 'restore',
  type: 'restore',
  badge: '🏆 PROFESSIONAL QUALITY',
  title: 'Restore Your Family Memories',
  description: 'Repair damage, enhance clarity, and add color to vintage photos. Professional AI restoration that brings your family history back to life.',
  link: '/replicate/restore-premium',
  combinedImage: '/images/restorehero.jpg',
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

// Primary Hero Component
const PrimaryHeroCard = ({ card, onNavigate }) => (
  <div className={styles.primaryCard} onClick={() => onNavigate(card.link, card.id)} role="button" tabIndex={0}>
    <div className={styles.primaryContent}>
      <div className={styles.primaryText}>
        <div className={styles.badge}>{card.badge}</div>
        <h2 className={styles.primaryTitle}>{card.title}</h2>
        <p className={styles.primaryDescription}>{card.description}</p>
        <ul className={styles.featureList}>
          {card.features.map((feature, idx) => (
            <li key={idx}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>

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
          <span className={`${styles.imageLabel} ${styles.labelBefore}`}>{card.beforeLabel}</span>
          <span className={`${styles.imageLabel} ${styles.labelAfter}`}>{card.afterLabel}</span>
        </div>
        <div className={styles.primaryCta}>
          <button className={styles.primaryButton}>{card.buttonText}</button>
          <div className={styles.meta}>
            <span className={styles.credits}>{card.credits} credits</span>
            <span className={styles.time}>⚡ {card.processingTime}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Secondary Card Component
const SecondaryCard = ({ card, onNavigate }) => (
  <div className={styles.secondaryCard} onClick={() => onNavigate(card.link, card.id)} role="button" tabIndex={0}>
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
          loading="lazy"
        />
        {card.type === 'decades' && <div className={styles.splitLine}></div>}
        {card.type === 'decades' && (
          <>
            <span className={`${styles.imageLabel} ${styles.labelBefore}`}>{card.beforeLabel}</span>
            <span className={`${styles.imageLabel} ${styles.labelAfter}`}>{card.afterLabel}</span>
          </>
        )}
      </div>
    </div>
    <h3 className={styles.secondaryTitle}>{card.title}</h3>
    <p className={styles.secondaryDescription}>{card.description}</p>
    {card.tags && (
      <div className={styles.tags}>
        {card.tags.map((tag, idx) => (
          <span key={idx} className={styles.tag}>{tag.emoji} {tag.label}</span>
        ))}
      </div>
    )}
    <div className={styles.secondaryCta}>
      <button className={styles.secondaryButton}>{card.buttonText}</button>
      <div className={styles.meta}>
        <span className={styles.credits}>{card.credits} credits</span>
        <span className={styles.time}>⚡ {card.processingTime}</span>
      </div>
    </div>
  </div>
);

export default function ModernHeroLanding() {
  const router = useRouter();
  const handleNavigation = useCallback((href) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'hero_card_click', { destination: href });
    }
    router.push(href);
  }, [router]);

  return (
    <section className={styles.heroSection}>
      <div className={styles.backgroundGradient}>
        <div className={styles.gradientOrb} style={{ top: '10%', left: '10%' }}></div>
        <div className={styles.gradientOrb} style={{ top: '60%', right: '15%' }}></div>
        <div className={styles.gradientOrb} style={{ bottom: '20%', left: '50%' }}></div>
      </div>

      <div className={styles.container}>
  {/* Header - only titles now */}
  <div className={styles.header}>
    <h1 className={styles.mainTitle}>
      Bring Your Memories to Life with AI
    </h1>
    <p className={styles.mainSubtitle}>
      Professional photo restoration, AI avatars, and vintage transformations.
      Museum-quality results in seconds.
    </p>
  </div>

  {/* Primary Hero Card */}
  <PrimaryHeroCard
    card={PRIMARY_HERO}
    onNavigate={handleNavigation}
  />

  {/* Signup Banner moved here */}
  <div 
    className={styles.signupBanner}
    onClick={() => handleNavigation('/signup', 'signup_banner')}
    role="button"
    tabIndex={0}
  >
    <div className={styles.bannerIcon}>🎁</div>
    <div className={styles.bannerText}>
      <strong>Sign up free</strong>
      <span>Get 50 credits to start</span>
    </div>
  </div>

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
