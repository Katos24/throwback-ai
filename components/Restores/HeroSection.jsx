import { useState } from "react";
import Link from "next/link";
import styles from "../../styles/RestoreBasic.module.css";

export default function HeroSection({
  previewUrl,
  status,
  credits,
  isLoggedIn,
  onUploadClick,
  onRestoreClick,
  restoredUrl,
}) {
  const [restoreTriggered, setRestoreTriggered] = useState(false);

  const busy = status !== "idle";
  const restoreDisabled = busy || credits < 1;

  let restoreLabel;
  if (busy) {
    restoreLabel =
      status === "compressing"
        ? "Compressing…"
        : status === "uploading"
        ? "Restoring…"
        : "Please wait…";
  } else if (credits < 1) {
    restoreLabel = isLoggedIn ? "💳 Buy More Credits" : "🔒 Sign Up to Restore";
  } else {
    restoreLabel = "🚀 Restore";
  }

  const handleRestoreClick = () => {
    setRestoreTriggered(true);
    onRestoreClick();
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        <h1 className={styles.heroTitle}>Restore Your Vintage Photo</h1>
        <p className={styles.heroSubtitle}>
          You're using <strong>Quick Enhance</strong> — fast scratch removal and
          clarity boost for just <strong>1 credit</strong>.
        </p>

        {isLoggedIn && (
          <div className={styles.creditsDisplay}>
            <div className={styles.creditsCount}>
              🔋 {credits} credit{credits !== 1 ? "s" : ""} remaining
            </div>
          </div>
        )}

        <div className={styles.controls}>
          {!restoreTriggered ? (
            <button
              onClick={handleRestoreClick}
              disabled={restoreDisabled}
              className={`${styles.restoreButton} ${
                restoreDisabled ? styles.disabled : ""
              }`}
            >
              {restoreLabel}
            </button>
          ) : (
            <>
              <button
                onClick={handleRestoreClick}
                disabled={restoreDisabled}
                className={styles.restoreButton}
              >
                {restoreLabel}
              </button>

              <button
                onClick={onUploadClick}
                disabled={busy}
                className={styles.uploadButton}
              >
                📂 {previewUrl ? "Change Photo" : "Upload Photo"}
              </button>
            </>
          )}
        </div>

        {credits < 1 && (
          <div className={styles.creditsInfo}>
            {isLoggedIn ? (
              <>
                You’re out of credits.{" "}
                <Link href="/pricing" className={styles.link}>
                  Buy more credits
                </Link>
              </>
            ) : (
              <>
                Free attempts exhausted.{" "}
                <Link href="/signup" className={styles.link}>
                  Sign up to restore more
                </Link>
              </>
            )}
          </div>
        )}

        {restoredUrl && !busy && (
          <div className={styles.restoredMessage}>
            🎉 Boom! Your photo just got its glow-up.
            <br />
            Scroll down to see before &amp; after, then drag the slider to compare.
          </div>
        )}
      </div>
    </section>
  );
}
