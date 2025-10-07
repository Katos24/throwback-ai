import { useCallback, useState } from "react";
import styles from "../../styles/HalloweenPage.module.css";
import PhotoUpload from "../../components/decades/shared/PhotoUpload";
import ImageDisplay from "../../components/decades/shared/ImageDisplay";
import GenerateButton from "../../components/decades/shared/GenerateButton";
import CreditsHeader from "../../components/decades/shared/CreditsHeader";
import { useHalloweenPageLogic } from "../../components/decades/hooks/useHalloweenPageLogic";
import { useHalloweenGenerationHandler } from "../../components/decades/hooks/useHalloweenGenerationHandler";
import { useHalloweenGeneration } from "../../components/decades/hooks/useHalloweenGeneration";

const HALLOWEEN_TEMPLATES = [
  {
    id: 'ghostface-phone',
    name: 'Phone Call',
    emoji: '📱',
    templateImage: '/templates/halloween/ghostface-phone.jpg',
    exampleBefore: '/images/examples/halloween/ghostface-phone.jpg',
    exampleAfter: '/images/examples/halloween/ghostface-after.jpg',
  },
  {
    id: 'freddy-krueger',
    name: 'Nightmare',
    emoji: '🔥',
    templateImage: '/templates/halloween/freddy-krueger.jpg',
    exampleBefore: '/images/examples/halloween/freddy-krueger.jpg',
    exampleAfter: '/images/examples/halloween/freddy-krueger-after.jpg',
  },
  {
    id: 'the-ring',
    name: 'TV Static',
    emoji: '📺',
    templateImage: '/templates/halloween/the-ring.jpg',
    exampleBefore: '/images/examples/halloween/the-ring.jpg',
    exampleAfter: '/images/examples/halloween/the-ring-after.jpg',
  },
  {
    id: 'pennywise',
    name: 'Storm Drain',
    emoji: '🎈',
    templateImage: '/templates/halloween/pennywise.jpg',
    exampleBefore: '/images/examples/halloween/pennywise.jpg',
    exampleAfter: '/images/examples/halloween/pennywise-after.jpg',
  },
  {
    id: 'michael-myers',
    name: 'The Stalker',
    emoji: '🔪',
    templateImage: '/templates/halloween/michael-myers.jpg',
    exampleBefore: '/images/examples/halloween/michael-myers.jpg',
    exampleAfter: '/images/examples/halloween/michael-myers-after.jpg',
  },
  {
    id: 'video-store',
    name: 'Video Store',
    emoji: '📼',
    templateImage: '/templates/halloween/video-store.jpg',
    exampleBefore: '/images/examples/halloween/video-store.jpg',
    exampleAfter: '/images/examples/halloween/video-store-after.jpg',
  },
  {
    id: 'stranger-things-woman',
    name: 'The Creature',
    emoji: '👁️',
    templateImage: '/templates/halloween/stranger-things-woman.jpg',
    exampleBefore: '/images/examples/halloween/stranger-things-woman.jpg',
    exampleAfter: '/images/examples/halloween/stranger-things-woman-after.jpg',
  },
  {
    id: 'stranger-things-man',
    name: 'The Mirror',
    emoji: '🪞',
    templateImage: '/templates/halloween/stranger-things-man.jpg',
    exampleBefore: '/images/examples/halloween/stranger-things-man.jpg',
    exampleAfter: '/images/examples/halloween/stranger-things-man-after.jpg',
  },
  {
    id: 'the-shining',
    name: 'The Hallway',
    emoji: '👧',
    templateImage: '/templates/halloween/the-shining.jpg',
    exampleBefore: '/images/examples/halloween/the-shining.jpg',
    exampleAfter: '/images/examples/halloween/the-shining-after.jpg',
    isNew: true,
  },
  {
    id: 'saw',
    name: 'The Game',
    emoji: '🎭',
    templateImage: '/templates/halloween/saw.jpg',
    exampleBefore: '/images/examples/halloween/saw.jpg',
    exampleAfter: '/images/examples/halloween/saw-after.jpg',
    isNew: true,
  },
];

// Error Message Component
const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;
  
  return (
    <div className={styles.errorMessage}>
      <span className={styles.errorIcon}>⚠️</span>
      <span className={styles.errorText}>{message}</span>
      <button 
        onClick={onClose}
        className={styles.errorClose}
        aria-label="Close error message"
      >
        ×
      </button>
    </div>
  );
};

// Image Fallback Component
const ImageWithFallback = ({ src, alt, emoji, label, className }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={styles.imageFallback}>
        <div className={styles.fallbackEmoji}>{emoji}</div>
        <div className={styles.fallbackText}>{label}</div>
      </div>
    );
  }

  return (
    <img 
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setError(true)}
    />
  );
};

