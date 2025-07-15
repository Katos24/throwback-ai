import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <p className={styles.footerText}>
          © 2025 <strong>Throwback AI</strong> — Built with love & VHS static
        </p>
        <nav className={styles.footerLinks}>
          <Link href="/terms">Terms of Use</Link>
          <span className={styles.separator}>•</span>
          <Link href="/privacy">Privacy Policy</Link>
        </nav>
      </div>
    </footer>
  );
}
