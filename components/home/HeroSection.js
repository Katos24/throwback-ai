import React from 'react'
import Link from 'next/link'
import heroStyles from '../../styles/Hero.module.css'

export default function HeroSection() {
  return (
    <>
      <div className={heroStyles.fullWidthBanner}>
        🔒 Privacy-First • ⚡ Results in Under 1 Minute • 🆓 1 Free Restore + 5 Bonus on Signup
      </div>

      <section className={heroStyles.hero}>
        <div className={heroStyles.heroContent}>
          <h1 className={heroStyles.heroTitle}>
            Restore Memories, <span className={heroStyles.accent}>Not Just Photos</span>
          </h1>

          <p className={heroStyles.heroSubtitle}>
            In under a minute, our one-click AI enhances faded, torn, or lightly water-damaged prints into vibrant, frame-worthy keepsakes—no subscription required.  
            Preserve your family&apos;s legacy with just one click of “Restore.”
          </p>


          <div className={heroStyles.heroButtons}>
            <Link href="/replicate/restore-basic" className={heroStyles.secondaryButton}>
              Photo Fix <span className={heroStyles.freePill}>Free</span>
            </Link>
            <Link href="/replicate/restore-premium" className={heroStyles.primaryButton}>
              Full Color Restore <span className={heroStyles.premiumPill}>Premium</span>
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

          {/* ✨ Gradient subtext below video */}
          <p className={heroStyles.subText}>
            Sign up now and get 5 free credits
          </p>
        </div>
      </section>
    </>
  )
}
