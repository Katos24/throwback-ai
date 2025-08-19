import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Homepage.module.css'

export default function Homepage() {
  const router = useRouter()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [faqOpen, setFaqOpen] = useState({})
  const [isVisible, setIsVisible] = useState({})
  const [currentHeroImage, setCurrentHeroImage] = useState(0)

  const heroImages = [
    { before: '/images/weddingbefore.jpg', after: '/images/weddingafter.jpg' },
    { before: '/images/before6.jpg', after: '/images/after6.jpg' },
    { before: '/images/before8.jpg', after: '/images/after8.jpg' }
  ]

  const features = [
    {
      icon: '🔬',
      title: 'Heritage-Specific AI',
      description: 'Trained on vintage photography, film grain, sepia tones, and analog damage. Our models understand historical nuances from 1930s portraits to 1970s color casts.'
    },
    {
      icon: '⏱️',
      title: 'Quick & Detailed Restorations',
      description: 'We restore your precious photos with clarity and care, often delivering results in seconds. Premium restorations may take up to a minute to ensure museum-quality detail and colorization.'
    },
    {
      icon: '🔐',
      title: 'Fort Knox Privacy',
      description: 'Every photo is processed securely and automatically deleted within one hour. No permanent storage, no creepy scraping, no training on your data.'
    },
    {
      icon: '💎',
      title: 'No Subscriptions',
      description: 'Pay only for what you use — no monthly subscriptions, no hidden fees. Your credits never expire.'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah M.',
      context: 'Family Reunion',
      text: 'Our AI brought my grandmother\'s 1952 wedding photo back to life with stunning clarity and vibrant colors. The whole family was amazed!',
      rating: 5
    },
    {
      name: 'Marcus T.',
      context: 'Father\'s Day Gift', 
      text: '70-year-old baby photos transformed with incredible detail. The AI restoration revealed features we never knew existed in the original.',
      rating: 5
    },
    {
      name: 'Linda K.',
      context: 'Genealogy Research',
      text: 'Perfect colorization for our genealogy project. The AI made our ancestors feel alive and present in our family history.',
      rating: 5
    },
    {
      name: 'Robert H.',
      context: 'Memorial Service',
      text: 'Damaged military photo from WWII restored to museum quality. The AI preserved every important detail of my grandfather\'s service.',
      rating: 5
    }
  ]

  const pricingPlans = [
    {
      name: 'Dawn Pack',
      price: '$4.99',
      credits: '400',
      revivals: '10',
      perRestore: '$0.50',
      description: 'Perfect for trying out Anastasis magic — restore a few cherished memories.',
      features: [
        'Basic AI restoration',
        'Standard resolution',
        '400 credits included',
        'Instant results'
      ],
      cta: '🌅 BEGIN RESTORATION',
      popular: false,
      path: '/pricing'
    },
    {
      name: 'Revival Pack',
      price: '$9.99',
      credits: '1,000',
      revivals: '25',
      perRestore: '$0.40',
      description: 'A solid bundle for breathing new life into vintage family shots.',
      features: [
        'Advanced AI restoration',
        'High resolution output',
        '1,000 credits included',
        'Color enhancement',
        'Priority processing'
      ],
      cta: '🌅 BEGIN RESTORATION',
      popular: false,
      path: '/pricing'
    },
    {
      name: 'Resurgence Pack',
      price: '$14.99',
      credits: '1,600',
      revivals: '40',
      perRestore: '$0.37',
      description: 'A popular pick for curating full-family albums and restoring event photos.',
      features: [
        'Everything in Revival',
        'Batch processing',
        '1,600 credits included',
        'Multiple formats',
        'Email support'
      ],
      cta: '🌅 BEGIN RESTORATION',
      popular: true,
      path: '/pricing'
    },
    {
      name: 'Eternal Pack',
      price: '$29.99',
      credits: '3,500',
      revivals: '87',
      perRestore: '$0.34',
      description: 'Built for legacy-level restoration — preserve history at scale.',
      features: [
        'Everything included',
        'Commercial license',
        '3,500 credits included',
        'Priority support',
        'Custom requests'
      ],
      cta: '🌅 BEGIN RESTORATION',
      popular: false,
      path: '/pricing'
    }
  ]

  const faqs = [
    {
      question: 'What makes Anastasis better than apps like Remini or MyHeritage?',
      answer: 'We don\'t use generic models or push subscriptions. Anastasis is tailored for historic, sentimental photos and built by people who care about family legacy.'
    },
    {
      question: 'Is it really free to try?',
      answer: 'Yes! You get 1 free Photo Fix restoration. If you sign up you will also get an additional 5 credits!'
    },
    {
      question: 'What happens to my photo after it\'s restored?',
      answer: 'It\'s securely deleted within one hour. We never save, sell, or reuse your uploads.'
    },
    {
      question: 'Can I use restored photos commercially?',
      answer: 'Absolutely. Once restored, they\'re yours to print, gift, publish, or share.'
    },
    {
      question: 'What types of damage can you repair?',
      answer: 'Our AI can handle scratches, tears, fading, water damage, stains, missing pieces, color degradation, and age-related deterioration. We specialize in photos from the 1930s onwards.'
    }
  ]

  const steps = [
    {
      icon: '📤',
      title: 'Upload Your Photo',
      description: 'No signup required. Just upload your image and select a restoration option. All you need is a digital scan or smartphone photo.'
    },
    {
      icon: '🧠',
      title: 'AI-Powered Restoration',
      description: 'Our neural models detect age damage, noise, blur, and color degradation — and correct them with surgical precision.'
    },
    {
      icon: '⚡',
      title: 'Lightning-Fast Results',
      description: 'Your photo is processed in under 2 minutes. Even full restorations rarely take more than 90 seconds.'
    },
    {
      icon: '⬇️',
      title: 'Download & Share Freely',
      description: 'Restored photos are downloadable in high-res formats, and yours to use forever. Share with loved ones or print as keepsakes.'
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }))
          }
        })
      },
      { threshold: 0.1 }
    )

    const sections = document.querySelectorAll('[data-animate]')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage(prev => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [])

  const handleNavigation = (path) => {
    router.push(path)
  }

  const toggleFaq = (index) => {
    setFaqOpen(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  return (
    <>
      <Head>
        <title>Anastasis AI - Restore Memories, Not Just Photos</title>
        <meta name="description" content="Transform faded, torn, or damaged photos into vibrant keepsakes in under 60 seconds. Choose your restoration level—from basic enhancement to full colorization." />
        <meta name="keywords" content="photo restoration, AI photo repair, vintage photo restoration, family photo restoration, photo colorization" />
        <meta property="og:title" content="Anastasis AI - Restore Memories, Not Just Photos" />
        <meta property="og:description" content="Transform faded, torn, or damaged photos into vibrant keepsakes in under 60 seconds." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.homepage}>
        
        <section className={styles.hero} id="hero" data-animate>
          <div className={styles.heroBackground}>
            <div className={styles.heroPattern}></div>
          </div>
          
          <div className={styles.heroContainer}>
            <div className={styles.heroContent}>
              <div className={styles.heroText}>
                <h1 className={styles.heroTitle}>
                  Restore Memories, <span className={styles.highlight}>Not Just Photos</span>
                </h1>
                <p className={styles.heroSubtitle}>
                  Resurrect precious family memories in under 60 seconds. Our AI breathes new life into faded, torn, or damaged photos—from gentle restoration to full colorization.
                </p>
                
                <div className={styles.heroStats}>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>500K+</span>
                    <span className={styles.statLabel}>Photos Restored</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>99.8%</span>
                    <span className={styles.statLabel}>Satisfaction Rate</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>60s</span>
                    <span className={styles.statLabel}>Average Time</span>
                  </div>
                </div>

                <div className={styles.heroButtons}>
                  <Link href="/replicate/restore-basic" className={styles.secondaryButton}>
                    <div className={styles.buttonContent}>
                      <div className={styles.buttonMain}>Photo Fix</div>
                      <div className={styles.buttonSubtext}>Enhance & Repair</div>
                      <div className={styles.buttonCost}>
                        <span className={styles.freePill}>1 Credit</span>
                      </div>
                    </div>
                  </Link>
                  <Link href="/replicate/restore-premium" className={styles.primaryButton}>
                    <div className={styles.buttonContent}>
                      <div className={styles.buttonMain}>Full Color Restore</div>
                      <div className={styles.buttonSubtext}>Colorize & Enhance</div>
                      <div className={styles.buttonCost}>
                        <span className={styles.premiumPill}>40 Credits</span>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className={styles.pricingCallout}>
                  <span className={styles.creditInfo}>
                    <strong>Try Free</strong> • <Link href="/signup" className={styles.signupLink}><strong> +5 Credits</strong> on Signup</Link>
                  </span>
                </div>

                <div className={styles.trustBadges}>
                  <div className={styles.badge}>No Subscription Required</div>
                  <div className={styles.badge}>Pay Per Use</div>
                  <div className={styles.badge}>Privacy Protected</div>
                </div>
              </div>

              <div className={styles.heroVisual}>
                <div className={styles.videoWrapper}>
                  <video
                    className={styles.heroVideo}
                    src="/videos/restore-demo.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>

                <div className={styles.beforeAfter}>
                  <div className={styles.imageContainer}>
                    <div className={styles.beforeImage}>
                      <Image
                        src={heroImages[currentHeroImage].before}
                        alt="Before restoration"
                        width={300}
                        height={400}
                        className={styles.heroImage}
                      />
                      <span className={styles.imageLabel}>BEFORE</span>
                    </div>
                    
                    <div className={styles.aiIndicator}>
                      <div className={styles.aiIcon}>AI</div>
                      <div className={styles.processingLine}></div>
                    </div>
                    
                    <div className={styles.afterImage}>
                      <Image
                        src={heroImages[currentHeroImage].after}
                        alt="After restoration"
                        width={300}
                        height={400}
                        className={styles.heroImage}
                      />
                      <span className={styles.imageLabel}>AFTER</span>
                    </div>
                  </div>
                  
                  <div className={styles.imageIndicators}>
                    {heroImages.map((_, index) => (
                      <button
                        key={index}
                        className={`${styles.indicator} ${currentHeroImage === index ? styles.active : ''}`}
                        onClick={() => setCurrentHeroImage(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.features} id="features" data-animate>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                What Makes <span className={styles.highlight}>Anastasis</span> Different?
              </h2>
              <p className={styles.sectionSubtitle}>
                Built specifically for family memories and genealogy projects
              </p>
            </div>

            <div className={styles.featuresGrid}>
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`${styles.featureCard} ${isVisible.features ? styles.animate : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.howItWorks} id="how-it-works" data-animate>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                How <span className={styles.highlight}>It Works</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                Seamless restoration powered by heritage-grade AI
              </p>
            </div>

            <div className={styles.stepsContainer}>
              {steps.map((step, index) => (
                <React.Fragment key={index}>
                  <div className={styles.step}>
                    <div className={styles.stepNumber}>{index + 1}</div>
                    <div className={styles.stepContent}>
                      <div className={styles.stepIcon}>{step.icon}</div>
                      <h3>{step.title}</h3>
                      <p dangerouslySetInnerHTML={{ __html: step.description }}></p>
                    </div>
                  </div>
                  {index < steps.length - 1 && <div className={styles.stepConnector}></div>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.testimonials} id="testimonials" data-animate>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                AI Photo <span className={styles.highlight}>Transformations</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                Witness the power of AI bringing your cherished memories back to life with stunning clarity
              </p>
            </div>

            <div className={styles.testimonialSlider}>
              <div className={styles.testimonialCard}>
                <div className={styles.testimonialContent}>
                  <div className={styles.rating}>
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <span key={i} className={styles.star}>⭐</span>
                    ))}
                  </div>
                  <blockquote className={styles.testimonialText}>
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>
                  <div className={styles.testimonialAuthor}>
                    <div className={styles.authorInfo}>
                      <h4 className={styles.authorName}>{testimonials[currentTestimonial].name}</h4>
                      <p className={styles.authorContext}>{testimonials[currentTestimonial].context}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.testimonialIndicators}>
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.indicator} ${currentTestimonial === index ? styles.active : ''}`}
                    onClick={() => setCurrentTestimonial(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.pricing} id="pricing" data-animate>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Choose Your Restoration Journey</h2>
              <p className={styles.sectionSubtitle}>
                Pay only for what you use — no monthly subscriptions, no hidden fees. Your credits never expire.
              </p>
            </div>

            <div className={styles.pricingGrid}>
              {pricingPlans.map((plan, index) => (
                <div 
                  key={index}
                  className={`${styles.pricingCard} ${plan.popular ? styles.popular : ''}`}
                >
                  {plan.popular && <div className={styles.popularBadge}>👑 MOST POPULAR</div>}
                  
                  <div className={styles.pricingHeader}>
                    <h3 className={styles.planName}>🌅 {plan.name}</h3>
                    <div className={styles.planPrice}>
                      <span className={styles.price}>{plan.price}</span>
                    </div>
                    <div className={styles.credits}>
                      <span className={styles.creditsAmount}>{plan.credits}</span>
                      <span className={styles.creditsLabel}>credits</span>
                    </div>
                  </div>

                  <p className={styles.planDescription}>{plan.description}</p>

                  <div className={styles.featureHighlights}>
                    <div className={styles.featureItem}>
                      <span className={styles.featureIcon}>💎</span>
                      <span className={styles.featureNumber}>{plan.revivals}</span>
                      <div className={styles.featureLabel}>Premium Revivals</div>
                    </div>
                    
                    <div className={styles.featureItem}>
                      <span className={styles.featureIcon}>💰</span>
                      <span className={styles.featureNumber}>{plan.perRestore}</span>
                      <div className={styles.featureLabel}>Per Restore</div>
                    </div>
                  </div>

                  <ul className={styles.features}>
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className={styles.feature}>
                        <span className={styles.checkmark}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button 
                    className={`${styles.btn} ${plan.popular ? styles.btnPrimary : styles.btnSecondary}`}
                    onClick={() => handleNavigation(plan.path)}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.faq} id="faq" data-animate>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                💬 Frequently Asked <span className={styles.highlight}>Questions</span>
              </h2>
            </div>

            <div className={styles.faqContainer}>
              {faqs.map((faq, index) => (
                <div key={index} className={styles.faqItem}>
                  <button 
                    className={styles.faqQuestion}
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.question}</span>
                    <span className={`${styles.faqIcon} ${faqOpen[index] ? styles.open : ''}`}>
                      +
                    </span>
                  </button>
                  
                  <div className={`${styles.faqAnswer} ${faqOpen[index] ? styles.open : ''}`}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.finalCta} id="final-cta" data-animate>
          <div className={styles.container}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>
                Ready to Bring Your <span className={styles.highlight}>Memories Back to Life</span>?
              </h2>
              <p className={styles.ctaText}>
                Join thousands of families who have restored their precious photos with Anastasis AI. 
                Start with a free restoration and see the magic for yourself.
              </p>

              <div className={styles.ctaButtons}>
                <button 
                  className={`${styles.btn} ${styles.btnPrimary} ${styles.large}`}
                  onClick={() => handleNavigation('/replicate/restore-basic')}
                >
                  🎁 Start Free Restoration
                </button>
                <button 
                  className={`${styles.btn} ${styles.btnSecondary} ${styles.large}`}
                  onClick={() => handleNavigation('/gallery')}
                >
                  📸 View Gallery
                </button>
              </div>

              <div className={styles.trustIndicators}>
                <span>✓ No subscription required</span>
                <span>✓ Results in under 60 seconds</span>
                <span>✓ 100% private and secure</span>
                <span>✓ Money-back guarantee</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}