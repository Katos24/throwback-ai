export default function Upstairs() {
  return (
    <div
      style={{
        backgroundImage: "url('/images/upstairs.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      {/* Example interactive hotspots */}
      <button
        style={{ position: "absolute", top: "40%", left: "30%" }}
        onClick={() => alert("You clicked the hallway!")}
      >
        Hallway
      </button>
      <button
        style={{ position: "absolute", top: "55%", left: "60%" }}
        onClick={() => alert("You clicked the bedroom door!")}
      >
        Bedroom Door
      </button>
    </div>
  );
}