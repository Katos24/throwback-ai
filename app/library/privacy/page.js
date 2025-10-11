// ==========================================
// PrivacyPolicy.js
// ==========================================
'use client';

import React from 'react';
import styles from '../legal.module.css';

export default function PrivacyPolicy() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last Updated: October 10, 2025</p>

        <section>
          <h2>Our Commitment to Your Privacy</h2>
          <p>
            Your privacy is important to us. This Privacy Policy explains how we handle your 
            personal information and photos when you use our photo restoration service.
          </p>
        </section>

        <section>
          <h2>What Information We Collect</h2>
          <h3>Photos You Upload</h3>
          <p>
            When you use our service, you upload photos for restoration. These images are 
            temporarily processed to provide the restoration service.
          </p>
          
          <h3>Zip Code Verification</h3>
          <p>
            We collect your zip code to verify you are a resident of the participating library 
            district. This information is stored temporarily in your browser session only.
          </p>
          
          <h3>Technical Information</h3>
          <p>
            We automatically collect basic technical information such as your IP address, browser 
            type, and usage timestamps for security and service improvement purposes.
          </p>
        </section>

        <section>
          <h2>How We Use Your Information</h2>
          <p>We use your information solely to:</p>
          <ul>
            <li>Process and restore your photos</li>
            <li>Verify eligibility for the library service</li>
            <li>Monitor service usage and credits</li>
            <li>Improve our service quality</li>
            <li>Prevent abuse and maintain security</li>
          </ul>
        </section>

        <section>
          <h2>How Long We Keep Your Data</h2>
          <div className={styles.highlight}>
            <p><strong>Photos:</strong> Your uploaded and restored photos are automatically deleted within 1 hour of processing. We do not store your original images.</p>
            <p><strong>Usage Data:</strong> We retain anonymized usage statistics (number of restorations, credit usage) but never link them to individual users.</p>
            <p><strong>Zip Codes:</strong> Stored only in your browser session and cleared when you close your browser.</p>
          </div>
        </section>

        <section>
          <h2>We Do Not:</h2>
          <ul>
            <li>❌ Sell or share your photos with third parties</li>
            <li>❌ Use your photos for any purpose other than restoration</li>
            <li>❌ Keep permanent copies of your photos</li>
            <li>❌ Track your personal browsing habits</li>
            <li>❌ Share your information with advertisers</li>
            <li>❌ Require you to create an account</li>
          </ul>
        </section>

       <section>
        <h2>Data Security</h2>
        <p>
          We take reasonable measures to protect your information:
        </p>
        <ul>
          <li>Encrypted connections (HTTPS/SSL)</li>
          <li>Secure API connections to trusted AI providers</li>
          <li>Automatic deletion of images within 1 hour</li>
          <li>No permanent storage of your photos</li>
          <li>Minimal data collection (only zip codes for verification)</li>
        </ul>
        <p>
          In the unlikely event of a security incident, we will notify affected users 
          and the library as required by law.
        </p>
      </section>

        <section>
          <h2>Third-Party Services</h2>
          <p>
            Our restoration service uses AI processing technology from trusted providers. Your 
            photos are sent to these services only for processing and are subject to their security 
            measures. They do not retain your images after processing.
          </p>
        </section>

        <section>
          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Know what data we collect</li>
            <li>Request deletion of your data</li>
            <li>Opt out of using the service at any time</li>
            <li>Contact us with privacy concerns</li>
          </ul>
        </section>

        <section>
          <h2>Childrens Privacy</h2>
          <p>
            Our service is intended for use by library patrons of all ages. We do not knowingly 
            collect personal information from children under 13 without parental consent.
          </p>
        </section>

        <section>
          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on 
            this page with an updated &quot;Last Updated&quot; date.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or how we handle your data, please contact us at:
          </p>
          <p className={styles.contactInfo}>
            <strong>Email:</strong> hello@throwbackai.app
          </p>
        </section>

        <div className={styles.backLink}>
          <a href="#" onClick={(e) => { e.preventDefault(); window.history.back(); }}>← Back</a>
        </div>
      </div>
    </div>
  );
}
