// components/GenerateButton.js
export default function GenerateButton({
  onClick,
  isLoading,
  getButtonText,
  isComplete,
  progress,
  progressStage,
  styles
}) {
  return (
    <div className={styles.generateSection}>
      <button
        onClick={onClick}
        disabled={isLoading}
        className={`${styles.generateButton} ${isComplete ? styles.ready : ''}`}
      >
        {isLoading ? (
          <>
            <div className={styles.spinner}></div>
            {getButtonText()}
          </>
        ) : (
          getButtonText()
        )}
      </button>

      {isLoading && (
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className={styles.progressText}>
            <span>{progressStage}</span>
            <span>{progress}%</span>
          </div>
        </div>
      )}
    </div>
  );
}