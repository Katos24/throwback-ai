import styles from '../../styles/AvatarPage.module.css';

/**
 * Testimonials Component
 * Displays user testimonials in a grid layout
 * Can be lazy loaded to improve initial page performance
 */
const Testimonials = ({ testimonials }) => {
  return (
    <section className={styles.testimonialsSection}>
      <h2 className={styles.testimonialsTitle}>What Our Users Say</h2>
      
      <div className={styles.testimonialsGrid}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className={styles.testimonialCard}>
            {/* Testimonial Header with avatar and name */}
            <div className={styles.testimonialHeader}>
              <span className={styles.testimonialAvatar}>{testimonial.avatar}</span>
              <div>
                <div className={styles.testimonialName}>{testimonial.name}</div>
                <div className={styles.testimonialStyle}>{testimonial.style}</div>
              </div>
            </div>
            
            {/* Star rating */}
            <div className={styles.testimonialRating}>
              {'⭐'.repeat(testimonial.rating)}
            </div>
            
            {/* Testimonial text */}
            <p className={styles.testimonialText}>
              {`"${testimonial.text}"`}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;