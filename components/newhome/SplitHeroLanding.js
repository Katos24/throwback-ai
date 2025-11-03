import React, { useCallback, useState, useEffect } from 'react';
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
    image: '/images/restorehero.jpg',
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
    image: '/images/home/avatar_bounty_hunter.png',
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
    image: '/images/home/decade_70s.png',
    price: '50 credits',
    time: '45 sec',
    features: ['Disco', 'Neon', 'Grunge'],
  }
];

const SimpleToolCard = ({ tool, onNavigate }) => (
  <div className={styles.simpleCard} onClick={() => onNavigate(tool.link, tool.id)}>
    <div className={styles.badge}>{tool.badge}</div>

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

      <div className={styles.quickFeatures}>
        {tool.features.map((feature, idx) => (
          <span key={idx} className={styles.featureTag}>{feature}</span>
        ))}
      </div>

      <div className={styles.cardMeta}>
        <span className={styles.price}>{tool.price}</span>
        <span className={styles.time}>⚡ {tool.time}</span>
      </div>

      <button className={styles.cardButton}>Try Now →</button>
    </div>
  </div>
);

export default function SplitHeroLanding() {
  const router = useRouter();
  const [stats, setStats] = useState({ total: 0 });
  const [displayCount, setDisplayCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleNavigation = useCallback((href, toolId) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'tool_click', { tool: toolId });
    }
    router.push(href);
  }, [router]);

  // Fetch restoration stats
  useEffect(() => {
    fetchStats();
  }, []);

  // Count-up animation
  useEffect(() => {
    if (isLoaded && displayCount < stats.total) {
      const timer = setTimeout(() => {
        setDisplayCount(prev =>
          Math.min(prev + Math.ceil((stats.total - prev) / 10), stats.total)
        );
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [displayCount, stats.total, isLoaded]);

  async function fetchStats() {
    try {
      const response = await fetch('/api/stats/restoration-count');
      const data = await response.json();
      setStats(data);
      setIsLoaded(true);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setIsLoaded(false);
    }
  }

  return (
    <section className={styles.toolsSection}>
      <div className={styles.container}>

        {/* 🔥 Hero Header */}
        <div className={styles.heroHeader}>
          <h1 className={styles.title}>Transform Your Photos with AI</h1>
          <p className={styles.subtitle}>
            Restore old memories, create unique avatars, or travel back in time with vintage styles
          </p>
        </div>

     
        {/* 🧰 Tools Grid */}
        <div className={styles.cardsGrid}>
          {TOOLS.map((tool) => (
            <SimpleToolCard key={tool.id} tool={tool} onNavigate={handleNavigation} />
          ))}
        </div>

{/* ⚖️ Quick Comparison */}
{/*
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
*/}


           {/* 🧮 Trust Bar with Stats */}
        <div className={styles.trustBar}>
          {isLoaded && displayCount > 0 ? (
            <div className={styles.trustItem}>
              <span className={styles.trustNumber}>
                {displayCount.toLocaleString()}+
              </span>
              <span className={styles.trustLabel}>Photos Transformed</span>
            </div>
          ) : (
            <div className={styles.trustItem}>
              <span className={styles.trustNumber}>✨</span>
              <span className={styles.trustLabel}>Transforming Photos Daily</span>
            </div>
          )}
          <div className={styles.trustItem}>
            <span className={styles.trustNumber}>4.8★</span>
            <span className={styles.trustLabel}>User Rating</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustNumber}>1 Hour</span>
            <span className={styles.trustLabel}>Auto-Delete</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustNumber}>No</span>
            <span className={styles.trustLabel}>Subscriptions</span>
          </div>
          
        </div>


     

        {/* 🟦 CTA */}
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
