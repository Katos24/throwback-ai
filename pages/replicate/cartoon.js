import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import imageCompression from "browser-image-compression";
import { supabase } from "../../lib/supabaseClient";
import styles from "../../styles/CartoonPage.module.css";

const cartoonStyles = [
  {
    id: "classic90s",
    label: "🎨 Classic 90s Cartoon",
    prompt: "Convert this to classic 1990s cartoon style with bold black outlines, bright flat colors, simple background, expressive cartoon face, vintage animation look while preserving the person's facial features and identity"
  },
  {
    id: "disney90s",
    label: "🏰 Disney 90s Style",
    prompt: "Transform this into Disney 1990s animation style with smooth clean lines, vibrant colors, expressive cartoon eyes, classic Disney character design while maintaining the person's original appearance and identity"
  },
  {
    id: "nicktoons",
    label: "📺 Nicktoons Style",
    prompt: "Convert this photo to 1990s Nickelodeon cartoon style with quirky character design, bold outlines, bright saturated colors, distinctive 90s Nick animation aesthetic while keeping the person's original features"
  },
  {
    id: "anime90s",
    label: "✨ 90s Anime Style",
    prompt: "Transform this into 1990s anime style with large expressive eyes, detailed anime hair, soft cel shading, classic 90s anime character design while preserving the person's identity and facial structure"
  },
  {
    id: "sitcom",
    label: "📱 90s Sitcom Cartoon",
    prompt: "Convert this to 1990s sitcom opening credits animation style with simple but expressive cartoon design, bright colors, friendly animation aesthetic while maintaining the original person's appearance"
  },
  {
    id: "comic",
    label: "💥 90s Comic Book",
    prompt: "Transform this photo into 1990s comic book art style with bold line work, dynamic shading, vibrant comic colors, classic comic book illustration aesthetic while preserving the person's identity"
  }
];

