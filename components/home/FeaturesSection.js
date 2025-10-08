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
            Why Choose Our Specialized Photo AI Over Generic Tools?
          </h2>
          <p className={FeaturesStyles.subtitle}>
            Built specifically for photo transformation, not general chatbots. Our dedicated models deliver professional results at a fraction of the cost and time of competitors.
          </p>
        </div>

        {/* Features Grid */}
        <div className={FeaturesStyles.grid}>
          <div className={FeaturesStyles.card}>
            <div className={FeaturesStyles.cardIcon}>⚡</div>
            <h3 className={FeaturesStyles.cardTitle}>45-Second Processing vs Hours</h3>
            <p className={FeaturesStyles.cardDescription}>
              While competitors take 5-15 minutes per photo, our optimized AI delivers professional colorization and restoration in under 45 seconds. No waiting rooms, no queues - just instant results.
            </p>
          </div>

          <div className={FeaturesStyles.card}>
            <div className={FeaturesStyles.cardIcon}>💰</div>
            <h3 className={FeaturesStyles.cardTitle}>Incredible Value: Starting at $0.48 Per Photo</h3>
            <p className={FeaturesStyles.cardDescription}>
              Just $4.99 gets you 400 credits - enough for 10 professional colorizations at $0.48 each. Compare that to industry standard $5-15 per photo. No subscriptions, pay only for what you use.
            </p>
          </div>

          <div className={FeaturesStyles.card}>
            <div className={FeaturesStyles.cardIcon}>🎯</div>
            <h3 className={FeaturesStyles.cardTitle}>Purpose-Built, Not Repurposed</h3>
            <p className={FeaturesStyles.cardDescription}>
              Unlike ChatGPT or general AI tools retrofitted for photos, our models are trained exclusively on vintage photography, damage patterns, and restoration techniques for superior accuracy.
            </p>
          </div>

          <div className={FeaturesStyles.card}>
            <div className={FeaturesStyles.cardIcon}>🔬</div>
            <h3 className={FeaturesStyles.cardTitle}>Historically Accurate Training</h3>
            <p className={FeaturesStyles.cardDescription}>
              Trained on vintage photos from 1920s-1980s. Our AI understands sepia tones, film grain, analog damage, and period-appropriate colors that generic models completely miss.
            </p>
          </div>

          <div className={FeaturesStyles.card}>
            <div className={FeaturesStyles.cardIcon}>🚀</div>
            <h3 className={FeaturesStyles.cardTitle}>Complete Creative Suite</h3>
            <p className={FeaturesStyles.cardDescription}>
              Beyond restoration - create viral decade transformations, professional avatars, cartoon art, and more. One platform for preserving memories and creating social media content.
            </p>
          </div>

          <div className={FeaturesStyles.card}>
            <div className={FeaturesStyles.cardIcon}>🔐</div>
            <h3 className={FeaturesStyles.cardTitle}>Privacy-First Processing</h3>
            <p className={FeaturesStyles.cardDescription}>
              Your photos are automatically deleted within one hour. No permanent storage, no data training, no corporate databases. Complete protection of your family memories and personal photos.
            </p>
          </div>
        </div>

        {/* Value Proposition Bar */}
        <div className={FeaturesStyles.valueBar}>
          <div className={FeaturesStyles.valueItem}>
            <span className={FeaturesStyles.valueNumber}>45s</span>
            <span className={FeaturesStyles.valueLabel}>Processing Time</span>
          </div>
          <div className={FeaturesStyles.valueItem}>
            <span className={FeaturesStyles.valueNumber}>$0.48</span>
            <span className={FeaturesStyles.valueLabel}>Per Colorized Photo</span>
          </div>
          <div className={FeaturesStyles.valueItem}>
            <span className={FeaturesStyles.valueNumber}>1 Hour</span>
            <span className={FeaturesStyles.valueLabel}>Auto-Delete</span>
          </div>
        </div>

      </div>
    </section>
  )
}

export default FeaturesSection