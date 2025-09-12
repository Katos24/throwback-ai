import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import suiteStyles from '../../styles/AISuite.module.css';

const AISuitePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
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

  const categories = [
    { id: 'all', label: 'All Tools', count: 7 },
    { id: 'restore', label: 'Restore', count: 2 },
    { id: 'transform', label: 'Transform', count: 1 },
    { id: 'decades', label: 'Decades', count: 4 }
  ];

  const aiSuites = [
    {
      id: 'restore-basic',
      icon: '🔧',
      name: 'Photo Restoration',
      tagline: 'Repair & Restore',
      cardImage: '/images/restore-card.png',
      credits: 1,
      link: '/replicate/restore-basic',
      accent: '#10b981',
      category: 'restore',
      popular: true
    },
    {
      id: 'colorize',
      icon: '🌈',
      name: 'Photo Colorization',
      tagline: 'Add Life & Color',
      cardImage: '/images/colorizecardgrid.png',
      credits: 40,
      link: '/replicate/restore-premium',
      accent: '#3b82f6',
      category: 'restore',
      popular: true
    },
    {
      id: 'cartoon',
      icon: '🎨',
      name: 'Cartoon Creator',
      tagline: 'Artistic Transformation',
      cardImage: '/images/cartoon-card.png',
      credits: 40,
      link: '/replicate/cartoon',
      accent: '#8b5cf6',
      category: 'transform',
      popular: false
    },
    {
      id: '70s',
      icon: '✌️',
      name: '70s Groovy Style',
      tagline: 'Hippie & Disco Vibes',
      cardImage: '/images/70s-style.jpg',
      credits: 50,
      link: '/replicate/70s',
      accent: '#f59e0b',
      category: 'decades',
      popular: false
    },
    {
      id: '80s',
      icon: '⚡',
      name: '80s Neon Style',
      tagline: 'Radical Retro Aesthetics',
      cardImage: '/images/80s-style.jpg',
      credits: 50,
      link: '/replicate/80s',
      accent: '#ec4899',
      category: 'decades',
      popular: false
    },
    {
      id: '90s',
      icon: '🎸',
      name: '90s Grunge Style',
      tagline: 'Alternative Culture',
      cardImage: '/images/90s-style.jpg',
      credits: 50,
      link: '/replicate/90s',
      accent: '#8b5cf6',
      category: 'decades',
      popular: false
    },
    {
      id: '2000s',
      icon: '💻',
      name: '2000s Y2K Style',
      tagline: 'Digital Era Vibes',
      cardImage: '/images/2000s-style.jpg',
      credits: 50,
      link: '/replicate/2000s',
      accent: '#06b6d4',
      category: 'decades',
      popular: false
    },
  ];

  const getFilteredTools = () => {
    if (activeFilter === 'all') {
      return [...aiSuites.filter(tool => tool.popular), ...aiSuites.filter(tool => !tool.popular)];
    }
    return aiSuites.filter(tool => tool.category === activeFilter);
  };

  const filteredTools = getFilteredTools();

  return (
    <div className={suiteStyles.suitePage}>
      {/* Background Effects */}
      <div className={suiteStyles.backgroundGrid}></div>
      <div className={suiteStyles.floatingOrbs}>
        <div className={suiteStyles.orb1}></div>
        <div className={suiteStyles.orb2}></div>
        <div className={suiteStyles.orb3}></div>
      </div>

      <div
        ref={containerRef}
        className={`${suiteStyles.container} ${isVisible ? suiteStyles.visible : ''}`}
      >
        {/* Header Section */}
        <header className={suiteStyles.header}>
          <h1 className={suiteStyles.title}>
            Seven Powerful AI Engines
            <span className={suiteStyles.titleGradient}> One Amazing Platform</span>
          </h1>
          <p className={suiteStyles.subtitle}>
            Choose the perfect AI transformation for your photos. Each engine is specially trained
            for different types of enhancement and creative projects.
          </p>
        </header>

        {/* Filter Tabs */}
        <div className={suiteStyles.filterSection}>
          <div className={suiteStyles.filterTabs}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`${suiteStyles.filterTab} ${activeFilter === category.id ? suiteStyles.active : ''}`}
              >
                <span className={suiteStyles.filterLabel}>{category.label}</span>
                <span className={suiteStyles.filterCount}>{category.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Card Grid Section */}
        <div className={suiteStyles.cardGrid}>
          {filteredTools.map((suite) => (
            <Link
              key={suite.id}
              href={suite.link}
              className={suiteStyles.suiteCard}
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AISuitePage;