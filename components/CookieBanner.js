import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) setShowBanner(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
    // TODO: Enable analytics or cookies here
  };

  const rejectCookies = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setShowBanner(false);
    // TODO: Disable analytics or clear cookies here
  };

  if (!showBanner) return null;

  return (
    <section
      role="region"
      aria-label="Cookie consent banner"
      aria-live="polite"
      style={bannerStyle}
    >
      <p style={{ margin: 0, flex: 1 }}>
        We use cookies to improve your experience. By using our site, you agree to our{" "}
        <Link
          href="/privacy"
          style={{ color: "#fff", textDecoration: "underline" }}
        >
          Privacy Policy
        </Link>.
      </p>
      <div>
        <button onClick={rejectCookies} style={rejectButtonStyle}>
          Reject
        </button>
        <button onClick={acceptCookies} style={acceptButtonStyle}>
          Accept
        </button>
      </div>
    </section>
  );
}

const bannerStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "#222",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  padding: "1rem",
  zIndex: 1000,
  gap: "1rem",
};

const acceptButtonStyle = {
  backgroundColor: "#4caf50",
  border: "none",
  padding: "0.5rem 1rem",
  color: "#fff",
  cursor: "pointer",
  borderRadius: "4px",
};

const rejectButtonStyle = {
  backgroundColor: "#f44336",
  border: "none",
  padding: "0.5rem 1rem",
  color: "#fff",
  cursor: "pointer",
  borderRadius: "4px",
  marginRight: "0.5rem",
};
