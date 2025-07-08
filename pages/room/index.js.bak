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

  // New function for your fixed trivia button:
  const openRandomTrivia = () => {
    const randomTrivia = mockTrivia[Math.floor(Math.random() * mockTrivia.length)];
    setTrivia(randomTrivia);
    setShowTrivia(true);
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
      {/* Your existing Hotspots */}
      <Hotspot
        position={{ top: "10%", left: "10%", width: "20vw", height: "20vh" }}
        onClick={() => handleClick("Top Left")}
      />
      <Hotspot
        position={{ top: "40%", left: "40%", width: "20vw", height: "20vh" }}
        onClick={() => handleClick("Center")}
      />

      {/* Chat Modal */}
      {showChat && (
        <ChatModal
          fact={fact}
          input={input}
          setInput={setInput}
          onClose={() => setShowChat(false)}
        />
      )}

      {/* Trivia Modal */}
      {showTrivia && trivia && (
        <TriviaPoster trivia={trivia} onClose={() => setShowTrivia(false)} />
      )}

      {/* Fixed Trivia Button */}
      <button
        onClick={openRandomTrivia}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          padding: "10px 15px",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#0f380f",
          color: "#a3d977",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          zIndex: 9999,
        }}
        aria-label="Show 90s Trivia"
      >
        🎯 Trivia
      </button>
    </main>
  );
}
