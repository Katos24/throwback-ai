import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/TestHero.module.css';

export default function TestHeroSection() {
  const [activeTab, setActiveTab] = useState('restore');

  const features = [
    {
      id: 'restore',
      title: "Photo Restoration",
      shortTitle: "Restore",
      description: "Remove scratches, tears, and fading from your treasured family photos. Perfect for preserving irreplaceable memories.",
      beforeAfter: {
        before: "/images/basicpage-before.jpg",
        after: "/images/basicpage-after.jpg"
      },
      link: "/replicate/restore-basic",
      credits: 1,
      buttonText: "Restore (Try Free)",
      icon: "🔧"
    },
    {
      id: 'colorize',
      title: "AI Colorization", 
      shortTitle: "Colorize",
      description: "Transform black and white photos with historically accurate, beautiful colors. See your ancestors come alive like never before.",
      beforeAfter: {
        before: "/images/before6.jpg",
        after: "/images/after6.jpg"
      },
      link: "/replicate/restore-premium",
      credits: 40,
      buttonText: "Add Color",
      icon: "🎨"
    },
    {
      id: 'cartoonify',
      title: "Cartoon Creator",
      shortTitle: "Cartoon", 
      description: "Turn family photos into beautiful cartoon artwork. Perfect for gifts, social media, or creating unique family portraits.",
      beforeAfter: {
        before: "/images/cartoon-before.jpg",
        after: "/images/cartoon-example.jpg"
      },
      link: "/replicate/cartoon",
      credits: 40,
      buttonText: "Make Cartoon",
      icon: "🎭"
    },
    {
      id: 'avatar90s',
      title: "90s Avatar Creator",
      shortTitle: "90s Avatar",
      description: "Transform your photos into authentic 90s-style avatars with retro filters, neon effects, and nostalgic vibes.",
      beforeAfter: {
        before: "/images/avatar90s-before.jpg",
        after: "/images/avatar90s-after.jpg"
      },
      link: "/replicate/avatar",
      credits: 35,
      buttonText: "Go Retro",
      icon: "📼"
    },
    {
      id: 'yearbook90s',
      title: "90s Yearbook Style",
      shortTitle: "Yearbook",
      description: "Create classic 90s yearbook-style portraits with authentic backgrounds, lighting, and that unmistakable retro charm.",
      beforeAfter: {
        before: "/images/yearbook90s-before.jpg",
        after: "/images/yearbook90s-after.jpg"
      },
      link: "/replicate/yearbook",
      credits: 20,
      buttonText: "Make Yearbook",
      icon: "📚"
    }
  ];

  const activeFeature = features.find(f => f.id === activeTab);

  return (
    <section className={styles.hero}>
      {/* Background Elements */}
      <div className={styles.backgroundGrid}></div>
      <div className={styles.gradientOrb}></div>
      
      <div className={styles.heroContainer}>
        {/* Main Header */}
        <div className={styles.heroHeader}>
          <h1 className={styles.heroTitle}>
            Transform Your Precious
            <span className={styles.titleBreak}></span>
            <span className={styles.gradient}>Memories</span>
          </h1>
          
          <p className={styles.heroSubtitle}>
            Choose from 5 amazing AI transformations to bring your photos to life
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={styles.tabContainer}>
          <div className={styles.tabNav}>
            {features.map((feature) => (
              <button
                key={feature.id}
                className={`${styles.tab} ${activeTab === feature.id ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(feature.id)}
              >
                <span className={styles.tabIcon}>{feature.icon}</span>
                <span className={styles.tabText}>{feature.shortTitle}</span>
                {activeTab === feature.id && <div className={styles.tabIndicator}></div>}
              </button>
            ))}
          </div>

          {/* Active Feature Content */}
          <div className={styles.tabContent}>
            <div className={styles.contentGrid}>
              {/* Image Demo */}
              <div className={styles.imageDemo}>
                <div className={styles.beforeAfter}>
                  <div className={styles.imageContainer}>
                    <img 
                      src={activeFeature.beforeAfter.before} 
                      alt="Before transformation"
                      className={styles.beforeImage}
                    />
                    <div className={styles.imageLabel}>Before</div>
                  </div>
                  <div className={styles.arrowContainer}>
                    <div className={styles.transformArrow}>→</div>
                  </div>
                  <div className={styles.imageContainer}>
                    <img 
                      src={activeFeature.beforeAfter.after} 
                      alt="After transformation"
                      className={styles.afterImage}
                    />
                    <div className={styles.imageLabel}>After</div>
                  </div>
                </div>
              </div>

              {/* Feature Info */}
              <div className={styles.featureInfo}>
                <h3 className={styles.featureTitle}>{activeFeature.title}</h3>
                <p className={styles.featureDesc}>{activeFeature.description}</p>
                
                <Link href={activeFeature.link} className={styles.actionButton}>
                  <span className={styles.buttonText}>{activeFeature.buttonText}</span>
                  <div className={styles.creditCost}>
                    <span className={styles.costNumber}>{activeFeature.credits}</span>
                    <span className={styles.costLabel}>
                      {activeFeature.credits === 1 ? 'Credit' : 'Credits'}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <div className={styles.statNumber}>50K+</div>
            <div className={styles.statLabel}>Photos Transformed</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>2.3s</div>
            <div className={styles.statLabel}>Average Process Time</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>98%</div>
            <div className={styles.statLabel}>Satisfaction Rate</div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={styles.bottomCTA}>
          <div className={styles.creditOffer}>
            <div className={styles.offerIcon}>⚡</div>
            <div className={styles.offerText}>
              <strong>Start Free Right Now</strong>
              <span className={styles.offerDetails}>
                <Link href="/signup" className={styles.ctaLink}>Get 5 Free Credits</Link> • No card required
              </span>
            </div>
          </div>
          
          <div className={styles.securityBadges}>
            <div className={styles.securityBadge}>
              <span className={styles.checkmark}>✓</span>
              <span>100% Private</span>
            </div>
            <div className={styles.securityBadge}>
              <span className={styles.checkmark}>✓</span>
              <span>Auto-Delete After 1hr</span>
            </div>
            <div className={styles.securityBadge}>
              <span className={styles.checkmark}>✓</span>
              <span>Instant Results</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}