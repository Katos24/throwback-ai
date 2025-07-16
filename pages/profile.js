import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    is_premium: false,
    credits_remaining: 0,
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [resetMessage, setResetMessage] = useState(null);
  const [resetLoading, setResetLoading] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      setMessage(null);
      setError(null);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setError("You must be logged in to view your profile.");
        setLoading(false);
        return;
      }

      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("username, is_premium, credits_remaining")
        .eq("id", user.id)
        .single();

      if (profileError) {
        setError(`Failed to load profile: ${profileError.message}`);
      } else if (data) {
        setProfile({
          username: data.username || "",
          email: user.email,
          is_premium: data.is_premium || false,
          credits_remaining: data.credits_remaining || 0,
        });
      }
      setLoading(false);
    }

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setError("You must be logged in to update your profile.");
      setLoading(false);
      return;
    }

    const { error: updateError } = await supabase.from("profiles").upsert({
      id: user.id,
      username: profile.username,
      updated_at: new Date().toISOString(),
    });

    if (updateError) {
      setError(`Update failed: ${updateError.message}`);
    } else {
      setMessage("✅ Profile updated successfully!");
    }
    setLoading(false);
  };

  const handleResetPassword = async () => {
    setResetMessage(null);
    setResetLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(profile.email, {
      redirectTo: "https://throwbackai.app/reset-password",
    });

    if (error) {
      setResetMessage(`❌ ${error.message}`);
    } else {
      setResetMessage("📧 Password reset email sent! Check your inbox.");
    }
    setResetLoading(false);
  };

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading profile...</p>;

  return (
    <main
      style={{
        maxWidth: 440,
        margin: "3rem auto",
        padding: "2rem",
        fontFamily: "Segoe UI, Arial, sans-serif",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 0 20px rgba(0,0,0,0.08)",
      }}
    >
      <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem", textAlign: "center" }}>
        🧍 Your Profile
      </h1>

      {error && (
        <p style={{ color: "#c00", background: "#fee", padding: 8, borderRadius: 6 }}>{error}</p>
      )}
      {message && (
        <p style={{ color: "#060", background: "#e6ffe6", padding: 8, borderRadius: 6 }}>
          {message}
        </p>
      )}
      {resetMessage && (
        <p style={{ marginTop: 8, background: "#f0f8ff", padding: 8, borderRadius: 6 }}>
          {resetMessage}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <label>
          <span style={{ fontWeight: 600 }}>Email</span>
          <input
            type="email"
            name="email"
            value={profile.email}
            readOnly
            style={{
              padding: 10,
              borderRadius: 6,
              border: "1px solid #ccc",
              backgroundColor: "#f5f5f5",
              fontSize: "1rem",
              cursor: "not-allowed",
              marginTop: 4,
            }}
          />
        </label>

        <label>
          <span style={{ fontWeight: 600 }}>Username</span>
          <input
            type="text"
            name="username"
            placeholder="Your display name"
            value={profile.username}
            onChange={handleChange}
            style={{
              padding: 10,
              borderRadius: 6,
              border: "1px solid #ccc",
              fontSize: "1rem",
              marginTop: 4,
            }}
            required
          />
        </label>

        <div style={{ marginTop: 6 }}>
          <span style={{ fontWeight: 600 }}>Subscription Status:</span>{" "}
          <strong style={{ color: profile.is_premium ? "#2e8b57" : "#555" }}>
            {profile.is_premium ? "🌟 Premium User" : "Free User"}
          </strong>
        </div>

        <div style={{ marginTop: 6 }}>
          <span style={{ fontWeight: 600 }}>Credits Remaining:</span>{" "}
          <strong style={{ color: "#0077cc" }}>{profile.credits_remaining}</strong>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: loading ? "#888" : "#0077cc",
            color: "white",
            padding: "12px 16px",
            borderRadius: 8,
            border: "none",
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
            marginTop: "1rem",
            transition: "background 0.3s ease",
          }}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={handleResetPassword}
          disabled={resetLoading}
          style={{
            marginTop: "1rem",
            backgroundColor: resetLoading ? "#888" : "#555",
            color: "white",
            padding: "12px 16px",
            borderRadius: 8,
            border: "none",
            fontSize: "1rem",
            cursor: resetLoading ? "not-allowed" : "pointer",
          }}
        >
          {resetLoading ? "Sending..." : "Reset Password"}
        </button>
      </form>
    </main>
  );
}
