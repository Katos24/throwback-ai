export default function Cancel() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: 600, margin: 'auto', textAlign: 'center' }}>
      <h1>Subscription Canceled</h1>
      <p>Your subscription process was canceled. No payment was made.</p>
      <p>If you change your mind, you can always subscribe later.</p>
      <a href="/pricing" style={{ display: 'inline-block', marginTop: '1.5rem', color: '#ff0080', textDecoration: 'underline' }}>
        Back to Pricing
      </a>
    </main>
  );
}