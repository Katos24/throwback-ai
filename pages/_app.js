import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "../lib/supabaseClient";
import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import ScrollToTop from "../components/ScrollToTop";
import { Toaster } from "react-hot-toast";

export default function MyApp({ Component, pageProps }) {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
    
    // Force disable scroll restoration globally
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      
      // Override any existing scroll behavior
      const originalPushState = window.history.pushState;
      const originalReplaceState = window.history.replaceState;
      
      window.history.pushState = function(...args) {
        originalPushState.apply(window.history, args);
        setTimeout(() => window.scrollTo(0, 0), 0);
      };
      
      window.history.replaceState = function(...args) {
        originalReplaceState.apply(window.history, args);
        setTimeout(() => window.scrollTo(0, 0), 0);
      };
    }
  }, []);

  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      // Multiple methods to ensure scroll to top
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Force it with setTimeout
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 0);
    };

    const handleRouteChangeComplete = () => {
      setShowMenu(false);
      
      // Multiple aggressive scroll attempts
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 0);
      
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 100);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <div className={`app-container ${isLoaded ? 'loaded' : 'loading'}`}>
        <Header showMenu={showMenu} setShowMenu={setShowMenu} />
        <main className="main-content">
          <Component {...pageProps} />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#1a1a1a",
                color: "#fff",
                border: "1px solid #333",
              },
            }}
          />
        </main>
        <Footer />
        <CookieBanner />
        <ScrollToTop />
      </div>
    </SessionContextProvider>
  );
}