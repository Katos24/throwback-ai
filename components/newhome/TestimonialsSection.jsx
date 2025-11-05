import React from 'react';
import styles from './TestimonialsSection.module.css';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "The avatar quality is insane! Used it for my LinkedIn and got tons of compliments. Worth every credit.",
    author: "Sarah M.",
    role: "Marketing Manager",
    feature: "Avatar Generation",
    emoji: "🧙"
  },
  {
    id: 2,
    quote: "Brought my grandma's old photos back to life. She cried when she saw them in color. This is magical.",
    author: "Mike R.",
    role: "Family Historian",
    feature: "Photo Restoration",
    emoji: "✨"
  },
  {
    id: 3,
    quote: "Made 90s yearbook photos for my whole friend group. They're hilarious and perfect for Instagram!",
    author: "Jessica T.",
    role: "Content Creator",
    feature: "Decades",
    emoji: "📼"
  }
];

export default function TestimonialsSection() {
  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>What Our Users Say</h2>
          <p className={styles.sectionSubtitle}>
            Join thousands creating amazing transformations
          </p>
        </div>

        <div className={styles.testimonialsGrid}>
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className={styles.testimonialCard}>
              <div className={styles.cardHeader}>
                <span className={styles.emoji}>{testimonial.emoji}</span>
                <span className={styles.feature}>{testimonial.feature}</span>
              </div>
              
              <blockquote className={styles.quote}>
                "{testimonial.quote}"
              </blockquote>

              <div className={styles.author}>
                <div className={styles.authorName}>{testimonial.author}</div>
                <div className={styles.authorRole}>{testimonial.role}</div>
              </div>

              <div className={styles.stars}>
                {'⭐'.repeat(5)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}