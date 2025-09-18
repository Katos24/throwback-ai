import Link from "next/link";
import styles from "../styles/About.module.css";

export default function About() {
  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>About Throwback AI</h1>
      
      <p className={styles.paragraph}>
        It started with a shoebox of faded family photos in a Long Island home. Like many families with roots that span generations, I found myself holding onto pieces of family history that were slowly disappearing—scratched wedding photos from the 1940s, water-damaged portraits of grandparents I had never met, and countless black and white memories that felt more distant with each passing year.
      </p>

      <p className={styles.paragraph}>
        After watching my grandmother struggle to share stories about people in photos that had become too faded to recognize, I knew there had to be a better way. Traditional photo restoration was expensive, time-consuming, and often out of reach for families just trying to preserve their memories. That is when I discovered the potential of AI—not the generic, one-size-fits-all kind, but specialized algorithms trained specifically on historical photography.
      </p>

      <p className={styles.paragraph}>
        Based here on Long Island, we built Throwback AI with one mission: making professional-quality photo restoration accessible to every family. Our AI is trained on thousands of vintage photographs, understanding how images age, how colors fade, and most importantly, how to bring back the life in old family photos without losing their authentic character.
      </p>

      <p className={styles.paragraph}>
        We are not just another photo app. We are a team that understands the weight of family memories—the importance of that wedding photo from decades past, the value of preserving your great-grandfather&apos;s military portrait, or the joy of seeing your parents&apos; young faces in vibrant color for the first time. Every algorithm we have developed, every model we have trained, serves families who want to keep their history alive.
      </p>

      <p className={styles.paragraph}>
        Whether you are dealing with a century-old family portrait or a damaged photo from last decade, our tools work in seconds, not hours. No subscriptions, no complicated processes—just upload, restore, and rediscover your memories. We offer free basic restoration because we believe everyone deserves to preserve their family history, regardless of budget.
      </p>

      <p className={styles.paragraph}>
        From our base on Long Island to families around the world, we have helped restore over 100,000 precious memories. Every restored photo represents a story saved, a connection preserved, a piece of history rescued from time.
      </p>

      <p className={styles.paragraph}>
        Have a challenging photo or a special restoration need? <Link className={styles.link} href="/contact">We would love to hear from you</Link>. Behind every algorithm is a team that genuinely cares about helping families reconnect with their visual heritage.
      </p>
    </main>
  );
}