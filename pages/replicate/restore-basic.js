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
      setShowFileInput(true);
      setSelectedFile(null);
      setSelectedPreviewUrl(null);
      setRestoredUrl("");
    } else if (selectedFile) {
      handleRestore();
    } else {
      alert("Please select an image first.");
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
      <section>
        <h1>🕹️ Restore Your Vintage Photo</h1>

        {!isLoggedIn ? (
          <div className={styles.creditsInfo}>
            <p>
              🎉 You get <strong>3 free basic restores</strong> (black & white cleanup only).
              <br />
              Sign up to get <strong>5 more basic restores</strong>!
              <br />
              Upgrade to <strong>Premium</strong> for enhanced restores with colorization and amazing enhancements.
              <br />
              🔢 Remaining attempts: <strong>{credits}</strong>
            </p>
          </div>
        ) : (
          <div className={`${styles.creditsInfo} ${styles.premium}`}>
            <p>
              💎 Each restore costs <strong>1 credit</strong>.
              <br />
              Basic restores clean black & white photos.
              <br />
              <strong>Premium restores</strong> add colorization and advanced enhancements.
              <br />
              🔢 You have <strong>{credits}</strong> credits remaining.
            </p>
          </div>
        )}

        <button
          onClick={handleRestoreClick}
          disabled={loading || processing || (!showFileInput && credits < 1)}
          className={styles.restoreButton}
          style={{ marginTop: "1.5rem", width: "100%" }}
        >
          {loading || processing ? (
            <>
              {loading ? "Restoring..." : "Processing..."}
              <span
                style={{
                  marginLeft: 8,
                  border: "3px solid #ccc",
                  borderTop: "3px solid #0077cc",
                  borderRadius: "50%",
                  width: 16,
                  height: 16,
                  display: "inline-block",
                  animation: "spin 1s linear infinite",
                  verticalAlign: "middle",
                }}
              />
            </>
          ) : !showFileInput ? (
            isLoggedIn ? "💎 Restore Image" : "🆓 Restore Image"
          ) : selectedFile ? (
            "🚀 Start Restore"
          ) : (
            "Choose File to Restore"
          )}
        </button>

        {showFileInput && (
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading || processing}
            style={{ marginTop: "1rem", width: "100%" }}
          />
        )}

        {(selectedPreviewUrl || restoredUrl) && (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: "2rem",
      marginTop: "2rem",
    }}
  >
    {/* Before */}
    <div style={{ textAlign: "center" }}>
      <strong>Before</strong>
      <div
        style={{
          marginTop: 8,
          border: "1px solid #ddd",
          padding: 8,
          borderRadius: 8,
          width: 300,
          height: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fafafa",
        }}
      >
        {selectedPreviewUrl ? (
          <Image
            src={selectedPreviewUrl}
            alt="Before preview"
            width={280}
            height={280}
            style={{ objectFit: "contain" }}
          />
        ) : (
          <span>No image selected</span>
        )}
      </div>
    </div>

    {/* After */}
    <div style={{ textAlign: "center" }}>
      <strong>After</strong>
      <div
        style={{
          marginTop: 8,
          border: "1px solid #ddd",
          padding: 8,
          borderRadius: 8,
          width: 300,
          height: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fafafa",
        }}
      >
        {restoredUrl ? (
          <div>
            <Image
              src={restoredUrl}
              alt="Restored image"
              width={280}
              height={280}
              style={{ objectFit: "contain" }}
            />
            <div>
              <button onClick={handleDownload} style={{ marginTop: 12 }}>
                ⬇️ Download
              </button>
            </div>
          </div>
        ) : (
          <span>No restored image yet</span>
        )}
      </div>
    </div>
  </div>
)}


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
              }}
            >
              The restore process can take a minute or sometimes a bit longer.
              <br />
              Please be patient and do not close this window.
            </p>
          </div>
        )}

        {/* Before & After Section */}
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <h2>🖼️ Before & After</h2>

          <div style={{ marginTop: 16 }}>
            <strong>Before</strong>
            <div style={{ marginTop: 8, border: "1px solid #ddd", padding: 8, borderRadius: 8 }}>
              {selectedPreviewUrl ? (
                <Image
                  src={selectedPreviewUrl}
                  alt="Before preview"
                  width={480}
                  height={320}
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <span>No image selected</span>
              )}
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <strong>After</strong>
            <div style={{ marginTop: 8, border: "1px solid #ddd", padding: 8, borderRadius: 8 }}>
              {restoredUrl ? (
                <>
                  <Image
                    src={restoredUrl}
                    alt="Restored image"
                    width={480}
                    height={320}
                    style={{ objectFit: "contain" }}
                  />
                  <button onClick={handleDownload} style={{ marginTop: 12 }}>
                    ⬇️ Download
                  </button>
                </>
              ) : (
                <span>No restored image yet</span>
              )}
            </div>
          </div>
        </div>

        <div className={styles.howItWorksSection} style={{ marginTop: "3rem" }}>
          <h3>🛠️ How it works</h3>
          <ol className={styles.howItWorksList}>
            <li>
              <span>📤</span> Upload your old or damaged photo
            </li>
            <li>
              <span>✨</span> AI analyzes and restores details
            </li>
            <li>
              <span>📥</span> Download your newly restored image
            </li>
          </ol>
        </div>

        <section className={styles.faqSection}>
          <h2 className={styles.sectionTitle}>🙋‍♂️ Frequently Asked Questions</h2>
          <div className={styles.accordion}>
            <details>
              <summary>What does the restore actually do?</summary>
              <p>
                It removes scratches, corrects blur, and enhances faded sections.
                Premium restores also colorize and fix facial features.
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

        <section className={styles.testimonials}>
          <h2 className={styles.sectionTitle}>💬 What Our Users Say</h2>
          <blockquote>
            &quot;Unbelievable results. This brought my grandparents&apos; photo back to life!&quot; <span>– Jamie R.</span>
          </blockquote>
          <blockquote>
            &quot;I cried when I saw my childhood photo restored. Thank you.&quot; <span>– Marcus L.</span>
          </blockquote>
        </section>

        <div className={styles.privacyStatement} style={{ marginTop: "2rem" }}>
          🔒 We respect your privacy. Photos are never stored or shared — everything
          is processed securely and temporarily.
        </div>

        <div className={styles.poweredBy} style={{ marginTop: "1rem", textAlign: "center" }}>
          ⚡ Powered by Throwback AI | Built with ❤️ by Anastasis
        </div>
      </section>

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
    </main>
  );
}
