import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function useCredits() {
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const refreshCredits = async () => {
    setLoading(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      // Logged-in user
      setIsLoggedIn(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("credits_remaining")
        .eq("id", session.user.id)
        .single();

      if (error || !data) {
        setCredits(0);
      } else if (data.credits_remaining == null) {
        // First-time login → give 5 credits
        await supabase
          .from("profiles")
          .update({ credits_remaining: 5 })
          .eq("id", session.user.id);
        setCredits(5);
      } else {
        setCredits(data.credits_remaining);
      }
    } else {
      // Guest user (not logged in)
      setIsLoggedIn(false);

      const stored = localStorage.getItem("guest_attempts");
      if (stored !== null) {
        setCredits(parseInt(stored, 10));
      } else {
        // New guest → start with 1 credit
        localStorage.setItem("guest_attempts", "1");
        setCredits(1);
      }
    }

    setLoading(false);
  };

  const deductCredits = (amount) => {
    if (isLoggedIn) {
      setCredits((prev) => Math.max(0, prev - amount));
    } else {
      const stored = localStorage.getItem("guest_attempts");
      const current = stored ? parseInt(stored, 10) : 1; // default now 1
      const newCredits = Math.max(0, current - amount);
      localStorage.setItem("guest_attempts", newCredits.toString());
      setCredits(newCredits);
    }
  };

  useEffect(() => {
    refreshCredits();
  }, []);

  return { credits, deductCredits, loading, isLoggedIn, refreshCredits };
}
