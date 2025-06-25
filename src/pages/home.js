import { useState } from "react";
import { useRouter } from "next/router";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";

export default function Home() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const enter90sRoom = () => router.push("/house");

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#00FFCC",
        fontFamily: "'Courier New', monospace",
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
      }}
    >
      {/* Hero Section */}
      <header
        style={{
          background: "#111",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto 40px auto",
          boxSizing: "border-box",
          flexWrap: "wrap",
          gap: "10px",
          minWidth: 0,
        }}
      >
        <h1
          style={{
            fontSize: 36,
            margin: 0,
            lineHeight: 1,
            color: "#00FFCC",
            flex: "1 1 auto",
            minWidth: 0,
          }}
        >
          🎮 Retro Recommender
        </h1>
        <button
          style={{
            backgroundColor: "#222",
            color: "#00FFCC",
            border: "2px solid #00FFCC",
            padding: "6px 14px",
            fontSize: 14,
            cursor: "pointer",
            fontWeight: "bold",
            borderRadius: 6,
            boxShadow: "0 0 6px #00FFCC",
            height: 36,
            minWidth: "auto",
            flexShrink: 0,
          }}
          onClick={() => router.push("/yearbook")}
        >
          📸 Try AI Yearbook
        </button>
      </header>

      {/* Gallery Section */}
      <section
        style={{
          display: "flex",
          overflowX: "auto",
          gap: 10,
          padding: "20px 5%",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          position: "relative",
          marginBottom: 60,
        }}
        className="no-scrollbar"
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <img
            key={i}
            src={`/images/sample-${i + 1}.png`}
            alt={`Sample ${i + 1}`}
            style={{
              width: 200,
              height: 200,
              objectFit: "cover",
              borderRadius: 8,
              boxShadow: "0 0 8px #00FFCC88",
              flexShrink: 0,
            }}
          />
        ))}
      </section>

      {/* Feature Cards */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto 60px auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 24,
          padding: "40px 5%",
        }}
      >
        <FeatureCard
          title="AI Yearbook Generator"
          desc="Upload your pic, pick a 90s style, and get an instant yearbook glow-up!"
        />
        <FeatureCard
          title="Walkable 90s Room"
          desc="Enter a nostalgic 90s room, explore different rooms and unlock surprises."
        />
        <FeatureCard
          title="More Houses Coming"
          desc="Soon you’ll be able to explore other decades and themed houses."
        />
      </section>

      {/* Actions */}
      <div
        style={{
          textAlign: "center",
          margin: "40px 0 60px 0",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "center",
        }}
      >
        <button onClick={enter90sRoom} style={ctaButtonStyle}>
          🛋️ Enter My 90s Room
        </button>
        <button
          onClick={() => router.push("/yearbook")}
          style={{ ...ctaButtonStyle, fontSize: 16, padding: "10px 20px" }}
        >
          📸 Try AI Yearbook
        </button>
      </div>

      {/* Auth Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          marginBottom: 80,
        }}
      >
        <button onClick={() => setShowLogin(true)} style={authButtonStyle}>
          Login
        </button>
        <button onClick={() => setShowSignUp(true)} style={authButtonStyle}>
          Sign Up
        </button>
      </div>

      {/* Modals */}
      {showLogin && (
        <div style={modalStyle}>
          <button
            onClick={() => setShowLogin(false)}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "transparent",
              border: "none",
              color: "#00FFCC",
              fontSize: 24,
              cursor: "pointer",
              fontWeight: "bold",
            }}
            aria-label="Close login modal"
          >
            ×
          </button>
          <h3>Login</h3>
          <LoginForm onClose={() => setShowLogin(false)} />
        </div>
      )}

      {showSignUp && (
        <div style={modalStyle}>
          <button
            onClick={() => setShowSignUp(false)}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "transparent",
              border: "none",
              color: "#00FFCC",
              fontSize: 24,
              cursor: "pointer",
              fontWeight: "bold",
            }}
            aria-label="Close signup modal"
          >
            ×
          </button>
          <h3>Sign Up</h3>
          <SignupForm onClose={() => setShowSignUp(false)} />
        </div>
      )}

      {/* Footer */}
      <footer
        style={{
          background: "#111",
          padding: "40px 5%",
          textAlign: "center",
          fontSize: 14,
          color: "#888",
          marginTop: "auto",
        }}
      >
        ⭐️ Over 1M nostalgic photos generated
        <br />
        📚 Join our Discord / TikTok
        <br />
        © 2025 Retro Recommender
      </footer>

      {/* Hide scrollbar styles */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div
      style={{
        backgroundColor: "#111",
        border: "1px solid #00FFCC",
        borderRadius: 10,
        padding: 20,
        boxShadow: "0 0 10px rgba(0, 255, 204, 0.2)",
        textAlign: "left",
      }}
    >
      <h3 style={{ color: "#00FFCC", marginBottom: 10 }}>{title}</h3>
      <p style={{ color: "#ccc" }}>{desc}</p>
    </div>
  );
}

const ctaButtonStyle = {
  backgroundColor: "#222",
  color: "#00FFCC",
  border: "2px solid #00FFCC",
  padding: "12px 24px",
  fontSize: 18,
  cursor: "pointer",
  fontWeight: "bold",
  borderRadius: 6,
  boxShadow: "0 0 10px #00FFCC",
};

const authButtonStyle = {
  backgroundColor: "#444",
  color: "#00FFCC",
  border: "1px solid #00FFCC",
  padding: "8px 16px",
  fontSize: 14,
  borderRadius: 4,
  cursor: "pointer",
};

const modalStyle = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#111",
  color: "#00FFCC",
  padding: 20,
  borderRadius: 10,
  boxShadow: "0 0 20px rgba(0, 255, 204, 0.7)",
  width: 320,
  textAlign: "center",
  border: "1px solid #00FFCC",
  position: "fixed",
};
