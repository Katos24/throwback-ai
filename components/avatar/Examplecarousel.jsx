import { memo } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import styles from './ExampleCarousel.module.css';

/**
 * ExampleCarousel - Sleek Modern Design
 * Minimalist cards with smooth hover effects
 */
const ExampleCarousel = memo(({ examples, onImageClick }) => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '40px',
          arrows: false
        }
      }
    ]
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Transform Into Anything</h2>
        <p className={styles.subtitle}>See the possibilities with AI-powered avatars</p>
      </div>
      
      <Slider {...carouselSettings} className={styles.carousel}>
        {examples.map((example, index) => (
          <div key={example.id} className={styles.slideWrapper}>
            <div 
              className={styles.card}
              onClick={() => onImageClick(index)}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={example.image}
                  alt={`${example.style} avatar example`}
                  width={280}
                  height={380}
                  loading={index < 3 ? "eager" : "lazy"}
                  priority={index < 3}
                  className={styles.image}
                />
                <div className={styles.overlay}>
                  <div className={styles.badge}>{example.category}</div>
                  <div className={styles.styleName}>{example.style}</div>
                </div>
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