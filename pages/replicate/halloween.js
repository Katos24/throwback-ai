// pages/replicate/halloween.js

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/router";
import imageCompression from "browser-image-compression";
import { supabase } from "../../lib/supabaseClient";
import useCredits from "../../hooks/useCredits";
import styles from "../../styles/HalloweenPage.module.css";
import toast from 'react-hot-toast';

const HALLOWEEN_COST = 50;

export default function HalloweenPage() {
  const router = useRouter();
  
  // State management
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPreviewUrl, setSelectedPreviewUrl] = useState(null);
  const [restoredUrl, setRestoredUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [session, setSession] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressStage, setProgressStage] = useState("");
  
  // UI state
  const [dragActive, setDragActive] = useState(false);
  const [showingOriginal, setShowingOriginal] = useState(false);
  
  // Hooks
  const { credits, isLoggedIn, refreshCredits } = useCredits();
  
  // Refs
  const fileInputRef = useRef(null);

  // Effects
  useEffect(() => {
    async function getSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    }
    getSession();
  }, []);

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelection(files[0]);
    }
  };

  // File selection
  const handleFileSelection = async (file) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file (PNG, JPG)', {
        icon: '🖼️',
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
    
    setProcessing(true);
    setRestoredUrl("");
    
    const compressionToast = toast.loading('Optimizing your photo...', {
      icon: '🎃',
    });
    
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
        preserveExif: true
      });
      setSelectedFile(compressed);
      setSelectedPreviewUrl(URL.createObjectURL(compressed));
      
      toast.success('Image ready for face swap!', {
        id: compressionToast,
        icon: '👻',
        duration: 2000,
      });
    } catch (compressionError) {
      console.warn('Compression failed, using original file:', compressionError);
      setSelectedFile(file);
      setSelectedPreviewUrl(URL.createObjectURL(file));
      
      toast.success('Image ready for face swap!', {
        id: compressionToast,
        icon: '👻',
        duration: 2000,
      });
    } finally {
      setProcessing(false);
    }
  };

  // Handle button clicks based on user state
  const handleGenerateOrRedirect = () => {
    if (!selectedFile) {
      toast.error('Please upload an image first', {
        icon: '📤',
        duration: 3000,
      });
      return;
    }
    if (!isLoggedIn) {
      router.push('/signup');
      return;
    }
    if (credits < HALLOWEEN_COST) {
      router.push('/pricing');
      return;
    }
    handleFaceSwap();
  };

  // Button text helper
  const getButtonText = () => {
    if (loading || processing) {
      if (processing) return "Optimizing image...";
      return "Swapping faces...";
    }
    if (!selectedFile) return "Upload a Photo First";
    if (!isLoggedIn) return "Sign Up to Start";
    if (credits < HALLOWEEN_COST) return `Get Credits (Need ${HALLOWEEN_COST})`;
    return `🎃 SWAP FACE - ${HALLOWEEN_COST} CREDITS`;
  };

  // Face swap function
  const handleFaceSwap = async () => {
    setLoading(true);
    setProgressPercent(0);
    setProgressStage("Uploading your photo...");
    
    const processingToast = toast.loading('Swapping your face into the Ghostface scene...', {
      icon: '👻',
    });
    
    const headers = { "Content-Type": "application/json" };
    if (session?.access_token) {
      headers.Authorization = `Bearer ${session.access_token}`;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];
      try {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          if (progress > 85) {
            clearInterval(interval);
            setProgressStage("Finalizing your spooky transformation...");
          } else {
            setProgressPercent(progress);
            if (progress < 40) setProgressStage("Uploading to face swap...");
            else if (progress < 70) setProgressStage("Swapping faces...");
          }
        }, 400);

        const response = await fetch("/api/replicate/generate-faceswap", {
          method: "POST",
          headers,
          body: JSON.stringify({ 
            imageBase64: base64
          }),
        });

        clearInterval(interval);
        setProgressPercent(100);
        setProgressStage("Complete! 🎃");
        
        const data = await response.json();
        if (response.ok && data.imageUrl) {
          setRestoredUrl(data.imageUrl);
          
          toast.success('Face swap complete! You look spooky!', {
            id: processingToast,
            icon: '🎃',
            duration: 5000,
          });
          
          // Only refresh credits to sync with server (server already deducted)
          await refreshCredits();
        } else {
          toast.error(data.error || "Face swap failed. Please try again.", {
            id: processingToast,
            icon: '❌',
            duration: 5000,
          });
        }
      } catch (networkError) {
        console.error('Network/server error:', networkError);
        toast.error("Network error. Please check your connection and try again.", {
          id: processingToast,
          icon: '🌐',
          duration: 5000,
        });
      } finally {
        setLoading(false);
        setTimeout(() => {
          setProgressPercent(0);
          setProgressStage("");
        }, 1000);
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  // Download function
  const handleDownload = async () => {
    if (!restoredUrl) return;
    
    const downloadToast = toast.loading('Preparing download...', {
      icon: '⬇️',
    });
    
    try {
      const resp = await fetch(restoredUrl);
      const blob = await resp.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ghostface-halloween-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('Downloaded!', {
        id: downloadToast,
        icon: '🎃',
        duration: 3000,
      });
    } catch (downloadError) {
      console.error('Download failed:', downloadError);
      toast.error('Download failed. Please try again.', {
        id: downloadToast,
        icon: '❌',
        duration: 4000,
      });
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setSelectedPreviewUrl(null);
    setRestoredUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    toast.success('Ready for a new face swap!', {
      icon: '🔄',
      duration: 2000,
    });
  };

  return (
    <main className={styles.container}>
      {/* Spooky Background Effects */}
      <div className={styles.halloweenBg}></div>
      
      {/* Floating Pumpkins with Glow */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}>
        {['🎃', '👻', '🦇', '🕷️', '🎃', '👻'].map((emoji, index) => (
          <div 
            key={index}
            style={{
              position: 'absolute',
              fontSize: '40px',
              left: `${10 + index * 15}%`,
              animation: `float${index % 3} ${8 + index}s ease-in-out infinite`,
              animationDelay: `${index * 0.7}s`,
              filter: emoji === '🎃' ? 'drop-shadow(0 0 10px rgba(255, 107, 0, 0.8)) drop-shadow(0 0 20px rgba(255, 107, 0, 0.5))' : 'none',
              opacity: 0.6
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes float0 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-40px) rotate(-5deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-35px) rotate(3deg); }
        }
      `}</style>

      {/* Credits Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 30px',
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '12px',
        marginBottom: '30px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '18px',
          color: 'white'
        }}>
          <span style={{ fontSize: '24px' }}>👻</span>
          <span>Credits: <strong style={{ color: '#ff8c00' }}>{credits || 0}</strong></span>
        </div>
        <button 
          onClick={() => router.push(isLoggedIn ? "/pricing" : "/signup")}
          style={{
            background: 'linear-gradient(135deg, #ff6b00, #ff4400)',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          {isLoggedIn ? "Get More Credits" : "Sign Up"}
        </button>
      </div>

      {/* Hero Section */}
      <section style={{ textAlign: 'center', marginBottom: '40px', padding: '0 10px' }}>
        <h1 style={{ 
          fontSize: 'clamp(24px, 6vw, 48px)', 
          fontWeight: 'bold', 
          marginBottom: '15px',
          color: '#fff',
          textShadow: '0 0 20px rgba(255, 107, 0, 0.8), 0 0 40px rgba(255, 107, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(5px, 2vw, 15px)',
          flexWrap: 'wrap',
          lineHeight: 1.2
        }}>
          <span style={{ 
            fontSize: 'clamp(28px, 6vw, 50px)',
            filter: 'drop-shadow(0 0 15px rgba(255, 107, 0, 0.9)) drop-shadow(0 0 30px rgba(255, 107, 0, 0.6))',
            display: 'inline-block'
          }}>🎃</span>
          <span style={{ display: 'inline-block' }}>GHOSTFACE HALLOWEEN</span>
          <span style={{ 
            fontSize: 'clamp(28px, 6vw, 50px)',
            filter: 'drop-shadow(0 0 15px rgba(255, 107, 0, 0.9)) drop-shadow(0 0 30px rgba(255, 107, 0, 0.6))',
            display: 'inline-block'
          }}>🎃</span>
        </h1>
        <p style={{ fontSize: 'clamp(16px, 4vw, 18px)', color: '#ccc', marginBottom: '15px', padding: '0 20px' }}>
          Swap your face into the viral Ghostface scene
        </p>
        <div style={{
          display: 'inline-block',
          background: 'rgba(255, 107, 0, 0.2)',
          border: '2px solid #ff6b00',
          padding: '8px 20px',
          borderRadius: '25px',
          color: '#ff8c00',
          fontWeight: 'bold',
          fontSize: 'clamp(14px, 3.5vw, 16px)'
        }}>
          ⚡ {HALLOWEEN_COST} Credits per swap
        </div>
      </section>

      {/* Main Grid: Example (Left) + Upload (Right) - Desktop Side-by-Side */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto 30px',
        padding: '0 20px',
        width: '100%'
      }}>
        {/* LEFT: Example Image - Shows first on mobile (order 1) */}
        <div style={{ order: 1, width: '100%', maxWidth: '100%' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center',
            color: 'white'
          }}>
            <span>👻</span> EXAMPLE RESULT
          </h2>
          <div style={{
            minHeight: '300px',
            maxHeight: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '12px',
            border: '2px solid rgba(255, 107, 0, 0.4)',
            overflow: 'hidden'
          }}>
            <img 
              src="/images/ghostface-template-example.jpg"
              alt="Ghostface Halloween Example"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '8px'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `
                  <div style="text-align: center; padding: 40px; color: #999;">
                    <div style="font-size: 60px; margin-bottom: 20px; opacity: 0.3;">🎃</div>
                    <div style="font-size: 18px;">Example Image</div>
                    <div style="font-size: 14px; margin-top: 10px;">ghostface-template-example.jpg</div>
                  </div>
                `;
              }}
            />
          </div>
        </div>

        {/* RIGHT: Upload/Result Box - Order 2 on mobile */}
        <div style={{ order: 2, width: '100%', maxWidth: '100%' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center',
            color: 'white'
          }}>
            <span>{restoredUrl ? '🎃' : '📸'}</span> {restoredUrl ? 'YOUR RESULT' : 'UPLOAD YOUR PHOTO'}
          </h2>
          <div 
            onClick={() => !restoredUrl && !selectedPreviewUrl && fileInputRef.current?.click()}
            onDragEnter={!restoredUrl ? handleDrag : undefined}
            onDragLeave={!restoredUrl ? handleDrag : undefined}
            onDragOver={!restoredUrl ? handleDrag : undefined}
            onDrop={!restoredUrl ? handleDrop : undefined}
            style={{
              minHeight: '450px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '12px',
              border: restoredUrl ? '2px solid #ff6b00' : '2px dashed rgba(255, 255, 255, 0.3)',
              cursor: (!restoredUrl && !selectedPreviewUrl) ? 'pointer' : 'default',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              disabled={loading || processing}
              style={{ display: 'none' }}
            />
            
            {restoredUrl ? (
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
                  <img 
                    src={showingOriginal ? selectedPreviewUrl : restoredUrl}
                    alt="Result" 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'contain',
                      borderRadius: '8px'
                    }}
                  />
                </div>
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  padding: '0 10px 10px'
                }}>
                  <button 
                    onClick={() => setShowingOriginal(!showingOriginal)}
                    style={{
                      background: 'rgba(0, 0, 0, 0.85)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    👁️ {showingOriginal ? 'Show Result' : 'Show Original'}
                  </button>
                  <button 
                    onClick={handleDownload}
                    style={{
                      background: 'linear-gradient(135deg, #ff6b00, #ff4400)',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}
                  >
                    ⬇️ Download
                  </button>
                </div>
              </div>
            ) : selectedPreviewUrl ? (
              <div style={{ position: 'relative', width: '100%', height: '100%', padding: '10px' }}>
                <img 
                  src={selectedPreviewUrl}
                  alt="Preview" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain',
                    borderRadius: '8px'
                  }}
                />
                {loading && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.85)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px'
                  }}>
                    <div style={{ 
                      width: '80%', 
                      height: '8px', 
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      marginBottom: '15px'
                    }}>
                      <div style={{
                        width: `${progressPercent}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #ff6b00, #ff8c00)',
                        transition: 'width 0.3s ease'
                      }}></div>
                    </div>
                    <div style={{ color: '#fff', fontSize: '14px', textAlign: 'center' }}>
                      {progressStage}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ fontSize: '60px', marginBottom: '20px', opacity: 0.5 }}>📤</div>
                <div style={{ fontSize: '18px', color: '#ccc', marginBottom: '10px', fontWeight: '500' }}>
                  Drag & Drop or Click to Upload
                </div>
                <div style={{ fontSize: '14px', color: '#888' }}>
                  PNG, JPG up to 10MB
                </div>
              </div>
            )}
            
            {dragActive && !restoredUrl && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(255, 107, 0, 0.15)',
                border: '3px dashed #ff6b00',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                fontWeight: 'bold',
                color: '#ff6b00'
              }}>
                Drop to upload!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Action Button - Order 2 on mobile (between upload and example) */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
        margin: '0 auto 40px',
        maxWidth: '600px',
        padding: '0 20px',
        order: 2
      }}>
        <button
          onClick={handleGenerateOrRedirect}
          disabled={loading || processing}
          style={{
            background: (loading || processing) ? '#666' : 'linear-gradient(135deg, #ff6b00, #ff4400)',
            border: 'none',
            padding: '18px 60px',
            borderRadius: '12px',
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
            cursor: (loading || processing) ? 'not-allowed' : 'pointer',
            boxShadow: (loading || processing) ? 'none' : '0 8px 30px rgba(255, 107, 0, 0.4)',
            transition: 'all 0.3s ease',
            opacity: (loading || processing) ? 0.7 : 1,
            width: '100%',
            maxWidth: '500px'
          }}
        >
          {getButtonText()}
        </button>
        {(selectedFile || restoredUrl) && (
          <button
            onClick={handleReset}
            disabled={loading || processing}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '12px 24px',
              borderRadius: '8px',
              color: 'white',
              cursor: (loading || processing) ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              transition: 'all 0.3s ease'
            }}
          >
            🔄 Reset
          </button>
        )}
      </section>

      {/* Mobile-specific CSS to reorder on small screens */}
      <style jsx>{`
        @media (max-width: 768px) {
          section > div:nth-child(1) { order: 1; }  /* Upload */
          section + section { order: 2; }            /* Button */
          section > div:nth-child(2) { order: 3; }  /* Example */
        }
      `}</style>

      {/* Explore More Features Section */}
      <section style={{
        maxWidth: '1200px',
        margin: '60px auto 40px',
        padding: '0 20px',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 36px)',
            fontWeight: 'bold',
            marginBottom: '15px',
            color: '#fff'
          }}>
            Explore More AI Photo Magic
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#ccc',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Try our other powerful AI photo transformation tools
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '25px'
        }}>
          {/* Decades Feature */}
          <div 
            onClick={() => router.push('/decades')}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '2px solid rgba(138, 43, 226, 0.4)',
              borderRadius: '16px',
              padding: '30px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.borderColor = 'rgba(138, 43, 226, 0.8)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(138, 43, 226, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(138, 43, 226, 0.4)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              fontSize: '50px',
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              📸
            </div>
            <h3 style={{
              fontSize: '22px',
              fontWeight: 'bold',
              marginBottom: '10px',
              color: '#fff',
              textAlign: 'center'
            }}>
              Decades Time Travel
            </h3>
            <p style={{
              color: '#ccc',
              fontSize: '15px',
              lineHeight: 1.6,
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              Transform your selfies into authentic 70s, 80s, 90s, or 2000s photos. Perfect for viral social content!
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '20px'
            }}>
              <span style={{
                color: '#8a2be2',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                50 credits
              </span>
              <span style={{
                background: 'rgba(138, 43, 226, 0.2)',
                color: '#8a2be2',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                🔥 Trending
              </span>
            </div>
          </div>

          {/* Colorization Feature */}
          <div 
            onClick={() => router.push('/replicate/restore-premium')}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '2px solid rgba(0, 212, 255, 0.4)',
              borderRadius: '16px',
              padding: '30px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.8)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.4)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              fontSize: '50px',
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              🎨
            </div>
            <h3 style={{
              fontSize: '22px',
              fontWeight: 'bold',
              marginBottom: '10px',
              color: '#fff',
              textAlign: 'center'
            }}>
              Premium Colorization
            </h3>
            <p style={{
              color: '#ccc',
              fontSize: '15px',
              lineHeight: 1.6,
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              Transform black & white family photos with museum-quality, historically accurate colorization.
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '20px'
            }}>
              <span style={{
                color: '#00d4ff',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                40 credits
              </span>
              <span style={{
                background: 'rgba(0, 212, 255, 0.2)',
                color: '#00d4ff',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                Premium
              </span>
            </div>
          </div>

          {/* Restoration Feature */}
          <div 
            onClick={() => router.push('/replicate/restore-basic')}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '2px solid rgba(34, 197, 94, 0.4)',
              borderRadius: '16px',
              padding: '30px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.8)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(34, 197, 94, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.4)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              fontSize: '50px',
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              🔧
            </div>
            <h3 style={{
              fontSize: '22px',
              fontWeight: 'bold',
              marginBottom: '10px',
              color: '#fff',
              textAlign: 'center'
            }}>
              Photo Restoration
            </h3>
            <p style={{
              color: '#ccc',
              fontSize: '15px',
              lineHeight: 1.6,
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              Repair scratches, tears, water damage, and fading from irreplaceable vintage family photos.
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '20px'
            }}>
              <span style={{
                color: '#22c55e',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                1 credit
              </span>
              <span style={{
                background: 'rgba(34, 197, 94, 0.2)',
                color: '#22c55e',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                ⚡ Fast
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}