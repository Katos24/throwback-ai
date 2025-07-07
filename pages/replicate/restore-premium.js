import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import styles from "../../styles/AiPage.module.css";

export default function RestorePremium() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [restoredUrl, setRestoredUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [error, setError] = useState(null);

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
        .select("is_premium")
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

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];

      try {
        const response = await fetch("/api/replicate/restorePremium", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
    <main className={styles.container} style={{ fontFamily: "sans-serif" }}>
      <h1 className={styles.title}>Restore Premium</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={styles.fileInput}
      />

      <button
        onClick={handleRestore}
        disabled={!selectedFile || loading}
        className={styles.primaryButton}
        style={{ marginLeft: "1rem" }}
      >
        {loading ? "Restoring..." : "Restore"}
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
            {" | "}
            <button
              onClick={() => alert("Next: Send to Avatar flow here!")}
              className={styles.secondaryButton}
            >
              ➡️ Send to Avatar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
