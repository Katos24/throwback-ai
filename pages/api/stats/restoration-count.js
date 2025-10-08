import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  try {
    // Get total successful restorations
    const { count, error } = await supabaseAdmin
      .from('ai_requests')
      .select('*', { count: 'exact', head: true })

    if (error) throw error;

    // You can also break down by type
    const { count: basicCount } = await supabaseAdmin
      .from('ai_requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'succeeded')
      .eq('feature_type', 'basic_restore');

    const { count: premiumCount } = await supabaseAdmin
      .from('ai_requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'succeeded')
      .eq('feature_type', 'premium_restore');

    return res.status(200).json({
      total: count || 0,
      basic: basicCount || 0,
      premium: premiumCount || 0
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
}