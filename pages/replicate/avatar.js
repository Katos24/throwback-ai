import { useState } from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { supabase } from "../../lib/supabaseClient";
import styles from "../../styles/AiPage.module.css";;


export default function AiAvatarsTest() {
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Original file size (MB):", file.size / 1024 / 1024);
      setPhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultImageUrl(null);
    }
  };

  const generateAvatar = async () => {
    if (!photo || !prompt) {
      alert("Please upload a photo and enter a prompt.");
      return;
    }

    try {
      const compressedFile = await imageCompression(photo, {
        maxSizeMB: 1,           // Lowered max size to 1MB
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });

      console.log("Compressed file size (MB):", compressedFile.size / 1024 / 1024);

      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.readAsDataURL(compressedFile);
      });

      setIsLoading(true);
      setResultImageUrl(null);

      const response = await fetch("/api/replicate/aiAvatars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64, prompt }),
      });

      if (!response.ok) {
        alert("Failed to generate avatar");
        return;
      }

      const data = await response.json();
      setResultImageUrl(data.imageUrl);
    } catch (error) {
      console.error("Error:", error);
      alert("Error generating avatar");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#111",
        color: "#0ff",
        fontFamily: "monospace",
        padding: 30,
        textAlign: "center",
      }}
    >
      <h1>🎭 AI Avatars Test</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        style={{ marginTop: 20 }}
      />

      {previewUrl && (
        <div style={{ marginTop: 20 }}>
          <Image
            src={previewUrl}
            alt="Uploaded photo"
            width={300}
            height={300}
            style={{ borderRadius: 8, border: "2px solid #0ff" }}
          />
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <textarea
          placeholder="Describe your avatar style..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          style={{
            width: "100%",
            maxWidth: 400,
            padding: 10,
            borderRadius: 6,
            border: "1px solid #0ff",
            background: "#000",
            color: "#0ff",
            fontFamily: "monospace",
          }}
        />
      </div>

      <button
        onClick={generateAvatar}
        disabled={isLoading}
        style={{
          marginTop: 20,
          padding: "12px 30px",
          fontSize: 18,
          borderRadius: 8,
          backgroundColor: "#0ff",
          color: "#000",
          fontWeight: "bold",
          cursor: isLoading ? "not-allowed" : "pointer",
          border: "none",
        }}
      >
        {isLoading ? "Generating..." : "Generate Avatar"}
      </button>

      {resultImageUrl && (
        <div style={{ marginTop: 40 }}>
          <h3>Your AI Avatar</h3>
          <Image
            src={resultImageUrl}
            alt="Result"
            width={400}
            height={400}
            unoptimized
            style={{ borderRadius: 12, border: "3px solid #0ff" }}
          />
        </div>
      )}
    </main>
  );
}
