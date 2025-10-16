'use client';

import React from 'react';
import Link from 'next/link';

export default function LibraryPricing() {
  const plans = [
    {
      name: "Starter",
      price: 199,
      credits: 5000,
      restorations: "~250 premium",
      features: [
        "5,000 monthly credits",
        "Unlimited basic restorations",
        "~250 premium colorizations",
        "Custom branded portal",
        "Zip code access control",
        "Usage analytics",
        "Email support"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Growth",
      price: 299,
      credits: 8000,
      restorations: "~400 premium",
      features: [
        "8,000 monthly credits",
        "Unlimited basic restorations",
        "~400 premium colorizations",
        "Custom branded portal",
        "Zip code access control",
        "Usage analytics",
        "Priority email support",
        "Marketing materials"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Professional",
      price: 499,
      credits: 15000,
      restorations: "~750 premium",
      features: [
        "15,000 monthly credits",
        "Unlimited basic restorations",
        "~750 premium colorizations",
        "Custom branded portal",
        "Zip code access control",
        "Usage analytics",
        "Priority support",
        "Marketing materials",
        "Quarterly strategy call"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Enterprise",
      price: "Custom",
      credits: "Custom",
      restorations: "Unlimited",
      features: [
        "Custom credit allocation",
        "Unlimited basic restorations",
        "Unlimited premium colorizations",
        "Multi-location support",
        "Custom integrations",
        "Dedicated account manager",
        "24/7 priority support",
        "Custom contract terms"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white' }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '1.5rem 3rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link href="/" style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textDecoration: 'none'
        }}>
          Throwback AI
        </Link>
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/library" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
            For Organizations
          </Link>
          <Link href="/library/pricing" style={{ color: 'white', textDecoration: 'none', fontWeight: '600' }}>
            Pricing
          </Link>
          <Link href="/library/demo" style={{
            background: 'linear-gradient(135deg, #a78bfa 0%, #6366f1 100%)',
            color: 'white',
            padding: '0.5rem 1.5rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            Request Demo
          </Link>
        </nav>
      </header>

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '5rem 2rem' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 50%, #6366f1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
            letterSpacing: '-0.03em',
            lineHeight: '1.1'
          }}>
            Simple, Transparent Pricing
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '2rem' }}>
            Choose the plan that fits your community's needs
          </p>
          <div style={{
            display: 'inline-flex',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '0.5rem',
            borderRadius: '12px',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            <span style={{
              padding: '0.5rem 1rem',
              background: 'rgba(168, 85, 247, 0.2)',
              borderRadius: '8px',
              fontSize: '0.9rem'
            }}>
              ✨ 30-Day Free Trial
            </span>
            <span style={{
              padding: '0.5rem 1rem',
              background: 'rgba(99, 102, 241, 0.2)',
              borderRadius: '8px',
              fontSize: '0.9rem'
            }}>
              💳 No Credit Card Required
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '5rem'
        }}>
          {plans.map((plan, idx) => (
            <div key={idx} style={{
              background: plan.popular 
                ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)'
                : 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: plan.popular 
                ? '2px solid rgba(168, 85, 247, 0.5)'
                : '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              padding: '2.5rem 2rem',
              position: 'relative',
              transition: 'transform 0.3s ease, border-color 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              if (!plan.popular) {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }
            }}>
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #a78bfa 0%, #6366f1 100%)',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '600'
                }}>
                  ⭐ Most Popular
                </div>
              )}
              
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  {plan.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  {typeof plan.price === 'number' ? (
                    <>
                      <span style={{ fontSize: '3rem', fontWeight: '800' }}>${plan.price}</span>
                      <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>/month</span>
                    </>
                  ) : (
                    <span style={{ fontSize: '3rem', fontWeight: '800' }}>{plan.price}</span>
                  )}
                </div>
                <div style={{ color: 'rgba(168, 85, 247, 0.8)', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                  {plan.credits} credits/month
                </div>
                <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>
                  {plan.restorations}
                </div>
              </div>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 2rem 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                {plan.features.map((feature, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    fontSize: '0.95rem',
                    lineHeight: '1.5'
                  }}>
                    <span style={{ color: 'rgba(168, 85, 247, 0.8)', fontSize: '1.2rem', flexShrink: 0 }}>✓</span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/library/demo" style={{
                display: 'block',
                textAlign: 'center',
                background: plan.popular
                  ? 'linear-gradient(135deg, #a78bfa 0%, #6366f1 100%)'
                  : 'rgba(255, 255, 255, 0.08)',
                color: 'white',
                padding: '1rem',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                border: plan.popular ? 'none' : '1px solid rgba(255, 255, 255, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = plan.popular
                  ? 'linear-gradient(135deg, #9370db 0%, #5555e1 100%)'
                  : 'rgba(255, 255, 255, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = plan.popular
                  ? 'linear-gradient(135deg, #a78bfa 0%, #6366f1 100%)'
                  : 'rgba(255, 255, 255, 0.08)';
              }}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* How Credits Work */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          padding: '3rem',
          marginBottom: '4rem'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            How Credits Work
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Basic Enhancement</h3>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'rgba(168, 85, 247, 0.8)', marginBottom: '0.5rem' }}>
                FREE
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.95rem' }}>
                Fix damage, sharpen details, remove scratches - completely free, unlimited use
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎨</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Premium Colorization</h3>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'rgba(168, 85, 247, 0.8)', marginBottom: '0.5rem' }}>
                40 credits
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.95rem' }}>
                Add vibrant, realistic color to black & white photos
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Credits Reset Monthly</h3>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'rgba(168, 85, 247, 0.8)', marginBottom: '0.5rem' }}>
                Auto
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.95rem' }}>
                Unused credits don't roll over - use them or lose them each month
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '3rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Frequently Asked Questions
          </h2>
          
          {[
            {
              q: "What happens after the free trial?",
              a: "After 30 days, you'll be charged monthly. Cancel anytime via email - no hassle, no questions asked."
            },
            {
              q: "Can I upgrade or downgrade my plan?",
              a: "Yes! Contact us anytime to change your plan. Changes take effect at the start of your next billing cycle."
            },
            {
              q: "What if we run out of credits?",
              a: "Basic restorations remain unlimited. For premium colorizations, you can purchase additional credit packs or upgrade to a higher tier."
            },
            {
              q: "Do unused credits roll over?",
              a: "No, credits reset each month. This keeps pricing simple and predictable."
            },
            {
              q: "Is this grant-fundable?",
              a: "Yes! Many organizations use digital preservation, community engagement, or activities grants. We can provide documentation."
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept all major credit cards via Stripe. For Enterprise plans, we can arrange invoicing and purchase orders."
            }
          ].map((faq, idx) => (
            <details key={idx} style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '1.5rem',
              marginBottom: '1rem',
              cursor: 'pointer'
            }}>
              <summary style={{
                fontWeight: '600',
                fontSize: '1.1rem',
                listStyle: 'none',
                position: 'relative',
                paddingRight: '2rem'
              }}>
                {faq.q}
              </summary>
              <p style={{
                marginTop: '1rem',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: '1.6',
                fontSize: '0.95rem'
              }}>
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </main>

      {/* Footer CTA */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '5rem 2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>
          Ready to Get Started?
        </h2>
        <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '2rem' }}>
          Start your 30-day free trial today. No credit card required.
        </p>
        <Link href="/library/demo" style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, #a78bfa 0%, #6366f1 100%)',
          color: 'white',
          padding: '1rem 3rem',
          borderRadius: '12px',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '1.125rem',
          boxShadow: '0 8px 30px rgba(168, 85, 247, 0.4)'
        }}>
          Request Free Trial →
        </Link>
      </div>
    </div>
  );
}