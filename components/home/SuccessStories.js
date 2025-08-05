import React from 'react';
import successStyles from '../../styles/SuccessStories.module.css';
import Image from 'next/image';

const CustomerSuccessStories = () => {
  const stories = [
    {
      before: "/images/weddingbefore.jpg", 
      after: "/images/weddingafter.jpg",
      story: "Our AI brought my grandmother's 1952 wedding photo back to life with stunning clarity and vibrant colors. The whole family was amazed!",
      author: "Sarah M.",
      occasion: "Family Reunion",
    },
    {
      before: "/images/before5.jpg",
      after: "/images/after5.jpg", 
      story: "70-year-old baby photos transformed with incredible detail. The AI restoration revealed features we never knew existed in the original.",
      author: "Marcus T.",
      occasion: "Father's Day Gift",
    },
    {
      before: "/images/before6.jpg",
      after: "/images/after6.jpg",
      story: "Perfect colorization for our genealogy project. The AI made our ancestors feel alive and present in our family history.",
      author: "Linda K.", 
      occasion: "Genealogy Research",
    },
    {
      before: "/images/before7.jpg",
      after: "/images/after7.jpg",
      story: "Damaged military photo from WWII restored to museum quality. The AI preserved every important detail of my grandfather's service.",
      author: "Robert H.",
      occasion: "Memorial Service",
    }
  ];

  return (
    <section className={successStyles.successStoriesSection}>
      <h2 className={successStyles.successHeading}>
        AI Photo Transformations
      </h2>
      <p className={successStyles.successIntro}>
        Witness the power of AI bringing your cherished memories back to life with stunning clarity
      </p>
      
      <div className={successStyles.successGrid}>
        {stories.map((item, idx) => (
          <div key={idx} className={successStyles.successCard}>
            <div className={successStyles.successImages}>
              <Image
                src={item.before}
                alt="Original damaged photo"
                width={140}
                height={180}
                className={successStyles.successBefore}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Sl3tRNNPQjqSPTUsOOjZ/9k="
              />
              <Image
                src={item.after}
                alt="AI enhanced and restored photo"
                width={140}
                height={180}
                className={successStyles.successAfter}
                loading="lazy"
                placeholder="blur"  
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Sl3tRNNPQjqSPTUsOOjZ/9k="
              />
            </div>
            
            <div className={successStyles.successStory}>
              <blockquote>{item.story}</blockquote>
              <cite>{item.author}</cite>
              <span className={successStyles.occasion}>{item.occasion}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerSuccessStories;