// pages/pricing.js - Modern Sleek Design
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
    name: "Dawn",
    credits: 400,
    price: "$4.99",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    popular: false,
    tagline: "Try it out",
    perCredit: "$0.012"
  },
  {
    id: process.env.NEXT_PUBLIC_PRICE_REVIVAL_PACK,
    name: "Revival",
    credits: 1000,
    price: "$9.99",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    popular: true,
    tagline: "Most popular",
    perCredit: "$0.010"
  },
  {
    id: process.env.NEXT_PUBLIC_PRICE_RESURGENCE_PACK,
    name: "Resurgence",
    credits: 1600,
    price: "$14.99",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    popular: false,
    tagline: "Best value",
    perCredit: "$0.009"
  },
  {
    id: process.env.NEXT_PUBLIC_PRICE_ETERNAL_PACK,
    name: "Eternal",
    credits: 3500,
    price: "$29.99",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    popular: false,
    tagline: "Go big",
    perCredit: "$0.008"
  },
];

export default function PricingPage() {
  const [loadingId, setLoadingId] = useState(null);
  const [user, setUser] = useState(null);
  
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

  const showToast = (message, type = 'info') => {
    setToast({ isVisible: true, message, type });
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

  const siteUrl = 'https://throwbackai.app';
  const pageUrl = `${siteUrl}/pricing`;

  return (
    <>
      <Head>
        <title>Pricing — Throwback AI</title>
        <meta
          name="description"
          content="Simple pay-as-you-go pricing for AI photo restoration. No subscriptions, credits never expire."
        />
        <link rel="canonical" href={pageUrl} />
      </Head>

      <div className={styles.pricingPage}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>Pricing</div>
            <h1 className={styles.title}>
              Pay for what you use.<br/>
              <span className={styles.titleGradient}>Nothing more.</span>
            </h1>
            <p className={styles.subtitle}>
              No subscriptions. No hidden fees. Credits never expire.
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className={styles.container}>
          <div className={styles.pricingGrid}>
            {CREDIT_PACKS.map((pack) => (
              <div 
                key={pack.id}
                className={`${styles.card} ${pack.popular ? styles.popular : ''}`}
              >
                {pack.popular && (
                  <div className={styles.popularLabel}>Most Popular</div>
                )}

                <div className={styles.cardHeader}>
                  <h3 className={styles.packName}>{pack.name}</h3>
                  <p className={styles.tagline}>{pack.tagline}</p>
                </div>

                <div className={styles.priceBlock}>
                  <div className={styles.price}>
                    <span className={styles.currency}>$</span>
                    <span className={styles.amount}>{pack.price.slice(1)}</span>
                  </div>
                  <div className={styles.creditsLine}>
                    {pack.credits.toLocaleString()} credits
                  </div>
                  <div className={styles.perCredit}>
                    {pack.perCredit} per credit
                  </div>
                </div>

                <button
                  className={styles.buyButton}
                  onClick={() => handlePurchase(pack.id)}
                  disabled={loadingId === pack.id}
                >
                  {loadingId === pack.id ? (
                    <span>Processing...</span>
                  ) : (
                    <span>Get Started</span>
                  )}
                </button>

                <div className={styles.includes}>
                  <div className={styles.includeItem}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {pack.credits} photo restorations
                  </div>
                  <div className={styles.includeItem}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {Math.floor(pack.credits / 40)} colorizations
                  </div>
                  <div className={styles.includeItem}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {Math.floor(pack.credits / 50)} avatars or styles
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* What's Included Section */}
          <div className={styles.detailsSection}>
            <h2 className={styles.detailsTitle}>What's included</h2>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>🔧</div>
                <h3>Photo Restoration</h3>
                <p>Remove scratches, tears, and damage. 1 credit per photo.</p>
              </div>
              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>🎨</div>
                <h3>Colorization</h3>
                <p>Add historically accurate colors. 40 credits per photo.</p>
              </div>
              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>✨</div>
                <h3>AI Avatars</h3>
                <p>Transform into any character. 50 credits per avatar.</p>
              </div>
              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>📸</div>
                <h3>Vintage Styles</h3>
                <p>70s, 80s, 90s transformations. 50 credits per style.</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className={styles.faqSection}>
            <h2 className={styles.faqTitle}>Frequently asked questions</h2>
            <div className={styles.faqGrid}>
              <div className={styles.faqItem}>
                <h3>Do credits expire?</h3>
                <p>Never. Buy once, use whenever you need.</p>
              </div>
              <div className={styles.faqItem}>
                <h3>What's your refund policy?</h3>
                <p>If unsatisfied with a result, we'll refund the credits to your account.</p>
              </div>
              <div className={styles.faqItem}>
                <h3>How are photos stored?</h3>
                <p>All photos are automatically deleted after 1 hour for your privacy.</p>
              </div>
              <div className={styles.faqItem}>
                <h3>Is there a subscription?</h3>
                <p>No subscriptions ever. Pay only for what you use.</p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className={styles.finalCta}>
            <h2>Ready to restore your memories?</h2>
            <p>Start with 50 free credits when you sign up.</p>
            <Link href="/signup" className={styles.ctaButton}>
              Get Started Free
            </Link>
          </div>
        </div>
      </div>

      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  );
}