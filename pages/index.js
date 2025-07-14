// pages/index.js
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import homeStyles from "../styles/Home.module.css";
import heroStyles from "../styles/HeroSection.module.css";
import infoStyles from "../styles/InfoSection.module.css";
import featureStyles from "../styles/FeaturesSection.module.css";
import faqStyles from "../styles/FAQSection.module.css";
import testimonialStyles from "../styles/TestimonialsBadges.module.css";
import restoreStyles from "../styles/BeforeAfter.module.css";
import infoCardStyles from "../styles/InfoCardsSection.module.css";
import journeySteps from "../styles/RestoreSteps.module.css";
import competitorStyles from "../styles/CompetitorSection.module.css"; // NEW
import techStyles from "../styles/TechnicalSection.module.css"; // NEW
import pricingStyles from "../styles/PricingSection.module.css"; // NEW
import migrationStyles from "../styles/MigrationSection.module.css"; // NEW
import styles from "../styles/KazeSection.module.css";
import optionCardStyles from "../styles/RestoreOptions.module.css";
import RestoreOptionsStyles from "../styles/RestoreOptions.module.css";



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

const testimonials = [
  {
    quote: "Tried Remini and MyHeritage first - Anastasis blew them away. The historical accuracy is incredible.",
    author: "Sarah M., Professional Genealogist",
  },
  {
    quote: "Finally escaped the subscription trap! Anastasis gave me museum-quality results without the monthly fees.",
    author: "David L., Family Historian",
  },
  {
    quote: "After disappointing results from mainstream apps, Anastasis understood my 1920s family portrait perfectly.",
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

const restoreStepsData = [
  {
    emoji: "📤",
    title: "Upload Photo",
    description: "Scan or snap a vintage image. Clear lighting helps — no signup required.",
  },
  {
    emoji: "✨",
    title: "Restore Image",
    description: "Basic: Enhance clarity and fix wear. Premium: Bring black & white to full color.",
  },
  {
    emoji: "👁️",
    title: "Preview & Refine",
    description: "Compare before/after. Apply premium upgrades if you want vivid colorization.",
  },
  {
    emoji: "📥",
    title: "Download & Share",
    description: "Save your restored photo instantly. Perfect for gifts, memorials, or heritage projects.",
  },
];

const features = [
  {
    emoji: "🧬",
    title: "Heritage DNA Technology",
    description: "Our AI understands vintage photography techniques, film grain, and historical contexts better than generic apps.",
  },
  {
    emoji: "🎯",
    title: "Genealogy-Grade Quality",
    description: "Trusted by family historians and archivists. Results suitable for heritage documentation and professional genealogy work.",
  },
  {
    emoji: "⚡",
    title: "No Subscription Scams",
    description: "While others lock you into monthly fees, we charge fairly per restoration. Your money, your choice.",
  },
  {
    emoji: "🔐",
    title: "Fort Knox Privacy",
    description: "Unlike cloud-based competitors, your photos never leave secure processing. Auto-deleted in 1 hour, guaranteed.",
  },
];

const infoCards = [
  {
    title: "Greek-Inspired Brilliance",
    description: "Anastasis means resurrection. Myth, legacy, and timeless design.",
    category: "heritage",
  },
  {
    title: "Preserve Family Heritage",
    description: "Perfect for genealogists and memory-keepers.",
    category: "heritage",
  },
  {
    title: "No Account Required",
    description: "Drag and drop — no storage or hidden terms.",
    category: "trust",
  },
  {
    title: "Secure & Private",
    description: "Auto delete in 1 hour. We never store or sell your photos.",
    category: "trust",
  },
  {
    title: "Powered by Throwback AI",
    description: "Advanced models revive texture, tone, and lost detail.",
    category: "tech",
  },
  {
    title: "Lifelike Restorations",
    description: "Instant colorization, detail repair, and memory enhancement.",
    category: "tech",
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
        <title>Anastasis — Heritage Photo Restoration That Outperforms Mainstream Apps</title>
        <meta
          name="description"
          content="Tired of generic photo apps? Anastasis uses heritage-specific AI to restore family photos with genealogy-grade quality. No subscriptions, superior results."
        />
      </Head>

      {/* Hero Section */}
      <section className={heroStyles.hero}>
        <div className={heroStyles.heroContent}>
          {/* Competitive Hook */}
          <p className={heroStyles.competitiveHook}>
            Tired of generic photo apps that miss the soul of your memories?
          </p>

          <h1 className={heroStyles.heroTitle}>While others restore photos, we resurrect memories</h1>
          <p className={heroStyles.heroSubtitle}>Anastasis - Where Heritage Meets Tomorrow</p>

          <p className={heroStyles.heroLeadText}>
            Experience heritage-focused AI that understands your family&apos;s story, not just pixels.
          </p>

          <button
            className={heroStyles.heroCTAButton}
            onClick={() => handleNavigateToRestore("/replicate/restore-basic")}
          >
            Try the AI That Understands History
          </button>

          <ul className={heroStyles.heroChecklist}>
            <li>✨ Industry-leading AI — Superior to mainstream apps</li>
            <li>🏛️ Heritage-focused — Built for family legacy, not social media</li>
            <li>🔒 Privacy-first — Your memories stay yours (unlike cloud services)</li>
          </ul>

         <div className={heroStyles.heroWhisper}>
          <span className={heroStyles.quoteMark}>&ldquo;</span>
          <span className={heroStyles.quoteText}>Finally, an app that gets family history.</span>
          <span className={heroStyles.quoteMark}>&rdquo;</span>
        </div>

          <div className={heroStyles.scrollHint}>Discover why genealogists choose us ↓</div>
        </div>
      </section>



    {/* Restore Options */}
<section className={RestoreOptionsStyles.restoreOptions}>
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
        <p><strong>3 Free Restorations.</strong> Clean up grayscale images instantly.</p>
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
        <p><strong>Full-color, HD magic.</strong> Advanced detail revival — no subscriptions.</p>
        <button onClick={() => handleNavigateToRestore("/replicate/restore-premium")}>
          Experience Heritage-Grade Restoration
        </button>
      </div>
    </div>

  </div>
</section>









      {/* NEW: Kaze-Inspired Highlight Block */}
      <section className={styles.kazeSection}>
        <div className={styles.kazeContainer}>
          {/* Left Side */}
          <div className={styles.kazeIntro}>
            <h2>Why Anastasis Is Built for Families</h2>
            <p>
              Designed with legacy in mind — not likes. Anastasis restores your photos with emotional depth, historical context, and privacy-first values.
            </p>
            <button className={styles.kazeCTA}>Explore Features</button>
          </div>

          {/* Right Side */}
          <div className={styles.kazeFeatures}>
            {features.map((feature, index) => (
              <div key={index} className={styles.kazeCard}>
                <span className={styles.kazeEmoji}>{feature.emoji}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>






      {/* NEW: Competitive Differentiation Section */}
      <section className={competitorStyles.whyAnastasis}>
        <h2 className={competitorStyles.sectionTitle}>Why Anastasis Outperforms the Rest</h2>

        <div className={competitorStyles.comparisonGrid}>
          <div className={competitorStyles.comparisonRow}>
            <div className={competitorStyles.competitorCard}>
              <h3 className={competitorStyles.cardTitle} data-icon="❌">Other Apps</h3>
              <ul className={competitorStyles.featureList}>
                <li>One-size-fits-all filters</li>
                <li>Designed for socials, not legacy</li>
                <li>Recurring subscription payments</li>
                <li>Low privacy standards</li>
              </ul>
            </div>
            <div className={competitorStyles.anastasisCard}>
              <h3 className={competitorStyles.cardTitle} data-icon="✅">Anastasis</h3>
              <ul className={competitorStyles.featureList}>
                <li>Crafted for historical photos</li>
                <li>Focused on family legacy & restoration</li>
                <li>Fair pay-per-use pricing</li>
                <li>Privacy-first, no account required</li>
              </ul>
            </div>
          </div>
        </div>
      </section>



      {/* Enhanced Features Section */}
      <section className={featureStyles.featuresSection}>
        <div className={featureStyles.heroFeatureGrid}>
          {features.map((feature, index) => (
            <div key={index} className={featureStyles.heroFeatureBubble}>
              <h4>{feature.emoji} {feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEW: Technical Superiority Section */}
      <section className={techStyles.technicalEdge}>
        <div className={techStyles.container}>
          <h2 className={techStyles.sectionTitle}>The Throwback AI Advantage</h2>
          <div className={techStyles.techGrid}>
            <div className={techStyles.techCard}>
              <div className={techStyles.techIcon}>🎞️</div>
              <h3 className={techStyles.techTitle}>Period-Specific Processing</h3>
              <p className={techStyles.techDescription}>
                Our models understand 1890s daguerreotypes differently than 1970s Polaroids - unlike generic apps that treat all photos the same.
              </p>
            </div>
            <div className={techStyles.techCard}>
              <div className={techStyles.techIcon}>🔬</div>
              <h3 className={techStyles.techTitle}>Archival-Grade Results</h3>
              <p className={techStyles.techDescription}>
                Museum and library quality standards. Your restored photos meet professional genealogy and archival requirements.
              </p>
            </div>
            <div className={techStyles.techCard}>
              <div className={techStyles.techIcon}>🏛️</div>
              <h3 className={techStyles.techTitle}>Historical Context Awareness</h3>
              <p className={techStyles.techDescription}>
                Clothing, settings, and skin tones restored with historical accuracy that mainstream apps completely miss.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Pricing Transparency Section */}
      <section className={pricingStyles.honestPricing}>
        <div className={pricingStyles.container}>
          <h2 className={migrationStyles.sectionTitle}>
          Frustrated with Generic Photo Apps? You&apos;re Not Alone.
        </h2>
          <p className={pricingStyles.leadText}>
            Stop paying for features you don’t use. With Anastasis, you only pay when you restore — no subscriptions, no strings.
          </p>
          <div className={pricingStyles.pricingComparison}>
            <div className={pricingStyles.competitorPricing}>
              <h3 className={pricingStyles.pricingTitle}>Other Apps</h3>
              <div className={pricingStyles.pricingAmount}>$9.99/month</div>
              <p className={pricingStyles.pricingNote}>$119.88/year if you restore 10 photos</p>
              <ul className={pricingStyles.pricingFeatures}>
                <li>❌ Forced monthly payments</li>
                <li>❌ Pay even when not using</li>
                <li>❌ Hard to cancel</li>
              </ul>
            </div>
            <div className={pricingStyles.anastasisPricing}>
              <h3 className={pricingStyles.pricingTitle}>Anastasis</h3>
              <div className={pricingStyles.pricingAmount}>$2.99 per photo</div>
              <p className={pricingStyles.pricingNote}>$29.90 for 10 photos - pay as you go</p>
              <ul className={pricingStyles.pricingFeatures}>
                <li>✅ Pay only when you restore</li>
                <li>✅ No monthly commitments</li>
                <li>✅ Nothing to cancel</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Showcase */}
      <section className={restoreStyles.beforeAfter}>
        <h2 className={restoreStyles.sectionTitle}>See the Difference</h2>
        <div className={restoreStyles.splitGrid}>
          <div className={`${restoreStyles.flipCard} ${restoreStyles.restoreFadeIn}`}>
            <div className={restoreStyles.flipCardInner}>
              <div className={restoreStyles.flipCardFront}>
                <Image
                  src="/images/restore-original.png"
                  alt="Original (Basic side)"
                  width={300}
                  height={360}
                />
                <h4>Original → Basic</h4>
              </div>
              <div className={restoreStyles.flipCardBack}>
                <Image
                  src="/images/restore-basic.png"
                  alt="Basic Restore"
                  width={300}
                  height={360}
                />
                <h4>Basic Restored</h4>
              </div>
            </div>
            <p className={restoreStyles.restoreCaption}>
              Quick cleanup with visible enhancements — powered by AI.
            </p>
          </div>
          <div className={`${restoreStyles.flipCard} ${restoreStyles.restoreFadeIn}`}>
            <div className={restoreStyles.flipCardInner}>
              <div className={restoreStyles.flipCardFront}>
                <Image
                  src="/images/restore-original.png"
                  alt="Original (Premium side)"
                  width={300}
                  height={360}
                />
                <h4>Original → Premium</h4>
              </div>
              <div className={restoreStyles.flipCardBack}>
                <Image
                  src="/images/restore-premium.png"
                  alt="Premium Restore"
                  width={300}
                  height={360}
                />
                <h4>Premium Restored</h4>
              </div>
            </div>
            <p className={restoreStyles.restoreCaption}>
              Full-color resurrection with lifelike vibrance and depth.
            </p>
          </div>
        </div>
      </section>

      {/* Greek Origin */}
      <section className={infoStyles.infoGreek}>
        <p>
          <strong>Anastasis</strong> (Greek for &quot;resurrection&quot;) represents bringing your old photos back to life, restoring memories with the magic of AI.
        </p>
      </section>

      {/* Restore Steps Section */}
      <section className={journeySteps.restoreJourney}>
        <p className={journeySteps.restoreIntro}>
          Every photo tells a story. Let&apos;s bring yours back to life — one step at a time.
        </p>
        <h2 className={journeySteps.restoreTitle}>Restore Steps</h2>
        <p className={journeySteps.swipePrompt}>Swipe to explore the journey →</p>
        <div className={journeySteps.stepGrid}>
          {restoreStepsData.map((step, index) => (
            <div key={index} className={journeySteps.stepCard}>
              <div className={journeySteps.stepEmoji}>{step.emoji}</div>
              <h3 className={journeySteps.stepTitle}>{step.title}</h3>
              <p className={journeySteps.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Info Cards Section */}
      <section className={infoCardStyles.infoCardsSection}>
        <h2 className={infoCardStyles.infoCardsTitle}>Why Choose Anastasis</h2>
        <details className={infoCardStyles.infoGroup} open>
          <summary className={infoCardStyles.infoGroupTitle}>Heritage</summary>
          <div className={infoCardStyles.infoCardsGrid}>
            {infoCards
              .filter(card => card.category === "heritage")
              .map((card, index) => (
                <div key={index} className={infoCardStyles.infoCard}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
          </div>
        </details>
        <details className={infoCardStyles.infoGroup}>
          <summary className={infoCardStyles.infoGroupTitle}>Trust</summary>
          <div className={infoCardStyles.infoCardsGrid}>
            {infoCards
              .filter(card => card.category === "trust")
              .map((card, index) => (
                <div key={index} className={infoCardStyles.infoCard}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
          </div>
        </details>
        <details className={infoCardStyles.infoGroup}>
          <summary className={infoCardStyles.infoGroupTitle}>Technology</summary>
          <div className={infoCardStyles.infoCardsGrid}>
            {infoCards
              .filter(card => card.category === "tech")
              .map((card, index) => (
                <div key={index} className={infoCardStyles.infoCard}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
          </div>
        </details>
      </section>

      {/* Info Blocks */}
      <section className={infoStyles.infoWrap}>
        <div className={infoStyles.infoBlock}>
          <div className={infoStyles.beforeAfterContainer}>
            <Image src="/images/greek-after.png" alt="Before restoration" width={400} height={300} />
            <Image src="/images/greek-before.png" alt="After restoration" width={400} height={300} />
          </div>
          <div className={infoStyles.infoText}>
            <h2>Every Scar Tells a Story</h2>
            <p>
              Creases, stains, and tears — our AI doesn&apos;t erase history, it enhances it.
              Celebrate each mark as part of your legacy.
            </p>
          </div>
        </div>
        <div className={`${infoStyles.infoBlock} ${infoStyles.reverse}`}>
          <div className={infoStyles.beforeAfterContainer}>
            <Image src="/images/info-2-before.png" alt="Before restoration" width={400} height={300} />
            <Image src="/images/info-2-after.png" alt="After restoration" width={400} height={300} />
          </div>
          <div className={infoStyles.infoText}>
            <h2>Revive Connections</h2>
            <p>
              Remember the warmth in someone&apos;s smile or the look in their eyes.
              Anastasis helps you reconnect with cherished faces and moments.
            </p>
          </div>
        </div>
      </section>

      {/* NEW: Migration Section */}
      <section className={migrationStyles.switchToAnastasis}>
        <div className={migrationStyles.container}>
          <h2 className={migrationStyles.sectionTitle}>Ready to Switch from Generic Apps?</h2>
          <p className={migrationStyles.sectionLead}>
            We built Anastasis for families who care about legacy, not likes.
          </p>
          <div className={migrationStyles.migrationOffer}>
            <h3 className={migrationStyles.offerTitle}>Special Offer for App Refugees</h3>
            <p className={migrationStyles.offerDescription}>
              Disappointed by mainstream photo apps? Try Anastasis with 5 free premium restorations and experience the difference heritage-focused AI makes.
            </p>
            <button 
              className={migrationStyles.offerButton}
              onClick={() => handleNavigateToRestore("/replicate/restore-premium")}
            >
              Claim Your Upgrade
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className={testimonialStyles.testimonials}>
        <h2>What Our Users Say</h2>
        <div className={testimonialStyles.testimonialGrid}>
          {testimonials.map((testimonial, index) => (
            <blockquote key={index}>
              <p>{testimonial.quote}</p>
              <cite>— {testimonial.author}</cite>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className={testimonialStyles.trustBadges}>
        <h2>Your Privacy, Guaranteed</h2>
        <div className={testimonialStyles.badgeGrid}>
          {trustBadges.map((badge, index) => (
            <div key={index} className={testimonialStyles.badgeItem}>
              <Image src={badge.icon} alt={badge.alt} width={40} height={40} />
              <p>{badge.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced FAQ */}
      <section className={faqStyles.faqSection}>
        <h2>Frequently Asked Questions</h2>
        <div className={faqStyles.faqAccordion}>
          {faqData.map((item, index) => (
            <FAQItem key={index} question={item.q} answer={item.a} />
          ))}
        </div>
      </section>

      {/* SEO Text */}
      <section className={homeStyles.seoText} aria-label="Anastasis Photo Restoration AI">
        <h2>Restore and Revive Your Memories with Anastasis</h2>
        <p>
          Anastasis combines advanced AI technology with heritage expertise to restore your precious family photos. 
          Unlike generic photo apps, our specialized algorithms understand historical photography techniques and contexts, 
          delivering genealogy-grade results without subscription fees.
        </p>
      </section>
    </>
  );
}