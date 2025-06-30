import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      // Redirect to home page on successful sign-in
      router.push("/");
    }
  };

  return (
    <main style={{ maxWidth: 400, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Sign In</h1>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <form onSubmit={handleSignIn} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: "#8bac0f",
            color: "#0f380f",
            fontWeight: "bold",
            padding: "10px",
            borderRadius: 6,
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        Don&apos;t have an account? <Link href="/signup">Sign up here</Link>
      </p>
    </main>
  );
}
