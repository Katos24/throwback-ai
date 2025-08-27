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
        <h2 className={FeaturesStyles.title}>
          What Makes Throwback AI Different?
        </h2>
        <p className={FeaturesStyles.subtitle}>
          Advanced AI technology designed specifically for restoring your precious memories
        </p>

        {/* Features Grid */}
        <div className={FeaturesStyles.grid}>
          <div className={FeaturesStyles.card}>
            <h3 className={FeaturesStyles.cardTitle}>🎯 Complete AI Suite</h3>
            <p className={FeaturesStyles.cardDescription}>
              Unlike general-purpose AI models, our specialized suite delivers unmatched accuracy for photo restoration, enhancement, colorization, and cartoon creation. More AI tools coming soon.
            </p>
          </div>

          <div className={FeaturesStyles.card}>
            <h3 className={FeaturesStyles.cardTitle}>🔬 Heritage-Specific AI</h3>
            <p className={FeaturesStyles.cardDescription}>
              Trained exclusively on vintage photography, film grain, sepia tones, and analog damage.
              Our models understand historical nuances from 1930s portraits to 1970s color casts.
            </p>
          </div>

          <div className={FeaturesStyles.card}>
            <h3 className={FeaturesStyles.cardTitle}>⚡ Lightning-Fast Results</h3>
            <p className={FeaturesStyles.cardDescription}>
              We restore your precious photos with clarity and care, often delivering results in seconds.
              Premium restorations and colorizations maintain museum-quality detail while staying incredibly fast.
            </p>
          </div>

          <div className={FeaturesStyles.card}>
            <h3 className={FeaturesStyles.cardTitle}>🔐 Complete Privacy Protection</h3>
            <p className={FeaturesStyles.cardDescription}>
              Every photo is processed securely and automatically deleted within one hour.
              No permanent storage, no data training, complete protection of your family memories.
            </p>
          </div>
        </div>

        {/* Optional: Add video section if you have one */}
        {showVideo && (
          <div className={FeaturesStyles.videoWrapper}>
            <video
              ref={videoRef}
              className={FeaturesStyles.demoVideo}
              muted
              loop
              playsInline
            >
              {/* Add your video source here if you have demo content */}
            </video>
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturesSection