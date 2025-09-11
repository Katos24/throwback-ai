// pages/index.js (or pages/throwback.js)
import { useState } from 'react';
import styles from '../styles/ThrowbackLanding.module.css';

export default function ThrowbackPage() {
  const [selectedDecade, setSelectedDecade] = useState(null);

  const decades = [
    {
      id: '60s',
      title: '1960s',
      subtitle: 'Peace & Love',
      emoji: '✌️',
      description: 'Flower power & groovy vibes',
      className: 'decade-60s'
    },
    {
      id: '70s',
      title: '1970s',
      subtitle: 'Disco Fever',
      emoji: '🕺',
      description: 'Funky beats & bell-bottoms',
      className: 'decade-70s'
    },
    {
      id: '80s',
      title: '1980s',
      subtitle: 'Neon Dreams',
      emoji: '🎮',
      description: 'Synth wave & big hair',
      className: 'decade-80s'
    },
    {
      id: '90s',
      title: '1990s',
      subtitle: 'Grunge Era',
      emoji: '📼',
      description: 'Alternative rock & flannel',
      className: 'decade-90s'
    },
    {
      id: '2000s',
      title: '2000s',
      subtitle: 'Digital Dawn',
      emoji: '💿',
      description: 'Y2K aesthetic & pop culture',
      className: 'decade-2000s'
    }
  ];

  const handleDecadeSelect = (decade) => {
    setSelectedDecade(decade);
    // Add your navigation logic here
    // For example: router.push(`/chat/${decade.id}`);
    console.log('Selected decade:', decade);
  };

  return (
    <div className={styles.container}>
      {/* Animated background elements */}
      <div className={styles.bgAnimation}>
        <div className={`${styles.floatingShape} ${styles.shape1}`}></div>
        <div className={`${styles.floatingShape} ${styles.shape2}`}></div>
        <div className={`${styles.floatingShape} ${styles.shape3}`}></div>
        <div className={`${styles.floatingShape} ${styles.shape4}`}></div>
      </div>

      {/* Main content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.logo}>Throwback AI</h1>
          <p className={styles.tagline}>Choose Your Era</p>
        </header>

        {/* Decades grid */}
        <div className={styles.decadesGrid}>
          {decades.map((decade, index) => (
            <div
              key={decade.id}
              className={`${styles.decadeCard} ${styles[decade.className]} ${
                selectedDecade?.id === decade.id ? styles.selected : ''
              }`}
              onClick={() => handleDecadeSelect(decade)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.cardContent}>
                <div className={styles.decadeEmoji}>{decade.emoji}</div>
                <h2 className={styles.decadeTitle}>{decade.title}</h2>
                <p className={styles.decadeSubtitle}>{decade.subtitle}</p>
                <p className={styles.decadeDescription}>{decade.description}</p>
              </div>
              <div className={styles.cardGlow}></div>
              <div className={styles.cardBorder}></div>
            </div>
          ))}
        </div>

        {/* Action button */}
        {selectedDecade && (
          <button className={styles.continueBtn}>
            Travel to the {selectedDecade.title}
            <span className={styles.btnArrow}>→</span>
          </button>
        )}
      </div>
    </div>
  );
}