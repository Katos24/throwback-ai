'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ImageCompareSlider from '../../../components/ImageCompareSlider';
import styles from '../[slug]/library.module.css'; // Use the same CSS as regular portal
import HowItWorks from '../[slug]/HowItWorks';
import LibraryHeader from '../../../components/LibraryHeader';


const DEMO_LIBRARY = {
  name: 'Demo Public Library',
  slug: 'demo-portal',
  primary_color: '#2563eb',
  allowed_zip_codes: ['00000'],
  is_demo: true,
  logo_url: null,
  phone: '(555) 123-4567',
  monthly_credits: 999999,
  credits_used: 0
};

const DEMO_LIMIT = 3;

export default function DemoPortal() {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [restoredImage, setRestoredImage] = useState(null);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [toast, setToast] = useState(null);
  
  const fileInputRef = useRef(null);
  
  // Zip code gate
  const [zipGranted, setZipGranted] = useState(false);
  const [zipInput, setZipInput] = useState('');
  const [zipError, setZipError] = useState('');
  
  // Demo usage tracking
  const [demoUsageCount, setDemoUsageCount] = useState(0);

  useEffect(() => {
    // Check demo usage from sessionStorage
    const count = parseInt(sessionStorage.getItem('demo_usage') || '0');
    setDemoUsageCount(count);
    
    // Check if zip already validated
    const savedZip = sessionStorage.getItem('demo_zip');
    if (savedZip === '00000') {
      setZipGranted(true);
      setZipInput(savedZip);
    }
  }, []);

  const validateZipCode = (zip) => {
    const cleanZip = zip.trim();
    
    if (!cleanZip) {
      setZipError('Please enter your access code');
      return;
    }

    if (!/^\d{5}$/.test(cleanZip)) {
      setZipError('Please enter a valid 5-digit code');
      return;
    }

    if (cleanZip === '00000') {
      setZipGranted(true);
      sessionStorage.setItem('demo_zip', cleanZip);
      setZipError('✅ Access granted!');
      setTimeout(() => setZipError(''), 2000);
    } else {
      setZipError('Invalid access code. Please check your email or request demo access.');
    }
  };

  const handleZipSubmit = (e) => {
    e.preventDefault();
    validateZipCode(zipInput);
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.size > 10 * 1024 * 1024) {
      showToast('File is too large. Please upload an image under 10MB.', 'error');
      return;
    }

    if (!file.type.startsWith('image/')) {
      showToast('Please upload an image file.', 'error');
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setError(null);
      setRestoredImage(null);
      showToast('Image uploaded successfully!', 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleRestore = async () => {
    // Check demo limits
    if (demoUsageCount >= DEMO_LIMIT) {
      setError(`Demo limit reached! You've used all ${DEMO_LIMIT} free restorations. Want unlimited restorations? Email hello@throwbackai.app`);
      showToast('Demo limit reached', 'error');
      return;
    }

    if (!selectedImage) return;

    setUploading(true);
    setError(null);
    
    try {
      const base64Image = selectedImage.split(',')[1];

      const response = await fetch('/api/library/libraryapi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64Image,
          librarySlug: 'demo-portal',
          restoreType: 'basic' // ALWAYS basic for demo
        })
      });

      const data = await response.json();

      if (response.ok) {
        setRestoredImage(data.restoredImage);
        showToast('Photo restored successfully!', 'success');
        
        // Increment demo usage counter
        const newCount = demoUsageCount + 1;
        setDemoUsageCount(newCount);
        sessionStorage.setItem('demo_usage', newCount.toString());
      } else {
        setError(data.error || 'Restoration failed');
        showToast(data.error || 'Restoration failed', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong. Please try again.');
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleUseRestoredImage = async () => {
    try {
      const response = await fetch(restoredImage);
      const blob = await response.blob();
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setRestoredImage(null);
        showToast('Ready to enhance again!', 'success');
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error converting image:', error);
      showToast('Failed to prepare image. Please try again.', 'error');
    }
  };

  const handleDownload = async () => {
    if (!restoredImage) return;

    try {
      const response = await fetch(restoredImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Demo-Library-restored-${Date.now()}.jpg`;
      
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        if (link.parentNode) {
          document.body.removeChild(link);
        }
        window.URL.revokeObjectURL(url);
      }, 100);
      
      showToast('Photo downloaded successfully!', 'success');
    } catch (error) {
      console.error('Download error:', error);
      showToast('Download failed. Please try again.', 'error');
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setRestoredImage(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // ZIP GATE
  if (!zipGranted) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div>
              <h1 className={styles.libraryName}>{DEMO_LIBRARY.name}</h1>
              <p className={styles.tagline}>Free Photo Restoration Service - DEMO</p>
            </div>
          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.demoBanner}>
            <div className={styles.demoBannerContent}>
              <span className={styles.demoIcon}>🎯</span>
              <div>
                <strong>Demo Access Required</strong>
                <p>To try our demo, you&apos;ll need a demo access code.</p>
                <p className={styles.demoSubtext}>
                Don&apos;t have a code? <Link href="/library/demo">Request demo access here</Link>
                </p>
              </div>
            </div>
          </div>

          <div className={styles.zipGate}>
            <h2>Enter Your Access Code</h2>
            <p>Please enter the 5-digit access code you received via email.</p>

            <form onSubmit={handleZipSubmit}>
              <div className={styles.zipInputGroup}>
                <input
                  type="text"
                  value={zipInput}
                  onChange={(e) => setZipInput(e.target.value)}
                  placeholder="Enter 5-digit code"
                  maxLength="5"
                  className={styles.zipInput}
                />
                <button type="submit" className={styles.zipButton}>
                  Access Demo
                </button>
              </div>
              {zipError && (
                <p className={zipError.includes('✅') ? styles.zipSuccess : styles.zipError}>
                  {zipError}
                </p>
              )}
            </form>

            <div className={styles.requestAccessBox}>
              <p>Don&apos;t have an access code?</p>
              <Link href="/library/demo" className={styles.requestAccessBtn}>
                Request Demo Access
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // MAIN PORTAL
  return (
    <div className={styles.container}>
      {toast && (
        <div className={`${styles.toast} ${styles[toast.type]}`}>
          {toast.type === 'success' ? '✓' : '⚠'} {toast.message}
        </div>
      )}

      <header className={styles.header}>
        <Link href="/library" className={styles.backLink}>
          ← Back to Library Info
        </Link>
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.libraryName}>{DEMO_LIBRARY.name}</h1>
            <p className={styles.tagline}>Free Photo Restoration - DEMO</p>
          </div>
        </div>
      </header>

      {/* Demo Banner */}
      <div className={styles.demoBanner}>
        <div className={styles.demoBannerContent}>
          <span className={styles.demoIcon}>🎯</span>
          <div>
            <strong>Demo Mode Active</strong>
            <p>You have <strong>{DEMO_LIMIT - demoUsageCount} of {DEMO_LIMIT}</strong> free restorations remaining.</p>
            <p className={styles.demoCta}>
              Want this for your library? 
              <a href="mailto:hello@throwbackai.app"> Contact us →</a>
            </p>
          </div>
        </div>
      </div>

      <main className={styles.main}>
        <div className={styles.welcome}>
          <h2>Restore Your Family Photos</h2>
          <p>Upload old, damaged, or black & white photos - see how it works!</p>
        </div>

        <div className={styles.uploadCard}>
          <h2 className={styles.sectionTitle}>
            {restoredImage ? '✨ Results' : '📤 Upload Your Photo'}
          </h2>

          {!restoredImage ? (
            <>
              <div
                className={`${styles.uploadZone} ${dragActive ? styles.dragActive : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => !uploading && fileInputRef.current?.click()}
                tabIndex={0}
                role="button"
                aria-label="Upload photo"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  disabled={uploading}
                  className={styles.hiddenInput}
                />
                
                {selectedImage ? (
                  <Image src={selectedImage} alt="Original" width={800} height={600} className={styles.preview} />
                ) : (
                  <div className={styles.placeholder}>
                    <div className={styles.uploadIcon}>📷</div>
                    <p>Drop your photo here or click to browse</p>
                    <span>PNG, JPG up to 10MB</span>
                  </div>
                )}

                {uploading && (
                  <div className={styles.overlay}>
                    <div className={styles.spinner}></div>
                    <p>Restoring your photo...</p>
                  </div>
                )}
              </div>

              {selectedImage && !uploading && (
                <div className={styles.options}>
                  <h3>Demo: Basic Restoration Only</h3>
                  
                  <div className={styles.demoPremiumUpsell}>
                    <p>
                      <strong>Want Premium Colorization?</strong> Full library portals include both basic restoration (free for patrons) and premium colorization (40 credits).
                    </p>
                    <Link href="/library/demo" className={styles.demoUpsellBtn}>
                      Request Free Trial →
                    </Link>
                  </div>

                  <div className={styles.actions}>
                    <button 
                      onClick={handleRestore} 
                      disabled={uploading || demoUsageCount >= DEMO_LIMIT} 
                      className={styles.primaryBtn}
                      aria-label="Restore photo using basic enhancement"
                    >
                      Restore Photo (Basic - FREE)
                    </button>
                    <button 
                      onClick={handleReset} 
                      className={styles.secondaryBtn}
                      aria-label="Reset and upload new photo"
                    >
                      <span aria-hidden="true">🔄</span>
                    </button>
                  </div>

                  {error && (
                    <div className={styles.errorMessage}>
                      {error}
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              <div className={styles.comparison}>
                <ImageCompareSlider beforeImage={selectedImage} afterImage={restoredImage} />
              </div>

              <div className={styles.actions}>
                <button 
                  onClick={handleDownload} 
                  className={styles.primaryBtn}
                  aria-label="Download restored photo"
                >
                  ⬇️ Download Result
                </button>
                <button onClick={handleReset} className={styles.secondaryBtn}>
                  <span>🔄</span>
                </button>
              </div>

              <div className={styles.enhanceAgain}>
                <button 
                  onClick={handleUseRestoredImage} 
                  className={styles.enhanceBtn}
                  aria-label="Use restored photo as input for another enhancement"
                >
                  🎨 Enhance This Result Again
                </button>
                <p>Use the restored photo as input for another enhancement</p>
              </div>

              <div className={styles.alert}>
                <span>✅</span>
                <p>Photo successfully processed! Use the slider to compare.</p>
              </div>

              {/* Post-restoration CTA */}
              <div className={styles.postRestoreCTA}>
                <p className={styles.postRestoreCTAText}>
                  ✨ Impressed? Your library can offer this service to your entire community!
                </p>
                <Link href="/library" className={styles.postRestoreCTABtn}>
                Learn More About Library Plans
                </Link>
              </div>
            </>
          )}

          <div className={styles.proTip}>
            <span>💡</span>
            <span><strong>Demo Note:</strong> This demo shows basic restoration only. Full library portals include premium colorization.</span>
          </div>
        </div>

        <HowItWorks />

        <div className={styles.faq}>
          <h2>Frequently Asked Questions</h2>
          <details className={styles.faqItem}>
            <summary>Is this really free for residents?</summary>
            <p>Yes! Completely free thanks to your library. This demo shows how it works.</p>
          </details>
          <details className={styles.faqItem}>
            <summary>What happens to my photos?</summary>
            <p>Photos are processed securely and never stored permanently.</p>
          </details>
          <details className={styles.faqItem}>
            <summary>Can I restore multiple photos?</summary>
            <p>In the full version, yes! Unlimited restorations for library patrons.</p>
          </details>
        </div>

        <div className={styles.trust}>
          <div className={styles.trustItem}>
            <span>🔒</span>
            <div>
              <strong>Private & Secure</strong>
              <p>Photos never shared</p>
            </div>
          </div>
          <div className={styles.trustItem}>
            <span>💾</span>
            <div>
              <strong>Free Forever</strong>
              <p>No subscriptions</p>
            </div>
          </div>
          <div className={styles.trustItem}>
            <span>⚡</span>
            <div>
              <strong>Lightning Fast</strong>
              <p>Results in seconds</p>
            </div>
          </div>
        </div>

        {/* Demo Footer */}
        <footer className={styles.demoFooter}>
          <div className={styles.demoFooterContent}>
            <h3>Ready to Offer This to Your Community?</h3>
            <p>
              Get your own white-labeled photo restoration portal for just $300/month.
              <br />
              Unlimited basic restorations + 8,000 premium credits/month (~400 colorizations).
            </p>
            <div className={styles.demoFooterButtons}>
              <Link href="/library" className={styles.learnMoreButton}>
                Learn More
                </Link>
              <a href="mailto:hello@throwbackai.app" className={styles.contactButton}>
                Contact Us
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}