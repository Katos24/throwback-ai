import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import styles from "../styles/Header.module.css";

export default function Header() {
  const router = useRouter();
  const navRef = useRef(null);

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Auth session
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

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setShowMenu(false);
    router.replace("/");
  };

  const navigationItems = [
    { href: "/replicate/restore-premium", label: "Restore" },
    { href: "/replicate/avatar", label: "Avatar" },
    { href: "/decades", label: "Decades" },
    { href: "/pricing", label: "Pricing" },
  ];

  if (isLoading) {
    return (
      <header className={styles.headerLoading}>
        <div className={styles.logoText}>Throwback AI</div>
      </header>
    );
  }

  // Close menu when clicking outside nav OR overlay
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showMenu && navRef.current && !navRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo} onClick={() => setShowMenu(false)}>
          <div className={styles.logoText}>Throwback AI</div>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${router.pathname === item.href ? styles.active : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className={styles.authButtons}>
          {user ? (
            <>
              <Link href="/profile" className={styles.profileBtn}>
                Profile
              </Link>
              <button onClick={handleSignOut} className={styles.signOutBtn}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.loginBtn}>
                Login
              </Link>
              <Link href="/signup" className={styles.signupBtn}>
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger / X */}
        <button
          className={styles.mobileMenuBtn}
          onClick={() => setShowMenu(!showMenu)}
          aria-label={showMenu ? "Close menu" : "Open menu"}
        >
          <span className={`${styles.hamburgerLine} ${showMenu ? styles.open : ""}`} />
          <span className={`${styles.hamburgerLine} ${showMenu ? styles.open : ""}`} />
          <span className={`${styles.hamburgerLine} ${showMenu ? styles.open : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <>
          <div
            className={styles.mobileMenuOverlay}
            onClick={() => setShowMenu(false)}
          />
          <nav ref={navRef} className={styles.mobileMenu}>
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.mobileNavLink} ${router.pathname === item.href ? styles.active : ""}`}
                onClick={() => setShowMenu(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className={styles.mobileAuthSection}>
              {user ? (
                <>
                  <Link href="/profile" className={styles.mobileProfileBtn} onClick={() => setShowMenu(false)}>
                    Profile
                  </Link>
                  <button onClick={handleSignOut} className={styles.mobileSignOutBtn}>
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className={styles.mobileLoginBtn} onClick={() => setShowMenu(false)}>
                    Login
                  </Link>
                  <Link href="/signup" className={styles.mobileSignupBtn} onClick={() => setShowMenu(false)}>
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
