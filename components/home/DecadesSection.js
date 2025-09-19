import React, { useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../../styles/DecadesGridLanding.module.css';

// Static decades data
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

// Memoized DecadeCard component
const DecadeCard = React.memo(({ decade, onNavigate }) => (
  <div className={styles.decadeCardWrapper}>
    <button 
      className={styles.decadeCardLink}
      onClick={() => onNavigate(decade.link)}
      style={{ 
        all: 'unset', 
        cursor: 'pointer', 
        display: 'block', 
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box'
      }}
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
              fill
              className={styles.fullBackgroundImage}
              loading="lazy"
              quality={75}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          // Regular before/after split for individual decade cards
          <div className={styles.decadeBeforeAfter}>
            <div style={{ position: 'relative', width: '50%', height: '100%' }}>
              <Image
                src={decade.beforeImage}
                alt={`${decade.title} - Before`}
                fill
                className={styles.decadeBeforeImage}
                loading="lazy"
                quality={75}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div style={{ position: 'relative', width: '50%', height: '100%' }}>
              <Image
                src={decade.afterImage}
                alt={`${decade.title} - After`}
                fill
                className={styles.decadeAfterImage}
                loading="lazy"
                quality={75}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
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

// Main DecadesSection component
export default function DecadesSection() {
  const router = useRouter();

  // Navigation handler
  const handleNavigation = useCallback((href) => {
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Navigate to the page
    router.push(href);
  }, [router]);

  return (
    <div className={styles.decadesSection}>
      <div className={styles.container}>
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
              onNavigate={handleNavigation} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}