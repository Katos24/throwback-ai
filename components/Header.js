import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "../styles/Header.module.css";

export default function Header({ showMenu, setShowMenu, onLoginClick }) {
  const navRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu, setShowMenu]);

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

      <nav
        ref={navRef}
        className={`${styles.nav} ${showMenu ? styles.showMenu : ""}`}
      >
        <Link href="/" className={styles.navLink} onClick={() => setShowMenu(false)}>Home</Link>
        <Link href="/house" className={styles.navLink} onClick={() => setShowMenu(false)}>90s Room</Link>
        <Link href="/yearbook" className={styles.navLink} onClick={() => setShowMenu(false)}>AI Yearbook</Link>
        <Link href="/about" className={styles.navLink} onClick={() => setShowMenu(false)}>About</Link>

        <button
          className={styles.navBtn}
          onClick={() => {
            onLoginClick();
            setShowMenu(false);
          }}
        >
          Login
        </button>

        <Link href="/signup" className={styles.navBtn} onClick={() => setShowMenu(false)}>
          Sign Up
        </Link>
      </nav>
    </header>
  );
}
