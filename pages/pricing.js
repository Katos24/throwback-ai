// pages/pricing.js
import Head from 'next/head';
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import styles from "../styles/PricingPage.module.css";

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
    includes: {
      basic: 400,
      premium: 10,
      yearbook: 80,
      cartoon: 10,
      avatar: 8
    }
  },
  {
    id: process.env.NEXT_PUBLIC_PRICE_REVIVAL_PACK,
    name: "Revival Pack",
    credits: 1000,
    price: "$9.99",
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    popular: false,
    includes: {
      basic: 1000,
      premium: 25,
      yearbook: 200,
      cartoon: 25,
      avatar: 20
    }
  },
  {
    id: process.env.NEXT_PUBLIC_PRICE_RESURGENCE_PACK,
    name: "Resurgence Pack",
    credits: 1600,
    price: "$14.99",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    popular: true,
    includes: {
      basic: 1600,
      premium: 40,
      yearbook: 320,
      cartoon: 40,
      avatar: 32
    }
  },
  {
    id: process.env.NEXT_PUBLIC_PRICE_ETERNAL_PACK,
    name: "Eternal Pack",
    credits: 3500,
    price: "$29.99",
    gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    popular: false,
    includes: {
      basic: 3500,
      premium: 87,
      yearbook: 700,
      cartoon: 87,
      avatar: 70
    }
  },
];

export default function PricingPage() {
  const [loadingId, setLoadingId] = useState(null);
  const [user, setUser] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  
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
        "description": "Purchase Throwback AI credit packs to restore, colorize, and transform photos. From basic restoration to professional avatars and yearbook styles.",
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
          content="Buy Throwback AI Credit Packs: affordable credits for photo restoration, colorization, yearbook photos, professional avatars, and cartoon art. Flexible plans for every need."
        />
        <meta name="keywords" content="Throwback AI pricing, photo restoration credits, AI avatar cost, yearbook photo price, cartoon art credits" />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Throwback AI" />
        <meta property="og:title" content="Pricing — Throwback AI Credits & Plans" />
        <meta
          property="og:description"
          content="Buy Throwback AI Credit Packs: affordable credits for photo restoration, colorization, yearbook photos, professional avatars, and cartoon art."
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
          content="Buy Throwback AI Credit Packs: affordable credits for photo restoration, colorization, yearbook photos, professional avatars, and cartoon art."
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
            <span className={styles.titleSub}>Transform Any Photo Into Something Amazing</span>
          </h1>
          <p className={styles.heroSubtitle}>
            From restoring precious family memories to creating professional avatars and fun art — 
            <strong> Throwback AI Credit Packs</strong> give you the power to transform any photo.
          </p>

          {/* Service Overview */}
          <div className={styles.serviceOverview}>
            <div className={styles.serviceItem}>
              <span className={styles.serviceIcon}>🔧</span>
              <div>
                <strong>Photo Restoration</strong>
                <span className={styles.serviceCost}>1 credit</span>
              </div>
            </div>
            <div className={styles.serviceItem}>
              <span className={styles.serviceIcon}>🎨</span>
              <div>
                <strong>Photo Colorization</strong>
                <span className={styles.serviceCost}>40 credits</span>
              </div>
            </div>
            <div className={styles.serviceItem}>
              <span className={styles.serviceIcon}>📸</span>
              <div>
                <strong>90s Yearbook Style</strong>
                <span className={styles.serviceCost}>5 credits</span>
              </div>
            </div>
            <div className={styles.serviceItem}>
              <span className={styles.serviceIcon}>🎭</span>
              <div>
                <strong>Cartoon Art</strong>
                <span className={styles.serviceCost}>40 credits</span>
              </div>
            </div>
            <div className={styles.serviceItem}>
              <span className={styles.serviceIcon}>👔</span>
              <div>
                <strong>Professional Avatar</strong>
                <span className={styles.serviceCost}>50 credits</span>
              </div>
            </div>
          </div>

          <div className={styles.packGrid}>
            {CREDIT_PACKS.map(({ id, name, credits, price, tagline, useCase, gradient, popular, includes }) => {
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

                    <div className={styles.includesGrid}>
                      <div className={styles.includeItem}>
                        <span className={styles.includeIcon}>🔧</span>
                        <span>{includes.basic} Basic Restorations</span>
                      </div>
                      <div className={styles.includeItem}>
                        <span className={styles.includeIcon}>🎨</span>
                        <span>{includes.premium} Colorizations</span>
                      </div>
                      <div className={styles.includeItem}>
                        <span className={styles.includeIcon}>📸</span>
                        <span>{includes.yearbook} Yearbook Photos</span>
                      </div>
                      <div className={styles.includeItem}>
                        <span className={styles.includeIcon}>🎭</span>
                        <span>{includes.cartoon} Cartoon Arts</span>
                      </div>
                      <div className={styles.includeItem}>
                        <span className={styles.includeIcon}>👔</span>
                        <span>{includes.avatar} Pro Avatars</span>
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
                  <span>Most photos processed in under 30 seconds</span>
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