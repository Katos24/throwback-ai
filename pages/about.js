import Link from "next/link";
import styles from "../styles/About.module.css"; // Adjust path if needed

export default function About() {
  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>About Throwback AI</h1>
      <p className={styles.paragraph}>
        Throwback AI is a creative transformation platform that brings your photos to life in ways you never imagined. From restoring precious family memories to creating stunning artistic transformations, our AI-powered tools unlock endless possibilities for your images.
      </p>
      <p className={styles.paragraph}>
        Whether you&apos;re looking to restore damaged photos, colorize black and white memories, create professional avatars, transform into cartoon art, or capture that perfect 90s yearbook vibe—we&apos;ve got the tools to make it happen. Our advanced AI analyzes each image and applies the perfect enhancement for breathtaking results.
      </p>
      <p className={styles.paragraph}>
        No subscriptions. No complicated processes. Just upload your photo, choose your transformation, and watch the magic happen in seconds. From basic restoration that&apos;s free to try, to premium colorization and creative transformations that bring out your photo's full potential.
      </p>
      <p className={styles.paragraph}>
        Every photo has a story, and we&apos;re here to help you tell it better. Whether it&apos;s a century-old family portrait or today&apos;s selfie that needs that special touch, <Link className={styles.link} href="/contact">reach out</Link> and share your vision—we&apos;re always listening and improving.
      </p>
    </main>
  );
}