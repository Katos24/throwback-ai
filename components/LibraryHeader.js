import React from 'react';
import Link from 'next/link';
import styles from './LibraryHeader.module.css';

export default function LibraryHeader({ variant = 'default' }) {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        Throwback AI
      </Link>
      
      <nav className={styles.nav}>
        <Link href="/library">For Libraries</Link>
        <Link href="/library/demo" className={styles.ctaBtn}>
          Request Demo
        </Link>
      </nav>
    </header>
  );
}