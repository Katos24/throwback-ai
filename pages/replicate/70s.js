// pages/replicate/70s.js
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import { supabase } from "../../lib/supabaseClient";
import useCredits from "../../hooks/useCredits";
import styles from "../../styles/decades/SeventiesPage.module.css";
import { SEVENTIES_STYLES, buildSeventiesPrompt } from "../../components/SeventiesPrompts";
import DecadeBottomSection from "../../components/DecadeBottomSection";
import PhotoUpload from "../../components/decades/shared/PhotoUpload";
import ImageDisplay from "../../components/decades/shared/ImageDisplay";
import ConfigurationSection from "../../components/decades/shared/ConfigurationSection";
import GenerateButton from "../../components/decades/shared/GenerateButton";
import { useDecadeGeneration } from "../../components/decades/hooks/useDecadeGeneration";

export default function SeventiesPage() {
  const router = useRouter();
  
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const [session, setSession] = useState(null);
  const [showingOriginal, setShowingOriginal] = useState(false);
  const [filterEnabled, setFilterEnabled] = useState(true);

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

  // Generation hook with 70s prompt builder wrapper
  const seventiesPromptWrapper = (gender, styleId, workflowType, strength) => {
    return buildSeventiesPrompt({
      gender,
      styleId,
      preserveFacialFeatures: true,
      intensity: strength > 25 ? 'strong' : strength < 15 ? 'subtle' : 'medium'
    });
  };
  
  const { generateAvatar, isLoading, progress, progressStage } = useDecadeGeneration("70s", seventiesPromptWrapper);

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

    // Scroll to photo section on mobile when generation starts
    const scrollToPhoto = () => {
      const photoSection = document.querySelector(`.${styles.photoSection}`) || 
                          document.querySelector(`.${styles.tvPhotoFrame}`) ||
                          document.querySelector(`.${styles.photoDisplay}`);
      
      if (photoSection && window.innerWidth <= 768) {
        photoSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    };

    // Debug: Test the prompt generation
    const apiGender = userGender === 'non-binary' ? 'non_binary' : userGender;
    const testPrompt = seventiesPromptWrapper(apiGender, selectedStyle, workflowType, styleStrength);
    console.log('Generated prompt:', testPrompt);
    console.log('Parameters:', { apiGender, selectedStyle, workflowType, styleStrength });

    try {
      // Start scrolling right when generation begins
      setTimeout(scrollToPhoto, 100);
      
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
      a.download = `70s-yearbook-photo-${filterEnabled ? 'filtered' : 'unfiltered'}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const getButtonText = () => {
    if (isLoading) return "Creating your groovy 70s photo...";
    if (!photo) return "Upload a Photo First";
    if (!userGender || !selectedStyle) return "Complete Setup First";
    if (!isLoggedIn) return "Sign Up to Generate";
    if (credits < avatarCost) return "Get More Credits";
    return "Generate My 70s Yearbook Photo!";
  };

  const isComplete = photo && userGender && selectedStyle && isLoggedIn && credits >= avatarCost;

  const handlePhotoUploadCallback = () => {
    setExpandedSections(prev => ({ ...prev, gender: true }));
  };

  return (
    <>
      <Head>
        <title>70s Yearbook Photo Generator | Throwback AI</title>
        <meta name="description" content="Transform your photo into an authentic 70s yearbook photo with hippie, disco, punk, and glam rock styles from the groovy decade." />
      </Head>

      <main className={styles.container}>
        {/* 70s TV Set */}
        <div className={styles.tvSet}>
          {/* TV Screen */}
          <div className={styles.tvScreen}>
            {/* TV Content Area */}
            <div className={styles.tvContent}>
              {/* Channel Info Bar */}
              <div className={styles.channelBar}>
                <span className={styles.channelNumber}>CH 7</span>
                <span className={styles.channelName}>GROOVY-TV</span>
                <span className={styles.creditsInfo}>
                  <span className={styles.creditsIcon}>📺</span>
                  <span>{credits} credits</span>
                  <button 
                    onClick={() => router.push(isLoggedIn ? "/pricing" : "/signup")}
                    className={styles.creditsButton}
                  >
                    {isLoggedIn ? "+" : "Sign Up"}
                  </button>
                </span>
              </div>

              {/* 70s TV Show Hero Section */}
              <div className={styles.hero}>
                <h1 className={styles.title}>
                  <span className={styles.titleEmoji}>📺</span>
                  70s Yearbook Photos
                </h1>
                <p className={styles.subtitle}>
                  Get groovy with authentic 70s yearbook vibes.
                  <span className={styles.creditPill}>Costs {avatarCost} credits</span>
                </p>
              </div>

              {/* TV Photo Display */}
              <div className={styles.photoSection}>
                <div className={styles.tvPhotoFrame}>
                  <h3 className={styles.frameTitle}>
                    {resultImageUrl ? '70s Yearbook Result' : 'Upload Your Photo'}
                  </h3>
                  
                  <div className={styles.photoDisplay}>
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
                        decade="70s"
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
                        decade="70s"
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
                decade="70s"
                decadeStyles={SEVENTIES_STYLES}
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

          {/* TV Controls (Knobs/Buttons) */}
          <div className={styles.tvControls}>
            <div className={styles.knob}></div>
            <div className={styles.knob}></div>
            <div className={styles.speaker}></div>
          </div>
        </div>

        {/* Reusable Bottom Section Component */}
        <DecadeBottomSection currentDecade="70s" />
      </main>
    </>
  );
}