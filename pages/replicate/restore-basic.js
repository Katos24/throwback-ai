import { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import { supabase } from "../../lib/supabaseClient";
import styles from "../../styles/AiPage.module.css";

export default function RestorePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [restoredUrl, setRestoredUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [credits, setCredits] = useState(0);

  // ✅ Load user credits on mount
  useEffect(() => {
    const fetchCredits = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error || !session) return;

      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("credits_remaining")
        .eq("id", session.user.id)
        .single();

      if (!profileError && data) {
        setCredits(data.credits_remaining);
      }
    };

    fetchCredits();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProcessing(true);
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        });
        setSelectedFile(compressedFile);
      } catch (error) {
        console.error("Image compression error:", error);
        setSelectedFile(file);
      } finally {
        setProcessing(false);
        setRestoredUrl("");
      }
    }
  };

  const handleRestore = async () => {
    if (!selectedFile) return;

    setLoading(true);

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

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];

      try {
        const response = await fetch("/api/replicate/restore", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            imageBase64: base64,
            prompt: "Restore this vintage photo",
          }),
        });

        const data = await response.json();

        if (response.ok && data.imageUrl) {
          setRestoredUrl(data.imageUrl);
          setCredits((prev) => prev - 2);
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

      <p>💎 This costs <strong>2 credits</strong> per restore</p>
      <p>🔢 You have <strong>{credits}</strong> credits remaining</p>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {processing && <p>⏳ Processing image...</p>}

      <button
        onClick={handleRestore}
        disabled={!selectedFile || loading || processing}
      >
        {loading
          ? "Restoring..."
          : processing
          ? "Processing..."
          : "Restore"}
      </button>

      {restoredUrl && (
        <div>
          <h2>✨ Restored Photo:</h2>
          <img src={restoredUrl} alt="Restored" className={styles.restoredImage} />
          <button onClick={handleDownload}>⬇️ Download</button>
        </div>
      )}
    </main>
  );
}
