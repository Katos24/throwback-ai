import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      title: "Restore",
      description: "Repair damaged vintage photos with AI",
      image: "/images/before-after-restore.jpg",
      link: "/replicate/restore-basic",
    },
    {
      title: "Colorize", 
      description: "Add vibrant colors to black & white photos",
      image: "/images/colorization-example.jpg",
      link: "/replicate/restore-premium",
    },
    {
      title: "Cartoonify",
      description: "Transform photos into 90s cartoon style",
      image: "/images/cartoon-example.jpg", 
      link: "/replicate/cartoon",
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        
        {/* Main Content */}
        <div className={styles.content}>
          <div className={styles.textSection}>
            <div className={styles.badge}>
              <span className={styles.sparkle}>✨</span>
              AI Photo Magic
            </div>
            
            <h1 className={styles.title}>
              <span className={styles.brand}>Throwback AI</span>
              <span className={styles.tagline}>
                Transform Your Photos with AI!
              </span>
            </h1>

            <p className={styles.description}>
              Restore damaged photos, add vibrant colors, or create cartoon-style portraits. 
              Professional results in seconds.
            </p>

            {/* Single Clean CTA */}
            <div className={styles.ctaSection}>
              <Link href={features[currentFeature].link}>
                <button className={styles.primaryButton}>
                  {features[currentFeature].title} Photos
                  <span className={styles.arrow}>→</span>
                </button>
              </Link>
              
              <p className={styles.ctaSubtext}>
                Try {features[currentFeature].description.toLowerCase()}
              </p>
            </div>

            {/* Feature Selection Tabs */}
            <div className={styles.featureTabs}>
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFeature(index)}
                  className={`${styles.featureTab} ${
                    index === currentFeature ? styles.activeTab : ''
                  }`}
                >
                  <span className={styles.tabTitle}>{feature.title}</span>
                  <span className={styles.tabDescription}>{feature.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Visual Section */}
          <div className={styles.visualSection}>
            <div className={styles.phoneFrame}>
              <div className={styles.imageContainer}>
                <img 
                  src={features[currentFeature].image} 
                  alt={features[currentFeature].title}
                  className={styles.featureImage}
                />
                <div className={styles.imageGlow}></div>
              </div>
              
              <div className={styles.featureLabel}>
                <span className={styles.labelText}>
                  {features[currentFeature].title}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className={styles.trustBar}>
          <div className={styles.trustItem}>
            <span className={styles.trustNumber}>500K+</span>
            <span className={styles.trustLabel}>Photos Enhanced</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustNumber}>4.9★</span>
            <span className={styles.trustLabel}>User Rating</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustNumber}>&lt; 30s</span>
            <span className={styles.trustLabel}>Processing Time</span>
          </div>
        </div>
      </div>

      {/* Subtle Background Animation */}
      <div className={styles.backgroundGradient}></div>
    </section>
  );
};

export default Hero;