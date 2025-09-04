// pages/refund-policy.js
import Link from "next/link";
import styles from "../styles/About.module.css"; // Reuse About styles

export default function RefundPolicy() {
  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Refund Policy</h1>

      <p className={styles.paragraph}>
        At <strong>Throwback AI</strong>, we provide instant digital image
        processing services. Because credits are consumed when generating AI
        images, all purchases are{" "}
        <strong>non-refundable once used</strong>.
      </p>

      <h2 className={styles.heading}>Refund Eligibility</h2>
      <p className={styles.paragraph}>
        Refunds may be granted only under the following conditions:
      </p>
      <ul className={styles.paragraph}>
        <li>Credits were purchased but never used.</li>
        <li>
          A technical issue on our side prevented you from using the service and
          our support team cannot resolve it.
        </li>
      </ul>

      <h2 className={styles.heading}>Non-Refundable Cases</h2>
      <p className={styles.paragraph}>
        We cannot offer refunds if you are unsatisfied with the artistic style
        or look of an AI output. You are purchasing AI processing time, not
        guaranteed results.
      </p>

      <h2 className={styles.heading}>Requesting a Refund</h2>
      <p className={styles.paragraph}>
        If you believe you are eligible for a refund, please contact us within{" "}
        <strong>7 days of purchase</strong> at{" "}
        <Link className={styles.link} href="mailto:hello@throwbackai.app">
          hello@throwbackai.app
        </Link>{" "}
        with your order details.
      </p>

      <h2 className={styles.heading}>Disputes & Abuse</h2>
      <p className={styles.paragraph}>
        To prevent fraud and abuse, repeated refund requests or chargebacks may
        result in account suspension.
      </p>

      <p className={styles.paragraph}>
        <em>Last updated: {new Date().toLocaleDateString()}</em>
      </p>
    </main>
  );
}
