import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Subscribe() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);

    // Get currently logged-in user
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      alert('You must be signed in to subscribe.');
      setLoading(false);
      return;
    }

    // Call your API to create Stripe checkout session, passing supabaseUserId
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ supabaseUserId: user.id }),
    });

    const data = await res.json();

    if (res.ok && data.url) {
      // Redirect user to Stripe checkout
      window.location.href = data.url;
    } else {
      alert(data.error || 'Checkout error');
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Subscribe to Premium</h1>
      <button onClick={handleSubscribe} disabled={loading}>
        {loading ? 'Processing...' : 'Subscribe Now'}
      </button>
    </div>
  );
}
