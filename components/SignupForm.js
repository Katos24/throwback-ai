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

    // Insert username to profiles table
    const { error: profileError } = await supabase.from('profiles').insert([
      { id: user.id, username }
    ]);

    setLoading(false);

    if (profileError) {
      setErrorMsg('Profile creation failed: ' + profileError.message);
      return;
    }

    alert('Signup successful! Please check your email to confirm.');
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
