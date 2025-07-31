import { useState, useEffect } from 'react';
import styles from "../../styles/ProgressBar.module.css";

export default function ProgressBar({ 
  status, 
  progress = 0, 
  showSteps = true,
  className = '' 
}) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  const steps = [
    { key: 'idle', label: 'Ready', icon: '📸' },
    { key: 'compressing', label: 'Compressing', icon: '📦' },
    { key: 'uploading', label: 'Uploading', icon: '☁️' },
    { key: 'processing', label: 'Restoring', icon: '✨' },
    { key: 'complete', label: 'Complete', icon: '✅' }
  ];

  const currentStepIndex = steps.findIndex(step => step.key === status);
  const progressPercentage = Math.min(100, Math.max(0, progress || (currentStepIndex + 1) * 25));

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progressPercentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [progressPercentage]);

  return (
    <div className={`${styles.progressContainer} ${className}`}>
      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ width: `${animatedProgress}%` }}
        >
          <div className={styles.progressShine}></div>
        </div>
        <div className={styles.progressText}>
          {Math.round(animatedProgress)}%
        </div>
      </div>

      {/* Steps Indicator */}
      {showSteps && (
        <div className={styles.stepsContainer}>
          {steps.map((step, index) => (
            <div 
              key={step.key}
              className={`${styles.step} ${
                index < currentStepIndex ? styles.stepActive : ''
              } ${index === currentStepIndex ? styles.stepCurrent : ''}`}
            >
              <div className={styles.stepIcon}>{step.icon}</div>
              <div className={styles.stepLabel}>{step.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
