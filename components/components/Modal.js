import styles from '../styles/Home.module.css';

export default function Modal({ children, onClose }) {
  return (
    <>
      <div className={styles.modalBackdrop} onClick={onClose} />
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.modalClose}>×</button>
        {children}
      </div>
    </>
  );
}