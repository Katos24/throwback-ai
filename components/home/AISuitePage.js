import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/AISuite.module.css'

const AISuitePage = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState('decades') // Show decades first
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
    { id: 'decades', label: 'Decades', count: 4 },
    { id: 'restore', label: 'Restore', count: 2 },
    { id: 'all', label: 'All Tools', count: 6 },
  ]

  const aiSuites = [
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
      popular: true,
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
      popular: false,
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
    },
    {
      id: 'restore-basic',
      icon: '🔧',
      name: 'Photo Restoration',
      tagline: 'Repair & Restore',
      cardImage: '/images/restore-card.png',
      credits: 1,
      link: '/replicate/restore-premium',
      accent: '#10b981',
      category: 'restore',
      popular: true,
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
      popular: true,
    }
  ]

  const getFilteredTools = () => {
    if (activeFilter === 'all') {
      return [
        ...aiSuites.filter((tool) => tool.popular),
        ...aiSuites.filter((tool) => !tool.popular),
      ]
    }
    return aiSuites.filter((tool) => tool.category === activeFilter)
  }

  const filteredTools = getFilteredTools()

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
            Six Powerful AI Engines
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

        <div className={styles.cardGrid}>
          {filteredTools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.link}
              className={styles.suiteCard}
              style={{ '--accent': tool.accent }}
            >
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
