import React from 'react';
import Image from 'next/image';
import styles from './UploadZone.module.css';

export default function UploadZone({
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
  handleFileInput
}) {
  return (
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
  );
}