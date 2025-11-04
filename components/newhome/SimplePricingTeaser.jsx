import { useRouter } from 'next/router';
import styles from './SimplePricingTeaser.module.css';

export default function SimplePricingTeaser() {
  const router = useRouter();

  return (
    <section className={styles.pricing}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <h2 className={styles.title}>Simple, Pay-As-You-Go Pricing</h2>
          <p className={styles.subtitle}>
            No subscriptions. Buy credits once, use them forever.
          </p>
        </div>

        <div className={styles.cards}>
          
          {/* Dawn Pack */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Dawn</h3>
              <div className={styles.price}>
                <span className={styles.priceAmount}>$4.99</span>
              </div>
            </div>
            <div className={styles.credits}>400 credits</div>
            <ul className={styles.features}>
              <li>✓ 400 basic restorations</li>
              <li>✓ 10 colorizations</li>
              <li>✓ 8 avatars or decade photos</li>
              <li>✓ Credits never expire</li>
            </ul>
            <button 
              className={styles.button}
              onClick={() => router.push('/signup')}
            >
              Get Started
            </button>
          </div>

          {/* Revival Pack - Popular */}
          <div className={`${styles.card} ${styles.popular}`}>
            <div className={styles.popularBadge}>Most Popular</div>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Revival</h3>
              <div className={styles.price}>
                <span className={styles.priceAmount}>$9.99</span>
              </div>
            </div>
            <div className={styles.credits}>1,000 credits</div>
            <ul className={styles.features}>
              <li>✓ 1,000 basic restorations</li>
              <li>✓ 25 colorizations</li>
              <li>✓ 20 avatars or decade photos</li>
              <li>✓ Credits never expire</li>
            </ul>
            <button 
              className={`${styles.button} ${styles.buttonPrimary}`}
              onClick={() => router.push('/signup')}
            >
              Best Value
            </button>
          </div>

          {/* Resurgence Pack */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Resurgence</h3>
              <div className={styles.price}>
                <span className={styles.priceAmount}>$14.99</span>
              </div>
            </div>
            <div className={styles.credits}>1,600 credits</div>
            <ul className={styles.features}>
              <li>✓ 1,600 basic restorations</li>
              <li>✓ 40 colorizations</li>
              <li>✓ 32 avatars or decade photos</li>
              <li>✓ Credits never expire</li>
            </ul>
            <button 
              className={styles.button}
              onClick={() => router.push('/signup')}
            >
              Get Started
            </button>
          </div>

        </div>

        <div className={styles.footer}>
          <button 
            className={styles.linkButton}
            onClick={() => router.push('/pricing')}
          >
            View all pricing options (including $29.99 pack) →
          </button>
        </div>

      </div>
    </section>
  );
}