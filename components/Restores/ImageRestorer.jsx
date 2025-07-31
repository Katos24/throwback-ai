import { useState } from 'react';
import ProgressBar from './ProgressBar';

export default function ImageRestorer({ imageUrl, onImageRestored }) {
  const [restoredImage, setRestoredImage] = useState(null);
  const [isRestoring, setIsRestoring] = useState(false);
  const [status, setStatus] = useState('Idle');
  const [progress, setProgress] = useState(0);
  const [allowNextAction, setAllowNextAction] = useState(true);

  const restoreImage = async () => {
    if (!allowNextAction) return;

    setIsRestoring(true);
    setStatus('Uploading');
    setProgress(10);
    setAllowNextAction(false);

    try {
      // Simulate upload
      await new Promise((res) => setTimeout(res, 1000));
      setStatus('Restoring');
      setProgress(50);

      // Simulate restore call
      await new Promise((res) => setTimeout(res, 2000));
      setStatus('Finalizing');
      setProgress(90);

      // Simulated response
      const simulatedRestoredUrl = imageUrl + '?restored=true';
      setTimeout(() => {
        setRestoredImage(simulatedRestoredUrl);
        setStatus('Complete');
        setProgress(100);
        setIsRestoring(false);
        setTimeout(() => {
          setAllowNextAction(true); // Re-enable buttons
        }, 1000);
      }, 1000);
    } catch (err) {
      setStatus('Error');
      setProgress(0);
      setIsRestoring(false);
      setAllowNextAction(true);
    }
  };

  const handleRetry = () => {
    setRestoredImage(null);
    setStatus('Idle');
    setProgress(0);
    setAllowNextAction(true);
  };

  return (
    <div className="image-restore-wrapper">
      <div className="image-container">
        <img src={restoredImage || imageUrl} alt="Image" className="restored-image" />
      </div>

      <ProgressBar status={status} progress={progress} />

      <div className="action-buttons">
        {!restoredImage && (
          <button onClick={restoreImage} disabled={isRestoring || !allowNextAction}>
            {isRestoring ? 'Restoring...' : 'Restore Image'}
          </button>
        )}

        {restoredImage && (
          <>
            <button onClick={handleRetry}>Try Another</button>
            <button onClick={() => onImageRestored(restoredImage)}>Use This Image</button>
          </>
        )}
      </div>
    </div>
  );
}
