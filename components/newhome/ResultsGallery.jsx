import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ResultsGallery.module.css';

const RESULTS = [
  {
    id: 1,
    type: 'restore',
    before: '/images/weddingbefore.jpg',
    after: '/images/weddingafter.png',
    category: 'Restoration',
    user: 'Sarah M.',
    badge: 'Before/After'
  },
  {
    id: 2,
    type: 'avatar',
    image: '/images/home/avatar_bounty_hunter.png',
    category: 'AI Avatar',
    user: 'Mike R.',
    badge: 'Cyberpunk'
  },
  {
    id: 3,
    type: 'decades',
    image: '/images/home/decade_70s.png',
    category: 'Vintage',
    user: 'Emma L.',
    badge: '70s Style'
  },
  {
    id: 4,
    type: 'restore',
    before: '/images/restore-original.jpg',
    after: '/images/restore-premium.png',
    category: 'Restoration',
    user: 'John D.',
    badge: 'Before/After'
  },
  {
    id: 5,
    type: 'avatar',
    image: '/images/avatarcards/fantasy-viking-warrior-female.jpg',
    category: 'AI Avatar',
    user: 'Lisa K.',
    badge: 'Fantasy'
  },
  {
    id: 6,
    type: 'decades',
    image: '/images/decades/80s-styles/male/synthwave.jpg',
    category: 'Vintage',
    user: 'Tom H.',
    badge: '80s Neon'
  }
];

export default function ResultsGallery() {
  const [filter, setFilter] = useState('all');

  const filteredResults = filter === 'all' 
    ? RESULTS 
    : RESULTS.filter(item => item.type === filter);

  return (
    <section className={styles.gallery}>
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Real Results from <span className={styles.titleAccent}>Real Users</span>
          </h2>
          <p className={styles.subtitle}>
            Join 50,000+ people transforming their photos with AI
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterTabs}>
          <button 
            className={`${styles.filterTab} ${filter === 'all' ? styles.filterTabActive : ''}`}
            onClick={() => setFilter('all')}
          >
            All Results
          </button>
          <button 
            className={`${styles.filterTab} ${filter === 'restore' ? styles.filterTabActive : ''}`}
            onClick={() => setFilter('restore')}
          >
            Restorations
          </button>
          <button 
            className={`${styles.filterTab} ${filter === 'avatar' ? styles.filterTabActive : ''}`}
            onClick={() => setFilter('avatar')}
          >
            Avatars
          </button>
          <button 
            className={`${styles.filterTab} ${filter === 'decades' ? styles.filterTabActive : ''}`}
            onClick={() => setFilter('decades')}
          >
            Vintage
          </button>
        </div>

        {/* Results Grid */}
        <div className={styles.resultsGrid}>
          {filteredResults.map((result) => (
            <ResultCard key={result.id} result={result} />
          ))}
        </div>

      </div>
    </section>
  );
}

const ResultCard = ({ result }) => {
  const [isHovered, setIsHovered] = useState(false);

  // For before/after restoration images
  if (result.before && result.after) {
    return (
      <div 
        className={styles.card}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={styles.imageWrapper}>
          <Image
            src={isHovered ? result.after : result.before}
            alt={`${result.category} by ${result.user}`}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className={styles.badge}>{result.badge}</div>
          <div className={styles.hoverHint}>
            {isHovered ? 'After' : 'Hover to see After'}
          </div>
        </div>
        <div className={styles.cardFooter}>
          <span className={styles.category}>{result.category}</span>
          <span className={styles.user}>by {result.user}</span>
        </div>
      </div>
    );
  }

  // For single images (avatars, decades)
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={result.image}
          alt={`${result.category} by ${result.user}`}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className={styles.badge}>{result.badge}</div>
      </div>
      <div className={styles.cardFooter}>
        <span className={styles.category}>{result.category}</span>
        <span className={styles.user}>by {result.user}</span>
      </div>
    </div>
  );
};