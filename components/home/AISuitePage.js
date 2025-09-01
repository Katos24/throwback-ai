import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import suiteStyles from '../../styles/AISuite.module.css';

const AISuitePage = () => {
  const [activeDemo, setActiveDemo] = useState('colorize');
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
      id: 'colorize',
      icon: '🌈',
      name: 'Photo Colorization',
      tagline: 'Add Life & Color',
      description: 'Transform black & white photos with historically accurate, vibrant colors',
      beforeImage: '/images/before6.jpg',
      afterImage: '/images/after6.jpg',
      cardImage: '/images/colorize-card.jpg', // New card image with info
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
      cardImage: '/images/cartoon-card.jpg', // New card image with info
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
    },
    {
      id: 'yearbook',
      icon: '📸',
      name: '90s Yearbook Transform',
      tagline: 'Retro Style Magic',
      description: 'Transform modern photos into authentic 90s yearbook portraits with period-accurate styling',
      beforeImage: '/images/yearbook-before.jpg',
      afterImage: '/images/yearbook-after.jpg',
      cardImage: '/images/yearbook-card.jpg', // New card image with info
      features: [
        'Authentic 90s styling',
        'Period-accurate clothing',
        'Classic yearbook lighting',
        'Multiple style options'
      ],
      useCases: [
        'Nostalgic social media',
        'Throwback photo projects',
        'Creative gifts',
        'Fun family memories'
      ],
      credits: 20,
      processingTime: '60-120 seconds',
      link: '/replicate/yearbook',
      accent: '#f59e0b'
    },
    {
      id: 'avatar',
      icon: '👤',
      name: 'AI Avatar Generator',
      tagline: 'Professional Portraits',
      description: 'Create stunning professional avatars optimized for social media and business use',
      beforeImage: '/images/avatar-before.jpg',
      afterImage: '/images/avatar-after.jpg',
      cardImage: '/images/avatar-card.jpg', // New card image with info
      features: [
        'Professional quality output',
        'Social media optimized',
        'Multiple style options',
        'High-resolution results'
      ],
      useCases: [
        'LinkedIn profiles',
        'Social media avatars',
        'Professional headshots',
        'Business presentations'
      ],
      credits: 50,
      processingTime: '45-90 seconds',
      link: '/replicate/avatar',
      accent: '#ef4444'
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
      
          <h1 className={suiteStyles.title}>
            Five Powerful AI Engines
            <span className={suiteStyles.titleGradient}>One Amazing Platform</span>
          </h1>
          
          <p className={suiteStyles.subtitle}>
            Choose the perfect AI transformation for your photos. Each engine is specially trained 
            for different types of enhancement and creative projects.
          </p>
        </header>

        {/* Card Grid Section */}
        <div className={suiteStyles.cardGrid}>
          {aiSuites.map((suite) => (
            <div
              key={suite.id}
              className={`${suiteStyles.suiteCard} ${activeDemo === suite.id ? suiteStyles.active : ''}`}
              onClick={() => setActiveDemo(suite.id)}
              style={{ '--accent': suite.accent }}
            >
              <div className={suiteStyles.cardImageContainer}>
                <Image
                  src={suite.cardImage}
                  alt={`${suite.name} preview`}
                  fill
                  className={suiteStyles.cardImage}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className={suiteStyles.cardOverlay}>
                  <div className={suiteStyles.cardIcon}>{suite.icon}</div>
                  <h3 className={suiteStyles.cardName}>{suite.name}</h3>
                  <p className={suiteStyles.cardTagline}>{suite.tagline}</p>
                  <div className={suiteStyles.cardCredits}>{suite.credits} Credits</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Suite Details */}
        <div className={suiteStyles.detailsSection}>
          <div className={suiteStyles.detailsContainer}>
            
            {/* Suite Header */}
            <div className={suiteStyles.suiteHeader}>
              <div className={suiteStyles.suiteIcon} style={{ '--accent': currentSuite.accent }}>
                {currentSuite.icon}
              </div>
              <div>
                <h2 className={suiteStyles.suiteName}>{currentSuite.name}</h2>
                <p className={suiteStyles.suiteDescription}>{currentSuite.description}</p>
              </div>
            </div>

            {/* Before/After Images */}
            <div className={suiteStyles.beforeAfterContainer}>
              <div className={suiteStyles.beforeImage}>
                <Image
                  src={currentSuite.beforeImage}
                  alt="Before transformation"
                  fill
                  className={suiteStyles.demoImage}
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <span className={suiteStyles.imageLabel}>Before</span>
              </div>
              
              <div className={suiteStyles.transformArrow}>
                <div className={suiteStyles.aiIcon} style={{ '--accent': currentSuite.accent }}>
                  {currentSuite.icon}
                </div>
              </div>
              
              <div className={suiteStyles.afterImage}>
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

            <Link 
              href={currentSuite.link} 
              className={suiteStyles.tryButton}
              style={{ '--accent': currentSuite.accent }}
            >
              <span>Try {currentSuite.name}</span>
              <div className={suiteStyles.buttonArrow}>→</div>
            </Link>

            {/* Specs section */}
            <div className={suiteStyles.specsSection}>
              <div className={suiteStyles.specItem}>
                <span className={suiteStyles.specLabel}>Credits Required</span>
                <span className={suiteStyles.specValue} style={{ '--accent': currentSuite.accent }}>{currentSuite.credits}</span>
              </div>
              <div className={suiteStyles.specItem}>
                <span className={suiteStyles.specLabel}>Processing Time</span>
                <span className={suiteStyles.specValue}>{currentSuite.processingTime}</span>
              </div>
            </div>

            {/* Features & Specs Table */}
            <div className={suiteStyles.featuresTable}>
              <div className={suiteStyles.tableSection}>
                <h3 className={suiteStyles.sectionTitle}>Key Features</h3>
                <div className={suiteStyles.featureGrid}>
                  {currentSuite.features.map((feature, idx) => (
                    <div key={idx} className={suiteStyles.featureItem}>
                      <span className={suiteStyles.featureCheck} style={{ '--accent': currentSuite.accent }}>✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={suiteStyles.tableSection}>
                <h3 className={suiteStyles.sectionTitle}>Perfect For</h3>
                <div className={suiteStyles.useCaseGrid}>
                  {currentSuite.useCases.map((useCase, idx) => (
                    <div key={idx} className={suiteStyles.useCaseItem}>
                      <span className={suiteStyles.useCaseIcon} style={{ '--accent': currentSuite.accent }}>→</span>
                      <span>{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        {/* Removed - keeping it simple */}

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