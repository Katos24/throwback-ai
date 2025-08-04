// components/Auth/LoginForm.js
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient';
import styles from '../../styles/Login.module.css';

export function LoginForm({ onSuccess, onError, isDisabled }) {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef(null);

  useEffect(() => {
    if (cooldown === 0 && cooldownRef.current) {
      clearInterval(cooldownRef.current);
      cooldownRef.current = null;
    }
  }, [cooldown]);

  const startCooldown = (seconds) => {
    setCooldown(seconds);
    cooldownRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownRef.current);
          cooldownRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isDisabled || loading || cooldown > 0) return;
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);

    if (error) {
      if (error.message.toLowerCase().includes('rate limit')) {
        setErrorMsg(
          "You've requested magic links too frequently. Please wait a moment before trying again."
        );
        onError?.("Rate limit exceeded. Try again later.");
      } else {
        setErrorMsg(error.message || 'Failed to send magic link.');
        onError?.(error.message || 'Failed to send magic link.');
      }
      setSuccessMsg('');
    } else {
      setSuccessMsg(
        '✅ Magic link sent! Please check your email and click the link to log in.'
      );
      setErrorMsg('');
      onSuccess?.();
      startCooldown(90); // disable button for 90 seconds
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
        disabled={isDisabled || loading || cooldown > 0}
        required
      />
      <button
        type="submit"
        className={styles.submitButton}
        disabled={isDisabled || loading || cooldown > 0}
      >
        {loading
          ? 'Sending magic link…'
          : cooldown > 0
          ? `Please wait ${cooldown}s`
          : 'Send Magic Link'}
      </button>
      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
      {successMsg && <p className={styles.success}>{successMsg}</p>}
    </form>
  );
}
