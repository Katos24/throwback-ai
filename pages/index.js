import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";

const faqData = [
  {
    q: "What types of old photos can be restored with Anastasis?",
    a: "Anastasis restores scanned family photos, vintage prints, faded Polaroids, black & white portraits, historical images, and heirloom photographs. Our AI-powered service enhances fine details, color accuracy, and clarity — ideal for genealogy projects, memory albums, or memorial tributes.",
  },
  {
    q: "Do I need to scan my physical photograph before uploading?",
    a: "Yes. For best results, upload a clear digital scan of your old photo. Most users use a smartphone or home scanner — just make sure the image is well-lit, flat, and in focus. The higher the resolution, the better the restoration outcome.",
  },
  {
    q: "Is Anastasis photo restoration free to try?",
    a: "Absolutely! You can test our AI restoration on one image free of charge. There is no signup, no credit card required — just upload and preview your revived photo instantly. For advanced enhancements like full colorization or blemish correction, upgrade options are available.",
  },
  {
    q: "How does Anastasis protect my privacy and image data?",
    a: "We value your familys legacy and privacy. Uploaded photos are processed in a secure, temporary environment. Your images are never stored permanently — they are automatically wiped after one hour. We do not share, sell, or repurpose your data. Privacy is built into our DNA.",
  },
  {
    q: "Can I use restored images for commercial or personal projects?",
    a: "Once your photo is restored, its fully yours to use — for personal keepsakes, scrapbook printing, family gifts, social media sharing, Etsy shops, or heritage art projects. We believe memories should be cherished and shared freely.",
  },
];


export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Anastasis — Resurrection of Memories, powered by Throwback AI</title>
        <meta
          name="description"
          content="Anastasis powered by Throwback AI restores your vintage photos to life with advanced AI technology."
        />
      </Head>


{/* === Cinematic Hero Section === */}
<section className={styles.hero}>
  <div className={styles.heroContent}>
    <h1 className={styles.heroTitle}>Anastasis</h1>
    <p className={styles.heroSubtitle}>The Resurrection of Memories</p>


    {/* Action Cards */}
    <div className={styles.heroActionGrid}>
      <div className={styles.heroActionCard}>
        <h3>🌀 Restore Basic</h3>
        <p><strong>3 Free Restorations.</strong> No account needed. Clean up grayscale images instantly.</p>
        <button onClick={() => router.push("/replicate/restore-basic")}>
          Try Free Now
        </button>
      </div>
      <div className={styles.heroActionCard}>
        <h3>🌈 Restore Premium</h3>
        <p><strong>Advanced detail revival.</strong> Full-color, high-definition magic — no subscriptions.</p>
        <button onClick={() => router.push("/replicate/restore-premium")}>
          Try Premium Now
        </button>
      </div>
    </div>

        {/* CTA Section */}
    <div className={styles.heroCTAContainer}>
      <Link href="/pricing" className={styles.heroCTAButton}>
        🧮 View Credit Plans
      </Link>
    </div>


    {/* Intro Bubble */}
    <div className={styles.heroBubbleGrid}>
      <div className={styles.heroBubble}>
        <h3>📸 Restore the Past</h3>
        <p>
          A grandfather’s portrait. A faded wedding photo. A lost childhood snapshot. 
          <strong> Anastasis </strong> brings forgotten images back to life.
        </p>
      </div>
    </div>



    {/* Feature Bubbles */}
    <div className={styles.heroFeatureGrid}>
      <div className={styles.heroFeatureBubble}>
        <h4>🧮 Simple Pricing</h4>
        <p>Buy credits only when you need them — no recurring charges.</p>
      </div>
      <div className={styles.heroFeatureBubble}>
        <h4>✨ No App or Signup</h4>
        <p>No downloads. No login. Just fast, beautiful restoration.</p>
      </div>
      <div className={styles.heroFeatureBubble}>
        <h4>🎯 Ideal for Families</h4>
        <p>Perfect for memorials, genealogy, and legacy albums.</p>
      </div>
    </div>


   


      {/* === Greek Origin Explanation === */}
      <section className={styles.infoGreek}>
        <p>
          <strong>Anastasis</strong> (Greek for “resurrection”) represents bringing your
          old photos back to life, restoring memories with the magic of AI.
        </p>
      </section>

  

      {/* === Restore Comparison Section === */}
          <section className={styles.restoreComparison}>
            <h2 className={styles.restoreTitle}>Witness the Transformation</h2>
            <div className={styles.restoreRow}>
              <div className={styles.restoreIntro}>
            
              </div>

              <div className={styles.restoreItem}>
                <Image src="/images/restore-original.png" alt="Original Photo" width={300} height={300} />
                <h4>Original</h4>
              </div>

              <div className={styles.restoreArrow}>→</div>

              <div className={styles.restoreItem}>
                <Image src="/images/restore-basic.png" alt="Basic Restoration" width={300} height={300} />
                <h4>Basic Restore</h4>
              </div>

              <div className={styles.restoreArrow}>→</div>

              <div className={styles.restoreItem}>
                <Image src="/images/restore-premium.png" alt="Premium Restoration" width={300} height={300} />
                <h4>Premium Restore</h4>
              </div>
            </div>
          </section>


         {/* Hoverable Info Cards */}
    <div className={styles.heroCardGrid}>
      <div className={styles.heroInfoCard}>
        <h3>Greek-Inspired Brilliance</h3>
        <p>
          “Anastasis” means resurrection. Our interface draws inspiration from myth, legacy, and timeless design.
        </p>
      </div>
      <div className={styles.heroInfoCard}>
        <h3>No Account Required</h3>
        <p>
          Drag and drop your image — no signups, storage, or hidden terms.
        </p>
      </div>
      <div className={styles.heroInfoCard}>
        <h3>Powered by Throwback AI</h3>
        <p>
          Cutting-edge restoration models revive texture, tone, and lost detail with emotional precision.
        </p>
      </div>
      <div className={styles.heroInfoCard}>
        <h3>Preserve Family Heritage</h3>
        <p>
          Designed for genealogists and memory-keepers to give the past a vibrant second life.
        </p>
      </div>
    </div>
  </div>
