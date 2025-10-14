import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  try {
    // INDIVIDUAL USERS - Get total from ai_requests
    const { count: individualTotal, error: individualError } = await supabaseAdmin
      .from('ai_requests')
      .select('*', { count: 'exact', head: true });

    if (individualError) throw individualError;

    // INDIVIDUAL USERS - Basic restore count
    const { count: individualBasic } = await supabaseAdmin
      .from('ai_requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'succeeded')
      .eq('feature_type', 'basic_restore');

    // INDIVIDUAL USERS - Premium restore count
    const { count: individualPremium } = await supabaseAdmin
      .from('ai_requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'succeeded')
      .eq('feature_type', 'premium_restore');

    // LIBRARY PATRONS - Get total from library_requests
    const { count: libraryTotal, error: libraryError } = await supabaseAdmin
      .from('library_requests')
      .select('*', { count: 'exact', head: true })
      .in('status', ['completed', 'succeeded']);

    // Don't throw error if library_requests doesn't exist yet
    const libTotal = libraryError ? 0 : (libraryTotal || 0);

    // LIBRARY PATRONS - Basic restore count
    const { count: libraryBasic } = await supabaseAdmin
      .from('library_requests')
      .select('*', { count: 'exact', head: true })
      .in('status', ['completed', 'succeeded'])
      .eq('restore_type', 'basic');

    // LIBRARY PATRONS - Premium restore count
    const { count: libraryPremium } = await supabaseAdmin
      .from('library_requests')
      .select('*', { count: 'exact', head: true })
      .in('status', ['completed', 'succeeded'])
      .eq('restore_type', 'premium');

    // COMBINE TOTALS
    const totalRestorations = (individualTotal || 0) + libTotal;
    const totalBasic = (individualBasic || 0) + (libraryBasic || 0);
    const totalPremium = (individualPremium || 0) + (libraryPremium || 0);

    return res.status(200).json({
      total: totalRestorations,
      basic: totalBasic,
      premium: totalPremium,
      // Breakdown for analytics (optional)
      breakdown: {
        individual: {
          total: individualTotal || 0,
          basic: individualBasic || 0,
          premium: individualPremium || 0
        },
        library: {
          total: libTotal,
          basic: libraryBasic || 0,
          premium: libraryPremium || 0
        }
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
}