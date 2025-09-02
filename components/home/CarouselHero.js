import React from "react";
import Link from "next/link";
import styles from "../../styles/CarouselHero.module.css";

export default function HeroSection() {
  const items = [
    { id: "restore-1", image: "/images/basicpage-after.jpg", category: "Photo Restoration", link: "replicate/restore-basic" },
    { id: "restore-2", image: "/images/photo-colorization-card.jpg", category: "Colorize B&W Photo", link: "replicate/restore-premium" },
    { id: "cartoon-1", image: "/images/cartoon-example.jpg", category: "Cartoon Art", link: "replicate/cartoon" },
    { id: "yearbook-1", image: "/images/yearbook-card-home.jpg", category: "90s Yearbook", link: "replicate/yearbook" },
    { id: "avatar-1", image: "/images/avatar-after.jpg", category: "Professional Avatar", link: "replicate/avatar" },
  ];

  return (
    <section className={styles.simpleHero}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Pick a Transformation</h1>
          <p className={styles.subtitle}>Choose one of the styles below to see examples and try it out.</p>
        </header>

        <div className={styles.grid}>
          {items.map((it) => (
            <div key={it.id} className={styles.card}>
              <Link href={it.link} className={styles.cardLink} aria-label={`Go to ${it.category}`}>
                <div className={styles.imgWrap}>
                  <img src={it.image} alt={it.category} className={styles.img} />
                  <span className={styles.overlayButton}>Go to Page</span>
                </div>
                <div className={styles.cardLabel}>{it.category}</div>
              </Link>
            </div>
          ))}
        </div>

        <div className={styles.trustBar}>
          <div className={styles.trustItem}><span className={styles.checkmark}>✓</span>50K+ Photos Transformed</div>
          <div className={styles.trustItem}><span className={styles.checkmark}>✓</span>Fast Results</div>
          <div className={styles.trustItem}><span className={styles.checkmark}>✓</span>Private & Secure</div>
        </div>
      </div>
    </section>
  );
}
