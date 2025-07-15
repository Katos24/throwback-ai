// components/ProfileUpdateForm.js
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function ProfileUpdateForm() {
  const [profile, setProfile] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setMessage('You must be logged in to view your profile.');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();

      if (error) {
        setMessage(`Failed to load profile: ${error.message}`);
      } else if (data) {
        setProfile({ username: data.username || '', email: user.email });
      }
      setLoading(false);
    }

    fetchProfile();
  }, []);

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMessage('You must be logged in to update your profile.');
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        username: profile.username,
        updated_at: new Date(),
      });

    if (error) {
      setMessage(`Update failed: ${error.message}`);
    } else {
      setMessage('Profile updated successfully!');
    }
    setLoading(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {message && <p>{message}</p>}
      <label>
        Email (read-only)
        <input
          type="email"
          name="email"
          value={profile.email}
          readOnly
          style={{
            padding: 8,
            borderRadius: 4,
            border: '1px solid #ccc',
            backgroundColor: '#f0f0f0',
            cursor: 'not-allowed',
          }}
        />
      </label>
      <label>
        Username
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={profile.username}
          onChange={handleChange}
          style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          required
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px',
          borderRadius: 6,
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Saving...' : 'Update Profile'}
      </button>
    </form>
  );
}
