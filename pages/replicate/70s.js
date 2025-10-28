import { useCallback } from "react";
import styles from "../../styles/decades/SeventiesPage.module.css";
import { SEVENTIES_STYLES, buildSeventiesPrompt } from "../../components/SeventiesPrompts";
import DecadeBottomSection from "../../components/DecadeBottomSection";
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
import SeventiesSEO from "../../components/SEO/SeventiesSEO";

export default function SeventiesPage() {
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
  } = useDecadePageLogic("70s", 50);

  // Generation hook with 70s prompt builder wrapper
  const seventiesPromptWrapper = useCallback((gender, styleId, workflowType, strength) => {
    return buildSeventiesPrompt({
      gender,
      styleId,
      preserveFacialFeatures: true,
      intensity: strength > 25 ? 'strong' : strength < 15 ? 'subtle' : 'medium'
    });
  }, []);
  
  const { generateAvatar, isLoading, progress, progressStage } = useDecadeGeneration("70s", seventiesPromptWrapper);

  // Scroll selectors for mobile
const scrollSelectors = [
  `.${styles.tvSection}`,
  `.${styles.tvSet}`,
  `.${styles.tvScreen}`,
  `.${styles.tvContent}`
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
      <SeventiesSEO />

      <main className={styles.container}>
        {/* Animated Background Elements */}
        <div className={styles.woodGrain}></div>
        <div className={styles.groovyPatterns}>
          {[0, 2, 4, 6].map((delay, index) => (
            <div 
              key={index}
              className={styles.pattern} 
              style={{
                left: `${15 + index * 25}%`, 
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
          icon={{ emoji: "📺", label: "TV" }}
          styles={styles}
        />

        {/* Hero Section */}
        <DecadeHero
          title="70S YEARBOOK"
          avatarCost={avatarCost}
          styles={styles}
            currentDecade="70s"  // ← Make sure this says "70s"

        />

        {/* TV Set Section */}
        <section className={styles.tvSection}>
          <div 
            className={styles.tvSet}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className={styles.tvScreen}>
              <div className={styles.tvHeader}>
                {resultImageUrl ? '70S YEARBOOK RESULT' : 'UPLOAD YOUR PHOTO'}
              </div>
              
              <div className={styles.tvContent}>
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
                    decade="70s"
                    styles={styles}
                  />
                ) : (
                  <ImageDisplay
                    previewUrl={previewUrl}
                    resultImageUrl={resultImageUrl}
                    showingOriginal={showingOriginal}
                    setShowingOriginal={setShowingOriginal}
                    handleDownload={handleDownload}
                    decade="70s"
                    styles={styles}
                    isLoading={isLoading}
                    progress={progress}
                    progressStage={progressStage}
                  />
                )}
              </div>
            </div>
            
            {/* TV Controls */}
            <div className={styles.tvControls}>
              <div className={styles.knob}></div>
              <div className={styles.knob}></div>
              <div className={styles.speaker}></div>
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

          <DecadeStyleGallery
          styles={styles}
          styleOptions={SEVENTIES_STYLES}
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
          userGender={userGender}
          decade="70"
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
          decade="70"
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
        
        <DecadeBottomSection currentDecade="70s" />
      </main>
    </>
  );
}