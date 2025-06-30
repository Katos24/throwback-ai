import { useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "../lib/supabaseClient";


import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";

export default function MyApp({ Component, pageProps }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <Header showMenu={showMenu} setShowMenu={setShowMenu} />

      <main>
        <Component {...pageProps} />
      </main>

      <Footer />

      <CookieBanner />
    </SessionContextProvider>
  );
}
