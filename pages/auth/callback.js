import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        // User logged in successfully
        router.replace("/"); // or your app's landing page
      } else {
        // No session — redirect to login
        router.replace("/login");
      }
    });
  }, [router]);

  return <p>Logging you in…</p>;
}
