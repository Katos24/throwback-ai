import { supabaseAdmin } from '../../lib/supabaseAdmin';

function isValidEmail(email) {
  // Simple email regex validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, username, email } = req.body;

  if (!userId || !username || !email) {
    return res.status(400).json({ error: 'Missing userId, username, or email' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .upsert(
        {
          id: userId,
          username,
          email,
          updated_at: new Date().toISOString(),
        },
        { returning: 'representation' }
      );

    if (error) throw error;

    return res.status(200).json({ message: 'Profile updated', profile: data[0] });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ error: error.message });
  }
}
