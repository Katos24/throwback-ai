import React, { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './SplitHeroLanding.module.css';

const TOOLS = [

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

const MetricCard = ({ label, ourValue, ourLabel, gptLabel, icon }) => (
  <div className={styles.metricCard}>
    <div className={styles.metricHeader}>
      <span className={styles.metricIcon}>{icon}</span>
      <span className={styles.metricLabel}>{label}</span>
    </div>
    <div className={styles.metricComparison}>
      <div className={styles.metricOurs}>
        <div className={styles.metricTitle}>Our App</div>
        <div className={styles.metricValue}>{ourLabel}</div>
      </div>
      <div className={styles.metricVs}>vs</div>
      <div className={styles.metricTheirs}>
        <div className={styles.metricTitle}>ChatGPT</div>
        <div className={styles.metricValue}>{gptLabel}</div>
      </div>
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

        {/* 🎯 HERO - Lead with Differentiator */}
        <div className={styles.heroSection}>
          <div className={styles.heroContent}>
            
            {/* Problem Statement */}
            <div className={styles.problemStatement}>
              <span className={styles.problemBadge}>❌ Stop Using ChatGPT</span>
            </div>

            {/* Main Headline - Differentiator */}
            <h1 className={styles.heroTitle}>
              Get <span className={styles.heroAccent}>10x Better Results</span> in Seconds
            </h1>
            
            <p className={styles.heroSubtitle}>
              Purpose-built AI for photos. Faster than ChatGPT. Better quality. No subscription required.
            </p>
            
            {/* BEFORE/AFTER PROOF - Show restoration example */}
            <div className={styles.heroProof}>
              <div className={styles.proofImageWrapper}>
                <Image
                  src="/images/restorehero.jpg"
                  alt="Before and after photo restoration - dramatically improved quality"
                  width={900}
                  height={500}
                  className={styles.proofImage}
                  priority
                />
                <div className={styles.proofBadge}>
                  <span className={styles.proofIcon}>⚡</span>
                  <span>5-60 seconds</span>
                </div>
              </div>
            </div>

            {/* Primary CTA - Guide to starting point */}
            <div className={styles.heroCTA}>
              <button 
                className={styles.primaryButton}
                onClick={() => handleNavigation('/replicate/restore-premium', 'hero-cta')}
              >
                Try Photo Restoration — 1 Credit
              </button>
              <p className={styles.ctaSubtext}>
                <span className={styles.alsoAvailable}>Also available:</span> AI Avatars • Vintage Yearbook
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className={styles.heroStats}>
            {isLoaded && displayCount > 0 ? (
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{displayCount.toLocaleString()}+</span>
                <span className={styles.statLabel}>Photos Restored</span>
              </div>
            ) : (
              <div className={styles.statItem}>
                <span className={styles.statNumber}>✨</span>
                <span className={styles.statLabel}>Daily Restorations</span>
              </div>
            )}
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>4.8★</span>
              <span className={styles.statLabel}>User Rating</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>5-60s</span>
              <span className={styles.statLabel}>Fast Results</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>$0</span>
              <span className={styles.statLabel}>Subscriptions</span>
            </div>
          </div>
        </div>

        {/* 📊 Why We're Better */}
        <div className={styles.comparisonSection}>
          <h3 className={styles.comparisonTitle}>
            Why <span className={styles.titleAccent}>We Beat ChatGPT</span>
          </h3>
          
          <div className={styles.metricsGrid}>
            <MetricCard 
              label="Processing Speed"
              ourLabel="5-60s"
              gptLabel="2-5m"
              icon="⚡"
            />
            <MetricCard 
              label="Quality Score"
              ourLabel="9.2/10"
              gptLabel="6/10"
              icon="✨"
            />
          </div>

          <div className={styles.comparisonFooter}>
            <div className={styles.footerItem}>
              <span className={styles.footerIcon}>💰</span>
              <span className={styles.footerText}>Pay-per-use vs $20/mo</span>
            </div>
            <div className={styles.footerItem}>
              <span className={styles.footerIcon}>🎯</span>
              <span className={styles.footerText}>Purpose-built vs general</span>
            </div>
            <div className={styles.footerItem}>
              <span className={styles.footerIcon}>🔒</span>
              <span className={styles.footerText}>Auto-delete in 1 hour</span>
            </div>
          </div>
        </div>

        {/* 🧰 All Tools */}
        <div className={styles.allToolsSection}>
          <h2 className={styles.sectionTitle}>Choose Your Transformation</h2>
          <p className={styles.sectionSubtitle}>
            Premium AI tools purpose-built for photo editing
          </p>
          
          <div className={styles.cardsGrid}>
            {TOOLS.map((tool) => (
              <SimpleToolCard key={tool.id} tool={tool} onNavigate={handleNavigation} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}