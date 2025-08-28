import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import imageCompression from "browser-image-compression";
import { supabase } from "../../lib/supabaseClient";
import styles from "../../styles/YearbookTransform.module.css";

const styleCategories = {
  popular: [
    { 
      label: "🎸 Grunge Legend", 
      value: "grunge", 
      promptDesc: "moody 1990s grunge portrait, alternative rock musician style, wearing flannel shirt and distressed band t-shirt, long messy hair, dark atmospheric lighting, Seattle grunge scene aesthetic", 
      style: "Cinematic",
      styleStrength: 25,
      guidanceScale: 6
    },
    { 
      label: "🧢 Hip Hop Star", 
      value: "hiphop", 
      promptDesc: "authentic 90s hip-hop fashion with baggy jeans, oversized jersey, gold chains, Timberland boots, snapback cap, street photography style", 
      style: "Cinematic",
      styleStrength: 22,
      guidanceScale: 6,
      referenceImage: "https://throwbackai.app/images/rap-reference.jpg"
    },
    { 
      label: "💿 Mall Goth", 
      value: "mallgoth", 
      promptDesc: "mall goth aesthetic with black fishnets, heavy dark eyeliner, band t-shirt, studded leather accessories, platform boots, moody lighting", 
      style: "Enhance",
      styleStrength: 25,
      guidanceScale: 7
    },
    { 
      label: "🏀 Star Athlete", 
      value: "jock", 
      promptDesc: "90s high school athlete with varsity letterman jacket, athletic wear, Nike sneakers, healthy sporty look, school portrait lighting", 
      style: "Photographic (Default)",
      styleStrength: 20,
      guidanceScale: 5
    },
    {
  label: "🎽 Retro Track Star",
  value: "trackstar",
  promptDesc: "90s athletic fashion with bold striped windbreaker jacket, silver chain necklace, voluminous hair, soft blue studio background, vibrant colors, nostalgic sportswear styling, VHS texture",
  style: "Photographic (Default)",
  styleStrength: 26,
  guidanceScale: 6
},
  ],
  preppy: [
    { 
      label: "🧼 Prep School Elite", 
      value: "preppy", 
      promptDesc: "classic preppy 90s style with polo shirt, khaki pants, sweater tied around shoulders, boat shoes, clean-cut appearance", 
      style: "Photographic (Default)",
      styleStrength: 18,
      guidanceScale: 5
    },
    { 
      label: "🌸 Sweet Valley High", 
      value: "sweetvalley", 
      promptDesc: "sweet 90s teen fashion with pastel colors, crop top, high-waisted jeans, scrunchies, soft dreamy lighting", 
      style: "Fantasy art",
      styleStrength: 20,
      guidanceScale: 6
    },
    { 
      label: "👔 Future CEO", 
      value: "business", 
      promptDesc: "young professional 90s look with blazer, crisp dress shirt, silk tie, perfectly styled hair, confident pose", 
      style: "Cinematic",
      styleStrength: 22,
      guidanceScale: 6
    },
  ],
  quirky: [
    { 
      label: "🦄 Lisa Frank Dreamer", 
      value: "lisafrank", 
      promptDesc: "colorful Lisa Frank-inspired 90s fashion with neon rainbow colors, glittery accessories, holographic prints, whimsical styling", 
      style: "Digital Art",
      styleStrength: 28,
      guidanceScale: 7
    },
    { 
      label: "📼 Tech Nerd", 
      value: "technerd", 
      promptDesc: "90s computer geek with thick wireframe glasses, pocket protector, suspenders, tucked-in plaid shirt, calculator watch", 
      style: "Photographic (Default)",
      styleStrength: 20,
      guidanceScale: 6
    },
    { 
      label: "🎨 Art Class Hero", 
      value: "artsy", 
      promptDesc: "creative 90s artist look with paint-splattered clothes, black beret, bohemian accessories, artistic flair", 
      style: "Fantasy art",
      styleStrength: 24,
      guidanceScale: 6
    },
    { 
      label: "🕶️ Skater Kid", 
      value: "skater", 
      promptDesc: "90s skater style with baggy cargo pants, graphic band tee, Vans sneakers, backwards baseball cap, rebellious attitude", 
      style: "Comic book",
      styleStrength: 23,
      guidanceScale: 6
    },
  ],
  iconic: [
    { 
      label: "📺 Sitcom Star", 
      value: "sitcom", 
      promptDesc: "90s TV show character style with bright bold patterns, iconic fashion trends, studio lighting, classic American teen look", 
      style: "Enhance",
      styleStrength: 25,
      guidanceScale: 7
    },
    { 
      label: "🎤 Pop Princess", 
      value: "popstar", 
      promptDesc: "90s pop star look with sparkly crop top, platform shoes, frosted eyeshadow, bold colorful makeup, stage lighting", 
      style: "Neonpunk",
      styleStrength: 27,
      guidanceScale: 7
    },
    { 
      label: "🧙‍♂️ Fantasy Enthusiast", 
      value: "fantasy", 
      promptDesc: "90s fantasy fan with D&D graphic t-shirt, long hair, wireframe glasses, fantasy book accessories, nerdy charm", 
      style: "Fantasy art",
      styleStrength: 22,
      guidanceScale: 6
    },
    { 
      label: "🐢 Cartoon Fan", 
      value: "cartoonkid", 
      promptDesc: "90s cartoon-loving kid with animated character t-shirt, colorful accessories, playful styling, bright cheerful lighting", 
      style: "Disney Character",
      styleStrength: 24,
      guidanceScale: 6
    },
  ]
};

