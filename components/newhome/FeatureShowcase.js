import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './FeatureShowcase.module.css';

export default function FeatureShowcase() {
  const router = useRouter();
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      id: 'restore',
      badge: 'For Families',
      title: 'Preserve Family Memories',
      subtitle: 'Bring old photos back to life',
      description: 'Restore precious family photos damaged over decades. Perfect for creating memorial displays, family history books, or surprising relatives with renewed memories.',
      features: [
        'Remove scratches & tears',
        'Fix faded colors',
        'Colorize black & white',
        'Enhance faces & details'
      ],
      images: [
        '/images/home/restore_left.jpg',
        '/images/home/restore_center.jpg',
        '/images/home/restore_right.jpg'
      ],
      cta: 'Start Restoring',
      link: '/replicate/restore-premium',
      color: '#3b82f6'
    },
    {
      id: 'avatar',
      badge: 'For Creators',
      title: 'Stand Out Online',
      subtitle: 'Profile pics that get noticed',
      description: 'Create unique AI avatars for LinkedIn, Discord, Twitter, or gaming. Transform into fantasy characters, professional headshots, or sci-fi heroes that reflect your personality.',
      features: [
        'Fantasy & mythology',
        'Sci-fi & futuristic',
        'Professional headshots',
        'Anime & cartoon styles'
      ],
      images: [
        '/images/avatarcards/avatar_center.png',
        '/images/avatarcards/fantasy-ice-mage-female.jpg',
        '/images/avatarcards/fantasy-medieval-fantasy-warrior-male.jpg'
      ],
      cta: 'Create Avatar',
      link: '/replicate/avatar',
      color: '#8b5cf6'
    },
    {
      id: 'decades',
      badge: 'For Influencers',
      title: 'Nostalgia Content',
      subtitle: 'Viral throwback posts',
      description: 'Create authentic 70s, 80s, 90s, or Y2K yearbook photos for Instagram and TikTok. Perfect for themed parties, nostalgia marketing, or just having fun with friends.',
      features: [
        '70s disco vibes',
        '80s neon dreams',
        '90s grunge era',
        'Y2K aesthetic'
      ],
      images: [
        '/images/decades/80s-showcase.jpg',
        '/images/decades/70s-showcase.jpg',
        '/images/decades/90s-showcase.jpg'
      ],
      cta: 'Try Decades',
      link: '/decades',
      color: '#ec4899'
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {features.map((feature, index) => (
          <div 
            key={feature.id}
            className={`${styles.featureRow} ${index % 2 === 1 ? styles.reverse : ''}`}
          >
            
            {/* Text Content */}
            <div className={styles.textContent}>
              <div className={styles.badge} style={{ borderColor: feature.color, color: feature.color }}>
                {feature.badge}
              </div>
              
              <h2 className={styles.featureTitle}>{feature.title}</h2>
              <p className={styles.featureSubtitle}>{feature.subtitle}</p>
              <p className={styles.featureDescription}>{feature.description}</p>
              
              <ul className={styles.featureList}>
                {feature.features.map((item, idx) => (
                  <li key={idx} className={styles.featureItem}>
                    <svg className={styles.checkIcon} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <button 
                className={styles.ctaButton}
                style={{ background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}dd 100%)` }}
                onClick={() => router.push(feature.link)}
              >
                {feature.cta} →
              </button>
            </div>

            {/* Image Stack - 3D Cards */}
            <div 
              className={styles.imageContent}
              onMouseEnter={() => setHoveredFeature(feature.id)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className={styles.imageStack}>
                
                {/* Back Left Image */}
                <div 
                  className={`${styles.stackedImage} ${styles.imageLeft} ${hoveredFeature === feature.id ? styles.animateLeft : ''}`}
                >
                  <Image
                    src={feature.images[0]}
                    alt={`${feature.title} example 1`}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>

                {/* Front Center Image */}
                <div 
                  className={`${styles.stackedImage} ${styles.imageCenter} ${hoveredFeature === feature.id ? styles.animateCenter : ''}`}
                >
                  <Image
                    src={feature.images[1]}
                    alt={`${feature.title} example 2`}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>

                {/* Back Right Image */}
                <div 
                  className={`${styles.stackedImage} ${styles.imageRight} ${hoveredFeature === feature.id ? styles.animateRight : ''}`}
                >
                  <Image
                    src={feature.images[2]}
                    alt={`${feature.title} example 3`}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>

              </div>
            </div>

          </div>
        ))}

      </div>
    </section>
  );
}