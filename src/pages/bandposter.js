import { useState } from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";

const genreOptions = [
  { label: "🎸 Grunge", value: "grunge" },
  { label: "🎤 Pop", value: "pop" },
  { label: "🧢 Hip-Hop", value: "hiphop" },
];

export default function BandPoster() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultImageUrl(null);
    }
  };

  const handlePosterGenerate = async () => {
    if (!photo || !selectedGenre) {
      alert("Upload photo and select a music genre");
      return;
    }

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

      const response = await fetch("/api/bandposter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64, genre: selectedGenre }),
      });

      if (!response.ok) {
        alert("Failed to generate poster");
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setResultImageUrl(data.imageUrl);
      setIsLoading(false);
    } catch (error) {
      alert("Error generating poster");
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#00FFCC",
        fontFamily: "'Courier New', monospace",
        padding: 30,
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: 28, marginBottom: 10 }}>🎶 90s Band Poster Generator</h1>
      <p style={{ marginBottom: 30 }}>
        Upload your photo and pick a 90s music genre to become the star of your own retro concert flyer!
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        style={{ marginBottom: 20 }}
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
        {genreOptions.map((genre) => (
          <button
            key={genre.value}
            onClick={() => setSelectedGenre(genre.value)}
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              border:
                selectedGenre === genre.value
                  ? "2px solid #FF00FF"
                  : "1px solid #00FFCC",
              backgroundColor: selectedGenre === genre.value ? "#111" : "#000",
              color: "#00FFCC",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {genre.label}
          </button>
        ))}
      </div>

      <button
        onClick={handlePosterGenerate}
        style={{
          padding: "12px 24px",
          borderRadius: 6,
          backgroundColor: "#111",
          color: "#00FFCC",
          border: "2px dashed #00FFCC",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        🎫 Generate My Band Poster
      </button>

      {isLoading && <p style={{ marginTop: 20 }}>🌀 Creating your 90s poster...</p>}

      {resultImageUrl &&
        typeof resultImageUrl === "string" &&
        resultImageUrl.startsWith("http") && (
          <div style={{ marginTop: 30 }}>
            <h3 style={{ marginBottom: 10, color: "#00FFCC" }}>
              📸 Your 90s Band Poster
            </h3>

            <Image
              src={resultImageUrl}
              alt="Band Poster Result"
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
    </div>
  );
}
