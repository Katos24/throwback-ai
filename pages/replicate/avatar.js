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
import RestorationCounter from "../../components/RestorationCounter";
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

  // Popular styles (add "popular" badge to these)
  const popularStyles = ["portrait_professional", "anime_style", "fantasy_wizard", "cyberpunk_hero", "medieval_warrior"];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      avatar: "👩‍💼",
      text: "The quality is incredible! Used it for my LinkedIn profile and got so many compliments.",
      rating: 5,
      style: "Portrait"
    },
    {
      id: 2,
      name: "Jake T.",
      avatar: "🧙‍♂️",
      text: "Perfect for my D&D character! Looked exactly like I imagined. Worth every credit.",
      rating: 5,
      style: "Fantasy"
    },
    {
      id: 3,
      name: "David R.",
      avatar: "🚀",
      text: "Fast generation and high quality. Been creating avatars for my whole team!",
      rating: 5,
      style: "Sci-Fi"
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
  // Clear old result so progress bar and overlay show again
  setResultImageUrl(null);

  setIsLoading(true);
  setProgress(0);
  setProgressStage("Preparing your image...");

  // Scroll to photo on both mobile and desktop when generation starts
  const photoSection = document.getElementById('photo-section');
  if (photoSection) {
    photoSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

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

    // Handle non_binary gender in prompt
    const genderForPrompt = userGender === "non_binary" ? "person" : userGender;
    const prompt = `${genderForPrompt} ${selectedStyle}, IMPORTANT: preserve exact facial features, skin tone, ethnicity, and bone structure`;

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
    
    // Provide specific, helpful error messages
    let errorMessage = "Avatar generation failed. Please try again.";
    
    if (err.message.includes("log in")) {
      errorMessage = "Your session expired. Please log in again to continue.";
    } else if (err.message.includes("413") || err.message.includes("too large")) {
      errorMessage = "Image file is too large. Please try a smaller photo.";
    } else if (err.message.includes("network") || err.message.includes("fetch")) {
      errorMessage = "Connection error. Please check your internet and try again.";
    } else if (err.message.includes("credits")) {
      errorMessage = "Insufficient credits. Please purchase more credits to continue.";
    } else if (err.message.includes("No image URL")) {
      errorMessage = "Generation completed but image not returned. Please contact support.";
    }
    
    toast.error(errorMessage, {
      id: processingToast,
      icon: '❌',
      duration: 5000,
    });
  } finally {
    setIsLoading(false);
  }
};

  const handleDownload = async () => {
    try {
      const response = await fetch(resultImageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `avatar-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('Avatar downloaded!', {
        icon: '📥',
        duration: 2000,
      });
    } catch (error) {
      console.error('Error downloading:', error);
      toast.error('Failed to download avatar', {
        icon: '❌',
        duration: 3000,
      });
    }
  };

  const getButtonText = () => {
    if (!isLoggedIn) {
      return "Sign up to Generate";
    }
    if (credits < avatarCost) {
      return "Buy Credits to Generate";
    }
    if (isLoading) {
      return "Creating Your Avatar...";
    }
    return `Generate Avatar (${avatarCost} credits)`;
  };

  const isComplete = photo && userGender && selectedStyle;

  return (
    <>
      <SEOAvatar />
      <Head>
        <title>AI Avatar Generator - Transform Your Photos</title>
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
        />
      </Head>

      <main className={styles.mainContainer}>
        {/* Floating Credit Header */}
        <div className={styles.creditsHeader}>
          <div className={styles.creditsInfo}>
            <span className={styles.creditsIcon}>🎭</span>
            <span className={styles.creditsText}>{credits} {credits === 1 ? 'credit' : 'credits'}</span>
          </div>
          <button 
            onClick={() => router.push(isLoggedIn ? "/pricing" : "/signup")}
            className={styles.creditsButton}
          >
            {isLoggedIn ? "+" : "Sign Up"}
          </button>
        </div>

        <div className={styles.contentWrapper}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Transform Into Any Character
            </h1>
            <p className={styles.heroSubtitle}>
              Create stunning AI avatars in fantasy, sci-fi, historical themes and more
              <span className={styles.creditPill}>Costs {avatarCost} credits</span>
              {!isLoggedIn && (
                <span className={styles.signupInline}>
                  <strong>Sign up now</strong> and get <strong>50 free credits</strong> to try!
                  <button
                    onClick={() => router.push("/signup")}
                    className={styles.signupInlineButton}
                  >
                    Claim Credits
                  </button>
                </span>
              )}
            </p>
          </div>
        </div>

     

        {/* Example Carousel */}
        <div className={styles.examplesSection}>
          <h2 className={styles.examplesTitle}>See What&apos;s Possible</h2>
          <Slider {...carouselSettings} className={styles.carousel}>
            {exampleTransformations.map((example, index) => (
              <div key={example.id} className={styles.carouselItem}>
                <div 
                  className={styles.exampleCard}
                  onClick={() => handleImageClick(index)}
                >
                  <Image
                    src={example.image}
                    alt={example.style}
                    width={300}
                    height={400}
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

           {/* Restoration Counter - Shows social proof */}
        <RestorationCounter label="AI Transformations Created" />

        {/* Photo Upload Section */}
        <div className={styles.uploadSection} id="photo-section">
          <h2 className={styles.sectionTitle}>Step 1: Upload Your Photo</h2>
          <div className={styles.uploadWrapper}>
            <div
              className={`${styles.uploadZone} ${dragActive ? styles.dragActive : ''} ${previewUrl ? styles.hasPreview : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => !isLoading && document.getElementById('photo-upload').click()}
            >
              {resultImageUrl ? (
                <div className={styles.resultContainer}>
                  <div className={styles.previewContainer}>
                    <Image
                      src={showingOriginal ? previewUrl : resultImageUrl}
                      alt={showingOriginal ? "Original photo" : "Generated Avatar"}
                      width={400}
                      height={400}
                      unoptimized
                      className={styles.displayImage}
                    />
                    <div className={styles.changePhotoOverlay}>
                      Click to change photo
                    </div>
                  </div>
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
              ) : previewUrl ? (
                <div className={styles.previewContainer}>
                  <Image
                    src={previewUrl}
                    alt="Your photo"
                    width={400}
                    height={400}
                    className={styles.displayImage}
                  />
                  {!isLoading && (
                    <div className={styles.changePhotoOverlay}>
                      Click to change photo
                    </div>
                  )}
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
              ) : (
                <div className={styles.uploadPrompt}>
                  <div className={styles.uploadIcon}>📸</div>
                  <p className={styles.uploadText}>Click or drag to upload</p>
                  <p className={styles.uploadHint}>PNG, JPG, HEIC up to 10MB</p>
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
          <h2 className={styles.sectionTitle}>Step 2: Customize Your Avatar</h2>
          
          {/* Gender Selection */}
          <div className={styles.configPanel}>
            <h3 className={styles.configTitle}>Select Gender</h3>
            <div className={styles.buttonGroup}>
              {["male", "female", "non_binary"].map((gender) => (
                <button
                  key={gender}
                  className={`${styles.optionButton} ${userGender === gender ? styles.selected : ''}`}
                  onClick={() => setUserGender(gender)}
                >
                  {gender === "non_binary" ? "Non-Binary" : gender.charAt(0).toUpperCase() + gender.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion Style Categories */}
          <div className={styles.accordionSection}>
            <h3 className={styles.accordionMainTitle}>Style Categories</h3>
            <p className={styles.accordionSubtitle}>Click a category to explore available styles</p>
            
            <div className={styles.accordionContainer}>
{[
  { value: "fantasy", label: "Fantasy", emoji: "🧙", description: "Magical & mystical", color: "fantasy" },
  { value: "scifi", label: "Sci-Fi", emoji: "🚀", description: "Futuristic & tech", color: "scifi" },
  { value: "historical", label: "Historical", emoji: "🏛️", description: "Period & vintage", color: "historical" },
  { value: "nineties", label: "90s Vibes", emoji: "📼", description: "Retro yearbook styles", color: "nineties" },
  { value: "portrait", label: "Portrait", emoji: "📸", description: "Professional & artistic", color: "portrait" },
  { value: "anime", label: "Anime", emoji: "🎌", description: "Japanese animation style", color: "anime" }
].map((category) => {

                const isOpen = styleCategory === category.value;
                const stylesInCategory = AVATAR_STYLES[category.value] || [];
                const hasPopularStyles = stylesInCategory.some(style => popularStyles.includes(style.value));
                
                return (
                  <div 
                  key={category.value} 
                  className={`${styles.accordionItem} ${styles[category.color]} ${isOpen ? styles.accordionItemOpen : ''}`}
                >

                    <button
                      className={styles.accordionHeader}
                      onClick={() => {
                      if (styleCategory === category.value) {
                        // If already open, collapse it
                        setStyleCategory("");
                      } else {
                        setStyleCategory(category.value);
                        setSelectedStyle("");
                      }
                    }}
                    >
                      <div className={styles.accordionHeaderLeft}>
                        <span className={styles.accordionEmoji}>{category.emoji}</span>
                        <div className={styles.accordionHeaderText}>
                          <span className={styles.accordionLabel}>{category.label}</span>
                          <span className={styles.accordionDescription}>{category.description}</span>
                        </div>
                      </div>
                      <div className={styles.accordionHeaderRight}>
                        {hasPopularStyles && (
                          <span className={styles.accordionPopularBadge}>⭐ Popular</span>
                        )}
                        <span className={styles.accordionCount}>
                          {stylesInCategory.length} {stylesInCategory.length === 1 ? 'style' : 'styles'}
                        </span>
                        <span className={styles.accordionChevron}>
                          {isOpen ? '−' : '+'}
                        </span>
                      </div>
                    </button>
                    
                    {isOpen && (
                      <div className={styles.accordionContent}>
                        <div className={styles.styleGrid}>
                          {stylesInCategory.map((style) => (
                            <button
                              key={style.value}
                              className={`${styles.styleButton} ${selectedStyle === style.value ? styles.selected : ''}`}
                              onClick={() => setSelectedStyle(style.value)}
                            >
                              {popularStyles.includes(style.value) && (
                                <span className={styles.popularBadge}>⭐ Popular</span>
                              )}
                              {style.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
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
            <span className={styles.toggleIcon}>{showAdvancedSettings ? '−' : '+'}</span>
          </button>
          
          {showAdvancedSettings && (
            <div className={styles.advancedContent}>
              {/* Workflow Type */}
              <div className={styles.advancedOption}>
                <h4 className={styles.advancedLabel}>Workflow Type</h4>
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
                <h4 className={styles.advancedLabel}>Style Strength: <span className={styles.strengthValue}>{styleStrength}%</span></h4>
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
            className={`${styles.generateButton} ${isComplete ? styles.ready : ''} ${isLoading ? styles.loading : ''}`}
          >
            {isLoading ? (
              <>
                <div className={styles.buttonSpinner}></div>
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
                <span className={styles.progressPercent}>{progress}%</span>
              </div>
            </div>
          )}
        </div>



        {/* Testimonials Section */}
        <section className={styles.testimonialsSection}>
          <h2 className={styles.testimonialsTitle}>What Our Users Say</h2>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className={styles.testimonialCard}>
                <div className={styles.testimonialHeader}>
                  <span className={styles.testimonialAvatar}>{testimonial.avatar}</span>
                  <div>
                    <div className={styles.testimonialName}>{testimonial.name}</div>
                    <div className={styles.testimonialStyle}>{testimonial.style}</div>
                  </div>
                </div>
                <div className={styles.testimonialRating}>
                  {'⭐'.repeat(testimonial.rating)}
                </div>
                <p className={styles.testimonialText}>
                  {"\"" + testimonial.text + "\""}
                </p>
              </div>
            ))}
          </div>
        </section>

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
          <div className={styles.lightboxInfo}>
            <span className={styles.lightboxCategory}>{exampleTransformations[currentLightboxIndex].category}</span>
            <span className={styles.lightboxStyle}>{exampleTransformations[currentLightboxIndex].style}</span>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}