'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from './help.module.css';

export default function LibraryAdminHelp() {
  const params = useParams();
  const slug = params.slug;
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const helpSections = [
    {
      category: "Getting Started",
      icon: "🚀",
      questions: [
        {
          q: "How do patrons access the photo restoration service?",
          a: "Patrons visit your library's portal at throwbackai.app/library/" + slug + " and enter their zip code to verify they're in your service area. Once verified, they can upload and restore photos for free using your library's credits."
        },
        {
          q: "What's the difference between Basic and Premium restoration?",
          a: "Basic restoration (free for patrons) removes scratches, fixes tears, and enhances clarity. Premium restoration (40 credits) includes everything in Basic PLUS colorization of black & white photos and advanced detail enhancement. Most patrons start with Basic."
        },
        {
          q: "How many photos can patrons restore?",
          a: "Your library has a monthly credit allocation. Basic restorations are free (0 credits), while Premium costs 40 credits each. Credits reset on the 1st of each month."
        }
      ]
    },
    {
      category: "Common Patron Issues",
      icon: "❓",
      questions: [
        {
          q: "Patron says their zip code isn't working",
          a: "1. Verify their zip code is in your service area\n2. Check for typos (leading/trailing spaces)\n3. Confirm they're entering just the 5-digit zip, not ZIP+4\n4. If issue persists, contact support with the patron's zip code to add it"
        },
        {
          q: "Photo upload fails or gets stuck",
          a: "Common causes:\n• File too large (max 10MB) - ask patron to resize\n• Unsupported format - must be JPG, PNG, or WebP\n• Slow internet - suggest trying again\n• Browser issue - try different browser or clear cache"
        },
        {
          q: "Restoration quality isn't good",
          a: "• If photo is too damaged, results may vary\n• Suggest trying Premium for better enhancement\n• Very low resolution originals have limitations\n• For best results, use high-quality scans (300+ DPI)"
        },
        {
          q: "Patron can't download their restored photo",
          a: "• Check if popup blockers are enabled\n• Try right-click > Save Image As\n• Suggest using a different browser\n• Verify they completed the restoration process"
        }
      ]
    },
    {
      category: "Credits & Usage",
      icon: "💳",
      questions: [
        {
          q: "How do I check how many credits we have left?",
          a: "View your admin dashboard at /library/" + slug + "/admin to see real-time credit usage, remaining balance, and reset date. You'll get a warning when credits are low."
        },
        {
          q: "What happens if we run out of credits?",
          a: "Patrons will see a message that credits are depleted for the month. They can still view the portal but can't process new restorations until credits reset on the 1st. Contact us if you need to increase your monthly allocation."
        },
        {
          q: "Can we get more credits mid-month?",
          a: "Yes! Contact support to discuss increasing your monthly credit limit or purchasing additional credits for high-demand periods."
        },
        {
          q: "Do unused credits roll over?",
          a: "No, credits reset to your monthly allocation on the 1st of each month. Unused credits don't accumulate."
        }
      ]
    },
    {
      category: "Privacy & Security",
      icon: "🔒",
      questions: [
        {
          q: "What happens to patron photos after restoration?",
          a: "Photos are processed securely and deleted from our servers after 24 hours. We never store, view, or share patron photos. Full details in our Privacy Policy."
        },
        {
          q: "Can library staff see patron photos?",
          a: "No. The system is designed for patron privacy. You can see aggregate statistics (number of restorations, credit usage) but never the actual photos."
        },
        {
          q: "Is the service GDPR/CCPA compliant?",
          a: "Yes. We follow all major privacy regulations. Patrons own their photos, we're just the processor. No personal data is collected beyond zip code verification."
        }
      ]
    },
    {
      category: "Marketing & Promotion",
      icon: "📢",
      questions: [
        {
          q: "How do I promote this service to patrons?",
          a: "• Add a banner on your library website\n• Include in newsletters and social media\n• Create signage for your physical location\n• Mention at programs for seniors/genealogy groups\n• Host a 'Photo Restoration Day' event"
        },
        {
          q: "Can I customize the portal with our branding?",
          a: "Your portal displays your library logo and name. For additional customization (colors, messaging), contact support."
        },
        {
          q: "Do you provide marketing materials?",
          a: "Yes! Contact support for:\n• Social media graphics\n• Email templates\n• Printable flyers\n• Website banner code"
        }
      ]
    },
    {
      category: "Technical Support",
      icon: "🔧",
      questions: [
        {
          q: "Service seems slow or down",
          a: "1. Check your internet connection\n2. Try refreshing the page\n3. Check our status page (if available)\n4. Contact support if issue persists - include time, browser, and error message"
        },
        {
          q: "How do I report a bug or issue?",
          a: "Email hello@throwbackai.app with:\n• Description of the issue\n• What the patron was trying to do\n• Browser and device type\n• Screenshot if possible\n• Your library name"
        },
        {
          q: "Can patrons use this on mobile devices?",
          a: "Yes! The portal works on phones and tablets. Patrons can take photos with their phone camera or upload from their gallery."
        }
      ]
    },
    {
      category: "Billing & Account",
      icon: "💰",
      questions: [
        {
          q: "How much does the service cost?",
          a: "Your subscription is $300/month and includes your monthly credit allocation. This covers unlimited Basic restorations for your patrons."
        },
        {
          q: "How do I cancel or modify my subscription?",
          a: "Contact support at least 7 days before your next billing date. We'll discuss your needs and process the change."
        },
        {
          q: "Can I pause the service temporarily?",
          a: "Yes! Contact us to discuss seasonal adjustments or temporary pauses. We're flexible with library budgets and schedules."
        },
        {
          q: "Do you offer discounts for multiple branches?",
          a: "Yes! If your library system wants portals for multiple branches, contact us for volume pricing."
        }
      ]
    }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href={`/library/${slug}/admin`} className={styles.backLink}>
          ← Back to Dashboard
        </Link>
        <h1>📚 Library Admin Help Center</h1>
        <p>Quick answers to common questions and troubleshooting guides</p>
      </header>

      <main className={styles.main}>
        {/* Quick Contact */}
        <div className={styles.quickContact}>
          <h3>🆘 Need Immediate Help?</h3>
          <p>Can&apos;t find what you&apos;re looking for? We&apos;re here to help!</p>
          <a href="mailto:hello@throwbackai.app" className={styles.contactBtn}>
            📧 Email Support
          </a>
          <p className={styles.responseTime}>We typically respond within 1 business day</p>
        </div>

        {/* Help Sections */}
        {helpSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon}>{section.icon}</span>
              <h2>{section.category}</h2>
            </div>

            <div className={styles.questionsContainer}>
              {section.questions.map((item, questionIndex) => {
                const index = `${sectionIndex}-${questionIndex}`;
                const isExpanded = expandedSection === index;

                return (
                  <div key={questionIndex} className={styles.questionCard}>
                    <button
                      className={styles.questionButton}
                      onClick={() => toggleSection(index)}
                    >
                      <span className={styles.questionText}>{item.q}</span>
                      <span className={styles.toggleIcon}>
                        {isExpanded ? '−' : '+'}
                      </span>
                    </button>

                    {isExpanded && (
                      <div className={styles.answer}>
                        {item.a.split('\n').map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Additional Resources */}
        <div className={styles.resources}>
          <h2>📖 Additional Resources</h2>
          <div className={styles.resourceGrid}>
            <a href={`/library/${slug}`} className={styles.resourceCard}>
              <span>🏛️</span>
              <strong>View Library Portal</strong>
              <p>See what your patrons see</p>
            </a>
            <Link href="/library/privacy" className={styles.resourceCard}>
              <span>🔒</span>
              <strong>Privacy Policy</strong>
              <p>Review our privacy terms</p>
            </Link>
            <Link href="/library/terms" className={styles.resourceCard}>
            
              <span>📜</span>
              <strong>Terms of Service</strong>
              <p>Review service agreement</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}