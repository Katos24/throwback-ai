import { useState, useEffect } from 'react';
import useRestoreLogic from "../../hooks/useRestoreLogic";
import BasicFeaturesSection from "../../components/Restores/BasicFeaturesSection";
import RestorePremiumSEO from "../../components/SEO/RestorePremiumSEO";
import RestorationCounter from '../../components/RestorationCounter';
import RestoreHero from '../../components/restore/RestoreHero';
import CreditDisplay from '../../components/restore/CreditDisplay';
import UploadZone from '../../components/restore/UploadZone';
import ModeSelector from '../../components/restore/ModeSelector';
import ResultsView from '../../components/restore/ResultsView';
import BeforeAfterGallery from '../../components/restore/BeforeAfterGallery';
import FeaturesGrid from '../../components/restore/FeaturesGrid';
import BadgePills from '../../components/restore/BadgePills';
import ProTip from '../../components/restore/ProTip';
import styles from '../../components/restore/RestorePage.module.css';


export default function RestorePremiumPage() {
  const [restoreMode, setRestoreMode] = useState('premiumColor'); // Start with premium mode
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const getRestoreConfig = () => {
    switch(restoreMode) {
      case 'basic':
        return { cost: 1, endpoint: "/api/replicate/restore", isPremium: false };
      case 'premiumColor':
        return { cost: 40, endpoint: "/api/replicate/restorePremium", isPremium: true };
      default:
        return { cost: 40, endpoint: "/api/replicate/restorePremium", isPremium: true };
    }
  };

  const config = getRestoreConfig();
  
  const {
    selectedFile,
    selectedPreviewUrl,
    restoredUrl,
    loading,
    processing,
    progressStatus,
    progressPercent,
    dragActive,
    credits,
    isLoggedIn,
    handleDrag,
    handleDrop,
    handleFileInput,
    handleGenerateOrRedirect,
    handleDownload,
    handleReset,
    fileInputRef,
    router
  } = useRestoreLogic(config.cost, config.endpoint, config.isPremium);

  const getFixedButtonText = () => {
    if (loading || processing) {
      return processing ? 'Compressing...' : getModeActionText() + '...';
    }
    if (credits < config.cost) {
      return isLoggedIn ? '💳 Buy More Credits' : '🔒 Sign Up to Continue';
    }
    return `✨ ${getModeActionText()} (${config.cost} ${config.cost === 1 ? 'credit' : 'credits'})`;
  };

  const getModeActionText = () => {
    return restoreMode === 'premiumColor' ? 'Premium Colorize' : 'Restore Photo';
  };

  const handleRestoreClick = () => {
    if (credits < config.cost) {
      router.push(isLoggedIn ? "/pricing" : "/signup");
      return;
    }
    handleGenerateOrRedirect();
  };

  const handleUseRestoredImage = async () => {
    try {
      const response = await fetch(restoredUrl);
      const blob = await response.blob();
      const file = new File([blob], 'restored-image.jpg', { type: 'image/jpeg' });
      
      handleReset();
      
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
      }
      
      handleFileInput({ target: { files: [file] } });
    } catch (error) {
      console.error('Error converting image:', error);
      alert('Failed to prepare image. Please try again.');
    }
  };

  return (
    <>
<RestorePremiumSEO />
      <RestoreHero />
      
      <div className={`${styles.container} ${config.isPremium ? styles.premiumMode : ''}`}>
        <div className={styles.backgroundParticles}></div>

        <div className={styles.content}>
                 <div className={styles.creditsWrapper}>
              <CreditDisplay 
                credits={credits} 
                isLoggedIn={isLoggedIn} 
                restoreMode={restoreMode} 
              />
            </div>
          <header className={styles.header}>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>
             
              </h1>
            </div>
          </header>

          <main className={styles.mainContent}>
            <div className={`${styles.uploadCard} ${config.isPremium ? styles.premiumCard : ''}`}>
              <h2 className={styles.sectionTitle}>
                <span>{restoredUrl ? '✨' : '📤'}</span>
                {restoredUrl ? 'Results' : 'Upload Your Photo'}
              </h2>

              {!restoredUrl ? (
                <>
                  <UploadZone
                    selectedPreviewUrl={selectedPreviewUrl}
                    dragActive={dragActive}
                    loading={loading}
                    processing={processing}
                    progressStatus={progressStatus}
                    progressPercent={progressPercent}
                    restoreMode={restoreMode}
                    isPremium={config.isPremium}
                    fileInputRef={fileInputRef}
                    handleDrag={handleDrag}
                    handleDrop={handleDrop}
                    handleFileInput={handleFileInput}
                  />

                  {selectedFile && !loading && (
                    <ModeSelector
                      restoreMode={restoreMode}
                      setRestoreMode={setRestoreMode}
                      credits={credits}
                      loading={loading}
                      processing={processing}
                      handleRestoreClick={handleRestoreClick}
                      handleReset={handleReset}
                      getFixedButtonText={getFixedButtonText}
                    />
                  )}
                </>
              ) : (
                <ResultsView
                  selectedPreviewUrl={selectedPreviewUrl}
                  restoredUrl={restoredUrl}
                  restoreMode={restoreMode}
                  isPremium={config.isPremium}
                  handleDownload={handleDownload}
                  handleReset={handleReset}
                  handleUseRestoredImage={handleUseRestoredImage}
                />
              )}

              <ProTip isPremium={config.isPremium} />
            </div>
          </main>

          <BadgePills />
          <RestorationCounter />
          
          <BeforeAfterGallery
            selectedPreviewUrl={selectedPreviewUrl}
            restoredUrl={restoredUrl}
            restoreMode={restoreMode}
          />

          <FeaturesGrid restoreMode={restoreMode} />
        </div>

        <BasicFeaturesSection />
      </div>
    </>
  );
}