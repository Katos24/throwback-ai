// pages/replicate/test-avatar-video.js
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function TestAvatarVideo() {
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!imageFile) return;
    
    setUploading(true);
    setError(null);

    try {
      // Convert to base64 and use directly
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setImageUrl(base64);
        alert('Image ready!');
        setUploading(false);
      };
      reader.onerror = () => {
        setError('Failed to read image file');
        setUploading(false);
      };
      reader.readAsDataURL(imageFile);
    } catch (err) {
      setError(err.message);
      setUploading(false);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Not logged in');
      }

      // Call the API
      const response = await fetch('/api/replicate/avatarVideo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          imageUrl,
          prompt: prompt || 'AI animated avatar video'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate video');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h1>Test Avatar Video Generation</h1>
      
      {/* File Upload Section */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '2px dashed #ccc' }}>
        <h3>Upload Image</h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginBottom: '10px' }}
        />
        
        {imagePreview && (
          <div style={{ marginBottom: '10px' }}>
            <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', display: 'block' }} />
          </div>
        )}
        
        <button
          onClick={handleUpload}
          disabled={!imageFile || uploading}
          style={{ padding: '8px 16px', cursor: uploading ? 'wait' : 'pointer' }}
        >
          {uploading ? 'Processing...' : 'Use This Image'}
        </button>
      </div>

      {/* OR Divider */}
      <div style={{ textAlign: 'center', margin: '20px 0', fontWeight: 'bold' }}>OR</div>

      {/* URL Input Section */}
      <div style={{ marginBottom: '20px' }}>
        <label>
          Image URL:
          <br />
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg or data:image/..."
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Prompt (optional):
          <br />
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Character turns head to the side, alert and scanning"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </label>
      </div>

      <button
        onClick={handleGenerate}
        disabled={!imageUrl || loading}
        style={{ 
          padding: '10px 20px', 
          cursor: (loading || !imageUrl) ? 'not-allowed' : 'pointer',
          backgroundColor: !imageUrl ? '#ccc' : '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        {loading ? 'Generating Video... (this takes ~60s)' : 'Generate Video'}
      </button>

      {error && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#ffcccc', border: '1px solid red', borderRadius: '5px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#ccffcc', border: '1px solid green', borderRadius: '5px' }}>
          <strong>Success! Video Generated</strong>
          <br />
          <br />
          <video controls style={{ width: '100%', maxWidth: '400px', borderRadius: '5px' }}>
            <source src={result.videoUrl} type="video/mp4" />
          </video>
          <br />
          <br />
          <a 
            href={result.videoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#0070f3', textDecoration: 'underline' }}
          >
            Open Video in New Tab
          </a>
        </div>
      )}

      <div style={{ marginTop: '40px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <strong>Prompt Ideas:</strong>
        <ul>
          <li>Character turns head to the side, alert and scanning</li>
          <li>Spartan turning around quickly as if spotting enemy threat</li>
          <li>Character slowly turns to face camera, hero reveal moment</li>
        </ul>
      </div>
    </div>
  );
}