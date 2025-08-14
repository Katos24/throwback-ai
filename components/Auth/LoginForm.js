import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient';
import styles from '../../styles/Login.module.css';

export function LoginForm({ isDisabled }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const cooldownRef = useRef(null);

  useEffect(() => {
    if (cooldown === 0 && cooldownRef.current) {
      clearInterval(cooldownRef.current);
      cooldownRef.current = null;
    }
  }, [cooldown]);

  useEffect(() => {
    return () => {
      if (cooldownRef.current) clearInterval(cooldownRef.current);
    };
  }, []);

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

    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      setLoading(false);

      if (error) {
        const msg = error.message || 'Failed to send magic link.';
        if (msg.toLowerCase().includes('rate limit')) {
          setErrorMsg("You've requested magic links too frequently. Please wait a moment.");
        } else {
          setErrorMsg(msg);
        }
        return;
      }

      setSuccessMsg('✅ Magic link sent! Please check your email to log in.');
      startCooldown(90);
    } catch {
      setLoading(false);
      setErrorMsg('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <>
      {successMsg && (
        <div className={styles.successBox} role="status" aria-live="polite">
          <span>{successMsg}</span>
          <button
            type="button"
            className={styles.dismissBtn}
            onClick={() => setSuccessMsg('')}
          >
            OK
          </button>
        </div>
      )}

      {errorMsg && (
        <p className={styles.error} role="alert" aria-live="assertive">
          {errorMsg}
        </p>
      )}

      <form onSubmit={handleLogin} className={styles.inputGroup} aria-live="polite">
        <label htmlFor="login-email" className="sr-only">Email address</label>
        <input
          id="login-email"
          type="email"
          placeholder="Email"
          className={styles.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isDisabled || loading || cooldown > 0}
          required
          aria-label="Email address"
          autoComplete="email"
        />
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isDisabled || loading || cooldown > 0}
          aria-busy={loading}
        >
          {loading
            ? 'Sending magic link…'
            : cooldown > 0
            ? `Please wait ${cooldown}s`
            : 'Send Magic Link'}
        </button>
      </form>

      <p
        className={styles.infoText}
        style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#9ca3af', textAlign: 'center' }}
      >
        Please allow a few moments for the magic link email to arrive in your inbox.
      </p>
    </>
  );
}