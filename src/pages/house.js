import { useRouter } from "next/router";

export default function House() {
  const router = useRouter();

  const handleGoUpstairs = () => {
    router.push("/room/upstairs");
  };

  const handleGoLivingRoom = () => {
    router.push("/room/livingroom");
  };

  return (
    <div
      style={{
        backgroundImage: "url('/images/house.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      {/* Right-side hotspot: Upstairs */}
      <div
        onClick={handleGoUpstairs}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "30%",
          height: "100%",
          cursor: "pointer",
          // backgroundColor: "rgba(0,0,255,0.2)", // for testing
        }}
        title="Go Upstairs"
      />

      {/* Left-side hotspot: Living Room */}
      <div
        onClick={handleGoLivingRoom}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "30%",
          height: "100%",
          cursor: "pointer",
          // backgroundColor: "rgba(0,255,0,0.2)", // for testing
        }}
        title="Go to Living Room"
      />
    </div>
  );
}
