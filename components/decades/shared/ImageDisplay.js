// components/ImageDisplay.js
import Image from "next/image";

export default function ImageDisplay({
  previewUrl,
  resultImageUrl,
  showingOriginal,
  setShowingOriginal,
  filterEnabled,
  setFilterEnabled,
  handleDownload,
  decade = "90s",
  styles
}) {
  if (!previewUrl && !resultImageUrl) return null;

  return (
    <div className={styles.imageContainer}>
      <Image
        src={showingOriginal ? previewUrl : (resultImageUrl || previewUrl)}
        alt={resultImageUrl && !showingOriginal ? `Generated ${decade} Yearbook Photo` : "Your photo"}
        width={280}
        height={280}
        unoptimized={!showingOriginal && !!resultImageUrl}
        className={`${styles.displayImage} ${getFilterClass(decade, resultImageUrl, showingOriginal, filterEnabled, styles)}`}
      />
      
      <div className={styles.buttonRow}>
        {resultImageUrl && previewUrl && (
          <button 
            onClick={() => setShowingOriginal(!showingOriginal)}
            className={styles.toggleButton}
          >
            {showingOriginal ? `${getDecadeEmoji(decade)} View ${decade} Result` : '👀 View Original'}
          </button>
        )}
        
        {/* Filter toggle - only for decades that have filters */}
        {resultImageUrl && !showingOriginal && setFilterEnabled && (
          <button 
            onClick={() => setFilterEnabled(!filterEnabled)}
            className={styles.filterToggleButton}
          >
            {filterEnabled ? `${getDecadeIcon(decade)} Remove ${decade} Filter` : `${getDecadeIcon(decade)} Add ${decade} Filter`}
          </button>
        )}
        
        <button 
          onClick={() => document.getElementById('photo-upload').click()}
          className={styles.changePhotoButton}
        >
          📷 Change Photo
        </button>
        
        {resultImageUrl && (
          <button onClick={handleDownload} className={styles.downloadButton}>
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

function getDecadeEmoji(decade) {
  const emojis = {
    "70s": "✌️",
    "80s": "🕺", 
    "90s": "✨",
    "2000s": "💻"
  };
  return emojis[decade] || "✨";
}
