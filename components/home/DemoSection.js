import React, { useState, useEffect } from 'react';
import ImageCompareSlider from "../ImageCompareSlider";
import demoStyles from '../../styles/DemoSection.module.css';

export default function DemoSection() {
  const [activeDemo, setActiveDemo] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const demos = [
    {
      id: 'restore',
      title: "Photo Restoration",
      subtitle: "Repair & Enhance",
      description: "Advanced AI repairs damage, removes scratches, and restores faded photographs",
      beforeAfter: {
        before: "/images/basicpage-before.jpg",
        after: "/images/basicpage-after.jpg"
      },
      color: "#06b6d4"
    },
    {
      id: 'colorize',
      title: "Historical Colorization",
      subtitle: "Bring History to Life",
      description: "Neural networks analyze context to add authentic, period-accurate colors",
      beforeAfter: {
        before: "/images/before6.jpg",
        after: "/images/after6.jpg"
      },
      color: "#8b5cf6"
    },
    {
      id: 'cartoon',
      title: "Artistic Transformation",
      subtitle: "Create Digital Art",
      description: "Style transfer algorithms convert photos into vibrant cartoon artwork",
      beforeAfter: {
        before: "/images/cartoon-before.jpg",
        after: "/images/cartoon-example.jpg"
      },
      color: "#f59e0b"
    },
    {
      id: 'yearbook',
      title: "Style Recreation",
      subtitle: "90s Portrait Magic",
      description: "Time-specific modeling recreates authentic vintage photography aesthetics",
      beforeAfter: {
        before: "/images/yearbook-before.jpg",
        after: "/images/yearbook-after.jpg"
      },
      color: "#ef4444"
    },
    {
      id: 'avatar',
      title: "Professional Enhancement",
      subtitle: "Perfect Headshots",
      description: "Multi-stage processing creates polished, professional portrait photography",
      beforeAfter: {
        before: "/images/avatar-before.jpg",
        after: "/images/avatar-after.jpg"
      },
      color: "#10b981"
    }
  ];

  // Preload images when component mounts
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = demos.flatMap(demo => [
        preloadImage(demo.beforeAfter.before),
        preloadImage(demo.beforeAfter.after)
      ]);

      try {
        await Promise.allSettled(imagePromises);
        setLoadedImages(new Set(demos.flatMap(demo => [
          demo.beforeAfter.before,
          demo.beforeAfter.after
        ])));
      } catch (error) {
        console.warn('Some images failed to preload:', error);
      }
    };

    preloadImages();
  }, []);

  // Helper function to preload individual images
  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(src);
      img.onerror = () => reject(new Error(`Failed to load ${src}`));
      img.src = src;
    });
  };

  const toggleDemo = async (demoId) => {
    if (activeDemo === demoId) {
      setActiveDemo(null);
      return;
    }

    const demo = demos.find(d => d.id === demoId);
    const imagesToLoad = [demo.beforeAfter.before, demo.beforeAfter.after];
    
    // Check if images are already loaded
    const allImagesLoaded = imagesToLoad.every(img => loadedImages.has(img));
    
    if (!allImagesLoaded) {
      setIsLoading(true);
      try {
        await Promise.all(imagesToLoad.map(preloadImage));
        setLoadedImages(prev => new Set([...prev, ...imagesToLoad]));
      } catch (error) {
        console.warn('Failed to load some images:', error);
      } finally {
        setIsLoading(false);
      }
    }

    setActiveDemo(demoId);
  };

  return (
    <section className={demoStyles.demoSection}>
      <div className={demoStyles.container}>
        {/* Hidden preload images - improves caching */}
        <div style={{ display: 'none' }}>
          {demos.map(demo => (
            <React.Fragment key={demo.id}>
              <img 
                src={demo.beforeAfter.before} 
                alt=""
                loading="eager"
              />
              <img 
                src={demo.beforeAfter.after} 
                alt=""
                loading="eager"
              />
            </React.Fragment>
          ))}
        </div>

        {/* Section Header */}
        <div className={demoStyles.header}>
          <div className={demoStyles.badge}>AI TECHNOLOGY</div>
          <h2 className={demoStyles.title}>
            See Our AI in Action
          </h2>
          <p className={demoStyles.subtitle}>
            Advanced neural networks trained on millions of images deliver professional results in seconds. 
            Click any transformation to see the technology at work.
          </p>
        </div>

        {/* Demo Grid */}
        <div className={demoStyles.demoGrid}>
          {demos.map((demo, index) => (
            <div 
              key={demo.id} 
              className={`${demoStyles.demoCard} ${activeDemo === demo.id ? demoStyles.active : ''}`}
              onClick={() => toggleDemo(demo.id)}
              style={{ '--demo-color': demo.color }}
            >
              <div className={demoStyles.cardHeader}>
                <div className={demoStyles.cardBadge}>{demo.subtitle}</div>
                <h3 className={demoStyles.cardTitle}>{demo.title}</h3>
              </div>
              
              {/* Default Card Content - Hidden when slider is active */}
              {activeDemo !== demo.id && (
                <>
                  <div className={demoStyles.cardContent}>
                    <p className={demoStyles.cardDescription}>{demo.description}</p>
                  </div>

                  <div className={demoStyles.cardFooter}>
                    <div className={demoStyles.demoButton}>
                      <span>{isLoading ? 'Loading...' : 'View Demo'}</span>
                      <div className={demoStyles.arrow}>→</div>
                    </div>
                  </div>
                </>
              )}

              {/* Inline Slider - Replaces card content when active */}
              {activeDemo === demo.id && (
                <div className={demoStyles.inlineSliderContent}>
                  <div className={demoStyles.sliderWrapper}>
                    <ImageCompareSlider
                      beforeImage={demo.beforeAfter.before}
                      afterImage={demo.beforeAfter.after}
                      loading="eager"
                    />
                  </div>

                  <div className={demoStyles.sliderHint}>
                    <span>← Drag to compare →</span>
                  </div>

                  <div className={demoStyles.processingSteps}>
                    <div className={demoStyles.processingStep}>
                      <div className={demoStyles.stepIcon}>1</div>
                      <span>Upload</span>
                    </div>
                    <div className={demoStyles.processingStep}>
                      <div className={demoStyles.stepIcon}>2</div>
                      <span>AI Processing</span>
                    </div>
                    <div className={demoStyles.processingStep}>
                      <div className={demoStyles.stepIcon}>3</div>
                      <span>Download</span>
                    </div>
                  </div>

                  <div className={demoStyles.closeButton}>
                    <span>Hide Demo</span>
                    <div className={demoStyles.arrow}>↑</div>
                  </div>
                </div>
              )}

              <div className={demoStyles.cardGlow}></div>
            </div>
          ))}
        </div>

        {/* Processing Stats */}
        <div className={demoStyles.techStats}>
          <div className={demoStyles.techStat}>
            <div className={demoStyles.statValue}>12.3s</div>
            <div className={demoStyles.statLabel}>Processing Time</div>
          </div>
          <div className={demoStyles.techStat}>
            <div className={demoStyles.statValue}>99.7%</div>
            <div className={demoStyles.statLabel}>Accuracy Rate</div>
          </div>
          <div className={demoStyles.techStat}>
            <div className={demoStyles.statValue}>4K</div>
            <div className={demoStyles.statLabel}>Max Resolution</div>
          </div>
        </div>
      </div>
    </section>
  );
}