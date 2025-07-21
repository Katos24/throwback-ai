// pages/api/stripe/webhook.js
import Stripe from "stripe";
import { buffer } from "micro";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const priceToCredits = {
  "price_1RjPFlIGCXozWG1ecszEk4MT": 400,
  "price_1RjPFjIGCXozWG1eJqBcRJkQ": 1000,
  "price_1RjPFfIGCXozWG1ef2xOFs6x": 1600,
  "price_1RjPFcIGCXozWG1e1csgY6Z3": 3500,
};

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    console.error("❌ Webhook signature failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(`📩 Stripe event: ${event.type}`);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const supabaseUserId = session.metadata?.supabaseUserId;
    const priceId = session.metadata?.selectedPriceId;

    console.log("✅ Metadata received:", { supabaseUserId, priceId });

    if (!supabaseUserId || !priceId) {
      console.error("❌ Missing metadata in session");
      return res.status(400).send("Missing metadata");
    }

    const creditsToAdd = priceToCredits[priceId];
    if (!creditsToAdd) {
      console.error(`❌ Unknown priceId: ${priceId}`);
      return res.status(400).send("Unknown product priceId");
    }

    // Fetch current credits and credits_remaining
    const { data: profile, error: fetchError } = await supabaseAdmin
      .from("profiles")
      .select("credits, credits_remaining")
      .eq("id", supabaseUserId)
      .single();

    if (fetchError) {
      console.error("❌ Failed to fetch user:", fetchError.message);
      return res.status(500).send("Could not fetch user");
    }

    const currentCredits = profile?.credits ?? 0;
    const currentCreditsRemaining = profile?.credits_remaining ?? 0;

    const newCredits = currentCredits + creditsToAdd;
    const newCreditsRemaining = currentCreditsRemaining + creditsToAdd;

    // Update both credits and credits_remaining
    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({
        credits: newCredits,
        credits_remaining: newCreditsRemaining,
      })
      .eq("id", supabaseUserId);

    if (updateError) {
      console.error("❌ Failed to update credits:", updateError.message);
      return res.status(500).send("Could not update credits");
    }

    console.log(`✅ Added ${creditsToAdd} credits to user ${supabaseUserId}`);
    return res.status(200).json({ received: true });
  }

  console.log(`ℹ️ Unhandled event: ${event.type}`);
  res.json({ received: true });
}
