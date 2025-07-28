import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function ResetPassword() {
  const router = useRouter();
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function handleRecovery() {
      // getSessionFromUrl reads the token in URL hash and sets session
      const { data, error } = await supabase.auth.getSessionFromUrl();
      if (error) {
        setStatus(`❌ ${error.message}`);
        setSessionLoaded(false);
      } else {
        setSessionLoaded(true);
      }
    }
    handleRecovery();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    if (password !== confirmPassword) {
      setStatus("❌ Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setStatus("❌ Password should be at least 6 characters.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setStatus(`❌ ${error.message}`);
    } else {
      setStatus("✅ Password updated! Redirecting...");
      setTimeout(() => router.push("/login"), 2000);
    }
    setLoading(false);
  };

  return (
    <main style={{ maxWidth: 400, margin: "3rem auto", padding: 20 }}>
      <h1>🔑 Reset Your Password</h1>
      {status && <p>{status}</p>}

      {!sessionLoaded ? (
        <p>Validating reset link...</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <input
            type="password"
            placeholder="New password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: 10, border: "1px solid #ccc", borderRadius: 6 }}
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ padding: 10, border: "1px solid #ccc", borderRadius: 6 }}
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
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      )}
    </main>
  );
}
