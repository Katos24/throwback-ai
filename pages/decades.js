// pages/throwback.js
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/DecadesLanding.module.css';
import DecadeShowcase from "../components/decades/shared/DecadeShowcase";
import ThrowbackQuiz from "../components/ThrowbackQuiz";

export default function ThrowbackPage() {
  const router = useRouter();
  const [quizOpen, setQuizOpen] = useState(false);
  const [selectedDecade, setSelectedDecade] = useState('80s');

  const decades = [
    { id: '70s', title: '1970s', subtitle: 'Disco Fever', emoji: '🕺', description: 'Funky beats & bell-bottoms', className: 'decade-70s' },
    { id: '80s', title: '1980s', subtitle: 'Neon Dreams', emoji: '🎮', description: 'Synth wave & big hair', className: 'decade-80s' },
    { id: '90s', title: '1990s', subtitle: 'Grunge Era', emoji: '📼', description: 'Alternative rock & flannel', className: 'decade-90s' },
    { id: '2000s', title: '2000s', subtitle: 'Digital Dawn', emoji: '💿', description: 'Y2K aesthetic & pop culture', className: 'decade-2000s' }
  ];

  const handleDecadeClick = (decadeId) => {
    router.push(`/replicate/${decadeId}`);
  };

  const handleQuizClick = (decadeId) => {
    setSelectedDecade(decadeId);
    setQuizOpen(true);
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
                
                {/* Action Buttons */}
                <div className={styles.cardActions}>
                  <button 
                    className={styles.primaryBtn}
                    onClick={() => handleDecadeClick(decade.id)}
                  >
                    ✨ Transform Photos
                  </button>
                  <button 
                    className={styles.quizBtn}
                    onClick={() => handleQuizClick(decade.id)}
                  >
                    🎯 Test Your Knowledge
                  </button>
                </div>
              </div>
              <div className={styles.cardGlow}></div>
              <div className={styles.cardBorder}></div>
            </div>
          ))}
        </div>

        {/* Fun CTA Section */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaIcon}>🎓</div>
            <div className={styles.ctaContent}>
              <h3 className={styles.ctaTitle}>Think You Know These Decades?</h3>
              <p className={styles.ctaText}>
                Test your throwback knowledge with fun trivia from each era!
              </p>
            </div>
          </div>
        </div>
      </div>

      <DecadeShowcase currentDecade="2000s" />

      {/* Quiz Modal */}
      <ThrowbackQuiz 
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
        currentDecade={selectedDecade}
      />
    </div>
  );
}