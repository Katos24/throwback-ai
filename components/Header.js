import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import Modal from "./Modal";
import { LoginForm } from "./Auth/LoginForm";
import { SignupForm } from "./Auth/SignupForm";
import styles from "../styles/Header.module.css";
import authStyles from "../styles/Login.module.css";

export default function Header({ showMenu, setShowMenu }) {
  const navRef = useRef(null);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [modalType, setModalType] = useState(null); // 'login' | 'signup' | null
  const [isOAuthLoading, setOAuthLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu, setShowMenu]);

  const openModal = (type) => {
    setModalType(type);
    setShowMenu(false);
  };
  const closeModal = () => setModalType(null);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    closeModal();
    setShowMenu(false);
    router.replace("/");
  };

  const goToPricing = () => {
    setShowMenu(false);
    router.push("/pricing");
  };

  const handleOAuth = async (provider) => {
    setOAuthLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: { prompt: "select_account" },
      },
    });
    if (error) {
      alert(error.message || "OAuth failed");
      setOAuthLoading(false);
    }
  };

  return (
    <>
      <header className={styles.header}>
        {/* 🍔 Hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setShowMenu((prev) => !prev)}
          aria-label="Toggle menu"
          type="button"
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>

        {/* 🌀 Logo */}
        <Link href="/" prefetch className={styles.logoWrapper} onClick={() => setShowMenu(false)}>
          <div>
            <div className={styles.logoMain}>ANASTASIS 🌀</div>
            <div className={styles.logoSub}>Powered by Throwback AI</div>
          </div>
        </Link>

        {/* 🧭 Nav Links */}
        <nav ref={navRef} className={`${styles.nav} ${showMenu ? styles.showMenu : ""}`}>
          <Link href="/" prefetch className={styles.navLink} onClick={() => setShowMenu(false)}>
            Home
          </Link>
          <Link href="/replicate/restore-basic" prefetch className={styles.navLink} onClick={() => setShowMenu(false)}>
            Photo Fix
          </Link>
          <Link href="/replicate/restore-premium" prefetch className={styles.navLink} onClick={() => setShowMenu(false)}>
            Photo Revival
          </Link>
          <Link href="/gallery" prefetch className={styles.navLink} onClick={() => setShowMenu(false)}>
            Gallery
          </Link>
          <Link href="/about" prefetch className={styles.navLink} onClick={() => setShowMenu(false)}>
            About
          </Link>

          <button
            onClick={goToPricing}
            className={`${styles.navBtn} ${styles.ctaGlowBtn}`}
            type="button"
          >
            💸 See Pricing Plans
          </button>

          {user ? (
            <>
              <Link href="/profile" prefetch className={styles.profileBtn} onClick={() => setShowMenu(false)}>
                Profile
              </Link>
              <button onClick={handleSignOut} className={styles.signOutBtn} type="button">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button onClick={() => openModal("login")} className={styles.navBtn} type="button">
                Login
              </button>
              <button onClick={() => openModal("signup")} className={styles.navBtn} type="button">
                Sign Up
              </button>
            </>
          )}
        </nav>
      </header>

      {/* Login Modal */}
      <Modal isOpen={modalType === "login"} onClose={closeModal} title="Log In">
        <button
          type="button"
          className={authStyles.googleButton}
          onClick={() => handleOAuth("google")}
          disabled={isOAuthLoading}
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px" }}
        >
          <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  aria-hidden="true"
  style={{ display: "block" }}
>
  <path fill="#4285F4" d="M23.64 12.2c0-.82-.07-1.61-.2-2.37H12v4.48h6.36a5.43 5.43 0 01-2.36 3.57v2.97h3.82c2.23-2.05 3.52-5.07 3.52-8.65z" />
  <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.82-2.97c-1.06.7-2.43 1.12-4.13 1.12-3.17 0-5.85-2.14-6.81-5.03H1.26v3.15A11.996 11.996 0 0012 24z" />
  <path fill="#FBBC05" d="M5.19 14.21a7.2 7.2 0 010-4.42V6.64H1.26a11.98 11.98 0 000 10.72l3.93-3.15z" />
  <path fill="#EA4335" d="M12 4.48c1.77 0 3.35.61 4.6 1.81l3.45-3.45C17.96 1.07 15.24 0 12 0 7.92 0 4.27 2.42 2.7 5.87l3.93 3.15c.94-2.89 3.62-5.03 6.81-5.03z" />
</svg>
          Log in with Google
        </button>
        <div className={styles.infoText}>
          Or enter your email below to receive a magic login link.
        </div>
        <LoginForm
          isDisabled={isOAuthLoading}
          onSuccess={() => {
            closeModal();
            router.replace("/");
          }}
          onError={(msg) => alert(msg)}
        />
      </Modal>

      {/* Signup Modal */}
      <Modal isOpen={modalType === "signup"} onClose={closeModal} title="Sign Up">
        <button
          type="button"
          className={authStyles.googleButton}
          onClick={() => handleOAuth("google")}
          disabled={isOAuthLoading}
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px" }}
        >
          {isOAuthLoading ? (
            <span className={authStyles.spinner} aria-label="Loading..." />
          ) : (
            <>
             <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  aria-hidden="true"
  style={{ display: "block" }}
>
  <path fill="#4285F4" d="M23.64 12.2c0-.82-.07-1.61-.2-2.37H12v4.48h6.36a5.43 5.43 0 01-2.36 3.57v2.97h3.82c2.23-2.05 3.52-5.07 3.52-8.65z" />
  <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.82-2.97c-1.06.7-2.43 1.12-4.13 1.12-3.17 0-5.85-2.14-6.81-5.03H1.26v3.15A11.996 11.996 0 0012 24z" />
  <path fill="#FBBC05" d="M5.19 14.21a7.2 7.2 0 010-4.42V6.64H1.26a11.98 11.98 0 000 10.72l3.93-3.15z" />
  <path fill="#EA4335" d="M12 4.48c1.77 0 3.35.61 4.6 1.81l3.45-3.45C17.96 1.07 15.24 0 12 0 7.92 0 4.27 2.42 2.7 5.87l3.93 3.15c.94-2.89 3.62-5.03 6.81-5.03z" />
</svg>
              Sign up with Google
            </>
          )}
        </button>
        <div className={styles.infoText}>
          Or enter your email below to receive a magic login link.
        </div>
        <SignupForm
          isDisabled={isOAuthLoading}
          onSuccess={() => {
            closeModal();
            alert("✅ Signup successful! Please check your email for the magic link.");
          }}
          onError={(msg) => alert(msg)}
        />
      </Modal>
    </>
  );
}
