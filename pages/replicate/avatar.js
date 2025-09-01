import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { supabase } from "../../lib/supabaseClient";
import useCredits from "../../hooks/useCredits";
import toast from 'react-hot-toast';
import styles from "../../styles/AvatarPage.module.css";

const AVATAR_STYLES = {
  portrait: [
    { label: "Professional Headshot", value: "professional headshot, corporate style, clean background, business attire" },
    { label: "Artistic Portrait", value: "artistic portrait, dramatic lighting, creative composition, fine art photography style" },
    { label: "Vintage Portrait", value: "vintage portrait, classic photography, sepia tones, timeless elegance" },
    { label: "Modern Casual", value: "modern casual portrait, natural lighting, contemporary style, relaxed pose" },
    { label: "90s High School Yearbook", value: "90s high school yearbook photo of a stylish teenager, retro windbreaker jacket, big hair, bright neon colors, soft lighting, vintage Kodak film grain, centered school portrait, cheesy smile, plain background, 1990s fashion aesthetic, sharp focus" }
  ],
  fantasy: [
    { label: "Medieval Warrior", value: "medieval fantasy warrior, armor, sword, epic fantasy art style" },
    { label: "Magical Wizard", value: "powerful wizard, magical robes, staff, mystical aura, fantasy art" },
    { label: "Elven Noble", value: "elegant elven noble, ethereal beauty, fantasy clothing, mystical background" },
    { label: "Dragon Rider", value: "dragon rider, leather armor, adventurous spirit, fantasy landscape" },
  ],
  scifi: [
    { label: "Cyberpunk Character", value: "cyberpunk character, neon lights, futuristic clothing, urban dystopia" },
    { label: "Space Explorer", value: "space explorer, futuristic spacesuit, cosmic background, sci-fi aesthetic" },
    { label: "Robot Companion", value: "humanoid robot, sleek metallic design, glowing elements, sci-fi technology" },
    { label: "Alien Diplomat", value: "alien diplomat, otherworldly features, formal alien attire, cosmic setting" },
  ],
  historical: [
    { label: "Victorian Gentleman/Lady", value: "Victorian era, elegant period clothing, formal pose, historical accuracy" },
    { label: "1920s Flapper/Gentleman", value: "1920s style, Art Deco background, period fashion, Jazz Age aesthetic" },
    { label: "Renaissance Noble", value: "Renaissance nobility, rich fabrics, classical pose, period appropriate" },
    { label: "Wild West Character", value: "Wild West, cowboy/cowgirl attire, dusty frontier town, western aesthetic" },
  ],
  anime: [
    { label: "Anime Hero", value: "anime style, heroic pose, dynamic lighting, Japanese animation aesthetic" },
    { label: "Manga Character", value: "manga style, expressive eyes, stylized features, black and white shading" },
    { label: "Kawaii Style", value: "kawaii anime style, cute aesthetic, pastel colors, adorable features" },
    { label: "Dark Anime", value: "dark anime style, dramatic shadows, intense expression, gothic elements" },
  ]
};

