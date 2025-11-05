import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './HowItWorks.module.css';

const HowItWorksSection = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('restore');

  const tools = {
    restore: {
      title: 'Photo Restoration',
      tagline: 'Fix old photos in 2 clicks',
      steps: [
        {
          number: '1',
          title: 'Upload Photo',
          description: 'Drop your old, damaged, or faded photo',
          image: '/images/how-it-works/upload-restore.jpg',
          icon: '📤'
        },
        {
          number: '2',
          title: 'Choose Option',
          description: 'Click "Repair" (1 credit) or "Repair + Colorize" (40 credits)',
          image: '/images/how-it-works/choose-restore.jpg',
          icon: '🎨'
        },
        {
          number: '3',
          title: 'Download Result',
          description: 'Get your restored photo in 30-90 seconds',
          image: '/images/how-it-works/result-restore.jpg',
          icon: '⬇️'
        }
      ],
      cta: 'Try Photo Restoration',
      link: '/replicate/restore-premium'
    },
    
    avatar: {
      title: 'AI Avatars',
      tagline: 'Create unique avatars in 3 steps',
      steps: [
        {
          number: '1',
          title: 'Upload Photo',
          description: 'Upload a clear photo of yourself',
          image: '/images/how-it-works/upload-avatar.jpg',
          icon: '📸'
        },
        {
          number: '2',
          title: 'Pick Category & Style',
          description: 'Browse categories (Fantasy, Sci-Fi, Professional) and choose from 50+ styles',
          image: '/images/how-it-works/choose-avatar.jpg',
          icon: '🎭'
        },
        {
          number: '3',
          title: 'Generate Avatar',
          description: 'AI creates your avatar in ~45 seconds (50 credits)',
          image: '/images/how-it-works/result-avatar.jpg',
          icon: '✨'
        }
      ],
      cta: 'Create Your Avatar',
      link: '/replicate/avatar'
    },
    
    decades: {
      title: 'Vintage Decades',
      tagline: 'Travel back in time in 3 steps',
      steps: [
        {
          number: '1',
          title: 'Upload Photo',
          description: 'Upload your modern photo',
          image: '/images/how-it-works/upload-decades.jpg',
          icon: '📷'
        },
        {
          number: '2',
          title: 'Pick Decade & Style',
          description: 'Choose 70s, 80s, 90s, or 2000s - each has unique styles',
          image: '/images/how-it-works/choose-decades.jpg',
          icon: '📸'
        },
        {
          number: '3',
          title: 'Get Vintage Photo',
          description: 'Download your retro yearbook photo in ~45 seconds (50 credits)',
          image: '/images/how-it-works/result-decades.jpg',
          icon: '🎉'
        }
      ],
      cta: 'Try Decades',
      link: '/decades'
    }
  };

  const activeTool = tools[activeTab];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>How It Works</h2>
          <p className={styles.subtitle}>
            Simple 3-step process for every tool
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'restore' ? styles.active : ''}`}
            onClick={() => setActiveTab('restore')}
          >
            <span className={styles.tabIcon}>✨</span>
            <span className={styles.tabText}>Restoration</span>
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'avatar' ? styles.active : ''}`}
            onClick={() => setActiveTab('avatar')}
          >
            <span className={styles.tabIcon}>🎭</span>
            <span className={styles.tabText}>Avatars</span>
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'decades' ? styles.active : ''}`}
            onClick={() => setActiveTab('decades')}
          >
            <span className={styles.tabIcon}>📸</span>
            <span className={styles.tabText}>Decades</span>
          </button>
        </div>

        {/* Tool Title */}
        <div className={styles.toolHeader}>
          <h3 className={styles.toolTitle}>{activeTool.title}</h3>
          <p className={styles.toolTagline}>{activeTool.tagline}</p>
        </div>

        {/* Steps Grid */}
        <div className={styles.stepsGrid}>
          {activeTool.steps.map((step, index) => (
            <div key={index} className={styles.stepCard}>
              
              {/* Step Image */}
              <div className={styles.stepImageWrapper}>
                <div className={styles.stepNumber}>{step.number}</div>
                <div className={styles.stepImage}>
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  {/* Icon Overlay */}
                  <div className={styles.imageOverlay}>
                    <span className={styles.overlayIcon}>{step.icon}</span>
                  </div>
                </div>
              </div>

              {/* Step Content */}
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>

              {/* Arrow (except last step) */}
              {index < activeTool.steps.length - 1 && (
                <div className={styles.arrow}>→</div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <button 
            className={styles.ctaButton}
            onClick={() => router.push(activeTool.link)}
          >
            {activeTool.cta} →
          </button>
        </div>

        {/* Simple Pricing Note */}
        <div className={styles.pricingNote}>
          <p>
            <strong>💰 Pricing:</strong> Restore (1-40 credits) • Avatars (50 credits) • Decades (50 credits)
          </p>
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;