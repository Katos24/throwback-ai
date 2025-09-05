import React, { useState } from 'react';
import styles from '../styles/YearbookGallery.module.css';

const YearbookGallery = ({ onStyleSelect }) => {
  const [selectedSample, setSelectedSample] = useState(null);

  // Sample data - replace with your actual before/after images
  const sampleTransformations = [
    {
      id: 1,
      name: "Sarah M.",
      style: "Grunge",
      styleValue: "grunge_90s",
      quote: "Whatever, nevermind",
      beforeImage: "/images/sarahbefore.jpg",
      afterImage: "/images/sarahafter.jpg",
      emoji: "🎸"
    },
    {
      id: 2,
      name: "Mike T.",
      style: "Hip Hop",
      styleValue: "hip_hop_90s",
      quote: "Yo, check it out",
      beforeImage: "/images/mikebefore.jpg",
      afterImage: "/images/mikeafter.jpg",
      emoji: "🎤"
    },
    {
      id: 3,
      name: "Jessica L.",
      style: "Preppy",
      styleValue: "preppy_90s",
      quote: "As if!",
      beforeImage: "/images/jessicabefore.jpg",
      afterImage: "/images/jessicaafter.jpg",
      emoji: "👔"
    },
    {
      id: 4,
      name: "Alex R.",
      style: "Neon",
      styleValue: "neon_90s",
      quote: "Totally radical",
      beforeImage: "/images/alexbefore.jpg",
      afterImage: "/images/alexafter.jpg",
      emoji: "✨"
    },
    {
      id: 5,
      name: "Emma K.",
      style: "Goth",
      styleValue: "goth_90s",
      quote: "Dark and mysterious",
      beforeImage: "/images/emmabefore.jpg",
      afterImage: "/images/emmaafter.jpg",
      emoji: "🖤"
    },
    {
      id: 6,
      name: "Tyler J.",
      style: "Skater",
      styleValue: "skater_90s",
      quote: "Gnarly, dude",
      beforeImage: "/images/tylerbefore.jpg",
      afterImage: "/images/tylerafter.jpg",
      emoji: "🛹"
    }
  ];

  const handleTryStyle = (styleValue) => {
    if (onStyleSelect) {
      onStyleSelect(styleValue);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSampleClick = (sample) => {
    setSelectedSample(selectedSample?.id === sample.id ? null : sample);
  };

  return (
    <div className={styles.yearbookGallery}>
      {/* Yearbook Header */}
      <div className={styles.yearbookHeader}>
        <div className={styles.yearbookTitle}>
          <h2 className={styles.yearbookMainTitle}>Class of &apos;95 - AI Yearbook Gallery</h2>
          <p className={styles.yearbookSubtitle}>See the magic in action with real transformations</p>
        </div>
        <div className={styles.yearbookDecoration}>
          <div className={`${styles.cornerDecoration} ${styles.topLeft}`}></div>
          <div className={`${styles.cornerDecoration} ${styles.topRight}`}></div>
        </div>
      </div>

      {/* Yearbook Page */}
      <div className={styles.yearbookPage}>
        <div className={styles.yearbookGrid}>
          {sampleTransformations.map((sample) => (
            <div 
              key={sample.id} 
              className={styles.studentCard}
              onClick={() => handleSampleClick(sample)}
            >
              {/* Photo Container */}
              <div className={styles.photoContainer}>
                <div className={styles.photoFrame}>
                  <img 
                    src={selectedSample?.id === sample.id ? sample.beforeImage : sample.afterImage}
                    alt={sample.name}
                    className={styles.studentPhoto}
                  />
                  <div className={styles.photoOverlay}>
                    <span className={styles.clickHint}>
                      {selectedSample?.id === sample.id ? 'After' : 'Before'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Student Info */}
              <div className={styles.studentInfo}>
                <h4 className={styles.studentName}>{sample.name}</h4>
                <p className={styles.studentStyle}>
                  <span className={styles.styleEmoji}>{sample.emoji}</span>
                  {sample.style}
                </p>
                <p className={styles.studentQuote}>&apos;{sample.quote}&apos;</p>

              </div>
            </div>
          ))}
        </div>

        {/* Yearbook Footer */}
        <div className={styles.yearbookFooter}>
          <div className={styles.footerText}>
            <p>These transformations were created using our AI technology</p>
            <p>Upload your photo above to create your own 90s yearbook memory!</p>
          </div>
          <div className={styles.yearbookDecoration}>
            <div className={`${styles.cornerDecoration} ${styles.bottomLeft}`}></div>
            <div className={`${styles.cornerDecoration} ${styles.bottomRight}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearbookGallery;