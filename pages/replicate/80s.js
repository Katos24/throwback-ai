import { useState, useEffect } from "react";
import Head from "next/head";
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
  
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const [session, setSession] = useState(null);
  const [showingOriginal, setShowingOriginal] = useState(false);

  // Configuration state
  const [userGender, setUserGender] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [styleStrength, setStyleStrength] = useState(20);
  const [workflowType, setWorkflowType] = useState("HyperRealistic-likeness");

  // Advanced settings visibility
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  const avatarCost = 50;
  const { credits, isLoggedIn, refreshCredits } = useCredits();

  // Generation hook with 80s prompt builder wrapper
  const eightiesPromptWrapper = (gender, styleId, workflowType, strength) => {
    return buildEightiesPrompt({
      gender,
      styleId,
      preserveFacialFeatures: true,
      intensity: strength > 25 ? 'strong' : strength < 15 ? 'subtle' : 'medium'
    });
  };
  
  const { generateAvatar, isLoading, progress, progressStage } = useDecadeGeneration("80s", eightiesPromptWrapper);

  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    }
    getSession();
  }, []);

  const handleGenerateOrRedirect = async () => {
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

    // Scroll to photo section on mobile when generation starts
    const scrollToPhoto = () => {
      const photoSection = document.querySelector(`.${styles.computerSection}`) || 
                          document.querySelector(`.${styles.monitorScreen}`);
      
      if (photoSection && window.innerWidth <= 768) {
        photoSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    };

    try {
      // Convert gender format to match API expectations
      const apiGender = userGender === 'non-binary' ? 'non_binary' : userGender;
      
      // Start scrolling right when generation begins
      setTimeout(scrollToPhoto, 100);
      
      const imageUrl = await generateAvatar(photo, apiGender, selectedStyle, workflowType, styleStrength, refreshCredits);
      setResultImageUrl(imageUrl);
    } catch (error) {
      console.error('Generation failed:', error);
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
      a.download = `80s-yearbook-photo-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const getButtonText = () => {
    if (isLoading) return "Creating your awesome 80s photo...";
    if (!photo) return "Upload a Photo First";
    if (!userGender || !selectedStyle) return "Complete Setup First";
    if (!isLoggedIn) return "Sign Up to Generate";
    if (credits < avatarCost) return "Get More Credits";
    return "Generate My 80s Yearbook Photo!";
  };

  const isComplete = photo && userGender && selectedStyle && isLoggedIn && credits >= avatarCost;

  const toggleAdvancedSettings = () => {
    setShowAdvancedSettings(!showAdvancedSettings);
  };

  return (
    <>
      <EightiesSEO />

      <main className={styles.container}>
        {/* Animated Background Elements */}
        <div className={styles.gridBg}></div>
        <div className={styles.neonParticles}>
          <div className={styles.particle} style={{left: '10%', animationDelay: '0s'}}></div>
          <div className={styles.particle} style={{left: '30%', animationDelay: '2s'}}></div>
          <div className={styles.particle} style={{left: '70%', animationDelay: '4s'}}></div>
          <div className={styles.particle} style={{left: '90%', animationDelay: '6s'}}></div>
        </div>

        {/* Credits Header */}
        <div className={styles.creditsHeader}>
          <div className={styles.creditsInfo}>
            <span className={styles.creditsIcon}>📻</span>
            <span className={styles.creditsText}>{credits} CREDITS</span>
          </div>
          <button 
            onClick={() => router.push(isLoggedIn ? "/pricing" : "/signup")}
            className={styles.creditsButton}
          >
            {isLoggedIn ? "GET MORE" : "SIGN UP"}
          </button>
        </div>

        {/* Hero Section */}
        <div className={styles.hero}>
          <h1 className={styles.title}>80S YEARBOOK</h1>
          <p className={styles.subtitle}>
            GET TOTALLY AWESOME WITH AUTHENTIC 80S VIBES
          </p>
          <div className={styles.costPill}>COSTS {avatarCost} CREDITS</div>
        </div>

        {/* Computer Monitor Section */}
        <div className={styles.computerSection}>
          <div className={styles.computerMonitor}>
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
                  const file = e.target.files[0];
                  setPhoto(file);
                  setPreviewUrl(URL.createObjectURL(file));
                  setResultImageUrl(null);
                  setShowingOriginal(false);
                }
              }}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        {/* Main Configuration */}
        <div className={styles.configSection}>
          <div className={styles.configPanel}>
            <div className={styles.configTitle}>CHOOSE GENDER</div>
            <div className={styles.styleGrid}>
              <button 
                className={`${styles.styleOption} ${userGender === 'male' ? styles.active : ''}`}
                onClick={() => setUserGender('male')}
              >
                MALE
              </button>
              <button 
                className={`${styles.styleOption} ${userGender === 'female' ? styles.active : ''}`}
                onClick={() => setUserGender('female')}
              >
                FEMALE
              </button>
              <button 
                className={`${styles.styleOption} ${userGender === 'non-binary' ? styles.active : ''}`}
                onClick={() => setUserGender('non-binary')}
              >
                NON-BINARY
              </button>
            </div>
          </div>

          <div className={styles.configPanel}>
            <div className={styles.configTitle}>80S STYLE</div>
            <div className={styles.styleGrid}>
              {EIGHTIES_STYLES && EIGHTIES_STYLES.map((style) => (
                <button 
                  key={style.id}
                  className={`${styles.styleOption} ${selectedStyle === style.id ? styles.active : ''}`}
                  onClick={() => setSelectedStyle(style.id)}
                >
                  {style.label ? style.label.toUpperCase() : 'STYLE'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced Settings - Collapsible */}
        <div className={styles.advancedSection}>
          <button className={styles.advancedToggle} onClick={toggleAdvancedSettings}>
            <span className={`${styles.toggleIcon} ${showAdvancedSettings ? styles.expanded : ''}`}>
              ▶
            </span>
            ADVANCED SETTINGS
            <span className={styles.optionalLabel}>(OPTIONAL)</span>
          </button>
          
          <div className={`${styles.advancedContent} ${showAdvancedSettings ? styles.show : ''}`}>
            <div className={styles.configSection}>
              <div className={styles.configPanel}>
                <div className={styles.configTitle}>PHOTO QUALITY</div>
                <div className={styles.styleGrid}>
                  <button 
                    className={`${styles.styleOption} ${workflowType === 'HyperRealistic-likeness' ? styles.active : ''}`}
                    onClick={() => setWorkflowType('HyperRealistic-likeness')}
                  >
                    REALISTIC
                  </button>
                  <button 
                    className={`${styles.styleOption} ${workflowType === 'HyperRealistic' ? styles.active : ''}`}
                    onClick={() => setWorkflowType('HyperRealistic')}
                  >
                    HYPER-REAL
                  </button>
                  <button 
                    className={`${styles.styleOption} ${workflowType === 'Stylistic' ? styles.active : ''}`}
                    onClick={() => setWorkflowType('Stylistic')}
                  >
                    STYLISTIC
                  </button>
                </div>
                <div className={styles.settingDescription}>
                  Realistic preserves natural look, Hyper-Real adds detail, Stylistic emphasizes artistic 80s effects
                </div>
              </div>

              <div className={styles.configPanel}>
                <div className={styles.configTitle}>STYLE STRENGTH</div>
                <div className={styles.sliderContainer}>
                  <span className={styles.sliderLabel}>SUBTLE</span>
                  <input 
                    type="range" 
                    className={styles.styleSlider} 
                    min="5" 
                    max="35" 
                    value={styleStrength}
                    onChange={(e) => setStyleStrength(parseInt(e.target.value))}
                  />
                  <span className={styles.sliderLabel}>INTENSE</span>
                </div>
                <div className={styles.sliderValue}>STRENGTH: {styleStrength}</div>
                <div className={styles.settingDescription}>
                  Controls how dramatically the 80s style is applied
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className={styles.generateSection}>
          <GenerateButton
            onClick={handleGenerateOrRedirect}
            isLoading={isLoading}
            getButtonText={getButtonText}
            isComplete={isComplete}
            progress={progress}
            progressStage={progressStage}
            styles={styles}
          />
        </div>
        
        {/* Reusable Bottom Section Component */}
        <DecadeBottomSection currentDecade="80s" />
      </main>
    </>
  );
}