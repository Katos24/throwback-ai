import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Profile() {
  const [profile, setProfile] = useState({
    full_name: '',
    avatar_url: '',
    email: '',
  });
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
        .select('full_name, avatar_url')
        .eq('id', user.id)
        .single();

      if (error) {
        setMessage(`Failed to load profile: ${error.message}`);
      } else if (data) {
        setProfile({
          full_name: data.full_name || '',
          avatar_url: data.avatar_url || '',
          email: user.email, // Set email from auth user, NOT editable
        });
      }
      setLoading(false);
    }

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

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
        full_name: profile.full_name,
        avatar_url: profile.avatar_url,
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
    <main style={{ maxWidth: 400, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Your Profile</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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
          Full Name
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={profile.full_name}
            onChange={handleChange}
            style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
            required
          />
        </label>
        <label>
          Avatar URL
          <input
            type="text"
            name="avatar_url"
            placeholder="Avatar URL"
            value={profile.avatar_url}
            onChange={handleChange}
            style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
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
    </main>
  );
}
