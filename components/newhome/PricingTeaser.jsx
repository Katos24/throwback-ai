import React from 'react';
import Link from 'next/link';
import styles from './PricingTeaser.module.css';

const PRICING_TIERS = [
  {
    id: 1,
    name: 'Dawn Pack',
    credits: 400,
    price: '$4.99',
    popular: false,
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
    description: 'Perfect for trying out our AI restoration magic',
    costPerCredit: '$0.012',
    features: [
      '400 basic restorations OR',
      '10 colorizations OR',
      '8 avatars/decades styles',
    ],
    useCases: [
      '📸 Test photo restoration',
      '🎨 Try colorization',
      '✨ Experiment with avatars'
    ]
  },
  {
    id: 2,
    name: 'Revival Pack',
    credits: 1000,
    price: '$9.99',
    popular: true,
    savings: 'Best Value',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    description: 'Most popular choice for family photo projects',
    costPerCredit: '$0.010',
    features: [
      '1,000 basic restorations OR',
      '25 colorizations OR',
      '20 avatars/decades styles',
    ],
    useCases: [
      '👨‍👩‍👧‍👦 Family album restoration',
      '🎁 Perfect for gift projects',
      '📚 Genealogy research'
    ]
  },
  {
    id: 3,
    name: 'Resurgence Pack',
    credits: 1600,
    price: '$14.99',
    popular: false,
    savings: 'Save 25%',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    description: 'For serious restoration and creative projects',
    costPerCredit: '$0.009',
    features: [
      '1,600 basic restorations OR',
      '40 colorizations OR',
      '32 avatars/decades styles',
    ],
    useCases: [
      '🏛️ Archive preservation',
      '💼 Professional projects',
      '🎭 Creative transformations'
    ]
  },
  {
    id: 4,
    name: 'Eternal Pack',
    credits: 3500,
    price: '$29.99',
    popular: false,
    savings: 'Maximum Savings',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    description: 'Built for legacy-level restoration at scale',
    costPerCredit: '$0.008',
    features: [
      '3,500 basic restorations OR',
      '87 colorizations OR',
      '70 avatars/decades styles',
    ],
    useCases: [
      '📖 Complete family history',
      '🎬 Documentary projects',
      '🏆 Professional archives'
    ]
  }
];

export default function PricingTeaser() {
  return (
    <section className={styles.pricingSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>💰 TRANSPARENT PRICING</div>
          <h2 className={styles.sectionTitle}>Simple, Pay-As-You-Go Pricing</h2>
          <p className={styles.sectionSubtitle}>
            No subscriptions, no recurring charges. Buy credits once, use them forever. 
            Perfect for genealogy projects, family reunions, and memorial services.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className={styles.pricingGrid}>
          {PRICING_TIERS.map((tier) => (
            <div 
              key={tier.id} 
              className={`${styles.pricingCard} ${tier.popular ? styles.popular : ''}`}
              style={{ '--card-gradient': tier.gradient }}
            >
              {tier.popular && (
                <div className={styles.popularBadge}>
                  <span className={styles.starIcon}>⭐</span>
                  Most Popular
                </div>
              )}
              
              {tier.savings && !tier.popular && (
                <div className={styles.savingsBadge}>{tier.savings}</div>
              )}

              {/* Pack Name & Description */}
              <div className={styles.cardHeader}>
                <h3 className={styles.tierName}>{tier.name}</h3>
                <p className={styles.tierDescription}>{tier.description}</p>
              </div>

              {/* Price Section */}
              <div className={styles.priceContainer}>
                <div className={styles.priceWrapper}>
                  <span className={styles.currency}>$</span>
                  <span className={styles.price}>{tier.price.slice(1)}</span>
                </div>
                <div className={styles.creditsDisplay}>
                  <span className={styles.creditsNumber}>{tier.credits.toLocaleString()}</span>
                  <span className={styles.creditsLabel}>credits</span>
                </div>
                <div className={styles.valueMetric}>
                  {tier.costPerCredit} per credit
                </div>
              </div>

              {/* Features List */}
              <div className={styles.featuresSection}>
                <div className={styles.featuresLabel}>What's included:</div>
                <ul className={styles.featuresList}>
                  {tier.features.map((feature, index) => (
                    <li key={index} className={styles.feature}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path 
                          d="M13.3334 4L6.00002 11.3333L2.66669 8" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Use Cases */}
              <div className={styles.useCasesSection}>
                <div className={styles.useCasesLabel}>Perfect for:</div>
                <div className={styles.useCasesList}>
                  {tier.useCases.map((useCase, index) => (
                    <div key={index} className={styles.useCase}>
                      {useCase}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className={styles.trustSection}>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>✓</span>
            <span>No subscription required</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>✓</span>
            <span>Credits never expire</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>✓</span>
            <span>Photos deleted after 1 hour</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>✓</span>
            <span>Secure payment via Stripe</span>
          </div>
        </div>

 {/* Pricing Table */}
<div className={styles.comparisonSection}>
  <h3 className={styles.comparisonTitle}>Credit Usage Guide</h3>
  <div className={styles.comparisonTable}>
    <div className={styles.comparisonRow}>
      <span className={styles.serviceName}>Photo Fix (Basic Restoration)</span>
      <span className={styles.serviceCost}>1 credit</span>
    </div>
    <div className={styles.comparisonRow}>
      <span className={styles.serviceName}>Colorization + Restoration (Premium)</span>
      <span className={styles.serviceCost}>40 credits</span>
    </div>
    <div className={styles.comparisonRow}>
      <span className={styles.serviceName}>AI Avatar Generation</span>
      <span className={styles.serviceCost}>50 credits</span>
    </div>
    <div className={styles.comparisonRow}>
      <span className={styles.serviceName}>Decades Time Machine</span>
      <span className={styles.serviceCost}>50 credits</span>
    </div>
  </div>
</div>

      {/* FAQ Section */}
<div className={styles.faqSection}>
  <h3 className={styles.faqTitle}>Common Questions</h3>
  <div className={styles.faqGrid}>
    <div className={styles.faqItem}>
      <h4 className={styles.faqQuestion}>Do credits expire?</h4>
      <p className={styles.faqAnswer}>Never. Buy once, use whenever you need.</p>
    </div>
    <div className={styles.faqItem}>
      <h4 className={styles.faqQuestion}>What's your refund policy?</h4>
      <p className={styles.faqAnswer}>If you're unsatisfied with a restoration, we'll refund the credits to your account (no cash refunds).</p>
    </div>
    <div className={styles.faqItem}>
      <h4 className={styles.faqQuestion}>How long are photos stored?</h4>
      <p className={styles.faqAnswer}>Automatically deleted after 1 hour for privacy.</p>
    </div>
    <div className={styles.faqItem}>
      <h4 className={styles.faqQuestion}>Is there a subscription?</h4>
      <p className={styles.faqAnswer}>No! Pay only for what you use.</p>
    </div>
  </div>
</div>

        {/* CTA */}
        <div className={styles.ctaContainer}>
          <Link href="/pricing" className={styles.viewAllButton}>
            <span>View Full Pricing Details</span>
            <span className={styles.ctaArrow}>→</span>
          </Link>
          <p className={styles.ctaNote}>
            Or <Link href="/signup" className={styles.signupLink}>sign up free</Link> to get 50 credits
          </p>
        </div>
      </div>
    </section>
  );
}