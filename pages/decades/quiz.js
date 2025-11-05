// pages/decades/quiz.js
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../../styles/QuizPage.module.css';
import ThrowbackQuiz from "../../components/ThrowbackQuiz";

export default function QuizPage() {
  const router = useRouter();
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedDecade, setSelectedDecade] = useState(null);

  const decades = [
    { id: '70s', title: '1970s', emoji: '🕺', color: '#FF6B6B', subtitle: 'Disco Fever' },
    { id: '80s', title: '1980s', emoji: '🎮', color: '#4ECDC4', subtitle: 'Neon Dreams' },
    { id: '90s', title: '1990s', emoji: '📼', color: '#95E1D3', subtitle: 'Grunge Era' },
    { id: '2000s', title: '2000s', emoji: '💿', color: '#F38181', subtitle: 'Digital Dawn' }
  ];

  const handleDecadeSelect = (decadeId) => {
    setSelectedDecade(decadeId);
    setQuizStarted(true);
  };

  const handleQuizClose = () => {
    setQuizStarted(false);
    setSelectedDecade(null);
  };

  return (
    <div className={styles.container}>
      {/* Background Animation */}
      <div className={styles.bgAnimation}>
        <div className={`${styles.floatingShape} ${styles.shape1}`}></div>
        <div className={`${styles.floatingShape} ${styles.shape2}`}></div>
        <div className={`${styles.floatingShape} ${styles.shape3}`}></div>
      </div>

      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={() => router.push('/decades')}>
            ← Back to Decades
          </button>
          <h1 className={styles.title}>🎓 Decades Trivia Challenge</h1>
          <p className={styles.subtitle}>
            Test your knowledge of pop culture, tech, and trends from each iconic era!
          </p>
        </div>

        {/* Decade Selection */}
        <div className={styles.decadeSelector}>
          <h2 className={styles.selectorTitle}>Choose Your Era</h2>
          <div className={styles.decadeGrid}>
            {decades.map((decade) => (
              <button
                key={decade.id}
                className={styles.decadeCard}
                onClick={() => handleDecadeSelect(decade.id)}
                style={{ 
                  '--decade-color': decade.color 
                }}
              >
                <div className={styles.decadeEmoji}>{decade.emoji}</div>
                <div className={styles.decadeTitle}>{decade.title}</div>
                <div className={styles.decadeSubtitle}>{decade.subtitle}</div>
                <div className={styles.decadeAction}>Start Quiz →</div>
              </button>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className={styles.howItWorks}>
          <h3 className={styles.howTitle}>How It Works</h3>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepText}>Pick a decade</div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepText}>Answer 3 trivia questions</div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepText}>Get fun facts & your score</div>
            </div>
          </div>
        </div>

        {/* CTA to Transform Photos */}
        <div className={styles.transformCta}>
          <div className={styles.ctaCard}>
            <h3 className={styles.ctaTitle}>Love these decades?</h3>
            <p className={styles.ctaText}>
              Transform your photos into any era with AI-powered yearbook photos!
            </p>
            <button 
              className={styles.ctaBtn}
              onClick={() => router.push('/decades')}
            >
              ✨ Try AI Transformations
            </button>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      <ThrowbackQuiz 
        isOpen={quizStarted}
        onClose={handleQuizClose}
        currentDecade={selectedDecade}
      />
    </div>
  );
}