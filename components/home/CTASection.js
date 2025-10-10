import React from 'react';
import Link from 'next/link';
import ctaStyles from '../../styles/CTA.module.css';

const CTASection = () => {
  return (
    <section className={ctaStyles.cta}>
      <div className={ctaStyles.container}>
        <h2 className={ctaStyles.ctaTitle}>
          📸 Try It Now &ndash; <span className={ctaStyles.accent}>No Signup Required</span>
        </h2>
        <p className={ctaStyles.ctaSubtitle}>
          Upload a photo and see the transformation in seconds
        </p>
        <div className={ctaStyles.ctaButtons}>
          <Link href="/replicate/restore-premium" passHref>
            <button className={ctaStyles.primaryButton}>🎁 Photo Fix (Try FREE)</button>
          </Link>
          <Link href="/replicate/restore-premium" passHref>
            <button className={ctaStyles.secondaryButton}>✨ Full Color Restore (Premium)</button>
          </Link>
        </div>
        <p className={ctaStyles.ctaNote}>No subscription. Instant results. Free trial.</p>
      </div>
    </section>
  );
};

export default CTASection;
