import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from "./DecadeShowcase.module.css";

const DECADE_DATA = {
  '70s': {
    title: '70s Yearbook',
    tagline: 'Peace, Love & Groovy Vibes',
    description: 'Transform into a 70s icon with authentic retro styling. From disco glam to punk rebellion, capture the essence of the most colorful decade.',
    styles: ['Disco Glam', 'Farrah Feathered', 'Soul Style', 'Roller Disco', 'Campus Haze', 'Punk Rebel', 'Boho Folk'],
    path: '/replicate/70s',
    color: '#FF8C00',
    bgGradient: 'linear-gradient(135deg, #FF8C00 0%, #FFD700 100%)',
    imageCount: 10
  },
  '80s': {
    title: '80s Yearbook',
    tagline: 'Neon Dreams & Big Hair',
    description: 'Go totally radical with authentic 80s style. Rock the mullet, own the power suit, or channel your inner new wave icon with our AI transformation.',
    styles: ['New Wave', 'Rock & Metal', 'Pop Culture', 'Valley Girl', 'Wedding Singer', 'Aerobics', 'Miami Vice'],
    path: '/replicate/80s',
    color: '#00FFFF',
    bgGradient: 'linear-gradient(135deg, #FF0080 0%, #00FFFF 100%)',
    imageCount: 13
  },
  '90s': {
    title: '90s Yearbook',
    tagline: 'As If! Totally Rad Throwbacks',
    description: 'Relive the decade of grunge, boy bands, and frosted tips. From Rachel haircuts to baggy jeans, nail the 90s aesthetic perfectly.',
    styles: ['Classic 90s', 'Grunge', 'Pop Star', 'Hip Hop', 'Preppy', 'Rave', 'Alt Rock'],
    path: '/replicate/90s',
    color: '#9D4EDD',
    bgGradient: 'linear-gradient(135deg, #FF006E 0%, #8338EC 100%)',
    imageCount: 10
  },
  '2000s': {
    title: '2000s Yearbook',
    tagline: 'Y2K Vibes & Bling Era',
    description: 'Bring back the millennium with low-rise jeans, trucker hats, and emo style. The era of flip phones and MySpace awaits.',
    styles: ['Scene/Emo', 'Pop Punk', 'Hip Hop Bling', 'Indie Sleaze', 'Jersey Shore', 'Hipster', 'Pop Princess'],
    path: '/replicate/2000s',
    color: '#06B6D4',
    bgGradient: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
    imageCount: 10
  }
};

const DecadeShowcase = ({ currentDecade = '90s' }) => {
  // Get all decades except current one
  const otherDecades = Object.entries(DECADE_DATA)
    .filter(([key]) => key !== currentDecade)
    .map(([key, data]) => ({ key, ...data }));

  return (
    <section className={styles.showcaseSection}>
      <div className={styles.showcaseHeader}>
        <h2 className={styles.mainTitle}>Explore Decades</h2>
        <p className={styles.mainSubtitle}>
          Time travel through the eras and discover your perfect retro look
        </p>
      </div>

      <div className={styles.decadesList}>
        {otherDecades.map((decade, index) => {
          const isReversed = index % 2 !== 0;
          
          return (
            <div 
              key={decade.key} 
              className={`${styles.decadeCard} ${isReversed ? styles.reversed : ''}`}
            >
              {/* Image Side */}
              <div className={styles.imageContainer}>
                <div 
                  className={styles.imageWrapper}
                  style={{ background: decade.bgGradient }}
                >
                  <Image
                    src={`/images/decades/${decade.key}-showcase.jpg`}
                    alt={`${decade.title} showcase`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.showcaseImage}
                    style={{ objectFit: 'cover' }}
                  />
                  <div className={styles.imageOverlay}>
                    <span className={styles.decadeEmoji}>{decade.emoji}</span>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className={styles.contentContainer}>
                <div className={styles.content}>
                  <span 
                    className={styles.decadeLabel}
                    style={{ color: decade.color }}
                  >
                    {decade.key.toUpperCase()}
                  </span>
                  
                  <h3 className={styles.decadeTitle}>{decade.title}</h3>
                  
                  <p className={styles.decadeTagline}>{decade.tagline}</p>
                  
                  <p className={styles.decadeDescription}>
                    {decade.description}
                  </p>

                  <div className={styles.stylesList}>
                    <span className={styles.stylesLabel}>Available Styles:</span>
                    <div className={styles.styleTags}>
                      {decade.styles.slice(0, 5).map((style, i) => (
                        <span key={i} className={styles.styleTag}>
                          {style}
                        </span>
                      ))}
                      {decade.styles.length > 5 && (
                        <span className={styles.styleTag}>
                          +{decade.styles.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.decadeStats}>
                    <div className={styles.stat}>
                      <span className={styles.statNumber}>{decade.imageCount}</span>
                      <span className={styles.statLabel}>Unique Styles</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statNumber}>50</span>
                      <span className={styles.statLabel}>Credits</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statNumber}>30s</span>
                      <span className={styles.statLabel}>Generation</span>
                    </div>
                  </div>

                  <Link 
                    href={decade.path} 
                    className={styles.tryButton}
                    style={{ 
                      background: decade.bgGradient,
                      boxShadow: `0 4px 20px ${decade.color}40`
                    }}
                  >
                    Try {decade.key} Style
                    <span className={styles.arrow}>→</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className={styles.bottomCTA}>
        <div className={styles.ctaContent}>
          <h3 className={styles.ctaTitle}>Ready to Time Travel?</h3>
          <p className={styles.ctaText}>
            Get 50 free credits when you sign up. That's your first yearbook photo on us!
          </p>
          <Link href="/pricing" className={styles.ctaButton}>
            Get Started Free
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DecadeShowcase;