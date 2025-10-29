import { memo, useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './CategoryTabGallery.module.css';
import AVATAR_STYLES from '../AvatarStyles';

/**
 * CategoryTabGallery - Tabbed gallery with expandable style grids per category
 * Gender first approach - select gender, then browse styles with matching images
 */
const CategoryTabGallery = memo(({ onStyleSelect, onGenderChange, selectedGender }) => {
  const [activeCategory, setActiveCategory] = useState('fantasy');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [imageKey, setImageKey] = useState(0);
  useEffect(() => {
  if (!selectedGender) {
    handleGenderChange('male');
  }
}, []);

  // Force image reload when page becomes visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setImageKey(prev => prev + 1);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Category configuration
  const categories = [
    { value: 'fantasy', label: 'Fantasy', emoji: '🧙', color: '#3b82f6' },
    { value: 'scifi', label: 'Sci-Fi', emoji: '🚀', color: '#06b6d4' },
    { value: 'historical', label: 'Historical', emoji: '🏛️', color: '#f97316' },
    { value: 'portrait', label: 'Portrait', emoji: '📸', color: '#8b5cf6' },
    { value: 'holiday', label: 'Holiday', emoji: '🎄', color: '#10b981' },
   // { value: 'anime', label: 'Anime', emoji: '🎌', color: '#ef4444' }, // DISABLED - Uncomment to re-enable
  ];

  // Get styles for active category
  const categoryStyles = AVATAR_STYLES[activeCategory] || [];
  
  // Show 6 initially, expand to show all
  const initialShowCount = 6;
  const isExpanded = expandedCategories[activeCategory];
  const displayedStyles = isExpanded 
    ? categoryStyles 
    : categoryStyles.slice(0, initialShowCount);

  const handleStyleClick = (style) => {
    setSelectedStyle(style.value);
    
    if (onStyleSelect) {
      onStyleSelect(activeCategory, style.value);
      
      // Scroll to upload photo section
      setTimeout(() => {
        const uploadSection = document.getElementById('upload-section') || 
                            document.querySelector('[class*="upload"]') ||
                            document.querySelector('[class*="Upload"]');
        
        if (uploadSection) {
          uploadSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        } else {
          // Fallback: scroll down by viewport height
          window.scrollBy({
            top: window.innerHeight * 0.8,
            behavior: 'smooth'
          });
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
    setSelectedStyle(null); // Clear selection when switching categories
  };

  const handleGenderChange = (gender) => {
    if (onGenderChange) {
      onGenderChange(gender);
      setSelectedStyle(null); // Clear selection when switching gender
    }
  };

  return (
    <div className={styles.galleryContainer}>
      
      {/* Gender Selection - FIRST */}
      <div className={styles.genderSection}>
        <h3 className={styles.genderTitle}>Step 1: Choose Your Gender</h3>
        <p className={styles.genderSubtitle}>This helps us show you the right style examples</p>
        <div className={styles.genderButtons}>
          <button
            className={`${styles.genderButton} ${selectedGender === 'male' ? styles.activeGender : ''}`}
            onClick={() => handleGenderChange('male')}
          >
            <span className={styles.genderLabel}>Male</span>
          </button>
          <button
            className={`${styles.genderButton} ${selectedGender === 'female' ? styles.activeGender : ''}`}
            onClick={() => handleGenderChange('female')}
          >
            <span className={styles.genderLabel}>Female</span>
          </button>
        </div>
      </div>

      {/* Only show styles if gender is selected */}
      {!selectedGender ? (

<div className={styles.selectGenderPrompt}>
  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>👆</div>
  <p>
    <strong style={{ fontSize: '1.2em', color: '#a8b3ff' }}>
      Choose Your Gender First
    </strong>
    <br />
    <span style={{ fontSize: '0.95em', opacity: 0.85, marginTop: '0.75rem', display: 'inline-block' }}>
      Then you'll see all available avatar styles
    </span>
  </p>
</div>
      ) : (
        <>
          {/* Category Tabs */}
          <div className={styles.tabsWrapper}>
            <h3 className={styles.stylesTitle}>Step 2: Pick Your Style</h3>
            <div className={styles.tabsContainer}>
              {categories.map(cat => (
                <button
                  key={cat.value}
                  className={`${styles.tab} ${activeCategory === cat.value ? styles.activeTab : ''}`}
                  onClick={() => handleCategoryChange(cat.value)}
                  style={{
                    '--tab-color': cat.color
                  }}
                >
                  <span className={styles.tabEmoji}>{cat.emoji}</span>
                  <span className={styles.tabLabel}>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Style Grid for Active Category */}
          <div className={styles.stylesSection} key={`${activeCategory}-${selectedGender}`}>
            <div className={styles.stylesGrid}>
              {displayedStyles.map((style, index) => {
                // Generate clean filename from style value
                const styleSlug = style.value.split(',')[0].replace(/\s+/g, '-').toLowerCase();
                const imagePath = `/images/avatarcards/${activeCategory}-${styleSlug}-${selectedGender}.jpg`;
                
                console.log('Loading image:', imagePath); // Debug log
                
                return (
                  <div
                    key={index}
                    className={`${styles.styleCard} ${selectedStyle === style.value ? styles.selectedCard : ''}`}
                    onClick={() => handleStyleClick(style)}
                  >
                    {/* Style Image */}
                    <div className={styles.styleImage}>
                      <img
                        key={`${imagePath}-${imageKey}`}
                        src={imagePath}
                        alt={`${style.label} - ${selectedGender}`}
                        onLoad={(e) => {
                          console.log('✅ Image loaded:', imagePath);
                        }}
                        onError={(e) => {
                          console.log('❌ Image failed:', imagePath);
                          // Show fallback gradient background, don't hide image
                          e.target.style.opacity = '0';
                          const parent = e.target.parentElement;
                          if (parent) {
                            parent.style.background = `linear-gradient(135deg, ${categories.find(c => c.value === activeCategory).color}dd 0%, ${categories.find(c => c.value === activeCategory).color}66 100%)`;
                          }
                        }}
                      />
                    </div>

                    {/* Overlay */}
                    <div className={styles.styleOverlay}>
                      <h3 className={styles.styleName}>{style.label}</h3>
                      <div className={styles.styleCTA}>Select →</div>
                    </div>

                    {/* Hover border */}
                    <div className={styles.styleBorder}></div>
                  </div>
                );
              })}
            </div>

            {/* Show More/Less Button */}
            {categoryStyles.length > initialShowCount && (
              <div className={styles.expandButtonContainer}>
                <button
                  className={styles.expandButton}
                  onClick={toggleExpanded}
                >
                  {isExpanded ? (
                    <>Show Less ↑</>
                  ) : (
                    <>Show All {categoryStyles.length} {categories.find(c => c.value === activeCategory).label} Styles ↓</>
                  )}
                </button>
              </div>
            )}
          </div>
        </>
      )}

    </div>
  );
});

CategoryTabGallery.displayName = 'CategoryTabGallery';

export default CategoryTabGallery;