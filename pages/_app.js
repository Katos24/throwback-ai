import { useEffect, useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "../lib/supabaseClient";

import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import { Toaster } from "react-hot-toast"; // ✅ Import toast UI

export default function MyApp({ Component, pageProps }) {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // ✅ Give every new visitor 10 credits if they don't have any yet
    if (!localStorage.getItem("credits_remaining")) {
      localStorage.setItem("credits_remaining", "10");
    }
  }, []);

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
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
