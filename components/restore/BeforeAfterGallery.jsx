import React from 'react';
import Image from 'next/image';
import styles from './BeforeAfterGallery.module.css';

export default function BeforeAfterGallery({
  selectedPreviewUrl,
  restoredUrl,
  restoreMode
}) {
  if (!restoredUrl || !selectedPreviewUrl) return null;

  return (
    <div className={styles.gallery}>
      <h3 className={styles.title}>
        <span>
          {restoreMode === 'premiumColor' ? '🌈' : '🖼️'}
        </span>
        {restoreMode === 'premiumColor' ? 'Premium Transformation Gallery' : 'Before & After Gallery'}
      </h3>
      <div className={styles.grid}>
        <div className={styles.item}>
          <div className={styles.label}>
            <span>⬅️</span>
            {restoreMode === 'basic' ? 'Before' : 'Original'}
          </div>
          <div className={styles.imageWrapper}>
            <Image 
              src={selectedPreviewUrl} 
              alt="Before restoration" 
              width={800}
              height={600}
              className={styles.image}
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>
            <span>➡️</span>
            {restoreMode === 'premiumColor' ? 'Premium Result' : 'After'}
          </div>
          <div className={styles.imageWrapper}>
            <Image 
              src={restoredUrl} 
              alt="After restoration" 
              width={800}
              height={600}
              className={styles.image}
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}