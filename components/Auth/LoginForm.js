import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient';
import styles from '../../styles/Login.module.css';

export function LoginForm({ isDisabled, onSuccess, onError }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
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

  const handleOAuth = async (provider) => {
    if (isDisabled || oauthLoading || loading) return;
    
    setOauthLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: { prompt: "select_account" },
        },
      });

      if (error) {
        setOauthLoading(false);
        const errorInfo = categorizeError(error.message);
        setErrorMsg(errorInfo.message);
        if (onError) onError(errorInfo.message);
        return;
      }

      // OAuth redirect will happen, so no need to setOauthLoading(false)
      // The component will unmount when redirecting
    } catch (err) {
      console.error('OAuth error:', err);
      setOauthLoading(false);
      const errorMsg = 'Failed to sign in with Google. Please try again.';
      setErrorMsg(errorMsg);
      if (onError) onError(errorMsg);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isDisabled || loading || oauthLoading || cooldown > 0) return;

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
        if (onError) onError(errorInfo.message);
        
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
      const errorMsg = 'An unexpected error occurred. Please try again.';
      setErrorMsg(errorMsg);
      if (onError) onError(errorMsg);
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

  const isFormDisabled = isDisabled || loading || oauthLoading || cooldown > 0;

  return (
    <div className={styles.authContainer}>
      {/* Google OAuth Button */}
      <button
        type="button"
        className={`${styles.googleButton} ${oauthLoading ? styles.googleButtonLoading : ''}`}
        onClick={() => handleOAuth('google')}
        disabled={isFormDisabled}
        aria-busy={oauthLoading}
      >
        {oauthLoading ? (
          <>
            <span className={styles.googleSpinner} aria-hidden="true"></span>
            <span>Signing in with Google...</span>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className={styles.googleIcon}
            >
              <path fill="#4285F4" d="M23.64 12.2c0-.82-.07-1.61-.2-2.37H12v4.48h6.36a5.43 5.43 0 01-2.36 3.57v2.97h3.82c2.23-2.05 3.52-5.07 3.52-8.65z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.82-2.97c-1.06.7-2.43 1.12-4.13 1.12-3.17 0-5.85-2.14-6.81-5.03H1.26v3.15A11.996 11.996 0 0012 24z" />
              <path fill="#FBBC05" d="M5.19 14.21a7.2 7.2 0 010-4.42V6.64H1.26a11.98 11.98 0 000 10.72l3.93-3.15z" />
              <path fill="#EA4335" d="M12 4.48c1.77 0 3.35.61 4.6 1.81l3.45-3.45C17.96 1.07 15.24 0 12 0 7.92 0 4.27 2.42 2.7 5.87l3.93 3.15c.94-2.89 3.62-5.03 6.81-5.03z" />
            </svg>
            <span>Continue with Google</span>
          </>
        )}
      </button>

      {/* Divider */}
      <div className={styles.divider}>
        <span className={styles.dividerLine}></span>
        <span className={styles.dividerText}>or</span>
        <span className={styles.dividerLine}></span>
      </div>

      {/* Success/Error Messages */}
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

      {/* Email Form */}
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
            disabled={isFormDisabled}
            required
            aria-label="Email address"
            aria-invalid={!emailValid}
            aria-describedby={showEmailHint ? "email-hint" : undefined}
            autoComplete="email"
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
          disabled={isFormDisabled || !email.trim()}
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
    </div>
  );
}