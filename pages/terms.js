import Head from "next/head";
import styles from "../styles/About.module.css"; // Adjust path as needed

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Use - Throwback AI</title>
        <meta
          name="description"
          content="Review the Terms of Use for Throwback AI, including acceptable use, content policies, disclaimers, and liability limitations."
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.heading}>Terms of Use</h1>
        <p className={styles.paragraph}><em>Last updated: June 30, 2025</em></p>

        <h2 className={styles.heading}>1. Acceptable Use</h2>
        <p className={styles.paragraph}>
          You agree not to upload, generate, or share any content through our Services that:
        </p>
        <ul>
          <li>Is obscene, pornographic, or sexually explicit.</li>
          <li>Depicts child exploitation or abuse.</li>
          <li>Contains hate speech, violence, or threats.</li>
          <li>Violates any applicable laws or regulations.</li>
          <li>Infringes on any third-party intellectual property rights.</li>
        </ul>
        <p className={styles.paragraph}>
          We reserve the right to remove any content or suspend your access if we believe you have violated these terms.
        </p>

        <h2 className={styles.heading}>2. User Content</h2>
        <p className={styles.paragraph}>
          When you upload an image or other content:
        </p>
        <ul>
          <li>You represent and warrant that you have the legal right to use and share it.</li>
          <li>You retain ownership of your original content.</li>
          <li>You grant us a limited right to process your content through our AI models to provide the Services.</li>
        </ul>
        <p className={styles.paragraph}>
          We do not permanently store user-uploaded content. Processed images may be temporarily hosted by our AI providers.
        </p>

        <h2 className={styles.heading}>3. Disclaimer of Warranties</h2>
        <p className={styles.paragraph}>
          Our Services are provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; We make no warranties regarding the accuracy,
          reliability, or availability of the Services or the AI-generated outputs.
        </p>

        <h2 className={styles.heading}>4. Limitation of Liability</h2>
        <p className={styles.paragraph}>
          To the fullest extent permitted by law:
        </p>
        <ul>
          <li>We will not be liable for any indirect, incidental, or consequential damages.</li>
          <li>We do not accept liability for any user-generated content uploaded to our Services.</li>
        </ul>

        <h2 className={styles.heading}>5. Changes to These Terms</h2>
        <p className={styles.paragraph}>
          We may update these Terms of Use from time to time. We will notify you of material changes by posting an
          updated version on our website. Your continued use of the Services means you accept the updated terms.
        </p>

        <h2 className={styles.heading}>6. Contact Us</h2>
        <p className={styles.paragraph}>
          If you have any questions about these Terms of Use, please contact us at: <br />
          <strong>
            <a className={styles.link} href="mailto:hello@throwbackai.app">hello@throwbackai.app</a>
          </strong>
        </p>

        <p className={styles.paragraph}>
          <em>Throwback AI © 2025</em>
        </p>
      </main>
    </>
  );
}
