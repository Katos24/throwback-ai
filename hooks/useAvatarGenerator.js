import { useState } from 'react';
import { useRouter } from 'next/router';
import imageCompression from 'browser-image-compression';
import { supabase } from "../lib/supabaseClient";
import toast from 'react-hot-toast';

export const useAvatarGenerator = (refreshCredits) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStage, setProgressStage] = useState("");
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const [showingOriginal, setShowingOriginal] = useState(false);

  const generateAvatar = async (photo, userGender, selectedStyle, isMobile) => {
    setResultImageUrl(null);
    setIsLoading(true);
    setProgress(0);
    setProgressStage("Preparing your image...");

    if (isMobile) {
      const photoSection = document.getElementById('photo-section');
      if (photoSection) photoSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    const processingToast = toast.loading('Creating your AI avatar...', { icon: '🎭' });

    try {
      const { data: { session: freshSession } } = await supabase.auth.getSession();
      if (!freshSession) throw new Error("Please log in again to continue");

      const headers = { "Content-Type": "application/json" };
      if (freshSession?.access_token) headers.Authorization = `Bearer ${freshSession.access_token}`;

      const compressedFile = await imageCompression(photo, {
        maxSizeMB: 1.0,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
        maxIteration: 10,
        initialQuality: 0.8,
      });

      setProgress(25);
      setProgressStage("Compressing image...");

      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.readAsDataURL(compressedFile);
      });

      setProgress(50);
      setProgressStage("Sending to AI...");

      const genderForPrompt = userGender === "non_binary" ? "person" : userGender;
      const prompt = `${genderForPrompt} ${selectedStyle}, IMPORTANT: preserve exact facial features, skin tone, ethnicity, and bone structure`;

      const response = await fetch("/api/replicate/aiAvatars", {
        method: "POST",
        headers,
        body: JSON.stringify({
          imageBase64: base64,
          prompt: prompt,
          styleStrength: 20,
          user_gender: userGender,
          workflow_type: "HyperRealistic-likeness"
        }),
      });

      setProgress(80);
      setProgressStage("Generating avatar...");

      if (!response.ok) throw new Error(`Failed to generate avatar: ${response.status}`);

      const data = await response.json();
      
      if (data.imageUrl) {
        setProgress(100);
        setProgressStage("Complete!");
        setResultImageUrl(data.imageUrl);
        toast.success('Avatar generation complete!', { id: processingToast, icon: '🎭', duration: 5000 });
        await refreshCredits();
        return data.imageUrl;
      } else {
        throw new Error("No image URL returned from server");
      }
    } catch (err) {
      console.error("Error generating avatar:", err);
      let errorMessage = "Avatar generation failed. Please try again.";
      if (err.message.includes("log in")) errorMessage = "Your session expired. Please log in again to continue.";
      toast.error(errorMessage, { id: processingToast, icon: '❌', duration: 5000 });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `avatar-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Avatar downloaded!', { icon: '📥', duration: 2000 });
    } catch (error) {
      console.error('Error downloading:', error);
      toast.error('Failed to download avatar', { icon: '❌', duration: 3000 });
    }
  };

  const handleGenerateOrRedirect = (photo, userGender, selectedStyle, isLoggedIn, credits, avatarCost, isMobile) => {
    if (!photo) {
      toast.error('Please upload an image first', { icon: '📤', duration: 3000 });
      return;
    }
    if (!userGender || !selectedStyle) {
      toast.error('Please select your gender and avatar style', { icon: '⚙️', duration: 3000 });
      return;
    }
    if (!isLoggedIn) {
      router.push('/signup');
      return;
    }
    if (credits < avatarCost) {
      router.push('/pricing');
      return;
    }
    generateAvatar(photo, userGender, selectedStyle, isMobile);
  };

  return {
    isLoading,
    progress,
    progressStage,
    resultImageUrl,
    showingOriginal,
    setShowingOriginal,
    generateAvatar,
    handleDownload,
    handleGenerateOrRedirect
  };
};