import { useState, useEffect, useRef } from "react";
import { supabase } from "../../lib/supabaseClient";
import useCredits from "../../hooks/useCredits";
import useImageRestore from "../../hooks/useImageRestore";

import HeroSection from "../../components/Restores/HeroSection.jsx";
import ImagePreview from "../../components/Restores/ImagePreview.jsx";
import CompareSection from "../../components/Restores/CompareSection.jsx";
import ProgressBar from "../../components/Restores/ProgressBar.jsx"; // ✅ NEW

import styles from "../../styles/RestoreBasic.module.css";

export default function RestoreBasicTest() {
  const fileInputRef = useRef();
  const { credits, isLoggedIn, refreshCredits, deductCredits } = useCredits();
  const [session, setSession] = useState(null);

  const {
    previewUrl,
    restoredUrl,
    status,
    error,
    uploadFile,
    restoreImage,
    progress = 0, // ✅ NEW if your hook provides it
  } = useImageRestore({
    session,
    credits,
    isLoggedIn,
    refreshCredits,
    deductCredits,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  const promptUpload = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    uploadFile(e.target.files[0]);
  };

  const handleRestoreClick = () => {
    if (credits < 1) {
      window.location.href = isLoggedIn ? "/pricing" : "/signup";
      return;
    }

    if (!previewUrl) {
      promptUpload();
      return;
    }

    restoreImage();
  };

  const handleDownload = async () => {
    if (!restoredUrl) return;

    try {
      const response = await fetch(restoredUrl);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "restored-image.jpg";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <main className={styles.root}>
      <HeroSection
        previewUrl={previewUrl}
        status={status}
        credits={credits}
        isLoggedIn={isLoggedIn}
        onUploadClick={promptUpload}
        onRestoreClick={handleRestoreClick}
      />

      {/* ✅ Progress Bar UI */}
      {status !== "idle" && (
        <ProgressBar status={status} progress={progress} />
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={styles.hiddenInput}
      />

      <section className={styles.previews}>
        <ImagePreview title="Before" url={previewUrl} status={status} />
        <ImagePreview
          title="After"
          url={restoredUrl}
          status={status}
          onDownload={handleDownload}
        />
      </section>

      {previewUrl && restoredUrl && (
        <CompareSection before={previewUrl} after={restoredUrl} />
      )}

      {error && <div className={styles.errorToast}>{error}</div>}
    </main>
  );
}
