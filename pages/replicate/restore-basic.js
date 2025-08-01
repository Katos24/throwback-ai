// pages/restore-basic-test.jsx

import { useState, useEffect, useRef } from "react";
import imageCompression from "browser-image-compression";
import { supabase } from "../../lib/supabaseClient";
import useCredits from "../../hooks/useCredits";

import HeroSection from "../../components/Restores/HeroSection.jsx";
import ImagePreview from "../../components/Restores/ImagePreview.jsx";
import CompareSection from "../../components/Restores/CompareSection.jsx";
import ProgressBar from "../../components/Restores/ProgressBar.jsx";

import styles from "../../styles/RestoreBasic.module.css";
import AiStyles from "../../styles/AiPage.module.css";

export default function RestoreBasicTest() {
  const fileInputRef = useRef();
  const { credits, isLoggedIn, refreshCredits, deductCredits } = useCredits();

  const [session, setSession] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPreviewUrl, setSelectedPreviewUrl] = useState(null);
  const [restoredUrl, setRestoredUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showFileInput, setShowFileInput] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  const promptUpload = () => {
    setShowFileInput(true);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError(null);
    setProcessing(true);
    setRestoredUrl("");
    setSelectedFile(null);
    setSelectedPreviewUrl(null);

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });
      setSelectedFile(compressedFile);
      setSelectedPreviewUrl(URL.createObjectURL(compressedFile));
    } catch {
      // fallback to original file
      setSelectedFile(file);
      setSelectedPreviewUrl(URL.createObjectURL(file));
    } finally {
      setProcessing(false);
    }
  };

  const handleRestoreClick = async () => {
    setError(null);

    if (credits < 1) {
      window.location.href = isLoggedIn ? "/pricing" : "/signup";
      return;
    }
    if (!showFileInput) {
      promptUpload();
      return;
    }
    if (!selectedFile) {
      alert("Please upload an image first.");
      return;
    }

    setLoading(true);
    const headers = { "Content-Type": "application/json" };
    if (session?.access_token) {
      headers.Authorization = `Bearer ${session.access_token}`;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];

      try {
        const res = await fetch("/api/replicate/restore", {
          method: "POST",
          headers,
          body: JSON.stringify({ imageBase64: base64, prompt: "Restore this vintage photo" }),
        });
        const data = await res.json();

        if (res.ok && data.imageUrl) {
          setRestoredUrl(data.imageUrl);
          isLoggedIn ? await refreshCredits() : deductCredits(1);
        } else {
          setError(data.error || "Failed to restore image.");
        }
      } catch {
        setError("Network or server error. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDownload = async () => {
    if (!restoredUrl) return;
    try {
      const res = await fetch(restoredUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "restored-photo.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      console.error("Download failed");
    }
  };

  const getProgressStatus = () => {
    if (processing) return "compressing";
    if (loading) return "processing";
    if (restoredUrl) return "complete";
    return "idle";
  };

  return (
    <main className={styles.root}>
      <HeroSection
        previewUrl={selectedPreviewUrl}
        status={loading || processing ? "working" : "idle"}
        credits={credits}
        isLoggedIn={isLoggedIn}
        onUploadClick={promptUpload}
        onRestoreClick={handleRestoreClick}
        restoredUrl={restoredUrl}
      />

      <ProgressBar status={getProgressStatus()} progress={null} />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={styles.hiddenInput}
      />
{/* … */}
{/* ─── DYNAMIC 2-OR-3 COLUMN PREVIEW GRID ─────────────────────── */}
<section
  className={styles.previewGrid}
  style={{
    // 2 cols while waiting, switch to 3 once restoredUrl exists
    gridTemplateColumns: restoredUrl ? "1fr 1fr 1fr" : "1fr 1fr",
  }}
>
  {/* BEFORE */}
  <ImagePreview
    title="Before"
    url={selectedPreviewUrl}
    status={loading || processing ? "working" : "idle"}
  />

  {/* AFTER */}
  <ImagePreview
    title="After"
    url={restoredUrl}
    status={loading ? "working" : "idle"}
    onDownload={handleDownload}
  />

  {/* only show slider when restore is done */}
  {restoredUrl && (
    <div className={styles.sliderWrapper} id="compare">
      <CompareSection before={selectedPreviewUrl} after={restoredUrl} />
    </div>
  )}
</section>
{/* ────────────────────────────────────────────────────────────── */}
{/* … */}

      {error && <div className={styles.errorToast}>{error}</div>}

      {/* Feature Section – Basic */}
      <section className={AiStyles.featurePromoSection}>
        <div className={AiStyles.featurePromoContent}>
          <div className={AiStyles.featurePromoText}>
            <h2 className={AiStyles.featurePromoTitle}>
              🧼 Clean up your photos with enhanced clarity
            </h2>
            <p className={AiStyles.featurePromoSubtitle}>
              Restore Basic uses smart AI to remove noise, sharpen edges, and
              enhance the overall clarity of your photos — whether black &amp;
              white or color. Black and white images stay true to their original
              tone, while color photos are cleaned and subtly enriched for a
              crisper, more vivid look.
            </p>
          </div>
          <div className={AiStyles.featurePromoVisual}>
            <img
              src="/images/basic-restore-preview.jpg"
              alt="Basic restored photo example"
              className={`${AiStyles.featurePromoImage} ${AiStyles.tiltImage}`}
            />
          </div>
        </div>
        
      </section>

      {/* How it works */}
      <div className={AiStyles.howItWorksSection}>
        <h3>🛠️ How it works</h3>
        <ol className={AiStyles.howItWorksList}>
          <li>
            <span>📤</span>
            <p>Upload your old or damaged photo</p>
          </li>
          <li>
            <span>✨</span>
            <p>AI analyzes and restores details in black & white</p>
          </li>
          <li>
            <span>📥</span>
            <p>Download your newly restored image</p>
          </li>
        </ol>
      </div>

      {/* FAQ */}
      <section className={AiStyles.faqSection}>
        <h2 className={AiStyles.sectionTitle}>🙋‍♂️ Frequently Asked Questions</h2>
        <div className={AiStyles.accordion}>
          <details>
            <summary>What does the restore actually do?</summary>
            <p>
              It removes scratches, corrects blur, and enhances faded sections.
              Premium restores add colorization and facial reconstruction.
            </p>
          </details>
          <details>
            <summary>Is my image private?</summary>
            <p>
              Yes. We never store your images long-term and do not use them for
              training or sharing.
            </p>
          </details>
        </div>
      </section>

      {/* Testimonials */}
      <section className={AiStyles.testimonials}>
        <h2 className={AiStyles.sectionTitle}>💬 What Our Users Say</h2>
        <ul className={AiStyles.testimonialsList}>
          <li className={AiStyles.testimonialCard}>
            <p className={AiStyles.testimonialText}>
              &quot;Unbelievable results. This brought my grandparents&apos; photo
              back to life!&quot;
            </p>
            <span className={AiStyles.testimonialAuthor}>– Jamie R.</span>
          </li>
          <li className={AiStyles.testimonialCard}>
            <p className={AiStyles.testimonialText}>
              &quot;I cried when I saw my childhood photo restored. Thank you.&quot;
            </p>
            <span className={AiStyles.testimonialAuthor}>– Marcus L.</span>
          </li>
        </ul>
      </section>

      <div className={AiStyles.privacyStatement}>
        🔒 We respect your privacy. Photos are never stored or shared — everything
        is processed securely and temporarily.
      </div>

      <div className={AiStyles.poweredBy}>
        ⚡ Powered by Throwback AI | Built with ❤️ by Anastasis
      </div>
    </main>
  );
}