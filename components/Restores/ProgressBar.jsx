import { useState, useEffect } from 'react';
import styles from "../../styles/ProgressBar.module.css";

export default function ProgressBar({
  status,
  progress = null,
  showSteps = true,
  className = '',
  loading // Add this to catch the loading prop you're passing
}) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  
  // Debug: Log what props are being received
  console.log('ProgressBar props:', { status, progress, loading });
  
  const steps = [
    { key: 'idle', label: 'Ready', icon: '📸' },
    { key: 'compressing', label: 'Compressing', icon: '📦' },
    { key: 'uploading', label: 'Uploading', icon: '☁️' },
    { key: 'processing', label: 'Restoring', icon: '✨' },
    { key: 'complete', label: 'Complete', icon: '✅' }
  ];

  // If you're still passing 'loading' instead of 'status', handle it here
  const actualStatus = status || (loading ? 'processing' : 'idle');
  
  const currentStepIndex = steps.findIndex(step => step.key === actualStatus);
  const fallbackProgress = Math.min(100, (currentStepIndex + 1) * 25);
  
  // Don't show indeterminate bar for idle state or complete state
  const shouldShowIndeterminate = progress === null && 
    actualStatus !== 'idle' && 
    actualStatus !== 'complete';
    
  // For complete state, show 100% progress
  const displayProgress = actualStatus === 'complete' ? 100 : animatedProgress;

  useEffect(() => {
    const targetProgress = progress === null ? fallbackProgress : Math.min(100, Math.max(0, progress));
    const timer = setTimeout(() => {
      setAnimatedProgress(targetProgress);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress, fallbackProgress]);

  // Debug: Log the calculated values
  console.log('ProgressBar state:', { 
    actualStatus, 
    currentStepIndex, 
    fallbackProgress, 
    animatedProgress,
    progressIsNull: progress === null 
  });

  return (
    <div className={`${styles.progressContainer} ${className}`}>
      <div className={styles.progressBar}>
        {shouldShowIndeterminate ? (
          <div className={styles.indeterminateBar}>
            <div className={styles.indeterminateFill}></div>
          </div>
        ) : (
          <div
            className={styles.progressFill}
            style={{ width: `${displayProgress}%` }}
          >
            <div className={styles.progressShine}></div>
          </div>
        )}
        <div className={styles.progressText}>
          {shouldShowIndeterminate ? actualStatus?.toUpperCase() || 'Loading...' : `${Math.round(displayProgress)}%`}
        </div>
      </div>
      
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