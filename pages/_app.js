import { useEffect, useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "../lib/supabaseClient";
import Script from "next/script";

import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import { Toaster } from "react-hot-toast"; // ✅ Toast UI

export default function MyApp({ Component, pageProps }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      {/* Google Tag */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-JCY37JB8YP"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JCY37JB8YP');
        `}
      </Script>

      <Header showMenu={showMenu} setShowMenu={setShowMenu} />

      <main>
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
    </SessionContextProvider>
  );
}
