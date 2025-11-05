import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import RestoreTransformationDemo from '../restore/RestoreTransformationDemo';
import styles from './RestoreHero.module.css';

export default function RestoreHero() {
  const router = useRouter();
  const [restoreType, setRestoreType] = useState('premium');

  // Cycle between restore types every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRestoreType(prev => prev === 'premium' ? 'basic' : 'premium');
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.heroGrid}>
      <div className={styles.heroText}>
        <h1 className={styles.heroTitle}>Enhance Your Photos with AI</h1>
        <p className={styles.heroSubtitle}>
          Restore old photos, remove scratches, and colorize your memories in seconds.
        </p>
        
        {/* Badge Pills - Now interactive */}
        <div className={styles.badgePills}>
          <button
            className={`${styles.badgeBasic} ${restoreType === 'basic' ? styles.badgeActive : ''}`}
            onClick={() => setRestoreType('basic')}
          >
            <span>⚡</span>
            Basic: Costs 1 Credit
          </button>
          <button
            className={`${styles.badgePremium} ${restoreType === 'premium' ? styles.badgeActive : ''}`}
            onClick={() => setRestoreType('premium')}
          >
            <span>💎</span>
            Premium: Costs 40 Credits
          </button>
        </div>
        
        <div className={styles.heroSubtitleContainer}>
          <button
            className={styles.signupBadge}
            onClick={() => router.push('/signup')}
          >
            Sign Up today and get 50 free credits
          </button>
        </div>
      </div>

      {/* Transformation demo with dynamic type */}
      <div className={styles.heroSlideshow}>
        <RestoreTransformationDemo 
          restoreType={restoreType}
          duration={5000}
        />
      </div>
    </section>
  );
}