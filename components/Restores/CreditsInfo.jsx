import React from "react";
import Link from "next/link";
import styles from "../../styles/AiPage.module.css";

export default function CreditsInfo({ credits, restoreCost, isLoggedIn }) {
  const hasEnoughCredits = credits >= restoreCost;
  const creditsAfterRestore = credits - restoreCost;

  return (
    <div className={styles.creditsInfoContainer}>
      <div className={styles.creditsHeader}>
        <span className={styles.creditsTitle}>💳 Credit Information</span>
      </div>

      <div className={styles.creditsGrid}>
        <div className={styles.creditItem}>
          <span className={styles.creditLabel}>Cost</span>
          <span className={styles.creditValue}>{restoreCost} credit</span>
        </div>

        <div className={styles.creditItem}>
          <span className={styles.creditLabel}>Balance</span>
          <span className={styles.creditValue}>{credits} credits</span>
        </div>

        <div
          className={`${styles.creditItem} ${styles.creditStatus} ${
            hasEnoughCredits ? styles.sufficient : styles.insufficient
          }`}
        >
          <span className={styles.creditLabel}>
            {hasEnoughCredits ? "After restore" : "Status"}
          </span>
          <span className={styles.creditValue}>
            {hasEnoughCredits ? (
              <>
                <span> </span>
                <span className={styles.creditsRemaining}>{creditsAfterRestore}</span> credits
              </>
            ) : (
              <Link href={isLoggedIn ? "/pricing" : "/signup"} className={styles.needCreditsLink}>
                Need more credits
              </Link>
            )}
          </span>
        </div>

        <p className={styles.proTip}>
          💡 <strong>Pro Tip:</strong> For old or black & white photos, start
          with Photo Fix for clarity, then use Full Color Restore to bring it to
          life.
        </p>
      </div>
    </div>
  );
}
