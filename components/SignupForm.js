// components/SignupForm.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export default function SignupForm({ onSuccess, onError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Sign up user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      if (onError) onError(error.message);
      setLoading(false);
      return;
    }

    // 2. Insert extra profile data
    const user = data.user;
    if (user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ full_name: fullName })
        .eq('id', user.id);

      if (profileError) {
        if (onError) onError(profileError.message);
        setLoading(false);
        return;
      }
    }

    if (onSuccess) onSuccess();
    // ✅ Redirect to success page
    router.push('/signup-success');

    // Reset form
    setEmail('');
    setPassword('');
    setFullName('');
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
      />
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
    </form>
  );
}
