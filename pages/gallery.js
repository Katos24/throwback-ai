// pages/gallery.js
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Gallery.module.css'

// ================= Restore Items =================
const restoreItems = [
  {
    image: "/images/gallery/restore2.jpg",
    category: "Wedding Photos",
    year: "1952",
    description: "Vintage wedding portrait restoration"
  },
  {
    image: "/images/gallery/restore9.jpg",
    category: "Military Photos",
    year: "1944",
    description: "WWII military photo restoration"
  },
  {
    image: "/images/gallery/restore3.jpg",
    category: "Family Photos",
    year: "1938",
    description: "Multi-generational family photo"
  },
  {
    image: "/images/gallery/restore8.jpg",
    category: "Baby Photos",
    year: "1955",
    description: "Precious baby photo brought back to life"
  },
  {
    image: "/images/gallery/restore5.jpg",
    category: "Memories",
    year: "1960",
    description: "Cherished memories with color restoration"
  },
  {
    image: "/images/gallery/restore7.jpg",
    category: "Wedding Photos",
    year: "1948",
    description: "Wedding day memories restored"
  },
  {
    image: "/images/gallery/restore6.jpg",
    category: "Family Photos",
    year: "1965",
    description: "Family gathering colorized"
  },
  {
    image: "/images/gallery/restore4.jpg",
    category: "Memories",
    year: "1972",
    description: "Vintage portrait enhanced"
  }
];

// ================= Decade Items =================
const decadesItems = [
  {
    image: "/images/gallery/70s1.jpg",
    decade: "70s",
    style: "Hippie",
    description: "70s hippie yearbook transformation"
  },
  {
    image: "/images/gallery/70s2.jpg",
    decade: "70s",
    style: "Disco",
    description: "70s disco yearbook transformation"
  },
  {
    image: "/images/gallery/70s3.jpg",
    decade: "70s",
    style: "Bohemian",
    description: "70s bohemian yearbook transformation"
  },
  {
    image: "/images/gallery/80s1.jpg",
    decade: "80s",
    style: "New Wave",
    description: "80s new wave yearbook transformation"
  },
  {
    image: "/images/gallery/80s2.jpg",
    decade: "80s",
    style: "Rock",
    description: "80s rock yearbook transformation"
  },
  {
    image: "/images/gallery/80s3.jpg",
    decade: "80s",
    style: "Pop",
    description: "80s pop culture yearbook transformation"
  },
  {
    image: "/images/gallery/90s3.jpg",
    decade: "90s",
    style: "Grunge",
    description: "90s grunge yearbook transformation"
  },
  {
    image: "/images/gallery/90s2.jpg",
    decade: "90s",
    style: "Hip-Hop",
    description: "90s hip-hop yearbook transformation"
  },
  {
    image: "/images/gallery/90s1.jpg",
    decade: "90s",
    style: "Pop Star",
    description: "90s pop star yearbook transformation"
  },
  {
    image: "/images/gallery/2000s1.jpg",
    decade: "2000s",
    style: "Emo",
    description: "2000s emo yearbook transformation"
  },
  {
    image: "/images/gallery/2000s2.jpg",
    decade: "2000s",
    style: "Scene",
    description: "2000s scene yearbook transformation"
  },
  {
    image: "/images/gallery/2000s3.jpg",
    decade: "2000s",
    style: "Pop Punk",
    description: "2000s pop punk yearbook transformation"
  }
];

// ================= Cartoon Items =================
const cartoonItems = [
  {
    image: "/images/cartoon-card.png",
    description: "Photo transformed into animated cartoon style"
  },
];

// ================= Categories =================
const mainCategories = ["All", "Restore", "Decades", "Cartoon"];

const restoreSubcategories = [
  "All Restore",
  "Wedding Photos",
  "Military Photos",
  "Memories",
  "Baby Photos",
  "Family Photos"
];

const decadeSubcategories = ["All Decades", "70s", "80s", "90s", "2000s"];

