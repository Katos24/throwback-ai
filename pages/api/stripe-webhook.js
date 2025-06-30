import Stripe from 'stripe';
import { supabase } from '../../lib/supabaseClient';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: { bodyParser: false },
};

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.log(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const supabaseUserId = session.metadata.supabaseUserId;

    if (supabaseUserId) {
      // Update user's profile in Supabase to set is_premium = true
      const { error } = await supabase
        .from('profiles')
        .update({ is_premium: true, updated_at: new Date().toISOString() })
        .eq('id', supabaseUserId);

      if (error) {
        console.error('Error updating profile:', error);
      } else {
        console.log(`User ${supabaseUserId} upgraded to premium`);
      }
    }
  }

  res.status(200).json({ received: true });
}

// Helper function to parse raw request body as a buffer (needed by Stripe)
import { Readable } from 'stream';

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}