export default function CartoonPage() {
  const router = useRouter();
  
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [loadingTimer, setLoadingTimer] = useState(0);
  const [progress, setProgress] = useState(0);
  const [progressStage, setProgressStage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error getting session:", error);
          return;
        }
        if (session?.user) {
          setUserId(session.user.id);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  // Check if ready to generate
  useEffect(() => {
    setIsReady(photo && selectedStyle && !isLoading);
  }, [photo, selectedStyle, isLoading]);

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
    if (file && file.type.startsWith('image/')) {
      setPhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultImageUrl(null);
      setError(null);
      setUploadSuccess(true);
      
      // Add haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate([50, 30, 50]);
      }
      
      // Reset upload success animation after it completes
      setTimeout(() => setUploadSuccess(false), 600);
    } else {
      setError("Please upload a valid image file.");
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
    }
  };

  const handleStyleSelection = (styleId) => {
    setSelectedStyle(styleId);
    setError(null);
    
    // Add haptic feedback for selection
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    // Scroll to generate button if both photo and style are selected
    if (photo) {
      setTimeout(() => {
        const generateSection = document.querySelector(`.${styles.generateSection}`);
        if (generateSection) {
          generateSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 300);
    }
  };

  const generateCartoon = async () => {
    if (!photo || !selectedStyle) {
      const missingItem = !photo ? "photo" : "style";
      setError(`Please ${!photo ? "upload a photo" : "select a style"} first!`);
      
      // Scroll to the missing item
      const targetSection = !photo ? 
        document.querySelector(`.${styles.uploadSection}`) :
        document.querySelector(`.${styles.stylesSection}`);
      
      if (targetSection) {
        targetSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
      
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
      return;
    }

    const selectedCartoonStyle = cartoonStyles.find(style => style.id === selectedStyle);
    
    if (!selectedCartoonStyle) {
      setError("Selected style not found. Please try again.");
      return;
    }

    // Create abort controller for timeout
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => {
      abortController.abort();
    }, 120000); // 2 minute timeout

    try {
      setIsLoading(true);
      setError(null);
      setResultImageUrl(null);

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

      console.log("Generating cartoon with style:", selectedCartoonStyle.label);

      const response = await fetch("/api/replicate/generateCartoon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: base64,
          prompt: selectedCartoonStyle.prompt,
        }),
        signal: abortController.signal, // Add timeout signal
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
      } else {
        console.error("Unexpected response format:", data);
        throw new Error("No image URL returned from server");
      }
    } catch (err) {
      clearTimeout(timeoutId); // Clear timeout on any error
      
      console.error("Error generating cartoon:", err);
      
      if (err.name === 'AbortError') {
        setError("Request timed out after 2 minutes. Please try again with a smaller image or different style.");
      } else {
        setError(`Error generating cartoon: ${err.message}. Please try again.`);
      }
      
      // Error haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 100]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!resultImageUrl) return;
    
    try {
      const selectedCartoonStyle = cartoonStyles.find(style => style.id === selectedStyle);
      const styleName = selectedCartoonStyle ? selectedCartoonStyle.id : 'cartoon';
      const link = document.createElement('a');
      link.href = resultImageUrl;
      link.download = `90s-${styleName}-portrait.png`;
      link.click();
      
      // Download success feedback
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
    } catch (error) {
      console.error("Error downloading image:", error);
      setError("Error downloading image. Please try right-clicking and saving instead.");
    }
  };

  const handleReset = () => {
    setPhoto(null);
    setPreviewUrl(null);
    setResultImageUrl(null);
    setSelectedStyle(null);
    setError(null);
    setUploadSuccess(false);
    setProgress(0);
    setProgressStage("");
    setLoadingTimer(0);
    
    // Reset scroll position
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
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
    if (!selectedStyle) return "Select a Style Above";
    return "Generate My 90s Cartoon!";
  };

  const getButtonEmoji = () => {
    if (isLoading) return null;
    if (!photo) return "📷";
    if (!selectedStyle) return "🎨";
    return "🚀";
  };

  return (
    <>
      <Head>
        <title>90s Cartoon Portrait Generator | Anastasis</title>
        <meta name="description" content="Transform your photos into iconic 90s cartoon portraits with AI" />
      </Head>

      <main className={`${styles.container} ${isDarkTheme ? styles.nickAtNite : styles.nickelodeon}`}>
        <div className={styles.themeToggle}>
          <button 
            onClick={() => setIsDarkTheme(false)}
            className={`${styles.themeBtn} ${!isDarkTheme ? styles.activeTheme : ''}`}
          >
            🧡 Nick
          </button>
          <button 
            onClick={() => setIsDarkTheme(true)}
            className={`${styles.themeBtn} ${isDarkTheme ? styles.activeTheme : ''}`}
          >
            🌙 Nick at Nite
          </button>
        </div>

        <div className={styles.hero}>
          <h1 className={styles.title}>
            <span className={styles.titleEmoji}>🎨</span>
            90s Cartoon Portrait Generator
          </h1>
          <p className={styles.subtitle}>
            Transform your photo into a nostalgic 90s cartoon character! Choose from classic animation styles that defined the decade.
          </p>
        </div>

        {error && (
          <div className={styles.errorBanner}>
            <span className={styles.errorText}>⚠️ {error}</span>
            <button onClick={clearError} className={styles.errorClose}>✕</button>
          </div>
        )}

        <div className={styles.uploadSection}>
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
                <h3>Upload Your Photo</h3>
                <p>Drag & drop or click to select</p>
                <small>Best results with clear face photos</small>
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
        </div>

        <div className={styles.stylesSection}>
          <h2 className={styles.sectionTitle}>Choose Your 90s Cartoon Style</h2>
          
          <div className={styles.stylesGrid}>
            {cartoonStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => handleStyleSelection(style.id)}
                className={`${styles.styleCard} ${selectedStyle === style.id ? styles.selectedStyle : ''}`}
              >
                {selectedStyle === style.id && (
                  <>
                    <div className={styles.selectedIndicator}>
                      <span className={styles.checkmark}>✓</span>
                    </div>
                    <div className={styles.selectedGlow}></div>
                  </>
                )}
                <span className={styles.styleEmoji}>{style.label.split(' ')[0]}</span>
                <span className={styles.styleName}>{style.label.substring(2)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.generateSection}>
          <button
            onClick={generateCartoon}
            disabled={!photo || !selectedStyle || isLoading}
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

        {resultImageUrl && (
          <div className={styles.resultSection}>
            <h2 className={styles.resultTitle}>Your 90s Cartoon Portrait</h2>
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
          </div>
        )}

        <div className={styles.tipsSection}>
          <h3 className={styles.tipsTitle}>💡 Tips for Best Results</h3>
          <ul className={styles.tipsList}>
            <li>Use photos with clear, well-lit faces facing the camera</li>
            <li>Higher resolution photos generally produce better cartoon results</li>
            <li>Simple backgrounds work better than cluttered ones</li>
            <li>Each style maintains your identity while applying 90s animation aesthetics</li>
            <li>FLUX Kontext preserves facial features while transforming the art style</li>
            <li>Try different styles to see which 90s aesthetic suits your photo best</li>
          </ul>
        </div>
      </main>
    </>
  );
}