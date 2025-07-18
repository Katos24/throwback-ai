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
  const [showFileInput, setShowFileInput] = useState(false);

  const { credits, isLoggedIn, refreshCredits, deductCredits } = useCredits();

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
      // First click: show the file input and reset state
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

    // Second click: do actual restore
    handleRestore();
  };

  const handleRestore = async () => {
    if (!selectedFile) return;

    if (credits < 40) {
      alert(
        isLoggedIn
          ? "You don’t have enough credits to use Restore Premium."
          : "You’ve used your free attempts. Sign up or buy credits to restore with Premium."
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

            {/* Only show file input if toggled on */}
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
                  <img src={selectedPreviewUrl} alt="Before upload preview" className={styles.image} style={{ objectFit: "contain" }} />
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
                    <img src={restoredUrl} alt="Restored" className={styles.image} style={{ objectFit: "contain" }} />
                    <button onClick={handleDownload} className={styles.downloadButton}>
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


      {/* Below sections remain the same */}

      <div className={styles.howItWorksSection}>
        <h3>💎 How Restore Premium Works</h3>
        <ol className={styles.howItWorksList}>
          <li>
            <span>📤</span> Upload your highest quality photo
          </li>
          <li>
            <span>🤖</span> Advanced AI analyzes damage, facial features, and colors
          </li>
          <li>
            <span>🌈</span> Receive a fully colorized, high-resolution, enhanced restoration
          </li>
        </ol>
      </div>

      <section className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>❓ Restore Premium FAQ</h2>
        <div className={styles.accordion}>
          <details>
            <summary>What extra features does Restore Premium include?</summary>
            <p>
              It colorizes black & white photos, reconstructs missing facial details, and enhances resolution for printing.
            </p>
          </details>
          <details>
            <summary>Is the premium restore worth the higher credit cost?</summary>
            <p>
              Yes! The results are professional quality and ideal for cherished photos or prints.
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

      <section className={styles.testimonials}>
        <h2 className={styles.sectionTitle}>🌟 What Our Premium Users Say</h2>
        <blockquote>
          &quot;Restore Premium brought my wedding photos back to life in full color. Incredible!&quot; <span>– Sarah M.</span>
        </blockquote>
        <blockquote>
          &quot;Worth every credit. The facial reconstruction and colorization blew me away.&quot; <span>– Daniel K.</span>
        </blockquote>
      </section>

      <div className={styles.privacyStatement}>
        🔒 We respect your privacy. Photos are never stored or shared — everything is processed securely and temporarily.
      </div>

      <div className={styles.poweredBy}>
        ⚡ Powered by Throwback AI | Built with ❤️ by Anastasis
      </div>
    </main>
  );
}
