import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import suiteStyles from '../../styles/AISuite.module.css';

const AISuitePage = () => {
  const [activeDemo, setActiveDemo] = useState('restore');
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const aiSuites = [
    {
      id: 'restore',
      icon: '🔧',
      name: 'Photo Restoration',
      tagline: 'Repair & Enhance',
      description: 'Advanced AI repairs scratches, tears, fading, and damage in vintage family photos',
      beforeImage: '/images/damaged-snippet.jpg',
      afterImage: '/images/repaired-snippet.jpg',
      features: [
        'Remove scratches and tears',
        'Fix fading and discoloration', 
        'Restore missing details',
        'Enhance overall clarity'
      ],
      useCases: [
        'Family genealogy projects',
        'Vintage photo albums',
        'Historical preservation',
        'Memorial displays'
      ],
      credits: 1,
      processingTime: '30-60 seconds',
      link: '/replicate/restore-basic',
      accent: '#10b981'
    },
    {
      id: 'colorize',
      icon: '🌈',
      name: 'Photo Colorization',
      tagline: 'Add Life & Color',
      description: 'Transform black & white photos with historically accurate, vibrant colors',
      beforeImage: '/images/before6.jpg',
      afterImage: '/images/after6.jpg',
      features: [
        'Historically accurate colors',
        'Smart skin tone detection',
        'Period-appropriate palettes',
        'Natural color blending'
      ],
      useCases: [
        'Ancestor portraits',
        'Vintage family photos',
        'Historical documentation',
        'Art & creative projects'
      ],
      credits: 40,
      processingTime: '60-90 seconds',
      link: '/replicate/restore-premium',
      accent: '#3b82f6'
    },
    {
      id: 'cartoon',
      icon: '🎨',
      name: 'Cartoon Creator',
      tagline: 'Artistic Transformation',
      description: 'Convert photos into beautiful cartoon-style artwork perfect for modern use',
      beforeImage: '/images/cartoon-before.jpg',
      afterImage: '/images/cartoon-example.jpg',
      features: [
        'Professional cartoon style',
        'Maintains facial features',
        'Artistic color enhancement',
        'High-quality output'
      ],
      useCases: [
        'Social media avatars',
        'Custom family artwork',
        'Gift & decoration',
        'Creative projects'
      ],
      credits: 40,
      processingTime: '45-75 seconds',
      link: '/replicate/cartoon',
      accent: '#8b5cf6'
    }
  ];

  const currentSuite = aiSuites.find(suite => suite.id === activeDemo);

  return (
    <div className={suiteStyles.suitePage}>
      {/* Background Effects */}
      <div className={suiteStyles.backgroundGrid}></div>
      <div className={suiteStyles.floatingOrbs}>
        <div className={suiteStyles.orb1}></div>
        <div className={suiteStyles.orb2}></div>
        <div className={suiteStyles.orb3}></div>
      </div>

      <div ref={containerRef} className={`${suiteStyles.container} ${isVisible ? suiteStyles.visible : ''}`}>
        
        {/* Header Section */}
        <header className={suiteStyles.header}>
          <div className={suiteStyles.badge}>
            <span className={suiteStyles.badgeDot}></span>
            <span className={suiteStyles.badgeText}>AI SUITE</span>
          </div>
          
          <h1 className={suiteStyles.title}>
            Three Powerful AI Engines
            <span className={suiteStyles.titleGradient}>One Amazing Platform</span>
          </h1>
          
          <p className={suiteStyles.subtitle}>
            Choose the perfect AI transformation for your photos. Each engine is specially trained 
            for different types of enhancement and creative projects.
          </p>
        </header>

        {/* Suite Selection Tabs */}
        <div className={suiteStyles.suiteTabs}>
          {aiSuites.map((suite) => (
            <button
              key={suite.id}
              className={`${suiteStyles.suiteTab} ${activeDemo === suite.id ? suiteStyles.active : ''}`}
              onClick={() => setActiveDemo(suite.id)}
              style={{ '--accent': suite.accent }}
            >
              <span className={suiteStyles.tabIcon}>{suite.icon}</span>
              <div className={suiteStyles.tabContent}>
                <span className={suiteStyles.tabName}>{suite.name}</span>
                <span className={suiteStyles.tabTagline}>{suite.tagline}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Main Demo Section */}
        <div className={suiteStyles.demoSection}>
          <div className={suiteStyles.demoContainer}>
            
            {/* Before/After Showcase */}
            <div className={suiteStyles.showcase}>
              <div className={suiteStyles.beforeAfter}>
                <div className={suiteStyles.imageWrapper}>
                  <div className={suiteStyles.beforePanel}>
                    <Image
                      src={currentSuite.beforeImage}
                      alt="Before transformation"
                      fill
                      className={suiteStyles.demoImage}
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <span className={suiteStyles.imageLabel}>Before</span>
                  </div>
                  
                  <div className={suiteStyles.afterPanel}>
                    <Image
                      src={currentSuite.afterImage}
                      alt="After transformation"
                      fill
                      className={suiteStyles.demoImage}
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <span className={suiteStyles.imageLabel}>After</span>
                    <div className={suiteStyles.enhancementOverlay}></div>
                  </div>
                </div>
                
                {/* Processing Animation */}
                <div className={suiteStyles.processingAnimation}>
                  <div className={suiteStyles.processingLine}></div>
                  <div className={suiteStyles.aiIcon} style={{ '--accent': currentSuite.accent }}>
                    {currentSuite.icon}
                  </div>
                  <div className={suiteStyles.processingLine}></div>
                </div>
              </div>
            </div>

            {/* Suite Details */}
            <div className={suiteStyles.suiteDetails}>
              <div className={suiteStyles.detailsHeader}>
                <div className={suiteStyles.suiteIcon} style={{ '--accent': currentSuite.accent }}>
                  {currentSuite.icon}
                </div>
                <div>
                  <h2 className={suiteStyles.suiteName}>{currentSuite.name}</h2>
                  <p className={suiteStyles.suiteDescription}>{currentSuite.description}</p>
                </div>
              </div>

              {/* Features & Use Cases */}
              <div className={suiteStyles.detailsGrid}>
                <div className={suiteStyles.detailsColumn}>
                  <h3 className={suiteStyles.columnTitle}>Key Features</h3>
                  <ul className={suiteStyles.featureList}>
                    {currentSuite.features.map((feature, idx) => (
                      <li key={idx} className={suiteStyles.featureItem}>
                        <span className={suiteStyles.featureCheck}>✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={suiteStyles.detailsColumn}>
                  <h3 className={suiteStyles.columnTitle}>Perfect For</h3>
                  <ul className={suiteStyles.useCaseList}>
                    {currentSuite.useCases.map((useCase, idx) => (
                      <li key={idx} className={suiteStyles.useCaseItem}>
                        <span className={suiteStyles.useCaseIcon}>→</span>
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Specs & CTA */}
              <div className={suiteStyles.suiteSpecs}>
                <div className={suiteStyles.specItem}>
                  <span className={suiteStyles.specLabel}>Credits</span>
                  <span className={suiteStyles.specValue}>{currentSuite.credits}</span>
                </div>
                <div className={suiteStyles.specItem}>
                  <span className={suiteStyles.specLabel}>Processing</span>
                  <span className={suiteStyles.specValue}>{currentSuite.processingTime}</span>
                </div>
              </div>

              <Link 
                href={currentSuite.link} 
                className={suiteStyles.tryButton}
                style={{ '--accent': currentSuite.accent }}
              >
                <span>Try {currentSuite.name}</span>
                <div className={suiteStyles.buttonArrow}>→</div>
              </Link>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className={suiteStyles.comparisonSection}>
          <h2 className={suiteStyles.comparisonTitle}>Choose the Right AI for Your Needs</h2>
          
          <div className={suiteStyles.comparisonTable}>
            <div className={suiteStyles.tableHeader}>
              <div className={suiteStyles.tableCell}>Feature</div>
              <div className={suiteStyles.tableCell}>Restoration</div>
              <div className={suiteStyles.tableCell}>Colorization</div>
              <div className={suiteStyles.tableCell}>Cartoon</div>
            </div>
            
            {[
              { feature: 'Repair Damage', restore: '✓', colorize: '✓', cartoon: '—' },
              { feature: 'Add Colors', restore: '—', colorize: '✓', cartoon: '✓' },
              { feature: 'Artistic Style', restore: '—', colorize: '—', cartoon: '✓' },
              { feature: 'Credits Required', restore: '1', colorize: '40', cartoon: '40' },
              { feature: 'Processing Time', restore: '30-60s', colorize: '60-90s', cartoon: '45-75s' },
              { feature: 'Best For', restore: 'Damaged Photos', colorize: 'B&W Photos', cartoon: 'Creative Projects' }
            ].map((row, idx) => (
              <div key={idx} className={suiteStyles.tableRow}>
                <div className={suiteStyles.tableCell}>{row.feature}</div>
                <div className={suiteStyles.tableCell}>{row.restore}</div>
                <div className={suiteStyles.tableCell}>{row.colorize}</div>
                <div className={suiteStyles.tableCell}>{row.cartoon}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={suiteStyles.bottomCTA}>
          <h2 className={suiteStyles.ctaTitle}>Ready to Transform Your Photos?</h2>
          <p className={suiteStyles.ctaSubtitle}>
            Start with 5 free credits - no credit card required
          </p>
          
          <div className={suiteStyles.ctaButtons}>
            <Link href="/signup" className={suiteStyles.primaryCTA}>
              Get Started Free
            </Link>
            <Link href="/pricing" className={suiteStyles.secondaryCTA}>
              View Pricing
            </Link>
          </div>
          
          <div className={suiteStyles.trustIndicators}>
            <div className={suiteStyles.trustItem}>
              <span className={suiteStyles.trustIcon}>🔒</span>
              <span>100% Private & Secure</span>
            </div>
            <div className={suiteStyles.trustItem}>
              <span className={suiteStyles.trustIcon}>⚡</span>
              <span>Instant Results</span>
            </div>
            <div className={suiteStyles.trustItem}>
              <span className={suiteStyles.trustIcon}>💎</span>
              <span>Premium Quality</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISuitePage;