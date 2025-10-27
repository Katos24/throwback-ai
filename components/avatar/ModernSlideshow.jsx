import { memo, useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './ModernSlideshow.module.css';

/**
 * ModernSlideshow - Auto-playing slideshow with smooth crossfade
 * Modern, cinematic feel with Ken Burns zoom effect
 */
const ModernSlideshow = memo(({ examples }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % examples.length);
        setIsTransitioning(false);
      }, 500); // Half of transition time
      
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [examples.length]);

  const currentSlide = examples[currentIndex];
  const nextSlide = examples[(currentIndex + 1) % examples.length];

  return (
    <div className={styles.slideshowSection}>
      <div className={styles.slideshowContainer}>
        
        {/* Main Slideshow */}
        <div className={styles.slideshowWrapper}>
          {/* Current Slide */}
          <div 
            className={`${styles.slide} ${styles.currentSlide} ${
              isTransitioning ? styles.fadeOut : ''
            }`}
          >
            <Image
              src={currentSlide.image}
              alt={`${currentSlide.style} avatar example`}
              fill
              priority
              className={styles.slideImage}
            />
            <div className={styles.slideOverlay}>
              <div className={styles.slideContent}>
                <span className={styles.slideCategory}>{currentSlide.category}</span>
                <h3 className={styles.slideTitle}>{currentSlide.style}</h3>
              </div>
            </div>
          </div>

          {/* Next Slide (for smooth transition) */}
          <div 
            className={`${styles.slide} ${styles.nextSlide} ${
              isTransitioning ? styles.fadeIn : ''
            }`}
          >
            <Image
              src={nextSlide.image}
              alt={`${nextSlide.style} avatar example`}
              fill
              className={styles.slideImage}
            />
            <div className={styles.slideOverlay}>
              <div className={styles.slideContent}>
                <span className={styles.slideCategory}>{nextSlide.category}</span>
                <h3 className={styles.slideTitle}>{nextSlide.style}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className={styles.progressContainer}>
          {examples.map((_, index) => (
            <button
              key={index}
              className={`${styles.progressDot} ${
                index === currentIndex ? styles.activeDot : ''
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Thumbnail Strip (optional, looks modern) */}
        <div className={styles.thumbnailStrip}>
          {examples.map((example, index) => (
            <button
              key={example.id}
              className={`${styles.thumbnail} ${
                index === currentIndex ? styles.activeThumbnail : ''
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <Image
                src={example.image}
                alt={example.style}
                width={80}
                height={100}
                className={styles.thumbnailImage}
              />
              {index === currentIndex && (
                <div className={styles.thumbnailHighlight}></div>
              )}
            </button>
          ))}
        </div>

        {/* Manual Navigation Arrows */}
        <button
          className={`${styles.navButton} ${styles.navPrev}`}
          onClick={() => setCurrentIndex((prev) => (prev - 1 + examples.length) % examples.length)}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          className={`${styles.navButton} ${styles.navNext}`}
          onClick={() => setCurrentIndex((prev) => (prev + 1) % examples.length)}
          aria-label="Next slide"
        >
          ›
        </button>

      </div>
    </div>
  );
});

ModernSlideshow.displayName = 'ModernSlideshow';

export default ModernSlideshow;