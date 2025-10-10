import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import styles from '../styles/HowItWorksNew.module.css'

const FEATURES = [
  {
    icon: '🎨',
    title: 'Colorize B&W Photos',
    description: 'Add historically accurate, vibrant colors to black and white family photos!',
    cost: '40 credits',
    path: '/replicate/restore-premium',
    badge: 'Most Popular'
  },
  {
    icon: '🔧',
    title: 'Photo Restoration',
    description: 'Repair scratches, tears, water damage, and fading from irreplaceable family photos.',
    cost: '1 credit',
    path: '/replicate/restore-premium',
    badge: 'Try Free'
  },
  {
    icon: '🎪',
    title: 'Cartoon Portrait',
    description: 'Transform yourself into a classic cartoon character with vibrant animated styling.',
    cost: '40 credits',
    path: '/replicate/cartoon'
  },
  {
    icon: '📺',
    title: '70s Groovy Style',
    description: 'Transform into authentic 70s yearbook photos with hippie, disco, and glam rock vibes.',
    cost: '50 credits',
    path: '/replicate/70s'
  },
  {
    icon: '📼',
    title: '80s Neon Style',
    description: 'Get totally radical with new wave, synthpop, and neon-bright 80s aesthetics.',
    cost: '50 credits',
    path: '/replicate/80s'
  },
  {
    icon: '💿',
    title: '90s Grunge Style',
    description: 'Create alternative, grunge, and 90s pop culture vibes for your photos.',
    cost: '50 credits',
    path: '/replicate/90s'
  },
  {
    icon: '📱',
    title: '2000s Y2K Style',
    description: 'Transform into emo, scene, pop punk, and digital era Y2K aesthetics.',
    cost: '50 credits',
    path: '/replicate/2000s'
  }
];

const STEPS = [
  {
    number: '01',
    title: 'Upload Your Photo',
    description: 'Choose a clear, high-quality image from your device. For best results, use well-lit photos where faces are clearly visible.'
  },
  {
    number: '02', 
    title: 'Select Your Style',
    description: 'Pick from photo restoration, colorization, or time travel through the decades with authentic period styling.'
  },
  {
    number: '03',
    title: 'AI Magic Happens',
    description: 'Our advanced AI processes your image, adding colors, fixing damage, or applying decade-specific transformations.'
  },
  {
    number: '04',
    title: 'Download & Share',
    description: 'Get your transformed photo in seconds. Perfect for social media, family memories, or just having fun!'
  }
];

function FeatureCard({ feature }) {
  return (
    <div className={styles.featureCard}>
      {feature.badge && (
        <div className={`${styles.featureBadge} ${feature.badge === 'Try Free' ? styles.freeBadge : styles.popularBadge}`}>
          {feature.badge}
        </div>
      )}
      <div className={styles.featureIcon}>{feature.icon}</div>
      <h3 className={styles.featureTitle}>{feature.title}</h3>
      <p className={styles.featureDescription}>{feature.description}</p>
      <div className={styles.featureCost}>{feature.cost}</div>
      <Link href={feature.path} className={styles.tryButton}>
        {feature.cost === '1 credit' ? 'Try Free' : 'Try Now'}
      </Link>
    </div>
  );
}

function StepCard({ step }) {
  return (
    <div className={styles.stepCard}>
      <div className={styles.stepNumber}>{step.number}</div>
      <div className={styles.stepContent}>
        <h3 className={styles.stepTitle}>{step.title}</h3>
        <p className={styles.stepDescription}>{step.description}</p>
      </div>
    </div>
  );
}

