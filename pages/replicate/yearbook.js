import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import imageCompression from "browser-image-compression";
import { supabase } from "../../lib/supabaseClient";
import styles from "../../styles/YearbookTransform.module.css";
import toast from "react-hot-toast";

// Import yearbook styles from your centralized component
import { styleCategories } from "../../components/YearbookStyles";

const ENHANCED_NEGATIVE_PROMPT =
  "nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, multiple people, group photo, other people, crowd, other faces, two people, three people, group portrait, many people, background people, modern clothing, contemporary fashion, digital photography, harsh lighting, oversaturated colors, modern hairstyles, smartphone, 2000s style, 2010s fashion, modern technology, instagram filter, face change, different person, altered facial features, wrong face, facial distortion, unrecognizable face, race change, ethnicity change, skin tone change, facial structure change, wrong identity";

const YEARBOOK_COST = 20;

export default function YearbookTransform() {
  const router = useRouter();

  // ===== STATE =====
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  const [userId, setUserId] = useState(null);
  const [credits, setCredits] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // ===== EFFECTS =====
  useEffect(() => {
    if (router.query.success === "true") {
      setIsPremiumUnlocked(true);
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
          setIsLoggedIn(true);
          // Fetch credits from profile table
          const { data, error: profileError } = await supabase
            .from("profiles")
            .select("credits_remaining")
            .eq("id", session.user.id)
            .single();
          if (!profileError && data) {
            setCredits(data.credits_remaining || 0);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

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
      setPhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultImageUrl(null);
    } else {
      toast.error("Please upload a valid image file.");
    }
  };

  // ===== GENERATE IMAGE WITH CREDITS CHECK =====
  const generateImage = async (endpoint) => {
    if (!photo || !selectedStyle) {
      toast.error("Please upload a photo and select a style first!", { icon: "📤" });
      return;
    }

    if (!isLoggedIn) {
      toast.error("Sign up required for yearbook transformation", {
        icon: "🔒",
        duration: 4000,
        action: {
          label: "Sign Up",
          onClick: () => window.location.href = "/signup"
        }
      });
      return;
    }

    if (credits < YEARBOOK_COST) {
      toast.error(`You need ${YEARBOOK_COST} credits for yearbook transformation`, {
        icon: "📚",
        duration: 4000,
        action: {
          label: "Get Credits",
          onClick: () => window.location.href = "/pricing"
        }
      });
      return;
    }

    const allStyles = Object.values(styleCategories).flat();
    const selectedCharacter = allStyles.find((c) => c.value === selectedStyle);

    if (!selectedCharacter) {
      toast.error("Selected style not found. Please try again.");
      return;
    }

    const prompt = `Professional 1990s high school yearbook portrait of img, ${selectedCharacter.promptDesc}, classic school photography studio setup. Shot with medium format camera, soft diffused studio lighting with key light and fill light, neutral gray or blue mottled backdrop typical of school portraits. Shoulders and upper chest visible, subject looking directly at camera with natural smile or serious expression. Authentic 90s styling: period-appropriate haircuts, clothing, and makeup. Professional headshot composition with subject centered, slight vignette effect. Film photography grain and color saturation typical of 1990s Kodak portrait film. IMPORTANT: Preserve exact original facial features, skin tone, hair, ethnicity, bone structure, eye shape, and all identifying characteristics with photographic realism. Maintain the person's natural race and ethnic appearance completely unchanged. Studio portrait lighting, not candid or artistic photography.`;

    try {
      setIsLoading(true);
      setResultImageUrl(null);

      const compressedFile = await imageCompression(photo, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 768,
        useWebWorker: true,
        maxIteration: 10,
        initialQuality: 0.6,
      });

      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.readAsDataURL(compressedFile);
      });

      // Show processing toast
      const processingToast = toast.loading('Creating your 90s yearbook portrait...', {
        icon: '📚',
      });

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: base64,
          prompt,
          negativePrompt: ENHANCED_NEGATIVE_PROMPT,
          styleName: selectedCharacter.style,
          styleStrength: selectedCharacter.styleStrength,
          guidanceScale: selectedCharacter.guidanceScale,
          referenceImage: selectedCharacter.referenceImage || null,
          userId,
        }),
      });

      toast.dismiss(processingToast);

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to generate image: ${response.status} ${errorData}`);
      }

      const data = await response.json();
      if (data.imageUrl) {
        setResultImageUrl(data.imageUrl);
        // Deduct credits locally (for instant feedback)
        setCredits((prev) => prev - YEARBOOK_COST);
        toast.success("Transformation complete!", { icon: "✅" });
      } else {
        throw new Error("No image URL returned from server");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error(`Error generating image: ${error.message}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFreeGenerate = () => generateImage("/api/replicate/yearbook");
  const handlePremiumGenerate = () => generateImage("/api/replicate/premiumPhotomaker");

  const handleDownload = () => {
    if (!resultImageUrl) return;
    const link = document.createElement("a");
    link.href = resultImageUrl;
    link.download = "90s-yearbook-transform.jpg";
    link.click();
  };

  const selectedStyleDetails = (() => {
    if (!selectedStyle) return null;
    const allStyles = Object.values(styleCategories).flat();
    return allStyles.find((c) => c.value === selectedStyle);
  })();

  // ===== RENDER =====
  return (
    <>
      <Head>
        <title>90s Yearbook Transform | Throwback AI</title>
        <meta
          name="description"
          content="Transform your photos into authentic 90s yearbook styles with AI. Choose from grunge, hip-hop, preppy, and more iconic 90s looks."
        />
      </Head>

      <main className={styles.container}>
        {/* Hero */}
        <div className={styles.hero}>
          <h1 className={styles.title}>
            <span className={styles.titleEmoji}>📸</span>
            90s Yearbook Transform
          </h1>
          <p className={styles.subtitle}>
            Travel back in time! Transform your photo into an authentic 90s yearbook picture with iconic retro styles.
          </p>
        </div>

        {/* Credits Info */}
        <div className={styles.creditsInfo}>
          <span>Credits: <b>{credits}</b></span>
          <span>Cost per transform: <b>{YEARBOOK_COST}</b></span>
        </div>

        {/* Upload Section */}
        <div className={styles.uploadSection}>
          <div
            className={`${styles.uploadZone} ${dragActive ? styles.dragActive : ""} ${previewUrl ? styles.hasImage : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById("photo-upload").click()}
          >
            {previewUrl ? (
              <div className={styles.previewContainer}>
                <img src={previewUrl} alt="Your photo" className={styles.previewImage} />
                <div className={styles.changePhotoOverlay}>
                  <span>Click to change photo</span>
                </div>
              </div>
            ) : (
              <div className={styles.uploadPrompt}>
                <div className={styles.uploadIcon}>📷</div>
                <h3>Upload Your Photo</h3>
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
            className={styles.hiddenInput}
          />
        </div>

        {/* Styles Section */}
        <div className={styles.stylesSection}>
          <h2 className={styles.sectionTitle}>Choose Your 90s Vibe</h2>
          <div className={styles.categoryTabs}>
            {Object.keys(styleCategories).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`${styles.categoryTab} ${selectedCategory === category ? styles.activeTab : ""}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className={styles.stylesGrid}>
            {styleCategories[selectedCategory].map((style) => (
              <button
                key={style.value}
                onClick={() => setSelectedStyle(style.value)}
                className={`${styles.styleCard} ${selectedStyle === style.value ? styles.selectedStyle : ""}`}
              >
                <span className={styles.styleEmoji}>{style.label.split(" ")[0]}</span>
                <span className={styles.styleName}>{style.label.substring(2)}</span>
                <small className={styles.stylePreview}>
                  {style.style} • Strength: {style.styleStrength}%
                </small>
              </button>
            ))}
          </div>

          {selectedStyleDetails && (
            <div className={styles.styleDescription}>
              <h3>Style Preview: {selectedStyleDetails.label.substring(2)}</h3>
              <p>{selectedStyleDetails.promptDesc}</p>
              <div className={styles.styleSettings}>
                <span>Style: {selectedStyleDetails.style}</span> • 
                <span>Strength: {selectedStyleDetails.styleStrength}%</span> • 
                <span>Guidance: {selectedStyleDetails.guidanceScale}</span>
              </div>
            </div>
          )}
        </div>

        {/* Generate Section */}
        <div className={styles.generateSection}>
          <button
            onClick={handleFreeGenerate}
            disabled={!photo || !selectedStyle || isLoading}
            className={`${styles.generateBtn} ${styles.freeBtn}`}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner}></span>
                Creating your 90s transformation...
              </>
            ) : (
              <>
                <span>🎨</span>
                Generate Yearbook Transform
              </>
            )}
          </button>
        </div>

        {/* Result Section */}
        {resultImageUrl && (
          <div className={styles.resultSection}>
            <h2 className={styles.resultTitle}>Your 90s Transformation</h2>
            <div className={styles.resultContainer}>
              <img
                src={resultImageUrl}
                alt="90s Yearbook Result"
                className={styles.resultImage}
              />
              <div className={styles.resultActions}>
                <button onClick={handleDownload} className={styles.downloadBtn}>
                  📥 Download Your 90s Photo
                </button>
                <button
                  onClick={() => {
                    setSelectedStyle(null);
                    setResultImageUrl(null);
                  }}
                  className={styles.tryAnotherBtn}
                >
                  🔄 Try Another Style
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
