// components/decades/shared/StyleSelector.jsx
export default function StyleSelector({ 
  styles, 
  styleOptions, 
  selectedStyle, 
  setSelectedStyle, 
  decade 
}) {
  return (
    <div className={styles.configPanel}>
      <h3 className={styles.configTitle}>{decade}S STYLE</h3>
      <div className={styles.styleGrid}>
        {styleOptions && styleOptions.map((style) => (
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
      </div>
    </div>
  );
}