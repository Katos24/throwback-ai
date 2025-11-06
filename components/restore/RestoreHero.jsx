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
      setRestoreType(prev => (prev === 'premium' ? 'basic' : 'premium'));
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.heroGrid}>
      <div className={styles.heroText}>
        <h1 className={styles.heroTitle}>Bring Your Family Photos Back to Life in Seconds.</h1>
        <p className={styles.heroSubtitle}>
          Upload a photo and see the transformation instantly.
        </p>

     
        
      </div>

      {/* Transformation demo with dynamic type */}
      <div className={styles.heroSlideshow}>
        <RestoreTransformationDemo restoreType={restoreType} duration={5000} />
      </div>
    </section>
  );
}
