import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Confetti from "react-confetti";

export default function Success() {
  const router = useRouter();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Mark user as premium for this session
    sessionStorage.setItem("premiumPaid", "true");

    // Redirect after 5 seconds
    const timer = setTimeout(() => router.push("/"), 5000);

    // Get window size for confetti
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Confetti width={windowSize.width} height={windowSize.height} />
      <main
        style={{
          padding: "2rem",
          fontFamily: "Arial, sans-serif",
          maxWidth: 600,
          margin: "auto",
          textAlign: "center",
        }}
      >
        <h1>🎉 Payment Successful!</h1>
        <p>Thank you for subscribing to Throwback AI Premium.</p>
        <p>You now have access to unlimited AI images and advanced 90s styles.</p>
        <p>Redirecting to home page...</p>
      </main>
    </>
  );
}
