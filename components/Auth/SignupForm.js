import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient';
import styles from '../../styles/Signup.module.css';

export function SignupForm({ onSuccess, onError, isDisabled }) {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [cooldown, setCooldown] = useState(0);
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    if (errorMsg) setErrorMsg('');
    if (successMsg) setSuccessMsg('');
    
    // Real-time email validation
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
        message: "You've tried signing up too frequently. Please wait a moment before trying again.",
        retryDelay: 60
      };
    }
    
    if (msg.includes('invalid email') || msg.includes('email not valid')) {
      return {
        type: 'invalid_email',
        message: 'Please check your email address and try again.',
        retryDelay: 0
      };
    }
    
    if (msg.includes('network') || msg.includes('connection')) {
      return {
        type: 'network',
        message: 'Connection issue. Please check your internet and try again.',
        retryDelay: 10
      };
    }
    
    return {
      type: 'general',
      message: errorMessage || 'An unexpected error occurred. Please try again.',
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
      console.error('OAuth signup error:', err);
      setOauthLoading(false);
      const errorMsg = 'Failed to sign up with Google. Please try again.';
      setErrorMsg(errorMsg);
      if (onError) onError(errorMsg);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (isDisabled || loading || oauthLoading || cooldown > 0) return;

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
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      setLoading(false);

      if (error) {
        const errorInfo = categorizeError(error.message);
        setErrorMsg(errorInfo.message);
        
        if (errorInfo.type === 'rate_limit') {
          startCooldown(errorInfo.retryDelay);
        }
        
        if (onError) onError(errorInfo.message);
        return;
      }

      setSuccessMsg('🎉 Magic link sent! Check your email to activate your 5 free AI credits.');
      startCooldown(90);
      setEmail('');
      if (onSuccess) onSuccess();
      
    } catch (err) {
      console.error('Signup error:', err);
      setLoading(false);
      const errorMsg = 'An unexpected error occurred. Please try again.';
      setErrorMsg(errorMsg);
      if (onError) onError(errorMsg);
    }
  };

  const getButtonText = () => {
    if (loading) return 'Creating account...';
    if (cooldown > 0) return `Wait ${cooldown}s`;
    return 'Claim 5 Free Credits';
  };

  const isFormDisabled = isDisabled || loading || oauthLoading || cooldown > 0;

  return (
    <div className={styles.modalSignup}>
      {/* Header with Credits Offer */}
      <div className={styles.modalHeader}>
        <div className={styles.creditsOffer}>
          <span className={styles.creditsNumber}>5</span>
          <div className={styles.creditsInfo}>
            <span className={styles.creditsLabel}>FREE AI CREDITS</span>
            <span className={styles.creditsSubtext}>Added instantly</span>
          </div>
        </div>
        
        <h2 className={styles.modalTitle}>Start creating AI magic</h2>
        <p className={styles.modalDescription}>
          Transform photos • Generate art • No credit card required
        </p>
      </div>

      {/* Google OAuth Button */}
      <button
        type="button"
        className={`${styles.googleSignupButton} ${oauthLoading ? styles.googleButtonLoading : ''}`}
        onClick={() => handleOAuth('google')}
        disabled={isFormDisabled}
        aria-busy={oauthLoading}
      >
        {oauthLoading ? (
          <>
            <span className={styles.googleSpinner} aria-hidden="true"></span>
            <span>Creating account with Google...</span>
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
            <span>Get 5 credits with Google</span>
          </>
        )}
      </button>

      {/* Divider */}
      <div className={styles.divider}>
        <span className={styles.dividerLine}></span>
        <span className={styles.dividerText}>or continue with email</span>
        <span className={styles.dividerLine}></span>
      </div>

      {/* Success/Error Messages */}
      {successMsg && (
        <div className={styles.alertSuccess} role="status">
          <span className={styles.alertIcon}>✅</span>
          <span className={styles.alertText}>{successMsg}</span>
          <button
            type="button"
            className={styles.alertDismiss}
            onClick={() => setSuccessMsg('')}
            aria-label="Dismiss success message"
          >
            ✕
          </button>
        </div>
      )}

      {errorMsg && (
        <div className={styles.alertError} role="alert">
          <span className={styles.alertIcon}>⚠️</span>
          <span className={styles.alertText}>{errorMsg}</span>
        </div>
      )}

      {/* Signup Form */}
      <form onSubmit={handleSignup} className={styles.signupForm}>
        <div className={styles.inputWrapper}>
          <input
            ref={emailInputRef}
            type="email"
            placeholder="Enter your email address"
            className={`${styles.emailInput} ${!emailValid ? styles.inputError : ''}`}
            value={email}
            onChange={handleEmailChange}
            disabled={isFormDisabled}
            required
            autoComplete="email"
            aria-label="Email address"
            aria-invalid={!emailValid}
            aria-describedby={showEmailHint ? "email-hint-signup" : undefined}
          />
          <div className={styles.inputGlow}></div>
          {showEmailHint && (
            <div id="email-hint-signup" className={styles.inputHint}>
              Please enter a valid email address
            </div>
          )}
        </div>

        <button
          type="submit"
          className={`${styles.claimButton} ${loading ? styles.loading : ''}`}
          disabled={isFormDisabled || !email.trim()}
          aria-busy={loading}
        >
          {loading && <div className={styles.spinner}></div>}
          <span>{getButtonText()}</span>
        </button>

        {cooldown > 0 && (
          <div className={styles.cooldownInfo}>
            <div className={styles.cooldownBar}>
              <div 
                className={styles.cooldownProgress} 
                style={{ width: `${((90 - cooldown) / 90) * 100}%` }}
              ></div>
            </div>
            <p className={styles.cooldownText}>Next request in {cooldown}s</p>
          </div>
        )}
      </form>

      {/* Quick Benefits */}
      <div className={styles.quickBenefits}>
        <div className={styles.benefitItem}>
          <span className={styles.benefitIcon}>🔮</span>
          <span>AI photo restoration</span>
        </div>
        <div className={styles.benefitItem}>
          <span className={styles.benefitIcon}>🎨</span>
          <span>Cartoon generation</span>
        </div>
        <div className={styles.benefitItem}>
          <span className={styles.benefitIcon}>⚡</span>
          <span>Lightning fast</span>
        </div>
      </div>

      {/* Trust Footer */}
      <div className={styles.trustFooter}>
        🔒 Secure signup • Credits added instantly after email verification
      </div>
    </div>
  );
}