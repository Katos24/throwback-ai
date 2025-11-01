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
          onClick={handleReset}
          className={styles.secondaryButton}
        >
          <span className={styles.buttonIcon}>🔄</span>
          <span>New Photo</span>
        </button>
      </div>

      <div className={styles.enhanceAgainSection}>
        <button
          onClick={handleUseRestoredImage}
          className={styles.enhanceButton}
        >
          🎨 Enhance This Result Again
        </button>
        <p className={styles.enhanceHint}>
          Use the {restoreMode === 'basic' ? 'restored' : 'colorized'} photo as input to apply another enhancement
        </p>
      </div>

      <div className={`${styles.alert} ${isPremium ? styles.premiumAlert : ''}`}>
        <span>{isPremium ? '🌈' : '✅'}</span>
        <p>Photo successfully processed! Use the slider to compare.</p>
      </div>
    </div>
  );
}