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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setIsLoading(false);
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
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
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

  const navigationItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { 
      href: "/replicate/restore-premium", 
      label: "Restore", 
      icon: "✨",
      highlight: true
    },
    { 
      href: "/decades", 
      label: "Decades", 
      icon: "📸"
    },
     { 
      href: "/aisuite", 
      label: "All Tools", 
      highlight: false
    },
    { href: "/pricing", label: "Pricing", icon: "💰" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" }
  ];

  if (isLoading) {
    return (
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: '60px',
        background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '1.5rem',
          fontWeight: 800,
          fontFamily: 'Inter, sans-serif'
        }}>
          Throwback AI
        </div>
      </header>
    );
  }

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
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

      <Link href="/" prefetch className={styles.logoWrapper} onClick={() => setShowMenu(false)}>
        <div className={styles.logoContainer}>
          <div className={styles.logoText}>
            <div className={styles.logoMain}>Throwback AI</div>
          </div>
        </div>
      </Link>

      <nav ref={navRef} className={`${styles.nav} ${showMenu ? styles.showMenu : ""}`}>
        
        {/* Navigation Items */}
        {navigationItems.map((item) => (
          <Link 
            key={item.href}
            href={item.href} 
            prefetch 
            className={`${styles.navLink} ${router.pathname === item.href ? styles.active : ""} ${item.highlight ? styles.highlight : ""}`}
            onClick={() => setShowMenu(false)}
          >
            {item.icon && <span className={styles.navIcon}>{item.icon}</span>}
            <span>{item.label}</span>
          </Link>
        ))}

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