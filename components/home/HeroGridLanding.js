import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../../styles/HeroGridLanding.module.css';

export default function HeroGridLanding() {
  const router = useRouter();

  // Handle navigation with forced scroll to top
  const handleNavigation = (href) => {
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Navigate to the page
    router.push(href);
  };

  const restoreOptions = [
    {
      id: 'restore-basic',
      title: 'Photo Restoration',
      description: 'Repair scratches, tears, water damage, and fading from irreplaceable family photos',
      credits: 1,
      badge: 'Try Free',
      badgeColor: 'success',
      link: '/replicate/restore-basic',
      beforeImage: '/images/basic-before.jpg',
      afterImage: '/images/basic-after.jpg',
      buttonText: 'Restore (Try Free)'
    },
    {
      id: 'colorize',
      title: 'Colorize B&W Photos',
      description: 'Add historically accurate, vibrant colors to black and white family photos',
      credits: 40,
      badge: 'Most Popular',
      badgeColor: 'popular',
      link: '/replicate/restore-premium',
      beforeImage: '/images/beforeexample.jpg',
      afterImage: '/images/afterexample.jpg',
      buttonText: 'Add Color'
    }
  ];

  const decadeOptions = [
    {
      id: 'all-decades',
      title: 'All Decades',
      description: 'Try every era - 70s, 80s, 90s, and 2000s styles in one collection',
      credits: 50,
      era: 'Time Travel',
      link: '/decades',
      fullBackgroundImage: '/images/ThrowbackDecadesCard.jpg',
      colorClass: styles.rainbow,
      cardClass: styles.allDecadesCard,
      badge: 'Complete Collection',
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
      colorClass: styles.orange,
      cardClass: styles.seventiesCard
    },
    {
      id: '80s',
      title: '80s Neon',
      description: 'New wave, synthpop, and neon-bright aesthetics',
      credits: 50,
      era: '1980s',
      link: '/replicate/80s',
      beforeImage: '/images/sarahbefore.jpg',
      afterImage: '/images/sarah80s.jpg',
      colorClass: styles.neon,
      cardClass: styles.eightiesCard
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
      colorClass: styles.purple,
      cardClass: styles.ninetiesCard
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
      colorClass: styles.blue,
      cardClass: styles.twothousandsCard
    }
  ];

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
          
          {/* Main Restoration Options */}
          <div className={styles.restoreGrid}>
            {restoreOptions.map((option) => (
              <div key={option.id} className={styles.restoreCardWrapper}>
                {/* Use button with custom navigation instead of Link */}
                <button 
                  className={styles.restoreCardLink}
                  onClick={() => handleNavigation(option.link)}
                  style={{ all: 'unset', cursor: 'pointer', display: 'block', width: '100%' }}
                >
                  <div className={styles.restoreCard}>
                    {/* Badge */}
                    {option.badge && (
                      <div className={`${styles.badge} ${styles[option.badgeColor]}`}>
                        {option.badge}
                      </div>
                    )}
                    
                    {/* Before/After Image Split */}
                    <div className={styles.beforeAfterSplit}>
                      <Image
                        src={option.beforeImage}
                        alt={`${option.title} - Before`}
                        fill
                        className={styles.beforeImage}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <Image
                        src={option.afterImage}
                        alt={`${option.title} - After`}
                        fill
                        className={styles.afterImage}
                        sizes="(max-width: 768px) 100vw, 50vw"
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
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider}>
          <div className={styles.dividerLine}></div>
          <span className={styles.dividerText}>Want to get creative instead?</span>
          <div className={styles.dividerLine}></div>
        </div>

        {/* Decades Section */}
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
            {decadeOptions.map((decade) => (
              <div key={decade.id} className={styles.decadeCardWrapper}>
                {/* Use button with custom navigation for decade links too */}
                <button 
                  className={styles.decadeCardLink}
                  onClick={() => handleNavigation(decade.link)}
                  style={{ all: 'unset', cursor: 'pointer', display: 'block', width: '100%' }}
                >
                  <div className={`${styles.decadeCard} ${decade.cardClass}`}>
                    
                    {/* Badge */}
                    {decade.badge && (
                      <div className={`${styles.badge} ${styles[decade.badgeColor]}`}>
                        {decade.badge}
                      </div>
                    )}
                    
                    {/* Era Badge */}
                    <div className={`${styles.eraBadge} ${decade.colorClass}`}>
                      <div className={styles.eraText}>{decade.era}</div>
                    </div>
                    
                    {/* Conditional rendering: Full Background vs Before/After Split */}
                    {decade.isFullBackground ? (
                      // Full background image for All Decades card
                      <div className={styles.fullBackgroundContainer}>
                        <Image
                          src={decade.fullBackgroundImage}
                          alt={`${decade.title} - Time Travel Background`}
                          width={280}
                          height={240}
                          className={styles.fullBackgroundImage}
                        />
                      </div>
                    ) : (
                      // Regular before/after split for individual decade cards
                      <div className={styles.decadeBeforeAfter}>
                        <Image
                          src={decade.beforeImage}
                          alt={`${decade.title} - Before`}
                          width={140}
                          height={220}
                          className={styles.decadeBeforeImage}
                        />
                        <Image
                          src={decade.afterImage}
                          alt={`${decade.title} - After`}
                          width={140}
                          height={220}
                          className={styles.decadeAfterImage}
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
            ))}
          </div>
        </div>

        {/* Bottom CTA - Keep this as Link since it's not a decade page */}
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