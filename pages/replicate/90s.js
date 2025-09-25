import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import useCredits from "../../hooks/useCredits";
import styles from "../../styles/decades/NinetiesPage.module.css";
import { NINETIES_STYLES, buildNinetiesPrompt } from "../../components/NinetiesPrompts";
import DecadeBottomSection from "../../components/DecadeBottomSection";
import PhotoUpload from "../../components/decades/shared/PhotoUpload";
import ImageDisplay from "../../components/decades/shared/ImageDisplay";
import GenerateButton from "../../components/decades/shared/GenerateButton";
import { useDecadeGeneration } from "../../components/decades/hooks/useDecadeGeneration";
import NinetiesSEO from "../../components/SEO/NinetiesSEO";

export default function NinetiesPage() {
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

  // Generation hook with 90s prompt builder wrapper
  const ninetiesPromptWrapper = useCallback((gender, styleId, workflowType, strength) => {
    return buildNinetiesPrompt({
      gender,
      styleId,
      preserveFacialFeatures: true,
      intensity: strength > 25 ? 'strong' : strength < 15 ? 'subtle' : 'medium'
    });
  }, []);
  
  const { generateAvatar, isLoading, progress, progressStage } = useDecadeGeneration("90s", ninetiesPromptWrapper);

  // Initialize session
  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    }
    getSession();
  }, []);

  // Mobile scroll functionality
  const scrollToPhotoOnMobile = useCallback(() => {
    const selectors = [
      `.${styles.crtMonitor}`,
      `.${styles.monitorSection}`,
      `.${styles.monitorScreen}`,
      `.${styles.digitalDisplay}`
    ];

    let photoSection = null;
    
    for (const selector of selectors) {
      photoSection = document.querySelector(selector);
      if (photoSection) break;
    }
    
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
    if (!photo) return;
    if (!userGender || !selectedStyle) return;
    
    if (!isLoggedIn) {
      router.push('/signup');
      return;
    }
    if (credits < avatarCost) {
      router.push('/pricing');
      return;
    }

    try {
      const apiGender = userGender === 'non-binary' ? 'non_binary' : userGender;
      
      setTimeout(scrollToPhotoOnMobile, 100);
      
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
      link.download = `90s-yearbook-photo-${Date.now()}.png`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Download failed:', error);
    }
  }, [resultImageUrl]);

  // Photo upload callback
  const handlePhotoUploadCallback = useCallback(() => {
    // Auto-expand gender section after photo upload for better UX
  }, []);

  // Dynamic button text
  const getButtonText = useCallback(() => {
    if (isLoading) return "Creating your radical 90s photo...";
    if (!photo) return "Upload a Photo First";
    if (!userGender || !selectedStyle) return "Complete Setup First";
    if (!isLoggedIn) return "Sign Up to Generate";
    if (credits < avatarCost) return "Get More Credits";
    return "Generate My 90s Yearbook Photo!";
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
    { id: 'Stylistic', label: 'STYLISTIC', description: 'Emphasizes artistic 90s effects' }
  ];

  return (
    <>
      <NinetiesSEO />

      <main className={styles.container}>
        {/* Digital Matrix Background */}
        <div className={styles.digitalMatrix}></div>
        <div className={styles.binaryRain}>
          {['01', '10', '11', '00', '01', '10'].map((binary, index) => (
            <div 
              key={index}
              className={styles.binaryDrop} 
              style={{
                left: `${15 + index * 15}%`, 
                animationDelay: `${index * 0.5}s`
              }}
            >
              {binary}
            </div>
          ))}
        </div>

        {/* Credits Header */}
        <header className={styles.creditsHeader}>
          <div className={styles.creditsInfo}>
            <span className={styles.creditsIcon} role="img" aria-label="Computer">💻</span>
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
          <h1 className={styles.title}>90S YEARBOOK</h1>
          <p className={styles.subtitle}>
            GET RADICAL WITH DIGITAL VIBES
          </p>
          <div className={styles.costPill}>COSTS {avatarCost} CREDITS</div>
        </section>

        {/* CRT Monitor Section */}
        <section className={styles.monitorSection}>
          <div 
            className={`${styles.crtMonitor} ${isDragOver ? styles.dragOver : ''}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className={styles.monitorScreen}>
              <div className={styles.screenHeader}>
                {resultImageUrl ? '90S YEARBOOK RESULT' : 'UPLOAD YOUR RAD PHOTO'}
              </div>
              
              <div className={styles.digitalDisplay}>
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
                    decade="90s"
                    styles={styles}
                  />
                ) : (
                  <ImageDisplay
                    previewUrl={previewUrl}
                    resultImageUrl={resultImageUrl}
                    showingOriginal={showingOriginal}
                    setShowingOriginal={setShowingOriginal}
                    handleDownload={handleDownload}
                    decade="90s"
                    styles={styles}
                    isLoading={isLoading}
                    progress={progress}
                    progressStage={progressStage}
                  />
                )}
              </div>
            </div>
            
            {/* CRT Monitor Base */}
            <div className={styles.monitorBase}></div>
            
            {/* Hidden file input */}
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
            <h3 className={styles.configTitle}>90S STYLE</h3>
            <div className={styles.styleGrid}>
              {NINETIES_STYLES && NINETIES_STYLES.map((style) => (
                <button 
                  key={style.id}
                  className={`${styles.styleOption} ${selectedStyle === style.id ? styles.active : ''}`}
                  onClick={() => setSelectedStyle(style.id)}
                  aria-pressed={selectedStyle === style.id}
                  title={style.description}
                >
                  <span className={styles.styleEmoji}>{style.emoji}</span>
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
              &gt;
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
                  Realistic preserves natural look, Hyper-Real adds detail, Stylistic emphasizes artistic 90s effects
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
                  Controls how dramatically the 90s style is applied
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
        <DecadeBottomSection currentDecade="90s" />
      </main>
    </>
  );
}