const ENHANCED_NEGATIVE_PROMPT =
  "nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, multiple people, group photo, other people, crowd, yearbook page layout, school group, classmates, other faces, two people, three people, group portrait, many people, background people, modern clothing, contemporary fashion, digital photography, harsh lighting, oversaturated colors, modern hairstyles, smartphone, 2000s style, 2010s fashion, modern technology, instagram filter, face change, different person, altered facial features, wrong face, facial distortion, unrecognizable face, race change, ethnicity change, skin tone change, facial structure change, wrong identity";

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

    // Enhanced prompt construction for better results
    const prompt = `A single vintage 1990s portrait of img, ${selectedCharacter.promptDesc}, individual school portrait style, soft vintage lighting, authentic 90s photography, single person headshot only. IMPORTANT: Preserve exact original facial features, skin tone, ethnicity, bone structure, eye shape, and all identifying characteristics with photographic realism. Maintain the person's natural race and ethnic appearance completely unchanged.`;

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
    negativePrompt: ENHANCED_NEGATIVE_PROMPT,
    // Send the PhotoMaker parameters that the API expects
    styleName: selectedCharacter.style,           // "Cinematic"
    styleStrength: selectedCharacter.styleStrength, // 22
    guidanceScale: selectedCharacter.guidanceScale, // 6
    referenceImage: selectedCharacter.referenceImage, // "https://throwbackai.app/images/rap-reference.jpg"
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

  // Get the selected style details for display
  const getSelectedStyleDetails = () => {
    if (!selectedStyle) return null;
    const allStyles = Object.values(styleCategories).flat();
    return allStyles.find((c) => c.value === selectedStyle);
  };

  const selectedStyleDetails = getSelectedStyleDetails();

  return (
    <>
      <Head>
        <title>90s Yearbook Transform | Throwback AI</title>
        <meta name="description" content="Transform your photos into authentic 90s yearbook styles with AI. Choose from grunge, hip-hop, preppy, and more iconic 90s looks." />
      </Head>

      <main className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>
            <span className={styles.titleEmoji}>📸</span>
            90s Yearbook Transform
          </h1>
          <p className={styles.subtitle}>
            Travel back in time! Transform your photo into an authentic 90s yearbook picture with iconic retro styles.
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
              Upgrade for Premium Quality
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