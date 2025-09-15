// pages/test-90s-radio.js
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../styles/decades/RadioNinetiesTest.module.css";

export default function RadioNinetiesTest() {
  const router = useRouter();
  
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // Radio state
  const [currentFrequency, setCurrentFrequency] = useState(91.1);
  const [currentStation, setCurrentStation] = useState(null);
  const [isStatic, setIsStatic] = useState(false);
  const [isTuning, setIsTuning] = useState(false);
  const [volume, setVolume] = useState(75);
  const [dialAngle, setDialAngle] = useState(0);

  // Configuration state
  const [userGender, setUserGender] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [styleStrength, setStyleStrength] = useState(20);

  // Radio stations for 90s styles
  const radioStations = [
    { freq: 91.1, style: 'grunge', name: 'GRUNGE-FM', tagline: 'All flannel, all the time', angle: 0 },
    { freq: 92.3, style: 'hip-hop', name: 'HIP-HOP BEATS', tagline: 'Straight from the streets', angle: 45 },
    { freq: 93.7, style: 'rave', name: 'RAVE-WAVES', tagline: 'Dance floor madness', angle: 90 },
    { freq: 94.5, style: 'preppy', name: 'PREP-FM', tagline: 'Country club classics', angle: 135 },
    { freq: 95.9, style: 'skater', name: 'SKATE-RADIO', tagline: 'Totally radical vibes', angle: 180 },
    { freq: 96.7, style: 'mall-goth', name: 'DARK-WAVE', tagline: 'Embrace the darkness', angle: 225 },
    { freq: 97.5, style: 'boy-band', name: 'TEEN-FM', tagline: 'Heartthrob headquarters', angle: 270 },
    { freq: 98.3, style: 'sitcom-character', name: 'FAMILY-FM', tagline: 'Must-see TV vibes', angle: 315 }
  ];

  useEffect(() => {
    // Set initial station
    const initialStation = radioStations.find(s => s.freq === currentFrequency);
    if (initialStation) {
      setCurrentStation(initialStation);
      setSelectedStyle(initialStation.style);
    }
  }, []);

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
      alert('Please upload a valid image file');
      return;
    }
    
    setPhoto(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const tuneToStation = (station) => {
    setIsTuning(true);
    setIsStatic(true);
    
    // Simulate tuning delay
    setTimeout(() => {
      setCurrentFrequency(station.freq);
      setCurrentStation(station);
      setSelectedStyle(station.style);
      setDialAngle(station.angle);
      setIsStatic(false);
      setIsTuning(false);
    }, 800);
  };

  const handleGenerate = () => {
    if (!photo) {
      alert('Please upload a photo first');
      return;
    }
    if (!selectedStyle) {
      alert('Please tune to a station first');
      return;
    }
    if (!userGender) {
      alert('Please select gender using the antenna');
      return;
    }
    
    alert(`Generating ${currentStation?.name} style photo for ${userGender} at ${styleStrength}% intensity!`);
  };

  return (
    <>
      <Head>
        <title>90s Radio Test - Yearbook Generator</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.creditsBar}>
          <span>90s Radio Yearbook Generator - Test Mode</span>
          <button onClick={() => router.push('/')}>Back to Main</button>
        </div>

        <div className={styles.mainContent}>
          {/* Photo Upload Section */}
          <div className={styles.photoSection}>
            <h2 className={styles.photoTitle}>Upload Your Photo</h2>
            <div
              className={`${styles.photoUpload} ${dragActive ? styles.dragActive : ''} ${previewUrl ? styles.hasImage : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById('photo-upload').click()}
            >
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Uploaded photo"
                  width={300}
                  height={300}
                  className={styles.uploadedImage}
                />
              ) : (
                <div className={styles.uploadPrompt}>
                  <div className={styles.uploadIcon}>📷</div>
                  <h4>Drop your photo here</h4>
                  <p>Drag & drop or click to select</p>
                </div>
              )}
            </div>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
            />
          </div>

          {/* Boombox Control Section */}
          <div className={styles.boomboxSection}>
            <div className={styles.boomboxHeader}>
              <h1>90s MEGA BLASTER</h1>
            </div>

            {/* Radio Display */}
            <div className={styles.radioDisplay}>
              <div className={`${styles.frequencyDisplay} ${isTuning ? styles.tuning : ''} ${isStatic ? styles.static : ''}`}>
                {isStatic ? 'STATIC' : `${currentFrequency} FM`}
              </div>
              <div className={styles.stationName}>
                {isStatic ? '~~~~~~~~' : currentStation?.name || 'NO SIGNAL'}
              </div>
              <div className={styles.nowPlaying}>
                {isStatic ? 'TUNING...' : currentStation?.tagline || 'Select a station'}
              </div>
            </div>

            {/* Radio Dial */}
            <div className={styles.dialSection}>
              <div className={styles.dialContainer}>
                <div className={styles.dialKnob}>
                  <div 
                    className={styles.dialIndicator}
                    style={{ transform: `translateX(-50%) rotate(${dialAngle}deg)` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Station Preset Buttons */}
            <div className={styles.stationButtons}>
              {radioStations.map((station) => (
                <button
                  key={station.freq}
                  className={`${styles.stationBtn} ${currentStation?.freq === station.freq ? styles.active : ''}`}
                  onClick={() => tuneToStation(station)}
                  disabled={isTuning}
                >
                  {station.freq}
                </button>
              ))}
            </div>

            {/* Control Knobs */}
            <div className={styles.controlKnobs}>
              <div className={styles.knobGroup}>
                <label>ANTENNA (Gender)</label>
                <select 
                  value={userGender} 
                  onChange={(e) => setUserGender(e.target.value)}
                  className={styles.antennaSelect}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                </select>
              </div>

              <div className={styles.knobGroup}>
                <label>VOLUME (Style Intensity)</label>
                <input
                  type="range"
                  min="5"
                  max="35"
                  value={styleStrength}
                  onChange={(e) => setStyleStrength(Number(e.target.value))}
                  className={styles.volumeSlider}
                />
                <span>{styleStrength}%</span>
              </div>
            </div>

            {/* Generate Button */}
            <div className={styles.generateSection}>
              <button
                onClick={handleGenerate}
                className={styles.generateButton}
                disabled={!photo || !selectedStyle || !userGender}
              >
                🎵 RECORD 90s YEARBOOK PHOTO 🎵
              </button>
            </div>

            {/* Current Selection Display */}
            {currentStation && (
              <div className={styles.selectionDisplay}>
                <h3>Now Playing:</h3>
                <p><strong>{currentStation.name}</strong> - {currentStation.tagline}</p>
                <p>Style: <strong>{selectedStyle}</strong></p>
                <p>Gender: <strong>{userGender || 'Not set'}</strong></p>
                <p>Intensity: <strong>{styleStrength}%</strong></p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}