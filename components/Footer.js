import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      © 2025 Throwback AI • Built with love + VHS static <br />
      <Link href="/terms">Terms of Use</Link> | <Link href="/privacy">Privacy Policy</Link>
    </footer>
  );
}
