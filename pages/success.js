import { useEffect, useState } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

export default function Success() {
  const [supabase] = useState(() => createPagesBrowserClient());
  const [profile, setProfile] = useState(null);

  // Assume premium true optimistically right away
  const optimisticPremium = true;

  useEffect(() => {
    // Start fetch in background, but UI already shows premium
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase
        .from("profiles")
        .select("is_premium")
        .eq("id", user.id)
        .single()
        .then(({ data }) => setProfile(data));
    });

    // Redirect after 5 seconds
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1>🎉 Thank you for your purchase!</h1>
      <p>
        {profile?.is_premium === false && "Your upgrade is processing..."}
        {(profile?.is_premium || optimisticPremium) &&
          "Congrats, you’re now a premium user! Enjoy your perks."}
      </p>
      <p>Redirecting to home in 5 seconds...</p>
    </div>
  );
}
