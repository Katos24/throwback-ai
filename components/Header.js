import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import styles from "../styles/Header.module.css";

export default function Header({ showMenu, setShowMenu }) {
  const navRef = useRef(null);
  const aiSuiteRef = useRef(null);
  const decadesRef = useRef(null);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAISuiteDropdown, setShowAISuiteDropdown] = useState(false);
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
        setShowAISuiteDropdown(false);
        setShowDecadesDropdown(false);
      }
      if (aiSuiteRef.current && !aiSuiteRef.current.contains(e.target)) {
        setShowAISuiteDropdown(false);
      }
      if (decadesRef.current && !decadesRef.current.contains(e.target)) {
        setShowDecadesDropdown(false);
      }
    };
    if (showMenu || showAISuiteDropdown || showDecadesDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu, showAISuiteDropdown, showDecadesDropdown, setShowMenu]);

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

  const handleAISuiteToggle = () => {
    setShowAISuiteDropdown(!showAISuiteDropdown);
    setShowDecadesDropdown(false);
  };

  const handleDecadesToggle = () => {
    setShowDecadesDropdown(!showDecadesDropdown);
    setShowAISuiteDropdown(false);
  };

  const handleDropdownItemClick = () => {
    setShowAISuiteDropdown(false);
    setShowDecadesDropdown(false);
    setShowMenu(false);
  };

  const navigationItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/pricing", label: "Pricing", icon: "💰" }
  ];

  const aiSuiteItems = [
    { 
      href: "/replicate/restore-premium", 
      label: "Photo Colorization", 
      icon: "🌈",
      description: "Add beautiful colors to photos",
      credits: "40 Credits",
      badge: "Premium"
    },
    { 
      href: "/replicate/restore-basic", 
      label: "Photo Restoration", 
      icon: "🔧",
      description: "Repair scratches & damage",
      credits: "1 Credit"
    }
  ];

  const decadesItems = [
    { 
      href: "/replicate/70s", 
      label: "70s Yearbook", 
      icon: "📺",
      description: "Groovy 70s vibes",
      credits: "50 Credits"
    },
    { 
      href: "/replicate/80s", 
      label: "80s Yearbook", 
      icon: "📻",
      description: "Totally rad 80s style",
      credits: "50 Credits"
    },
    { 
      href: "/replicate/90s", 
      label: "90s Yearbook", 
      icon: "💾",
      description: "Radical 90s digital look",
      credits: "50 Credits"
    },
    { 
      href: "/replicate/2000s", 
      label: "2000s Yearbook", 
      icon: "💻",
      description: "Y2K millennium style",
      credits: "50 Credits"
    }
  ];

  const isAISuitePage = aiSuiteItems.some(item => router.pathname === item.href);
  const isDecadesPage = decadesItems.some(item => router.pathname === item.href);

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
        
        {/* AI Suite Dropdown */}
        <div 
          className={styles.dropdownContainer}
          ref={aiSuiteRef}
        >
          <button
            className={`${styles.dropdownTrigger} ${isAISuitePage ? styles.active : ""} ${showAISuiteDropdown ? styles.dropdownOpen : ""}`}
            onClick={handleAISuiteToggle}
            type="button"
          >
            <span className={styles.navIcon}>🔧</span>
            <span>Restore</span>
            <span className={`${styles.dropdownArrow} ${showAISuiteDropdown ? styles.dropdownArrowOpen : ""}`}>
              ▼
            </span>
          </button>
          
          <div className={`${styles.dropdownMenu} ${showAISuiteDropdown ? styles.dropdownMenuOpen : ""}`}>
            <div className={styles.dropdownHeader}>
              <span className={styles.dropdownTitle}>Restoration Tools</span>
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
          </div>
        </div>

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
            <div className={styles.dropdownHeader}>
              <span className={styles.dropdownTitle}>Yearbook Styles</span>
            </div>
            
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
                  </div>
                  <div className={styles.dropdownItemDescription}>{item.description}</div>
                  <div className={styles.dropdownItemCredits}>{item.credits}</div>
                </div>
              </Link>
            ))}
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