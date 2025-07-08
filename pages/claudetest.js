import React, { useState, useRef } from 'react';

const ThrowbackAI = () => {
  const [selectedStyle, setSelectedStyle] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultImage, setResultImage] = useState(null);
  const fileInputRef = useRef(null);

  const styles = [
    {
      id: 'retro80s',
      name: '80s Neon',
      emoji: '🌆',
      desc: 'Miami Vice vibes with neon colors'
    },
    {
      id: 'vintage70s',
      name: '70s Groovy',
      emoji: '🕺',
      desc: 'Disco fever with warm tones'
    },
    {
      id: 'grunge90s',
      name: '90s Grunge',
      emoji: '🎸',
      desc: 'Raw, edgy alternative style'
    },
    {
      id: 'polaroid',
      name: 'Polaroid',
      emoji: '📸',
      desc: 'Instant camera nostalgia'
    },
    {
      id: 'vhs',
      name: 'VHS Glitch',
      emoji: '📼',
      desc: 'Retro video tape aesthetic'
    },
    {
      id: 'arcade',
      name: 'Arcade',
      emoji: '🕹️',
      desc: '8-bit pixel art transformation'
    }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcess = async () => {
    if (!uploadedImage || !selectedStyle) return;
    
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate processing with progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setResultImage(uploadedImage); // In real app, this would be the processed image
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleDownload = () => {
    // In real app, this would download the processed image
    console.log('Downloading processed image...');
  };

  const handleRandomStyle = () => {
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    setSelectedStyle(randomStyle.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-pink-500 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-cyan-500 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute bottom-32 left-40 w-40 h-40 bg-yellow-500 rounded-full blur-xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mb-4 transform hover:scale-105 transition-transform duration-300">
            THROWBACK AI
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-bold tracking-wider">
            ✨ TOTALLY RADICAL IMAGE TRANSFORMATION ✨
          </p>
          <div className="mt-4 flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-2xl text-yellow-400 animate-pulse" style={{animationDelay: `${i * 0.2}s`}}>⭐</span>
            ))}
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8 border-2 border-cyan-400/30 shadow-2xl">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-4 border-dashed border-cyan-400 rounded-2xl p-12 text-center cursor-pointer hover:bg-white/5 transition-all duration-300 group"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="group-hover:scale-110 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto mb-4 text-cyan-400 text-6xl">📤</div>
              <p className="text-2xl font-bold text-white mb-2">
                {uploadedImage ? '✅ Image Uploaded!' : 'DROP YOUR IMAGE HERE'}
              </p>
              <p className="text-white/60">
                {uploadedImage ? 'Click to change image' : 'or click to browse'}
              </p>
            </div>
          </div>
          
          {uploadedImage && (
            <div className="mt-6 flex justify-center">
              <img 
                src={uploadedImage} 
                alt="Uploaded" 
                className="max-w-xs max-h-48 rounded-xl shadow-lg border-2 border-pink-400"
              />
            </div>
          )}
        </div>

        {/* Style Selection */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">Choose Your Vibe</h2>
            <button
              onClick={handleRandomStyle}
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              <span className="text-xl mr-2">✨</span>
              Random Style
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {styles.map((style) => (
              <div
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedStyle === style.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 shadow-2xl border-2 border-cyan-400'
                    : 'bg-white/10 backdrop-blur-lg hover:bg-white/20'
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{style.emoji}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{style.name}</h3>
                  <p className="text-white/70 text-sm">{style.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={handleProcess}
            disabled={!uploadedImage || !selectedStyle || isProcessing}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full text-lg shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300"
          >
            <span className="text-xl mr-2">⚡</span>
            {isProcessing ? 'Processing...' : 'Make It Rad!'}
          </button>
          
          <button
            onClick={() => {setUploadedImage(null); setResultImage(null); setSelectedStyle(''); setProgress(0);}}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all duration-300"
          >
            <span className="text-xl mr-2">📷</span>
            New Image
          </button>
          
          {resultImage && (
            <button
              onClick={handleDownload}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-all duration-300"
            >
              <span className="text-xl mr-2">⬇️</span>
              Download
            </button>
          )}
        </div>

        {/* Progress Bar */}
        {isProcessing && (
          <div className="mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-bold">Processing Your Rad Image...</span>
                <span className="text-cyan-400 font-bold">{progress}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-cyan-500 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Result */}
        {resultImage && (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-green-400/30 shadow-2xl">
            <h3 className="text-3xl font-bold text-white text-center mb-6">
              🎉 Your Rad Transformation! 🎉
            </h3>
            <div className="flex justify-center">
              <img 
                src={resultImage} 
                alt="Processed" 
                className="max-w-md max-h-96 rounded-xl shadow-lg border-2 border-green-400"
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-white/60">
          <p className="text-lg">
            Made with <span className="text-pink-400 text-xl">💖</span> and 90s nostalgia
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThrowbackAI;