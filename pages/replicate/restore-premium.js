import { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import useCredits from "../../hooks/useCredits";
import styles from "../../styles/AiPage.module.css";
import ImageCompareSlider from "../../components/ImageCompareSlider";
import Link from "next/link";
import Image from "next/image";

export default function RestorePremium() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPreviewUrl, setSelectedPreviewUrl] = useState(null);
  const [restoredUrl, setRestoredUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [session, setSession] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);

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

            {/* CTA Button */}
            <button
              className={styles.topBannerButton}
              onClick={handleRestoreClick}
              disabled={loading || processing}
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

            {/* Inline Credit Info */}
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
                  width={400}   // approximate current size in px
                  height={300}  // approximate current size in px
                  unoptimized={true} // because base64 or blob URL
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
                    width={400}     // set approximate width you want
                    height={300}    // set approximate height you want
                    unoptimized={true}  // needed for base64 or dynamic URLs
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

      {/* Basic Before/After Slider */}
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
          beforeImage="/images/demo-before.jpg"
          afterImage="/images/demo-after.jpg"
        />
      </section>

      {/* Feature Promo */}
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
            <Image
                src="/images/restore-preview.jpg"
                alt="Restored example preview"
                className={`${styles.featurePromoImage} ${styles.tiltImage}`}
                width={600}    // replace with your desired width
                height={400}   // replace with your desired height
                style={{ objectFit: "contain" }}  // optional if you want to keep that style
              />
          </div>
        </div>
      </section>

      {/* How It Works */}
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

      {/* FAQ */}
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

      {/* Testimonials */}
      <section className={styles.testimonials}>
        <h2 className={styles.sectionTitle}>🌟 What Our Premium Users Say</h2>
        <ul className={styles.testimonialsList}>
          <li className={styles.testimonialCard}>
            <p className={styles.testimonialText}>
              &quot;Restore Premium brought my wedding photos back to life in full color. Incredible!&quot;
            </p>
            <span className={styles.testimonialAuthor}>– Sarah M.</span>
          </li>
          <li className={styles.testimonialCard}>
            <p className={styles.testimonialText}>
              &quot;Worth every credit. The facial reconstruction and colorization blew me away.&quot;
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