export default function AiAvatarsTest() {
  const router = useRouter();
  
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const [customPrompt, setCustomPrompt] = useState("");
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
  const [useCustomPrompt, setUseCustomPrompt] = useState(false);
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
    const hasValidInputs = useCustomPrompt ? 
      customPrompt.trim().length > 0 : 
      (user_gender && selectedStyle);
    
    setIsReady(photo && !isLoading && isLoggedIn && credits >= avatarCost && hasValidInputs);
  }, [photo, isLoading, isLoggedIn, credits, avatarCost, useCustomPrompt, customPrompt, user_gender, selectedStyle]);

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
    
    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate([50, 30, 50]);
    }
    
    // Reset upload success animation after it completes
    setTimeout(() => setUploadSuccess(false), 600);
  };

  const buildPrompt = () => {
    if (useCustomPrompt) return customPrompt;

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

    if (!useCustomPrompt && (!user_gender || !selectedStyle)) {
      toast.error('Please select your gender and style, or use custom prompt', {
        icon: '⚙️',
        duration: 3000,
      });
      return;
    }

    if (useCustomPrompt && !customPrompt.trim()) {
      toast.error('Please enter a custom prompt', {
        icon: '✏️',
        duration: 3000,
      });
      return;
    }

    // Create abort controller for timeout
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => {
      abortController.abort();
    }, 120000); // 2 minute timeout

    setIsLoading(true);
    setError(null);
    setResultImageUrl(null);

    // Show processing toast
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

      // Convert to base64
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

      // Clear timeout if request completes
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
        
        // Success toast
        toast.success('Avatar generation complete! Amazing transformation!', {
          id: processingToast,
          icon: '🎭',
          duration: 5000,
        });
        
        // Success haptic feedback
        if (navigator.vibrate) {
          navigator.vibrate([200, 100, 200]);
        }
        
        // Scroll to result
        setTimeout(() => {
          const resultSection = document.querySelector('.result-section');
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
    if (!useCustomPrompt && (!user_gender || !selectedStyle)) return "Select Options";
    if (useCustomPrompt && !customPrompt.trim()) return "Enter Custom Prompt";
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

      <main className={styles.container}>
        {/* Credits Display */}
        <div className={styles.creditsHeader}>
          <div className={styles.creditsInfo}>
            <span>🎭</span>
            <span className={styles.creditsText}>{credits} credits</span>
          </div>
          <button 
            onClick={() => window.location.href = isLoggedIn ? "/pricing" : "/signup"}
            className={styles.creditsButton}
          >
            {isLoggedIn ? "+" : "Sign Up"}
          </button>
        </div>

        <div className={styles.hero}>
          <h1 className={styles.title}>🎭 AI Avatar Generator</h1>
          <p className={styles.subtitle}>
            Transform your photo into amazing AI avatars with custom styles
            <span className={styles.creditPill}>
              Costs {avatarCost} credits
            </span>
          </p>
        </div>

        {error && (
          <div className={styles.errorBanner}>
            <span className={styles.errorText}>⚠️ {error}</span>
            <button onClick={clearError} className={styles.errorClose}>✕</button>
          </div>
        )}

        {/* Photo Upload */}
        <div className={styles.formSection}>
          <label>Upload Your Photo</label>
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
              <div className={styles.previewContainer}>
                <Image
                  src={previewUrl}
                  alt="Uploaded photo"
                  width={200}
                  height={200}
                  className={styles.previewImage}
                />
                <div className={styles.changePhotoOverlay}>
                  <span>Click to change photo</span>
                </div>
              </div>
            ) : (
              <div className={styles.uploadPrompt}>
                <div className={styles.uploadIcon}>📷</div>
                <h3>Drop your photo here or click to select</h3>
                <p>Best results with clear face photos</p>
                <small>PNG, JPG, HEIC up to 10MB</small>
              </div>
            )}
          </div>
        </div>

        {/* Prompt Type Selection */}
        <div className={styles.formSection}>
          <label>
            <input
              type="checkbox"
              checked={useCustomPrompt}
              onChange={(e) => setUseCustomPrompt(e.target.checked)}
            />
            Use Custom Prompt (Advanced)
          </label>
        </div>

        {useCustomPrompt ? (
          <div className={styles.formSection}>
            <label>Custom Prompt</label>
            <textarea
              placeholder="Describe your desired avatar style in detail..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              rows={4}
            />
          </div>
        ) : (
          <>
            {/* Gender Selection */}
            <div className={styles.formSection}>
              <label>Gender</label>
              <div className={styles.radioGroup}>
                {["male", "female", "non-binary"].map((g) => (
                  <label key={g}>
                    <input
                      type="radio"
                      name="user_gender"
                      value={g}
                      checked={user_gender === g}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            {/* Workflow Type */}
            <div className={styles.formSection}>
              <label>Workflow Type</label>
              <select
                value={workflowType}
                onChange={(e) => setWorkflowType(e.target.value)}
              >
                <option value="HyperRealistic-likeness">HyperRealistic-likeness</option>
                <option value="HyperRealistic">HyperRealistic</option>
                <option value="Realistic">Realistic</option>
                <option value="Stylistic">Stylistic</option>
              </select>
            </div>

            {/* Style Category */}
            <div className={styles.formSection}>
              <label>Style Category</label>
              <select
                value={styleCategory}
                onChange={(e) => {
                  setStyleCategory(e.target.value);
                  setSelectedStyle("");
                }}
              >
                <option value="portrait">Portrait</option>
                <option value="fantasy">Fantasy</option>
                <option value="scifi">Sci-Fi</option>
                <option value="historical">Historical</option>
                <option value="anime">Anime/Manga</option>
              </select>
            </div>

            {/* Style Selection */}
            <div className={styles.formSection}>
              <label>Choose Style</label>
              <div className={styles.styleGrid}>
                {AVATAR_STYLES[styleCategory].map((style) => (
                  <label
                    key={style.value}
                    className={`${styles.styleOption} ${selectedStyle === style.value ? styles.styleOptionActive : ''}`}
                  >
                    <input
                      type="radio"
                      name="style"
                      value={style.value}
                      checked={selectedStyle === style.value}
                      onChange={(e) => setSelectedStyle(e.target.value)}
                    />
                    {style.label}
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Style Strength */}
        <div className={styles.sliderSection}>
          <label>Style Strength: {styleStrength}%</label>
          <input
            type="range"
            min="5"
            max="35"
            value={styleStrength}
            onChange={(e) => setStyleStrength(Number(e.target.value))}
          />
          <div className={styles.sliderHelp}>
            Lower = preserve face better, Higher = stronger style transformation
          </div>
        </div>

        {/* Generate Button */}
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <button
            onClick={generateAvatar}
            disabled={!isReady || isLoading}
            className={styles.generateBtn}
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
          
          {/* Progress Bar */}
          {isLoading && (
            <div className={styles.progressContainer}>
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
          
          {isLoading && loadingTimer > 60 && (
            <div className={styles.loadingWarning}>
              ⏳ This is taking longer than usual... Please wait or try again with a different image.
            </div>
          )}
        </div>

        {/* Result */}
        {resultImageUrl && (
          <div className={`${styles.resultSection} result-section`}>
            <h3>Your AI Avatar</h3>
            <Image
              src={resultImageUrl}
              alt="Generated Avatar"
              width={400}
              height={400}
              unoptimized
              className={styles.resultImage}
            />
            <div className={styles.resultActions}>
              <button
                onClick={handleDownload}
                className={styles.downloadBtn}
              >
                📥 Download Avatar
              </button>
              <button
                onClick={handleReset}
                className={styles.resetBtn}
              >
                🔄 Create Another
              </button>
            </div>
          </div>
        )}

        {/* Remove inline style keyframes */}
      </main>
    </>
  );
}