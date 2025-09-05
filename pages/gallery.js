// pages/gallery.js
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Gallery.module.css'

// Restore gallery items (keeping your existing ones with subcategories)
const restoreItems = [
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
    description: "Travel photos enhanced with color"
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

// 90s Yearbook gallery items (no subcategories)
const yearbookItems = [
  {
    before: "/images/sarahbefore.jpg",
    after: "/images/sarahafter.jpg",
    description: "Modern photo transformed into authentic 90s grunge yearbook style"
  },
  {
    before: "/images/jessicabefore.jpg",
    after: "/images/jessicaafter.jpg",
    description: "Contemporary portrait becomes 90s preppy student"
  },
  {
    before: "/images/mikebefore.jpg",
    after: "/images/mikeafter.jpg",
    description: "Hip-hop inspired 90s yearbook transformation"
  },
  {
    before: "/images/emmabefore.jpg",
    after: "/images/emmaafter.jpg",
    description: "Mall goth aesthetic yearbook portrait"
  },
  {
    before: "/images/alexbefore.jpg",
    after: "/images/alexafter.jpg",
    description: "Classic 90s windbreaker style transformation"
  },
  {
    before: "/images/baysidebefore.jpg",
    after: "/images/baysideafter.jpg",
    description: "Saved by the Bell inspired yearbook photo"
  }
];

// Cartoon gallery items (no subcategories)
const cartoonItems = [
  {
    before: "/images/cartoon-before.jpg",
    after: "/images/cartoon-example.jpg",
    description: "Wilbur photo transformed into animated cartoon style"
  },
  {
    before: "/images/tylerbefore.jpg",
    after: "/images/tyler-cartoon.jpg",
    description: "Portrait becomes colorful cartoon character"
  },
  {
    before: "/images/cartoon-before1.jpg",
    after: "/images/cartoon-after1.jpg",
    description: "Photo converted to cartoon illustration"
  },
  {
    before: "/images/cartoonsoccer-before.jpg",
    after: "/images/cartoonsoccer-after.jpg",
    description: "Real person becomes cartoon character"
  }
];

// Avatar gallery items (no subcategories)
const avatarItems = [
  {
    before: "/images/mikebefore.jpg",
    after: "/images/mike-after.jpg",
    description: "Professional LinkedIn-style avatar creation"
  },
  {
    before: "/images/avatar-before.jpg",
    after: "/images/avatar-after.jpg",
    description: "Gaming avatar with fantasy elements"
  },
  {
    before: "/images/jessicabefore.jpg",
    after: "/images/jessica-avatar.jpg",
    description: "Portrait transformed into mystical elven noble character"
  },
  {
    before: "/images/sarahbefore.jpg",
    after: "/images/sarah-90avatar.jpg",
    description: "Premium 90s high school student avatar with enhanced detail"
  },
 {
  before: "/images/western-avatar.jpg",
  after: "/images/western-avatar-after.jpg",
  description: "Portrait transformed into rugged Wild West character with frontier styling"
}];


// Main categories
const mainCategories = ["All", "Restore", "90s Yearbook", "Avatar", "Cartoon"];

// Restore subcategories
const restoreSubcategories = ["All Restore", "Wedding Photos", "Military Photos", "Memories", "Baby Photos", "Family Photos", "Holiday Memories", "Travel Photos"];

export default function Gallery() {
  const router = useRouter();
  const [selectedMainCategory, setSelectedMainCategory] = useState("All");
  const [selectedRestoreSubcategory, setSelectedRestoreSubcategory] = useState("All Restore");
  const [hoveredItem, setHoveredItem] = useState(null);

  // Get all items based on selected category
  const getAllItems = () => {
    switch (selectedMainCategory) {
      case "Restore":
        return restoreItems;
      case "90s Yearbook":
        return yearbookItems;
      case "Cartoon":
        return cartoonItems;
      case "Avatar":
        return avatarItems;
      default: // "All"
        return [...restoreItems, ...yearbookItems, ...cartoonItems, ...avatarItems];
    }
  };

  // Filter items based on category and subcategory
  const getFilteredItems = () => {
    const allItems = getAllItems();
    
    if (selectedMainCategory === "Restore" && selectedRestoreSubcategory !== "All Restore") {
      return allItems.filter(item => item.category === selectedRestoreSubcategory);
    }
    
    return allItems;
  };

  const filteredItems = getFilteredItems();

  const handleNavigateToFeature = (path) => {
    router.push(path);
  };

  const handleMainCategoryChange = (category) => {
    setSelectedMainCategory(category);
    setSelectedRestoreSubcategory("All Restore"); // Reset subcategory when main category changes
  };

  return (
    <>
      <Head>
        <title>AI Transformation Gallery - Before & After Examples</title>
        <meta
          name="description"
          content="See real before and after examples of AI photo transformations. Photo restoration, 90s yearbook styles, cartoon avatars, and more."
        />
        <meta name="keywords" content="AI photo transformation, before after photos, 90s yearbook, cartoon avatar, photo restoration gallery" />
        <meta property="og:title" content="AI Photo Transformation Gallery - Real Examples" />
        <meta property="og:description" content="Browse hundreds of transformed photos. See the incredible results of AI photo transformation technology." />
      </Head>

      <div className={styles.container}>
        
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1 className={styles.title}>AI Transformation Gallery</h1>
          <p className={styles.subtitle}>See the magic of AI photo transformations</p>
        </section>

        {/* Main Category Filter */}
        <section className={styles.categories}>
          <div className={styles.categoryList}>
            {mainCategories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryBtn} ${selectedMainCategory === category ? styles.active : ''}`}
                onClick={() => handleMainCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Restore Subcategory Filter (only show when Restore is selected) */}
        {selectedMainCategory === "Restore" && (
          <section className={styles.subcategories}>
            <div className={styles.subcategoryList}>
              {restoreSubcategories.map((subcategory) => (
                <button
                  key={subcategory}
                  className={`${styles.subcategoryBtn} ${selectedRestoreSubcategory === subcategory ? styles.active : ''}`}
                  onClick={() => setSelectedRestoreSubcategory(subcategory)}
                >
                  {subcategory === "All Restore" ? "All" : subcategory}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Gallery Section */}
        <section className={styles.gallery}>
          <h2 className={styles.galleryTitle}>
            {selectedMainCategory === "All" 
              ? "Complete Gallery" 
              : selectedMainCategory === "Restore" && selectedRestoreSubcategory !== "All Restore"
                ? selectedRestoreSubcategory
                : selectedMainCategory
            }
          </h2>
          <p className={styles.galleryCount}>
            {filteredItems.length} transformed {filteredItems.length === 1 ? 'photo' : 'photos'}
          </p>
          
          <div className={styles.grid}>
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className={styles.card}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.category && (
                  <div className={styles.cardHeader}>
                    <span className={styles.category}>{item.category}</span>
                    {item.year && <span className={styles.year}>{item.year}</span>}
                  </div>
                )}
                
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
          <h2 className={styles.ctaTitle}>Ready to Transform Your Photos?</h2>
          <p className={styles.ctaText}>
            Choose your transformation style and see the magic happen
          </p>
          
          <div className={styles.ctaButtons}>
            <button
              className={`${styles.btn} ${styles.primary}`}
              onClick={() => handleNavigateToFeature("/replicate/restore-basic")}
            >
              📸 Restore Photos
            </button>
            <button
              className={`${styles.btn} ${styles.secondary}`}
              onClick={() => handleNavigateToFeature("/replicate/yearbook")}
            >
              📚 90s Yearbook
            </button>
            <button
              className={`${styles.btn} ${styles.secondary}`}
              onClick={() => handleNavigateToFeature("/replicate/cartoon")}
            >
              🎨 Cartoon Style
            </button>
            <button
              className={`${styles.btn} ${styles.secondary}`}
              onClick={() => handleNavigateToFeature("/replicate/avatar")}
            >
              👤 Create Avatar
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