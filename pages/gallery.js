// pages/gallery.js
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Gallery.module.css'

// ================= Restore Items =================
const restoreItems = [
  {
    image: "/images/weddingrestoredohoto.jpg",
    category: "Wedding Photos",
    year: "1952",
    description: "Vintage wedding portrait with full colorization"
  },
  {
    image: "/images/familyrestoredphoto.jpg",
    category: "Family Photos",
    year: "1938",
    description: "Multi-generational family photo restoration"
  },
  {
    image: "/images/testimonials/genealogy.jpg",
    category: "Memories",
    year: "1960",
    description: "Memories with vibrant color restoration"
  },
  {
    image: "/images/museumrestoredphoto.png",
    category: "Baby Photos",
    year: "1955",
    description: "Precious baby photo brought back to life"
  }
];

// ================= Decade Items =================
const decadesItems = [
  {
    image: "/images/yearbook/70s.jpg",
    decade: "70s",
  },
  {
    image: "/images/yearbook/80s.jpg",
    decade: "80s",
  },
  {
    image: "/images/yearbook/90s.jpg",
    decade: "90s",
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

const decadeSubcategories = ["All Decades", "70s", "80s", "90s"];

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
                  width={400}
                  height={400}
                  className={styles.image}
                />
                {(item.category || item.decade) && (
                  <div className={styles.cardHeader}>
                    {item.category && <span>{item.category}</span>}
                    {item.decade && <span>{item.decade}</span>}
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
