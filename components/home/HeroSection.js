import React, { useState } from 'react';
import Link from 'next/link';
import ImageCompareSlider from "../ImageCompareSlider";
import heroStyles from '../../styles/Hero.module.css';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState('enhance');

  const tabsData = {
    enhance: {
      features: [
        {
          id: 'restore',
          title: "Photo Restoration",
          shortTitle: "Restore Damaged Photos",
          description: "Repair scratches, tears, water damage, and fading from irreplaceable family photos. Bring back memories you thought were lost forever.",
          beforeAfter: {
            before: "/images/basicpage-before.jpg",
            after: "/images/basicpage-after.jpg"
          },
          link: "/replicate/restore-basic",
          credits: 1,
          buttonText: "Restore (Try Free)"
        },
        {
          id: 'colorize',
          title: "Historical Colorization", 
          shortTitle: "Add Beautiful Colors",
          description: "Watch your ancestors come alive as our AI adds historically accurate, vibrant colors to black and white family photos from any era.",
          beforeAfter: {
            before: "/images/before6.jpg",
            after: "/images/after6.jpg"
          },
          link: "/replicate/restore-premium",
          credits: 40,
          buttonText: "Add Color"
        }
      ]
    },
    create: {
      features: [
        {
          id: 'cartoonify',
          title: "Cartoon Art",
          shortTitle: "Create Cartoon Art", 
          description: "Transform yourself, friends, or pets into stunning cartoon artwork. Perfect for gifts, profile pictures, or just having fun!",
          beforeAfter: {
            before: "/images/cartoon-before.jpg",
            after: "/images/cartoon-example.jpg"
          },
          link: "/replicate/cartoon",
          credits: 40,
          buttonText: "Make Cartoon"
        },
        {
          id: '90s-yearbook',
          title: "90s Yearbook Style",
          shortTitle: "90s School Photo Style", 
          description: "Go back in time! Get that classic 90s school portrait look with vintage styling, perfect for nostalgia lovers and social media.",
          beforeAfter: {
            before: "/images/yearbook-before.jpg",
            after: "/images/yearbook-after.jpg"
          },
          link: "/replicate/yearbook",
          credits: 50,
          buttonText: "Go Retro"
        },
        {
          id: 'avatar',
          title: "Throwback Avatars",
          shortTitle: "Throwback Avatars", 
          description: "Create polished, throwback headshots and avatars perfect for social media, LinkedIn, business cards, or any platform where you want to look your best.",
          beforeAfter: {
            before: "/images/avatar-before.jpg",
            after: "/images/avatar-after.jpg"
          },
          link: "/replicate/avatar",
          credits: 60,
          buttonText: "Create Avatar"
        }
      ]
    }
  };

  const currentTab = tabsData[activeTab];

  return (
    <>
      <section className={heroStyles.hero}>
        {/* Background Elements */}
        <div className={heroStyles.backgroundGrid}></div>
        <div className={heroStyles.gradientOrb}></div>
        
        <div className={heroStyles.heroContainer}>
          {/* Main Header */}
          <div className={heroStyles.heroHeader}>
            <h1 className={heroStyles.heroTitle}>
              Transform Any Photo Into
              <span className={heroStyles.titleBreak}></span>
              <span className={heroStyles.gradient}>Something Amazing</span>
            </h1>
            
            <p className={heroStyles.heroSubtitle}>
              From restoring precious family memories to creating fun modern art - our AI transforms your photos in seconds. 
              <strong>Preserve the past or reimagine the present.</strong>
            </p>
          </div>

          {/* Tab Navigation */}
          <div className={heroStyles.tabNavigation}>
            <button
              className={`${heroStyles.tabButton} ${activeTab === 'enhance' ? heroStyles.activeTab : ''}`}
              onClick={() => setActiveTab('enhance')}
            >
              <span className={heroStyles.tabIcon}>✨</span>
              Enhance & Restore
            </button>
            <button
              className={`${heroStyles.tabButton} ${activeTab === 'create' ? heroStyles.activeTab : ''}`}
              onClick={() => setActiveTab('create')}
            >
              <span className={heroStyles.tabIcon}>🎨</span>
              Create & Transform
            </button>
          </div>

          {/* AI Services Grid with Sliders */}
          <div className={heroStyles.servicesContainer}>
            <h2 className={heroStyles.servicesTitle}>
              {currentTab.title}
            </h2>
            <p className={heroStyles.servicesSubtitle}>
              {currentTab.subtitle}
            </p>
            
            <div className={heroStyles.servicesGrid}>
              {currentTab.features.map((feature) => (
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