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
      'Social media ready in 45 seconds',
      'Unlimited generations'
    ],
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
    link: '/replicate/restore-basic',
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
      'Preserve family history forever',
      'Fast basic or premium quality'
    ],
    buttonText: 'Restore Photo Free →',
    buttonClass: 'restoreButton',
    credits: '1-40',
    processingTime: '⚡ 30-90 seconds'
  }
];

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
      {card.title}<br />{card.titleSecond}
    </h2>
    
    <p className={styles.heroDescription}>{card.description}</p>
    
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
    
    {/* Tags */}
    <div className={styles.tags}>
      {card.tags.map((tag, index) => (
        <span key={index} className={styles.tag}>
          {tag.emoji} {tag.label}
        </span>
      ))}
    </div>
    
    {/* Features List */}
    <ul className={styles.featureList}>
      {card.features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
    
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
          <h1 className={styles.mainTitle}>AI-Powered Photo Magic</h1>
          <p className={styles.mainSubtitle}>
            Create viral decade photos or restore precious family memories in seconds
          </p>
          
          {/* Signup Banner */}
          <div className={styles.signupBanner}>
            <span className={styles.giftIcon}>🎁</span>
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

        {/* Social Proof */}
        <div className={styles.socialProof}>
          <div className={styles.socialProofStats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>500K+</div>
              <div className={styles.statLabel}>Photos Created</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>45 sec</div>
              <div className={styles.statLabel}>Average Processing</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>4.9★</div>
              <div className={styles.statLabel}>User Rating</div>
            </div>
          </div>
        </div>

        {/* Value Props */}
        <div className={styles.valueProps}>
          <div className={styles.valueProp}>
            <div className={styles.valueIcon}>⚡</div>
            <div className={styles.valueTitle}>Lightning Fast</div>
            <div className={styles.valueDesc}>Results in under 90 seconds</div>
          </div>
          <div className={styles.valueProp}>
            <div className={styles.valueIcon}>🎯</div>
            <div className={styles.valueTitle}>Specialized AI</div>
            <div className={styles.valueDesc}>Trained on 50K+ photos</div>
          </div>
          <div className={styles.valueProp}>
            <div className={styles.valueIcon}>💰</div>
            <div className={styles.valueTitle}>No Subscriptions</div>
            <div className={styles.valueDesc}>Pay per use, own forever</div>
          </div>
          <div className={styles.valueProp}>
            <div className={styles.valueIcon}>🔒</div>
            <div className={styles.valueTitle}>100% Private</div>
            <div className={styles.valueDesc}>Your photos, your data</div>
          </div>
        </div>

      </div>
    </section>
  );
}