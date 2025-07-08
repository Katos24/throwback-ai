import { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import styles from "../../styles/AiPage.module.css";

export default function RestorePremium() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [restoredUrl, setRestoredUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [error, setError] = useState(null);
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    async function fetchPremiumStatus() {
      setLoadingProfile(true);
      setError(null);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setError("You must be logged in to access this page.");
        setLoadingProfile(false);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("is_premium, credits_remaining")
        .eq("id", user.id)
        .single();

      if (profileError) {
        setError("Failed to load profile data.");
      } else if (!profile?.is_premium) {
        setError(
          <>
            This feature is available for premium users only. Please{" "}
            <Link href="/pricing">
              <a className={styles.link}>upgrade here</a>
            </Link>
            .
          </>
        );
      } else {
        setIsPremium(true);
        setCredits(profile.credits_remaining || 0);
      }
      setLoadingProfile(false);
    }

    fetchPremiumStatus();
  }, []);

  if (loadingProfile) return <p className={styles.loadingText}>Loading...</p>;

  if (error)
    return (
      <p className={styles.errorText} style={{ color: "red" }}>
        {error}
      </p>
    );

  if (!isPremium)
    return (
      <p className={styles.errorText}>
        This feature requires a premium subscription.{" "}
        <Link href="/pricing">
          <a className={styles.link}>Upgrade here</a>
        </Link>
        .
      </p>
    );

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

    // Get user session & token
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      alert("Please sign in to restore your photo!");
      setLoading(false);
      return;
    }

    const token = session.access_token;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];

      try {
        const response = await fetch("/api/replicate/restorePremium", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            imageBase64: base64,
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
    <main className={styles.container} style={{ fontFamily: "sans-serif" }}>
      <h1 className={styles.title}>Restore Premium</h1>

      <p>💎 This costs <strong>40 credits</strong> per restore</p>
      <p>🔢 You have <strong>{credits}</strong> credits remaining</p>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={styles.fileInput}
      />

      {processing && <p>⏳ Processing image...</p>}

      <button
        onClick={handleRestore}
        disabled={!selectedFile || loading || processing}
        className={styles.primaryButton}
        style={{ marginLeft: "1rem" }}
      >
        {loading ? "Restoring..." : processing ? "Processing..." : "Restore"}
      </button>

      {restoredUrl && (
        <div className={styles.resultContainer} style={{ marginTop: "2rem" }}>
          <h2 className={styles.subtitle}>✨ Restored Photo:</h2>

          <img
            src={restoredUrl}
            alt="Restored"
            className={styles.restoredImage}
            style={{ width: 400, height: 400, borderRadius: "8px" }}
          />

          <div style={{ marginTop: "1rem" }}>
            <button onClick={handleDownload} className={styles.secondaryButton}>
              ⬇️ Download
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
