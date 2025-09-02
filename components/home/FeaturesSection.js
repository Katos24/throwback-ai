import React, { useRef, useEffect, useState } from 'react'
import FeaturesStyles from '../../styles/FeaturesTest.module.css'

const FeaturesSection = () => {
  // ref for the wrapper (intersection trigger)
  const wrapperRef = useRef(null)
  // ref for the <video> element (to call .play())
  const videoRef = useRef(null)
  const [showVideo, setShowVideo] = useState(false)

  // 1) Lazy-load via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowVideo(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // 2) Once visible, attempt autoplay programmatically
  useEffect(() => {
    if (showVideo && videoRef.current) {
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn('Autoplay prevented:', err)
        })
      }
    }
  }, [showVideo])

  return (
    <section className={FeaturesStyles.features} ref={wrapperRef}>
      <div className={FeaturesStyles.container}>
        {/* Section Heading */}
        <div className={FeaturesStyles.header}>
          <h2 className={FeaturesStyles.title}>
            What Makes Our AI Photo Transformations Special?
          </h2>
          <p className={FeaturesStyles.subtitle}>
            Advanced AI technology designed specifically for bringing your photos to life. From restoring precious family memories to creating stunning modern art - we&apos;ve got you covered.
          </p>
        </div>

        {/* Features Grid */}
        <div className={FeaturesStyles.grid}>
          <div className={FeaturesStyles.card}>
            <div className={FeaturesStyles.cardIcon}>🎯</div>
            <h3 className={FeaturesStyles.cardTitle}>Complete AI Suite</h3>
            <p className={FeaturesStyles.cardDescription}>
              Unlike general-purpose AI models, our specialized suite delivers unmatched accuracy for photo restoration, enhancement, colorization, and creative transformations. From vintage repairs to modern cartoon art.
            </p>
          </div>

          <div className={FeaturesStyles.card}>
            <div className={FeaturesStyles.cardIcon}>🔬</div>
            <h3 className={FeaturesStyles.cardTitle}>Heritage-Specific Training</h3>
            <p className={FeaturesStyles.cardDescription}>
              Trained exclusively on vintage photography, film grain, sepia tones, and analog damage. Our models understand historical nuances from 1930s portraits to 1970s color casts, ensuring authentic restorations.
            </p>
          </div>

          <div className={FeaturesStyles.card}>
            <div className={FeaturesStyles.cardIcon}>⚡</div>
            <h3 className={FeaturesStyles.cardTitle}>Lightning-Fast Results</h3>
            <p className={FeaturesStyles.cardDescription}>
              Get professional-quality results in seconds, not hours. Whether you&apos;re restoring damaged photos or creating cartoon avatars, our optimized AI delivers stunning transformations at incredible speed.
            </p>
          </div>

          <div className={FeaturesStyles.card}>
            <div className={FeaturesStyles.cardIcon}>🔐</div>
            <h3 className={FeaturesStyles.cardTitle}>Complete Privacy Protection</h3>
            <p className={FeaturesStyles.cardDescription}>
              Every photo is processed securely and automatically deleted within one hour. No permanent storage, no data training, complete protection of your family memories and personal photos.
            </p>
          </div>

          <div className={FeaturesStyles.card}>
            <div className={FeaturesStyles.cardIcon}>🎨</div>
            <h3 className={FeaturesStyles.cardTitle}>Creative & Restoration Tools</h3>
            <p className={FeaturesStyles.cardDescription}>
              Beyond restoration - transform photos into cartoon art, 90s yearbook styles, professional avatars, and more. Perfect for social media, gifts, or just having fun with your photos.
            </p>
          </div>

          <div className={FeaturesStyles.card}>
            <div className={FeaturesStyles.cardIcon}>💎</div>
            <h3 className={FeaturesStyles.cardTitle}>Museum-Quality Output</h3>
            <p className={FeaturesStyles.cardDescription}>
              Our AI maintains incredible detail and authenticity in every transformation. From historically accurate colorization to crisp cartoon conversions, expect professional-grade results every time.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default FeaturesSection