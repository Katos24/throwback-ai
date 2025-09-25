// components/decades/hooks/useDecadeGenerationHandler.js
import { useCallback } from "react";

export function useDecadeGenerationHandler({
  photo,
  userGender,
  selectedStyle,
  isLoggedIn,
  credits,
  avatarCost,
  router,
  workflowType,
  styleStrength,
  generateAvatar,
  refreshCredits,
  scrollToPhotoOnMobile,
  setResultImageUrl,
  scrollSelectors
}) {
  
  // Dynamic button text
  const getButtonText = useCallback(() => {
    const decadeName = router.pathname.includes('80s') ? '80s' : 
                       router.pathname.includes('70s') ? '70s' : 
                       router.pathname.includes('90s') ? '90s' : 
                       router.pathname.includes('2000s') ? '2000s' : 'decade';
    
    if (!photo) return "Upload a Photo First";
    if (!userGender || !selectedStyle) return "Complete Setup First";
    if (!isLoggedIn) return "Sign Up to Generate";
    if (credits < avatarCost) return "Get More Credits";
    return `Generate My ${decadeName} Yearbook Photo!`;
  }, [photo, userGender, selectedStyle, isLoggedIn, credits, avatarCost, router.pathname]);

  // Enhanced generation handler
  const handleGenerateOrRedirect = useCallback(async () => {
    if (!photo) return;
    if (!userGender || !selectedStyle) return;
    
    if (!isLoggedIn) {
      router.push('/signup');
      return;
    }
    if (credits < avatarCost) {
      router.push('/pricing');
      return;
    }

    try {
      const apiGender = userGender === 'non-binary' ? 'non_binary' : userGender;
      
      setTimeout(() => scrollToPhotoOnMobile(scrollSelectors), 100);
      
      const imageUrl = await generateAvatar(
        photo, 
        apiGender, 
        selectedStyle, 
        workflowType, 
        styleStrength, 
        refreshCredits
      );
      
      setResultImageUrl(imageUrl);
      
    } catch (error) {
      console.error('Generation failed:', error);
    }
  }, [
    photo, 
    userGender, 
    selectedStyle, 
    isLoggedIn, 
    credits, 
    avatarCost, 
    router, 
    workflowType, 
    styleStrength, 
    generateAvatar, 
    refreshCredits, 
    scrollToPhotoOnMobile,
    setResultImageUrl,
    scrollSelectors
  ]);

  return {
    handleGenerateOrRedirect,
    getButtonText
  };
}