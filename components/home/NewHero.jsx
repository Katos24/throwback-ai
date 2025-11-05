import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './NewHero.module.css';

const FEATURES = [

  {
    id: 'decades',
    title: 'Time Machine',
    subtitle: '70s-2000s Styles',
    description: 'Vintage yearbook photos',
    image: '/images/decades/70s-styles/male/boho-folk.jpg',
    link: '/decades',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: 'restore',
    title: 'Restore Photos',
    subtitle: 'Fix & Enhance',
    description: 'Bring old photos to life',
    image: '/images/restorehero.jpg',
    link: '/replicate/restore-premium',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  }
];

export default function NewHero() {
  const router = useRouter();

  const handleCardClick = (link) => {
    router.push(link);
  };

  return (
    <section className={styles.heroSection}>
      {/* Background Effects */}
      <div className={styles.bgGradient}>
        <div className={styles.gradientOrb} style={{ top: '10%', left: '10%' }}></div>
        <div className={styles.gradientOrb} style={{ top: '60%', right: '15%' }}></div>
        <div className={styles.gradientOrb} style={{ bottom: '20%', left: '50%' }}></div>
      </div>

      <div className={styles.container}>
        {/* Hero Header */}
        <div className={styles.header}>
          <h1 className={styles.mainTitle}>
            Create Viral AI Transformations
          </h1>
          <p className={styles.mainSubtitle}>
            Transform into fantasy avatars, travel through decades, or restore precious memories. 
            All powered by cutting-edge AI in under 60 seconds.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className={styles.featuresGrid}>
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              className={styles.featureCard}
              onClick={() => handleCardClick(feature.link)}
              role="button"
              tabIndex={0}
            >
              <div className={styles.cardImageWrapper}>
                <div 
                  className={styles.cardGradient}
                  style={{ background: feature.gradient }}
                ></div>
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className={styles.cardImage}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className={styles.cardOverlay}>
                  <span className={styles.cardEmoji}>{feature.emoji}</span>
                </div>
              </div>
              
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardSubtitle}>{feature.subtitle}</p>
                <p className={styles.cardDescription}>{feature.description}</p>
                
                <div className={styles.cardCta}>
                  <span className={styles.tryButton}>
                    Try Now →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={styles.heroCta}>
          <button 
            className={styles.primaryButton}
            onClick={() => router.push('/signup')}
          >
            Get Started Free - 50 Credits
          </button>
          <p className={styles.ctaNote}>
            No credit card required • Credits never expire • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}