import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient'; // Adjust path as needed
import pricingStyles from '../../styles/Pricing.module.css';

const PricingSection = () => {
  const [loadingId, setLoadingId] = useState(null);
  const [user, setUser] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

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
      credits: 400,
      description: "Perfect for trying out Anastasis magic — restore a few cherished memories.",
      revivals: 10,
      perRestore: "$0.50",
      gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
      featured: false
    },
    {
      id: process.env.NEXT_PUBLIC_PRICE_REVIVAL_PACK,
      name: "Revival Pack", 
      price: "$9.99",
      credits: 1000, 
      description: "A solid bundle for breathing new life into vintage family shots.",
      revivals: 25,
      perRestore: "$0.40",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      featured: false
    },
    {
      id: process.env.NEXT_PUBLIC_PRICE_RESURGENCE_PACK,
      name: "Resurgence Pack",
      price: "$14.99",
      credits: 1600,
      description: "A popular pick for curating full-family albums and restoring event photos.",
      revivals: 40, 
      perRestore: "$0.37",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      featured: false,
    },
    {
      id: process.env.NEXT_PUBLIC_PRICE_ETERNAL_PACK,
      name: "Eternal Pack",
      price: "$29.99", 
      credits: 3500,
      description: "Built for legacy-level restoration — preserve history at scale.",
      revivals: 87,
      perRestore: "$0.34", 
      gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
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
        
        <div className={pricingStyles.packGrid}>
          {creditPacks.map((pack) => {
            const priceNumber = parseFloat(pack.price.slice(1));
            const costPerCredit = (priceNumber / pack.credits).toFixed(3);

            return (
              <div 
                key={pack.id} 
                className={`${pricingStyles.creditCard} ${pack.featured ? pricingStyles.featured : ''}`}
                onMouseEnter={() => setHoveredCard(pack.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ '--card-gradient': pack.gradient }}
              >
                {pack.badge && (
                  <div className={pricingStyles.popularBadge}>
                    <span className={pricingStyles.crown}>⭐</span>
                    {pack.badge}
                  </div>
                )}
                
                <div className={pricingStyles.cardHeader}>
                  <h3 className={pricingStyles.packName}>{pack.name}</h3>
                </div>

                <div className={pricingStyles.priceSection}>
                  <div className={pricingStyles.mainPrice}>
                    <span className={pricingStyles.currency}>$</span>
                    <span className={pricingStyles.amount}>{pack.price.slice(1)}</span>
                  </div>
                  <div className={pricingStyles.creditsInfo}>
                    <span className={pricingStyles.creditCount}>{pack.credits.toLocaleString()}</span>
                    <span className={pricingStyles.creditLabel}>credits</span>
                  </div>
                  <div className={pricingStyles.valueInfo}>
                    ${costPerCredit} per credit
                  </div>
                </div>

                <div className={pricingStyles.cardContent}>
                  <p className={pricingStyles.tagline}>{pack.description}</p>

                  <div className={pricingStyles.featuresGrid}>
                    <div className={pricingStyles.featureItem}>
                      <span className={pricingStyles.featureIcon}>🔧</span>
                      <div>
                        <span className={pricingStyles.featureValue}>{pack.credits}</span>
                        <span className={pricingStyles.featureLabel}> Photo Restorations</span>
                      </div>
                    </div>
                    <div className={pricingStyles.featureItem}>
                      <span className={pricingStyles.featureIcon}>🎨</span>
                      <div>
                        <span className={pricingStyles.featureValue}>{pack.revivals}</span>
                        <span className={pricingStyles.featureLabel}> Premium Revivals</span>
                      </div>
                    </div>
                    <div className={pricingStyles.featureItem}>
                      <span className={pricingStyles.featureIcon}>💰</span>
                      <div>
                        <span className={pricingStyles.featureValue}>{pack.perRestore}</span>
                        <span className={pricingStyles.featureLabel}> Per Restore</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  className={`${pricingStyles.buyBtn} ${loadingId === pack.id ? pricingStyles.loading : ''}`}
                  onClick={() => handlePurchase(pack.id)}
                  disabled={loadingId === pack.id}
                  aria-label={`Purchase ${pack.name} credit pack`}
                >
                  {loadingId === pack.id ? (
                    <>
                      <span className={pricingStyles.spinner}>⚡</span>
                      PROCESSING...
                    </>
                  ) : (
                    <>
                      <span className={pricingStyles.buttonIcon}>🚀</span>
                      BEGIN RESTORATION
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;