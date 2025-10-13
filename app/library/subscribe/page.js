'use client';

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styles from './subscribe.module.css';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function LibrarySubscribe() {
  const [step, setStep] = useState(1); // 1 = info form, 2 = payment
  const [libraryInfo, setLibraryInfo] = useState({
    name: '',
    email: '',
    zipCodes: ''
  });
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create subscription intent
      const response = await fetch('/api/library/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(libraryInfo)
      });

      const data = await response.json();

      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        setStep(2);
      } else {
        alert('Error creating subscription. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: { colorPrimary: '#667eea' }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {step === 1 ? (
          <>
            <div className={styles.header}>
              <h1>Subscribe to Throwback AI</h1>
              <p>Library Photo Restoration Service</p>
            </div>

            <div className={styles.pricing}>
              <div className={styles.priceTag}>
                <span className={styles.amount}>$300</span>
                <span className={styles.period}>/month</span>
              </div>
              <p className={styles.trial}>✨ First 30 days free</p>
            </div>

            <div className={styles.features}>
              <h3>What&apos;s Included</h3>
              <ul>
                <li>✅ Unlimited basic photo restorations</li>
                <li>✅ 200 premium credits per month</li>
                <li>✅ Custom branded portal with your logo</li>
                <li>✅ Zip code access control</li>
                <li>✅ Usage analytics dashboard</li>
                <li>✅ Marketing materials & support</li>
              </ul>
            </div>

            <form onSubmit={handleInfoSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Library Name *</label>
                <input
                  type="text"
                  value={libraryInfo.name}
                  onChange={(e) => setLibraryInfo({...libraryInfo, name: e.target.value})}
                  placeholder="e.g., Brooklyn Public Library"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Contact Email *</label>
                <input
                  type="email"
                  value={libraryInfo.email}
                  onChange={(e) => setLibraryInfo({...libraryInfo, email: e.target.value})}
                  placeholder="your.name@library.org"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Zip Codes You Serve *</label>
                <input
                  type="text"
                  value={libraryInfo.zipCodes}
                  onChange={(e) => setLibraryInfo({...libraryInfo, zipCodes: e.target.value})}
                  placeholder="e.g., 11201, 11215, 11217"
                  required
                />
                <small>Separate multiple zip codes with commas</small>
              </div>

              <button type="submit" disabled={loading} className={styles.submitBtn}>
                {loading ? 'Processing...' : 'Continue to Payment'}
              </button>

              <p className={styles.note}>
                Cancel anytime. No contracts or setup fees.
              </p>
            </form>
          </>
        ) : (
          <>
            <div className={styles.header}>
              <h1>Complete Payment</h1>
              <p>{libraryInfo.name}</p>
            </div>

            <div className={styles.summary}>
              <div className={styles.summaryRow}>
                <span>Monthly Subscription</span>
                <span>$300/month</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Due Today</span>
                <span className={styles.price}>$0</span>
              </div>
              <p className={styles.trialNote}>First 30 days free, then $300/month</p>
            </div>

            {clientSecret && (
              <Elements stripe={stripePromise} options={options}>
                <PaymentForm libraryInfo={libraryInfo} />
              </Elements>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function PaymentForm({ libraryInfo }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!stripe || !elements) return;

  setProcessing(true);
  setError('');

  // Use confirmSetup for trial subscriptions (saves card without charging)
  const { error: submitError } = await stripe.confirmSetup({
    elements,
    confirmParams: {
      return_url: `${window.location.origin}/library/subscribe/success`,
    },
  });

  if (submitError) {
    setError(submitError.message);
    setProcessing(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className={styles.paymentForm}>
      <PaymentElement />
      
      {error && <div className={styles.error}>{error}</div>}

      <button 
        type="submit" 
        disabled={!stripe || processing}
        className={styles.payBtn}
      >
        {processing ? 'Processing...' : 'Start Free Trial'}
      </button>

      <p className={styles.secure}>
        🔒 Secure payment powered by Stripe
      </p>
    </form>
  );
}