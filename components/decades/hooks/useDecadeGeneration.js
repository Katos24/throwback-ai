// components/decades/hooks/useDecadeGeneration.js
import { useState } from "react";
import imageCompression from "browser-image-compression";
import { supabase } from "../../../lib/supabaseClient";
import toast from 'react-hot-toast';

export function useDecadeGeneration(decade, buildPromptFunction) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStage, setProgressStage] = useState("");

  const generateAvatar = async (photo, userGender, selectedStyle, workflowType, styleStrength, refreshCredits) => {
    setIsLoading(true);
    setProgress(0);
    setProgressStage(`Getting ${getDecadeAdjective(decade)} with your image...`);

    const processingToast = toast.loading(`Creating your ${decade} yearbook photo...`, {
      icon: getDecadeIcon(decade),
    });

    try {
      // Get fresh session to avoid expired token
      const { data: { session: freshSession } } = await supabase.auth.getSession();
      if (!freshSession) {
        throw new Error("Please log in again to continue");
      }

      const headers = { "Content-Type": "application/json" };
      if (freshSession?.access_token) {
        headers.Authorization = `Bearer ${freshSession.access_token}`;
      }

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
      setProgressStage(`Sending to the ${decade} AI...`);

      // Use the provided prompt builder function
      const prompt = buildPromptFunction(userGender, selectedStyle, workflowType, styleStrength);

      const response = await fetch("/api/replicate/aiAvatars", {
        method: "POST",
        headers,
        body: JSON.stringify({
          imageBase64: base64,
          prompt: prompt,
          styleStrength: styleStrength,
          user_gender: userGender,
          workflow_type: workflowType
        }),
      });

      setProgress(80);
      setProgressStage(`Creating your ${decade} photo...`);

      if (!response.ok) {
        throw new Error(`Failed to generate ${decade} yearbook photo: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.imageUrl) {
        setProgress(100);
        setProgressStage(getSuccessMessage(decade));
        
        toast.success(`Your ${decade} yearbook photo is ready!`, {
          id: processingToast,
          icon: getDecadeIcon(decade),
          duration: 5000,
        });

        await refreshCredits();
        return data.imageUrl;
      } else {
        throw new Error("No image URL returned from server");
      }
    } catch (err) {
      console.error(`Error generating ${decade} yearbook photo:`, err);
      toast.error(err.message || `${decade} photo generation failed. Please try again.`, {
        id: processingToast,
        icon: '❌',
        duration: 5000,
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateAvatar,
    isLoading,
    progress,
    progressStage
  };
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

function getDecadeIcon(decade) {
  const icons = {
    "70s": "📺",
    "80s": "📻", 
    "90s": "📼",
    "2000s": "💻"
  };
  return icons[decade] || "📷";
}

function getSuccessMessage(decade) {
  const messages = {
    "70s": "Far out!",
    "80s": "Totally radical!",
    "90s": "Totally awesome!",
    "2000s": "Totally awesome!"
  };
  return messages[decade] || "Amazing!";
}