// components/restores/HeroSection.jsx
import Link from "next/link";
import styles from "../../styles/RestoreBasic.module.css";

export default function HeroSection({
  previewUrl,
  status,
  credits,
  isLoggedIn,
  onUploadClick,
  onRestoreClick,
}) {
  const busy = status !== "idle";
  const needsUpload = !previewUrl;
  const restoreDisabled = busy || needsUpload;

  // Determine the Restore button label
  let restoreLabel;
  if (busy) {
    restoreLabel =
      status === "compressing"
        ? "Compressing…"
        : status === "uploading"
        ? "Restoring…"
        : "Please wait…";
  } else if (credits < 1) {
    restoreLabel = isLoggedIn
      ? "💳 Buy More Credits"
      : "🔒 Sign Up to Restore";
  } else {
    restoreLabel = `🚀 Restore (${credits} credit${credits !== 1 ? "s" : ""})`;
  }

  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        <h1 className={styles.heroTitle}>🕹️ Restore Your Vintage Photo</h1>
        <p className={styles.heroSubtitle}>
          Use our AI-powered scratch removal and clarity boost to breathe life
          into old memories.
        </p>

        <div className={styles.controls}>
          {/* Always show Upload button */}
          <button
            onClick={onUploadClick}
            disabled={busy}
            className={`${styles.uploadButton} ${
              busy ? styles.disabled : ""
            }`}
          >
            📂 {previewUrl ? "Change Photo" : "Upload Photo"}
          </button>

          {/* Always show Restore button */}
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

        {/* Secondary messaging/link when out of credits */}
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
      </div>
    </section>
  );
}
