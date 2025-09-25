import { useCallback } from "react";
import styles from "../../styles/decades/EightiesPage.module.css";
import { EIGHTIES_STYLES, buildEightiesPrompt } from "../../components/EightiesPrompts";
import DecadeBottomSection from "../../components/DecadeBottomSection";
import PhotoUpload from "../../components/decades/shared/PhotoUpload";
import ImageDisplay from "../../components/decades/shared/ImageDisplay";
import GenerateButton from "../../components/decades/shared/GenerateButton";
import CreditsHeader from "../../components/decades/shared/CreditsHeader";
import DecadeHero from "../../components/decades/shared/DecadeHero";
import GenderSelector from "../../components/decades/shared/GenderSelector";
import StyleSelector from "../../components/decades/shared/StyleSelector";
import AdvancedSettings from "../../components/decades/shared/AdvancedSettings";
import { useDecadeGeneration } from "../../components/decades/hooks/useDecadeGeneration";
import { useDecadePageLogic } from "../../components/decades/hooks/useDecadePageLogic";
import { useDecadeGenerationHandler } from "../../components/decades/hooks/useDecadeGenerationHandler";
import EightiesSEO from "../../components/SEO/EightiesSEO";

export default function EightiesPage() {
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
  } = useDecadePageLogic("80s", 50);

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

  // Scroll selectors for mobile
  const scrollSelectors = [
    `.${styles.computerSection}`,
    `.${styles.computerMonitor}`,
    `.${styles.monitorScreen}`,
    `.${styles.monitorHeader}`
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
        <CreditsHeader
          credits={credits}
          isLoggedIn={isLoggedIn}
          onButtonClick={() => router.push(isLoggedIn ? "/pricing" : "/signup")}
          icon={{ emoji: "📻", label: "Radio" }}
          styles={styles}
        />

        {/* Hero Section */}
        <DecadeHero
          title="80S YEARBOOK"
          subtitle="GET TOTALLY AWESOME WITH AUTHENTIC 80S VIBES"
          avatarCost={avatarCost}
          styles={styles}
        />

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
          <GenderSelector
            userGender={userGender}
            setUserGender={setUserGender}
            styles={styles}
          />

          <StyleSelector
            styles={styles}
            styleOptions={EIGHTIES_STYLES}
            selectedStyle={selectedStyle}
            setSelectedStyle={setSelectedStyle}
            decade="80"
          />
        </section>

        {/* Advanced Settings */}
        <AdvancedSettings
          showAdvancedSettings={showAdvancedSettings}
          toggleAdvancedSettings={toggleAdvancedSettings}
          workflowType={workflowType}
          setWorkflowType={setWorkflowType}
          styleStrength={styleStrength}
          setStyleStrength={setStyleStrength}
          decade="80"
          styles={styles}
        />

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
        
        <DecadeBottomSection currentDecade="80s" />
      </main>
    </>
  );
}