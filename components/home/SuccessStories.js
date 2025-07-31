import React from 'react';
import successStyles from '../../styles/SuccessStories.module.css';
import Image from 'next/image';

const CustomerSuccessStories = () => {
  const stories = [
    {
      before: "/images/before4.jpg",
      after: "/images/after4.jpg",
      story: "Restored my grandmother's 1943 wedding photo for our family reunion. Everyone was in tears!",
      author: "Sarah M.",
      occasion: "Family Reunion",
    },
    {
      before: "/images/before5.jpg",
      after: "/images/after5.jpg",
      story: "These 70-year-old baby photos of my father now hang beautifully in our living room.",
      author: "Marcus T.",
      occasion: "Father's Day Gift",
    },
    {
      before: "/images/before6.jpg",
      after: "/images/after6.jpg",
      story: "Perfect for our genealogy project. The colorization brought our ancestors to life.",
      author: "Linda K.",
      occasion: "Genealogy Research",
    },
    // Add more stories if desired
  ];

  return (
    <section className={successStyles.successStoriesSection}>
      <h2 className={successStyles.successHeading}>
        Customer Success Stories
      </h2>
      <p className={successStyles.successIntro}>
        See why families trust Anastasis with their most precious memories
      </p>

      <div className={successStyles.successGrid}>
        {stories.map((item, idx) => (
          <div key={idx} className={successStyles.successCard}>
            <div className={successStyles.successImages}>
              <Image
                src={item.before}
                alt="Before restoration"
                width={150}
                height={200}
                className={successStyles.successBefore}
                loading="lazy"
              />
              <div className={successStyles.successArrow}>→</div>
              <Image
                src={item.after}
                alt="After restoration"
                width={150}
                height={200}
                className={successStyles.successAfter}
                loading="lazy"
              />
            </div>
            <div className={successStyles.successStory}>
              <blockquote>&ldquo;{item.story}&rdquo;</blockquote>
              <cite>— {item.author}</cite>
              <span className={successStyles.occasion}>{item.occasion}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerSuccessStories;
