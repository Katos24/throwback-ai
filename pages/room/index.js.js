import { useState, useEffect } from "react";

import Hotspot from "../../components/Hotspot";
import ChatModal from "../../components/ChatModal";
import TriviaPoster from "../../components/TriviaPoster";
import styles from "../../styles/Home.module.css";

const onThisDayFacts = [
  "On June 23, 1996, the Nintendo 64 was released in Japan.",
  "On June 23, 1991, Sonic the Hedgehog launched in the US.",
  "On June 23, 1993, Jurassic Park broke box office records.",
  "On June 23, 1994, Friends premiered on NBC.",
  "On June 23, 1998, Google was founded.",
];

const mockTrivia = [
  {
    question: "Which 90s sitcom featured a group of six friends living in NYC?",
    correctAnswer: "Friends",
    incorrectAnswers: ["Seinfeld", "Full House", "Boy Meets World"],
  },
  {
    question: "What 90s handheld pet toy became a worldwide obsession?",
    correctAnswer: "Tamagotchi",
    incorrectAnswers: ["Digivice", "Pikachu Pager", "NanoPet"],
  },
  {
    question: "Which 90s video game let you race with Mario and friends?",
    correctAnswer: "Mario Kart 64",
    incorrectAnswers: ["F-Zero X", "Wave Race", "Crash Team Racing"],
  },
];

export default function Room() {
  const [showChat, setShowChat] = useState(false);
  const [fact, setFact] = useState("");
  const [input, setInput] = useState("");
  const [showTrivia, setShowTrivia] = useState(false);
  const [trivia, setTrivia] = useState(null);

  useEffect(() => {
    const randomFact = onThisDayFacts[Math.floor(Math.random() * onThisDayFacts.length)];
    setFact(randomFact);
  }, []);

  const handleClick = (section) => {
    switch (section) {
      case "Center":
        setShowChat(true);
        setInput("");
        break;

      case "Top Left":
        const randomTrivia = mockTrivia[Math.floor(Math.random() * mockTrivia.length)];
        setTrivia(randomTrivia);
        setShowTrivia(true);
        break;

      default:
        alert(`You clicked section: ${section}`);
        break;
    }
  };

  return (
    <main
      style={{
        backgroundImage: "url('/images/bedroom-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "calc(100vh - 120px)",
        position: "relative",
        fontFamily: "'Courier New', Courier, monospace",
        color: "#0f380f",
        overflow: "hidden",
      }}
    >
      {/* 🔥 Interactive Zones */}
      <Hotspot
        position={{ top: "10%", left: "10%", width: "20vw", height: "20vh" }}
        onClick={() => handleClick("Top Left")}
      />
      <Hotspot
        position={{ top: "40%", left: "40%", width: "20vw", height: "20vh" }}
        onClick={() => handleClick("Center")}
      />

      {/* 💬 Character Chat Modal */}
      {showChat && (
        <ChatModal
          fact={fact}
          input={input}
          setInput={setInput}
          onClose={() => setShowChat(false)}
        />
      )}

      {/* 🎯 Trivia Modal */}
      {showTrivia && trivia && (
        <TriviaPoster trivia={trivia} onClose={() => setShowTrivia(false)} />
      )}
    </main>
  );
}
