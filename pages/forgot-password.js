import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      setMessage(`❌ ${error.message}`);
    } else {
      setMessage("✅ Check your email for the reset link!");
    }
    setLoading(false);
  };

  return (
    <main style={{ maxWidth: 400, margin: "3rem auto", padding: 20 }}>
      <h1>🔒 Forgot Password</h1>
      {message && <p>{message}</p>}
      <form
        onSubmit={handleReset}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 10, border: "1px solid #ccc", borderRadius: 6 }}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: "#0070f3",
            color: "white",
            padding: "10px",
            borderRadius: 6,
            border: "none",
            cursor: loading ? "default" : "pointer",
          }}
        >
          {loading ? "Sending..." : "Send Reset Email"}
        </button>
      </form>
    </main>
  );
}
