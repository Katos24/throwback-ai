import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import imageCompression from "browser-image-compression";
import { supabase } from "../../lib/supabaseClient";
import useCredits from "../../hooks/useCredits";
import toast from 'react-hot-toast';
import styles from "../../styles/CartoonPage.module.css";

export default function CartoonPage() {
  const router = useRouter();
  
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [loadingTimer, setLoadingTimer] = useState(0);
  const [progress, setProgress] = useState(0);
  const [progressStage, setProgressStage] = useState("");

  // Credits functionality
  const cartoonCost = 40;
  const { credits, isLoggedIn, refreshCredits, deductCredits } = useCredits();

  useEffect(() => {
    async function getSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    }
    getSession();
  }, []);

  // Check if ready to generate
  useEffect(() => {
    setIsReady(photo && !isLoading && isLoggedIn && credits >= cartoonCost);
  }, [photo, isLoading, isLoggedIn, credits, cartoonCost]);

  // Loading timer and progress simulation
  useEffect(() => {
    let interval;
    if (isLoading) {
      setLoadingTimer(0);
      setProgress(0);
      setProgressStage("Preparing your image...");
      
      interval = setInterval(() => {
        setLoadingTimer(prev => {
          const newTimer = prev + 1;
          
          // Simulate realistic progress stages
          if (newTimer <= 5) {
            setProgress(15);
            setProgressStage("Analyzing your photo...");
          } else if (newTimer <= 15) {
            setProgress(35);
            setProgressStage("Applying cartoon style...");
          } else if (newTimer <= 30) {
            setProgress(65);
            setProgressStage("Enhancing details...");
          } else if (newTimer <= 45) {
            setProgress(85);
            setProgressStage("Finalizing your cartoon...");
          } else {
            setProgress(95);
            setProgressStage("Almost ready...");
          }
          
          return newTimer;
        });
      }, 1000);
    } else {
      setLoadingTimer(0);
      setProgress(0);
      setProgressStage("");
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
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

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
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

    setPhoto(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResultImageUrl(null);
    setError(null);
    setUploadSuccess(true);
    
    toast.success('Photo uploaded! Ready for cartoon transformation!', {
      icon: '🎨',
      duration: 2000,
    });
    
    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate([50, 30, 50]);
    }
    
    // Reset upload success animation after it completes
    setTimeout(() => setUploadSuccess(false), 600);
  };

  // Updated function to handle button clicks based on user state
  const handleGenerateOrRedirect = () => {
    // If no photo uploaded
    if (!photo) {
      toast.error('Please upload an image first', {
        icon: '📤',
        duration: 3000,
      });
      return;
    }

    // If not logged in, redirect to signup
    if (!isLoggedIn) {
      router.push('/signup');
      return;
    }
    
    // If not enough credits, redirect to pricing
    if (credits < cartoonCost) {
      router.push('/pricing');
      return;
    }

    // If all conditions met, generate cartoon
    generateCartoon();
  };

  const generateCartoon = async () => {
    // Create abort controller for timeout
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => {
      abortController.abort();
    }, 120000); // 2 minute timeout

    setIsLoading(true);
    setError(null);
    setResultImageUrl(null);

    // Show processing toast
    const processingToast = toast.loading('Creating your 90s cartoon portrait...', {
      icon: '🎨',
    });

    const headers = { "Content-Type": "application/json" };
    if (session?.access_token) {
      headers.Authorization = `Bearer ${session.access_token}`;
    }

    try {
      const compressedFile = await imageCompression(photo, {
        maxSizeMB: 1.0,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
        maxIteration: 10,
        initialQuality: 0.8,
      });

      // Convert to base64
      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.readAsDataURL(compressedFile);
      });

      console.log("Generating cartoon...");

      const response = await fetch("/api/replicate/generateCartoon", {
        method: "POST",
        headers,
        body: JSON.stringify({
          imageBase64: base64,
          prompt: "Convert this to classic 1990s cartoon style with bold black outlines, bright flat colors, simple background, expressive cartoon face, vintage animation look while preserving the person's facial features and identity",
        }),
        signal: abortController.signal,
      });

      // Clear timeout if request completes
      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = `Failed to generate cartoon: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.detail || errorMessage;
        } catch {
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      if (data.imageUrl) {
        setProgress(100);
        setProgressStage("Complete!");
        setResultImageUrl(data.imageUrl);
        
        // Success toast
        toast.success('Cartoon generation complete! Amazing transformation!', {
          id: processingToast,
          icon: '🎨',
          duration: 5000,
        });
        
        // Success haptic feedback
        if (navigator.vibrate) {
          navigator.vibrate([200, 100, 200]);
        }
        
        // Scroll to result
        setTimeout(() => {
          const resultSection = document.querySelector(`.${styles.resultSection}`);
          if (resultSection) {
            resultSection.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
          }
        }, 300);

        // Refresh credits to show updated balance
        await refreshCredits();
      } else {
        console.error("Unexpected response format:", data);
        throw new Error("No image URL returned from server");
      }
    } catch (err) {
      clearTimeout(timeoutId);
      
      console.error("Error generating cartoon:", err);
      
      if (err.name === 'AbortError') {
        toast.error("Request timed out after 2 minutes. Please try again with a smaller image.", {
          id: processingToast,
          icon: '⏰',
          duration: 5000,
        });
      } else {
        toast.error(err.message || "Cartoon generation failed. Please try again.", {
          id: processingToast,
          icon: '❌',
          duration: 5000,
        });
      }
      
      // Error haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 100]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!resultImageUrl) return;
    
    const downloadToast = toast.loading('Preparing download...', {
      icon: '⬇️',
    });
    
    try {
      const resp = await fetch(resultImageUrl);
      const blob = await resp.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `90s-cartoon-portrait-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('Cartoon portrait downloaded!', {
        id: downloadToast,
        icon: '🎨',
        duration: 3000,
      });
      
      // Download success feedback
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
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
    setPhoto(null);
    setPreviewUrl(null);
    setResultImageUrl(null);
    setError(null);
    setUploadSuccess(false);
    setProgress(0);
    setProgressStage("");
    setLoadingTimer(0);
    
    // Reset scroll position
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    toast.success('Ready for a new cartoon transformation!', {
      icon: '🔄',
      duration: 2000,
    });
    
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const getButtonText = () => {
    if (isLoading) return "Creating your cartoon...";
    if (!photo) return "Upload a Photo First";
    if (!isLoggedIn) return "Sign Up to Generate";
    if (credits < cartoonCost) return "Get More Credits";
    return "Generate My 90s Cartoon!";
  };

  const getButtonEmoji = () => {
    if (isLoading) return null;
    if (!photo) return "📷";
    if (!isLoggedIn) return "🔒";
    if (credits < cartoonCost) return "💎";
    return "🚀";
  };

  return (
    <>
      <Head>
        <title>90s Cartoon Portrait Generator | Throwback AI</title>
        <meta name="description" content="Transform your photos into iconic 90s cartoon portraits with AI" />
      </Head>

      <main className={`${styles.container} ${styles.nickelodeon}`}>
        {/* Credits Display */}
        <div className={styles.creditsHeader}>
          <div className={styles.creditsInfo}>
            <span className={styles.creditsIcon}>🎨</span>
            <span className={styles.creditsText}>{credits} credits</span>
          </div>
          <button 
            onClick={() => router.push(isLoggedIn ? "/pricing" : "/signup")}
            className={styles.creditsButton}
          >
            {isLoggedIn ? "+" : "Sign Up"}
          </button>
        </div>

        <div className={styles.hero}>
          <h1 className={styles.title}>
            <span className={styles.titleEmoji}>🎨</span>
            90s Cartoon Portrait Generator
          </h1>
          <p className={styles.subtitle}>
            Transform your photo into a nostalgic 90s cartoon character with our AI-powered transformation.
            <span className={styles.creditPill}>Costs {cartoonCost} credits</span>
          </p>
        </div>

        {error && (
          <div className={styles.errorBanner}>
            <span className={styles.errorText}>⚠️ {error}</span>
            <button onClick={clearError} className={styles.errorClose}>✕</button>
          </div>
        )}

        {/* Main Content - Side by Side Layout */}
        <div className={styles.mainContent}>
          {/* Upload Section */}
          <div className={styles.uploadSection}>
            <div className={styles.uploadCard}>
              <h2 className={styles.uploadTitle}>Upload Your Photo</h2>
              <div 
                className={`${styles.uploadZone} ${dragActive ? styles.dragActive : ''} ${previewUrl ? styles.hasImage : ''} ${uploadSuccess ? styles.uploadSuccess : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('photo-upload').click()}
              >
                {previewUrl ? (
                  <div className={styles.previewContainer}>
                    <img src={previewUrl} alt="Your photo" className={styles.previewImage} />
                    <div className={styles.changePhotoOverlay}>
                      <span>Click to change photo</span>
                    </div>
                  </div>
                ) : (
                  <div className={styles.uploadPrompt}>
                    <div className={styles.uploadIcon}>📷</div>
                    <h3>Drop your photo here</h3>
                    <p>Drag & drop or click to select</p>
                    <small>Best results with clear face photos • PNG, JPG, HEIC up to 10MB</small>
                  </div>
                )}
              </div>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className={styles.hiddenInput}
              />

              <div className={styles.generateSection}>
                <button
                  onClick={handleGenerateOrRedirect}
                  disabled={isLoading}
                  className={`${styles.generateBtn} ${isLoading ? styles.loading : ''} ${
                    isReady ? styles.readyToGenerate : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <span className={styles.spinner}></span>
                      {getButtonText()}
                    </>
                  ) : (
                    <>
                      {getButtonEmoji() && <span>{getButtonEmoji()}</span>}
                      {getButtonText()}
                    </>
                  )}
                </button>
                
                {/* Progress Bar */}
                {isLoading && (
                  <div className={styles.progressContainer}>
                    <div className={styles.progressBar}>
                      <div 
                        className={styles.progressFill}
                        style={{ width: `${progress}%` }}
                      ></div>
                      <div className={styles.progressGlow}></div>
                    </div>
                    <div className={styles.progressText}>
                      <span className={styles.progressStage}>{progressStage}</span>
                      <span className={styles.progressPercent}>{progress}%</span>
                    </div>
                    <div className={styles.progressTimer}>
                      {Math.floor(loadingTimer / 60) > 0 ? `${Math.floor(loadingTimer / 60)}:${(loadingTimer % 60).toString().padStart(2, '0')}` : `${loadingTimer}s`}
                    </div>
                  </div>
                )}
                
                {isLoading && loadingTimer > 60 && (
                  <div className={styles.loadingWarning}>
                    <span>⏳ This is taking longer than usual... Please wait or try again with a different image.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className={styles.resultSection}>
            <h2 className={styles.resultTitle}>Your 90s Cartoon Portrait</h2>
            
            {resultImageUrl ? (
              <div className={styles.resultContainer}>
                <img
                  src={resultImageUrl}
                  alt="90s Cartoon Result"
                  className={styles.resultImage}
                />
                <div className={styles.resultActions}>
                  <button 
                    onClick={handleDownload}
                    className={styles.downloadBtn}
                  >
                    📥 Download
                  </button>
                  <button 
                    onClick={handleReset}
                    className={styles.resetBtn}
                  >
                    🔄 Create Another
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.resultPlaceholder}>
                <div className={styles.placeholderContent}>
                  <div className={styles.placeholderIcon}>🎨</div>
                  <p className={styles.placeholderText}>Your cartoon portrait will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.tipsSection}>
          <h3 className={styles.tipsTitle}>💡 Tips for Best Results</h3>
          <ul className={styles.tipsList}>
            <li>Use photos with clear, well-lit faces facing the camera</li>
            <li>Higher resolution photos generally produce better cartoon results</li>
            <li>Simple backgrounds work better than cluttered ones</li>
            <li>Our AI maintains your identity while applying 90s animation aesthetics</li>
            <li>FLUX technology preserves facial features while transforming the art style</li>
            <li>Works great with both individual portraits and group photos</li>
          </ul>
        </div>
      </main>
    </>
  );
}