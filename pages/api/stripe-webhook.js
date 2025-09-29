import Stripe from 'stripe';
import { supabaseAdmin } from '../../../lib/supabaseAdmin';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const supabaseUserId = session.metadata?.supabaseUserId;

        if (!supabaseUserId) {
          console.error('No supabaseUserId in session metadata');
          break;
        }

        // Save stripe_customer_id to profile if not already saved
        if (session.customer) {
          await supabaseAdmin
            .from('profiles')
            .update({ stripe_customer_id: session.customer })
            .eq('id', supabaseUserId);
        }

        const { error } = await supabaseAdmin
          .from('profiles')
          .update({ is_premium: true })
          .eq('id', supabaseUserId);

        if (error) {
          console.error('Error updating profile is_premium:', error);
          return res.status(500).send('Error updating Supabase profile');
        }

        console.log('✅ Premium upgraded for user:', supabaseUserId);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        // Look up profile by stripe_customer_id
        const { data: profile, error: profileError } = await supabaseAdmin
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (profileError || !profile) {
          console.error('No profile found for Stripe customer:', customerId);
          return res.status(400).send('Profile not found');
        }

        // Map subscription status to is_premium boolean
        const isPremium = subscription.status === 'active';

        // Update subscription info and is_premium flag
        const { error: updateError } = await supabaseAdmin
          .from('profiles')
          .update({
            stripe_subscription_id: subscription.id,
            subscription_status: subscription.status,
            subscription_current_period_end: subscription.current_period_end
              ? new Date(subscription.current_period_end * 1000)
              : null,
            is_premium: isPremium,
          })
          .eq('id', profile.id);

        if (updateError) {
          console.error('Error updating subscription info:', updateError);
          return res.status(500).send('Failed to update subscription info');
        }

        console.log(`✅ Subscription ${event.type} processed for user:`, profile.id);
        break;
      }

      default:
        // Unexpected event type
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Error processing webhook event:', err);
    res.status(500).send('Webhook handler error');
  }
}
