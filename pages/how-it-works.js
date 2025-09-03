import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import styles from '../styles/HowItWorksNew.module.css'

const FEATURES = [
  {
    icon: '🔧',
    title: 'Photo Enhancement',
    description: 'Sharpen blurry photos, improve brightness and restore old memories.',
    cost: '1 credit',
    path: '/replicate/restore-basic'
  },
  {
    icon: '🎨',
    title: 'Photo Colorization',
    description: 'Transform black and white photos into vibrant, full-color images.',
    cost: '40 credits',
    path: '/replicate/restore-premium'
  },
  {
    icon: '📚',
    title: '90s Yearbook Transform',
    description: 'Turn your photo into an authentic 90s yearbook portrait with retro styling.',
    cost: '20 credits',
    path: '/replicate/yearbook'
  },
  {
    icon: '🎭',
    title: 'AI Avatar Generator',
    description: 'Create custom AI avatars in various artistic styles and themes.',
    cost: '50 credits',
    path: '/replicate/avatar'
  },
  {
    icon: '🎪',
    title: 'Cartoon Portrait',
    description: 'Transform yourself into a classic cartoon character.',
    cost: '40 credits',
    path: '/replicate/cartoon'
  }
];

const STEPS = [
  {
    number: '01',
    title: 'Upload Your Photo',
    description: 'Choose a clear, high-quality image from your device for the best results.'
  },
  {
    number: '02', 
    title: 'Select Your Style',
    description: 'Pick from photo enhancement, colorization, yearbook, avatars, or cartoon styles.'
  },
  {
    number: '03',
    title: 'Generate & Download',
    description: 'Our AI processes your image in seconds. Download your transformed photo instantly.'
  }
];

function FeatureCard({ feature }) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>{feature.icon}</div>
      <h3 className={styles.featureTitle}>{feature.title}</h3>
      <p className={styles.featureDescription}>{feature.description}</p>
      <div className={styles.featureCost}>{feature.cost}</div>
      <Link href={feature.path} className={styles.tryButton}>
        Try Now
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
          content="Learn how to transform your photos with Throwback AI. Photo enhancement, colorization, 90s yearbook styles, AI avatars, and cartoon portraits - all powered by AI."
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content="How It Works | Throwback AI" />
        <meta property="og:description" content="Transform your photos with AI-powered enhancement, colorization, 90s yearbook styles, avatars, and cartoon portraits." />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How It Works | Throwback AI" />
        <meta name="twitter:description" content="Transform your photos with AI-powered enhancement, colorization, 90s yearbook styles, avatars, and cartoon portraits." />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      <main className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1 className={styles.title}>How It Works</h1>
          <p className={styles.subtitle}>
            Transform your photos with AI-powered tools. From restoration to creative transformations.
          </p>
        </section>

        {/* Steps Section */}
        <section className={styles.stepsSection}>
          <h2 className={styles.sectionTitle}>Three Simple Steps</h2>
          <div className={styles.stepsGrid}>
            {STEPS.map((step) => (
              <StepCard key={step.number} step={step} />
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.featuresSection}>
          <h2 className={styles.sectionTitle}>Choose Your Transformation</h2>
          <div className={styles.featuresGrid}>
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </section>

        {/* Credits Section */}
        <section className={styles.creditsSection}>
          <div className={styles.creditsCard}>
            <h2 className={styles.creditsTitle}>Credits System</h2>
            <div className={styles.creditsInfo}>
              <div className={styles.creditsBenefit}>
                <span className={styles.benefitIcon}>✨</span>
                <span>1 free credit to start</span>
              </div>
              <div className={styles.creditsBenefit}>
                <span className={styles.benefitIcon}>🎁</span>
                <span>5 bonus credits when you sign up</span>
              </div>
              <div className={styles.creditsBenefit}>
                <span className={styles.benefitIcon}>⏰</span>
                <span>Credits never expire</span>
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
              <p>Your photos are processed securely and deleted automatically after processing.</p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>⚡</div>
              <h3>Lightning Fast</h3>
              <p>Most transformations complete in under 60 seconds with our advanced AI.</p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📱</div>
              <h3>Works Everywhere</h3>
              <p>Use on any device - desktop, tablet, or mobile. No downloads required.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}