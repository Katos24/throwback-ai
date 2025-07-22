import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

import heroStyles from "../styles/HeroSection.module.css";
import RestoreOptionsStyles from "../styles/RestoreOptions.module.css";
import featureStyles from "../styles/FeaturesSection.module.css";
import pricingStyles from "../styles/PricingSection.module.css";
import testimonialStyles from "../styles/TestimonialsBadges.module.css";
import faqStyles from "../styles/FAQSection.module.css";
import infoCardStyles from "../styles/InfoCardsSection.module.css";
import infoStyles from "../styles/InfoSection.module.css";
import migrationStyles from "../styles/MigrationSection.module.css";
import styles from '../styles/TopBanner.module.css';
import ImageCompareSlider from "../components/ImageCompareSlider";
import featureCompareStyles from '../styles/FeaturesWithCircleCompare.module.css';


const features = [
  {
    emoji: "🧬",
    title: "Heritage DNA Technology",
    description:
      "Our AI understands vintage photography techniques, film grain, and historical contexts better than generic apps.",
  },
  {
    emoji: "🎯",
    title: "Genealogy-Grade Quality",
    description:
      "Trusted by family historians and archivists. Results suitable for heritage documentation and professional genealogy work.",
  },
  {
    emoji: "⚡",
    title: "No Subscription Scams",
    description:
      "While others lock you into monthly fees, we charge fairly per restoration. Your money, your choice.",
  },
  {
    emoji: "🔐",
    title: "Fort Knox Privacy",
    description:
      "Your photos never leave secure processing and are auto-deleted within one hour.",
  },
];

const testimonials = [
  {
    quote:
      "Tried Remini and MyHeritage first - Anastasis blew them away. The historical accuracy is incredible.",
    author: "Sarah M., Professional Genealogist",
  },
  {
    quote:
      "Finally escaped the subscription trap! Anastasis gave me museum-quality results without the monthly fees.",
    author: "David L., Family Historian",
  },
  {
    quote:
      "After disappointing results from mainstream apps, Anastasis understood my 1920s family portrait perfectly.",
    author: "Elena R., Heritage Researcher",
  },
];


