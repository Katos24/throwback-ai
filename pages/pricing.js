import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import styles from "../styles/PricingPage.module.css";

const CREDIT_PACKS = [
  {
    id: process.env.NEXT_PUBLIC_PRICE_DAWN_PACK,
    name: "Dawn Pack",
    greekName: "Ἠώς", // Eos - Goddess of Dawn
    credits: 400,
    price: "$4.99",
    revivals: 10,
    tagline: "Perfect for trying out Anastasis magic — restore a few cherished memories.",
    useCase: "Great for testing the waters or refreshing a handful of your most meaningful portraits.",
    icon: "🌅",
    gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
    popular: false
  },
  {
    id: process.env.NEXT_PUBLIC_PRICE_REVIVAL_PACK,
    name: "Revival Pack",
    greekName: "Παλιγγενεσία", // Palingenesia - Rebirth
    credits: 1000,
    price: "$9.99",
    revivals: 25,
    tagline: "A solid bundle for breathing new life into vintage family shots.",
    useCase: "Ideal for themed mini galleries, vacation snaps, or honoring loved ones with restored detail.",
    icon: "⚡",
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    popular: false
  },
  {
    id: process.env.NEXT_PUBLIC_PRICE_RESURGENCE_PACK,
    name: "Resurgence Pack",
    greekName: "Ἀνάστασις", // Anastasis - Resurrection
    credits: 1600,
    price: "$14.99",
    revivals: 40,
    tagline: "A popular pick for curating full-family albums and restoring event photos.",
    useCase: "Great for birthdays, reunions, pet portraits, or weaving stories across generations.",
    icon: "✨",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    popular: true
  },
  {
    id: process.env.NEXT_PUBLIC_PRICE_ETERNAL_PACK,
    name: "Eternal Pack",
    greekName: "Αἰώνιος", // Aionios - Eternal
    credits: 3500,
    price: "$29.99",
    revivals: 87,
    tagline: "Built for legacy-level restoration — preserve history at scale.",
    useCase: "Ideal for memory books, heritage tributes, holiday archives, and digital scrapbooking.",
    icon: "🏛️",
    gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    popular: false
  },
];

export default function PricingPage() {
  const [loadingId, setLoadingId] = useState(null);
  const [user, setUser] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user);
    });
  }, []);

  const handlePurchase = async (selectedPriceId) => {
    if (!user) {
      alert("Please log in to make a purchase.");
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
    <section className={styles.anastasisPricing}>
      <div className={styles.heroSection}>
        <div className={styles.greekPattern}></div>
        <h1 className={styles.mainTitle}>
          <span className={styles.titleGreek}>Πακέτα Πίστωσης</span>
          <span className={styles.titleEnglish}>Credit Packs for Timeless Restorations</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Whether you're reviving faded memories, curating albums, or preserving heritage — 
          <strong> Anastasis Credit Packs</strong> give you the power to restore with beauty.
        </p>
        <div className={styles.poweredBy}>
          <span className={styles.aiLabel}>Powered by</span>
          <span className={styles.throwbackAi}>Throwback AI</span>
        </div>
      </div>

      <div className={styles.packGrid}>
        {CREDIT_PACKS.map(({ id, name, greekName, credits, price, tagline, useCase, revivals, icon, gradient, popular }) => {
          const priceNumber = parseFloat(price.slice(1));
          const costPerRestore = (priceNumber / revivals).toFixed(2);

          return (
            <div 
              key={id} 
              className={`${styles.anastasisCard} ${popular ? styles.featured : ''}`}
              onMouseEnter={() => setHoveredCard(id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ '--card-gradient': gradient }}
            >
              {popular && (
                <div className={styles.popularBadge}>
                  <span className={styles.crown}>👑</span>
                  Most Popular
                </div>
              )}
              
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>{icon}</div>
                <h2 className={styles.packName}>{name}</h2>
                <p className={styles.greekName}>{greekName}</p>
              </div>

              <div className={styles.priceSection}>
                <div className={styles.mainPrice}>
                  <span className={styles.currency}>$</span>
                  <span className={styles.amount}>{price.slice(1)}</span>
                </div>
                <div className={styles.creditsInfo}>
                  <span className={styles.creditCount}>{credits.toLocaleString()}</span>
                  <span className={styles.creditLabel}>credits</span>
                </div>
              </div>

              <div className={styles.cardContent}>
                <p className={styles.tagline}>{tagline}</p>
                <p className={styles.useCase}>{useCase}</p>

                <div className={styles.statsGrid}>
                  <div className={styles.statItem}>
                    <span className={styles.statIcon}>💎</span>
                    <div>
                      <span className={styles.statValue}>{revivals}</span>
                      <span className={styles.statLabel}>Premium Revivals</span>
                    </div>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statIcon}>💰</span>
                    <div>
                      <span className={styles.statValue}>${costPerRestore}</span>
                      <span className={styles.statLabel}>Per Restore</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className={`${styles.buyBtn} ${loadingId === id ? styles.loading : ''}`}
                onClick={() => handlePurchase(id)}
                disabled={loadingId === id}
              >
                {loadingId === id ? (
                  <>
                    <span className={styles.spinner}>⚡</span>
                    Processing...
                  </>
                ) : (
                  <>
                    <span className={styles.buttonIcon}>🚀</span>
                    Begin Restoration
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      <div className={styles.trustSection}>
        <div className={styles.trustBadges}>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>🔒</span>
            <span>Secure Payment</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>⚡</span>
            <span>Instant Processing</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>🎯</span>
            <span>AI-Powered Results</span>
          </div>
        </div>
      </div>
    </section>
  );
}