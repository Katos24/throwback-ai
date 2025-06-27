import { useState } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
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
  );
}