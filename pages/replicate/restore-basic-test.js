import { useState, useEffect } from "react";
import Image from "next/image";
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

  const handleRestore = async () => {
    if (!selectedFile) return;

    if (credits < 1) {
      alert(
        isLoggedIn
          ? "You don’t have enough credits to restore this image."
          : "You’ve used your free attempts. Sign up to get 10 more!"
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
    <main className={styles.container}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Restore Your Photos with AI Magic</h1>
        <p className={styles.heroSubtitle}>
          Bring old memories back to life. Upload your photo and let our AI do the rest — free & instant.
        </p>
        <label htmlFor="fileUpload" className={styles.uploadButton}>
          Upload a Photo
        </label>
        <input
          id="fileUpload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </section>

      {/* CREDIT INFO */}
      {!isLoggedIn ? (
        <div className={styles.creditsInfo}>
          <p>
            🎉 You get <strong>3 free basic restores</strong> (black & white cleanup only).<br />
            Sign up to get <strong>5 more basic restores</strong>!<br />
            Upgrade to <strong>Premium</strong> for enhanced restores with colorization and amazing enhancements.<br />
            🔢 Remaining attempts: <strong>{credits}</strong>
          </p>
        </div>
      ) : (
        <div className={`${styles.creditsInfo} ${styles.premium}`}>
          <p>
            💎 Each restore costs <strong>1 credit</strong>.<br />
            Basic restores clean black & white photos.<br />
            <strong>Premium restores</strong> add colorization and advanced enhancements.<br />
            🔢 You have <strong>{credits}</strong> credits remaining.
          </p>
        </div>
      )}

      {/* RESTORE BUTTON */}
      {selectedFile && (
        <button
          onClick={handleRestore}
          disabled={loading || processing || credits < 1}
          className={styles.restoreButton}
        >
          {isLoggedIn ? "💎 Restore (1 credit)" : "🆓 Restore Free"}
        </button>
      )}

      {/* LOADING STATE */}
      {(processing || loading) && (
        <div className={styles.loaderWrapper}>
          <div className={styles.loader}></div>
          <p>{loading ? "Restoring..." : "Processing image..."}</p>
          <p className={styles.loaderSubtext}>
            The restore process can take a minute or sometimes a bit longer.<br />
            Please be patient and do not close this window.
          </p>
        </div>
      )}

      {/* IMAGE COMPARISON */}
      {(selectedPreviewUrl || restoredUrl) && (
        <div className={styles.imageComparisonContainer}>
          <div className={styles.imageBox}>
            <strong>Before</strong>
            <div className={styles.imageWrapper}>
              {selectedPreviewUrl ? (
                <Image
                  src={selectedPreviewUrl}
                  alt="Before upload preview"
                  width={500}
                  height={500}
                  style={{ objectFit: "contain" }}
                  className={styles.image}
                />
              ) : (
                <span style={{ color: "#aaa" }}>No image selected</span>
              )}
            </div>
          </div>

          <div className={styles.imageBox}>
            <strong>After</strong>
            <div className={styles.imageWrapper}>
              {restoredUrl ? (
                <>
                  <Image
                    src={restoredUrl}
                    alt="Restored"
                    width={500}
                    height={500}
                    style={{ objectFit: "contain" }}
                    className={styles.image}
                  />
                  <button onClick={handleDownload} style={{ marginTop: 12 }}>
                    ⬇️ Download
                  </button>
                </>
              ) : (
                <span style={{ color: "#aaa" }}>No restored image yet</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* HOW IT WORKS */}
      <section className={styles.howItWorksSection}>
        <h3>🛠️ How it works</h3>
        <ol className={styles.howItWorksList}>
          <li><span>📤</span> Upload your old or damaged photo</li>
          <li><span>✨</span> AI analyzes and restores details</li>
          <li><span>📥</span> Download your newly restored image</li>
        </ol>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>🙋‍♂️ Frequently Asked Questions</h2>
        <div className={styles.accordion}>
          <details>
            <summary>What does the restore actually do?</summary>
            <p>
              It removes scratches, corrects blur, and enhances faded sections. Premium restores also colorize and fix facial features.
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

      {/* TESTIMONIALS */}
      <section className={styles.testimonials}>
        <h2 className={styles.sectionTitle}>💬 What Our Users Say</h2>
        <blockquote>
          "Unbelievable results. This brought my grandparents' photo back to life!" <span>– Jamie R.</span>
        </blockquote>
        <blockquote>
          "I cried when I saw my childhood photo restored. Thank you." <span>– Marcus L.</span>
        </blockquote>
      </section>

      {/* FOOTER */}
      <div className={styles.privacyStatement}>
        🔒 We respect your privacy. Photos are never stored or shared — everything is processed securely and temporarily.
      </div>

      <div className={styles.poweredBy}>
        ⚡ Powered by Throwback AI | Built with ❤️ by Anastasis
      </div>
    </main>
  );
}