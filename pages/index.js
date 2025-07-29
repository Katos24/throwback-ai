// pages/index.js

import React, { useState, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Image from "next/image"

// Styles
import heroStyles from "../styles/HeroSection.module.css"
import RestoreOptionsStyles from "../styles/RestoreOptions.module.css"
import featureStyles from "../styles/FeaturesSection.module.css"
import pricingStyles from "../styles/PricingSection.module.css"
import faqStyles from "../styles/FAQSection.module.css"
import infoCardStyles from "../styles/InfoCardsSection.module.css"
import migrationStyles from "../styles/MigrationSection.module.css"
import styles from "../styles/TopBanner.module.css"
import imageCompare from "../styles/ImageCompare.module.css"
import aiShowcaseStyles from "../styles/AIShowcase.module.css"

// This is the one driving our "See the Restoration Impact" grid + scroll-reveal
import featureCompareStyles from "../styles/FeaturesWithCircleCompare.module.css"

// Components
import ImageCompareSlider from "../components/ImageCompareSlider"

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
  const [open, setOpen] = useState(false)
  return (
    <div
      className={`${faqStyles.faqCard} ${open ? faqStyles.open : ""}`}
      onClick={() => setOpen(!open)}
    >
      <h3 className={faqStyles.faqQuestion}>{question}</h3>
      {open && <p className={faqStyles.faqAnswer}>{answer}</p>}
    </div>
  )
}

