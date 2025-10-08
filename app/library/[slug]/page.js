'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '../../../lib/supabaseClient';
import styles from './library.module.css';

export default function LibraryPortal() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;
  
  const [library, setLibrary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [restoredImage, setRestoredImage] = useState(null);
  const [restoreType, setRestoreType] = useState('basic');
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [toast, setToast] = useState(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  
  const fileInputRef = useRef(null);
  const sliderRef = useRef(null);
  
  // ZIP CODE GATE STATE
  const [zipGranted, setZipGranted] = useState(false);
  const [zipInput, setZipInput] = useState('');
  const [zipError, setZipError] = useState('');
  const [checkingZip, setCheckingZip] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetchLibraryData();
    
    const savedZip = sessionStorage.getItem(`library_zip_${slug}`);
    if (savedZip) {
      setZipInput(savedZip);
    }
  }, [slug]);

  useEffect(() => {
    if (library && zipInput && !zipGranted) {
      validateZipCode(zipInput, true);
    }
  }, [library]);

  async function fetchLibraryData() {
    try {
      const { data, error } = await supabase
        .from('libraries')
        .select('*')
        .eq('slug', slug)
        .eq('active', true)
        .single();

      if (error || !data) {
        console.error('Library not found:', error);
        setLibrary(null);
      } else {
        setLibrary(data);
      }
    } catch (err) {
      console.error('Error fetching library:', err);
    } finally {
      setLoading(false);
    }
  }

  const validateZipCode = (zip, silent = false) => {
    const cleanZip = zip.trim();
    
    if (!cleanZip) {
      if (!silent) setZipError('Please enter your zip code');
      return;
    }

    if (!/^\d{5}$/.test(cleanZip)) {
      if (!silent) setZipError('Please enter a valid 5-digit zip code');
      return;
    }

    setCheckingZip(true);
    setZipError('');

    const isAllowed = library.allowed_zip_codes?.includes(cleanZip);

    if (isAllowed) {
      setZipGranted(true);
      sessionStorage.setItem(`library_zip_${slug}`, cleanZip);
      if (!silent) {
        setZipError('✅ Access granted!');
        setTimeout(() => setZipError(''), 2000);
      }
    } else {
      setZipGranted(false);
      sessionStorage.removeItem(`library_zip_${slug}`);
      if (!silent) {
        setZipError(`This service is for ${library.name} district residents only. Please contact your local library for photo restoration services.`);
      }
    }

    setCheckingZip(false);
  };

  const handleZipSubmit = (e) => {
    e.preventDefault();
    validateZipCode(zipInput);
  };

  // Toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Drag and drop handlers
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
    if (!selectedImage || !library) return;

    setUploading(true);
    setError(null);
    
    try {
      const base64Image = selectedImage.split(',')[1];

      const response = await fetch('/api/library/libraryapi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64Image,
          libraryId: library.id,
          librarySlug: slug,
          restoreType: restoreType
        })
      });

      const data = await response.json();

      if (response.ok) {
        setRestoredImage(data.restoredImage);
        showToast('Photo restored successfully!', 'success');
        
        if (restoreType === 'premium') {
          setLibrary(prev => ({
            ...prev,
            credits_used: prev.credits_used + data.creditsUsed
          }));
        }
      } else {
        setError(data.error || 'Restoration failed');
        showToast(data.error || 'Restoration failed', 'error');
      }
    } catch (error) {
      console.error('❌ Error:', error);
      setError('Something went wrong. Please try again.');
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setRestoredImage(null);
    setError(null);
    setRestoreType('basic');
    setSliderPosition(50);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Slider handlers
  const handleSliderMove = (e) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading library portal...</div>
      </div>
    );
  }

  if (!library) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h1>Library Portal Not Found</h1>
          <p>This library portal does not exist or is no longer active.</p>
          <button onClick={() => router.push('/')}>Go Home</button>
        </div>
      </div>
    );
  }

  const creditsRemaining = library.monthly_credits - library.credits_used;
  const premiumAvailable = Math.floor(creditsRemaining / 40);
  const outOfPremiumCredits = creditsRemaining < 40;

  // ZIP CODE GATE
  if (!zipGranted) {
    return (
      <div className={styles.container}>
        <header 
          className={styles.header} 
          style={{ 
            backgroundColor: library.primary_color || '#000000',
            color: library.secondary_color || '#D4AF37'
          }}
        >
          <div className={styles.headerContent}>
            {library.logo_url && (
              <Image
                src={library.logo_url}
                alt={`${library.name} logo`}
                width={120}
                height={60}
                className={styles.logo}
              />
            )}
            <div>
              <h1 className={styles.libraryName}>{library.name}</h1>
              <p className={styles.tagline}>Community Photo Restoration Service</p>
            </div>
          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.zipGate}>
            <h2>Welcome!</h2>
            <p>This free photo restoration service is available to residents in the {library.name} district.</p>
            
            <form onSubmit={handleZipSubmit} className={styles.zipForm}>
              <label htmlFor="zipcode">Enter your zip code to continue:</label>
              <div className={styles.zipInputGroup}>
                <input
                  id="zipcode"
                  type="text"
                  value={zipInput}
                  onChange={(e) => setZipInput(e.target.value)}
                  placeholder="12345"
                  maxLength="5"
                  pattern="\d{5}"
                  className={styles.zipInput}
                  disabled={checkingZip}
                />
                <button 
                  type="submit" 
                  disabled={checkingZip}
                  className={styles.zipButton}
                  style={{ 
                    backgroundColor: library.secondary_color || '#D4AF37',
                    color: library.primary_color || '#000000'
                  }}
                >
                  {checkingZip ? 'Checking...' : 'Continue'}
                </button>
              </div>
              
              {zipError && (
                <p className={zipError.includes('✅') ? styles.zipSuccess : styles.zipError}>
                  {zipError}
                </p>
              )}
            </form>
          </div>
        </main>
      </div>
    );
  }

  // MAIN PORTAL
  return (
    <div className={styles.container}>
      {/* Toast Notification */}
      {toast && (
        <div className={`${styles.toast} ${styles[`toast${toast.type.charAt(0).toUpperCase() + toast.type.slice(1)}`]}`}>
          <span className={styles.toastIcon}>
            {toast.type === 'success' ? '✓' : '⚠'}
          </span>
          {toast.message}
        </div>
      )}

      <header 
        className={styles.header} 
        style={{ 
          backgroundColor: library.primary_color || '#000000',
          color: library.secondary_color || '#D4AF37'
        }}
      >
        <div className={styles.headerContent}>
          {library.logo_url && (
            <Image
              src={library.logo_url}
              alt={`${library.name} logo`}
              width={120}
              height={60}
              className={styles.logo}
            />
          )}
          <div>
            <h1 className={styles.libraryName}>{library.name}</h1>
            <p className={styles.tagline}>Community Photo Restoration Service</p>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.welcomeBanner}>
        <h2>Welcome to Free Photo Restoration</h2>
        <p>Restore unlimited photos for free with your library card</p>
        </div>

        {/* Upload Section */}
        <div className={styles.uploadSection}>
          <h2>Restore Your Family Photos</h2>
          <p>Upload old, damaged, or black & white photos and watch them come back to life</p>

          {!selectedImage ? (
            <div
              className={`${styles.uploadBox} ${dragActive ? styles.uploadBoxDragActive : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className={styles.fileInput}
              />
              <div className={styles.uploadContent}>
                <div className={styles.uploadIcon}>📷</div>
                <p className={styles.uploadText}>
                  {dragActive ? 'Drop image here' : 'Click to upload or drag and drop'}
                </p>
                <p className={styles.uploadHint}>PNG, JPG up to 10MB</p>
              </div>
            </div>
          ) : (
            <div className={styles.imagePreview}>
              {/* Restoration type selector */}
              <div className={styles.restoreOptionsGrid}>
                <div 
                  className={`${styles.restoreOptionCard} ${restoreType === 'basic' ? styles.optionActive : ''}`}
                  onClick={() => setRestoreType('basic')}
                >
                  <div className={styles.optionBadge}>💰 FREE</div>
                  <h4>Basic Restoration</h4>
                  <p>Great quality, instant results</p>
                </div>

                <div 
                  className={`${styles.restoreOptionCard} ${restoreType === 'premium' ? styles.optionActive : ''} ${outOfPremiumCredits ? styles.optionDisabled : ''}`}
                  onClick={() => !outOfPremiumCredits && setRestoreType('premium')}
                >
                  <div className={styles.optionBadge}>⭐ PREMIUM</div>
                  <h4>Enhanced Details</h4>
                  <p>{outOfPremiumCredits ? 'Out of credits' : '40 credits - Pro quality'}</p>
                </div>
              </div>

              {/* Image comparison slider */}
              {restoredImage ? (
                <div 
                  ref={sliderRef}
                  className={styles.comparisonSlider}
                  onMouseMove={handleSliderMove}
                  onTouchMove={handleSliderMove}
                >
                  <div className={styles.comparisonImage}>
                    <Image
                      src={restoredImage}
                      alt="Restored"
                      width={800}
                      height={600}
                      className={styles.sliderImage}
                    />
                  </div>
                  <div 
                    className={styles.comparisonOverlay}
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                  >
                    <Image
                      src={selectedImage}
                      alt="Original"
                      width={800}
                      height={600}
                      className={styles.sliderImage}
                    />
                  </div>
                  <div 
                    className={styles.sliderHandle}
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className={styles.sliderLine}></div>
                    <div className={styles.sliderButton}>⟷</div>
                  </div>
                </div>
              ) : (
                <div className={styles.previewCard}>
                  {uploading ? (
                    <div className={styles.uploadingState}>
                      <div className={styles.spinner}></div>
                      <p>Restoring your photo...</p>
                      <p className={styles.timeEstimate}>
                        {restoreType === 'premium' ? 'This may take 30-45 seconds' : 'This may take 20-30 seconds'}
                      </p>
                    </div>
                  ) : (
                    <Image
                      src={selectedImage}
                      alt="Original"
                      width={800}
                      height={600}
                      className={styles.previewImage}
                    />
                  )}
                </div>
              )}

              {/* Before/After Labels (when restored) */}
              {restoredImage && (
                <div className={styles.beforeAfterLabels}>
                  <div className={styles.labelLeft}>← Original</div>
                  <div className={styles.labelRight}>Restored →</div>
                </div>
              )}

              {/* Action Buttons */}
              <div className={styles.actions}>
                {!restoredImage && (
                  <>
                    <button
                      onClick={handleRestore}
                      disabled={uploading || (restoreType === 'premium' && outOfPremiumCredits)}
                      className={styles.restoreButton}
                      style={{ 
                        backgroundColor: library.secondary_color || '#D4AF37',
                        color: library.primary_color || '#000000'
                      }}
                    >
                      {uploading 
                        ? 'Restoring...' 
                        : `Restore Photo (${restoreType === 'basic' ? 'FREE' : '40 credits'})`
                      }
                    </button>
                    <button
                      onClick={handleReset}
                      className={styles.cancelButton}
                      disabled={uploading}
                    >
                      Cancel
                    </button>
                  </>
                )}
                
                {restoredImage && (
                  <>
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = restoredImage;
                        link.download = `restored-photo-${Date.now()}.jpg`;
                        link.click();
                        showToast('Photo downloaded!', 'success');
                      }}
                      className={styles.downloadButton}
                    >
                      Download Restored Photo
                    </button>
                    <button
                      onClick={handleReset}
                      className={styles.newButton}
                    >
                      Restore Another Photo
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

  

        {/* How It Works */}
        <div className={styles.howItWorks}>
          <h3>How It Works</h3>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <p>Upload your old photo</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <p>Choose basic (free) or premium</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <p>Download & keep forever</p>
            </div>
          </div>
        </div>

                 {/* Trust Section */}
        <div className={styles.trustSection}>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}>🔒</div>
            <div className={styles.trustContent}>
              <div className={styles.trustTitle}>Private & Secure</div>
              <div className={styles.trustDesc}>Photos never shared</div>
            </div>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}>💾</div>
            <div className={styles.trustContent}>
              <div className={styles.trustTitle}>Free Forever</div>
              <div className={styles.trustDesc}>No subscriptions</div>
            </div>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}>⚡</div>
            <div className={styles.trustContent}>
              <div className={styles.trustTitle}>Lightning Fast</div>
              <div className={styles.trustDesc}>Results in seconds</div>
            </div>
          </div>
        </div>

        {/* Out of credits notice */}
        {outOfPremiumCredits && (
          <div className={styles.premiumNotice}>
            <h3>Premium Restorations Temporarily Unavailable</h3>
            <p>{library.name} has used all premium restoration credits for this month.</p>
            <p><strong>Good news:</strong> Basic restorations are still FREE and unlimited!</p>
            <p>Premium credits reset on <strong>{new Date(library.credits_reset_date).toLocaleDateString()}</strong></p>
          </div>
        )}

        {/* Footer */}
        <footer className={styles.footer}>
          <p>Provided by {library.name}</p>
          <p className={styles.poweredBy}>
            Powered by <a href="https://throwback.ai" target="_blank" rel="noopener noreferrer">Throwback AI</a>
          </p>
          <p className={styles.footerNote}>
            Your photos are private and never shared. They are automatically deleted after processing.
          </p>
        </footer>
      </main>
    </div>
  );
}