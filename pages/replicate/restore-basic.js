import { useState } from "react";
import { supabase } from "../../lib/supabaseClient"; // ✅ Your Supabase client
import styles from "../styles/AiPage.module.css";

export default function RestorePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [restoredUrl, setRestoredUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setRestoredUrl("");
    }
  };

  const handleRestore = async () => {
    if (!selectedFile) return;

    setLoading(true);

    // ✅ 1) Get current user session/token
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session) {
      alert("Please sign in to restore your photo!");
      setLoading(false);
      return;
    }

    const token = session.access_token;

    // ✅ 2) Convert image to Base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];

      try {
        // ✅ 3) Send image & token to your secure API route
        const response = await fetch("/api/replicate/restore", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ imageBase64: base64 }),
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
    <main className={styles.container}>
      <h1>🕹️ Restore Your Vintage Photo</h1>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      <button onClick={handleRestore} disabled={!selectedFile || loading}>
        {loading ? "Restoring..." : "Restore"}
      </button>

      {restoredUrl && (
        <div>
          <h2>✨ Restored Photo:</h2>
          <img src={restoredUrl} alt="Restored" className={styles.restoredImage} />
          <div className={styles.downloadButtons}>
            <button onClick={handleDownload}>⬇️ Download</button>
            <button onClick={() => alert("Next: Send to Avatar flow here!")}>
              ➡️ Send to Avatar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
