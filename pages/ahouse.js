// pages/house.js
import { useRouter } from "next/router";


export default function House() {
  const router = useRouter();

  const handleGoUpstairs = () => router.push("/room/upstairs");
  const handleGoLivingRoom = () => router.push("/room/livingroom");
  const handleGoKitchen = () => router.push("/room/kitchen"); // ✅ NEW

  return (
    <main
      style={{
        backgroundImage: "url('/images/house.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        height: "80vh",
        position: "relative",
        margin: "0 auto",
        maxWidth: "1200px",
      }}
    >
      {/* Hotspot: Go Upstairs */}
      <div
        onClick={handleGoUpstairs}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "30%",
          height: "100%",
          cursor: "pointer",
        }}
        title="Go Upstairs"
      />

      {/* Hotspot: Go to Living Room */}
      <div
        onClick={handleGoLivingRoom}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "30%",
          height: "100%",
          cursor: "pointer",
        }}
        title="Go to Living Room"
      />

      {/* Hotspot: Go to Kitchen */}
      <div
        onClick={handleGoKitchen}
        style={{
          position: "absolute",
          top: 0,
          left: "30%",
          width: "40%",
          height: "100%",
          cursor: "pointer",
        }}
        title="Go to Kitchen"
      />
    </main>
  );
}
