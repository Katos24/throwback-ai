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
      description: "Repair scratches, tears, water damage, and fading from irreplaceable family photos.",
      icon: "✨",
      buttonText: "Try Restore",
      beforeAfter: {
        before: "/images/basicpage-before.jpg",
        after: "/images/basicpage-after.jpg"
      },
      link: "/replicate/restore-basic",
      credits: 1,
      category: "restore",
      color: "#06b6d4"
    },
    {
      id: 'colorize',
      title: "Historical Colorization",
      description: "Add historically accurate, vibrant colors to black and white family photos.",
      icon: "🎨",
      buttonText: "Try Colorize",
      beforeAfter: {
        before: "/images/before6.jpg",
        after: "/images/after6.jpg"
      },
      link: "/replicate/restore-premium",
      credits: 40,
      category: "restore",
      color: "#8b5cf6"
    },
    {
      id: 'yearbook',
      title: "80s Yearbook Style",
      description: "Get that classic 80s school portrait look with vintage styling.",
      icon: "📸",
      buttonText: "Try Yearbook",
      beforeAfter: {
        before: "/images/debrabefore.jpg",
        after: "/images/debraafter.jpg"
      },
      link: "/replicate/yearbook",
      credits: 50,
      category: "create",
      color: "#ef4444"
    },
      {
      id: 'cartoon',
      title: "Cartoon Art",
      description: "Transform yourself, friends, or pets into stunning cartoon artwork.",
      icon: "🖼️",
      buttonText: "Try Cartoon",
      beforeAfter: {
        before: "/images/cartoon-before.jpg",
        after: "/images/cartoon-example.jpg"
      },
      link: "/replicate/cartoon",
      credits: 40,
      category: "create",
      color: "#f59e0b"
    },
    {
      id: 'avatar',
      title: "Professional Avatar",
      description: "Create polished, professional headshots and avatars.",
      icon: "👤",
      buttonText: "Try Avatar",
      beforeAfter: {
        before: "/images/avatar-before.jpg",
        after: "/images/avatar-after.jpg"
      },
      link: "/replicate/avatar",
      credits: 50,
      category: "create",
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

  const handleDemoAction = (demo) => {
    // Navigate to the demo's link
    window.location.href = demo.link;
    // Or if using Next.js router:
    // router.push(demo.link);
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
                <div className={demoStyles.cardBadge}>
                  <span className={demoStyles.icon}>{demo.icon}</span>
                  {demo.credits} credit{demo.credits !== 1 ? 's' : ''}
                </div>
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

                  {/* Action Button - Added above Hide Demo */}
                  <div className={demoStyles.actionButtonWrapper}>
                    <button 
                      className={demoStyles.actionButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDemoAction(demo);
                      }}
                      style={{ '--demo-color': demo.color }}
                    >
                      <span>{demo.buttonText}</span>
                      <span className={demoStyles.credits}>({demo.credits} credit{demo.credits !== 1 ? 's' : ''})</span>
                      <div className={demoStyles.arrow}>→</div>
                    </button>
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