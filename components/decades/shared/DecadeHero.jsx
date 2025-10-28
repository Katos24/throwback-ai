// components/decades/shared/DecadeHero.jsx
import { useRouter } from 'next/router';

const DECADE_ORDER = [
  { decade: '70s', path: '/replicate/70s', label: '70s' },
  { decade: '80s', path: '/replicate/80s', label: '80s' },
  { decade: '90s', path: '/replicate/90s', label: '90s' },
  { decade: '00s', path: '/replicate/2000s', label: '00s' }
];

export default function DecadeHero({
  title,
  subtitle,
  avatarCost,
  styles,
  currentDecade // e.g., '80s', '90s'
}) {
  const router = useRouter();

  // Find current decade index
  const currentIndex = DECADE_ORDER.findIndex(d => d.decade === currentDecade);
  const prevDecade = currentIndex > 0 ? DECADE_ORDER[currentIndex - 1] : null;
  const nextDecade = currentIndex < DECADE_ORDER.length - 1 ? DECADE_ORDER[currentIndex + 1] : null;

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <section className={styles.hero}>
      {/* Decade Navigation */}
      <div className={styles.decadeNav}>
        {prevDecade ? (
          <button 
            className={styles.decadeNavButton}
            onClick={() => handleNavigation(prevDecade.path)}
            aria-label={`Go to ${prevDecade.label} yearbook`}
          >
            <span className={styles.navArrow}>←</span>
            <span className={styles.navLabel}>{prevDecade.label}</span>
          </button>
        ) : (
          <div className={styles.decadeNavSpacer} />
        )}

        <div className={styles.currentDecade}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>

        {nextDecade ? (
          <button 
            className={styles.decadeNavButton}
            onClick={() => handleNavigation(nextDecade.path)}
            aria-label={`Go to ${nextDecade.label} yearbook`}
          >
            <span className={styles.navLabel}>{nextDecade.label}</span>
            <span className={styles.navArrow}>→</span>
          </button>
        ) : (
          <div className={styles.decadeNavSpacer} />
        )}
      </div>

      <div className={styles.costPill}>COSTS {avatarCost} CREDITS</div>
      <p className={styles.freeCreditsNote}>Sign up & get 50 FREE credits to try!</p>
    </section>
  );
}