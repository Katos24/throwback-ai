import { useCallback } from "react";
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
    name: 'Ghostface Phone',
    emoji: '📱',
    templateImage: '/templates/halloween/ghostface-phone.jpg',
    exampleBefore: '/images/examples/halloween/ghostface-before.jpg',
    exampleAfter: '/images/examples/halloween/ghostface-after.jpg',
  },
  {
    id: 'freddy-krueger',
    name: 'Freddy Krueger',
    emoji: '🔥',
    templateImage: '/templates/halloween/freddy-krueger.jpg',
    exampleBefore: '/images/examples/halloween/freddy-krueger.jpg',
    exampleAfter: '/images/examples/halloween/freddy-krueger-after.jpg',
  },
  {
    id: 'michael-myers',
    name: 'Michael Myers',
    emoji: '🔪',
    templateImage: '/templates/halloween/michael-myers.jpg',
    exampleBefore: '/images/examples/halloween/michael-myers.jpg',
    exampleAfter: '/images/examples/halloween/michael-myers-after.jpg',
  },
  {
    id: 'chucky',
    name: 'Chucky',
    emoji: '🪓',
    templateImage: '/templates/halloween/chucky.jpg',
    exampleBefore: '/images/examples/halloween/chucky.jpg',
    exampleAfter: '/images/examples/halloween/chucky-after.jpg',
  }
];


export default function HalloweenPage() {
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
  selectedTemplate, // <-- use this, not selectedStyle
  isLoggedIn,
  credits,
  avatarCost,
  router,
  generateFaceSwap, // <-- use this, not generateAvatar
  refreshCredits,
  scrollToPhotoOnMobile,
  setResultImageUrl,
  scrollSelectors
});

  const handleGenerateOrRedirect = useCallback(
    (templateId) => {
      const templateToUse = templateId || selectedTemplate;
      if (!photo) return alert("Please upload a photo first.");
      if (!templateToUse) return alert("Please select a Halloween scene.");
      rawGenerateHandler(templateToUse);
    },
    [photo, selectedTemplate, rawGenerateHandler]
  );

  const handleHalloweenPhotoUpload = useCallback((uploadedPhoto) => {
    if (!uploadedPhoto) return;

    setPhoto(uploadedPhoto);

    if (uploadedPhoto instanceof File || uploadedPhoto instanceof Blob) {
      setPreviewUrl(URL.createObjectURL(uploadedPhoto));
    } else if (typeof uploadedPhoto === "string") {
      setPreviewUrl(uploadedPhoto);
    }

    if (!selectedTemplate) {
      const defaultTemplate = HALLOWEEN_TEMPLATES[0].id;
      setSelectedTemplate(defaultTemplate);
      // Remove auto-generate here!
    }
  }, [selectedTemplate, setPhoto, setPreviewUrl, setSelectedTemplate]);

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
              onClick={() => {
                setSelectedTemplate(template.id);
                setResultImageUrl('');
              }}
              className={`${styles.templateCard} ${selectedTemplate === template.id ? styles.templateCardSelected : ''}`}
            >
              <div className={styles.templateImageWrapper}>
                <img 
                  src={template.templateImage}
                  alt={template.name}
                  className={styles.templateImage}
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
                <img 
                  src={template.exampleBefore}
                  alt={`${template.name} before`}
                  className={styles.exampleImage}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; color: #999;">
                        <div style="font-size: 40px; margin-bottom: 10px;">📸</div>
                        <div style="font-size: 14px;">Before</div>
                      </div>
                    `;
                  }}
                />
                <div className={styles.exampleLabel}>BEFORE</div>
              </div>
              
              <div className={styles.exampleAfter}>
                <img 
                  src={template.exampleAfter}
                  alt={`${template.name} after`}
                  className={styles.exampleImage}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; color: #999;">
                        <div style="font-size: 40px; margin-bottom: 10px;">${template.emoji}</div>
                        <div style="font-size: 14px;">After</div>
                      </div>
                    `;
                  }}
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