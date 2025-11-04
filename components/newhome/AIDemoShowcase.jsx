import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './AIDemoShowcase.module.css';

const AIDemoShowcase = () => {
  const containerRef = useRef(null);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('restoration');
  const [stats, setStats] = useState({ total: 0 });

  // Fetch real restoration stats
  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/stats/restoration-count');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    }
    fetchStats();
  }, []);

  // Detect screen width and intersection visibility
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  // Auto-cycle between tabs every 10 seconds
  useEffect(() => {
    const tabs = ['restoration', 'avatars', 'decades'];
    let index = tabs.indexOf(activeTab);
    
    const interval = setInterval(() => {
      index = (index + 1) % tabs.length;
      setActiveTab(tabs[index]);
    }, 10000);

    return () => clearInterval(interval);
  }, [activeTab]);

  const handleTabClick = (tabName) => setActiveTab(tabName);

  const tabs = [
    {
      id: 'restoration',
      icon: '🔧',
      label: 'Restoration',
      price: 'From 1 credit',
      beforeImage: '/images/before6.jpg',
      afterImage: '/images/after6.jpg',
      steps: [
        'Analyzing damage patterns...',
        'Removing scratches & tears...',
        'Restoring faded colors...',
        'Enhancing photo clarity...'
      ],
      stat1: '5-60s',
      stat1Label: 'Process Time',
      stat2: stats.total > 0 ? `${(stats.total / 1000).toFixed(0)}K+` : '50K+',
      stat2Label: 'Photos Restored',
      tags: ['Scratches', 'Tears', 'Fading', 'Clarity'],
      title: 'Restore Old Photos',
      description: 'Bring damaged and faded family photos back to life with AI.',
      link: '/replicate/restore-premium'
    },
    {
      id: 'avatars',
      icon: '🧑‍🎨',
      label: 'Avatars',
      price: '50 credits',
      beforeImage: '/images/avatarcards/female-example.jpg',
      afterImage: '/images/avatarcards/historical-ancient-egyptian-pharaoh-female.jpg',
      steps: [
        'Detecting facial landmarks...',
        'Applying AI art filters...',
        'Rendering avatar variations...',
        'Finalizing portrait style...'
      ],
      stat1: '45s',
      stat1Label: 'Process Time',
      stat2: '50+',
      stat2Label: 'Style Options',
      tags: ['Fantasy', 'Sci-Fi', 'Cartoon', 'Professional'],
      title: 'Create AI Avatars',
      description: 'Transform your photo into stunning AI-generated avatars.',
      link: '/replicate/avatar'
    },
    {
      id: 'decades',
      icon: '📸',
      label: 'Decades',
      price: '50 credits',
      beforeImage: '/images/decades/maleexample.png',
      afterImage: '/images/decades/80s-styles/male/synthwave.jpg',
      steps: [
        'Analyzing photo lighting...',
        'Applying vintage filter...',
        'Adjusting grain & vignette...',
        'Finalizing retro look...'
      ],
      stat1: '45s',
      stat1Label: 'Process Time',
      stat2: '4',
      stat2Label: 'Decade Styles',
      tags: ['70s', '80s', '90s', '2000s'],
      title: 'Vintage Yearbook',
      description: 'Travel back in time with authentic decade-style portraits.',
      link: '/decades'
    }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <div ref={containerRef} className={`${styles.showcase} ${isVisible ? styles.visible : ''}`}>
      
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.badge}>
          <span className={styles.badgeDot}></span>
          <span>AI TRANSFORMATIONS</span>
        </div>
        <h2 className={styles.title}>
          See <span className={styles.titleAccent}>AI Magic</span> in Action
        </h2>
        <p className={styles.subtitle}>
          Watch how our AI transforms photos in real-time. Switch between tools to explore different styles.
        </p>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            <span className={styles.tabIcon}>{tab.icon}</span>
            <div className={styles.tabContent}>
              <span className={styles.tabLabel}>{tab.label}</span>
              <span className={styles.tabPrice}>{tab.price}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Demo Content */}
      <div className={styles.demoWrapper}>
        
        {/* Left: Animation */}
        <div className={styles.animationSection}>
          <div className={styles.imageFrame}>
            {/* Before Image */}
            <Image
              src={currentTab.beforeImage}
              alt={`Before ${currentTab.label}`}
              fill
              className={styles.beforeImage}
              sizes="(max-width: 768px) 100vw, 600px"
            />

            {/* After Image (reveals with animation) */}
            <div className={styles.afterLayer}>
              <Image
                src={currentTab.afterImage}
                alt={`After ${currentTab.label}`}
                fill
                className={styles.afterImage}
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>

            {/* Animated Wave */}
            <div className={styles.revealWave}></div>

            {/* Processing Steps */}
            <div className={styles.processingOverlay}>
              <div className={styles.processingSteps}>
                {currentTab.steps.map((step, idx) => (
                  <div key={idx} className={styles.processingStep}>
                    <span className={styles.stepDot}></span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className={styles.progressSection}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill}></div>
            </div>
            <span className={styles.progressText}>Processing... 87%</span>
          </div>
        </div>

        {/* Right: Stats & CTA */}
        <div className={styles.infoSection}>
          
          {/* Stats */}
          <div className={styles.statsPanel}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>{currentTab.stat1}</div>
              <div className={styles.statLabel}>{currentTab.stat1Label}</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>{currentTab.stat2}</div>
              <div className={styles.statLabel}>{currentTab.stat2Label}</div>
            </div>
          </div>

          {/* Tags */}
          <div className={styles.tags}>
            {currentTab.tags.map((tag, idx) => (
              <span key={idx} className={styles.tag}>{tag}</span>
            ))}
          </div>

          {/* Description */}
          <div className={styles.description}>
            <h3 className={styles.descriptionTitle}>{currentTab.title}</h3>
            <p className={styles.descriptionText}>{currentTab.description}</p>
          </div>

          {/* CTA */}
          <button
            className={styles.ctaButton}
            onClick={() => router.push(currentTab.link)}
          >
            Try {currentTab.label} Now →
          </button>
        </div>

      </div>

    </div>
  );
};

export default AIDemoShowcase;