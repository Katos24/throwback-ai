// LoadingOverlay.jsx - Modern loading component
// Add this component and use it in your avatar page

import { memo, useEffect, useState } from 'react';
import styles from './AvatarPage.module.css';

/**
 * Modern Loading Overlay Component
 * Shows circular progress, spinner, and fun loading messages
 */
const LoadingOverlay = memo(({ progress = 0, stage = "Processing..." }) => {
  const [loadingMessage, setLoadingMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Fun loading messages that change based on progress
  const loadingMessages = {
    0: "Preparing your transformation...",
    10: "Analyzing your photo...",
    20: "Training the AI model...",
    30: "Applying neural networks...",
    40: "Generating features...",
    50: "Halfway there!",
    60: "Adding magical touches...",
    70: "Polishing the details...",
    80: "Almost ready...",
    90: "Final touches...",
    100: "Complete! 🎉"
  };

  // Update message based on progress
  useEffect(() => {
    const nearestProgress = Math.floor(progress / 10) * 10;
    setLoadingMessage(loadingMessages[nearestProgress] || "Creating your avatar...");

    // Show success animation at 100%
    if (progress >= 100) {
      setTimeout(() => setShowSuccess(true), 300);
    }
  }, [progress]);

  // Circle progress calculation
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={styles.loadingOverlay}>
      {/* Floating particles */}
      <div className={styles.particle}></div>
      <div className={styles.particle}></div>
      <div className={styles.particle}></div>
      <div className={styles.particle}></div>
      <div className={styles.particle}></div>

      {!showSuccess ? (
        <>
          {/* Circular Progress Spinner */}
          <div className={styles.spinnerContainer}>
            {/* Spinning ring animation */}
            <div className={styles.spinnerRing}></div>
            
            {/* SVG circular progress */}
            <svg className={styles.circularProgress}>
              {/* Background circle */}
              <circle
                className={styles.progressCircleBg}
                cx="60"
                cy="60"
                r={radius}
              />
              {/* Progress circle */}
              <circle
                className={styles.progressCircle}
                cx="60"
                cy="60"
                r={radius}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>

            {/* Center percentage */}
            <div className={styles.percentageText}>
              {Math.round(progress)}%
            </div>
          </div>

          {/* Loading stage text */}
          <div className={styles.loadingStage}>{stage}</div>
          
          {/* Fun loading message */}
          <div className={styles.loadingMessage}>{loadingMessage}</div>

          {/* Bottom progress bar (secondary indicator) */}
          <div className={styles.progressBarBottom}>
            <div 
              className={styles.progressBarFill} 
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      ) : (
        /* Success state */
        <div className={styles.loadingSuccess}>
          <div className={styles.successCheckmark}>✓</div>
          <div className={styles.loadingStage}>Avatar Created!</div>
        </div>
      )}
    </div>
  );
});

LoadingOverlay.displayName = 'LoadingOverlay';

export default LoadingOverlay;