// components/avatar/VideoAnimator.jsx

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import VIDEO_STYLES from './videoStyles';
import styles from './VideoAnimator.module.css';

export default function VideoAnimator({ 
  imageUrl, 
  styleCategory, 
  credits,
  onVideoGenerated,
  onCreditsUpdate 
}) {
  const [selectedVideoStyle, setSelectedVideoStyle] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const videoStyles = VIDEO_STYLES[styleCategory] || VIDEO_STYLES.portrait;
  const videoCost = 150;

  const handleGenerateVideo = async (videoStyle) => {
    if (credits < videoCost) {
      setError('Insufficient credits for video generation');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setProgress(0);
    setSelectedVideoStyle(videoStyle);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + 5;
      });
    }, 2000);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Please log in to generate videos');
      }

      const response = await fetch('/api/replicate/avatarVideo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          imageUrl: imageUrl,
          prompt: videoStyle.prompt
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate video');
      }

      clearInterval(progressInterval);
      setProgress(100);
      setVideoUrl(data.videoUrl);
      if (onVideoGenerated) onVideoGenerated(data.videoUrl);
      if (onCreditsUpdate) onCreditsUpdate();

    } catch (err) {
      clearInterval(progressInterval);
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadVideo = () => {
    if (!videoUrl) return;
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = `avatar-animation-${Date.now()}.mp4`;
    link.click();
  };

  return (
    <div className={styles.videoAnimator}>
      <div className={styles.header}>
        <h3 className={styles.title}>🎬 Animate Your Avatar</h3>
        <p className={styles.subtitle}>
          Bring your avatar to life with cinematic animations
        </p>
      </div>

      {!videoUrl ? (
        <>
          <div className={styles.stylesGrid}>
            {videoStyles.map((style, index) => (
              <button
                key={index}
                onClick={() => handleGenerateVideo(style)}
                disabled={isGenerating || credits < videoCost}
                className={`${styles.styleCard} ${
                  selectedVideoStyle?.label === style.label ? styles.active : ''
                }`}
              >
                <div className={styles.styleLabel}>{style.label}</div>
                <div className={styles.styleCredits}>{style.credits} credits</div>
              </button>
            ))}
          </div>

          {isGenerating && (
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill} 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className={styles.progressText}>
                <span>Generating {selectedVideoStyle?.label}...</span>
                <span>{progress}%</span>
              </div>
              <p className={styles.progressNote}>
                This takes about 30-60 seconds
              </p>
            </div>
          )}

          {error && (
            <div className={styles.error}>
              ❌ {error}
            </div>
          )}

          {credits < videoCost && (
            <div className={styles.creditWarning}>
              💰 You need {videoCost} credits to animate. 
              <button onClick={() => window.location.href = '/pricing'}>
                Buy More Credits
              </button>
            </div>
          )}
        </>
      ) : (
        <div className={styles.videoResult}>
          <video 
            controls 
            autoPlay 
            loop 
            className={styles.video}
            src={videoUrl}
          >
            Your browser does not support video playback.
          </video>
          
          <div className={styles.videoActions}>
            <button 
              onClick={handleDownloadVideo}
              className={styles.downloadButton}
            >
              ⬇️ Download Video
            </button>
            
            <button 
              onClick={() => {
                setVideoUrl(null);
                setSelectedVideoStyle(null);
              }}
              className={styles.createAnotherButton}
            >
              🎬 Create Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}