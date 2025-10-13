'use client';

import Link from 'next/link';
import styles from './success.module.css';

export default function SubscribeSuccess() {
  return (
    <div className={styles.container}>
      <div className={styles.success}>
        <div className={styles.icon}>✓</div>
        <h1>Welcome Aboard!</h1>
        <p>Your 30-day free trial has started.</p>
        
        <div className={styles.next}>
          <h2>What Happens Next?</h2>
          <ol>
            <li>We&apos;ll set up your custom portal within 24 hours</li>
            <li>You&apos;ll receive login details via email</li>
            <li>We&apos;ll send marketing materials to share with patrons</li>
            <li>After 30 days, your card will be charged $300/month</li>
          </ol>
        </div>

        <div className={styles.note}>
          <p>Questions? Email us at <a href="mailto:hello@throwbackai.app">hello@throwbackai.app</a></p>
        </div>

        <Link href="/" className={styles.homeBtn}>
          Return to Home
        </Link>
      </div>
    </div>
  );
}