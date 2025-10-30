import { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import styles from './PhotoUploadZone.module.css';

const PhotoUploadZone = ({ 
  photo,
  previewUrl, 
  resultImageUrl,
  isLoading,
  progress,
  progressStage,
  showingOriginal,
  selectedStyle,
  styleCategory,
  onPhotoChange,
  onToggleOriginal,
  onDownload
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handlePhotoUpload = (e) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file (PNG, JPG, HEIC)', { icon: '🖼️', duration: 4000 });
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be under 10MB', { icon: '📏', duration: 4000 });
      return;
    }
    
    const previewUrl = URL.createObjectURL(file);
    onPhotoChange(file, previewUrl);
    toast.success('Photo uploaded! Now configure your avatar settings.', { icon: '🎭', duration: 2000 });
  };

  return (
    <div className={styles.uploadSection} id="upload-section">
      <h2 className={styles.sectionTitle}>Step 2: Upload Your Photo</h2>
      
      {/* Selected Style Display */}
      {selectedStyle && (
        <div className={styles.selectedStyleDisplay}>
          <div className={styles.selectedStyleBadge}>
            <span className={styles.selectedStyleLabel}>
              Selected Style: <strong>{styleCategory} - {selectedStyle.split(',')[0]}</strong>
            </span>
          </div>
        </div>
      )}
      
      <div className={styles.uploadWrapper}>
        <div
          className={`${styles.uploadZone} ${dragActive ? styles.dragActive : ''} ${previewUrl ? styles.hasPreview : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !isLoading && document.getElementById('photo-upload').click()}
        >
          {resultImageUrl ? (
            <div className={styles.resultContainer}>
              <div className={styles.previewContainer}>
                <Image
                  src={showingOriginal ? previewUrl : resultImageUrl}
                  alt={showingOriginal ? "Original" : "Generated"}
                  width={400}
                  height={400}
                  unoptimized
                  className={styles.displayImage}
                />
              </div>
              <div className={styles.imageControls}>
                <button 
                  onClick={(e) => { e.stopPropagation(); onToggleOriginal(); }}
                  className={styles.toggleButton}
                >
                  {showingOriginal ? "Show Result" : "Show Original"}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onDownload(); }}
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
                <div className={styles.changePhotoOverlay}>Click to change photo</div>
              )}
              {isLoading && (
                <div className={styles.loadingOverlay}>
                  <div className={styles.spinner}></div>
                  <p>{progressStage}</p>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.uploadPrompt}>
              <div className={styles.uploadIcon}>📸</div>
              <p className={styles.uploadText}>
                {selectedStyle 
                  ? 'Click or drag to upload your photo'
                  : 'Select a style above to get started'}
              </p>
              <p className={styles.uploadHint}>PNG, JPG, HEIC up to 10MB</p>
            <span className={styles.selectedStyleLabelToo}>
              Selected Style: <strong>{styleCategory} - {selectedStyle.split(',')[0]}</strong>
            </span>
            </div>
          )}
        </div>
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default PhotoUploadZone;