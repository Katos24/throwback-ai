import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '../../../../lib/supabaseClient';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { name, email, zipCodes } = await req.json();

    // Create Stripe customer
    const customer = await stripe.customers.create({
      email: email,
      name: name,
      metadata: {
        library_name: name,
        zip_codes: zipCodes
      }
    });

    // Create subscription with 30-day trial
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{
        price: process.env.STRIPE_LIBRARY_SUBSCRIPTION_PRICE_ID,
      }],
      trial_period_days: 30,
      payment_behavior: 'default_incomplete',
      payment_settings: { 
        save_default_payment_method: 'on_subscription',
        payment_method_types: ['card']
      },
      expand: ['latest_invoice.payment_intent', 'pending_setup_intent'],
    });

    // Save to database
    await supabase
      .from('library_signups')
      .insert([{
        library_name: name,
        email: email,
        zip_codes: zipCodes,
        stripe_customer_id: customer.id,
        stripe_subscription_id: subscription.id,
        status: 'trialing',
        created_at: new Date().toISOString()
      }]);

    // For trial subscriptions, Stripe uses setup_intent to save the card
    let clientSecret;
    
    if (subscription.pending_setup_intent) {
      clientSecret = subscription.pending_setup_intent.client_secret;
    } else if (subscription.latest_invoice?.payment_intent) {
      clientSecret = subscription.latest_invoice.payment_intent.client_secret;
    }

    if (!clientSecret) {
      console.error('No client secret found. Subscription object:', JSON.stringify(subscription, null, 2));
      return NextResponse.json(
        { error: 'Failed to create payment setup' },
        { status: 500 }
      );
    }

    console.log('✅ Subscription created successfully with client secret');

    return NextResponse.json({
      clientSecret: clientSecret,
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}