const faqData = [
  {
    q: "How is Anastasis different from Remini, MyHeritage, or other photo apps?",
    a: "While mainstream apps use generic AI models designed for modern photos, Anastasis uses heritage-specific AI trained on historical photography techniques. We focus on family legacy, not social media filters. Plus, no subscription traps - you pay only for what you restore.",
  },
  {
    q: "Why should I trust Anastasis over established competitors?",
    a: "Established doesn't mean better. Big tech companies harvest your data and lock you into subscriptions. Anastasis was built by genealogy enthusiasts who understand that family photos deserve specialized care, not generic processing.",
  },
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
    a: "Absolutely! You can test our Photo Fix service on one image free of charge. There is no signup, no credit card required — just upload and preview your revived photo instantly. For advanced enhancements like full colorization or blemish correction with Photo Revival, upgrade options are available.",
  },
  {
    q: "How does Anastasis protect my privacy and image data?",
    a: "We value your family's legacy and privacy. Uploaded photos are processed in a secure, temporary environment. Your images are never stored permanently — they are automatically wiped after one hour. We do not share, sell, or repurpose your data. Privacy is built into our DNA.",
  },
  {
    q: "Can I use restored images for commercial or personal projects?",
    a: "Once your photo is restored, it is fully yours to use — for personal keepsakes, scrapbook printing, family gifts, social media sharing, Etsy shops, or heritage art projects. We believe memories should be cherished and shared freely.",
  },
];

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`${faqStyles.faqCard} ${open ? faqStyles.open : ""}`}
      onClick={() => setOpen(!open)}
    >
      <h3 className={faqStyles.faqQuestion}>{question}</h3>
      {open && <p className={faqStyles.faqAnswer}>{answer}</p>}
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const handleNavigateToRestore = (path) => router.push(path);

  return (
    <>
      <Head>
        <title>
          Anastasis — Heritage Photo Restoration That Outperforms Mainstream Apps
        </title>
        <meta
          name="description"
          content="Tired of generic photo apps? Anastasis uses heritage-specific AI to restore family photos with genealogy-grade quality. No subscriptions, superior results."
        />
      </Head>

      

{/* Top Banner Section with Two Columns */}
<section className={styles.topBannerHero}>
  <div className={styles.topBannerContent}>
    <div className={styles.topBannerLeft}>
      <p className={styles.bannerIntro}>Revival, not replacement.</p>

      <h1>Restore the Soul of Your Family Photos</h1>

      <p>
        <strong>Anastasis</strong> combines ancient Greek wisdom with modern AI.  
        Try <strong>Photo Fix</strong> for crystal-clear, detailed photo repairs.  
        Upgrade to <strong>Photo Revival</strong> for breathtaking colorization and vintage magic.
      </p>

      <div className={styles.ctaButtonContainer}>
        <button
          className={styles.topBannerButton}
          onClick={() => handleNavigateToRestore("/replicate/restore-basic")}
        >
          Try Photo Fix Free
        </button>
        <button
          className={styles.secondaryButton}
          onClick={() => handleNavigateToRestore("/replicate/restore-premium")}
        >
          Explore Photo Revival
        </button>
      </div>

      
    </div>

    <div className={styles.topBannerRight}>
      <div className={styles.bannerVideoWrapper}>
        <video
          src="/images/transformation.mp4"
          autoPlay
          loop
          muted
          playsInline
          className={styles.bannerVideo}
        />
      </div>
    </div>
  </div>
</section>




{/* Full Portrait-Friendly ImageCompare Section */}
<section style={{ padding: "3rem 1rem", backgroundColor: "#121212", color: "white" }}>
  <style>{`
    .portrait-compare > div {
      max-width: none !important;
      margin: 0 !important;
      height: 600px !important;
      padding-bottom: 0 !important;
      width: 100% !important;
    }
    
    @media (max-width: 768px) {
      .portrait-compare > div {
        height: 450px !important;
      }
      .portrait-compare {
        width: 280px !important;
        height: 450px !important;
      }
    }
    
    @media (max-width: 480px) {
      .portrait-compare > div {
        height: 400px !important;
      }
      .portrait-compare {
        width: 250px !important;
        height: 400px !important;
      }
    }
  `}</style>

  <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
    Product Demo
  </h2>

  <div style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    justifyContent: "center",
    alignItems: "flex-start"
  }}>
    {/* Photo Fix */}
    <div style={{
      flex: "0 0 auto",
      width: "400px",
      maxWidth: "calc(100vw - 2rem)",
      textAlign: "center"
    }}>
      <div className="portrait-compare" style={{
        width: "400px",
        maxWidth: "100%",
        height: "600px",
        position: "relative",
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        margin: "0 auto"
      }}>
        <ImageCompareSlider
          beforeImage="/images/basic-before.jpg"
          afterImage="/images/basic-after.jpg"
        />
      </div>
      <h3 style={{ marginTop: "1rem" }}>Photo Fix</h3>
    </div>

    {/* Photo Revival */}
    <div style={{
      flex: "0 0 auto",
      width: "400px",
      maxWidth: "calc(100vw - 2rem)",
      textAlign: "center"
    }}>
      <div className="portrait-compare" style={{
        width: "400px",
        maxWidth: "100%",
        height: "600px",
        position: "relative",
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        margin: "0 auto"
      }}>
        <ImageCompareSlider
          beforeImage="/images/premium-before.jpg"
          afterImage="/images/premium-after.jpg"
        />
      </div>
      <h3 style={{ marginTop: "1rem" }}>Photo Revival</h3>
    </div>
  </div>
</section>



{/* Hero Section */}
<section className={heroStyles.hero}>
  <h1>Your grandmother&apos;s wedding photo deserves more than a generic filter.</h1>
  <p>Bring your family&apos;s forgotten photos back to life as vivid as you remember.</p>
  <button className={heroStyles.heroCTAButton} onClick={() => handleNavigateToRestore("/replicate/restore-basic")}>
    See Your History in Full Color
  </button>
  <div className={heroStyles.scrollHint}>Discover the power of preservation ↓</div>
</section>

      {/* Restore Options + Before/After */}
