// pages/gallery.js

import React, { useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Image from "next/image"

// Styles
import galleryStyles from "../styles/FeaturesSection.module.css"

const galleryItems = [
  {
    before: "/images/before1.jpg",
    after: "/images/after1.jpg",
    category: "Wedding Photos",
    year: "1952",
    description: "Vintage wedding portrait with full colorization"
  },
  {
    before: "/images/before2.jpg",
    after: "/images/after2.jpg", 
    category: "Family Portraits",
    year: "1938",
    description: "Multi-generational family photo restoration"
  },
  {
    before: "/images/before3.jpg",
    after: "/images/after3.jpg",
    category: "Military Photos", 
    year: "1945",
    description: "WWII military portrait with uniform colorization"
  },
  {
    before: "/images/before4.jpg",
    after: "/images/after4.jpg",
    category: "Childhood Memories",
    year: "1960",
    description: "Children's portrait with vibrant color restoration"
  },
  {
    before: "/images/before5.jpg",
    after: "/images/after5.jpg",
    category: "Baby Photos",
    year: "1955",
    description: "Precious baby photo brought back to life"
  },
  {
    before: "/images/before6.jpg",
    after: "/images/after6.jpg",
    category: "Formal Portraits",
    year: "1949", 
    description: "Studio portrait with enhanced details and color"
  },
  // Add more gallery items as needed
  {
    before: "/images/before7.jpg",
    after: "/images/after7.jpg",
    category: "Graduation Photos",
    year: "1963",
    description: "High school graduation ceremony restoration"
  },
  {
    before: "/images/before8.jpg", 
    after: "/images/after8.jpg",
    category: "Holiday Memories",
    year: "1958",
    description: "Christmas family gathering colorization"
  },
  {
    before: "/images/before9.jpg",
    after: "/images/after9.jpg", 
    category: "Travel Photos",
    year: "1965",
    description: "Vintage vacation photo with landscape colors"
  }
];

const categories = ["All", "Wedding Photos", "Family Portraits", "Military Photos", "Childhood Memories", "Baby Photos", "Formal Portraits", "Graduation Photos", "Holiday Memories", "Travel Photos"];

export default function Gallery() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState(null);

  const filteredItems = selectedCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const handleNavigateToRestore = (path) => router.push(path);

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

      {/* Gallery Hero Section */}
      <section className={galleryStyles.galleryHero}>
        <div className={galleryStyles.galleryContainer}>
          <h1 className={galleryStyles.galleryHeading}>
            Before & After Gallery
          </h1>
          <p style={{ textAlign: 'center', fontSize: '18px', color: '#94a3b8', marginBottom: '2rem' }}>
            Real customer photos restored with Anastasis AI. From faded memories to vibrant heirlooms.
          </p>
          
          <div className={galleryStyles.galleryStats}>
            <div className={galleryStyles.galleryStat}>
              <span className={galleryStyles.statNumber}>2.3M+</span>
              <span className={galleryStyles.statLabel}>Photos Restored</span>
            </div>
            <div className={galleryStyles.galleryStat}>
              <span className={galleryStyles.statNumber}>50+</span>
              <span className={galleryStyles.statLabel}>Years Experience</span>
            </div>
            <div className={galleryStyles.galleryStat}>
              <span className={galleryStyles.statNumber}>98.7%</span>
              <span className={galleryStyles.statLabel}>Success Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className={galleryStyles.categoryFilter}>
        <div className={galleryStyles.galleryContainer}>
          <h3 className={galleryStyles.filterTitle}>Browse by Category</h3>
          <div className={galleryStyles.filterButtons}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${galleryStyles.filterButton} ${
                  selectedCategory === category ? galleryStyles.active : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Gallery Section - Using your existing film strip style */}
      <section className={galleryStyles.gallerySection}>
        <div className={galleryStyles.galleryContainer}>
          <h2 className={galleryStyles.galleryHeading}>
            {selectedCategory === "All" ? "Complete Gallery" : selectedCategory}
          </h2>
          <p style={{ textAlign: 'center', fontSize: '16px', color: '#94a3b8', marginBottom: '2rem' }}>
            {filteredItems.length} restored {filteredItems.length === 1 ? 'photo' : 'photos'} • Scroll horizontally to browse
          </p>
          
          <div className={galleryStyles.galleryScroll}>
            {filteredItems.map((item, index) => (
              <div key={index} className={galleryStyles.galleryCard}>
                {/* Category and Year Labels */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    {item.category}
                  </span>
                  <span style={{
                    color: '#94a3b8',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {item.year}
                  </span>
                </div>
                
                {/* Before Image */}
                <div className={galleryStyles.galleryImageWrapper}>
                  <Image 
                    src={item.before} 
                    alt={`Before restoration - ${item.description}`}
                    width={300} 
                    height={450} 
                    loading="lazy" 
                  />
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    background: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    fontWeight: '700'
                  }}>
                    BEFORE
                  </div>
                </div>
                
                {/* AI Processing Indicator */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.5rem 0'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: '800'
                  }}>
                    AI
                  </div>
                </div>
                
                {/* After Image */}
                <div className={galleryStyles.galleryImageWrapper}>
                  <Image 
                    src={item.after} 
                    alt={`After restoration - ${item.description}`}
                    width={300} 
                    height={450} 
                    loading="lazy" 
                  />
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    background: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    fontWeight: '700'
                  }}>
                    AFTER
                  </div>
                </div>
                
                {/* Description */}
                <p style={{
                  fontSize: '12px',
                  color: '#94a3b8',
                  textAlign: 'center',
                  marginTop: '0.5rem',
                  lineHeight: '1.4'
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={galleryStyles.galleryCTA}>
        <div className={galleryStyles.galleryContainer}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            marginBottom: '1rem',
            color: 'white',
            textAlign: 'center'
          }}>
            Ready to Restore Your Photos?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '3rem',
            color: '#94a3b8',
            textAlign: 'center'
          }}>
            Join thousands of families who have brought their memories back to life with Anastasis AI
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            <button
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                padding: '15px 30px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => handleNavigateToRestore("/replicate/restore-basic")}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              🎁 Try 3 Photos FREE
            </button>
            <button
              style={{
                background: 'transparent',
                color: 'white',
                border: '2px solid #667eea',
                borderRadius: '50px',
                padding: '15px 30px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => handleNavigateToRestore("/replicate/restore-premium")}
              onMouseOver={(e) => {
                e.target.style.background = '#667eea';
                e.target.style.transform = 'translateY(-3px)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              🔮 See Premium Results
            </button>
          </div>
          
          <p style={{
            fontSize: '14px',
            color: '#64748b',
            textAlign: 'center'
          }}>
            No signup required • Results in under 2 minutes • 100% private
          </p>
        </div>
      </section>
    </>
  );
}