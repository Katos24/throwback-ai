import React from 'react';
import styles from './ProTip.module.css';

export default function ProTip({ isPremium }) {
  return (
    <div className={styles.proTip}>
      <span className={styles.icon}>
        {isPremium ? '💎' : '💡'}
      </span>
      <span className={styles.text}>
        <strong>{isPremium ? 'Premium Tip:' : 'Pro Tip:'}</strong> For best results: Start with Basic Restore to fix damage, then use Premium Color to add vibrant, studio-quality colors.
      </span>
    </div>
  );
}