import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function BillingPage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setMessage('You must be logged in.');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('is_premium, credits')
        .eq('id', user.id)
        .single();

      if (error) {
        setMessage(`Error loading billing info: ${error.message}`);
      } else {
        setProfile(data);
      }
      setLoading(false);
    }

    fetchProfile();
  }, []);

  const handleCancelSubscription = async () => {
    setMessage(null);
    setCancelLoading(true);

    const session = await supabase.auth.getSession();
    if (!session) {
      setMessage("You must be logged in.");
      setCancelLoading(false);
      return;
    }

    const res = await fetch('/api/stripe/cancel-subscription', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      // If your API needs subscription ID or other info, add body here, e.g.:
      // body: JSON.stringify({ subscriptionId: profile.stripe_subscription_id }),
    });

    if (res.ok) {
      setMessage('Subscription cancellation requested.');
      setProfile((p) => ({ ...p, is_premium: false })); // optimistic update
    } else {
      const data = await res.json();
      setMessage(`Failed: ${data.error || 'Something went wrong.'}`);
    }

    setCancelLoading(false);
  };

  const handleOpenCustomerPortal = async () => {
    setMessage(null);
    setPortalLoading(true);

    const session = await supabase.auth.getSession();
    if (!session) {
      setMessage("You must be logged in.");
      setPortalLoading(false);
      return;
    }

    const res = await fetch('/api/stripe/create-stripe-portal-session', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      const { url } = await res.json();
      window.location.href = url; // redirect to Stripe customer portal
    } else {
      const data = await res.json();
      setMessage(`Failed: ${data.error || 'Something went wrong.'}`);
    }

    setPortalLoading(false);
  };

  if (loading) return <p>Loading billing info...</p>;
  if (!profile) return <p>{message}</p>;

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: '2rem' }}>
      <h2>Billing</h2>
      <p><strong>Premium Status:</strong> {profile.is_premium ? 'Active' : 'Free'}</p>
      <p><strong>Credits:</strong> {profile.credits ?? 0}</p>

      {profile.is_premium ? (
        <>
          <button
            onClick={handleCancelSubscription}
            disabled={cancelLoading}
            style={{
              backgroundColor: '#f44336',
              color: 'white',
              padding: '10px',
              borderRadius: 6,
              border: 'none',
              marginRight: '10px',
              cursor: cancelLoading ? 'not-allowed' : 'pointer',
            }}
          >
            {cancelLoading ? 'Cancelling...' : 'Cancel Subscription'}
          </button>

          <button
            onClick={handleOpenCustomerPortal}
            disabled={portalLoading}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px',
              borderRadius: 6,
              border: 'none',
              cursor: portalLoading ? 'not-allowed' : 'pointer',
            }}
          >
            {portalLoading ? 'Loading...' : 'Manage Billing in Stripe'}
          </button>
        </>
      ) : (
        <p>You do not have an active subscription.</p>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}