export default function Gallery() {
  const router = useRouter();
  const [selectedMainCategory, setSelectedMainCategory] = useState("All");
  const [selectedRestoreSubcategory, setSelectedRestoreSubcategory] = useState("All Restore");
  const [selectedDecadeSubcategory, setSelectedDecadeSubcategory] = useState("All Decades");

  // ================= Helpers =================
  const getAllItems = () => {
    switch (selectedMainCategory) {
      case "Restore":
        return restoreItems;
      case "Decades":
        return decadesItems;
      case "Cartoon":
        return cartoonItems;
      default: // All
        return [...restoreItems, ...decadesItems, ...cartoonItems];
    }
  };

  const getFilteredItems = () => {
    const allItems = getAllItems();

    if (selectedMainCategory === "Restore" && selectedRestoreSubcategory !== "All Restore") {
      return allItems.filter(item => item.category === selectedRestoreSubcategory);
    }

    if (selectedMainCategory === "Decades" && selectedDecadeSubcategory !== "All Decades") {
      return allItems.filter(item => item.decade === selectedDecadeSubcategory);
    }

    return allItems;
  };

  const filteredItems = getFilteredItems();

  // ================= Render =================
  return (
    <>
      <Head>
        <title>AI Transformation Gallery - Before & After Examples</title>
        <meta
          name="description"
          content="See real before and after examples of AI photo transformations. Photo restoration, decades, cartoon styles, and more."
        />
      </Head>

      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1 className={styles.title}>AI Transformation Gallery</h1>
          <p className={styles.subtitle}>See the magic of AI photo transformations</p>
        </section>

        {/* Main Categories */}
        <section className={styles.categories}>
          <div className={styles.categoryList}>
            {mainCategories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryBtn} ${selectedMainCategory === category ? styles.active : ''}`}
                onClick={() => {
                  setSelectedMainCategory(category);
                  setSelectedRestoreSubcategory("All Restore");
                  setSelectedDecadeSubcategory("All Decades");
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Restore Subcategories */}
        {selectedMainCategory === "Restore" && (
          <section className={styles.subcategories}>
            {restoreSubcategories.map((subcategory) => (
              <button
                key={subcategory}
                className={`${styles.subcategoryBtn} ${selectedRestoreSubcategory === subcategory ? styles.active : ''}`}
                onClick={() => setSelectedRestoreSubcategory(subcategory)}
              >
                {subcategory === "All Restore" ? "All" : subcategory}
              </button>
            ))}
          </section>
        )}

        {/* Decade Subcategories */}
        {selectedMainCategory === "Decades" && (
          <section className={styles.subcategories}>
            {decadeSubcategories.map((subcategory) => (
              <button
                key={subcategory}
                className={`${styles.subcategoryBtn} ${selectedDecadeSubcategory === subcategory ? styles.active : ''}`}
                onClick={() => setSelectedDecadeSubcategory(subcategory)}
              >
                {subcategory === "All Decades" ? "All" : subcategory}
              </button>
            ))}
          </section>
        )}

        {/* Gallery Grid */}
        <section className={styles.gallery}>
          <h2 className={styles.galleryTitle}>
            {selectedMainCategory === "All"
              ? "Complete Gallery"
              : selectedMainCategory}
          </h2>
          <p className={styles.galleryCount}>
            {filteredItems.length} transformed {filteredItems.length === 1 ? 'photo' : 'photos'}
          </p>

          <div className={styles.grid}>
            {filteredItems.map((item, index) => (
              <div key={index} className={styles.card}>
                <Image
                  src={item.image}
                  alt={item.description}
                  width={800}
                  height={600}
                  className={styles.image}
                />
                {(item.category || item.decade) && (
                  <div className={styles.cardHeader}>
                    {item.category && <span>{item.category}</span>}
                    {item.decade && <span>{item.decade}</span>}
                    {item.style && <span>{item.style}</span>}
                    {item.year && <span>{item.year}</span>}
                  </div>
                )}
                <p className={styles.description}>{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}