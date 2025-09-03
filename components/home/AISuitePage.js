import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import suiteStyles from '../../styles/AISuite.module.css';

const AISuitePage = () => {
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
      cardImage: '/images/colorize-card.jpg',
      credits: 40,
      link: '/replicate/restore-premium',
      accent: '#3b82f6',
    },
    {
      id: 'cartoon',
      icon: '🎨',
      name: 'Cartoon Creator',
      tagline: 'Artistic Transformation',
      cardImage: '/images/cartoon-card.jpg',
      credits: 40,
      link: '/replicate/cartoon',
      accent: '#8b5cf6',
    },
    {
      id: 'yearbook',
      icon: '📸',
      name: '90s Yearbook Transform',
      tagline: 'Retro Style Magic',
      cardImage: '/images/yearbook-card.jpg',
      credits: 20,
      link: '/replicate/yearbook',
      accent: '#f59e0b',
    },
    {
      id: 'avatar',
      icon: '👤',
      name: 'AI Avatar Generator',
      tagline: 'Professional Portraits',
      cardImage: '/images/avatar-card.jpg',
      credits: 50,
      link: '/replicate/avatar',
      accent: '#ef4444',
    },
  ];

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
            Five Powerful AI Engines
            <span className={suiteStyles.titleGradient}> One Amazing Platform</span>
          </h1>
          <p className={suiteStyles.subtitle}>
            Choose the perfect AI transformation for your photos. Each engine is specially trained
            for different types of enhancement and creative projects.
          </p>
        </header>

        {/* Card Grid Section */}
        <div className={suiteStyles.cardGrid}>
          {aiSuites.map((suite) => (
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
