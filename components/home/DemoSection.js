import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ImageCompareSlider from "../ImageCompareSlider";
import demoStyles from './DemoSection.module.css';

export default function DemoSection() {
  const [activeDemo, setActiveDemo] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);

  // Two restoration examples with SLIDERS
  const demos = useMemo(() => [
    {
      id: 'colorize',
      title: "Historical Colorization",
      description: "Add historically accurate, vibrant colors to black and white family photos. Perfect for bringing old memories to life.",
      icon: "🎨",
      buttonText: "Try Colorization",
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
      id: 'repair',
      title: "Photo Repair & Enhancement",
      description: "Remove scratches, tears, and water damage. Enhance faded areas and restore clarity to damaged family photos.",
      icon: "✨",
      buttonText: "Try Photo Repair",
      beforeAfter: {
        before: "/images/basicpage-before.jpg",
        after: "/images/basicpage-after.jpg"
      },
      link: "/replicate/restore-premium",
      credits: 1,
      category: "restore",
      color: "#10b981"
    }
  ], []);

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
  }, [demos]);

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
    window.location.href = demo.link;
  };

  return (
    <section className={demoStyles.demoSection}>
      <div className={demoStyles.container}>
        {/* Hidden preload images */}
        <div style={{ display: 'none' }}>
          {demos.map(demo => (
            <React.Fragment key={demo.id}>
              <Image 
                src={demo.beforeAfter.before} 
                alt=""
                width={400}
                height={300}
                loading="eager"
              />
              <Image 
                src={demo.beforeAfter.after} 
                alt=""
                width={400}
                height={300}
                loading="eager"
              />
            </React.Fragment>
          ))}
        </div>

        {/* Section Header */}
        <div className={demoStyles.header}>
          <div className={demoStyles.badge}>INTERACTIVE RESTORATION DEMOS</div>
          <h2 className={demoStyles.title}>
            See the Difference for Yourself
          </h2>
          <p className={demoStyles.subtitle}>
            Drag the slider to compare original and restored photos. Our AI reveals hidden details, 
            removes damage, and brings faded memories back to life with stunning clarity.
          </p>
        </div>

        {/* Demo Grid - Two restoration cards */}
        <div className={`${demoStyles.demoGrid} ${demoStyles.landscapeGrid}`}>
          {demos.map((demo) => (
            <div 
              key={demo.id} 
              className={`${demoStyles.demoCard} ${demoStyles.landscapeCard} ${activeDemo === demo.id ? demoStyles.active : ''}`}
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
              
              {/* Default Card Content */}
              {activeDemo !== demo.id && (
                <>
                  <div className={demoStyles.cardContent}>
                    <p className={demoStyles.cardDescription}>{demo.description}</p>
                  </div>

                  <div className={demoStyles.cardFooter}>
                    <div className={demoStyles.demoButton}>
                      <span>{isLoading ? 'Loading...' : 'View Interactive Demo'}</span>
                      <div className={demoStyles.arrow}>→</div>
                    </div>
                  </div>
                </>
              )}

              {/* Interactive Slider */}
              {activeDemo === demo.id && (
                <div className={`${demoStyles.inlineSliderContent} ${demoStyles.landscapeSlider}`}>
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
                      <span>Upload Photo</span>
                    </div>
                    <div className={demoStyles.processingStep}>
                      <div className={demoStyles.stepIcon}>2</div>
                      <span>AI Restoration</span>
                    </div>
                    <div className={demoStyles.processingStep}>
                      <div className={demoStyles.stepIcon}>3</div>
                      <span>Download Result</span>
                    </div>
                  </div>

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
                      <span className={demoStyles.credits}>
                        ({demo.credits} credit{demo.credits !== 1 ? 's' : ''})
                      </span>
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

        {/* Stats */}
        <div className={demoStyles.techStats}>
          <div className={demoStyles.techStat}>
            <div className={demoStyles.statValue}>45s</div>
            <div className={demoStyles.statLabel}>Average Processing</div>
          </div>
          <div className={demoStyles.techStat}>
            <div className={demoStyles.statValue}>99.1%</div>
            <div className={demoStyles.statLabel}>Success Rate</div>
          </div>
          <div className={demoStyles.techStat}>
            <div className={demoStyles.statValue}>4K</div>
            <div className={demoStyles.statLabel}>Max Resolution</div>
          </div>
        </div>

        {/* CTA for other services */}
        <div className={demoStyles.additionalServices}>
          <p className={demoStyles.additionalText}>
            Looking for creative transformations?{' '}
            <Link href="/decades" className={demoStyles.additionalLink}>
              Explore our vintage yearbook styles →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}