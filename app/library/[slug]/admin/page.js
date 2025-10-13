'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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
        .from('library_restorations')
        .select('*')
        .eq('library_id', libraryData.id);

      if (!statsError && restorations) {
        const basicCount = restorations.filter(r => r.restoration_type === 'basic').length;
        const premiumCount = restorations.filter(r => r.restoration_type === 'premium').length;
        
        setStats({
          totalRestorations: restorations.length,
          basicCount,
          premiumCount,
          creditsUsed: libraryData.credits_used,
          creditsRemaining: libraryData.monthly_credits - libraryData.credits_used
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
</main>
    </div>
  );
}