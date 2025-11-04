import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "../lib/supabaseClient";
import { Inter } from 'next/font/google';
import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import ScrollToTop from "../components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

// Configure Inter font - critical font loaded in _document
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export default function MyApp({ Component, pageProps }) {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Disable scroll restoration - we handle it manually
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Handle route changes - aggressive scroll to top
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    const handleRouteChangeStart = (url) => {
      setIsLoading(true);
      setShowMenu(false);
      
      // Immediate scroll
      scrollToTop();
    };

    const handleRouteChangeComplete = () => {
      setIsLoading(false);
      
      // Multiple scroll attempts to ensure it works
      scrollToTop();
      
      setTimeout(() => scrollToTop(), 0);
      setTimeout(() => scrollToTop(), 10);
      setTimeout(() => scrollToTop(), 50);
      setTimeout(() => scrollToTop(), 100);
      
      // Use requestAnimationFrame for smooth guarantee
      requestAnimationFrame(() => scrollToTop());
    };

    const handleRouteChangeError = () => {
      setIsLoading(false);
      scrollToTop();
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        {/* Viewport meta - critical for mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Facebook domain verification */}
        <meta
          name="facebook-domain-verification"
          content="a8g2fjbwbuha4i98c0jotplpn54k01"
        />
        
        {/* Meta Pixel Code */}
        <script dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1459115708620119');
            fbq('track', 'PageView');
          `
        }} />
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{display:'none'}}
            src="https://www.facebook.com/tr?id=1459115708620119&ev=PageView&noscript=1" 
            alt=""
          />
        </noscript>
      </Head>

      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <div className={`app-container ${inter.className}`}>
          <Header showMenu={showMenu} setShowMenu={setShowMenu} />
          
          <main className="main-content">
            <Component {...pageProps} />
          </main>

          <Footer />
          <CookieBanner />
          <ScrollToTop />
          
          {/* Toast notifications */}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#1a1a2e",
                color: "#fff",
                border: "1px solid rgba(168, 85, 247, 0.3)",
                borderRadius: "12px",
                padding: "16px",
                fontSize: "14px",
                fontWeight: "600",
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </SessionContextProvider>
    </>
  );
}