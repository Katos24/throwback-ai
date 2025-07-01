import { useState } from "react";
import Image from "next/image";

export default function RestorePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [restoredUrl, setRestoredUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setRestoredUrl(""); // Clear previous result
    }
  };

  const handleRestore = async () => {
    if (!selectedFile) return;

    setLoading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];

      try {
        const response = await fetch("/api/restore", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageBase64: base64,
            // prompt removed, not needed for GFPGAN
          }),
        });

        const data = await response.json();
        if (response.ok && data.imageUrl) {
          setRestoredUrl(data.imageUrl);
        } else {
          alert(data.error || "Failed to restore image.");
        }
      } catch (error) {
        alert("Network or server error. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleDownload = async () => {
    if (!restoredUrl) return;

    const response = await fetch(restoredUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "restored-photo.png";
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🕹️ Restore Your Vintage Photo</h1>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      <button
        onClick={handleRestore}
        disabled={!selectedFile || loading}
        style={{ marginLeft: "1rem" }}
      >
        {loading ? "Restoring..." : "Restore"}
      </button>

      {restoredUrl && (
        <div style={{ marginTop: "2rem" }}>
          <h2>✨ Restored Photo:</h2>

          <img
            src={restoredUrl}
            alt="Restored"
            style={{ width: 400, height: 400, borderRadius: "8px" }}
          />

          <div style={{ marginTop: "1rem" }}>
            <button onClick={handleDownload}>⬇️ Download</button>
            {" | "}
            <button onClick={() => alert("Next: Send to Avatar flow here!")}>
              ➡️ Send to Avatar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
