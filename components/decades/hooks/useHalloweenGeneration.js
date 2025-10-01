// hooks/useHalloweenGeneration.js

import { useState } from 'react';
import { supabase } from "../../../lib/supabaseClient";
import toast from 'react-hot-toast';

export function useHalloweenGeneration() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStage, setProgressStage] = useState('');

  const generateFaceSwap = async (photoFile, templateId) => {
    setIsLoading(true);
    setProgress(0);
    setProgressStage('Uploading your photo...');

    const processingToast = toast.loading('Swapping your face into the scene...', {
      icon: '👻',
    });

    try {
      // Get session token
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        throw new Error('Not authenticated');
      }

      // Convert file to base64
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result.split(',')[1];
          resolve(result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(photoFile);
      });

      // Simulate progress
      let progressValue = 0;
      const interval = setInterval(() => {
        progressValue += 10;
        if (progressValue > 85) {
          clearInterval(interval);
          setProgressStage('Finalizing your spooky transformation...');
        } else {
          setProgress(progressValue);
          if (progressValue < 40) {
            setProgressStage('Uploading to face swap...');
          } else if (progressValue < 70) {
            setProgressStage('Swapping faces...');
          }
        }
      }, 400);

      // Call API
      const response = await fetch('/api/replicate/generate-faceswap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          imageBase64: base64,
          templateId: templateId,
        }),
      });

      clearInterval(interval);
      setProgress(100);
      setProgressStage('Complete! 🎃');

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Face swap failed');
      }

      if (!data.imageUrl) {
        throw new Error('No image URL returned');
      }

      toast.success('Face swap complete! You look spooky!', {
        id: processingToast,
        icon: '🎃',
        duration: 5000,
      });

      return data.imageUrl;

    } catch (error) {
      console.error('Face swap error:', error);
      
      toast.error(error.message || 'Face swap failed. Please try again.', {
        id: processingToast,
        icon: '❌',
        duration: 5000,
      });

      throw error;

    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setProgress(0);
        setProgressStage('');
      }, 1000);
    }
  };

  return {
    generateFaceSwap,
    isLoading,
    progress,
    progressStage,
  };
}