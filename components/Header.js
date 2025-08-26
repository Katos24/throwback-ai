import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import styles from "../styles/Header.module.css";

export default function Header({ showMenu, setShowMenu }) {
  const navRef = useRef(null);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setIsLoading(false); // Set loading to false after auth check
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
        setShowDropdown(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    if (showMenu || showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu, showDropdown, setShowMenu]);

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
    setShowDropdown(false);
    router.push("/pricing");
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDropdownItemClick = () => {
    setShowDropdown(false);
    setShowMenu(false);
  };

  const navigationItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/gallery", label: "Gallery", icon: "🖼️" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/about", label: "About" }
  ];

  const aiSuiteItems = [
    { 
      href: "/replicate/restore-basic", 
      label: "Photo Restoration", 
      icon: "🔧",
      description: "Repair scratches & damage",
      credits: "1 Credit"
    },
    { 
      href: "/replicate/restore-premium", 
      label: "Photo Colorization", 
      icon: "🌈",
      description: "Add beautiful colors",
      credits: "40 Credits",
      badge: "Premium"
    },
    { 
      href: "/replicate/cartoon", 
      label: "Cartoon Creator", 
      icon: "🎨",
      description: "Transform to cartoon art",
      credits: "40 Credits",
      badge: "New"
    }
  ];

  // Check if current page is in AI Suite
  const isAISuitePage = aiSuiteItems.some(item => router.pathname === item.href);

  // Prevent CSS flash by ensuring styles are loaded
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
          background: 'linear-gradient(135deg, #00d4ff, #5b73ff, #00ffff)',
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
      {/* Hamburger */}
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

      {/* Updated Logo */}
      <Link href="/" prefetch className={styles.logoWrapper} onClick={() => setShowMenu(false)}>
        <div className={styles.logoContainer}>
          <div className={styles.logoIcon}>🤖</div>
          <div className={styles.logoText}>
            <div className={styles.logoMain}>Throwback AI</div>
          </div>
        </div>
      </Link>

      {/* Enhanced Nav Links */}
      <nav ref={navRef} className={`${styles.nav} ${showMenu ? styles.showMenu : ""}`}>
        
        {/* AI Suite Dropdown */}
        <div 
          className={styles.dropdownContainer}
          ref={dropdownRef}
        >
          <button
            className={`${styles.dropdownTrigger} ${isAISuitePage ? styles.active : ""} ${showDropdown ? styles.dropdownOpen : ""}`}
            onClick={handleDropdownToggle}
            type="button"
          >
            <span className={styles.navIcon}>⚡</span>
            <span>AI Suite</span>
            <span className={`${styles.dropdownArrow} ${showDropdown ? styles.dropdownArrowOpen : ""}`}>
              ▼
            </span>
          </button>
          
          <div className={`${styles.dropdownMenu} ${showDropdown ? styles.dropdownMenuOpen : ""}`}>
            <div className={styles.dropdownHeader}>
              <span className={styles.dropdownTitle}>Choose Your AI Engine</span>
            </div>
            
            {aiSuiteItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                className={`${styles.dropdownItem} ${router.pathname === item.href ? styles.active : ""}`}
                onClick={handleDropdownItemClick}
              >
                <div className={styles.dropdownItemIcon}>{item.icon}</div>
                <div className={styles.dropdownItemContent}>
                  <div className={styles.dropdownItemHeader}>
                    <span className={styles.dropdownItemName}>{item.label}</span>
                    {item.badge && <span className={styles.dropdownBadge}>{item.badge}</span>}
                  </div>
                  <div className={styles.dropdownItemDescription}>{item.description}</div>
                  <div className={styles.dropdownItemCredits}>{item.credits}</div>
                </div>
              </Link>
            ))}
            
            <div className={styles.dropdownFooter}>
              <Link
                href="/aisuite"
                className={styles.viewAllLink}
                onClick={handleDropdownItemClick}
              >
                View Full AI Suite →
              </Link>
            </div>
          </div>
        </div>

        {/* Regular Navigation Items */}
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