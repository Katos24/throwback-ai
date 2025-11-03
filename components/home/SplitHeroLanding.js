import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './SplitHeroLanding.module.css';

// Hero data with CLEAR messaging
const PRIMARY_HERO = {
  id: 'restore',
  type: 'restore',
  badge: '🔥 Most Popular',
  // BEFORE: 'Restore Your Family Memories'
  // AFTER: Clear, benefit-driven, uses numbers
  title: 'Restore Old Photos in 60 Seconds',
  // BEFORE: Generic AI-speak
  // AFTER: Specific problems solved
  description: 'Fix damaged, faded, or torn family photos. Our AI removes scratches, enhances clarity, and adds realistic color—automatically.',
  link: '/replicate/restore-premium',
  combinedImage: '/images/restorehero.jpg',
  beforeLabel: 'Original',
  afterLabel: 'Restored',
  features: [
    'Repairs tears, scratches & damage',
    'Enhances blurry or faded photos',
    'Colorizes black & white photos',
    'Results in under 90 seconds'
  ], 
  // BEFORE: 'Start Restoring Free'
  // AFTER: Removes friction, shows value
  buttonText: 'Restore Your First Photo Free',
  // CRYSTAL CLEAR PRICING
  pricingNote: 'Starts at 1 credit per photo',
  credits: '1-40 credits',
  processingTime: '30-90 seconds'
};

const SECONDARY_FEATURES = [
  {
    id: 'avatar',
    type: 'avatar',
    badge: '✨ Fun',
    title: 'Create AI Avatars',
    // BEFORE: Too wordy
    // AFTER: Simple benefit
    description: 'Transform yourself into fantasy characters, historical figures, or sci-fi heroes in seconds.',
    link: '/replicate/avatar',
    combinedImage: '/images/home/avatar_bounty_hunter.png',
    beforeLabel: 'Your Photo',
    afterLabel: 'AI Avatar',
    tags: [
      { emoji: '🧙', label: 'Fantasy' },
      { emoji: '🚀', label: 'Sci-Fi' },
      { emoji: '🏛️', label: 'Historical' }
    ],
    buttonText: 'Create Your Avatar',
    pricingNote: '1 avatar = 50 credits',
    credits: '50 credits',
    processingTime: '~45 seconds'
  },
  {
    id: 'decades',
    type: 'decades',
    badge: '📸 Trending',
    title: 'Vintage Yearbook Photos',
    // More specific era callout
    description: 'Transform into authentic 70s disco, 80s neon, 90s grunge, or Y2K styles. Perfect for throwback posts.',
    link: '/decades',
    combinedImage: '/images/home/decade_70s.png',
    beforeLabel: '2024',
    afterLabel: '1990s',
    tags: [
      { emoji: '📼', label: '90s Grunge' },
      { emoji: '🎸', label: '80s Neon' },
      { emoji: '✌️', label: '70s Disco' },
      { emoji: '💿', label: 'Y2K' }
    ],
    buttonText: 'Try Time Machine',
    pricingNote: '1 transformation = 50 credits',
    credits: '50 credits',
    processingTime: '~45 seconds'
  }
];

