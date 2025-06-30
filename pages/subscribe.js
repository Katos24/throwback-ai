import { useState } from 'react';

export default function Subscribe() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/create-checkout-session', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        alert('Error starting checkout.');
        setLoading(false);
      }
    } catch (err) {
      alert('Error starting checkout.');
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: 600, margin: 'auto' }}>
      <h1>Subscribe to Premium</h1>
      <p>Unlock unlimited AI image generation, advanced 90s styles, and priority support for $6.99/month.</p>
      <button
        onClick={handleSubscribe}
        disabled={loading}
        style={{
          backgroundColor: '#ff0080',
          color: 'white',
          padding: '1rem 2rem',
          fontSize: '1.25rem',
          border: 'none',
          borderRadius: 6,
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Processing...' : 'Subscribe Now'}
      </button>
    </main>
  );
}
