import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const priceId = process.env.STRIPE_PRICE_ID;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { supabaseUserId } = req.body;

  if (!supabaseUserId) {
    return res.status(400).json({ error: 'Missing supabaseUserId' });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${req.headers.origin}/success`,
    cancel_url: `${req.headers.origin}/`,
    metadata: { supabaseUserId },
  });

  res.status(200).json({ url: session.url });
}
