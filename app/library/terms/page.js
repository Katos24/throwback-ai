// TermsOfService.js
// ==========================================/
'use client';

import React from 'react';
import styles from '../legal.module.css';

export default function TermsOfService() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Terms of Service</h1>
        <p className={styles.lastUpdated}>Last Updated: October 10, 2025</p>

        <section>
          <h2>Agreement to Terms</h2>
          <p>
            By using this photo restoration service, you agree to these Terms of Service. 
            If you do not agree, please do not use the service.
          </p>
        </section>

        <section>
          <h2>Service Description</h2>
          <p>
            This is a free photo restoration service provided by participating libraries to 
            their community members. The service uses artificial intelligence to restore, 
            enhance, and colorize old or damaged photographs.
          </p>
        </section>

        <section>
          <h2>Eligibility</h2>
          <p>
            This service is available only to residents within participating library districts. 
            You must provide a valid zip code to verify your eligibility. Misrepresenting your 
            residency may result in service termination.
          </p>
        </section>

        <section>
          <h2>Acceptable Use</h2>
          <p>You agree to use this service only for:</p>
          <ul>
            <li>Personal, non-commercial photo restoration</li>
            <li>Photos you own or have permission to restore</li>
            <li>Lawful purposes only</li>
          </ul>
          
          <h3>You may NOT:</h3>
          <ul>
            <li>❌ Upload photos you don&apos;t have rights to</li>
            <li>❌ Upload illegal, offensive, or inappropriate content</li>
            <li>❌ Attempt to abuse, exploit, or overload the service</li>
            <li>❌ Use the service for commercial purposes</li>
            <li>❌ Share your access with non-residents</li>
          </ul>
        </section>

        <section>
          <h2>Copyright & Ownership</h2>
          <div className={styles.highlight}>
            <p>
              <strong>You retain all rights to your photos.</strong> By uploading a photo, you 
              confirm that you own the copyright or have permission to restore it.
            </p>
            <p>
              The restored images belong to you. We claim no ownership over your uploaded or 
              restored photos.
            </p>
          </div>
        </section>

        <section>
          <h2>Service Limitations</h2>
          <p>Please understand that:</p>
          <ul>
            <li>Results may vary based on photo quality and condition</li>
            <li>AI restoration is not perfect and may have artifacts</li>
            <li>We cannot guarantee specific results</li>
            <li>Service availability depends on library credit allocation</li>
            <li>File size is limited to 10MB per upload</li>
            <li>Processing times may vary</li>
          </ul>
        </section>

        <section>
          <h2>Service Availability</h2>
          <p>
            We strive to keep the service available, but we do not guarantee uninterrupted access. 
            The service may be temporarily unavailable due to maintenance, updates, or technical issues.
          </p>
        </section>

        <section>
          <h2>Credit System</h2>
          <p>
            Libraries receive monthly credits for premium restorations. When credits are exhausted, 
            only basic restoration will be available until the next month. Basic restoration is 
            always free and unlimited.
          </p>
        </section>

        <section>
          <h2>Disclaimer of Warranties</h2>
          <div className={styles.disclaimer}>
            <p>
              THIS SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. 
              We do not warrant that the service will be error-free, secure, or meet your specific 
              requirements.
            </p>
          </div>
        </section>

        <section>
          <h2>Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, we are not liable for any damages arising from 
            your use of this service, including but not limited to loss of photos, data, or any 
            indirect or consequential damages.
          </p>
        </section>

        <section>
          <h2>Termination</h2>
          <p>
            We reserve the right to suspend or terminate access to the service for any user who 
            violates these terms or misuses the service.
          </p>
        </section>

        <section>
          <h2>Privacy</h2>
          <p>
            Your use of this service is also governed by our <a href="/library/privacy">Privacy Policy</a>. 
            Please review it to understand how we handle your data.
          </p>
        </section>

        <section>
          <h2>Changes to Terms</h2>
          <p>
            We may update these Terms of Service at any time. Continued use of the service after 
            changes constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2>Governing Law</h2>
          <p>
            These terms are governed by the laws of the State of New York, United States, without 
            regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2>Contact Information</h2>
          <p>
            Questions about these Terms of Service? Contact us at:
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