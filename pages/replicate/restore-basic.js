import React, { useState, useEffect, useRef } from 'react';
import imageCompression from "browser-image-compression";
import { supabase } from "../../lib/supabaseClient";
import useCredits from "../../hooks/useCredits";
import ImageCompareSlider from "../../components/ImageCompareSlider";
import ProgressBar from "../../components/Restores/ProgressBar";
import styles from "../../styles/ModernRestore.module.css";

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

  // Enhanced file selection with compression (from original component)
  const handleFileSelection = async (file) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (PNG, JPG, HEIC)');
      return;
    }
    
    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be under 10MB');
      return;
    }
    
    setError('');
    setProgressStatus("compressing");
    setProcessing(true);
    setRestoredUrl("");
    
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });
      setSelectedFile(compressed);
      setSelectedPreviewUrl(URL.createObjectURL(compressed));
    } catch (compressionError) {
      console.warn('Compression failed, using original file:', compressionError);
      setSelectedFile(file);
      setSelectedPreviewUrl(URL.createObjectURL(file));
    } finally {
      setProcessing(false);
      setProgressStatus("idle");
      setProgressPercent(null);
    }
  };

  // Real restore function from original component
  const handleRestore = async () => {
    if (!selectedFile) {
      setError("Please upload an image first.");
      return;
    }
    
    if (credits < restoreCost) {
      window.location.href = isLoggedIn ? "/pricing" : "/signup";
      return;
    }
    
    setLoading(true);
    setProgressStatus("uploading");
    setProgressPercent(0);
    setError('');
    
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
          if (isLoggedIn) {
            await refreshCredits();
          } else {
            deductCredits(restoreCost);
          }
        } else {
          setError(data.error || "Restore failed. Please try again.");
          setProgressStatus("idle");
          setProgressPercent(null);
        }
      } catch (networkError) {
        console.error('Network/server error:', networkError);
        setError("Network or server error. Please check your connection and try again.");
        setProgressStatus("idle");
        setProgressPercent(null);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  // Real download function from original component
  const handleDownload = async () => {
    if (!restoredUrl) return;
    
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
    } catch (downloadError) {
      console.error('Download failed:', downloadError);
      setError('Download failed. Please try again.');
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
  };

  return (
    <div className={styles.container}>
      {/* Animated Background */}
      <div className={styles.backgroundParticles}></div>

      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span>✨</span>
            <span>AI-Powered Photo Restoration</span>
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

        {/* Credits Banner */}
        <div className={styles.creditsBanner}>
          <div className={styles.creditsRow}>
            <div className={styles.creditsInfo}>
              <div className={styles.creditsCount}>
                <span>⚡</span>
                <span>Credits: {credits}</span>
              </div>
              <div className={styles.creditsCost}>Cost per restore: {restoreCost} credit</div>
            </div>
            <button 
              onClick={() => window.location.href = isLoggedIn ? "/pricing" : "/signup"}
              className={styles.creditsButton}
            >
              {isLoggedIn ? "Get More Credits" : "Sign Up"}
            </button>
          </div>
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

              {/* Error Display */}
              {error && (
                <div className={`${styles.alert} ${styles.alertError}`}>
                  <span>⚠️</span>
                  <p>{error}</p>
                </div>
              )}

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

            {/* Success Notice */}
            {showScrollNotice && (
              <div className={`${styles.alert} ${styles.alertSuccess}`}>
                <span>✅</span>
                <div className={styles.alertContent}>
                  <p className={styles.alertTitle}>Your image has been restored!</p>
                  <p className={styles.alertDescription}>Check the results on the right</p>
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