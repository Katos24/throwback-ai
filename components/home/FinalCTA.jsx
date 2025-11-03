import React from 'react';
import { useRouter } from 'next/router';
import styles from './FinalCTA.module.css';

export default function FinalCTA() {
  const router = useRouter();

  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <div className={styles.ctaCard}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
            <p className={styles.ctaDescription}>
              Sign up free and get 50 credits to try any tool. No credit card required.
            </p>
            
            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>50 free credits on signup</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>No subscription required</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Credits never expire</span>
              </div>
            </div>

            <div className={styles.buttons}>
              <button 
                className={styles.primaryButton}
                onClick={() => router.push('/signup')}
              >
                Get Started Free
              </button>
              <button 
                className={styles.secondaryButton}
                onClick={() => router.push('/replicate/avatar')}
              >
                View Examples
              </button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className={styles.decorativeOrb1}></div>
          <div className={styles.decorativeOrb2}></div>
        </div>
      </div>
    </section>
  );
}