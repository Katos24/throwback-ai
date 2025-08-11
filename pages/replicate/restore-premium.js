import { useState, useEffect } from "react";
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
import toast from 'react-hot-toast'; // Add toast import

export default function RestorePremium() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPreviewUrl, setSelectedPreviewUrl] = useState(null);
  const [restoredUrl, setRestoredUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [session, setSession] = useState(null);
  const [progressStatus, setProgressStatus] = useState("idle");
  const [progressPercent, setProgressPercent] = useState(null);
  const [showScrollNotice, setShowScrollNotice] = useState(false);

  const { credits, isLoggedIn, refreshCredits, deductCredits } = useCredits();
  const router = useRouter();
  const restoreCost = 40;

  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession();
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

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

    setProgressStatus("compressing");
    setProcessing(true);
    setRestoredUrl("");
    
    // Show compression toast
    const compressionToast = toast.loading('Compressing image for premium restoration...', {
      icon: '⚡',
    });

    try {
      const compressedFile = await imageCompression(file, { 
        maxSizeMB: 1, 
        maxWidthOrHeight: 1024, 
        useWebWorker: true 
      });
      setSelectedFile(compressedFile);
      setSelectedPreviewUrl(URL.createObjectURL(compressedFile));
      
      toast.success('Image ready for premium color restoration!', {
        id: compressionToast,
        icon: '🎨',
        duration: 2000,
      });
    } catch (error) {
      console.error("Image compression error:", error);
      setSelectedFile(file);
      setSelectedPreviewUrl(URL.createObjectURL(file));
      
      toast.success('Image ready for premium color restoration!', {
        id: compressionToast,
        icon: '🎨',
        duration: 2000,
      });
    } finally {
      setProcessing(false);
      setProgressStatus("idle");
      setProgressPercent(null);
    }
  };

  const handleRestoreClick = async () => {
    if (!isLoggedIn) {
      toast.error('Please sign up to access premium color restoration', {
        icon: '🔒',
        duration: 4000,
        action: {
          label: 'Sign Up',
          onClick: () => router.push("/signup")
        }
      });
      return;
    }

    if (credits < restoreCost) {
      toast.error(`You need ${restoreCost} credits for premium color restoration`, {
        icon: '💳',
        duration: 4000,
        action: {
          label: 'Get Credits',
          onClick: () => router.push("/pricing")
        }
      });
      return;
    }

    if (!selectedFile) {
      toast.error('Please upload an image first', {
        icon: '📤',
        duration: 3000,
      });
      return;
    }

    await handleRestore();
  };

  const handleRestore = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setProgressStatus("uploading");
    setProgressPercent(0);

    // Show premium processing toast
    const processingToast = toast.loading('Restoring and colorizing with premium AI...', {
      icon: '🎨',
    });

    const headers = { "Content-Type": "application/json" };
    if (session?.access_token) headers.Authorization = `Bearer ${session.access_token}`;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];
      try {
        let progress = 0;
        const progressInterval = setInterval(() => {
          progress += 10;
          if (progress > 90) clearInterval(progressInterval);
          else setProgressPercent(progress);
        }, 300);

        const response = await fetch("/api/replicate/restorePremium", {
          method: "POST",
          headers,
          body: JSON.stringify({
            imageBase64: base64,
            prompt: "Restore and colorize this vintage photo with premium AI",
          }),
        });

        clearInterval(progressInterval);
        setProgressPercent(100);
        setProgressStatus("processing");
        setProgressPercent(null);

        const data = await response.json();
        if (response.ok && data.imageUrl) {
          setRestoredUrl(data.imageUrl);
          setShowScrollNotice(true);
          setProgressStatus("complete");
          setProgressPercent(100);
          
          // Success toast for premium restoration
          toast.success('Premium color restoration complete!', {
            id: processingToast,
            icon: '🌈',
            duration: 5000,
          });

          // Delayed success details toast
          setTimeout(() => {
            toast.success('Amazing results with premium AI! Your photo now has vibrant colors and enhanced clarity', {
              icon: '✨',
              duration: 5000,
            });
          }, 2000);

          await deductCredits(restoreCost);
          await refreshCredits();
        } else {
          toast.error(data.error || "Premium restoration failed. Please try again.", {
            id: processingToast,
            icon: '❌',
            duration: 5000,
          });
          setProgressStatus("idle");
          setProgressPercent(null);
        }
      } catch (error) {
        console.error(error);
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

  const handleDownload = async () => {
    if (!restoredUrl) return;
    
    const downloadToast = toast.loading('Preparing premium download...', {
      icon: '⬇️',
    });
    
    try {
      const response = await fetch(restoredUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "restored-photo-premium.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('Premium restored photo downloaded!', {
        id: downloadToast,
        icon: '🎨',
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
    setProgressStatus("idle");
    setProgressPercent(null);
    
    // Reset file input
    const fileInput = document.getElementById('file-upload');
    if (fileInput) {
      fileInput.value = '';
    }
    
    toast.success('Ready for a new premium restoration!', {
      icon: '🔄',
      duration: 2000,
    });
  };

  return (
    <main>
      <section className={styles.topBanner}>
        <div className={styles.topBannerContent}>
          <div className={styles.topBannerTop}>
            <h2 className={styles.topBannerTitle}>Full Color Restore (Premium)</h2>
            <p className={styles.topBannerDescription}>
              Inspired by the spirit of <em>Anastasis</em>, our AI revives cherished moments with color, clarity, and cultural soul.
            </p>

           {/* Grid container for credits + upload + button */}
            <div className={styles.controlsGrid}>
              {/* Replaced with CreditsInfo component */}
              <CreditsInfo credits={credits} restoreCost={restoreCost} />

              {/* Upload & Button Column */}
              <div className={styles.uploadAndButtonColumn}>
                {/* Upload photo box */}
                <label htmlFor="file-upload" className={styles.uploadBox}>
                  {selectedPreviewUrl ? (
                    <img src={selectedPreviewUrl} alt="Selected preview" className={styles.uploadPreview} />
                  ) : (
                    <div className={styles.uploadPlaceholder}>
                      <span>📤 Upload your photo</span>
                      <small>Click or drag and drop</small>
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

                {/* Restore Button Row */}
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', width: '100%' }}>
                  <button
                    className={styles.topBannerButton}
                    onClick={handleRestoreClick}
                    disabled={loading || processing}
                    style={{ flex: 1 }}
                    title={!selectedFile ? "Please upload a file first" : ""}
                  >
                    {(loading || processing) ? (
                      <>
                        <div className={styles.spinner} />
                        <span className={styles.loadingText}>Please wait, this may take up to a minute...</span>
                      </>
                    ) : !isLoggedIn ? (
                      "🔒 Sign up to Restore Premium"
                    ) : credits < restoreCost ? (
                      "💳 Buy More Credits"
                    ) : (
                      `Click to Restore (${restoreCost} credits)`
                    )}
                  </button>
                  
                  {(selectedFile || restoredUrl) && (
                    <button
                      onClick={handleReset}
                      disabled={loading || processing}
                      style={{
                        padding: '0.75rem 1rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontSize: '1rem',
                        minWidth: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Reset and start over"
                      onMouseOver={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                        e.target.style.transform = 'translateY(-2px)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      🔄
                    </button>
                  )}
                </div>

                {/* Show progress bar during processing */}
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

          {/* Scroll notice after restoration */}
          {showScrollNotice && (
            <section>
              <div className={styles.scrollNotice}>
                ✅ Your image has been restored!<br />
                📲 Scroll down to see the before & after comparison.
              </div>
            </section>
          )}

          <div className={styles.topBannerImages}>
            <div className={styles.imageBox}>
              <strong>Before</strong>
              <div className={styles.imageWrapper}>
                {selectedPreviewUrl ? (
                  <Image
                    src={selectedPreviewUrl}
                    alt="Before upload preview"
                    className={styles.image}
                    style={{ objectFit: "contain" }}
                    width={400}
                    height={300}
                    unoptimized={true}
                  />
                ) : (
                  <span className={styles.placeholderText}>Upload an image</span>
                )}
              </div>
            </div>

            <div className={styles.imageBox}>
              <strong>After</strong>
              <div className={styles.imageWrapper}>
                {restoredUrl ? (
                  <img src={restoredUrl} alt="Restored" className={styles.image} loading="lazy" />
                ) : (
                  <span className={styles.placeholderText}>No restored image yet</span>
                )}
              </div>
              {restoredUrl && (
                <button onClick={handleDownload} className={styles.downloadButton}>
                  ⬇️ Download
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {selectedPreviewUrl && restoredUrl && (
        <section
          style={{
            position: "relative",
            padding: "3rem 1rem",
            backgroundColor: "#1a1a1a",
            color: "white",
            borderTop: "1px solid #333",
          }}
        >
          {/* Animated Background */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "radial-gradient(circle at center, rgba(0,123,255,0.15), transparent 70%)",
              animation: "pulseGlow 6s ease-in-out infinite",
              zIndex: 0,
            }}
          />

          <h2 style={{ textAlign: "center", marginBottom: "1.5rem", position: "relative", zIndex: 1 }}>
            Your Restoration Preview
          </h2>

          <div style={{ position: "relative", zIndex: 1 }}>
            <ImageCompareSlider beforeImage={selectedPreviewUrl} afterImage={restoredUrl} />
          </div>
        </section>
      )}

      <BasicFeaturesSection />
    </main>
  );
}