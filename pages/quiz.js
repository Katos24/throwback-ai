import { useState } from "react";

const quizQuestions = [
  {
    question: "Which cartoon character famously said 'Eat my shorts!'?",
    options: ["Bart Simpson", "Doug Funnie", "Johnny Bravo", "SpongeBob"],
    correct: "Bart Simpson",
  },
  {
    question: "What year did the first Pokémon games release?",
    options: ["1995", "1996", "1997", "1998"],
    correct: "1996",
  },
  {
    question: "Which cereal mascot wore a cowboy hat?",
    options: ["Cap'n Crunch", "Tony the Tiger", "Lucky the Leprechaun", "Toucan Sam"],
    correct: "Cap'n Crunch",
  },
];

export default function MiniQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);

  function handleAnswer(option) {
    setSelected(option);
    if (option === quizQuestions[currentQ].correct) {
      setScore(score + 1);
    }
  }

  function nextQuestion() {
    setSelected(null);
    if (currentQ + 1 < quizQuestions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  }

  function getBadge() {
    const percent = (score / quizQuestions.length) * 100;
    if (percent === 100) return "🏅 Gold Badge!";
    if (percent >= 75) return "🥈 Silver Badge!";
    if (percent >= 50) return "🥉 Bronze Badge!";
    return "😢 No badge, try again!";
  }

  if (showResult) {
    return (
      <div className="p-6 bg-yellow-100 rounded-lg text-center">
        <h2 className="text-xl font-bold mb-4">Quiz Completed!</h2>
        <p>
          Your score: {score} / {quizQuestions.length}
        </p>
        <p className="mt-4 text-2xl">{getBadge()}</p>
        <button
          className="mt-6 px-4 py-2 bg-yellow-400 rounded"
          onClick={() => {
            setScore(0);
            setCurrentQ(0);
            setShowResult(false);
          }}
        >
          Retry Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-yellow-50 rounded-lg max-w-md mx-auto">
      <h2 className="font-bold mb-4">{quizQuestions[currentQ].question}</h2>
      <div className="space-y-3">
        {quizQuestions[currentQ].options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleAnswer(opt)}
            disabled={selected !== null}
            className={`block w-full py-2 rounded border ${
              selected === opt
                ? opt === quizQuestions[currentQ].correct
                  ? "bg-green-300 border-green-500"
                  : "bg-red-300 border-red-500"
                : "border-yellow-400 hover:bg-yellow-200"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {selected && (
        <button
          className="mt-6 px-4 py-2 bg-yellow-400 rounded"
          onClick={nextQuestion}
        >
          Next
        </button>
      )}
    </div>
  );
}