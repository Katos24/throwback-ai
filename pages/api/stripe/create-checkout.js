import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  console.log("Received checkout request:", req.body);

  const { supabaseUserId, email, selectedPriceId } = req.body;

  if (!supabaseUserId) {
    return res.status(400).json({ error: "Missing supabaseUserId" });
  }
  if (!selectedPriceId) {
    return res.status(400).json({ error: "Missing selectedPriceId" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [{ price: selectedPriceId, quantity: 1 }],
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/`,
      metadata: {
        supabaseUserId,
        selectedPriceId,
      },
      customer_email: email || undefined,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout session error:", error);
    res.status(500).json({ error: error.message });
  }
}
