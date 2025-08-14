import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import imageCompression from "browser-image-compression";
import { supabase } from "../../lib/supabaseClient";
import styles from "../../styles/YearbookTransform.module.css";

const styleCategories = {
  popular: [
    { label: "🎸 Grunge Legend", value: "grunge", promptDesc: "1990s grunge style with flannel shirts, ripped jeans, band tees, and messy long hair", style: "Photographic (Default)" },
    { label: "🧢 Hip Hop Star", value: "hiphop", promptDesc: "90s hip-hop fashion with baggy jeans, oversized jerseys, gold chains, Timberland boots, and snapback caps", style: "Photographic (Default)" },
    { label: "💿 Mall Goth", value: "mallgoth", promptDesc: "mall goth aesthetic with black fishnets, heavy eyeliner, band tees, studded accessories, and platform boots", style: "Photographic (Default)" },
    { label: "🏀 Star Athlete", value: "jock", promptDesc: "90s high school athlete look with varsity jacket, basketball shorts, Nike sneakers, and sweatbands", style: "Photographic (Default)" },
  ],
  preppy: [
    { label: "🧼 Prep School Elite", value: "preppy", promptDesc: "preppy 90s style with polo shirts, khaki pants, sweater tied around shoulders, and boat shoes", style: "Photographic (Default)" },
    { label: "🌸 Sweet Valley High", value: "sweetvalley", promptDesc: "sweet 90s teen fashion with pastel colors, crop tops, high-waisted jeans, and scrunchies", style: "Fantasy art" },
    { label: "👔 Future CEO", value: "business", promptDesc: "young professional 90s look with blazer, dress shirt, tie, and perfectly styled hair", style: "Cinematic" },
  ],
  quirky: [
    { label: "🦄 Lisa Frank Dreamer", value: "lisafrank", promptDesc: "colorful Lisa Frank-inspired 90s fashion with neon colors, glittery accessories, and rainbow prints", style: "Digital Art" },
    { label: "📼 Tech Nerd", value: "technerd", promptDesc: "90s computer geek with thick glasses, pocket protector, suspenders, and tucked-in plaid shirt", style: "Photographic (Default)" },
    { label: "🎨 Art Class Hero", value: "artsy", promptDesc: "creative 90s artist look with paint-splattered clothes, beret, and bohemian accessories", style: "Fantasy art" },
    { label: "🕶️ Skater Kid", value: "skater", promptDesc: "90s skater style with baggy cargo pants, graphic tee, Vans shoes, backwards cap, and skateboard", style: "Comic book" },
  ],
  iconic: [
    { label: "📺 Sitcom Star", value: "sitcom", promptDesc: "90s TV show character style with bright patterns, bold colors, and iconic 90s fashion trends", style: "Enhance" },
    { label: "🎤 Pop Princess", value: "popstar", promptDesc: "90s pop star look with sparkly outfits, crop tops, platform shoes, and bold makeup", style: "Neonpunk" },
    { label: "🧙‍♂️ Fantasy Enthusiast", value: "fantasy", promptDesc: "90s fantasy fan with D&D books, graphic fantasy tee, long hair, and wireframe glasses", style: "Fantasy art" },
    { label: "🐢 Cartoon Fan", value: "cartoonkid", promptDesc: "90s cartoon-loving kid with character tees, colorful accessories, and playful styling", style: "Disney Character" },
  ]
};

const DEFAULT_NEGATIVE_PROMPT =
  "nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, multiple people, group, crowd, background people, other persons, race change, ethnicity change, skin tone change, facial structure change, different person, wrong identity";

