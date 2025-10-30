// components/avatar/TransformVideo.js
import styles from '../../styles/AvatarPage.module.css';

export default function TransformVideo({ src }) {
  return (
    <div className={styles.heroVideoContainer}>
      <video
        src={src}
        loop
        autoPlay
        muted
        playsInline
        className={styles.heroVideo}
      />
    </div>
  );
}
