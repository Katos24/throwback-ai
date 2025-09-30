import { useCallback, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/decades/NinetiesNew.module.css";
import { NINETIES_STYLES, buildNinetiesPrompt } from "../../components/NinetiesPrompts";
import { useDecadeGeneration } from "../../components/decades/hooks/useDecadeGeneration";
import { useDecadePageLogic } from "../../components/decades/hooks/useDecadePageLogic";
import { useDecadeGenerationHandler } from "../../components/decades/hooks/useDecadeGenerationHandler";
import NinetiesSEO from "../../components/SEO/NinetiesSEO";

export default function NinetiesPage() {
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
    scrollToPhotoOnMobile,
    isComplete,
    avatarCost
  } = useDecadePageLogic("90s", 50);

  const ninetiesPromptWrapper = useCallback((gender, styleId, workflow, strength) => {
    return buildNinetiesPrompt(gender, styleId, workflow, strength);
  }, []);
  
  const { generateAvatar, isLoading, progress, progressStage } = useDecadeGeneration("90s", ninetiesPromptWrapper);

  const scrollSelectors = [
    `.${styles.polaroidFrame}`,
    `.${styles.deskSection}`,
    `.${styles.polaroidPhoto}`
  ];

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

  // Auto-scroll to image on mobile when generating
  useEffect(() => {
    if (isLoading && typeof window !== 'undefined' && window.innerWidth < 768) {
      setTimeout(() => {
        const element = document.querySelector(`.${styles.polaroidFrame}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    }
  }, [isLoading]);

  const handleChangePhoto = () => {
    setPhoto(null);
    setPreviewUrl(null);
    setResultImageUrl(null);
    setShowingOriginal(false);
    document.getElementById('photo-upload')?.click();
  };

  return (
    <>
      <NinetiesSEO />

      <main className={styles.container}>
        {/* Floating Stickers */}
        <div className={styles.floatingStickers}>
          <div className={`${styles.sticker} ${styles.sticker1}`}>✨</div>
          <div className={`${styles.sticker} ${styles.sticker2}`}>🌟</div>
          <div className={`${styles.sticker} ${styles.sticker3}`}>💫</div>
          <div className={`${styles.sticker} ${styles.sticker4}`}>⭐</div>
        </div>

        {/* Notebook Paper Header */}
        <div className={styles.notebookHeader}>
          <div className={styles.creditsBadge}>
            {credits} CREDITS
          </div>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>90s YEARBOOK</h1>
            <p className={styles.subtitle}>~ As if you wouldn&apos;t want a yearbook photo ~</p>
          </div>
        </div>

        {/* Wooden Desk Upload Section */}
        <section 
          className={styles.deskSection}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className={styles.polaroidFrame}>
            <div className={styles.polaroidPhoto}>
              {!previewUrl && !resultImageUrl ? (
                <label htmlFor="photo-upload" className={styles.uploadLabel}>
                  <div className={styles.uploadIcon}>📸</div>
                  <div className={styles.uploadText}>UPLOAD YOUR PHOTO HERE</div>
                  <div className={styles.uploadHint}>Click or drag & drop</div>
                </label>
              ) : (
                <div className={styles.imageWrapper}>
                  {(previewUrl || resultImageUrl) && (
                    <Image
                      src={showingOriginal ? previewUrl : (resultImageUrl || previewUrl)}
                      alt={showingOriginal ? "Original" : "90s Yearbook"}
                      fill
                      className={styles.resultImage}
                      quality={95}
                      sizes="(max-width: 768px) 100vw, 600px"
                    />
                  )}
                  
                  {/* Control Buttons */}
                  <div className={styles.imageControls}>
                    {resultImageUrl && (
                      <>
                        <button 
                          className={styles.controlButton}
                          onClick={() => setShowingOriginal(!showingOriginal)}
                        >
                          {showingOriginal ? "See Result" : "See Original"}
                        </button>
                        <button 
                          className={styles.controlButton}
                          onClick={handleDownload}
                        >
                          💾 Download
                        </button>
                      </>
                    )}
                    {(previewUrl || resultImageUrl) && (
                      <button 
                        className={styles.controlButton}
                        onClick={handleChangePhoto}
                      >
                        🔄 Change Photo
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {isLoading && (
                <div className={styles.loadingOverlay}>
                  <div className={styles.cassetteTape}>📼</div>
                  <div className={styles.loadingText}>{progressStage || "Processing..."}</div>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill} 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className={styles.progressPercent}>{Math.round(progress)}%</div>
                </div>
              )}
            </div>
            <div className={styles.polaroidCaption}>
              {resultImageUrl ? "Your rad 90s yearbook photo!" : "Your rad 90s transformation awaits!"}
            </div>
          </div>
        </section>

        {/* Gender Selector Buttons */}
        <section className={styles.genderSection}>
          <button
            className={`${styles.genderButton} ${userGender === 'male' ? styles.active : ''}`}
            onClick={() => setUserGender('male')}
          >
            DUDE
          </button>
          <button
            className={`${styles.genderButton} ${userGender === 'female' ? styles.active : ''}`}
            onClick={() => setUserGender('female')}
          >
            DUDETTE
          </button>
        </section>

        {/* Trapper Keeper Style Selector */}
        <section className={styles.styleSelector}>
          <h2 className={styles.styleTitle}>PICK YOUR STYLE</h2>
          <div className={styles.styleGrid}>
            {NINETIES_STYLES.map((style) => (
              <div
                key={style.id}
                className={`${styles.styleCard} ${selectedStyle === style.id ? styles.selected : ''}`}
                onClick={() => setSelectedStyle(style.id)}
              >
                <div className={styles.styleIcon}>{style.emoji}</div>
                <div className={styles.styleName}>{style.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Generate Button */}
        <section className={styles.generateSection}>
          <button
            className={styles.generateButton}
            onClick={handleGenerateOrRedirect}
            disabled={isLoading}
          >
            {isLoading ? `${Math.round(progress)}%` : getButtonText()}
          </button>
        </section>

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
      </main>
    </>
  );
}