export default function HalloweenPage() {
  const [errorMessage, setErrorMessage] = useState('');

  const {
    photo,
    setPhoto,
    previewUrl,
    setPreviewUrl,
    resultImageUrl,
    setResultImageUrl,
    showingOriginal,
    setShowingOriginal,
    selectedTemplate,
    setSelectedTemplate,
    credits,
    isLoggedIn,
    refreshCredits,
    router,
    handleFileProcessing,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleDownload,
    scrollToPhotoOnMobile,
    isComplete,
    avatarCost
  } = useHalloweenPageLogic(50);

  const { generateFaceSwap, isLoading, progress, progressStage } = useHalloweenGeneration();

  const scrollSelectors = [
    `.${styles.uploadSection}`,
    `.${styles.uploadArea}`
  ];

  const { handleGenerateOrRedirect: rawGenerateHandler, getButtonText } = useHalloweenGenerationHandler({
    photo,
    selectedTemplate,
    isLoggedIn,
    credits,
    avatarCost,
    router,
    generateFaceSwap,
    refreshCredits,
    scrollToPhotoOnMobile,
    setResultImageUrl,
    scrollSelectors
  });

  const handleGenerateOrRedirect = useCallback(
    (templateId) => {
      const templateToUse = templateId || selectedTemplate;
      
      // Clear any previous errors
      setErrorMessage('');
      
      if (!photo) {
        setErrorMessage("Please upload a photo first.");
        return;
      }
      
      if (!templateToUse) {
        setErrorMessage("Please select a Halloween scene.");
        return;
      }
      
      rawGenerateHandler(templateToUse);
    },
    [photo, selectedTemplate, rawGenerateHandler]
  );

  const handleHalloweenPhotoUpload = useCallback((uploadedPhoto) => {
    if (!uploadedPhoto) return;

    // Clear any errors when uploading
    setErrorMessage('');

    setPhoto(uploadedPhoto);

    if (uploadedPhoto instanceof File || uploadedPhoto instanceof Blob) {
      setPreviewUrl(URL.createObjectURL(uploadedPhoto));
    } else if (typeof uploadedPhoto === "string") {
      setPreviewUrl(uploadedPhoto);
    }

    if (!selectedTemplate) {
      const defaultTemplate = HALLOWEEN_TEMPLATES[0].id;
      setSelectedTemplate(defaultTemplate);
    }
  }, [selectedTemplate, setPhoto, setPreviewUrl, setSelectedTemplate]);

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    setResultImageUrl('');
    setErrorMessage(''); // Clear errors when selecting template
  };

  const canGenerate = !!photo && !!selectedTemplate;

  return (
    <main className={styles.container}>
      <div className={styles.halloweenBg}></div>
      <div className={styles.floatingEmojis}>
        {['🎃', '👻', '🦇', '🕷️', '🎃', '👻'].map((emoji, index) => (
          <div 
            key={index}
            className={styles.floatingEmoji}
            style={{ left: `${10 + index * 15}%`, animationDelay: `${index * 0.7}s` }}
            aria-hidden="true"
          >
            {emoji}
          </div>
        ))}
      </div>

      <CreditsHeader
        credits={credits}
        isLoggedIn={isLoggedIn}
        onButtonClick={() => router.push(isLoggedIn ? "/pricing" : "/signup")}
        icon={{ emoji: "👻", label: "Ghost" }}
        styles={styles}
      />

      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>
          <span className={styles.pumpkinEmoji}>🎃</span>
          <span>HALLOWEEN FACE SWAP</span>
          <span className={styles.pumpkinEmoji}>🎃</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Swap your face into spooky Halloween scenes. Sign up for free and get 50 credits to try it out!
        </p>
        <div className={styles.costBadge}>⚡ {avatarCost} Credits per swap</div>
      </section>

      {/* Error Message Display */}
      <ErrorMessage 
        message={errorMessage} 
        onClose={() => setErrorMessage('')}
      />

      <section 
        className={styles.uploadSection}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className={styles.uploadArea}>
          {!previewUrl && !resultImageUrl ? (
            <PhotoUpload
              photo={photo}
              setPhoto={setPhoto}
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
              resultImageUrl={resultImageUrl}
              setResultImageUrl={setResultImageUrl}
              setShowingOriginal={setShowingOriginal}
              onPhotoUpload={handleHalloweenPhotoUpload}
              decade="halloween"
              styles={styles}
            />
          ) : (
            <ImageDisplay
              previewUrl={previewUrl}
              resultImageUrl={resultImageUrl}
              showingOriginal={showingOriginal}
              setShowingOriginal={setShowingOriginal}
              handleDownload={handleDownload}
              decade="halloween"
              styles={styles}
              isLoading={isLoading}
              progress={progress}
              progressStage={progressStage}
            />
          )}
        </div>

        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) handleHalloweenPhotoUpload(e.target.files[0]);
          }}
          style={{ display: 'none' }}
        />
      </section>

      <section className={styles.templateSection}>
        <h2 className={styles.sectionTitle}>Choose Your Halloween Scene</h2>
        <div className={styles.templateGrid}>
          {HALLOWEEN_TEMPLATES.map((template) => (
            <div
              key={template.id}
              onClick={() => handleTemplateSelect(template.id)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleTemplateSelect(template.id);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Select ${template.name} template`}
              aria-pressed={selectedTemplate === template.id}
              className={`${styles.templateCard} ${selectedTemplate === template.id ? styles.templateCardSelected : ''}`}
            >
              <div className={styles.templateImageWrapper}>
                <img 
                  src={template.templateImage}
                  alt={template.name}
                  className={styles.templateImage}
                  loading="lazy"
                />
              </div>
              <div className={styles.templateName}>{template.emoji} {template.name}</div>
              {selectedTemplate === template.id && <div className={styles.selectedBadge}>✓ Selected</div>}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.generateSection}>
        <GenerateButton
          onClick={() => handleGenerateOrRedirect(selectedTemplate)}
          isLoading={isLoading}
          getButtonText={getButtonText}
          isComplete={isComplete}
          progress={progress}
          progressStage={progressStage}
          styles={styles}
          disabled={!canGenerate}
        />
      </section>

      {/* Examples Section */}
      <section className={styles.examplesSection}>
        <h2 className={styles.sectionTitle}>See Examples</h2>
        
        <div className={styles.examplesGrid}>
          {HALLOWEEN_TEMPLATES.map((template) => (
            <div key={template.id} className={styles.exampleCard}>
              <div className={styles.exampleBefore}>
                <ImageWithFallback
                  src={template.exampleBefore}
                  alt={`${template.name} before`}
                  emoji="📸"
                  label="Before"
                  className={styles.exampleImage}
                />
                <div className={styles.exampleLabel}>BEFORE</div>
              </div>
              
              <div className={styles.exampleAfter}>
                <ImageWithFallback
                  src={template.exampleAfter}
                  alt={`${template.name} after`}
                  emoji={template.emoji}
                  label="After"
                  className={styles.exampleImage}
                />
                <div className={styles.exampleLabelAfter}>AFTER</div>
              </div>
              
              <div className={styles.exampleTitle}>
                {template.emoji} {template.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explore More Features */}
      <section className={styles.exploreSection}>
        <div className={styles.exploreHeader}>
          <h2 className={styles.exploreTitle}>Explore More AI Photo Magic</h2>
          <p className={styles.exploreSubtitle}>
            Try our other powerful AI photo transformation tools
          </p>
        </div>

        <div className={styles.exploreGrid}>
          {/* Decades Feature */}
          <div 
            onClick={() => router.push('/decades')}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                router.push('/decades');
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Explore Decades Time Travel feature"
            className={styles.exploreCard}
            style={{ borderColor: 'rgba(138, 43, 226, 0.4)' }}
          >
            <div className={styles.exploreIcon}>📸</div>
            <h3 className={styles.exploreCardTitle}>Decades Time Travel</h3>
            <p className={styles.exploreCardDesc}>
              Transform your selfies into authentic 70s, 80s, 90s, or 2000s photos. Perfect for viral social content!
            </p>
            <div className={styles.exploreCardFooter}>
              <span className={styles.exploreCardCost}>50 credits</span>
              <span className={styles.exploreCardBadge} style={{ background: 'rgba(138, 43, 226, 0.2)', color: '#8a2be2' }}>
                🔥 Trending
              </span>
            </div>
          </div>

          {/* Colorization Feature */}
          <div 
            onClick={() => router.push('/replicate/restore-premium')}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                router.push('/replicate/restore-premium');
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Explore Premium Colorization feature"
            className={styles.exploreCard}
            style={{ borderColor: 'rgba(0, 212, 255, 0.4)' }}
          >
            <div className={styles.exploreIcon}>🎨</div>
            <h3 className={styles.exploreCardTitle}>Premium Colorization</h3>
            <p className={styles.exploreCardDesc}>
              Transform black & white family photos with museum-quality, historically accurate colorization.
            </p>
            <div className={styles.exploreCardFooter}>
              <span className={styles.exploreCardCost}>40 credits</span>
              <span className={styles.exploreCardBadge} style={{ background: 'rgba(0, 212, 255, 0.2)', color: '#00d4ff' }}>
                Premium
              </span>
            </div>
          </div>

          {/* Restoration Feature */}
          <div 
            onClick={() => router.push('/replicate/restore-basic')}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                router.push('/replicate/restore-basic');
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Explore Photo Restoration feature"
            className={styles.exploreCard}
            style={{ borderColor: 'rgba(34, 197, 94, 0.4)' }}
          >
            <div className={styles.exploreIcon}>🔧</div>
            <h3 className={styles.exploreCardTitle}>Photo Restoration</h3>
            <p className={styles.exploreCardDesc}>
              Repair scratches, tears, water damage, and fading from irreplaceable vintage family photos.
            </p>
            <div className={styles.exploreCardFooter}>
              <span className={styles.exploreCardCost}>1 credit</span>
              <span className={styles.exploreCardBadge} style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' }}>
                ⚡ Fast
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}