import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from '../../styles/AvatarPage.module.css';

/**
 * ImageLightbox Component
 * Full-screen image viewer with navigation controls
 * Rendered as a portal to document.body for proper z-index layering
 */
const ImageLightbox = ({ 
  isOpen, 
  images, 
  currentIndex, 
  onClose, 
  onNext, 
  onPrev 
}) => {
  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrev(e);
      } else if (e.key === 'ArrowRight') {
        onNext(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  // Don't render if not open or on server-side
  if (!isOpen || typeof document === 'undefined') {
    return null;
  }

  const currentImage = images[currentIndex];

  return createPortal(
    <div className={styles.lightbox} onClick={onClose}>
      {/* Previous button */}
      <button 
        onClick={onPrev} 
        className={styles.lightboxBtnPrev}
        aria-label="Previous image"
      >
        ‹
      </button>
      
      {/* Main image */}
      <img
        src={currentImage.image}
        alt={currentImage.style}
        className={styles.lightboxImage}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
      />
      
      {/* Next button */}
      <button 
        onClick={onNext} 
        className={styles.lightboxBtnNext}
        aria-label="Next image"
      >
        ›
      </button>
      
      {/* Image info overlay */}
      <div className={styles.lightboxInfo}>
        <span className={styles.lightboxCategory}>{currentImage.category}</span>
        <span className={styles.lightboxStyle}>{currentImage.style}</span>
      </div>
      
      {/* Close button */}
      <button 
        onClick={onClose}
        className={styles.lightboxClose}
        aria-label="Close lightbox"
      >
        ✕
      </button>
    </div>,
    document.body
  );
};

export default ImageLightbox;