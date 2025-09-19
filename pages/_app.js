import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "../lib/supabaseClient";
import { Inter } from 'next/font/google';
import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import ScrollToTop from "../components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

// Configure Inter font with Next.js optimization
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
});

export default function MyApp({ Component, pageProps }) {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      const originalPushState = window.history.pushState;
      const originalReplaceState = window.history.replaceState;
      window.history.pushState = function (...args) {
        originalPushState.apply(window.history, args);
        setTimeout(() => window.scrollTo(0, 0), 0);
      };
      window.history.replaceState = function (...args) {
        originalReplaceState.apply(window.history, args);
        setTimeout(() => window.scrollTo(0, 0), 0);
      };
    }
  }, []);

  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 0);
    };

    const handleRouteChangeComplete = () => {
      setShowMenu(false);
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

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <Head>
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
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=1459115708620119&ev=PageView&noscript=1" />
        </noscript>
        {/* End Meta Pixel Code */}
      </Head>
      <div className={`app-container ${inter.className} ${isLoaded ? "loaded" : "loading"}`}>
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