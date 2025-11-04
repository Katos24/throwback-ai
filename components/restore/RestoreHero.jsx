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

        {/* Badge Pills */}
        <div className={styles.badgePills}>
          <div className={styles.badgeBasic}>
            <span>⚡</span>
            Basic: Costs 1 Credit
          </div>
          <div className={styles.badgePremium}>
            <span>💎</span>
            Premium: Costs 40 Credits
          </div>
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