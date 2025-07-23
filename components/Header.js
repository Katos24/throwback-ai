import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import styles from "../styles/Header.module.css";

export default function Header({ showMenu, setShowMenu }) {
  const navRef = useRef(null);
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get current user
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user || null);
    });

    // Listen to auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu, setShowMenu]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowMenu(false);
  };

  const goToPricing = () => {
    setShowMenu(false);
    router.push("/pricing");
  };

  return (
    <header className={styles.header}>
      {/* 🍔 Hamburger Button */}
      <button
        className={styles.hamburger}
        onClick={() => setShowMenu((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>

      {/* 🌀 Logo */}
      <Link href="/" className={styles.logoWrapper} onClick={() => setShowMenu(false)}>
        <div>
          <div className={styles.logoMain}>ANASTASIS 🌀</div>
          <div className={styles.logoSub}>Powered by Throwback AI</div>
        </div>
      </Link>

      {/* 🧭 Navigation */}
      <nav
        ref={navRef}
        className={`${styles.nav} ${showMenu ? styles.showMenu : ""}`}
      >
        <Link href="/" legacyBehavior>
          <a className={styles.navLink} onClick={() => setShowMenu(false)}>Home</a>
        </Link>
        <Link href="/replicate/restore-basic" legacyBehavior>
          <a className={styles.navLink} onClick={() => setShowMenu(false)}>Restore Image Basic</a>
        </Link>
        <Link href="/replicate/restore-premium" legacyBehavior>
          <a className={styles.navLink} onClick={() => setShowMenu(false)}>Restore Premium</a>
        </Link>
        <Link href="/about" legacyBehavior>
          <a className={styles.navLink} onClick={() => setShowMenu(false)}>About</a>
        </Link>

        {/* 🌟 Enhanced CTA Pricing Button */}
        <button
          onClick={goToPricing}
          className={`${styles.navBtn} ${styles.ctaGlowBtn}`}
          aria-label="See pricing plans"
        >
          💸 See Pricing Plans
        </button>

        {user ? (
          <>
            <Link href="/profile" legacyBehavior>
              <a className={styles.profileBtn} onClick={() => setShowMenu(false)}>Profile</a>
            </Link>
            <button
              onClick={handleSignOut}
              className={styles.signOutBtn}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" legacyBehavior>
              <a className={styles.navBtn} onClick={() => setShowMenu(false)}>Login</a>
            </Link>
            <Link href="/signup" legacyBehavior>
              <a className={styles.navBtn} onClick={() => setShowMenu(false)}>Sign Up</a>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
