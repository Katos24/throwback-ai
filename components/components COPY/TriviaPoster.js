import React, { useState } from "react";

export default function TriviaPoster({ trivia, onClose }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  if (!trivia) return null;

  const answers = [trivia.correctAnswer, ...trivia.incorrectAnswers].sort(() => Math.random() - 0.5);

  const handleSelect = (answer) => {
    if (showResult) return; // prevent changing answer after selection
    setSelectedAnswer(answer);
    setShowResult(true);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        width: 360,
        backgroundColor: "#fffbe6",
        border: "4px solid #0f380f",
        borderRadius: 12,
        padding: 20,
        zIndex: 1001,
        fontFamily: "'Courier New', Courier, monospace",
        color: "#0f380f",
      }}
    >
      <h3>🎯 90s Trivia</h3>
      <p style={{ fontWeight: "bold", marginBottom: 10 }}>{trivia.question}</p>
      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        {answers.map((answer, i) => {
          const isCorrect = answer === trivia.correctAnswer;
          const isSelected = answer === selectedAnswer;

          return (
            <li
              key={i}
              onClick={() => handleSelect(answer)}
              style={{
                cursor: showResult ? "default" : "pointer",
                padding: "8px 12px",
                marginBottom: 6,
                borderRadius: 8,
                border: "2px solid #8bac0f",
                backgroundColor: showResult
                  ? isCorrect
                    ? "#a8d08d" // green for correct
                    : isSelected
                    ? "#f4cccc" // red for incorrect selected
                    : "transparent"
                  : "transparent",
                color: showResult
                  ? isCorrect || isSelected
                    ? "#0f380f"
                    : "#4a4a4a"
                  : "#0f380f",
                fontWeight: isSelected ? "bold" : "normal",
                userSelect: "none",
              }}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSelect(answer);
              }}
              aria-disabled={showResult}
            >
              {answer}
            </li>
          );
        })}
      </ul>

      {showResult && (
        <div
          style={{
            marginTop: 12,
            fontWeight: "bold",
            color: selectedAnswer === trivia.correctAnswer ? "#0f380f" : "#b22222",
          }}
        >
          {selectedAnswer === trivia.correctAnswer
            ? "Correct! 🎉"
            : `Oops, the correct answer is: "${trivia.correctAnswer}"`}
        </div>
      )}

      <button
        onClick={onClose}
        style={{
          marginTop: 20,
          backgroundColor: "#8bac0f",
          border: "none",
          padding: "6px 12px",
          borderRadius: 6,
          cursor: "pointer",
          fontWeight: "bold",
          color: "#0f380f",
        }}
      >
        Close
      </button>
    </div>
  );
}
