import styles from "../styles/About.module.css"; // reuse About.module.css

export default function Contact() {
  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Contact Us</h1>

      <p className={styles.paragraph}>
        We'd love to hear from you. Whether it&apos;s a question, feedback, or a story to share, don&apos;t hesitate to reach out.
      </p>

      <p className={styles.paragraph}>
        Just email us at <a className={styles.link} href="mailto:hello@throwbackai.app">hello@throwbackai.app</a> and we&apos;ll respond as soon as we can.
      </p>
    </main>
  );
}
