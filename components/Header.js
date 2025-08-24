import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import styles from "../styles/Header.module.css";

export default function Header({ showMenu, setShowMenu }) {
  const navRef = useRef(null);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setShowMenu(false);
    router.replace("/");
  };

  const goToPricing = () => {
    setShowMenu(false);
    router.push("/pricing");
  };

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/replicate/restore-basic", label: "Photo Fix", icon: "🔧" },
    { href: "/replicate/restore-premium", label: "Full Color Restore", icon: "🎨", badge: "Premium" },
    { href: "/replicate/cartoon", label: "Cartoon", icon: "🎭", badge: "New" },
    { href: "/gallery", label: "Gallery", icon: "🖼️" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/about", label: "About" }
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      {/* 🍔 Hamburger */}
      <button
        className={styles.hamburger}
        onClick={() => setShowMenu((prev) => !prev)}
        aria-label="Toggle menu"
        type="button"
      >
        <span className={`${styles.bar} ${showMenu ? styles.barActive : ""}`} />
        <span className={`${styles.bar} ${showMenu ? styles.barActive : ""}`} />
        <span className={`${styles.bar} ${showMenu ? styles.barActive : ""}`} />
      </button>

      {/* 🌀 Enhanced Logo */}
      <Link href="/" prefetch className={styles.logoWrapper} onClick={() => setShowMenu(false)}>
        <div className={styles.logoContainer}>
          <div className={styles.logoIcon}>🌀</div>
          <div className={styles.logoText}>
            <div className={styles.logoMain}>ANASTASIS</div>
            <div className={styles.logoSub}>Powered by Throwback AI</div>
          </div>
        </div>
      </Link>

      {/* 🧭 Enhanced Nav Links */}
      <nav ref={navRef} className={`${styles.nav} ${showMenu ? styles.showMenu : ""}`}>
        {navigationItems.map((item) => (
          <Link 
            key={item.href}
            href={item.href} 
            prefetch 
            className={`${styles.navLink} ${router.pathname === item.href ? styles.active : ""}`}
            onClick={() => setShowMenu(false)}
          >
            {item.icon && <span className={styles.navIcon}>{item.icon}</span>}
            <span>{item.label}</span>
            {item.badge && <span className={styles.badge}>{item.badge}</span>}
          </Link>
        ))}

        <button
          onClick={goToPricing}
          className={`${styles.navBtn} ${styles.ctaGlowBtn}`}
          type="button"
        >
          <span className={styles.ctaIcon}>💫</span>
          See Pricing Plans
        </button>

        {user ? (
          <div className={styles.userSection}>
            <Link href="/profile" prefetch className={styles.profileBtn} onClick={() => setShowMenu(false)}>
              <span className={styles.profileIcon}>👤</span>
              Profile
            </Link>
            <button onClick={handleSignOut} className={styles.signOutBtn} type="button">
              Sign Out
            </button>
          </div>
        ) : (
          <div className={styles.authSection}>
            <Link 
              href="/login" 
              prefetch 
              className={styles.loginBtn} 
              onClick={() => setShowMenu(false)}
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              prefetch 
              className={styles.signupBtn} 
              onClick={() => setShowMenu(false)}
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}