import React from 'react'
import Link from 'next/link'
import heroStyles from '../../styles/Hero.module.css'

export default function HeroSection() {
  return (
    <>
      <div className={heroStyles.fullWidthBanner}>
        🔒 Privacy-First • ⚡ Results in Under 2 Minutes • 🆓 1 Free Restore + 5 Bonus on Signup
      </div>

      <section className={heroStyles.hero}>
        <div className={heroStyles.heroContent}>
          <h1 className={heroStyles.heroTitle}>
            Restore Memories, <span className={heroStyles.accent}>Not Just Photos</span>
          </h1>

          <p className={heroStyles.heroSubtitle}>
            Yellowed, torn, or water-stained prints come back to life in under 2 minutes. Surprise
            grandma on her 80th birthday, frame that childhood snap for your sibling, or preserve
            your family’s legacy—no subscription, just easy AI magic.
          </p>

          <div className={heroStyles.heroButtons}>
            <Link href="/replicate/restore-basic" className={heroStyles.secondaryButton}>
              Quick Enhance <span className={heroStyles.freePill}>Free</span>
            </Link>
            <Link href="/replicate/restore-premium" className={heroStyles.primaryButton}>
              Full Restore & Colorize <span className={heroStyles.premiumPill}>Premium</span>
            </Link>
          </div>

          {/* Video replaces the compare slider */}
          <div className={heroStyles.videoContainer}>
            <video
              className={heroStyles.heroVideo}
              src="/videos/restore-demo.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </section>
    </>
  )
}
