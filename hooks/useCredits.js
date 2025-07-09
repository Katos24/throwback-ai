// /hooks/useCredits.js
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function useCredits() {
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkCredits = async () => {
      setLoading(true);
      // 1. Check if user is logged in
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        setIsLoggedIn(true);

        // Get profile credits
        const { data, error } = await supabase
          .from("profiles")
          .select("credits_remaining")
          .eq("id", session.user.id)
          .single();

        if (error || !data) {
          setCredits(0);
        } else {
          setCredits(data.credits_remaining || 0);
        }
      } else {
        // Not logged in — use localStorage
        setIsLoggedIn(false);

        const stored = localStorage.getItem("guest_credits");
        if (stored) {
          setCredits(parseInt(stored, 10));
        } else {
          // First time visitor → give 10 credits
          localStorage.setItem("guest_credits", "10");
          setCredits(10);
        }
      }
      setLoading(false);
    };

    checkCredits();
  }, []);

  // Deduct credits (both Supabase and localStorage)
  const deductCredits = async (amount) => {
    if (isLoggedIn) {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("credits_remaining")
        .eq("id", userId)
        .single();

      if (profile && !error) {
        const newCredits = Math.max(0, profile.credits_remaining - amount);
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ credits_remaining: newCredits })
          .eq("id", userId);

        if (!updateError) {
          setCredits(newCredits);
        }
      }
    } else {
      const stored = localStorage.getItem("guest_credits");
      const current = stored ? parseInt(stored, 10) : 10;
      const newCredits = Math.max(0, current - amount);
      localStorage.setItem("guest_credits", newCredits.toString());
      setCredits(newCredits);
    }
  };

  return { credits, deductCredits, loading };
}
