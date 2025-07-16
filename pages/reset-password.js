import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function ResetPassword() {
  const router = useRouter();
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const [status, setStatus] = useState("Validating link...");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function verifyRecovery() {
      try {
        // Check if URL has recovery token query params
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get("access_token");
        const type = urlParams.get("type");

        if (accessToken && type === "recovery") {
          const { data, error } = await supabase.auth.getSessionFromUrl({ storeSession: true });
          if (error) {
            setError(error.message);
            setStatus(null);
          } else {
            setSessionLoaded(true);
            setStatus(null);
          }
        } else {
          setError("Invalid or expired recovery link.");
          setStatus(null);
        }
      } catch (err) {
        setError("Unexpected error: " + err.message);
        setStatus(null);
      }
    }
    verifyRecovery();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setStatus("✅ Password updated! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  return (
    <main style={{ maxWidth: 400, margin: "3rem auto", padding: 20 }}>
      <h1>🔑 Reset Your Password</h1>
      {status && <p>{status}</p>}
      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      {!sessionLoaded ? null : (
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
              cursor: "pointer",
            }}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      )}
    </main>
  );
}
