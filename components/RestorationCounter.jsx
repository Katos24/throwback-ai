import { useState, useEffect } from 'react';
import styles from './RestorationCounter.module.css';

export default function RestorationCounter() {
  const [stats, setStats] = useState({ total: 0, basic: 0, premium: 0 });
  const [displayCount, setDisplayCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  // Animated count-up effect
  useEffect(() => {
    if (displayCount < stats.total) {
      const timer = setTimeout(() => {
        setDisplayCount(prev => Math.min(prev + Math.ceil((stats.total - prev) / 10), stats.total));
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [displayCount, stats.total]);

  async function fetchStats() {
    try {
      const response = await fetch('/api/stats/restoration-count');
      const data = await response.json();
      setStats(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  }

  if (loading) return null;

  return (
    <div className={styles.statsContainer}>
      <div className={styles.mainStat}>
        <div className={styles.number}>
          {displayCount.toLocaleString()}+
        </div>
        <div className={styles.label}>Photos Restored</div>
      </div>
    
    </div>
  );
}