<section className={RestoreOptionsStyles.restoreOptions}>
  <h2>Choose Your Restoration Level</h2>
  <div className={RestoreOptionsStyles.restoreCardGrid}>

    {/* Photo Fix */}
    <div className={RestoreOptionsStyles.restoreCard}>
      <h3>🛠️ Photo Fix</h3> {/* 👈 TITLE MOVED UP */}
      <div className={RestoreOptionsStyles.imagePair}>
        <Image
          src="/images/basic-before.jpg"
          alt="Old grayscale photo before Photo Fix restoration"
          width={500}
          height={500}
          className={RestoreOptionsStyles.pairedImage}
        />
        <Image
          src="/images/basic-after.jpg"
          alt="Restored grayscale photo after Photo Fix restoration"
          width={500}
          height={500}
          className={RestoreOptionsStyles.pairedImage}
        />
      </div>
      <div className={RestoreOptionsStyles.cardContent}>
        <p>
          <strong>3 Free Fixes.</strong> Transform damaged photos into crisp, clear memories instantly.
        </p>
        <button onClick={() => handleNavigateToRestore("/replicate/restore-basic")}>
          Fix Your Photos Free – No Strings Attached
        </button>
      </div>
    </div>

    {/* Photo Revival */}
    <div className={RestoreOptionsStyles.restoreCard}>
      <h3>✨ Photo Revival</h3> {/* 👈 TITLE MOVED UP */}
      <div className={RestoreOptionsStyles.imagePair}>
        <Image
          src="/images/premium-before.jpg"
          alt="Old faded photo before Photo Revival restoration"
          width={500}
          height={500}
          className={RestoreOptionsStyles.pairedImage}
        />
        <Image
          src="/images/premium-after.jpg"
          alt="Restored full-color photo after Photo Revival restoration"
          width={500}
          height={500}
          className={RestoreOptionsStyles.pairedImage}
        />
      </div>
      <div className={RestoreOptionsStyles.cardContent}>
        <p>
          <strong>Full-color, HD magic.</strong> Breathe life back into faded memories with stunning detail revival.
        </p>
        <button onClick={() => handleNavigateToRestore("/replicate/restore-premium")}>
          Experience Heritage-Grade Photo Revival
        </button>
      </div>
    </div>

  </div>
</section>



   <section className={featureCompareStyles.container}>
  {/* Unified Section Title */}
  <h2 className={featureCompareStyles.sectionTitle}>See the Restoration Impact</h2>

  {/* Left: Feature Stats */}
  <div className={featureCompareStyles.featuresSide}>
    <div className={featureCompareStyles.featuresRow}>
      <div className={featureCompareStyles.featureCard}>
        <div className={featureCompareStyles.featureStat}>1M+</div>
        <div className={featureCompareStyles.featureLabel}>Photos restored worldwide</div>
      </div>
      <div className={featureCompareStyles.featureCard}>
        <div className={featureCompareStyles.featureStat}>99%</div>
        <div className={featureCompareStyles.featureLabel}>Authenticity retained</div>
      </div>
      <div className={featureCompareStyles.featureCard}>
        <div className={featureCompareStyles.featureStat}>60+</div>
        <div className={featureCompareStyles.featureLabel}>Countries served</div>
      </div>
      <div className={featureCompareStyles.featureCard}>
        <div className={featureCompareStyles.featureStat}>
          4.9<span className={featureCompareStyles.starIcon}>★</span>
        </div>
        <div className={featureCompareStyles.featureLabel}>Average customer rating</div>
      </div>
    </div>
  </div>

  {/* Right: Circular Restoration Flow */}
  <div className={featureCompareStyles.circleCompareSide}>
    <div className={featureCompareStyles.circleContainer}>
      <div className={`${featureCompareStyles.circleItem} ${featureCompareStyles.original}`}>
        <img
          src="/images/example-before.jpg"
          alt="Original"
          className={featureCompareStyles.compareImage}
        />
        <span>Original</span>
      </div>
      <div className={`${featureCompareStyles.circleItem} ${featureCompareStyles.basic}`}>
        <img
          src="/images/example-basic.jpg"
          alt="Photo Fix"
          className={featureCompareStyles.compareImage}
        />
        <span>Photo Fix</span>
      </div>
      <div className={`${featureCompareStyles.circleItem} ${featureCompareStyles.premium}`}>
        <img
          src="/images/example-premium.jpg"
          alt="Photo Revival"
          className={featureCompareStyles.compareImage}
        />
        <span>Photo Revival</span>
      </div>
    </div>
  </div>
</section>





