import { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import { supabase } from "../../lib/supabaseClient";
import useCredits from "../../hooks/useCredits";
import styles from "../../styles/AiPage.module.css";
import ImageCompareSlider from "../../components/ImageCompareSlider";

export default function RestoreBasic() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPreviewUrl, setSelectedPreviewUrl] = useState(null);
  const [restoredUrl, setRestoredUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [session, setSession] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);

  const { credits, isLoggedIn, refreshCredits, deductCredits, freeAttempts = 3 } = useCredits();

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

    // Check credits or free attempts before restoring
    if (isLoggedIn) {
      if (credits < 1) {
        alert("You don’t have enough credits to restore this image. Please purchase more credits.");
        return;
      }
    } else {
      if (credits <= 0) {
        alert("You’ve used your free attempts. Please sign up or purchase credits to continue.");
        return;
      }
    }

    handleRestore();
  };

  const handleRestore = async () => {
    if (!selectedFile) return;

    setLoading(true);
    const headers = { "Content-Type": "application/json" };
    if (session?.access_token)
      headers.Authorization = `Bearer ${session.access_token}`;

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
          } else {
            deductCredits(1);
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
      <section className={styles.topBannerBasic}>
        <div className={styles.topBannerContent}>
          <div className={styles.topBannerTop}>
            <h2 className={styles.topBannerTitle}>🕹️ Restore Your Vintage Photo</h2>
            <p className={styles.topBannerSubtitle}>
              Basic restores clean black & white photos with AI-powered scratch removal and clarity boost.
              Sign up for premium features like colorization and advanced restoration.
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
              disabled={loading || processing || (!showFileInput && credits < 1)}
              title={credits < 1 ? "Not enough credits" : ""}
            >
              {!loading && !processing &&
                (showFileInput
                  ? isLoggedIn
                    ? "🆓 Restore Basic (1 credit)"
                    : `🔒 Sign up to Restore Basic (Free attempts left: ${credits})`
                  : "Restore")}
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
                <>
                  Your credits: <strong>{credits}</strong>
                  {credits < 1 && (
                    <div style={{ marginTop: "0.75rem" }}>
                      <button
                        onClick={() => (window.location.href = "/pricing")}
                        className={styles.ctaButton}
                        style={{
                          backgroundColor: "#0070f3",
                          color: "white",
                          border: "none",
                          padding: "0.5rem 1rem",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        Buy More Credits
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  Remaining free attempts: <strong>{credits}</strong>. Sign up to get more credits!
                  {credits < 1 && (
                    <div style={{ marginTop: "0.75rem" }}>
                      <button
                        onClick={() => (window.location.href = "/signup")}
                        className={styles.ctaButton}
                        style={{
                          backgroundColor: "#0070f3",
                          color: "white",
                          border: "none",
                          padding: "0.5rem 1rem",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        Sign Up Now
                      </button>
                    </div>
                  )}
                </>
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
                  <img
                    src={restoredUrl}
                    alt="Restored"
                    className={styles.image}
                    style={{ objectFit: "contain" }}
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

      {/* Image Compare Slider Section for Basic Restore */}
      <section
        style={{
          padding: "3rem 1rem",
          backgroundColor: "#121212",
          color: "white",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Experience the Basic Restore Before & After
        </h2>
        <ImageCompareSlider
          beforeImage="/images/basicpage-before.jpg"
          afterImage="/images/basicpage-after.jpg"
        />
      </section>

      {/* Feature Section – Basic */}
      <section className={styles.featurePromoSection}>
        <div className={styles.featurePromoContent}>
          <div className={styles.featurePromoText}>
            <h2 className={styles.featurePromoTitle}>🧼 Clean up your photos with enhanced clarity</h2>
            <p className={styles.featurePromoSubtitle}>
              Restore Basic uses smart AI to remove noise, sharpen edges, and enhance the overall clarity of your photos —
              whether black &amp; white or color. Black and white images stay true to their original tone, while color photos
              are cleaned and subtly enriched for a crisper, more vivid look.
            </p>
          </div>
          <div className={styles.featurePromoVisual}>
            <img
              src="/images/basic-restore-preview.jpg"
              alt="Basic restored photo example"
              className={`${styles.featurePromoImage} ${styles.tiltImage}`}
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <div className={styles.howItWorksSection}>
        <h3>🛠️ How it works</h3>
        <ol className={styles.howItWorksList}>
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
      <section className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>🙋‍♂️ Frequently Asked Questions</h2>
        <div className={styles.accordion}>
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
              Yes. We never store your images long-term and do not use them for training or sharing.
            </p>
          </details>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials}>
        <h2 className={styles.sectionTitle}>💬 What Our Users Say</h2>
        <ul className={styles.testimonialsList}>
          <li className={styles.testimonialCard}>
            <p className={styles.testimonialText}>
              &quot;Unbelievable results. This brought my grandparents&apos; photo back to life!&quot;
            </p>
            <span className={styles.testimonialAuthor}>– Jamie R.</span>
          </li>
          <li className={styles.testimonialCard}>
            <p className={styles.testimonialText}>
              &quot;I cried when I saw my childhood photo restored. Thank you.&quot;
            </p>
            <span className={styles.testimonialAuthor}>– Marcus L.</span>
          </li>
        </ul>
      </section>

      <div className={styles.privacyStatement}>
        🔒 We respect your privacy. Photos are never stored or shared — everything
        is processed securely and temporarily.
      </div>

      <div className={styles.poweredBy}>
        ⚡ Powered by Throwback AI | Built with ❤️ by Anastasis
      </div>
    </main>
  );
}
