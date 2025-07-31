// components/Auth/SignupForm.js
import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import styles from '../../styles/Signup.module.css';

export function SignupForm({ onSuccess, onError, isDisabled }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (isDisabled) return;
    setLoading(true);
    setErrorMsg('');

    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      setErrorMsg(error.message || 'Signup failed.');
      onError?.(error.message);
      return;
    }

    // Check existing profile
    const userId = data.user?.id;
    if (userId) {
      const { data: profile, error: profErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (profErr && profErr.code !== 'PGRST116') {
        const msg = 'Error checking profile: ' + profErr.message;
        setErrorMsg(msg);
        onError?.(msg);
        return;
      }
      if (profile) {
        const msg = 'Profile exists. Please log in instead.';
        setErrorMsg(msg);
        onError?.(msg);
        return;
      }
    }

    onSuccess?.();
  };

  return (
    <form onSubmit={handleSignup} className={styles.inputGroup}>
      <input
        type="email"
        placeholder="Email"
        className={styles.inputField}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isDisabled || loading}
        required
      />
      <input
        type="password"
        placeholder="Password (min 6 chars)"
        className={styles.inputField}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isDisabled || loading}
        required
        minLength={6}
      />
      <button
        type="submit"
        className={styles.submitButton}
        disabled={isDisabled || loading}
      >
        {loading ? 'Signing up…' : 'Sign Up'}
      </button>
      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
    </form>
  );
}
