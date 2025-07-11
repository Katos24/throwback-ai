import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

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
    a: "Absolutely! You can test our AI restoration on one image free of charge. There’s no signup, no credit card required — just upload and preview your revived photo instantly. For advanced enhancements like full colorization or blemish correction, upgrade options are available.",
  },
  {
    q: "How does Anastasis protect my privacy and image data?",
    a: "We value your family’s legacy and privacy. Uploaded photos are processed in a secure, temporary environment. Your images are never stored permanently — they are automatically wiped after one hour. We do not share, sell, or repurpose your data. Privacy is built into our DNA.",
  },
  {
    q: "Can I use restored images for commercial or personal projects?",
    a: "Once your photo is restored, it's fully yours to use — for personal keepsakes, scrapbook printing, family gifts, social media sharing, Etsy shops, or heritage art projects. We believe memories should be cherished and shared freely.",
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

      {/* === Hero Section === */}
      <section className={styles.greekBackground}>
        <div className={styles.greekContent}>
          <h1>Anastasis — The Resurrection of Memories</h1>
          <p>
            Restore your vintage photos with Greek-inspired brilliance,
            powered by Throwback AI.
          </p>

          <div className={styles.optionGridHero}>
            <OptionCard
              emoji="🧽"
              title="Restore Basic"
              desc="Quick fix for faded black & white photos."
              onClick={() => router.push("/replicate/restore-basic")}
              className={`${styles.optionCard} ${styles.optionCardBasic}`}
            />
            <OptionCard
              emoji="💎"
              title="Restore Premium"
              desc="High-quality color restoration and enhancements."
              onClick={() => router.push("/replicate/restore-premium")}
              className={`${styles.optionCard} ${styles.optionCardPremium}`}
            />
          </div>
        </div>
      </section>

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
          {/* Intro Frame */}
          <div className={styles.restoreIntro}>
            <h3>From Ordinary to Iconic</h3>
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
          Anastasis — inspired by the Greek word for “resurrection” — breathes new life
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
