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
    console.error(err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const supabaseUserId = session.metadata.supabaseUserId;

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({ is_premium: true })
      .eq('id', supabaseUserId);

    if (error) {
      console.error(error);
      return res.status(500).send('Error updating Supabase');
    }

    console.log('✅ Premium upgraded:', data);
  }

  res.json({ received: true });
}
