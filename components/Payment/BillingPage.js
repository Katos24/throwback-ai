import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function BillingPage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      setMessage(null);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setMessage("You must be logged in.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("is_premium, credits")
        .eq("id", user.id)
        .single();

      if (error) {
        setMessage(`Error loading billing info: ${error.message}`);
      } else {
        setProfile(data);
      }
      setLoading(false);
    }

    loadProfile();
  }, []);

  const handleCancelSubscription = async () => {
    setMessage(null);
    setCancelLoading(true);

    try {
      const res = await fetch("/api/stripe/cancel-subscription", {
        method: "POST",
      });

      if (res.ok) {
        setMessage("Subscription cancellation requested.");
        setProfile((p) => ({ ...p, is_premium: false })); // optimistic update
      } else {
        const data = await res.json();
        setMessage(`Failed: ${data.error || "Something went wrong."}`);
      }
    } catch (error) {
      setMessage(`Request error: ${error.message}`);
    }

    setCancelLoading(false);
  };

  const handleOpenCustomerPortal = async () => {
    setMessage(null);
    setPortalLoading(true);

    try {
      const res = await fetch("/api/stripe/create-stripe-portal-session", {
        method: "POST",
      });

      if (res.ok) {
        const { url } = await res.json();
        window.location.href = url;
      } else {
        const data = await res.json();
        setMessage(`Failed: ${data.error || "Something went wrong."}`);
      }
    } catch (error) {
      setMessage(`Request error: ${error.message}`);
    }

    setPortalLoading(false);
  };

  if (loading) return <p>Loading billing info...</p>;
  if (!profile) return <p>{message}</p>;

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "2rem" }}>
      <h2>Billing</h2>
      <p>
        <strong>Premium Status:</strong> {profile.is_premium ? "Active" : "Free"}
      </p>
      <p>
        <strong>Credits:</strong> {profile.credits ?? 0}
      </p>

      {profile.is_premium ? (
        <>
          <button
            onClick={handleCancelSubscription}
            disabled={cancelLoading}
            style={{
              backgroundColor: "#f44336",
              color: "white",
              padding: "10px",
              borderRadius: 6,
              border: "none",
              marginRight: 10,
              cursor: cancelLoading ? "not-allowed" : "pointer",
            }}
          >
            {cancelLoading ? "Cancelling..." : "Cancel Subscription"}
          </button>

          <button
            onClick={handleOpenCustomerPortal}
            disabled={portalLoading}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px",
              borderRadius: 6,
              border: "none",
              cursor: portalLoading ? "not-allowed" : "pointer",
            }}
          >
            {portalLoading ? "Loading..." : "Manage Billing in Stripe"}
          </button>
        </>
      ) : (
        <p>You do not have an active subscription.</p>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}
