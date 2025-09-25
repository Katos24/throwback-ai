import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import useCredits from "../../hooks/useCredits";
import styles from "../../styles/decades/EightiesPage.module.css";
import { EIGHTIES_STYLES, buildEightiesPrompt } from "../../components/EightiesPrompts";
import DecadeBottomSection from "../../components/DecadeBottomSection";
import PhotoUpload from "../../components/decades/shared/PhotoUpload";
import ImageDisplay from "../../components/decades/shared/ImageDisplay";
import GenerateButton from "../../components/decades/shared/GenerateButton";
import { useDecadeGeneration } from "../../components/decades/hooks/useDecadeGeneration";
import EightiesSEO from "../../components/SEO/EightiesSEO";

export default function EightiesPage() {
  const router = useRouter();
  
  // Photo state
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const [showingOriginal, setShowingOriginal] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Auth state
  const [session, setSession] = useState(null);

  // Configuration state
  const [userGender, setUserGender] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [styleStrength, setStyleStrength] = useState(20);
  const [workflowType, setWorkflowType] = useState("HyperRealistic-likeness");

  // UI state
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  // Credits and costs
  const avatarCost = 50;
  const { credits, isLoggedIn, refreshCredits } = useCredits();

  // Generation hook with 80s prompt builder wrapper
  const eightiesPromptWrapper = useCallback((gender, styleId, workflowType, strength) => {
    return buildEightiesPrompt({
      gender,
      styleId,
      preserveFacialFeatures: true,
      intensity: strength > 25 ? 'strong' : strength < 15 ? 'subtle' : 'medium'
    });
  }, []);
  
  const { generateAvatar, isLoading, progress, progressStage } = useDecadeGeneration("80s", eightiesPromptWrapper);

  // Initialize session
  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    }
    getSession();
  }, []);

  // Improved mobile scroll functionality
  const scrollToPhotoOnMobile = useCallback(() => {
    // Multiple fallback selectors for better reliability
    const selectors = [
      `.${styles.computerSection}`,
      `.${styles.computerMonitor}`,
      `.${styles.monitorScreen}`,
      `.${styles.monitorHeader}`
    ];

    let photoSection = null;
    
    // Try each selector until we find an element
    for (const selector of selectors) {
      photoSection = document.querySelector(selector);
      if (photoSection) break;
    }
    
    // Only scroll on mobile and if element is found
    if (photoSection && window.innerWidth <= 768) {
      photoSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }, []);

  // Handle file processing (for both upload and drag-drop)
  const handleFileProcessing = useCallback((file) => {
    if (file && file.type.startsWith('image/')) {
      setPhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultImageUrl(null);
      setShowingOriginal(false);
    }
  }, []);

  // Drag and drop handlers
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set drag over to false if we're leaving the drop zone entirely
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileProcessing(files[0]);
    }
  }, [handleFileProcessing]);

  // Enhanced generation handler
  const handleGenerateOrRedirect = useCallback(async () => {
    // Validation checks
    if (!photo) return;
    if (!userGender || !selectedStyle) return;
    
    // Authentication and credits checks
    if (!isLoggedIn) {
      router.push('/signup');
      return;
    }
    if (credits < avatarCost) {
      router.push('/pricing');
      return;
    }

    try {
      // Convert gender format to match API expectations
      const apiGender = userGender === 'non-binary' ? 'non_binary' : userGender;
      
      // Start mobile scroll immediately when generation begins
      setTimeout(scrollToPhotoOnMobile, 100);
      
      // Generate the avatar
      const imageUrl = await generateAvatar(
        photo, 
        apiGender, 
        selectedStyle, 
        workflowType, 
        styleStrength, 
        refreshCredits
      );
      
      setResultImageUrl(imageUrl);
      
    } catch (error) {
      console.error('Generation failed:', error);
      // You could add error toast notification here
    }
  }, [
    photo, 
    userGender, 
    selectedStyle, 
    isLoggedIn, 
    credits, 
    avatarCost, 
    router, 
    workflowType, 
    styleStrength, 
    generateAvatar, 
    refreshCredits, 
    scrollToPhotoOnMobile
  ]);

  // Enhanced download handler
  const handleDownload = useCallback(async () => {
    if (!resultImageUrl) return;
    
    try {
      const response = await fetch(resultImageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = `80s-yearbook-photo-${Date.now()}.png`;
      
      // Temporarily add to DOM for download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up object URL
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Download failed:', error);
      // You could add error toast notification here
    }
  }, [resultImageUrl]);

  // Photo upload callback to auto-expand gender selection
  const handlePhotoUploadCallback = useCallback(() => {
    // Auto-expand gender section after photo upload for better UX
    // This could trigger a smooth scroll to gender selection
  }, []);

  // Dynamic button text
  const getButtonText = useCallback(() => {
    if (isLoading) return "Creating your awesome 80s photo...";
    if (!photo) return "Upload a Photo First";
    if (!userGender || !selectedStyle) return "Complete Setup First";
    if (!isLoggedIn) return "Sign Up to Generate";
    if (credits < avatarCost) return "Get More Credits";
    return "Generate My 80s Yearbook Photo!";
  }, [isLoading, photo, userGender, selectedStyle, isLoggedIn, credits, avatarCost]);

  // Check if all requirements are met
  const isComplete = photo && userGender && selectedStyle && isLoggedIn && credits >= avatarCost;

  // Advanced settings toggle
  const toggleAdvancedSettings = useCallback(() => {
    setShowAdvancedSettings(prev => !prev);
  }, []);

  // Gender selection options
  const genderOptions = [
    { id: 'male', label: 'MALE' },
    { id: 'female', label: 'FEMALE' },
    { id: 'non-binary', label: 'NON-BINARY' }
  ];

  // Workflow options
  const workflowOptions = [
    { id: 'HyperRealistic-likeness', label: 'REALISTIC', description: 'Preserves natural look' },
    { id: 'HyperRealistic', label: 'HYPER-REAL', description: 'Adds fine detail' },
    { id: 'Stylistic', label: 'STYLISTIC', description: 'Emphasizes artistic 80s effects' }
  ];

  return (
    <>
      <EightiesSEO />

      <main className={styles.container}>
        {/* Animated Background Elements */}
        <div className={styles.gridBg}></div>
        <div className={styles.neonParticles}>
          {[0, 2, 4, 6].map((delay, index) => (
            <div 
              key={index}
              className={styles.particle} 
              style={{
                left: `${10 + index * 30}%`, 
                animationDelay: `${delay}s`
              }}
            />
          ))}
        </div>

        {/* Credits Header */}
        <header className={styles.creditsHeader}>
          <div className={styles.creditsInfo}>
            <span className={styles.creditsIcon} role="img" aria-label="Radio">📻</span>
            <span className={styles.creditsText}>{credits} CREDITS</span>
          </div>
          <button 
            onClick={() => router.push(isLoggedIn ? "/pricing" : "/signup")}
            className={styles.creditsButton}
            aria-label={isLoggedIn ? "Get more credits" : "Sign up for account"}
          >
            {isLoggedIn ? "GET MORE" : "SIGN UP"}
          </button>
        </header>

        {/* Hero Section */}
        <section className={styles.hero}>
          <h1 className={styles.title}>80S YEARBOOK</h1>
          <p className={styles.subtitle}>
            GET TOTALLY AWESOME WITH AUTHENTIC 80S VIBES
          </p>
          <div className={styles.costPill}>COSTS {avatarCost} CREDITS</div>
        </section>

        {/* Computer Monitor Section */}
        <section className={styles.computerSection}>
          <div 
            className={styles.computerMonitor}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className={styles.monitorHeader}>
              {resultImageUrl ? '80S YEARBOOK RESULT' : 'UPLOAD YOUR PHOTO'}
            </div>
            
            <div className={styles.monitorScreen}>
              {!previewUrl && !resultImageUrl ? (
                <PhotoUpload
                  photo={photo}
                  setPhoto={setPhoto}
                  previewUrl={previewUrl}
                  setPreviewUrl={setPreviewUrl}
                  resultImageUrl={resultImageUrl}
                  setResultImageUrl={setResultImageUrl}
                  setShowingOriginal={setShowingOriginal}
                  onPhotoUpload={handlePhotoUploadCallback}
                  decade="80s"
                  styles={styles}
                />
              ) : (
                <ImageDisplay
                  previewUrl={previewUrl}
                  resultImageUrl={resultImageUrl}
                  showingOriginal={showingOriginal}
                  setShowingOriginal={setShowingOriginal}
                  handleDownload={handleDownload}
                  decade="80s"
                  styles={styles}
                  isLoading={isLoading}
                  progress={progress}
                  progressStage={progressStage}
                />
              )}
            </div>
            
            {/* Hidden file input for "Change Photo" functionality */}
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileProcessing(e.target.files[0]);
                }
              }}
              style={{ display: 'none' }}
            />
          </div>
        </section>

        {/* Main Configuration */}
        <section className={styles.configSection}>
          {/* Gender Selection */}
          <div className={styles.configPanel}>
            <h3 className={styles.configTitle}>CHOOSE GENDER</h3>
            <div className={styles.styleGrid}>
              {genderOptions.map((option) => (
                <button 
                  key={option.id}
                  className={`${styles.styleOption} ${userGender === option.id ? styles.active : ''}`}
                  onClick={() => setUserGender(option.id)}
                  aria-pressed={userGender === option.id}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Style Selection */}
          <div className={styles.configPanel}>
            <h3 className={styles.configTitle}>80S STYLE</h3>
            <div className={styles.styleGrid}>
              {EIGHTIES_STYLES && EIGHTIES_STYLES.map((style) => (
                <button 
                  key={style.id}
                  className={`${styles.styleOption} ${selectedStyle === style.id ? styles.active : ''}`}
                  onClick={() => setSelectedStyle(style.id)}
                  aria-pressed={selectedStyle === style.id}
                >
                  {style.label ? style.label.toUpperCase() : 'STYLE'}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Advanced Settings - Collapsible */}
        <section className={styles.advancedSection}>
          <button 
            className={styles.advancedToggle} 
            onClick={toggleAdvancedSettings}
            aria-expanded={showAdvancedSettings}
            aria-controls="advanced-settings-content"
          >
            <span className={`${styles.toggleIcon} ${showAdvancedSettings ? styles.expanded : ''}`}>
              ▶
            </span>
            ADVANCED SETTINGS
            <span className={styles.optionalLabel}>(OPTIONAL)</span>
          </button>
          
          <div 
            id="advanced-settings-content"
            className={`${styles.advancedContent} ${showAdvancedSettings ? styles.show : ''}`}
          >
            <div className={styles.configSection}>
              {/* Photo Quality */}
              <div className={styles.configPanel}>
                <h4 className={styles.configTitle}>PHOTO QUALITY</h4>
                <div className={styles.styleGrid}>
                  {workflowOptions.map((option) => (
                    <button 
                      key={option.id}
                      className={`${styles.styleOption} ${workflowType === option.id ? styles.active : ''}`}
                      onClick={() => setWorkflowType(option.id)}
                      aria-pressed={workflowType === option.id}
                      title={option.description}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <p className={styles.settingDescription}>
                  Realistic preserves natural look, Hyper-Real adds detail, Stylistic emphasizes artistic 80s effects
                </p>
              </div>

              {/* Style Strength */}
              <div className={styles.configPanel}>
                <h4 className={styles.configTitle}>STYLE STRENGTH</h4>
                <div className={styles.sliderContainer}>
                  <label htmlFor="style-strength-slider" className={styles.sliderLabel}>SUBTLE</label>
                  <input 
                    id="style-strength-slider"
                    type="range" 
                    className={styles.styleSlider} 
                    min="5" 
                    max="35" 
                    value={styleStrength}
                    onChange={(e) => setStyleStrength(parseInt(e.target.value))}
                    aria-label="Style strength"
                  />
                  <span className={styles.sliderLabel}>INTENSE</span>
                </div>
                <div className={styles.sliderValue} aria-live="polite">
                  STRENGTH: {styleStrength}
                </div>
                <p className={styles.settingDescription}>
                  Controls how dramatically the 80s style is applied
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Generate Button */}
        <section className={styles.generateSection}>
          <GenerateButton
            onClick={handleGenerateOrRedirect}
            isLoading={isLoading}
            getButtonText={getButtonText}
            isComplete={isComplete}
            progress={progress}
            progressStage={progressStage}
            styles={styles}
          />
        </section>
        
        {/* Reusable Bottom Section Component */}
        <DecadeBottomSection currentDecade="80s" />
      </main>
    </>
  );
}