// hooks/useHalloweenGenerationHandler.js
import { useCallback } from "react";

export function useHalloweenGenerationHandler({
  photo,
  selectedTemplate,
  isLoggedIn,
  credits,
  avatarCost,
  router,
  generateFaceSwap,
  refreshCredits,
  scrollToPhotoOnMobile,
  setResultImageUrl,
  scrollSelectors
}) {
  // Dynamic button text
  const getButtonText = useCallback(() => {
    if (!photo) return "Upload a Photo First";
    if (!selectedTemplate) return "Select a Template";
    if (!isLoggedIn) return "Sign Up to Generate";
    if (credits < avatarCost) return "Get More Credits";
    return `🎃 Swap Face - ${avatarCost} Credits`;
  }, [photo, selectedTemplate, isLoggedIn, credits, avatarCost]);

  // Enhanced generation handler
 const handleGenerateOrRedirect = useCallback(
  async (templateId) => {
    const templateToUse = templateId || selectedTemplate;
    if (!photo) return;
    if (!templateToUse) return;

    if (!isLoggedIn) {
      router.push('/signup');
      return;
    }

    if (credits < avatarCost) {
      router.push('/pricing');
      return;
    }

    try {
      setTimeout(() => scrollToPhotoOnMobile(scrollSelectors), 100);

      const imageUrl = await generateFaceSwap(photo, templateToUse);

      setResultImageUrl(imageUrl);
      await refreshCredits();
    } catch (error) {
      console.error('Face swap failed:', error);
    }
  },
  [
    photo,
    selectedTemplate,
    isLoggedIn,
    credits,
    avatarCost,
    router,
    generateFaceSwap,
    refreshCredits,
    scrollToPhotoOnMobile,
    setResultImageUrl,
    scrollSelectors
  ]
);

  return {
    handleGenerateOrRedirect,
    getButtonText
  };
}