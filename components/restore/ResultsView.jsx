import React from 'react';
import ImageCompareSlider from '../ImageCompareSlider';
import styles from './ResultsView.module.css';

export default function ResultsView({
  selectedPreviewUrl,
  restoredUrl,
  restoreMode,
  isPremium,
  handleDownload,
  handleReset,
  handleUseRestoredImage
}) {
  return (
    <div className={styles.container}>
      <div className={styles.comparisonWrapper}>
        <ImageCompareSlider
          beforeImage={selectedPreviewUrl}
          afterImage={restoredUrl}
        />
      </div>

      <div className={styles.buttonRow}>
        <button
          onClick={handleDownload}
          className={`${styles.primaryButton} ${isPremium ? styles.premiumButton : ''}`}
        >
          <span>⬇️</span>
          Download Result
        </button>
        
        <button
          onClick={handleUseRestoredImage}
          className={styles.enhanceButton}
        >
          <span>🎨</span>
          Enhance Again
        </button>
        
        <button
          onClick={handleReset}
          className={styles.secondaryButton}
        >
          <span className={styles.buttonIcon}>🔄</span>
          <span>New Photo</span>
        </button>
      </div>

      <div className={`${styles.alert} ${isPremium ? styles.premiumAlert : ''}`}>
        <span>{isPremium ? '🌈' : '✅'}</span>
        <p>Photo successfully processed! Use the slider to compare before and after.</p>
      </div>
    </div>
  );
}