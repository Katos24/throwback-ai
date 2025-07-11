import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import styles from "../styles/Header.module.css";

export default function Header({ showMenu, setShowMenu }) {
  const navRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get current user on mount
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user || null);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Close menu if clicked outside nav
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

  // Sign out handler
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowMenu(false);
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo} onClick={() => setShowMenu(false)}>
        ANASTASIS 🌀
      </Link>

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
        <Link href="/" className={styles.navLink} onClick={() => setShowMenu(false)}>
          Home
        </Link>

        {/* Updated links */}
        <Link
          href="/replicate/restore-basic"
          className={styles.navLink}
          onClick={() => setShowMenu(false)}
        >
          Restore Image Basic
        </Link>
        <Link
          href="/replicate/restore-premium"
          className={styles.navLink}
          onClick={() => setShowMenu(false)}
        >
          Restore Premium
        </Link>

        <Link href="/about" className={styles.navLink} onClick={() => setShowMenu(false)}>
          About
        </Link>
        <Link href="/pricing" className={styles.navLink} onClick={() => setShowMenu(false)}>
          Pricing
        </Link>

        {user ? (
          <>
            <Link
              href="/profile"
              className={styles.navBtn}
              onClick={() => setShowMenu(false)}
            >
              {user.email || "Profile"}
            </Link>
            <button
              onClick={handleSignOut}
              style={{
                marginLeft: "8px",
                cursor: "pointer",
                backgroundColor: "#ff0080",
                color: "white",
                padding: "8px 12px",
                border: "none",
                borderRadius: 6,
              }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className={styles.navBtn}
              onClick={() => setShowMenu(false)}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className={styles.navBtn}
              onClick={() => setShowMenu(false)}
            >
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
