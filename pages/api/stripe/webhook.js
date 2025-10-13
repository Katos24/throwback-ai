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

  // Handle one-time payment (existing credit pack logic)
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    
    // Check if this is a subscription (library) vs one-time payment (credits)
    if (session.mode === "subscription") {
      console.log("📦 Subscription checkout completed - handled by subscription events");
      return res.status(200).json({ received: true });
    }
    
    // Verify payment was successful
    if (session.payment_status !== "paid") {
      console.log(`⚠️ Payment not completed: ${session.payment_status}`);
      return res.status(200).json({ received: true });
    }

    const supabaseUserId = session.metadata?.supabaseUserId;
    const priceId = session.metadata?.selectedPriceId;
    const paymentIntentId = session.payment_intent;

    console.log("✅ Metadata received:", { supabaseUserId, priceId, paymentIntentId });

    if (!supabaseUserId || !priceId) {
      console.error("❌ Missing metadata in session");
      return res.status(400).send("Missing metadata");
    }

    // Check if this payment was already processed (idempotency protection)
    const { data: existingTransaction } = await supabaseAdmin
      .from("credit_transactions")
      .select("id")
      .eq("reference_id", paymentIntentId)
      .eq("type", "stripe_purchase")
      .single();

    if (existingTransaction) {
      console.log(`⚠️ Payment ${paymentIntentId} already processed`);
      return res.status(200).json({ received: true, message: "Already processed" });
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

    // Log the transaction for audit trail
    const { error: logError } = await supabaseAdmin
      .from("credit_transactions")
      .insert({
        user_id: supabaseUserId,
        reference_id: paymentIntentId,
        amount: creditsToAdd,
        type: "stripe_purchase",
        created_at: new Date().toISOString()
      });

    if (logError) {
      console.error("❌ Failed to log transaction:", logError.message);
    }

    console.log(`✅ Added ${creditsToAdd} credits to user ${supabaseUserId}`);
    return res.status(200).json({ received: true });
  }

  // ==========================================
  // NEW: Handle Library Subscription Events
  // ==========================================

  // When subscription is created or updated
  if (event.type === "customer.subscription.created" || event.type === "customer.subscription.updated") {
    const subscription = event.data.object;
    
    const updateData = {
      status: subscription.status,
    };

    // Only add period_end if it exists (not during trial)
    if (subscription.current_period_end) {
      updateData.subscription_current_period_end = new Date(subscription.current_period_end * 1000).toISOString();
    }

    const { error } = await supabaseAdmin
      .from("library_signups")
      .update(updateData)
      .eq("stripe_subscription_id", subscription.id);

    if (error) {
      console.error("❌ Failed to update subscription:", error.message);
    } else {
      console.log(`✅ Updated subscription ${subscription.id} to status: ${subscription.status}`);
    }
    
    return res.status(200).json({ received: true });
  }

  // When subscription is deleted/canceled
  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object;
    
    const { error } = await supabaseAdmin
      .from("library_signups")
      .update({
        status: "canceled",
      })
      .eq("stripe_subscription_id", subscription.id);

    if (error) {
      console.error("❌ Failed to cancel subscription:", error.message);
    } else {
      console.log(`✅ Canceled subscription ${subscription.id}`);
    }
    
    return res.status(200).json({ received: true });
  }

  // When payment succeeds (including after trial)
  if (event.type === "invoice.payment_succeeded") {
    const invoice = event.data.object;
    
    if (invoice.subscription) {
      const { error } = await supabaseAdmin
        .from("library_signups")
        .update({
          status: "active",
        })
        .eq("stripe_subscription_id", invoice.subscription);

      if (error) {
        console.error("❌ Failed to activate subscription:", error.message);
      } else {
        console.log(`✅ Payment succeeded for subscription ${invoice.subscription}`);
      }
    }
    
    return res.status(200).json({ received: true });
  }

  // When payment fails
  if (event.type === "invoice.payment_failed") {
    const invoice = event.data.object;
    
    if (invoice.subscription) {
      const { error } = await supabaseAdmin
        .from("library_signups")
        .update({
          status: "past_due",
        })
        .eq("stripe_subscription_id", invoice.subscription);

      if (error) {
        console.error("❌ Failed to mark subscription past_due:", error.message);
      } else {
        console.log(`⚠️ Payment failed for subscription ${invoice.subscription}`);
      }
    }
    
    return res.status(200).json({ received: true });
  }

  console.log(`ℹ️ Unhandled event: ${event.type}`);
  res.json({ received: true });
}