'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '../../../lib/supabaseClient';
import ImageCompareSlider from '../../../components/ImageCompareSlider';
import styles from './library.module.css';
import HowItWorks from './HowItWorks';

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
  
  const fileInputRef = useRef(null);
  
  // ZIP CODE GATE
  const [zipGranted, setZipGranted] = useState(false);
  const [zipInput, setZipInput] = useState('');
  const [zipError, setZipError] = useState('');
  const [checkingZip, setCheckingZip] = useState(false);

  // SHOWCASE EXAMPLES
  const [showcaseExamples, setShowcaseExamples] = useState([]);

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

  useEffect(() => {
    async function fetchShowcaseExamples() {
      if (!library) return;
      
      const { data, error } = await supabase
        .from('showcase_examples')
        .select('*')
        .eq('library_id', library.id)
        .order('display_order');
      
      if (data && data.length > 0) {
        setShowcaseExamples(data);
      }
    }
    
    fetchShowcaseExamples();
  }, [library]);



  async function fetchLibraryData() {
    try {
      const { data, error } = await supabase
        .from('libraries')
        .select('*')
        .eq('slug', slug)
        .eq('active', true)
        .maybeSingle();  // Changed from .single() to .maybeSingle()

      if (error || !data) {
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
        setZipError(`This service is for ${library.name} district residents only.`);
      }
    }

    setCheckingZip(false);
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
    link.download = `${library.name.replace(/\s+/g, '-')}-restored-${Date.now()}.jpg`;
    
    document.body.appendChild(link);
    link.click();
    
    // Safe cleanup with timeout and parent check
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
    setRestoreType('basic');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (!library) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h1>Library Portal Not Found</h1>
          <p>This library portal does not exist or is no longer active.</p>
        </div>
      </div>
    );
  }

  const creditsRemaining = library.monthly_credits - library.credits_used;
  const outOfPremiumCredits = creditsRemaining < 40;

  // ZIP GATE
  if (!zipGranted) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
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
              <p className={styles.tagline}>Free Photo Restoration Service</p>
            </div>
          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.zipGate}>
            <h2>Welcome!</h2>
            <p>This free service is available to {library.name} district residents.</p>

            <form onSubmit={handleZipSubmit}>
              <label>Enter your zip code:</label>
              <div className={styles.zipInputGroup}>
                <input
                  type="text"
                  value={zipInput}
                  onChange={(e) => setZipInput(e.target.value)}
                  placeholder="12345"
                  maxLength="5"
                  disabled={checkingZip}
                  className={styles.zipInput}
                />
                <button type="submit" disabled={checkingZip} className={styles.zipButton}>
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
      {toast && (
        <div className={`${styles.toast} ${styles[toast.type]}`}>
          {toast.type === 'success' ? '✓' : '⚠'} {toast.message}
        </div>
      )}

      <header className={styles.header}>
        <div className={styles.headerContent}>
          {library.logo_url && (
            <Image src={library.logo_url} alt={`${library.name} logo`} width={120} height={60} className={styles.logo} />
          )}
          <div>
            <h1 className={styles.libraryName}>{library.name}</h1>
            <p className={styles.tagline}>Free Photo Restoration</p>
          </div>
        </div>
      </header>

          {/* Welcome */}
      <main className={styles.main}>
  <div className={styles.welcome}>
    <h2>Restore Your Family Photos</h2>
    <p>Upload old, damaged, or black & white photos - completely free for residents</p>
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
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    !uploading && fileInputRef.current?.click();
                    }
                }}
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
                  <h3>Choose Enhancement Type</h3>
                  
                  <div className={styles.optionsGrid}>
                    <div 
                        className={`${styles.option} ${restoreType === 'basic' ? styles.active : ''}`}
                        onClick={() => setRestoreType('basic')}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setRestoreType('basic');
                            }
                        }}
                        tabIndex={0}
                        role="radio"
                        aria-checked={restoreType === 'basic'}
                        >
                      <div className={styles.badge}>✨ ENHANCE</div>
                      <h4>Basic Restoration</h4>
                      <p>Fix damage, sharpen details</p>
                    </div>

                    <div 
                    className={`${styles.option} ${restoreType === 'premium' ? styles.active : ''} ${outOfPremiumCredits ? styles.disabled : ''}`}
                    onClick={() => !outOfPremiumCredits && setRestoreType('premium')}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        !outOfPremiumCredits && setRestoreType('premium');
                        }
                    }}
                    tabIndex={outOfPremiumCredits ? -1 : 0}
                    role="radio"
                    aria-checked={restoreType === 'premium'}
                    aria-disabled={outOfPremiumCredits}
                    >
                    <div className={styles.badge}>🎨 COLORIZE</div>
                    <h4>Premium Colorization</h4>
                    <p>{outOfPremiumCredits ? 'Out of credits' : 'Add vibrant, realistic color'}</p>
                    </div>
                  </div>

                  <div className={styles.actions}>
                    <button 
                        onClick={handleRestore} 
                        disabled={uploading || (restoreType === 'premium' && outOfPremiumCredits)} 
                        className={styles.primaryBtn}
                        aria-label={`Restore photo using ${restoreType} enhancement`}
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
            </>
          )}

          <div className={styles.proTip}>
            <span>💡</span>
            <span><strong>Pro Tip:</strong> Start with Basic to fix damage, then use Premium for vibrant colors.</span>
          </div>
        </div>


    {/* How It Works */}
        <HowItWorks />

        {showcaseExamples.length > 0 && (
          <div className={styles.showcase}>
            <h2>See the Magic in Action</h2>
            <p>Real photos from our community</p>
            <div className={styles.showcaseGrid}>
              {showcaseExamples.map((ex) => (
                <div key={ex.id} className={styles.showcaseCard}>
                  <ImageCompareSlider beforeImage={ex.before_image_url} afterImage={ex.after_image_url} />
                  <div className={styles.showcaseInfo}>
                    <h3>{ex.title}</h3>
                    <span>{ex.year}</span>
                    <p>{ex.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

          {/* FAQ */}
        <div className={styles.faq}>
        <h2>Frequently Asked Questions</h2>
        <details className={styles.faqItem}>
          <summary>Is this really free for residents?</summary>
          <p>Yes! Completely free thanks to {library.name}.</p>
        </details>
        <details className={styles.faqItem}>
          <summary>What happens to my photos?</summary>
          <p>Photos are processed securely and never stored permanently.</p>
        </details>
        <details className={styles.faqItem}>
          <summary>Can I restore multiple photos?</summary>
          <p>Yes! You can restore as many photos as you&apos;d like.</p>
        </details>
      </div>

        {/* Trust Section */}
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

        {/* Accessibility Info */}
      <div className={styles.accessibility}>
      <h3>♿ Accessibility</h3>
      <p>Need help using this service? Visit the reference desk or call us at {library.phone}</p>
    </div>

        {/* Footer */}
       <footer className={styles.footer}>
        <p>Provided by {library.name}</p>
        <p>
            Powered by <a href="https://throwbackai.app">Throwback AI</a>
        </p>
        <div className={styles.legalLinks}>
            <Link href="/library/privacy">Privacy Policy</Link>
            <span>•</span>
            <Link href="/library/terms">Terms of Service</Link>
        </div>
        </footer>
      </main>
    </div>
  );
}