import Image from 'next/image';
import styles from '../../styles/AvatarPage.module.css';

/**
 * PhotoUploader Component - Step 3 with Style Display
 * Shows selected style and handles photo upload
 */
const PhotoUploader = ({
  dragActive,
  previewUrl,
  resultImageUrl,
  showingOriginal,
  isLoading,
  progress,
  progressStage,
  selectedStyleLabel,
  selectedCategoryLabel,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onClick,
  onPhotoUpload,
  onToggleOriginal,
  onDownload
}) => {
  return (
    <div className={styles.uploadSection} id="upload-section">
      <h2 className={styles.sectionTitle}>Step 3: Upload Your Photo</h2>
      
      {/* Selected Style Display */}
      {selectedStyleLabel && (
        <div className={styles.selectedStyleDisplay}>
          <div className={styles.selectedStyleBadge}>
            <span className={styles.selectedStyleLabel}>
              Selected Style: <strong>{selectedCategoryLabel} - {selectedStyleLabel}</strong>
            </span>
          </div>
        </div>
      )}
      
      <div className={styles.uploadWrapper}>
        <div
          className={`${styles.uploadZone} ${dragActive ? styles.dragActive : ''} ${previewUrl ? styles.hasPreview : ''}`}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onClick={onClick}
        >
          {resultImageUrl ? (
            <div className={styles.resultContainer}>
              <div className={styles.previewContainer}>
                <Image
                  src={showingOriginal ? previewUrl : resultImageUrl}
                  alt={showingOriginal ? "Original photo" : "Generated Avatar"}
                  width={400}
                  height={400}
                  unoptimized
                  className={styles.displayImage}
                />
                <div className={styles.changePhotoOverlay}>
                  Click to change photo
                </div>
              </div>
              <div className={styles.imageControls}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleOriginal();
                  }}
                  className={styles.toggleButton}
                >
                  {showingOriginal ? "Show Result" : "Show Original"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDownload();
                  }}
                  className={styles.downloadBtn}
                >
                  📥 Download Avatar
                </button>
              </div>
            </div>
          ) : previewUrl ? (
            <div className={styles.previewContainer}>
              <Image
                src={previewUrl}
                alt="Your photo"
                width={400}
                height={400}
                className={styles.displayImage}
              />
              {!isLoading && (
                <div className={styles.changePhotoOverlay}>
                  Click to change photo
                </div>
              )}
              {isLoading && (
                <div className={styles.loadingOverlay}>
                  <div className={styles.spinner}></div>
                  <p>{progressStage}</p>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.uploadPrompt}>
              <div className={styles.uploadIcon}>📸</div>
              <p className={styles.uploadText}>
                {selectedStyleLabel 
                  ? 'Click or drag to upload your photo'
                  : 'Select a style above to get started'}
              </p>
              <p className={styles.uploadHint}>PNG, JPG, HEIC up to 10MB</p>
            </div>
          )}
        </div>
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          onChange={onPhotoUpload}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default PhotoUploader;