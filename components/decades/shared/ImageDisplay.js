// components/ImageDisplay.js
import Image from "next/image";
import ImageLoadingOverlay from "./ImageLoadingOverlay";

export default function ImageDisplay({
  previewUrl,
  resultImageUrl,
  showingOriginal,
  setShowingOriginal,
  filterEnabled,
  setFilterEnabled,
  handleDownload,
  decade = "90s",
  styles,
  // Progress props
  isLoading = false,
  progress = 0,
  progressStage = "Processing..."
}) {
  if (!previewUrl && !resultImageUrl) return null;

  return (
    <div className={styles.imageContainer}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <Image
          src={showingOriginal ? previewUrl : (resultImageUrl || previewUrl)}
          alt={resultImageUrl && !showingOriginal ? `Generated ${decade} Yearbook Photo` : "Your photo"}
          width={280}
          height={280}
          unoptimized={!showingOriginal && !!resultImageUrl}
          className={`${styles.displayImage} ${getFilterClass(decade, resultImageUrl, showingOriginal, filterEnabled, styles)}`}
        />
        
        {/* New Enhanced Loading Overlay */}
        <ImageLoadingOverlay 
          isLoading={isLoading}
          progress={progress}
          progressStage={progressStage}
          decade={decade}
        />
      </div>

      <div className={styles.buttonRow}>
        {resultImageUrl && previewUrl && (
          <button
            onClick={() => setShowingOriginal(!showingOriginal)}
            className={styles.actionButton} // <-- update here
          >
            {showingOriginal ? `${getDecadeEmoji(decade)} View ${decade} Result` : '👀 View Original'}
          </button>
        )}

        {resultImageUrl && !showingOriginal && setFilterEnabled && (
          <button
            onClick={() => setFilterEnabled(!filterEnabled)}
            className={styles.actionButton} // <-- update here
          >
            {filterEnabled ? `${getDecadeIcon(decade)} Remove ${decade} Filter` : `${getDecadeIcon(decade)} Add ${decade} Filter`}
          </button>
        )}

        <button
          onClick={() => document.getElementById('photo-upload').click()}
          className={styles.actionButton} // <-- update here
        >
          📷 Change Photo
        </button>

        {resultImageUrl && (
          <button
            onClick={handleDownload}
            className={styles.actionButton} // <-- update here
          >
            💾 Save Photo
          </button>
        )}
      </div>
    </div>
  );
}

function getFilterClass(decade, resultImageUrl, showingOriginal, filterEnabled, styles) {
  if (!resultImageUrl || showingOriginal || !filterEnabled) return '';
  
  const filterClasses = {
    "70s": styles.seventiesFilter,
    "2000s": styles.y2kFilter
  };
  
  return filterClasses[decade] || '';
}

function getDecadeIcon(decade) {
  const icons = {
    "70s": "📺",
    "80s": "📻", 
    "90s": "📼",
    "2000s": "💻"
  };
  return icons[decade] || "📷";
}

function getDecadeEmoji(decade) {
  return getDecadeIcon(decade);
}