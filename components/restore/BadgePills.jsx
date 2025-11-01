import React from 'react';

export default function BadgePills() {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.75rem',
      justifyContent: 'center',
      marginTop: '1.5rem'
    }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        background: 'rgba(59, 130, 246, 0.1)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '999px',
        fontSize: '0.875rem',
        fontWeight: '500',
        color: '#60a5fa'
      }}>
        <span>⚡</span>
        Basic: 1 Credit
      </div>
      
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        background: 'rgba(168, 85, 247, 0.1)',
        border: '1px solid rgba(168, 85, 247, 0.3)',
        borderRadius: '999px',
        fontSize: '0.875rem',
        fontWeight: '500',
        color: '#c084fc'
      }}>
        <span>💎</span>
        Premium: 40 Credits
      </div>
      
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        background: 'rgba(34, 197, 94, 0.1)',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        borderRadius: '999px',
        fontSize: '0.875rem',
        fontWeight: '500',
        color: '#4ade80'
      }}>
        <span>🎁</span>
        50 Free Credits on Signup
      </div>
    </div>
  );
}