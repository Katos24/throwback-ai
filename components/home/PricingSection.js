import React from 'react';
import Link from 'next/link';
import pricingStyles from '../../styles/Pricing.module.css';

const PricingSection = () => {
  const creditPacks = [
    {
      name: "Dawn Pack",
      price: "$4.99",
      credits: "400",
      description: "Perfect for trying out Anastasis magic — restore a few cherished memories.",
      subDescription: "Great for testing the waters or refreshing a handful of your most meaningful portraits.",
      revivals: "10",
      perRestore: "$0.50",
      featured: false
    },
    {
      name: "Revival Pack", 
      price: "$9.99",
      credits: "1,000", 
      description: "A solid bundle for breathing new life into vintage family shots.",
      subDescription: "Ideal for themed mini galleries, vacation snaps, or honoring loved ones with restored detail.",
      revivals: "25",
      perRestore: "$0.40",
      featured: false
    },
    {
      name: "Resurgence Pack",
      price: "$14.99",
      credits: "1,600",
      description: "A popular pick for curating full-family albums and restoring event photos.",
      subDescription: "Great for birthdays, reunions, pet portraits, or weaving stories across generations.",
      revivals: "40", 
      perRestore: "$0.37",
      featured: true,
      badge: "MOST POPULAR"
    },
    {
      name: "Eternal Pack",
      price: "$29.99", 
      credits: "3,500",
      description: "Built for legacy-level restoration — preserve history at scale.",
      subDescription: "Ideal for memory books, heritage tributes, holiday archives, and digital scrapbooking.",
      revivals: "87",
      perRestore: "$0.34", 
      featured: false
    }
  ];

  return (
    <section className={pricingStyles.pricing}>
      <div className={pricingStyles.container}>
        <h2 className={pricingStyles.title}>
          Choose Your Restoration Journey
        </h2>
        <p className={pricingStyles.subtitle}>
          Pay only for what you use — no monthly subscriptions, no hidden fees. Your credits never expire.
        </p>
        
        <div className={pricingStyles.pricingGrid}>
          {creditPacks.map((pack, index) => (
            <div 
              key={index} 
              className={`${pricingStyles.pricingCard} ${pack.featured ? pricingStyles.featured : ''}`}
            >
              {pack.badge && (
                <div className={pricingStyles.pricingBadge}>
                  👑{pack.badge}
                </div>
              )}
              
              <div className={pricingStyles.cardHeader}>
                <h3 className={pricingStyles.pricingTitle}>
                  🌅 {pack.name}
                </h3>

                
                <div className={pricingStyles.price}>
                  <span className={pricingStyles.priceAmount}>{pack.price}</span>
                </div>
                
                <div className={pricingStyles.credits}>
                  <span className={pricingStyles.creditsAmount}>{pack.credits}</span>
                  <span className={pricingStyles.creditsLabel}>credits</span>
                </div>
              </div>
              
              <p className={pricingStyles.pricingDescription}>
                {pack.description}
              </p>
              
              <p className={pricingStyles.subDescription}>
                {pack.subDescription}
              </p>
              
              <div className={pricingStyles.featureHighlights}>
                <div className={pricingStyles.featureItem}>
                  <span className={pricingStyles.featureIcon}>💎</span>
                  <span className={pricingStyles.featureNumber}>{pack.revivals}</span>
                  <div className={pricingStyles.featureLabel}>Premium Revivals</div>
                </div>
                
                <div className={pricingStyles.featureItem}>
                  <span className={pricingStyles.featureIcon}>💰</span>
                  <span className={pricingStyles.featureNumber}>{pack.perRestore}</span>
                  <div className={pricingStyles.featureLabel}>Per Restore</div>
                </div>
              </div>
              
              <Link
                href="/pricing"
                prefetch={true}
                aria-label={`Purchase ${pack.name} credit pack`}
                className={pricingStyles.pricingButton}
              >
                🚀 BEGIN RESTORATION
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;