'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ImageCompareSlider from '../../../components/ImageCompareSlider';
import styles from '../[slug]/library.module.css';
import HowItWorks from '../[slug]/HowItWorks';

const DEMO_LIBRARY = {
  name: 'Demo Public Library',
  slug: 'demo-portal',
  primary_color: '#2563eb',
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
  
  // Demo usage tracking
  const [demoUsageCount, setDemoUsageCount] = useState(0);

  useEffect(() => {
    // Check demo usage from sessionStorage
    const count = parseInt(sessionStorage.getItem('demo_usage') || '0');
    setDemoUsageCount(count);
  }, []);

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
      setError(`Demo limit reached! You've used all ${DEMO_LIMIT} free restorations. Want unlimited restorations for your organization?`);
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
          restoreType: 'basic'
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
            <p className={styles.tagline}>Try Photo Restoration - DEMO</p>
          </div>
        </div>
      </header>

      {/* Demo Banner */}
      <div className={styles.demoBanner}>
        <div className={styles.demoBannerContent}>
          <div>
            <strong>Interactive Demo</strong>
            <p>You have <strong>{DEMO_LIMIT - demoUsageCount} of {DEMO_LIMIT}</strong> free restorations remaining in this demo.</p>
            <p className={styles.demoCta}>
              Want unlimited restorations for your organization? 
              <Link href="/library/demo"> Request free trial →</Link>
            </p>
          </div>
        </div>
      </div>

      <main className={styles.main}>
        <div className={styles.welcome}>
          <h2>See How It Works</h2>
          <p>Upload a photo and experience our AI-powered restoration technology</p>
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
                onClick={() => !uploading && demoUsageCount < DEMO_LIMIT && fileInputRef.current?.click()}
                tabIndex={0}
                role="button"
                aria-label="Upload photo"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  disabled={uploading || demoUsageCount >= DEMO_LIMIT}
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

              {demoUsageCount >= DEMO_LIMIT && (
                <div className={styles.demoNote}>
                  <strong>Demo Limit Reached!</strong> You have used all {DEMO_LIMIT} free restorations.
                  <Link href="/library/demo" style={{ marginLeft: '0.5rem', textDecoration: 'underline' }}>
                    Request a free trial for unlimited restorations
                  </Link>
                </div>
              )}

              {selectedImage && !uploading && demoUsageCount < DEMO_LIMIT && (
                <div className={styles.options}>
                  <h3>Demo: Basic Restoration Only</h3>
                  
                  <div className={styles.demoNote} style={{ background: 'rgba(37, 99, 235, 0.1)', borderColor: 'rgba(37, 99, 235, 0.3)' }}>
                    <strong>💡 Full Version Includes:</strong> Basic restoration (shown here) + Premium colorization for black & white photos
                  </div>

                  <div className={styles.actions}>
                    <button 
                      onClick={handleRestore} 
                      disabled={uploading || demoUsageCount >= DEMO_LIMIT} 
                      className={styles.primaryBtn}
                      aria-label="Restore photo using basic enhancement"
                    >
                      Restore Photo
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

              {demoUsageCount < DEMO_LIMIT && (
                <div className={styles.enhanceAgain}>
                  <button 
                    onClick={handleUseRestoredImage} 
                    className={styles.enhanceBtn}
                    aria-label="Use restored photo as input for another enhancement"
                  >
                    🎨 Enhance This Result Again
                  </button>
                  <p>Use the restored photo as input for another enhancement ({DEMO_LIMIT - demoUsageCount} left)</p>
                </div>
              )}

              <div className={styles.alert}>
                <span>✅</span>
                <p>Photo successfully processed! Use the slider to compare.</p>
              </div>

              {/* Post-restoration CTA */}
              <div className={styles.demoNote} style={{ 
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)',
                borderColor: 'rgba(168, 85, 247, 0.3)',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: '600' }}>
                  ✨ Impressed? Offer this to your entire community!
                </p>
                <Link href="/library/demo" style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #a78bfa 0%, #6366f1 100%)',
                  color: 'white',
                  padding: '0.75rem 2rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600'
                }}>
                  Request Free Trial
                </Link>
              </div>
            </>
          )}

          <div className={styles.proTip}>
            <span>💡</span>
            <span><strong>Demo Note:</strong> This shows basic restoration only. Full portals include premium colorization for B&W photos.</span>
          </div>
        </div>

        <HowItWorks />

        <div className={styles.faq}>
          <h2>Demo FAQ</h2>
          <details className={styles.faqItem}>
            <summary>What does the full version include?</summary>
            <p>Unlimited basic restorations for your patrons + premium colorization credits. Your organization gets a fully branded portal with your logo and colors.</p>
          </details>
          <details className={styles.faqItem}>
            <summary>How much does it cost?</summary>
            <p>Plans start at $199/month. All plans include a 30-day free trial with no credit card required. <Link href="/library/pricing">View pricing →</Link></p>
          </details>
          <details className={styles.faqItem}>
            <summary>What types of organizations use this?</summary>
            <p>Public libraries, nursing homes, senior centers, historical societies, and any organization serving communities interested in preserving family history.</p>
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
              <strong>No Installation</strong>
              <p>Works in browser</p>
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
              Get your own white-labeled photo restoration portal starting at $199/month.
              <br />
              30-day free trial • No credit card required • Cancel anytime
            </p>
            <div className={styles.demoFooterButtons}>
              <Link href="/library/pricing" className={styles.learnMoreButton}>
                View Pricing
              </Link>
              <Link href="/library/demo" className={styles.contactButton}>
                Request Free Trial
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}