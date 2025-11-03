import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './FeatureShowcase.module.css';

export default function FeatureShowcase({ features }) {
  return (
    <section className={styles.showcaseSection}>
      <div className={styles.featuresContainer}>
        {features.map((feature, index) => {
          const isReversed = index % 2 !== 0;
          
          return (
            <div 
              key={feature.id} 
              className={`${styles.featureCard} ${isReversed ? styles.reversed : ''}`}
            >
              {/* Image Side */}
              <div className={styles.imageContainer}>
                <div 
                  className={styles.imageWrapper}
                  style={{ background: feature.gradient }}
                >
                  <Image
                    src={feature.image}
                    alt={`${feature.title} showcase`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.showcaseImage}
                    style={{ objectFit: 'cover' }}
                  />
                  <div className={styles.imageOverlay}>
                    <span className={styles.featureEmoji}>{feature.emoji}</span>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className={styles.contentContainer}>
                <div className={styles.content}>
                  {feature.badge && (
                    <span 
                      className={styles.featureBadge}
                      style={{ color: feature.accentColor }}
                    >
                      {feature.badge}
                    </span>
                  )}
                  
                  <h2 className={styles.featureTitle}>{feature.title}</h2>
                  
                  <p className={styles.featureTagline}>{feature.tagline}</p>
                  
                  <p className={styles.featureDescription}>
                    {feature.description}
                  </p>

                  {/* Features List */}
                  {feature.highlights && (
                    <ul className={styles.highlightsList}>
                      {feature.highlights.map((highlight, i) => (
                        <li key={i} className={styles.highlight}>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path 
                              d="M16.6667 5L7.50002 14.1667L3.33335 10" 
                              stroke="currentColor" 
                              strokeWidth="2.5" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            />
                          </svg>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Stats */}
                  <div className={styles.featureStats}>
                    <div className={styles.stat}>
                      <span className={styles.statNumber}>{feature.credits}</span>
                      <span className={styles.statLabel}>Credits</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statNumber}>{feature.time}</span>
                      <span className={styles.statLabel}>Processing</span>
                    </div>
                    {feature.samples && (
                      <div className={styles.stat}>
                        <span className={styles.statNumber}>{feature.samples}</span>
                        <span className={styles.statLabel}>Styles</span>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Link 
                    href={feature.link} 
                    className={styles.featureButton}
                    style={{ 
                      background: feature.gradient,
                      boxShadow: `0 4px 20px ${feature.accentColor}40`
                    }}
                  >
                    {feature.buttonText}
                    <span className={styles.arrow}>→</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}