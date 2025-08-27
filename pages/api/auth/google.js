// pages/api/auth/google.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // server-side only
);

export default async function handler(req, res) {
  const { provider } = req.query;
  if (!provider) return res.status(400).send('Missing provider');

  try {
    // Generate the Google OAuth URL
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      },
    });

    if (error) throw error;

    // Redirect user directly to Google login
    res.redirect(data.url);
  } catch (err) {
    console.error(err);
    res.status(500).send('OAuth failed');
  }
}
