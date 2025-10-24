import { useState, useEffect, useMemo, useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import dynamic from 'next/dynamic';
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

// Eager load critical above-the-fold components
import ExampleCarousel from '../../components/avatar/ExampleCarousel';
import GenderSelector from '../../components/avatar/GenderSelector';
import StyleSelector from '../../components/avatar/StyleSelector';

// Lazy load below-the-fold and on-demand components
const Testimonials = dynamic(() => import('../../components/avatar/Testimonials'), { 
  ssr: false,
  loading: () => <div style={{ minHeight: '300px' }} />
});

const ImageLightbox = dynamic(() => import('../../components/avatar/ImageLightbox'), { 
  ssr: false 
});

export default function AiAvatarsRedesigned() {
  const router = useRouter();
  
  // State management
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
  const [userGender, setUserGender] = useState("");
  const [styleCategory, setStyleCategory] = useState("portrait");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [styleStrength, setStyleStrength] = useState(20);
  const [workflowType, setWorkflowType] = useState("HyperRealistic-likeness");
  const [isMobile, setIsMobile] = useState(false);

  const avatarCost = 50;
  const { credits, isLoggedIn, refreshCredits } = useCredits();

  // Memoize static data to prevent re-creation on every render
  const exampleTransformations = useMemo(() => [
    { id: 1, category: "Fantasy", style: "Dragon Rider", image: "/images/examples/avatar/dragon.png" },
    { id: 2, category: "Fantasy", style: "Magical Wizard", image: "/images/examples/avatar/wizard.png" },
    { id: 3, category: "Historical", style: "Western Era", image: "/images/examples/avatar/western.png" },
    { id: 4, category: "Sci-Fi", style: "Cyberpunk", image: "/images/examples/avatar/cyberpunk.png" },
    { id: 5, category: "Fantasy", style: "Medieval Warrior", image: "/images/examples/avatar/medieval.png" },
    { id: 6, category: "Historical", style: "Western Era", image: "/images/examples/avatar/western2.png" },
    { id: 7, category: "Medieval", style: "Medieval Fantasy", image: "/images/examples/avatar/medieval2.png" }
  ], []);

  const popularStyles = useMemo(() => [
    "portrait_professional", 
    "anime_style", 
    "fantasy_wizard", 
    "cyberpunk_hero", 
    "medieval_warrior"
  ], []);

  const testimonials = useMemo(() => [
    { id: 1, name: "Sarah M.", avatar: "👩‍💼", text: "The quality is incredible! Used it for my LinkedIn profile and got so many compliments.", rating: 5, style: "Portrait" },
    { id: 2, name: "Jake T.", avatar: "🧙‍♂️", text: "Perfect for my D&D character! Looked exactly like I imagined. Worth every credit.", rating: 5, style: "Fantasy" },
    { id: 3, name: "David R.", avatar: "🚀", text: "Fast generation and high quality. Been creating avatars for my whole team!", rating: 5, style: "Sci-Fi" }
  ], []);

  // Get session on mount
  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    }
    getSession();
  }, []);

  // Detect mobile on client side only (avoid hydration mismatch)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Memoized computed value
  const isComplete = useMemo(() => 
    photo && userGender && selectedStyle, 
    [photo, userGender, selectedStyle]
  );

  // Optimized event handlers with useCallback
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handlePhotoUpload = useCallback((e) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  }, []);

  const handleFile = useCallback((file) => {
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

    // Show preview immediately - no compression needed for display
    setPhoto(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResultImageUrl(null);
    
    toast.success('Photo uploaded! Now configure your avatar settings.', {
      icon: '🎭',
      duration: 2000,
    });
  }, []);

  const handleImageClick = useCallback((index) => {
    if (isMobile) {
      setCurrentLightboxIndex(index);
      setLightboxOpen(true);
    }
  }, [isMobile]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const nextImage = useCallback((e) => {
    e.stopPropagation();
    setCurrentLightboxIndex((prev) => (prev + 1) % exampleTransformations.length);
  }, [exampleTransformations.length]);

  const prevImage = useCallback((e) => {
    e.stopPropagation();
    setCurrentLightboxIndex((prev) => 
      (prev - 1 + exampleTransformations.length) % exampleTransformations.length
    );
  }, [exampleTransformations.length]);

  const handleGenerateOrRedirect = useCallback(() => {
    if (!photo) {
      toast.error('Please upload an image first', { icon: '📤', duration: 3000 });
      return;
    }
    if (!userGender || !selectedStyle) {
      toast.error('Please select your gender and avatar style', { icon: '⚙️', duration: 3000 });
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
  }, [photo, userGender, selectedStyle, isLoggedIn, credits, avatarCost, router]);

  const generateAvatar = useCallback(async () => {
    setResultImageUrl(null);
    setIsLoading(true);
    setProgress(0);
    setProgressStage("Preparing your image...");

    // Scroll to photo on mobile only
    if (isMobile) {
      const photoSection = document.getElementById('photo-section');
      if (photoSection) {
        photoSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    const processingToast = toast.loading('Creating your AI avatar...', { icon: '🎭' });

    try {
      const { data: { session: freshSession } } = await supabase.auth.getSession();
      if (!freshSession) throw new Error("Please log in again to continue");

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

      if (!response.ok) throw new Error(`Failed to generate avatar: ${response.status}`);

      const data = await response.json();
      
      if (data.imageUrl) {
        setProgress(100);
        setProgressStage("Complete!");
        setResultImageUrl(data.imageUrl);
        toast.success('Avatar generation complete!', { id: processingToast, icon: '🎭', duration: 5000 });
        await refreshCredits();
      } else {
        throw new Error("No image URL returned from server");
      }
    } catch (err) {
      console.error("Error generating avatar:", err);
      let errorMessage = "Avatar generation failed. Please try again.";
      if (err.message.includes("log in")) errorMessage = "Your session expired. Please log in again to continue.";
      toast.error(errorMessage, { id: processingToast, icon: '❌', duration: 5000 });
    } finally {
      setIsLoading(false);
    }
  }, [photo, userGender, selectedStyle, styleStrength, workflowType, refreshCredits, isMobile]);

  const handleDownload = useCallback(async () => {
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
      toast.success('Avatar downloaded!', { icon: '📥', duration: 2000 });
    } catch (error) {
      console.error('Error downloading:', error);
      toast.error('Failed to download avatar', { icon: '❌', duration: 3000 });
    }
  }, [resultImageUrl]);

  const getButtonText = useCallback(() => {
    if (!isLoggedIn) return "Sign up to Generate";
    if (credits < avatarCost) return "Buy Credits to Generate";
    if (isLoading) return "Creating Your Avatar...";
    return `Generate Avatar (${avatarCost} credits)`;
  }, [isLoggedIn, credits, avatarCost, isLoading]);

  return (
    <>
      <SEOAvatar />
      <Head>
        <title>AI Avatar Generator - Transform Your Photos</title>
        <meta name="description" content="Create stunning AI avatars in fantasy, sci-fi, and historical themes" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
      </Head>

      <main className={styles.mainContainer}>
        <div className={styles.creditsHeader}>
          <div className={styles.creditsInfo}>
            <span className={styles.creditsIcon}>🎭</span>
            <span className={styles.creditsText}>{credits} {credits === 1 ? 'credit' : 'credits'}</span>
          </div>
          <button onClick={() => router.push(isLoggedIn ? "/pricing" : "/signup")} className={styles.creditsButton}>
            {isLoggedIn ? "+" : "Sign Up"}
          </button>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.heroSection}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Transform Into Any Character</h1>
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

          <ExampleCarousel examples={exampleTransformations} onImageClick={handleImageClick} />

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

          <GenderSelector selectedGender={userGender} onGenderChange={setUserGender} />

          <StyleSelector
            AVATAR_STYLES={AVATAR_STYLES}
            popularStyles={popularStyles}
            selectedCategory={styleCategory}
            selectedStyle={selectedStyle}
            onCategoryChange={setStyleCategory}
            onStyleChange={setSelectedStyle}
          />

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
                  <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
                </div>
                <div className={styles.progressText}>
                  <span>{progressStage}</span>
                  <span className={styles.progressPercent}>{progress}%</span>
                </div>
              </div>
            )}
          </div>

          <Testimonials testimonials={testimonials} />
        </div>
      </main>

      <ImageLightbox
        isOpen={lightboxOpen}
        images={exampleTransformations}
        currentIndex={currentLightboxIndex}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </>
  );
}