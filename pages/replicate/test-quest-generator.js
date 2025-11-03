import { useState, useRef } from 'react';
import Head from 'next/head';
import { supabase } from '../../lib/supabaseClient';

export default function TestQuestGenerator() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questData, setQuestData] = useState(null);
  const [error, setError] = useState(null);
  const [generatingVideo, setGeneratingVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [currentScene, setCurrentScene] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setQuestData(null);
      setError(null);
      setVideoUrl(null);
    }
  };

  // Parse the AI response into structured data
 const parseQuest = (text) => {
  const scenes = [];
  // More tolerant regex
  const sceneRegex = /SCENE\s*(\d+)[\s\S]*?([^\n]+)\s*Choice\s*A:\s*([^\n]+)\s*Choice\s*B:\s*([^\n]+)\s*Choice\s*C:\s*([^\n]+)/gi;

  let match;
  while ((match = sceneRegex.exec(text)) !== null) {
    scenes.push({
      sceneNumber: match[1],
      description: match[2].trim(),
      choices: [match[3].trim(), match[4].trim(), match[5].trim()],
    });
  }

  const characterMatch = text.match(/CHARACTER[:\s]*([^\n]+)/i);
  const questMatch = text.match(/QUEST[:\s]*"?([^"\n]+)"?/i);

  return {
    character: characterMatch ? characterMatch[1].trim() : 'Unknown',
    questTitle: questMatch ? questMatch[1].trim() : 'Untitled Quest',
    scenes,
    fullText: text,
  };
};

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      const base64Promise = new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(selectedFile);
      });

      const imageDataUrl = await base64Promise;

      const analyzeRes = await fetch('/api/replicate/questGenerator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: imageDataUrl }),
      });

      const data = await analyzeRes.json();
      
      if (!analyzeRes.ok) {
        throw new Error(data.details || data.error || 'Unknown error');
      }

      const parsed = parseQuest(data.questText);
      setQuestData(parsed);
      console.log('Parsed quest:', parsed);

    } catch (err) {
      console.error('Full Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateVideo = async (choiceText) => {
    setGeneratingVideo(true);
    setError(null);
    setVideoUrl(null);

    try {
      const reader = new FileReader();
      const base64Promise = new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(selectedFile);
      });

      const imageDataUrl = await base64Promise;
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Not logged in. Please sign in first.');
      }

      console.log('Generating video with prompt:', choiceText);

      const response = await fetch('/api/replicate/avatarVideo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          imageUrl: imageDataUrl,
          prompt: choiceText
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate video');
      }

      setVideoUrl(data.videoUrl);
      console.log('Video generated:', data.videoUrl);

    } catch (err) {
      console.error('Video generation error:', err);
      setError(err.message);
    } finally {
      setGeneratingVideo(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setQuestData(null);
    setError(null);
    setVideoUrl(null);
    setCurrentScene(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      <Head><title>AI Quest Generator with Videos</title></Head>
      <div style={styles.page}>
        <div style={styles.container}>
          <h1 style={styles.title}>🎮 AI Quest + Video Generator</h1>
          <div style={styles.card}>
            {!previewUrl ? (
              <div style={styles.uploadSection}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
                <button onClick={() => fileInputRef.current?.click()} style={styles.uploadButton}>
                  📤 Upload Avatar Image
                </button>
                <p style={styles.uploadHint}>Upload a generated avatar to create an interactive quest</p>
              </div>
            ) : (
              <>
                <div style={styles.previewSection}>
                  <img src={previewUrl} alt="Avatar" style={styles.preview} />
                </div>

                {!questData && (
                  <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    style={{...styles.analyzeButton, ...(loading ? styles.buttonDisabled : {})}}
                  >
                    {loading ? '🔍 Analyzing Avatar...' : '🎲 Generate Quest'}
                  </button>
                )}

                {error && <div style={styles.error}>{error}</div>}

                {questData && (
                  <>
                    <div style={styles.questBox}>
                      <h2 style={styles.questTitle}>⚔️ {questData.questTitle}</h2>
                      <p style={styles.character}>
                        <strong>Your Character:</strong> {questData.character}
                      </p>
                    </div>

                    {questData.scenes.map((scene, index) => (
                      <div key={index} style={styles.sceneBox}>
                        <h3 style={styles.sceneTitle}>Scene {scene.sceneNumber}</h3>
                        <p style={styles.sceneDescription}>{scene.description}</p>
                        
                        <div style={styles.choiceButtons}>
                          {scene.choices.map((choice, choiceIndex) => (
                            <button
                              key={choiceIndex}
                              onClick={() => handleGenerateVideo(choice)}
                              disabled={generatingVideo}
                              style={{
                                ...styles.choiceButton,
                                ...(generatingVideo ? styles.buttonDisabled : {})
                              }}
                            >
                              {['A', 'B', 'C'][choiceIndex]}: {choice}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    {generatingVideo && (
                      <div style={styles.videoLoading}>
                        <div style={styles.spinner}></div>
                        <p>Generating your scene video...</p>
                        <p style={styles.loadingSubtext}>This may take up to 2 minutes</p>
                      </div>
                    )}

                    {videoUrl && (
                      <div style={styles.videoResult}>
                        <h4 style={styles.videoResultTitle}>🎬 Your Scene:</h4>
                        <video 
                          src={videoUrl} 
                          controls 
                          autoPlay 
                          loop
                          style={styles.video}
                        />
                        <button
                          onClick={() => {
                            const a = document.createElement('a');
                            a.href = videoUrl;
                            a.download = 'quest-scene.mp4';
                            a.click();
                          }}
                          style={styles.downloadButton}
                        >
                          ⬇️ Download Video
                        </button>
                      </div>
                    )}

                    <div style={styles.buttonRow}>
                      <button onClick={handleAnalyze} style={styles.buttonSecondary}>
                        🔄 New Quest
                      </button>
                      <button onClick={handleReset} style={styles.analyzeButton}>
                        ✨ New Avatar
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  page: { minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '40px 20px' },
  container: { maxWidth: '900px', margin: '0 auto' },
  title: { fontSize: '48px', fontWeight: 'bold', textAlign: 'center', color: 'white', marginBottom: '30px', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' },
  card: { backgroundColor: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' },
  uploadSection: { textAlign: 'center', padding: '60px 20px' },
  uploadButton: { padding: '20px 40px', fontSize: '20px', fontWeight: 'bold', color: 'white', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none', borderRadius: '15px', cursor: 'pointer', marginBottom: '15px' },
  uploadHint: { color: '#666', fontSize: '14px' },
  previewSection: { textAlign: 'center', marginBottom: '30px' },
  preview: { maxWidth: '300px', maxHeight: '300px', borderRadius: '10px', border: '3px solid #667eea' },
  analyzeButton: { width: '100%', padding: '18px', fontSize: '20px', fontWeight: 'bold', color: 'white', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none', borderRadius: '10px', cursor: 'pointer', marginBottom: '15px' },
  buttonDisabled: { opacity: 0.5, cursor: 'not-allowed' },
  error: { backgroundColor: '#fee', color: '#c33', padding: '15px', borderRadius: '10px', marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' },
  questBox: { backgroundColor: '#f0f7ff', padding: '20px', borderRadius: '10px', marginBottom: '20px', border: '2px solid #667eea' },
  questTitle: { fontSize: '24px', fontWeight: 'bold', color: '#667eea', marginBottom: '10px' },
  character: { fontSize: '16px', color: '#333', lineHeight: '1.6' },
  sceneBox: { backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px', marginBottom: '20px', border: '2px solid #e0e0e0' },
  sceneTitle: { fontSize: '20px', fontWeight: 'bold', color: '#667eea', marginBottom: '10px' },
  sceneDescription: { fontSize: '16px', color: '#333', marginBottom: '15px', lineHeight: '1.6' },
  choiceButtons: { display: 'grid', gridTemplateColumns: '1fr', gap: '10px' },
  choiceButton: { padding: '15px', fontSize: '16px', fontWeight: 'bold', color: 'white', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none', borderRadius: '10px', cursor: 'pointer', textAlign: 'left' },
  videoLoading: { textAlign: 'center', padding: '30px', backgroundColor: '#f0f7ff', borderRadius: '10px', marginBottom: '20px' },
  spinner: { width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #667eea', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 15px' },
  loadingSubtext: { fontSize: '14px', color: '#999', marginTop: '10px' },
  videoResult: { marginTop: '20px', padding: '20px', backgroundColor: '#f0f7ff', borderRadius: '10px', textAlign: 'center' },
  videoResultTitle: { fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#667eea' },
  video: { width: '100%', maxWidth: '600px', borderRadius: '10px', border: '3px solid #667eea', marginBottom: '15px' },
  downloadButton: { padding: '12px 30px', fontSize: '16px', fontWeight: 'bold', color: 'white', background: '#28a745', border: 'none', borderRadius: '10px', cursor: 'pointer' },
  buttonRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' },
  buttonSecondary: { width: '100%', padding: '15px', fontSize: '18px', fontWeight: 'bold', color: '#667eea', background: 'white', border: '2px solid #667eea', borderRadius: '10px', cursor: 'pointer' }
};