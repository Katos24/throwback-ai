import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function House() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handleGoUpstairs = () => router.push("/room/upstairs");
  const handleGoLivingRoom = () => router.push("/room/livingroom");

  return (
    <>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>🌀 Throwback AI 📼 </div>
        <button
          className={styles.hamburger}
          onClick={() => setShowMenu(!showMenu)}
          aria-label="Toggle menu"
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
        <nav className={`${styles.nav} ${showMenu ? styles.showMenu : ""}`}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/house" className={styles.navLink}>90s Room</Link>
          <Link href="/yearbook" className={styles.navLink}>AI Yearbook</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
          <button className={styles.navBtn}>Login</button>
          <button className={styles.navBtn}>Sign Up</button>
        </nav>
      </header>

      {/* Main content */}
      <main
        style={{
          backgroundImage: "url('/images/house.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%",
          height: "80vh",
          position: "relative",
          margin: "0 auto",
          maxWidth: "1200px",
        }}
      >
        {/* Hotspots */}
        <div
          onClick={handleGoUpstairs}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "30%",
            height: "100%",
            cursor: "pointer",
          }}
          title="Go Upstairs"
        />
        <div
          onClick={handleGoLivingRoom}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "30%",
            height: "100%",
            cursor: "pointer",
          }}
          title="Go to Living Room"
        />
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        © 2025 Retro Recommender • Built with love + VHS static
      </footer>
    </>
  );
}
