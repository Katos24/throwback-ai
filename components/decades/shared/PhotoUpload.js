// components/decades/shared/PhotoUpload.js
import { useState } from "react";
import toast from 'react-hot-toast';

export default function PhotoUpload({ 
  photo, 
  setPhoto, 
  previewUrl, 
  setPreviewUrl, 
  resultImageUrl, 
  setResultImageUrl,
  setShowingOriginal,
  onPhotoUpload,
  decade = "90s",
  styles 
}) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file (PNG, JPG, HEIC)', {
        icon: getDecadeIcon(decade),
        duration: 4000,
      });
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be under 10MB', {
        icon: '📏',
        duration: 4000,
      });
      return;
    }

    setPhoto(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResultImageUrl(null);
    setShowingOriginal(false);
    
    toast.success(`Photo uploaded! Time to get ${getDecadeAdjective(decade)} with your ${decade} style!`, {
      icon: getDecadeIcon(decade),
      duration: 2000,
    });

    // Callback for parent component
    if (onPhotoUpload) {
      onPhotoUpload();
    }
  };

  return (
    <div
      className={`${styles.uploadArea} ${dragActive ? styles.dragActive : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => document.getElementById('photo-upload').click()}
    >
      <div className={styles.uploadPrompt}>
        <div className={styles.uploadIcon}>📷</div>
        <h4>Drop your photo here</h4>
        <p>Drag & drop or click to select</p>
        <small>Best results with clear face photos<br/>PNG, JPG, HEIC up to 10MB</small>
      </div>
      
      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        style={{ display: 'none' }}
      />
    </div>
  );
}

function getDecadeIcon(decade) {
  const icons = {
    "70s": "📺",
    "80s": "📻", 
    "90s": "📼",
    "2000s": "💻"
  };
  return icons[decade] || "📷";
}

function getDecadeAdjective(decade) {
  const adjectives = {
    "70s": "groovy",
    "80s": "radical", 
    "90s": "radical",
    "2000s": "awesome"
  };
  return adjectives[decade] || "stylish";
}