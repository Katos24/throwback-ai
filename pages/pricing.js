// pages/pricing.js
import Head from 'next/head';
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import styles from "../styles/PricingPage.module.css";

const CREDIT_PACKS = [
  {
    id: process.env.NEXT_PUBLIC_PRICE_DAWN_PACK,
    name: "Starter Pack",
    credits: 400,
    price: "$4.99",
    revivals: 10,
    tagline: "Perfect for trying out Throwback AI — restore a few cherished memories.",
    useCase: "Great for testing the waters with basic restorations and a few colorizations.",
    gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
    popular: false
  },
  {
    id: process.env.NEXT_PUBLIC_PRICE_REVIVAL_PACK,
    name: "Family Pack",
    credits: 1000,
    price: "$9.99",
    revivals: 25,
    tagline: "A solid bundle for breathing new life into family photo collections.",
    useCase: "Ideal for family albums, vacation memories, or preserving multiple generations.",
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    popular: false
  },
  {
    id: process.env.NEXT_PUBLIC_PRICE_RESURGENCE_PACK,
    name: "Premium Pack",
    credits: 1600,
    price: "$14.99",
    revivals: 40,
    tagline: "Our most popular choice for complete photo transformation projects.",
    useCase: "Perfect for events, family reunions, heritage projects, and creative artwork.",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    popular: true
  },
  {
    id: process.env.NEXT_PUBLIC_PRICE_ETERNAL_PACK,
    name: "Professional Pack",
    credits: 3500,
    price: "$29.99",
    revivals: 87,
    tagline: "Built for large-scale restoration — preserve entire photo collections.",
    useCase: "Ideal for genealogy projects, digital archiving, professional restoration work.",
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
  const ogImage = `${siteUrl}/images/pricing-og.png`;
  const twitterImage = ogImage;
  const facebookPageUrl = 'https://www.facebook.com/profile.php?id=61578072554521';
  const facebookPageId = '61578072554521';

  // Build structured data (OfferCatalog) from CREDIT_PACKS
  const offers = CREDIT_PACKS.map(pack => {
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
        "description": "Purchase Throwback AI credit packs to restore and colorize old photos. Choose a pack that fits your needs — from single restores to bulk heritage preservation.",
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
          content="Buy Throwback AI Credit Packs: affordable credit bundles for restoring, enhancing, and colorizing vintage photos. Flexible plans for single fixes, albums, and large heritage projects."
        />
        <meta name="keywords" content="Throwback AI pricing, photo restoration credits, buy credits, AI colorize price, restore photo cost" />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Throwback AI" />
        <meta property="og:title" content="Pricing — Throwback AI Credits & Plans" />
        <meta
          property="og:description"
          content="Buy Throwback AI Credit Packs: affordable credit bundles for restoring, enhancing, and colorizing vintage photos. Flexible plans for single fixes, albums, and large heritage projects."
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
          content="Buy Throwback AI Credit Packs: affordable credit bundles for restoring, enhancing, and colorizing vintage photos."
        />
        <meta name="twitter:image" content={twitterImage} />

        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <section className={styles.throwbackPricing}>
        <div className={styles.heroSection}>
          <div className={styles.backgroundPattern}></div>
          <h1 className={styles.mainTitle}>
            <span className={styles.titleMain}>Choose Your Credit Pack</span>
            <span className={styles.titleSub}>Affordable Plans for Every Memory Restoration Need</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Whether you&apos;re fixing a single treasured photo or preserving an entire family archive — 
            <strong> Throwback AI Credit Packs</strong> give you the power to restore, colorize, and create.
          </p>

          {/* Service Overview */}
          <div className={styles.serviceOverview}>
            <div className={styles.serviceItem}>
              <span className={styles.serviceIcon}>🔧</span>
              <div>
                <strong>Photo Restoration</strong>
                <span className={styles.serviceCost}>1 credit each</span>
              </div>
            </div>
            <div className={styles.serviceItem}>
              <span className={styles.serviceIcon}>🎨</span>
              <div>
                <strong>Photo Colorization</strong>
                <span className={styles.serviceCost}>40 credits each</span>
              </div>
            </div>
            <div className={styles.serviceItem}>
              <span className={styles.serviceIcon}>🎭</span>
              <div>
                <strong>Cartoon Creator</strong>
                <span className={styles.serviceCost}>40 credits each</span>
              </div>
            </div>
          </div>

          <div className={styles.packGrid}>
            {CREDIT_PACKS.map(({ id, name, credits, price, tagline, useCase, revivals, icon, gradient, popular }) => {
              const priceNumber = parseFloat(price.slice(1));
              const costPerCredit = (priceNumber / credits).toFixed(3);

              return (
                <div 
                  key={id} 
                  className={`${styles.creditCard} ${popular ? styles.featured : ''}`}
                  onMouseEnter={() => setHoveredCard(id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{ '--card-gradient': gradient }}
                >
                  {popular && (
                    <div className={styles.popularBadge}>
                      <span className={styles.crown}>⭐</span>
                      Most Popular
                    </div>
                  )}
                  
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>{icon}</div>
                    <h2 className={styles.packName}>{name}</h2>
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
                    <div className={styles.valueInfo}>
                      ${costPerCredit} per credit
                    </div>
                  </div>

                  <div className={styles.cardContent}>
                    <p className={styles.tagline}>{tagline}</p>
                    <p className={styles.useCase}>{useCase}</p>

                    <div className={styles.featuresGrid}>
                      <div className={styles.featureItem}>
                        <span className={styles.featureIcon}>🔧</span>
                        <div>
                          <span className={styles.featureValue}>{credits}</span>
                          <span className={styles.featureLabel}> Photo Restorations</span>
                        </div>
                      </div>
                      <div className={styles.featureItem}>
                        <span className={styles.featureIcon}>🎨</span>
                        <div>
                          <span className={styles.featureValue}>{revivals}</span>
                          <span className={styles.featureLabel}> Colorizations/Cartoons</span>
                        </div>
                      </div>
                      <div className={styles.featureItem}>
                        <span className={styles.featureIcon}>⚡</span>
                        <div>
                          <span className={styles.featureValue}>Instant</span>
                          <span className={styles.featureLabel}> AI Processing</span>
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
                        Get Credits Now
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Features Section */}
          <div className={styles.featuresSection}>
            <h3 className={styles.featuresTitle}>What You Get With Every Pack</h3>
            <div className={styles.featuresList}>
              <div className={styles.globalFeature}>
                <span className={styles.globalFeatureIcon}>🔒</span>
                <div>
                  <strong>100% Private & Secure</strong>
                  <span>Your photos are deleted after 1 hour</span>
                </div>
              </div>
              <div className={styles.globalFeature}>
                <span className={styles.globalFeatureIcon}>⚡</span>
                <div>
                  <strong>Lightning Fast Results</strong>
                  <span>Most photos processed in under 3 seconds</span>
                </div>
              </div>
              <div className={styles.globalFeature}>
                <span className={styles.globalFeatureIcon}>🎯</span>
                <div>
                  <strong>AI-Powered Quality</strong>
                  <span>Advanced models trained on millions of photos</span>
                </div>
              </div>
              <div className={styles.globalFeature}>
                <span className={styles.globalFeatureIcon}>💝</span>
                <div>
                  <strong>Credits Never Expire</strong>
                  <span>Use them whenever you&apos;re ready</span>
                </div>
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
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>💳</span>
              <span>Money-Back Guarantee</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}