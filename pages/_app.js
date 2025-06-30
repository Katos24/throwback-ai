import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css"; // global CSS including modal styles
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";  // <-- import CookieBanner

export default function MyApp({ Component, pageProps }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <SessionProvider session={pageProps.session}>
      <Header showMenu={showMenu} setShowMenu={setShowMenu} />

      <main>
        <Component {...pageProps} />
      </main>

      <Footer />

      <CookieBanner />
    </SessionProvider>
  );
}