export default function HowItWorksPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const getCtaLink = () => {
    if (loading) return "/signup"
    return user ? "/pricing" : "/signup"
  }

  const getCtaText = () => {
    if (loading) return "Get Started"
    return user ? "Choose Credits" : "Start Free"
  }

  // SEO setup
  const siteUrl = 'https://throwbackai.app';
  const pagePath = '/how-it-works';
  const pageUrl = `${siteUrl}${pagePath}`;
  const ogImage = `${siteUrl}/images/throwback-ai.jpg`;

  return (
    <>
      <Head>
        <title>How It Works | Throwback AI</title>
        <meta
          name="description"
          content="Learn how to restore old photos and transform them with decade styling. Photo restoration, colorization, and time travel through 70s, 80s, 90s, and 2000s styles."
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content="How It Works | Throwback AI" />
        <meta property="og:description" content="Restore old photos and transform them with authentic decade styling from the 70s to 2000s." />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How It Works | Throwback AI" />
        <meta name="twitter:description" content="Restore old photos and transform them with authentic decade styling from the 70s to 2000s." />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      <main className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1 className={styles.title}>How It Works</h1>
          <p className={styles.subtitle}>
            Restore damaged family photos and time travel through the decades with AI-powered transformations.
          </p>
        </section>

        {/* Steps Section */}
        <section className={styles.stepsSection}>
          <h2 className={styles.sectionTitle}>Four Simple Steps</h2>
          <div className={styles.stepsGrid}>
            {STEPS.map((step) => (
              <StepCard key={step.number} step={step} />
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.featuresSection}>
          <h2 className={styles.sectionTitle}>Choose Your Transformation</h2>
          <p className={styles.sectionSubtitle}>
            From restoring precious family memories to creating viral social media content
          </p>
          <div className={styles.featuresGrid}>
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </section>

        {/* Use Cases Section - NEW */}
        <section className={styles.useCasesSection}>
          <h2 className={styles.sectionTitle}>Perfect For</h2>
          <div className={styles.useCasesGrid}>
            <div className={styles.useCaseCard}>
              <div className={styles.useCaseIcon}>👨‍👩‍👧‍👦</div>
              <h3>Family Memories</h3>
              <p>Restore old family photos and preserve precious memories for future generations.</p>
            </div>
            <div className={styles.useCaseCard}>
              <div className={styles.useCaseIcon}>📱</div>
              <h3>Social Media Content</h3>
              <p>Create viral TikTok and Instagram content with authentic decade transformations.</p>
            </div>
            <div className={styles.useCaseCard}>
              <div className={styles.useCaseIcon}>🎁</div>
              <h3>Unique Gifts</h3>
              <p>Surprise family and friends with restored or decade-styled versions of their photos.</p>
            </div>
            <div className={styles.useCaseCard}>
              <div className={styles.useCaseIcon}>🎨</div>
              <h3>Creative Projects</h3>
              <p>Add authentic period styling to artwork, presentations, or creative endeavors.</p>
            </div>
          </div>
        </section>

        {/* Credits Section */}
        <section className={styles.creditsSection}>
          <div className={styles.creditsCard}>
            <h2 className={styles.creditsTitle}>Credits System</h2>
            <div className={styles.creditsInfo}>
              <div className={styles.creditsBenefit}>
                <span className={styles.benefitIcon}>🆓</span>
                <span>Try photo restoration for free (1 credit)</span>
              </div>
              <div className={styles.creditsBenefit}>
                <span className={styles.benefitIcon}>🎁</span>
                <span>Get 50 free credits when you sign up</span>
              </div>
              <div className={styles.creditsBenefit}>
                <span className={styles.benefitIcon}>⏰</span>
                <span>Credits never expire - use them anytime</span>
              </div>
              <div className={styles.creditsBenefit}>
                <span className={styles.benefitIcon}>💰</span>
                <span>Affordable pricing - from $0.50 per transformation</span>
              </div>
            </div>
            <Link href={getCtaLink()} className={styles.ctaButton}>
              {getCtaText()}
            </Link>
          </div>
        </section>

        {/* Info Grid */}
        <section className={styles.infoSection}>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🔒</div>
              <h3>Secure & Private</h3>
              <p>Your photos are processed securely and automatically deleted after processing. We never store your images.</p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>⚡</div>
              <h3>Lightning Fast</h3>
              <p>Most transformations complete in under 60 seconds with our state-of-the-art AI technology.</p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📱</div>
              <h3>Works Everywhere</h3>
              <p>Use on any device - desktop, tablet, or mobile. No downloads or installations required.</p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🎯</div>
              <h3>High Quality Results</h3>
              <p>Professional-grade AI models trained specifically for photo restoration and decade styling.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section - NEW */}
        <section className={styles.faqSection}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h3>What image formats do you support?</h3>
              <p>We support JPG, PNG, HEIC, and WebP formats up to 10MB in size.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>How long does processing take?</h3>
              <p>Most photos are processed in 30-60 seconds, depending on complexity and current server load.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>Can I use the photos commercially?</h3>
              <p>Yes! You own the rights to your transformed photos and can use them however you&apos;d like.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>What if I&apos;m not satisfied with the result?</h3>
              <p>We offer refunds for failed generations. If the AI can&apos;t process your image, your credits are automatically refunded.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}