import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '../../../../lib/supabaseClient';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { slug, subscriptionId } = await req.json();

    if (!slug && !subscriptionId) {
      return NextResponse.json(
        { error: 'Either slug or subscriptionId is required' },
        { status: 400 }
      );
    }

    // Fetch library from database
    let query = supabase
      .from('libraries')
      .select('*');

    if (slug) {
      query = query.eq('slug', slug);
    } else {
      query = query.eq('stripe_subscription_id', subscriptionId);
    }

    const { data: library, error: dbError } = await query.single();

    if (dbError || !library) {
      return NextResponse.json(
        { 
          valid: false, 
          error: 'Library not found',
          status: 'not_found'
        },
        { status: 404 }
      );
    }

    // If no Stripe subscription ID, library was never activated
    if (!library.stripe_subscription_id) {
      return NextResponse.json({
        valid: false,
        error: 'No active subscription',
        status: 'no_subscription',
        library: {
          name: library.name,
          slug: library.slug,
        }
      });
    }

    // Fetch current subscription status from Stripe
    const subscription = await stripe.subscriptions.retrieve(
      library.stripe_subscription_id
    );

    // Determine if subscription is valid
    const validStatuses = ['active', 'trialing'];
    const isValid = validStatuses.includes(subscription.status);

    // Check if trial is ending soon (within 7 days)
    let trialEndingSoon = false;
    let daysUntilTrialEnd = null;
    
    if (subscription.status === 'trialing' && subscription.trial_end) {
      const trialEndDate = new Date(subscription.trial_end * 1000);
      const now = new Date();
      const daysRemaining = Math.ceil((trialEndDate - now) / (1000 * 60 * 60 * 24));
      daysUntilTrialEnd = daysRemaining;
      trialEndingSoon = daysRemaining <= 7 && daysRemaining > 0;
    }

    // Update library status in database if it differs
    if (library.active !== isValid || library.status !== subscription.status) {
      await supabase
        .from('libraries')
        .update({
          active: isValid,
          status: subscription.status,
        })
        .eq('id', library.id);
    }

    // Calculate credits remaining
    const creditsRemaining = library.monthly_credits - library.credits_used;
    const creditsPercentUsed = (library.credits_used / library.monthly_credits) * 100;

    // Build response
    const response = {
      valid: isValid,
      status: subscription.status,
      library: {
        id: library.id,
        name: library.name,
        slug: library.slug,
        active: isValid,
      },
      subscription: {
        id: subscription.id,
        status: subscription.status,
        currentPeriodEnd: subscription.current_period_end,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        trialEnd: subscription.trial_end,
        daysUntilTrialEnd: daysUntilTrialEnd,
        trialEndingSoon: trialEndingSoon,
      },
      credits: {
        total: library.monthly_credits,
        used: library.credits_used,
        remaining: creditsRemaining,
        percentUsed: Math.round(creditsPercentUsed),
        lowCredits: creditsRemaining < 1000, // Flag if running low
      },
      warnings: []
    };

    // Add warnings
    if (subscription.status === 'past_due') {
      response.warnings.push('Payment failed - subscription at risk');
    }
    
    if (subscription.cancel_at_period_end) {
      response.warnings.push('Subscription will cancel at period end');
    }

    if (trialEndingSoon) {
      response.warnings.push(`Trial ends in ${daysUntilTrialEnd} days`);
    }

    if (creditsRemaining < 1000) {
      response.warnings.push('Running low on premium credits');
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error('Verify subscription error:', error);
    
    // Handle specific Stripe errors
    if (error.type === 'StripeInvalidRequestError') {
      return NextResponse.json(
        { 
          valid: false, 
          error: 'Invalid subscription',
          status: 'invalid'
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Verification failed' },
      { status: 500 }
    );
  }
}

// Optional: GET method for simpler checks
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { status: 400 }
      );
    }

    // Quick check without calling Stripe (faster but less accurate)
    const { data: library, error } = await supabase
      .from('libraries')
      .select('id, name, slug, active, status, monthly_credits, credits_used, trial_end_date')
      .eq('slug', slug)
      .single();

    if (error || !library) {
      return NextResponse.json(
        { valid: false, error: 'Library not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      valid: library.active,
      status: library.status,
      library: {
        name: library.name,
        slug: library.slug,
        active: library.active,
      },
      credits: {
        remaining: library.monthly_credits - library.credits_used,
        percentUsed: Math.round((library.credits_used / library.monthly_credits) * 100),
      }
    });

  } catch (error) {
    console.error('GET verify error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}