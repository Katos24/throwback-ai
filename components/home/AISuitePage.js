import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/AISuite.module.css'

const AISuitePage = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const containerRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        },
        { threshold: 0.1 }
      )
      if (containerRef.current) observer.observe(containerRef.current)
      return () => observer.disconnect()
    }, 150)

    return () => clearTimeout(timer)
  }, [])

  const categories = [
    { id: 'all', label: 'All Tools', count: 7 },
    { id: 'premium', label: 'Premium', count: 2 },
    { id: 'creative', label: 'Creative', count: 1 },
    { id: 'decades', label: 'Decades', count: 4 },
  ]

  const aiSuites = [
    // FEATURED HERO CARDS - Top Priority
    {
      id: 'restore',
      icon: '✨',
      name: 'Photo Restoration',
      tagline: 'Repair, Enhance & Colorize',
      cardImage: '/images/restore-before-after-combined.jpg',
      credits: '1-40',
      link: '/replicate/restore-premium',
      accent: '#10b981',
      category: 'premium',
      popular: true,
      premium: true,
      featured: true,
    },
    {
      id: 'avatar',
      icon: '🎭',
      name: 'History Avatar',
      tagline: 'Premium AI Transformation',
      cardImage: '/images/avatar-card.jpg',
      credits: 50,
      link: '/replicate/avatar',
      accent: '#f59e0b',
      category: 'premium',
      popular: true,
      premium: true,
      featured: true,
    },
    // CREATIVE - Cartoon
    {
      id: 'cartoon',
      icon: '🎨',
      name: 'Cartoon Portrait',
      tagline: 'Classic Cartoon Style',
      cardImage: '/images/cartoon-card.jpg',
      credits: 40,
      link: '/replicate/cartoon',
      accent: '#ec4899',
      category: 'creative',
      popular: true,
      featured: false,
    },
    // DECADES
    {
      id: '70s',
      icon: '✌️',
      name: '70s Groovy Style',
      tagline: 'Hippie & Disco Vibes',
      cardImage: '/images/70sCard.jpg',
      credits: 50,
      link: '/replicate/70s',
      accent: '#f59e0b',
      category: 'decades',
      popular: false,
    },
    {
      id: '80s',
      icon: '⚡',
      name: '80s Neon Style',
      tagline: 'Radical Retro Aesthetics',
      cardImage: '/images/80sCard.jpg',
      credits: 50,
      link: '/replicate/80s',
      accent: '#ec4899',
      category: 'decades',
      popular: false,
    },
     {
      id: '90s',
      icon: '🎸',
      name: '90s Grunge Style',
      tagline: 'Alternative Culture',
      cardImage: '/images/90sCard.jpg',
      credits: 50,
      link: '/replicate/90s',
      accent: '#8b5cf6',
      category: 'decades',
      popular: true,
    },
    {
      id: '2000s',
      icon: '💻',
      name: '2000s Y2K Style',
      tagline: 'Digital Era Vibes',
      cardImage: '/images/2000sCard.jpg',
      credits: 50,
      link: '/replicate/2000s',
      accent: '#06b6d4',
      category: 'decades',
      popular: false,
    }
  ]

  const getFilteredTools = () => {
    if (activeFilter === 'all') {
      return aiSuites
    }
    return aiSuites.filter((tool) => tool.category === activeFilter)
  }

  const filteredTools = getFilteredTools()
  const featuredTools = filteredTools.filter(tool => tool.featured)
  const regularTools = filteredTools.filter(tool => !tool.featured)
  const shouldShowFeatured = activeFilter === 'all' || activeFilter === 'premium'

  return (
    <div className={styles.suitePage}>
      <div className={styles.backgroundGrid} />
      <div className={styles.floatingOrbs}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />
      </div>

      <div
        ref={containerRef}
        className={`${styles.container} ${isVisible ? styles.visible : ''}`}
      >
        <header className={styles.header}>
          <h1 className={styles.title}>
            Seven Powerful AI Engines
            <span className={styles.titleGradient}> One Amazing Platform</span>
          </h1>
          <p className={styles.subtitle}>
            Choose the perfect AI transformation for your photos. Each engine is
            specially trained for different types of enhancement and creative
            projects.
          </p>
        </header>

        <div className={styles.filterSection}>
          <div className={styles.filterTabs}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`${styles.filterTab} ${
                  activeFilter === cat.id ? styles.active : ''
                }`}
              >
                <span className={styles.filterLabel}>{cat.label}</span>
                <span className={styles.filterCount}>{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Premium Tools - Dual Hero Cards */}
        {shouldShowFeatured && featuredTools.length > 0 && (
          <div className={styles.featuredGrid}>
            {featuredTools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.link}
                className={styles.featuredCard}
                style={{ '--accent': tool.accent }}
              >
                <div className={styles.featuredBadge}>
                  <span className={styles.premiumStar}>⭐</span>
                  PREMIUM
                </div>
                
                <div className={styles.featuredContent}>
                  <div className={styles.featuredTop}>
                    <div className={styles.featuredIcon}>{tool.icon}</div>
                    <h2 className={styles.featuredName}>{tool.name}</h2>
                    <p className={styles.featuredTagline}>
                      {tool.id === 'restore' 
                        ? 'Repair, enhance, and colorize vintage photos with professional AI restoration.'
                        : 'Transform into historical figures and styles across 6 unique categories.'}
                    </p>
                  </div>

                  <div className={styles.featuredImageContainer}>
                    <Image
                      src={tool.cardImage}
                      alt={`${tool.name} preview`}
                      fill
                      className={styles.featuredImage}
                      sizes="(max-width: 768px) 100vw, 45vw"
                    />
                  </div>

                  <div className={styles.featuredBottom}>
                    <span className={styles.featuredCredits}>
                      {tool.credits} Credits
                    </span>
                    <span className={styles.featuredArrow}>
                      {tool.id === 'restore' ? 'Start Restoring →' : 'Create Avatar →'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Regular Tools Grid */}
        <div className={styles.cardGrid}>
          {regularTools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.link}
              className={styles.suiteCard}
              style={{ '--accent': tool.accent }}
            >
              {tool.premium && (
                <div className={styles.premiumBadge}>
                  <span className={styles.premiumStar}>⭐</span>
                  Premium
                </div>
              )}
              
              <div className={styles.cardImageContainer}>
                <Image
                  src={tool.cardImage}
                  alt={`${tool.name} preview`}
                  fill
                  className={styles.cardImage}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
              
              <div className={styles.cardOverlay}>
                <div className={styles.cardIcon}>{tool.icon}</div>
                <h3 className={styles.cardName}>{tool.name}</h3>
                <p className={styles.cardTagline}>{tool.tagline}</p>
                <div className={styles.cardCredits}>{tool.credits} Credits</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AISuitePage