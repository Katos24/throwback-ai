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
      {/* ✅ LOGO LINK */}
     <Link href="/" className={styles.logoGroup} onClick={() => setShowMenu(false)}>
      <div>
        <div className={styles.logoMain}>ANASTASIS 🌀</div>
        <div className={styles.logoSub}>Powered by Throwback AI</div>
      </div>
    </Link>



      {/* Hamburger */}
      <button
        className={styles.hamburger}
        onClick={() => setShowMenu(!showMenu)}
        aria-label="Toggle menu"
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>

      {/* Nav Menu */}
      <nav
        ref={navRef}
        className={`${styles.nav} ${showMenu ? styles.showMenu : ""}`}
      >
        <Link href="/" legacyBehavior>
          <a className={styles.navLink} onClick={() => setShowMenu(false)}>
            Home
          </a>
        </Link>

        <Link href="/replicate/restore-basic" legacyBehavior>
          <a className={styles.navLink} onClick={() => setShowMenu(false)}>
            Restore Image Basic
          </a>
        </Link>

        <Link href="/replicate/restore-premium" legacyBehavior>
          <a className={styles.navLink} onClick={() => setShowMenu(false)}>
            Restore Premium
          </a>
        </Link>

        <Link href="/about" legacyBehavior>
          <a className={styles.navLink} onClick={() => setShowMenu(false)}>
            About
          </a>
        </Link>

        <Link href="/pricing" legacyBehavior>
          <a className={styles.navLink} onClick={() => setShowMenu(false)}>
            Pricing
          </a>
        </Link>

        {user ? (
          <>
            <Link href="/profile" legacyBehavior>
              <a className={styles.profileBtn} onClick={() => setShowMenu(false)}>
                Profile
              </a>
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
            <Link href="/login" legacyBehavior>
              <a className={styles.navBtn} onClick={() => setShowMenu(false)}>
                Login
              </a>
            </Link>
            <Link href="/signup" legacyBehavior>
              <a className={styles.navBtn} onClick={() => setShowMenu(false)}>
                Sign Up
              </a>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
