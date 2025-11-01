import React from 'react';
import styles from './FeaturesGrid.module.css';

const BASIC_FEATURES = [
  { icon: "⚡", title: "Lightning Fast", desc: "Process photos in seconds with our optimized AI models" },
  { icon: "✨", title: "AI Powered", desc: "Advanced neural networks trained on millions of photos" },
  { icon: "⬇️", title: "High Quality", desc: "Download full resolution restored images" }
];

const PREMIUM_FEATURES = [
  { icon: "🌈", title: "Studio Quality", desc: "Premium AI colorization with vibrant, accurate colors" },
  { icon: "🎨", title: "Advanced AI", desc: "Trained on artistic and historical photo data" },
  { icon: "💎", title: "Best Results", desc: "Highest quality colorization available" }
];

export default function FeaturesGrid({ restoreMode }) {
  const features = restoreMode === 'premiumColor' ? PREMIUM_FEATURES : BASIC_FEATURES;

  return (
    <div className={styles.grid}>
      {features.map((feature, idx) => (
        <div key={idx} className={styles.card}>
          <span className={styles.icon}>{feature.icon}</span>
          <h3 className={styles.title}>{feature.title}</h3>
          <p className={styles.description}>{feature.desc}</p>
        </div>
      ))}
    </div>
  );
}