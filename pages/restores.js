import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { Suspense } from 'react';
import Image from 'next/image';
import ImageCompareSlider from '../components/ImageCompareSlider';
import styles from '../styles/RestoresLanding.module.css';
import Link from 'next/link';
import RestoresSEO from '../components/SEO/RestoresSEO';

// Lazy-load components
const CustomerSuccessStories = dynamic(() => import('../components/home/SuccessStories'));
const TopBanner = dynamic(() => import('../components/home/TopBanner'));

// Loader fallback
const Loader = () => <div className="my-32 text-center text-gray-500">Loading...</div>;

const RESTORE_OPTIONS = [
  {
    id: 'premium',
    title: 'Professional Colorization',
    subtitle: 'Museum Quality Results',
    description: 'Transform black and white photos into vivid color with historically accurate, professional-grade restoration.',
    features: [
      'Full color restoration',
      'Advanced damage repair',
      'Historically accurate colors'
    ],
    credits: 40,
    price: 'From $0.50',
    time: '10-30 seconds',
    link: '/replicate/restore-premium',
    badge: '⭐ PREMIUM',
    exampleImage: '/images/examples/premium-example.jpg' // Add your image path here
  },
  {
    id: 'basic',
    title: 'Quick Repair',
    subtitle: 'Fast & Affordable',
    description: 'Perfect for fixing scratches, tears, and fading on your precious family photos.',
    features: [
      'Remove scratches & tears',
      'Repair water damage',
      'Ready in seconds'
    ],
    credits: 1,
    price: 'As low as $0.01',
    time: 'Under 10 seconds',
    link: '/replicate/restore-basic',
    badge: '💰 BEST VALUE',
    exampleImage: '/images/examples/basic-example.jpg' // Add your image path here
  }
];

// Example images - using combined before/after images
const EXAMPLE_IMAGES = [
  {
    id: 1,
    combinedImage: '/images/colorize-before-after-combined.jpg',
    beforeImage: '/images/examples/restore-before-1.jpg',
    afterImage: '/images/examples/restore-after-1.jpg',
    title: 'Family Portrait Restoration'
  },
  {
    id: 2,
    combinedImage: '/images/restore-before-after-combined.jpg',
    beforeImage: '/images/examples/restore-before-2.jpg',
    afterImage: '/images/examples/restore-after-2.jpg',
    title: 'Vintage Photo Colorization'
  },
  {
    id: 3,
    combinedImage: '/images/gallery/restore4.jpg',
    beforeImage: '/images/examples/restore-before-3.jpg',
    afterImage: '/images/examples/restore-after-3.jpg',
    title: 'Damaged Photo Repair'
  }
];

