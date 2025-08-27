import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import styles from '../styles/Profile.module.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [credits, setCredits] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUser(user);
        setEmail(user.email);

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        if (data) {
          setProfile(data);
          setUsername(data.username || '');
          setCredits(data.credits || 0);
        }
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      setErrorMsg('');
      setSuccessMsg('');

      const updates = {
        id: user.id,
        username: username,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);
      
      if (error) throw error;
      
      setSuccessMsg('Profile updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setUpdating(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.loadingWrapper}>
          <div className={styles.spinner}>⚡</div>
          <span>Loading your profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileWrapper}>
        
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.aiIndicator}>
            <span className={styles.dot}></span>
            <span className={styles.aiText}>YOUR PROFILE</span>
          </div>
          <h1 className={styles.title}>
            Manage Your <span className={styles.gradient}>Account</span>
          </h1>
          <p className={styles.subtitle}>
            Update your information and track your Throwback AI usage
          </p>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>💎</div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>{credits}</div>
              <div className={styles.statLabel}>Credits Remaining</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>🎨</div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>{Math.floor(credits / 40)}</div>
              <div className={styles.statLabel}>Colorizations Available</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>🔧</div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>{credits}</div>
              <div className={styles.statLabel}>Restorations Available</div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Account Information</h3>
          
          <form onSubmit={updateProfile} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email Address</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>✉️</span>
                <input
                  type="email"
                  value={email}
                  disabled
                  className={`${styles.input} ${styles.disabled}`}
                />
                <span className={styles.lockIcon}>🔒</span>
              </div>
              <span className={styles.helperText}>Email cannot be changed</span>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Username</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>👤</span>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={updating}
              className={`${styles.updateButton} ${updating ? styles.loading : ''}`}
            >
              {updating ? (
                <>
                  <span className={styles.spinner}>⚡</span>
                  Updating...
                </>
              ) : (
                <>
                  <span className={styles.buttonIcon}>💾</span>
                  Update Profile
                </>
              )}
            </button>
          </form>
        </div>

        {/* Quick Actions */}
        <div className={styles.actionsSection}>
          <h3 className={styles.sectionTitle}>Quick Actions</h3>
          <div className={styles.actionButtons}>
            <button className={styles.actionButton} onClick={() => window.location.href = '/pricing'}>
              <span className={styles.actionIcon}>💳</span>
              <div>
                <div className={styles.actionTitle}>Buy More Credits</div>
                <div className={styles.actionDesc}>Get more credits to restore photos</div>
              </div>
            </button>
            <button className={styles.actionButton} onClick={() => window.location.href = '/'}>
              <span className={styles.actionIcon}>🎨</span>
              <div>
                <div className={styles.actionTitle}>Start Restoring</div>
                <div className={styles.actionDesc}>Transform your photos with AI</div>
              </div>
            </button>
          </div>
        </div>

        {/* Messages */}
        {errorMsg && (
          <div className={styles.errorMessage}>
            <span className={styles.errorIcon}>⚠️</span>
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className={styles.successMessage}>
            <span className={styles.successIcon}>✅</span>
            {successMsg}
          </div>
        )}

        {/* Sign Out */}
        <div className={styles.dangerZone}>
          <button onClick={signOut} className={styles.signOutButton}>
            <span className={styles.signOutIcon}>🚪</span>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
