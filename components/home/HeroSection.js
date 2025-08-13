import React from 'react'
import Link from 'next/link'
import heroStyles from '../../styles/Hero.module.css'

export default function HeroSection() {
  return (
    <>
      <section className={heroStyles.hero}>
        <div className={heroStyles.heroContent}>
          <h1 className={heroStyles.heroTitle}>
            Restore Memories, <span className={heroStyles.accent}>Not Just Photos</span>
          </h1>
          
          <p className={heroStyles.heroSubtitle}>
            Resurrect precious family memories in under 60 seconds. 
            Our AI breathes new life into faded, torn, or damaged photos—from gentle restoration to full colorization.
          </p>

       
          {/* Enhanced button section with clear pricing */}
          <div className={heroStyles.heroButtons}>
            <Link href="/replicate/restore-basic" className={heroStyles.secondaryButton}>
              <div className={heroStyles.buttonContent}>
                <div className={heroStyles.buttonMain}>Photo Fix</div>
                <div className={heroStyles.buttonSubtext}>Enhance & Repair</div>
                <div className={heroStyles.buttonCost}>
                  <span className={heroStyles.freePill}>1 Credit</span>
                </div>
              </div>
            </Link>
            
            <Link href="/replicate/restore-premium" className={heroStyles.primaryButton}>
              <div className={heroStyles.buttonContent}>
                <div className={heroStyles.buttonMain}>Full Color Restore</div>
                <div className={heroStyles.buttonSubtext}>Colorize & Enhance</div>
                <div className={heroStyles.buttonCost}>
                  <span className={heroStyles.premiumPill}>40 Credits</span>
                </div>
              </div>
            </Link>
          </div>

   {/* Sleek pricing callout with signup link */}
          <div className={heroStyles.pricingCallout}>
            <span className={heroStyles.creditInfo}>
              <strong>Try Free</strong> • <Link href="/signup" className={heroStyles.signupLink}><strong> +5 Credits</strong> on Signup</Link>
            </span>
          </div>

         

          {/* Video section */}
          <div className={heroStyles.videoWrapper}>
            <video
              className={heroStyles.heroVideo}
              src="/videos/restore-demo.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          {/* Enhanced call-to-action */}
          <p className={heroStyles.subText}>
            Start restoring memories today
          </p>

          {/* Trust badges */}
          <div className={heroStyles.trustBadges}>
            <div className={heroStyles.badge}>No Subscription Required</div>
            <div className={heroStyles.badge}>Pay Per Use</div>
            <div className={heroStyles.badge}>Privacy Protected</div>
          </div>
        </div>
      </section>
    </>
  )
}