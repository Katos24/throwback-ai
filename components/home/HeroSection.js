import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import heroStyles from '../../styles/Hero.module.css';

// Lazy-load the video component when it enters viewport
const HeroVideo = () => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={videoRef} className={heroStyles.videoWrapper}>
      {isVisible && (
        <video
          className={heroStyles.heroVideo}
          preload="metadata"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/ThrowbackAIIntro.mp4" type="video/mp4" />
          <source src="/videos/ThrowbackAIIntro.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

const HeroSection = () => {
  return (
    <>
      <div className={heroStyles.fullWidthBanner}>
        <span>🔒 <strong>Privacy Guaranteed</strong></span>
        <span>⚡ <strong>Results in Under 2 Minutes</strong></span>
        <span>🆓 <strong>1 Free Restore & 5 More When You Sign Up</strong></span>
      </div>

      <section className={heroStyles.hero}>
        <div className={heroStyles.heroContent}>
          <h1 className={heroStyles.heroTitle}>
            Restore Memories, <span className={heroStyles.accent}>Not Just Images</span>
          </h1>

          <p className={heroStyles.heroSubtitle}>
            Bring your old family photos back to life with cutting-edge, privacy-first AI. No subscriptions,
            no gimmicks — just beautifully restored memories in under 2 minutes.
          </p>

          <div className={heroStyles.heroButtons}>
            <Link href="/replicate/restore-basic" className={heroStyles.secondaryButton}>
              Quick Enhance <span className={heroStyles.freePill}>Free</span>
            </Link>

            <Link href="/replicate/restore-premium" className={heroStyles.primaryButton}>
              Full Restore & Colorize <span className={heroStyles.premiumPill}>Premium</span>
            </Link>
          </div>

          <HeroVideo />

          <p className={heroStyles.subText}>
            Sign up now and get <strong>5 bonus credits</strong> — no subscription required!
          </p>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
