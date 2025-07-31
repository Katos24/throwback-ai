// components/Auth/LoginForm.js
import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import styles from '../../styles/Login.module.css';

export function LoginForm({ onSuccess, onError, isDisabled }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isDisabled) return;
    setLoading(true);
    setErrorMsg('');

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setErrorMsg(error.message || 'Login failed.');
      onError?.(error.message);
    } else if (data?.session) {
      onSuccess?.(data.session);
    } else {
      const msg = 'Unexpected error: No session returned.';
      setErrorMsg(msg);
      onError?.(msg);
    }
  };

  return (
    <form onSubmit={handleLogin} className={styles.inputGroup}>
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
        placeholder="Password"
        className={styles.inputField}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isDisabled || loading}
        required
      />
      <button
        type="submit"
        className={styles.submitButton}
        disabled={isDisabled || loading}
      >
        {loading ? 'Logging in…' : 'Log In'}
      </button>
      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
    </form>
  );
}
