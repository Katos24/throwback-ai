import Stripe from 'stripe';
// ✅ Use a separate Supabase admin client that uses the SERVICE_ROLE_KEY
import { supabaseAdmin } from '../../lib/supabaseAdmin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: { bodyParser: false },
};

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(req, res) {
  console.log('Webhook received! Method:', req.method);

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;
    try {
      event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
      console.log('Webhook event constructed:', event.type);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const supabaseUserId = session.metadata?.supabaseUserId;
      console.log('Checkout session completed for user:', supabaseUserId);

      if (!supabaseUserId) {
        console.error('No supabaseUserId found in metadata');
        return res.status(400).send('Missing supabaseUserId in metadata');
      }

      const { data, error } = await supabaseAdmin
        .from('profiles')
        .update({ is_premium: true, updated_at: new Date().toISOString() })
        .eq('id', supabaseUserId);

      if (error) {
        console.error('Error updating profile:', error);
        return res.status(500).send('Failed to update profile');
      }

      console.log(`User ${supabaseUserId} marked as premium`, data);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Unexpected error handling webhook:', error);
    res.status(500).send('Internal Server Error');
  }
}

// ✅ Helper function for Stripe raw body
import { Readable } from 'stream';

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}
