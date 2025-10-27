import { memo, useState } from 'react';
import styles from './ConfigSelector.module.css';
import AVATAR_STYLES from '../AvatarStyles';

/**
 * ConfigSelector Component - Two-View Navigation (Gender → Category → Styles)
 * Optimized UX: Pick gender first, then category, then style
 */
const ConfigSelector = memo(({ 
  // Gender props
  selectedGender,
  onGenderChange,
  // Style props
  popularStyles = [],
  selectedCategory,
  selectedStyle,
  onCategoryChange,
  onStyleChange 
}) => {
  // Local state to track if we're viewing styles or categories
  const [viewingStyles, setViewingStyles] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  // Gender options
  const genderOptions = [
    { value: "male", label: "Male", emoji: "👨" },
    { value: "female", label: "Female", emoji: "👩" },
    { value: "non_binary", label: "Non-Binary", emoji: "⚧️" }
  ];

  // Style categories configuration with images
  const categories = [
    { 
      value: "portrait", 
      label: "Portrait", 
      emoji: "📸", 
      description: "Professional & artistic", 
      color: "portrait",
      image: "/images/categories/portrait.jpg",
      exampleImages: [
        "/images/examples/portrait-1.jpg",
        "/images/examples/portrait-2.jpg",
        "/images/examples/portrait-3.jpg"
      ]
    },
    { 
      value: "nineties", 
      label: "90s Vibes", 
      emoji: "📼", 
      description: "Retro yearbook styles", 
      color: "nineties",
      image: "/images/categories/nineties.jpg",
      exampleImages: [
        "/images/examples/nineties-1.jpg",
        "/images/examples/nineties-2.jpg",
        "/images/examples/nineties-3.jpg"
      ]
    },
    { 
      value: "fantasy", 
      label: "Fantasy", 
      emoji: "🧙", 
      description: "Magical & mystical", 
      color: "fantasy",
      image: "/images/categories/fantasy.jpg",
      exampleImages: [
        "/images/examples/fantasy-1.jpg",
        "/images/examples/fantasy-2.jpg",
        "/images/examples/fantasy-3.jpg"
      ]
    },
    { 
      value: "scifi", 
      label: "Sci-Fi", 
      emoji: "🚀", 
      description: "Futuristic & tech", 
      color: "scifi",
      image: "/images/categories/scifi.jpg",
      exampleImages: [
        "/images/examples/scifi-1.jpg",
        "/images/examples/scifi-2.jpg",
        "/images/examples/scifi-3.jpg"
      ]
    },
    { 
      value: "historical", 
      label: "Historical", 
      emoji: "🏛️", 
      description: "Period & vintage", 
      color: "historical",
      image: "/images/categories/historical.jpg",
      exampleImages: [
        "/images/examples/historical-1.jpg",
        "/images/examples/historical-2.jpg",
        "/images/examples/historical-3.jpg"
      ]
    },
    { 
      value: "anime", 
      label: "Anime", 
      emoji: "🎌", 
      description: "Japanese animation style", 
      color: "anime",
      image: "/images/categories/anime.jpg",
      exampleImages: [
        "/images/examples/anime-1.jpg",
        "/images/examples/anime-2.jpg",
        "/images/examples/anime-3.jpg"
      ]
    }
  ];

  // Handle category selection - transition to style view
  const handleCategoryClick = (categoryValue) => {
    setActiveCategory(categoryValue);
    onCategoryChange(categoryValue);
    setViewingStyles(true);
  };

  // Handle back button - return to category view
  const handleBackToCategories = () => {
    setViewingStyles(false);
    setActiveCategory(null);
  };

  // Handle style selection
  const handleStyleSelect = (styleValue) => {
    onStyleChange(styleValue);
  };

  // Get current category data
  const currentCategory = categories.find(cat => cat.value === activeCategory);
  const currentStyles = activeCategory ? (AVATAR_STYLES[activeCategory] || []) : [];

  return (
    <div className={styles.configSection}>
      <h2 className={styles.sectionTitle}>Step 1: Choose Your Avatar</h2>
      <p className={styles.sectionSubtitle}>Select your gender and style</p>
      
      {/* ONE UNIFIED PANEL - no separation */}
      <div className={styles.configPanel}>
        
        {/* GENDER SELECTION FIRST */}
        <div>
          <h3 className={styles.subSectionTitle}>Your Gender</h3>
          <div className={styles.buttonGroup}>
            {genderOptions.map((option) => (
              <button
                key={option.value}
                className={`${styles.optionButton} ${
                  selectedGender === option.value ? styles.selected : ''
                }`}
                onClick={() => onGenderChange(option.value)}
                aria-pressed={selectedGender === option.value}
              >
                <span className={styles.optionEmoji}>{option.emoji}</span>
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* DIVIDER */}
        <div className={styles.sectionDivider}></div>

        {/* STYLE SELECTION SECOND */}
        <div>
          <h3 className={styles.subSectionTitle}>Avatar Style</h3>
        
          {!selectedGender ? (
            // PROMPT TO SELECT GENDER FIRST
            <div className={styles.selectGenderPrompt}>
              <p>👆 Please select your gender first to see style options</p>
            </div>
          ) : !viewingStyles ? (
            // CATEGORY VIEW
            <div className={styles.categoryGrid}>
              {categories.map((category) => {
                const stylesInCategory = AVATAR_STYLES[category.value] || [];
                const hasPopularStyles = stylesInCategory.some(
                  style => popularStyles.includes(style.value)
                );
                
                return (
                  <button
                    key={category.value}
                    className={`${styles.categoryCard} ${styles[category.color]} ${
                      selectedCategory === category.value ? styles.selectedCategory : ''
                    }`}
                    onClick={() => handleCategoryClick(category.value)}
                    style={{
                      backgroundImage: `url(${category.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className={styles.categoryOverlay}>
                      <div className={styles.categoryLabel}>{category.label}</div>
                      <div className={styles.categoryFooter}>
                        {hasPopularStyles && (
                          <span className={styles.categoryPopularBadge}>⭐ Popular</span>
                        )}
                        <span className={styles.categoryCount}>
                          {stylesInCategory.length} {stylesInCategory.length === 1 ? 'style' : 'styles'}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            // STYLE VIEW
            <>
              <div className={styles.styleViewHeader}>
                <button 
                  className={styles.backButton}
                  onClick={handleBackToCategories}
                >
                  ← Back to Categories
                </button>
                <div className={styles.currentCategory}>
                  <span className={styles.currentCategoryEmoji}>{currentCategory?.emoji}</span>
                  <span className={styles.currentCategoryName}>{currentCategory?.label}</span>
                  <span className={styles.currentCategoryCount}>
                    ({currentStyles.length} {currentStyles.length === 1 ? 'style' : 'styles'})
                  </span>
                </div>
              </div>

              <div className={styles.styleGrid}>
                {currentStyles.map((style) => (
                  <button
                    key={style.value}
                    className={`${styles.styleButton} ${
                      selectedStyle === style.value ? styles.selected : ''
                    }`}
                    onClick={() => handleStyleSelect(style.value)}
                  >
                    {popularStyles.includes(style.value) && (
                      <span className={styles.popularBadge}>⭐</span>
                    )}
                    <span className={styles.styleLabel}>{style.label}</span>
                    {selectedStyle === style.value && (
                      <span className={styles.selectedCheck}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
});

ConfigSelector.displayName = 'ConfigSelector';

export default ConfigSelector;