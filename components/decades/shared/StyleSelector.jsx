import { useState } from 'react';

export default function StyleSelector({
  styles,
  styleOptions,
  selectedStyle,
  setSelectedStyle,
  decade
}) {
  const [showAll, setShowAll] = useState(false);
  const visibleCount = 7;
  
  const displayedStyles = showAll ? styleOptions : styleOptions.slice(0, visibleCount);
  const remainingCount = styleOptions.length - visibleCount;

  return (
    <div className={styles.configPanel}>
      <h3 className={styles.configTitle}>{decade}S STYLE</h3>
      <div className={styles.styleGrid}>
        {displayedStyles && displayedStyles.map((style) => (
          <button
            key={style.id}
            className={`${styles.styleOption} ${selectedStyle === style.id ? styles.active : ''}`}
            onClick={() => setSelectedStyle(style.id)}
            aria-pressed={selectedStyle === style.id}
            title={style.description}
          >
            {style.emoji && <span className={styles.styleEmoji}>{style.emoji}</span>}
            {style.label ? style.label.toUpperCase() : 'STYLE'}
          </button>
        ))}
        
        {!showAll && remainingCount > 0 && (
          <button
            className={styles.styleOption}
            onClick={() => setShowAll(true)}
            style={{
              border: '2px dashed rgba(0, 255, 0, 0.3)',
              opacity: 0.7
            }}
          >
            <span className={styles.styleEmoji}>➕</span>
            +{remainingCount} MORE
          </button>
        )}
        
        {showAll && remainingCount > 0 && (
          <button
            className={styles.styleOption}
            onClick={() => setShowAll(false)}
            style={{
              border: '2px dashed rgba(0, 255, 0, 0.3)',
              opacity: 0.7
            }}
          >
            <span className={styles.styleEmoji}>➖</span>
            SHOW LESS
          </button>
        )}
      </div>
    </div>
  );
}