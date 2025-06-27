import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Success() {
  const router = useRouter();

  useEffect(() => {
    // Mark user as premium for this session
    sessionStorage.setItem("premiumPaid", "true");
  }, []);

  return (
    <div>
      <h1>🎉 Payment Successful!</h1>
      <p>You now have access to premium AI styles.</p>
      <button onClick={() => router.push("/")}>Go back</button>
    </div>
  );
}