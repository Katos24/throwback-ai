import { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import { supabase } from "../../lib/supabaseClient";
import useCredits from "../../hooks/useCredits";
import styles from "../../styles/AiPage.module.css";

export default function RestorePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPreviewUrl, setSelectedPreviewUrl] = useState(null);
  const [restoredUrl, setRestoredUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [session, setSession] = useState(null);

  const { credits, isLoggedIn, refreshCredits } = useCredits();

  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    }
    getSession();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProcessing(true);
      setRestoredUrl(""); // clear old restore
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        });
        setSelectedFile(compressedFile);

        const previewUrl = URL.createObjectURL(compressedFile);
        setSelectedPreviewUrl(previewUrl);
      } catch (error) {
        console.error("Image compression error:", error);
        setSelectedFile(file);

        const previewUrl = URL.createObjectURL(file);
        setSelectedPreviewUrl(previewUrl);
      } finally {
        setProcessing(false);
      }
    }
  };

  const handleRestore = async () => {
    if (!selectedFile) return;

    if (credits < 1) {
      if (!isLoggedIn) {
        alert("You’ve used your free attempts. Sign up to get 10 more!");
      } else {
        alert("You don’t have enough credits to restore this image.");
      }
      return;
    }

    setLoading(true);

    const headers = {
      "Content-Type": "application/json",
    };
    if (session?.access_token) {
      headers.Authorization = `Bearer ${session.access_token}`;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];

      try {
        const response = await fetch("/api/replicate/restore", {
          method: "POST",
          headers,
          body: JSON.stringify({
            imageBase64: base64,
            prompt: "Restore this vintage photo",
          }),
        });

        const data = await response.json();

        if (response.ok && data.imageUrl) {
          setRestoredUrl(data.imageUrl);
          if (isLoggedIn) {
            await refreshCredits();
          }
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

      {!isLoggedIn ? (
        <p>
          🎉 You get <strong>3 free basic restores</strong> (black & white cleanup only).<br />
          Sign up to get <strong>5 more basic restores</strong>!<br />
          Upgrade to <strong>Premium</strong> for enhanced restores with colorization and amazing enhancements.<br />
          🔢 Remaining attempts: <strong>{credits}</strong>
        </p>
      ) : (
        <p>
          💎 Each restore costs <strong>1 credit</strong>.<br />
          Basic restores clean black & white photos.<br />
          <strong>Premium restores</strong> add colorization and advanced enhancements.<br />
          🔢 You have <strong>{credits}</strong> credits remaining.
        </p>
      )}

      <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginTop: "1rem" }} />

      {/* Before preview below file input */}
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <strong>Before</strong>
        <div
          style={{
            marginTop: 8,
            width: 200,
            height: 200,
            border: "1px solid #ccc",
            borderRadius: 8,
            backgroundColor: "#f9f9f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {selectedPreviewUrl ? (
            <img
              src={selectedPreviewUrl}
              alt="Before upload preview"
              style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 6 }}
            />
          ) : (
            <span style={{ color: "#aaa" }}>No image selected</span>
          )}
        </div>
      </div>

      {/* Restored image below the Before preview */}
      {restoredUrl && (
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <h2>✨ Restored Photo:</h2>
          <img
            src={restoredUrl}
            alt="Restored"
            className={styles.restoredImage}
            style={{ width: 600, height: 600, borderRadius: 8, objectFit: "contain" }}
          />
          <button onClick={handleDownload} style={{ marginTop: 12 }}>
            ⬇️ Download
          </button>
        </div>
      )}

      {(processing || loading) && (
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <div
            style={{
              margin: "0 auto",
              border: "4px solid #ccc",
              borderTop: "4px solid #0077cc",
              borderRadius: "50%",
              width: 40,
              height: 40,
              animation: "spin 1s linear infinite",
            }}
          />
          <p style={{ marginTop: 8, fontWeight: "bold" }}>
            {loading ? "Restoring..." : "Processing image..."}
          </p>
          <p
            style={{
              fontStyle: "italic",
              fontSize: 14,
              marginTop: 8,
              color: "#555",
              maxWidth: 400,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            The restore process can take a minute or sometimes a bit longer.
            <br />
            Please be patient and do not close this window.
          </p>
        </div>
      )}

      <button
        onClick={handleRestore}
        disabled={!selectedFile || loading || processing || credits < 1}
        style={{ marginTop: "1.5rem" }}
      >
        {isLoggedIn ? "Restore (1 credit)" : "Restore Free"}
      </button>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