export default function Home() {
  const router = useRouter()
  const handleNavigateToRestore = (path) => router.push(path)

  //
  // PHOTO-REVIVAL DEMO SLIDER LOGIC
  //
  const [interacted, setInteracted] = useState(false)
  const sliderRef = useRef(null)

  // mark we've seen interaction (hide hint)
  const handleInteraction = () => {
    if (!interacted) setInteracted(true)
  }

  // arrow-key support for slider
  useEffect(() => {
    const onKey = (e) => {
      if (!interacted) setInteracted(true)
      const slider = sliderRef.current
      if (!slider) return

      let pos = slider.position || 0
      if (e.key === "ArrowLeft") pos = Math.max(0, pos - 0.05)
      if (e.key === "ArrowRight") pos = Math.min(1, pos + 0.05)
      slider.setPosition(pos)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [interacted])

  //
  // SCROLL-REVEAL FOR "See the Restoration Impact"
  //
  const featuresRef = useRef(null)
  const stepsRef = useRef(null)

  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          target.classList.add(featureCompareStyles.visible)
          obs.unobserve(target)
        }
      })
    },
    { threshold: 0.2 }
  )

  if (featuresRef.current) {
    featuresRef.current
      .querySelectorAll(`.${featureCompareStyles.featureCard}`)
      .forEach((card) => observer.observe(card))
  }

  if (stepsRef.current) {
    stepsRef.current
      .querySelectorAll(`.${featureCompareStyles.stepCard}`)
      .forEach((card) => observer.observe(card))
  }

  return () => observer.disconnect()
}, [])

  return (
    <>
      <Head>
        <title>
          Anastasis — AI Photo Restoration for Old Family Photos | No Subscriptions
        </title>
        <meta
          name="description"
          content="Restore old family photos with AI in under 2 minutes. Perfect for wedding albums, genealogy projects & family reunions. No subscriptions - pay only for what you restore. Try 3 photos FREE."
        />
        <meta name="keywords" content="photo restoration, old photos, family photos, AI photo repair, vintage photo restoration, genealogy photos, no subscription photo app" />
        <meta property="og:title" content="Restore Old Family Photos with AI - No Subscriptions Required" />
        <meta property="og:description" content="Transform faded family photos into vibrant memories. Heritage-grade AI restoration in under 2 minutes. Try 3 photos FREE." />
        <link rel="preload" href="/images/transformation.mp4" as="video" type="video/mp4" />
      </Head>

     {/* Trust Badge Bar */}
        <div
          style={{
            background: 'linear-gradient(90deg, #1a1a1a 0%, #2d2d2d 100%)',
            color: 'white',
            padding: '8px 0',
            textAlign: 'center',
            top: 0,
            zIndex: 1000,
            fontFamily: 'Arial, sans-serif',
            fontSize: '14px',
            borderBottom: '1px solid #444',
          }}
        >
          <span style={{ marginRight: '16px' }}>🔒 <strong>Privacy Guaranteed</strong></span>
          <span style={{ marginRight: '16px' }}>⚡ <strong>Results in Under 2 Minutes</strong></span>
          <span>🆓 <strong>Try 3 Photos FREE</strong></span>
        </div>
        

      {/* Top Banner Section */}
<section className={styles.topBannerHero}>
  <div className={styles.topBannerContent}>
    <div className={styles.topBannerLeft}>
      {/* Updated messaging for clarity */}
      <p className={styles.bannerIntro}>
        Anastasis – AI-Powered Photo Restoration
      </p>
      <h1 className={styles.heading}>
        Bring Old Family Photos Back to Life
      </h1>
      <div className={styles.paragraph}>
    <div className={`${styles.featureLine} ${styles.free}`}>
  <strong>Photo Fix</strong> Instant AI repair, sharpening & dust removal (3 free tries)
</div>
<div className={`${styles.featureLine} ${styles.premium}`}>
  <strong>Photo Revival</strong> Full AI colorization + deep vintage magic (40 credits)
</div>

      </div>

      <div className={styles.ctaButtonContainer}>
        {/* Primary CTA */}
        <button
          className={styles.topBannerButton}
          onClick={() => handleNavigateToRestore("/replicate/restore-basic")}
        >
          🎁 Try Photo Fix: FREE (1 Credit)
        </button>

        {/* Secondary CTA */}
        <button
          className={styles.secondaryButton}
          onClick={() => handleNavigateToRestore("/replicate/restore-premium")}
        >
          🔮 Unlock Photo Revival (40 Credits)
        </button>

        {/* Sign-up incentive */}
        <p className={styles.subText}>
          Sign up now and get <strong>10 bonus credits</strong>—no subscription required!
        </p>
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
          preload="metadata"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
        />
        <noscript>
          <Image 
            src="/images/transformation-fallback.jpg" 
            alt="Before-and-after AI photo restoration demo"
            width={600}
            height={400}
            priority
          />
        </noscript>
      </div>
    </div>
  </div>
</section>


{/* AI Transformation Showcase */}
<section className={aiShowcaseStyles.aiShowcase}>
  <div className={aiShowcaseStyles.showcaseHeader}>
    <div className={aiShowcaseStyles.aiLabel}>AI POWERED</div>
    <h2 className={aiShowcaseStyles.showcaseTitle}>
      Witness the <span className={aiShowcaseStyles.titleGradient}>Neural Magic</span>
    </h2>
    <p className={aiShowcaseStyles.showcaseSubtitle}>
      Our heritage-trained AI doesn&apos;t just enhance—it resurrects lost memories with surgical precision
    </p>
  </div>

  <div className={aiShowcaseStyles.transformationGrid}>
    {[
      {
        before: "/images/before1.jpg",
        after: "/images/after1.jpg",
        year: "1952",
        category: "Wedding Portrait",
        aiFeatures: ["Colorization", "Detail Recovery", "Noise Reduction"]
      },
      {
        before: "/images/before2.jpg", 
        after: "/images/after2.jpg",
        year: "1938",
        category: "Family Photo",
        aiFeatures: ["Crack Repair", "Color Revival", "Texture Enhancement"]
      },
      {
        before: "/images/before3.jpg",
        after: "/images/after3.jpg", 
        year: "1945",
        category: "Military Portrait",
        aiFeatures: ["Fade Correction", "Uniform Colorization", "Face Enhancement"]
      }
    ].map((item, index) => (
      <div key={index} className={aiShowcaseStyles.transformationCard}>
        <div className={aiShowcaseStyles.imageContainer}>
          <div className={aiShowcaseStyles.beforeAfterWrapper}>
            <div className={aiShowcaseStyles.imageBox}>
              <img src={item.before} alt={`Before restoration - ${item.category}`} />
              <div className={aiShowcaseStyles.imageLabel}>BEFORE</div>
            </div>

            <div className={aiShowcaseStyles.arrowDivider}>
              <div className={aiShowcaseStyles.arrowLine}></div>
              <div className={aiShowcaseStyles.arrowTip}>→</div>
              <div className={aiShowcaseStyles.arrowLine}></div>
            </div>

            <div className={aiShowcaseStyles.imageBox}>
              <img src={item.after} alt={`After restoration - ${item.category}`} />
              <div className={aiShowcaseStyles.imageLabel}>AFTER</div>
            </div>
          </div>
        </div>

        <div className={aiShowcaseStyles.cardInfo}>
          <div className={aiShowcaseStyles.photoMeta}>
            <span className={aiShowcaseStyles.year}>{item.year}</span>
            <span className={aiShowcaseStyles.category}>{item.category}</span>
          </div>

          <div className={aiShowcaseStyles.aiFeatures}>
            {item.aiFeatures.map((feature, i) => (
              <span key={i} className={aiShowcaseStyles.featureTag}>
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>

  <div className={aiShowcaseStyles.showcaseStats}>
    <div className={aiShowcaseStyles.statItem}>
      <div className={aiShowcaseStyles.statNumber}>2.3M+</div>
      <div className={aiShowcaseStyles.statLabel}>Photos Restored</div>
    </div>
    <div className={aiShowcaseStyles.statItem}>
      <div className={aiShowcaseStyles.statNumber}>98.7%</div>
      <div className={aiShowcaseStyles.statLabel}>Success Rate</div>
    </div>
    <div className={aiShowcaseStyles.statItem}>
      <div className={aiShowcaseStyles.statNumber}>47s</div>
      <div className={aiShowcaseStyles.statLabel}>Avg Process Time</div>
    </div>
  </div>

  <button 
    className={aiShowcaseStyles.showcaseCTA}
    onClick={() => handleNavigateToRestore("/replicate/restore-premium")}
  >
    <span className={aiShowcaseStyles.ctaText}>Experience AI Magic</span>
    <div className={aiShowcaseStyles.ctaGlow}></div>
  </button>
</section>


{/* Restore Options Section */}
<section className={RestoreOptionsStyles.restoreOptions}>
  <h2>Choose Your Restoration Level</h2>
  
  {/* Improved intro banner */}


  <div className={RestoreOptionsStyles.restoreCardGrid}>
    
    {/* Photo Fix Card */}
    <div 
      className={RestoreOptionsStyles.restoreCard}
      onClick={() => handleNavigateToRestore("/replicate/restore-basic")}
      style={{ cursor: 'pointer' }}
    >
      <div className={`${RestoreOptionsStyles.tierLabel} ${RestoreOptionsStyles.free}`}>
        🎁 3 FREE TRIALS
      </div>
      
      <div className={RestoreOptionsStyles.imagePair}>
        <Image
          src="/images/before6.jpg"
          alt="Old grayscale photo before Photo Fix"
          width={500}
          height={500}
          className={RestoreOptionsStyles.pairedImage}
          loading="lazy"
        />
        <Image
          src="/images/basic-after6.jpg"
          alt="After Photo Fix restoration"
          width={500}
          height={500}
          className={RestoreOptionsStyles.pairedImage}
          loading="lazy"
        />
      </div>
      
      <h3 className={RestoreOptionsStyles.cardTitle}>
        🛠️ Photo Fix – Repair & Sharpen Damaged Images
      </h3>
      <div className={RestoreOptionsStyles.cardContent}>
        <p className={RestoreOptionsStyles.cardSubtitle}>
        Great for light restoration, fast results, and basic fixes.
      </p>
        <p className={`${RestoreOptionsStyles.timingLabel} ${RestoreOptionsStyles.free}`}>
          ⏰ Ready in 30–60 seconds
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click when button is clicked
            handleNavigateToRestore("/replicate/restore-basic");
          }}
          className={`${RestoreOptionsStyles.freeButton}`}
        >
          Start FREE Trial – No Credit Card
        </button>
      </div>
    </div>

    {/* Photo Revival Card */}
    <div 
      className={RestoreOptionsStyles.restoreCard}
      onClick={() => handleNavigateToRestore("/replicate/restore-premium")}
      style={{ cursor: 'pointer' }}
    >
      <div className={`${RestoreOptionsStyles.tierLabel} ${RestoreOptionsStyles.premium}`}>
        ✨ PREMIUM MAGIC
      </div>
      
      <div className={RestoreOptionsStyles.imagePair}>
        <Image
          src="/images/before6.jpg"
          alt="Old faded photo before Photo Revival"
          width={500}
          height={500}
          className={RestoreOptionsStyles.pairedImage}
          loading="lazy"
        />
        <Image
          src="/images/after6.jpg"
          alt="After Photo Revival restoration"
          width={500}
          height={500}
          className={RestoreOptionsStyles.pairedImage}
          loading="lazy"
        />
      </div>
      
      <h3 className={RestoreOptionsStyles.cardTitle}>
        ✨ Photo Revival – Full Color Restoration & Enhancement
      </h3>
      <div className={RestoreOptionsStyles.cardContent}>
       <p className={RestoreOptionsStyles.cardSubtitle}>
        Ideal for heirlooms, colorization, and premium-quality output.
      </p>
        <p className={`${RestoreOptionsStyles.timingLabel} ${RestoreOptionsStyles.premium}`}>
          ⏰ Ready in 1–2 minutes
        </p>
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click when button is clicked
            handleNavigateToRestore("/replicate/restore-premium");
          }}
          className={`${RestoreOptionsStyles.premiumButton}`}
        >
          See Full Color Transformation
        </button>
      </div>
    </div>
  </div>
</section>





     {/* "How It Works" Section */}
<section className={featureCompareStyles.container}>
  <div className={featureCompareStyles.titleWrapper}>
    <h2 className={featureCompareStyles.sectionTitle}>
      <span className={featureCompareStyles.titleGradient}>How</span>
      <span className={featureCompareStyles.titleAccent}>It Works</span>
    </h2>
    <div className={featureCompareStyles.titleUnderline} />
    <p className={featureCompareStyles.subtitle}>
      Seamless restoration powered by heritage-grade AI
    </p>
  </div>

  <div className={featureCompareStyles.featuresGrid}>
    {[
      {
        icon: '📤',
        title: 'Upload Your Photo',
        description:
          'Upload a scanned or digital photo — no signup required. For best results, use a high-resolution image.',
      },
      {
        icon: '🧠',
        title: 'AI Restoration',
        description:
          'Our specialized AI analyzes vintage details to sharpen, repair, and colorize with lifelike accuracy.',
      },
      {
        icon: '⚡',
        title: 'Fast Processing',
        description:
          'Your photo is restored in under 2 minutes, using optimized cloud infrastructure for speed and precision.',
      },
      {
        icon: '⬇️',
        title: 'Download & Share',
        description:
          'Save your restored photo in high resolution. All uploads auto-delete within 1 hour for complete privacy.',
      },
    ].map((step, index) => (
      <div key={index} className={featureCompareStyles.featureCard}>
        <div className={featureCompareStyles.featureStat}>{step.icon}</div>
        <div className={featureCompareStyles.featureLabel}>
          <strong>{step.title}</strong>
          <p style={{ marginTop: '0.5rem', fontSize: '0.95rem', lineHeight: '1.5' }}>{step.description}</p>
        </div>
      </div>
    ))}
  </div>
</section>



      {/* Image Compare Section */}
      <section className={imageCompare.imageCompareSection}>
        <h2 className={imageCompare.sectionTitle}>Photo Revival Demo</h2>
        <p style={{ textAlign: 'center', fontSize: '16px', color: '#666', marginBottom: '2rem' }}>
          <strong>See the magic in action:</strong> This black & white photo was fully colorized and enhanced in under 2 minutes
        </p>

        <div
          className={`${imageCompare.sliderWrapper} ${interacted ? 'interacted' : ''}`}
        >
          <p className={imageCompare.sliderHint}>
            Slide or press ←→ to reveal the restoration
          </p>

          <div
            className={imageCompare.sliderContainer}
            onMouseDown={handleInteraction}
            onTouchStart={handleInteraction}
          >
            <ImageCompareSlider
              ref={sliderRef}
              beforeImage="/images/premium-before.jpg"
              afterImage="/images/premium-after.jpg"
              handleClassName={imageCompare.sliderHandle}
              afterOverlayClassName={imageCompare.afterImageOverlay}
              ariaLabelBefore="Original photo"
              ariaLabelAfter="Restored photo"
            />
          </div>

          <p className={imageCompare.directions}>
            Use the slider or arrow keys to compare before & after.
          </p>
        </div>
      </section>


      {/* Honest, One-Time Pricing Section */}
<section className={pricingStyles.honestPricing}>
  <h2 className={pricingStyles.pricingHeading}>
    Transparent Pricing <span className={pricingStyles.vsAccent}>vs</span> Subscription Overkill
  </h2>
  <p className={pricingStyles.subtitle}>
    One-time credits. No subscriptions. No tricks. Use what you buy, whenever you want.
  </p>

  <div className={pricingStyles.mainPricingContainer}>
    {/* Anastasis Credit Packs */}
    <div className={pricingStyles.anastasisSection}>
      <div className={pricingStyles.packGrid}>
        {[
          {
            name: "Dawn Pack",
            price: "$4.99",
            credits: 400,
            revivals: 10,
            tag: "Starter"
          },
          {
            name: "Revival Pack",
            price: "$9.99",
            credits: 1000,
            revivals: 25,
            popular: true,
            tag: "Most Popular"
          },
          {
            name: "Resurgence Pack",
            price: "$14.99",
            credits: 1600,
            revivals: 40,
            tag: "Best Value"
          },
          {
            name: "Eternal Pack",
            price: "$29.99",
            credits: 3500,
            revivals: 87,
            tag: "For Families"
          },
        ].map((pack, i) => (
          <div key={i} className={pricingStyles.anastasisCard} style={{
            border: pack.popular ? '3px solid #FF4EC8' : undefined,
            position: 'relative'
          }}>
            {pack.popular && (
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#FF4EC8',
                color: '#fff',
                padding: '5px 14px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold',
                letterSpacing: '0.5px'
              }}>
                🔥 {pack.tag}
              </div>
            )}
            <h3>{pack.name}</h3>
            <div className={pricingStyles.priceDisplay}>
              <span className={pricingStyles.currency}>$</span>
              <span className={pricingStyles.amount}>{pack.price.slice(1)}</span>
              <span className={pricingStyles.perUnit}>• {pack.credits} credits</span>
            </div>
            <p className={pricingStyles.revivalsInfo}>
              Includes <strong>{pack.revivals}</strong> Premium Restorations
            </p>
            <div style={{
              fontSize: '13px',
              color: '#27ae60',
              fontWeight: 'bold',
              marginTop: '0.5rem'
            }}>
              💰 ~${(parseFloat(pack.price.slice(1)) / pack.revivals).toFixed(2)} per photo
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <button
          className={pricingStyles.buyBtn}
          onClick={() => router.push("/pricing")}
          style={{
            background: 'linear-gradient(135deg, #FF4EC8 0%, #4ECDF7 100%)',
            fontSize: '22px',
            fontWeight: 'bold',
            fontFamily: 'var(--font-brand)',
            padding: '12px 24px',
            borderRadius: '12px',
            color: '#fff',
            boxShadow: '0 0 12px rgba(255, 78, 200, 0.5)'
          }}
        >
          Buy Credits Instantly
        </button>
      </div>
    </div>

    {/* Competitor Comparison */}
    <div className={pricingStyles.competitorSection}>
      <div className={pricingStyles.competitorCard} style={{ border: '2px solid #FF4EC8' }}>
        <h3>Other Apps</h3>
        <div className={pricingStyles.priceDisplay}>
          <span className={pricingStyles.currency}>$</span>
          <span className={pricingStyles.amount}>9.99</span>
          <span className={pricingStyles.perUnit}>per month</span>
        </div>
        <p className={pricingStyles.priceNote}>$120/year whether you use it or not</p>
        <ul className={pricingStyles.featureList}>
          <li>❌ Recurring charges</li>
          <li>❌ Unused credits wasted</li>
          <li>❌ Account required to preview</li>
        </ul>
      </div>
    </div>
  </div>
</section>






{/* Customer Success Stories */}
<section className={featureStyles.successStoriesSection}>
  <h2 className={featureStyles.successHeading}>Customer Success Stories</h2>
  <p style={{ textAlign: 'center', fontSize: '16px', color: '#666', marginBottom: '3rem' }}>
    See why families trust Anastasis with their most precious memories
  </p>
  
  <div className={featureStyles.successGrid}>
    {[
      {
        before: "/images/before4.jpg",
        after: "/images/after4.jpg",
        story: "Restored my grandmother's 1943 wedding photo for our family reunion. Everyone was in tears!",
        author: "Sarah M.",
        occasion: "Family Reunion"
      },
      {
        before: "/images/before5.jpg", 
        after: "/images/after5.jpg",
        story: "These 70-year-old baby photos of my father now hang beautifully in our living room.",
        author: "Marcus T.",
        occasion: "Father's Day Gift"
      },
      {
        before: "/images/before6.jpg",
        after: "/images/after6.jpg", 
        story: "Perfect for our genealogy project. The colorization brought our ancestors to life.",
        author: "Linda K.",
        occasion: "Genealogy Research"
      }
    ].map((item, index) => (
      <div key={index} className={featureStyles.successCard}>
        <div className={featureStyles.successImages}>
          <Image 
            src={item.before} 
            alt="Before restoration" 
            width={150} 
            height={200} 
            className={featureStyles.successBefore}
            loading="lazy" 
          />
          <div className={featureStyles.successArrow}>→</div>
          <Image 
            src={item.after} 
            alt="After restoration" 
            width={150} 
            height={200} 
            className={featureStyles.successAfter}
            loading="lazy" 
          />
        </div>
        <div className={featureStyles.successStory}>
          <blockquote>&ldquo;{item.story}&rdquo;</blockquote>
          <cite>— {item.author}</cite>
          <span className={featureStyles.occasion}>{item.occasion}</span>
        </div>
      </div>
    ))}
  </div>
</section>

{/* Hero Section */}
<section className={heroStyles.hero}>
  <div className={heroStyles.heroText}>
    <h1>Your grandmother&apos;s wedding photo deserves more than a generic filter.</h1>
  </div>
  
  <button
    className={heroStyles.heroCTAButton}
    onClick={() => handleNavigateToRestore("/replicate/restore-premium")}
  >
    See Your History in Full Color
  </button>
  
  {/* New subtitle line */}
  <p style={{ 
    fontSize: '1rem', 
    fontWeight: '600', 
    marginTop: '0.75rem', 
    marginBottom: '0.5rem', 
    color: '#666', 
    textAlign: 'center' 
  }}>
    Perfect for Wedding Albums &bull; Genealogy Projects &bull; Family Reunions
  </p>
  
  <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>⏰ Results ready in under 2 minutes</span>
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
     <button
      className={migrationStyles.offerButton}
      onClick={() => router.push("/pricing")}
    >
      View Pricing
    </button>
</section>




      {/* FAQ Section */}
      <section className={faqStyles.faqSection}>
        <h2>Frequently Asked Questions</h2>
        {faqData.map(({ q, a }, i) => (
          <FAQItem key={i} question={q} answer={a} />
        ))}
      </section>
    </>
  );
}