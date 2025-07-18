import { useState, useEffect, useRef } from "react";
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
  const [showFileInput, setShowFileInput] = useState(false);

  const { credits, isLoggedIn, refreshCredits, deductCredits } = useCredits();

  // For slider
  const containerRef = useRef(null);
  const [sliderPos, setSliderPos] = useState(50); // 0-100 percent
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    }
    getSession();
  }, []);

  // Slider drag logic
  const onMove = (clientX) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    let pos = ((clientX - left) / width) * 100;
    if (pos < 0) pos = 0;
    if (pos > 100) pos = 100;
    setSliderPos(pos);
  };

  const onMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e) => {
    if (isDragging) {
      onMove(e.clientX);
    }
  };

  const onTouchStart = (e) => {
    setIsDragging(true);
  };

  const onTouchMove = (e) => {
    if (isDragging && e.touches.length === 1) {
      onMove(e.touches[0].clientX);
    }
  };

  const onTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("touchend", onTouchEnd);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("touchmove", onTouchMove);
    } else {
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    }
    return () => {
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [isDragging]);

  // Existing handlers unchanged
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
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
      }
    }
  };

  const handleRestoreClick = () => {
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

    handleRestore();
  };

  const handleRestore = async () => {
    if (!selectedFile) return;

    if (credits < 40) {
      alert(
        isLoggedIn
          ? "You don't have enough credits to use Restore Premium."
          : "You've used your free attempts. Sign up or buy credits to restore with Premium."
      );
      return;
    }

    setLoading(true);
    const headers = { "Content-Type": "application/json" };
    if (session?.access_token) headers.Authorization = `Bearer ${session.access_token}`;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];

      try {
        const response = await fetch("/api/replicate/restorePremium", {
          method: "POST",
          headers,
          body: JSON.stringify({
            imageBase64: base64,
            prompt: "Restore and colorize this vintage photo with premium AI",
          }),
        });

        const data = await response.json();

        if (response.ok && data.imageUrl) {
          setRestoredUrl(data.imageUrl);
          if (isLoggedIn) {
            await refreshCredits();
          } else {
            deductCredits(40);
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
              disabled={loading || processing || (!showFileInput && credits < 40)}
              title={credits < 40 ? "Not enough credits" : ""}
            >
              {!loading && !processing && (
                showFileInput
                  ? isLoggedIn
                    ? "💎 Restore Premium (40 credits)"
                    : "🔒 Sign up to Restore Premium"
                  : "Restore"
              )}
              {(loading || processing) && (
                <>
                  <div className={styles.spinner} />
                  <span className={styles.loadingText}>
                    Please wait, this may take up to a minute...
                  </span>
                </>
              )}
            </button>

            <div className={styles.creditsInfo}>
              {isLoggedIn ? (
                <>Your credits: <strong>{credits}</strong></>
              ) : (
                <>Sign up to unlock full access and purchase credits. Remaining free attempts: <strong>{credits}</strong></>
              )}
            </div>
          </div>

          <div className={styles.topBannerImages}>
            <div className={styles.imageBox}>
              <strong>Before</strong>
              <div className={styles.imageWrapper}>
                {selectedPreviewUrl ? (
                  <img
                    src={selectedPreviewUrl}
                    alt="Before upload preview"
                    className={styles.image}
                    style={{ objectFit: "contain" }}
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
                  <>
                    <img
                      src={restoredUrl}
                      alt="Restored"
                      className={styles.image}
                      style={{ objectFit: "contain" }}
                    />
                    <button
                      onClick={handleDownload}
                      className={styles.downloadButton}
                    >
                      ⬇️ Download
                    </button>
                  </>
                ) : (
                  <span className={styles.placeholderText}>No restored image yet</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

    

      {/* Enhanced Gallery comparison slider */}
<section className={styles.gallerySection}>
  <h2 className={styles.galleryTitle}>Before & After Demo</h2>
  <p className={styles.gallerySubtitle}>
    Drag the slider to compare the original with the restored version.
  </p>

  <div
    ref={containerRef}
    className={styles.compareContainer}
    style={{
      position: "relative",
      maxWidth: "800px",
      margin: "3rem auto",
      userSelect: "none",
      height: "0",
      paddingBottom: "56.25%", // 16:9 aspect ratio
      overflow: "hidden",
      borderRadius: "12px",
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      border: "2px solid rgba(255,255,255,0.1)",
      cursor: isDragging ? "grabbing" : "grab",
    }}
  >
    {/* Base Before Image */}
    <img
      src="/images/demo-before.jpg"
      alt="Before restoration"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        userSelect: "none",
        pointerEvents: "none",
        draggable: false,
      }}
    />

    {/* Overlay After Image (Fully Overlapped, Revealed by clip-path) */}
    <img
      src="/images/demo-after.jpg"
      alt="After restoration"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
        transition: isDragging ? "none" : "clip-path 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 2,
        pointerEvents: "none",
        userSelect: "none",
      }}
      draggable={false}
    />


    {/* Slider Handle */}
    <div
      className={styles.sliderHandle}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={{
        position: "absolute",
        top: 0,
        left: `${sliderPos}%`,
        transform: "translateX(-50%)",
        height: "100%",
        width: "2px",
        backgroundColor: "#ffffff",
        cursor: isDragging ? "grabbing" : "ew-resize",
        zIndex: 10,
        userSelect: "none",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.5)",
      }}
    >
      {/* Handle Circle */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "32px",
          height: "32px",
          backgroundColor: "#ffffff",
          borderRadius: "50%",
          border: "2px solid rgba(0,0,0,0.1)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        {/* Drag Icon */}
        <div
          style={{
            display: "flex",
            gap: "2px",
          }}
        >
          <div style={{ width: "2px", height: "12px", backgroundColor: "#666", borderRadius: "1px" }} />
          <div style={{ width: "2px", height: "12px", backgroundColor: "#666", borderRadius: "1px" }} />
          <div style={{ width: "2px", height: "12px", backgroundColor: "#666", borderRadius: "1px" }} />
        </div>
      </div>
    </div>

    {/* Before/After Labels */}
    <div
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        backgroundColor: "rgba(0,0,0,0.7)",
        color: "white",
        padding: "8px 12px",
        borderRadius: "6px",
        fontSize: "14px",
        fontWeight: "600",
        zIndex: 5,
      }}
    >
      BEFORE
    </div>
    <div
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        backgroundColor: "rgba(0,0,0,0.7)",
        color: "white",
        padding: "8px 12px",
        borderRadius: "6px",
        fontSize: "14px",
        fontWeight: "600",
        zIndex: 5,
      }}
    >
      AFTER
    </div>

    {/* Instruction Text */}
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(0,0,0,0.7)",
        color: "white",
        padding: "8px 16px",
        borderRadius: "20px",
        fontSize: "12px",
        zIndex: 5,
        opacity: isDragging ? 0 : 1,
        transition: "opacity 0.3s ease",
      }}
    >
      ← Drag to compare →
    </div>
  </div>
