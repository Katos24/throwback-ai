import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.replace("/"); // Redirect to your home/dashboard
      } else {
        router.replace("/login");
      }
    };

    getSession();
  }, [router]);

  return <p>Logging you in…</p>;
}
