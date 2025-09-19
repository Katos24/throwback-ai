// components/shared/ProgressOverlay.js
import { useState, useEffect } from 'react';
import styles from './ProgressOverlay.module.css';

const ProgressOverlay = ({ 
  isLoading, 
  progress = 0, 
  progressStage = "Processing...", 
  decade = "2000s",
  type = "overlay" // "overlay" or "top"
}) => {
  const [dots, setDots] = useState("");

  // Animated dots effect
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  // Top progress bar variant
  if (type === "top") {
    return (
      <div className={styles.topProgressContainer}>
        <div className={styles.topProgressBar}>
          <div 
            className={styles.topProgressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className={styles.topProgressText}>
          <span>{progressStage}{dots}</span>
          <span>{progress}%</span>
        </div>
      </div>
    );
  }

  // Overlay variant (default)
  return (
    <div className={styles.progressOverlay}>
      <div className={styles.overlayContent}>
        {/* Animated spinner */}
        <div className={styles.spinnerContainer}>
          <div className={`${styles.spinner} ${styles[`spinner${decade}`]}`}>
            <div className={styles.spinnerInner}></div>
          </div>
        </div>

        {/* Progress bar */}
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar}>
            <div 
              className={`${styles.progressFill} ${styles[`progressFill${decade}`]}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Progress text */}
        <div className={styles.progressText}>
          <div className={styles.progressStage}>
            {progressStage}{dots}
          </div>
          <div className={styles.progressPercent}>
            {progress}%
          </div>
        </div>

        {/* Decade-specific decoration */}
        <div className={`${styles.decoration} ${styles[`decoration${decade}`]}`}>
          {getDecadeIcon(decade)}
        </div>
      </div>
    </div>
  );
};

// Helper function to get decade-specific icons
const getDecadeIcon = (decade) => {
  const icons = {
    "70s": "🌈",
    "80s": "🎸",
    "90s": "📼", 
    "2000s": "💻"
  };
  return icons[decade] || "✨";
};

export default ProgressOverlay;