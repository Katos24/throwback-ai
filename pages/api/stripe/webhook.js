import Stripe from "stripe";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { buffer } from "micro";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const priceToCredits = {
  [process.env.NEXT_PUBLIC_PRICE_DAWN_PACK]: 400,
  [process.env.NEXT_PUBLIC_PRICE_REVIVAL_PACK]: 1000,
  [process.env.NEXT_PUBLIC_PRICE_RESURGENCE_PACK]: 1600,
  [process.env.NEXT_PUBLIC_PRICE_ETERNAL_PACK]: 3500,
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
    console.error("⚠️ Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const supabaseUserId = session.metadata?.supabaseUserId;
      const priceId = session.metadata?.selectedPriceId;

      if (!supabaseUserId || !priceId) {
        console.error("❌ Missing metadata in webhook session");
        return res.status(400).send("Missing metadata");
      }

      const creditsToAdd = priceToCredits[priceId];
      if (!creditsToAdd) {
        console.error("❌ Unknown priceId in webhook:", priceId);
        return res.status(400).send("Unknown product priceId");
      }

      // Save stripe_customer_id if available
      if (session.customer) {
        const { error: custErr } = await supabaseAdmin
          .from("profiles")
          .update({ stripe_customer_id: session.customer })
          .eq("id", supabaseUserId);

        if (custErr) {
          console.warn("⚠️ Could not update stripe_customer_id:", custErr.message);
        }
      }

      // Increment credits (example using raw SQL, adjust for your setup)
      const { error: creditsError } = await supabaseAdmin
        .from("profiles")
        .update({
          credits: supabaseAdmin.raw(`credits + ${creditsToAdd}`),
        })
        .eq("id", supabaseUserId);

      if (creditsError) {
        console.error("❌ Failed to update credits:", creditsError.message);
        return res.status(500).send("Failed to update credits");
      }

      console.log(`✅ Added ${creditsToAdd} credits for user: ${supabaseUserId}`);
      return res.json({ received: true });
    }

    console.log(`⚙️ Unhandled event type: ${event.type}`);
    res.json({ received: true });
  } catch (err) {
    console.error("❌ Error processing webhook event:", err);
    res.status(500).send("Webhook handler error");
  }
}
