import { useState, useCallback } from "react";
import styles from "../../styles/decades/TwothousandsPage.module.css";
import { TWOTHOUSANDS_STYLES, buildTwothousandsPrompt } from "../../components/TwothousandsPrompts";
import DecadeBottomSection from "../../components/DecadeBottomSection";
import PhotoUpload from "../../components/decades/shared/PhotoUpload";
import ImageDisplay from "../../components/decades/shared/ImageDisplay";
import GenerateButton from "../../components/decades/shared/GenerateButton";
import GenderSelector from "../../components/decades/shared/GenderSelector";
import StyleSelector from "../../components/decades/shared/StyleSelector";
import AdvancedSettings from "../../components/decades/shared/AdvancedSettings";
import { useDecadeGeneration } from "../../components/decades/hooks/useDecadeGeneration";
import { useDecadePageLogic } from "../../components/decades/hooks/useDecadePageLogic";
import { useDecadeGenerationHandler } from "../../components/decades/hooks/useDecadeGenerationHandler";
import TwothousandsSEO from "../../components/SEO/TwothousandsSEO";

export default function TwothousandsPage() {
  // XP Start Menu state
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  // Use the page logic hook for all state and basic handlers
  const {
    photo,
    setPhoto,
    previewUrl,
    setPreviewUrl,
    resultImageUrl,
    setResultImageUrl,
    showingOriginal,
    setShowingOriginal,
    userGender,
    setUserGender,
    selectedStyle,
    setSelectedStyle,
    styleStrength,
    setStyleStrength,
    workflowType,
    setWorkflowType,
    showAdvancedSettings,
    credits,
    isLoggedIn,
    refreshCredits,
    router,
    handleFileProcessing,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleDownload,
    handlePhotoUploadCallback,
    toggleAdvancedSettings,
    scrollToPhotoOnMobile,
    isComplete,
    avatarCost
  } = useDecadePageLogic("2000s", 50);

  // Generation hook with 2000s prompt builder wrapper
  const twothousandsPromptWrapper = useCallback((gender, styleId, workflowType, strength) => {
    const promptResult = buildTwothousandsPrompt(gender, styleId, workflowType, strength);
    
    // Ensure we return a string - handle both string and object returns
    if (typeof promptResult === 'string') {
      return promptResult;
    } else if (promptResult && typeof promptResult === 'object') {
      return promptResult.prompt || JSON.stringify(promptResult);
    } else {
      const styleObj = TWOTHOUSANDS_STYLES.find(s => s.id === styleId);
      const styleName = styleObj ? styleObj.label : styleId;
      return `A ${gender} person in authentic 2000s ${styleName} style yearbook photo`;
    }
  }, []);
  
  const { generateAvatar, isLoading, progress, progressStage } = useDecadeGeneration("2000s", twothousandsPromptWrapper);

  // Scroll selectors for mobile
  const scrollSelectors = [
    `.${styles.photoWindow}`,
    `.${styles.photoContent}`,
    `.${styles.windowContent}`
  ];

  // Use generation handler hook
  const { handleGenerateOrRedirect, getButtonText } = useDecadeGenerationHandler({
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
    scrollToPhotoOnMobile,
    setResultImageUrl,
    scrollSelectors
  });

  return (
    <>
      <TwothousandsSEO />

      <main className={styles.container}>
        {/* XP Taskbar */}
        <div className={styles.taskbar}>
          <div 
            className={`${styles.startButton} ${startMenuOpen ? styles.startButtonActive : ''}`}
            onClick={() => setStartMenuOpen(!startMenuOpen)}
          >
            <span className={styles.startIcon}>🏠</span>
            <span>Start</span>
          </div>

          {/* Start Menu */}
          {startMenuOpen && (
            <div className={styles.startMenu}>
              <div className={styles.startMenuHeader}>
                <div className={styles.startMenuUser}>
                  <span className={styles.userIcon}>👤</span>
                  <span>Y2K User</span>
                </div>
              </div>
              
              <div className={styles.startMenuSeparator}></div>
              
              <div className={styles.startMenuItems}>
                <div className={styles.startMenuSection}>
                  <div className={styles.sectionLabel}>Decade Generators</div>
                  
                  <button 
                    className={styles.startMenuItem}
                    onClick={() => router.push('/replicate/70s')}
                  >
                    <span className={styles.menuIcon}>📺</span>
                    <span>70s Yearbook Photos</span>
                  </button>
                  
                  <button 
                    className={styles.startMenuItem}
                    onClick={() => router.push('/replicate/80s')}
                  >
                    <span className={styles.menuIcon}>📻</span>
                    <span>80s Yearbook Photos</span>
                  </button>
                  
                  <button 
                    className={styles.startMenuItem}
                    onClick={() => router.push('/replicate/90s')}
                  >
                    <span className={styles.menuIcon}>📼</span>
                    <span>90s Yearbook Photos</span>
                  </button>
                  
                  <button 
                    className={`${styles.startMenuItem} ${styles.currentPage}`}
                    onClick={() => setStartMenuOpen(false)}
                  >
                    <span className={styles.menuIcon}>💻</span>
                    <span>2000s Yearbook Photos</span>
                    <span className={styles.currentIndicator}>•</span>
                  </button>
                </div>

                <div className={styles.startMenuSeparator}></div>

                <div className={styles.startMenuSection}>
                  <div className={styles.sectionLabel}>Quick Actions</div>
                  
                  <button 
                    className={styles.startMenuItem}
                    onClick={() => router.push('/pricing')}
                  >
                    <span className={styles.menuIcon}>💳</span>
                    <span>Get More Credits</span>
                  </button>
                  
                  <button 
                    className={styles.startMenuItem}
                    onClick={() => router.push('/profile')}
                  >
                    <span className={styles.menuIcon}>⚙️</span>
                    <span>Account Settings</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Overlay to close menu */}
          {startMenuOpen && (
            <div 
              className={styles.startMenuOverlay}
              onClick={() => setStartMenuOpen(false)}
            ></div>
          )}

          <div className={styles.taskbarCenter}></div>
          <div className={styles.systemTray}>
            <span className={styles.creditsInfo}>
              <span className={styles.creditsIcon}>💻</span>
              <span>{credits} credits</span>
              <button 
                onClick={() => router.push(isLoggedIn ? "/pricing" : "/signup")}
                className={styles.creditsButton}
              >
                {isLoggedIn ? "+" : "Sign Up"}
              </button>
            </span>
            <span className={styles.clock}>
              {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </span>
          </div>
        </div>

        {/* XP Desktop */}
        <div className={styles.desktop}>
          {/* Main Application Window */}
          <div className={styles.windowContainer}>
            {/* Window Title Bar */}
            <div className={styles.titleBar}>
              <div className={styles.titleBarLeft}>
                <span className={styles.windowIcon}>💻</span>
                <span className={styles.windowTitle}>2000s Yearbook Photo Generator</span>
              </div>
              <div className={styles.titleBarRight}>
                <button className={styles.minimizeButton}>_</button>
                <button className={styles.maximizeButton}>□</button>
                <button className={styles.closeButton}>✕</button>
              </div>
            </div>

            {/* Window Content */}
            <div className={styles.windowContent}>
              {/* Hero Section */}
              <div className={styles.hero}>
                <h1 className={styles.title}>
                  <span className={styles.titleEmoji}>💻</span>
                  2000s Yearbook Photos
                </h1>
                <p className={styles.subtitle}>
                  Get totally awesome Y2K yearbook vibes from the new millennium!
                  <span className={styles.creditPill}>Costs {avatarCost} credits</span>
                </p>
              </div>

              {/* Photo Display Window */}
              <div className={styles.photoWindow}>
                <div className={styles.photoTitleBar}>
                  <span className={styles.photoWindowTitle}>
                    {resultImageUrl ? '2000s Result Viewer' : 'Photo Upload'}
                  </span>
                </div>
                
                <div className={styles.photoContent}>
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
                      decade="2000s"
                      styles={styles}
                    />
                  ) : (
                    <ImageDisplay
                      previewUrl={previewUrl}
                      resultImageUrl={resultImageUrl}
                      showingOriginal={showingOriginal}
                      setShowingOriginal={setShowingOriginal}
                      handleDownload={handleDownload}
                      decade="2000s"
                      styles={styles}
                      isLoading={isLoading}
                      progress={progress}
                      progressStage={progressStage}
                    />
                  )}
                </div>
                
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

              {/* Configuration Section - XP Style */}
              <div className={styles.optionsPanel}>
                <div className={styles.optionRow}>
                  {/* Gender Selection */}
                  <div className={styles.optionSection}>
                    <div className={styles.sectionButton}>
                      <span className={styles.sectionIcon}>👤</span>
                      <span className={styles.sectionTitle}>CHOOSE GENDER</span>
                      {userGender && <span className={styles.sectionValue}>{userGender.toUpperCase()}</span>}
                    </div>
                    <div className={styles.sectionContent}>
                      <div className={styles.buttonGroup}>
                        {[
                          { id: 'male', label: 'MALE' },
                          { id: 'female', label: 'FEMALE' },
                          { id: 'non-binary', label: 'NON-BINARY' }
                        ].map((option) => (
                          <button
                            key={option.id}
                            className={`${styles.optionButton} ${userGender === option.id ? styles.selected : ''}`}
                            onClick={() => setUserGender(option.id)}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Style Selection */}
                  <div className={styles.optionSection}>
                    <div className={styles.sectionButton}>
                      <span className={styles.sectionIcon}>🎨</span>
                      <span className={styles.sectionTitle}>2000S STYLE</span>
                      {selectedStyle && <span className={styles.sectionValue}>{TWOTHOUSANDS_STYLES.find(s => s.id === selectedStyle)?.label.toUpperCase()}</span>}
                    </div>
                    <div className={styles.sectionContent}>
                      <div className={styles.styleGrid}>
                        {TWOTHOUSANDS_STYLES.map((style) => (
                          <button
                            key={style.id}
                            className={`${styles.styleButton} ${selectedStyle === style.id ? styles.selected : ''}`}
                            onClick={() => setSelectedStyle(style.id)}
                            title={style.description}
                          >
                            <span className={styles.styleEmoji}>{style.emoji}</span>
                            {style.label.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advanced Settings - XP Style */}
                <div className={styles.optionRow}>
                  {/* Photo Quality */}
                  <div className={styles.optionSection}>
                    <div className={styles.sectionButton}>
                      <span className={styles.sectionIcon}>⚙️</span>
                      <span className={styles.sectionTitle}>PHOTO QUALITY</span>
                      {workflowType && <span className={styles.sectionValue}>
                        {workflowType === 'HyperRealistic-likeness' ? 'REALISTIC' : workflowType === 'HyperRealistic' ? 'HYPER-REAL' : 'STYLISTIC'}
                      </span>}
                    </div>
                    <div className={styles.sectionContent}>
                      <div className={styles.buttonGroup}>
                        {[
                          { id: 'HyperRealistic-likeness', label: 'REALISTIC' },
                          { id: 'HyperRealistic', label: 'HYPER-REAL' },
                          { id: 'Stylistic', label: 'STYLISTIC' }
                        ].map((option) => (
                          <button
                            key={option.id}
                            className={`${styles.optionButton} ${workflowType === option.id ? styles.selected : ''}`}
                            onClick={() => setWorkflowType(option.id)}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Style Strength */}
                  <div className={styles.optionSection}>
                    <div className={styles.sectionButton}>
                      <span className={styles.sectionIcon}>🎚️</span>
                      <span className={styles.sectionTitle}>STYLE STRENGTH</span>
                      <span className={styles.sectionValue}>{styleStrength}</span>
                    </div>
                    <div className={styles.sectionContent}>
                      <div className={styles.sliderContainer}>
                        <input
                          type="range"
                          className={styles.slider}
                          min="5"
                          max="35"
                          value={styleStrength}
                          onChange={(e) => setStyleStrength(parseInt(e.target.value))}
                        />
                        <div className={styles.sliderLabels}>
                          <span>SUBTLE</span>
                          <span>INTENSE</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
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
          </div>
        </div>

        <DecadeBottomSection currentDecade="2000s" />
      </main>
    </>
  );
}