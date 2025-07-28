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
import testimonialStyles from "../styles/TestimonialsBadges.module.css"
import faqStyles from "../styles/FAQSection.module.css"
import infoCardStyles from "../styles/InfoCardsSection.module.css"
import infoStyles from "../styles/InfoSection.module.css"
import migrationStyles from "../styles/MigrationSection.module.css"
import styles from "../styles/TopBanner.module.css"
import imageCompare from "../styles/ImageCompare.module.css"

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

const testimonials = [
   {
    quote:
      "I surprised my parents on their 50th wedding anniversary by colorizing their black-and-white wedding photos. They were in tears when they saw themselves in color for the very first time.",
    author: "Michael T., Celebrating 50 Years"
    },
    {
      quote:
        "My daughter's first birthday pictures from the early '90s have never looked so vibrant. Anastasis works like pure magic—no more faded prints!",
      author: "Samantha B., Proud Mom"
    },
    {
      quote:
        "As an event photographer, I've used countless tools, but Anastasis gave me flawless, museum-quality restorations of old Polaroids and negatives.",
      author: "Jessica L., Photojournalist"
    },
    {
      quote:
        "I finally restored my grandparents' 1940s army portraits—and the colorization made their stories leap off the page. My family can't stop talking about it.",
      author: "Ethan C., History Buff"
    },
    {
      quote:
        "After trying every app on the market, Anastasis delivered crystal-clear, lifelike restorations. These century-old heirlooms look brand new.",
      author: "Olivia R., Family Archivist"
    },
    {
      quote:
        "My wife and I turned our black-and-white honeymoon snaps into living color. It felt like reliving our trip all over again—complete with sandy beaches and sunsets.",
      author: "David & Anna, Newlyweds"
    },
    {
      quote:
        "No confusing subscriptions, just a one-time fee and endless restored memories. Anastasis is the gift that keeps on giving.",
      author: "Lily M., Memory Keeper"
    }
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
    featuresRef.current
      .querySelectorAll(`.${featureCompareStyles.featureCard}`)
      .forEach((card) => observer.observe(card))
    stepsRef.current
      .querySelectorAll(`.${featureCompareStyles.stepCard}`)
      .forEach((card) => observer.observe(card))

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
      <div style={{ 
        background: 'linear-gradient(90deg, #1a1a1a 0%, #2d2d2d 100%)', 
        color: 'white', 
        padding: '8px 0', 
        textAlign: 'center', 
        fontSize: '14px',
        borderBottom: '1px solid #444'
      }}>
        ✅ <strong>1M+ Photos Restored</strong> • 🔒 <strong>Privacy Guaranteed</strong> • ⚡ <strong>Results in Under 2 Minutes</strong> • 🆓 <strong>Try 3 Photos FREE</strong>
      </div>

      {/* Top Banner Section */}
      <section className={styles.topBannerHero}>
        <div className={styles.topBannerContent}>
          <div className={styles.topBannerLeft}>
            {/* Updated messaging for clarity */}
            <p className={styles.bannerIntro}>Transform Old Family Photos with AI</p>
            <h1 className={styles.heading}>
              Restore Faded Family Photos to Life
              <span style={{ display: 'block', fontSize: '0.7em', fontWeight: 'normal', color: '#666', marginTop: '0.5rem' }}>
                Perfect for Wedding Albums • Genealogy Projects • Family Reunions
              </span>
            </h1>
            <p className={styles.paragraph}>
              <div className={styles.paragraph}>
              <div className={styles.featureLine}>
                <strong>Photo Fix:</strong> Crystal-clear repairs and sharpening (3 FREE trials).
              </div>
              <div className={styles.featureLine}>
                <strong>Photo Revival:</strong> Full colorization with stunning vintage restoration magic.
              </div>
            </div>
            </p>
            <div className={styles.ctaButtonContainer}>
              {/* Made free trial more prominent */}
              <button
                className={styles.topBannerButton}
                onClick={() => handleNavigateToRestore("/replicate/restore-basic")}
                
              >
                🎁 Try 3 Photos FREE - No Signup Required
              </button>
              <button
                className={styles.secondaryButton}
                onClick={() => handleNavigateToRestore("/replicate/restore-premium")}
              >
                See Full Colorization Magic
              </button>
            </div>
            {/* Added urgency element */}
            <div style={{ 
              marginTop: '1rem', 
              padding: '10px', 
              background: 'rgba(231, 76, 60, 0.1)', 
              borderLeft: '4px solid #e74c3c',
              fontSize: '14px'
            }}>
              <strong>🔥 Limited Time:</strong> 3 FREE Photo Fix restorations for new users. No credit card required.
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
              {/* Added fallback image for slow connections */}
              <noscript>
                <Image 
                  src="/images/transformation-fallback.jpg" 
                  alt="Photo restoration transformation"
                  width={600}
                  height={400}
                  priority
                />
              </noscript>
            </div>
          </div>
        </div>
      </section>

      {/* Restore Options + Before/After */}
      <section className={RestoreOptionsStyles.restoreOptions}>
        <h2>Choose Your Restoration Level</h2>
        {/* Added clearer distinction */}
        <div style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '16px', color: '#666' }}>
          <strong>New users get 3 FREE Photo Fix restorations</strong> • Upgrade anytime for full colorization
        </div>
        <div className={RestoreOptionsStyles.restoreCardGrid}>
          {/* Photo Fix */}
          <div className={RestoreOptionsStyles.restoreCard}>
            <div style={{ 
              background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 'bold',
              display: 'inline-block',
              marginBottom: '1rem'
            }}>
              🎁 3 FREE TRIALS
            </div>
            <h3>🛠️ Photo Fix</h3>
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
            <div className={RestoreOptionsStyles.cardContent}>
              <p>
                <strong>Perfect for:</strong> Sharpening blurry photos, removing scratches, fixing damaged areas
                <br />
                <span style={{ color: '#27ae60', fontWeight: 'bold' }}>⏰ Ready in 30-60 seconds</span>
              </p>
              <button
                onClick={() => handleNavigateToRestore("/replicate/restore-basic")}
                style={{ 
                  background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                Start FREE Trial - No Credit Card
              </button>
            </div>
          </div>

          {/* Photo Revival */}
          <div className={RestoreOptionsStyles.restoreCard}>
            <div style={{ 
              background: 'linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 'bold',
              display: 'inline-block',
              marginBottom: '1rem'
            }}>
              ✨ PREMIUM MAGIC
            </div>
            <h3>✨ Photo Revival</h3>
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
            <div className={RestoreOptionsStyles.cardContent}>
              <p>
                <strong>Perfect for:</strong> Full colorization, vintage enhancement, museum-quality restoration
                <br />
                <span style={{ color: '#8e44ad', fontWeight: 'bold' }}>⏰ Ready in 1-2 minutes</span>
              </p>
              <button
                onClick={() => handleNavigateToRestore("/replicate/restore-premium")}
              >
                See Full Color Transformation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* "See the Restoration Impact" Section */}
      <section className={featureCompareStyles.container}>
        <div className={featureCompareStyles.titleWrapper}>
          <h2 className={featureCompareStyles.sectionTitle}>
            <span className={featureCompareStyles.titleGradient}>
              See the Restoration
            </span>
            <span className={featureCompareStyles.titleAccent}>
              Impact
            </span>
          </h2>
          <div className={featureCompareStyles.titleUnderline} />
          <p className={featureCompareStyles.subtitle}>
            Trusted by families worldwide for preserving precious memories
          </p>
        </div>

        <div
          className={featureCompareStyles.featuresGrid}
          ref={featuresRef}
        >
          {[
            { stat: "1M+", label: "Photos restored worldwide" },
            { stat: "99%", label: "Authenticity retained" },
            { stat: "60+", label: "Countries served" },
            { stat: "4.9★", label: "Average customer rating" }
          ].map((item, i) => (
            <div
              key={i}
              className={featureCompareStyles.featureCard}
            >
              <div className={featureCompareStyles.featureStat}>
                {item.stat}
              </div>
              <div className={featureCompareStyles.featureLabel}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <div
          className={featureCompareStyles.processStepsGrid}
          ref={stepsRef}
        >
          <div
            className={`${featureCompareStyles.stepCard} ${featureCompareStyles.stepUpload}`}
          >
            <h3>📤 Upload</h3>
            <p>
              Upload your scanned or digital photo — no login needed. Higher-resolution images give the best results.
              <br />
              <strong>Tip:</strong> Use your phone camera for quick scanning!
            </p>
          </div>
          <div
            className={`${featureCompareStyles.stepCard} ${featureCompareStyles.stepProcess}`}
          >
            <h3>⚙️ AI Processing</h3>
            <p>
              Our heritage-trained AI analyzes vintage photography techniques to sharpen faces, fix damage, and restore authentic colors.
              <br />
              <strong>Speed:</strong> Most restorations complete in under 2 minutes.
            </p>
          </div>
          <div
            className={`${featureCompareStyles.stepCard} ${featureCompareStyles.stepDownload}`}
          >
            <h3>🔒 Download & Done</h3>
            <p>
              Download your restored photo in high resolution. We auto-delete all uploads within 1 hour for complete privacy.
              <br />
              <strong>Format:</strong> High-quality JPG ready for printing or sharing.
            </p>
          </div>
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

      {/* Scrollable Gallery Section */}
      <section className={featureStyles.gallerySection}>
        <h2 className={featureStyles.galleryHeading}>Before & After Gallery</h2>
        <p style={{ textAlign: 'center', fontSize: '16px', color: '#666', marginBottom: '2rem' }}>
          Real customer photos restored with Anastasis AI
        </p>
        <div className={featureStyles.galleryScroll}>
          <div className={featureStyles.galleryCard}>
            <div className={featureStyles.galleryImageWrapper}>
              <Image src="/images/before1.jpg" alt="Before restoration" width={300} height={450} loading="lazy" />
            </div>
            <div className={featureStyles.galleryImageWrapper}>
              <Image src="/images/after1.jpg" alt="After restoration" width={300} height={450} loading="lazy" />
            </div>
          </div>

          <div className={featureStyles.galleryCard}>
            <div className={featureStyles.galleryImageWrapper}>
              <Image src="/images/before2.jpg" alt="Before restoration" width={300} height={450} loading="lazy" />
            </div>
            <div className={featureStyles.galleryImageWrapper}>
              <Image src="/images/after2.jpg" alt="After restoration" width={300} height={450} loading="lazy" />
            </div>
          </div>

          <div className={featureStyles.galleryCard}>
            <div className={featureStyles.galleryImageWrapper}>
              <Image src="/images/before3.jpg" alt="Before restoration" width={300} height={450} loading="lazy" />
            </div>
            <div className={featureStyles.galleryImageWrapper}>
              <Image src="/images/after3.jpg" alt="After restoration" width={300} height={450} loading="lazy" />
            </div>
          </div>
          <div className={featureStyles.galleryCard}>
            <div className={featureStyles.galleryImageWrapper}>
              <Image src="/images/before4.jpg" alt="Before restoration" width={300} height={450} loading="lazy" />
            </div>
            <div className={featureStyles.galleryImageWrapper}>
              <Image src="/images/after4.jpg" alt="After restoration" width={300} height={450} loading="lazy" />
            </div>
          </div>
           <div className={featureStyles.galleryCard}>
            <div className={featureStyles.galleryImageWrapper}>
              <Image src="/images/before5.jpg" alt="Before restoration" width={300} height={450} loading="lazy" />
            </div>
            <div className={featureStyles.galleryImageWrapper}>
              <Image src="/images/after5.jpg" alt="After restoration" width={300} height={450} loading="lazy" />
            </div>
          </div>
           <div className={featureStyles.galleryCard}>
            <div className={featureStyles.galleryImageWrapper}>
              <Image src="/images/before6.jpg" alt="Before restoration" width={300} height={450} loading="lazy" />
            </div>
            <div className={featureStyles.galleryImageWrapper}>
              <Image src="/images/after6.jpg" alt="After restoration" width={300} height={450} loading="lazy" />
            </div>
          </div>
          {/* Add more cards as needed */}
        </div>
      </section>

      {/* Pricing & Privacy Section */}
      <section className={pricingStyles.honestPricing}>
        <h2 className={pricingStyles.pricingHeading}>
          Fair Pricing <span className={pricingStyles.vsAccent}>vs</span> Subscription Traps
        </h2>
        <p className={pricingStyles.subtitle}>
          Buy credits once, use them whenever you need. No recurring charges, no auto-renewals, no surprises.
        </p>
        
        {/* Added value proposition */}
        <div style={{ 
          background: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
          color: 'white',
          padding: '1rem',
          borderRadius: '10px',
          textAlign: 'center',
          margin: '2rem 0',
          fontSize: '16px'
        }}>
          <strong>💡 Smart Choice:</strong> Our customers save an average of $84/year compared to subscription apps
        </div>
        
        {/* Main Layout Container */}
        <div className={pricingStyles.mainPricingContainer}>
          {/* Left Side: Anastasis Packs in 2x2 Layout */}
          <div className={pricingStyles.anastasisSection}>

            {/* New button ABOVE the pack grid */}
            <div style={{ textAlign: "center", marginBottom: ".3rem" }}>
              <button
                className={pricingStyles.buyBtn}
                onClick={() => router.push("/pricing")}
                style={{
                  background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  padding: '12px 24px'
                }}
              >
                🛒 See All Pricing Options & Buy Credits
              </button>
            </div>

            <div className={pricingStyles.packGrid}>
              {[
                {
                  name: "Dawn Pack",
                  price: "$4.99",
                  credits: 400,
                  revivals: 10,
                  useCase: "Perfect for testing our premium features or restoring your most treasured family portraits.",
                  popular: false
                },
                {
                  name: "Revival Pack",
                  price: "$9.99",
                  credits: 1000,
                  revivals: 25,
                  useCase: "Most popular for vacation albums, wedding photos, or creating themed family galleries.",
                  popular: true
                },
                {
                  name: "Resurgence Pack",
                  price: "$14.99",
                  credits: 1600,
                  revivals: 40,
                  useCase: "Great for family reunions, milestone celebrations, or preserving generational memories.",
                  popular: false
                },
                {
                  name: "Eternal Pack",
                  price: "$29.99",
                  credits: 3500,
                  revivals: 87,
                  useCase: "Best value for genealogy projects, heritage books, or comprehensive family archives.",
                  popular: false
                },
              ].map((pack, i) => (
                <div key={i} className={pricingStyles.anastasisCard} style={{
                  border: pack.popular ? '3px solid #e74c3c' : undefined,
                  position: 'relative'
                }}>
                  {pack.popular && (
                    <div style={{
                      position: 'absolute',
                      top: '-10px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#e74c3c',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '15px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      🔥 MOST POPULAR
                    </div>
                  )}
                  <h3>{pack.name}</h3>
                  <div className={pricingStyles.priceDisplay}>
                    <span className={pricingStyles.currency}>{pack.price.slice(0, 1)}</span>
                    <span className={pricingStyles.amount}>{pack.price.slice(1)}</span>
                    <span className={pricingStyles.perUnit}>• {pack.credits} credits</span>
                  </div>
                  <p className={pricingStyles.subtitle}>{pack.useCase}</p>
                  <p className={pricingStyles.revivalsInfo}>Premium Revivals: <strong>{pack.revivals}</strong></p>
                  <div style={{ fontSize: '12px', color: '#27ae60', fontWeight: 'bold', marginTop: '0.5rem' }}>
                    💰 Only ${(parseFloat(pack.price.slice(1)) / pack.revivals).toFixed(2)} per restoration
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Competitor Card */}
          <div className={pricingStyles.competitorSection}>
            <div className={pricingStyles.competitorCard} style={{ border: '2px solid #e74c3c' }}>
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
    </div>
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


      {/* Testimonials Section */}
      <section className={testimonialStyles.testimonials}>
        <h2>Bringing Memories to Life: Real Stories</h2>
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