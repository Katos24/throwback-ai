export default function BigBrotherRoom() {
  return (
    <div
      style={{
        backgroundImage: "url('/images/bigbrother.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      {/* Add interactive stuff here */}
      <button
        style={{ position: "absolute", top: "45%", left: "55%" }}
        onClick={() => alert("You picked up the SNES controller!")}
      >
        SNES
      </button>
    </div>
  );
}