
// components/Auth/SignupForm.js
import React, { useState } from 'react';
import styles from '../../styles/Signup.module.css';
import { supabase } from '../../lib/supabaseClient';

export default function SignupForm({ onSuccess, onError, isDisabled }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDisabled) return;
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      onError?.(error.message || 'Signup failed.');
      return;
    }

    // Optionally check for existing profile in 'profiles' table
    const userId = data.user?.id;
    if (userId) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (profileError && profileError.code !== 'PGRST116') {
        onError?.('Error checking profile: ' + profileError.message);
        return;
      }
      if (profile) {
        onError?.('Profile already exists. Please log in instead.');
        return;
      }
    }

    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.inputGroup}>
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
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
}
