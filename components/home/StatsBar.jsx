import React from 'react';
import styles from './StatsBar.module.css';

const STATS = [
  {
    id: 1,
    icon: '⚡',
    value: 'Under 60s',
    label: 'Average Processing'
  },
  {
    id: 2,
    icon: '💳',
    value: 'No Subscription',
    label: 'Pay Per Use Only'
  },
  {
    id: 3,
    icon: '🔒',
    value: '1 Hour',
    label: 'Auto-Delete for Privacy'
  },
  {
    id: 4,
    icon: '♾️',
    value: 'Never Expire',
    label: 'Buy Once, Use Forever'
  }
];

export default function StatsBar() {
  return (
    <section className={styles.statsSection}>
      <div className={styles.container}>
        <div className={styles.statsGrid}>
          {STATS.map((stat) => (
            <div key={stat.id} className={styles.statCard}>
              <div className={styles.statIcon}>{stat.icon}</div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}