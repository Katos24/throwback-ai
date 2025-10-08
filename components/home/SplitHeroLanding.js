import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../../styles/SplitHeroLanding.module.css';

// Hero card data
const HERO_CARDS = [
  {
    id: 'decades',
    type: 'viral',
    badge: '🔥 TRENDING NOW',
    badgeClass: 'trendingBadge',
    title: 'Create Viral',
    titleSecond: '90s Photos',
    description: 'Transform your selfie into authentic 70s, 80s, 90s, or 2000s yearbook photos. Perfect for Instagram, TikTok, and reliving the decades.',
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
    features: [
      'Multiple decade styles per credit',
      'Authentic yearbook aesthetics',
      'Social media ready in 45 seconds',    ],
    buttonText: 'Try 90s AI Free →',
    buttonClass: 'viralButton',
    credits: '50',
    processingTime: '⚡ 45 seconds'
  },
  {
    id: 'restore',
    type: 'restore',
    badge: '🏆 PROVEN QUALITY',
    badgeClass: 'qualityBadge',
    title: 'Restore Family',
    titleSecond: 'Memories',
    description: 'Repair scratches, tears, fading, and water damage from irreplaceable vintage photos. Museum-quality colorization and restoration.',
    link: '/restores',
    combinedImage: '/images/restore-before-after-combined.jpg',
    beforeLabel: 'Before',
    afterLabel: 'After',
    tags: [
      { emoji: '🎨', label: 'Colorization' },
      { emoji: '🔧', label: 'Repair' },
      { emoji: '✨', label: 'Enhancement' }
    ],
    features: [
      'Remove scratches, tears, and stains',
      'Professional colorization option',
      'Preserve family history forever',    ],
    buttonText: 'Restore Photo Free →',
    buttonClass: 'restoreButton',
    credits: '1-40',
    processingTime: '⚡ 30-90 seconds'
  }
];

// Halloween Special Card Data
const HALLOWEEN_CARD = {
  id: 'halloween',
  type: 'halloween',
  badge: '🎃 LIMITED TIME',
  badgeClass: 'halloweenBadge',
  title: 'Halloween Face Swap',
  description: 'Swap your face into spooky Halloween scenes. Perfect for social media this October!',
  link: '/replicate/halloween',
  combinedImage: '/images/halloween-before-after-combined.jpg',
  beforeLabel: 'Your Photo',
  afterLabel: 'Spooky!',
  tags: [
    { emoji: '🎃', label: 'Scary' },
    { emoji: '👻', label: 'Ghostly' },
    { emoji: '🦇', label: 'Spooky' }
  ],
  buttonText: 'Try Halloween Swap →',
  buttonClass: 'halloweenButton',
  credits: '50',
  processingTime: '⚡ 45 seconds'
};

