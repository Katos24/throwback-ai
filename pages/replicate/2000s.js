// pages/replicate/2000s.js
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import useCredits from "../../hooks/useCredits";
import styles from "../../styles/decades/TwothousandsPage.module.css";
import { TWOTHOUSANDS_STYLES, buildTwothousandsPrompt } from "../../components/TwothousandsPrompts";
import DecadeBottomSection from "../../components/DecadeBottomSection";
import PhotoUpload from "../../components/decades/shared/PhotoUpload";
import ImageDisplay from "../../components/decades/shared/ImageDisplay";
import ConfigurationSection from "../../components/decades/shared/ConfigurationSection";
import GenerateButton from "../../components/decades/shared/GenerateButton";
import { useDecadeGeneration } from "../../components/decades/hooks/useDecadeGeneration";

export default function TwothousandsPage() {
  const router = useRouter();
  
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const [session, setSession] = useState(null);
  const [showingOriginal, setShowingOriginal] = useState(false);
  const [filterEnabled, setFilterEnabled] = useState(true);
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  // Configuration state
  const [userGender, setUserGender] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [styleStrength, setStyleStrength] = useState(20);
  const [workflowType, setWorkflowType] = useState("HyperRealistic-likeness");

  // UI state for expandable sections
  const [expandedSections, setExpandedSections] = useState({
    gender: false,
    workflow: false,
    style: false,
    strength: false
  });

  const avatarCost = 50;
  const { credits, isLoggedIn, refreshCredits } = useCredits();

  // Generation hook with 2000s prompt builder wrapper
  const twothousandsPromptWrapper = (gender, styleId, workflowType, strength) => {
    const promptResult = buildTwothousandsPrompt(gender, styleId, workflowType, strength);
    
    // Debug logging
    console.log('buildTwothousandsPrompt result:', promptResult);
    console.log('typeof promptResult:', typeof promptResult);
    
    // Ensure we return a string - handle both string and object returns
    if (typeof promptResult === 'string') {
      return promptResult;
    } else if (promptResult && typeof promptResult === 'object') {
      // If it's an object, check if it has a 'prompt' property or convert to string
      return promptResult.prompt || JSON.stringify(promptResult);
    } else {
      // Fallback - create a basic prompt
      const styleObj = TWOTHOUSANDS_STYLES.find(s => s.id === styleId);
      const styleName = styleObj ? styleObj.label : styleId;
      return `A ${gender} person in authentic 2000s ${styleName} style yearbook photo`;
    }
  };
  
  const { generateAvatar, isLoading, progress, progressStage } = useDecadeGeneration("2000s", twothousandsPromptWrapper);

  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    }
    getSession();
  }, []);

  const handleGenerateOrRedirect = async () => {
    if (!photo) {
      return;
    }

    if (!userGender || !selectedStyle) {
      return;
    }

    if (!isLoggedIn) {
      router.push('/signup');
      return;
    }
    
    if (credits < avatarCost) {
      router.push('/pricing');
      return;
    }

    try {
      // Convert gender format to match API expectations
      const apiGender = userGender === 'non-binary' ? 'non_binary' : userGender;
      const imageUrl = await generateAvatar(photo, apiGender, selectedStyle, workflowType, styleStrength, refreshCredits);
      setResultImageUrl(imageUrl);
    } catch (error) {
      console.error('Generation failed:', error);
    }
  };

  const handleDownload = async () => {
    if (!resultImageUrl) return;
    
    try {
      const resp = await fetch(resultImageUrl);
      const blob = await resp.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `2000s-yearbook-photo-${filterEnabled ? 'filtered' : 'unfiltered'}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const getButtonText = () => {
    if (isLoading) return "Creating your awesome 2000s photo...";
    if (!photo) return "Upload a Photo First";
    if (!userGender || !selectedStyle) return "Complete Setup First";
    if (!isLoggedIn) return "Sign Up to Generate";
    if (credits < avatarCost) return "Get More Credits";
    return "Generate My 2000s Yearbook Photo!";
  };

  const isComplete = photo && userGender && selectedStyle && isLoggedIn && credits >= avatarCost;

  const handlePhotoUploadCallback = () => {
    setExpandedSections(prev => ({ ...prev, gender: true }));
  };

  return (
    <>
      <Head>
        <title>2000s Yearbook Photo Generator | Throwback AI</title>
        <meta name="description" content="Transform your photo into an authentic 2000s yearbook photo with emo, scene, pop punk, and hipster styles from the Y2K era." />
      </Head>

      <main className={styles.container}>
        {/* XP Taskbar */}
        <div className={styles.taskbar}>
          <div 
            className={`${styles.startButton} ${startMenuOpen ? styles.startButtonActive : ''}`}
            onClick={() => setStartMenuOpen(!startMenuOpen)}
          >
            <span className={styles.startIcon}>🏠</span>
            <span>Start</span>
          </div>

          {/* Start Menu */}
          {startMenuOpen && (
            <div className={styles.startMenu}>
              <div className={styles.startMenuHeader}>
                <div className={styles.startMenuUser}>
                  <span className={styles.userIcon}>👤</span>
                  <span>Y2K User</span>
                </div>
              </div>
              
              <div className={styles.startMenuSeparator}></div>
              
              <div className={styles.startMenuItems}>
                <div className={styles.startMenuSection}>
                  <div className={styles.sectionLabel}>Decade Generators</div>
                  
                  <button 
                    className={styles.startMenuItem}
                    onClick={() => router.push('/replicate/70s')}
                  >
                    <span className={styles.menuIcon}>📺</span>
                    <span>70s Yearbook Photos</span>
                  </button>
                  
                  <button 
                    className={styles.startMenuItem}
                    onClick={() => router.push('/replicate/90s')}
                  >
                    <span className={styles.menuIcon}>📼</span>
                    <span>90s Yearbook Photos</span>
                  </button>
                  
                  <button 
                    className={`${styles.startMenuItem} ${styles.currentPage}`}
                    onClick={() => setStartMenuOpen(false)}
                  >
                    <span className={styles.menuIcon}>💻</span>
                    <span>2000s Yearbook Photos</span>
                    <span className={styles.currentIndicator}>•</span>
                  </button>
                </div>

                <div className={styles.startMenuSeparator}></div>

                <div className={styles.startMenuSection}>
                  <div className={styles.sectionLabel}>Quick Actions</div>
                  
                  <button 
                    className={styles.startMenuItem}
                    onClick={() => router.push('/pricing')}
                  >
                    <span className={styles.menuIcon}>💳</span>
                    <span>Get More Credits</span>
                  </button>
                  
                  <button 
                    className={styles.startMenuItem}
                    onClick={() => router.push('/profile')}
                  >
                    <span className={styles.menuIcon}>⚙️</span>
                    <span>Account Settings</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Overlay to close menu when clicking outside */}
          {startMenuOpen && (
            <div 
              className={styles.startMenuOverlay}
              onClick={() => setStartMenuOpen(false)}
            ></div>
          )}

          <div className={styles.taskbarCenter}></div>
          <div className={styles.systemTray}>
            <span className={styles.creditsInfo}>
              <span className={styles.creditsIcon}>💻</span>
              <span>{credits} credits</span>
              <button 
                onClick={() => router.push(isLoggedIn ? "/pricing" : "/signup")}
                className={styles.creditsButton}
              >
                {isLoggedIn ? "+" : "Sign Up"}
              </button>
            </span>
            <span className={styles.clock}>
              {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </span>
          </div>
        </div>

        {/* XP Desktop */}
        <div className={styles.desktop}>
          {/* Main Application Window */}
          <div className={styles.windowContainer}>
            {/* Window Title Bar */}
            <div className={styles.titleBar}>
              <div className={styles.titleBarLeft}>
                <span className={styles.windowIcon}>💻</span>
                <span className={styles.windowTitle}>2000s Yearbook Photo Generator</span>
              </div>
              <div className={styles.titleBarRight}>
                <button className={styles.minimizeButton}>_</button>
                <button className={styles.maximizeButton}>□</button>
                <button className={styles.closeButton}>✕</button>
              </div>
            </div>

            {/* Window Content */}
            <div className={styles.windowContent}>
              {/* Hero Section */}
              <div className={styles.hero}>
                <h1 className={styles.title}>
                  <span className={styles.titleEmoji}>💻</span>
                  2000s Yearbook Photos
                </h1>
                <p className={styles.subtitle}>
                  Get totally awesome Y2K yearbook vibes from the new millennium!
                  <span className={styles.creditPill}>Costs {avatarCost} credits</span>
                </p>
              </div>

              {/* Photo Display Window */}
              <div className={styles.photoWindow}>
                <div className={styles.photoTitleBar}>
                  <span className={styles.photoWindowTitle}>
                    {resultImageUrl ? '2000s Result Viewer' : 'Photo Upload'}
                  </span>
                </div>
                
                <div className={styles.photoContent}>
                  {!previewUrl && !resultImageUrl ? (
                    <PhotoUpload
                      photo={photo}
                      setPhoto={setPhoto}
                      previewUrl={previewUrl}
                      setPreviewUrl={setPreviewUrl}
                      resultImageUrl={resultImageUrl}
                      setResultImageUrl={setResultImageUrl}
                      setShowingOriginal={setShowingOriginal}
                      onPhotoUpload={handlePhotoUploadCallback}
                      decade="2000s"
                      styles={styles}
                    />
                  ) : (
                    <ImageDisplay
                      previewUrl={previewUrl}
                      resultImageUrl={resultImageUrl}
                      showingOriginal={showingOriginal}
                      setShowingOriginal={setShowingOriginal}
                      filterEnabled={filterEnabled}
                      setFilterEnabled={setFilterEnabled}
                      handleDownload={handleDownload}
                      decade="2000s"
                      styles={styles}
                      // Add loading overlay props
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
                  onChange={() => {}} // Handled by PhotoUpload component
                  style={{ display: 'none' }}
                />
              </div>

              {/* Configuration Section */}
              <ConfigurationSection
                userGender={userGender}
                setUserGender={setUserGender}
                selectedStyle={selectedStyle}
                setSelectedStyle={setSelectedStyle}
                styleStrength={styleStrength}
                setStyleStrength={setStyleStrength}
                workflowType={workflowType}
                setWorkflowType={setWorkflowType}
                expandedSections={expandedSections}
                setExpandedSections={setExpandedSections}
                styles={styles}
                decade="2000s"
                decadeStyles={TWOTHOUSANDS_STYLES}
              />

              {/* Generate Button */}
              <GenerateButton
                onClick={handleGenerateOrRedirect}
                isLoading={isLoading}
                getButtonText={getButtonText}
                isComplete={isComplete}
                progress={progress}
                progressStage={progressStage}
                styles={styles}
              />
            </div>
          </div>
        </div>

        {/* Reusable Bottom Section Component */}
        <DecadeBottomSection currentDecade="2000s" />
      </main>
    </>
  );
}