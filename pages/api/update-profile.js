import { supabaseAdmin } from '../../lib/supabaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, username, email } = req.body;

  if (!userId || !username || !email) {
    return res.status(400).json({ error: 'Missing userId, username, or email' });
  }

  try {
    const { error } = await supabaseAdmin
      .from('profiles')
      .upsert(
        {
          id: userId,
          username, // changed from full_name to username
          email,
        },
        { returning: 'minimal' }
      );

    if (error) throw error;

    return res.status(200).json({ message: 'Profile updated' });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ error: error.message });
  }
}
