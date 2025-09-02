import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import heroStyles from '../../styles/CarouselHero.module.css';

export default function HeroSection() {
  // Transformation examples with links
  const transformationExamples = [
    { id: 'restore-1', before: "/images/basicpage-before.jpg", after: "/images/basicpage-after.jpg", category: "Photo Restoration", link: "replicate/restore-basic" },
    { id: 'restore-2', before: "/images/restore-before-2.jpg", after: "/images/restore-after-2.jpg", category: "Photo Restoration", link: "replicate/restore-premium" },
    { id: 'colorize-1', before: "/images/before6.jpg", after: "/images/after6.jpg", category: "AI Colorization", link: "replicate/colorize" },
    { id: 'cartoon-1', before: "/images/cartoon-before.jpg", after: "/images/cartoon-example.jpg", category: "Cartoon Art", link: "replicate/cartoon" },
    { id: 'yearbook-1', before: "/images/yearbook-before.jpg", after: "/images/yearbook-after.jpg", category: "90s Yearbook", link: "replicate/yearbook" },
    { id: 'avatar-1', before: "/images/avatar-before.jpg", after: "/images/avatar-after.jpg", category: "Professional Avatar", link: "replicate/avatar" },
  ];

  // Auto-rotate center image
  const [centerIndex, setCenterIndex] = useState(0);
  const yearbookExamples = transformationExamples.filter(ex => ex.category === "90s Yearbook");

  useEffect(() => {
    const timer = setInterval(() => {
      setCenterIndex((prev) => (prev + 1) % yearbookExamples.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [yearbookExamples.length]);

  const restoreExamples = transformationExamples.filter(ex => ex.category === "Photo Restoration");
  const rightExamples = transformationExamples.filter(ex => ["Cartoon Art", "Professional Avatar"].includes(ex.category));

  return (
    <section className={heroStyles.hero}>
      {/* Header */}
      <div className={heroStyles.heroContainer}>
        <div className={heroStyles.heroHeader}>
          <h1 className={heroStyles.heroTitle}>
            Transform Any Photo Into Something Amazing
          </h1>
          <p className={heroStyles.heroSubtitle}>
            From restoring precious family memories to creating viral social content. 
            See what our AI can do with your photos in seconds.
          </p>
        </div>

        {/* Action Buttons */}
        <div className={heroStyles.heroActions}>
          <Link href="/upload" className={heroStyles.primaryCTA}>Upload Photo</Link>
          <Link href="#examples" className={heroStyles.secondaryCTA}>See Demo</Link>
        </div>

        {/* 3-Column Showcase */}
        <div className={heroStyles.transformationShowcase}>
          {/* Left Column - Restore */}
          <div className={heroStyles.leftColumn}>
            {restoreExamples.map(ex => (
              <div key={ex.id} className={heroStyles.sideExample}>
                <div className={heroStyles.imageWrapper}>
                  <img src={ex.after} alt={ex.category} className={heroStyles.sideImage} />
                  <Link href={ex.link} className={heroStyles.hoverButton}>Go to Page</Link>
                </div>
                <span>{ex.category}</span>
              </div>
            ))}
          </div>

          {/* Center Column - 90s Yearbook */}
          <div className={heroStyles.centerColumn}>
            {yearbookExamples.length > 0 && (
              <div className={heroStyles.mainExample}>
                <div className={heroStyles.imageWrapper}>
                  <img src={yearbookExamples[centerIndex].after} alt="90s Yearbook" className={heroStyles.mainImage} />
                  <Link href={yearbookExamples[centerIndex].link} className={heroStyles.hoverButton}>Go to Page</Link>
                </div>
                <span>{yearbookExamples[centerIndex].category}</span>
              </div>
            )}
          </div>

          {/* Right Column - Cartoon & Avatar */}
          <div className={heroStyles.rightColumn}>
            {rightExamples.map(ex => (
              <div key={ex.id} className={heroStyles.sideExample}>
                <div className={heroStyles.imageWrapper}>
                  <img src={ex.after} alt={ex.category} className={heroStyles.sideImage} />
                  <Link href={ex.link} className={heroStyles.hoverButton}>Go to Page</Link>
                </div>
                <span>{ex.category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Bar */}
        <div className={heroStyles.trustBar}>
          <div className={heroStyles.trustItem}><span className={heroStyles.checkmark}>✓</span>50K+ Photos Transformed</div>
          <div className={heroStyles.trustItem}><span className={heroStyles.checkmark}>✓</span>2.3s Average Speed</div>
          <div className={heroStyles.trustItem}><span className={heroStyles.checkmark}>✓</span>100% Private & Secure</div>
          <div className={heroStyles.trustItem}><span className={heroStyles.checkmark}>✓</span>No Signup Required</div>
        </div>
      </div>
    </section>
  );
}
