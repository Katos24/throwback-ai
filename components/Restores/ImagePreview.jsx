import { useState } from "react";
import Image from "next/image";
import styles from "../../styles/RestoreBasic.module.css";

export default function ImagePreview({ 
  title, 
  url, 
  status, 
  onDownload, 
  isDownloading = false 
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const isUploading = status === "uploading";
  const isCompressing = status === "compressing";
  const isProcessing = isUploading || isCompressing;

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const getStatusText = () => {
    if (isCompressing) return "Compressing...";
    if (isUploading) return "Restoring...";
    return null;
  };

  return (
    <div className={styles.previewCard}>
      <h3 className={styles.previewTitle}>{title}</h3>
      
      <div className={styles.previewImageWrapper}>
        {url && !imageError ? (
          <>
            <Image
              src={url}
              alt={`${title} image preview`}
              width={400}
              height={300}
              className={`next-image ${imageLoading ? styles.imageLoading : ''}`}
              unoptimized
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority={title === "Before"}
            />
            {imageLoading && <div className={styles.imageLoadingSkeleton} />}
          </>
        ) : isProcessing ? (
          <div className={styles.skeleton}>
            <div className={styles.skeletonShimmer}></div>
            {getStatusText() && (
              <span className={styles.statusText}>{getStatusText()}</span>
            )}
          </div>
        ) : imageError ? (
          <div className={styles.previewError}>
            <span>⚠️ Failed to load image</span>
          </div>
        ) : (
          <div className={styles.previewPlaceholder}>
            <span>No image</span>
          </div>
        )}
      </div>

      {onDownload && url && !imageError && (
        <button 
          onClick={onDownload} 
          disabled={isDownloading}
          className={styles.downloadButton}
          aria-label={`Download ${title.toLowerCase()} image`}
        >
          {isDownloading ? (
            <>
              <span className={styles.downloadSpinner}></span>
              Downloading...
            </>
          ) : (
            <>⬇️ Download</>
          )}
        </button>
      )}
    </div>
  );
}