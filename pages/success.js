import { useEffect, useState } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

export default function Success() {
  const [supabase] = useState(() => createPagesBrowserClient());
  const [profile, setProfile] = useState(null);

  // Optimistic UI assumes premium immediately
  const optimisticPremium = true;

  useEffect(() => {
    let intervalId;

    async function checkPremium() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("is_premium")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      setProfile(data);

      if (data?.is_premium) {
        clearInterval(intervalId);
      }
    }

    checkPremium(); // immediate first check
    intervalId = setInterval(checkPremium, 3000); // every 3 seconds

    // Redirect after 10 seconds
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 10000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timer);
    };
  }, [supabase]);

  return (
    <div>
      <h1>🎉 Thank you for your purchase!</h1>
      <p>
        {profile?.is_premium === false && "Your upgrade is processing..."}
        {(profile?.is_premium || optimisticPremium) &&
          "Congrats, you’re now a premium user! Enjoy your perks."}
      </p>
      <p>Redirecting to home in 10 seconds...</p>
    </div>
  );
}
