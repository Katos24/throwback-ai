import { useState } from 'react';
import styles from '../../styles/AvatarPage.module.css';

/**
 * StyleSelector Component
 * Accordion-based style category and style selection
 * Organized by categories: Fantasy, Sci-Fi, Historical, etc.
 */
const StyleSelector = ({ 
  AVATAR_STYLES, 
  popularStyles = [],
  selectedCategory,
  selectedStyle,
  onCategoryChange,
  onStyleChange 
}) => {
  // Style categories configuration
  const categories = [
    { 
      value: "fantasy", 
      label: "Fantasy", 
      emoji: "🧙", 
      description: "Magical & mystical", 
      color: "fantasy" 
    },
    { 
      value: "scifi", 
      label: "Sci-Fi", 
      emoji: "🚀", 
      description: "Futuristic & tech", 
      color: "scifi" 
    },
    { 
      value: "historical", 
      label: "Historical", 
      emoji: "🏛️", 
      description: "Period & vintage", 
      color: "historical" 
    },
    { 
      value: "nineties", 
      label: "90s Vibes", 
      emoji: "📼", 
      description: "Retro yearbook styles", 
      color: "nineties" 
    },
    { 
      value: "portrait", 
      label: "Portrait", 
      emoji: "📸", 
      description: "Professional & artistic", 
      color: "portrait" 
    },
    { 
      value: "anime", 
      label: "Anime", 
      emoji: "🎌", 
      description: "Japanese animation style", 
      color: "anime" 
    }
  ];

  // Toggle accordion open/close
  const handleCategoryClick = (categoryValue) => {
    if (selectedCategory === categoryValue) {
      onCategoryChange(""); // Collapse if already open
    } else {
      onCategoryChange(categoryValue);
      onStyleChange(""); // Reset style selection when changing category
    }
  };

  return (
    <div className={styles.accordionSection}>
      <h2 className={styles.sectionTitle}>Step 3: Select Style</h2>
      <p className={styles.accordionSubtitle}>Click a category to explore available styles</p>
      
      <div className={styles.accordionContainer}>
        {categories.map((category) => {
          const isOpen = selectedCategory === category.value;
          const stylesInCategory = AVATAR_STYLES[category.value] || [];
          const hasPopularStyles = stylesInCategory.some(
            style => popularStyles.includes(style.value)
          );
          
          return (
            <div 
              key={category.value} 
              className={`${styles.accordionItem} ${styles[category.color]} ${
                isOpen ? styles.accordionItemOpen : ''
              }`}
            >
              {/* Accordion Header */}
              <button
                className={styles.accordionHeader}
                onClick={() => handleCategoryClick(category.value)}
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${category.value}`}
              >
                <div className={styles.accordionHeaderLeft}>
                  <span className={styles.accordionEmoji}>{category.emoji}</span>
                  <div className={styles.accordionHeaderText}>
                    <span className={styles.accordionLabel}>{category.label}</span>
                    <span className={styles.accordionDescription}>
                      {category.description}
                    </span>
                  </div>
                </div>
                
                <div className={styles.accordionHeaderRight}>
                  {hasPopularStyles && (
                    <span className={styles.accordionPopularBadge}>⭐ Popular</span>
                  )}
                  <span className={styles.accordionCount}>
                    {stylesInCategory.length} {stylesInCategory.length === 1 ? 'style' : 'styles'}
                  </span>
                  <span className={styles.accordionChevron}>
                    {isOpen ? '−' : '+'}
                  </span>
                </div>
              </button>
              
              {/* Accordion Content - Only rendered when open */}
              {isOpen && (
                <div 
                  className={styles.accordionContent}
                  id={`accordion-content-${category.value}`}
                >
                  <div className={styles.styleGrid}>
                    {stylesInCategory.map((style) => (
                      <button
                        key={style.value}
                        className={`${styles.styleButton} ${
                          selectedStyle === style.value ? styles.selected : ''
                        }`}
                        onClick={() => onStyleChange(style.value)}
                      >
                        {popularStyles.includes(style.value) && (
                          <span className={styles.popularBadge}>⭐ Popular</span>
                        )}
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StyleSelector;