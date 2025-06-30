// pages/premium-test.js
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export async function getServerSideProps(ctx) {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error('Supabase session error:', error);
  }

  return {
    props: {
      user: session?.user || null,
    },
  };
}

export default function PremiumTest({ user }) {
  return (
    <main style={{ padding: 40, fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h1>Premium Feature Test</h1>

      {user ? (
        <button
          style={{
            padding: "12px 24px",
            backgroundColor: "#FF00FF",
            color: "#000",
            fontWeight: "bold",
            borderRadius: 6,
            cursor: "pointer",
          }}
          onClick={() => alert("Premium feature unlocked!")}
        >
          ✨ Use Premium Feature
        </button>
      ) : (
        <p style={{ color: "red", fontWeight: "bold" }}>
          You must be logged in to access premium features.
        </p>
      )}
    </main>
  );
}
