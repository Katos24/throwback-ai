import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import styles from "../styles/Profile.module.css";

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
  const [authProvider, setAuthProvider] = useState(null);

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

      setAuthProvider(user?.app_metadata?.provider || null);

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

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading profile...</p>;

  return (
    <main className={styles.profileContainer}>
      <h1 className={styles.profileTitle}>🧍 Your Profile</h1>

      {error && <p className={styles.messageError}>{error}</p>}
      {message && <p className={styles.messageSuccess}>{message}</p>}

      <form onSubmit={handleSubmit} className={styles.profileForm}>
        <label className={styles.label}>
          <span className={styles.labelText}>Email</span>
          <input
            type="email"
            name="email"
            value={profile.email}
            readOnly
            className={styles.inputReadOnly}
          />
        </label>

        <label className={styles.label}>
          <span className={styles.labelText}>Username</span>
          <input
            type="text"
            name="username"
            placeholder="Your display name"
            value={profile.username}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </label>

        <div className={styles.statusText}>
          <span style={{ fontWeight: 600 }}>Credits Remaining:</span>{" "}
          <strong className={styles.creditsRemaining}>{profile.credits_remaining}</strong>
        </div>

        <button type="submit" disabled={loading} className={styles.buttonPrimary}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </main>
  );
}
