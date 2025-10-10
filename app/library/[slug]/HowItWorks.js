// HowItWorks.js
import React from 'react';
import styles from './HowItWorks.module.css';

export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      icon: '📤',
      title: 'Upload Your Photo',
      description: 'Drag and drop or click to select any old, damaged, or faded family photo from your device.'
    },
    {
      number: '2',
      icon: '🎨',
      title: 'Choose Enhancement',
      description: 'Select Basic (free) for quick repairs or Premium for advanced colorization and detail enhancement.'
    },
    {
      number: '3',
      icon: '⚡',
      title: 'AI Magic Happens',
      description: 'Our advanced AI analyzes and restores your photo in seconds, fixing damage and enhancing quality.'
    },
    {
      number: '4',
      icon: '⬇️',
      title: 'Download & Share',
      description: 'Compare before and after with our slider, then download your restored photo to keep forever.'
    }
  ];

  return (
    <div className={styles.howItWorks}>
      <div className={styles.header}>
        <h2>How It Works</h2>
        <p>Bring your cherished memories back to life in just four simple steps</p>
      </div>

      <div className={styles.stepsGrid}>
        {steps.map((step, index) => (
          <div key={index} className={styles.stepCard}>
            <div className={styles.stepNumber}>{step.number}</div>
            <div className={styles.stepIcon}>{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.bonusTip}>
        <span className={styles.bonusIcon}>✨</span>
        <p>
          <strong>Bonus:</strong> You can enhance your photos multiple times! Start with Basic to fix damage, 
          then use the result with Premium to add beautiful colors.
        </p>
      </div>
    </div>
  );
}
