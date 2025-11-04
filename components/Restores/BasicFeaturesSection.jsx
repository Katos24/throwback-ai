import ImageCompareSlider from "../ImageCompareSlider";
import styles from "../../styles/BasicFeatures.module.css";

export default function BasicFeaturesSection() {
  return (
    <>
   {/* ─── Pricing Button ─────────────────────────────── */}
       <div style={{ textAlign: "center", marginTop: "2rem" }}>
  <a href="/pricing" className={styles.pricingButton}>
    See Pricing
  </a>
</div>

{/* ─── Before/After Examples ──────────────────────── */}
      <section style={{ padding: "2rem 1rem", backgroundColor: "#1f1f1f", textAlign: "center" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem" }}>
          
          <div style={{ flex: "1 1 300px", maxWidth: "400px" }}>
            <img
              src="/images/gallery/restore1.jpg"
              alt="Before and After 1"
              style={{ width: "100%", borderRadius: "8px" }}
              className={styles.brightImage}
            />
          </div>

          <div style={{ flex: "1 1 300px", maxWidth: "400px" }}>
            <img
              src="/images/gallery/restore5.jpg"
              alt="Before and After 2"
              style={{ width: "100%", borderRadius: "8px" }}
              className={styles.brightImage}
            />
          </div>

          <div style={{ flex: "1 1 300px", maxWidth: "400px" }}>
            <img
              src="/images/gallery/restore9.jpg"
              alt="Before and After 3"
              style={{ width: "100%", borderRadius: "8px" }}
              className={styles.brightImage}
            />
          </div>

        </div>
      </section>

    
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
            maxWidth: "450px",
            backgroundColor: "#1a1a1a",
            padding: "1rem",
            borderRadius: "8px"
          }}>
            <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>🌈 Full Color Restore</h3>
            <ImageCompareSlider
              beforeImage="/images/basic-before.jpg"
              afterImage="/images/afterpremium2.jpg"
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
              beforeImage="/images/restore-before-faded.jpg"
              afterImage="/images/restore-after-completed.jpg"
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
              src="/images/restore-preview.webp"
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
{/* ─── FAQ ─────────────────────────────────────── */}
<section className={styles.faqSection}>
  <h2 className={styles.sectionTitle}>🙋‍♂️ Frequently Asked Questions</h2>
  <div className={styles.accordion}>
    <details>
      <summary>What does the restore actually do?</summary>
      <p>Our restoration removes scratches, corrects blur, and enhances faded sections. Premium restores add full colorization and facial reconstruction using advanced AI trained on historical photography.</p>
    </details>

    <details>
      <summary>Why use Throwback AI instead of ChatGPT or other AI tools?</summary>
      <p>Unlike general AI chatbots, we're specifically built for photo restoration with specialized models trained on historical photography. Our AI understands period-appropriate colors, clothing, and facial features that general tools miss. Plus, we're optimized for speed and quality - no prompting required.</p>
    </details>
    
    <details>
      <summary>Is my image private?</summary>
      <p>Yes. We never store your images long-term and do not use them for training or sharing. Images are processed securely and deleted after restoration.</p>
    </details>
    
    <details>
      <summary>What file formats are supported?</summary>
      <p>We support PNG, JPG, JPEG, and HEIC files up to 10MB. For best results, use high-resolution images with clear facial features.</p>
    </details>
    
    <details>
      <summary>How accurate is the colorization?</summary>
      <p>Our AI is trained on thousands of historical photos and achieves high accuracy for skin tones, clothing, and common objects. However, specific colors like unusual clothing or unique items may vary from the original.</p>
    </details>
    
    <details>
      <summary>Can I restore very old or damaged photos?</summary>
      <p>Yes! Our AI works best on photos from the 1900s onward, but can restore even severely damaged images. For extremely old photos (1800s), results may vary depending on the original quality.</p>
    </details>
    
    <details>
      <summary>How long does restoration take?</summary>
      <p>Basic restoration is super fast - usually under 15 seconds. Premium colorization takes up to a minute, but typically completes in under 45 seconds.</p>
    </details>
    
    <details>
      <summary>What's the difference between basic and premium restore?</summary>
      <p>Basic restore (1 credit) quickly fixes damage and enhances clarity. Premium restore (40 credits) includes full colorization, advanced facial reconstruction, and studio-quality enhancement.</p>
    </details>
    
    <details>
      <summary>Do you restore photos of people who have passed away?</summary>
      <p>Yes, we help preserve family memories by restoring photos of deceased loved ones. This is one of our most meaningful use cases - bringing old family photos back to life.</p>
    </details>
    
    
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
