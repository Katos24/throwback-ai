'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';  // ← Add this import
import { supabase } from '../../../../lib/supabaseClient';
import styles from './admin.module.css';

export default function LibraryAdminDashboard() {
  const params = useParams();
  const slug = params.slug;
  
  const [library, setLibrary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRestorations: 0,
    basicCount: 0,
    premiumCount: 0,
    creditsUsed: 0,
    creditsRemaining: 0
  });

  useEffect(() => {
    if (!slug) return;
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);


  async function fetchDashboardData() {
    try {
      // 1. Fetch library info
      const { data: libraryData, error: libraryError } = await supabase
        .from('libraries')
        .select('*')
        .eq('slug', slug)
        .single();

      if (libraryError || !libraryData) {
        console.error('Library not found:', libraryError);
        setLoading(false);
        return;
      }

      setLibrary(libraryData);

      // 2. Fetch restoration stats
      const { data: restorations, error: statsError } = await supabase
        .from('library_requests')
        .select('*')
        .eq('library_id', libraryData.id)
        .in('status', ['completed', 'succeeded']);  // ✅ Accept both

      if (!statsError && restorations) {
        const basicCount = restorations.filter(r => r.restore_type === 'basic').length;
        const premiumCount = restorations.filter(r => r.restore_type === 'premium').length;
        
        // Calculate total credits used from actual restorations
        const calculatedCreditsUsed = restorations.reduce((sum, r) => sum + (r.credits_used || 0), 0);

        setStats({
          totalRestorations: restorations.length,
          basicCount,
          premiumCount,
          creditsUsed: calculatedCreditsUsed,
          creditsRemaining: libraryData.monthly_credits - calculatedCreditsUsed
        });
      }

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading dashboard...</div>
      </div>
    );
  }

  if (!library) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Library not found</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href={`/library/${slug}`} className={styles.backLink}>
            ← Back to Library Portal
        </Link>
        <h1>{library.name} - Admin Dashboard</h1>
        <p>Monthly stats and usage</p>
        </header>

      <main className={styles.main}>
  {/* Stats Grid */}
  <div className={styles.statsGrid}>
    
    <div className={styles.statCard}>
      <span className={styles.statIcon}>📊</span>
      <div className={styles.statContent}>
        <h3>Total Restorations</h3>
        <p className={styles.statNumber}>{stats.totalRestorations}</p>
        <span className={styles.statLabel}>All time</span>
      </div>
    </div>

    <div className={styles.statCard}>
      <span className={styles.statIcon}>⚡</span>
      <div className={styles.statContent}>
        <h3>Basic Restorations</h3>
        <p className={styles.statNumber}>{stats.basicCount}</p>
        <span className={styles.statLabel}>Free tier</span>
      </div>
    </div>

    <div className={styles.statCard}>
      <span className={styles.statIcon}>💎</span>
      <div className={styles.statContent}>
        <h3>Premium Restorations</h3>
        <p className={styles.statNumber}>{stats.premiumCount}</p>
        <span className={styles.statLabel}>40 credits each</span>
      </div>
    </div>

    <div className={styles.statCard}>
      <span className={styles.statIcon}>💳</span>
      <div className={styles.statContent}>
        <h3>Credits Used</h3>
        <p className={styles.statNumber}>{stats.creditsUsed.toLocaleString()}</p>
        <span className={styles.statLabel}>of {library.monthly_credits.toLocaleString()}</span>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{
              width: `${(stats.creditsUsed / library.monthly_credits) * 100}%`
            }}
          />
        </div>
      </div>
    </div>

    <div className={styles.statCard}>
      <span className={styles.statIcon}>✨</span>
      <div className={styles.statContent}>
        <h3>Credits Remaining</h3>
        <p className={styles.statNumber}>{stats.creditsRemaining.toLocaleString()}</p>
        <span className={styles.statLabel}>
          Resets {new Date(library.credits_reset_date).toLocaleDateString()}
        </span>
      </div>
    </div>

    <div className={styles.statCard}>
      <span className={styles.statIcon}>📈</span>
      <div className={styles.statContent}>
        <h3>Usage Rate</h3>
        <p className={styles.statNumber}>
          {library.monthly_credits > 0 
            ? Math.round((stats.creditsUsed / library.monthly_credits) * 100)
            : 0}%
        </p>
        <span className={styles.statLabel}>of monthly allocation</span>
      </div>
    </div>

  </div>

 {/* Warning */}
  {stats.creditsRemaining < 500 && (
    <div className={styles.warning}>
      <span>⚠️</span>
      <div>
        <strong>Low Credits Warning</strong>
        <p>Only {stats.creditsRemaining} credits remaining. Consider increasing allocation.</p>
      </div>
    </div>
  )}

  {/* Subscription Info */}
  <div className={styles.subscriptionSection}>
    <h2>📋 Subscription Details</h2>
    <div className={styles.subscriptionCard}>
      <div className={styles.subDetail}>
        <strong>Plan:</strong> 
        <span>Professional Library Plan</span>
      </div>
      <div className={styles.subDetail}>
        <strong>Monthly Cost:</strong> 
        <span>$300/month</span>
      </div>
      <div className={styles.subDetail}>
        <strong>Status:</strong> 
        <span className={styles.statusActive}>Active</span>
      </div>
      <div className={styles.subDetail}>
        <strong>Next Billing:</strong> 
        <span>{new Date(library.credits_reset_date).toLocaleDateString()}</span>
      </div>
      <div className={styles.subDetail}>
        <strong>Monthly Credits:</strong> 
        <span>{library.monthly_credits.toLocaleString()} credits</span>
      </div>
    </div>
  </div>

  {/* Quick Links - UPDATE THESE */}
        <div className={styles.quickLinks}>
          <h2>🔗 Quick Links</h2>
          <div className={styles.linksGrid}>
            <Link href={`/library/${slug}`} className={styles.linkCard}>
              <span>🏛️</span>
              <div>
                <strong>Library Portal</strong>
                <p>View public-facing page</p>
              </div>
            </Link>
            <Link href={`/library/${slug}/admin/help`} className={styles.linkCard}>
              <span>❓</span>
              <div>
                <strong>Help Center</strong>
                <p>Patron support guides</p>
              </div>
            </Link>
            <Link href="/library/privacy" className={styles.linkCard}>
              <span>🔒</span>
              <div>
                <strong>Privacy Policy</strong>
                <p>Review privacy terms</p>
              </div>
            </Link>
            <a href={`mailto:hello@throwbackai.app?subject=Support for ${library.name}`} className={styles.linkCard}>
              <span>📧</span>
              <div>
                <strong>Contact Support</strong>
                <p>Get help from our team</p>
              </div>
            </a>
          </div>
        </div>

  {/* Usage Insights */}
  <div className={styles.insightsSection}>
    <h2>📊 Usage Insights</h2>
    <div className={styles.insightCards}>
      <div className={styles.insightCard}>
        <h4>Average Daily Credits</h4>
        <p className={styles.insightNumber}>
          {Math.round(stats.creditsUsed / 30)}
        </p>
        <span className={styles.insightLabel}>credits per day</span>
      </div>
      <div className={styles.insightCard}>
        <h4>Most Popular</h4>
        <p className={styles.insightNumber}>
          {stats.premiumCount > stats.basicCount ? 'Premium' : 'Basic'}
        </p>
        <span className={styles.insightLabel}>restoration type</span>
      </div>
      <div className={styles.insightCard}>
        <h4>Projected Usage</h4>
        <p className={styles.insightNumber}>
          {stats.creditsUsed > 0 
            ? Math.round((stats.creditsUsed / new Date().getDate()) * 30)
            : 0}
        </p>
        <span className={styles.insightLabel}>credits this month (est.)</span>
      </div>
    </div>
  </div>

  {/* Account Info */}
  <div className={styles.accountSection}>
    <h2>👤 Account Information</h2>
    <div className={styles.accountCard}>
      <div className={styles.accountRow}>
        <strong>Library Name:</strong>
        <span>{library.name}</span>
      </div>
      <div className={styles.accountRow}>
        <strong>Service Area:</strong>
        <span>{library.allowed_zip_codes?.join(', ') || 'Not configured'}</span>
      </div>
      <div className={styles.accountRow}>
        <strong>Portal URL:</strong>
        <span>throwbackai.app/library/{slug}</span>
      </div>
    </div>
  </div>

  {/* Cancel Section */}
  <div className={styles.cancelSection}>
    <h2>Need to Make Changes?</h2>
    <p>To cancel your subscription, adjust your plan, or discuss your service, please contact us:</p>
    <div className={styles.cancelActions}>
      <a 
        href={`mailto:hello@throwbackai.app?subject=Subscription Changes - ${library.name}&body=Library: ${library.name}%0ARequest: [Please describe your request]`}
        className={styles.contactButton}
      >
        📧 Contact Us About Subscription
      </a>
      <p className={styles.cancelNote}>
        We typically respond within 1 business day. Cancellations require 7 days notice before your next billing date.
      </p>
    </div>
  </div>
</main>
    </div>
  );
}