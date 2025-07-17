import Link from "next/link";
import styles from "../styles/About.module.css"; // Adjust path if needed

export default function About() {
  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>About Anastasis</h1>

      <p className={styles.paragraph}>
        Anastasis, powered by Throwback AI, is a creative restoration platform inspired by the timeless beauty of revival. With roots in mythology and memory, our mission is to resurrect your most treasured images—faded, grayscale, or forgotten—with cutting-edge AI.
      </p>

      <p className={styles.paragraph}>
        Our Basic tool instantly cleans and sharpens grayscale photos, while Premium unlocks full-color, HD transformations with advanced detail recovery. It’s not always perfect color—but when it is, it’s radiant.
      </p>

      <p className={styles.paragraph}>
        No subscriptions. No fluff. Just fast, emotionally rich restorations that feel like homecoming.
      </p>

      <p className={styles.paragraph}>
        From Acropolis to alleyways, we believe every image holds a story worth retelling. <Link className={styles.link} href="/contact">Reach out</Link> to share yours—we’re listening.
      </p>
    </main>
  );
}
