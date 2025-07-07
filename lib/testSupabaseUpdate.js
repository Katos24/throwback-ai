import { supabaseAdmin } from './lib/supabaseAdmin.js'; // adjust path if needed

async function testUpdate() {
const testUserId = '8bd1c962-a498-44b2-91b7-3999b8fe942f';

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
