import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from "next/router";
import imageCompression from "browser-image-compression";
import { supabase } from "../../lib/supabaseClient";
import useCredits from "../../hooks/useCredits";
import ImageCompareSlider from "../../components/ImageCompareSlider";
import ProgressBar from "../../components/Restores/ProgressBar";
import styles from "../../styles/ModernRestore.module.css";
import toast from 'react-hot-toast';
import BasicFeaturesSection from "../../components/Restores/BasicFeaturesSection";
import CreditsInfo from "../../components/Restores/CreditsInfo";

export default function RestorePremium() {
  const router = useRouter();
  
  // State management
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPreviewUrl, setSelectedPreviewUrl] = useState(null);
  const [restoredUrl, setRestoredUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [session, setSession] = useState(null);
  const [progressStatus, setProgressStatus] = useState("idle");
  const [progressPercent, setProgressPercent] = useState(null);
  
  // UI state
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const [showScrollNotice, setShowScrollNotice] = useState(false);
  
  // Premium cost
  const restoreCost = 40;
  
  // Hooks
  const { credits, isLoggedIn, refreshCredits, deductCredits } = useCredits();
  
  // Refs
  const fileInputRef = useRef(null);

  // Effects
  useEffect(() => {
    async function getSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    }
    getSession();
  }, []);

  useEffect(() => {
    if (showScrollNotice) {
      const timer = setTimeout(() => setShowScrollNotice(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [showScrollNotice]);

  useEffect(() => {
    if (restoredUrl) {
      setTimeout(() => window.scrollTo({ top: 600, behavior: "smooth" }), 500);
    }
  }, [restoredUrl]);

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
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelection(files[0]);
    }
  };

  // Enhanced file selection with premium messaging
  const handleFileSelection = async (file) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file (PNG, JPG, HEIC)', {
        icon: '🖼️',
        duration: 4000,
      });
      return;
    }
    
    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be under 10MB', {
        icon: '📏',
        duration: 4000,
      });
      return;
    }
    
    setError('');
    setProgressStatus("compressing");
    setProcessing(true);
    setRestoredUrl("");
    
    // Show premium compression toast
    const compressionToast = toast.loading('Optimizing for premium AI restoration...', {
      icon: '🎨',
    });
    
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
        preserveExif: true
      });
      setSelectedFile(compressed);
      setSelectedPreviewUrl(URL.createObjectURL(compressed));
      
      toast.success('Image ready for premium restoration!', {
        id: compressionToast,
        icon: '🌈',
        duration: 2000,
      });
    } catch (compressionError) {
      console.warn('Compression failed, using original file:', compressionError);
      setSelectedFile(file);
      setSelectedPreviewUrl(URL.createObjectURL(file));
      
      toast.success('Image ready for premium restoration!', {
        id: compressionToast,
        icon: '🌈',
        duration: 2000,
      });
    } finally {
      setProcessing(false);
      setProgressStatus("idle");
      setProgressPercent(null);
    }
  };

  // Updated function to handle button clicks based on user state (matching yearbook logic)
  const handleGenerateOrRedirect = () => {
    if (!selectedFile) {
      toast.error('Please upload an image first', {
        icon: '📤',
        duration: 3000,
      });
      return;
    }
    if (!isLoggedIn) {
      router.push('/signup');
      return;
    }
    if (credits < restoreCost) {
      router.push('/pricing');
      return;
    }
    handleRestore();
  };

  // Helper functions for button text and emoji (matching yearbook logic)
  const getButtonText = () => {
    if (loading || processing) {
      if (processing) return "Optimizing image...";
      return "Premium restoring...";
    }
    if (!selectedFile) return "Upload a Photo First";
    if (!isLoggedIn) return "Sign Up to Restore";
    if (credits < restoreCost) return "Get More Credits";
    return "Premium Restore";
  };

  const getButtonEmoji = () => {
    if (loading || processing) return null;
    if (!selectedFile) return "📷";
    if (!isLoggedIn) return "🔒";
    if (credits < restoreCost) return "💎";
    return "🌈";
  };

  // Premium restore function (simplified since logic moved to handleGenerateOrRedirect)
  const handleRestore = async () => {
    setLoading(true);
    setProgressStatus("uploading");
    setProgressPercent(0);
    setError('');
    
    // Show premium processing toast
    const processingToast = toast.loading('Premium AI is restoring and colorizing your photo...', {
      icon: '🎨',
    });
    
    const headers = { "Content-Type": "application/json" };
    if (session?.access_token) {
      headers.Authorization = `Bearer ${session.access_token}`;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];
      try {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 8;
          if (progress > 85) clearInterval(interval);
          else setProgressPercent(progress);
        }, 400);

        const response = await fetch("/api/replicate/restorePremium", {
          method: "POST",
          headers,
          body: JSON.stringify({ 
            imageBase64: base64, 
            prompt: "Restore and colorize this vintage photo with premium AI for stunning results" 
          }),
        });

        clearInterval(interval);
        setProgressPercent(100);
        setProgressStatus("processing");
        setProgressPercent(null);
        
        const data = await response.json();
        if (response.ok && data.imageUrl) {
          setRestoredUrl(data.imageUrl);
          setShowScrollNotice(true);
          setProgressStatus("complete");
          
          // Premium success toast
          toast.success('Premium restoration complete! Stunning results achieved!', {
            id: processingToast,
            icon: '🌈',
            duration: 5000,
          });
          
          // Delayed upgrade suggestion toast
          setTimeout(() => {
            toast((t) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.5rem' }}>✨</span>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                    Amazing results!
                  </div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                    Your photo now has vibrant colors and enhanced clarity
                  </div>
                </div>
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    handleDownload();
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}
                >
                  Download 🎨
                </button>
              </div>
            ), {
              duration: 8000,
              style: { maxWidth: '400px' }
            });
          }, 2000);
          
          await refreshCredits();
          await deductCredits(restoreCost);
        } else {
          toast.error(data.error || "Premium restoration failed. Please try again.", {
            id: processingToast,
            icon: '❌',
            duration: 5000,
          });
          setProgressStatus("idle");
          setProgressPercent(null);
        }
      } catch (networkError) {
        console.error('Network/server error:', networkError);
        toast.error("Network error. Please check your connection and try again.", {
          id: processingToast,
          icon: '🌐',
          duration: 5000,
        });
        setProgressStatus("idle");
        setProgressPercent(null);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  // Download function with premium messaging
  const handleDownload = async () => {
    if (!restoredUrl) return;
    
    const downloadToast = toast.loading('Preparing premium download...', {
      icon: '⬇️',
    });
    
    try {
      const resp = await fetch(restoredUrl);
      const blob = await resp.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `premium-restored-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('Premium restoration downloaded!', {
        id: downloadToast,
        icon: '🎨',
        duration: 3000,
      });
    } catch (downloadError) {
      console.error('Download failed:', downloadError);
      toast.error('Download failed. Please try again.', {
        id: downloadError,
        icon: '❌',
        duration: 4000,
      });
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setSelectedPreviewUrl(null);
    setRestoredUrl("");
    setShowScrollNotice(false);
    setError('');
    setProgressStatus("idle");
    setProgressPercent(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    toast.success('Ready for a new premium restoration!', {
      icon: '🔄',
      duration: 2000,
    });
  };

  // Check if all conditions are met for completion
  const isComplete = selectedFile && isLoggedIn && credits >= restoreCost;

  // SEO values
  const siteUrl = 'https://throwbackai.app';
  const pageUrl = `${siteUrl}/replicate/restore-premium`;
  const ogImage = `${siteUrl}/images/throwback-ai.jpg`;
  const twitterImage = ogImage;
  const facebookPageUrl = 'https://www.facebook.com/profile.php?id=61578072554521';
  const facebookPageId = '61578072554521';

  return (
    <>
      <Head>
        <title>Restore Premium – Full Color AI Photo Restoration | Throwback AI</title>
        <meta
          name="description"
          content="Bring your vintage photos to vibrant life with Throwback AI's Restore Premium. Advanced AI colorization and restoration for stunning, high-quality results."
        />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph */}
        <meta property="og:title" content="Restore Premium – Full Color AI Photo Restoration | Throwback AI" />
        <meta
          property="og:description"
          content="Bring your vintage photos to vibrant life with Throwback AI's Restore Premium. Advanced AI colorization and restoration for stunning, high-quality results."
        />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Before and after AI full color photo restoration example" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Throwback AI" />

        {/* Facebook-specific */}
        <meta property="fb:pages" content={facebookPageId} />
        <meta property="article:publisher" content={facebookPageUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Restore Premium – Full Color AI Photo Restoration | Throwback AI" />
        <meta
          name="twitter:description"
          content="Bring your vintage photos to vibrant life with Throwback AI's Restore Premium. Advanced AI colorization and restoration for stunning, high-quality results."
        />
        <meta name="twitter:image" content={twitterImage} />

        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Throwback AI Restore Premium",
              "url": pageUrl,
              "applicationCategory": "Photo Editing",
              "operatingSystem": "Web",
              "description": "Premium AI colorization and restoration tool — advanced model for high-quality color restores and detail enhancement.",
              "image": ogImage,
              "offers": {
                "@type": "Offer",
                "price": "40",
                "priceCurrency": "credits",
                "url": "https://throwbackai.app/pricing"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Throwback AI",
                "url": siteUrl,
                "sameAs": [facebookPageUrl]
              }
            }),
          }}
        />
      </Head>

      <div className={`${styles.container} ${styles.premiumContainer}`}>
        {/* Premium Animated Background */}
        <div className={`${styles.backgroundParticles} ${styles.premiumBackground}`}></div>

        <div className={styles.content}>
          {/* Premium Header */}
          <div className={`${styles.header} ${styles.premiumHeader}`}>
            {/* Grid Cell: Top Right Badge */}
            <div className={styles.compactCredits}>
              <div className={styles.compactCreditsInfo}>
                <span className={styles.creditsIcon}>💎</span>
                <span className={styles.creditsText}>{credits} credits</span>
              </div>
              <button 
                onClick={() => router.push(isLoggedIn ? "/pricing" : "/signup")}
                className={styles.compactCreditsButton}
              >
                {isLoggedIn ? "+" : "Sign Up"}
              </button>
            </div>

            {/* Grid Cell: Centered Title */}
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>
                <span className={styles.titleGradient}>Premium Restore</span>
              </h1>
              <span className={styles.subtitle}>Full Color AI Studio</span>
            </div>

            
            {/* Grid Cell: Description (full width below) */}
            <p className={styles.description}>
              Transform black & white photos into stunning color masterpieces with our premium AI technology.
              Advanced colorization and enhancement for extraordinary results.
              <span className={styles.creditPill} style={{background: 'linear-gradient(135deg, #a855f7, #ec4899)'}}>
                Costs {restoreCost} credits
              </span>
              <br />
              <a 
                href="/gallery" 
                className={styles.galleryLink}
              >
                See gallery for examples →
              </a>
            </p>
          </div>

          {/* Main Content Grid */}
          <div className={styles.mainGrid}>
            {/* Upload Section */}
            <div className={styles.uploadSection}>
              <div className={`${styles.uploadCard} ${styles.premiumCard}`}>
                <h2 className={styles.sectionTitle}>
                  <span>🎨</span>
                  Upload Your Photo
                </h2>
                
                {/* Upload Zone */}
                <div
                  className={`${styles.uploadZone} ${dragActive ? styles.uploadZoneDragActive : ''}`}
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
                    disabled={loading || processing}
                    className={styles.hiddenInput}
                  />
                  
                  {selectedPreviewUrl ? (
                    <div className={styles.uploadContent}>
                      <img 
                        src={selectedPreviewUrl} 
                        alt="Original" 
                        className={styles.uploadPreview}
                      />
                      <div className={styles.uploadFileInfo}>
                        <p className={styles.uploadFileName}>{selectedFile?.name}</p>
                        <p className={styles.uploadFileSize}>
                          {selectedFile ? (selectedFile.size / 1024 / 1024).toFixed(2) : '0'} MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.uploadPlaceholder}>
                      <div className={styles.uploadIcon}>
                        <span style={{ fontSize: '2rem' }}>🌈</span>
                      </div>
                      <div>
                        <p className={styles.uploadTitle}>
                          Drop your photo here
                        </p>
                        <p className={styles.uploadDescription}>
                          or click to browse • PNG, JPG, HEIC up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {dragActive && (
                    <div className={styles.dragOverlay}>
                      <p>Drop to upload!</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons - Updated with yearbook-style logic */}
                <div className={styles.buttonRow}>
                  <button
                    onClick={handleGenerateOrRedirect}
                    disabled={loading || processing}
                    className={`${styles.primaryButton} ${isComplete ? styles.ready : ''}`}
                    style={{background: 'linear-gradient(135deg, #a855f7, #ec4899)'}}
                  >
                    {loading || processing ? (
                      <>
                        <div className={styles.loadingSpinner}></div>
                        {getButtonText()}
                      </>
                    ) : (
                      <>
                        {getButtonEmoji() && <span>{getButtonEmoji()}</span>}
                        {getButtonText()}
                      </>
                    )}
                  </button>
                  
                  {(selectedFile || restoredUrl) && (
                    <button
                      onClick={handleReset}
                      disabled={loading || processing}
                      className={styles.secondaryButton}
                    >
                      <span>🔄</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Display */}
              {progressStatus !== "idle" && (
                <div className={styles.progressCard}>
                  <ProgressBar status={progressStatus} percent={progressPercent} />
                </div>
              )}

              {/* Success Notice */}
              {showScrollNotice && (
                <div className={`${styles.alert} ${styles.alertSuccess}`}>
                  <span>🌈</span>
                  <div className={styles.alertContent}>
                    <p className={styles.alertTitle}>Premium restoration complete!</p>
                    <p>Your photo now has vibrant colors and enhanced clarity</p>
                  </div>
                </div>
              )}
            </div>

            {/* Results Section */}
            <div className={styles.resultsSection}>
              <div className={`${styles.uploadCard} ${styles.premiumCard}`}>
                <div className={styles.resultsHeader}>
                  <h2 className={styles.sectionTitle}>
                    <span>✨</span>
                    Premium Results
                  </h2>
                </div>

                {restoredUrl && selectedPreviewUrl ? (
                  <div>
                    {/* Image comparison */}
                    <div className={styles.comparisonContainer}>
                      <div className={styles.imageComparisonWrapper}>
                        <ImageCompareSlider
                          beforeImage={selectedPreviewUrl}
                          afterImage={restoredUrl}
                        />
                      </div>
                    </div>

                    {/* Download button below image */}
                    <div className={styles.downloadSection}>
                      <button
                        onClick={handleDownload}
                        className={styles.downloadButton}
                        style={{background: 'linear-gradient(135deg, #a855f7, #ec4899)'}}
                      >
                        <span>⬇️</span>
                        Download
                      </button>
                    </div>

                    <div className={`${styles.alert} ${styles.alertSuccess}`} style={{ marginTop: '1rem' }}>
                      <span>🌈</span>
                      <p>Premium restoration complete! Use the slider to compare the amazing transformation.</p>
                    </div>
                  </div>
                ) : (
                  <div className={styles.resultsPlaceholder}>
                    <div className={styles.placeholderContent}>
                      <div className={styles.placeholderIcon}>
                        <span style={{ fontSize: '2rem' }}>🎨</span>
                      </div>
                      <p className={styles.placeholderText}>Your premium colorized photo will appear here</p>
                    </div>
                  </div>
                )}

                {/* Pro Tip */}
                <div className={styles.bottomProTip}>
                  <span className={styles.proTipIcon}>💎</span>
                  <span className={styles.proTipText}>
                    <strong>Premium Tip:</strong> Our advanced AI analyzes historical context and artistic styles to create realistic, vibrant colorizations that bring your memories to life.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Before/After Gallery - Shows after restoration */}
          {restoredUrl && selectedPreviewUrl && (
            <div className={styles.beforeAfterGallery}>
              <h3 className={styles.galleryTitle}>
                <span>🌈</span>
                Premium Transformation Gallery
              </h3>
              <div className={styles.beforeAfterGrid}>
                <div className={styles.beforeAfterItem}>
                  <div className={styles.beforeAfterLabel}>
                    <span>⬅️</span>
                    Original
                  </div>
                  <div className={styles.beforeAfterImageWrapper}>
                    <img 
                      src={selectedPreviewUrl} 
                      alt="Before premium restoration" 
                      className={styles.beforeAfterImage}
                    />
                  </div>
                </div>
                <div className={styles.beforeAfterItem}>
                  <div className={styles.beforeAfterLabel}>
                    <span>➡️</span>
                    Premium Result
                  </div>
                  <div className={styles.beforeAfterImageWrapper}>
                    <img 
                      src={restoredUrl} 
                      alt="After premium restoration" 
                      className={styles.beforeAfterImage}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features Grid */}
          <div className={styles.featuresGrid}>
            {[
              { icon: "🌈", title: "Full Colorization", desc: "Transform black & white photos into vibrant color masterpieces" },
              { icon: "🎨", title: "Premium AI", desc: "Advanced neural networks trained on artistic and historical data" },
              { icon: "💎", title: "Studio Quality", desc: "Professional-grade results with exceptional detail and accuracy" }
            ].map((feature, idx) => (
              <div key={idx} className={styles.featureCard}>
                <span className={styles.featureIcon}>{feature.icon}</span>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <BasicFeaturesSection />
      </div>
    </>
  );
}