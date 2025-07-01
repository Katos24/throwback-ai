import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Use a single static price ID from your .env
const priceId = process.env.STRIPE_PRICE_ID;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { supabaseUserId } = req.body;

  if (!supabaseUserId) {
    return res.status(400).json({ error: 'Missing supabaseUserId' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/pricing`,
      metadata: { supabaseUserId },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({ error: error.message });
  }
}
