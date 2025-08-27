import React, { useState } from 'react';
import Link from 'next/link';
import ImageCompareSlider from "../ImageCompareSlider";
import heroStyles from '../../styles/Hero.module.css';

export default function HeroSection() {
  const features = [
    {
      id: 'restore',
      title: "Photo Restoration",
      shortTitle: "Restore Damaged Photos",
      description: "Remove scratches, tears, and fading from your treasured family photos. Perfect for preserving irreplaceable memories.",
      beforeAfter: {
        before: "/images/basicpage-before.jpg",
        after: "/images/basicpage-after.jpg"
      },
      link: "/replicate/restore-basic",
      credits: 1,
      buttonText: "Restore My Photo"
    },
    {
      id: 'colorize',
      title: "AI Colorization", 
      shortTitle: "Add Beautiful Colors",
      description: "Transform black and white photos with historically accurate, beautiful colors. See your ancestors come alive like never before.",
      beforeAfter: {
        before: "/images/before6.jpg",
        after: "/images/after6.jpg"
      },
      link: "/replicate/restore-premium",
      credits: 40,
      buttonText: "Add Color"
    },
    {
      id: 'cartoonify',
      title: "Cartoon Creator",
      shortTitle: "Create Cartoon Art", 
      description: "Turn family photos into beautiful cartoon artwork. Perfect for gifts, social media, or creating unique family portraits.",
      beforeAfter: {
        before: "/images/cartoon-before.jpg",
        after: "/images/cartoon-example.jpg"
      },
      link: "/replicate/cartoon",
      credits: 40,
      buttonText: "Make Cartoon"
    }
  ];

  return (
    <>
      <section className={heroStyles.hero}>
        {/* Background Elements */}
        <div className={heroStyles.backgroundGrid}></div>
        <div className={heroStyles.gradientOrb}></div>
        
        <div className={heroStyles.heroContainer}>
          {/* Main Header */}
          <div className={heroStyles.heroHeader}>
            <div className={heroStyles.aiIndicator}>
              <span className={heroStyles.dot}></span>
              <span className={heroStyles.aiText}>AI-POWERED</span>
            </div>
            
            <h1 className={heroStyles.heroTitle}>
              Bring Your Precious
              <span className={heroStyles.titleBreak}></span>
              <span className={heroStyles.gradient}>Memories Back to Life</span>
            </h1>
            
            <p className={heroStyles.heroSubtitle}>
              Transform faded family photos into <strong>vibrant treasures</strong>. Repair damage, 
              add stunning colors, or create beautiful cartoon artwork from your most cherished memories.
            </p>
          </div>

          {/* AI Services Grid with Sliders */}
          <div className={heroStyles.servicesContainer}>
            <h2 className={heroStyles.servicesTitle}>Choose Your Memory Transformation</h2>
            
            <div className={heroStyles.servicesGrid}>
              {features.map((feature) => (
                <div key={feature.id} className={heroStyles.serviceCard}>
                  {/* Image Compare Slider */}
                  <div className={heroStyles.processDemo}>
                    <ImageCompareSlider
                      beforeImage={feature.beforeAfter.before}
                      afterImage={feature.beforeAfter.after}
                    />
                  </div>
                  
                  <div className={heroStyles.serviceInfo}>
                    <h3 className={heroStyles.serviceName}>{feature.title}</h3>
                    <p className={heroStyles.serviceDesc}>
                      {feature.description}
                    </p>
                    
                    <Link href={feature.link} className={heroStyles.actionButton}>
                      <span className={heroStyles.buttonText}>{feature.buttonText}</span>
                      <div className={heroStyles.creditCost}>
                        <span className={heroStyles.costNumber}>{feature.credits}</span>
                        <span className={heroStyles.costLabel}>{feature.credits === 1 ? 'Credit' : 'Credits'}</span>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Row moved below services */}
          <div className={heroStyles.statsRow}>
            <div className={heroStyles.stat}>
              <div className={heroStyles.statNumber}>50K+</div>
              <div className={heroStyles.statLabel}>Families Helped</div>
            </div>
            <div className={heroStyles.stat}>
              <div className={heroStyles.statNumber}>2.3s</div>
              <div className={heroStyles.statLabel}>Average Results</div>
            </div>
            <div className={heroStyles.stat}>
              <div className={heroStyles.statNumber}>98%</div>
              <div className={heroStyles.statLabel}>Love Their Results</div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className={heroStyles.bottomCTA}>
            <div className={heroStyles.creditOffer}>
              <div className={heroStyles.offerIcon}>⚡</div>
              <div className={heroStyles.offerText}>
                <strong>Try It Free Right Now</strong>
                <span className={heroStyles.offerDetails}>
                  <Link href="/signup" className={heroStyles.ctaLink}>Get 5 Free Credits</Link> • No credit card needed
                </span>
              </div>
            </div>
            
            <div className={heroStyles.securityBadges}>
              <div className={heroStyles.securityBadge}>
                <span className={heroStyles.checkmark}>✓</span>
                <span>100% Private</span>
              </div>
              <div className={heroStyles.securityBadge}>
                <span className={heroStyles.checkmark}>✓</span>
                <span>Photos Deleted After 1 Hour</span>
              </div>
              <div className={heroStyles.securityBadge}>
                <span className={heroStyles.checkmark}>✓</span>
                <span>Instant Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}