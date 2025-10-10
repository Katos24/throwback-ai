import React, { useState, useEffect } from 'react';
import useRestoreLogic from "../../hooks/useRestoreLogic";
import ImageCompareSlider from "../../components/ImageCompareSlider";
import ProgressBar from "../../components/Restores/ProgressBar";
import BasicFeaturesSection from "../../components/Restores/BasicFeaturesSection";
import RestoreBasicSEO from "../../components/SEO/RestoreBasicSEO";
import styles from "../../styles/UnifiedRestore.module.css";
import RestorationCounter from '../../components/RestorationCounter';

export default function RestorePage() {
  const [restoreMode, setRestoreMode] = useState('basic'); // 'basic' or 'premiumColor'
  
  // Dynamic cost and endpoint based on mode
  const getRestoreConfig = () => {
    switch(restoreMode) {
      case 'basic':
        return { cost: 1, endpoint: "/api/replicate/restore", isPremium: false };
      case 'premiumColor':
        return { cost: 40, endpoint: "/api/replicate/restorePremium", isPremium: true };
      default:
        return { cost: 1, endpoint: "/api/replicate/restore", isPremium: false };
    }
  };

  const config = getRestoreConfig();
  
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
  } = useRestoreLogic(config.cost, config.endpoint, config.isPremium);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const canRestore = selectedFile && !loading && !processing && credits >= config.cost;
  
  const getFixedButtonText = () => {
    if (loading || processing) {
      return processing ? 'Compressing...' : getModeActionText() + '...';
    }
    if (credits < config.cost) {
      return isLoggedIn ? '💳 Buy More Credits' : '🔒 Sign Up to Continue';
    }
    return `✨ ${getModeActionText()} (${config.cost} ${config.cost === 1 ? 'credit' : 'credits'})`;
  };

  const getModeActionText = () => {
    return restoreMode === 'premiumColor' ? 'Premium Colorize' : 'Restore Photo';
  };

  const getModeTitle = () => {
    return 'AI Photo Enhancement';
  };

  const getModeSubtitle = () => {
    return 'Choose Your Enhancement Level';
  };

  const getModeDescription = () => {
    return 'Upload your photo and choose between Basic Restore (1 credit) for quick fixes or Premium Colorization (40 credits) for stunning, studio-quality color transformation.';
  };

  const handleRestoreClick = () => {
    if (credits < config.cost) {
      router.push(isLoggedIn ? "/pricing" : "/signup");
      return;
    }
    handleGenerateOrRedirect();
  };

  // Handle using restored image as new input
  const handleUseRestoredImage = async () => {
    try {
      const response = await fetch(restoredUrl);
      const blob = await response.blob();
      const file = new File([blob], 'restored-image.jpg', { type: 'image/jpeg' });
      
      handleReset();
      
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
      }
      
      handleFileInput({ target: { files: [file] } });
    } catch (error) {
      console.error('Error converting image:', error);
      alert('Failed to prepare image. Please try again.');
    }
  };

  // Get background class based on mode
  const getBackgroundClass = () => {
    return restoreMode === 'premiumColor' ? styles.premiumBackground : '';
  };

  return (
    <>
      <RestoreBasicSEO />
      
      <div className={styles.container}>
        {/* Animated Background */}
        <div className={`${styles.backgroundParticles} ${getBackgroundClass()}`}></div>

        <div className={styles.content}>
          {/* Header */}
          <div className={`${styles.header} ${restoreMode === 'premiumColor' ? styles.premiumHeader : ''}`}>
            {/* Compact Credits */}
            <div className={styles.compactCredits}>
              <div className={styles.compactCreditsInfo}>
                <span className={styles.creditsIcon}>
                  {restoreMode === 'premiumColor' ? '💎' : '⚡'}
                </span>
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
                <span className={styles.titleGradient}>
                  AI Photo Enhancement
                </span>
              </h1>
              <span className={styles.subtitle}>
                Choose Your Enhancement Level
              </span>
            </div>

            {/* Description */}
            <p className={styles.description}>
              Upload your photo and choose between <strong>Basic Restore (1 credit)</strong> for quick fixes or <strong>Premium Colorization (40 credits)</strong> for stunning, studio-quality color transformation.
              {' '}<strong>Sign up and get 50 free credits</strong> - Try it free!
            </p>
          </div>

          {/* Restoration Counter */}
          <RestorationCounter />

          {/* Main Content */}
          <div className={styles.mainContent}>
            <div className={styles.uploadSection}>
              
              {/* UPLOAD CARD */}
              <div className={`${styles.uploadCard} ${config.isPremium ? styles.premiumCard : ''}`}>
                <h2 className={styles.sectionTitle}>
                  <span>{restoredUrl ? '✨' : '📤'}</span>
                  {restoredUrl ? 'Results' : 'Upload Your Photo'}
                </h2>

                {/* Show Upload Zone OR Results */}
                {!restoredUrl ? (
                  <>
                    {/* Upload Zone */}
                    <div
                      className={`${styles.uploadZone} ${dragActive ? styles.uploadZoneDragActive : ''}`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => !loading && fileInputRef.current?.click()}
                      style={{ position: 'relative' }}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        disabled={loading || processing}
                        className={styles.hiddenInput}
                      />
                      
                      {selectedPreviewUrl ? (
                        <div className={styles.uploadContent}>
                          <img 
                            src={selectedPreviewUrl} 
                            alt="Original" 
                            className={styles.uploadPreview}
                          />
                        </div>
                      ) : (
                        <div className={styles.uploadPlaceholder}>
                          <div className={styles.uploadIcon}>
                            <span style={{ fontSize: '2rem' }}>
                              {restoreMode === 'premiumColor' ? '🌈' : '📁'}
                            </span>
                          </div>
                          <div>
                            <p className={styles.uploadTitle}>
                              Drop your photo here
                            </p>
                            <p className={styles.uploadDescription}>
                              or click to browse • PNG, JPG, HEIC up to 10MB
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {dragActive && (
                        <div className={styles.dragOverlay}>
                          <p>Drop to upload!</p>
                        </div>
                      )}

                      {/* Progress Overlay */}
                      {loading && selectedPreviewUrl && (
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'rgba(0, 0, 0, 0.8)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '1rem',
                          zIndex: 10,
                          borderRadius: '12px'
                        }}>
                          <div className={styles.loadingSpinner} style={{
                            width: '60px',
                            height: '60px',
                            border: config.isPremium 
                              ? '4px solid rgba(168, 85, 247, 0.3)'
                              : '4px solid rgba(59, 130, 246, 0.3)',
                            borderTop: config.isPremium 
                              ? '4px solid #a855f7'
                              : '4px solid #3b82f6',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                          }}></div>
                          <div style={{
                            textAlign: 'center',
                            color: 'white',
                            fontSize: '1.1rem',
                            fontWeight: '600'
                          }}>
                            {progressStatus}
                          </div>
                          {progressPercent !== null && (
                            <div style={{
                              width: '80%',
                              maxWidth: '300px',
                              height: '8px',
                              background: 'rgba(255, 255, 255, 0.2)',
                              borderRadius: '4px',
                              overflow: 'hidden'
                            }}>
                              <div style={{
                                width: `${progressPercent}%`,
                                height: '100%',
                                background: config.isPremium 
                                  ? 'linear-gradient(90deg, #a855f7, #ec4899)'
                                  : 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                                transition: 'width 0.3s ease',
                                borderRadius: '4px'
                              }}></div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* MODE SELECTOR - Only show when image uploaded, not loading */}
                    {selectedFile && !loading && (
                      <div className={styles.restoreOptionsContainer}>
                        <h3 className={styles.optionsTitle}>Choose Your Enhancement</h3>
                        <p className={styles.optionsSubtitle}>Select the enhancement level that's right for your photo</p>
                        
                        <div className={styles.restoreOptionsGrid}>
                          <div 
                            className={`${styles.restoreOptionCard} ${restoreMode === 'basic' ? styles.optionActive : ''}`}
                            onClick={() => setRestoreMode('basic')}
                          >
                            <div className={styles.optionBadge}>⚡ ONLY 1 CREDIT</div>
                            <h4>Basic Restore</h4>
                            <p>Perfect for quick fixes - removes scratches, enhances clarity, and improves overall quality</p>
                          </div>

                          <div 
                            className={`${styles.restoreOptionCard} ${restoreMode === 'premiumColor' ? styles.optionActive : ''} ${credits < 40 ? styles.optionDisabled : ''}`}
                            onClick={() => credits >= 40 && setRestoreMode('premiumColor')}
                          >
                            <div className={styles.optionBadge}>💎 40 CREDITS</div>
                            <h4>Premium Colorization</h4>
                            <p>{credits < 40 ? 'Not enough credits - need 40 credits' : 'Studio-quality AI colorization with vibrant, historically accurate colors'}</p>
                          </div>
                        </div>

                        {/* Process Button and Start Over on same line */}
                        <div className={styles.buttonRow}>
                          <button
                            onClick={handleRestoreClick}
                            disabled={loading || processing || credits < config.cost}
                            className={styles.restoreButton}
                          >
                            {getFixedButtonText()}
                          </button>
                          
                          <button
                            onClick={handleReset}
                            className={styles.secondaryButton}
                          >
                            <span>🔄</span>
                            Start Over
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {/* Results View */}
                    <div className={styles.comparisonContainer}>
                      <div className={styles.imageComparisonWrapper}>
                        <ImageCompareSlider
                          beforeImage={selectedPreviewUrl}
                          afterImage={restoredUrl}
                        />
                      </div>
                    </div>

                    {/* Download and Reset Buttons */}
                    <div className={styles.buttonRow}>
                      <button
                        onClick={handleDownload}
                        className={styles.primaryButton}
                        style={config.isPremium ? {background: 'linear-gradient(135deg, #a855f7, #ec4899)'} : {}}
                      >
                        <span>⬇️</span>
                        Download Result
                      </button>
                      
                      <button
                        onClick={handleReset}
                        className={styles.secondaryButton}
                      >
                        <span>🔄</span>
                        New Photo
                      </button>
                    </div>

                    {/* Enhance Again Button - Right below download */}
                    <div className={styles.enhanceAgainSection}>
                      <button
                        onClick={handleUseRestoredImage}
                        className={styles.enhanceAgainButton}
                      >
                        🎨 Enhance This Result Again
                      </button>
                      <p className={styles.enhanceAgainHint}>
                        Use the {restoreMode === 'basic' ? 'restored' : 'colorized'} photo as input to apply another enhancement
                      </p>
                    </div>

                    {/* Success Message */}
                    <div className={`${styles.alert} ${styles.alertSuccess}`}>
                      <span>{config.isPremium ? '🌈' : '✅'}</span>
                      <p>Photo successfully processed! Use the slider to compare.</p>
                    </div>
                  </>
                )}

                {/* Pro Tip */}
                <div className={styles.bottomProTip}>
                  <span className={styles.proTipIcon}>
                    {restoreMode === 'premiumColor' ? '💎' : '💡'}
                  </span>
                  <span className={styles.proTipText}>
                    <strong>{config.isPremium ? 'Premium Tip:' : 'Pro Tip:'}</strong> For best results: Start with Basic Restore to fix damage, then use Premium Color to add vibrant, studio-quality colors.
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Before/After Gallery */}
          {restoredUrl && selectedPreviewUrl && (
            <div className={styles.beforeAfterGallery}>
              <h3 className={styles.galleryTitle}>
                <span>
                  {restoreMode === 'premiumColor' ? '🌈' : '🖼️'}
                </span>
                {restoreMode === 'premiumColor' ? 'Premium Transformation Gallery' : 'Before & After Gallery'}
              </h3>
              <div className={styles.beforeAfterGrid}>
                <div className={styles.beforeAfterItem}>
                  <div className={styles.beforeAfterLabel}>
                    <span>⬅️</span>
                    {restoreMode === 'basic' ? 'Before' : 'Original'}
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
                    {restoreMode === 'premiumColor' ? 'Premium Result' : 'After'}
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
            {(restoreMode === 'premiumColor' ? [
              { icon: "🌈", title: "Studio Quality", desc: "Premium AI colorization with vibrant, accurate colors" },
              { icon: "🎨", title: "Advanced AI", desc: "Trained on artistic and historical photo data" },
              { icon: "💎", title: "Best Results", desc: "Highest quality colorization available" }
            ] : [
              { icon: "⚡", title: "Lightning Fast", desc: "Process photos in seconds with our optimized AI models" },
              { icon: "✨", title: "AI Powered", desc: "Advanced neural networks trained on millions of photos" },
              { icon: "⬇️", title: "High Quality", desc: "Download full resolution restored images" }
            ]).map((feature, idx) => (
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