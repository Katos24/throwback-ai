import { useState, useEffect, useCallback } from "react";
import imageCompression from "browser-image-compression";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import useCredits from "../../hooks/useCredits";
import styles from "../../styles/AiPage.module.css";
import ImageCompareSlider from "../../components/ImageCompareSlider";
import Link from "next/link";
import Image from "next/image";
import ProgressBar from "../../components/Restores/ProgressBar.jsx";
import BasicFeaturesSection from "../../components/Restores/BasicFeaturesSection";
import CreditsInfo from "../../components/Restores/CreditsInfo";
import toast from 'react-hot-toast';

export default function RestorePremium() {
  // Core State
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPreviewUrl, setSelectedPreviewUrl] = useState(null);
  const [restoredUrl, setRestoredUrl] = useState("");
  const [session, setSession] = useState(null);
  
  // Processing State
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progressStatus, setProgressStatus] = useState("idle");
  const [progressPercent, setProgressPercent] = useState(null);
  
  // UI State
  const [showScrollNotice, setShowScrollNotice] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const { credits, isLoggedIn, refreshCredits, deductCredits } = useCredits();
  const router = useRouter();
  const restoreCost = 40;

  // Initialize session
  useEffect(() => {
    async function initializeAuth() {
      setAuthLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setAuthLoading(false);
      }
    }
    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Auto-scroll to results
  useEffect(() => {
    if (restoredUrl) {
      const timer = setTimeout(() => {
        window.scrollTo({ top: 600, behavior: "smooth" });
        setShowScrollNotice(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [restoredUrl]);

  // Hide scroll notice
  useEffect(() => {
    if (showScrollNotice) {
      const timer = setTimeout(() => setShowScrollNotice(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [showScrollNotice]);

  // Get button configuration based on state
  const getButtonConfig = useCallback(() => {
    if (authLoading) {
      return {
        text: "Loading...",
        disabled: true,
        icon: "⏳",
        action: null
      };
    }

    if (loading || processing) {
      return {
        text: "Processing...",
        disabled: true,
        icon: "🎨",
        action: null,
        showSpinner: true
      };
    }

    if (!isLoggedIn) {
      return {
        text: "Sign Up for Premium Restoration",
        disabled: false,
        icon: "🚀",
        action: () => router.push("/signup"),
        className: styles.signupButton
      };
    }

    if (credits < restoreCost) {
      return {
        text: `Get Credits (Need ${restoreCost})`,
        disabled: false,
        icon: "💳",
        action: () => router.push("/pricing"),
        className: styles.creditsButton
      };
    }

    if (!selectedFile) {
      return {
        text: "Upload Photo First",
        disabled: true,
        icon: "📤",
        action: null
      };
    }

    return {
      text: `Begin Premium Restoration (${restoreCost} credits)`,
      disabled: false,
      icon: "✨",
      action: handleRestore,
      className: styles.primaryButton
    };
  }, [authLoading, loading, processing, isLoggedIn, credits, restoreCost, selectedFile, router]);

  // Enhanced file validation
  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/heif', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type.toLowerCase())) {
      toast.error('Please upload a valid image file (JPG, PNG, HEIC, WebP)', {
        icon: '🖼️',
        duration: 4000,
      });
      return false;
    }
    
    if (file.size > maxSize) {
      toast.error('File size must be under 10MB', {
        icon: '📏',
        duration: 4000,
      });
      return false;
    }

    return true;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!validateFile(file)) return;

    setProgressStatus("compressing");
    setProcessing(true);
    setRestoredUrl("");
    
    const compressionToast = toast.loading('Optimizing image for premium AI restoration...', {
      icon: '⚡',
    });

    try {
      const compressedFile = await imageCompression(file, { 
        maxSizeMB: 1, 
        maxWidthOrHeight: 1024, 
        useWebWorker: true,
        preserveExif: true
      });
      
      setSelectedFile(compressedFile);
      setSelectedPreviewUrl(URL.createObjectURL(compressedFile));
      
      toast.success('Image ready for premium restoration!', {
        id: compressionToast,
        icon: '🎨',
        duration: 2000,
      });
    } catch (error) {
      console.error("Image compression error:", error);
      // Fallback to original file if compression fails
      setSelectedFile(file);
      setSelectedPreviewUrl(URL.createObjectURL(file));
      
      toast.success('Image loaded successfully!', {
        id: compressionToast,
        icon: '📷',
        duration: 2000,
      });
    } finally {
      setProcessing(false);
      setProgressStatus("idle");
      setProgressPercent(null);
    }
  };

  const handleRestore = async () => {
    if (!selectedFile) {
      toast.error('Please upload an image first', { icon: '📤' });
      return;
    }

    if (!isLoggedIn) {
      toast.error('Please sign up to access premium restoration', {
        icon: '🔒',
        action: {
          label: 'Sign Up',
          onClick: () => router.push("/signup")
        }
      });
      return;
    }

    if (credits < restoreCost) {
      toast.error(`You need ${restoreCost} credits for premium restoration`, {
        icon: '💳',
        action: {
          label: 'Get Credits',
          onClick: () => router.push("/pricing")
        }
      });
      return;
    }

    setLoading(true);
    setProgressStatus("uploading");
    setProgressPercent(0);

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
        // Simulate progress for better UX
        let progress = 0;
        const progressInterval = setInterval(() => {
          progress += Math.random() * 15;
          if (progress > 85) {
            clearInterval(progressInterval);
          } else {
            setProgressPercent(Math.min(progress, 85));
          }
        }, 800);

        const response = await fetch("/api/replicate/restorePremium", {
          method: "POST",
          headers,
          body: JSON.stringify({
            imageBase64: base64,
            prompt: "Restore and colorize this vintage photo with premium AI for stunning results",
          }),
        });

        clearInterval(progressInterval);
        setProgressPercent(95);
        setProgressStatus("processing");

        const data = await response.json();
        
        if (response.ok && data.imageUrl) {
          setProgressPercent(100);
          setProgressStatus("complete");
          setRestoredUrl(data.imageUrl);
          
          toast.success('Premium restoration complete! Amazing results achieved!', {
            id: processingToast,
            icon: '🌈',
            duration: 5000,
          });

          // Delayed celebration toast
          setTimeout(() => {
            toast.success('Your photo now has vibrant colors and enhanced clarity ✨', {
              icon: '🎉',
              duration: 4000,
            });
          }, 2000);

          // Deduct credits
          await deductCredits(restoreCost);
          await refreshCredits();
          
        } else {
          throw new Error(data.error || "Premium restoration failed");
        }
      } catch (error) {
        console.error('Restoration error:', error);
        
        let errorMessage = "Restoration failed. Please try again.";
        if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = "Network error. Please check your connection.";
        } else if (error.message.includes('credits')) {
          errorMessage = "Credit error. Please refresh and try again.";
        }
        
        toast.error(errorMessage, {
          id: processingToast,
          icon: '❌',
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

  const handleDownload = async () => {
    if (!restoredUrl) return;
    
    const downloadToast = toast.loading('Preparing your premium restoration...', {
      icon: '⬇️',
    });
    
    try {
      const response = await fetch(restoredUrl);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `premium-restored-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('Premium restored photo downloaded!', {
        id: downloadToast,
        icon: '🎨',
        duration: 3000,
      });
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Download failed. Please try again or right-click the image to save.', {
        id: downloadToast,
        icon: '❌',
        duration: 5000,
      });
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setSelectedPreviewUrl(null);
    setRestoredUrl("");
    setShowScrollNotice(false);
    setProgressStatus("idle");
    setProgressPercent(null);
    
    // Reset file input
    const fileInput = document.getElementById('file-upload');
    if (fileInput) fileInput.value = '';
    
    toast.success('Ready for a new premium restoration!', {
      icon: '🔄',
      duration: 2000,
    });
  };

  const buttonConfig = getButtonConfig();

  return (
    <main>
      <section className={styles.topBanner}>
        <div className={styles.topBannerContent}>
          <div className={styles.topBannerTop}>
            <h2 className={styles.topBannerTitle}>Premium Color Restoration</h2>
            <p className={styles.topBannerDescription}>
              Transform black & white photos into stunning color masterpieces with our premium AI technology. 
              Inspired by <em>Anastasis</em> - bringing memories back to life with extraordinary detail and vibrant colors.
            </p>

            {/* Enhanced Controls Grid */}
            <div className={styles.controlsGrid}>
              <CreditsInfo credits={credits} restoreCost={restoreCost} />

              <div className={styles.uploadAndButtonColumn}>
                {/* Enhanced Upload Box */}
                <label 
                  htmlFor="file-upload" 
                  className={`${styles.uploadBox} ${processing ? styles.uploadProcessing : ''}`}
                >
                  {selectedPreviewUrl ? (
                    <div className={styles.previewContainer}>
                      <img 
                        src={selectedPreviewUrl} 
                        alt="Selected preview" 
                        className={styles.uploadPreview} 
                      />
                      <div className={styles.previewOverlay}>
                        <span>Click to change photo</span>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.uploadPlaceholder}>
                      <div className={styles.uploadIcon}>📤</div>
                      <span className={styles.uploadText}>Upload Your Photo</span>
                      <small className={styles.uploadSubtext}>
                        JPG, PNG, HEIC up to 10MB
                      </small>
                    </div>
                  )}
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={loading || processing}
                    className={styles.fileInput}
                  />
                </label>

                {/* Enhanced Button Row */}
                <div className={styles.buttonRow}>
                  <button
                    className={`${styles.actionButton} ${buttonConfig.className || ''}`}
                    onClick={buttonConfig.action}
                    disabled={buttonConfig.disabled}
                    title={buttonConfig.disabled && !authLoading ? "Complete the requirements above" : ""}
                  >
                    {buttonConfig.showSpinner ? (
                      <>
                        <div className={styles.spinner} />
                        <span>Processing your premium restoration...</span>
                      </>
                    ) : (
                      <>
                        <span className={styles.buttonIcon}>{buttonConfig.icon}</span>
                        <span>{buttonConfig.text}</span>
                      </>
                    )}
                  </button>
                  
                  {(selectedFile || restoredUrl) && (
                    <button
                      onClick={handleReset}
                      disabled={loading || processing}
                      className={styles.resetButton}
                      title="Start over with a new photo"
                    >
                      🔄
                    </button>
                  )}
                </div>

                {/* Enhanced Progress Display */}
                {progressStatus !== "idle" && (
                  <div className={styles.progressWrapper}>
                    <ProgressBar 
                      status={progressStatus} 
                      percent={progressPercent} 
                      showSteps={true}
                      loading={loading || processing}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Scroll Notice */}
          {showScrollNotice && (
            <div className={styles.successBanner}>
              <div className={styles.successContent}>
                <span className={styles.successIcon}>🎉</span>
                <div>
                  <strong>Premium Restoration Complete!</strong>
                  <p>Scroll down to see your amazing before & after comparison</p>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Image Preview */}
          <div className={styles.topBannerImages}>
            <div className={styles.imageBox}>
              <div className={styles.imageHeader}>
                <strong>Before</strong>
                {selectedFile && (
                  <span className={styles.imageInfo}>
                    {(selectedFile.size / 1024 / 1024).toFixed(1)}MB
                  </span>
                )}
              </div>
              <div className={styles.imageWrapper}>
                {selectedPreviewUrl ? (
                  <Image
                    src={selectedPreviewUrl}
                    alt="Original photo"
                    className={styles.image}
                    style={{ objectFit: "contain" }}
                    width={400}
                    height={300}
                    unoptimized={true}
                  />
                ) : (
                  <div className={styles.imagePlaceholder}>
                    <span className={styles.placeholderIcon}>🖼️</span>
                    <span className={styles.placeholderText}>Upload an image</span>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.imageBox}>
              <div className={styles.imageHeader}>
                <strong>After</strong>
                {restoredUrl && (
                  <span className={styles.imageInfo}>Premium AI</span>
                )}
              </div>
              <div className={styles.imageWrapper}>
                {restoredUrl ? (
                  <img 
                    src={restoredUrl} 
                    alt="Premium restored photo" 
                    className={styles.image} 
                    loading="lazy" 
                  />
                ) : (
                  <div className={styles.imagePlaceholder}>
                    <span className={styles.placeholderIcon}>✨</span>
                    <span className={styles.placeholderText}>
                      {loading ? "Restoring..." : "Premium result will appear here"}
                    </span>
                  </div>
                )}
              </div>
              {restoredUrl && (
                <button onClick={handleDownload} className={styles.downloadButton}>
                  <span>⬇️</span>
                  Download Premium Result
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Comparison Section */}
      {selectedPreviewUrl && restoredUrl && (
        <section className={styles.comparisonSection}>
          <div className={styles.comparisonHeader}>
            <h2>Your Premium Transformation</h2>
            <p>Drag the slider to see the incredible difference our premium AI makes</p>
          </div>
          <div className={styles.comparisonContainer}>
            <ImageCompareSlider 
              beforeImage={selectedPreviewUrl} 
              afterImage={restoredUrl}
              className={styles.premiumComparison}
            />
          </div>
        </section>
      )}

      <BasicFeaturesSection />
    </main>
  );
}