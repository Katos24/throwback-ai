// pages/test-restore-premium.js
import { useState } from "react";

export default function TestRestorePremium() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [restoredImageUrl, setRestoredImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Convert file to base64 string
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // strip prefix
      reader.onerror = (error) => reject(error);
    });

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setRestoredImageUrl("");
    setErrorMsg("");
  };

  const handleRestore = async () => {
    if (!selectedFile) {
      setErrorMsg("Please select an image first.");
      return;
    }
    setLoading(true);
    setErrorMsg("");
    try {
      const base64 = await toBase64(selectedFile);

      const res = await fetch("/api/restorePremium", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64 }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Unknown error");
      }

      const data = await res.json();
      setRestoredImageUrl(data.imageUrl);
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Test Restore Premium</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button
        onClick={handleRestore}
        disabled={loading}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          backgroundColor: "#ff0080",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: loading ? "wait" : "pointer",
        }}
      >
        {loading ? "Restoring..." : "Restore Image"}
      </button>

      {errorMsg && <p style={{ color: "red", marginTop: 20 }}>{errorMsg}</p>}

      {restoredImageUrl && (
        <div style={{ marginTop: 30 }}>
          <h2>Restored Image:</h2>
          <img
            src={restoredImageUrl}
            alt="Restored Result"
            style={{ maxWidth: "100%", borderRadius: 8, boxShadow: "0 0 10px #ccc" }}
          />
        </div>
      )}
    </main>
  );
}