export default function RestoresLanding() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);
  const videoRef = useRef(null);

  const [successRef, successInView] = useInView({ 
    triggerOnce: true, 
    rootMargin: '0px 0px -100px 0px' 
  });

  const [topBannerRef, topBannerInView] = useInView({ 
    triggerOnce: true, 
    rootMargin: '0px 0px -100px 0px' 
  });

  // Force video to play on mobile
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Autoplay prevented:', error);
      });
    }
  }, []);

  const handleCardClick = (option) => {
    setSelectedOption(option.id);
    setTimeout(() => {
      router.push(option.link);
    }, 300);
  };

  return (
    <>
      <RestoresSEO />
      <div className={styles.container}>
        {/* Starfield Background */}
        <div className={styles.starfield}></div>

        {/* Grid Pattern */}
        <div className={styles.gridPattern}></div>

        {/* Content Container */}
        <div className={styles.contentWrapper}>
          
          {/* Greek Column Decorative Elements */}
          <div className={styles.columnLeft}></div>
          <div className={styles.columnRight}></div>

        {/* Hero Section */}
          <div className={styles.heroSection}>
            {/* Main Headline */}
            <h1 className={styles.title}>
              Preserve Your
              <br />
              <span className={styles.gradientText}>Family Legacy</span>
            </h1>

            <p className={styles.subtitle}>
              Transform damaged, faded, and black & white photos into vibrant memories. Our specialized AI adds historically accurate color, repairs tears and scratches, and enhances clarity—all in under 30 seconds. No subscriptions, just results.
            </p>

            {/* Auto-scrolling Before/After Banner */}
            <div className={styles.marqueeContainer}>
              <div className={styles.marqueeTrack}>
                {/* First set of images */}
                {EXAMPLE_IMAGES.map((example) => (
                  <div key={`first-${example.id}`} className={styles.marqueeItem}>
                    <Image
                      src={example.combinedImage}
                      alt={example.title}
                      width={400}
                      height={300}
                      className={styles.marqueeImage}
                    />
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {EXAMPLE_IMAGES.map((example) => (
                  <div key={`second-${example.id}`} className={styles.marqueeItem}>
                    <Image
                      src={example.combinedImage}
                      alt={example.title}
                      width={400}
                      height={300}
                      className={styles.marqueeImage}
                    />
                  </div>
                ))}
              </div>
            </div>

          {/* Free Credits Banner */}
<div className={styles.freeCreditsBanner}>
  <div className={styles.bannerContent}>
    <div className={styles.bannerUrgency}>
      🔥 LIMITED TIME OFFER
    </div>
    <span className={styles.bannerText}>
      New users get <strong>50 free credits</strong>
    </span>
    <button 
      className={styles.bannerButton}
      onClick={() => {
        console.log('Clicked! Navigating to /signup');
        router.push('/signup');
      }}
    >
      Start Restoring Free
    </button>
  </div>
</div>
</div>

          {/* Two Option Cards */}
          <div className={styles.optionsGrid}>
            {RESTORE_OPTIONS.map((option) => (
              <div
                key={option.id}
                className={`${styles.optionCard} ${
                  selectedOption === option.id ? styles.selected : ''
                } ${option.id === 'premium' ? styles.premiumCard : styles.basicCard}`}
                onClick={() => handleCardClick(option)}
              >
                {/* Glow effect for premium */}
                {option.id === 'premium' && <div className={styles.cardGlow}></div>}

                {/* Badge */}
                <div className={styles.cardBadge}>
                  {option.badge}
                </div>

                {/* Example Image */}
                <div className={styles.cardExampleImage}>
                  <Image
                    src={option.exampleImage}
                    alt={`${option.title} example`}
                    width={300}
                    height={200}
                    className={styles.exampleImg}
                  />
                </div>
                
                <h3 className={styles.cardTitle}>{option.title}</h3>
                <p className={styles.cardSubtitle}>{option.subtitle}</p>
                <p className={styles.cardDescription}>{option.description}</p>

                {/* Features */}
                <ul className={styles.featureList}>
                  {option.features.map((feature, index) => (
                    <li key={index} className={styles.featureItem}>
                      <span className={styles.featureCheck}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price and Time */}
                <div className={styles.cardFooter}>
                  <div className={styles.priceBox}>
                    <div className={styles.credits}>{option.credits} {option.credits === 1 ? 'credit' : 'credits'}</div>
                    <div className={styles.price}>{option.price}/photo</div>
                  </div>
                  <div className={styles.timeBox}>
                    <span>⏱️ {option.time}</span>
                  </div>
                </div>

                {/* Button */}
                <button className={styles.selectButton}>
                  Start {option.title}
                </button>
              </div>
            ))}
          </div>

          {/* Hero Video - MOVED HERE AFTER OPTIONS */}
          <div className={styles.heroVideoWrapper}>
            <video
              ref={videoRef}
              className={styles.heroVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onLoadedData={() => {
                if (videoRef.current) {
                  videoRef.current.play().catch(err =>
                    console.log("Autoplay prevented:", err)
                  );
                }
              }}
              onError={(e) => console.error("Video error:", e)}
            >
              <source src="/videos/restore-demo.mp4" type="video/mp4" />
              <source src="/videos/restore-demo.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Pricing Link */}
          <div className={styles.pricingLinkWrapper}>
            <p className={styles.pricingText}>
              Need more details? <Link href="/pricing" className={styles.inlineLink}>View full pricing breakdown</Link>
            </p>
          </div>

          {/* Examples Section */}
          <div className={styles.examplesSection}>
            <h2 className={styles.examplesTitle}>See the Transformation</h2>
            <p className={styles.examplesSubtitle}>
              Real photos restored with our AI technology
            </p>

            <div className={styles.examplesGrid}>
              {EXAMPLE_IMAGES.map((example) => (
                <div key={example.id} className={styles.exampleCard}>
                  <div className={styles.exampleImageWrapper}>
                    <ImageCompareSlider
                      beforeImage={example.beforeImage}
                      afterImage={example.afterImage}
                    />
                  </div>
                  <p className={styles.exampleTitle}>{example.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI RESTORATION DEMO - NEW */}
          <div ref={topBannerRef}>
            {topBannerInView && (
              <Suspense fallback={<Loader />}>
                <TopBanner />
              </Suspense>
            )}
          </div>

          {/* SUCCESS STORIES - NEW */}
          <div ref={successRef}>
            {successInView && (
              <Suspense fallback={<Loader />}>
                <CustomerSuccessStories />
              </Suspense>
            )}
          </div>

          {/* How It Works Section */}
          <div className={styles.howItWorksSection}>
            <h2 className={styles.howItWorksTitle}>Three Simple Steps</h2>
            <p className={styles.howItWorksSubtitle}>
              Restore your precious memories in minutes
            </p>

            <div className={styles.stepsGrid}>
              {/* Step 1 */}
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepImageWrapper}>
                  <Image
                    src="/images/how-it-works/upload.jpg"
                    alt="Upload your photo"
                    width={200}
                    height={150}
                    className={styles.stepImage}
                  />
                </div>
                <h3 className={styles.stepTitle}>Upload Your Photo</h3>
                <p className={styles.stepDescription}>
                  Click to upload or drag and drop your photo from your device.
                </p>
              </div>

              {/* Step 2 */}
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepImageWrapper}>
                  <Image
                    src="/images/how-it-works/restore.jpg"
                    alt="Click restore"
                    width={200}
                    height={150}
                    className={styles.stepImage}
                  />
                </div>
                <h3 className={styles.stepTitle}>Click Restore</h3>
                <p className={styles.stepDescription}>
                  Choose your restoration type and click the restore button. Our AI does the rest automatically.
                </p>
              </div>

              {/* Step 3 */}
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepImageWrapper}>
                  <Image
                    src="/images/how-it-works/results.jpg"
                    alt="Download and share"
                    width={200}
                    height={150}
                    className={styles.stepImage}
                  />
                </div>
                <h3 className={styles.stepTitle}>Download & Share</h3>
                <p className={styles.stepDescription}>
                  Download your restored photo and share it with family and friends. Keep it forever!
                </p>
              </div>
            </div>
          </div>

          {/* Trust Section */}
          <div className={styles.trustSection}>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}>🔒</div>
              <div className={styles.trustContent}>
                <div className={styles.trustTitle}>Private & Secure</div>
                <div className={styles.trustDesc}>Photos never shared</div>
              </div>
            </div>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}>💾</div>
              <div className={styles.trustContent}>
                <div className={styles.trustTitle}>Keep Forever</div>
                <div className={styles.trustDesc}>No subscriptions</div>
              </div>
            </div>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}>⚡</div>
              <div className={styles.trustContent}>
                <div className={styles.trustTitle}>Lightning Fast</div>
                <div className={styles.trustDesc}>Results in seconds</div>
              </div>
            </div>
          </div>

          {/* Greek Column Bottom Decorative */}
          <div className={styles.columnsBottom}>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={styles.columnBar}></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}