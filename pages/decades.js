// pages/decades.js (formerly throwback.js)
import { useRouter } from 'next/router';
import styles from '../styles/DecadesLanding.module.css';
import DecadeShowcase from "../components/decades/shared/DecadeShowcase";

export default function DecadesPage() {
  const router = useRouter();

  const decades = [
    { id: '70s', title: '1970s', subtitle: 'Disco Fever', emoji: '🕺', description: 'Funky beats & bell-bottoms', className: 'decade-70s' },
    { id: '80s', title: '1980s', subtitle: 'Neon Dreams', emoji: '🎮', description: 'Synth wave & big hair', className: 'decade-80s' },
    { id: '90s', title: '1990s', subtitle: 'Grunge Era', emoji: '📼', description: 'Alternative rock & flannel', className: 'decade-90s' },
    { id: '2000s', title: '2000s', subtitle: 'Digital Dawn', emoji: '💿', description: 'Y2K aesthetic & pop culture', className: 'decade-2000s' }
  ];

  const handleDecadeClick = (decadeId) => {
    router.push(`/replicate/${decadeId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.bgAnimation}>
        <div className={`${styles.floatingShape} ${styles.shape1}`}></div>
        <div className={`${styles.floatingShape} ${styles.shape2}`}></div>
        <div className={`${styles.floatingShape} ${styles.shape3}`}></div>
        <div className={`${styles.floatingShape} ${styles.shape4}`}></div>
      </div>

      <div className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.logo}>Throwback AI</h1>
          <p className={styles.tagline}>Choose Your Era</p>
        </header>

        {/* Decades Grid - Now with single CTA per card */}
        <div className={styles.decadesGrid}>
          {decades.map((decade, index) => (
            <div
              key={decade.id}
              className={`${styles.decadeCard} ${styles[decade.className]}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.cardContent}>
                <div className={styles.decadeEmoji}>{decade.emoji}</div>
                <h2 className={styles.decadeTitle}>{decade.title}</h2>
                <p className={styles.decadeSubtitle}>{decade.subtitle}</p>
                <p className={styles.decadeDescription}>{decade.description}</p>
                
                {/* Single Primary CTA */}
                <button 
                  className={styles.primaryBtn}
                  onClick={() => handleDecadeClick(decade.id)}
                >
                  ✨ Try {decade.title} Style
                </button>
              </div>
              <div className={styles.cardGlow}></div>
              <div className={styles.cardBorder}></div>
            </div>
          ))}
        </div>

        {/* Decade Showcases */}
 

          <DecadeShowcase currentDecade="90s" />

        {/* Final CTA */}
        <div className={styles.finalCta}>
          <div className={styles.finalCtaCard}>
            <h2 className={styles.finalCtaTitle}>Ready to Time Travel?</h2>
            <p className={styles.finalCtaText}>
              Get 50 free credits when you sign up. That's your first yearbook photo on us!
            </p>
            <button 
              className={styles.finalCtaBtn}
              onClick={() => router.push('/pricing')}
            >
              Get Started Free
            </button>
          </div>
        </div>

        {/* Quiz Link - Small and non-intrusive at bottom */}
        <div className={styles.quizFooter}>
          <p className={styles.quizFooterText}>
            Think you know these decades? 
            <button 
              className={styles.quizFooterLink}
              onClick={() => router.push('/decades/quiz')}
            >
              Test your knowledge →
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}