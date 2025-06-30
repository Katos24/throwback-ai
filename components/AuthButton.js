import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function AuthButton() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Get current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <div>
        <p>Signed in as {session.user.email}</p>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("/signin");
          }}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={async () => {
        // Redirect user to GitHub OAuth sign in
        const { error } = await supabase.auth.signInWithOAuth({ provider: "github" });
        if (error) alert(error.message);
      }}
    >
      Sign in with GitHub
    </button>
  );
}
