import React, { useState } from 'react';
import Link from 'next/link';
import ImageCompareSlider from "../ImageCompareSlider";
import heroStyles from '../../styles/Hero.module.css';

export default function ServicesSection() {
  const features = [
    {
      id: 'restore',
      title: "Photo Restoration",
      shortTitle: "Restore Damaged Photos",
      description: "Remove scratches, tears, and fading from your treasured family photos. Perfect for preserving irreplaceable memories.",
      beforeAfter: {
        before: "/images/basicpage-before.jpg",
        after: "/images/basicpage-after.jpg"
      },
      link: "/replicate/restore-basic",
      credits: 1,
      buttonText: "Restore (Try Free)"
    },
    {
      id: 'colorize',
      title: "AI Colorization", 
      shortTitle: "Add Beautiful Colors",
      description: "Transform black and white photos with historically accurate, beautiful colors. See your ancestors come alive like never before.",
      beforeAfter: {
        before: "/images/before6.jpg",
        after: "/images/after6.jpg"
      },
      link: "/replicate/restore-premium",
      credits: 40,
      buttonText: "Add Color"
    },
    {
      id: 'cartoonify',
      title: "Cartoon Creator",
      shortTitle: "Create Cartoon Art", 
      description: "Turn family photos into beautiful cartoon artwork. Perfect for gifts, social media, or creating unique family portraits.",
      beforeAfter: {
        before: "/images/cartoon-before.jpg",
        after: "/images/cartoon-example.jpg"
      },
      link: "/replicate/cartoon",
      credits: 40,
      buttonText: "Make Cartoon"
    },
    {
      id: 'avatar90s',
      title: "90s Avatar Creator",
      shortTitle: "Create 90s Avatars",
      description: "Transform your photos into authentic 90s-style avatars with retro filters, neon effects, and nostalgic vibes from the rad decade.",
      beforeAfter: {
        before: "/images/avatar90s-before.jpg",
        after: "/images/avatar90s-after.jpg"
      },
      link: "/replicate/90s-avatar",
      credits: 35,
      buttonText: "Go Retro"
    },
    {
      id: 'yearbook90s',
      title: "90s Yearbook Style",
      shortTitle: "90s Yearbook Photos",
      description: "Create classic 90s yearbook-style portraits with authentic backgrounds, lighting, and that unmistakable retro school photo charm.",
      beforeAfter: {
        before: "/images/yearbook90s-before.jpg",
        after: "/images/yearbook90s-after.jpg"
      },
      link: "/replicate/90s-yearbook",
      credits: 35,
      buttonText: "Make Yearbook"
    }
  ];

  return (
    <>
      <section className={heroStyles.hero}>
        {/* Background Elements */}
        <div className={heroStyles.backgroundGrid}></div>
        <div className={heroStyles.gradientOrb}></div>
        
        <div className={heroStyles.heroContainer}>
          {/* Main Header */}
          <div className={heroStyles.heroHeader}>
            <h2 className={heroStyles.heroTitle}>
              Transform Your Photos with
              <span className={heroStyles.titleBreak}></span>
              <span className={heroStyles.gradient}>5 Powerful AI Tools</span>
            </h2>
            
            <p className={heroStyles.heroSubtitle}>
              From classic restoration to <strong>trendy 90s styles</strong>, our specialized AI transforms 
              your photos into stunning works of art. See the magic in action below.
            </p>
          </div>

          {/* AI Services Grid with Sliders */}
          <div className={heroStyles.servicesContainer}>
            <h3 className={heroStyles.servicesTitle}>Choose Your Perfect Transformation</h3>
            
            <div className={heroStyles.servicesGrid}>
              {features.map((feature) => (
                <div key={feature.id} className={heroStyles.serviceCard}>
                  {/* Image Compare Slider */}
                  <div className={heroStyles.processDemo}>
                    <ImageCompareSlider
                      beforeImage={feature.beforeAfter.before}
                      afterImage={feature.beforeAfter.after}
                    />
                  </div>
                  
                  <div className={heroStyles.serviceInfo}>
                    <h4 className={heroStyles.serviceName}>{feature.title}</h4>
                    <p className={heroStyles.serviceDesc}>
                      {feature.description}
                    </p>
                    
                    <Link href={feature.link} className={heroStyles.actionButton}>
                      <span className={heroStyles.buttonText}>{feature.buttonText}</span>
                      <div className={heroStyles.creditCost}>
                        <span className={heroStyles.costNumber}>{feature.credits}</span>
                        <span className={heroStyles.costLabel}>{feature.credits === 1 ? 'Credit' : 'Credits'}</span>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>
      </section>
    </>
  )
}