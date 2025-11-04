import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './SplitHeroLanding.module.css';

const TOOLS = [
  {
    id: 'restore',
    badge: '🔥 Most Popular',
    title: 'Photo Restoration',
    tagline: 'Fix damaged & faded photos',
    link: '/replicate/restore-premium',
    image: '/images/restore-card.jpg', // Static before/after split image
    price: 'From 1 credit',
    time: '30-90 sec',
    features: ['Remove damage', 'Add color', 'Enhance clarity'],
  },
  {
    id: 'avatar',
    badge: '✨ Creative',
    title: 'AI Avatars',
    tagline: '50+ artistic styles',
    link: '/replicate/avatar',
    image: '/images/avatar-card.jpg',
    price: '50 credits',
    time: '45 sec',
    features: ['Fantasy', 'Sci-fi', 'Professional'],
  },
  {
    id: 'decades',
    badge: '📸 Retro',
    title: 'Vintage Yearbook',
    tagline: '70s, 80s, 90s, Y2K styles',
    link: '/decades',
    image: '/images/decades-card.jpg',
    price: '50 credits',
    time: '45 sec',
    features: ['Disco', 'Neon', 'Grunge'],
  }
];

const SimpleToolCard = ({ tool, onNavigate }) => (
  <div 
    className={styles.simpleCard} 
    onClick={() => onNavigate(tool.link, tool.id)}
  >
    <div className={styles.badge}>{tool.badge}</div>
    
    {/* Static Image - NO INTERACTION */}
    <div className={styles.cardImage}>
      <Image
        src={tool.image}
        alt={tool.title}
        fill
        className={styles.image}
        sizes="(max-width: 768px) 100vw, 400px"
      />
    </div>

    <div className={styles.cardContent}>
      <h3 className={styles.cardTitle}>{tool.title}</h3>
      <p className={styles.cardTagline}>{tool.tagline}</p>

      {/* Quick Features - 3 max */}
      <div className={styles.quickFeatures}>
        {tool.features.map((feature, idx) => (
          <span key={idx} className={styles.featureTag}>
            {feature}
          </span>
        ))}
      </div>

      {/* Price & Time - CLEAR */}
      <div className={styles.cardMeta}>
        <span className={styles.price}>{tool.price}</span>
        <span className={styles.time}>⚡ {tool.time}</span>
      </div>

      <button className={styles.cardButton}>
        Try Now →
      </button>
    </div>
  </div>
);

export default function SplitHeroLanding() {
  const router = useRouter();
  
  const handleNavigation = useCallback((href, toolId) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'tool_click', { tool: toolId });
    }
    router.push(href);
  }, [router]);

  return (
    <section className={styles.toolsSection}>
      <div className={styles.container}>
        
        {/* Simple Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Choose Your Tool</h2>
          <p className={styles.subtitle}>
            Each tool is optimized for specific transformations
          </p>
        </div>

        {/* 3 Cards - SIMPLE */}
        <div className={styles.cardsGrid}>
          {TOOLS.map((tool) => (
            <SimpleToolCard
              key={tool.id}
              tool={tool}
              onNavigate={handleNavigation}
            />
          ))}
        </div>

        {/* Quick Comparison - SCANNABLE */}
        <div className={styles.quickCompare}>
          <div className={styles.compareItem}>
            <span className={styles.compareLabel}>Restoration</span>
            <span className={styles.compareValue}>Old/damaged photos</span>
          </div>
          <div className={styles.compareItem}>
            <span className={styles.compareLabel}>Avatars</span>
            <span className={styles.compareValue}>Profile pictures</span>
          </div>
          <div className={styles.compareItem}>
            <span className={styles.compareLabel}>Decades</span>
            <span className={styles.compareValue}>Retro aesthetics</span>
          </div>
        </div>

        {/* Single CTA for confused users */}
        <div className={styles.defaultChoice}>
          <p>Not sure? Start with <strong>Photo Restoration</strong> - only 1 credit to try.</p>
          <button 
            className={styles.defaultButton}
            onClick={() => handleNavigation('/replicate/restore-premium', 'default')}
          >
            Start with Restoration →
          </button>
        </div>

      </div>
    </section>
  );
}