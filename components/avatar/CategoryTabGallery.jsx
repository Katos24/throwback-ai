import { memo, useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './CategoryTabGallery.module.css';
import AVATAR_STYLES from '../AvatarStyles';

/**
 * CategoryTabGallery - Clean layout
 * - Tabs and gender in one section
 * - Defaults to male, shows styles immediately
 */
const CategoryTabGallery = memo(({ onStyleSelect, onGenderChange, selectedGender }) => {
  const [activeCategory, setActiveCategory] = useState('fantasy');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [imageKey, setImageKey] = useState(0);

  // Default to male on load
  useEffect(() => {
    if (!selectedGender) {
      handleGenderChange('male');
    }
  }, [selectedGender]);

  // Refresh images when page visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) setImageKey(prev => prev + 1);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const categories = [
    { value: 'fantasy', label: 'Fantasy', color: '#3b82f6' },
    { value: 'scifi', label: 'Sci-Fi',  color: '#06b6d4' },
    { value: 'historical', label: 'Historical', color: '#f97316' },
    { value: 'portrait', label: 'Portrait',  color: '#8b5cf6' },
    { value: 'holiday', label: 'Holiday', color: '#10b981' },
  ];

  const categoryStyles = AVATAR_STYLES[activeCategory] || [];
  const initialShowCount = 6;
  const isExpanded = expandedCategories[activeCategory];
  const displayedStyles = isExpanded ? categoryStyles : categoryStyles.slice(0, initialShowCount);
  const remainingCount = categoryStyles.length - displayedStyles.length;

  const handleStyleClick = (style) => {
    setSelectedStyle(style.value);
    if (onStyleSelect) {
      onStyleSelect(activeCategory, style.value);
      setTimeout(() => {
        const uploadSection = document.getElementById('upload-section') || 
                              document.querySelector('[class*="upload"]');
        if (uploadSection) {
          uploadSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const toggleExpanded = () => {
    setExpandedCategories(prev => ({
      ...prev,
      [activeCategory]: !prev[activeCategory]
    }));
  };

  const handleCategoryChange = (newCategory) => {
    setActiveCategory(newCategory);
    setSelectedStyle(null);
  };

  const handleGenderChange = (gender) => {
    if (onGenderChange) {
      onGenderChange(gender);
      setSelectedStyle(null);
    }
  };

  return (
    <div className={styles.galleryContainer}>
      {/* Tabs + Gender */}
      <div className={styles.tabsWrapper}>
        <h3 className={styles.stylesTitle}>Step 1: Select Your Style</h3>
        <div className={styles.tabsContainer}>
          {categories.map(cat => (
            <button
              key={cat.value}
              className={`${styles.tab} ${activeCategory === cat.value ? styles.activeTab : ''}`}
              onClick={() => handleCategoryChange(cat.value)}
              style={{ '--tab-color': cat.color }}
            >
              <span className={styles.tabLabel}>{cat.label}</span>
            </button>
          ))}
        </div>

        <div className={styles.genderInline}>
          <button
            className={`${styles.genderButton} ${selectedGender === 'male' ? styles.activeGender : ''}`}
            onClick={() => handleGenderChange('male')}
          >
            Male
          </button>
          <button
            className={`${styles.genderButton} ${selectedGender === 'female' ? styles.activeGender : ''}`}
            onClick={() => handleGenderChange('female')}
          >
            Female
          </button>
        </div>
      </div>

      {/* Styles Grid */}
      <div className={styles.stylesSection} key={`${activeCategory}-${selectedGender}`}>
        <div className={styles.stylesGrid}>
          {displayedStyles.map((style, index) => {
            const styleSlug = style.value.split(',')[0].replace(/\s+/g, '-').toLowerCase();
            const imagePath = `/images/avatarcards/${activeCategory}-${styleSlug}-${selectedGender}.jpg`;

            return (
              <div
                key={index}
                className={`${styles.styleCard} ${selectedStyle === style.value ? styles.selectedCard : ''}`}
                onClick={() => handleStyleClick(style)}
              >
                <div className={styles.styleImage}>
                  <img
                    key={`${imagePath}-${imageKey}`}
                    src={imagePath}
                    alt={`${style.label} - ${selectedGender}`}
                    onError={(e) => {
                      e.target.style.opacity = '0';
                      const parent = e.target.parentElement;
                      if (parent) {
                        const cat = categories.find(c => c.value === activeCategory);
                        parent.style.background = `linear-gradient(135deg, ${cat.color}dd 0%, ${cat.color}66 100%)`;
                      }
                    }}
                  />
                </div>
                <div className={styles.styleOverlay}>
                  <h3 className={styles.styleName}>{style.label}</h3>
                  <div className={styles.styleCTA}>Select →</div>
                </div>
                <div className={styles.styleBorder}></div>
              </div>
            );
          })}

          {/* Dynamic "More Styles / Show Less" card */}
          {categoryStyles.length > initialShowCount && (
            <div
              className={styles.moreStylesCard}
              onClick={toggleExpanded}
              style={{
                background: `linear-gradient(135deg, #f97316dd 0%, #f9731666 100%)`,
              }}
            >
              <div className={styles.moreStylesContent}>
                {isExpanded ? (
                  <>
                    <h3>Show Less ↑</h3>
                    <p>Collapse to see fewer styles</p>
                  </>
                ) : (
                  <>
                    <h3>+{remainingCount} More Styles</h3>
                    <p>Click to explore all {categories.find(c => c.value === activeCategory).label} options</p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

CategoryTabGallery.displayName = 'CategoryTabGallery';
export default CategoryTabGallery;
