// components/ThrowbackQuiz.js
import React, { useState, useEffect } from 'react';
import styles from '../styles/ThrowbackQuiz.module.css';

const quizData = {
  '70s': [
    {
      question: "What iconic dance club opened in New York City in 1977?",
      options: ["The Roxy", "Studio 54", "Paradise Garage", "CBGB"],
      correct: 1,
      funFact: "Studio 54 was THE place to be seen, with celebrities lining up to get past the velvet rope!"
    },
    {
      question: "Which toy became a global craze in 1974?",
      options: ["Rubik's Cube", "Pet Rock", "Atari 2600", "Simon"],
      correct: 1,
      funFact: "The Pet Rock sold for $3.95 and made its creator a millionaire in just six months!"
    },
    {
      question: "What was the top-grossing film of the 1970s?",
      options: ["The Godfather", "Jaws", "Star Wars", "Grease"],
      correct: 2,
      funFact: "Star Wars (1977) changed cinema forever and launched one of the biggest franchises in history!"
    }
  ],
  '80s': [
    {
      question: "What video game console revolutionized home gaming in 1985?",
      options: ["Atari 2600", "Nintendo Entertainment System", "Sega Genesis", "Commodore 64"],
      correct: 1,
      funFact: "The NES saved the video game industry after the crash of 1983 and sold over 60 million units!"
    },
    {
      question: "Which music channel launched in 1981 with 'Video Killed the Radio Star'?",
      options: ["VH1", "MTV", "BET", "CMT"],
      correct: 1,
      funFact: "MTV changed music forever, making music videos an art form and launching countless careers!"
    },
    {
      question: "What iconic toy puzzle was invented by Ernő Rubik?",
      options: ["Rubik's Cube", "Simon", "Trivial Pursuit", "Transformers"],
      correct: 0,
      funFact: "Over 350 million Rubik's Cubes have been sold, making it the world's best-selling puzzle!"
    }
  ],
  '90s': [
    {
      question: "What virtual pet took the world by storm in 1996?",
      options: ["Furby", "Tamagotchi", "Beanie Babies", "Pogs"],
      correct: 1,
      funFact: "Over 82 million Tamagotchis were sold worldwide in the first two years!"
    },
    {
      question: "Which search engine launched in 1998?",
      options: ["Yahoo", "AltaVista", "Google", "Ask Jeeves"],
      correct: 2,
      funFact: "Google started in a garage and is now worth over a trillion dollars!"
    },
    {
      question: "What was the most popular TV show of the 90s?",
      options: ["Seinfeld", "Friends", "The Fresh Prince", "ER"],
      correct: 1,
      funFact: "Friends' final episode drew 52.5 million viewers and remains one of TV's most-watched finales!"
    }
  ],
  '2000s': [
    {
      question: "What social network was founded in a Harvard dorm in 2004?",
      options: ["MySpace", "Facebook", "Twitter", "LinkedIn"],
      correct: 1,
      funFact: "Facebook now has over 3 billion users - that's nearly 40% of the world's population!"
    },
    {
      question: "Which iPod model launched in 2001 with the slogan '1,000 songs in your pocket'?",
      options: ["iPod Nano", "iPod Shuffle", "iPod Classic", "iPod Touch"],
      correct: 2,
      funFact: "The original iPod had a mechanical scroll wheel and 5GB of storage!"
    },
    {
      question: "What viral video site was founded in 2005?",
      options: ["Vimeo", "YouTube", "Vine", "TikTok"],
      correct: 1,
      funFact: "YouTube's first video was 'Me at the zoo' and was only 18 seconds long!"
    }
  ]
};

export default function ThrowbackQuiz({ isOpen, onClose, currentDecade = '80s' }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showFunFact, setShowFunFact] = useState(false);

  const questions = quizData[currentDecade] || quizData['80s'];
  const question = questions[currentQuestion];

  useEffect(() => {
    if (isOpen) {
      // Reset quiz when opened
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setScore(0);
      setQuizComplete(false);
      setShowFunFact(false);
    }
  }, [isOpen]);

  const handleAnswerClick = (index) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === question.correct) {
      setScore(score + 1);
    }

    // Show fun fact after a brief delay
    setTimeout(() => {
      setShowFunFact(true);
    }, 800);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowFunFact(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
    setShowFunFact(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "Perfect! You're a true time traveler! 🌟";
    if (percentage >= 66) return "Impressive! You know your decades! 🎉";
    if (percentage >= 33) return "Not bad! Keep exploring the past! 👍";
    return "Give it another shot! History is fun! 💫";
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close quiz">
          ✕
        </button>

        {!quizComplete ? (
          <>
            {/* Progress Bar */}
            <div className={styles.progress}>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill} 
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
              <div className={styles.progressText}>
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>

            {/* Question */}
            <div className={styles.questionSection}>
              <div className={styles.decadeBadge}>
                {currentDecade === '70s' && '🕺 1970s Trivia'}
                {currentDecade === '80s' && '🎮 1980s Trivia'}
                {currentDecade === '90s' && '📼 1990s Trivia'}
                {currentDecade === '2000s' && '💿 2000s Trivia'}
              </div>
              <h2 className={styles.question}>{question.question}</h2>
            </div>

            {/* Options */}
            <div className={styles.options}>
              {question.options.map((option, index) => {
                let optionClass = styles.option;
                
                if (showResult) {
                  if (index === question.correct) {
                    optionClass += ` ${styles.correct}`;
                  } else if (index === selectedAnswer) {
                    optionClass += ` ${styles.incorrect}`;
                  } else {
                    optionClass += ` ${styles.disabled}`;
                  }
                } else if (selectedAnswer === index) {
                  optionClass += ` ${styles.selected}`;
                }

                return (
                  <button
                    key={index}
                    className={optionClass}
                    onClick={() => handleAnswerClick(index)}
                    disabled={showResult}
                  >
                    <span className={styles.optionLetter}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className={styles.optionText}>{option}</span>
                    {showResult && index === question.correct && (
                      <span className={styles.checkmark}>✓</span>
                    )}
                    {showResult && index === selectedAnswer && index !== question.correct && (
                      <span className={styles.xmark}>✗</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Fun Fact */}
            {showFunFact && (
              <div className={styles.funFact}>
                <div className={styles.funFactIcon}>💡</div>
                <div className={styles.funFactContent}>
                  <div className={styles.funFactTitle}>Did you know?</div>
                  <div className={styles.funFactText}>{question.funFact}</div>
                </div>
              </div>
            )}

            {/* Next Button */}
            {showResult && (
              <button className={styles.nextBtn} onClick={handleNext}>
                {currentQuestion < questions.length - 1 ? 'Next Question →' : 'See Results 🎉'}
              </button>
            )}
          </>
        ) : (
          /* Results Screen */
          <div className={styles.results}>
            <div className={styles.resultsEmoji}>
              {score === questions.length ? '🏆' : score >= 2 ? '⭐' : '💫'}
            </div>
            <h2 className={styles.resultsTitle}>Quiz Complete!</h2>
            <div className={styles.resultsScore}>
              <div className={styles.scoreNumber}>{score}</div>
              <div className={styles.scoreTotal}>out of {questions.length}</div>
            </div>
            <p className={styles.resultsMessage}>{getScoreMessage()}</p>
            
            <div className={styles.resultsActions}>
              <button className={styles.restartBtn} onClick={handleRestart}>
                🔄 Try Again
              </button>
              <button className={styles.doneBtn} onClick={onClose}>
                ✨ Continue Exploring
              </button>
            </div>

            {/* Share encouragement */}
            <div className={styles.sharePrompt}>
              <p>Transform your old photos with AI!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}