import Link from "next/link";
import styles from "../styles/home.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerLeft}>
          <p className={styles.logo}>Throwback AI</p>
          <p className={styles.tagline}>
            Built with love & VHS static
          </p>
          <p className={styles.copyright}>
            © 2025 Throwback AI. All rights reserved.
          </p>
        </div>

        <div className={styles.footerNav}>
          <div>
            <h4>Product</h4>
            <ul>
              <li><Link href="/replicate/restore-basic">Photo Fix</Link></li>
              <li><Link href="/replicate/restore-premium">Photo Revival</Link></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li><Link href="/terms">Terms</Link></li>
              <li><Link href="/privacy">Privacy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
