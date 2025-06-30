import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import styles from "../styles/Header.module.css";

export default function Header({ showMenu, setShowMenu, onLoginClick }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

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

        {user ? (
          <>
            <Link href="/profile" className={styles.navLink} onClick={handleLinkClick}>
              Profile
            </Link>
            <Link href="/premium" className={styles.navLink} onClick={handleLinkClick}>
              Premium
            </Link>

            <span className={styles.navUser}>Signed in as {user.email}</span>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                setUser(null);
                setShowMenu(false);
              }}
              className={styles.navBtn}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/signin" className={styles.navLink} onClick={handleLinkClick}>
              Sign In
            </Link>
            <Link href="/signup" className={styles.navLink} onClick={handleLinkClick}>
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
