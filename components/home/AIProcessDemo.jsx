import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './AIProcessDemo.module.css';

const AIDemoShowcase = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('avatars');

  // Detect screen width and intersection visibility
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  const handleTabClick = (tabName) => setActiveTab(tabName);

  return (
    <div ref={containerRef} className={`${styles.combinedContainer} ${isVisible ? styles.visible : ''}`}>
      {/* Background Effects */}
      <div className={styles.backgroundGrid}></div>
      <div className={styles.floatingOrbs}>
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
      </div>

      {/* Main Section */}
      <aside className={styles.analysisSection}>
        <div className={styles.sectionBadge}>
          <span className={styles.statusDot}></span>
          <span className={styles.badgeText}>AI CREATIVE TRANSFORMATIONS</span>
        </div>

        <h2 className={styles.sectionTitle}>
          Transform Your
          <span className={styles.titleGradient}> Photos with AI</span>
        </h2>

        <p className={styles.sectionSubtitle}>
          Explore our <strong>next-generation AI tools</strong> to create unique avatars or vintage decade-style portraits.  
          Designed for artists, creators, and anyone who loves nostalgic or modern AI transformations.
        </p>

        {/* Tabs */}
        <div className={styles.transformTabs}>
          <button
            className={`${styles.tabButton} ${activeTab === 'avatars' ? styles.active : ''}`}
            onClick={() => handleTabClick('avatars')}
          >
            <span className={styles.tabIcon}>🧑‍🎨</span>
            <span>Avatars</span>
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'decades' ? styles.active : ''}`}
            onClick={() => handleTabClick('decades')}
          >
            <span className={styles.tabIcon}>📸</span>
            <span>Decades</span>
          </button>
        </div>

        {/* Avatars Demo */}
        <div
          className={`${styles.analysisDemo} ${activeTab !== 'avatars' ? styles.hidden : ''}`}
          id="avatars-demo"
        >
          {/* Left - Avatar Animation */}
          <div className={styles.scanningFrame}>
            <div className={styles.imageFrame}>
              <Image
                src="/images/avatar-before.jpg"
                alt="User photo before AI avatar transformation"
                fill
                className={styles.bwImage}
                sizes="(max-width: 768px) 100vw, 500px"
                priority
              />

              <div className={styles.colorLayer}>
                <Image
                  src="/images/avatar-after.jpg"
                  alt="AI-generated avatar"
                  fill
                  className={styles.colorImage}
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>

              <div className={styles.colorWave}></div>

              {/* Processing Text */}
              <div className={styles.processingOverlay}>
                <div className={styles.processingText}>
                  <div className={styles.processingLine}>
                    <span className={styles.processingDot}></span>
                    Detecting facial landmarks...
                  </div>
                  <div className={styles.processingLine}>
                    <span className={styles.processingDot}></span>
                    Applying AI art filters...
                  </div>
                  <div className={styles.processingLine}>
                    <span className={styles.processingDot}></span>
                    Rendering avatar variations...
                  </div>
                  <div className={styles.processingLine}>
                    <span className={styles.processingDot}></span>
                    Finalizing portrait style...
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.colorProgress}>
              <div className={styles.progressBar}>
                <div className={styles.progressFill}></div>
              </div>
              <span className={styles.progressText}>Creating avatar... 87%</span>
            </div>
          </div>

          {/* Right - Stats */}
          <div className={styles.statsColumn}>
            <div className={styles.resultsPanel}>
              <div className={styles.resultsSummary}>
                <div className={styles.confidenceScore}>
                  <div className={styles.scoreNumber}>98.1%</div>
                  <div className={styles.scoreLabel}>Style Accuracy</div>
                </div>
                <div className={styles.detectionsFound}>
                  <div className={styles.detectionsNumber}>5</div>
                  <div className={styles.detectionsLabel}>Avatar Styles</div>
                </div>
              </div>

              <div className={styles.detectedIssues}>
                <div className={styles.colorTag}>Retro</div>
                <div className={styles.colorTag}>Cartoon</div>
                <div className={styles.colorTag}>Sketch</div>
                <div className={styles.colorTag}>Cinematic</div>
              </div>
            </div>

            {/* CTA */}
            <div className={styles.ctaSection}>
              <div className={styles.ctaText}>
                <h3>Create your AI avatar today</h3>
                <p>Turn your photo into a stunning AI-generated avatar in seconds.</p>
              </div>
              <div className={styles.ctaButtons}>
                <Link href="/avatars" className={styles.primaryCta}>
                  Try Avatars (50 credits)
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Decades Demo */}
        <div
          className={`${styles.analysisDemo} ${activeTab !== 'decades' ? styles.hidden : ''}`}
          id="decades-demo"
        >
          {/* Left - Decade Transformation */}
          <div className={styles.scanningFrame}>
            <div className={styles.imageFrame}>
              <Image
                src="/images/decades/female-example-1.jpg"
                alt="Modern photo before AI transformation"
                fill
                className={styles.damagedImage}
                sizes="(max-width: 768px) 100vw, 500px"
              />

              <div className={styles.repairLayer}>
                <Image
                  src="/images/decades/70s-showcase.jpg"
                  alt="AI decade transformation result"
                  fill
                  className={styles.repairedImage}
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>

              <div className={styles.repairWave}></div>

              {/* Processing Text */}
              <div className={styles.processingOverlay}>
                <div className={styles.processingText}>
                  <div className={styles.processingLine}>
                    <span className={styles.processingDot}></span>
                    Detecting photo lighting and tone...
                  </div>
                  <div className={styles.processingLine}>
                    <span className={styles.processingDot}></span>
                    Applying 1980s filter style...
                  </div>
                  <div className={styles.processingLine}>
                    <span className={styles.processingDot}></span>
                    Adjusting grain and vignette effects...
                  </div>
                  <div className={styles.processingLine}>
                    <span className={styles.processingDot}></span>
                    Finalizing vintage look...
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.colorProgress}>
              <div className={styles.progressBar}>
                <div className={styles.repairProgressFill}></div>
              </div>
              <span className={styles.progressText}>Generating decade style... 82%</span>
            </div>
          </div>

          {/* Right - Stats */}
          <div className={styles.statsColumn}>
            <div className={styles.resultsPanel}>
              <div className={styles.resultsSummary}>
                <div className={styles.confidenceScore}>
                  <div className={styles.scoreNumber}>97.4%</div>
                  <div className={styles.scoreLabel}>Style Match</div>
                </div>
                <div className={styles.detectionsFound}>
                  <div className={styles.detectionsNumber}>4</div>
                  <div className={styles.detectionsLabel}>Decade Variations</div>
                </div>
              </div>

              <div className={styles.detectedIssues}>
                <div className={styles.repairTag}>70s</div>
                <div className={styles.repairTag}>80s</div>
                <div className={styles.repairTag}>90s</div>
                <div className={styles.repairTag}>2000s</div>
              </div>
            </div>

            {/* CTA */}
            <div className={styles.ctaSection}>
              <div className={styles.ctaText}>
                <h3>Try our Decades Styles</h3>
                <p>Transform your photo into an authentic 70s, 80s, 90s, or 2000s portrait.</p>
              </div>
              <div className={styles.ctaButtons}>
                <Link href="/decades" className={styles.primaryCta}>
                  Try Decades (50 credits)
                </Link>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default AIDemoShowcase;
