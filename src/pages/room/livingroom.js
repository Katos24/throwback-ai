import { useState } from "react";

export default function LivingRoom() {
  const playlistId = "PL7DA3D097D6FDBC02";
  const [playing, setPlaying] = useState(false);

  return (
    <div
      style={{
        backgroundImage: "url('/images/living-room.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      <button
        onClick={() => setPlaying(!playing)}
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          padding: "12px 20px",
          backgroundColor: playing ? "#ff4c4c" : "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        }}
      >
        {playing ? "Stop 90s Playlist" : "Play 90s Playlist"}
      </button>

      {playing && (
        <iframe
          style={{
            position: "absolute",
            bottom: "5%",
            right: "5%",
            width: "320px",
            height: "180px",
            borderRadius: "12px",
            boxShadow: "0 0 10px #000",
          }}
          src={`https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1&controls=1`}
          title="90s Playlist"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      )}
    </div>
  );
}