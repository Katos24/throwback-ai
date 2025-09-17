// pages/replicate/90s.js
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import useCredits from "../../hooks/useCredits";
import styles from "../../styles/decades/NinetiesPage.module.css";
import { NINETIES_STYLES, buildNinetiesPrompt } from "../../components/NinetiesPrompts";
import DecadeBottomSection from "../../components/DecadeBottomSection";
import PhotoUpload from "../../components/decades/shared/PhotoUpload";
import ImageDisplay from "../../components/decades/shared/ImageDisplay";
import ConfigurationSection from "../../components/decades/shared/ConfigurationSection";
import GenerateButton from "../../components/decades/shared/GenerateButton";
import { useDecadeGeneration } from "../../components/decades/hooks/useDecadeGeneration";
import NinetiesSEO from "../../components/SEO/NinetiesSEO";

export default function NinetiesPage() {
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

  // Generation hook with 90s prompt builder wrapper
  const ninetiesPromptWrapper = (gender, styleId, workflowType, strength) => {
    return buildNinetiesPrompt({
      gender,
      styleId,
      preserveFacialFeatures: true,
      intensity: strength > 25 ? 'strong' : strength < 15 ? 'subtle' : 'medium'
    });
  };
  
  const { generateAvatar, isLoading, progress, progressStage } = useDecadeGeneration("90s", ninetiesPromptWrapper);

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

    // Scroll to photo section on mobile when generation starts
    const scrollToPhoto = () => {
      const photoSection = document.querySelector(`.${styles.photoSection}`) || 
                          document.querySelector(`.${styles.computerMonitor}`) ||
                          document.querySelector(`.${styles.monitorScreen}`);
      
      if (photoSection && window.innerWidth <= 768) {
        photoSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    };

    try {
      // Convert gender format to match API expectations
      const apiGender = userGender === 'non-binary' ? 'non_binary' : userGender;
      
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
      a.download = `90s-yearbook-photo-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const getButtonText = () => {
    if (isLoading) return "Creating your radical 90s photo...";
    if (!photo) return "Upload a Photo First";
    if (!userGender || !selectedStyle) return "Complete Setup First";
    if (!isLoggedIn) return "Sign Up to Generate";
    if (credits < avatarCost) return "Get More Credits";
    return "Generate My 90s Yearbook Photo!";
  };

  const isComplete = photo && userGender && selectedStyle && isLoggedIn && credits >= avatarCost;

  const handlePhotoUploadCallback = () => {
    setExpandedSections(prev => ({ ...prev, gender: true }));
  };

  return (
    <>
      <NinetiesSEO />

      <main className={styles.container}>
        {/* 90s Bedroom Wall Posters */}
        <div className={styles.wallPoster}></div>
        <div className={styles.wallPoster}></div>
        
        {/* CRT Monitor Bezel */}
        <div className={styles.crtMonitor}></div>
        
        {/* Computer Screen Content */}
        <div className={styles.screenContent}>
          {/* Fixed Credits Header - 90s UI style */}
          <div className={styles.creditsHeader}>
            <div className={styles.creditsInfo}>
              <span className={styles.creditsIcon}>💾</span>
              <span className={styles.creditsText}>{credits} credits</span>
            </div>
            <button 
              onClick={() => router.push(isLoggedIn ? "/pricing" : "/signup")}
              className={styles.creditsButton}
            >
              {isLoggedIn ? "+" : "Sign Up"}
            </button>
          </div>

          {/* 90s Computer UI Hero Section */}
          <div className={styles.hero}>
            <h1 className={styles.title}>
              <span className={styles.titleEmoji}>📼</span>
              90s Yearbook Photos
            </h1>
            <p className={styles.subtitle}>
              Get totally radical with authentic 90s yearbook vibes.
              <span className={styles.creditPill}>Costs {avatarCost} credits</span>
            </p>
          </div>

          {/* Single Computer Photo Section */}
          <div className={styles.photoSection}>
            <div className={styles.singleComputer}>
              {/* Computer Monitor */}
              <div className={styles.computerMonitor}>
                <h3 className={styles.monitorTitle}>
                  {resultImageUrl ? '90s Yearbook Result' : 'Upload Your Photo'}
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
                      decade="90s"
                      styles={styles}
                    />
                  ) : (
                    <ImageDisplay
                      previewUrl={previewUrl}
                      resultImageUrl={resultImageUrl}
                      showingOriginal={showingOriginal}
                      setShowingOriginal={setShowingOriginal}
                      handleDownload={handleDownload}
                      decade="90s"
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
            decade="90s"
            decadeStyles={NINETIES_STYLES}
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
        <DecadeBottomSection currentDecade="90s" />
      </main>
    </>
  );
}