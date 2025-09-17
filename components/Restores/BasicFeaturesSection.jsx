import ImageCompareSlider from "../ImageCompareSlider";
import styles from "../../styles/BasicFeatures.module.css";


export default function BasicFeaturesSection() {
  return (
    <>
{/* ─── Comparison Grid ─────────────────────────────── */}
<section style={{ padding: "3rem 1rem", backgroundColor: "#121212", color: "white" }}>
  <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
    Experience the Power of AI Restoration
  </h2>
  <div style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    justifyContent: "center"
  }}>
    
    {/* Premium Restore - LEFT */}
    <div style={{
      flex: "1 1 300px",
      maxWidth: "500px",
      backgroundColor: "#1a1a1a",
      padding: "1rem",
      borderRadius: "8px"
    }}>
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>🌈 Full Color Restore</h3>
      <ImageCompareSlider
        beforeImage="/images/demo-before.jpg"
        afterImage="/images/demo-after.jpg"
      />
      <p style={{ fontSize: "0.95rem", marginTop: "1rem", textAlign: "center", opacity: 0.8 }}>
        Includes colorization, facial repair, and deep reconstruction.
      </p>
    </div>

    {/* Basic Restore - RIGHT */}
    <div style={{
      flex: "1 1 300px",
      maxWidth: "500px",
      backgroundColor: "#1a1a1a",
      padding: "1rem",
      borderRadius: "8px"
    }}>
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>✨ Photo Fix</h3>
      <ImageCompareSlider
        beforeImage="/images/BasicDemoAfter.jpg"
        afterImage="/images/basicdemo.jpg"
      />
      <p style={{ fontSize: "0.95rem", marginTop: "1rem", textAlign: "center", opacity: 0.8 }}>
        Scratch removal + clarity boost for B&W and color photos.
      </p>
    </div>

  </div>
</section>

          


      {/* ─── Feature Promo ─────────────────────────────── */}
      <section className={styles.featurePromoSection}>
        <div className={styles.featurePromoContent}>
          <div className={styles.featurePromoText}>
            <h2 className={styles.featurePromoTitle}>🧼 Clean up your photos with enhanced clarity</h2>
            <p className={styles.featurePromoSubtitle}>
              Restore Basic uses smart AI to remove noise, sharpen edges, and enhance the overall clarity of your photos —
              whether black &amp; white or color. Black and white images stay true to their original tone, while color photos
              are cleaned and subtly enriched for a crisper, more vivid look.
            </p>
          </div>
          <div className={styles.featurePromoVisual}>
            <img
              src="/images/basic-restore-preview.jpg"
              alt="Basic restored photo example"
              className={`${styles.featurePromoImage} ${styles.tiltImage}`}
            />
          </div>
        </div>
      </section>

      {/* ─── How It Works ──────────────────────────────── */}
      <div className={styles.howItWorksSection}>
        <h3>🛠️ How it works</h3>
        <ol className={styles.howItWorksList}>
          <li><span>📤</span><p>Upload your old or damaged photo</p></li>
          <li><span>✨</span><p>AI analyzes and restores details in black & white</p></li>
          <li><span>📥</span><p>Download your newly restored image</p></li>
        </ol>
      </div>

      {/* ─── FAQ ─────────────────────────────────────── */}
      <section className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>🙋‍♂️ Frequently Asked Questions</h2>
        <div className={styles.accordion}>
          <details><summary>What does the restore actually do?</summary><p>It removes scratches, corrects blur, and enhances faded sections. Premium restores add colorization and facial reconstruction.</p></details>
          <details><summary>Is my image private?</summary><p>Yes. We never store your images long-term and do not use them for training or sharing.</p></details>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────── */}
      <section className={styles.testimonials}>
        <h2 className={styles.sectionTitle}>💬 What Our Users Say</h2>
        <ul className={styles.testimonialsList}>
          <li className={styles.testimonialCard}>
            <p className={styles.testimonialText}>&quot;Unbelievable results. This brought my grandparents&apos; photo back to life!&quot;</p>
            <span className={styles.testimonialAuthor}>– Jamie R.</span>
          </li>
          <li className={styles.testimonialCard}>
            <p className={styles.testimonialText}>&quot;I cried when I saw my childhood photo restored. Thank you.&quot;</p>
            <span className={styles.testimonialAuthor}>– Marcus L.</span>
          </li>
        </ul>
      </section>

      {/* ─── Footer Notes ─────────────────────────────── */}
      <div className={styles.privacyStatement}>
        🔒 We respect your privacy. Photos are never stored or shared — everything is processed securely and temporarily.
      </div>

      <div className={styles.poweredBy}>
        ⚡ Powered by Throwback AI 
      </div>
    </>
  );
}
