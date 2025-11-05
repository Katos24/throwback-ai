// components/decades/shared/DecadeHero.jsx
import TransformationDemo from "./TransformationDemo";

export default function DecadeHero({
  title,
  subtitle,
  avatarCost,
  currentDecade = "70s", // Pass decade for demo
  styles
}) {
  return (
    <section className={styles.heroWithDemo}>
      {/* Left: Hero Content */}
      <div className={styles.heroContent}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        <div className={styles.costPill}>COSTS {avatarCost} CREDITS</div>
        <p className={styles.freeCreditsNote}>Sign up & get 50 FREE credits to try!</p>
      </div>

      {/* Right: Transformation Demo */}
      <div className={styles.heroDemo}>
        <TransformationDemo decade={currentDecade} duration={6000} />
      </div>
    </section>
  );
}