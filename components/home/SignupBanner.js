// components/home/SignupBanner.js
import { useRouter } from 'next/router';
import styles from './SignupBanner.module.css';

export default function SignupBanner() {
  const router = useRouter();

  return (
    <section className={styles.banner}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.icon}>🎁</div>
          <div className={styles.text}>
            <h3 className={styles.title}>
              Get 50 Free Credits
            </h3>
            <p className={styles.subtitle}>
              Sign up now • No credit card required • Restore 50 photos or create 1 avatar
            </p>
          </div>
          <button 
            className={styles.button}
            onClick={() => router.push('/signup')}
          >
            Claim Free Credits →
          </button>
        </div>
      </div>
    </section>
  );
}