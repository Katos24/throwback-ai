import { useCallback } from "react";

// Helper: File/Blob → base64
async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result.split(",")[1]; // strip prefix
      resolve(base64);
    };
    reader.onerror = reject;
  });
}

export function useHalloweenGenerationHandler({
  photo,
  selectedTemplate,
  isLoggedIn,
  credits,
  avatarCost,
  router,
  generateFaceSwap, // function calling your API
  refreshCredits,
  scrollToPhotoOnMobile,
  setResultImageUrl,
  scrollSelectors
}) {
  const getButtonText = useCallback(() => {
    if (!photo) return "Upload a Photo First";
    if (!selectedTemplate) return "Select a Template";
    if (!isLoggedIn) return "Sign Up to Generate";
    if (credits < avatarCost) return "Get More Credits";
    return `🎃 Swap Face - ${avatarCost} Credits`;
  }, [photo, selectedTemplate, isLoggedIn, credits, avatarCost]);

  const handleGenerateOrRedirect = useCallback(
    async (templateId) => {
      const templateToUse = templateId || selectedTemplate;
      if (!photo || !templateToUse) return;

      if (!isLoggedIn) {
        router.push("/signup");
        return;
      }

      if (credits < avatarCost) {
        router.push("/pricing");
        return;
      }

      try {
        setTimeout(() => scrollToPhotoOnMobile(scrollSelectors), 100);

        // Convert File/Blob → Base64
        let base64Photo;
        if (photo instanceof File || photo instanceof Blob) {
          base64Photo = await fileToBase64(photo);
        } else if (typeof photo === "string") {
          base64Photo = photo;
        } else {
          throw new Error("Unsupported photo format");
        }

        // ✅ Send the template key, NOT the full URL
       // Import templates
const HALLOWEEN_TEMPLATES = [
  { id: 'ghostface-phone' },
  { id: 'freddy-krueger' },
  { id: 'michael-myers' },
  { id: 'pennywise' },
  { id: 'video-store' },
  { id: 'the-ring' },
  { id: 'stranger-things-woman' },
  { id: 'stranger-things-man' }
];

        if (!validTemplates.includes(templateToUse)) {
          throw new Error("Invalid template selected");
        }

        // Call API with template key
        const imageUrl = await generateFaceSwap(base64Photo, templateToUse);

        setResultImageUrl(imageUrl);
        await refreshCredits();

      } catch (error) {
        console.error("Face swap failed:", error);
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
      scrollSelectors,
    ]
  );

  return {
    handleGenerateOrRedirect,
    getButtonText,
  };
}
