import React from 'react';
import styles from './CreditDisplay.module.css'; // optional for custom styles
import { useRouter } from 'next/router';

export default function CreditDisplay({ credits, isLoggedIn, restoreMode }) {
  const router = useRouter();
  const isPremium = restoreMode === 'premiumColor';

  return (
    <div className={styles.creditDisplay}>
      <div className={styles.creditInfo}>
        <span className={styles.creditIcon}>{isPremium ? '💎' : '⚡'}</span>
        <span className={styles.creditText}>
          {credits} {credits === 1 ? 'credit' : 'credits'}
        </span>
      </div>
      <button
        className={styles.creditButton}
        onClick={() => router.push(isLoggedIn ? "/pricing" : "/signup")}
      >
        {isLoggedIn ? "+" : "Sign Up"}
      </button>
    </div>
  );
}
