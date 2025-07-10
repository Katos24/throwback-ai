import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

const CREDIT_PACKS = [
  {
    id: process.env.NEXT_PUBLIC_PRICE_DAWN_PACK,
    name: "Dawn Pack",
    credits: 400,
    price: "$4.99",
  },
  {
    id: process.env.NEXT_PUBLIC_PRICE_REVIVAL_PACK,
    name: "Revival Pack",
    credits: 1000,
    price: "$9.99",
  },
  {
    id: process.env.NEXT_PUBLIC_PRICE_RESURGENCE_PACK,
    name: "Resurgence Pack",
    credits: 1600,
    price: "$14.99",
  },
  {
    id: process.env.NEXT_PUBLIC_PRICE_ETERNAL_PACK,
    name: "Eternal Pack",
    credits: 3500,
    price: "$29.99",
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

    console.log("Purchasing priceId:", selectedPriceId);
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
    <main style={{ maxWidth: 900, margin: "auto", padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Buy Credit Packs</h1>
      <p>Choose a pack and get credits for Anastasis AI image restoration.</p>

      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginTop: "2rem" }}>
        {CREDIT_PACKS.map(({ id, name, credits, price }) => (
          <div
            key={id}
            style={{
              flex: "1 1 200px",
              border: "2px solid #ff0080",
              borderRadius: 10,
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <h2>{name}</h2>
            <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{price}</p>
            <p><strong>{credits} credits</strong></p>
            <button
              onClick={() => handlePurchase(id)}
              disabled={loadingId === id}
              style={{
                marginTop: "1rem",
                padding: "0.75rem 2rem",
                backgroundColor: "#ff0080",
                border: "none",
                borderRadius: 6,
                color: "white",
                cursor: loadingId === id ? "wait" : "pointer",
              }}
            >
              {loadingId === id ? "Processing..." : "Buy Now"}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
