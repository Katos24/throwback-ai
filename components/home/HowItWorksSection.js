import React from 'react';
import howItWorksStyles from '../../styles/HowItWorks.module.css';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: '📤',
      title: 'Upload Your Photo',
      description:
        'No signup required. Just upload your image and select a restoration option. All you need is a digital scan or smartphone photo.',
    },
    {
      icon: '🧠',
      title: 'AI-Powered Restoration',
      description:
        'Our neural models detect age damage, noise, blur, and color degradation &mdash; and correct them with surgical precision.',
    },
    {
      icon: '⚡',
      title: 'Lightning-Fast Results',
      description:
        'Your photo is processed in under 2 minutes. Even full restorations rarely take more than 90 seconds.',
    },
    {
      icon: '⬇️',
      title: 'Download & Share Freely',
      description:
        'Restored photos are downloadable in high-res formats, and yours to use forever. Share with loved ones or print as keepsakes.',
    },
  ];

  return (
    <section className={howItWorksStyles.container}>
      <div className={howItWorksStyles.titleWrapper}>
        <h2 className={howItWorksStyles.sectionTitle}>
          How <span className={howItWorksStyles.titleAccent}>It Works</span>
        </h2>
        <div className={howItWorksStyles.titleUnderline} />
        <p className={howItWorksStyles.subtitle}>
          Seamless restoration powered by heritage-grade AI
        </p>
      </div>
      <div className={howItWorksStyles.featuresGrid}>
        {steps.map((step, i) => (
          <div key={i} className={howItWorksStyles.featureCard}>
            <div className={howItWorksStyles.featureStat}>{step.icon}</div>
            <div className={howItWorksStyles.featureLabel}>
              <h3 className={howItWorksStyles.stepTitle}>{step.title}</h3>
              <p className={howItWorksStyles.stepDescription} dangerouslySetInnerHTML={{ __html: step.description }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
