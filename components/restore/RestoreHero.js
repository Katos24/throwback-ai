import React from 'react';
import { useRouter } from 'next/router';
import styles from './RestoreHero.module.css';

export default function RestoreHero() {
  const router = useRouter();

  return (
    <section className={styles.heroGrid}>
      <div className={styles.heroText}>
        <h1 className={styles.heroTitle}>Enhance Your Photos with AI</h1>
        <p className={styles.heroSubtitle}>
          Restore old photos, remove scratches, and colorize your memories in seconds.
        </p>
        <div className={styles.heroSubtitleContainer}>
          <p className={styles.creditCost}>Basic restore: 1 credit • Premium color: 40 credits</p>
          <button
            className={styles.signupBadge}
            onClick={() => router.push('/signup')}
          >
            Sign Up today and get 50 free credits
          </button>
        </div>
      </div>

      <div className={styles.heroSlideshow}>
        <video
          src="/videos/restore-demo.mp4"
          autoPlay
          muted
          loop
          playsInline
          className={styles.heroVideo}
        />
      </div>
    </section>
  );
}
