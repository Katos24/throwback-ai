import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push('/house');
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: 400,
        margin: 'auto',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <label style={{ display: 'flex', flexDirection: 'column' }}>
        Email
        <input
          type="email"
          placeholder="Email"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: 8,
            borderRadius: 4,
            border: '1px solid #ccc',
            marginTop: 4,
          }}
        />
      </label>

      <label style={{ display: 'flex', flexDirection: 'column' }}>
        Password
        <input
          type="password"
          placeholder="Password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: 8,
            borderRadius: 4,
            border: '1px solid #ccc',
            marginTop: 4,
          }}
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        style={{
          backgroundColor: loading ? '#999' : '#4CAF50',
          color: 'white',
          fontWeight: 'bold',
          padding: '10px',
          borderRadius: 6,
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Logging in...' : 'Log In'}
      </button>

      {errorMsg && (
        <p style={{ color: 'red', marginTop: 0 }}>{errorMsg}</p>
      )}
    </form>
  );
}
