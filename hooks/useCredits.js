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
      setIsLoggedIn(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("credits_remaining")
        .eq("id", session.user.id)
        .single();

      if (error || !data) {
        setCredits(0);
      } else {
        if (data.credits_remaining == null) {
          // Initialize only if credits_remaining is null or undefined
          await supabase
            .from("profiles")
            .update({ credits_remaining: 10 })
            .eq("id", session.user.id);
          setCredits(10);
        } else {
          // Use existing credits_remaining value, even if 0
          setCredits(data.credits_remaining);
        }
      }
    } else {
      setIsLoggedIn(false);

      const stored = localStorage.getItem("guest_attempts");
      if (stored !== null) {
        setCredits(parseInt(stored, 10));
      } else {
        localStorage.setItem("guest_attempts", "3");
        setCredits(3);
      }
    }
    setLoading(false);
  };

  // Just update frontend state; backend deduct is separate
  const deductCredits = (amount) => {
    if (isLoggedIn) {
      setCredits((prev) => Math.max(0, prev - amount));
    } else {
      const stored = localStorage.getItem("guest_attempts");
      const current = stored ? parseInt(stored, 10) : 3;
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
