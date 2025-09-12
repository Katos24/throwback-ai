// pages/replicate/90s.js
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { supabase } from "../../lib/supabaseClient";
import useCredits from "../../hooks/useCredits";
import toast from 'react-hot-toast';
import styles from "../../styles/decades/NinetiesPage.module.css";
import { NINETIES_STYLES, buildNinetiesPrompt } from "../../components/NinetiesPrompts";
import DecadeBottomSection from "../../components/DecadeBottomSection";

export default function NinetiesPage() {
  const router = useRouter();
  
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStage, setProgressStage] = useState("");
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

  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    }
    getSession();
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file (PNG, JPG, HEIC)', {
        icon: '📼',
        duration: 4000,
      });
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be under 10MB', {
        icon: '📏',
        duration: 4000,
      });
      return;
    }

    setPhoto(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResultImageUrl(null);
    setShowingOriginal(false);
    
    toast.success('Photo uploaded! Time to get radical with your 90s look!', {
      icon: '📼',
      duration: 2000,
    });

    // Auto-expand gender section after photo upload
    setExpandedSections(prev => ({ ...prev, gender: true }));
  };

  const handleGenerateOrRedirect = () => {
    if (!photo) {
      toast.error('Please upload an image first', {
        icon: '📤',
        duration: 3000,
      });
      return;
    }

    if (!userGender || !selectedStyle) {
      toast.error('Please select your gender and 90s style', {
        icon: '⚙️',
        duration: 3000,
      });
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

    generateAvatar();
  };

  const generateAvatar = async () => {
    setIsLoading(true);
    setProgress(0);
    setProgressStage("Getting radical with your image...");
    setShowingOriginal(false);

    const processingToast = toast.loading('Creating your totally awesome 90s yearbook photo...', {
      icon: '📼',
    });

    try {
      // Get fresh session to avoid expired token
      const { data: { session: freshSession } } = await supabase.auth.getSession();
      if (!freshSession) {
        throw new Error("Please log in again to continue");
      }

      const headers = { "Content-Type": "application/json" };
      if (freshSession?.access_token) {
        headers.Authorization = `Bearer ${freshSession.access_token}`;
      }

      const compressedFile = await imageCompression(photo, {
        maxSizeMB: 1.0,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
        maxIteration: 10,
        initialQuality: 0.8,
      });

      setProgress(25);
      setProgressStage("Compressing image...");

      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.readAsDataURL(compressedFile);
      });

      setProgress(50);
      setProgressStage("Sending to the 90s AI...");

      // Use the enhanced prompt builder from the component
      const prompt = buildNinetiesPrompt({
        gender: userGender,
        styleId: selectedStyle,
        preserveFacialFeatures: true,
        intensity: styleStrength > 25 ? 'strong' : styleStrength < 15 ? 'subtle' : 'medium'
      });

      const response = await fetch("/api/replicate/aiAvatars", {
        method: "POST",
        headers,
        body: JSON.stringify({
          imageBase64: base64,
          prompt: prompt,
          styleStrength: styleStrength,
          user_gender: userGender,
          workflow_type: workflowType
        }),
      });

      setProgress(80);
      setProgressStage("Creating your rad 90s photo...");

      if (!response.ok) {
        throw new Error(`Failed to generate 90s yearbook photo: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.imageUrl) {
        setProgress(100);
        setProgressStage("Totally awesome!");
        setResultImageUrl(data.imageUrl);
        
        toast.success('Your 90s yearbook photo is totally rad!', {
          id: processingToast,
          icon: '📼',
          duration: 5000,
        });

        await refreshCredits();
      } else {
        throw new Error("No image URL returned from server");
      }
    } catch (err) {
      console.error("Error generating 90s yearbook photo:", err);
      toast.error(err.message || "90s photo generation failed. Please try again.", {
        id: processingToast,
        icon: '❌',
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
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
      
      toast.success('Your rad 90s photo downloaded!', {
        icon: '📼',
        duration: 3000,
      });
    } catch (error) {
      toast.error('Download failed. Please try again.', {
        icon: '❌',
        duration: 4000,
      });
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

  return (
    <>
      <Head>
        <title>90s Yearbook Photo Generator | Throwback AI</title>
        <meta name="description" content="Transform your photo into an authentic 90s yearbook photo with grunge, hip hop, alternative, and skater styles from the radical decade." />
      </Head>

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
                  {previewUrl || resultImageUrl ? (
                    <div className={styles.imageContainer}>
                      <Image
                        src={showingOriginal ? previewUrl : (resultImageUrl || previewUrl)}
                        alt={resultImageUrl && !showingOriginal ? "Generated 90s Yearbook Photo" : "Your photo"}
                        width={300}
                        height={300}
                        unoptimized={!showingOriginal && !!resultImageUrl}
                        className={styles.monitorImage}
                      />
                      
                      {/* Action Buttons */}
                      <div className={styles.buttonRow}>
                        {/* Toggle button to switch between before/after */}
                        {resultImageUrl && previewUrl && (
                          <button 
                            onClick={() => setShowingOriginal(!showingOriginal)}
                            className={styles.toggleButton}
                          >
                            {showingOriginal ? '✨ View 90s Result' : '👀 View Original'}
                          </button>
                        )}
                        
                        {/* Upload new photo button */}
                        <button 
                          onClick={() => document.getElementById('photo-upload').click()}
                          className={styles.changePhotoButton}
                        >
                          📷 Change Photo
                        </button>
                        
                        {/* Download button (only show when result exists) */}
                        {resultImageUrl && (
                          <button onClick={handleDownload} className={styles.downloadButton}>
                            💾 Save to Disk
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`${styles.uploadArea} ${dragActive ? styles.dragActive : ''}`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => document.getElementById('photo-upload').click()}
                    >
                      <div className={styles.uploadPrompt}>
                        <div className={styles.uploadIcon}>📷</div>
                        <h4>Drop your photo here</h4>
                        <p>Drag & drop or click to select</p>
                        <small>Best results with clear face photos<br/>PNG, JPG, HEIC up to 10MB</small>
                      </div>
                    </div>
                  )}
                </div>
                
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </div>

          {/* Configuration Options Grid */}
          <div className={styles.optionsGrid}>
            {/* Row 1: Gender & Workflow */}
            <div className={styles.optionRow}>
              {/* Gender Section */}
              <div className={styles.optionSection}>
                <button 
                  className={`${styles.sectionButton} ${expandedSections.gender ? styles.expanded : ''} ${userGender ? styles.completed : ''}`}
                  onClick={() => toggleSection('gender')}
                >
                  <span className={styles.sectionIcon}>👤</span>
                  <span className={styles.sectionTitle}>Gender</span>
                  <span className={styles.sectionValue}>{userGender || 'Select'}</span>
                  <span className={styles.expandIcon}>{expandedSections.gender ? '−' : '+'}</span>
                </button>
                
                {expandedSections.gender && (
                  <div className={styles.sectionContent}>
                    <div className={styles.buttonGroup}>
                      {["male", "female", "non-binary"].map((gender) => (
                        <button
                          key={gender}
                          className={`${styles.optionButton} ${userGender === gender ? styles.selected : ''}`}
                          onClick={() => {
                            setUserGender(gender);
                            setExpandedSections(prev => ({ ...prev, workflow: true }));
                          }}
                        >
                          {gender.charAt(0).toUpperCase() + gender.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Workflow Section */}
              <div className={styles.optionSection}>
                <button 
                  className={`${styles.sectionButton} ${expandedSections.workflow ? styles.expanded : ''} ${workflowType ? styles.completed : ''}`}
                  onClick={() => toggleSection('workflow')}
                >
                  <span className={styles.sectionIcon}>⚙️</span>
                  <span className={styles.sectionTitle}>Photo Quality</span>
                  <span className={styles.sectionValue}>{workflowType === 'HyperRealistic-likeness' ? 'HyperRealistic' : workflowType}</span>
                  <span className={styles.expandIcon}>{expandedSections.workflow ? '−' : '+'}</span>
                </button>
                
                {expandedSections.workflow && (
                  <div className={styles.sectionContent}>
                    <div className={styles.buttonGroup}>
                      {[
                        { value: "HyperRealistic-likeness", label: "HyperRealistic" },
                        { value: "Realistic", label: "Realistic" },
                        { value: "Stylistic", label: "Stylistic" }
                      ].map((workflow) => (
                        <button
                          key={workflow.value}
                          className={`${styles.optionButton} ${workflowType === workflow.value ? styles.selected : ''}`}
                          onClick={() => {
                            setWorkflowType(workflow.value);
                            setExpandedSections(prev => ({ ...prev, style: true }));
                          }}
                        >
                          {workflow.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Row 2: 90s Style & Style Strength */}
            <div className={styles.optionRow}>
              {/* 90s Style Selection */}
              <div className={styles.optionSection}>
                <button 
                  className={`${styles.sectionButton} ${expandedSections.style ? styles.expanded : ''} ${selectedStyle ? styles.completed : ''}`}
                  onClick={() => toggleSection('style')}
                >
                  <span className={styles.sectionIcon}>✨</span>
                  <span className={styles.sectionTitle}>Choose 90s Style</span>
                  <span className={styles.sectionValue}>
                    {selectedStyle ? NINETIES_STYLES.find(s => s.id === selectedStyle)?.label || 'Selected' : 'Select'}
                  </span>
                  <span className={styles.expandIcon}>{expandedSections.style ? '−' : '+'}</span>
                </button>
                
                {expandedSections.style && (
                  <div className={styles.sectionContent}>
                    <div className={styles.styleGrid}>
                      {NINETIES_STYLES.map((style) => (
                        <button
                          key={style.id}
                          className={`${styles.styleButton} ${selectedStyle === style.id ? styles.selected : ''}`}
                          onClick={() => {
                            setSelectedStyle(style.id);
                            setExpandedSections(prev => ({ ...prev, strength: true }));
                          }}
                          title={style.description}
                        >
                          <span className={styles.styleEmoji}>
                            {style.emoji}
                          </span>
                          {style.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Style Strength */}
              <div className={styles.optionSection}>
                <button 
                  className={`${styles.sectionButton} ${expandedSections.strength ? styles.expanded : ''} ${styles.completed}`}
                  onClick={() => toggleSection('strength')}
                >
                  <span className={styles.sectionIcon}>📊</span>
                  <span className={styles.sectionTitle}>Style Strength</span>
                  <span className={styles.sectionValue}>{styleStrength}%</span>
                  <span className={styles.expandIcon}>{expandedSections.strength ? '−' : '+'}</span>
                </button>
                
                {expandedSections.strength && (
                  <div className={styles.sectionContent}>
                    <div className={styles.sliderContainer}>
                      <input
                        type="range"
                        min="5"
                        max="35"
                        value={styleStrength}
                        onChange={(e) => setStyleStrength(Number(e.target.value))}
                        className={styles.slider}
                      />
                      <div className={styles.sliderLabels}>
                        <span>Preserve Face</span>
                        <span>Strong 90s Style</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className={styles.generateSection}>
            <button
              onClick={handleGenerateOrRedirect}
              disabled={isLoading}
              className={`${styles.generateButton} ${isComplete ? styles.ready : ''}`}
            >
              {isLoading ? (
                <>
                  <div className={styles.spinner}></div>
                  {getButtonText()}
                </>
              ) : (
                getButtonText()
              )}
            </button>

            {/* Progress Bar */}
            {isLoading && (
              <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className={styles.progressText}>
                  <span>{progressStage}</span>
                  <span>{progress}%</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reusable Bottom Section Component */}
        <DecadeBottomSection currentDecade="90s" />
      </main>
    </>
  );
}