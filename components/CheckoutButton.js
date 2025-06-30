import { useState } from 'react';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

export default function CheckoutButton() {
  const [supabase] = useState(() => createPagesBrowserClient());
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('You must be signed in!');
        setLoading(false);
        return;
      }

      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ supabaseUserId: user.id }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`Checkout error: ${errorData.error || 'Unknown error'}`);
        setLoading(false);
        return;
      }

      const { url } = await res.json();
      window.location.href = url;
    } catch (error) {
      alert('Checkout failed, please try again.');
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <button onClick={handleCheckout} disabled={loading}>
      {loading ? 'Processing...' : 'Start Checkout'}
    </button>
  );
}
