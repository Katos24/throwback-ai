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

const trustBadges = [
  {
    icon: "/icons/lock.svg",
    alt: "Secure Uploads",
    text: "Secure Uploads",
  },
  {
    icon: "/icons/delete.svg",
    alt: "Auto Delete",
    text: "Auto Delete in 1 Hour",
  },
  {
    icon: "/icons/no-share.svg",
    alt: "Never Shared",
    text: "Never Shared or Sold",
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
    a: "Absolutely! You can test our AI restoration on one image free of charge. There is no signup, no credit card required — just upload and preview your revived photo instantly. For advanced enhancements like full colorization or blemish correction, upgrade options are available.",
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

      {/* Hero Section */}
      <section className={heroStyles.hero}>
        <div className={heroStyles.heroContent}>
          <p className={heroStyles.competitiveHook}>
            Tired of generic photo apps that miss the soul of your memories?
          </p>
          <h1 className={heroStyles.heroTitle}>
            While others restore photos, we resurrect memories
          </h1>
          <p className={heroStyles.heroSubtitle}>
            Anastasis - Where Heritage Meets Tomorrow
          </p>
          <p className={heroStyles.heroLeadText}>
            Experience heritage-focused AI that understands your family&apos;s
            story, not just pixels.
          </p>
          <button
            className={heroStyles.heroCTAButton}
            onClick={() => handleNavigateToRestore("/replicate/restore-basic")}
          >
            Try the AI That Understands History
          </button>
          <div className={heroStyles.heroWhisper}>
            <span className={heroStyles.quoteMark}>&ldquo;</span>
            <span className={heroStyles.quoteText}>
              Finally, an app that gets family history.
            </span>
            <span className={heroStyles.quoteMark}>&rdquo;</span>
          </div>
          <div className={heroStyles.scrollHint}>
            Discover why genealogists choose us ↓
          </div>
        </div>
      </section>

      {/* Restore Options + Before/After */}
      <section className={RestoreOptionsStyles.restoreOptions}>
        <h2>Choose Your Restoration Level</h2>
        <div className={RestoreOptionsStyles.restoreCardGrid}>
          {/* Restore Basic */}
          <div className={RestoreOptionsStyles.restoreCard}>
            <div className={RestoreOptionsStyles.imagePair}>
              <img
                src="/images/basic-before.jpg"
                alt="Basic restoration - before"
                className={RestoreOptionsStyles.pairedImage}
              />
              <img
                src="/images/basic-after.jpg"
                alt="Basic restoration - after"
                className={RestoreOptionsStyles.pairedImage}
              />
            </div>
            <div className={RestoreOptionsStyles.cardContent}>
              <h3>🌀 Restore Basic</h3>
              <p>
                <strong>3 Free Restorations.</strong> Clean up grayscale images
                instantly.
              </p>
              <button onClick={() => handleNavigateToRestore("/replicate/restore-basic")}>
                Escape App Subscriptions – Try Free
              </button>
            </div>
          </div>
          {/* Restore Premium */}
          <div className={RestoreOptionsStyles.restoreCard}>
            <div className={RestoreOptionsStyles.imagePair}>
              <img
                src="/images/premium-before.jpg"
                alt="Premium restoration - before"
                className={RestoreOptionsStyles.pairedImage}
              />
              <img
                src="/images/premium-after.jpg"
                alt="Premium restoration - after"
                className={RestoreOptionsStyles.pairedImage}
              />
            </div>
            <div className={RestoreOptionsStyles.cardContent}>
              <h3>🌈 Restore Premium</h3>
              <p>
                <strong>Full-color, HD magic.</strong> Advanced detail revival —
                no subscriptions.
              </p>
              <button
                onClick={() => handleNavigateToRestore("/replicate/restore-premium")}
              >
                Experience Heritage-Grade Restoration
              </button>
            </div>
          </div>
        </div>
      </section>


{/* CLEAN FEATURES SECTION */}
<section className={featureStyles.featuresSection}>
  <h2>Built for Historical Photo Restoration</h2>
  
  {/* Three Key Points */}
  <div className={featureStyles.keyPointsGrid}>
    <div className={featureStyles.keyPoint}>
      <div className={featureStyles.keyPointIcon}>🎞️</div>
      <h3>Historical Accuracy</h3>
      <p>AI trained for period-specific restoration</p>
    </div>
    <div className={featureStyles.keyPoint}>
      <div className={featureStyles.keyPointIcon}>🔒</div>
      <h3>Privacy First</h3>
      <p>No accounts, pay-per-use pricing</p>
    </div>
    <div className={featureStyles.keyPoint}>
      <div className={featureStyles.keyPointIcon}>🏛️</div>
      <h3>Archival Quality</h3>
      <p>Professional genealogy standards</p>
    </div>
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
            { icon: "🗑️", label: "Photos deleted after 24hrs" },
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
        <h2>Our Story & Heritage</h2>
        <p>
          <strong>Anastasis</strong> (Greek for &quot;resurrection&quot;) means
          bringing old photos back to life, restoring memories with the magic of
          AI.
        </p>

        {/* Info Cards grouped by category */}
        <details open>
          <summary>Heritage</summary>
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
          <summary>Trust</summary>
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
          <summary>Technology</summary>
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
      <section className={migrationStyles.migrationOffer}>
        <h2>Switch to Anastasis with Confidence</h2>
        <p>
          Ready to leave subscription traps behind? We’ll help migrate your
          restorations quickly — no data lost, no hassle.
        </p>
        <ul>
          <li>No signups or accounts required</li>
          <li>Pay-per-use with no recurring fees</li>
          <li>Heritage-focused AI models you won’t find anywhere else</li>
          <li>Secure and private — your family photos are safe with us</li>
        </ul>
        <button onClick={() => router.push("/migration-offer")}>
          Claim Your Migration Offer
        </button>
      </section>

      {/* Testimonials Section */}
      <section className={testimonialStyles.testimonialsSection}>
        <h2>What Genealogists Say</h2>
        {testimonials.map(({ quote, author }, index) => (
          <blockquote key={index} className={testimonialStyles.testimonial}>
            <p>“{quote}”</p>
            <footer>— {author}</footer>
          </blockquote>
        ))}
      </section>

      {/* FAQ Section */}
      <section className={faqStyles.faqSection}>
        <h2>Frequently Asked Questions</h2>
        {faqData.map(({ q, a }, i) => (
          <FAQItem key={i} question={q} answer={a} />
        ))}
      </section>

      {/* SEO Text */}
      <section className={infoStyles.seoTextSection}>
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
