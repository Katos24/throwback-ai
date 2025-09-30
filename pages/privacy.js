import Head from "next/head";
import styles from "../styles/About.module.css";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Throwback AI</title>
        <meta
          name="description"
          content="Learn about how Throwback AI collects, uses, and protects your information when using our AI-powered retro services."
        />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.heading}>Privacy Policy</h1>
        <p className={styles.paragraph}><em>Last updated: September 30, 2025</em></p>
        
        <p className={styles.paragraph}>
          This Privacy Policy describes how Throwback AI (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects your information when you use our website and AI services.
        </p>

        <h2 className={styles.heading}>Information We Collect</h2>
        <ul>
          <li><strong>Uploaded Images:</strong> Processed securely by third-party services (e.g., Replicate) and not permanently stored on our servers.</li>
          <li><strong>Basic Usage Data:</strong> Includes IP address, browser type, and device info for performance and analytics.</li>
        </ul>

        <h2 className={styles.heading}>How We Use Your Information</h2>
        <p className={styles.paragraph}>We use your information to:</p>
        <ul>
          <li>Provide and improve our AI tools.</li>
          <li>Respond to support requests.</li>
          <li>Monitor site usage and prevent abuse.</li>
        </ul>

        <h2 className={styles.heading}>Third-Party Services</h2>
        <p className={styles.paragraph}>
          We use third-party services to help process and improve our service:
        </p>
        <ul>
          <li><strong>Replicate & Supabase:</strong> Help process or store images. Each has its own privacy policy.</li>
          <li><strong>Trustpilot:</strong> We use Trustpilot to collect and display customer reviews. Trustpilot may place cookies on your device to verify reviews and invite you to leave feedback. For more information about how Trustpilot handles your data, please visit their privacy policy at <a className={styles.link} href="https://www.trustpilot.com/privacy" target="_blank" rel="noopener">https://www.trustpilot.com/privacy</a>.</li>
        </ul>

        <h2 className={styles.heading}>Cookies</h2>
        <p className={styles.paragraph}>
          We use cookies to improve your experience and enable certain features. This includes third-party cookies from Trustpilot for review collection and verification.
        </p>

        <h2 className={styles.heading}>Security</h2>
        <p className={styles.paragraph}>
          We take reasonable steps to protect data, though no method is 100% secure online.
        </p>

        <h2 className={styles.heading}>Children's Privacy</h2>
        <p className={styles.paragraph}>
          Not intended for children under 13. We do not knowingly collect their personal data.
        </p>

        <h2 className={styles.heading}>Changes to This Policy</h2>
        <p className={styles.paragraph}>
          Updates will appear on this page with a revised date.
        </p>

        <h2 className={styles.heading}>Contact Us</h2>
        <p className={styles.paragraph}>
          Questions? Email <a className={styles.link} href="mailto:hello@throwbackai.app">hello@throwbackai.app</a>.
        </p>
      </main>
    </>
  );
}