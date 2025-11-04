import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  const router = useRouter();
  const [stats, setStats] = useState({ total: 0, basic: 0, premium: 0 });
  const [displayCount, setDisplayCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch restoration count
  useEffect(() => {
    fetchStats();
  }, []);

  // Animated count-up effect
  useEffect(() => {
    if (isLoaded && displayCount < stats.total) {
      const timer = setTimeout(() => {
        setDisplayCount(prev => Math.min(prev + Math.ceil((stats.total - prev) / 10), stats.total));
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
    <section className={styles.hero}>
      <div className={styles.container}>
        
        {/* Main Heading */}
        <div className={styles.header}>
          <h1 className={styles.title}>
            Transform Your Photos with AI
          </h1>
          <p className={styles.subtitle}>
            Restore old memories, create unique avatars, or travel back in time with vintage styles
          </p>
        </div>

        {/* Tool Cards Grid */}
        <div className={styles.toolsGrid}>
          
          {/* Restore Card */}
          <div 
            className={styles.toolCard}
            onClick={() => router.push('/replicate/restore-premium')}
          >
            <div className={styles.cardImageWrapper}>
              <Image
                src="/images/restorehero.jpg"
                alt="Photo Restoration"
                fill
                className={styles.cardImage}
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className={styles.cardBadge}>Most Popular</div>
            </div>
            
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Photo Restoration</h3>
              <p className={styles.cardDescription}>
                Fix damaged photos, add color to black & white, enhance clarity
              </p>
              
              <div className={styles.cardFeatures}>
                <span className={styles.cardFeature}>✨ Remove scratches</span>
                <span className={styles.cardFeature}>🎨 Add color</span>
                <span className={styles.cardFeature}>✓ Enhance quality</span>
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.cardPrice}>From 1 credit</span>
                <button className={styles.cardButton}>
                  Start Restoring →
                </button>
              </div>
            </div>
          </div>

          {/* Avatar Card */}
          <div 
            className={styles.toolCard}
            onClick={() => router.push('/replicate/avatar')}
          >
            <div className={styles.cardImageWrapper}>
              <Image
                src="/images/home/avatar_bounty_hunter.png"
                alt="AI Avatars"
                fill
                className={styles.cardImage}
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className={`${styles.cardBadge} ${styles.badgeCreative}`}>Creative</div>
            </div>
            
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>AI Avatars</h3>
              <p className={styles.cardDescription}>
                Transform into fantasy characters, sci-fi heroes, or professional headshots
              </p>
              
              <div className={styles.cardFeatures}>
                <span className={styles.cardFeature}>🧙 Fantasy</span>
                <span className={styles.cardFeature}>🚀 Sci-fi</span>
                <span className={styles.cardFeature}>💼 Professional</span>
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.cardPrice}>50 credits</span>
                <button className={`${styles.cardButton} ${styles.buttonPurple}`}>
                  Create Avatar →
                </button>
              </div>
            </div>
          </div>

          {/* Decades Card */}
          <div 
            className={styles.toolCard}
            onClick={() => router.push('/decades')}
          >
            <div className={styles.cardImageWrapper}>
              <Image
                src="/images/home/decade_70s.png"
                alt="Vintage Decades"
                fill
                className={styles.cardImage}
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className={`${styles.cardBadge} ${styles.badgeTrending}`}>Trending</div>
            </div>
            
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Vintage Yearbook</h3>
              <p className={styles.cardDescription}>
                Travel back to the 70s, 80s, 90s, or 2000s with authentic yearbook photos
              </p>
              
              <div className={styles.cardFeatures}>
                <span className={styles.cardFeature}>📼 70s-90s</span>
                <span className={styles.cardFeature}>💿 Y2K</span>
                <span className={styles.cardFeature}>🎸 Retro</span>
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.cardPrice}>50 credits</span>
                <button className={`${styles.cardButton} ${styles.buttonPink}`}>
                  Try Decades →
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Trust Bar - Only show if stats loaded */}
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
            <span className={styles.trustNumber}>No</span>
            <span className={styles.trustLabel}>Subscriptions</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustNumber}>1 Hour</span>
            <span className={styles.trustLabel}>Auto-Delete</span>
          </div>
        </div>

      </div>
    </section>
  );
}