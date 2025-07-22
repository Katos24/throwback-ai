import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

const CREDIT_PACKS = [
  {
    id: process.env.NEXT_PUBLIC_PRICE_DAWN_PACK,
    name: "Dawn Pack",
    credits: 400,
    price: "$4.99",
    revivals: 10, // Each photo revival costs 40 credits
    tagline: "Perfect for trying out Anastasis magic — restore a few cherished memories.",
    useCase: "Great for testing the waters or refreshing a handful of your most meaningful portraits.",
  },
  {
    id: process.env.NEXT_PUBLIC_PRICE_REVIVAL_PACK,
    name: "Revival Pack",
    credits: 1000,
    price: "$9.99",
    revivals: 25,
    tagline: "A solid bundle for breathing new life into vintage family shots.",
    useCase: "Ideal for themed mini galleries, vacation snaps, or honoring loved ones with restored detail.",
  },
  {
    id: process.env.NEXT_PUBLIC_PRICE_RESURGENCE_PACK,
    name: "Resurgence Pack",
    credits: 1600,
    price: "$14.99",
    revivals: 40,
    tagline: "A popular pick for curating full-family albums and restoring event photos.",
    useCase: "Great for birthdays, reunions, pet portraits, or weaving stories across generations.",
  },
  {
    id: process.env.NEXT_PUBLIC_PRICE_ETERNAL_PACK,
    name: "Eternal Pack",
    credits: 3500,
    price: "$29.99",
    revivals: 87,
    tagline: "Built for legacy-level restoration — preserve history at scale.",
    useCase: "Ideal for memory books, heritage tributes, holiday archives, and digital scrapbooking.",
  },
];

export default function Pricing() {
  const [loadingId, setLoadingId] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user);
    });
  }, []);

  const handlePurchase = async (selectedPriceId) => {
    if (!user) {
      alert("Please log in to make a purchase.");
      return;
    }

    setLoadingId(selectedPriceId);

    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          supabaseUserId: user.id,
          email: user.email,
          selectedPriceId,
        }),
      });

      if (!res.ok) throw new Error("Failed to create checkout session");

      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      alert(err.message);
      setLoadingId(null);
    }
  };

  return (
    <main
      style={{
        maxWidth: "1000px",
        margin: "auto",
        padding: "2rem",
        fontFamily: "'Segoe UI', sans-serif",
        backgroundColor: "#f9f7f3",
        color: "#3b3b3b",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        Credit Packs for Timeless Restorations
      </h1>
      <p
        style={{
          fontSize: "1rem",
          color: "#5a5a5a",
          textAlign: "center",
        }}
      >
        Whether you are reviving faded memories, curating holiday albums, or
        preserving family heritage — Anastasis Credit Packs give you the power
        to restore with precision and beauty.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem",
          marginTop: "3rem",
        }}
      >
        {CREDIT_PACKS.map(
          ({ id, name, credits, price, tagline, useCase, revivals }) => (
            <div
              key={id}
              style={{
                border: "2px solid #bfae82",
                borderRadius: "12px",
                backgroundColor: "#fff",
                padding: "1.75rem",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.07)",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "0.5rem",
                  color: "#5e2e82",
                }}
              >
                {name}
              </h2>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  marginBottom: "0.25rem",
                }}
              >
                {price} • {credits} credits
              </p>
              <p
                style={{
                  fontStyle: "italic",
                  color: "#6e6e6e",
                  marginBottom: "1rem",
                }}
              >
                {tagline}
              </p>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "#4a4a4a",
                }}
              >
                {useCase}
              </p>

              {/* Here is the hardcoded revivals line: */}
              <p
                style={{
                  fontWeight: "600",
                  marginTop: "0.5rem",
                  color: "#5e2e82",
                }}
              >
                Premium Revivals: {revivals}
              </p>

              <button
                onClick={() => handlePurchase(id)}
                disabled={loadingId === id}
                style={{
                  marginTop: "1.5rem",
                  padding: "0.75rem 2rem",
                  backgroundColor: "#5e2e82",
                  border: "none",
                  borderRadius: "6px",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "1rem",
                  cursor: loadingId === id ? "wait" : "pointer",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                }}
              >
                {loadingId === id ? "Processing..." : "Buy Now"}
              </button>
            </div>
          )
        )}
      </div>
    </main>
  );
}
