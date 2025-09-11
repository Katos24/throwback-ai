// pages/replicate/2000s.js
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { supabase } from "../../lib/supabaseClient";
import useCredits from "../../hooks/useCredits";
import toast from 'react-hot-toast';
import styles from "../../styles/decades/TwothousandsPage.module.css";
import { TWOTHOUSANDS_STYLES, buildTwothousandsPrompt } from "../../components/TwothousandsPrompts";

export default function TwothousandsPage() {
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
        icon: '💻',
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
    
    toast.success('Photo uploaded! Ready for Y2K transformation!', {
      icon: '💻',
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
      toast.error('Please select your gender and 2000s style', {
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
    setProgressStage("Initializing Y2K transformation...");
    setShowingOriginal(false);

    const processingToast = toast.loading('Creating your totally awesome 2000s yearbook photo...', {
      icon: '💻',
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
      setProgressStage("Sending to the Y2K AI...");

      // Use the detailed prompt builder
      const prompt = buildTwothousandsPrompt(userGender, selectedStyle, workflowType, styleStrength);

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
      setProgressStage("Creating your awesome 2000s photo...");

      if (!response.ok) {
        throw new Error(`Failed to generate 2000s yearbook photo: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.imageUrl) {
        setProgress(100);
        setProgressStage("Totally awesome!");
        setResultImageUrl(data.imageUrl);
        
        toast.success('Your 2000s yearbook photo is totally rad!', {
          id: processingToast,
          icon: '💻',
          duration: 5000,
        });

        await refreshCredits();
      } else {
        throw new Error("No image URL returned from server");
      }
    } catch (err) {
      console.error("Error generating 2000s yearbook photo:", err);
      toast.error(err.message || "2000s photo generation failed. Please try again.", {
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
      a.download = `2000s-yearbook-photo-${filterEnabled ? 'filtered' : 'unfiltered'}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('Your awesome 2000s photo downloaded!', {
        icon: '💻',
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
    if (isLoading) return "Creating your awesome 2000s photo...";
    if (!photo) return "Upload a Photo First";
    if (!userGender || !selectedStyle) return "Complete Setup First";
    if (!isLoggedIn) return "Sign Up to Generate";
    if (credits < avatarCost) return "Get More Credits";
    return "Generate My 2000s Yearbook Photo!";
  };

  const isComplete = photo && userGender && selectedStyle && isLoggedIn && credits >= avatarCost;

  return (
    <>
      <Head>
        <title>2000s Yearbook Photo Generator | Throwback AI</title>
        <meta name="description" content="Transform your photo into an authentic 2000s yearbook photo with emo, scene, pop punk, and hipster styles from the Y2K era." />
      </Head>

      <main className={styles.container}>
        {/* XP Taskbar */}
        <div className={styles.taskbar}>
          <div className={styles.startButton}>
            <span className={styles.startIcon}>🏠</span>
            <span>Start</span>
          </div>
          <div className={styles.taskbarCenter}>
            <div className={styles.openWindow}>
              <span className={styles.windowIcon}>💻</span>
              <span>2000s Photo Generator</span>
            </div>
          </div>
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
                  {previewUrl || resultImageUrl ? (
                    <div className={styles.imageContainer}>
                      <Image
                        src={showingOriginal ? previewUrl : (resultImageUrl || previewUrl)}
                        alt={resultImageUrl && !showingOriginal ? "Generated 2000s Yearbook Photo" : "Your photo"}
                        width={320}
                        height={320}
                        unoptimized={!showingOriginal && !!resultImageUrl}
                        className={`${styles.displayImage} ${resultImageUrl && !showingOriginal && filterEnabled ? styles.y2kFilter : ''}`}
                      />
                      
                      {/* Action Buttons */}
                      <div className={styles.buttonRow}>
                        {resultImageUrl && previewUrl && (
                          <button 
                            onClick={() => setShowingOriginal(!showingOriginal)}
                            className={styles.toggleButton}
                          >
                            {showingOriginal ? '💻 View 2000s Result' : '👀 View Original'}
                          </button>
                        )}
                        
                        {resultImageUrl && !showingOriginal && (
                          <button 
                            onClick={() => setFilterEnabled(!filterEnabled)}
                            className={styles.filterToggleButton}
                          >
                            {filterEnabled ? '💻 Remove Y2K Filter' : '💻 Add Y2K Filter'}
                          </button>
                        )}
                        
                        <button 
                          onClick={() => document.getElementById('photo-upload').click()}
                          className={styles.changePhotoButton}
                        >
                          📷 Change Photo
                        </button>
                        
                        {resultImageUrl && (
                          <button onClick={handleDownload} className={styles.downloadButton}>
                            💾 Save Photo
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
                        <p>Drag & drop or click to browse</p>
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

              {/* Options Panel */}
              <div className={styles.optionsPanel}>
                {/* Row 1: Gender & Photo Quality */}
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

                {/* Row 2: Style & Style Strength */}
                <div className={styles.optionRow}>
                  {/* Style Section */}
                  <div className={styles.optionSection}>
                    <button 
                      className={`${styles.sectionButton} ${expandedSections.style ? styles.expanded : ''} ${selectedStyle ? styles.completed : ''}`}
                      onClick={() => toggleSection('style')}
                    >
                      <span className={styles.sectionIcon}>💻</span>
                      <span className={styles.sectionTitle}>Choose 2000s Style</span>
                      <span className={styles.sectionValue}>
                        {selectedStyle ? TWOTHOUSANDS_STYLES.find(s => s.id === selectedStyle)?.label || 'Selected' : 'Select'}
                      </span>
                      <span className={styles.expandIcon}>{expandedSections.style ? '−' : '+'}</span>
                    </button>
                    
                    {expandedSections.style && (
                      <div className={styles.sectionContent}>
                        <div className={styles.styleGrid}>
                          {TWOTHOUSANDS_STYLES.map((style) => (
                            <button
                              key={style.id}
                              className={`${styles.styleButton} ${selectedStyle === style.id ? styles.selected : ''}`}
                              onClick={() => {
                                setSelectedStyle(style.id);
                                setExpandedSections(prev => ({ ...prev, strength: true }));
                              }}
                            >
                              <span className={styles.styleEmoji}>{style.emoji}</span>
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
                            <span>Strong 2000s Style</span>
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
          </div>
        </div>
      </main>
    </>
  );
}