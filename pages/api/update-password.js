import { supabaseAdmin } from '../../lib/supabaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { access_token, new_password } = req.body;

  if (!access_token || !new_password) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    // Use the access_token to get the user session and update password securely
    const { data, error } = await supabaseAdmin.auth.api.updateUser(access_token, {
      password: new_password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
