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
    <main className={styles.container}>
      <h1>💎 Restore Premium</h1>

      {!isLoggedIn ? (
        <div className={styles.creditsInfo}>
          <p>
            🔥 Try Restore Premium with enhanced AI colorization and detail reconstruction.
            <br />
            Sign up to get access and buy credits for premium restores.
            <br />
            🔢 Remaining credits: <strong>{credits}</strong>
          </p>
        </div>
      ) : (
        <div className={`${styles.creditsInfo} ${styles.premium}`}>
          <p>
            💎 Each restore costs <strong>40 credits</strong>.
            <br />
            Premium restores include colorization and advanced facial reconstruction.
            <br />
            🔢 You have <strong>{credits}</strong> credits remaining.
          </p>
        </div>
      )}

      {selectedFile && (
        <button
          onClick={handleRestore}
          disabled={loading || processing || credits < 40}
          className={styles.restoreButton}
        >
          {isLoggedIn ? "💎 Restore Premium (40 credits)" : "🔒 Sign up to Restore Premium"}
        </button>
      )}

      {/* Spinner / Loading Indicator above images */}
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

      {(selectedPreviewUrl || restoredUrl) && (
        <div className={styles.imageComparisonContainer}>
          <div className={styles.imageBox}>
            <strong>Before</strong>
            <div className={styles.imageWrapper}>
              {selectedPreviewUrl ? (
                <img src={selectedPreviewUrl} alt="Before upload preview" className={styles.image} />
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
                  <img src={restoredUrl} alt="Restored" className={styles.image} />
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

      {selectedFile ? (
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginTop: "2rem" }}
        />
      ) : (
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginTop: "1rem" }}
        />
      )}

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
          "Restore Premium brought my wedding photos back to life in full color. Incredible!" <span>– Sarah M.</span>
        </blockquote>
        <blockquote>
          "Worth every credit. The facial reconstruction and colorization blew me away." <span>– Daniel K.</span>
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
