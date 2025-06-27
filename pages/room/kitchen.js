export default function Kitchen() {
  return (
    <div
      style={{
        backgroundImage: "url('/images/kitchen.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      {/* Add interactive hotspots here */}
      <button
        style={{ position: "absolute", top: "50%", left: "40%" }}
        onClick={() => alert("You clicked the fridge!")}
      >
        Fridge
      </button>
      <button
        style={{ position: "absolute", top: "60%", left: "60%" }}
        onClick={() => alert("You clicked the stove!")}
      >
        Stove
      </button>
    </div>
  );
}