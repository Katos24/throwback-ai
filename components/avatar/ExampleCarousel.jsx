import { memo, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Slider from 'react-slick';
import styles from './ExampleCarousel.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/**

* ExampleCarousel - Throwback Layout with Lightbox
* Retains images from ExampleCarousel but adopts ThrowbackPage layout and behavior
  */
  const ExampleCarousel = memo(({ examples }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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
setCurrentIndex((prev) => (prev + 1) % examples.length);
};

const prevImage = (e) => {
e.stopPropagation();
setCurrentIndex((prev) => (prev - 1 + examples.length) % examples.length);
};

return ( <div className={styles.container}> <section className={styles.examplesSection}> <h2 className={styles.examplesTitle}>Transform Into Anything</h2> <p className={styles.examplesSubtitle}>See the possibilities with AI-powered avatars</p>

```
    <div className={styles.carouselContainer}>
      <Slider {...carouselSettings}>
        {examples.map((example, index) => (
          <div key={example.id} className={styles.carouselSlide}>
            <div
              className={styles.exampleCard}
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={example.image}
                alt={`${example.style} avatar example`}
                width={280}
                height={380}
                className={styles.exampleImage}
                loading={index < 3 ? 'eager' : 'lazy'}
                priority={index < 3}
              />
              <div className={styles.exampleOverlay}>
                <span className={styles.exampleDecade}>
                  {example.category || example.style}
                </span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  </section>

  {lightboxOpen && typeof document !== 'undefined' && createPortal(
    <div className={styles.lightbox} onClick={closeLightbox}>
      <button onClick={prevImage} className={styles.lightboxBtnPrev}>‹</button>
      <Image
        src={examples[currentIndex].image}
        alt={examples[currentIndex].style}
        width={800}
        height={1000}
        className={styles.lightboxImage}
      />
      <button onClick={nextImage} className={styles.lightboxBtnNext}>›</button>
    </div>,
    document.body
  )}
</div>
);
});

ExampleCarousel.displayName = 'ExampleCarousel';

export default ExampleCarousel;
