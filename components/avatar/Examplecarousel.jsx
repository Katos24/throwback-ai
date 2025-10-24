import { memo } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import styles from '../../styles/AvatarPage.module.css';

/**
 * ExampleCarousel Component - Optimized
 * - Memoized to prevent unnecessary re-renders
 * - Priority loading for first 3 images
 * - Progressive lazy loading for remaining images
 */
const ExampleCarousel = memo(({ examples, onImageClick }) => {
  // Carousel configuration with lazy loading
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    lazyLoad: 'progressive',
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

  return (
    <div className={styles.examplesSection}>
      <h2 className={styles.examplesTitle}>See What&apos;s Possible</h2>
      <Slider {...carouselSettings} className={styles.carousel}>
        {examples.map((example, index) => (
          <div key={example.id} className={styles.carouselItem}>
            <div 
              className={styles.exampleCard}
              onClick={() => onImageClick(index)}
            >
              <Image
                src={example.image}
                alt={`${example.style} avatar example`}
                width={300}
                height={400}
                loading={index < 3 ? "eager" : "lazy"} // First 3 eager, rest lazy
                priority={index < 3} // Prioritize first 3 images
                className={styles.exampleImage}
                sizes="(max-width: 768px) 100vw, 300px"
              />
              <div className={styles.exampleOverlay}>
                <span className={styles.exampleCategory}>{example.category}</span>
                <span className={styles.exampleStyle}>{example.style}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
});

ExampleCarousel.displayName = 'ExampleCarousel';

export default ExampleCarousel;