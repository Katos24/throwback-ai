import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import TopBannerStyles from '../../styles/TopBannerTest.module.css';
import ImageCompareSlider from '../ImageCompareSlider';

const TopBanner = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('colorize'); // Add this line

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

  // Add this function
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

      {/* Left: AI Transformation Demos - REPLACE YOUR ENTIRE LEFT SECTION WITH THIS */}
      <aside className={TopBannerStyles.analysisSection}>
        <div className={TopBannerStyles.sectionBadge}>
          <span className={TopBannerStyles.statusDot}></span>
          <span className={TopBannerStyles.badgeText}>AI TRANSFORMATION</span>
        </div>
        
        <h2 className={TopBannerStyles.sectionTitle}>
          Neural Enhancement
          <span className={TopBannerStyles.titleGradient}>Showcase</span>
        </h2>
        
        <p className={TopBannerStyles.sectionSubtitle}>
          Experience our <strong>3 AI engines</strong> in action. 
          Watch as advanced neural networks transform your images with precision.
        </p>

        {/* ADD THIS NEW SECTION - Transformation Tabs */}
        <div className={TopBannerStyles.transformTabs}>
          <button 
            className={`${TopBannerStyles.tabButton} ${activeTab === 'colorize' ? TopBannerStyles.active : ''}`}
            onClick={() => handleTabClick('colorize')}
          >
            <span className={TopBannerStyles.tabIcon}>🌈</span>
            <span>Colorize</span>
          </button>
          <button 
            className={`${TopBannerStyles.tabButton} ${activeTab === 'cartoon' ? TopBannerStyles.active : ''}`}
            onClick={() => handleTabClick('cartoon')}
          >
            <span className={TopBannerStyles.tabIcon}>🎨</span>
            <span>Cartoon</span>
          </button>
          <button 
            className={`${TopBannerStyles.tabButton} ${activeTab === 'repair' ? TopBannerStyles.active : ''}`}
            onClick={() => handleTabClick('repair')}
          >
            <span className={TopBannerStyles.tabIcon}>🔧</span>
            <span>Repair</span>
          </button>
        </div>

        {/* Colorization Demo - UPDATE YOUR EXISTING analysisDemo */}
        <div 
          className={`${TopBannerStyles.analysisDemo} ${activeTab !== 'colorize' ? TopBannerStyles.hidden : ''}`} 
          id="colorize-demo"
        >
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

          {/* Results Panel */}
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
        

        {/* ADD THIS NEW SECTION - Cartoon Demo */}
        <div 
          className={`${TopBannerStyles.analysisDemo} ${activeTab !== 'cartoon' ? TopBannerStyles.hidden : ''}`} 
          id="cartoon-demo"
        >
          <div className={TopBannerStyles.scanningFrame}>
            <div className={TopBannerStyles.imageFrame}>
              {/* Base Photo */}
              <Image
                src="/images/cartoon-before.jpg"
                alt="Regular photo being cartoonized"
                layout="fill"
                className={TopBannerStyles.photoImage}
                sizes="(max-width: 768px) 100vw, 300px"
              />
              
              {/* Cartoon Version */}
              <div className={TopBannerStyles.cartoonLayer}>
                <Image
                  src="/images/cartoon-example.jpg"
                  alt="Cartoon version"
                  layout="fill"
                  className={TopBannerStyles.cartoonImage}
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
              
              {/* Style Wave Animation */}
              <div className={TopBannerStyles.styleWave}></div>
              
              {/* AI Analysis Overlays */}
              <div className={TopBannerStyles.scanLine}></div>
              <div className={TopBannerStyles.detectionBoxes}>
                <div className={TopBannerStyles.detectionBox} style={{top: '20%', left: '25%', width: '25%', height: '20%'}}>
                  <span className={TopBannerStyles.detectionLabel}>Face Structure</span>
                </div>
                <div className={TopBannerStyles.detectionBox} style={{top: '50%', right: '20%', width: '30%', height: '15%'}}>
                  <span className={TopBannerStyles.detectionLabel}>Edge Detection</span>
                </div>
                <div className={TopBannerStyles.detectionBox} style={{bottom: '25%', left: '20%', width: '35%', height: '18%'}}>
                  <span className={TopBannerStyles.detectionLabel}>Style Transfer</span>
                </div>
              </div>
              
              {/* Style Progress */}
              <div className={TopBannerStyles.colorProgress}>
                <div className={TopBannerStyles.progressBar}>
                  <div className={TopBannerStyles.styleProgressFill}></div>
                </div>
                <span className={TopBannerStyles.progressText}>Stylizing... 92%</span>
              </div>
              
              {/* Processing Text */}
              <div className={TopBannerStyles.processingOverlay}>
                <div className={TopBannerStyles.processingText}>
                  <div className={TopBannerStyles.processingLine}>
                    <span className={TopBannerStyles.processingDot}></span>
                    Analyzing facial features...
                  </div>
                  <div className={TopBannerStyles.processingLine}>
                    <span className={TopBannerStyles.processingDot}></span>
                    Applying artistic filters...
                  </div>
                  <div className={TopBannerStyles.processingLine}>
                    <span className={TopBannerStyles.processingDot}></span>
                    Rendering cartoon style...
                  </div>
                  <div className={TopBannerStyles.processingLine}>
                    <span className={TopBannerStyles.processingDot}></span>
                    Finalizing output...
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          

          {/* Cartoon Results */}
          <div className={TopBannerStyles.resultsPanel}>
            <div className={TopBannerStyles.resultsSummary}>
              <div className={TopBannerStyles.confidenceScore}>
                <div className={TopBannerStyles.scoreNumber}>96.2%</div>
                <div className={TopBannerStyles.scoreLabel}>Style Accuracy</div>
              </div>
              <div className={TopBannerStyles.detectionsFound}>
                <div className={TopBannerStyles.detectionsNumber}>12</div>
                <div className={TopBannerStyles.detectionsLabel}>Features Mapped</div>
              </div>
            </div>
            
            <div className={TopBannerStyles.detectedIssues}>
              <div className={TopBannerStyles.cartoonTag}>Face (4)</div>
              <div className={TopBannerStyles.cartoonTag}>Hair (3)</div>
              <div className={TopBannerStyles.cartoonTag}>Expression (5)</div>
            </div>
          </div>
        </div>

        {/* ADD THIS NEW SECTION - Repair Demo */}
        <div 
          className={`${TopBannerStyles.analysisDemo} ${activeTab !== 'repair' ? TopBannerStyles.hidden : ''}`} 
          id="repair-demo"
        >
          <div className={TopBannerStyles.scanningFrame}>
            <div className={TopBannerStyles.imageFrame}>
              {/* Damaged Photo */}
              <Image
                src="/images/damaged-snippet.jpg"
                alt="Damaged photo being repaired"
                layout="fill"
                className={TopBannerStyles.damagedImage}
                sizes="(max-width: 768px) 100vw, 300px"
              />
              
              {/* Repaired Version */}
              <div className={TopBannerStyles.repairLayer}>
                <Image
                  src="/images/repaired-snippet.jpg"
                  alt="Repaired version"
                  layout="fill"
                  className={TopBannerStyles.repairedImage}
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
              
              {/* Repair Wave */}
              <div className={TopBannerStyles.repairWave}></div>
              
              {/* Damage Detection */}
              <div className={TopBannerStyles.scanLine}></div>
              <div className={TopBannerStyles.detectionBoxes}>
                <div className={TopBannerStyles.detectionBox} style={{top: '25%', left: '15%', width: '30%', height: '15%'}}>
                  <span className={TopBannerStyles.detectionLabel}>Scratch Damage</span>
                </div>
                <div className={TopBannerStyles.detectionBox} style={{top: '55%', right: '20%', width: '25%', height: '20%'}}>
                  <span className={TopBannerStyles.detectionLabel}>Fading Areas</span>
                </div>
                <div className={TopBannerStyles.detectionBox} style={{bottom: '30%', left: '25%', width: '20%', height: '15%'}}>
                  <span className={TopBannerStyles.detectionLabel}>Missing Pixels</span>
                </div>
              </div>
              
              {/* Repair Progress */}
              <div className={TopBannerStyles.colorProgress}>
                <div className={TopBannerStyles.progressBar}>
                  <div className={TopBannerStyles.repairProgressFill}></div>
                </div>
                <span className={TopBannerStyles.progressText}>Repairing... 78%</span>
              </div>
              
              {/* Processing Text */}
              <div className={TopBannerStyles.processingOverlay}>
                <div className={TopBannerStyles.processingText}>
                  <div className={TopBannerStyles.processingLine}>
                    <span className={TopBannerStyles.processingDot}></span>
                    Identifying damage patterns...
                  </div>
                  <div className={TopBannerStyles.processingLine}>
                    <span className={TopBannerStyles.processingDot}></span>
                    Reconstructing missing data...
                  </div>
                  <div className={TopBannerStyles.processingLine}>
                    <span className={TopBannerStyles.processingDot}></span>
                    Blending repairs seamlessly...
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Repair Results */}
          <div className={TopBannerStyles.resultsPanel}>
            <div className={TopBannerStyles.resultsSummary}>
              <div className={TopBannerStyles.confidenceScore}>
                <div className={TopBannerStyles.scoreNumber}>91.7%</div>
                <div className={TopBannerStyles.scoreLabel}>Repair Quality</div>
              </div>
              <div className={TopBannerStyles.detectionsFound}>
                <div className={TopBannerStyles.detectionsNumber}>15</div>
                <div className={TopBannerStyles.detectionsLabel}>Issues Fixed</div>
              </div>
            </div>
            
            <div className={TopBannerStyles.detectedIssues}>
              <div className={TopBannerStyles.repairTag}>Scratches (7)</div>
              <div className={TopBannerStyles.repairTag}>Fading (4)</div>
              <div className={TopBannerStyles.repairTag}>Tears (4)</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Keep your existing right section as is */}
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