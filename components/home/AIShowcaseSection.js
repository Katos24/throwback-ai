import React from 'react';
import Image from 'next/image';
import aiShowcaseStyles from '../../styles/AIShowcase.module.css';

const AIShowcaseSection = () => {
  const transformations = [
    {
      before: '/images/weddingbefore.jpg',
      after: '/images/weddingafter.jpg',
      year: '1952',
      category: 'Wedding Portrait',
      aiFeatures: ['Colorization', 'Detail Recovery', 'Noise Reduction'],
    },
    {
      before: '/images/1938before.jpg',
      after: '/images/1938after.jpg',
      year: '1938',
      category: 'Family Photo',
      aiFeatures: ['Crack Repair', 'Color Revival', 'Texture Enhancement'],
    },
    {
      before: '/images/1945before.jpg',
      after: '/images/1945after.jpg',
      year: '1945',
      category: 'Military Portrait',
      aiFeatures: ['Fade Correction', 'Uniform Colorization', 'Face Enhancement'],
    },
  ];

  return (
    <section className={aiShowcaseStyles.aiShowcase}>
      <div className={aiShowcaseStyles.container}>
        <div className={aiShowcaseStyles.showcaseHeader}>
          <div className={aiShowcaseStyles.aiLabel}>✨ AI POWERED</div>
          <h2 className={aiShowcaseStyles.showcaseTitle}>
            Witness the <span className={aiShowcaseStyles.titleGradient}>Neural Magic</span>
          </h2>
          <p className={aiShowcaseStyles.showcaseSubtitle}>
            Our heritage-trained AI doesn&apos;t just enhance &mdash; it resurrects lost memories with surgical precision
          </p>
        </div>

        <div className={aiShowcaseStyles.transformationGrid}>
          {transformations.map((item, index) => (
            <div key={index} className={aiShowcaseStyles.transformationCard}>
              <div className={aiShowcaseStyles.imageContainer}>
                <div className={aiShowcaseStyles.beforeAfterWrapper}>
                  <div className={aiShowcaseStyles.imageBox}>
                    <Image
                      src={item.before}
                      alt={`Before restoration - ${item.category}`}
                      width={300}
                      height={200}
                      className={aiShowcaseStyles.showcaseImage}
                    />
                    <div className={aiShowcaseStyles.imageLabel}>BEFORE</div>
                  </div>
                  <div className={aiShowcaseStyles.imageBox}>
                    <Image
                      src={item.after}
                      alt={`After restoration - ${item.category}`}
                      width={300}
                      height={200}
                      className={aiShowcaseStyles.showcaseImage}
                    />
                    <div className={aiShowcaseStyles.imageLabel}>AFTER</div>
                  </div>
                </div>
              </div>
              <div className={aiShowcaseStyles.cardInfo}>
                <div className={aiShowcaseStyles.photoMeta}>
                  <span className={aiShowcaseStyles.year}>{item.year}</span>
                  <span className={aiShowcaseStyles.category}>{item.category}</span>
                </div>
                <div className={aiShowcaseStyles.aiFeatures}>
                  {item.aiFeatures.map((feature, i) => (
                    <span key={i} className={aiShowcaseStyles.featureTag}>
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={aiShowcaseStyles.showcaseStats}>
          <div className={aiShowcaseStyles.statItem}>
            <div className={aiShowcaseStyles.statNumber}>2.3M+</div>
            <div className={aiShowcaseStyles.statLabel}>Photos Restored</div>
          </div>
          <div className={aiShowcaseStyles.statItem}>
            <div className={aiShowcaseStyles.statNumber}>98.7%</div>
            <div className={aiShowcaseStyles.statLabel}>Success Rate</div>
          </div>
          <div className={aiShowcaseStyles.statItem}>
            <div className={aiShowcaseStyles.statNumber}>47s</div>
            <div className={aiShowcaseStyles.statLabel}>Avg Process Time</div>
          </div>
        </div>

        <button className={aiShowcaseStyles.showcaseCTA}>
          <span className={aiShowcaseStyles.ctaText}>Experience AI Magic</span>
          <div className={aiShowcaseStyles.ctaGlow}></div>
        </button>
      </div>
    </section>
  );
};

export default AIShowcaseSection;
