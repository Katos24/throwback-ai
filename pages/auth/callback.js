import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
      const { data: { session }, error } = await supabase.auth.getSessionFromUrl({
        storeSession: true, // saves session in local storage / cookie
      });

      if (error) {
        console.error("Auth callback error:", error.message);
        router.replace("/login"); // send to login on error
        return;
      }

      if (session) {
        router.replace("/"); // logged in, send to home
      } else {
        router.replace("/login"); // fallback
      }
    };

    handleRedirect();
  }, [router]);

  return <p>Logging you in…</p>;
}
