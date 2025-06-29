import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { loadStripe } from "@stripe/stripe-js";


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

export default function Yearbook() {
  const router = useRouter();

  const [selectedStyle, setSelectedStyle] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);

  useEffect(() => {
    if (router.query.success === "true") {
      setIsPremiumUnlocked(true);
    }
  }, [router.query]);

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

    const selectedCharacter = characterOptions.find((c) => c.value === selectedStyle);
    const prompt = `A person wearing ${selectedCharacter.promptDesc} in a school yearbook photo. Keep the face exactly as in the uploaded photo, preserving all facial features including beard, hairstyle, skin color, and expression, with high realism and minimal distortion img.`;

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
        body: JSON.stringify({ imageBase64: base64, prompt }),
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

  const handleFreeGenerate = () => generateImage("/api/photomaker");
  const handlePremiumGenerate = () => generateImage("/api/premiumPhotomaker");

  const handlePremiumCheckout = async () => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    const res = await fetch("/api/create-checkout-session", { method: "POST" });
    const data = await res.json();
    if (data?.sessionId) {
      stripe.redirectToCheckout({ sessionId: data.sessionId });
    } else {
      alert("Stripe checkout failed. Please try again.");
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#00FFCC",
        fontFamily: "'Courier New', monospace",
        padding: 30,
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: 28, marginBottom: 10 }}>📸 AI Yearbook Generator</h1>
      <p style={{ marginBottom: 30 }}>Pick your style and upload your photo to get 90s-ified!</p>

      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        style={{ marginBottom: 10 }}
      />

      {previewUrl && (
        <div style={{ marginTop: 10 }}>
          <Image
            src={previewUrl}
            alt="Uploaded"
            width={400}
            height={400}
            style={{
              borderRadius: 8,
              border: "2px solid #00FFCC",
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 12,
          margin: "30px 0",
        }}
      >
        {characterOptions.map((char) => (
          <button
            key={char.value}
            onClick={() => setSelectedStyle(char.value)}
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              border: selectedStyle === char.value ? "2px solid #FF00FF" : "1px solid #00FFCC",
              backgroundColor: selectedStyle === char.value ? "#111" : "#000",
              color: "#00FFCC",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {char.label}
          </button>
        ))}
      </div>

      <button
        onClick={handleFreeGenerate}
        style={{
          padding: "12px 24px",
          borderRadius: 6,
          backgroundColor: "#111",
          color: "#00FFCC",
          border: "2px dashed #00FFCC",
          fontSize: 16,
          cursor: "pointer",
          marginBottom: 20,
        }}
      >
        🎨 Generate Free Look
      </button>

      {isPremiumUnlocked ? (
        <button
          onClick={handlePremiumGenerate}
          style={{
            padding: "12px 24px",
            borderRadius: 6,
            backgroundColor: "#FF00FF",
            color: "#000",
            fontWeight: "bold",
            border: "2px solid #FF00FF",
            fontSize: 16,
            cursor: "pointer",
            marginBottom: 40,
          }}
        >
          ✨ Generate Premium Look
        </button>
      ) : (
        <button
          onClick={handlePremiumCheckout}
          style={{
            padding: "12px 24px",
            borderRadius: 6,
            backgroundColor: "#222",
            color: "#FF00FF",
            fontWeight: "bold",
            border: "2px dashed #FF00FF",
            fontSize: 16,
            cursor: "pointer",
            marginBottom: 40,
          }}
        >
          💳 Unlock Premium Yearbook Look ($9.99)
        </button>
      )}

      {isLoading && <p style={{ marginTop: 20 }}>🌀 Applying 90s filters...</p>}

      {resultImageUrl && resultImageUrl.startsWith("http") && (
        <div style={{ position: "relative", marginTop: 30, display: "inline-block" }}>
          <h3 style={{ marginBottom: 10, color: "#00FFCC" }}>🖼️ Your 90s Yearbook Photo</h3>
          <Image
            src={resultImageUrl}
            alt="Yearbook Result"
            width={500}
            height={500}
            unoptimized
            style={{
              borderRadius: 10,
              border: "3px groove #00FFCC",
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
      )}
    </main>
  );
}
