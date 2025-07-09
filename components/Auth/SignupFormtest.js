import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function SignupForm({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    if (data?.user) {
      // Insert profile row for new user
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            email: data.user.email,
            username: '',
            credits: 10,
            credits_remaining: 10,
            is_premium: false,
          },
        ]);

      if (profileError) {
        setErrorMsg('Failed to create profile: ' + profileError.message);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    setSuccessMsg('✅ Signup successful! Please check your email to confirm.');

    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
      />
      <input
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
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
    </form>
  );
}
