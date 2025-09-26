import Link from "next/link";
import styles from "../styles/Footer.module.css";

export default function Footer() {
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
