import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic';
import { supabase } from "../../lib/supabaseClient";
import useCredits from "../../hooks/useCredits";
import { useAvatarGenerator } from "../../hooks/useAvatarGenerator";
import styles from "../../styles/AvatarPage.module.css";
import SEOAvatar from "../../components/SEO/SEOAvatar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// CRITICAL: Load immediately (above fold)
import ModernSlideshow from '../../components/avatar/ModernSlideshow';
import PhotoUploadZone from '../../components/avatar/PhotoUploadZone';

// LAZY LOAD: Below the fold components
const CategoryTabGallery = dynamic(() => import('../../components/avatar/CategoryTabGallery'), {
  loading: () => <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div className={styles.spinner}></div>
  </div>,
  ssr: false
});

const RestorationCounter = dynamic(() => import('../../components/RestorationCounter'), {
  loading: () => null,
  ssr: false
});

const ExampleCarousel = dynamic(() => import('../../components/avatar/ExampleCarousel'), {
  loading: () => <div style={{ height: '300px', background: 'rgba(255,255,255,0.02)', borderRadius: '20px' }}></div>,
  ssr: false
});

const Testimonials = dynamic(() => import('../../components/avatar/Testimonials'), {
  loading: () => null,
  ssr: false
});

const UseCases = dynamic(() => import('../../components/avatar/UseCases'), {
  loading: () => null,
  ssr: false
});

const FAQ = dynamic(() => import('../../components/avatar/FAQ'), {
  loading: () => null,
  ssr: false
});

const SEOContent = dynamic(() => import('../../components/avatar/SEOContent'), {
  loading: () => null,
  ssr: false
});

const FinalCTA = dynamic(() => import('../../components/avatar/FinalCTA'), {
  loading: () => null,
  ssr: false
});

const ImageLightbox = dynamic(() => import('../../components/avatar/ImageLightbox'), {
  loading: () => null,
  ssr: false
});

