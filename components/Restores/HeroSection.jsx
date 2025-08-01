import Link from "next/link";
import styles from "../../styles/RestoreBasic.module.css";

export default function HeroSection({
  previewUrl,
  status,
  credits,
  isLoggedIn,
  onUploadClick,
  onRestoreClick,
  restoredUrl,   // NEW prop
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
    restoreLabel = `🚀 Restore`;
  }

  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        <h1 className={styles.heroTitle}>🕹️ Restore Your Vintage Photo</h1>
        <p className={styles.heroSubtitle}>
          You're using <strong>Quick Enhance</strong> — fast scratch removal and clarity boost for just <strong>1 credit</strong>.
        </p>

        {/* Credits display if logged in */}
        {isLoggedIn && (
          <div className={styles.creditsDisplay}>
            <div className={styles.creditsCount}>
              🔋 {credits} credit{credits !== 1 ? "s" : ""} remaining
            </div>
          </div>
        )}

        {/* Upload and restore buttons */}
        <div className={styles.controls}>
          <button
            onClick={onUploadClick}
            disabled={busy}
            className={`${styles.uploadButton} ${
              busy ? styles.disabled : ""
            }`}
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

        {/* Out-of-credits messaging */}
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

        {/* New message shown only after restoration completes */}
        {restoredUrl && !busy && (
          <div
            style={{
              marginTop: "1.5rem",
              fontSize: "1rem",
              color: "#ddd",
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            🎉 Image restored! Scroll down to see before & after photos, and try the slider below to compare the magic.
          </div>
        )}
      </div>
    </section>
  );
}
