// components/Auth/SignupForm.js
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import styles from '../../styles/AuthPage.module.css';

export default function SignupForm({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setLoading(false);
      setErrorMsg(error.message);
      return;
    }

    const { user } = data;

    // ✅ Check if profile already exists
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user?.id)
      .single();

    setLoading(false);

    if (profileError && profileError.code !== 'PGRST116') {
      setErrorMsg('Error checking profile: ' + profileError.message);
      return;
    }

    if (profile) {
      alert('Profile already exists. You can sign in instead.');
      return;
    }

    if (onSuccess) onSuccess();
    alert('Signup successful! Please check your email to confirm.');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.signupForm}>
      <input
        type="email"
        placeholder="Email"
        className={styles.inputField}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password (min 6 chars)"
        className={styles.inputField}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />
      <button
        type="submit"
        disabled={loading}
        className={styles.submitButton}
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
      {errorMsg && <p className={styles.formError}>{errorMsg}</p>}
    </form>
  );
}
