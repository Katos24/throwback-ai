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
        >
          {isOAuthLoading ? (
            <span className={authStyles.spinner} aria-label="Loading..." />
          ) : (
            <>
              {/* Google SVG icon here */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                fill="none"
                aria-hidden="true"
                className={authStyles.googleIcon}
                width="20"
                height="20"
              >
                {/* SVG paths omitted */}
              </svg>
              Log in with Google
            </>
          )}
        </button>
        <div className={styles.infoText}>or use your email and password</div>
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
        >
          {isOAuthLoading ? (
            <span className={authStyles.spinner} aria-label="Loading..." />
          ) : (
            <>
              {/* Google SVG icon here */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                fill="none"
                aria-hidden="true"
                className={authStyles.googleIcon}
                width="20"
                height="20"
              >
                {/* SVG paths omitted */}
              </svg>
              Sign up with Google
            </>
          )}
        </button>
        <div className={styles.infoText}>or use your email and password</div>
        <SignupForm
          isDisabled={isOAuthLoading}
          onSuccess={() => {
            closeModal();
            alert("✅ Signup successful! Check your email.");
          }}
          onError={(msg) => alert(msg)}
        />
      </Modal>
    </>
  );
}
