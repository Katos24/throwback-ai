import { useState } from 'react';
import Image from 'next/image';

/**
 * Universal Decade Style Gallery Component
 * Works for 70s, 80s, 90s, 2000s, etc.
 * Dynamically loads images based on decade and gender
 * DEFAULTS TO MALE - shows male images immediately
 */
export default function DecadeStyleGallery({
  styles, // CSS module styles
  styleOptions, // Array of style objects from decade-specific prompts file
  selectedStyle,
  setSelectedStyle,
  userGender = 'male', // DEFAULT TO MALE - shows images immediately
  decade, // '70', '80', '90', '00' (for 2000s)
  visibleCount = 6 // How many to show initially
}) {
  const [showAll, setShowAll] = useState(false);
  const displayedStyles = showAll ? styleOptions : styleOptions.slice(0, visibleCount);
  const remainingCount = styleOptions.length - visibleCount;

  // Function to get the correct image path based on decade and gender
  const getImagePath = (style) => {
    if (userGender === 'male') {
      return `/images/decades/${decade}s-styles/male/${style.id}.jpg`;
    } else if (userGender === 'female') {
      return `/images/decades/${decade}s-styles/female/${style.id}.jpg`;
    }
    // Non-binary doesn't use images
    return null;
  };

  // Check if we should show images (not for non-binary)
  const showImages = userGender === 'male' || userGender === 'female';

  return (
    <div className={styles.configPanel}>
      <h3 className={styles.configTitle}>{decade}S STYLE</h3>
      
      <div className={styles.styleGallery}>
        {displayedStyles && displayedStyles.map((style) => (
          <button
            key={style.id}
            className={`${styles.galleryCard} ${selectedStyle === style.id ? styles.active : ''} ${!showImages ? styles.textOnly : ''}`}
            onClick={() => setSelectedStyle(style.id)}
            aria-pressed={selectedStyle === style.id}
            title={style.description}
          >
            {showImages ? (
              <>
                {/* Style Image */}
                <div className={styles.galleryImageWrapper}>
                  <Image
                    src={getImagePath(style)}
                    alt={`${decade}s ${userGender} ${style.label}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className={styles.galleryImage}
                    style={{ objectFit: 'cover' }}
                  />
                  {/* Emoji overlay in corner */}
                  {style.emoji && (
                    <span className={styles.galleryEmoji}>{style.emoji}</span>
                  )}
                  {/* Selected checkmark */}
                  {selectedStyle === style.id && (
                    <div className={styles.selectedBadge}>
                      <span>✓</span>
                    </div>
                  )}
                </div>
                
                {/* Style Label */}
                <div className={styles.galleryLabel}>
                  <span className={styles.galleryLabelText}>
                    {style.label ? style.label.toUpperCase() : 'STYLE'}
                  </span>
                </div>
              </>
            ) : (
              /* Text-only version for non-binary */
              <div className={styles.textOnlyContent}>
                {style.emoji && <span className={styles.styleEmoji}>{style.emoji}</span>}
                <span className={styles.textOnlyLabel}>
                  {style.label ? style.label.toUpperCase() : 'STYLE'}
                </span>
                {style.description && (
                  <span className={styles.textOnlyDescription}>
                    {style.description}
                  </span>
                )}
              </div>
            )}
          </button>
        ))}

        {/* Show More Button */}
        {!showAll && remainingCount > 0 && (
          <button
            className={`${styles.galleryCard} ${styles.showMoreCard}`}
            onClick={() => setShowAll(true)}
          >
            <div className={styles.showMoreContent}>
              <span className={styles.showMoreEmoji}>➕</span>
              <span className={styles.showMoreText}>
                +{remainingCount} MORE STYLES
              </span>
            </div>
          </button>
        )}

        {/* Show Less Button */}
        {showAll && remainingCount > 0 && (
          <button
            className={`${styles.galleryCard} ${styles.showMoreCard}`}
            onClick={() => setShowAll(false)}
          >
            <div className={styles.showMoreContent}>
              <span className={styles.showMoreEmoji}>➖</span>
              <span className={styles.showMoreText}>
                SHOW LESS
              </span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}