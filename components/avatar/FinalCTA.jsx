import { useRouter } from 'next/router';
import styles from './FinalCTA.module.css';

const FinalCTA = ({ isLoggedIn }) => {
  const router = useRouter();

  return (
    <div className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Transform Yourself?</h2>
          <p className={styles.ctaSubtitle}>
            Join thousands of creators making stunning AI avatars every day
          </p>
          <div className={styles.ctaFeatures}>
            <div className={styles.ctaFeature}>
              <span className={styles.checkmark}>✓</span>
              <span>50 free credits for new users</span>
            </div>
            <div className={styles.ctaFeature}>
              <span className={styles.checkmark}>✓</span>
              <span>Generate avatars in 30 seconds</span>
            </div>
            <div className={styles.ctaFeature}>
              <span className={styles.checkmark}>✓</span>
              <span>100+ styles to choose from</span>
            </div>
          </div>
          <button
            onClick={() => router.push(isLoggedIn ? '/replicate/avatar' : '/signup')}
            className={styles.ctaButton}
          >
            {isLoggedIn ? 'Create Your Avatar Now' : 'Get Started Free'}
          </button>
          <p className={styles.ctaDisclaimer}>
            No credit card required • Free credits included
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinalCTA;