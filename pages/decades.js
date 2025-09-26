import { useRouter } from 'next/router';
import Slider from 'react-slick';
import styles from '../styles/DecadesLanding.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ThrowbackPage() {
  const router = useRouter();

  const decades = [
    {
      id: '70s',
      title: '1970s',
      subtitle: 'Disco Fever',
      emoji: '🕺',
      description: 'Funky beats & bell-bottoms',
      className: 'decade-70s'
    },
    {
      id: '80s',
      title: '1980s',
      subtitle: 'Neon Dreams',
      emoji: '🎮',
      description: 'Synth wave & big hair',
      className: 'decade-80s'
    },
    {
      id: '90s',
      title: '1990s',
      subtitle: 'Grunge Era',
      emoji: '📼',
      description: 'Alternative rock & flannel',
      className: 'decade-90s'
    },
    {
      id: '2000s',
      title: '2000s',
      subtitle: 'Digital Dawn',
      emoji: '💿',
      description: 'Y2K aesthetic & pop culture',
      className: 'decade-2000s'
    }
  ];

  const examplePhotos = [
    { src: '/images/yearbook/70s.jpg', decade: '70s', alt: '70s yearbook example' },
    { src: '/images/yearbook/80s2.jpg', decade: '80s', alt: '80s yearbook example' },
    { src: '/images/yearbook/90s2.jpg', decade: '90s', alt: '90s yearbook example' },
    { src: '/images/yearbook/2000s2.jpg', decade: '2000s', alt: '2000s yearbook example' },
    { src: '/images/yearbook/70s2.jpg', decade: '70s', alt: '70s yearbook example 2' },
    { src: '/images/yearbook/80s3.jpg', decade: '80s', alt: '80s yearbook example 2' }
  ];

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
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '50px',  // Space on sides
        arrows: false           // No arrows, just dots
      }
    }
  ]
};

  const handleDecadeClick = (decadeId) => {
    router.push(`/replicate/${decadeId}`);
  };

  return (
    <div className={styles.container}>
      {/* Animated background elements */}
      <div className={styles.bgAnimation}>
        <div className={`${styles.floatingShape} ${styles.shape1}`}></div>
        <div className={`${styles.floatingShape} ${styles.shape2}`}></div>
        <div className={`${styles.floatingShape} ${styles.shape3}`}></div>
        <div className={`${styles.floatingShape} ${styles.shape4}`}></div>
      </div>

      {/* Main content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.logo}>Throwback AI</h1>
          <p className={styles.tagline}>Choose Your Era</p>
        </header>

        {/* Decades grid */}
        <div className={styles.decadesGrid}>
          {decades.map((decade, index) => (
            <div
              key={decade.id}
              className={`${styles.decadeCard} ${styles[decade.className]}`}
              onClick={() => handleDecadeClick(decade.id)}
              style={{ animationDelay: `${index * 0.1}s`, cursor: 'pointer' }}
            >
              <div className={styles.cardContent}>
                <div className={styles.decadeEmoji}>{decade.emoji}</div>
                <h2 className={styles.decadeTitle}>{decade.title}</h2>
                <p className={styles.decadeSubtitle}>{decade.subtitle}</p>
                <p className={styles.decadeDescription}>{decade.description}</p>
              </div>
              <div className={styles.cardGlow}></div>
              <div className={styles.cardBorder}></div>
            </div>
          ))}
        </div>

        {/* Example Photos Carousel */}
        <section className={styles.examplesSection}>
          <h2 className={styles.examplesTitle}>See The Results</h2>
          <p className={styles.examplesSubtitle}>Real transformations from each decade</p>
          
          <div className={styles.carouselContainer}>
            <Slider {...carouselSettings}>
              {examplePhotos.map((photo, index) => (
                <div key={index} className={styles.carouselSlide}>
                  <div className={styles.exampleCard}>
                    <img 
                      src={photo.src} 
                      alt={photo.alt}
                      className={styles.exampleImage}
                    />
                    <div className={styles.exampleOverlay}>
                      <span className={styles.exampleDecade}>{photo.decade} Style</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      </div>
    </div>
  );
}