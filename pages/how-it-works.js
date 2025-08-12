// pages/how-it-works.js
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient' // Adjust path as needed
import styles from '../styles/HowItWorksPage.module.css'

const OPTIONS = [
  {
    icon: '📷',
    title: 'Photo Fix',
    description: 'Makes old or blurry photos clearer by sharpening details and improving brightness and contrast.',
    tip: 'Great for faded or low-quality pictures that need a refresh.',
    cost: '1 credit',
  },
  {
    icon: '🎨',
    title: 'Full Color Restore',
    description: 'Adds realistic color to black-and-white photos and also improves sharpness and detail.',
    tip: 'Perfect for black-and-white photos you want to see in full color.',
    cost: '40 credits',
  },
]

const CREDIT_PACKS = [
  {
    name: "Dawn Pack",
    price: "$4.99",
    credits: "400",
    photoFixes: "400",
    colorRestores: "10",
    description: "Perfect for trying out Anastasis magic — restore a few cherished memories."
  },
  {
    name: "Revival Pack", 
    price: "$9.99",
    credits: "1,000", 
    photoFixes: "1,000",
    colorRestores: "25",
    description: "A solid bundle for breathing new life into vintage family shots."
  },
  {
    name: "Resurgence Pack",
    price: "$14.99",
    credits: "1,600",
    photoFixes: "1,600",
    colorRestores: "40",
    description: "A popular pick for curating full-family albums and restoring event photos."
  },
  {
    name: "Eternal Pack",
    price: "$29.99", 
    credits: "3,500",
    photoFixes: "3,500",
    colorRestores: "87",
    description: "Built for legacy-level restoration — preserve history at scale."
  }
];

const STEPS = [
  {
    step: 1,
    title: "Choose a photo",
    description: "from your computer or phone that you want to improve."
  },
  {
    step: 2,
    title: "Select a service:",
    description: "Use Photo Fix to sharpen and brighten, or Full Color Restore to add color.",
    proTip: "Start with Photo Fix to clean up old or faded images. Then use Full Color Restore to add beautiful color."
  },
  {
    step: 3,
    title: "Use your credits",
    description: "to apply the enhancement. You get 1 free credit to start!"
  },
  {
    step: 4,
    title: "Save or Download your new photo",
    description: "and enjoy the results."
  }
];

function OptionCard({ icon, title, description, tip, cost }) {
  return (
    <article className={styles.optionCard}>
      <h2>
        <span aria-hidden="true">{icon}</span> {title}
      </h2>
      <p>{description}</p>
      <p className={styles.tip}><strong>Tip:</strong> {tip}</p>
      <p className={styles.price}>
        <strong>Cost:</strong> {cost}
      </p>
    </article>
  )
}

