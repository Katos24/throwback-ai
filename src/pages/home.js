import { useState } from "react";
import { useRouter } from "next/router";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>📼 Retro Recommender</div>
        <div className={styles.nav}>
          <button className={styles.navBtn} onClick={() => setShowLogin(true)}>
            Login
          </button>
          <button className={styles.navBtn} onClick={() => setShowSignUp(true)}>
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>Back to the 90s — Reimagined</h1>
        <p>Create a nostalgic yearbook photo or explore your own retro house.</p>
        <div className={styles.heroButtons}>
          <button className={styles.cta} onClick={() => router.push("/house")}>
            🛋️ Explore My 90s Room
          </button>
          <button className={styles.cta} onClick={() => router.push("/yearbook")}>
            📸 Try AI Yearbook
          </button>
        </div>
      </section>

     {/* Feature Cards */}
<section className={styles.features}>
  <FeatureCard
    icon="/icons/ai.svg"
    title="AI Yearbook Styles"
    desc="Turn your photo into a high-school throwback using AI magic."
  />
  <FeatureCard
    icon="/icons/gamepad.svg"
    title="Interactive 90s House"
    desc="Walk through your own virtual bedroom, kitchen, and more."
  />
  <FeatureCard
    icon="/icons/star.svg"
    title="Premium Content"
    desc="Unlock collectible styles, secret rooms, and bonus designs."
  />
</section>

{/* Info Sections - add here */}
<section className={styles.infoWrap}>
  <div className={styles.infoBlock}>
    <img src="/images/your-image1.jpg" alt="Description 1" className={styles.infoImage} />
    <div className={styles.infoText}>
      <h2>First Info Title</h2>
      <p>Description text goes here for the first info block.</p>
    </div>
  </div>

  <div className={`${styles.infoBlock} ${styles.reverse}`}>
    <img src="/images/your-image2.jpg" alt="Description 2" className={styles.infoImage} />
    <div className={styles.infoText}>
      <h2>Second Info Title</h2>
      <p>Description text goes here for the second info block.</p>
    </div>
  </div>
</section>

{/* Footer */}
<footer className={styles.footer}>
  © 2025 Retro Recommender • Built with love + VHS static
</footer>


      {/* Modals */}
      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <LoginForm onClose={() => setShowLogin(false)} />
        </Modal>
      )}
      {showSignUp && (
        <Modal onClose={() => setShowSignUp(false)}>
          <SignupForm onClose={() => setShowSignUp(false)} />
        </Modal>
      )}
    </>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className={styles.card}>
      <img src={icon} alt={title} className={styles.icon} />
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <>
      <div className={styles.modalBackdrop} onClick={onClose} />
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.modalClose}>×</button>
        {children}
      </div>
    </>
  );
}