// components/restore/RestoreTransformationDemo.js
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './RestoreTransformationDemo.module.css';

const DEMO_IMAGES = {
  'basic': {
    before: '/images/demos/restore-damaged.jpg',
    after: '/images/demos/restore-repaired.jpg',
    label: 'Photo Restoration',
    description: 'Repair scratches & damage'
  },
  'premium': {
    before: '/images/demos/restore-bw.jpg',
    after: '/images/demos/restore-colorized.jpg',
    label: 'Photo Colorization',
    description: 'Add beautiful, realistic colors'
  },
  'enhance': {
    before: '/images/demos/restore-blurry.jpg',
    after: '/images/demos/restore-enhanced.jpg',
    label: 'Photo Enhancement',
    description: 'Sharpen & enhance details'
  }
};

export default function RestoreTransformationDemo({ 
  restoreType = 'premium', 
  duration = 6000 
}) {
  const [isVisible, setIsVisible] = useState(false);
  const images = DEMO_IMAGES[restoreType] || DEMO_IMAGES['premium'];

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
            alt="Original damaged photo"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className={styles.image}
            priority
          />
          {/* Damage overlay effect for basic restore */}
          {restoreType === 'basic' && (
            <div className={styles.damageOverlay}>
              <div className={styles.scratch}></div>
              <div className={styles.scratch}></div>
            </div>
          )}
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
            alt="Restored photo"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className={styles.image}
            priority
          />
        </div>

        {/* Color Wave Effect (for colorization) */}
        {restoreType === 'premium' && (
          <div 
            className={styles.colorWave}
            style={{ 
              animationDuration: `${duration}ms`,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite'
            }}
          />
        )}

        {/* Repair Particles (for restoration) */}
        {restoreType === 'basic' && (
          <div 
            className={styles.repairParticles}
            style={{ 
              animationDuration: `${duration}ms`,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite'
            }}
          >
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
          </div>
        )}

        {/* Enhance Glow (for enhancement) */}
        {restoreType === 'enhance' && (
          <div 
            className={styles.enhanceGlow}
            style={{ 
              animationDuration: `${duration}ms`,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite'
            }}
          />
        )}

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
          {restoreType === 'premium' && '🎨'}
          {restoreType === 'basic' && '🔧'}
          {restoreType === 'enhance' && '✨'}
          {' '}{images.description}...
        </div>
      </div>

      {/* Info Badge */}
      <div className={styles.infoBadge}>
        <span className={styles.badgeIcon}>
          {restoreType === 'premium' && '🌈'}
          {restoreType === 'basic' && '⚡'}
          {restoreType === 'enhance' && '💎'}
        </span>
        <span className={styles.badgeText}>{images.label}</span>
      </div>
    </div>
  );
}