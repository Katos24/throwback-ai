import { useState } from "react";

export default function PhotomakerStylePage() {
  const [imageBase64, setImageBase64] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [nPrompt, setNPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);
  const [error, setError] = useState("");

  const compressImage = (file, maxSize = 512) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = () => {
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const scale = maxSize / Math.max(img.width, img.height);
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const compressedBase64 = canvas.toDataURL("image/png").split(",")[1];
          resolve(compressedBase64);
        };
        img.onerror = reject;
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Image is too large. Please choose one under 5MB.");
      return;
    }

    setError("");
    setPreviewUrl(URL.createObjectURL(file));

    try {
      const compressed = await compressImage(file);
      setImageBase64(compressed);
    } catch (err) {
      setError("Failed to process image.");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResultUrl(null);

    try {
      const res = await fetch("/api/replicate/photomakerStyle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageBase64,
          prompt,
          n_prompt: nPrompt,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");

      setResultUrl(data.imageUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "600px", margin: "auto" }}>
      <h1>🧠 Photomaker Style</h1>

      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {previewUrl && (
        <div style={{ marginTop: "1rem" }}>
          <img src={previewUrl} alt="Preview" style={{ maxWidth: "100%", borderRadius: "8px" }} />
        </div>
      )}
      <br />

      <input
        type="text"
        placeholder="Prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginTop: "1rem" }}
      />
      <br />

      <input
        type="text"
        placeholder="Negative Prompt (optional)"
        value={nPrompt}
        onChange={(e) => setNPrompt(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
      />
      <br />

      <button
        onClick={handleSubmit}
        disabled={loading || !imageBase64 || !prompt}
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>❌ {error}</p>}
      {resultUrl && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Result:</h3>
          <img src={resultUrl} alt="Generated" style={{ maxWidth: "100%", borderRadius: "8px" }} />
        </div>
      )}
    </div>
  );
}
