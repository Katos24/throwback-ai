import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerLeft}>
          <p className={styles.logo}>Throwback AI</p>
          <p className={styles.tagline}>
            Bring your precious memories back to life
          </p>
          <p className={styles.copyright}>
            © 2025 Throwback AI. All rights reserved.
          </p>
          {isMounted && (
            <div
              className="trustpilot-widget"
              data-locale="en-US"
              data-template-id="56278e9abfbbba0bdcd568bc"
              data-businessunit-id="68dc47435bbef0b49f81823c"
              data-style-height="52px"
              data-style-width="100%"
              data-theme="light"
              data-token="2fe1f850-5e45-401c-9ce9-15afd96f6f52"
              style={{ marginTop: '1rem', marginBottom: '1rem' }}
            >
              <a
                href="https://www.trustpilot.com/review/throwbackai.app"
                target="_blank"
                rel="noopener"
              >
                Trustpilot
              </a>
            </div>
          )}
        </div>
        <div className={styles.footerNav}>
          <div>
            <h4>Services</h4>
            <ul>
              <li>
                <Link href="/replicate/restore-basic">Photo Restoration</Link>
              </li>
              <li>
                <Link href="/replicate/restore-premium">AI Colorization</Link>
              </li>
              <li>
                <Link href="/decades">Decades</Link>
              </li>
              <li>
                <Link href="/replicate/avatar">Avatar Creator</Link>
              </li>
              <li>
                <Link href="/replicate/cartoon">Cartoon Creator</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/how-it-works">How it Works</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/refund-policy">Refund Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}