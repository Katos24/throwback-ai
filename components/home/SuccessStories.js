import React, { useState } from 'react';
import successStyles from '../../styles/SuccessStories.module.css';
import Image from 'next/image';

const CustomerSuccessStories = () => {
  const [activeTab, setActiveTab] = useState('restore');

  const restoreStories = [
    {
      combinedImage: "/images/testimonials/wedding.jpg",
      story: "Found my grandma's wedding photo in the attic, all faded and scratched up. This fixed it better than I expected - gonna frame it for her 90th birthday next month.",
      author: "Sarah M.",
      occasion: "Family Reunion",
      beforeLabel: "Before",
      afterLabel: "After"
    },
    {
      combinedImage: "/images/testimonials/babyphotos.jpg", 
      story: "My dad had these old baby pictures from like 1953 that were pretty rough. Used this for Father's Day and he literally teared up. Worth every penny.",
      author: "Marcus T.",
      occasion: "Father's Day Gift",
      beforeLabel: "Damaged",
      afterLabel: "Restored"
    },
    {
      combinedImage: "/images/testimonials/genealogy.jpg",
      story: "Working on our family tree and had a bunch of black and white photos from the 1800s. The colorization made them feel like real people, not just old photos. Really helped connect with my kids about their heritage.",
      author: "Linda K.", 
      occasion: "Genealogy Research",
      beforeLabel: "B&W",
      afterLabel: "Colorized"
    },
    {
      combinedImage: "/images/testimonials/military.jpg",
      story: "My grandfather's WWII photo was stored badly and had water damage. Wanted to use it for his memorial service. Came out better than the original - the uniform details are crystal clear now.",
      author: "Robert H.",
      occasion: "Memorial Service",
      beforeLabel: "Faded",
      afterLabel: "Restored"
    }
  ];

  const decadesStories = [
    {
      combinedImage: "/images/testimonials/80s.jpg",
      story: "Did my LinkedIn photo as an 80s headshot for fun and it got way more engagement than my regular one lol. Might actually keep it.",
      author: "Jessica R.",
      occasion: "Personal Branding",
      beforeLabel: "Now",
      afterLabel: "80s"
    },
    {
      combinedImage: "/images/testimonials/70s.jpg",
      story: "Made us into 70s hippies for our engagement announcement. My mom was dying laughing because we actually looked like her old photos from college. Everyone loved it.",
      author: "Alex & Sam",
      occasion: "Engagement Announcement",
      beforeLabel: "Modern",
      afterLabel: "70s"
    },
    {
      combinedImage: "/images/testimonials/90s.jpg",
      story: "Did our whole friend group in 90s style for the reunion invite. People kept asking where we found old photos of us lmao. Great icebreaker.",
      author: "Mike D.",
      occasion: "High School Reunion",
      beforeLabel: "Today",
      afterLabel: "90s"
    },
    {
      combinedImage: "/images/testimonials/2000s.jpg",
      story: "Posted my 2000s emo version on TikTok as a joke and it blew up way more than I thought. The eyeliner is scarily accurate for early 2000s haha.",
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
        Real Results
      </h2>
      <p className={successStyles.successIntro}>
        See how people are using these tools for family memories and fun projects
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