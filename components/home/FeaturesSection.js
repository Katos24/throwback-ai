import React from 'react';
import FeaturesStyles from '../../styles/FeaturesTest.module.css';

const FeaturesSection = () => {
  return (
    <section className={FeaturesStyles.features}>
      <div className={FeaturesStyles.container}>
        <h2 className={FeaturesStyles.title}>What Makes Anastasis Different?</h2>
        <p className={FeaturesStyles.subtitle}>
          Built specifically for family memories and genealogy projects
        </p>
        <div className={FeaturesStyles.grid}>
          <div className={FeaturesStyles.card}>
            <h3 className={FeaturesStyles.cardTitle}>🔬 Heritage-Specific AI</h3>
            <p className={FeaturesStyles.cardDescription}>
              Trained on vintage photography, film grain, sepia tones, and analog damage.&nbsp;
              Our models understand historical nuances from 1930s portraits to 1970s color casts.
            </p>
          </div>
          <div className={FeaturesStyles.card}>
            <h3 className={FeaturesStyles.cardTitle}>📚 Genealogy-Grade Quality</h3>
            <p className={FeaturesStyles.cardDescription}>
              Trusted by family archivists and professional genealogists.&nbsp;
              We don&apos;t slap filters &mdash; we bring clarity and color to moments that matter most.
            </p>
          </div>
          <div className={FeaturesStyles.card}>
            <h3 className={FeaturesStyles.cardTitle}>🔐 Fort Knox Privacy</h3>
            <p className={FeaturesStyles.cardDescription}>
              Every photo is processed securely and automatically deleted within one hour.&nbsp;
              No permanent storage, no creepy scraping, no training on your data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
