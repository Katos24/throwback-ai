import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Pricing() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
      }
    });
  }, []);

  const handleUpgrade = async () => {
    if (!user) {
      alert("Please log in before upgrading.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ supabaseUserId: user.id, email: user.email }),
      });

      if (!res.ok) throw new Error('Checkout session creation failed');

      const { url } = await res.json();

      window.location.href = url;
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        maxWidth: 900,
        margin: "auto",
      }}
    >
      <h1>Choose the Plan That Fits You Best</h1>
      <p>
        Get access to awesome AI-generated 90s-style images with plans designed
        for casual creators and power users alike.
      </p>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          marginTop: "2rem",
          flexWrap: "wrap",
        }}
      >
        {/* Free Plan */}
        <div
          style={{
            flex: 1,
            border: "2px solid #ccc",
            borderRadius: 10,
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <h2>Free</h2>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>$0 / month</p>
          <ul
            style={{
              textAlign: "left",
              listStyle: "disc",
              paddingLeft: "1.5rem",
            }}
          >
            <li>Generate up to 5 images per day</li>
            <li>Basic 90s styles</li>
            <li>Access to community gallery</li>
          </ul>
          {/* Disable if user is premium */}
          <button
            style={{
              marginTop: "1rem",
              padding: "0.75rem 2rem",
              backgroundColor: user?.is_premium ? "#999" : "#ff0080",
              border: "none",
              borderRadius: 6,
              color: "white",
              cursor: user?.is_premium ? "not-allowed" : "pointer",
            }}
            disabled={user?.is_premium}
            onClick={() => alert('You are already a premium user')}
          >
            {user?.is_premium ? "You are Premium" : "Current Plan"}
          </button>
        </div>

        {/* Premium Plan */}
        <div
          style={{
            flex: 1,
            border: "2px solid #ff0080",
            borderRadius: 10,
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <h2>Premium</h2>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            $6.99 / month
          </p>
          <ul
            style={{
              textAlign: "left",
              listStyle: "disc",
              paddingLeft: "1.5rem",
            }}
          >
            <li>Unlimited image generation</li>
            <li>Advanced 90s styles & HD quality</li>
            <li>Priority support</li>
            <li>Early access to new features</li>
          </ul>
          <button
            style={{
              marginTop: "1rem",
              padding: "0.75rem 2rem",
              backgroundColor: "#ff0080",
              border: "none",
              borderRadius: 6,
              color: "white",
              cursor: loading ? "wait" : "pointer",
            }}
            onClick={handleUpgrade}
            disabled={loading || user?.is_premium}
          >
            {loading ? "Redirecting..." : user?.is_premium ? "Already Premium" : "Upgrade Now"}
          </button>
        </div>
      </div>
    </main>
  );
}
