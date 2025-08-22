import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient';
import styles from '../../styles/Signup.module.css';

export function SignupForm({ onSuccess, onError, isDisabled }) {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [cooldown, setCooldown] = useState(0);
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
    
    if (newEmail.length > 3) {
      const isValid = validateEmail(newEmail);
      setEmailValid(isValid);
    } else {
      setEmailValid(true);
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

  const handleSignup = async (e) => {
    e.preventDefault();
    if (isDisabled || loading || cooldown > 0) return;

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
        const msg = error.message.toLowerCase();
        if (msg.includes('rate limit')) {
          setErrorMsg("Too many requests. Please wait a moment.");
          startCooldown(60);
        } else {
          setErrorMsg(error.message || 'Failed to send magic link.');
        }
        onError?.(error.message);
        return;
      }

      setSuccessMsg('🎉 Magic link sent! Check your email to activate your 5 free AI credits.');
      startCooldown(90);
      setEmail('');
      onSuccess?.();
      
    } catch (err) {
      console.error('Signup error:', err);
      setLoading(false);
      setErrorMsg('An unexpected error occurred. Please try again.');
      onError?.('An unexpected error occurred.');
    }
  };

  const getButtonText = () => {
    if (loading) return 'Creating account...';
    if (cooldown > 0) return `Wait ${cooldown}s`;
    return 'Claim 5 Free Credits';
  };

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

      {/* Success Message */}
      {successMsg && (
        <div className={styles.alertSuccess} role="status">
          <span className={styles.alertIcon}>✅</span>
          <span className={styles.alertText}>{successMsg}</span>
        </div>
      )}

      {/* Error Message */}
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
            placeholder="Enter your email"
            className={`${styles.emailInput} ${!emailValid ? styles.inputError : ''}`}
            value={email}
            onChange={handleEmailChange}
            disabled={isDisabled || loading || cooldown > 0}
            required
            autoComplete="email"
            autoFocus
          />
          <div className={styles.inputGlow}></div>
        </div>

        <button
          type="submit"
          className={`${styles.claimButton} ${loading ? styles.loading : ''}`}
          disabled={isDisabled || loading || cooldown > 0 || !email.trim()}
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