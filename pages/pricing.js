import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import styles from "../styles/Pricing.module.css";

const CREDIT_PACKS = [
  {
    id: process.env.NEXT_PUBLIC_PRICE_DAWN_PACK,
    name: "Dawn Pack",
    credits: 400,
    price: "$4.99",
    revivals: 10,
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
    <section className={styles.honestPricing}>
      <h1>Credit Packs for Timeless Restorations</h1>
      <p className={styles.subtitle}>
        Whether you&apos;re reviving faded memories, curating albums, or preserving heritage — Anastasis Credit Packs give you the power to restore with beauty.
      </p>

      <div className={styles.packGrid}>
        {CREDIT_PACKS.map(({ id, name, credits, price, tagline, useCase, revivals }) => (
          <div key={id} className={styles.anastasisCard}>
            <h2>{name}</h2>
            <p><strong>{price}</strong> • {credits} credits</p>
            <p><em>{tagline}</em></p>
            <p>{useCase}</p>
            <p className={styles.revivalsInfo}>Premium Revivals: {revivals}</p>

            <button
              className={styles.buyBtn}
              onClick={() => handlePurchase(id)}
              disabled={loadingId === id}
            >
              {loadingId === id ? "Processing..." : "Buy Now"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
