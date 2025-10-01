// pages/replicate/halloween.js

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/router";
import imageCompression from "browser-image-compression";
import { supabase } from "../../lib/supabaseClient";
import useCredits from "../../hooks/useCredits";
import styles from "../../styles/HalloweenPage.module.css";
import toast from 'react-hot-toast';

const HALLOWEEN_COST = 50;

export default function HalloweenPage() {
  const router = useRouter();
  
  // State management
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPreviewUrl, setSelectedPreviewUrl] = useState(null);
  const [restoredUrl, setRestoredUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [session, setSession] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressStage, setProgressStage] = useState("");
  
  // UI state
  const [dragActive, setDragActive] = useState(false);
  const [showingOriginal, setShowingOriginal] = useState(false);
  
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
    if (restoredUrl) {
      setTimeout(() => {
        const resultElement = document.querySelector(`.${styles.resultSection}`);
        if (resultElement && window.innerWidth < 768) {
          resultElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
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

  // File selection
  const handleFileSelection = async (file) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file (PNG, JPG)', {
        icon: '🖼️',
        duration: 4000,
      });
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be under 10MB', {
        icon: '📏',
        duration: 4000,
      });
      return;
    }
    
    setProcessing(true);
    setRestoredUrl("");
    
    const compressionToast = toast.loading('Optimizing your photo...', {
      icon: '🎃',
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
      
      toast.success('Image ready for face swap!', {
        id: compressionToast,
        icon: '👻',
        duration: 2000,
      });
    } catch (compressionError) {
      console.warn('Compression failed, using original file:', compressionError);
      setSelectedFile(file);
      setSelectedPreviewUrl(URL.createObjectURL(file));
      
      toast.success('Image ready for face swap!', {
        id: compressionToast,
        icon: '👻',
        duration: 2000,
      });
    } finally {
      setProcessing(false);
    }
  };

  // Handle button clicks based on user state
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
    if (credits < HALLOWEEN_COST) {
      router.push('/pricing');
      return;
    }
    handleFaceSwap();
  };

  // Button text helper
  const getButtonText = () => {
    if (loading || processing) {
      if (processing) return "Optimizing image...";
      return "Swapping faces...";
    }
    if (!selectedFile) return "Upload a Photo First";
    if (!isLoggedIn) return "Sign Up to Start";
    if (credits < HALLOWEEN_COST) return `Get Credits (Need ${HALLOWEEN_COST})`;
    return `🎃 SWAP FACE - ${HALLOWEEN_COST} CREDITS`;
  };

  // Face swap function
  const handleFaceSwap = async () => {
    setLoading(true);
    setProgressPercent(0);
    setProgressStage("Uploading your photo...");
    
    const processingToast = toast.loading('Swapping your face into the Ghostface scene...', {
      icon: '👻',
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
          if (progress > 85) {
            clearInterval(interval);
            setProgressStage("Finalizing your spooky transformation...");
          } else {
            setProgressPercent(progress);
            if (progress < 40) setProgressStage("Uploading to face swap...");
            else if (progress < 70) setProgressStage("Swapping faces...");
          }
        }, 400);

        const response = await fetch("/api/replicate/generate-faceswap", {
          method: "POST",
          headers,
          body: JSON.stringify({ 
            imageBase64: base64
          }),
        });

        clearInterval(interval);
        setProgressPercent(100);
        setProgressStage("Complete! 🎃");
        
        const data = await response.json();
        if (response.ok && data.imageUrl) {
          setRestoredUrl(data.imageUrl);
          
          toast.success('Face swap complete! You look spooky!', {
            id: processingToast,
            icon: '🎃',
            duration: 5000,
          });
          
          await refreshCredits();
          await deductCredits(HALLOWEEN_COST);
        } else {
          toast.error(data.error || "Face swap failed. Please try again.", {
            id: processingToast,
            icon: '❌',
            duration: 5000,
          });
        }
      } catch (networkError) {
        console.error('Network/server error:', networkError);
        toast.error("Network error. Please check your connection and try again.", {
          id: processingToast,
          icon: '🌐',
          duration: 5000,
        });
      } finally {
        setLoading(false);
        setTimeout(() => {
          setProgressPercent(0);
          setProgressStage("");
        }, 1000);
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  // Download function
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
      a.download = `ghostface-halloween-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('Downloaded!', {
        id: downloadToast,
        icon: '🎃',
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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    toast.success('Ready for a new face swap!', {
      icon: '🔄',
      duration: 2000,
    });
  };

  const isComplete = selectedFile && isLoggedIn && credits >= HALLOWEEN_COST;

  return (
    <main className={styles.container}>
      {/* Spooky Background Effects */}
      <div className={styles.halloweenBg}></div>
      <div className={styles.pumpkinFloat}>
        {['🎃', '👻', '🦇', '🕷️'].map((emoji, index) => (
          <div 
            key={index}
            className={styles.floatingEmoji} 
            style={{
              left: `${15 + index * 25}%`, 
              animationDelay: `${index * 0.7}s`
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* Credits Header */}
      <div className={styles.creditsHeader}>
        <div className={styles.creditsInfo}>
          <span>👻</span>
          <span>Credits: <strong>{credits || 0}</strong></span>
        </div>
        <button 
          className={styles.creditsBtn}
          onClick={() => router.push(isLoggedIn ? "/pricing" : "/signup")}
        >
          {isLoggedIn ? "Get More Credits" : "Sign Up"}
        </button>
      </div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <h1 className={styles.title}>🎃 GHOSTFACE HALLOWEEN 🎃</h1>
        <p className={styles.subtitle}>Swap your face into the viral Ghostface scene</p>
        <div className={styles.costBadge}>
          ⚡ {HALLOWEEN_COST} Credits per swap
        </div>
      </section>

      {/* Template Preview */}
      <section className={styles.templateSection}>
        <div className={styles.templateCard}>
          <h3 className={styles.templateTitle}>👻 The Viral Ghostface Scene</h3>
          <div className={styles.templatePreview}>
            <div className={styles.templatePlaceholder}>
              <div className={styles.placeholderIcon}>📸</div>
              <div className={styles.placeholderText}>
                Girl blowing bubble gum with Ghostface lurking behind
              </div>
              <div className={styles.viralTag}>🔥 TRENDING NOW</div>
            </div>
          </div>
          <p className={styles.templateDescription}>
            Recreate the viral Halloween aesthetic! Your face will be swapped into this iconic spooky scene with vintage horror vibes, complete with retro room decor and the infamous Ghostface mask.
          </p>
        </div>
      </section>

      {/* Main Content: Upload + Result */}
      <section className={styles.mainContent}>
        {/* Upload Section */}
        <div className={styles.uploadSection}>
          <h2 className={styles.sectionTitle}>
            <span>📸</span> UPLOAD YOUR PHOTO
          </h2>
          <div 
            className={`${styles.uploadBox} ${dragActive ? styles.uploadBoxDragActive : ''}`}
            onClick={() => !selectedPreviewUrl && fileInputRef.current?.click()}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              disabled={loading || processing}
              style={{ display: 'none' }}
            />
            
            {selectedPreviewUrl ? (
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <img 
                  src={selectedPreviewUrl}
                  alt="Preview" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain',
                    borderRadius: '8px'
                  }}
                />
                {loading && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.8)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px'
                  }}>
                    <div style={{ 
                      width: '80%', 
                      height: '8px', 
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      marginBottom: '15px'
                    }}>
                      <div style={{
                        width: `${progressPercent}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #ff6b00, #ff8c00)',
                        transition: 'width 0.3s ease'
                      }}></div>
                    </div>
                    <div style={{ color: '#fff', fontSize: '14px' }}>
                      {progressStage}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '60px', marginBottom: '20px', opacity: 0.5 }}>📤</div>
                <div style={{ fontSize: '18px', color: '#ccc', marginBottom: '10px' }}>
                  Drag & Drop or Click to Upload
                </div>
                <div style={{ fontSize: '14px', color: '#888' }}>
                  PNG, JPG up to 10MB
                </div>
              </div>
            )}
            
            {dragActive && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(255, 107, 0, 0.2)',
                border: '3px dashed #ff6b00',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 'bold'
              }}>
                Drop to upload!
              </div>
            )}
          </div>
        </div>

        {/* Result Section */}
        <div className={styles.resultSection}>
          <h2 className={styles.sectionTitle}>
            <span>👻</span> YOUR GHOSTFACE RESULT
          </h2>
          <div className={styles.resultBox}>
            {restoredUrl ? (
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <img 
                  src={showingOriginal ? selectedPreviewUrl : restoredUrl}
                  alt="Result" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain',
                    borderRadius: '8px'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '10px'
                }}>
                  <button 
                    onClick={() => setShowingOriginal(!showingOriginal)}
                    style={{
                      background: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    👁️ {showingOriginal ? 'Show Result' : 'Show Original'}
                  </button>
                  <button 
                    onClick={handleDownload}
                    style={{
                      background: 'rgba(255, 107, 0, 0.9)',
                      border: '1px solid #ff8c00',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}
                  >
                    ⬇️ Download
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.resultPlaceholder}>
                <div className={styles.placeholderIcon}>🎃</div>
                <div className={styles.placeholderText}>
                  Your spooky result will appear here
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Generate Button */}
      <section className={styles.generateSection}>
        <button
          onClick={handleGenerateOrRedirect}
          disabled={loading || processing}
          style={{
            background: (loading || processing) ? '#666' : 'linear-gradient(135deg, #ff6b00, #ff4400)',
            border: 'none',
            padding: '18px 60px',
            borderRadius: '12px',
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
            cursor: (loading || processing) ? 'not-allowed' : 'pointer',
            boxShadow: '0 8px 30px rgba(255, 107, 0, 0.4)',
            transition: 'all 0.3s ease',
            opacity: (loading || processing) ? 0.7 : 1,
            width: '100%',
            maxWidth: '500px'
          }}
        >
          {getButtonText()}
        </button>
        {(selectedFile || restoredUrl) && (
          <button
            onClick={handleReset}
            disabled={loading || processing}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '12px 24px',
              borderRadius: '8px',
              color: 'white',
              cursor: (loading || processing) ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              marginTop: '15px'
            }}
          >
            🔄 Reset
          </button>
        )}
      </section>
    </main>
  );
}