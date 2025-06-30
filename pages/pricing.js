export default function Pricing() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: 900, margin: 'auto' }}>
      <h1>Choose the Plan That Fits You Best</h1>
      <p>Get access to awesome AI-generated 90s-style images with plans designed for casual creators and power users alike.</p>

      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, border: '2px solid #ccc', borderRadius: 10, padding: '1.5rem', textAlign: 'center' }}>
          <h2>Free</h2>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$0 / month</p>
          <ul style={{ textAlign: 'left', listStyle: 'disc', paddingLeft: '1.5rem' }}>
            <li>Generate up to 5 images per day</li>
            <li>Basic 90s styles</li>
            <li>Access to community gallery</li>
          </ul>
          <button style={{ marginTop: '1rem', padding: '0.75rem 2rem', backgroundColor: '#999', border: 'none', borderRadius: 6, color: 'white', cursor: 'not-allowed' }} disabled>
            Current Plan
          </button>
        </div>

        <div style={{ flex: 1, border: '2px solid #ff0080', borderRadius: 10, padding: '1.5rem', textAlign: 'center' }}>
          <h2>Premium</h2>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$6.99 / month</p>
          <ul style={{ textAlign: 'left', listStyle: 'disc', paddingLeft: '1.5rem' }}>
            <li>Unlimited image generation</li>
            <li>Advanced 90s styles & HD quality</li>
            <li>Priority support</li>
            <li>Early access to new features</li>
          </ul>
          <button
            style={{ marginTop: '1rem', padding: '0.75rem 2rem', backgroundColor: '#ff0080', border: 'none', borderRadius: 6, color: 'white', cursor: 'pointer' }}
            onClick={() => window.location.href = '/subscribe'}>
            Upgrade Now
          </button>
        </div>
      </div>
    </main>
  )
}
