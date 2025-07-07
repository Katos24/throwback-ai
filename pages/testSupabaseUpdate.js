import { createClient } from '@supabase/supabase-js';

// Make sure you have your env vars set correctly (or replace with your keys here for testing ONLY)
const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

async function testUpdate() {
  const testUserId = '8bd1c962-a498-44b2-91b7-3999b8fe942f'; // replace with your actual user ID

  const { data, error } = await supabaseAdmin
    .from('profiles')
    .update({
      is_premium: true,
      updated_at: new Date().toISOString(),
    })
    .eq('id', testUserId);

  if (error) {
    console.error('❌ Error updating profile:', error);
  } else {
    console.log('✅ Update successful:', data);
  }
}

testUpdate();
