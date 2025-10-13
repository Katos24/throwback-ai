'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './demo.module.css';

export default function LibraryDemo() {
  const [formData, setFormData] = useState({
    libraryName: '',
    email: '',
    phone: '',
    zipCodes: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/library/request-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className={styles.container}>
        <div className={styles.success}>
          <div className={styles.successIcon}>✓</div>
          <h1>Request Received!</h1>
          <p>Thanks for your interest. We&apos;ll reach out within 24 hours to set up your free trial.</p>
          <Link href="/" className={styles.homeLink}>← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>Throwback AI</Link>
        <Link href="/" className={styles.backLink}>← Back</Link>
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>Photo Restoration for Libraries</h1>
          <p>Offer free photo restoration to your community</p>
        </div>

        <div className={styles.content}>
          <div className={styles.info}>
            <h2>What You Get</h2>
            <ul>
              <li>
                <span>🎨</span>
                <div>
                  <strong>Custom Branded Portal</strong>
                  <p>Your logo, your library&apos;s name</p>
                </div>
              </li>
              <li>
                <span>🔒</span>
                <div>
                  <strong>Zip Code Access Control</strong>
                  <p>Only your district residents can access</p>
                </div>
              </li>
              <li>
                <span>♾️</span>
                <div>
                  <strong>Unlimited Restorations</strong>
                  <p>No limits on basic restorations</p>
                </div>
              </li>
              <li>
                <span>📊</span>
                <div>
                  <strong>Usage Analytics</strong>
                  <p>Track patron engagement</p>
                </div>
              </li>
              <li>
                <span>🎁</span>
                <div>
                  <strong>30-Day Free Trial</strong>
                  <p>Test it risk-free, then $300/month</p>
                </div>
              </li>
            </ul>
          </div>

          <div className={styles.formSection}>
            <div className={styles.formCard}>
              <h2>Request Your Free Trial</h2>
              <p>No credit card required. Set up in 24 hours.</p>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="libraryName">Library Name *</label>
                  <input
                    type="text"
                    id="libraryName"
                    name="libraryName"
                    value={formData.libraryName}
                    onChange={handleChange}
                    placeholder="e.g., Brooklyn Public Library"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.name@library.org"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="zipCodes">Zip Codes You Serve *</label>
                  <input
                    type="text"
                    id="zipCodes"
                    name="zipCodes"
                    value={formData.zipCodes}
                    onChange={handleChange}
                    placeholder="e.g., 11201, 11215, 11217"
                    required
                  />
                  <small>Separate multiple zip codes with commas</small>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Questions or Comments (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your library or ask any questions..."
                    rows="4"
                  />
                </div>

                {error && <div className={styles.error}>{error}</div>}

                <button 
                  type="submit" 
                  disabled={submitting}
                  className={styles.submitBtn}
                >
                  {submitting ? 'Submitting...' : 'Request Free Trial'}
                </button>

                <p className={styles.privacy}>
                  By submitting, you agree to our{' '}
                  <Link href="/library/terms">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/library/privacy">Privacy Policy</Link>
                </p>
              </form>
            </div>
          </div>
        </div>

        <div className={styles.faq}>
          <h2>Common Questions</h2>
          <div className={styles.faqGrid}>
            <details>
              <summary>How does the free trial work?</summary>
              <p>Full access for 30 days. No credit card required. After the trial, continue for $300/month or cancel anytime.</p>
            </details>

            <details>
              <summary>What&apos;s included?</summary>
              <p>Unlimited basic restorations, 200 premium credits/month, custom branding, usage analytics, and email support.</p>
            </details>

            <details>
              <summary>Do we need technical expertise?</summary>
              <p>Nope! We set everything up for you. Just share the link with your patrons.</p>
            </details>

            <details>
              <summary>Can patrons outside our district use it?</summary>
              <p>No. Access is restricted to the zip codes you specify.</p>
            </details>

            <details>
              <summary>How do we promote this to patrons?</summary>
              <p>We provide marketing materials including flyers, social media posts, and email templates.</p>
            </details>

            <details>
              <summary>What happens to the photos?</summary>
              <p>Photos are processed securely and automatically deleted within 24 hours. Never stored permanently.</p>
            </details>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Questions? Email <a href="mailto:hello@throwbackai.app">hello@throwbackai.app</a></p>
        <div className={styles.footerLinks}>
          <Link href="/library/privacy">Privacy</Link>
          <span>•</span>
          <Link href="/library/terms">Terms</Link>
        </div>
      </footer>
    </div>
  );
}