// components/HeroWithSlider.js
import React, { useState } from 'react';
import ImageCompareSlider from "../ImageCompareSlider";
import styles from './HeroWithSlider.module.css';

export default function HeroWithSlider() {
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // Track when user drags the slider
  const handleSliderInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      // Optional: Fire analytics event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'slider_interaction', {
          event_category: 'engagement',
          event_label: 'hero_slider'
        });
      }
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        
        {/* HOOK - Clear, benefit-driven */}
        <div className={styles.header}>
       
          
          <h1 className={styles.title}>
            Restore Damaged Photos to Life
          </h1>
          
          <p className={styles.subtitle}>
            Upload → Wait 60 seconds → Download. No skills needed.
          </p>
        </div>

        {/* INTERACTIVE DEMO - The money maker */}
        <div className={styles.demoWrapper}>
          <div className={styles.sliderContainer}>
            <ImageCompareSlider
              beforeImage="/images/before6.jpg"
              afterImage="/images/after6.jpg"
              onInteraction={handleSliderInteraction}
              loading="eager"
            />
            
   
          </div>
          
          {/* Labels */}
          <div className={styles.sliderLabels}>
            <span className={styles.labelBefore}>Original (Damaged)</span>
            <span className={styles.labelAfter}>AI Restored</span>
          </div>
        </div>




      </div>
    </section>
  );
}