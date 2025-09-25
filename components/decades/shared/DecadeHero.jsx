// components/decades/shared/DecadeHero.jsx
export default function DecadeHero({ 
  title, 
  subtitle, 
  avatarCost, 
  styles 
}) {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
      <div className={styles.costPill}>COSTS {avatarCost} CREDITS</div>
    </section>
  );
}