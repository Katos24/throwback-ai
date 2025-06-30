import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const signInWithGithub = async () => {
    setErrorMsg("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) setErrorMsg(error.message);
    setLoading(false);
  };

  const signInWithEmail = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg("Check your email for the login link!");
      setEmail("");
    }
    setLoading(false);
  };

  return (
    <main style={{ maxWidth: 400, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Sign In</h1>

      <button
        type="button"
        onClick={signInWithGithub}
        disabled={loading}
        style={{
          width: "100%",
          padding: "0.75rem",
          marginBottom: "1rem",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Loading..." : "Sign in with GitHub"}
      </button>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

      <hr style={{ margin: "2rem 0" }} />

      <form onSubmit={signInWithEmail}>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            boxSizing: "border-box",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.75rem",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Sending..." : "Send Magic Link"}
        </button>
      </form>

      <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        Don’t have an account? <a href="/signup">Sign up here</a>
      </p>
    </main>
  );
}
