// components/decades/shared/TransformationDemo.js
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './TransformationDemo.module.css';

const DEMO_IMAGES = {
  '70s': {
    before: '/images/demos/70s-before.jpg',
    after: '/images/demos/70s-after.jpg'
  },
  '80s': {
    before: '/images/demos/80s-before.jpg',
    after: '/images/demos/80s-after.jpg'
  },
  '90s': {
    before: '/images/demos/90s-before.jpg',
    after: '/images/demos/90s-after.jpg'
  },
  '2000s': {
    before: '/images/demos/2000s-before.jpg',
    after: '/images/demos/2000s-after.jpg'
  }
};

export default function TransformationDemo({ decade = '70s', duration = 6000 }) {
  const [isVisible, setIsVisible] = useState(false);
  const images = DEMO_IMAGES[decade] || DEMO_IMAGES['70s'];

  useEffect(() => {
    // Trigger fade in after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.demoContainer} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.imageFrame}>
        {/* Before Image (Base Layer) */}
        <div className={styles.beforeLayer}>
          <Image
            src={images.before}
            alt="Before transformation"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className={styles.image}
            priority
          />
        </div>

        {/* After Image (Revealing Layer) */}
        <div 
          className={styles.afterLayer}
          style={{ 
            animationDuration: `${duration}ms`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite'
          }}
        >
          <Image
            src={images.after}
            alt="After transformation"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className={styles.image}
            priority
          />
        </div>

        {/* Color Wave Effect */}
        <div 
          className={styles.transformWave}
          style={{ 
            animationDuration: `${duration}ms`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite'
          }}
        />

        {/* Labels */}
        <div className={styles.beforeLabel}>
          <span className={styles.labelText}>Before</span>
        </div>
        <div 
          className={styles.afterLabel}
          style={{ 
            animationDuration: `${duration}ms`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite'
          }}
        >
          <span className={styles.labelText}>After</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ 
              animationDuration: `${duration}ms`,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite'
            }}
          />
        </div>
        <div className={styles.progressText}>
          AI Transformation in Progress...
        </div>
      </div>
    </div>
  );
}