// Memoized Hero Card Component
const HeroCard = React.memo(({ card, onNavigate }) => (
  <div 
    className={`${styles.heroCard} ${styles[card.type]}`}
    onClick={() => onNavigate(card.link, card.id)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onNavigate(card.link, card.id);
      }
    }}
  >
    <div className={styles[card.badgeClass]}>{card.badge}</div>
    
    <h2 className={styles.heroTitle}>
      {card.title}{card.titleSecond && <><br />{card.titleSecond}</>}
    </h2>
    
    
    {/* Before/After Image */}
    <div className={styles.heroImage}>
      <div className={styles.combinedImageContainer}>
        {card.combinedImage ? (
          <Image
            src={card.combinedImage}
            alt={`${card.title} - Before and After comparison`}
            fill
            className={styles.combinedImage}
            sizes="(max-width: 768px) 100vw, 45vw"
            quality={75}
            priority={card.id === 'decades'}
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

        <p className={styles.heroDescription}>{card.description}</p>
    
    {/* Tags */}
    <div className={styles.tags}>
      {card.tags.map((tag, index) => (
        <span key={index} className={styles.tag}>
          {tag.emoji} {tag.label}
        </span>
      ))}
    </div>
    
    {/* Features List (if exists) */}
    {card.features && (
      <ul className={styles.featureList}>
        {card.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    )}
    
    {/* CTA Button */}
    <div className={styles.heroCta}>
      <button className={`${styles.btnPrimary} ${styles[card.buttonClass]}`}>
        {card.buttonText}
      </button>
    </div>
    
    {/* Meta Info */}
    <div className={styles.heroMeta}>
      <div className={styles.credits}>
        <strong>{card.credits}</strong> credits
      </div>
      <div className={styles.processingTime}>{card.processingTime}</div>
    </div>
  </div>
));

HeroCard.displayName = 'HeroCard';

// Halloween Special Card Component
const HalloweenSpecialCard = React.memo(({ onNavigate }) => (
  <div className={styles.halloweenSpecialWrapper}>
    <div 
      className={styles.halloweenSpecialCard}
      onClick={() => onNavigate(HALLOWEEN_CARD.link, HALLOWEEN_CARD.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onNavigate(HALLOWEEN_CARD.link, HALLOWEEN_CARD.id);
        }
      }}
    >
      {/* Floating Halloween Emojis */}
      <div className={styles.halloweenFloatingEmojis}>
        {['🎃', '👻', '🦇', '🕷️', '💀'].map((emoji, i) => (
          <span 
            key={i}
            className={styles.halloweenFloatingEmoji}
            style={{
              left: `${10 + i * 20}%`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      <div className={styles.halloweenContent}>
        <div className={styles[HALLOWEEN_CARD.badgeClass]}>
          {HALLOWEEN_CARD.badge}
        </div>
        
        <h3 className={styles.halloweenTitle}>
          <span className={styles.halloweenIcon}>🎃</span>
          {HALLOWEEN_CARD.title}
          <span className={styles.halloweenIcon}>👻</span>
        </h3>
        
        <p className={styles.halloweenDescription}>
          {HALLOWEEN_CARD.description}
        </p>

        {/* Before/After Image */}
        <div className={styles.halloweenImage}>
          <div className={styles.combinedImageContainer}>
            {HALLOWEEN_CARD.combinedImage ? (
              <Image
                src={HALLOWEEN_CARD.combinedImage}
                alt={`${HALLOWEEN_CARD.title} - Before and After comparison`}
                fill
                className={styles.combinedImage}
                sizes="(max-width: 768px) 100vw, 600px"
                quality={75}
              />
            ) : (
              <div className={styles.placeholder}>Halloween Preview</div>
            )}
            <div className={styles.splitLine}></div>
            <span className={`${styles.imageLabel} ${styles.labelBefore}`}>
              {HALLOWEEN_CARD.beforeLabel}
            </span>
            <span className={`${styles.imageLabel} ${styles.labelAfter}`}>
              {HALLOWEEN_CARD.afterLabel}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className={styles.halloweenTags}>
          {HALLOWEEN_CARD.tags.map((tag, index) => (
            <span key={index} className={styles.halloweenTag}>
              {tag.emoji} {tag.label}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.halloweenCta}>
          <button className={`${styles.btnPrimary} ${styles[HALLOWEEN_CARD.buttonClass]}`}>
            {HALLOWEEN_CARD.buttonText}
          </button>
        </div>

        {/* Meta */}
        <div className={styles.halloweenMeta}>
          <div className={styles.credits}>
            <strong>{HALLOWEEN_CARD.credits}</strong> credits
          </div>
          <div className={styles.processingTime}>
            {HALLOWEEN_CARD.processingTime}
          </div>
        </div>
      </div>
    </div>
  </div>
));

HalloweenSpecialCard.displayName = 'HalloweenSpecialCard';

export default function SplitHeroLanding() {
  const router = useRouter();

  // Optimized navigation with tracking
  const handleNavigation = useCallback((href, cardId) => {
    // Track which card was clicked (Google Analytics, etc.)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'hero_card_click', {
        card_type: cardId,
        destination: href
      });
    }
    
    // Log for debugging
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
         <h1 className={styles.mainTitle}>Restore Your Family Legacy</h1>
          <p className={styles.mainSubtitle}>
            Transform damaged, faded, and black & white photos into vibrant memories. Or step into any decade with AI time travel. Instant results, museum quality.
          </p>
                    
          {/* Signup Banner */}
          <div className={styles.signupBanner}>
            <div className={styles.bannerText}>
              <strong>Sign up free - Get 50 credits</strong>
              <span className={styles.bannerSubtext}>
                Try both features at no cost
              </span>
            </div>
          </div>
        </div>

        {/* Split Hero Cards */}
        <div className={styles.splitHero}>
          {HERO_CARDS.map((card) => (
            <HeroCard
              key={card.id}
              card={card}
              onNavigate={handleNavigation}
            />
          ))}
        </div>

        {/* Halloween Special Card */}
        <HalloweenSpecialCard onNavigate={handleNavigation} />

        {/* Social Proof */}
        <div className={styles.socialProof}>
          <div className={styles.socialProofStats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>45 sec</div>
              <div className={styles.statLabel}>Average Processing</div>
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