import React, { useState, useEffect, useRef } from 'react';
import imageCompression from "browser-image-compression";
import { supabase } from "../../lib/supabaseClient";
import useCredits from "../../hooks/useCredits";
import ImageCompareSlider from "../../components/ImageCompareSlider";
import ProgressBar from "../../components/Restores/ProgressBar";
import styles from "../../styles/ModernRestore.module.css";
import toast from 'react-hot-toast';

export default function RestoreBasic() {
  // State management - integrated from original component
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
  
  // Cost per restore in credits
  const restoreCost = 1;
  
  // Hooks
  const { credits, isLoggedIn, refreshCredits, deductCredits } = useCredits();
  
  // Refs
  const fileInputRef = useRef(null);

  // Effects from original component
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

  // Enhanced file selection with compression and toast notifications
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
    
    // Show compression toast
    const compressionToast = toast.loading('Compressing image...', {
      icon: '⚡',
    });
    
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });
      setSelectedFile(compressed);
      setSelectedPreviewUrl(URL.createObjectURL(compressed));
      
      toast.success('Image ready for restoration!', {
        id: compressionToast,
        icon: '✅',
        duration: 2000,
      });
    } catch (compressionError) {
      console.warn('Compression failed, using original file:', compressionError);
      setSelectedFile(file);
      setSelectedPreviewUrl(URL.createObjectURL(file));
      
      toast.success('Image ready for restoration!', {
        id: compressionToast,
        icon: '✅',
        duration: 2000,
      });
    } finally {
      setProcessing(false);
      setProgressStatus("idle");
      setProgressPercent(null);
    }
  };

  // Real restore function with toast notifications
  const handleRestore = async () => {
    if (!selectedFile) {
      toast.error('Please upload an image first', {
        icon: '📤',
        duration: 3000,
      });
      return;
    }
    
    if (credits < restoreCost) {
      toast.error(`You need ${restoreCost} credit to restore this image`, {
        icon: '⚡',
        duration: 4000,
        action: {
          label: isLoggedIn ? 'Get Credits' : 'Sign Up',
          onClick: () => window.location.href = isLoggedIn ? "/pricing" : "/signup"
        }
      });
      return;
    }
    
    setLoading(true);
    setProgressStatus("uploading");
    setProgressPercent(0);
    setError('');
    
    // Show processing toast
    const processingToast = toast.loading('Restoring your photo with AI magic...', {
      icon: '✨',
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
          progress += 10;
          if (progress > 90) clearInterval(interval);
          else setProgressPercent(progress);
        }, 300);

        const response = await fetch("/api/replicate/restore", {
          method: "POST",
          headers,
          body: JSON.stringify({ 
            imageBase64: base64, 
            prompt: "Restore this vintage photo" 
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
          
          // Success toast with upgrade suggestion
          toast.success('Photo restoration complete!', {
            id: processingToast,
            icon: '🎉',
            duration: 5000,
          });
          
          // Delayed upgrade suggestion toast
          setTimeout(() => {
            toast((t) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.5rem' }}>🎨</span>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                    Want even better results?
                  </div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                    Try Full Color Restore for vibrant colors!
                  </div>
                </div>
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    window.location.href = '/replicate/restore-premium';
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
                  Try It ✨
                </button>
              </div>
            ), {
              duration: 8000,
              style: { maxWidth: '400px' }
            });
          }, 2000);
          
          if (isLoggedIn) {
            await refreshCredits();
          } else {
            deductCredits(restoreCost);
          }
        } else {
          toast.error(data.error || "Restoration failed. Please try again.", {
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

  // Download function with toast notifications
  const handleDownload = async () => {
    if (!restoredUrl) return;
    
    const downloadToast = toast.loading('Preparing download...', {
      icon: '⬇️',
    });
    
    try {
      const resp = await fetch(restoredUrl);
      const blob = await resp.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "restored-photo.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('Photo downloaded successfully!', {
        id: downloadToast,
        icon: '📥',
        duration: 3000,
      });
    } catch (downloadError) {
      console.error('Download failed:', downloadError);
      toast.error('Download failed. Please try again.', {
        id: downloadToast,
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
    
    toast.success('Ready for a new photo!', {
      icon: '🔄',
      duration: 2000,
    });
  };

  return (
    <div className={styles.container}>
      {/* Animated Background */}
      <div className={styles.backgroundParticles}></div>

      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          {/* Top Bar with Credits and Pro Tip - Aligned with Badge */}
          <div className={styles.topBar}>
            {/* Compact Credits Section - Top Left */}
            <div className={styles.compactCredits}>
              <div className={styles.compactCreditsInfo}>
                <span className={styles.creditsIcon}>⚡</span>
                <span className={styles.creditsText}>{credits} credits</span>
                <span className={styles.creditsCost}>({restoreCost}/restore)</span>
              </div>
              <button 
                onClick={() => window.location.href = isLoggedIn ? "/pricing" : "/signup"}
                className={styles.compactCreditsButton}
              >
                {isLoggedIn ? "+" : "Sign Up"}
              </button>
            </div>

            <div className={styles.badge}>
              <span>✨</span>
              <span>AI-Powered Photo Restoration</span>
            </div>

            {/* Pro Tip - Top Right */}
            <div className={styles.topProTip}>
              <span className={styles.proTipIcon}>💡</span>
              <span className={styles.proTipText}>
                <strong>Pro Tip:</strong> For old or black & white photos, start with Photo Fix for clarity, then use Full Color Restore to bring it to life.
              </span>
            </div>
          </div>
          
          <h1 className={styles.title}>
            <span className={styles.titleGradient}>PhotoFix</span>
            <span className={styles.subtitle}>AI Studio</span>
          </h1>
          
          <p className={styles.description}>
            Restore old photos to their former glory with advanced AI technology. 
            Remove scratches, enhance colors, and bring memories back to life.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className={styles.mainGrid}>
          {/* Upload Section */}
          <div className={styles.uploadSection}>
            <div className={styles.uploadCard}>
              <h2 className={styles.sectionTitle}>
                <span>📤</span>
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
                      <span style={{ fontSize: '2rem' }}>📁</span>
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

              {/* Action Buttons */}
              <div className={styles.buttonRow}>
                <button
                  onClick={handleRestore}
                  disabled={!selectedFile || loading || processing || credits < restoreCost}
                  className={styles.primaryButton}
                >
                  {loading || processing ? (
                    <>
                      <div className={styles.loadingSpinner}></div>
                      {processing ? 'Compressing...' : 'Restoring...'}
                    </>
                  ) : credits < restoreCost ? (
                    <>
                      {isLoggedIn ? '💳 Buy More Credits' : '🔒 Sign Up to Restore'}
                    </>
                  ) : (
                    <>
                      <span>✨</span>
                      Restore Photo
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

            {/* Progress Display using original ProgressBar component */}
            {progressStatus !== "idle" && (
              <div className={styles.progressCard}>
                <ProgressBar status={progressStatus} percent={progressPercent} />
              </div>
            )}

            {/* Success Notice with Upgrade Option */}
            {showScrollNotice && (
              <div className={`${styles.alert} ${styles.alertSuccess}`}>
                <span>✅</span>
                <div className={styles.alertContent}>
                  <p className={styles.alertTitle}>Your image has been restored!</p>
                  <p className={styles.alertDescription}>Check the results on the right</p>
                </div>
              </div>
            )}

            {/* Upgrade Suggestion - Shows after restoration */}
            {restoredUrl && (
              <div className={styles.upgradeCard}>
                <div className={styles.upgradeContent}>
                  <span className={styles.upgradeIcon}>🎨</span>
                  <div className={styles.upgradeText}>
                    <h4 className={styles.upgradeTitle}>Want Even Better Results?</h4>
                    <p className={styles.upgradeDescription}>
                      Try <strong>Full Color Restore</strong> to add vibrant colors and advanced enhancement to your photo
                    </p>
                  </div>
                  <button 
                    onClick={() => window.location.href = '/replicate/restore-premium'}
                    className={styles.upgradeButton}
                  >
                    Try Full Color ✨
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className={styles.resultsSection}>
            <div className={styles.uploadCard}>
              <div className={styles.resultsHeader}>
                <h2 className={styles.sectionTitle}>
                  <span>👁️</span>
                  Results
                </h2>
                
                {restoredUrl && (
                  <button
                    onClick={handleDownload}
                    className={styles.downloadButton}
                  >
                    <span>⬇️</span>
                    Download
                  </button>
                )}
              </div>

              {restoredUrl && selectedPreviewUrl ? (
                <div>
                  {/* Use original ImageCompareSlider component with proper wrapper */}
                  <div className={styles.comparisonContainer}>
                    <div className={styles.imageComparisonWrapper}>
                      <ImageCompareSlider
                        beforeImage={selectedPreviewUrl}
                        afterImage={restoredUrl}
                      />
                    </div>
                  </div>

                  <div className={`${styles.alert} ${styles.alertSuccess}`} style={{ marginTop: '1rem' }}>
                    <span>✅</span>
                    <p>Photo successfully restored! Use the slider to compare.</p>
                  </div>
                </div>
              ) : (
                <div className={styles.resultsPlaceholder}>
                  <div className={styles.placeholderContent}>
                    <div className={styles.placeholderIcon}>
                      <span style={{ fontSize: '2rem' }}>✨</span>
                    </div>
                    <p className={styles.placeholderText}>Your restored photo will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Before/After Gallery - Shows after restoration */}
        {restoredUrl && selectedPreviewUrl && (
          <div className={styles.beforeAfterGallery}>
            <h3 className={styles.galleryTitle}>
              <span>🖼️</span>
              Before & After Gallery
            </h3>
            <div className={styles.beforeAfterGrid}>
              <div className={styles.beforeAfterItem}>
                <div className={styles.beforeAfterLabel}>
                  <span>⬅️</span>
                  Before
                </div>
                <div className={styles.beforeAfterImageWrapper}>
                  <img 
                    src={selectedPreviewUrl} 
                    alt="Before restoration" 
                    className={styles.beforeAfterImage}
                  />
                </div>
              </div>
              <div className={styles.beforeAfterItem}>
                <div className={styles.beforeAfterLabel}>
                  <span>➡️</span>
                  After
                </div>
                <div className={styles.beforeAfterImageWrapper}>
                  <img 
                    src={restoredUrl} 
                    alt="After restoration" 
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
            { icon: "⚡", title: "Lightning Fast", desc: "Process photos in seconds with our optimized AI models" },
            { icon: "✨", title: "AI Powered", desc: "Advanced neural networks trained on millions of photos" },
            { icon: "⬇️", title: "High Quality", desc: "Download full resolution restored images" }
          ].map((feature, idx) => (
            <div key={idx} className={styles.featureCard}>
              <span className={styles.featureIcon}>{feature.icon}</span>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}