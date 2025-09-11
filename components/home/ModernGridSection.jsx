"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/ModernGrid.module.css';

export default function ModernGridSection() {
  const [activeCategory, setActiveCategory] = useState('restore');

  const categories = [
    { id: 'restore', label: 'Photo Restore', icon: '🔧' },
    { id: 'enhance', label: 'Enhance', icon: '✨' },
    { id: 'decades', label: 'Decades', icon: '⏰' },
    { id: 'creative', label: 'Creative', icon: '🎨' },
    { id: 'professional', label: 'Professional', icon: '👔' },
    { id: 'all', label: 'All AI tools', icon: '🤖' }
  ];

  const allFeatures = {
    restore: [
      {
        id: 1,
        title: "Restore Old Photos",
        description: "Repair scratches, tears, and fading",
        icon: "🔧",
        link: "/restore",
        gradientClass: styles.gradient1,
        patternClass: styles.pattern1,
        illustration: (
          <div className={styles.photoRestore}>
            <div className={`${styles.oldPhoto} ${styles.illustrationElement}`}></div>
            <div className={`${styles.newPhoto} ${styles.illustrationElement}`}></div>
          </div>
        )
      },
      {
        id: 2,
        title: "Colorize B&W Photos",
        description: "Add historically accurate colors",
        icon: "🎨",
        link: "/colorize",
        gradientClass: styles.gradient2,
        patternClass: styles.pattern2,
        illustration: (
          <div className={styles.colorize}>
            <div className={`${styles.bwPhoto} ${styles.illustrationElement}`}></div>
            <div className={`${styles.colorDot1} ${styles.illustrationElement}`}></div>
            <div className={`${styles.colorDot2} ${styles.illustrationElement}`}></div>
            <div className={`${styles.colorDot3} ${styles.illustrationElement}`}></div>
          </div>
        )
      }
    ],
    enhance: [
      {
        id: 3,
        title: "Upscale Quality",
        description: "Increase resolution and clarity",
        icon: "📈",
        link: "/upscale",
        gradientClass: styles.gradient3,
        patternClass: styles.pattern3,
        illustration: (
          <div className={styles.upscale}>
            <div className={`${styles.lowRes} ${styles.illustrationElement}`}></div>
            <div className={`${styles.highRes} ${styles.illustrationElement}`}></div>
          </div>
        )
      },
      {
        id: 4,
        title: "Remove Background",
        description: "Clean background removal",
        icon: "✂️",
        link: "/remove-bg",
        gradientClass: styles.gradient4,
        patternClass: styles.pattern4,
        illustration: (
          <div className={styles.removeBg}>
            <div className={`${styles.subject} ${styles.illustrationElement}`}></div>
            <div className={`${styles.background} ${styles.illustrationElement}`}></div>
          </div>
        )
      }
    ],
    decades: [
      {
        id: 5,
        title: "60s Style Photos",
        description: "Groovy retro transformations",
        icon: "✌️",
        link: "/60s",
        gradientClass: styles.gradient4,
        patternClass: styles.pattern4,
        illustration: (
          <div className={styles.sixties}>
            <div className={`${styles.sixtiesCircle} ${styles.illustrationElement}`}></div>
            <div className={`${styles.sixtiesFlower} ${styles.illustrationElement}`}></div>
            <div className={`${styles.sixtiesDot} ${styles.illustrationElement}`}></div>
          </div>
        )
      },
      {
        id: 6,
        title: "80s Neon Style",
        description: "Radical retro aesthetics",
        icon: "⚡",
        link: "/80s",
        gradientClass: styles.gradient5,
        patternClass: styles.pattern5,
        illustration: (
          <div className={styles.eighties}>
            <div className={`${styles.eightiesMain} ${styles.illustrationElement}`}></div>
            <div className={`${styles.eightiesLine1} ${styles.illustrationElement}`}></div>
            <div className={`${styles.eightiesLine2} ${styles.illustrationElement}`}></div>
          </div>
        )
      },
      {
        id: 7,
        title: "90s Grunge",
        description: "Classic 90s aesthetic",
        icon: "🎸",
        link: "/90s",
        gradientClass: styles.gradient6,
        patternClass: styles.pattern6,
        illustration: (
          <div className={styles.nineties}>
            <div className={`${styles.grungeShape} ${styles.illustrationElement}`}></div>
            <div className={`${styles.grungeAccent} ${styles.illustrationElement}`}></div>
          </div>
        )
      }
    ],
    creative: [
      {
        id: 8,
        title: "Create Cartoon Art",
        description: "Transform into stunning illustrations",
        icon: "🎭",
        link: "/cartoon",
        gradientClass: styles.gradient3,
        patternClass: styles.pattern3,
        illustration: (
          <div className={styles.cartoon}>
            <div className={`${styles.cartoonFace} ${styles.illustrationElement}`}></div>
            <div className={`${styles.cartoonEye1} ${styles.illustrationElement}`}></div>
            <div className={`${styles.cartoonEye2} ${styles.illustrationElement}`}></div>
            <div className={`${styles.cartoonMouth} ${styles.illustrationElement}`}></div>
          </div>
        )
      },
      {
        id: 9,
        title: "Anime Style",
        description: "Transform into anime character",
        icon: "🌸",
        link: "/anime",
        gradientClass: styles.gradient2,
        patternClass: styles.pattern2,
        illustration: (
          <div className={styles.anime}>
            <div className={`${styles.animeHair} ${styles.illustrationElement}`}></div>
            <div className={`${styles.animeFace} ${styles.illustrationElement}`}></div>
          </div>
        )
      }
    ],
    professional: [
      {
        id: 10,
        title: "Professional Headshots",
        description: "LinkedIn-ready portraits",
        icon: "👔",
        link: "/headshots",
        gradientClass: styles.gradient6,
        patternClass: styles.pattern6,
        illustration: (
          <div className={styles.headshot}>
            <div className={`${styles.suit} ${styles.illustrationElement}`}></div>
            <div className={`${styles.face} ${styles.illustrationElement}`}></div>
            <div className={`${styles.tie} ${styles.illustrationElement}`}></div>
          </div>
        )
      },
      {
        id: 11,
        title: "Corporate Style",
        description: "Business professional look",
        icon: "💼",
        link: "/corporate",
        gradientClass: styles.gradient1,
        patternClass: styles.pattern1,
        illustration: (
          <div className={styles.corporate}>
            <div className={`${styles.corpSuit} ${styles.illustrationElement}`}></div>
            <div className={`${styles.corpTie} ${styles.illustrationElement}`}></div>
          </div>
        )
      }
    ]
  };

  // Get all features for "All AI tools"
  const getAllFeatures = () => {
    return Object.values(allFeatures).flat();
  };

  const getActiveFeatures = () => {
    if (activeCategory === 'all') {
      return getAllFeatures();
    }
    return allFeatures[activeCategory] || [];
  };

  const activeFeatures = getActiveFeatures();

  return (
    <section className={styles.gridSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.headerContent}>
              <h2>The features you need, the simplicity you want</h2>
              <p>Transform any photo with powerful AI tools designed for everyone</p>
            </div>
            <button className={styles.ctaButton}>
              How to start with AI
            </button>
          </div>
        </div>

        {/* Main Content with Sidebar */}
        <div className={styles.mainContent}>
          {/* Left Sidebar */}
          <div className={styles.sidebar}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${styles.categoryTab} ${activeCategory === category.id ? styles.active : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className={styles.categoryIcon}>{category.icon}</span>
                <span className={styles.categoryLabel}>{category.label}</span>
              </button>
            ))}
          </div>

          {/* Right Content Area */}
          <div className={styles.contentArea}>
            {/* Grid of Feature Cards */}
            <div className={styles.grid}>
              {activeFeatures.map((feature) => (
                <Link 
                  key={feature.id} 
                  href={feature.link}
                  className={`${styles.featureCard} ${feature.patternClass}`}
                >
                  <div className={`${styles.cardContent} ${feature.gradientClass}`}>
                    {/* Illustration */}
                    <div className={styles.illustration}>
                      {feature.illustration}
                    </div>
                    
                    {/* Content */}
                    <div className={styles.cardInfo}>
                      <div className={styles.cardHeader}>
                        <span className={styles.cardIcon}>{feature.icon}</span>
                        <h3 className={styles.cardTitle}>
                          {feature.title}
                        </h3>
                      </div>
                      <p className={styles.cardDescription}>
                        {feature.description}
                      </p>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className={styles.hoverOverlay}></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={styles.bottomCTA}>
          <button className={styles.mobileCTA}>
            How to start with AI
          </button>
        </div>
      </div>
    </section>
  );
}