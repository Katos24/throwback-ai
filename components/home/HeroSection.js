import React, { useState } from 'react';
import Link from 'next/link';
import ImageCompareSlider from "../ImageCompareSlider";
import heroStyles from '../../styles/Hero.module.css';

export default function HeroSection() {
  const [activeSlider, setActiveSlider] = useState(null);

  const services = [
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
      category: "restore"
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
      category: "restore"
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
      category: "create"
    },
    {
      id: 'yearbook',
      title: "90s Yearbook Style",
      description: "Get that classic 90s school portrait look with vintage styling.",
      icon: "📸",
      buttonText: "Try Yearbook",
      beforeAfter: {
        before: "/images/yearbook-before.jpg",
        after: "/images/yearbook-after.jpg"
      },
      link: "/replicate/yearbook",
      credits: 5,
      category: "create"
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
      category: "create"
    }
  ];

  const openSlider = (serviceId) => {
    setActiveSlider(serviceId);
  };

  const closeSlider = () => {
    setActiveSlider(null);
  };

  const activeService = services.find(service => service.id === activeSlider);

  return (
    <>
      <section className={heroStyles.hero}>
        {/* Background Elements */}
        <div className={heroStyles.backgroundGrid}></div>
        <div className={heroStyles.gradientOrb}></div>
        
        <div className={heroStyles.heroContainer}>
          {/* Main Header */}
          <div className={heroStyles.heroHeader}>
            <h1 className={heroStyles.heroTitle}>
              Transform Any Photo Into
              <span className={heroStyles.titleBreak}></span>
              <span className={heroStyles.gradient}>Something Amazing</span>
            </h1>
            
            <p className={heroStyles.heroSubtitle}>
              From restoring precious family memories to creating fun modern art - our AI transforms your photos in seconds. 
              <strong> Preserve the past or reimagine the present.</strong>
            </p>
          </div>

          {/* Interactive Service Buttons */}
          <div className={heroStyles.servicesContainer}>
            <div className={heroStyles.servicesGrid}>
              {services.map((service) => (
                <div key={service.id} className={heroStyles.serviceButton}>
                  <div className={heroStyles.serviceIcon}>{service.icon}</div>
                  <div className={heroStyles.serviceContent}>
                    <h3 className={heroStyles.serviceName}>{service.title}</h3>
                    <p className={heroStyles.serviceDesc}>{service.description}</p>
                    <div className={heroStyles.serviceActions}>
                      <button
                        className={heroStyles.previewButton}
                        onClick={() => openSlider(service.id)}
                      >
                        {service.buttonText}
                      </button>
                      <div className={heroStyles.creditInfo}>
                        <span className={heroStyles.creditCost}>{service.credits}</span>
                        <span className={heroStyles.creditLabel}>
                          {service.credits === 1 ? 'Credit' : 'Credits'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Row */}
          <div className={heroStyles.statsRow}>
            <div className={heroStyles.stat}>
              <div className={heroStyles.statNumber}>50K+</div>
              <div className={heroStyles.statLabel}>Photos Transformed</div>
            </div>
            <div className={heroStyles.stat}>
              <div className={heroStyles.statNumber}>2.3s</div>
              <div className={heroStyles.statLabel}>Average Results</div>
            </div>
            <div className={heroStyles.stat}>
              <div className={heroStyles.statNumber}>98%</div>
              <div className={heroStyles.statLabel}>Love Their Results</div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className={heroStyles.bottomCTA}>
            <div className={heroStyles.creditOffer}>
              <div className={heroStyles.offerIcon}>⚡</div>
              <div className={heroStyles.offerText}>
                <strong>Try It Free Right Now</strong>
                <span className={heroStyles.offerDetails}>
                  <Link href="/pricing" className={heroStyles.ctaLink}>Get 40 Free Credits</Link> • No credit card needed
                </span>
              </div>
            </div>
            
            <div className={heroStyles.securityBadges}>
              <div className={heroStyles.securityBadge}>
                <span className={heroStyles.checkmark}>✓</span>
                <span>100% Private</span>
              </div>
              <div className={heroStyles.securityBadge}>
                <span className={heroStyles.checkmark}>✓</span>
                <span>Photos Deleted After 1 Hour</span>
              </div>
              <div className={heroStyles.securityBadge}>
                <span className={heroStyles.checkmark}>✓</span>
                <span>Instant Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slider Popup Modal */}
      {activeSlider && activeService && (
        <div className={heroStyles.sliderModal} onClick={closeSlider}>
          <div className={heroStyles.sliderContent} onClick={(e) => e.stopPropagation()}>
            <button className={heroStyles.closeButton} onClick={closeSlider}>
              ×
            </button>
            
            <div className={heroStyles.modalHeader}>
              <div className={heroStyles.modalIcon}>{activeService.icon}</div>
              <h3 className={heroStyles.modalTitle}>{activeService.title}</h3>
              <p className={heroStyles.modalDescription}>{activeService.description}</p>
            </div>

            <div className={heroStyles.sliderWrapper}>
              <ImageCompareSlider
                beforeImage={activeService.beforeAfter.before}
                afterImage={activeService.beforeAfter.after}
              />
            </div>

            <div className={heroStyles.modalActions}>
              <Link href={activeService.link} className={heroStyles.actionButton}>
                <span>Get Started</span>
                <div className={heroStyles.creditCost}>
                  <span className={heroStyles.costNumber}>{activeService.credits}</span>
                  <span className={heroStyles.costLabel}>
                    {activeService.credits === 1 ? 'Credit' : 'Credits'}
                  </span>
                </div>
              </Link>
              <button className={heroStyles.closeModalButton} onClick={closeSlider}>
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}