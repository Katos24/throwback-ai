import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient';
import styles from '../../styles/Login.module.css';

export function LoginForm({ isDisabled }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [showEmailHint, setShowEmailHint] = useState(false);
  const cooldownRef = useRef(null);
  const emailInputRef = useRef(null);

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

  // Enhanced email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    // Clear previous messages when user starts typing
    if (errorMsg) setErrorMsg('');
    if (successMsg) setSuccessMsg('');
    
    // Real-time email validation (only show after user has typed something substantial)
    if (newEmail.length > 3) {
      const isValid = validateEmail(newEmail);
      setEmailValid(isValid);
      setShowEmailHint(!isValid && newEmail.includes('@'));
    } else {
      setEmailValid(true);
      setShowEmailHint(false);
    }
  };

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

  const categorizeError = (errorMessage) => {
    const msg = errorMessage.toLowerCase();
    
    if (msg.includes('rate limit') || msg.includes('too many requests')) {
      return {
        type: 'rate_limit',
        title: 'Slow down there! 🚦',
        message: "You've requested magic links too frequently. Please wait a moment before trying again.",
        canRetry: true,
        retryDelay: 60
      };
    }
    
    if (msg.includes('invalid email') || msg.includes('email not valid')) {
      return {
        type: 'invalid_email',
        title: 'Email issue 📧',
        message: 'Please check your email address and try again.',
        canRetry: true,
        retryDelay: 0
      };
    }
    
    if (msg.includes('network') || msg.includes('connection')) {
      return {
        type: 'network',
        title: 'Connection issue 🌐',
        message: 'Please check your internet connection and try again.',
        canRetry: true,
        retryDelay: 10
      };
    }
    
    return {
      type: 'general',
      title: 'Something went wrong 🤔',
      message: errorMessage || 'An unexpected error occurred. Please try again.',
      canRetry: true,
      retryDelay: 5
    };
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isDisabled || loading || cooldown > 0) return;

    // Final email validation
    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      emailInputRef.current?.focus();
      return;
    }

    if (!validateEmail(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      setEmailValid(false);
      emailInputRef.current?.focus();
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    setEmailValid(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({ 
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      setLoading(false);

      if (error) {
        const errorInfo = categorizeError(error.message);
        setErrorMsg(errorInfo.message);
        
        if (errorInfo.type === 'rate_limit') {
          startCooldown(errorInfo.retryDelay);
        }
        return;
      }

      setSuccessMsg('✅ Magic link sent! Please check your email to log in.');
      startCooldown(90);
      
      // Clear email field on success for security
      setEmail('');
      
    } catch (err) {
      console.error('Login error:', err);
      setLoading(false);
      setErrorMsg('An unexpected error occurred. Please try again.');
    }
  };

  const getButtonText = () => {
    if (loading) return 'Sending magic link…';
    if (cooldown > 0) return `Please wait ${cooldown}s`;
    return '✨ Send Magic Link';
  };

  const getCooldownProgress = () => {
    if (cooldown === 0) return 0;
    return ((90 - cooldown) / 90) * 100;
  };

  return (
    <>
      {successMsg && (
        <div className={styles.successBox} role="status" aria-live="polite">
          <div className={styles.successContent}>
            <span className={styles.successIcon}>📧</span>
            <div>
              <div className={styles.successTitle}>Magic link sent!</div>
              <div className={styles.successMessage}>Check your email to log in</div>
            </div>
          </div>
          <button
            type="button"
            className={styles.dismissBtn}
            onClick={() => setSuccessMsg('')}
            aria-label="Dismiss success message"
          >
            ✕
          </button>
        </div>
      )}

      {errorMsg && (
        <div className={styles.errorBox} role="alert" aria-live="assertive">
          <div className={styles.errorContent}>
            <span className={styles.errorIcon}>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleLogin} className={styles.inputGroup} aria-live="polite">
        <div className={styles.inputWrapper}>
          <label htmlFor="login-email" className="sr-only">Email address</label>
          <input
            ref={emailInputRef}
            id="login-email"
            type="email"
            placeholder="Enter your email address"
            className={`${styles.inputField} ${!emailValid ? styles.inputError : ''}`}
            value={email}
            onChange={handleEmailChange}
            disabled={isDisabled || loading || cooldown > 0}
            required
            aria-label="Email address"
            aria-invalid={!emailValid}
            aria-describedby={showEmailHint ? "email-hint" : undefined}
            autoComplete="email"
            autoFocus
          />
          {showEmailHint && (
            <div id="email-hint" className={styles.inputHint}>
              Please enter a valid email address
            </div>
          )}
        </div>

        <button
          type="submit"
          className={`${styles.submitButton} ${loading ? styles.loading : ''}`}
          disabled={isDisabled || loading || cooldown > 0 || !email.trim()}
          aria-busy={loading}
          style={{
            background: cooldown > 0 
              ? `linear-gradient(90deg, #2563eb ${getCooldownProgress()}%, #374151 ${getCooldownProgress()}%)`
              : undefined
          }}
        >
          {loading && <span className={styles.spinner} aria-hidden="true"></span>}
          {getButtonText()}
        </button>

        {cooldown > 0 && (
          <div className={styles.cooldownInfo}>
            <div className={styles.cooldownBar}>
              <div 
                className={styles.cooldownProgress} 
                style={{ width: `${getCooldownProgress()}%` }}
              ></div>
            </div>
            <p className={styles.cooldownText}>
              You can request another magic link in {cooldown} seconds
            </p>
          </div>
        )}
      </form>

      <div className={styles.helpSection}>
        <p className={styles.infoText}>
          🔐 We&apos;ll send you a secure magic link to log in - no password required!
        </p>
        
        <details className={styles.troubleshooting}>
          <summary>Not receiving the email? 🤔</summary>
          <div className={styles.troubleshootingContent}>
            <ul>
              <li>Check your spam/junk folder</li>
              <li>Make sure you entered the correct email</li>
              <li>Wait a few minutes - emails can take time to arrive</li>
              <li>Try adding our domain to your email whitelist</li>
            </ul>
          </div>
        </details>
      </div>
    </>
  );
}