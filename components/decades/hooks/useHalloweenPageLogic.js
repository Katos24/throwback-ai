import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabaseClient";
import useCredits from "../../../hooks/useCredits";


export function useHalloweenPageLogic(avatarCost = 50) {
  const router = useRouter();

  // Photo state
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const [showingOriginal, setShowingOriginal] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Auth state
  const [session, setSession] = useState(null);

  // Template selection
  const [selectedTemplate, setSelectedTemplate] = useState("");

  // Credits
  const { credits, isLoggedIn, refreshCredits } = useCredits();

  // Gender auto-detection
  const [userGender, setUserGender] = useState("a man"); // default

  // Load session
  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    }
    getSession();
  }, []);

  // Scroll to photo section on mobile
  const scrollToPhotoOnMobile = useCallback((selectors) => {
    let target = null;
    for (const selector of selectors) {
      target = document.querySelector(selector);
      if (target) break;
    }
    if (target && window.innerWidth <= 768) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  // Load face-api models
  const loadModels = useCallback(async () => {
    const MODEL_URL = "/models";
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL);
  }, []);

  // Detect gender from uploaded photo
  const detectGender = useCallback(async (imageFile) => {
    try {
      await loadModels();
      const img = await faceapi.bufferToImage(imageFile);
      const detection = await faceapi
        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
        .withGender();
      if (!detection) return "a man"; // fallback
      return detection.gender === "male" ? "a man" : "a woman";
    } catch (err) {
      console.warn("Gender detection failed, defaulting to male.", err);
      return "a man";
    }
  }, [loadModels]);

  // Handle file upload
  const handleFileProcessing = useCallback(async (file) => {
    if (file && file.type.startsWith("image/")) {
      setPhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultImageUrl(null);
      setShowingOriginal(false);

      // Auto-gender detection
      const detectedGender = await detectGender(file);
      setUserGender(detectedGender);

      // Set default template if none selected
      if (!selectedTemplate) {
        setSelectedTemplate("ghostface-phone");
      }
    }
  }, [detectGender, selectedTemplate]);

  // Drag and drop
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

  // Download result
  const handleDownload = useCallback(async () => {
    if (!resultImageUrl) return;
    try {
      const response = await fetch(resultImageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `halloween-face-swap-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  }, [resultImageUrl]);

  // Completion check
  const isComplete = photo && selectedTemplate && isLoggedIn && credits >= avatarCost;

  return {
    photo,
    setPhoto,
    previewUrl,
    setPreviewUrl,
    resultImageUrl,
    setResultImageUrl,
    showingOriginal,
    setShowingOriginal,
    selectedTemplate,
    setSelectedTemplate,
    isDragOver,
    session,
    credits,
    isLoggedIn,
    refreshCredits,
    router,
    userGender,

    // Handlers
    handleFileProcessing,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleDownload,
    scrollToPhotoOnMobile,

    // Computed
    isComplete,
    avatarCost
  };
}
