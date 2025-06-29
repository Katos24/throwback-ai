import { useRouter } from "next/router";

export default function Upstairs() {
  const router = useRouter();

  return (
    <main
      style={{
        backgroundImage: "url('/images/upstairs.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "calc(100vh - 120px)",
        position: "relative",
      }}
    >
      <button
        style={{ position: "absolute", top: "40%", left: "30%" }}
        onClick={() => alert("You clicked the hallway!")}
      >
        Hallway
      </button>
      <button
        style={{ position: "absolute", top: "55%", left: "60%" }}
        onClick={() => router.push("/room")}
      >
        Bedroom Door
      </button>
    </main>
  );
}
