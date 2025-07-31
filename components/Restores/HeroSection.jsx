import Link from "next/link";
import { FaStar, FaCoins } from "react-icons/fa";
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
  const restoreDisabled = busy || needsUpload || credits < 1;

  const uploadLabel = busy
    ? "Working…"
    : previewUrl
    ? "Change Photo"
    : "Upload Photo";

  let restoreLabel;
  if (busy) {
    restoreLabel =
      status === "compressing"
        ? "Compressing…"
        : status === "uploading"
        ? "Restoring…"
        : "Please wait…";
  } else if (credits < 1) {
    restoreLabel = isLoggedIn ? "Buy More Credits" : "Sign Up to Restore";
  } else {
    restoreLabel = `Restore (1 credit)`;
  }

  return (
    <section className={styles.hero}>
      <div className={styles.heroHeader}>
        <h1 className={styles.heroTitle}>🕹️ Restore Your Vintage Photo</h1>
        <div className={styles.creditBadge}>
          <FaStar className={styles.creditIcon} />
          <span>{credits}</span>
        </div>
      </div>

      <p className={styles.heroSubtitle}>
        AI-powered scratch removal & clarity boost for your old memories.
      </p>

      <div className={styles.costInfo}>
        <FaCoins className={styles.coinIcon} />
        <span>
          Cost: <strong>1 credit</strong> per restore
        </span>
      </div>

      <div className={styles.controls}>
        <button
          onClick={onUploadClick}
          disabled={busy}
          className={styles.uploadButton}
        >
          📂 {uploadLabel}
        </button>

        <button
          onClick={onRestoreClick}
          disabled={restoreDisabled}
          className={styles.restoreButton}
        >
          🚀 {restoreLabel}
        </button>
      </div>

      {credits < 1 && (
        <div className={styles.outOfCredits}>
          {isLoggedIn ? (
            <>
              You’re out of credits.{" "}
              <Link href="/pricing" className={styles.link}>
                Buy more
              </Link>
            </>
          ) : (
            <>
              Free attempts exhausted.{" "}
              <Link href="/signup" className={styles.link}>
                Sign up
              </Link>{" "}
              for more.
            </>
          )}
        </div>
      )}
    </section>
  );
}
