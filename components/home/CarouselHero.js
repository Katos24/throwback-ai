"use client"; // ← must be first, before imports
import React, { useState } from "react";
import Link from "next/link";
import styles from "../../styles/CarouselHero.module.css";

export default function HeroSection() {
  const items = [
    {
      id: "restore-1",
      image: "/images/restore-card.png",
      category: "Photo Restoration",
      link: "replicate/restore-basic",
      description: "Repair scratches, tears, water damage, and fading from irreplaceable family photos. Bring back memories you thought were lost forever.",
      credits: 1,
      buttonText: "Restore (Try Free)"
    },
    {
      id: "restore-2",
      image: "/images/photo-colorization-card.jpg",
      category: "Colorize B&W Photo",
      link: "replicate/restore-premium",
      description: "Watch your ancestors come alive as our AI adds historically accurate, vibrant colors to black and white family photos from any era.",
      credits: 40,
      buttonText: "Add Color"
    },
    {
      id: "yearbook-1",
      image: "/images/yearbook-card-home.jpg",
      category: "90s Yearbook",
      link: "replicate/yearbook",
      description: "Go back in time! Get that classic 90s school portrait look with vintage styling, perfect for nostalgia lovers and social media.",
      credits: 20,
      buttonText: "Go Retro"
    },
    {
      id: "avatar-1",
      image: "/images/avatar-after.jpg",
      category: "Professional Avatar",
      link: "replicate/avatar",
      description: "Create polished, throwback headshots and avatars perfect for social media, LinkedIn, business cards, or any platform where you want to look your best.",
      credits: 50,
      buttonText: "Create Avatar"
    },
    {
      id: "cartoon-1",
      image: "/images/cartoon-card.png",
      category: "Cartoon Art",
      link: "replicate/cartoon",
      description: "Transform yourself, friends, or pets into stunning cartoon artwork. Perfect for gifts, profile pictures, or just having fun!",
      credits: 40,
      buttonText: "Make Cartoon"
    },
  ];

  // useState **must** be in a client component
  // remove any `<"restore" | "other">` generics in JS
  const [activeTab, setActiveTab] = useState("restore");

  // split out your two groups
  const restoreItems = items.slice(0, 2);
  const otherItems = items.slice(2);
  const displayed = activeTab === "restore" ? restoreItems : otherItems;

  return (
    <section className={styles.simpleHero}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            Transform Any Photo Into
            <span className={styles.gradient}> Something Amazing</span>
          </h1>
          <p className={styles.subtitle}>
            From restoring precious family memories to creating fun modern art - our AI transforms your photos in seconds. 
            <strong> Preserve the past or reimagine the present.</strong>
          </p>
        </header>

        {/* Tabs */}
        <nav className={styles.tabsNav}>
          <button
            className={`${styles.tabButton} ${
              activeTab === "restore" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("restore")}
          >
            <span className={styles.tabIcon}>✨</span>
            Enhance & Restore
          </button>
          <button
            className={`${styles.tabButton} ${
              activeTab === "other" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("other")}
          >
            <span className={styles.tabIcon}>🎨</span>
            Create & Transform
          </button>
        </nav>

        {/* Tab Description */}
        <div className={styles.tabDescription}>
          {activeTab === "restore" ? (
            <p>Breathe new life into old, damaged, or black and white photos. Perfect for preserving family history and cherished memories.</p>
          ) : (
            <p>Express your creativity with fun transformations. Turn photos into artwork, vintage styles, or professional avatars.</p>
          )}
        </div>

        {/* Card Grid */}
        <div className={styles.grid}>
          {displayed.map((it) => (
            <div key={it.id} className={styles.card}>
              <Link href={it.link} className={styles.cardLink}>
                <div className={styles.imgWrap}>
                  <img
                    src={it.image}
                    alt={it.category}
                    className={styles.img}
                  />
                  <span className={styles.overlayButton}>
                    {it.buttonText}
                  </span>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardLabel}>{it.category}</div>
                  <p className={styles.cardDescription}>{it.description}</p>
                  <div className={styles.creditInfo}>
                    <span className={styles.creditCost}>{it.credits}</span>
                    <span className={styles.creditLabel}>{it.credits === 1 ? 'Credit' : 'Credits'}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <div className={styles.statNumber}>50K+</div>
            <div className={styles.statLabel}>Families Helped</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>2.3s</div>
            <div className={styles.statLabel}>Average Results</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>98%</div>
            <div className={styles.statLabel}>Love Their Results</div>
          </div>
        </div>

        {/* Trust Bar */}
        <div className={styles.trustBar}>
          <div className={styles.trustItem}>
            <span className={styles.checkmark}>✓</span>50K+ Photos Transformed
          </div>
          <div className={styles.trustItem}>
            <span className={styles.checkmark}>✓</span>Fast Results
          </div>
          <div className={styles.trustItem}>
            <span className={styles.checkmark}>✓</span>Private & Secure
          </div>
          <div className={styles.trustItem}>
            <span className={styles.checkmark}>✓</span>Photos Deleted After 1 Hour
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={styles.bottomCTA}>
          <div className={styles.creditOffer}>
            <div className={styles.offerIcon}>⚡</div>
            <div className={styles.offerText}>
              <strong>Try It Free Right Now</strong>
              <span className={styles.offerDetails}>
                <Link href="/pricing" className={styles.ctaLink}>Get 5 Free Credits</Link> • No credit card needed
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}