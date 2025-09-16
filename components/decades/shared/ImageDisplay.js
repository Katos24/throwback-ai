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
        
        {/* Loading spinner overlay */}
        {isLoading && (
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
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
            zIndex: 999
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(255, 255, 255, 0.3)',
              borderTop: '3px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '10px'
            }} />
            <div style={{ textAlign: 'center' }}>
              <div>{progressStage}</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '5px' }}>
                {progress}%
              </div>
            </div>
          </div>
        )}
      </div>

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
          <button 
            onClick={handleDownload} 
            className={styles.downloadButton}
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