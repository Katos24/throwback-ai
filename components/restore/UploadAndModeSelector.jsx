import React from 'react';
import Image from 'next/image';
import styles from './UploadAndModeSelector.module.css';

export default function UploadAndModeSelector({
  selectedPreviewUrl,
  dragActive,
  loading,
  processing,
  progressStatus,
  progressPercent,
  restoreMode,
  isPremium,
  fileInputRef,
  handleDrag,
  handleDrop,
  handleFileInput,
  selectedFile,
  setRestoreMode,
  credits,
  handleRestoreClick,
  handleReset,
  getFixedButtonText
}) {
  return (
    <div className={styles.sideBySideContainer}>
      {/* Upload Zone Section */}
      <div className={styles.uploadSection}>
        <div
          id="upload-zone"
          className={`${styles.uploadZone} ${dragActive ? styles.dragActive : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !loading && fileInputRef.current?.click()}
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
              <Image 
                src={selectedPreviewUrl} 
                alt="Original photo to restore" 
                width={800}
                height={600}
                className={styles.uploadPreview}
                style={{ objectFit: 'contain' }}
              />
            </div>
          ) : (
            <div className={styles.placeholder}>
              <div className={styles.icon}>
                <span style={{ fontSize: '2rem' }}>
                  {restoreMode === 'premiumColor' ? '🌈' : '📁'}
                </span>
              </div>
              <div>
                <p className={styles.title}>
                  Drop your photo here
                </p>
                <p className={styles.description}>
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
          
          {loading && selectedPreviewUrl && (
            <div className={styles.progressOverlay}>
              <div className={`${styles.spinner} ${isPremium ? styles.premiumSpinner : ''}`}></div>
              <div className={styles.progressText}>
                {progressStatus}
              </div>
              {progressPercent !== null && (
                <div className={styles.progressBarContainer}>
                  <div 
                    className={`${styles.progressBar} ${isPremium ? styles.premiumProgress : ''}`}
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

{/* Mode Selector Section */}
<div className={styles.modeSection}>
  <div className={styles.modeSelectorContainer}>          
    <div className={styles.optionsGrid}>
      <div 
        className={`${styles.optionCard} ${restoreMode === 'basic' ? styles.active : ''}`}
        onClick={() => setRestoreMode('basic')}
      >
        <div className={styles.badge}>⚡ 1 CREDIT</div>
        <h4 className={styles.optionTitle}>Basic Restore</h4>
        <p className={styles.optionDesc}>
          Perfect for quick fixes - removes scratches, enhances clarity, and improves overall quality
        </p>
        {restoreMode === 'basic' && <div className={styles.checkmark}>✓</div>}
      </div>
      
      <div 
        className={`${styles.optionCard} ${restoreMode === 'premiumColor' ? styles.active : ''} ${credits < 40 ? styles.disabled : ''}`}
        onClick={() => credits >= 40 && setRestoreMode('premiumColor')}
      >
        <div className={`${styles.badge} ${styles.premiumBadge}`}>💎 40 CREDITS</div>
        <h4 className={styles.optionTitle}>Premium Colorization</h4>
        <p className={styles.optionDesc}>
          {credits < 40 
            ? 'Not enough credits - need 40 credits' 
            : 'Studio-quality AI colorization with vibrant, historically accurate colors'}
        </p>
        {restoreMode === 'premiumColor' && <div className={styles.checkmark}>✓</div>}
      </div>
    </div>
    
    {/* Always show buttons, not gated by selectedFile */}
    <div className={styles.buttonRow}>
      <button
        onClick={handleRestoreClick}
        disabled={loading || processing || !selectedFile} 
        className={styles.primaryButton}
      >
        {getFixedButtonText()}
      </button>
      
      <button
        onClick={handleReset}
        className={styles.secondaryButton}
      >
        <span className={styles.buttonIcon}>🔄</span>
        <span>Start Over</span>
      </button>
    </div>
  </div>
</div>
    </div>
  );
}