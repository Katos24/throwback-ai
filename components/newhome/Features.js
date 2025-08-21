import React, { useState } from 'react';
import Link from 'next/link';
import ImageCompareSlider from "../ImageCompareSlider";
import styles from './Features.module.css';

const Features = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', title: 'All Features' },
    { id: 'restore', title: 'Restoration' },
    { id: 'enhance', title: 'Enhancement' }
  ];

  const features = [
    {
      id: 'restore',
      title: "Photo Restoration",
      shortTitle: "Restore Damaged Photos",
      description: "Bring damaged vintage photos back to life with AI-powered restoration that repairs scratches, tears, and fading.",
      beforeAfter: {
        before: "/images/basicpage-before.jpg",
        after: "/images/basicpage-after.jpg"
      },
      link: "/replicate/restore-basic",
      color: "emerald",
      category: "restore"
    },
    {
      id: 'colorize',
      title: "AI Colorization", 
      shortTitle: "Colorize Black & White Photos",
      description: "Transform black & white photos into vibrant, lifelike colorized images with intelligent AI color prediction.",
      beforeAfter: {
        before: "/images/beforeexample.jpg",
        after: "/images/afterexample.jpg"
      },
      link: "/replicate/restore-premium",
      color: "orange",
      category: "enhance"
    },
    {
      id: 'cartoonify',
      title: "90s Cartoon Style",
      shortTitle: "Create Cartoon Portraits",
      description: "Transform your photos into nostalgic 90s cartoon style portraits with distinctive artistic flair.",
      beforeAfter: {
        before: "/images/cartoon-before.jpg",
        after: "/images/cartoon-example.jpg"
      },
      link: "/replicate/cartoon",
      color: "purple",
      category: "enhance"
    }
  ];

  const filteredFeatures = activeCategory === 'all' 
    ? features 
    : features.filter(feature => feature.category === activeCategory);

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.sparkle}>✨</span>
            Powerful AI Features
          </div>
          <h2 className={styles.title}>
            The features you need, the simplicity you want
          </h2>
          <p className={styles.subtitle}>
            Choose from our suite of AI-powered tools designed to enhance,
            restore, and creatively transform your precious memories.
          </p>
        </div>

        <div className={styles.mainContent}>
          {/* Category Tabs */}
          <div className={styles.tabNav}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`${styles.tab} ${activeCategory === category.id ? styles.activeTab : ''}`}
              >
                <span className={styles.tabTitle}>{category.title}</span>
              </button>
            ))}
          </div>

          {/* Feature Cards Grid */}
          <div className={styles.featureGrid}>
            {filteredFeatures.map((feature) => (
              <div 
                key={feature.id} 
                className={`${styles.featureCard} ${styles[feature.color]}`}
              >
                {/* Card Visual */}
                <div className={styles.cardVisual}>
                  <ImageCompareSlider
                    beforeImage={feature.beforeAfter.before}
                    afterImage={feature.beforeAfter.after}
                  />
                  <div className={styles.cardGradient}></div>
                </div>

                {/* Card Content */}
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h3 className={styles.cardTitle}>{feature.shortTitle}</h3>
                      <p className={styles.cardDescription}>{feature.description}</p>
                    </div>
                  </div>

                  <div className={styles.cardActions}>
                    <Link href={feature.link} className={styles.tryButton}>
                      Try it
                      <span className={styles.arrow}>→</span>
                    </Link>
                    
                    <button 
                      className={styles.infoButton}
                      title={`Learn more about ${feature.title}`}
                    >
                      i
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;