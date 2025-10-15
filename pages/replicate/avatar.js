import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import { createPortal } from 'react-dom';
import Slider from 'react-slick';
import imageCompression from "browser-image-compression";
import { supabase } from "../../lib/supabaseClient";
import useCredits from "../../hooks/useCredits";
import toast from 'react-hot-toast';
import styles from "../../styles/AvatarPage.module.css";
import AVATAR_STYLES from "../../components/AvatarStyles";
import SEOAvatar from "../../components/SEO/SEOAvatar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AiAvatarsRedesigned() {
  const router = useRouter();
  
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStage, setProgressStage] = useState("");
  const [showingOriginal, setShowingOriginal] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);

  // Configuration state
  const [userGender, setUserGender] = useState("");
  const [styleCategory, setStyleCategory] = useState("portrait");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [styleStrength, setStyleStrength] = useState(20);
  const [workflowType, setWorkflowType] = useState("HyperRealistic-likeness");

  // UI state for expandable sections
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  const avatarCost = 50;
  const { credits, isLoggedIn, refreshCredits } = useCredits();

  // Debug log to check values
  useEffect(() => {
    console.log('Avatar Page - isLoggedIn:', isLoggedIn);
    console.log('Avatar Page - credits:', credits);
    console.log('Avatar Page - avatarCost:', avatarCost);
  }, [isLoggedIn, credits]);

  // Example transformations for carousel
  const exampleTransformations = [
    {
      id: 1,
      category: "Fantasy",
      style: "Dragon Rider",
      image: "/images/examples/avatar/dragon.png",
    },
    {
      id: 2,
      category: "Fantasy",
      style: "Magical Wizard",
      image: "/images/examples/avatar/wizard.png",
    },
    {
      id: 3,
      category: "Historical",
      style: "Western Era",
      image: "/images/examples/avatar/western.png",
    },
      {
      id: 4,
      category: "Sci-Fi",
      style: "Cyberpunk",
      image: "/images/examples/avatar/cyberpunk.png",
    },
    {
      id: 5,
      category: "Fantasy",
      style: "Medieval Warrior",
      image: "/images/examples/avatar/medieval.png",
    },
     {
      id: 6,
      category: "Historical",
      style: "Western Era",
      image: "/images/examples/avatar/western2.png",
    },
    {
      id: 7,
      category: "Medieval",
      style: "Medieval Fantasy",
      image: "/images/examples/avatar/medieval2.png",
    }
  ];

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '20px',
          arrows: false
        }
      }
    ]
  };

  // Lightbox handlers
  const handleImageClick = (index) => {
    if (window.innerWidth <= 768) {
      setCurrentLightboxIndex(index);
      setLightboxOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentLightboxIndex((prev) => (prev + 1) % exampleTransformations.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentLightboxIndex((prev) => (prev - 1 + exampleTransformations.length) % exampleTransformations.length);
  };

  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    }
    getSession();
  }, []);

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

    setPhoto(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResultImageUrl(null);
    
    toast.success('Photo uploaded! Now configure your avatar settings.', {
      icon: '🎭',
      duration: 2000,
    });
  };

  const handleGenerateOrRedirect = () => {
    if (!photo) {
      toast.error('Please upload an image first', {
        icon: '📤',
        duration: 3000,
      });
      return;
    }

    if (!userGender || !selectedStyle) {
      toast.error('Please select your gender and avatar style', {
        icon: '⚙️',
        duration: 3000,
      });
      return;
    }

    if (!isLoggedIn) {
      router.push('/signup');
      return;
    }
    
    if (credits < avatarCost) {
      router.push('/pricing');
      return;
    }

    generateAvatar();
  };

  const generateAvatar = async () => {
    setIsLoading(true);
    setProgress(0);
    setProgressStage("Preparing your image...");

    const processingToast = toast.loading('Creating your AI avatar...', {
      icon: '🎭',
    });

    try {
      const { data: { session: freshSession } } = await supabase.auth.getSession();
      if (!freshSession) {
        throw new Error("Please log in again to continue");
      }

      const headers = { "Content-Type": "application/json" };
      if (freshSession?.access_token) {
        headers.Authorization = `Bearer ${freshSession.access_token}`;
      }

      const compressedFile = await imageCompression(photo, {
        maxSizeMB: 1.0,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
        maxIteration: 10,
        initialQuality: 0.8,
      });

      setProgress(25);
      setProgressStage("Compressing image...");

      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.readAsDataURL(compressedFile);
      });

      setProgress(50);
      setProgressStage("Sending to AI...");

      const prompt = `${userGender} ${selectedStyle}, IMPORTANT: preserve exact facial features, skin tone, ethnicity, and bone structure`;

      const response = await fetch("/api/replicate/aiAvatars", {
        method: "POST",
        headers,
        body: JSON.stringify({
          imageBase64: base64,
          prompt: prompt,
          styleStrength: styleStrength,
          user_gender: userGender,
          workflow_type: workflowType
        }),
      });

      setProgress(80);
      setProgressStage("Generating avatar...");

      if (!response.ok) {
        throw new Error(`Failed to generate avatar: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.imageUrl) {
        setProgress(100);
        setProgressStage("Complete!");
        setResultImageUrl(data.imageUrl);
        
        toast.success('Avatar generation complete!', {
          id: processingToast,
          icon: '🎭',
          duration: 5000,
        });

        await refreshCredits();
      } else {
        throw new Error("No image URL returned from server");
      }
    } catch (err) {
      console.error("Error generating avatar:", err);
      toast.error(err.message || "Avatar generation failed. Please try again.", {
        id: processingToast,
        icon: '❌',
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!resultImageUrl) return;
    
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
        icon: '🎭',
        duration: 3000,
      });
    } catch (error) {
      toast.error('Download failed. Please try again.', {
        icon: '❌',
        duration: 4000,
      });
    }
  };

  const getButtonText = () => {
    if (isLoading) return "Creating your avatar...";
    if (!photo) return "Upload a Photo First";
    if (!userGender || !selectedStyle) return "Complete Setup First";
    if (!isLoggedIn) return "Sign Up to Generate";
    if (credits < avatarCost) return "Get More Credits";
    return "Generate My AI Avatar!";
  };

  const isComplete = photo && userGender && selectedStyle && isLoggedIn && credits >= avatarCost;

  return (
    <>
      <Head>
        <title>AI Avatar Generator | Throwback AI</title>
        <meta name="description" content="Transform your photos into amazing AI avatars with custom styles" />
      </Head>

      <main className={styles.container}>
        <SEOAvatar />
        
        {/* Fixed Credits Header */}
        <div className={styles.creditsHeader}>
          <div className={styles.creditsInfo}>
            <span className={styles.creditsIcon}>🎭</span>
            <span className={styles.creditsText}>{credits} credits</span>
          </div>
          <button 
            onClick={() => router.push(isLoggedIn ? "/pricing" : "/signup")}
            className={styles.creditsButton}
          >
            {isLoggedIn ? "+" : "Sign Up"}
          </button>
        </div>

        {/* Hero Section */}
        <div className={styles.hero}>
          <h1 className={styles.title}>
            <span className={styles.titleEmoji}>🎭</span>
            AI Avatar Generator
          </h1>
          <p className={styles.subtitle}>
            Transform your photo into amazing AI avatars with our AI-powered transformation.
            <span className={styles.creditPill}>Costs {avatarCost} credits</span>
          </p>
        </div>

        {/* Single Photo Display Section */}
        <div className={styles.photoSection}>
          <div className={styles.singlePhotoCard}>
            <h3 className={styles.cardTitle}>
              {resultImageUrl ? 'Your AI Avatar' : 'Upload Your Photo'}
            </h3>
            <div
              className={`${styles.photoDisplay} ${dragActive ? styles.dragActive : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => !resultImageUrl && document.getElementById('photo-upload').click()}
            >
              {!previewUrl && !resultImageUrl ? (
                <div className={styles.uploadPrompt}>
                  <div className={styles.uploadIcon}>📷</div>
                  <h4>Drop your photo here</h4>
                  <p>Drag & drop or click to select</p>
                  <small>Best results with clear face photos • PNG, JPG, HEIC up to 10MB</small>
                </div>
              ) : resultImageUrl ? (
                <div className={styles.resultContainer}>
                  <Image
                    src={showingOriginal ? previewUrl : resultImageUrl}
                    alt={showingOriginal ? "Original photo" : "Generated Avatar"}
                    width={400}
                    height={400}
                    unoptimized
                    className={styles.displayImage}
                  />
                  <div className={styles.imageControls}>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowingOriginal(!showingOriginal);
                      }}
                      className={styles.toggleButton}
                    >
                      {showingOriginal ? "Show Result" : "Show Original"}
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload();
                      }}
                      className={styles.downloadBtn}
                    >
                      📥 Download
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.previewContainer}>
                  <Image
                    src={previewUrl}
                    alt="Your photo"
                    width={400}
                    height={400}
                    className={styles.displayImage}
                  />
                  {isLoading && (
                    <div className={styles.loadingOverlay}>
                      <div className={styles.spinner}></div>
                      <p>{progressStage}</p>
                      <div className={styles.progressBar}>
                        <div 
                          className={styles.progressFill}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        {/* Configuration Options */}
        <div className={styles.configSection}>
          {/* Gender Selection */}
          <div className={styles.configPanel}>
            <h3 className={styles.configTitle}>GENDER</h3>
            <div className={styles.buttonGroup}>
              {["male", "female", "non-binary"].map((gender) => (
                <button
                  key={gender}
                  className={`${styles.optionButton} ${userGender === gender ? styles.selected : ''}`}
                  onClick={() => setUserGender(gender)}
                >
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Style Category and Choose Style - Same Row */}
          <div className={styles.styleRow}>
            {/* Style Category */}
            <div className={styles.configPanel}>
              <h3 className={styles.configTitle}>STYLE CATEGORY</h3>
              <div className={styles.categoryGrid}>
                {[
                  { value: "nineties", label: "90s Vibes", emoji: "📼" },
                  { value: "portrait", label: "Portrait", emoji: "📸" },
                  { value: "fantasy", label: "Fantasy", emoji: "🧙" },
                  { value: "scifi", label: "Sci-Fi", emoji: "🚀" },
                  { value: "historical", label: "Historical", emoji: "🏛️" },
                  { value: "anime", label: "Anime", emoji: "🎌" }
                ].map((category) => (
                  <button
                    key={category.value}
                    className={`${styles.categoryButton} ${styleCategory === category.value ? styles.selected : ''}`}
                    onClick={() => {
                      setStyleCategory(category.value);
                      setSelectedStyle("");
                    }}
                  >
                    <span className={styles.categoryEmoji}>{category.emoji}</span>
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Style Selection */}
            <div className={styles.configPanel}>
              <h3 className={styles.configTitle}>CHOOSE STYLE</h3>
              <div className={styles.styleGrid}>
                {AVATAR_STYLES[styleCategory]?.map((style) => (
                  <button
                    key={style.value}
                    className={`${styles.styleButton} ${selectedStyle === style.value ? styles.selected : ''}`}
                    onClick={() => setSelectedStyle(style.value)}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className={styles.advancedSection}>
          <button 
            className={styles.advancedToggle}
            onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
          >
            <span>⚙️ Advanced Settings</span>
            <span>{showAdvancedSettings ? '−' : '+'}</span>
          </button>
          
          {showAdvancedSettings && (
            <div className={styles.advancedContent}>
              {/* Workflow Type */}
              <div className={styles.advancedOption}>
                <h4>Workflow Type</h4>
                <div className={styles.buttonGroup}>
                  {[
                    { value: "HyperRealistic-likeness", label: "HyperRealistic" },
                    { value: "Realistic", label: "Realistic" },
                    { value: "Stylistic", label: "Stylistic" }
                  ].map((workflow) => (
                    <button
                      key={workflow.value}
                      className={`${styles.optionButton} ${workflowType === workflow.value ? styles.selected : ''}`}
                      onClick={() => setWorkflowType(workflow.value)}
                    >
                      {workflow.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Strength */}
              <div className={styles.advancedOption}>
                <h4>Style Strength: {styleStrength}%</h4>
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
            </div>
          )}
        </div>

        {/* Generate Button */}
        <div className={styles.generateSection}>
          <button
            onClick={handleGenerateOrRedirect}
            disabled={isLoading}
            className={`${styles.generateButton} ${isComplete ? styles.ready : ''}`}
          >
            {isLoading ? (
              <>
                <div className={styles.spinner}></div>
                {getButtonText()}
              </>
            ) : (
              getButtonText()
            )}
          </button>

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
            </div>
          )}
        </div>

        {/* Examples Section with Carousel */}
        <div className={styles.examplesSection}>
          <div className={styles.examplesHeader}>
            <h2 className={styles.examplesTitle}>✨ Example Transformations</h2>
            <p className={styles.examplesSubtitle}>
              See what's possible with avatar styles across 6 categories
            </p>
          </div>

          <div className={styles.carouselContainer}>
            <Slider {...carouselSettings}>
              {exampleTransformations.map((example, index) => (
                <div key={example.id} className={styles.carouselSlide}>
                  <div 
                    className={styles.exampleCard}
                    onClick={() => handleImageClick(index)}
                  >
                    <img 
                      src={example.image} 
                      alt={`${example.style} transformation`}
                      className={styles.exampleImage}
                    />
                    <div className={styles.exampleOverlay}>
                      <span className={styles.exampleCategory}>{example.category}</span>
                      <span className={styles.exampleStyle}>{example.style}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          <div className={styles.examplesCta}>
            <button 
              onClick={() => {
                if (!isLoggedIn) {
                  router.push('/signup');
                } else {
                  router.push('/pricing');
                }
              }}
              className={styles.examplesCtaButton}
            >
              {!isLoggedIn 
                ? "Sign Up to Create Avatar →" 
                : "Get Credits to Create Avatar →"
              }
            </button>
          </div>
        </div>
      </main>

      {/* Lightbox rendered as Portal to document.body */}
      {lightboxOpen && typeof document !== 'undefined' && createPortal(
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button onClick={prevImage} className={styles.lightboxBtnPrev}>‹</button>
          <img
            src={exampleTransformations[currentLightboxIndex].image}
            alt={exampleTransformations[currentLightboxIndex].style}
            className={styles.lightboxImage}
          />
          <button onClick={nextImage} className={styles.lightboxBtnNext}>›</button>
        </div>,
        document.body
      )}
    </>
  );
}