export default function YearbookTransform() {
  const router = useRouter();
  
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  const [userId, setUserId] = useState(null);
  const [dragActive, setDragActive] = useState(false);

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
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

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
    if (file && file.type.startsWith('image/')) {
      setPhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultImageUrl(null);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const generateImage = async (endpoint) => {
    if (!photo || !selectedStyle) {
      alert("Please upload a photo and select a style first!");
      return;
    }

    if (!userId) {
      alert("Please log in to generate images.");
      return;
    }

    const allStyles = Object.values(styleCategories).flat();
    const selectedCharacter = allStyles.find((c) => c.value === selectedStyle);
    
    if (!selectedCharacter) {
      alert("Selected style not found. Please try again.");
      return;
    }

    const prompt = `Professional yearbook headshot portrait of a single person img wearing ${selectedCharacter.promptDesc}. School yearbook photography style with clean studio lighting, focused on face and upper shoulders only. IMPORTANT: Preserve exact original facial features, skin tone, ethnicity, bone structure, eye shape, and all identifying characteristics with photographic realism. Maintain the person's natural race and ethnic appearance completely unchanged. Single person only, no background people`;

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

      // Convert image to base64 for PhotoMaker API
      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.readAsDataURL(compressedFile);
      });

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: base64,
          prompt,
          negativePrompt: DEFAULT_NEGATIVE_PROMPT,
          userId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to generate image: ${response.status} ${errorData}`);
      }

      const data = await response.json();
      
      if (data.imageUrl) {
        setResultImageUrl(data.imageUrl);
      } else {
        throw new Error("No image URL returned from server");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      alert(`Error generating image: ${error.message}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFreeGenerate = () => generateImage("/api/replicate/yearbook");
  const handlePremiumGenerate = () => generateImage("/api/replicate/premiumPhotomaker");

  const handleDownload = () => {
    if (!resultImageUrl) return;
    
    try {
      const link = document.createElement('a');
      link.href = resultImageUrl;
      link.download = '90s-yearbook-transform.jpg';
      link.click();
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Error downloading image. Please try right-clicking and saving instead.");
    }
  };

  return (
    <>
      <Head>
        <title>90s Yearbook Transform | Anastasis</title>
        <meta name="description" content="Transform your photos into iconic 90s yearbook styles with AI" />
      </Head>

      <main className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>
            <span className={styles.titleEmoji}>📸</span>
            90s Yearbook Transform
          </h1>
          <p className={styles.subtitle}>
            Travel back in time! Transform your photo into an iconic 90s yearbook picture with authentic retro styles.
          </p>
        </div>

        <div className={styles.uploadSection}>
          <div 
            className={`${styles.uploadZone} ${dragActive ? styles.dragActive : ''} ${previewUrl ? styles.hasImage : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('photo-upload').click()}
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
                <small>Best results with clear face photos</small>
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

        <div className={styles.stylesSection}>
          <h2 className={styles.sectionTitle}>Choose Your 90s Vibe</h2>
          
          <div className={styles.categoryTabs}>
            {Object.keys(styleCategories).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`${styles.categoryTab} ${selectedCategory === category ? styles.activeTab : ''}`}
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
                className={`${styles.styleCard} ${selectedStyle === style.value ? styles.selectedStyle : ''}`}
              >
                <span className={styles.styleEmoji}>{style.label.split(' ')[0]}</span>
                <span className={styles.styleName}>{style.label.substring(2)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.generateSection}>
          <button
            onClick={handleFreeGenerate}
            disabled={!photo || !selectedStyle || isLoading}
            className={`${styles.generateBtn} ${styles.freeBtn}`}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner}></span>
                Creating your 90s look...
              </>
            ) : (
              <>
                <span>🎨</span>
                Generate Free Transform
              </>
            )}
          </button>

          {isPremiumUnlocked ? (
            <button
              onClick={handlePremiumGenerate}
              disabled={!photo || !selectedStyle || isLoading}
              className={`${styles.generateBtn} ${styles.premiumBtn}`}
            >
              <span>✨</span>
              Premium High-Quality Transform
            </button>
          ) : (
            <button
              onClick={() => router.push("/pricing")}
              className={`${styles.generateBtn} ${styles.upgradeBtn}`}
            >
              <span>💎</span>
              Upgrade for Premium Quality ($9.99)
            </button>
          )}
        </div>

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
                <button 
                  onClick={handleDownload}
                  className={styles.downloadBtn}
                >
                  📥 Download
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}