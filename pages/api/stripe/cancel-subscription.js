import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16', // specify latest or your preferred version
});

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get supabase access token from Authorization header
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  // Get user from supabase
  const {
    data: { user },
    error: userError,
  } = await supabaseAdmin.auth.getUser(token);

  if (userError || !user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Get user's stripe_subscription_id
  const { data: profile, error: profileError } = await supabaseAdmin
    .from('profiles')
    .select('stripe_subscription_id')
    .eq('id', user.id)
    .single();

  if (profileError || !profile?.stripe_subscription_id) {
    return res.status(400).json({ error: 'Subscription not found' });
  }

  try {
    // Cancel subscription at period end (correct API usage for Stripe v18+)
    const updatedSubscription = await stripe.subscriptions.update(
      profile.stripe_subscription_id,
      { cancel_at_period_end: true }
    );

    // Update your DB to reflect cancel request (webhook should update full status later)
    await supabaseAdmin
      .from('profiles')
      .update({
        subscription_status: updatedSubscription.status,
        subscription_cancel_at_period_end: updatedSubscription.cancel_at_period_end,
      })
      .eq('id', user.id);

    return res.status(200).json({
      message: 'Subscription cancellation scheduled at period end',
      subscription: updatedSubscription,
    });
  } catch (error) {
    console.error('Stripe cancellation error:', error);
    return res.status(500).json({ error: 'Failed to cancel subscription' });
  }
}
