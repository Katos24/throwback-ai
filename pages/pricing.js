// pages/pricing.js - Updated with Avatar Support
import Head from 'next/head';
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import styles from "../styles/PricingPage.module.css";
import Link from 'next/link';

// Toast Component
const Toast = ({ message, type = 'info', onClose, isVisible }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`${styles.toast} ${styles[`toast-${type}`]}`}>
      <div className={styles.toastContent}>
        <span className={styles.toastIcon}>
          {type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️'}
        </span>
        <span className={styles.toastMessage}>{message}</span>
        <button 
          className={styles.toastClose}
          onClick={onClose}
          aria-label="Close notification"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

const CREDIT_PACKS = [
  {
    id: process.env.NEXT_PUBLIC_PRICE_DAWN_PACK,
    name: "Dawn Pack",
    credits: 400,
    price: "$4.99",
    gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
    popular: false,
    tagline: "Perfect starter pack",
    restores: 400,
    colorizations: 10,
    avatars: 8
  },
  {
    id: process.env.NEXT_PUBLIC_PRICE_REVIVAL_PACK,
    name: "Revival Pack",
    credits: 1000,
    price: "$9.99",
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    popular: false,
    tagline: "Great for families",
    restores: 1000,
    colorizations: 25,
    avatars: 20
  },
  {
    id: process.env.NEXT_PUBLIC_PRICE_RESURGENCE_PACK,
    name: "Resurgence Pack",
    credits: 1600,
    price: "$14.99",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    popular: true,
    tagline: "Best value pack",
    restores: 1600,
    colorizations: 40,
    avatars: 32
  },
  {
    id: process.env.NEXT_PUBLIC_PRICE_ETERNAL_PACK,
    name: "Eternal Pack",
    credits: 3500,
    price: "$29.99",
    gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    popular: false,
    tagline: "Professional package",
    restores: 3500,
    colorizations: 87,
    avatars: 70
  },
];

export default function PricingPage() {
  const [loadingId, setLoadingId] = useState(null);
  const [user, setUser] = useState(null);
  
  // Toast state
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'info'
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user);
    });
  }, []);

  // Toast helper functions
  const showToast = (message, type = 'info') => {
    setToast({
      isVisible: true,
      message,
      type
    });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const handlePurchase = async (selectedPriceId) => {
    if (!user) {
      showToast("Please sign up or log in to purchase credits", "error");
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

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create checkout session");
      }

      const { url } = await res.json();
      showToast("Redirecting to checkout...", "success");
      
      setTimeout(() => {
        window.location.href = url;
      }, 1000);
      
    } catch (err) {
      console.error('Checkout error:', err);
      showToast(err.message || "Something went wrong. Please try again.", "error");
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
        "description": "Purchase Throwback AI credit packs to restore and colorize vintage photos. Affordable pricing for photo restoration services.",
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
        <title>Pricing — Throwback AI Photo Restoration Credits</title>
        <meta
          name="description"
          content="Affordable photo restoration and colorization credits. Restore vintage family photos and bring memories back to life with AI-powered technology."
        />
        <meta name="keywords" content="photo restoration pricing, vintage photo repair, AI colorization cost, family photo restoration" />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Throwback AI" />
        <meta property="og:title" content="Pricing — Throwback AI Photo Restoration Credits" />
        <meta
          property="og:description"
          content="Affordable photo restoration and colorization credits. Restore vintage family photos and bring memories back to life."
        />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Photo restoration pricing and credit packs" />

        {/* Facebook-specific */}
        <meta property="fb:pages" content={facebookPageId} />
        <meta property="article:publisher" content={facebookPageUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pricing — Throwback AI Photo Restoration Credits" />
        <meta
          name="twitter:description"
          content="Affordable photo restoration and colorization credits. Restore vintage family photos and bring memories back to life."
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
            <span className={styles.titleMain}>Restore Your Photos</span>
            <span className={styles.titleSub}>Bring Vintage Memories Back to Life</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Transform old, damaged, and faded family photos with our AI-powered restoration technology. 
            <strong> Choose the credit pack</strong> that fits your restoration needs.
          </p>

          <div className={styles.packGrid}>
            {CREDIT_PACKS.map(({ id, name, credits, price, tagline, gradient, popular, restores, colorizations, avatars }) => {
              const priceNumber = parseFloat(price.slice(1));
              const costPerCredit = (priceNumber / credits).toFixed(3);

              return (
                <div 
                  key={id} 
                  className={`${styles.creditCard} ${popular ? styles.featured : ''}`}
                  style={{ '--card-gradient': gradient }}
                >
                  {popular && (
                    <div className={styles.popularBadge}>
                      <span className={styles.crown}>⭐</span>
                      Most Popular
                    </div>
                  )}
                  
                  <div className={styles.cardHeader}>
                    <h2 className={styles.packName}>{name}</h2>
                    <p className={styles.tagline}>{tagline}</p>
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

                  {/* Updated includes - now with avatars */}
                  <div className={styles.cardContent}>
                    <div className={styles.includesGrid}>
                      <div className={styles.includeItem}>
                        <span className={styles.includeIcon}>🔧</span>
                        <span>{restores} Photo Restorations</span>
                      </div>
                      <div className={styles.includeItem}>
                        <span className={styles.includeIcon}>🎨</span>
                        <span>{colorizations} Full Colorizations</span>
                      </div>
                      <div className={styles.includeItem}>
                        <span className={styles.includeIcon}>✨</span>
                        <span>{avatars} AI Avatars</span>
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
                        Get Credits
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Service Overview - Updated with avatar pricing */}
          <div className={styles.serviceOverview}>
            <div className={styles.serviceItem}>
              <span className={styles.serviceIcon}>🔧</span>
              <div>
                <strong>Photo Restoration</strong>
                <span className={styles.serviceCost}>Costs 1 credit</span>
              </div>
            </div>
            <div className={styles.serviceItem}>
              <span className={styles.serviceIcon}>🎨</span>
              <div>
                <strong>Full Colorization</strong>
                <span className={styles.serviceCost}>Costs 40 credits</span>
              </div>
            </div>
            <div className={styles.serviceItem}>
              <span className={styles.serviceIcon}>✨</span>
              <div>
                <strong>AI Avatar</strong>
                <span className={styles.serviceCost}>Costs 50 credits</span>
              </div>
            </div>
            <div className={styles.serviceItem}>
              <span className={styles.serviceIcon}>📸</span>
              <div>
                <strong>Creative Styles</strong>
                <span className={styles.serviceCost}>Costs 40-50 credits</span>
              </div>
            </div>
          </div>

          {/* Simplified Features Section */}
          <div className={styles.featuresSection}>
            <h3 className={styles.featuresTitle}>Why Choose Throwback AI</h3>
            <div className={styles.featuresList}>
              <div className={styles.globalFeature}>
                <span className={styles.globalFeatureIcon}>🔒</span>
                <div>
                  <strong>100% Private</strong>
                  <span>Photos deleted after processing</span>
                </div>
              </div>
              <div className={styles.globalFeature}>
                <span className={styles.globalFeatureIcon}>⚡</span>
                <div>
                  <strong>Lightning Fast</strong>
                  <span>Results in under 30 seconds</span>
                </div>
              </div>
              <div className={styles.globalFeature}>
                <span className={styles.globalFeatureIcon}>🎯</span>
                <div>
                  <strong>AI-Powered</strong>
                  <span>Professional quality results</span>
                </div>
              </div>
              <div className={styles.globalFeature}>
                <span className={styles.globalFeatureIcon}>💝</span>
                <div>
                  <strong>Never Expire</strong>
                  <span>Use credits anytime</span>
                </div>
              </div>
            </div>
          </div>

          {/* Small Creative Options Section */}
          <div className={styles.additionalServices}>
            <h4 className={styles.additionalTitle}>Also Available</h4>
            <div className={styles.additionalGrid}>
              <Link href="/replicate/80s" className={styles.additionalLink}>
                <span>📼 Decade Styles</span>
              </Link>
              <Link href="/replicate/cartoon" className={styles.additionalLink}>
                <span>🎭 Cartoon Art</span>
              </Link>
              <Link href="/replicate/avatar" className={styles.additionalLink}>
                <span>👔 Pro Avatars</span>
              </Link>
            </div>
          </div>

          <div className={styles.poweredBy}>
            <span className={styles.aiLabel}>Powered by</span>
            <span className={styles.throwbackAi}>Throwback AI</span>
          </div>
        </div>
      </section>

      {/* Toast Notification */}
      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  );
}