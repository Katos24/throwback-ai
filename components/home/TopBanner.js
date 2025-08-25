import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import TopBannerStyles from '../../styles/TopBannerTest.module.css';
import ImageCompareSlider from '../ImageCompareSlider';

const TopBanner = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <div ref={containerRef} className={`${TopBannerStyles.combinedContainer} ${isVisible ? TopBannerStyles.visible : ''}`}>
      
      {/* Background Effects */}
      <div className={TopBannerStyles.backgroundGrid}></div>
      <div className={TopBannerStyles.floatingOrbs}>
        <div className={TopBannerStyles.orb1}></div>
        <div className={TopBannerStyles.orb2}></div>
      </div>

      {/* Left: AI Analysis Demo */}
      <aside className={TopBannerStyles.analysisSection}>
        <div className={TopBannerStyles.sectionBadge}>
          <span className={TopBannerStyles.statusDot}></span>
          <span className={TopBannerStyles.badgeText}>AI COLORIZATION</span>
        </div>
        
        <h2 className={TopBannerStyles.sectionTitle}>
          AI Colorization
          <span className={TopBannerStyles.titleGradient}>Engine</span>
        </h2>
        
        <p className={TopBannerStyles.sectionSubtitle}>
          Watch our neural networks analyze <strong>historical color patterns</strong> and 
          intelligently reconstruct authentic colors from black & white photographs 
          with <strong>94.8% historical accuracy</strong>.
        </p>

        {/* AI Colorization Preview */}
        <div className={TopBannerStyles.analysisDemo}>
          <div className={TopBannerStyles.scanningFrame}>
            <div className={TopBannerStyles.imageFrame}>
              {/* Base B&W Image */}
              <Image
                src="/images/beforeexample.jpg"
                alt="Black and white photo being colorized"
                layout="fill"
                className={TopBannerStyles.bwImage}
                sizes="(max-width: 768px) 100vw, 300px"
              />
              
              {/* Color Version (revealed progressively) */}
              <div className={TopBannerStyles.colorLayer}>
                <Image
                  src="/images/afterexample.jpg"
                  alt="Colorized version"
                  layout="fill"
                  className={TopBannerStyles.colorImage}
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
              
              {/* Color Wave Animation */}
              <div className={TopBannerStyles.colorWave}></div>
              
              {/* AI Analysis Overlays */}
              <div className={TopBannerStyles.scanLine}></div>
              <div className={TopBannerStyles.detectionBoxes}>
                <div className={TopBannerStyles.detectionBox} style={{top: '15%', left: '20%', width: '30%', height: '18%'}}>
                  <span className={TopBannerStyles.detectionLabel}>Skin Tone Detected</span>
                </div>
                <div className={TopBannerStyles.detectionBox} style={{top: '45%', right: '15%', width: '35%', height: '25%'}}>
                  <span className={TopBannerStyles.detectionLabel}>Fabric Analysis</span>
                </div>
                <div className={TopBannerStyles.detectionBox} style={{bottom: '20%', left: '15%', width: '40%', height: '20%'}}>
                  <span className={TopBannerStyles.detectionLabel}>Background Elements</span>
                </div>
              </div>
              
              {/* Color Progress Indicator */}
              <div className={TopBannerStyles.colorProgress}>
                <div className={TopBannerStyles.progressBar}>
                  <div className={TopBannerStyles.progressFill}></div>
                </div>
                <span className={TopBannerStyles.progressText}>Colorizing... 87%</span>
              </div>
              
              {/* Processing Indicators */}
              <div className={TopBannerStyles.processingOverlay}>
                <div className={TopBannerStyles.processingText}>
                  <div className={TopBannerStyles.processingLine}>
                    <span className={TopBannerStyles.processingDot}></span>
                    Analyzing historical color palettes...
                  </div>
                  <div className={TopBannerStyles.processingLine}>
                    <span className={TopBannerStyles.processingDot}></span>
                    Applying skin tone algorithms...
                  </div>
                  <div className={TopBannerStyles.processingLine}>
                    <span className={TopBannerStyles.processingDot}></span>
                    Rendering color transitions...
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Colorization Results Display */}
          <div className={TopBannerStyles.resultsPanel}>
            <div className={TopBannerStyles.resultsSummary}>
              <div className={TopBannerStyles.confidenceScore}>
                <div className={TopBannerStyles.scoreNumber}>94.8%</div>
                <div className={TopBannerStyles.scoreLabel}>Color Accuracy</div>
              </div>
              <div className={TopBannerStyles.detectionsFound}>
                <div className={TopBannerStyles.detectionsNumber}>8</div>
                <div className={TopBannerStyles.detectionsLabel}>Regions Mapped</div>
              </div>
            </div>
            
            <div className={TopBannerStyles.detectedIssues}>
              <div className={TopBannerStyles.colorTag}>Skin Tones (2)</div>
              <div className={TopBannerStyles.colorTag}>Clothing (3)</div>
              <div className={TopBannerStyles.colorTag}>Background (3)</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Right: Real-time Transformation */}
      <aside className={TopBannerStyles.transformSection}>
        <div className={TopBannerStyles.sectionBadge}>
          <span className={TopBannerStyles.statusDot}></span>
          <span className={TopBannerStyles.badgeText}>REAL-TIME PROCESSING</span>
        </div>
        
        <h2 className={TopBannerStyles.sectionTitle}>
          Watch AI <span className={TopBannerStyles.titleGradient}>Reconstruction</span>
        </h2>
        
        <p className={TopBannerStyles.sectionSubtitle}>
          Experience pixel-level restoration as our neural networks 
          rebuild your memories in <strong>real-time</strong>
        </p>

        <div className={TopBannerStyles.interactiveContainer}>
          <div className={TopBannerStyles.sliderWrapper}>
            <ImageCompareSlider
              beforeImage="/images/premium-before.jpg"
              afterImage="/images/premium-after.jpg"
              orientation={isMobile ? 'vertical' : 'horizontal'}
            />
            
            {/* Enhancement Indicators */}
            <div className={TopBannerStyles.enhancementBadges}>
              <div className={TopBannerStyles.enhancementBadge}>
                <span className={TopBannerStyles.badgeIcon}>🔍</span>
                <span>Detail Enhanced</span>
              </div>
              <div className={TopBannerStyles.enhancementBadge}>
                <span className={TopBannerStyles.badgeIcon}>🎨</span>
                <span>Colors Restored</span>
              </div>
              <div className={TopBannerStyles.enhancementBadge}>
                <span className={TopBannerStyles.badgeIcon}>✨</span>
                <span>Damage Repaired</span>
              </div>
            </div>
          </div>

          {/* Processing Stats */}
          <div className={TopBannerStyles.processingStats}>
            <div className={TopBannerStyles.stat}>
              <div className={TopBannerStyles.statIcon}>⚡</div>
              <div className={TopBannerStyles.statContent}>
                <div className={TopBannerStyles.statNumber}>2.1s</div>
                <div className={TopBannerStyles.statLabel}>Processing Time</div>
              </div>
            </div>
            
            <div className={TopBannerStyles.stat}>
              <div className={TopBannerStyles.statIcon}>🧠</div>
              <div className={TopBannerStyles.statContent}>
                <div className={TopBannerStyles.statNumber}>847M</div>
                <div className={TopBannerStyles.statLabel}>Neural Parameters</div>
              </div>
            </div>
            
            <div className={TopBannerStyles.stat}>
              <div className={TopBannerStyles.statIcon}>🎯</div>
              <div className={TopBannerStyles.statContent}>
                <div className={TopBannerStyles.statNumber}>4K</div>
                <div className={TopBannerStyles.statLabel}>Output Resolution</div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default TopBanner;