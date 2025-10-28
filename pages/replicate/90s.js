import { useCallback } from "react";
import styles from "../../styles/decades/NinetiesPage.module.css";
import { NINETIES_STYLES, buildNinetiesPrompt } from "../../components/NinetiesPrompts";
import DecadeShowcase from "../../components/decades/shared/DecadeShowcase";
import PhotoUpload from "../../components/decades/shared/PhotoUpload";
import ImageDisplay from "../../components/decades/shared/ImageDisplay";
import GenerateButton from "../../components/decades/shared/GenerateButton";
import CreditsHeader from "../../components/decades/shared/CreditsHeader";
import DecadeHero from "../../components/decades/shared/DecadeHero";
import GenderSelector from "../../components/decades/shared/GenderSelector";
import DecadeStyleGallery from "../../components/decades/shared/DecadeStyleGallery";
import AdvancedSettings from "../../components/decades/shared/AdvancedSettings";
import { useDecadeGeneration } from "../../components/decades/hooks/useDecadeGeneration";
import { useDecadePageLogic } from "../../components/decades/hooks/useDecadePageLogic";
import { useDecadeGenerationHandler } from "../../components/decades/hooks/useDecadeGenerationHandler";
import NinetiesSEO from "../../components/SEO/NinetiesSEO";

export default function NinetiesPage() {
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
  } = useDecadePageLogic("90s", 50);

  // FIXED: Generation hook with correct parameter structure
  const ninetiesPromptWrapper = useCallback((gender, styleId, workflow, strength) => {
    // Call buildNinetiesPrompt with correct parameters
    return buildNinetiesPrompt(gender, styleId, workflow, strength);
  }, []);
  
  const { generateAvatar, isLoading, progress, progressStage } = useDecadeGeneration("90s", ninetiesPromptWrapper);

  // Scroll selectors for mobile
  const scrollSelectors = [
    `.${styles.crtMonitor}`,
    `.${styles.monitorSection}`,
    `.${styles.monitorScreen}`,
    `.${styles.digitalDisplay}`
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
        <CreditsHeader
          credits={credits}
          isLoggedIn={isLoggedIn}
          onButtonClick={() => router.push(isLoggedIn ? "/pricing" : "/signup")}
          icon={{ emoji: "💻", label: "Computer" }}
          styles={styles}
        />

        {/* Hero Section */}
        <DecadeHero
          title="90S YEARBOOK"
          avatarCost={avatarCost}
          styles={styles}
          currentDecade="90s"  // ← Make sure this says "90s"
        />

        {/* CRT Monitor Section */}
        <section className={styles.monitorSection}>
          <div 
            className={styles.crtMonitor}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className={styles.monitorScreen}>
              <div className={styles.screenHeader}>
                {resultImageUrl ? '90S YEARBOOK RESULT' : 'UPLOAD YOUR PHOTO'}
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

           <DecadeStyleGallery
            styles={styles}
            styleOptions={NINETIES_STYLES}
            selectedStyle={selectedStyle}
            setSelectedStyle={setSelectedStyle}
            userGender={userGender}
            decade="90"
            visibleCount={6}
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
          decade="90"
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
        
      <DecadeShowcase currentDecade="90s" />
      </main>
    </>
  );
}