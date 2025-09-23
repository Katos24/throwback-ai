import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TopBannerStyles from '../../styles/TopBannerTest.module.css';

const TopBanner = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('colorize');

  // Detect screen width and visibility for animations
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } 
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div ref={containerRef} className={`${TopBannerStyles.combinedContainer} ${isVisible ? TopBannerStyles.visible : ''}`}>
      
      {/* Background Effects */}
      <div className={TopBannerStyles.backgroundGrid}></div>
      <div className={TopBannerStyles.floatingOrbs}>
        <div className={TopBannerStyles.orb1}></div>
        <div className={TopBannerStyles.orb2}></div>
      </div>

      {/* AI Photo Restoration Demos */}
      <aside className={TopBannerStyles.analysisSection}>
        <div className={TopBannerStyles.sectionBadge}>
          <span className={TopBannerStyles.statusDot}></span>
          <span className={TopBannerStyles.badgeText}>AI PHOTO RESTORATION</span>
        </div>
        
        <h2 className={TopBannerStyles.sectionTitle}>
          Preserve Your
          <span className={TopBannerStyles.titleGradient}> Family Memories</span>
        </h2>
        
        <p className={TopBannerStyles.sectionSubtitle}>
          Watch our <strong>advanced AI restoration engines</strong> bring damaged family photos back to life. 
          Professional-grade neural networks trained specifically on historical photography.
        </p>

        {/* Restoration Service Tabs */}
        <div className={TopBannerStyles.transformTabs}>
          <button 
            className={`${TopBannerStyles.tabButton} ${activeTab === 'colorize' ? TopBannerStyles.active : ''}`}
            onClick={() => handleTabClick('colorize')}
          >
            <span className={TopBannerStyles.tabIcon}>🎨</span>
            <span>Colorize</span>
          </button>
          <button 
            className={`${TopBannerStyles.tabButton} ${activeTab === 'repair' ? TopBannerStyles.active : ''}`}
            onClick={() => handleTabClick('repair')}
          >
            <span className={TopBannerStyles.tabIcon}>✨</span>
            <span>Repair</span>
          </button>
        </div>

        {/* Colorization Demo */}
        <div 
          className={`${TopBannerStyles.analysisDemo} ${activeTab !== 'colorize' ? TopBannerStyles.hidden : ''}`} 
          id="colorize-demo"
        >
          {/* Left Column - Image */}
          <div className={TopBannerStyles.scanningFrame}>
            <div className={TopBannerStyles.imageFrame}>
              <Image
                src="/images/before6.jpg"
                alt="Black and white family photo being colorized"
                fill
                className={TopBannerStyles.bwImage}
                sizes="(max-width: 768px) 100vw, 500px"
                priority
              />
              
              <div className={TopBannerStyles.colorLayer}>
                <Image
                  src="/images/after6.jpg"
                  alt="Historically accurate colorized version"
                  fill
                  className={TopBannerStyles.colorImage}
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>
              
              <div className={TopBannerStyles.colorWave}></div>

              {/* Processing Indicators */}
              <div className={TopBannerStyles.processingOverlay}>
                <div className={TopBannerStyles.processingText}>
                  <div className={TopBannerStyles.processingLine}>
                    <span className={TopBannerStyles.processingDot}></span>
                    Analyzing historical color palettes...
                  </div>
                  <div className={TopBannerStyles.processingLine}>
                    <span className={TopBannerStyles.processingDot}></span>
                    Applying period-accurate skin tones...
                  </div>
                  <div className={TopBannerStyles.processingLine}>
                    <span className={TopBannerStyles.processingDot}></span>
                    Reconstructing fabric and material colors...
                  </div>
                  <div className={TopBannerStyles.processingLine}>
                    <span className={TopBannerStyles.processingDot}></span>
                    Preserving original photo quality...
                  </div>
                </div>
              </div>
            </div>

            <div className={TopBannerStyles.colorProgress}>
              <div className={TopBannerStyles.progressBar}>
                <div className={TopBannerStyles.progressFill}></div>
              </div>
              <span className={TopBannerStyles.progressText}>Adding historical colors... 87%</span>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className={TopBannerStyles.statsColumn}>
            <div className={TopBannerStyles.resultsPanel}>
              <div className={TopBannerStyles.resultsSummary}>
                <div className={TopBannerStyles.confidenceScore}>
                  <div className={TopBannerStyles.scoreNumber}>96.3%</div>
                  <div className={TopBannerStyles.scoreLabel}>Historical Accuracy</div>
                </div>
                <div className={TopBannerStyles.detectionsFound}>
                  <div className={TopBannerStyles.detectionsNumber}>12</div>
                  <div className={TopBannerStyles.detectionsLabel}>Color Regions</div>
                </div>
              </div>
              
              <div className={TopBannerStyles.detectedIssues}>
                <div className={TopBannerStyles.colorTag}>Skin Tones (3)</div>
                <div className={TopBannerStyles.colorTag}>Clothing (4)</div>
                <div className={TopBannerStyles.colorTag}>Environment (5)</div>
              </div>
            </div>

            {/* CTA for Colorize */}
            <div className={TopBannerStyles.ctaSection}>
              <div className={TopBannerStyles.ctaText}>
                <h3>Ready to colorize your photos?</h3>
                <p>Transform black & white family memories into vibrant, historically accurate color photos.</p>
              </div>
              <div className={TopBannerStyles.ctaButtons}>
                <Link href="/replicate/restore-premium" className={TopBannerStyles.primaryCta}>
                  Try Colorization (40 credits)
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Repair Demo */}
        <div 
          className={`${TopBannerStyles.analysisDemo} ${activeTab !== 'repair' ? TopBannerStyles.hidden : ''}`} 
          id="repair-demo"
        >
          {/* Left Column - Image */}
          <div className={TopBannerStyles.scanningFrame}>
            <div className={TopBannerStyles.imageFrame}>
              <Image
                src="/images/basicpage-before.jpg"
                alt="Damaged family photo with scratches and tears"
                fill
                className={TopBannerStyles.damagedImage}
                sizes="(max-width: 768px) 100vw, 500px"
              />
              
              <div className={TopBannerStyles.repairLayer}>
                <Image
                  src="/images/basicpage-after.jpg"
                  alt="Professionally restored version"
                  fill
                  className={TopBannerStyles.repairedImage}
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>
              
              <div className={TopBannerStyles.repairWave}></div>
              
              {/* Processing Text */}
              <div className={TopBannerStyles.processingOverlay}>
                <div className={TopBannerStyles.processingText}>
                  <div className={TopBannerStyles.processingLine}>
                    <span className={TopBannerStyles.processingDot}></span>
                    Scanning for tears and scratches...
                  </div>
                  <div className={TopBannerStyles.processingLine}>
                    <span className={TopBannerStyles.processingDot}></span>
                    Reconstructing missing pixels...
                  </div>
                  <div className={TopBannerStyles.processingLine}>
                    <span className={TopBannerStyles.processingDot}></span>
                    Removing water damage and stains...
                  </div>
                  <div className={TopBannerStyles.processingLine}>
                    <span className={TopBannerStyles.processingDot}></span>
                    Enhancing faded areas...
                  </div>
                </div>
              </div>
            </div>

            <div className={TopBannerStyles.colorProgress}>
              <div className={TopBannerStyles.progressBar}>
                <div className={TopBannerStyles.repairProgressFill}></div>
              </div>
              <span className={TopBannerStyles.progressText}>Restoring family photo... 78%</span>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className={TopBannerStyles.statsColumn}>
            <div className={TopBannerStyles.resultsPanel}>
              <div className={TopBannerStyles.resultsSummary}>
                <div className={TopBannerStyles.confidenceScore}>
                  <div className={TopBannerStyles.scoreNumber}>94.1%</div>
                  <div className={TopBannerStyles.scoreLabel}>Restoration Quality</div>
                </div>
                <div className={TopBannerStyles.detectionsFound}>
                  <div className={TopBannerStyles.detectionsNumber}>18</div>
                  <div className={TopBannerStyles.detectionsLabel}>Issues Repaired</div>
                </div>
              </div>
              
              <div className={TopBannerStyles.detectedIssues}>
                <div className={TopBannerStyles.repairTag}>Scratches (8)</div>
                <div className={TopBannerStyles.repairTag}>Fading (6)</div>
                <div className={TopBannerStyles.repairTag}>Tears (4)</div>
              </div>
            </div>

            {/* CTA for Repair */}
            <div className={TopBannerStyles.ctaSection}>
              <div className={TopBannerStyles.ctaText}>
                <h3>Fix your damaged photos?</h3>
                <p>Remove scratches, tears, and water damage from irreplaceable family memories.</p>
              </div>
              <div className={TopBannerStyles.ctaButtons}>
                <Link href="/replicate/restore-basic" className={TopBannerStyles.primaryCta}>
                  Try Free Restore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default TopBanner;