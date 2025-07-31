import React from 'react';
import Image from 'next/image';
import TopBannerStyles from '../../styles/TopBannerTest.module.css';

const TopBanner = () => {
  return (
    <section className={TopBannerStyles.banner}>
      <div className={TopBannerStyles.bannerContent}>
        <div className={TopBannerStyles.bannerBadge}>🔄 About Anastasis</div>
        <h2 className={TopBannerStyles.bannerTitle}>
          Heritage-Specific <span className={TopBannerStyles.titleAccent}>AI Restoration</span>
        </h2>
        <p className={TopBannerStyles.bannerSubtitle}>
          Unlike generic photo apps, Anastasis is trained specifically on vintage photography,{' '}
          film grain, sepia tones, and analog damage from the 1900s–1990s.
        </p>
        <div className={TopBannerStyles.bannerImages}>
          <div className={TopBannerStyles.bannerImageBox}>
            <Image
              src="/images/beforeexample.jpg"
              alt="Before"
              layout="fill"
              className={TopBannerStyles.bannerImage}
            />
            <div className={TopBannerStyles.bannerImageLabel}>Before</div>
          </div>
          <div className={TopBannerStyles.bannerImageBox}>
            <Image
              src="/images/afterexample.jpg"
              alt="After"
              layout="fill"
              className={TopBannerStyles.bannerImage}
            />
            <div className={TopBannerStyles.bannerImageLabel}>After</div>
          </div>
          {/* Add more image pairs here if needed */}
        </div>
      </div>
    </section>
  );
};

export default TopBanner;
