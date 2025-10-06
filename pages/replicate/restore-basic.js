import React, { useState, useEffect } from 'react';
import useRestoreLogic from "../../hooks/useRestoreLogic";
import RestoreUploadCard from "../../components/Restores/RestoreUploadCard";
import ProgressBar from "../../components/Restores/ProgressBar";
import BasicFeaturesSection from "../../components/Restores/BasicFeaturesSection";
import RestoreBasicSEO from "../../components/SEO/RestoreBasicSEO";
import styles from "../../styles/ModernRestore.module.css";

export default function RestoreBasic() {
  const restoreCost = 1;
  const apiEndpoint = "/api/replicate/restore";
  
  const {
    selectedFile,
    selectedPreviewUrl,
    restoredUrl,
    loading,
    processing,
    progressStatus,
    progressPercent,
    dragActive,
    showScrollNotice,
    credits,
    isLoggedIn,
    isComplete,
    handleDrag,
    handleDrop,
    handleFileInput,
    handleGenerateOrRedirect,
    handleDownload,
    handleReset,
    getButtonText,
    getButtonEmoji,
    fileInputRef,
    router
  } = useRestoreLogic(restoreCost, apiEndpoint, false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fixed button logic - allows restore when user has credits (even if not logged in)
  const canRestore = selectedFile && !loading && !processing && credits >= restoreCost;
  
  const getFixedButtonText = () => {
    if (loading || processing) {
      return processing ? 'Compressing...' : 'Restoring...';
    }
    // Allow restore if user has enough credits (logged in or not)
    if (credits < restoreCost) {
      return isLoggedIn ? '💳 Buy More Credits' : '🔒 Sign Up to Restore';
    }
    return '✨ Restore Photo';
  };

  // Debug: log credits to console
  useEffect(() => {
    console.log('Credits:', credits, 'Cost:', restoreCost, 'Can restore:', canRestore);
  }, [credits, canRestore]);

  const handleRestoreClick = () => {
    // If they don't have enough credits, redirect to signup/pricing
    if (credits < restoreCost) {
      router.push(isLoggedIn ? "/pricing" : "/signup");
      return;
    }
    // Otherwise, proceed with restoration
    handleGenerateOrRedirect();
  };

  return (
    <>
      <RestoreBasicSEO />
      
      <div className={styles.container}>
        {/* Animated Background */}
        <div className={styles.backgroundParticles}></div>

        <div className={styles.content}>
          {/* Header */}
          <div className={styles.header}>
            {/* Compact Credits */}
            <div className={styles.compactCredits}>
              <div className={styles.compactCreditsInfo}>
                <span className={styles.creditsIcon}>⚡</span>
                <span className={styles.creditsText}>
                  {credits} {credits === 1 ? 'credit' : 'credits'}
                </span>
              </div>
              <button 
                onClick={() => router.push(isLoggedIn ? "/pricing" : "/signup")}
                className={styles.compactCreditsButton}
              >
                {isLoggedIn ? "+" : "Sign Up"}
              </button>
            </div>

            {/* Centered Title */}
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>
                <span className={styles.titleGradient}>PhotoFix</span>
              </h1>
              <span className={styles.subtitle}>AI Studio</span>
            </div>

            {/* Description */}
            <p className={styles.description}>
              Restore old photos to their former glory with advanced AI technology. 
              Remove scratches, enhance colors, and bring memories back to life.
              <span className={styles.creditPill}>Costs 1 credit</span>
            </p>
          </div>

          {/* Main Content */}
          <div className={styles.mainContent}>
            <div className={styles.uploadSection}>
              <RestoreUploadCard
                selectedFile={selectedFile}
                selectedPreviewUrl={selectedPreviewUrl}
                restoredUrl={restoredUrl}
                loading={loading}
                processing={processing}
                progressStatus={progressStatus}
                progressPercent={progressPercent}
                dragActive={dragActive}
                handleDrag={handleDrag}
                handleDrop={handleDrop}
                handleFileInput={handleFileInput}
                handleGenerateOrRedirect={handleRestoreClick}
                handleDownload={handleDownload}
                handleReset={handleReset}
                getButtonText={getFixedButtonText}
                getButtonEmoji={getButtonEmoji}
                isComplete={isComplete}
                styles={styles}
                isPremium={false}
                fileInputRef={fileInputRef}
                sectionTitle="Upload Your Photo"
                resultTitle="Results"
                uploadPlaceholderIcon="📁"
                successMessage="Photo successfully restored! Use the slider to compare."
                proTip={{
                  icon: '💡',
                  text: 'For old or black & white photos, start with Photo Restoration for clarity, then use Full Color Restore to bring it to life.'
                }}
                canRestore={canRestore}
              />

              {/* Progress Display - Only show when NOT loading */}
              {progressStatus !== "idle" && !loading && (
                <div className={styles.progressCard}>
                  <ProgressBar status={progressStatus} percent={progressPercent} />
                </div>
              )}

              {/* Success Notice */}
              {showScrollNotice && (
                <div className={`${styles.alert} ${styles.alertSuccess}`}>
                  <span>✅</span>
                  <div className={styles.alertContent}>
                    <p className={styles.alertTitle}>Your image has been restored!</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Before/After Gallery */}
          {restoredUrl && selectedPreviewUrl && (
            <div className={styles.beforeAfterGallery}>
              <h3 className={styles.galleryTitle}>
                <span>🖼️</span>
                Before & After Gallery
              </h3>
              <div className={styles.beforeAfterGrid}>
                <div className={styles.beforeAfterItem}>
                  <div className={styles.beforeAfterLabel}>
                    <span>⬅️</span>
                    Before
                  </div>
                  <div className={styles.beforeAfterImageWrapper}>
                    <img 
                      src={selectedPreviewUrl} 
                      alt="Before restoration" 
                      className={styles.beforeAfterImage}
                    />
                  </div>
                </div>
                <div className={styles.beforeAfterItem}>
                  <div className={styles.beforeAfterLabel}>
                    <span>➡️</span>
                    After
                  </div>
                  <div className={styles.beforeAfterImageWrapper}>
                    <img 
                      src={restoredUrl} 
                      alt="After restoration" 
                      className={styles.beforeAfterImage}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features Grid */}
          <div className={styles.featuresGrid}>
            {[
              { icon: "⚡", title: "Lightning Fast", desc: "Process photos in seconds with our optimized AI models" },
              { icon: "✨", title: "AI Powered", desc: "Advanced neural networks trained on millions of photos" },
              { icon: "⬇️", title: "High Quality", desc: "Download full resolution restored images" }
            ].map((feature, idx) => (
              <div key={idx} className={styles.featureCard}>
                <span className={styles.featureIcon}>{feature.icon}</span>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <BasicFeaturesSection />
      </div>
    </>
  );
}