// components/Auth/SignupForm.js
import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import styles from '../../styles/Signup.module.css';

export function SignupForm({ onSuccess, onError, isDisabled }) {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (isDisabled) return;
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'https://throwbackai.app/auth/callback', // adjust to your redirect URL
      },
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message || 'Failed to send magic link.');
      onError?.(error.message || 'Failed to send magic link.');
      return;
    }

    onSuccess?.();
  };

  return (
    <form onSubmit={handleSignup} className={styles.inputGroup}>
      <input
        type="email"
        placeholder="Enter your email"
        className={styles.inputField}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isDisabled || loading}
        required
      />
      <button
        type="submit"
        className={styles.submitButton}
        disabled={isDisabled || loading}
      >
        {loading ? 'Sending magic link…' : 'Send Magic Link'}
      </button>
      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
    </form>
  );
}
