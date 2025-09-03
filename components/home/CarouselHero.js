"use client"; // ← must be first, before imports
import React from "react";
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
      buttonText: "Restore (Try Free)",
      badgeColor: "success"
    },
    {
      id: "restore-2",
      image: "/images/photo-colorization-card.jpg",
      category: "Colorize B&W Photo",
      link: "replicate/restore-premium",
      description: "Watch your ancestors come alive as our AI adds historically accurate, vibrant colors to black and white family photos from any era.",
      credits: 40,
      buttonText: "Add Color",
      badge: "Most Popular",
      badgeColor: "premium"
    },
    {
      id: "yearbook-1",
      image: "/images/yearbook-card-home.jpg",
      category: "90s Yearbook",
      link: "replicate/yearbook",
      description: "Go back in time! Get that classic 90s school portrait look with vintage styling, perfect for nostalgia lovers and social media.",
      credits: 20,
      buttonText: "Go Retro",
      badge: "Trending",
      badgeColor: "trending"
    },
    {
      id: "avatar-1",
      image: "/images/avatar-after.jpg",
      category: "Professional Avatar",
      link: "replicate/avatar",
      description: "Create polished, throwback headshots and avatars perfect for social media, LinkedIn, business cards, or any platform where you want to look your best.",
      credits: 50,
      buttonText: "Create Avatar",
      badge: "Pro",
      badgeColor: "pro"
    },
    {
      id: "cartoon-1",
      image: "/images/cartoon-card.png",
      category: "Cartoon Art",
      link: "replicate/cartoon",
      description: "Transform yourself, friends, or pets into stunning cartoon artwork. Perfect for gifts, profile pictures, or just having fun!",
      credits: 40,
      buttonText: "Make Cartoon",
      badge: "Fun",
      badgeColor: "fun"
    },
  ];

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
          <p className={styles.subDescription}>
            Choose from restoration tools to bring old photos back to life, or explore creative transformations for something completely new. All powered by advanced AI technology.
          </p>
        </header>

        {/* All Cards in One Grid - No Tabs */}
        <div className={styles.grid}>
          {items.map((item) => (
            <div key={item.id} className={styles.card}>
              <Link href={item.link} className={styles.cardLink}>
                <div className={styles.imgWrap}>
                  {item.badge && (
                    <div className={`${styles.cardBadge} ${styles[item.badgeColor]}`}>
                      {item.badge}
                    </div>
                  )}
                  <img
                    src={item.image}
                    alt={item.category}
                    className={styles.img}
                  />
                  <span className={styles.overlayButton}>
                    {item.buttonText}
                  </span>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardLabel}>{item.category}</div>
                  <p className={styles.cardDescription}>{item.description}</p>
                  <div className={styles.creditInfo}>
                    <span className={styles.creditCost}>{item.credits}</span>
                    <span className={styles.creditLabel}>{item.credits === 1 ? 'Credit' : 'Credits'}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Processing Stats */}
        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <div className={styles.statNumber}>2.3s</div>
            <div className={styles.statLabel}>Processing Time</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>99.7%</div>
            <div className={styles.statLabel}>Accuracy Rate</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>4K</div>
            <div className={styles.statLabel}>Max Resolution</div>
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