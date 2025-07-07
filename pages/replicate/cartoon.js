import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import styles from "../../styles/AiPage.module.css";


export default function CartoonPage() {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState(
    "A cartoon portrait of a person in the style of a 1990s animated TV show, bold black outlines, bright flat colors, simple background, expressive face, vintage grainy look, retro 90s cartoon style"
  );
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);
  const [error, setError] = useState(null);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);
    setResultUrl(null);

    try {
      const base64 = await toBase64(file);
      const response = await fetch("/api/generateCartoon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64, prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "API error");
      }

      const data = await response.json();
      setResultUrl(data.imageUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: "2rem", maxWidth: 600, margin: "auto" }}>
      <h1>Generate 90s Cartoon Portrait</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <br />
        <textarea
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{ width: "100%", marginTop: 12 }}
        />
        <br />
        <button type="submit" disabled={loading} style={{ marginTop: 12 }}>
          {loading ? "Generating..." : "Generate Cartoon"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {resultUrl && (
        <div style={{ marginTop: 24 }}>
          <h2>Result:</h2>
          <img src={resultUrl} alt="Cartoon result" style={{ width: "100%" }} />
        </div>
      )}
    </main>
  );
}
