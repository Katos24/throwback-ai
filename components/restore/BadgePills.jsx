import React from 'react';
import { useRouter } from 'next/router';

export default function BadgePills() {
  const router = useRouter();

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    borderRadius: '999px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
        justifyContent: 'center',
        marginTop: '1.5rem'
      }}
    >
      <div
        style={{
          ...badgeStyle,
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          color: '#60a5fa'
        }}
      >
        <span>⚡</span>
        Basic: 1 Credit
      </div>

      <div
        style={{
          ...badgeStyle,
          background: 'rgba(168, 85, 247, 0.1)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          color: '#c084fc'
        }}
      >
        <span>💎</span>
        Premium: 40 Credits
      </div>

      <div
        onClick={() => router.push('/signup')}
        style={{
          ...badgeStyle,
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          color: '#4ade80'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(34, 197, 94, 0.2)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(34, 197, 94, 0.1)')}
      >
        <span>🎁</span>
        50 Free Credits on Signup
      </div>
    </div>
  );
}
