// components/decades/shared/ImageLoadingOverlay.js
import { useState, useEffect } from 'react';
import styles from '../../../styles/ImageLoadingOverlay.module.css';

export default function ImageLoadingOverlay({ 
  isLoading, 
  progress = 0, 
  progressStage = '', 
  decade = '80s' 
}) {
  const [dots, setDots] = useState('');

  // Animated dots for loading text
  useEffect(() => {
    if (!isLoading) return;
    
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  // Get decade-specific styling
  const getDecadeClass = () => {
    switch(decade) {
      case '70s': return styles.seventies;
      case '80s': return styles.eighties;
      case '90s': return styles.nineties;
      case '2000s': return styles.twothousands;
      default: return styles.eighties;
    }
  };

  const getDecadeIcon = () => {
    switch(decade) {
      case '70s': return '🕺';
      case '80s': return '📻';
      case '90s': return '📱';
      case '2000s': return '💿';
      default: return '📻';
    }
  };

  const getLoadingText = () => {
    switch(decade) {
      case '70s': return 'Creating your groovy photo';
      case '80s': return 'Creating your awesome photo';
      case '90s': return 'Creating your rad photo';
      case '2000s': return 'Creating your cool photo';
      default: return 'Creating your photo';
    }
  };

  return (
    <div className={`${styles.overlay} ${getDecadeClass()}`}>
      {/* Background blur */}
      <div className={styles.backdrop} />
      
      {/* Loading content */}
      <div className={styles.content}>
        {/* Decade-themed spinner */}
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}>
            <span className={styles.spinnerIcon}>{getDecadeIcon()}</span>
          </div>
        </div>

        {/* Loading text */}
        <div className={styles.loadingText}>
          <h3 className={styles.title}>
            {getLoadingText()}{dots}
          </h3>
          {progressStage && (
            <p className={styles.stage}>{progressStage}</p>
          )}
        </div>

        {/* Progress bar */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${Math.max(progress, 5)}%` }}
            />
          </div>
          <div className={styles.progressText}>
            {Math.round(progress)}%
          </div>
        </div>

        {/* Retro loading animation */}
        <div className={styles.retroLoader}>
          {Array.from({ length: 8 }, (_, i) => (
            <div 
              key={i} 
              className={styles.retroBar}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}