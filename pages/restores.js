import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../styles/RestoresLanding.module.css';

const RESTORE_OPTIONS = [
  {
    id: 'basic',
    icon: '⚡',
    title: 'Quick Repair',
    subtitle: 'Fast & Affordable',
    description: 'Perfect for fixing scratches, tears, and fading on your precious family photos.',
    exampleImage: '/images/gallery/basicrestore.jpg',
    features: [
      'Remove scratches and tears',
      'Repair water damage',
      'Enhance faded colors',
      'Ready in 30 seconds'
    ],
    credits: 1,
    price: 'As low as $0.01',
    time: '30 seconds',
    link: '/replicate/restore-basic',
    recommended: 'Best for minor damage'
  },
  {
    id: 'premium',
    icon: '🎨',
    title: 'Professional Colorization',
    subtitle: 'Museum Quality',
    description: 'Bring black and white memories to life with authentic, historically accurate colors.',
    exampleImage: '/images/gallery/restore4.jpg',
    features: [
      'Full color restoration',
      'Advanced damage repair',
      'Professional quality results',
      'Historically accurate colors'
    ],
    credits: 40,
    price: 'From $0.50',
    time: '90 seconds',
    link: '/replicate/restore-premium',
    recommended: 'Best for black & white photos'
  }
];

export default function RestoresLanding() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleCardClick = (option) => {
    setSelectedOption(option.id);
    setTimeout(() => {
      router.push(option.link);
    }, 300);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Restore Your Family Photos</h1>
          <p className={styles.subtitle}>
            Professional photo restoration powered by AI technology. 
            Preserve your memories for generations to come.
          </p>
        </div>

        {/* Options Grid */}
        <div className={styles.optionsGrid}>
          {RESTORE_OPTIONS.map((option) => (
            <div
              key={option.id}
              className={`${styles.optionCard} ${
                selectedOption === option.id ? styles.selected : ''
              }`}
              onClick={() => handleCardClick(option)}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>{option.icon}</div>
                <div className={styles.recommendedBadge}>
                  {option.recommended}
                </div>
              </div>

              <h2 className={styles.cardTitle}>{option.title}</h2>
              <p className={styles.cardSubtitle}>{option.subtitle}</p>
              <p className={styles.cardDescription}>{option.description}</p>
              
              {/* Example Image */}
              <div className={styles.exampleImage}>
                {option.exampleImage ? (
                  <div className={styles.imageContainer}>
                    <Image
                      src={option.exampleImage}
                      alt={`${option.title} - Before and After example`}
                      fill
                      className={styles.image}
                      sizes="(max-width: 768px) 100vw, 45vw"
                      quality={85}
                    />
                    <div className={styles.imageSplitLine}></div>
                    <span className={`${styles.imageLabel} ${styles.labelBefore}`}>Before</span>
                    <span className={`${styles.imageLabel} ${styles.labelAfter}`}>After</span>
                  </div>
                ) : (
                  <div className={styles.imagePlaceholder}>Example Image</div>
                )}
              </div>
              
              <ul className={styles.featureList}>
                {option.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <div className={styles.cardFooter}>
                <div className={styles.priceBox}>
                  <span className={styles.price}>{option.price}</span>
                  <span className={styles.priceLabel}>per photo</span>
                </div>
                <div className={styles.timeBox}>
                  <svg className={styles.clockIcon} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm.5 3v4.5l3 1.5-.5 1-3.5-1.75V4h1z"/>
                  </svg>
                  {option.time}
                </div>
              </div>

              <button className={styles.selectButton}>
                Select {option.title}
              </button>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className={styles.helpSection}>
          <h3 className={styles.helpTitle}>Which option should I choose?</h3>
          <div className={styles.helpGrid}>
            <div className={styles.helpCard}>
              <h4>Quick Repair</h4>
              <p>
                Choose Quick Repair if your photo has minor issues like small scratches, 
                tears, or slight fading. Perfect for photos from the 1960s onward that 
                are already in color.
              </p>
            </div>
            <div className={styles.helpCard}>
              <h4>Professional Colorization</h4>
              <p>
                Choose Professional Colorization for black and white photos, or photos 
                with severe damage. This option brings old memories to life with authentic 
                colors and advanced restoration.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className={styles.trustSection}>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}>🔒</div>
            <div>
              <div className={styles.trustTitle}>100% Private & Secure</div>
              <div className={styles.trustDesc}>Your photos are never shared</div>
            </div>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}>💾</div>
            <div>
              <div className={styles.trustTitle}>Download & Keep Forever</div>
              <div className={styles.trustDesc}>No subscriptions required</div>
            </div>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}>👨‍👩‍👧‍👦</div>
            <div>
              <div className={styles.trustTitle}>AI Trained on 500K+ Photos</div>
              <div className={styles.trustDesc}>Advanced restoration technology</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}