// Primary Hero Component - REDESIGNED
const PrimaryHeroCard = ({ card, onNavigate }) => (
  <div className={styles.primaryCard} onClick={() => onNavigate(card.link, card.id)} role="button" tabIndex={0}>
    <div className={styles.primaryContent}>
      <div className={styles.primaryText}>
        <div className={styles.badge}>{card.badge}</div>
        <h2 className={styles.primaryTitle}>{card.title}</h2>
        <p className={styles.primaryDescription}>{card.description}</p>
        
        {/* NEW: Show actual pricing clearly */}
        <div className={styles.pricingCallout}>
          <div className={styles.pricingHighlight}>
            <span className={styles.pricingEmoji}>💰</span>
            <span className={styles.pricingText}>
              <strong>{card.pricingNote}</strong> · No subscription required
            </span>
          </div>
        </div>

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
            <span className={styles.credits}>{card.credits}</span>
            <span className={styles.time}>⚡ {card.processingTime}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Secondary Card Component - IMPROVED
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
    
    {/* NEW: Clear pricing on secondary cards too */}
    <div className={styles.cardPricing}>
      <span className={styles.pricingBadge}>{card.pricingNote}</span>
    </div>

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
        {/* REDESIGNED Header - Crystal Clear Value Prop */}
        <div className={styles.header}>
          {/* BEFORE: "Bring Your Memories to Life with AI" - vague
              AFTER: Specific outcome, timeframe, clear benefit */}
          <h1 className={styles.mainTitle}>
            Transform Old Family Photos in Under 60 Seconds
          </h1>
          {/* BEFORE: Generic feature list
              AFTER: Who it's for + what problem it solves */}
          <p className={styles.mainSubtitle}>
            Fix damaged photos, add color to black & white memories, and restore faded images. 
            Perfect for genealogy projects, family reunions, and memorial services.
          </p>
          
          {/* NEW: Trust indicators right at the top */}
          <div className={styles.trustBadges}>
            <div className={styles.trustBadge}>
              <span className={styles.trustIcon}>✓</span>
              <span>No subscription required</span>
            </div>
            <div className={styles.trustBadge}>
              <span className={styles.trustIcon}>✓</span>
              <span>Photos deleted after 1 hour</span>
            </div>
            <div className={styles.trustBadge}>
              <span className={styles.trustIcon}>✓</span>
              <span>Pay only for what you use</span>
            </div>
          </div>
        </div>

        {/* Primary Hero Card */}
        <PrimaryHeroCard
          card={PRIMARY_HERO}
          onNavigate={handleNavigation}
        />

        {/* REDESIGNED Signup Banner - clearer value */}
        <div 
          className={styles.signupBanner}
          onClick={() => handleNavigation('/signup', 'signup_banner')}
          role="button"
          tabIndex={0}
        >
          <div className={styles.bannerIcon}>🎁</div>
          <div className={styles.bannerText}>
            <strong>Sign up free → Get 50 credits</strong>
            <span>Restore 50 basic photos OR 1 premium with colorization</span>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider}>
          <span className={styles.dividerLine}></span>
          <span className={styles.dividerText}>More AI Tools</span>
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

        {/* REDESIGNED Social Proof - More specific and believable */}
        <div className={styles.socialProof}>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>$0.03</div>
              <div className={styles.statLabel}>Per Photo (avg)</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>No Subs</div>
              <div className={styles.statLabel}>Pay Per Use Only</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>60 sec</div>
              <div className={styles.statLabel}>Average Processing</div>
            </div>
          </div>
          
          {/* NEW: Add actual use cases people can relate to */}
          <div className={styles.useCases}>
            <p className={styles.useCaseTitle}>Popular uses:</p>
            <div className={styles.useCaseTags}>
              <span className={styles.useCaseTag}>📚 Genealogy Projects</span>
              <span className={styles.useCaseTag}>🎂 Family Reunions</span>
              <span className={styles.useCaseTag}>⚰️ Memorial Services</span>
              <span className={styles.useCaseTag}>🎁 Holiday Gifts</span>
            </div>
          </div>
        </div>

        {/* NEW: Add FAQ section right in hero for objection handling */}
        <div className={styles.quickFaq}>
          <h3 className={styles.faqTitle}>Common Questions</h3>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h4>How do credits work?</h4>
              <p>Each tool uses credits based on complexity. Photo restoration: 1-40 credits. Avatars & Decades: 50 credits each.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>Do credits expire?</h4>
              <p>Never. Buy once, use whenever you need.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>How long until photos are deleted?</h4>
              <p>Automatically deleted 1 hour after processing for your privacy.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>Can I cancel my subscription?</h4>
              <p>There is no subscription! Pay only for what you use.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}