import { useState } from 'react';
import styles from './FAQ.module.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does the AI Avatar Generator work?",
      answer: "Our AI avatar generator uses advanced machine learning to transform your photo into stunning avatars. Simply upload a photo, select your preferred style (fantasy, cyberpunk, professional, etc.), and our AI creates a high-quality avatar in seconds while preserving your facial features and likeness."
    },
    {
      question: "How many credits does it cost to create an avatar?",
      answer: "Each avatar creation costs 50 credits. New users get 50 free credits when they sign up, which means you can try one avatar completely free! After that, you can purchase credit packs starting at $4.99 for 400 credits (8 avatars)."
    },
    {
      question: "What avatar styles are available?",
      answer: "We offer a wide range of styles including Fantasy (wizards, warriors, dragons), Sci-Fi (cyberpunk, futuristic), Professional (business portraits, LinkedIn), Anime, Historical (western, medieval, Victorian), and many more. Each style is optimized to create stunning, unique avatars."
    },
    {
      question: "How long does it take to generate an avatar?",
      answer: "Avatar generation typically takes 15-30 seconds. Our AI processes your photo, applies the selected style, and creates a high-quality avatar while maintaining your facial features and characteristics."
    },
    {
      question: "Can I use my avatar commercially?",
      answer: "Yes! Once you create an avatar, you own it and can use it for personal or commercial purposes including social media profiles, gaming accounts, business cards, YouTube thumbnails, streaming platforms, and more."
    },
    {
      question: "What image formats are supported?",
      answer: "We support PNG, JPG, and HEIC formats. For best results, use clear, well-lit photos with your face visible. Images can be up to 10MB in size."
    },
    {
      question: "Will my avatar look like me?",
      answer: "Yes! Our AI is specifically designed to preserve your facial features, skin tone, ethnicity, and bone structure while applying the artistic style you choose. Your avatar will be recognizably you, just in an amazing new style."
    },
    {
      question: "Can I create multiple avatars from the same photo?",
      answer: "Absolutely! You can use the same photo to create avatars in different styles. Each style transformation costs 50 credits, allowing you to explore various looks and find your favorite."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faqSection}>
      <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
      <div className={styles.faqContainer}>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <button
              className={`${styles.faqQuestion} ${openIndex === index ? styles.active : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <span className={styles.faqIcon}>{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className={styles.faqAnswer}>
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;