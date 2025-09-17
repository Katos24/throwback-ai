import React, { useCallback, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../../styles/HeroGridLanding.module.css';

// Move static data outside component - COLORIZATION FIRST
const RESTORE_OPTIONS = [
  {
    id: 'colorize',
    title: 'Colorize B&W Photos',
    description: 'Add historically accurate, vibrant colors to black and white family photos',
    credits: 40,
    badge: 'Most Popular',
    badgeColor: 'popular',
    link: '/replicate/restore-premium',
    combinedImage: '/images/colorize-before-after-combined.jpg', // Single combined image
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
    combinedImage: '/images/restore-before-after-combined.jpg', // Single combined image
    buttonText: 'Restore (Try Free)'
  }
];

const DECADE_OPTIONS = [
  {
    id: 'all-decades',
    title: 'All Decades',
    description: 'Try every era - 70s, 80s, 90s, and 2000s styles in one collection',
    credits: 50,
    era: 'Time Travel',
    link: '/decades',
    fullBackgroundImage: '/images/ThrowbackDecadesCard.jpg',
    colorClass: 'rainbow',
    cardClass: 'allDecadesCard',
    badgeColor: 'rainbow',
    isFullBackground: true
  },
  {
    id: '70s',
    title: '70s Groovy',
    description: 'Hippie, disco, punk, and glam rock styles',
    credits: 50,
    era: '1970s',
    link: '/replicate/70s',
    beforeImage: '/images/70s-before.jpg',
    afterImage: '/images/70s-after.jpg',
    colorClass: 'orange',
    cardClass: 'seventiesCard'
  },
  {
    id: '80s',
    title: '80s Neon',
    description: 'New wave, synthpop, and neon-bright aesthetics',
    credits: 50,
    era: '1980s',
    link: '/replicate/80s',
    beforeImage: '/images/80sbeforecard.jpg',
    afterImage: '/images/80sbeforeafter.jpg',
    colorClass: 'neon',
    cardClass: 'eightiesCard'
  },
  {
    id: '90s',
    title: '90s Grunge',
    description: 'Alternative, grunge, and pop culture vibes',
    credits: 50,
    era: '1990s',
    link: '/replicate/90s',
    beforeImage: '/images/mikebefore.jpg',
    afterImage: '/images/90s-after.jpg',
    colorClass: 'purple',
    cardClass: 'ninetiesCard'
  },
  {
    id: '2000s',
    title: '2000s Y2K',
    description: 'Emo, scene, pop punk, and digital era styles',
    credits: 50,
    era: '2000s',
    link: '/replicate/2000s',
    beforeImage: '/images/alexbefore.jpg',
    afterImage: '/images/2000s-after.jpg',
    colorClass: 'blue',
    cardClass: 'twothousandsCard'
  }
];

// Memoized RestoreCard component - Updated for single combined image
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
            priority={index === 0} // First card (colorization) gets priority
            quality={85}
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

// Memoized DecadeCard component - Updated for combined images
const DecadeCard = React.memo(({ decade, onNavigate }) => (
  <div className={styles.decadeCardWrapper}>
    <button 
      className={styles.decadeCardLink}
      onClick={() => onNavigate(decade.link)}
      style={{ all: 'unset', cursor: 'pointer', display: 'block', width: '100%' }}
      aria-label={`${decade.title} - ${decade.description}`}
    >
      <div className={`${styles.decadeCard} ${styles[decade.cardClass]}`}>
        
        {/* Badge */}
        {decade.badge && (
          <div className={`${styles.badge} ${styles[decade.badgeColor]}`}>
            {decade.badge}
          </div>
        )}
        
        {/* Era Badge */}
        <div className={`${styles.eraBadge} ${styles[decade.colorClass]}`}>
          <div className={styles.eraText}>{decade.era}</div>
        </div>
        
        {/* Conditional rendering: Full Background vs Before/After Split */}
        {decade.isFullBackground ? (
          // Full background image for All Decades card
          <div className={styles.fullBackgroundContainer}>
            <Image
              src={decade.fullBackgroundImage}
              alt={`${decade.title} - Time Travel Background`}
              width={320}
              height={240}
              className={styles.fullBackgroundImage}
              loading="lazy"
              quality={75}
            />
          </div>
        ) : (
          // Regular before/after split for individual decade cards
          <div className={styles.decadeBeforeAfter}>
            <Image
              src={decade.beforeImage}
              alt={`${decade.title} - Before`}
              width={160}
              height={240}
              className={styles.decadeBeforeImage}
              loading="lazy"
              quality={75}
            />
            <Image
              src={decade.afterImage}
              alt={`${decade.title} - After`}
              width={160}
              height={240}
              className={styles.decadeAfterImage}
              loading="lazy"
              quality={75}
            />
            <div className={styles.splitLine}></div>
            <div className={styles.beforeLabel}>Now</div>
            <div className={styles.afterLabel}>{decade.era}</div>
          </div>
        )}
        
        {/* Content */}
        <div className={styles.decadeContent}>
          <h3 className={styles.decadeTitle}>{decade.title}</h3>
          <p className={styles.decadeDescription}>{decade.description}</p>
          
          <div className={styles.decadeFooter}>
            <div className={styles.decadeCredits}>
              <span className={styles.decadeCreditsNumber}>{decade.credits}</span> credits
            </div>
            <div className={styles.decadeCta}>
              {decade.isFullBackground ? 'Explore All →' : 'Try Style →'}
            </div>
          </div>
        </div>
      </div>
    </button>
  </div>
));

DecadeCard.displayName = 'DecadeCard';

// Lazy-loaded decades section
const DecadesSection = React.memo(({ onNavigate }) => (
  <div className={styles.decadesSection}>
    <h2 className={styles.decadesTitle}>
      Time Travel Through the Decades
    </h2>
    <p className={styles.decadesDescription}>
      Transform your selfies into viral social media content with authentic decade styling. 
      Perfect for TikTok, Instagram, and standing out online.
    </p>

    {/* Decades Grid */}
    <div className={styles.decadesGrid}>
      {DECADE_OPTIONS.map((decade) => (
        <DecadeCard 
          key={decade.id} 
          decade={decade} 
          onNavigate={onNavigate} 
        />
      ))}
    </div>
  </div>
));

DecadesSection.displayName = 'DecadesSection';

export default function HeroGridLanding() {
  const router = useRouter();
  const [showDecades, setShowDecades] = useState(false);

  // Optimized navigation handler with useCallback
  const handleNavigation = useCallback((href) => {
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Navigate to the page
    router.push(href);
  }, [router]);

  // Lazy load decades section after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDecades(true);
    }, 300); // Small delay to prioritize above-the-fold content

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        
        {/* Hero Section - Restore Focus */}
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Bring Your Photos
            <span className={styles.gradientText}> Back to Life</span>
          </h1>
          <p className={styles.heroDescription}>
            Restore damaged family photos and preserve precious memories with our AI-powered tools. 
            From fixing tears and scratches to adding vibrant colors to black and white images.
          </p>
          
          {/* Main Restoration Options - Colorization now first */}
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
        </div>

        {/* Divider */}
        <div className={styles.divider}>
          <div className={styles.dividerLine}></div>
          <span className={styles.dividerText}>Want to get creative instead?</span>
          <div className={styles.dividerLine}></div>
        </div>

        {/* Lazy-loaded Decades Section */}
        {showDecades ? (
          <DecadesSection onNavigate={handleNavigation} />
        ) : (
          // Loading placeholder
          <div className={styles.decadesSection} style={{ minHeight: '400px' }}>
            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              borderRadius: '8px', 
              height: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#cbd5e1'
            }}>
              Loading decade styles...
            </div>
          </div>
        )}

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