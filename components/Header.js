import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import styles from "../styles/Header.module.css";

export default function Header({ showMenu, setShowMenu }) {
  const navRef = useRef(null);
  const restoreRef = useRef(null);
  const decadesRef = useRef(null);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showRestoreDropdown, setShowRestoreDropdown] = useState(false);
  const [showDecadesDropdown, setShowDecadesDropdown] = useState(false);
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
        setShowRestoreDropdown(false);
        setShowDecadesDropdown(false);
      }
      if (restoreRef.current && !restoreRef.current.contains(e.target)) {
        setShowRestoreDropdown(false);
      }
      if (decadesRef.current && !decadesRef.current.contains(e.target)) {
        setShowDecadesDropdown(false);
      }
    };
    if (showMenu || showRestoreDropdown || showDecadesDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu, showRestoreDropdown, showDecadesDropdown, setShowMenu]);

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

  const handleRestoreToggle = () => {
    setShowRestoreDropdown(!showRestoreDropdown);
    setShowDecadesDropdown(false);
  };

  const handleDecadesToggle = () => {
    setShowDecadesDropdown(!showDecadesDropdown);
    setShowRestoreDropdown(false);
  };

  const handleDropdownItemClick = () => {
    setShowRestoreDropdown(false);
    setShowDecadesDropdown(false);
    setShowMenu(false);
  };

  const navigationItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/pricing", label: "Pricing", icon: "💰" }
  ];

  const restoreItems = [
    { 
      href: "/replicate/restore-premium", 
      label: "Professional Colorization", 
      icon: "🎨",
      credits: "40 credits",
      premium: true
    },
    { 
      href: "/replicate/restore-basic", 
      label: "Quick Repair", 
      icon: "⚡",
      credits: "1 credit"
    },
  ];

  const decadesItems = [
    { 
      href: "/replicate/70s", 
      label: "70s Photos", 
      icon: "✌️",
      credits: "50 credits"
    },
    { 
      href: "/replicate/80s", 
      label: "80s Photos", 
      icon: "🎸",
      credits: "50 credits"
    },
    { 
      href: "/replicate/90s", 
      label: "90s Photos", 
      icon: "📼",
      credits: "50 credits",
      trending: true
    },
    { 
      href: "/replicate/2000s", 
      label: "2000s Photos", 
      icon: "💿",
      credits: "50 credits"
    }
  ];

  const isRestorePage = restoreItems.some(item => router.pathname === item.href);
  const isDecadesPage = decadesItems.some(item => router.pathname === item.href);
  const isHalloweenPage = router.pathname === "/replicate/halloween";

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
        
        {/* Decades Dropdown */}
        <div 
          className={styles.dropdownContainer}
          ref={decadesRef}
        >
          <button
            className={`${styles.dropdownTrigger} ${isDecadesPage ? styles.active : ""} ${showDecadesDropdown ? styles.dropdownOpen : ""}`}
            onClick={handleDecadesToggle}
            type="button"
          >
            <span className={styles.navIcon}>📸</span>
            <span>Decades</span>
            <span className={`${styles.dropdownArrow} ${showDecadesDropdown ? styles.dropdownArrowOpen : ""}`}>
              ▼
            </span>
          </button>
          
          <div className={`${styles.dropdownMenu} ${showDecadesDropdown ? styles.dropdownMenuOpen : ""}`}>
            {decadesItems.map((item) => (
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
                    {item.trending && <span className={styles.trendingBadge}>🔥 Trending</span>}
                  </div>
                  <div className={styles.dropdownItemCredits}>{item.credits}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Restore Dropdown */}
        <div 
          className={styles.dropdownContainer}
          ref={restoreRef}
        >
          <button
            className={`${styles.dropdownTrigger} ${isRestorePage ? styles.active : ""} ${showRestoreDropdown ? styles.dropdownOpen : ""}`}
            onClick={handleRestoreToggle}
            type="button"
          >
            <span className={styles.navIcon}>🔧</span>
            <span>Restore</span>
            <span className={`${styles.dropdownArrow} ${showRestoreDropdown ? styles.dropdownArrowOpen : ""}`}>
              ▼
            </span>
          </button>
          
          <div className={`${styles.dropdownMenu} ${showRestoreDropdown ? styles.dropdownMenuOpen : ""}`}>
            {restoreItems.map((item) => (
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
                    {item.premium && <span className={styles.trendingBadge}>Premium</span>}
                  </div>
                  <div className={styles.dropdownItemCredits}>{item.credits}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Halloween Button - Standalone */}
        <Link 
          href="/replicate/halloween"
          prefetch 
          className={`${styles.navLink} ${isHalloweenPage ? styles.active : ""}`}
          onClick={() => setShowMenu(false)}
        >
          <span className={styles.navIcon}>🎃</span>
          <span>Halloween</span>
        </Link>

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