function CreditPackCard({ pack }) {
  return (
    <div className={styles.creditPack}>
      <div className={styles.packHeader}>
        <h4 className={styles.packName}>{pack.name}</h4>
        <div className={styles.packPrice}>{pack.price}</div>
        <div className={styles.packCredits}>{pack.credits} credits</div>
      </div>
      <div className={styles.packContent}>
        <p className={styles.packDescription}>{pack.description}</p>
        <div className={styles.packFeatures}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>📷</span>
            <span className={styles.featureText}>{pack.photoFixes} Photo Fixes</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🎨</span>
            <span className={styles.featureText}>{pack.colorRestores} Color Restores</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HowItWorksPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check current auth status
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Determine the CTA link based on authentication status
  const getCtaLink = () => {
    if (loading) return "/signup" // Default to signup while loading
    return user ? "/pricing" : "/signup"
  }

  const getCtaText = () => {
    if (loading) return "🚀 Get Started for Free"
    return user ? "🚀 Choose Your Credits" : "🚀 Get Started for Free"
  }

  // SEO values
  const siteUrl = 'https://throwbackai.app';
  const pagePath = '/how-it-works';
  const pageUrl = `${siteUrl}${pagePath}`;
  const ogImage = `${siteUrl}/images/greek-after.png`; // replace with your image
  const twitterImage = ogImage;
  const facebookPageUrl = 'https://www.facebook.com/profile.php?id=61578072554521';
  const facebookPageId = '61578072554521';

  // Build FAQ structured data from OPTIONS and STEPS (simple Q/A format)
  const faqItems = [
    {
      question: "What is Photo Fix?",
      answer: "Photo Fix sharpens details, improves brightness and contrast, and removes minor artifacts — perfect for faded or blurry images."
    },
    {
      question: "What is Full Color Restore?",
      answer: "Full Color Restore adds realistic color to black-and-white photos and enhances detail for high-quality colorized results."
    },
    {
      question: "How much does a restore cost?",
      answer: "Photo Fix costs 1 credit. Full Color Restore costs 40 credits. You can buy credit packs on the Pricing page."
    },
    {
      question: "Do credits expire?",
      answer: "No — credits do not expire. Use them whenever you're ready to restore your photos."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": "How It Works — Throwback AI",
        "description": "Step-by-step guide to restoring, enhancing and colorizing vintage photos with Throwback AI. Learn how credits work and which service to choose.",
        "isPartOf": { "@id": `${siteUrl}#website` }
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        "mainEntity": faqItems.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        "name": "Throwback AI",
        "url": siteUrl,
        "sameAs": [facebookPageUrl]
      }
    ]
  };

  return (
    <>
      <Head>
        <title>How It Works | Throwback AI</title>
        <meta
          name="description"
          content="Step-by-step guide to restoring, enhancing, and colorizing your vintage photos with Throwback AI. Learn which service to use and how credits work."
        />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Throwback AI" />
        <meta property="og:title" content="How It Works | Throwback AI" />
        <meta
          property="og:description"
          content="Step-by-step guide to restoring, enhancing, and colorizing your vintage photos with Throwback AI. Learn which service to use and how credits work."
        />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Before and after examples and steps for restoring photos" />

        {/* Facebook-specific */}
        <meta property="fb:pages" content={facebookPageId} />
        <meta property="article:publisher" content={facebookPageUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How It Works | Throwback AI" />
        <meta
          name="twitter:description"
          content="Step-by-step guide to restoring, enhancing, and colorizing your vintage photos with Throwback AI."
        />
        <meta name="twitter:image" content={twitterImage} />

        {/* Structured data JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <main className={styles.container}>
        <h1 className={styles.heading}>How It Works</h1>
        <p className={styles.intro}>
          Anastasis helps you bring old memories back to life. Just follow a few easy steps to restore your photos using our AI-powered tools.
        </p>

        {/* Enhanced Step-by-Step Guide */}
        <section className={styles.stepsSection}>
          <h2>👣 Step-by-Step Guide</h2>
          <ol className={styles.stepsList}>
            {STEPS.map((step) => (
              <li key={step.step}>
                <strong>{step.title}</strong> {step.description}
                {step.proTip && (
                  <div className={styles.proTipInline}>
                    💡 <strong>Pro Tip:</strong> {step.proTip}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* Service Options */}
        <section className={styles.options}>
          {OPTIONS.map((opt) => (
            <OptionCard key={opt.title} {...opt} />
          ))}
        </section>

        {/* Enhanced Credits Section */}
        <section className={styles.creditsSection}>
          <h3>💳 How Credits Work</h3>
          <div className={styles.creditsInfo}>
            <ul>
              <li><strong>1 free credit</strong> for every visitor—no signup needed.</li>
              <li><strong>+5 bonus credits</strong> when you register.</li>
              <li><strong>Credits never expire</strong> — use them whenever you want.</li>
            </ul>
          </div>

          {/* Credit Packs Grid */}
          <div className={styles.creditPacksGrid}>
            <h4 className={styles.packsTitle}>💎 Choose Your Credit Pack</h4>
            <div className={styles.packsContainer}>
              {CREDIT_PACKS.map((pack) => (
                <CreditPackCard key={pack.name} pack={pack} />
              ))}
            </div>
          </div>

          {/* Value Comparison */}
          <div className={styles.valueComparison}>
            <h4 className={styles.comparisonTitle}>📊 Best Value Breakdown</h4>
            <div className={styles.comparisonGrid}>
              <div className={styles.comparisonItem}>
                <span className={styles.comparisonIcon}>💰</span>
                <div>
                  <strong>Dawn Pack:</strong> $0.50 per Color Restore
                </div>
              </div>
              <div className={styles.comparisonItem}>
                <span className={styles.comparisonIcon}>⚡</span>
                <div>
                  <strong>Revival Pack:</strong> $0.40 per Color Restore
                </div>
              </div>
              <div className={styles.comparisonItem}>
                <span className={styles.comparisonIcon}>🔥</span>
                <div>
                  <strong>Resurgence Pack:</strong> $0.37 per Color Restore
                </div>
              </div>
              <div className={styles.comparisonItem}>
                <span className={styles.comparisonIcon}>👑</span>
                <div>
                  <strong>Eternal Pack:</strong> $0.34 per Color Restore
                </div>
              </div>
            </div>
          </div>

          <Link href={getCtaLink()} className={styles.ctaButton}>
            {getCtaText()}
          </Link>
        </section>

        {/* Additional Info */}
        <section className={styles.additionalInfo}>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h4>🔒 Secure & Private</h4>
              <p>Your photos are processed securely and automatically deleted after enhancement.</p>
            </div>
            <div className={styles.infoCard}>
              <h4>⚡ Lightning Fast</h4>
              <p>Most photos are enhanced in under 30 seconds using our advanced AI technology.</p>
            </div>
            <div className={styles.infoCard}>
              <h4>📱 Works Everywhere</h4>
              <p>Use Anastasis on any device - desktop, tablet, or mobile phone.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
