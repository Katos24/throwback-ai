import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { supabase } from "../../lib/supabaseClient";
import useCredits from "../../hooks/useCredits";
import toast from 'react-hot-toast';
import styles from "../../styles/AvatarPage.module.css";
import AVATAR_STYLES from "../../components/AvatarStyles";
import SEOAvatar from "../../components/SEO/SEOAvatar";

export default function AiAvatarsTest() {
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

  const [user_gender, setGender] = useState("");
  const [styleCategory, setStyleCategory] = useState("portrait");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [styleStrength, setStyleStrength] = useState(20);
  const [workflowType, setWorkflowType] = useState("HyperRealistic-likeness");

  // Credits functionality
  const avatarCost = 50;
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
    const hasValidInputs = user_gender && selectedStyle;
    
    setIsReady(photo && !isLoading && isLoggedIn && credits >= avatarCost && hasValidInputs);
  }, [photo, isLoading, isLoggedIn, credits, avatarCost, user_gender, selectedStyle]);

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
          
          if (newTimer <= 5) {
            setProgress(15);
            setProgressStage("Analyzing your photo...");
          } else if (newTimer <= 15) {
            setProgress(35);
            setProgressStage("Applying avatar style...");
          } else if (newTimer <= 30) {
            setProgress(65);
            setProgressStage("Enhancing details...");
          } else if (newTimer <= 45) {
            setProgress(85);
            setProgressStage("Finalizing your avatar...");
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
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file (PNG, JPG, HEIC)', {
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

    console.log("Original file size (MB):", file.size / 1024 / 1024);
    setPhoto(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResultImageUrl(null);
    setError(null);
    setUploadSuccess(true);
    
    toast.success('Photo uploaded! Ready for avatar transformation!', {
      icon: '🎭',
      duration: 2000,
    });
    
    if (navigator.vibrate) {
      navigator.vibrate([50, 30, 50]);
    }
    
    setTimeout(() => setUploadSuccess(false), 600);
  };

  const buildPrompt = () => {
    let prompt = "";
    if (user_gender) prompt += `${user_gender} `;
    if (selectedStyle) {
      prompt += selectedStyle;
    } else {
      prompt += "professional portrait, high quality, detailed";
    }
    prompt += ", IMPORTANT: preserve exact facial features, skin tone, ethnicity, and bone structure";
    return prompt;
  };

  const generateAvatar = async () => {
    if (!photo) {
      toast.error('Please upload an image first', {
        icon: '📤',
        duration: 3000,
      });
      return;
    }
    
    if (!isLoggedIn) {
      toast.error('Sign up required for avatar generation', {
        icon: '🔒',
        duration: 4000,
        action: {
          label: 'Sign Up',
          onClick: () => window.location.href = "/signup"
        }
      });
      return;
    }
    
    if (credits < avatarCost) {
      toast.error(`You need ${avatarCost} credits for avatar generation`, {
        icon: '🎭',
        duration: 4000,
        action: {
          label: 'Get Credits',
          onClick: () => window.location.href = "/pricing"
        }
      });
      return;
    }

    if (!user_gender || !selectedStyle) {
      toast.error('Please select your gender and style', {
        icon: '⚙️',
        duration: 3000,
      });
      return;
    }

    const abortController = new AbortController();
    const timeoutId = setTimeout(() => {
      abortController.abort();
    }, 120000);

    setIsLoading(true);
    setError(null);
    setResultImageUrl(null);

    const processingToast = toast.loading('Creating your AI avatar...', {
      icon: '🎭',
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

      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.readAsDataURL(compressedFile);
      });

      const finalPrompt = buildPrompt();
      console.log("Generated prompt:", finalPrompt);

      const response = await fetch("/api/replicate/aiAvatars", {
        method: "POST",
        headers,
        body: JSON.stringify({
          imageBase64: base64,
          prompt: finalPrompt,
          styleStrength: styleStrength,
          user_gender: user_gender,
          workflow_type: workflowType
        }),
        signal: abortController.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = `Failed to generate avatar: ${response.status}`;
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
        
        toast.success('Avatar generation complete! Amazing transformation!', {
          id: processingToast,
          icon: '🎭',
          duration: 5000,
        });
        
        if (navigator.vibrate) {
          navigator.vibrate([200, 100, 200]);
        }

        await refreshCredits();
      } else {
        console.error("Unexpected response format:", data);
        throw new Error("No image URL returned from server");
      }
    } catch (err) {
      clearTimeout(timeoutId);
      
      console.error("Error generating avatar:", err);
      
      if (err.name === 'AbortError') {
        toast.error("Request timed out after 2 minutes. Please try again with a smaller image.", {
          id: processingToast,
          icon: '⏰',
          duration: 5000,
        });
      } else {
        toast.error(err.message || "Avatar generation failed. Please try again.", {
          id: processingToast,
          icon: '❌',
          duration: 5000,
        });
      }
      
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
      a.download = `ai-avatar-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('Avatar downloaded!', {
        id: downloadToast,
        icon: '🎭',
        duration: 3000,
      });
      
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
    
    toast.success('Ready for a new avatar transformation!', {
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
    if (isLoading) return "Creating your avatar...";
    if (!photo) return "Upload a Photo First";
    if (!isLoggedIn) return "Sign Up Required";
    if (credits < avatarCost) return "Get More Credits";
    if (!user_gender || !selectedStyle) return "Select Options";
    return "Generate My AI Avatar!";
  };

  const getButtonEmoji = () => {
    if (isLoading) return null;
    if (!photo) return "📷";
    if (!isLoggedIn) return "🔒";
    if (credits < avatarCost) return "💎";
    return "🚀";
  };

  return (
    <>
      <Head>
        <title>AI Avatar Generator | Throwback AI</title>
        <meta name="description" content="Transform your photos into amazing AI avatars with custom styles" />
      </Head>

      <main className={styles.splitContainer}>
        <SEOAvatar />
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>🎭 AI Avatar Generator</h1>
            <div className={styles.creditsInfo}>
              <span className={styles.creditsText}>💎 {credits} credits</span>
              <button 
                onClick={() => window.location.href = isLoggedIn ? "/pricing" : "/signup"}
                className={styles.creditsButton}
              >
                {isLoggedIn ? "+" : "Sign Up"}
              </button>
            </div>
          </div>
          <p className={styles.subtitle}>
            Transform your photo into amazing AI avatars • Costs {avatarCost} credits
          </p>
        </div>

        {error && (
          <div className={styles.errorBanner}>
            <span className={styles.errorText}>⚠️ {error}</span>
            <button onClick={clearError} className={styles.errorClose}>✕</button>
          </div>
        )}

        {/* Split Screen Layout */}
        <div className={styles.splitLayout}>
          {/* Left Sidebar - All Options */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <h2>🛠️ Avatar Setup</h2>
            </div>

            {/* Upload Card */}
            <div className={styles.optionCard}>
              <h3 className={styles.cardTitle}>
                <span className={styles.cardIcon}>📷</span>
                Upload Photo
              </h3>
              <div
                className={`${styles.uploadZone} ${dragActive ? styles.dragActive : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('photo-upload').click()}
              >
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  style={{ display: 'none' }}
                />
                {previewUrl ? (
                  <div className={styles.uploadPreview}>
                    <Image
                      src={previewUrl}
                      alt="Uploaded photo"
                      width={100}
                      height={100}
                      className={styles.uploadImage}
                    />
                    <div className={styles.uploadOverlay}>
                      <span>Click to change</span>
                    </div>
                  </div>
                ) : (
                  <div className={styles.uploadPrompt}>
                    <div className={styles.uploadIcon}>📸</div>
                    <span>Drop photo or click</span>
                    <small>PNG, JPG up to 10MB</small>
                  </div>
                )}
              </div>
            </div>

            {/* Gender Card */}
            <div className={styles.optionCard}>
              <h3 className={styles.cardTitle}>
                <span className={styles.cardIcon}>👤</span>
                Gender
              </h3>
              <div className={styles.buttonGroup}>
                {["male", "female", "non-binary"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    className={`${styles.selectButton} ${user_gender === g ? styles.selectButtonActive : ''}`}
                    onClick={() => setGender(g)}
                  >
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Workflow Card */}
            <div className={styles.optionCard}>
              <h3 className={styles.cardTitle}>
                <span className={styles.cardIcon}>⚙️</span>
                Workflow Type
              </h3>
              <div className={styles.buttonGroup}>
                {[
                  { value: "HyperRealistic-likeness", label: "HyperRealistic" },
                  { value: "Realistic", label: "Realistic" },
                  { value: "Stylistic", label: "Stylistic" }
                ].map((workflow) => (
                  <button
                    key={workflow.value}
                    type="button"
                    className={`${styles.selectButton} ${workflowType === workflow.value ? styles.selectButtonActive : ''}`}
                    onClick={() => setWorkflowType(workflow.value)}
                  >
                    {workflow.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Style Category Card */}
            <div className={styles.optionCard}>
              <h3 className={styles.cardTitle}>
                <span className={styles.cardIcon}>🎨</span>
                Style Category
              </h3>
              <div className={styles.categoryList}>
                {[
                  { value: "portrait", label: "Portrait", emoji: "📸" },
                  { value: "fantasy", label: "Fantasy", emoji: "🧙" },
                  { value: "scifi", label: "Sci-Fi", emoji: "🚀" },
                  { value: "historical", label: "Historical", emoji: "🏛️" },
                  { value: "anime", label: "Anime", emoji: "🎌" }
                ].map((category) => (
                  <button
                    key={category.value}
                    type="button"
                    data-category={category.value}
                    className={`${styles.categoryOption} ${styleCategory === category.value ? styles.categoryOptionActive : ''}`}
                    onClick={() => {
                      setStyleCategory(category.value);
                      setSelectedStyle("");
                    }}
                  >
                    <span className={styles.categoryEmoji}>{category.emoji}</span>
                    <span className={styles.categoryLabel}>{category.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Specific Style Card */}
            <div className={styles.optionCard}>
              <h3 className={styles.cardTitle}>
                <span className={styles.cardIcon}>✨</span>
                Choose Style
              </h3>
              <div className={styles.styleList}>
                {AVATAR_STYLES[styleCategory].map((style) => (
                  <button
                    key={style.value}
                    type="button"
                    className={`${styles.styleOption} ${selectedStyle === style.value ? styles.styleOptionActive : ''}`}
                    onClick={() => setSelectedStyle(style.value)}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Style Strength Card */}
            <div className={styles.optionCard}>
              <h3 className={styles.cardTitle}>
                <span className={styles.cardIcon}>📊</span>
                Style Strength: {styleStrength}%
              </h3>
              <div className={styles.sliderContainer}>
                <input
                  type="range"
                  min="5"
                  max="35"
                  value={styleStrength}
                  onChange={(e) => setStyleStrength(Number(e.target.value))}
                  className={styles.slider}
                />
                <div className={styles.sliderLabels}>
                  <span>Preserve Face</span>
                  <span>Strong Style</span>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateAvatar}
              disabled={!isReady || isLoading}
              className={styles.generateButton}
            >
              {isLoading ? (
                <>
                  <div className={styles.spinner}></div>
                  {getButtonText()}
                </>
              ) : (
                <>
                  {getButtonEmoji() && <span>{getButtonEmoji()}</span>}
                  {getButtonText()}
                </>
              )}
            </button>

            {/* Progress */}
            {isLoading && (
              <div className={styles.progressCard}>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className={styles.progressText}>
                  <span>{progressStage}</span>
                  <span>{progress}%</span>
                </div>
                <div className={styles.progressTimer}>
                  {Math.floor(loadingTimer / 60) > 0 ? `${Math.floor(loadingTimer / 60)}:${(loadingTimer % 60).toString().padStart(2, '0')}` : `${loadingTimer}s`}
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - FOCUSED ON PREVIEW & RESULTS */}
          <div className={styles.previewPanel}>
            <div className={styles.previewHeader}>
              <h2>🎭 Your Avatar Transformation</h2>
            </div>

            {/* Main Preview Area */}
            <div className={styles.mainPreviewArea}>
              {/* Before & After Images */}
              <div className={styles.imageComparison}>
                {/* Original Photo */}
                {previewUrl ? (
                  <div className={styles.imageSection}>
                    <h3 className={styles.imageTitle}>📸 Original</h3>
                    <div className={styles.imageContainer}>
                      <Image
                        src={previewUrl}
                        alt="Original photo"
                        width={300}
                        height={300}
                        className={styles.previewImage}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={styles.placeholderSection}>
                    <div className={styles.placeholderContent}>
                      <span className={styles.placeholderIcon}>📷</span>
                      <h3>Upload Your Photo</h3>
                      <p>Your original photo will appear here</p>
                    </div>
                  </div>
                )}

                {/* Arrow */}
                {previewUrl && (
                  <div className={styles.transformArrow}>
                    <div className={styles.arrowIcon}>➡️</div>
                    <div className={styles.arrowText}>AI Transform</div>
                  </div>
                )}

                {/* Generated Avatar */}
                {resultImageUrl ? (
                  <div className={styles.imageSection}>
                    <h3 className={styles.imageTitle}>🎭 AI Avatar</h3>
                    <div className={styles.imageContainer}>
                      <Image
                        src={resultImageUrl}
                        alt="Generated Avatar"
                        width={300}
                        height={300}
                        unoptimized
                        className={styles.previewImage}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={styles.placeholderSection}>
                    <div className={styles.placeholderContent}>
                      <span className={styles.placeholderIcon}>🎭</span>
                      <h3>Your Avatar</h3>
                      <p>Your AI-generated avatar will appear here</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Result Actions */}
              {resultImageUrl && (
                <div className={styles.resultActions}>
                  <button onClick={handleDownload} className={styles.downloadButton}>
                    📥 Download Avatar
                  </button>
                  <button onClick={handleReset} className={styles.resetButton}>
                    🔄 Create New Avatar
                  </button>
                </div>
              )}
            </div>

            {/* Style Preview Info */}
            {selectedStyle && (
              <div className={styles.stylePreviewInfo}>
                <div className={styles.selectedStyleBadge}>
                  <span className={styles.styleBadgeCategory}>{styleCategory.charAt(0).toUpperCase() + styleCategory.slice(1)}</span>
                  <span className={styles.styleBadgeName}>{AVATAR_STYLES[styleCategory].find(s => s.value === selectedStyle)?.label}</span>
                </div>
                <div className={styles.strengthIndicator}>
                  <span>Style Strength: {styleStrength}%</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}