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
<Link href="/library/pricing">Pricing</Link>
<Link href="/library/demo" className={styles.ctaBtn}>Request Demo</Link>
</nav>
</header>

{/* Hero Section */}
  <section className={styles.hero}>
    <div className={styles.heroContent}>
      <span className={styles.badge}>For Organizations</span>
      <h1>Offer Professional Photo Restoration to Your Community</h1>
      <p>Transform your organization into a digital preservation hub. Provide AI-powered photo restoration to your community—fully branded with your organization&apos;s identity.</p>
      
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
          <strong>From $199</strong>
          <span>Per Month</span>
        </div>
      </div>
    </div>
  </section>

  {/* Use Cases Section */}
  <section className={styles.statsSection}>
    <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.75rem' }}>Perfect For</h2>
    <div className={styles.featureGrid} style={{ maxWidth: '1000px', margin: '0 auto 3rem' }}>
      <div className={styles.feature}>
        <div className={styles.featureIcon}>📚</div>
        <h3>Public Libraries</h3>
        <p>Offer digital preservation as a community service</p>
      </div>
      <div className={styles.feature}>
        <div className={styles.featureIcon}>🏥</div>
        <h3>Nursing Homes</h3>
        <p>Create meaningful activities for residents and families</p>
      </div>
      <div className={styles.feature}>
        <div className={styles.featureIcon}>🏛️</div>
        <h3>Historical Societies</h3>
        <p>Preserve and digitize community history</p>
      </div>
      <div className={styles.feature}>
        <div className={styles.featureIcon}>🏢</div>
        <h3>Senior Centers</h3>
        <p>Run engaging workshops and memory programs</p>
      </div>
    </div>
    <RestorationCounter />
    <p className={styles.statsSubtext}>
      Trusted by organizations nationwide
    </p>
  </section>

  {/* How It Works */}
  <section className={styles.howItWorks}>
    <h2>How It Works</h2>
    <div className={styles.steps}>
      <div className={styles.step}>
        <div className={styles.stepNumber}>1</div>
        <h3>Get Your Branded Portal</h3>
        <p>Receive a custom URL (throwbackai.app/library/yourorganization) with your logo, colors, and branding. No technical setup required.</p>
      </div>

      <div className={styles.step}>
        <div className={styles.stepNumber}>2</div>
        <h3>Launch to Your Community</h3>
        <p>Promote through your website, social media, and newsletters. We provide ready-to-use marketing materials.</p>
      </div>

      <div className={styles.step}>
        <div className={styles.stepNumber}>3</div>
        <h3>Members Access Your Portal</h3>
        <p>Community members upload photos and receive professional restorations—all under your organization&apos;s name. No accounts required.</p>
      </div>

      <div className={styles.step}>
        <div className={styles.stepNumber}>4</div>
        <h3>Track Engagement</h3>
        <p>View usage analytics and showcase success stories to strengthen your organization&apos;s impact.</p>
      </div>
    </div>
  </section>

  {/* Why Choose Us */}
  <section className={styles.features}>
    <h2>Why Organizations Choose Throwback AI</h2>
    <div className={styles.featureGrid}>
      <div className={styles.feature}>
        <div className={styles.featureIcon}>✓</div>
        <h3>Proven Technology</h3>
        <p>Professional-grade AI restoration technology, now available for your community.</p>
      </div>

      <div className={styles.feature}>
        <div className={styles.featureIcon}>🎨</div>
        <h3>True White-Label</h3>
        <p>Your branding everywhere. Members never see Throwback AI—only your organization&apos;s name and logo.</p>
      </div>

      <div className={styles.feature}>
        <div className={styles.featureIcon}>🔒</div>
        <h3>Access Control</h3>
        <p>Restrict access to your service area with zip code verification or custom access methods.</p>
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

  {/* Pricing - Updated with Multiple Tiers */}
  <section className={styles.pricing}>
    <h2>Choose Your Plan</h2>
    <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem' }}>
      All plans include unlimited basic restorations and a 30-day free trial
    </p>
    
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {/* Starter Plan */}
      <div className={styles.pricingCard}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Starter</h3>
        <div className={styles.price}>
          <span className={styles.currency}>$</span>
          <span className={styles.amount}>199</span>
          <span className={styles.period}>/month</span>
        </div>
        
        <ul className={styles.pricingFeatures}>
          <li>✓ 30-day free trial</li>
          <li>✓ Custom branded portal</li>
          <li>✓ Unlimited basic restorations</li>
          <li>✓ 5,000 premium credits (~250 colorizations)</li>
          <li>✓ Zip code access control</li>
          <li>✓ Usage analytics</li>
          <li>✓ Email support</li>
        </ul>

        <Link href="/library/demo" className={styles.pricingBtn}>
          Start Free Trial
        </Link>
      </div>

      {/* Growth Plan - Most Popular */}
      <div className={styles.pricingCard} style={{ 
        border: '2px solid #2563eb',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '-12px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#2563eb',
          color: 'white',
          padding: '0.25rem 1rem',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: '600'
        }}>
          MOST POPULAR
        </div>
        
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Growth</h3>
        <div className={styles.price}>
          <span className={styles.currency}>$</span>
          <span className={styles.amount}>299</span>
          <span className={styles.period}>/month</span>
        </div>
        
        <ul className={styles.pricingFeatures}>
          <li>✓ 30-day free trial</li>
          <li>✓ Custom branded portal</li>
          <li>✓ Unlimited basic restorations</li>
          <li>✓ 8,000 premium credits (~400 colorizations)</li>
          <li>✓ Zip code access control</li>
          <li>✓ Usage analytics</li>
          <li>✓ Priority email support</li>
          <li>✓ Marketing materials</li>
        </ul>

        <Link href="/library/demo" className={styles.pricingBtn} style={{
          background: '#2563eb'
        }}>
          Start Free Trial
        </Link>
      </div>

      {/* Professional Plan */}
      <div className={styles.pricingCard}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Professional</h3>
        <div className={styles.price}>
          <span className={styles.currency}>$</span>
          <span className={styles.amount}>499</span>
          <span className={styles.period}>/month</span>
        </div>
        
        <ul className={styles.pricingFeatures}>
          <li>✓ 30-day free trial</li>
          <li>✓ Custom branded portal</li>
          <li>✓ Unlimited basic restorations</li>
          <li>✓ 15,000 premium credits (~750 colorizations)</li>
          <li>✓ Zip code access control</li>
          <li>✓ Usage analytics</li>
          <li>✓ Priority support</li>
          <li>✓ Marketing materials</li>
          <li>✓ Quarterly strategy call</li>
        </ul>

        <Link href="/library/demo" className={styles.pricingBtn}>
          Start Free Trial
        </Link>
      </div>
    </div>

    <p className={styles.pricingNote} style={{ textAlign: 'center', marginTop: '2rem' }}>
      Need more? <Link href="mailto:hello@throwbackai.app" style={{ color: '#2563eb', textDecoration: 'underline' }}>Contact us</Link> for Enterprise pricing with custom credit allocations
    </p>
  </section>

  {/* Demo Portal */}
  <section className={styles.demo} id="demo-portal">
    <h2>Try It Yourself</h2>
    <p>Experience our branded portal firsthand. Upload a real photo and see the restoration in action.</p>

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
        <p>Full access for 30 days with no credit card required. After the trial, continue at your chosen plan level or cancel anytime via email.</p>
      </details>

      <details className={styles.faqItem}>
        <summary>What&apos;s the setup process?</summary>
        <p>After you subscribe, you&apos;ll fill out a simple form with your organization info (name, logo, access requirements, colors). We set up your portal within 24-48 hours and send you the link.</p>
      </details>

      <details className={styles.faqItem}>
        <summary>Can I change plans later?</summary>
        <p>Yes! You can upgrade or downgrade anytime. Changes take effect at the start of your next billing cycle.</p>
      </details>

      <details className={styles.faqItem}>
        <summary>What if we run out of credits?</summary>
        <p>Basic restorations remain unlimited. For premium colorizations, you can purchase additional credit packs or upgrade to a higher tier.</p>
      </details>

      <details className={styles.faqItem}>
        <summary>How do we control who can access the portal?</summary>
        <p>You can restrict access by zip code, custom verification codes, or keep it open to anyone. We&apos;ll work with you to find the right approach for your organization.</p>
      </details>

      <details className={styles.faqItem}>
        <summary>What marketing support do you provide?</summary>
        <p>We provide flyer templates, social media posts, email copy, and website banners—all customized with your branding.</p>
      </details>

      <details className={styles.faqItem}>
        <summary>What happens to uploaded photos?</summary>
        <p>All photos are processed securely via HTTPS and automatically deleted within 24 hours. We never store, sell, or reuse uploads.</p>
      </details>

      <details className={styles.faqItem}>
        <summary>Can users download their restored photos?</summary>
        <p>Yes! Restored photos can be downloaded in high resolution and used freely—print, share, or publish.</p>
      </details>

      <details className={styles.faqItem}>
        <summary>How do we cancel?</summary>
        <p>Email us anytime at hello@throwbackai.app. We&apos;ll process cancellations within 1 business day.</p>
      </details>

      <details className={styles.faqItem}>
        <summary>Is this grant-fundable?</summary>
        <p>Yes! Many organizations use community engagement, digital preservation, or activities grants to fund this service. We can provide documentation if needed.</p>
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
        <p>Professional photo restoration for organizations and individuals.</p>
      </div>
      
      <div className={styles.footerSection}>
        <h4>Product</h4>
        <Link href="/">For Individuals</Link>
        <Link href="/library">For Organizations</Link>
        <Link href="/library/pricing">Pricing</Link>
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