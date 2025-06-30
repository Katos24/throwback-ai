import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import styles from "../styles/Header.module.css";

export default function Header({ showMenu, setShowMenu }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get current session user on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for changes in auth state
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

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
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/house" className={styles.navLink}>90s Room</Link>
        <Link href="/yearbook" className={styles.navLink}>AI Yearbook</Link>
        <Link href="/about" className={styles.navLink}>About</Link>

        {user ? (
          <>
            <span className={styles.navUser}>Signed in as {user.email}</span>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                setUser(null);
              }}
              className={styles.navButton}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/signin" className={styles.navLink}>Sign In</Link>
            <Link href="/signup" className={styles.navLink}>Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}
