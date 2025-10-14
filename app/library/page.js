'use client';
import React from 'react';
import Link from 'next/link';
import RestorationCounter from '../../components/RestorationCounter';
import styles from './library.module.css';

export default function LibraryLanding() {
return (
<div className={styles.container}>
{/* Header */}
<header className={styles.header}>
<Link href="/" className={styles.logo}>Throwback AI</Link>
<nav className={styles.nav}>
<Link href="/">Home</Link>
<Link href="/pricing">Pricing</Link>
<Link href="/library/demo" className={styles.ctaBtn}>Request Demo</Link>
</nav>
</header>

{/* Hero Section */}
  <section className={styles.hero}>
    <div className={styles.heroContent}>
      <span className={styles.badge}>For Public Libraries</span>
      <h1>Offer Professional Photo Restoration as a Library Service</h1>
      <p>Transform your library into a digital preservation hub. Provide free AI-powered photo restoration to your community—fully branded with your library&apos;s identity.</p>
      
      <div className={styles.heroButtons}>
        <Link href="/library/demo-portal" className={styles.primaryBtn}>
          Try Interactive Demo
        </Link>
        <Link href="/library/demo" className={styles.secondaryBtn}>
          Request Free Trial
        </Link>
      </div>

      <div className={styles.proofPoints}>
        <div className={styles.proof}>
          <strong>Proven</strong>
          <span>AI Technology</span>
        </div>
        <div className={styles.proof}>
          <strong>30-Day</strong>
          <span>Free Trial</span>
        </div>
        <div className={styles.proof}>
          <strong>$300</strong>
          <span>Per Month</span>
        </div>
      </div>
    </div>
  </section>

  {/* Restoration Counter - Live Social Proof */}
  <section className={styles.statsSection}>
    <RestorationCounter />
    <p className={styles.statsSubtext}>
      Trusted by families and libraries nationwide
    </p>
  </section>

  {/* How It Works */}
  <section className={styles.howItWorks}>
    <h2>How It Works</h2>
    <div className={styles.steps}>
      <div className={styles.step}>
        <div className={styles.stepNumber}>1</div>
        <h3>Get Your Branded Portal</h3>
        <p>Receive a custom URL (throwbackai.app/library/yourlibrary) with your logo, colors, and branding. No technical setup required.</p>
      </div>

      <div className={styles.step}>
        <div className={styles.stepNumber}>2</div>
        <h3>Launch to Your Community</h3>
        <p>Promote through your website, social media, and newsletters. We provide ready-to-use marketing materials.</p>
      </div>

      <div className={styles.step}>
        <div className={styles.stepNumber}>3</div>
        <h3>Patrons Access Your Portal</h3>
        <p>Community members upload photos and receive professional restorations—all under your library&apos;s name. No accounts required.</p>
      </div>

      <div className={styles.step}>
        <div className={styles.stepNumber}>4</div>
        <h3>Track Engagement</h3>
        <p>View usage analytics and showcase success stories to strengthen your library&apos;s role in digital preservation.</p>
      </div>
    </div>
  </section>

  {/* Why Choose Us */}
  <section className={styles.features}>
    <h2>Why Libraries Choose Throwback AI</h2>
    <div className={styles.featureGrid}>
      <div className={styles.feature}>
        <div className={styles.featureIcon}>✓</div>
        <h3>Proven Technology</h3>
        <p>Professional-grade AI restoration technology, now available for your community.</p>
      </div>

      <div className={styles.feature}>
        <div className={styles.featureIcon}>🎨</div>
        <h3>True White-Label</h3>
        <p>Your branding everywhere. Patrons never see Throwback AI—only your library&apos;s name and logo.</p>
      </div>

      <div className={styles.feature}>
        <div className={styles.featureIcon}>🔒</div>
        <h3>Zip Code Protection</h3>
        <p>Access restricted to your service area. Only verified residents can use your portal.</p>
      </div>

      <div className={styles.feature}>
        <div className={styles.featureIcon}>⚡</div>
        <h3>Zero IT Burden</h3>
        <p>We handle hosting, maintenance, and updates. You just share the link.</p>
      </div>

      <div className={styles.feature}>
        <div className={styles.featureIcon}>🔐</div>
        <h3>Enterprise Security</h3>
        <p>Photos automatically deleted within 24 hours. HTTPS encryption. No data retention.</p>
      </div>

      <div className={styles.feature}>
        <div className={styles.featureIcon}>📊</div>
        <h3>Usage Analytics</h3>
        <p>Track monthly restorations, peak usage times, and community engagement metrics.</p>
      </div>
    </div>
  </section>

  {/* Pricing */}
  <section className={styles.pricing}>
    <h2>Simple, Transparent Pricing</h2>
    <div className={styles.pricingCard}>
      <div className={styles.price}>
        <span className={styles.currency}>$</span>
        <span className={styles.amount}>300</span>
        <span className={styles.period}>/month</span>
      </div>
      
      <ul className={styles.pricingFeatures}>
        <li>✓ 30-day free trial (no credit card)</li>
        <li>✓ Custom branded portal</li>
        <li>✓ Unlimited basic restorations</li>
        <li>✓ 8,000 premium credits/month (~400 restorations)</li>
        <li>✓ Zip code access control</li>
        <li>✓ Usage analytics dashboard</li>
        <li>✓ Marketing materials included</li>
        <li>✓ Email support</li>
        <li>✓ Cancel anytime</li>
      </ul>

      <Link href="/library/subscribe" className={styles.pricingBtn}>
        Start Free Trial
      </Link>

      <p className={styles.pricingNote}>
        No setup fees. No hidden costs. No long-term contracts.
      </p>
    </div>
  </section>

  {/* Demo Portal */}
  <section className={styles.demo} id="demo-portal">
    <h2>Try It Yourself</h2>
    <p>Experience our library portal firsthand. Upload a real photo and see the restoration in action.</p>

    <div className={styles.demoFrame}>
      <div className={styles.browserBar}>
        <div className={styles.browserDots}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={styles.browserUrl}>throwbackai.app/library/demo-portal</div>
      </div>
      <div className={styles.demoContent}>
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1a1a1a' }}>
            Interactive Demo Available
          </p>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>
            Upload your own photo and test our restoration technology
          </p>
          <Link href="/library/demo-portal" className={styles.demoCTABtn}>
            Launch Demo Portal →
          </Link>
        </div>
      </div>
    </div>
  </section>

  {/* FAQ */}
  <section className={styles.faq}>
    <h2>Frequently Asked Questions</h2>
    <div className={styles.faqGrid}>
      <details className={styles.faqItem}>
        <summary>How does the 30-day trial work?</summary>
        <p>Full access for 30 days with no credit card required. After the trial, continue for $300/month or cancel anytime via email.</p>
      </details>

      <details className={styles.faqItem}>
        <summary>What&apos;s the setup process?</summary>
        <p>After you subscribe, you&apos;ll fill out a simple form with your library info (name, logo, zip codes, colors). We set up your portal within 24-48 hours and send you the link.</p>
      </details>

      <details className={styles.faqItem}>
        <summary>Do we need technical expertise?</summary>
        <p>No. We handle all hosting, maintenance, and updates. You just share the portal link with your community.</p>
      </details>

      <details className={styles.faqItem}>
        <summary>How do we restrict access to our residents?</summary>
        <p>You provide the zip codes for your service area, and patrons must verify their zip code before accessing the portal.</p>
      </details>

      <details className={styles.faqItem}>
        <summary>What marketing support do you provide?</summary>
        <p>We provide flyer templates, social media posts, email copy, and website banners—all customized with your branding.</p>
      </details>

      <details className={styles.faqItem}>
        <summary>What happens to patron photos?</summary>
        <p>All photos are processed securely via HTTPS and automatically deleted within 24 hours. We never store, sell, or reuse uploads.</p>
      </details>

      <details className={styles.faqItem}>
        <summary>How many restorations are included?</summary>
        <p>Unlimited basic restorations. You also get 8,000 premium credits per month (enough for ~400 advanced restorations). Credits reset monthly.</p>
      </details>

      <details className={styles.faqItem}>
        <summary>Can patrons download their restored photos?</summary>
        <p>Yes! Restored photos can be downloaded in high resolution and used freely—print, share, or publish.</p>
      </details>

      <details className={styles.faqItem}>
        <summary>How do we cancel?</summary>
        <p>Email us anytime at hello@throwbackai.app. We&apos;ll process cancellations within 1 business day.</p>
      </details>

      <details className={styles.faqItem}>
        <summary>Is this grant-fundable?</summary>
        <p>Yes! Many libraries use digital preservation or community engagement grants to fund this service. We can provide documentation if needed.</p>
      </details>
    </div>
  </section>

  {/* Final CTA */}
  <section className={styles.finalCTA}>
    <h2>Ready to Offer Photo Restoration?</h2>
    <p>Start your 30-day free trial today. No credit card required.</p>
    <Link href="/library/demo" className={styles.ctaButton}>
      Request Free Trial
    </Link>
    <p className={styles.ctaSubtext}>
      Questions? Email <a href="mailto:hello@throwbackai.app">hello@throwbackai.app</a>
    </p>
  </section>

  {/* Footer */}
  <footer className={styles.footer}>
    <div className={styles.footerContent}>
      <div className={styles.footerSection}>
        <h4>Throwback AI</h4>
        <p>Professional photo restoration for libraries and individuals.</p>
      </div>
      
      <div className={styles.footerSection}>
        <h4>Product</h4>
        <Link href="/">For Individuals</Link>
        <Link href="/library">For Libraries</Link>
        <Link href="/pricing">Pricing</Link>
      </div>

      <div className={styles.footerSection}>
        <h4>Company</h4>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/terms">Terms of Service</Link>
      </div>

      <div className={styles.footerSection}>
        <h4>Support</h4>
        <a href="mailto:hello@throwbackai.app">hello@throwbackai.app</a>
      </div>
    </div>
    
    <div className={styles.footerBottom}>
      <p>© 2025 Throwback AI. All rights reserved.</p>
    </div>
  </footer>
</div>
    );
}