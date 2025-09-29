import React, { useEffect } from 'react';

const AutoScrollCarousel = () => {
  // Sample photos - replace with your actual image paths
  const photos = [
    { src: "/images/gallery/70s1.jpg", alt: "70s hippie transformation" },
    { src: "/images/gallery/70s2.jpg", alt: "70s disco transformation" },
    { src: "/images/gallery/70s3.jpg", alt: "70s bohemian transformation" },
    { src: "/images/gallery/80s1.jpg", alt: "80s new wave transformation" },
    { src: "/images/gallery/80s2.jpg", alt: "80s rock transformation" },
    { src: "/images/gallery/80s3.jpg", alt: "80s pop culture transformation" },
    { src: "/images/gallery/90s1.jpg", alt: "90s grunge transformation" },
    { src: "/images/gallery/90s2.jpg", alt: "90s hip-hop transformation" },
    { src: "/images/gallery/90s3.jpg", alt: "90s pop star transformation" },
    { src: "/images/gallery/2000s1.jpg", alt: "2000s emo transformation" },
    { src: "/images/gallery/2000s2.jpg", alt: "2000s scene transformation" },
    { src: "/images/gallery/2000s3.jpg", alt: "2000s pop punk transformation" },
  ];

  // Duplicate the photos array to create seamless loop
  const duplicatedPhotos = [...photos, ...photos];

  // Inject keyframes animation only on client side
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes scroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }

      /* Tablet */
      @media (max-width: 1024px) {
        .carousel-item {
          width: 320px !important;
          height: 240px !important;
        }
      }

      /* Mobile */
      @media (max-width: 768px) {
        .carousel-item {
          width: 240px !important;
          height: 180px !important;
        }
        .carousel-track {
          gap: 12px !important;
        }
      }

      /* Small Mobile */
      @media (max-width: 480px) {
        .carousel-item {
          width: 200px !important;
          height: 150px !important;
        }
        .carousel-track {
          gap: 10px !important;
        }
      }
    `;
    document.head.appendChild(styleSheet);

    // Cleanup function to remove style when component unmounts
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <section style={styles.carouselSection}>
      <h2 style={styles.heading}>See the Magic in Action</h2>
      <p style={styles.subheading}>Real transformations, powered by AI</p>
      
      <div style={styles.carouselWrapper}>
        <div style={styles.carouselTrack} className="carousel-track">
          {duplicatedPhotos.map((photo, index) => (
            <div key={index} style={styles.carouselItem} className="carousel-item">
              <img
                src={photo.src}
                alt={photo.alt}
                style={styles.carouselImage}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  carouselSection: {
    padding: '80px 20px',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    overflow: 'hidden',
    position: 'relative',
  },
  heading: {
    fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
    fontWeight: '700',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: '12px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  subheading: {
    fontSize: 'clamp(1rem, 3vw, 1.125rem)',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '50px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  carouselWrapper: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
    WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
  },
  carouselTrack: {
    display: 'flex',
    gap: '40px',
    animation: 'scroll 40s linear infinite',
    width: 'fit-content',
  },
    carouselItem: {
    flex: '0 0 auto',
    width: '380px',
    height: '280px',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.3s ease',
    border: '3px solid #ffffff',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
};

export default AutoScrollCarousel;