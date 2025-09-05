import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { supabase } from "../../lib/supabaseClient";
import useCredits from "../../hooks/useCredits";
import toast from "react-hot-toast";
import styles from "../../styles/YearbookNew.module.css";
import SEOYearbook from "../../components/SEO/SEOYearbook";
import YearbookGallery from "../../components/YearbookGallery";

// Import yearbook styles from your centralized component
import { styleCategories } from "../../components/YearbookStyles";

const ENHANCED_NEGATIVE_PROMPT =
  "nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, multiple people, group photo, other people, crowd, other faces, two people, three people, group portrait, many people, background people, modern clothing, contemporary fashion, digital photography, harsh lighting, oversaturated colors, modern hairstyles, smartphone, 2000s style, 2010s fashion, modern technology, instagram filter, face change, different person, altered facial features, wrong face, facial distortion, unrecognizable face, race change, ethnicity change, skin tone change, facial structure change, wrong identity";

const YEARBOOK_COST = 5;

export default function YearbookTransformRedesigned() {
  const router = useRouter();

  // Style name options that match the API mapping
  const styleNameOptions = [
    "Photographic (Default)", 
    "Cinematic",
    "Digital Art",
    "Fantasy art",
    "Neonpunk", 
    "Enhance",
    "Comic book",
    "Disney Character",
    "Lowpoly",
    "Line art"
  ];

  // ===== STATE =====
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedStyleName, setSelectedStyleName] = useState("Photographic (Default)");
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStage, setProgressStage] = useState("");
  const [showStyleDropdown, setShowStyleDropdown] = useState(false);
  const [showArtStyleDropdown, setShowArtStyleDropdown] = useState(false);

  // Credits functionality
  const { credits, isLoggedIn, refreshCredits } = useCredits();

  // ===== BADGE HELPER FUNCTION =====
  const getBadgeInfo = (style) => {
    const badges = [];
    if (style.isNew) badges.push({ text: 'New', type: 'new', color: '#10B981' });
    if (style.isPopular) badges.push({ text: 'Popular', type: 'popular', color: '#F59E0B' });
    if (style.isPremium) badges.push({ text: 'Premium', type: 'premium', color: '#8B5CF6' });
    if (style.isBeta) badges.push({ text: 'Beta', type: 'beta', color: '#EF4444' });
    if (style.isRecommended) badges.push({ text: 'Recommended', type: 'recommended', color: '#3B82F6' });
    return badges;
  };

  // ===== EFFECTS =====
  useEffect(() => {
    if (router.query.success === "true") {
      // Handle any success state
    }
  }, [router.query]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error getting session:", error);
          return;
        }
        if (session?.user) {
          setUserId(session.user.id);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  // Clean up preview URL when component unmounts or photo changes
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // ===== HANDLERS =====
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
    if (file && file.type.startsWith("image/")) {
      // Clean up previous preview URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      
      setPhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultImageUrl(null);
      toast.success('Photo uploaded! Choose your 90s yearbook style.', {
        icon: '📚',
        duration: 2000,
      });
    } else {
      toast.error("Please upload a valid image file.");
    }
  };

  const handleStyleSelect = (styleValue) => {
    setSelectedStyle(styleValue);
    setShowStyleDropdown(false);
  };

  const handleArtStyleSelect = (styleName) => {
    setSelectedStyleName(styleName);
    setShowArtStyleDropdown(false);
  };

  // Updated function to handle button clicks based on user state
  const handleGenerateOrRedirect = () => {
    if (!photo) {
      toast.error('Please upload an image first', { icon: '📤', duration: 3000 });
      return;
    }
    if (!selectedStyle) {
      toast.error('Please select a yearbook style first', { icon: '🎨', duration: 3000 });
      return;
    }
    if (!selectedStyleName) {
      toast.error('Please select an art style first', { icon: '🎨', duration: 3000 });
      return;
    }
    if (!isLoggedIn) {
      router.push('/signup');
      return;
    }
    if (credits < YEARBOOK_COST) {
      router.push('/pricing');
      return;
    }
    generateImage("/api/replicate/yearbook");
  };

  // ===== GENERATE IMAGE =====
  const generateImage = async (endpoint) => {
    // Safely check if styleCategories exists and has the selected category
    if (!styleCategories || !styleCategories[selectedCategory]) {
      toast.error("Style categories not available. Please refresh the page.");
      return;
    }

    const allStyles = Object.values(styleCategories).flat();
    const selectedCharacter = allStyles.find((c) => c.value === selectedStyle);
    
    if (!selectedCharacter) {
      toast.error("Selected style not found. Please try again.");
      return;
    }

    const prompt = `Professional 1990s school yearbook portrait of img, ${selectedCharacter.promptDesc}, classic school photography studio setup. Shot with medium format camera, soft diffused studio lighting with key light and fill light, neutral gray or blue mottled backdrop typical of school portraits. Shoulders and upper chest visible, subject looking directly at camera with natural smile or serious expression. Authentic 90s styling: clothing, and makeup. Professional headshot composition with subject centered, slight vignette effect. Film photography grain and color saturation typical of 1990s Kodak portrait film. IMPORTANT: Preserve exact original gender, facial features, skin tone, hair style, hair length, ethnicity, bone structure, eye shape, and all identifying characteristics with photographic realism. Maintain the person's natural race and ethnic appearance completely unchanged. Studio portrait lighting, not candid or artistic photography.`;

    let processingToast;

    try {
      setIsLoading(true);
      setResultImageUrl(null);
      setProgress(5);
      setProgressStage("Preparing image...");

      await new Promise((resolve) => setTimeout(resolve, 200));

      setProgress(15);
      setProgressStage("Compressing photo...");

      const compressedFile = await imageCompression(photo, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 768,
        useWebWorker: true,
        maxIteration: 10,
        initialQuality: 0.6,
      });

      setProgress(30);
      setProgressStage("Encoding image...");

      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(compressedFile);
      });

      setProgress(50);
      setProgressStage("Sending to AI...");

      processingToast = toast.loading('Creating your 90s yearbook portrait...', { icon: '📚' });

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: base64,
          prompt,
          negativePrompt: ENHANCED_NEGATIVE_PROMPT,
          styleName: selectedStyleName,
          styleStrength: selectedCharacter.styleStrength,
          guidanceScale: selectedCharacter.guidanceScale,
          referenceImage: selectedCharacter.referenceImage || null,
          userId,
        }),
      });

      setProgress(80);
      setProgressStage("AI is generating your yearbook photo...");

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to generate image: ${response.status} ${errorData}`);
      }

      const data = await response.json();
      if (data.imageUrl) {
        setResultImageUrl(data.imageUrl);
        setProgress(100);
        setProgressStage("Done!");
        toast.success("90s yearbook transformation complete!", {
          id: processingToast,
          icon: '📚',
          duration: 5000,
        });
        await refreshCredits();
      } else {
        throw new Error("No image URL returned from server");
      }
    } catch (error) {
      setProgress(0);
      setProgressStage("");
      console.error("Error generating image:", error);
      
      const errorMessage = error.message || "Yearbook generation failed. Please try again.";
      toast.error(errorMessage, {
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
      if (!resp.ok) {
        throw new Error('Failed to fetch image');
      }
      
      const blob = await resp.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `90s-yearbook-transform-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success('90s yearbook photo downloaded!', { icon: '📚', duration: 3000 });
    } catch (downloadError) {
      console.error('Download failed:', downloadError);
      toast.error('Download failed. Please try again.', { icon: '❌', duration: 4000 });
    }
  };

  const getButtonText = () => {
    if (isLoading) return "Creating your 90s yearbook...";
    if (!photo) return "Upload a Photo First";
    if (!selectedStyle) return "Select a 90s Style First";
    if (!selectedStyleName) return "Select an Art Style First";
    if (!isLoggedIn) return "Sign Up to Generate";
    if (credits < YEARBOOK_COST) return "Get More Credits";
    return "Generate Yearbook Transform";
  };

  const getButtonEmoji = () => {
    if (isLoading) return null;
    if (!photo) return "📷";
    if (!selectedStyle) return "🎨";
    if (!selectedStyleName) return "🎨";
    if (!isLoggedIn) return "🔒";
    if (credits < YEARBOOK_COST) return "💎";
    return "📚";
  };

  const selectedStyleDetails = (() => {
    if (!selectedStyle || !styleCategories) return null;
    const allStyles = Object.values(styleCategories).flat();
    return allStyles.find((c) => c.value === selectedStyle);
  })();

  const isComplete = photo && selectedStyle && selectedStyleName && isLoggedIn && credits >= YEARBOOK_COST;

  // Safe check for styleCategories
  if (!styleCategories || !styleCategories[selectedCategory]) {
    return (
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Loading...</h1>
          <p className={styles.subtitle}>Please wait while we load the yearbook styles.</p>
        </div>
      </div>
    );
  }

  // ===== RENDER =====
  return (
    <>
      <SEOYearbook />
      <Head>
        <title>90s Yearbook Transform | Throwback AI</title>
        <meta
          name="description"
          content="Transform your photos into authentic 90s yearbook styles with AI. Choose from grunge, hip-hop, preppy, and more iconic 90s looks."
        />
      </Head>

      <main className={styles.container}>
        {/* Fixed Credits Header */}
        <div className={styles.creditsHeader}>
          <div className={styles.creditsInfo}>
            <span className={styles.creditsIcon}>📚</span>
            <span className={styles.creditsText}>{credits} credits</span>
          </div>
          <button 
            onClick={() => router.push(isLoggedIn ? "/pricing" : "/signup")}
            className={styles.creditsButton}
          >
            {isLoggedIn ? "+" : "Sign Up"}
          </button>
        </div>

        {/* Hero */}
        <div className={styles.hero}>
          <h1 className={styles.title}>
            <span className={styles.titleEmoji}>📸</span>
            90s Yearbook Transform
          </h1>
          <p className={styles.subtitle}>
            Travel back in time! Transform your photo into an authentic 90s yearbook picture with iconic retro styles.
            <span className={styles.creditPill}>Costs {YEARBOOK_COST} credits</span>
          </p>
          <p className={styles.signupBonus}>
            Sign up today and get <strong>5 free credits</strong> to start your transformation!
          </p>
        </div>

        {/* Before/After Photo Section */}
        <div className={styles.photoSection}>
          <div className={styles.photoComparison}>
            {/* Upload Card */}
            <div className={styles.uploadCard}>
              <h3 className={styles.cardTitle}>Upload Your Photo</h3>
              <div
                className={`${styles.uploadZone} ${dragActive ? styles.dragActive : ""} ${previewUrl ? styles.hasImage : ""}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById("photo-upload")?.click()}
              >
                {previewUrl ? (
                  <div className={styles.previewContainer}>
                    <Image
                      src={previewUrl}
                      alt="Your photo"
                      width={200}
                      height={200}
                      className={styles.previewImage}
                    />
                    <div className={styles.changePhotoOverlay}>
                      <span>Click to change photo</span>
                    </div>
                  </div>
                ) : (
                  <div className={styles.uploadPrompt}>
                    <div className={styles.uploadIcon}>📷</div>
                    <h4>Drop your photo here</h4>
                    <p>Drag & drop or click to select</p>
                    <small>Best results with clear, front-facing face photos</small>
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

            {/* Results Card */}
            <div className={styles.resultCard}>
              <h3 className={styles.cardTitle}>Your 90s Transformation</h3>
              <div className={styles.resultZone}>
                {resultImageUrl ? (
                  <div className={styles.resultContainer}>
                    <Image
                      src={resultImageUrl}
                      alt="90s Yearbook Result"
                      width={200}
                      height={200}
                      unoptimized
                      className={styles.resultImage}
                    />
                    <div className={styles.resultActions}>
                      <button onClick={handleDownload} className={styles.downloadBtn}>
                        📥 Download
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.placeholder}>
                    <div className={styles.placeholderIcon}>📚</div>
                    <p>Your yearbook photo will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className={styles.generateSection}>
          {isLoading && (
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className={styles.progressText}>
                <span>{progressStage}</span>
                <span>{progress}%</span>
              </div>
            </div>
          )}

          <button
            onClick={handleGenerateOrRedirect}
            disabled={isLoading || !photo || !selectedStyle || !selectedStyleName}
            className={`${styles.generateButton} ${isComplete ? styles.ready : ''}`}
          >
            {isLoading ? (
              <>
                <div className={styles.spinner}></div>
                {getButtonText()}
              </>
            ) : (
              <>
                {getButtonEmoji() && <span>{getButtonEmoji()}</span>}
                {getButtonText()}
              </>
            )}
          </button>
        </div>

        {/* Modern Options Section */}
        <div className={styles.optionsSection}>
          <h2 className={styles.optionsTitle}>Choose Your Style Options</h2>
          
          <div className={styles.dropdownGrid}>
            {/* Left Column - 90s Vibe */}
            <div className={styles.dropdownContainer}>
              <span className={styles.labelText}>📚 90s Yearbook Vibe</span>
              
              <div className={styles.categoryButtons}>
                {Object.keys(styleCategories).map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setSelectedStyle(null);
                    }}
                    className={`${styles.categoryButton} ${selectedCategory === category ? styles.selectedCategory : ''}`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>

              <div className={styles.stylesGrid}>
                {styleCategories[selectedCategory]?.map((style) => {
                  // Safer label splitting with fallback
                  const labelParts = style.label ? style.label.split(" ") : [ "Unknown"];
                  const emoji = labelParts[0] || "🎨";
                  const name = labelParts.slice(1).join(" ") || "Unknown Style";

                  return (
                    <div 
                      key={style.value} 
                      onClick={() => handleStyleSelect(style.value)}
                      className={`${styles.styleCard} ${selectedStyle === style.value ? styles.selectedStyle : ''}`}
                    >
                      <div className={styles.badgesContainer}>
                        {getBadgeInfo(style).map((badge, idx) => (
                          <span 
                            key={idx} 
                            className={`${styles.badge} ${styles[`badge${badge.type}`] || ''}`}
                            style={{ backgroundColor: badge.color }}
                          >
                            {badge.text}
                          </span>
                        ))}
                      </div>
                      <div className={styles.styleLabel}>
                        <span className={styles.styleEmoji}>{emoji}</span>
                        <span className={styles.styleName}>{name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column - Art Style */}
            <div className={styles.dropdownContainer}>
              <span className={styles.labelText}>🎨 Artistic Style</span>
              
              <div className={styles.artStyleList}>
                {styleNameOptions.map((styleName) => (
                  <div 
                    key={styleName}
                    onClick={() => handleArtStyleSelect(styleName)}
                    className={`${styles.artStyleItem} ${selectedStyleName === styleName ? styles.selectedArtStyle : ''}`}
                  >
                    <span className={styles.artStyleEmoji}>🎨</span>
                    <span className={styles.artStyleName}>{styleName}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {selectedStyleDetails && (
            <div className={styles.selectedStyleDetails}>
              <h3 className={styles.detailsTitle}>Style Details</h3>
              <p className={styles.detailsDesc}>
                {selectedStyleDetails.promptDesc}
              </p>
              <p className={styles.detailsParams}>
                <span>Style Strength: {selectedStyleDetails.styleStrength}</span> | 
                <span> Guidance: {selectedStyleDetails.guidanceScale}</span>
              </p>
            </div>
          )}
        </div>

        {/* Generate Button */}
        <div className={styles.generateSection}>
          <button
            onClick={handleGenerateOrRedirect}
            disabled={isLoading || !photo || !selectedStyle || !selectedStyleName}
            className={`${styles.generateButton} ${isComplete ? styles.ready : ''}`}
          >
            {isLoading ? (
              <>
                <div className={styles.spinner}></div>
                {getButtonText()}
              </>
            ) : (
              <>
                {getButtonEmoji() && <span>{getButtonEmoji()}</span>}
                {getButtonText()}
              </>
            )}
          </button>
        </div>

        {/* Progress Bar */}
        {isLoading && (
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className={styles.progressText}>
              <span>{progressStage}</span>
              <span>{progress}%</span>
            </div>
          </div>
        )}

        {/* Gallery Section */}
        <YearbookGallery />
      </main>
    </>
  );
}