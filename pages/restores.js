import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ImageCompareSlider from '../components/ImageCompareSlider';
import styles from '../styles/RestoresLanding.module.css';

const RESTORE_OPTIONS = [
  {
    id: 'premium',
    title: 'Professional Colorization',
    subtitle: 'Museum Quality Results',
    description: 'Transform black and white photos into vivid color with historically accurate, professional-grade restoration.',
    features: [
      'Full color restoration',
      'Advanced damage repair',
      'Historically accurate colors'
    ],
    credits: 40,
    price: 'From $0.50',
    time: '10-30 seconds',
    link: '/replicate/restore-premium',
    badge: '⭐ PREMIUM'
  },
  {
    id: 'basic',
    title: 'Quick Repair',
    subtitle: 'Fast & Affordable',
    description: 'Perfect for fixing scratches, tears, and fading on your precious family photos.',
    features: [
      'Remove scratches & tears',
      'Repair water damage',
      'Ready in seconds'
    ],
    credits: 1,
    price: 'As low as $0.01',
    time: 'Under 10 seconds',
    link: '/replicate/restore-basic',
    badge: '💰 BEST VALUE'
  }
];

// Example images - using combined before/after images
const EXAMPLE_IMAGES = [
  {
    id: 1,
    // For the slider, we'll need to extract before/after from combined image
    // Or use separate images if available
    combinedImage: '/images/colorize-before-after-combined.jpg',
    beforeImage: '/images/examples/restore-before-1.jpg',
    afterImage: '/images/examples/restore-after-1.jpg',
    title: 'Family Portrait Restoration'
  },
  {
    id: 2,
    combinedImage: '/images/restore-before-after-combined.jpg',
    beforeImage: '/images/examples/restore-before-2.jpg',
    afterImage: '/images/examples/restore-after-2.jpg',
    title: 'Vintage Photo Colorization'
  },
  {
    id: 3,
    combinedImage: '/images/gallery/restore4.jpg',
    beforeImage: '/images/examples/restore-before-3.jpg',
    afterImage: '/images/examples/restore-after-3.jpg',
    title: 'Damaged Photo Repair'
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
      {/* Starfield Background */}
      <div className={styles.starfield}></div>

      {/* Grid Pattern */}
      <div className={styles.gridPattern}></div>

      {/* Content Container */}
      <div className={styles.contentWrapper}>
        
        {/* Greek Column Decorative Elements */}
        <div className={styles.columnLeft}></div>
        <div className={styles.columnRight}></div>

      {/* Hero Section */}
        <div className={styles.heroSection}>
          {/* Main Headline */}
          <h1 className={styles.title}>
            Preserve Your
            <br />
            <span className={styles.gradientText}>Family Legacy</span>
          </h1>

          <p className={styles.subtitle}>
            Fast, specialized AI built exclusively for photo restoration. Unlike general-purpose AI tools, we deliver professional results in seconds.
          </p>

          {/* Hero Video */}
          <div className={styles.heroVideoWrapper}>
            <video 
              className={styles.heroVideo}
              autoPlay 
              muted 
              loop 
              playsInline
              preload="auto"
              onError={(e) => console.error('Video error:', e)}
            >
              <source src="/videos/restore-demo.mp4" type="video/mp4" />
              <source src="/videos/restore-demo.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Two Option Cards */}
        <div className={styles.optionsGrid}>
          {RESTORE_OPTIONS.map((option) => (
            <div
              key={option.id}
              className={`${styles.optionCard} ${
                selectedOption === option.id ? styles.selected : ''
              } ${option.id === 'premium' ? styles.premiumCard : styles.basicCard}`}
              onClick={() => handleCardClick(option)}
            >
              {/* Glow effect for premium */}
              {option.id === 'premium' && <div className={styles.cardGlow}></div>}

              {/* Badge */}
              <div className={styles.cardBadge}>
                {option.badge}
              </div>

              <div className={styles.cardIcon}>{option.icon}</div>
              
              <h3 className={styles.cardTitle}>{option.title}</h3>
              <p className={styles.cardSubtitle}>{option.subtitle}</p>
              <p className={styles.cardDescription}>{option.description}</p>

              {/* Features */}
              <ul className={styles.featureList}>
                {option.features.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>
                    <span className={styles.featureCheck}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Price and Time */}
              <div className={styles.cardFooter}>
                <div className={styles.priceBox}>
                  <div className={styles.credits}>{option.credits} {option.credits === 1 ? 'credit' : 'credits'}</div>
                  <div className={styles.price}>{option.price}/photo</div>
                </div>
                <div className={styles.timeBox}>
                  <span>⏱️ {option.time}</span>
                </div>
              </div>

              {/* Button */}
              <button className={styles.selectButton}>
                Start {option.title}
              </button>
            </div>
          ))}
        </div>

        {/* Examples Section */}
        <div className={styles.examplesSection}>
          <h2 className={styles.examplesTitle}>See the Transformation</h2>
          <p className={styles.examplesSubtitle}>
            Real photos restored with our AI technology
          </p>

          <div className={styles.examplesGrid}>
            {EXAMPLE_IMAGES.map((example) => (
              <div key={example.id} className={styles.exampleCard}>
                <div className={styles.exampleImageWrapper}>
                  <ImageCompareSlider
                    beforeImage={example.beforeImage}
                    afterImage={example.afterImage}
                  />
                </div>
                <p className={styles.exampleTitle}>{example.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Section */}
        <div className={styles.trustSection}>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}>🔒</div>
            <div className={styles.trustContent}>
              <div className={styles.trustTitle}>Private & Secure</div>
              <div className={styles.trustDesc}>Photos never shared</div>
            </div>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}>💾</div>
            <div className={styles.trustContent}>
              <div className={styles.trustTitle}>Keep Forever</div>
              <div className={styles.trustDesc}>No subscriptions</div>
            </div>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}>⚡</div>
            <div className={styles.trustContent}>
              <div className={styles.trustTitle}>Lightning Fast</div>
              <div className={styles.trustDesc}>Results in seconds</div>
            </div>
          </div>
        </div>

        {/* Greek Column Bottom Decorative */}
        <div className={styles.columnsBottom}>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className={styles.columnBar}></div>
          ))}
        </div>
      </div>
    </div>
  );
}