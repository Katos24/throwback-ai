// pages/pricing.js
import Head from 'next/head';
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import styles from "../styles/PricingPage.module.css";

const CREDIT_PACKS = [
  {
    id: process.env.NEXT_PUBLIC_PRICE_DAWN_PACK,
    name: "Dawn Pack",
    greekName: "Ἠώς",
    credits: 400,
    price: "$4.99",
    revivals: 10,
    tagline: "Perfect for trying out Anastasis magic — restore a few cherished memories.",
    useCase: "Great for testing the waters or refreshing a handful of your most meaningful portraits.",
    gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
    popular: false
  },
  {
    id: process.env.NEXT_PUBLIC_PRICE_REVIVAL_PACK,
    name: "Revival Pack",
    greekName: "Παλιγγενεσία:",
    credits: 1000,
    price: "$9.99",
    revivals: 25,
    tagline: "A solid bundle for breathing new life into vintage family shots.",
    useCase: "Ideal for themed mini galleries, vacation snaps, or honoring loved ones with restored detail.",
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    popular: false
  },
  {
    id: process.env.NEXT_PUBLIC_PRICE_RESURGENCE_PACK,
    name: "Resurgence Pack",
    greekName: "Ἀνάστασις",
    credits: 1600,
    price: "$14.99",
    revivals: 40,
    tagline: "A popular pick for curating full-family albums and restoring event photos.",
    useCase: "Great for birthdays, reunions, pet portraits, or weaving stories across generations.",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    popular: true
  },
  {
    id: process.env.NEXT_PUBLIC_PRICE_ETERNAL_PACK,
    name: "Eternal Pack",
    greekName: "Αἰώνιος",
    credits: 3500,
    price: "$29.99",
    revivals: 87,
    tagline: "Built for legacy-level restoration — preserve history at scale.",
    useCase: "Ideal for memory books, heritage tributes, holiday archives, and digital scrapbooking.",
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

  // SEO-related values
  const siteUrl = 'https://throwbackai.app';
  const pageUrl = `${siteUrl}/pricing`;
  const ogImage = `${siteUrl}/images/pricing-og.png`; // change to your pricing-specific share image
  const twitterImage = ogImage;
  const facebookPageUrl = 'https://www.facebook.com/profile.php?id=61578072554521';
  const facebookPageId = '61578072554521';

  // Build structured data (OfferCatalog) from CREDIT_PACKS
  const offers = CREDIT_PACKS.map(pack => {
    // parse numeric price where possible
    const numericPrice = parseFloat(String(pack.price).replace(/[^0-9.]/g, '')) || null;
    return {
      "@type": "Offer",
      "name": pack.name,
      "description": pack.tagline,
      "price": numericPrice !== null ? numericPrice.toFixed(2) : pack.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": pageUrl,
      "eligibleQuantity": {
        "@type": "QuantitativeValue",
        "value": pack.credits
      },
      "sku": pack.id || pack.name
    };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": "Pricing — Throwback AI",
        "description": "Purchase Anastasis credit packs to restore and colorize old photos with Throwback AI. Choose a pack that fits your needs — from single restores to bulk legacy preservation.",
        "isPartOf": { "@id": `${siteUrl}#website` }
      },
      {
        "@type": "OfferCatalog",
        "@id": `${pageUrl}#offers`,
        "name": "Throwback AI Credit Packs",
        "itemListElement": offers.map((offer, i) => ({
          "@type": "OfferCatalog",
          "position": i + 1,
          "item": offer
        }))
      }
    ]
  };

  return (
    <>
      <Head>
        <title>Pricing — Throwback AI Credits & Plans</title>
        <meta
          name="description"
          content="Buy Anastasis Credit Packs for Throwback AI: affordable credit bundles for restoring, enhancing, and colorizing vintage photos. Flexible plans for single fixes, albums, and large heritage projects."
        />
        <meta name="keywords" content="Throwback AI pricing, photo restoration credits, buy credits, AI colorize price, restore photo cost" />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Throwback AI" />
        <meta property="og:title" content="Pricing — Throwback AI Credits & Plans" />
        <meta
          property="og:description"
          content="Buy Anastasis Credit Packs for Throwback AI: affordable credit bundles for restoring, enhancing, and colorizing vintage photos. Flexible plans for single fixes, albums, and large heritage projects."
        />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Pricing and credit pack preview for Throwback AI" />

        {/* Facebook-specific */}
        <meta property="fb:pages" content={facebookPageId} />
        <meta property="article:publisher" content={facebookPageUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pricing — Throwback AI Credits & Plans" />
        <meta
          name="twitter:description"
          content="Buy Anastasis Credit Packs for Throwback AI: affordable credit bundles for restoring, enhancing, and colorizing vintage photos."
        />
        <meta name="twitter:image" content={twitterImage} />

        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <section className={styles.anastasisPricing}>
        <div className={styles.heroSection}>
          <div className={styles.greekPattern}></div>
          <h1 className={styles.mainTitle}>
            <span className={styles.titleGreek}>Πακέτα Πίστωσης</span>
            <span className={styles.titleEnglish}>Credit Packs for Timeless Restorations</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Whether you&apos;re reviving faded memories, curating albums, or preserving heritage — 
            <strong> Anastasis Credit Packs</strong> give you the power to restore with beauty.
          </p>

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
                          <span className={styles.statLabel}> Premium Fixes (40 credits each)</span>
                        </div>
                      </div>
                      <div className={styles.statItem}>
                        <span className={styles.statIcon}>🧼</span>
                        <div>
                          <span className={styles.statValue}>{credits}</span>
                          <span className={styles.statLabel}> Basic Fixes (1 credit each)</span>
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

          {/* Mobile Swipe Instructions */}
          <div className={styles.mobileSwipeHint}>
            <div className={styles.swipeContainer}>
              <span className={styles.swipeIcon}>👆</span>
              <span className={styles.swipeText}>Swipe right to see more packs</span>
              <div className={styles.swipeArrow}>
                <span>👉</span>
              </div>
            </div>
          </div>

          <div className={styles.poweredBy}>
            <span className={styles.aiLabel}>Powered by</span>
            <span className={styles.throwbackAi}>Throwback AI</span>
          </div>
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
    </>
  );
}