export default function AiAvatarsRedesigned() {
  const router = useRouter();
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [session, setSession] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);
  const [userGender, setUserGender] = useState("");
  const [styleCategory, setStyleCategory] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const avatarCost = 50;
  const { credits, isLoggedIn, refreshCredits } = useCredits();
  
  const {
    isLoading,
    progress,
    progressStage,
    resultImageUrl,
    showingOriginal,
    setShowingOriginal,
    handleDownload,
    handleGenerateOrRedirect
  } = useAvatarGenerator(refreshCredits);

  const exampleTransformations = [
    { id: 1, category: "Fantasy", style: "Dragon Rider", image: "/images/examples/avatar/dragon.png" },
    { id: 2, category: "Fantasy", style: "Magical Wizard", image: "/images/examples/avatar/wizard.png" },
    { id: 3, category: "Historical", style: "Western Era", image: "/images/examples/avatar/western.png" },
    { id: 4, category: "Sci-Fi", style: "Cyberpunk", image: "/images/examples/avatar/cyberpunk.png" },
    { id: 5, category: "Fantasy", style: "Medieval Warrior", image: "/images/examples/avatar/medieval.png" },
    { id: 6, category: "Historical", style: "Western Era", image: "/images/examples/avatar/western2.png" },
    { id: 7, category: "Medieval", style: "Medieval Fantasy", image: "/images/examples/avatar/medieval2.png" }
  ];

  const testimonials = [
    { id: 1, name: "Sarah M.", avatar: "👩‍💼", text: "The quality is incredible! Used it for my LinkedIn profile and got so many compliments.", rating: 5, style: "Portrait" },
    { id: 2, name: "Jake T.", avatar: "🧙‍♂️", text: "Perfect for my D&D character! Looked exactly like I imagined. Worth every credit.", rating: 5, style: "Fantasy" },
    { id: 3, name: "David R.", avatar: "🚀", text: "Fast generation and high quality. Been creating avatars for my whole team!", rating: 5, style: "Sci-Fi" }
  ];

  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    }
    getSession();

    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleImageClick = (index) => {
    if (isMobile) {
      setCurrentLightboxIndex(index);
      setLightboxOpen(true);
    }
  };

  const handlePhotoChange = (file, url) => {
    setPhoto(file);
    setPreviewUrl(url);
  };

  const isComplete = photo && userGender && selectedStyle;

  return (
    <>
      <SEOAvatar />
      <Head>
        <title>AI Avatar Generator - Transform Your Photos</title>
      </Head>

      <main className={styles.mainContainer}>
        {/* Credits Header - Inline (above fold) */}
        <div className={styles.creditsHeader}>
          <div className={styles.creditsInfo}>
            <span className={styles.creditsIcon}>🎭</span>
            <span className={styles.creditsText}>
              {credits} {credits === 1 ? 'credit' : 'credits'}{' '}
              {credits >= avatarCost ? `(${Math.floor(credits / avatarCost)} ${Math.floor(credits / avatarCost) === 1 ? 'avatar' : 'avatars'})` : ''}
            </span>
          </div>
          <button 
            onClick={() => router.push(isLoggedIn ? "/pricing" : "/signup")} 
            className={styles.creditsButton}
          >
            {isLoggedIn ? "Buy More" : "Sign Up Free"}
          </button>
        </div>

        <div className={styles.contentWrapper}>
          {/* CRITICAL: Modern Slideshow - Load immediately */}
          <ModernSlideshow examples={exampleTransformations} />

          {/* Free Credits Notice - Inline (small) */}
          {!isLoggedIn && (
            <div className={styles.freeCreditsText}>
              🎁 <strong>New users get 50 free credits when you sign up!</strong>{' '}
              <span 
                className={styles.freeCreditsLink}
                onClick={() => router.push('/signup')}
              >
                Sign up free
              </span>
            </div>
          )}

          {/* Cost Info - Inline (small) */}
          <div className={styles.costInfo}>
            💰 Each avatar costs <strong>50 credits</strong>
          </div>

          {/* LAZY: Category Selection - Loads when visible */}
          <CategoryTabGallery
            onStyleSelect={(category, styleValue) => {
              setStyleCategory(category);
              setSelectedStyle(styleValue);
            }}
            onGenderChange={setUserGender}
            selectedGender={userGender}
          />

          {/* LAZY: Counter - Not critical */}
          <RestorationCounter label="AI Transformations Created" />

          {/* CRITICAL: Photo Upload Zone - Load immediately (core functionality) */}
          <PhotoUploadZone
            photo={photo}
            previewUrl={previewUrl}
            resultImageUrl={resultImageUrl}
            isLoading={isLoading}
            progress={progress}
            progressStage={progressStage}
            showingOriginal={showingOriginal}
            selectedStyle={selectedStyle}
            styleCategory={styleCategory}
            onPhotoChange={handlePhotoChange}
            onToggleOriginal={() => setShowingOriginal(!showingOriginal)}
            onDownload={() => handleDownload(resultImageUrl)}
          />

          {/* Generate Button - Inline (critical) */}
          <div className={styles.generateSection}>
            <button
              onClick={() => handleGenerateOrRedirect(photo, userGender, selectedStyle, isLoggedIn, credits, avatarCost, isMobile)}
              disabled={isLoading}
              className={`${styles.generateButton} ${isComplete ? styles.ready : ''}`}
            >
              {isLoading ? (
                <>
                  <div className={styles.buttonSpinner}></div>
                  Creating Your Avatar...
                </>
              ) : (
                !isLoggedIn ? "Sign Up & Get 50 Free Credits" :
                credits < avatarCost ? "Get Credits ($4.99 for 400 credits)" :
                `Create Avatar (50 credits)`
              )}
            </button>

            {isLoading && (
              <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
                </div>
                <div className={styles.progressText}>
                  <span>{progressStage}</span>
                  <span>{progress}%</span>
                </div>
              </div>
            )}
          </div>

          {/* Pricing Info - Inline */}
          <div className={styles.pricingInfoSection}>
            <h2 className={styles.pricingTitle}>Simple, Transparent Pricing</h2>
            <div className={styles.pricingBadges}>
              <div className={styles.pricingBadge}>
                <span className={styles.badgeIcon}>💰</span>
                <div>
                  <div className={styles.badgeTitle}>50 credits per avatar</div>
                  <div className={styles.badgeDesc}>Clear, upfront pricing</div>
                </div>
              </div>
              <div className={styles.pricingBadge}>
                <span className={styles.badgeIcon}>🎁</span>
                <div>
                  <div className={styles.badgeTitle}>$4.99 = 8 avatars</div>
                  <div className={styles.badgeDesc}>Best value starter pack</div>
                </div>
              </div>
              <div className={styles.pricingBadge}>
                <span className={styles.badgeIcon}>⭐</span>
                <div>
                  <div className={styles.badgeTitle}>$9.99 = 20 avatars</div>
                  <div className={styles.badgeDesc}>Most popular pack</div>
                </div>
              </div>
            </div>
            {!isLoggedIn && (
              <div className={styles.freeTrialBanner}>
                <strong>🎉 New users get 50 free credits to try it out!</strong>
                <p className={styles.freeTrialSubtext}>That&apos;s one complete avatar transformation, absolutely free</p>
                <button 
                  onClick={() => router.push(isLoggedIn ? '/pricing' : '/signup')} 
                  className={styles.freeTrialButton}
                >
                  {isLoggedIn ? 'View Pricing' : 'Get Free Credits'}
                </button>
              </div>
            )}
          </div>

          {/* LAZY: More Examples - Remove carousel, loads when visible */}
          <div className={styles.moreExamplesSection}>
            <h2 className={styles.sectionTitle}>Explore More Styles</h2>
            <p className={styles.sectionSubtitle}>Browse through our collection of avatar transformations</p>
            <ExampleCarousel examples={exampleTransformations} onImageClick={handleImageClick} />
          </div>

          {/* LAZY: Testimonials - Loads when scrolled to */}
          <Testimonials testimonials={testimonials} />
        </div>

        {/* LAZY: Bottom SEO Sections - Load when visible */}
        <UseCases />
        <FAQ />
        <SEOContent />
        <FinalCTA isLoggedIn={isLoggedIn} />
      </main>

      {/* LAZY: Lightbox - Only when needed */}
      {lightboxOpen && (
        <ImageLightbox
          isOpen={lightboxOpen}
          images={exampleTransformations}
          currentIndex={currentLightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNext={(e) => { e.stopPropagation(); setCurrentLightboxIndex((prev) => (prev + 1) % exampleTransformations.length); }}
          onPrev={(e) => { e.stopPropagation(); setCurrentLightboxIndex((prev) => (prev - 1 + exampleTransformations.length) % exampleTransformations.length); }}
        />
      )}
    </>
  );
}