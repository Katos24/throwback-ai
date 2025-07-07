import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import imageCompression from "browser-image-compression";
import { supabase } from "../lib/supabaseClient";
import styles from "../../styles/AiPage.module.css";
import { supabase } from "../../lib/supabaseClient";

const characterOptions = [
  { label: "🎸 Grunge Guy", value: "grunge", promptDesc: "1990s grunge style clothes with flannel shirts, ripped jeans, band tees, and messy long hair" },
  { label: "🧢 Rap Guy", value: "rap", promptDesc: "90s hip-hop fashion with baggy jeans, oversized jerseys, gold chains, Timberland boots, and snapback caps" },
  { label: "💿 Mall Goth", value: "goth", promptDesc: "mall goth clothes with black fishnets, heavy eyeliner, band tees, studded accessories, and platform boots" },
  { label: "🏀 Jock", value: "jock", promptDesc: "90s high school jock look with varsity jacket, basketball shorts, Nike sneakers, and sweatbands" },
  { label: "🧼 Preppy Kid", value: "preppy", promptDesc: "preppy 90s style with polo shirts, khaki pants or shorts, sweater tied around shoulders, and loafers" },
  { label: "🦄 Lisa Frank Girl", value: "lisa", promptDesc: "colorful Lisa Frank-inspired 90s fashion with neon colors, glittery accessories, pastel tops, and printed leggings" },
  { label: "📼 Nerd", value: "nerd", promptDesc: "90s nerdy fashion with tucked-in plaid shirts, suspenders, thick glasses, high-waisted pants, and pocket protectors" },
  { label: "🎨 Bob Ross", value: "bobross", promptDesc: "gentle 90s art teacher look with permed hair, denim shirt, paint palette, and soothing expression like Bob Ross" },
  { label: "🕶️ Cool Skater", value: "skater", promptDesc: "90s skater look with baggy cargo pants, graphic tee, Vans shoes, backwards cap, and holding a skateboard" },
  { label: "📺 TV Show Kid", value: "tvkid", promptDesc: "dressed like a 90s sitcom teen from Saved by the Bell or Fresh Prince with bright patterned shirt, mom jeans, and high-top sneakers" },
  { label: "🧙‍♂️ Fantasy Geek", value: "fantasy", promptDesc: "90s fantasy geek with Dungeons and Dragons books, graphic fantasy tee, long hair or ponytail, and wireframe glasses" },
  { label: "📟 Tech Whiz", value: "techwhiz", promptDesc: "90s tech whiz with oversized glasses, digital watch, holding a floppy disk or Game Boy, and wearing a tucked-in shirt" },
  { label: "🐢 Ninja Turtle Fan", value: "tmntfan", promptDesc: "90s Ninja Turtles fan with a TMNT tee, bandana tied around head, cargo shorts, and sneakers, maybe holding a toy sword" },
  { label: "🎤 Pop Star Wannabe", value: "popstar", promptDesc: "90s pop star look with sparkly outfit, crop top, low-rise pants, platform shoes, microphone prop, and bold makeup like Britney or Christina" },
];

const DEFAULT_NEGATIVE_PROMPT =
  "nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, multiple people, group, crowd, background people, other persons";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Yearbook() {
  const router = useRouter();

  const [selectedStyle, setSelectedStyle] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (router.query.success === "true") {
      setIsPremiumUnlocked(true);
    }
  }, [router.query]);

  // Correct async user session fetch for Supabase v2
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting session:", error);
        return;
      }
      if (session?.user) {
        setUserId(session.user.id);
      }
    };
    fetchUser();
  }, []);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultImageUrl(null);
    }
  };

  const generateImage = async (endpoint) => {
    if (!photo || !selectedStyle) {
      alert("Upload photo and select a style");
      return;
    }

    if (!userId) {
      alert("Please log in to generate images.");
      return;
    }

    const selectedCharacter = characterOptions.find((c) => c.value === selectedStyle);
    const prompt = `Headshot portrait of a single person wearing ${selectedCharacter.promptDesc} in a school yearbook photo style. The photo should focus tightly on one persons face and upper shoulders only, no other people visible. Preserve all facial features including beard, hairstyle, skin color, and expression with high realism and minimal distortion img.`;

    try {
      const compressedFile = await imageCompression(photo, {
        maxSizeMB: 1.2,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
        maxIteration: 10,
        initialQuality: 0.8,
      });

      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.readAsDataURL(compressedFile);
      });

      setIsLoading(true);
      setResultImageUrl(null);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: base64,
          prompt,
          negativePrompt: DEFAULT_NEGATIVE_PROMPT,
          userId, // send userId with request!
        }),
      });

      if (!response.ok) {
        alert("Failed to generate image");
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setResultImageUrl(data.imageUrl);
      setIsLoading(false);
    } catch (error) {
      alert("Error generating image");
      setIsLoading(false);
    }
  };

  const handleFreeGenerate = () => generateImage("/api/replicate/photomaker");
  const handlePremiumGenerate = () => generateImage("/api/replicate/premiumPhotomaker");

  const handlePremiumCheckout = () => {
    router.push("/pricing");
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>📸 AI Yearbook Generator</h1>
      <p className={styles.subtitle}>Pick your style and upload your photo to get 90s-ified!</p>

      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        className={styles.fileInput}
      />

      {previewUrl && (
        <div className={styles.previewContainer}>
          <img
            src={previewUrl}
            alt="Uploaded"
            className={styles.previewImage}
          />
        </div>
      )}

      <div className={styles.characterButtons}>
        {characterOptions.map((char) => (
          <button
            key={char.value}
            onClick={() => setSelectedStyle(char.value)}
            className={`${styles.characterButton} ${selectedStyle === char.value ? styles.selectedCharacter : ""}`}
          >
            {char.label}
          </button>
        ))}
      </div>

      <button
        onClick={handleFreeGenerate}
        className={styles.generateButton}
      >
        🎨 Generate Free Look
      </button>

      {isPremiumUnlocked ? (
        <button
          onClick={handlePremiumGenerate}
          className={`${styles.generateButton} ${styles.premiumButton}`}
        >
          ✨ Generate Premium Look
        </button>
      ) : (
        <button
          onClick={handlePremiumCheckout}
          className={`${styles.generateButton} ${styles.premiumButtonLocked}`}
        >
          💳 Unlock Premium Yearbook Look ($9.99)
        </button>
      )}

      {isLoading && <p className={styles.loadingText}>🌀 Applying 90s filters...</p>}

      {resultImageUrl && resultImageUrl.startsWith("http") && (
        <div className={styles.resultContainer}>
          <h3 className={styles.resultTitle}>🖼️ Your 90s Yearbook Photo</h3>
          <img
            src={resultImageUrl}
            alt="Yearbook Result"
            className={styles.resultImage}
          />
        </div>
      )}
    </main>
  );
}
