// pages/replicate/80s.js
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import useCredits from "../../hooks/useCredits";
import styles from "../../styles/decades/EightiesPage.module.css";
import { EIGHTIES_STYLES, buildEightiesPrompt } from "../../components/EightiesPrompts";
import DecadeBottomSection from "../../components/DecadeBottomSection";
import PhotoUpload from "../../components/decades/shared/PhotoUpload";
import ImageDisplay from "../../components/decades/shared/ImageDisplay";
import ConfigurationSection from "../../components/decades/shared/ConfigurationSection";
import GenerateButton from "../../components/decades/shared/GenerateButton";
import { useDecadeGeneration } from "../../components/decades/hooks/useDecadeGeneration";

export default function EightiesPage() {
  const router = useRouter();
  
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const [session, setSession] = useState(null);
  const [showingOriginal, setShowingOriginal] = useState(false);

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

  // Generation hook with 80s prompt builder wrapper
  const eightiesPromptWrapper = (gender, styleId, workflowType, strength) => {
    return buildEightiesPrompt({
      gender,
      styleId,
      preserveFacialFeatures: true,
      intensity: strength > 25 ? 'strong' : strength < 15 ? 'subtle' : 'medium'
    });
  };
  
  const { generateAvatar, isLoading, progress, progressStage } = useDecadeGeneration("80s", eightiesPromptWrapper);

  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    }
    getSession();
  }, []);

  const handleGenerateOrRedirect = async () => {
    if (!photo) return;
    if (!userGender || !selectedStyle) return;
    if (!isLoggedIn) {
      router.push('/signup');
      return;
    }
    if (credits < avatarCost) {
      router.push('/pricing');
      return;
    }

    try {
      const imageUrl = await generateAvatar(photo, userGender, selectedStyle, workflowType, styleStrength, refreshCredits);
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
      a.download = `80s-yearbook-photo-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const getButtonText = () => {
    if (isLoading) return "Creating your awesome 80s photo...";
    if (!photo) return "Upload a Photo First";
    if (!userGender || !selectedStyle) return "Complete Setup First";
    if (!isLoggedIn) return "Sign Up to Generate";
    if (credits < avatarCost) return "Get More Credits";
    return "Generate My 80s Yearbook Photo!";
  };

  const isComplete = photo && userGender && selectedStyle && isLoggedIn && credits >= avatarCost;

  const handlePhotoUploadCallback = () => {
    setExpandedSections(prev => ({ ...prev, gender: true }));
  };

  return (
    <>
      <Head>
        <title>80s Yearbook Photo Generator | Throwback AI</title>
        <meta name="description" content="Transform your photo into an authentic 80s yearbook photo with new wave, rock, pop, and neon styles from the totally awesome decade." />
      </Head>

      <main className={styles.container}>
        {/* 80s Desktop Content */}
        <div className={styles.screenContent}>
          {/* Taskbar Credits Header */}
          <div className={styles.creditsHeader}>
            <div className={styles.creditsInfo}>
              <span className={styles.creditsIcon}>📻</span>
              <span className={styles.creditsText}>{credits} credits</span>
            </div>
            <button 
              onClick={() => router.push(isLoggedIn ? "/pricing" : "/signup")}
              className={styles.creditsButton}
            >
              {isLoggedIn ? "+" : "Sign Up"}
            </button>
          </div>

          {/* 80s Computer UI Hero Section */}
          <div className={styles.hero}>
            <h1 className={styles.title}>
              <span className={styles.titleEmoji}>📻</span>
              80s Yearbook Photos
            </h1>
            <p className={styles.subtitle}>
              Get totally awesome with authentic 80s yearbook vibes.
              <span className={styles.creditPill}>Costs {avatarCost} credits</span>
            </p>
          </div>

          {/* Single Computer Photo Section */}
          <div className={styles.photoSection}>
            <div className={styles.singleComputer}>
              {/* Computer Monitor */}
              <div className={styles.computerMonitor}>
                <h3 className={styles.monitorTitle}>
                  {resultImageUrl ? '80s Yearbook Result' : 'Upload Your Photo'}
                </h3>
                
                <div className={styles.monitorScreen}>
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
                      decade="80s"
                      styles={styles}
                    />
                  ) : (
                    <ImageDisplay
                      previewUrl={previewUrl}
                      resultImageUrl={resultImageUrl}
                      showingOriginal={showingOriginal}
                      setShowingOriginal={setShowingOriginal}
                      handleDownload={handleDownload}
                      decade="80s"
                      styles={styles}
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
            decade="80s"
            decadeStyles={EIGHTIES_STYLES}
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
        
        {/* Reusable Bottom Section Component */}
        <DecadeBottomSection currentDecade="80s" />
      </main>
    </>
  );
}