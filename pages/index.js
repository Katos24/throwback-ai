import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import homeStyles from "../styles/Home.module.css";
import heroStyles from "../styles/HeroSection.module.css";
import optionCardStyles from "../styles/OptionCards.module.css";
import infoStyles from "../styles/InfoSection.module.css";
import featureStyles from "../styles/FeaturesSection.module.css";
import faqStyles from "../styles/FAQSection.module.css";
import testimonialStyles from "../styles/TestimonialsBadges.module.css";
import restoreStyles from "../styles/BeforeAfter.module.css";
import infoCardStyles from "../styles/InfoCardsSection.module.css"; // ✅ new
import journeySteps from "../styles/RestoreSteps.module.css";

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
    a: "We value your family's legacy and privacy. Uploaded photos are processed in a secure, temporary environment. Your images are never stored permanently — they are automatically wiped after one hour. We do not share, sell, or repurpose your data. Privacy is built into our DNA.",
  },
  {
    q: "Can I use restored images for commercial or personal projects?",
    a: "Once your photo is restored, it is fully yours to use — for personal keepsakes, scrapbook printing, family gifts, social media sharing, Etsy shops, or heritage art projects. We believe memories should be cherished and shared freely.",
  },
];

const testimonials = [
  {
    quote: "Anastasis brought my grandparents wedding photo back to life. It made my mom cry — in the best way!",
    author: "Emily R., Texas",
  },
  {
    quote: "The colors and details are stunning. I could not believe the difference!",
    author: "Mark S., UK",
  },
  {
    quote: "Super easy — I restored our family album in an afternoon.",
    author: "Priya D., Australia",
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
    emoji: "🧮",
    title: "Simple Pricing",
    description: "Buy credits only when you need them — no recurring charges.",
  },
  {
    emoji: "✨",
    title: "No App or Signup",
    description: "No downloads. Just fast, beautiful restoration.",
  },
  {
    emoji: "🎯",
    title: "Ideal for Families",
    description: "Perfect for memorials, genealogy, and legacy albums.",
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
        <title>Anastasis — Rediscover the Past with Throwback AI</title>
        <meta
          name="description"
          content="Anastasis, powered by Throwback AI, breathes life into your vintage memories using advanced restoration technology. Reimagine the moments that shaped you."
        />
      </Head>

      {/* Hero Section */}
      <section className={heroStyles.hero}>
      <div className={heroStyles.heroContent}>
        <h1 className={heroStyles.heroTitle}>Anastasis</h1>
        <p className={heroStyles.heroSubtitle}>The Resurrection of Memories</p>

        <p className={heroStyles.heroLeadText}>
          Restore your family&apos;s legacy with lifelike color, clarity, and warmth — powered by AI.
        </p>

        <button
          className={heroStyles.heroCTAButton}
          onClick={() => handleNavigateToRestore("/replicate/restore-basic")}
        >
          Upload Your Photo — Try Free
        </button>

        <ul className={heroStyles.heroChecklist}>
          <li>✅ Free preview — no account needed</li>
          <li>✅ Privacy-first — auto delete in 1 hour</li>
          <li>✅ Trusted by genealogists & memory keepers</li>
        </ul>

        <p className={heroStyles.heroWhisper}>
          &ldquo;The photo looked like it was taken yesterday.&rdquo;
        </p>
      </div>
    </section>



      {/* Restore Options */}
      <section className={optionCardStyles.restoreOptions}>
        <div className={optionCardStyles.heroActionGrid}>
          <div className={optionCardStyles.heroActionCard}>
            <h3>🌀 Restore Basic</h3>
            <p><strong>3 Free Restorations.</strong> Clean up grayscale images instantly.</p>
            <button onClick={() => handleNavigateToRestore("/replicate/restore-basic")}>
              Try Free
            </button>
          </div>
          <div className={optionCardStyles.heroActionCard}>
            <h3>🌈 Restore Premium</h3>
            <p><strong>Full-color, HD magic.</strong> Advanced detail revival — no subscriptions.</p>
            <button onClick={() => handleNavigateToRestore("/replicate/restore-premium")}>
              Try Premium
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* Before/After Showcase */}
      <section className={restoreStyles.beforeAfter}>
        <h2 className={restoreStyles.sectionTitle}>See the Difference</h2>

        <div className={restoreStyles.splitGrid}>
          {/* Flip Card: Original → Basic */}
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

          {/* Flip Card: Original → Premium */}
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
        <h2 className={journeySteps.restoreTitle}>Restore Steps</h2>
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


      {/* Info Cards - info card section */}
        <section className={infoCardStyles.infoCardsSection}>
        <h2 className={infoCardStyles.infoCardsTitle}>Why Choose Anastasis</h2>

        {/* Heritage */}
        <div className={infoCardStyles.infoGroup}>
          <h3 className={infoCardStyles.infoGroupTitle}>Heritage</h3>
          <div className={infoCardStyles.infoCardsGrid}>
            {infoCards.filter(card => card.category === "heritage").map((card, index) => (
              <div key={index} className={infoCardStyles.infoCard}>
                <h4>{card.title}</h4>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust */}
        <div className={infoCardStyles.infoGroup}>
          <h3 className={infoCardStyles.infoGroupTitle}>Trust</h3>
          <div className={infoCardStyles.infoCardsGrid}>
            {infoCards.filter(card => card.category === "trust").map((card, index) => (
              <div key={index} className={infoCardStyles.infoCard}>
                <h4>{card.title}</h4>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology */}
        <div className={infoCardStyles.infoGroup}>
          <h3 className={infoCardStyles.infoGroupTitle}>Technology</h3>
          <div className={infoCardStyles.infoCardsGrid}>
            {infoCards.filter(card => card.category === "tech").map((card, index) => (
              <div key={index} className={infoCardStyles.infoCard}>
                <h4>{card.title}</h4>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
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


      {/* Testimonials */}
      <section className={testimonialStyles.testimonials}>
        <h2>What Our Users Say</h2>
        <div className={testimonialStyles.testimonialGrid}>
          {testimonials.map((testimonial, index) => (
            <blockquote key={index}>
              <p>{testimonial.quote}</p> {/* ✅ removed extra wrapping quotes */}
              <cite>— {testimonial.author}</cite>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className={testimonialStyles.trustBadges}> {/* ✅ use testimonialStyles */}
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

      {/* FAQ */}
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
        <p>{/* ...SEO text unchanged... */}</p>
      </section>
    </>
  );
}
