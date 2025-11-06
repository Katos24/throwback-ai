import React from 'react';
import styles from './ModeSelector.module.css';

export default function ModeSelector({ 
  restoreMode, 
  setRestoreMode, 
  credits, 
  loading,
  processing,
  handleRestoreClick,
  handleReset,
  getFixedButtonText
}) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Choose Your Enhancement</h3>
      
      
      <div className={styles.optionsGrid}>
        <div 
          className={`${styles.optionCard} ${restoreMode === 'basic' ? styles.active : ''}`}
          onClick={() => setRestoreMode('basic')}
        >
          <div className={styles.badge}>⚡ 1 CREDIT</div>
          <h4 className={styles.optionTitle}>Basic Restore</h4>
          <p className={styles.optionDesc}>
            Perfect for quick fixes - removes scratches, enhances clarity, and improves overall quality
          </p>
        </div>

        <div 
          className={`${styles.optionCard} ${restoreMode === 'premiumColor' ? styles.active : ''} ${credits < 40 ? styles.disabled : ''}`}
          onClick={() => credits >= 40 && setRestoreMode('premiumColor')}
        >
          <div className={`${styles.badge} ${styles.premiumBadge}`}>💎 40 CREDITS</div>
          <h4 className={styles.optionTitle}>Premium Colorization</h4>
          <p className={styles.optionDesc}>
            {credits < 40 
              ? 'Not enough credits - need 40 credits' 
              : 'Studio-quality AI colorization with vibrant, historically accurate colors'}
          </p>
        </div>
      </div>

      <div className={styles.buttonRow}>
        <button
          onClick={handleRestoreClick}
          disabled={loading || processing}
          className={styles.primaryButton}
        >
          {getFixedButtonText()}
        </button>
        
        <button
          onClick={handleReset}
          className={styles.secondaryButton}
        >
          <span className={styles.buttonIcon}>🔄</span>
          <span>Start Over</span>
        </button>
      </div>
    </div>
  );
}