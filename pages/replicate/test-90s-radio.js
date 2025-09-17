// pages/replicate/test-90s-radio.js
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import PhotoUpload from "../../components/decades/shared/PhotoUpload";
import ImageDisplay from "../../components/decades/shared/ImageDisplay";
import GenerateButton from "../../components/decades/shared/GenerateButton";
import { useDecadeGeneration } from "../../components/decades/hooks/useDecadeGeneration";
import { NINETIES_STYLES, buildNinetiesPrompt } from "../../components/NinetiesPrompts";
import useCredits from "../../hooks/useCredits";
import styles from "../../styles/decades/RadioNinetiesTest.module.css";

export default function RadioNinetiesTest() {
  const router = useRouter();
  
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const [session, setSession] = useState(null);
  const [showingOriginal, setShowingOriginal] = useState(false);

  // Credits and auth
  const { credits, isLoggedIn, refreshCredits } = useCredits();
  const avatarCost = 50;

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

  // Radio state
  const [currentFrequency, setCurrentFrequency] = useState(91.1);
  const [currentStation, setCurrentStation] = useState(null);
  const [isStatic, setIsStatic] = useState(false);
  const [isTuning, setIsTuning] = useState(false);
  const [dialAngle, setDialAngle] = useState(0);

  // Configuration state
  const [userGender, setUserGender] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [styleStrength, setStyleStrength] = useState(20);
  const [workflowType, setWorkflowType] = useState("HyperRealistic-likeness");

  // Radio stations mapping to actual 90s styles - using correct NINETIES_STYLES IDs
  const radioStations = [
    { freq: 91.1, style: 'grunge', name: 'GRUNGE-FM', tagline: 'All flannel, all the time', angle: 0 },
    { freq: 92.3, style: 'hip-hop', name: 'HIP-HOP BEATS', tagline: 'Straight from the streets', angle: 45 },
    { freq: 93.7, style: 'rave', name: 'RAVE-WAVES', tagline: 'Dance floor madness', angle: 90 },
    { freq: 94.5, style: 'preppy', name: 'PREP-FM', tagline: 'Country club classics', angle: 135 },
    { freq: 95.9, style: 'skater', name: 'SKATE-RADIO', tagline: 'Totally radical vibes', angle: 180 },
    { freq: 96.7, style: 'mall-goth', name: 'DARK-WAVE', tagline: 'Embrace the darkness', angle: 225 },
    { freq: 97.5, style: 'boy-band', name: 'TEEN-FM', tagline: 'Heartthrob headquarters', angle: 270 },
    { freq: 98.3, style: 'sitcom-character', name: 'FAMILY-FM', tagline: 'Must-see TV vibes', angle: 315 }
  ];

  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    }
    getSession();
  }, []);

  useEffect(() => {
    // Set initial station
    const initialStation = radioStations.find(s => s.freq === currentFrequency);
    if (initialStation) {
      setCurrentStation(initialStation);
      setSelectedStyle(initialStation.style);
    }
  }, []);

  const tuneToStation = (station) => {
    setIsTuning(true);
    setIsStatic(true);
    
    // Simulate tuning delay
    setTimeout(() => {
      setCurrentFrequency(station.freq);
      setCurrentStation(station);
      setSelectedStyle(station.style);
      setDialAngle(station.angle);
      setIsStatic(false);
      setIsTuning(false);
    }, 800);
  };

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
                          document.querySelector(`.${styles.mainContent}`);
      
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

  const getButtonText = () => {
    if (isLoading) return "Creating your radical 90s photo...";
    if (!photo) return "Upload a Photo First";
    if (!selectedStyle) return "Tune to a Station First";
    if (!userGender) return "Set Antenna (Gender) First";
    if (!isLoggedIn) return "Sign Up to Generate";
    if (credits < avatarCost) return "Get More Credits";
    return "🎵 RECORD 90s YEARBOOK PHOTO 🎵";
  };

  const isComplete = photo && userGender && selectedStyle && isLoggedIn && credits >= avatarCost;

  const handleDownload = async () => {
    if (!resultImageUrl) return;
    
    try {
      const resp = await fetch(resultImageUrl);
      const blob = await resp.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `90s-radio-yearbook-photo-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handlePhotoUploadCallback = () => {
    // Auto-expand gender section or any other callback logic
    console.log('Photo uploaded successfully');
  };

  return (
    <>
      <Head>
        <title>90s Radio Test - Yearbook Generator</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.creditsBar}>
          <span>90s Radio Yearbook Generator - Test Mode | {credits} credits</span>
          <button onClick={() => router.push('/')}>Back to Main</button>
        </div>

        <div className={styles.mainContent}>
          {/* Photo Upload Section */}
          <div className={styles.photoSection}>
            <h2 className={styles.photoTitle}>Upload Your Photo</h2>
            
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
                filterEnabled={null} // No filter for this test page
                setFilterEnabled={null}
                handleDownload={handleDownload}
                decade="90s"
                styles={styles}
                // Add loading overlay props
                isLoading={isLoading}
                progress={progress}
                progressStage={progressStage}
              />
            )}

            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={() => {}} // Handled by PhotoUpload component
              style={{ display: 'none' }}
            />
          </div>
        </div>

        {/* Boombox Control Section */}
        <div className={styles.boomboxSection}>
          <div className={styles.boomboxHeader}>
            <h1>90s MEGA BLASTER</h1>
          </div>

          {/* Radio Display */}
          <div className={styles.radioDisplay}>
            <div className={`${styles.frequencyDisplay} ${isTuning ? styles.tuning : ''} ${isStatic ? styles.static : ''}`}>
              {isStatic ? 'STATIC' : `${currentFrequency} FM`}
            </div>
            <div className={styles.stationName}>
              {isStatic ? '~~~~~~~~' : currentStation?.name || 'NO SIGNAL'}
            </div>
            <div className={styles.nowPlaying}>
              {isStatic ? 'TUNING...' : currentStation?.tagline || 'Select a station'}
            </div>
          </div>

          {/* Radio Dial */}
          <div className={styles.dialSection}>
            <div className={styles.dialContainer}>
              <div className={styles.dialKnob}>
                <div 
                  className={styles.dialIndicator}
                  style={{ transform: `translateX(-50%) rotate(${dialAngle}deg)` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Station Preset Buttons */}
          <div className={styles.stationButtons}>
            {radioStations.map((station) => (
              <button
                key={station.freq}
                className={`${styles.stationBtn} ${currentStation?.freq === station.freq ? styles.active : ''}`}
                onClick={() => tuneToStation(station)}
                disabled={isTuning}
              >
                {station.freq}
              </button>
            ))}
          </div>

          {/* Control Knobs */}
          <div className={styles.controlKnobs}>
            <div className={styles.knobGroup}>
              <label>ANTENNA (Gender)</label>
              <select 
                value={userGender} 
                onChange={(e) => setUserGender(e.target.value)}
                className={styles.antennaSelect}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
              </select>
            </div>

            <div className={styles.knobGroup}>
              <label>VOLUME (Style Intensity)</label>
              <input
                type="range"
                min="5"
                max="35"
                value={styleStrength}
                onChange={(e) => setStyleStrength(Number(e.target.value))}
                className={styles.volumeSlider}
              />
              <span>{styleStrength}%</span>
            </div>
          </div>

          {/* Generate Button - Using shared component */}
          <GenerateButton 
            onClick={handleGenerateOrRedirect}
            isLoading={isLoading}
            getButtonText={getButtonText}
            isComplete={isComplete}
            progress={progress}
            progressStage={progressStage}
            styles={styles}
          />

          {/* Current Selection Display */}
          {currentStation && (
            <div className={styles.selectionDisplay}>
              <h3>Now Playing:</h3>
              <p><strong>{currentStation.name}</strong> - {currentStation.tagline}</p>
              <p>Style: <strong>{selectedStyle}</strong></p>
              <p>Gender: <strong>{userGender || 'Not set'}</strong></p>
              <p>Intensity: <strong>{styleStrength}%</strong></p>
            </div>
          )}
        </div>

      </main>
    </>
  );
}