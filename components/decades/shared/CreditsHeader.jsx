// components/decades/shared/CreditsHeader.jsx
export default function CreditsHeader({ 
  credits, 
  isLoggedIn, 
  onButtonClick, 
  icon,
  styles 
}) {
  return (
    <header className={styles.creditsHeader}>
      <div className={styles.creditsInfo}>
        <span className={styles.creditsIcon} role="img" aria-label={icon.label}>
          {icon.emoji}
        </span>
        <span className={styles.creditsText}>{credits} {credits === 1 ? 'CREDIT' : 'CREDITS'}</span>
      </div>
      <button 
        onClick={onButtonClick}
        className={styles.creditsButton}
        aria-label={isLoggedIn ? "Get more credits" : "Sign up for account"}
      >
        {isLoggedIn ? "GET MORE" : "SIGN UP"}
      </button>
    </header>
  );
}