import { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import useCredits from "../../hooks/useCredits";
import styles from "../../styles/AiPage.module.css";
import ImageCompareSlider from "../../components/ImageCompareSlider";
import Link from "next/link";
import Image from "next/image";
import ProgressBar from "../../components/Restores/ProgressBar.jsx";
import BasicFeaturesSection from "../../components/Restores/BasicFeaturesSection";

export default function RestorePremium() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPreviewUrl, setSelectedPreviewUrl] = useState(null);
  const [restoredUrl, setRestoredUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [session, setSession] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);

  // Progress bar state
  const [progressStatus, setProgressStatus] = useState("idle"); // idle, compressing, uploading, processing, complete
  const [progressPercent, setProgressPercent] = useState(null);

  const [showScrollNotice, setShowScrollNotice] = useState(false);

  const { credits, isLoggedIn, refreshCredits, deductCredits } = useCredits();
  const router = useRouter();

  useEffect(() => {
    async function getSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    }
    getSession();
  }, []);

  useEffect(() => {
    if (showScrollNotice) {
      const timer = setTimeout(() => {
        setShowScrollNotice(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [showScrollNotice]);

  // Optional scroll after restore
  useEffect(() => {
    if (restoredUrl) {
      setTimeout(() => {
        window.scrollTo({ top: 600, behavior: "smooth" });
      }, 500);
    }
  }, [restoredUrl]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProgressStatus("compressing");
      setProcessing(true);
      setRestoredUrl("");
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        });
        setSelectedFile(compressedFile);
        setSelectedPreviewUrl(URL.createObjectURL(compressedFile));
      } catch (error) {
        console.error("Image compression error:", error);
        setSelectedFile(file);
        setSelectedPreviewUrl(URL.createObjectURL(file));
      } finally {
        setProcessing(false);
        setProgressStatus("idle");
        setProgressPercent(null);
      }
    }
  };

  const handleRestoreClick = async () => {
    if (!isLoggedIn) {
      router.push("/signup");
      return;
    }

    if (credits < 40) {
      router.push("/pricing");
      return;
    }

    if (!showFileInput) {
      setShowFileInput(true);
      setRestoredUrl("");
      setSelectedFile(null);
      setSelectedPreviewUrl(null);
      return;
    }

    if (!selectedFile) {
      alert("Please upload an image first.");
      return;
    }

    await handleRestore();
  };

  const handleRestore = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setProgressStatus("uploading");
    setProgressPercent(0);

    const headers = { "Content-Type": "application/json" };
    if (session?.access_token) headers.Authorization = `Bearer ${session.access_token}`;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];

      try {
        let progress = 0;
        const progressInterval = setInterval(() => {
          progress += 10;
          if (progress > 90) {
            clearInterval(progressInterval);
          } else {
            setProgressPercent(progress);
          }
        }, 300);

        const response = await fetch("/api/replicate/restorePremium", {
          method: "POST",
          headers,
          body: JSON.stringify({
            imageBase64: base64,
            prompt: "Restore and colorize this vintage photo with premium AI",
          }),
        });

        clearInterval(progressInterval);
        setProgressPercent(100);
        setProgressStatus("processing");
        setProgressPercent(null);

        const data = await response.json();

        if (response.ok && data.imageUrl) {
          setRestoredUrl(data.imageUrl);
          setShowScrollNotice(true);
          setProgressStatus("complete");
          setProgressPercent(100);
          if (isLoggedIn) {
            await deductCredits(40);
            await refreshCredits();
          }
        } else {
          alert(data.error || "Failed to restore image.");
          setProgressStatus("idle");
          setProgressPercent(null);
        }
      } catch (error) {
        alert("Network or server error. Please try again.");
        console.error(error);
        setProgressStatus("idle");
        setProgressPercent(null);
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
    <main>
      <section className={styles.topBanner}>
        <div className={styles.topBannerContent}>
          <div className={styles.topBannerTop}>
            <h2 className={styles.topBannerTitle}>🏛️ Restore Timeless Beauty</h2>
            <p className={styles.topBannerSubtitle}>
              Inspired by the spirit of <em>Anastasis</em>, our AI revives cherished moments with color, clarity, and cultural soul.
            </p>

            {showFileInput && (
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={loading || processing}
                className={`${styles.fileInput} ${styles.visible}`}
              />
            )}

            <button
              className={styles.topBannerButton}
              onClick={handleRestoreClick}
              disabled={loading || processing}
              title={!selectedFile && showFileInput ? "Please upload a file first" : ""}
            >
              {(loading || processing) ? (
                <>
                  <div className={styles.spinner} />
                  <span className={styles.loadingText}>Please wait, this may take up to a minute...</span>
                </>
              ) : !isLoggedIn ? (
                "🔒 Sign up to Restore Premium"
              ) : credits < 40 ? (
                "💳 Buy More Credits"
              ) : showFileInput ? (
                "💎 Restore Premium (40 credits)"
              ) : (
                "Restore"
              )}
            </button>

            <ProgressBar
              status={progressStatus}
              progress={progressPercent}
              showSteps={true}
              loading={loading || processing}
            />

            {showScrollNotice && (
              <div className={styles.scrollNotice}>
                ✅ Your image has been restored!<br />
                📲 Scroll down to see the before & after comparison.
              </div>
            )}

            <div className={styles.creditsInfo}>
              {isLoggedIn ? (
                <>
                  Your credits: <strong>{credits}</strong>
                  {credits < 40 && (
                    <>
                      <br />
                      <Link href="/pricing" className={styles.link}>
                        Need more? View pricing
                      </Link>
                    </>
                  )}
                  <br />
                  <small>Each restore costs 40 credits.</small>
                </>
              ) : (
                <>
                  You have <strong>{credits}</strong> free attempts left.
                  <br />
                  <Link href="/signup" className={styles.link}>
                    Sign up to unlock more credits
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className={styles.topBannerImages}>
            <div className={styles.imageBox}>
              <strong>Before</strong>
              <div className={styles.imageWrapper}>
                {selectedPreviewUrl ? (
                  <Image
                    src={selectedPreviewUrl}
                    alt="Before upload preview"
                    className={styles.image}
                    style={{ objectFit: "contain" }}
                    width={400}
                    height={300}
                    unoptimized={true}
                  />
                ) : (
                  <span className={styles.placeholderText}>Upload an image</span>
                )}
              </div>
            </div>

            <div className={styles.imageBox}>
              <strong>After</strong>
              <div className={styles.imageWrapper}>
                {restoredUrl ? (
                  <Image
                    src={restoredUrl}
                    alt="Restored"
                    className={styles.image}
                    style={{ objectFit: "contain" }}
                    width={400}
                    height={300}
                    unoptimized={true}
                  />
                ) : (
                  <span className={styles.placeholderText}>No restored image yet</span>
                )}
              </div>

              {restoredUrl && (
                <button
                  onClick={handleDownload}
                  className={styles.downloadButton}
                  style={{ marginTop: "1rem" }}
                >
                  ⬇️ Download
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {selectedPreviewUrl && restoredUrl && (
        <section
          style={{
            padding: "3rem 1rem",
            backgroundColor: "#1a1a1a",
            color: "white",
            borderTop: "1px solid #333",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            Your Restoration Preview
          </h2>
          <ImageCompareSlider beforeImage={selectedPreviewUrl} afterImage={restoredUrl} />
        </section>
      )}

      <section
        style={{
          padding: "3rem 1rem",
          backgroundColor: "#121212",
          color: "white",
        }}
      >
        
      </section>

<BasicFeaturesSection />
    </main>
  );
}