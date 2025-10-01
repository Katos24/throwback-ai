import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../styles/RestoresLanding.module.css';

const RESTORE_OPTIONS = [
  {
    id: 'premium',
    icon: '🎨',
    title: 'Professional Colorization',
    subtitle: 'Museum Quality Results',
    description: 'Transform black and white photos into vivid color with historically accurate, professional-grade restoration.',
    exampleImage: '/images/gallery/restore4.jpg',
    features: [
      'Full color restoration',
      'Advanced damage repair',
      'Historically accurate colors'
    ],
    credits: 40,
    price: 'From $0.50',
    time: '90 seconds',
    link: '/replicate/restore-premium',
    recommended: 'Most Popular',
    badge: '⭐ Premium'
  },
  {
    id: 'basic',
    icon: '⚡',
    title: 'Quick Repair',
    subtitle: 'Fast & Affordable',
    description: 'Perfect for fixing scratches, tears, and fading on your precious family photos.',
    exampleImage: '/images/gallery/basicrestore.jpg',
    features: [
      'Remove scratches & tears',
      'Repair water damage',
      'Ready in 30 seconds'
    ],
    credits: 1,
    price: 'As low as $0.01',
    time: '30 seconds',
    link: '/replicate/restore-basic',
    recommended: 'Best Value'
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
            Specialized AI trained exclusively on vintage photo restoration. 
            Get professional results ChatGPT and other general AI tools can&apos;t deliver.
          </p>
        </div>

        {/* Why Specialized AI Section */}
        <div className={styles.whySpecializedSection}>
          <div className={styles.whyCard}>
            <div className={styles.whyIcon}>🎯</div>
            <div className={styles.whyContent}>
              <h3 className={styles.whyTitle}>Built for Photos, Not Chat</h3>
              <p className={styles.whyText}>
                Unlike ChatGPT or general AI tools, ThrowbackAI uses specialized models 
                trained exclusively on photo restoration. This means better accuracy, 
                faster processing, and results that preserve your memories perfectly.
              </p>
            </div>
          </div>
          <div className={styles.whyHighlights}>
            <div className={styles.highlight}>
              <span className={styles.highlightIcon}>✓</span>
              <span>Trained on vintage photos, not text</span>
            </div>
            <div className={styles.highlight}>
              <span className={styles.highlightIcon}>✓</span>
              <span>45-second processing vs 5+ minutes</span>
            </div>
            <div className={styles.highlight}>
              <span className={styles.highlightIcon}>✓</span>
              <span>Museum-quality colorization</span>
            </div>
            <div className={styles.highlight}>
              <span className={styles.highlightIcon}>✓</span>
              <span>No image quality loss or compression</span>
            </div>
          </div>
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
                  {option.badge || option.recommended}
                </div>
              </div>

              <h2 className={styles.cardTitle}>{option.title}</h2>
              <p className={styles.cardSubtitle}>{option.subtitle}</p>
              <p className={styles.cardDescription}>{option.description}</p>
              
              {/* Example Image */}
              <div className={styles.exampleImage}>
                <div className={styles.imageContainer}>
                  <Image
                    src={option.exampleImage}
                    alt={`${option.title} example`}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 45vw"
                    quality={85}
                  />
                  <div className={styles.imageSplitLine}></div>
                  <span className={`${styles.imageLabel} ${styles.labelBefore}`}>Before</span>
                  <span className={`${styles.imageLabel} ${styles.labelAfter}`}>After</span>
                </div>
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

        {/* Trust Indicators */}
        <div className={styles.trustSection}>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}>🔒</div>
            <div>
              <div className={styles.trustTitle}>Private & Secure</div>
              <div className={styles.trustDesc}>Photos never shared</div>
            </div>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}>💾</div>
            <div>
              <div className={styles.trustTitle}>Keep Forever</div>
              <div className={styles.trustDesc}>No subscriptions</div>
            </div>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}>⚡</div>
            <div>
              <div className={styles.trustTitle}>Lightning Fast</div>
              <div className={styles.trustDesc}>Results in seconds</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}