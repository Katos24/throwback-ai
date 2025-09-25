// components/decades/hooks/useDecadePageLogic.js
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabaseClient";
import useCredits from "../../../hooks/useCredits";

export function useDecadePageLogic(decade, avatarCost = 50) {
  const router = useRouter();
  
  // Photo state
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const [showingOriginal, setShowingOriginal] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Auth state
  const [session, setSession] = useState(null);

  // Configuration state
  const [userGender, setUserGender] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [styleStrength, setStyleStrength] = useState(20);
  const [workflowType, setWorkflowType] = useState("HyperRealistic-likeness");

  // UI state
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  // Credits
  const { credits, isLoggedIn, refreshCredits } = useCredits();

  // Initialize session
  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    }
    getSession();
  }, []);

  // Mobile scroll functionality
  const scrollToPhotoOnMobile = useCallback((selectors) => {
    let photoSection = null;
    
    for (const selector of selectors) {
      photoSection = document.querySelector(selector);
      if (photoSection) break;
    }
    
    if (photoSection && window.innerWidth <= 768) {
      photoSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }, []);

  // Handle file processing
  const handleFileProcessing = useCallback((file) => {
    if (file && file.type.startsWith('image/')) {
      setPhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultImageUrl(null);
      setShowingOriginal(false);
    }
  }, []);

  // Drag and drop handlers
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileProcessing(files[0]);
    }
  }, [handleFileProcessing]);

  // Enhanced download handler
  const handleDownload = useCallback(async () => {
    if (!resultImageUrl) return;
    
    try {
      const response = await fetch(resultImageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = `${decade}-yearbook-photo-${Date.now()}.png`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Download failed:', error);
    }
  }, [resultImageUrl, decade]);

  // Photo upload callback
  const handlePhotoUploadCallback = useCallback(() => {
    // Auto-expand gender section after photo upload for better UX
  }, []);

  // Advanced settings toggle
  const toggleAdvancedSettings = useCallback(() => {
    setShowAdvancedSettings(prev => !prev);
  }, []);

  // Check if all requirements are met
  const isComplete = photo && userGender && selectedStyle && isLoggedIn && credits >= avatarCost;

  return {
    // State
    photo,
    setPhoto,
    previewUrl,
    setPreviewUrl,
    resultImageUrl,
    setResultImageUrl,
    showingOriginal,
    setShowingOriginal,
    isDragOver,
    session,
    userGender,
    setUserGender,
    selectedStyle,
    setSelectedStyle,
    styleStrength,
    setStyleStrength,
    workflowType,
    setWorkflowType,
    showAdvancedSettings,
    credits,
    isLoggedIn,
    refreshCredits,
    router,
    
    // Handlers
    handleFileProcessing,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleDownload,
    handlePhotoUploadCallback,
    toggleAdvancedSettings,
    scrollToPhotoOnMobile,
    
    // Computed
    isComplete,
    avatarCost
  };
}