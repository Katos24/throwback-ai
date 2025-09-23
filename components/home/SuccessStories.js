import React, { useState } from 'react';
import successStyles from '../../styles/SuccessStories.module.css';
import Image from 'next/image';

const CustomerSuccessStories = () => {
  const [activeTab, setActiveTab] = useState('restore');

  const restoreStories = [
    {
      combinedImage: "/images/testimonials/wedding.jpg",
      story: "Our AI brought my grandmother's 1952 wedding photo back to life with stunning clarity and vibrant colors. The whole family was amazed!",
      author: "Sarah M.",
      occasion: "Family Reunion",
      beforeLabel: "Before",
      afterLabel: "After"
    },
    {
      combinedImage: "/images/testimonials/babyphotos.jpg", 
      story: "70-year-old baby photos transformed with incredible detail. The AI restoration revealed features we never knew existed in the original.",
      author: "Marcus T.",
      occasion: "Father's Day Gift",
      beforeLabel: "Damaged",
      afterLabel: "Restored"
    },
    {
      combinedImage: "/images/testimonials/genealogy.jpg",
      story: "Perfect colorization for our genealogy project. The AI made our ancestors feel alive and present in our family history.",
      author: "Linda K.", 
      occasion: "Genealogy Research",
      beforeLabel: "B&W",
      afterLabel: "Colorized"
    },
    {
      combinedImage: "/images/testimonials/military.jpg",
      story: "Damaged military photo from WWII restored to museum quality. The AI preserved every important detail of my grandfather's service.",
      author: "Robert H.",
      occasion: "Memorial Service",
      beforeLabel: "Faded",
      afterLabel: "Restored"
    }
  ];

  const decadesStories = [
    {
      combinedImage: "/images/testimonials/80s.jpg",
      story: "Turned my LinkedIn headshot into a viral 80s masterpiece! Got 500+ likes on Instagram and multiple job offers from creative agencies.",
      author: "Jessica R.",
      occasion: "Personal Branding",
      beforeLabel: "Now",
      afterLabel: "80s"
    },
    {
      combinedImage: "/images/testimonials/70s.jpg",
      story: "Created the perfect 70s engagement announcement. Our families loved seeing us as flower power hippies - it's our favorite photo now!",
      author: "Alex & Sam",
      occasion: "Engagement Announcement",
      beforeLabel: "Modern",
      afterLabel: "70s"
    },
    {
      combinedImage: "/images/testimonials/90s.jpg",
      story: "Transformed our boring group photo into a 90s grunge band aesthetic. Used it for our reunion invitations - everyone wants copies!",
      author: "Mike D.",
      occasion: "High School Reunion",
      beforeLabel: "Today",
      afterLabel: "90s"
    },
    {
      combinedImage: "/images/testimonials/2000s.jpg",
      story: "My 2000s emo transformation went viral on TikTok! 2.3M views and counting. The AI captured the early 2000s vibe perfectly.",
      author: "Taylor M.",
      occasion: "Social Media Content",
      beforeLabel: "Now",
      afterLabel: "2000s"
    }
  ];

  const currentStories = activeTab === 'restore' ? restoreStories : decadesStories;

  return (
    <section className={successStyles.successStoriesSection}>
      <h2 className={successStyles.successHeading}>
        AI Photo Transformations
      </h2>
      <p className={successStyles.successIntro}>
        Witness the power of AI bringing your cherished memories back to life and creating viral social content
      </p>
      
      {/* Tab Navigation */}
      <div className={successStyles.tabContainer}>
        <button 
          className={`${successStyles.tab} ${activeTab === 'restore' ? successStyles.activeTab : ''}`}
          onClick={() => setActiveTab('restore')}
        >
          🔧 Photo Restoration
        </button>
        <button 
          className={`${successStyles.tab} ${activeTab === 'decades' ? successStyles.activeTab : ''}`}
          onClick={() => setActiveTab('decades')}
        >
          🕺 Decades Transformation
        </button>
      </div>

      {/* Tab Content */}
      <div className={successStyles.tabContent}>
        <div className={successStyles.successGrid}>
          {currentStories.map((item, idx) => (
            <div key={`${activeTab}-${idx}`} className={successStyles.successCard}>
              
              {/* Single Combined Image */}
              <div className={successStyles.successImages}>
                <div className={successStyles.combinedImageContainer}>
                  <Image
                    src={item.combinedImage}
                    alt={`${activeTab === 'restore' ? 'Photo restoration' : 'Decades transformation'} - Before and After comparison`}
                    width={280}
                    height={180}
                    className={successStyles.combinedImage}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Sl3tRNNPQjqSPTUsOOjZ/9k="
                  />
                  <div className={successStyles.splitLine}></div>
                  <div className={`${successStyles.imageLabel} ${successStyles.labelBefore}`}>
                    {item.beforeLabel}
                  </div>
                  <div className={`${successStyles.imageLabel} ${successStyles.labelAfter}`}>
                    {item.afterLabel}
                  </div>
                </div>
              </div>
              
              <div className={successStyles.successStory}>
                <blockquote>{item.story}</blockquote>
                <cite>{item.author}</cite>
                <span className={successStyles.occasion}>{item.occasion}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerSuccessStories;