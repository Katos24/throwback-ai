import { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/router";
import imageCompression from "browser-image-compression";
import { supabase } from "../lib/supabaseClient";
import useCredits from "../hooks/useCredits";
import toast from 'react-hot-toast';

/**
 * Custom hook for shared restore page logic
 * Used by both RestoreBasic and RestorePremium pages
 */
export default function useRestoreLogic(restoreCost, apiEndpoint, isPremium = false) {
  const router = useRouter();
  
  // State management
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPreviewUrl, setSelectedPreviewUrl] = useState(null);
  const [restoredUrl, setRestoredUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [session, setSession] = useState(null);
  const [progressStatus, setProgressStatus] = useState("idle");
  const [progressPercent, setProgressPercent] = useState(null);
  
  // UI state
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const [showScrollNotice, setShowScrollNotice] = useState(false);
  
  // Hooks
  const { credits, isLoggedIn, refreshCredits, deductCredits } = useCredits();
  
  // Refs
  const fileInputRef = useRef(null);

  // Helper function to scroll to photo on mobile
  const scrollToPhotoOnMobile = () => {
    if (window.innerWidth <= 768) {
      const selectors = [
        '[class*="uploadCard"]',
        '[class*="uploadSection"]',
        '[class*="mainContent"]'
      ];
      
      for (const selector of selectors) {
        const element = document.querySelector(selector);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          break;
        }
      }
    }
  };

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

  useEffect(() => {
    if (showScrollNotice) {
      const timer = setTimeout(() => setShowScrollNotice(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [showScrollNotice]);

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

  // File selection with compression
  const handleFileSelection = async (file) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file (PNG, JPG, HEIC)', {
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
    
    setError('');
    setProgressStatus("compressing");
    setProcessing(true);
    setRestoredUrl("");
    
    const compressionToast = toast.loading(
      isPremium ? 'Optimizing for premium AI restoration...' : 'Compressing image...',
      { icon: isPremium ? '🎨' : '⚡' }
    );
    
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
        preserveExif: isPremium
      });
      setSelectedFile(compressed);
      setSelectedPreviewUrl(URL.createObjectURL(compressed));
      
      toast.success(
        isPremium ? 'Image ready for premium restoration!' : 'Image ready for restoration!',
        { id: compressionToast, icon: isPremium ? '🌈' : '✅', duration: 2000 }
      );
    } catch (compressionError) {
      console.warn('Compression failed, using original file:', compressionError);
      setSelectedFile(file);
      setSelectedPreviewUrl(URL.createObjectURL(file));
      
      toast.success(
        isPremium ? 'Image ready for premium restoration!' : 'Image ready for restoration!',
        { id: compressionToast, icon: isPremium ? '🌈' : '✅', duration: 2000 }
      );
    } finally {
      setProcessing(false);
      setProgressStatus("idle");
      setProgressPercent(null);
    }
  };

  // Restore function
  const handleRestore = async () => {
    setLoading(true);
    setProgressStatus(isPremium ? "Uploading your image..." : "uploading");
    setProgressPercent(0);
    setError('');
    
    scrollToPhotoOnMobile();
    
    const processingToast = toast.loading(
      isPremium 
        ? 'Premium AI is restoring and colorizing your photo...'
        : 'Restoring your photo with AI magic...',
      { icon: isPremium ? '🎨' : '✨' }
    );
    
    const headers = { "Content-Type": "application/json" };
    if (session?.access_token) {
      headers.Authorization = `Bearer ${session.access_token}`;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];
      try {
        let progress = 0;
        const progressSpeed = isPremium ? 400 : 300;
        const progressIncrement = isPremium ? 8 : 10;
        const maxProgress = isPremium ? 85 : 90;
        
        const interval = setInterval(() => {
          progress += progressIncrement;
          if (progress > maxProgress) {
            clearInterval(interval);
            if (isPremium) {
              setProgressStatus("AI is analyzing and colorizing your photo...");
            }
          } else {
            setProgressPercent(progress);
          }
        }, progressSpeed);

        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers,
          body: JSON.stringify({ 
            imageBase64: base64, 
            prompt: isPremium 
              ? "Restore and colorize this vintage photo with premium AI for stunning results"
              : "Restore this vintage photo"
          }),
        });

        clearInterval(interval);
        setProgressPercent(100);
        setProgressStatus(isPremium ? "Adding finishing touches..." : "processing");
        
        const data = await response.json();
        if (response.ok && data.imageUrl) {
          setRestoredUrl(data.imageUrl);
          setShowScrollNotice(true);
          setProgressStatus("complete");
          
          toast.success(
            isPremium 
              ? 'Premium restoration complete! Stunning results achieved!'
              : 'Photo restoration complete!',
            { id: processingToast, icon: isPremium ? '🌈' : '🎉', duration: 5000 }
          );
          
          // Show upgrade suggestion for basic restore
          if (!isPremium) {
            setTimeout(() => {
              toast((t) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.5rem' }}>🎨</span>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                      Want even better results?
                    </div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                      Try Full Color Restore for vibrant colors!
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      toast.dismiss(t.id);
                      router.push('/replicate/restore-premium');
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}
                  >
                    Try It ✨
                  </button>
                </div>
              ), {
                duration: 8000,
                style: { maxWidth: '400px' }
              });
            }, 2000);
          }
          
          await refreshCredits();
        } else {
          toast.error(
            data.error || `${isPremium ? 'Premium r' : 'R'}estoration failed. Please try again.`,
            { id: processingToast, icon: '❌', duration: 5000 }
          );
          setProgressStatus("idle");
          setProgressPercent(null);
        }
      } catch (networkError) {
        console.error('Network/server error:', networkError);
        toast.error("Network error. Please check your connection and try again.", {
          id: processingToast,
          icon: '🌐',
          duration: 5000,
        });
        setProgressStatus("idle");
        setProgressPercent(null);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  // Button handlers
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
    if (credits < restoreCost) {
      router.push('/pricing');
      return;
    }
    handleRestore();
  };

  const getButtonText = () => {
    if (loading || processing) {
      if (processing) return "Optimizing image...";
      return isPremium ? "Premium restoring..." : "Restoring...";
    }
    if (!selectedFile) return "Upload a Photo First";
    if (!isLoggedIn) return "Sign Up to Restore";
    if (credits < restoreCost) return "Get More Credits";
    return isPremium ? "Premium Restore" : "Restore Photo";
  };

  const getButtonEmoji = () => {
    if (loading || processing) return null;
    if (!selectedFile) return "📷";
    if (!isLoggedIn) return "🔒";
    if (credits < restoreCost) return isPremium ? "💎" : "💳";
    return isPremium ? "🌈" : "✨";
  };

  // Download function
  const handleDownload = async () => {
    if (!restoredUrl) return;
    
    const downloadToast = toast.loading(
      isPremium ? 'Preparing premium download...' : 'Preparing download...',
      { icon: '⬇️' }
    );
    
    try {
      const resp = await fetch(restoredUrl);
      const blob = await resp.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = isPremium 
        ? `premium-restored-${Date.now()}.png`
        : "restored-photo.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success(
        isPremium ? 'Premium restoration downloaded!' : 'Photo downloaded successfully!',
        { id: downloadToast, icon: isPremium ? '🎨' : '📥', duration: 3000 }
      );
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
    setShowScrollNotice(false);
    setError('');
    setProgressStatus("idle");
    setProgressPercent(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    toast.success(
      isPremium ? 'Ready for a new premium restoration!' : 'Ready for a new photo!',
      { icon: '🔄', duration: 2000 }
    );
  };

  const isComplete = selectedFile && isLoggedIn && credits >= restoreCost;

  return {
    // State
    selectedFile,
    selectedPreviewUrl,
    restoredUrl,
    loading,
    processing,
    session,
    progressStatus,
    progressPercent,
    dragActive,
    error,
    showScrollNotice,
    credits,
    isLoggedIn,
    isComplete,
    
    // Handlers
    handleDrag,
    handleDrop,
    handleFileInput,
    handleGenerateOrRedirect,
    handleDownload,
    handleReset,
    getButtonText,
    getButtonEmoji,
    
    // Refs
    fileInputRef,
    
    // Router
    router,
    
    // Credits
    refreshCredits,
    deductCredits
  };
}