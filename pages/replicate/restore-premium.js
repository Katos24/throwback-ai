import React from 'react';
import Link from 'next/link';
import useRestoreLogic from "../../hooks/useRestoreLogic";
import RestoreUploadCard from "../../components/Restores/RestoreUploadCard";
import ProgressBar from "../../components/Restores/ProgressBar";
import BasicFeaturesSection from "../../components/Restores/BasicFeaturesSection";
import RestorePremiumSEO from "../../components/SEO/RestorePremiumSEO";
import styles from "../../styles/ModernRestore.module.css";

export default function RestorePremium() {
  const restoreCost = 40;
  const apiEndpoint = "/api/replicate/restorePremium";
  
  const {
    selectedFile,
    selectedPreviewUrl,
    restoredUrl,
    loading,
    processing,
    progressStatus,
    progressPercent,
    dragActive,
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
  } = useRestoreLogic(restoreCost, apiEndpoint, true);

  return (
    <>
      <RestorePremiumSEO />

      <div className={`${styles.container} ${styles.premiumContainer}`}>
        {/* Premium Animated Background */}
        <div className={`${styles.backgroundParticles} ${styles.premiumBackground}`}></div>

        <div className={styles.content}>
          {/* Premium Header */}
          <div className={`${styles.header} ${styles.premiumHeader}`}>
            {/* Compact Credits */}
            <div className={styles.compactCredits}>
              <div className={styles.compactCreditsInfo}>
                <span className={styles.creditsIcon}>💎</span>
                <span className={styles.creditsText}>{credits} {credits === 1 ? 'credit' : 'credits'}</span>
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
                <span className={styles.titleGradient}>Premium Restore</span>
              </h1>
              <span className={styles.subtitle}>Full Color AI Studio</span>
            </div>

            {/* Description */}
            <p className={styles.description}>
              Transform black & white photos into vibrant color masterpieces with premium AI. <strong>Sign up and get 50 free credits</strong> - Try premium colorization free!
              <span className={styles.creditPill} style={{background: 'linear-gradient(135deg, #a855f7, #ec4899)'}}>
                Costs {restoreCost} credits
              </span>
              <br />
              <Link href="/gallery" className={styles.galleryLink}>
                See gallery examples →
              </Link>
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
                handleGenerateOrRedirect={handleGenerateOrRedirect}
                handleDownload={handleDownload}
                handleReset={handleReset}
                getButtonText={getButtonText}
                getButtonEmoji={getButtonEmoji}
                isComplete={isComplete}
                styles={styles}
                isPremium={true}
                fileInputRef={fileInputRef}
                sectionTitle="Upload Your Photo"
                resultTitle="Premium Results"
                uploadPlaceholderIcon="🌈"
                successMessage="Premium restoration complete! Use the slider to compare."
                proTip={{
                  icon: '💎',
                  text: 'For old or black & white photos, start with Photo Restoration for clarity, then use Full Color Restore to bring it to life.'
                }}
              />

              {/* Progress Display - Only show when NOT loading */}
              {progressStatus !== "idle" && !loading && (
                <div className={styles.progressCard}>
                  <ProgressBar status={progressStatus} percent={progressPercent} />
                </div>
              )}
            </div>
          </div>



          {/* Before/After Gallery */}
          {restoredUrl && selectedPreviewUrl && (
            <div className={styles.beforeAfterGallery}>
              <h3 className={styles.galleryTitle}>
                <span>🌈</span>
                Premium Transformation Gallery
              </h3>
              <div className={styles.beforeAfterGrid}>
                <div className={styles.beforeAfterItem}>
                  <div className={styles.beforeAfterLabel}>
                    <span>⬅️</span>
                    Original
                  </div>
                  <div className={styles.beforeAfterImageWrapper}>
                    <img 
                      src={selectedPreviewUrl} 
                      alt="Before premium restoration" 
                      className={styles.beforeAfterImage}
                    />
                  </div>
                </div>
                <div className={styles.beforeAfterItem}>
                  <div className={styles.beforeAfterLabel}>
                    <span>➡️</span>
                    Premium Result
                  </div>
                  <div className={styles.beforeAfterImageWrapper}>
                    <img 
                      src={restoredUrl} 
                      alt="After premium restoration" 
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
              { icon: "🌈", title: "Full Colorization", desc: "Transform black & white photos into vibrant color masterpieces" },
              { icon: "🎨", title: "Premium AI", desc: "Advanced neural networks trained on artistic and historical data" },
              { icon: "💎", title: "Studio Quality", desc: "Professional-grade results with exceptional detail and accuracy" }
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