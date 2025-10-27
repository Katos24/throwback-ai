import styles from './UseCases.module.css';

const UseCases = () => {
  const useCases = [
    {
      icon: "🎮",
      title: "Gaming & Streaming",
      description: "Create unique avatars for your gaming profiles, Twitch, YouTube, or Discord. Stand out with fantasy warriors, cyberpunk heroes, or custom character designs."
    },
    {
      icon: "💼",
      title: "Professional Profiles",
      description: "Generate polished, professional avatars for LinkedIn, business cards, and corporate profiles. Transform yourself into executive portraits or creative professional looks."
    },
    {
      icon: "🎨",
      title: "Content Creators",
      description: "Perfect for YouTubers, podcasters, and social media influencers. Create memorable profile pictures that capture your brand and personality."
    },
    {
      icon: "🎭",
      title: "D&D & Role-Playing",
      description: "Bring your characters to life! Create avatars for your D&D campaigns, tabletop games, or online role-playing communities with fantasy and medieval styles."
    },
    {
      icon: "📱",
      title: "Social Media",
      description: "Stand out on Instagram, Twitter, TikTok, and Facebook with eye-catching AI-generated avatars. Refresh your profile with trending anime, cartoon, or artistic styles."
    },
    {
      icon: "🎁",
      title: "Gifts & Fun",
      description: "Create unique avatars as gifts for friends and family. Perfect for birthdays, holidays, or just for fun. Turn loved ones into wizards, superheroes, or historical figures."
    }
  ];

  return (
    <div className={styles.useCasesSection}>
      <h2 className={styles.sectionTitle}>Who Uses AI Avatars?</h2>
      <p className={styles.sectionSubtitle}>
        Perfect for anyone looking to create stunning, personalized avatars in seconds
      </p>
      <div className={styles.useCasesGrid}>
        {useCases.map((useCase, index) => (
          <div key={index} className={styles.useCaseCard}>
            <div className={styles.useCaseIcon}>{useCase.icon}</div>
            <h3 className={styles.useCaseTitle}>{useCase.title}</h3>
            <p className={styles.useCaseDescription}>{useCase.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UseCases;