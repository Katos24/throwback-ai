import { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import { supabase } from "../../lib/supabaseClient";
import useCredits from "../../hooks/useCredits";
import styles from "../../styles/AiPage.module.css";

export default function RestorePremium() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPreviewUrl, setSelectedPreviewUrl] = useState(null);
  const [restoredUrl, setRestoredUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [session, setSession] = useState(null);

  const { credits, deductCredits } = useCredits();

  useEffect(() => {
    async function getSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
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

    if (credits < 40) {
      alert(
        "You do not have enough credits to use Restore Premium. Please visit our Pricing page to get more credits."
      );
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
        const response = await fetch("/api/replicate/restorePremium", {
          method: "POST",
          headers,
          body: JSON.stringify({
            imageBase64: base64,
          }),
        });

        const data = await response.json();

        if (response.ok && data.imageUrl) {
          setRestoredUrl(data.imageUrl);

          // Deduct 40 credits after success
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("credits")
            .eq("id", session.user.id)
            .single();

          if (!profileError && profile) {
            const { error: updateError } = await supabase
              .from("profiles")
              .update({ credits: profile.credits - 40 })
              .eq("id", session.user.id);

            if (updateError) {
              console.error("Error deducting credits:", updateError);
            } else {
              deductCredits(40);
            }
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
      <h1>💎 Restore Premium</h1>

      <p>
        This costs <strong>40 credits</strong> per restore.
      </p>
      <p>
        You have <strong>{credits}</strong> credits remaining.
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ marginTop: "1rem" }}
      />

      {/* Before preview */}
      <div
        style={{
          marginTop: "1rem",
          textAlign: "center",
        }}
      >
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

      {/* Restored image */}
      {restoredUrl && (
        <div
          style={{
            marginTop: "2rem",
            textAlign: "center",
          }}
        >
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

      {/* Processing / Loading spinner and message */}
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
        disabled={!selectedFile || loading || processing || credits < 40}
        style={{ marginTop: "1.5rem" }}
      >
        Restore
      </button>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  );
}
