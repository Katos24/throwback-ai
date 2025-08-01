// components/Restores/HeroSection.jsx

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
  const busy = status !== "idle";
  const needsUpload = !previewUrl;
  const restoreDisabled = busy || needsUpload;

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
          <button
            onClick={onUploadClick}
            disabled={busy}
            className={`${styles.uploadButton} ${busy ? styles.disabled : ""}`}
          >
            📂 {previewUrl ? "Change Photo" : "Upload Photo"}
          </button>

          <button
            onClick={onRestoreClick}
            disabled={restoreDisabled}
            className={`${styles.restoreButton} ${
              restoreDisabled ? styles.disabled : ""
            }`}
          >
            {restoreLabel}
          </button>
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

        {/* pop-in message after restore */}
        {restoredUrl && !busy && (
          <div
            style={{
              marginTop: "1.5rem",
              fontSize: "1.125rem",
              color: "#fff",
              textAlign: "center",
              fontWeight: 500,
              textShadow: "0 1px 3px rgba(0,0,0,0.5)",
              animation: "pop 0.4s ease-out",
            }}
          >
            <span
              role="img"
              aria-label="celebrate"
              style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}
            >
              🎉
            </span>
            Boom! Your photo just got its glow-up.
            <br />
            Scroll down to see before &amp; after, then drag the slider to compare.
          </div>
        )}
      </div>
    </section>
  );
}
