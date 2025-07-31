import React from 'react';
import pricingStyles from '../../styles/Pricing.module.css';

const PricingSection = () => {
  return (
    <section className={pricingStyles.pricing}>
      <div className={pricingStyles.container}>
        <h2 className={pricingStyles.title}>Why Pay $9.99/​mo for Unused Features?</h2>
        <p className={pricingStyles.subtitle}>
          Competitor charges you every month—use it or not. Anastasis charges only when you restore.
        </p>

        <div className={pricingStyles.pricingGrid}>
          {/* Competitor Card */}
          <div className={`${pricingStyles.pricingCard} ${pricingStyles.competitor}`}>
            <h3 className={pricingStyles.pricingTitle}>Competitor</h3>
            <div className={pricingStyles.price}>
              <span className={pricingStyles.priceAmount}>$9.99</span>
              <span className={pricingStyles.priceUnit}>/month</span>
            </div>
            <p className={pricingStyles.pricingDescription}>
              Flat subscription fee, whether you edit one photo or a hundred.
            </p>
            <ul className={pricingStyles.featureList}>
              <li>Unlimited edits—but you pay $9.99 every 30 days</li>
              <li>Average cost per restore: $9.99</li>
            </ul>
            <button className={pricingStyles.pricingButton}>Subscribe</button>
          </div>

          {/* Anastasis Card */}
          <div className={`${pricingStyles.pricingCard} ${pricingStyles.featured}`}>
            <div className={pricingStyles.pricingBadge}>BEST VALUE</div>
            <h3 className={pricingStyles.pricingTitle}>Anastasis</h3>
            <div className={pricingStyles.price}>
              <span className={pricingStyles.priceAmount}>$0.37</span>
              <span className={pricingStyles.priceUnit}>/premium restore</span>
            </div>
            <p className={pricingStyles.pricingDescription}>
              Pay-per-use credits—only pay when you bring an image back to life.
            </p>
            <ul className={pricingStyles.featureList}>
              <li>Premium restorations at heritage quality</li>
              <li>Credits never expire</li>
              <li>No hidden monthly fees</li>
            </ul>
            <button className={pricingStyles.pricingButton}>Buy Credits</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
