// pages/gallery.js
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Gallery.module.css'

const galleryItems = [
  {
    before: "/images/weddingbefore.jpg",
    after: "/images/weddingafter.jpg",
    category: "Wedding Photos",
    year: "1952",
    description: "Vintage wedding portrait with full colorization"
  },
  {
    before: "/images/before2.jpg",
    after: "/images/after2.jpg", 
    category: "Family Photos",
    year: "1938",
    description: "Multi-generational family photo restoration"
  },
  {
    before: "/images/before8.jpg",
    after: "/images/after8.jpg",
    category: "Military Photos", 
    year: "1945",
    description: "WWII military portrait with uniform colorization"
  },
  {
    before: "/images/before4.jpg",
    after: "/images/after4.jpg",
    category: "Memories",
    year: "1960",
    description: "Memories with vibrant color restoration"
  },
  {
    before: "/images/before6.jpg",
    after: "/images/after6.jpg",
    category: "Baby Photos",
    year: "1955",
    description: "Precious baby photo brought back to life"
  },
  {
    before: "/images/before1.jpg",
    after: "/images/after1.jpg",
    category: "Family Photos",
    year: "1949", 
    description: "Studio portrait with enhanced details and color"
  },
  {
    before: "/images/before3.jpg", 
    after: "/images/after3.jpg",
    category: "Travel Photos",
    year: "1958",
    description: "Travel photos enhanced with color!"
  },
  {
    before: "/images/basic-before.jpg", 
    after: "/images/basic-after.jpg",
    category: "Holiday Memories",
    year: "1958",
    description: "Christmas colorization"
  },
  {
    before: "/images/before5.jpg",
    after: "/images/after5.jpg", 
    category: "Travel Photos",
    year: "1965",
    description: "Vintage vacation photo with landscape colors"
  }
];

const categories = ["All", "Wedding Photos", "Military Photos", "Memories", "Baby Photos", "Family Photos", "Holiday Memories", "Travel Photos"];

export default function Gallery() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredItem, setHoveredItem] = useState(null);

  const filteredItems = selectedCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const handleNavigateToRestore = (path) => {
    router.push(path);
  };

  return (
    <>
      <Head>
        <title>Before & After Gallery - Anastasis AI Photo Restoration</title>
        <meta
          name="description"
          content="See real before and after examples of AI photo restoration. Wedding photos, family portraits, military photos, and more restored with Anastasis heritage-grade AI."
        />
        <meta name="keywords" content="photo restoration gallery, before after photos, AI photo repair examples, vintage photo restoration, family photo restoration" />
        <meta property="og:title" content="Photo Restoration Gallery - Real Before & After Examples" />
        <meta property="og:description" content="Browse hundreds of restored family photos. See the incredible results of Anastasis AI photo restoration technology." />
      </Head>

      <div className={styles.container}>
        
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1 className={styles.title}>Before & After Gallery</h1>
          <p className={styles.subtitle}>
            Real customer photos restored with Anastasis AI. From faded memories to vibrant heirlooms.
          </p>
        </section>

        {/* Category Filter */}
        <section className={styles.categories}>
          <div className={styles.categoryList}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryBtn} ${selectedCategory === category ? styles.active : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        <section className={styles.gallery}>
          <h2 className={styles.galleryTitle}>
            {selectedCategory === "All" ? "Complete Gallery" : selectedCategory}
          </h2>
          <p className={styles.galleryCount}>
            {filteredItems.length} restored {filteredItems.length === 1 ? 'photo' : 'photos'}
          </p>
          
          <div className={styles.grid}>
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className={styles.card}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.category}>{item.category}</span>
                  <span className={styles.year}>{item.year}</span>
                </div>
                
                <div className={styles.imageContainer}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={item.before}
                      alt={`Before: ${item.description}`}
                      width={300}
                      height={400}
                      className={styles.image}
                    />
                    <div className={styles.label}>BEFORE</div>
                  </div>
                  
                  <div className={styles.divider}>
                    <div className={styles.aiIcon}>AI</div>
                  </div>
                  
                  <div className={styles.imageWrapper}>
                    <Image
                      src={item.after}
                      alt={`After: ${item.description}`}
                      width={300}
                      height={400}
                      className={styles.image}
                    />
                    <div className={styles.label}>AFTER</div>
                  </div>
                </div>
                
                <p className={styles.description}>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>Ready to Restore Your Photos?</h2>
          <p className={styles.ctaText}>
            Join thousands of families who have brought their memories back to life
          </p>
          
          <div className={styles.ctaButtons}>
            <button
              className={`${styles.btn} ${styles.primary}`}
              onClick={() => handleNavigateToRestore("/replicate/restore-basic")}
            >
              🎁 Try FREE
            </button>
            <button
              className={`${styles.btn} ${styles.secondary}`}
              onClick={() => handleNavigateToRestore("/replicate/restore-premium")}
            >
              🔮 See Premium Results
            </button>
          </div>
          
          <div className={styles.features}>
            <span>No subscription required</span>
            <span>Results in under 1 minute</span>
            <span>100% private</span>
          </div>
        </section>
      </div>
    </>
  );
}