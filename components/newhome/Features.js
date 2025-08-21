import React, { useState } from 'react';
import Link from 'next/link';
import ImageCompareSlider from "../../components/ImageCompareSlider";
import styles from './Features.module.css';

const Features = () => {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      id: 'restore',
      title: "Photo Restoration",
      shortTitle: "Restore",
      description: "Bring damaged vintage photos back to life with AI-powered restoration",
      beforeAfter: {
        before: "/images/restore-before.jpg",
        after: "/images/restore-after.jpg"
      },
      link: "/replicate/restore",
      color: "emerald"
    },
    {
      id: 'colorize',
      title: "AI Colorization", 
      shortTitle: "Colorize",
      description: "Transform black & white photos into vibrant, lifelike colorized images",
      beforeAfter: {
        before: "/images/colorize-before.jpg",
        after: "/images/colorize-after.jpg"
      },
      link: "/replicate/restore-premium",
      color: "orange"
    },
    {
      id: 'cartoonify',
      title: "90s Cartoon Style",
      shortTitle: "Cartoonify", 
      description: "Transform your photos into nostalgic 90s cartoon-style portraits",
      beforeAfter: {
        before: "/images/cartoon-before.jpg", 
        after: "/images/cartoon-after.jpg"
      },
      link: "/replicate/cartoon",
      color: "purple"
    }
  ];

  const currentFeature = features[activeTab];

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.sparkle}>✨</span>
            Powerful AI Features
          </div>
          <h2 className={styles.title}>
            Transform Your Photos with Advanced AI
          </h2>
          <p className={styles.subtitle}>
            Choose from our suite of AI-powered tools designed to enhance, 
            restore, and creatively transform your precious memories.
          </p>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.tabNav}>
            {features.map((feature, index) => (
              <button
                key={feature.id}
                onClick={() => setActiveTab(index)}
                className={`${styles.tab} ${activeTab === index ? styles.activeTab : ''} ${styles[`tab${feature.color}`]}`}
              >
                <div className={styles.tabIcon}>
                  {feature.shortTitle === 'Restore' && '🔧'}
                  {feature.shortTitle === 'Colorize' && '🎨'}
                  {feature.shortTitle === 'Cartoonify' && '🎭'}
                </div>
                <div className={styles.tabContent}>
                  <h3 className={styles.tabTitle}>{feature.shortTitle}</h3>
                  <p className={styles.tabDescription}>{feature.description}</p>
                </div>
              </button>
            ))}
          </div>

          <div className={styles.featureContent}>
            <div className={styles.visualShowcase}>
              <ImageCompareSlider 
                beforeImage={currentFeature.beforeAfter.before}
                afterImage={currentFeature.beforeAfter.after}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;