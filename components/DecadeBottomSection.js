import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Slider from 'react-slick';
import styles from '../styles/DecadeBottomSection.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const DECADE_INFO = {
  '70s': {
    emoji: '🌈',
    title: '70s',
    description: 'Hippie, disco, punk, and glam rock styles',
    path: '/replicate/70s',
    color: 'orange'
  },
  '80s': {
    emoji: '⚡',
    title: '80s',
    description: 'Mohawks, leather jackets, ripped jeans, and rebellious vibes',
    path: '/replicate/80s',
    color: 'neon'
  },
  '90s': {
    emoji: '📼',
    title: '90s',
    description: 'Frosted tips, matching outfits, and pop-star style',
    path: '/replicate/90s',
    color: 'purple'
  },
  '2000s': {
    emoji: '💿',
    title: '2000s',
    description: 'Baggy jeans, skate shoes, and rebellious streetwear',
    path: '/replicate/2000s',
    color: 'blue'
  }
};

const DecadeBottomSection = ({ currentDecade = '90s' }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const otherDecades = Object.entries(DECADE_INFO).filter(([key]) => key !== currentDecade);

  // Updated carousel settings to match landing page
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '20px',
          arrows: false
        }
      }
    ]
  };

  // Array of all decade images for the carousel
  const yearbookImages = Object.keys(DECADE_INFO).map(decade => ({
    src: `/images/yearbook/${decade}.jpg`,
    decade: decade,
    alt: `${decade} style`,
    label: DECADE_INFO[decade].title
  }));

  const handleImageClick = (index) => {
    if (window.innerWidth <= 768) {
      setCurrentIndex(index);
      setLightboxOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % yearbookImages.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + yearbookImages.length) % yearbookImages.length);
  };

  return (
    <div className={styles.bottomSection}>
      
      {/* Dynamic Yearbook Section */}
      <section className={styles.dynamicYearbook}>
        <h2 className={styles.sectionTitle}>Dynamic Yearbook</h2>
        <p className={styles.sectionSubtitle}>
          See how others rocked their retro transformations
        </p>
        
        <div className={styles.carouselContainer}>
          <Slider {...carouselSettings}>
            {yearbookImages.map((photo, index) => (
              <div key={index} className={styles.carouselSlide}>
                <div className={styles.yearbookCard} onClick={() => handleImageClick(index)}>
                  <img 
                    src={photo.src} 
                    alt={photo.alt} 
                    className={styles.yearbookImage} 
                  />
                  <div className={styles.yearbookOverlay}>
                    <span className={styles.yearbookLabel}>{photo.label} Style</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        
        <Link href="/gallery" className={styles.yearbookButton}>
          Explore Full Yearbook →
        </Link>
      </section>
      
      {/* How It Works Section */}
      <section className={styles.howItWorks}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <div className={styles.stepsGrid}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <h3>Upload Your Photo</h3>
            <p>Use a clear photo of your face for best results. We support PNG, JPG, and HEIC files up to 10MB.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <h3>Choose Your Style</h3>
            <p>Select your gender, photo quality preference, and pick from authentic decade-specific styles.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <h3>Generate & Download</h3>
            <p>Our AI creates your yearbook photo in about 30 seconds. Download and share your new look!</p>
          </div>
        </div>
      </section>

      {/* Other Decades Section */}
      <section className={styles.otherDecades}>
        <h2 className={styles.sectionTitle}>Try Other Decades</h2>
        <p className={styles.sectionSubtitle}>
          Travel through time with our complete collection of decade styles
        </p>
        
        <div className={styles.decadeGrid}>
          {otherDecades.map(([decade, info]) => (
            <Link 
              key={decade} 
              href={info.path} 
              className={`${styles.decadeCard} ${styles[info.color]}`}
            >
              <div className={styles.decadeEmoji}>{info.emoji}</div>
              <h3 className={styles.decadeTitle}>{info.title}</h3>
              <p className={styles.decadeDescription}>{info.description}</p>
              <div className={styles.decadeCta}>Try {decade} Style →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faq}>
        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        <div className={styles.faqGrid}>
          <div className={styles.faqItem}>
            <h3>What photo works best?</h3>
            <p>Clear, well-lit photos where your face is visible work best. Avoid sunglasses, heavy shadows, or multiple people in the frame.</p>
          </div>
          <div className={styles.faqItem}>
            <h3>How long does it take?</h3>
            <p>Generation typically takes 20-45 seconds. You&apos;ll see a progress bar showing the current status.</p>
          </div>
          <div className={styles.faqItem}>
            <h3>Can I use this commercially?</h3>
            <p>Generated images are for personal use. For commercial usage rights, please contact our support team.</p>
          </div>
          <div className={styles.faqItem}>
            <h3>What if I&apos;m not happy with the result?</h3>
            <p>Try adjusting the style strength slider or selecting a different style. Each generation uses credits, so experiment with settings first.</p>
          </div>
        </div>
      </section>

      {/* Credits & Pricing */}
      <section className={styles.pricing}>
        <div className={styles.pricingCard}>
          <h2>Need More Credits?</h2>
          <p>Each decade photo costs 50 credits. Choose the perfect pack for your time travel needs!</p>
          <div className={styles.pricingOptions}>
            <div className={styles.pricingOption}>
              <span className={styles.creditAmount}>Revival Pack</span>
              <span className={styles.price}>$9.99</span>
              <span className={styles.yearbook}>20 yearbook photos</span>
            </div>
            <div className={styles.pricingOption}>
              <span className={styles.creditAmount}>Resurgence Pack</span>
              <span className={styles.price}>$14.99</span>
              <span className={styles.yearbook}>32 yearbook photos</span>
              <span className={styles.popular}>Most Popular</span>
            </div>
            <div className={styles.pricingOption}>
              <span className={styles.creditAmount}>Eternal Pack</span>
              <span className={styles.price}>$29.99</span>
              <span className={styles.yearbook}>70 yearbook photos</span>
            </div>
          </div>
          <Link href="/pricing" className={styles.pricingButton}>
            View All Plans
          </Link>
        </div>
      </section>

      {/* Footer CTA */}
      <section className={styles.footerCta}>
        <h2>Ready to Time Travel?</h2>
        <p>Transform your photos with authentic decade styling</p>
        <Link href="/pricing" className={styles.ctaButton}>
          Get Started Now
        </Link>
      </section>

      {/* Lightbox Portal */}
      {lightboxOpen && typeof document !== 'undefined' && createPortal(
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button onClick={prevImage} className={styles.lightboxBtnPrev}>‹</button>
          <img
            src={yearbookImages[currentIndex].src}
            alt={yearbookImages[currentIndex].alt}
            className={styles.lightboxImage}
          />
          <button onClick={nextImage} className={styles.lightboxBtnNext}>›</button>
        </div>,
        document.body
      )}
    </div>
  );
};

export default DecadeBottomSection;