{/* Scrollable Gallery Section */}
<section className={featureStyles.gallerySection}>
  <h2 className={featureStyles.galleryHeading}>Before & After Gallery</h2>
  <div className={featureStyles.galleryScroll}>
    <div className={featureStyles.galleryCard}>
      <div className={featureStyles.galleryImageWrapper}>
        <Image src="/images/before1.jpg" alt="Before" width={300} height={450} />
      </div>
      <div className={featureStyles.galleryImageWrapper}>
        <Image src="/images/after1.jpg" alt="After" width={300} height={450} />
      </div>
    </div>

    <div className={featureStyles.galleryCard}>
      <div className={featureStyles.galleryImageWrapper}>
        <Image src="/images/before2.jpg" alt="Before" width={300} height={450} />
      </div>
      <div className={featureStyles.galleryImageWrapper}>
        <Image src="/images/after2.jpg" alt="After" width={300} height={450} />
      </div>
    </div>

    <div className={featureStyles.galleryCard}>
      <div className={featureStyles.galleryImageWrapper}>
        <Image src="/images/before3.jpg" alt="Before" width={300} height={450} />
      </div>
      <div className={featureStyles.galleryImageWrapper}>
        <Image src="/images/after3.jpg" alt="After" width={300} height={450} />
      </div>
    </div>
    <div className={featureStyles.galleryCard}>
      <div className={featureStyles.galleryImageWrapper}>
        <Image src="/images/before4.jpg" alt="Before" width={300} height={450} />
      </div>
      <div className={featureStyles.galleryImageWrapper}>
        <Image src="/images/after4.jpg" alt="After" width={300} height={450} />
      </div>
    </div>
     <div className={featureStyles.galleryCard}>
      <div className={featureStyles.galleryImageWrapper}>
        <Image src="/images/before5.jpg" alt="Before" width={300} height={450} />
      </div>
      <div className={featureStyles.galleryImageWrapper}>
        <Image src="/images/after5.jpg" alt="After" width={300} height={450} />
      </div>
    </div>
     <div className={featureStyles.galleryCard}>
      <div className={featureStyles.galleryImageWrapper}>
        <Image src="/images/before6.jpg" alt="Before" width={300} height={450} />
      </div>
      <div className={featureStyles.galleryImageWrapper}>
        <Image src="/images/after6.jpg" alt="After" width={300} height={450} />
      </div>
    </div>
    {/* Add more cards as needed */}
  </div>
</section>



      {/* Pricing & Privacy Section */}
      <section className={pricingStyles.honestPricing}>
  <h2 className={pricingStyles.pricingHeading}>
    One-Time Purchase <span className={pricingStyles.vsAccent}>vs</span> Monthly Subscriptions
  </h2>
  <p className={pricingStyles.subtitle}>
    Buy credits once, use them whenever you need. No recurring charges. No hidden strings.
  </p>
          
          <div className={pricingStyles.pricingComparison}>
            <div className={pricingStyles.competitorCard}>
              <h3>Other Apps</h3>
              <div className={pricingStyles.priceDisplay}>
                <span className={pricingStyles.currency}>$</span>
                <span className={pricingStyles.amount}>9.99</span>
                <span className={pricingStyles.perUnit}>per month</span>
              </div>
              <p className={pricingStyles.priceNote}>$120/year whether you use it or not</p>
              <ul className={pricingStyles.featureList}>
                <li>❌ Monthly recurring charges</li>
                <li>❌ Pay even when not using</li>
                <li>❌ Account required</li>
              </ul>
            </div>

            <div className={pricingStyles.anastasisCard}>
              <h3>Anastasis</h3>
              <div className={pricingStyles.priceDisplay}>
                <span className={pricingStyles.currency}>$</span>
                <span className={pricingStyles.amount}>2.99</span>
                <span className={pricingStyles.perUnit}>per photo</span>
              </div>
              <p className={pricingStyles.priceNote}>Buy credits, use anytime</p>
              <ul className={pricingStyles.featureList}>
                <li>✅ One-time purchase</li>
                <li>✅ Credits never expire</li>
                <li>✅ Buy more as needed</li>
              </ul>
            </div>
          </div>

          <div className={pricingStyles.trustCardsGrid}>
          {[
            { icon: "🔒", label: "No account required" },
            { icon: "💳", label: "Credits never expire" },
            { icon: "🗑️", label: "Photos deleted after 1 hr" },
          ].map((point, i) => (
            <div key={i} className={pricingStyles.trustCard}>
              <span className={pricingStyles.trustCardIcon}>{point.icon}</span>
              <p className={pricingStyles.trustCardLabel}>{point.label}</p>
            </div>
          ))}
        </div> 
      </section>

      {/* Our Story & Heritage */}
