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
         {/* Badge Pills */}
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                      justifyContent: 'center',
                      marginTop: '1.5rem'
                    }}>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        background: 'rgba(8, 18, 35, 0.1)',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: '999px',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#0664d7ff'
                      }}>
                        <span>⚡</span>
                        Basic: 1 Credit
                      </div>
                      
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        background: 'rgba(57, 22, 90, 0.1)',
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                        borderRadius: '999px',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#953fecff'
                      }}>
                        <span>💎</span>
                        Premium: 40 Credits
                      </div>
                      
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        background: 'rgba(4, 22, 10, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        borderRadius: '999px',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#075e27ff'
                      }}>
                        <span>🎁</span>
                        50 Free Credits on Signup
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
