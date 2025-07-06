import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function SignupForm({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setLoading(false);
      setErrorMsg(signUpError.message);
      return;
    }


    console.log('Updating username:', username, 'for user id:', user.id);

    if (user && username) {
      try {
        const res = await fetch('/api/update-profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, username, email }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to update profile');
      } catch (error) {
        setLoading(false);
        setErrorMsg('Failed to update username: ' + error.message);
        return;
      }
    }


    setLoading(false);
    alert('Signup successful! Please check your email to confirm your account.');
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Password (min 6 chars)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
        style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          backgroundColor: '#8bac0f',
          color: '#0f380f',
          fontWeight: 'bold',
          padding: '10px',
          borderRadius: 6,
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
    </form>
  );
}
