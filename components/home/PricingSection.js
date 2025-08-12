import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient'; // Adjust path as needed
import pricingStyles from '../../styles/Pricing.module.css';

const PricingSection = () => {
  const [loadingId, setLoadingId] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user);
    });
  }, []);

  const creditPacks = [
    {
      id: process.env.NEXT_PUBLIC_PRICE_DAWN_PACK,
      name: "Dawn Pack",
      price: "$4.99",
      credits: "400",
      description: "Perfect for trying out Anastasis magic — restore a few cherished memories.",
      revivals: "10",
      perRestore: "$0.50",
      featured: false
    },
    {
      id: process.env.NEXT_PUBLIC_PRICE_REVIVAL_PACK,
      name: "Revival Pack", 
      price: "$9.99",
      credits: "1,000", 
      description: "A solid bundle for breathing new life into vintage family shots.",
      revivals: "25",
      perRestore: "$0.40",
      featured: false
    },
    {
      id: process.env.NEXT_PUBLIC_PRICE_RESURGENCE_PACK,
      name: "Resurgence Pack",
      price: "$14.99",
      credits: "1,600",
      description: "A popular pick for curating full-family albums and restoring event photos.",
      revivals: "40", 
      perRestore: "$0.37",
      featured: true,
      badge: "MOST POPULAR"
    },
    {
      id: process.env.NEXT_PUBLIC_PRICE_ETERNAL_PACK,
      name: "Eternal Pack",
      price: "$29.99", 
      credits: "3,500",
      description: "Built for legacy-level restoration — preserve history at scale.",
      revivals: "87",
      perRestore: "$0.34", 
      featured: false
    }
  ];

  const handlePurchase = async (selectedPriceId) => {
    if (!user) {
      alert("Please sign up or log in to make a purchase.");
      return;
    }

    setLoadingId(selectedPriceId);

    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          supabaseUserId: user.id,
          email: user.email,
          selectedPriceId,
        }),
      });

      if (!res.ok) throw new Error("Failed to create checkout session");

      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      alert(err.message);
      setLoadingId(null);
    }
  };

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
              
              <button
                onClick={() => handlePurchase(pack.id)}
                disabled={loadingId === pack.id}
                aria-label={`Purchase ${pack.name} credit pack`}
                className={`${pricingStyles.pricingButton} ${loadingId === pack.id ? pricingStyles.loading : ''}`}
              >
                {loadingId === pack.id ? (
                  <>
                    <span className={pricingStyles.spinner}>⚡</span>
                    PROCESSING...
                  </>
                ) : (
                  <>
                    🚀 BEGIN RESTORATION
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;