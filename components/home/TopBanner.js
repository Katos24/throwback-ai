import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import TopBannerStyles from '../../styles/TopBannerTest.module.css';
import ImageCompareSlider from '../ImageCompareSlider';

// TopBanner combines a static before/after stack with an interactive slider
const TopBanner = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen width to adjust layout if needed
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={containerRef} className={TopBannerStyles.combinedContainer}>
      {/* Left: Before/After Images Side-by-Side */}
      <aside className={TopBannerStyles.bannerSection}>
        <div className={TopBannerStyles.bannerBadge}>About Anastasis</div>
        <h2 className={TopBannerStyles.bannerTitle}>
          Heritage-Specific{' '}
          <span className={TopBannerStyles.titleAccent}>AI Restoration</span>
        </h2>
        <p className={TopBannerStyles.bannerSubtitle}>
          Trained on authentic film grain, sepia tones, and analog damage from the 1900s–1990s,
          Anastasis preserves history with pixel-perfect precision.
        </p>

        <div className={TopBannerStyles.imageStack}>
          <div className={TopBannerStyles.imageBox}>
            <Image
              src="/images/beforeexample.jpg"
              alt="Before restoration"
              layout="fill"
              className={TopBannerStyles.image}
              sizes="(max-width: 768px) 100vw, 300px"
            />
            <span className={TopBannerStyles.imageLabel}>Before</span>
          </div>

          <div className={TopBannerStyles.imageBox}>
            <Image
              src="/images/afterexample.jpg"
              alt="After restoration"
              layout="fill"
              className={TopBannerStyles.image}
              sizes="(max-width: 768px) 100vw, 300px"
            />
            <span className={TopBannerStyles.imageLabel}>After</span>
          </div>
        </div>
      </aside>

      {/* Right: Interactive Compare Slider */}
      <aside className={TopBannerStyles.sliderSection}>
        <h2 className={TopBannerStyles.sliderTitle}>
          See the <span className={TopBannerStyles.accent}>Transformation</span>
        </h2>
        <p className={TopBannerStyles.sliderSubtitle}>
          Real restorations from families like yours
        </p>
        <div className={TopBannerStyles.sliderContainer}>
          <ImageCompareSlider
            beforeImage="/images/premium-before.jpg"
            afterImage="/images/premium-after.jpg"
            orientation={isMobile ? 'vertical' : 'horizontal'}
          />
        </div>
      </aside>
    </div>
  );
};

export default TopBanner;
