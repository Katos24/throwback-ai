import React from 'react';
import ImageCompareSlider from '../ImageCompareSlider'; // corrected path
import compareStyles from '../../styles/CompareSection.module.css';

const ImageCompareSection = () => {
  return (
    <section className={compareStyles.compareSection}>
      <div className={compareStyles.compareText}>
        <h2 className={compareStyles.compareTitle}>
          See the <span className={compareStyles.accent}>Transformation</span>
        </h2>
        <p className={compareStyles.compareSubtitle}>
          Real restorations from families like yours
        </p>
      </div>
      <div className={compareStyles.sliderContainer}>
        <ImageCompareSlider
          beforeImage="/images/premium-before.jpg"
          afterImage="/images/premium-after.jpg"
        />
      </div>
    </section>
  );
};

export default ImageCompareSection;
