import React from 'react';
import howItWorksStyles from './HowItWorks.module.css';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: '👤',
      title: 'Sign Up & Get Free Credits',
      description: 'Create your free account and get 50 credits to start transforming photos right away. No subscription required - just pay as you go.',
    },
    {
      icon: '📤',
      title: 'Upload & Choose Your Style',
      description: 'Upload your photo and select from restoration, colorization, yearbook style, professional avatars, or cartoon art. Each transformation is optimized for different needs.',
    },
    {
      icon: '🧠',
      title: 'AI-Powered Transformation',
      description: 'Our specialized neural models analyze your photo and apply the perfect enhancement - from repairing damage to adding vintage styling or creating artistic interpretations.',
    },
    {
      icon: '⚡',
      title: 'Lightning-Fast Results',
      description: 'Most transformations complete in under 30 seconds. Download your high-resolution results and share them freely - they\'re yours forever.',
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
          Transform any photo in 4 simple steps - from restoration to creative art
        </p>
      </div>
      
      <div className={howItWorksStyles.featuresGrid}>
        {steps.map((step, i) => (
          <div key={i} className={howItWorksStyles.featureCard}>
            <div className={howItWorksStyles.featureStat}>{step.icon}</div>
            <div className={howItWorksStyles.featureLabel}>
              <h3 className={howItWorksStyles.stepTitle}>{step.title}</h3>
              <p className={howItWorksStyles.stepDescription}>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Optional: Add a note about credits */}
      <div className={howItWorksStyles.creditNote}>
        <p>💡 <strong>Credit System:</strong> Different transformations use different amounts of credits based on complexity. Photo restoration starts at just 1 credit, while advanced features like Photo Colorization use 40 credits and Decades uses 50 credits.</p>
      </div>
    </section>
  );
};

export default HowItWorksSection;