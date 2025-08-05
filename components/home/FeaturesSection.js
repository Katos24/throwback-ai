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
    <section className={FeaturesStyles.features}>
      <div className={FeaturesStyles.container}>
        {/* Section Heading */}
        <h2 className={FeaturesStyles.title}>
          What Makes Anastasis Different?
        </h2>
        <p className={FeaturesStyles.subtitle}>
          Built specifically for family memories and genealogy projects
        </p>

        {/* Features Grid */}
        <div className={FeaturesStyles.grid}>
          <div className={FeaturesStyles.card}>
            <h3 className={FeaturesStyles.cardTitle}>🔬 Heritage-Specific AI</h3>
            <p className={FeaturesStyles.cardDescription}>
              Trained on vintage photography, film grain, sepia tones, and analog damage.
              Our models understand historical nuances from 1930s portraits to 1970s color casts.
            </p>
          </div>

          <div className={FeaturesStyles.card}>
            <h3 className={FeaturesStyles.cardTitle}>📚 Genealogy-Grade Quality</h3>
            <p className={FeaturesStyles.cardDescription}>
              Trusted by family archivists and professional genealogists.
              We don’t slap filters — we bring clarity and color to moments that matter most.
            </p>
          </div>

          <div className={FeaturesStyles.card}>
            <h3 className={FeaturesStyles.cardTitle}>🔐 Fort Knox Privacy</h3>
            <p className={FeaturesStyles.cardDescription}>
              Every photo is processed securely and automatically deleted within one hour.
              No permanent storage, no creepy scraping, no training on your data.
            </p>
          </div>
        </div>

        {/* Video Intro */}
        <div ref={wrapperRef} className={FeaturesStyles.videoWrapper}>
          {showVideo && (
            <video
              ref={videoRef}
              className={FeaturesStyles.featureVideo}
              preload="auto"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/videos/ThrowbackAIIntro.mp4" type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
          )}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