</section>


          {/* === Before/After Info Blocks === */}
      <section className={styles.infoWrap}>
        <div className={styles.infoBlock}>
          <div className={styles.beforeAfterContainer}>
            <Image
              src="/images/greek-after.png"
              alt="Before"
              className={styles.beforeImage}
              width={400}
              height={300}
            />
            <Image
              src="/images/greek-before.png"
              alt="After"
              className={styles.afterImage}
              width={400}
              height={300}
            />
          </div>
          <div className={styles.infoText}>
            <h2>Every Scar Tells a Story</h2>
            <p>Creases, stains, and tears — our AI doesn’t erase history, it enhances it. Celebrate each mark as part of your legacy.</p>
          </div>
        </div>

        <div className={`${styles.infoBlock} ${styles.reverse}`}>
          <div className={styles.beforeAfterContainer}>
            <Image
              src="/images/info-2-before.png"
              alt="Before"
              className={styles.beforeImage}
              width={400}
              height={300}
            />
            <Image
              src="/images/info-2-after.png"
              alt="After"
              className={styles.afterImage}
              width={400}
              height={300}
            />
          </div>
          <div className={styles.infoText}>
            <h2>Revive Connections</h2>
            <p>Remember the warmth in someone’s smile or the look in their eyes. Anastasis helps you reconnect with cherished faces and moments.</p>
          </div>
        </div>
      </section>



      {/* === Restore Journey Section === */}
<section className={styles.restoreJourney}>
  <h2>The Anastasis Restore Journey</h2>
  <div className={styles.journeySteps}>
    <div className={styles.journeyCard}>
      <h3>📤 Upload</h3>
      <p>Choose a vintage photo — scanned or snapped. We recommend clear lighting for best results.</p>
    </div>
    <div className={styles.journeyCard}>
      <h3>🧠 AI Restoration</h3>
      <p>Throwback AI enhances your image with detailed colorization and texture repair. No edits are manual.</p>
    </div>
    <div className={styles.journeyCard}>
      <h3>👁️ Preview</h3>
      <p>See your restored photo instantly. Compare before/after and decide if you’d like premium refinements.</p>
    </div>
    <div className={styles.journeyCard}>
      <h3>🕒 Privacy Guarantee</h3>
      <p>Your image is deleted automatically after 1 hour. We never store, share, or use it to train models. Period.</p>
    </div>
    <div className={styles.journeyCard}>
      <h3>📥 Download & Share</h3>
      <p>Download your revived legacy photo — ready for family gifts, tributes, or public display.</p>
    </div>
  </div>
</section>

{/* === Testimonials Section === */}
<section className={styles.testimonials}>
  <h2>What Our Users Say</h2>
  <div className={styles.testimonialGrid}>
    <blockquote>
      <p>“Anastasis brought my grandparents wedding photo back to life. It made my mom cry — in the best way!”</p>
      <cite>— Emily R., Texas</cite>
    </blockquote>
    <blockquote>
      <p>“The colors and details are stunning. I could not believe the difference!”</p>
      <cite>— Mark S., UK</cite>
    </blockquote>
    <blockquote>
      <p>“Super easy — I restored our family album in an afternoon.”</p>
      <cite>— Priya D., Australia</cite>
    </blockquote>
  </div>
</section>

{/* === Trust Badges === */}
<section className={styles.trustBadges}>
  <h2>Your Privacy, Guaranteed</h2>
  <div className={styles.badgeGrid}>
    <div className={styles.badgeItem}>
      <Image src="/icons/lock.svg" alt="Secure Uploads" width={40} height={40} />
      <p>Secure Uploads</p>
    </div>
    <div className={styles.badgeItem}>
      <Image src="/icons/delete.svg" alt="Auto Delete" width={40} height={40} />
      <p>Auto Delete in 1 Hour</p>
    </div>
    <div className={styles.badgeItem}>
      <Image src="/icons/no-share.svg" alt="Never Shared" width={40} height={40} />
      <p>Never Shared or Sold</p>
    </div>
  </div>
</section>



      {/* === FAQ Section: Collapsible Cards === */}
      <section className={styles.faqSection}>
        <h2>Frequently Asked Questions</h2>
        <div className={styles.faqAccordion}>
          {faqData.map((item, idx) => (
            <FAQItem key={idx} question={item.q} answer={item.a} />
          ))}
        </div>
      </section>

      {/* === SEO Text Block === */}
      <section
        className={styles.seoText}
        aria-label="Anastasis Photo Restoration AI"
      >
        <h2>Restore and Revive Your Memories with Anastasis</h2>
        <p>
          Anastasis — inspired by the Greek word for &quot;resurrection&quot; — breathes new life
          into your old, damaged, or faded photos. Powered by Throwback AI, our
          cutting-edge restoration service revives your vintage family portraits,
          cherished moments, and historical images with stunning clarity and detail.
        </p>
        <p>
          From basic black and white touch-ups to premium colorization and advanced
          enhancements, Anastasis offers AI photo restoration that combines the timeless
          beauty of Greek heritage with state-of-the-art technology. Rediscover the
          stories behind every photograph and preserve your family legacy for generations
          to come.
        </p>
         <p>
          While other AI platforms focus on chat or generic editing, Anastasis is purpose-built for photo restoration. 
          This isn’t just talk — our advanced image models revive lost detail with forensic precision, emotional depth, 
          and respect for your history. 
          Uploaded images are processed securely and deleted after one hour. Nothing is stored, shared, or reused. Anastasis isn’t a chatbot — it’s a memory revival studio.
        </p>
        <p>
          Trusted by history lovers, genealogists, and families worldwide, Anastasis makes
          it easy to resurrect your memories. Experience the rebirth of your treasured
          images — brought back to life with the power of Throwback AI.
        </p>
      </section>
    </>
  );
}

// === OptionCard Component ===
function OptionCard({ emoji, title, desc, onClick, className }) {
  return (
    <div className={className} onClick={onClick}>
      <h3>{emoji} {title}</h3>
      <p>{desc}</p>
    </div>
  );
}

// === FAQ Collapsible Card Component ===
function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.faqCard} ${open ? styles.open : ""}`} onClick={() => setOpen(!open)}>
      <h3 className={styles.faqQuestion}>{question}</h3>
      {open && <p className={styles.faqAnswer}>{answer}</p>}
    </div>
  );
}
