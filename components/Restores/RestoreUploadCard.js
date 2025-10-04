import React from 'react';
import ImageCompareSlider from "../ImageCompareSlider";

/**
 * Shared component for restore upload card UI
 * Used by both RestoreBasic and RestorePremium pages
 */
export default function RestoreUploadCard({
  // File state
  selectedFile,
  selectedPreviewUrl,
  restoredUrl,
  
  // Loading state
  loading,
  processing,
  progressStatus,
  progressPercent,
  
  // UI state
  dragActive,
  
  // Handlers
  handleDrag,
  handleDrop,
  handleFileInput,
  handleGenerateOrRedirect,
  handleDownload,
  handleReset,
  
  // Button configuration
  getButtonText,
  getButtonEmoji,
  isComplete,
  
  // Styling
  styles,
  isPremium = false,
  
  // Refs
  fileInputRef,
  
  // Messages
  sectionTitle = 'Upload Your Photo',
  resultTitle = 'Results',
  uploadPlaceholderIcon = '📁',
  successMessage = 'Photo successfully restored! Use the slider to compare.',
  proTip = {
    icon: '💡',
    text: 'For old or black & white photos, start with Photo Restoration for clarity, then use Full Color Restore to bring it to life.'
  }
}) {
  return (
    <div className={`${styles.uploadCard} ${isPremium ? styles.premiumCard : ''}`}>
      <h2 className={styles.sectionTitle}>
        <span>{isPremium ? '🎨' : '📤'}</span>
        {restoredUrl ? resultTitle : sectionTitle}
      </h2>
      
      {/* Show upload zone OR results */}
      {!restoredUrl ? (
        <>
          {/* Upload Zone with Progress Overlay */}
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
                  <span style={{ fontSize: '2rem' }}>{uploadPlaceholderIcon}</span>
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

            {/* Progress Overlay - Shows over the image during generation */}
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
                  border: isPremium 
                    ? '4px solid rgba(168, 85, 247, 0.3)'
                    : '4px solid rgba(59, 130, 246, 0.3)',
                  borderTop: isPremium 
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
                      background: isPremium 
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

          {/* Action Buttons */}
          <div className={styles.buttonRow}>
            <button
              onClick={handleGenerateOrRedirect}
              disabled={loading || processing}
              className={`${styles.primaryButton} ${isComplete ? styles.ready : ''}`}
              style={isPremium ? {background: 'linear-gradient(135deg, #a855f7, #ec4899)'} : {}}
            >
              {loading || processing ? (
                <>
                  <div className={styles.loadingSpinner}></div>
                  {getButtonText()}
                </>
              ) : (
                <>
                  {getButtonEmoji && getButtonEmoji() && <span>{getButtonEmoji()}</span>}
                  {getButtonText()}
                </>
              )}
            </button>
            
            {(selectedFile || restoredUrl) && (
              <button
                onClick={handleReset}
                disabled={loading || processing}
                className={styles.secondaryButton}
              >
                <span>🔄</span>
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Results - shown in same space */}
          <div className={styles.comparisonContainer}>
            <div className={styles.imageComparisonWrapper}>
              <ImageCompareSlider
                beforeImage={selectedPreviewUrl}
                afterImage={restoredUrl}
              />
            </div>
          </div>

          {/* Download and Reset buttons */}
          <div className={styles.buttonRow}>
            <button
              onClick={handleDownload}
              className={styles.primaryButton}
              style={isPremium ? {background: 'linear-gradient(135deg, #a855f7, #ec4899)'} : {}}
            >
              <span>⬇️</span>
              Download
            </button>
            
            <button
              onClick={handleReset}
              className={styles.secondaryButton}
            >
              <span>🔄</span>
              New Photo
            </button>
          </div>

          <div className={`${styles.alert} ${styles.alertSuccess}`}>
            <span>{isPremium ? '🌈' : '✅'}</span>
            <p>{successMessage}</p>
          </div>
        </>
      )}

      {/* Pro Tip - always visible */}
      <div className={styles.bottomProTip}>
        <span className={styles.proTipIcon}>{proTip.icon}</span>
        <span className={styles.proTipText}>
          <strong>{isPremium ? 'Premium Tip:' : 'Pro Tip:'}</strong> {proTip.text}
        </span>
      </div>
    </div>
  );
}