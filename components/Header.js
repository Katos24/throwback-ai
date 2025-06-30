import Link from "next/link";
import styles from "../styles/Header.module.css";

export default function Header({ showMenu, setShowMenu, onLoginClick }) {
  // Close menu on nav click
  const handleLinkClick = () => {
    setShowMenu(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>🌀 Throwback AI 📼</div>

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
        <Link href="/" className={styles.navLink} onClick={handleLinkClick}>
          Home
        </Link>
        <Link href="/house" className={styles.navLink} onClick={handleLinkClick}>
          90s Room
        </Link>
        <Link href="/yearbook" className={styles.navLink} onClick={handleLinkClick}>
          AI Yearbook
        </Link>
        <Link href="/about" className={styles.navLink} onClick={handleLinkClick}>
          About
        </Link>

        <button
          className={styles.navBtn}
          onClick={() => {
            onLoginClick();
            setShowMenu(false);
          }}
        >
          Login
        </button>

        <Link href="/signup" className={styles.navBtn} onClick={handleLinkClick}>
          Sign Up
        </Link>
      </nav>
    </header>
  );
}
