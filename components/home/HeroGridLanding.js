import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/HeroGridLanding.module.css';

export default function HeroGridLanding() {
  const restoreOptions = [
    {
      id: 'restore-basic',
      title: 'Photo Restoration',
      description: 'Repair scratches, tears, water damage, and fading from irreplaceable family photos',
      credits: 1,
      badge: 'Try Free',
      badgeColor: 'success',
      link: '/replicate/restore-basic',
      image: '/images/restore-card.png',
      buttonText: 'Restore Photos'
    },
    {
      id: 'colorize',
      title: 'Colorize B&W Photos',
      description: 'Add historically accurate, vibrant colors to black and white family photos',
      credits: 40,
      badge: 'Most Popular',
      badgeColor: 'popular',
      link: '/replicate/restore-premium',
      image: '/images/colorizecardgrid.png',
      buttonText: 'Add Color'
    }
  ];

  const decadeOptions = [
    {
      id: '70s',
      title: '70s Groovy',
      description: 'Hippie, disco, punk, and glam rock styles',
      credits: 50,
      era: '1970s',
      link: '/replicate/70s',
      image: '/images/70s-style.jpg',
      colorClass: styles.orange
    },
    {
      id: '90s',
      title: '90s Grunge',
      description: 'Alternative, grunge, and pop culture vibes',
      credits: 50,
      era: '1990s',
      link: '/replicate/90s',
      image: '/images/90s-style.jpg',
      colorClass: styles.purple
    },
    {
      id: '2000s',
      title: '2000s Y2K',
      description: 'Emo, scene, pop punk, and digital era styles',
      credits: 50,
      era: '2000s',
      link: '/replicate/2000s',
      image: '/images/2000s-style.jpg',
      colorClass: styles.blue
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
                <Link href={option.link} className={styles.restoreCardLink}>
                  <div className={styles.restoreCard}>
                    {/* Badge */}
                    {option.badge && (
                      <div className={`${styles.badge} ${styles[option.badgeColor]}`}>
                        {option.badge}
                      </div>
                    )}
                    
                    {/* Image Preview */}
                    <div className={styles.restoreImageContainer}>
                      <Image
                        src={option.image}
                        alt={option.title}
                        fill
                        className={styles.restoreImage}
                      />
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
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider}>
          <div className={styles.dividerLine}></div>
          <span className={styles.dividerText}>or try something different</span>
          <div className={styles.dividerLine}></div>
        </div>

        {/* Decades Section */}
        <div className={styles.decadesSection}>
          <h2 className={styles.decadesTitle}>
            Time Travel Through the Decades
          </h2>
          <p className={styles.decadesDescription}>
            Transform your photos with authentic styling from different eras. Perfect for creative projects and social media.
          </p>
        </div>

        {/* Decades Grid */}
        <div className={styles.decadesGrid}>
          {decadeOptions.map((decade) => (
            <div key={decade.id} className={styles.decadeCardWrapper}>
              <Link href={decade.link} className={styles.decadeCardLink}>
                <div className={styles.decadeCard}>
                  
                  {/* Era Badge */}
                  <div className={`${styles.eraBadge} ${decade.colorClass}`}>
                    <div className={styles.eraText}>{decade.era}</div>
                  </div>
                  
                  {/* Image */}
                  <div className={styles.decadeImageContainer}>
                    <Image
                      src={decade.image}
                      alt={decade.title}
                      fill
                      className={styles.decadeImage}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className={styles.decadeContent}>
                    <h3 className={styles.decadeTitle}>{decade.title}</h3>
                    <p className={styles.decadeDescription}>{decade.description}</p>
                    
                    <div className={styles.decadeFooter}>
                      <div className={styles.decadeCredits}>
                        <span className={styles.decadeCreditsNumber}>{decade.credits}</span> credits
                      </div>
                      <div className={styles.decadeCta}>
                        Try Style →
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={styles.bottomCta}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaIcon}>⚡</div>
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