import ImageCompareSlider from "../../components/ImageCompareSlider";
import styles from "../../styles/RestoreBasic.module.css";

export default function CompareSection({ before, after }) {
  return (
    <section className={styles.compareSection}>
      <h2 className={styles.compareTitle}>Compare Your Restoration</h2>
      <ImageCompareSlider beforeImage={before} afterImage={after} />
    </section>
  );
}