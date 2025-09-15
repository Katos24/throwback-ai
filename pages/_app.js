import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "../lib/supabaseClient";
import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import { Toaster } from "react-hot-toast";

export default function MyApp({ Component, pageProps }) {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Mark app as loaded after hydration
    setIsLoaded(true);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    const handleRouteChange = () => {
      // Close mobile menu if open
      setShowMenu(false);
      // Scroll to top
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
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
      </div>
    </SessionContextProvider>
  );
}