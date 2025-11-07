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

  const handleRestoreClick = () => {
    const el = document.getElementById('upload-zone');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // fallback if UploadZone is on another page
      router.push('/upload');
    }
  };

  return (
    <section className={styles.heroGrid}>
      <div className={styles.heroText}>
        <h1 className={styles.heroTitle}>
          Bring Your Memories Back to Life in Seconds.
        </h1>
        <p className={styles.heroSubtitle}>
          Turn faded photos into vivid memories restored instantly with AI
        </p>
        <button className={styles.heroButton} onClick={handleRestoreClick}>
          Restore Now
        </button>
      </div>

      {/* Transformation demo with dynamic type */}
      <div className={styles.heroSlideshow}>
        <RestoreTransformationDemo restoreType={restoreType} duration={5000} />
      </div>
    </section>
  );
}