<section className={infoCardStyles.infoCardsSection}>
  <h2 className={infoCardStyles.infoCardsTitle}>Our Story & Heritage</h2>
  <p>
    <strong>Anastasis</strong> (Greek for &quot;resurrection&quot;) means
    bringing old photos back to life, restoring memories with the magic of
    AI.
  </p>

  {/* Info Cards grouped by category */}
  <details open>
    <summary className={infoCardStyles.infoGroupTitle}>Heritage</summary>
    <div className={infoCardStyles.infoCardsGrid}>
      <div className={infoCardStyles.infoCard}>
        <h3>Greek-Inspired Brilliance</h3>
        <p>Myth, legacy, and timeless design.</p>
      </div>
      <div className={infoCardStyles.infoCard}>
        <h3>Preserve Family Heritage</h3>
        <p>Perfect for genealogists and memory-keepers.</p>
      </div>
    </div>
  </details>

  <details>
    <summary className={infoCardStyles.infoGroupTitle}>Trust</summary>
    <div className={infoCardStyles.infoCardsGrid}>
      <div className={infoCardStyles.infoCard}>
        <h3>No Account Required</h3>
        <p>Drag and drop — no storage or hidden terms.</p>
      </div>
      <div className={infoCardStyles.infoCard}>
        <h3>Secure & Private</h3>
        <p>Auto delete in 1 hour. We never store or sell your photos.</p>
      </div>
    </div>
  </details>

  <details>
    <summary className={infoCardStyles.infoGroupTitle}>Technology</summary>
    <div className={infoCardStyles.infoCardsGrid}>
      <div className={infoCardStyles.infoCard}>
        <h3>Powered by Throwback AI</h3>
        <p>Advanced models revive texture, tone, and lost detail.</p>
      </div>
      <div className={infoCardStyles.infoCard}>
        <h3>Lifelike Restorations</h3>
        <p>Instantly see your memories renewed — no filters.</p>
      </div>
    </div>
  </details>
</section>


      {/* Switch to Anastasis (Migration Offer + Checklist) */}
 <section className={migrationStyles.switchToAnastasis}>
  <h2 className={migrationStyles.sectionTitle}>Switch to Anastasis with Confidence</h2>
  <p className={migrationStyles.sectionLead}>
    Ready to leave subscription traps behind? We&apos;ll help migrate your restorations quickly — no data lost, no hassle.
  </p>
  <ul className={migrationStyles.migrationOfferList}>
    <li>No signups or accounts required</li>
    <li>Pay-per-use with no recurring fees</li>
    <li>Heritage-focused AI models you won&apos;t find anywhere else</li>
    <li>Secure and private — your family photos are safe with us</li>
  </ul>
  <button className={migrationStyles.offerButton} onClick={() => router.push("/migration-offer")}>
    Claim Your Migration Offer
  </button>
</section>


      {/* Testimonials Section */}
      <section className={testimonialStyles.testimonials}>
        <h2>What Genealogists Say</h2>
        <div className={testimonialStyles.testimonialGrid}>
          {testimonials.map(({ quote, author }, index) => (
            <blockquote key={index}>
              <p>{quote}</p>
              <cite>— {author}</cite>
            </blockquote>
          ))}
        </div>
      </section>


      {/* FAQ Section */}
      <section className={faqStyles.faqSection}>
        <h2>Frequently Asked Questions</h2>
        {faqData.map(({ q, a }, i) => (
          <FAQItem key={i} question={q} answer={a} />
        ))}
      </section>

      {/* SEO Text */}
      <section className={faqStyles.seoTextSection}>
        <h2>About Anastasis AI Photo Restoration</h2>
        <p>
          Anastasis is the only photo restoration service designed from the
          ground up with genealogy and family heritage in mind. Unlike generic
          photo apps, Anastasis uses AI trained on decades of vintage photo
          styles to revive your old pictures with unmatched detail and accuracy.
          Our pay-per-use model lets you restore only what you want, avoiding
          costly subscriptions. Privacy and family legacy are our top priority —
          your images are secure and auto-deleted after one hour. Choose
          Anastasis for heritage-grade photo revival trusted by professional
          genealogists and family historians worldwide.
        </p>
      </section>
    </>
  );
}