</section>

      {/* feature Section */}
      <section className={styles.featurePromoSection}>
        <div className={styles.featurePromoContent}>
          <div className={styles.featurePromoText}>
            <h2 className={styles.featurePromoTitle}>✨ Turn faded photos into stunning restorations</h2>
            <p className={styles.featurePromoSubtitle}>
              Restore Premium uses advanced AI to revive detail, sharpen edges, and enrich every pixel with vibrant clarity.
              The result? A museum-grade restoration of your most cherished memories.
            </p>
          </div>
          <div className={styles.featurePromoVisual}>
            <img
              src="/images/restore-preview.jpg"
              alt="Restored example preview"
              className={`${styles.featurePromoImage} ${styles.tiltImage}`}
            />
          </div>
        </div>
      </section>


      {/* How it works */}
  <div className={styles.howItWorksSection}>
        <h3>💎 How Restore Premium Works</h3>
        <ol className={styles.howItWorksList}>
        <li>
          <span>📤</span>
          <p>Upload your highest quality photo</p>
        </li>
        <li>
          <span>🤖</span>
          <p>Advanced AI analyzes damage, facial features, and colors</p>
        </li>
        <li>
          <span>🌈</span>
          <p>Receive a fully colorized, high-resolution, enhanced restoration</p>
        </li>
        </ol>
      </div>



      {/* FAQ section */}
      <section className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>❓ Restore Premium FAQ</h2>
        <div className={styles.accordion}>
          <details>
            <summary>What extra features does Restore Premium include?</summary>
            <p>
              It colorizes black & white photos, reconstructs missing facial details,
              and enhances resolution for printing.
            </p>
          </details>
          <details>
            <summary>Is the premium restore worth the higher credit cost?</summary>
            <p>
              Yes! The results are professional quality and ideal for cherished photos or
              prints.
            </p>
          </details>
          <details>
            <summary>Are my photos kept private?</summary>
            <p>
              Absolutely. We never store your images permanently or share them.
            </p>
          </details>
        </div>
      </section>

      {/* testimonials */}
     <section className={styles.testimonials}>
        <h2 className={styles.sectionTitle}>🌟 What Our Premium Users Say</h2>
        <ul className={styles.testimonialsList}>
          <li className={styles.testimonialCard}>
            <p className={styles.testimonialText}>
              "Restore Premium brought my wedding photos back to life in full color. Incredible!"
            </p>
            <span className={styles.testimonialAuthor}>– Sarah M.</span>
          </li>
          <li className={styles.testimonialCard}>
            <p className={styles.testimonialText}>
              "Worth every credit. The facial reconstruction and colorization blew me away."
            </p>
            <span className={styles.testimonialAuthor}>– Daniel K.</span>
          </li>
        </ul>
      </section>

      <div className={styles.privacyStatement}>
        🔒 We respect your privacy. Photos are never stored or shared — everything is processed securely
        and temporarily.
      </div>

      <div className={styles.poweredBy}>
        ⚡ Powered by Throwback AI | Built with ❤️ by Anastasis
      </div>
    </main>
  );
}