import { useState } from "react";
import "../styles/globals.css"; // global CSS including modal styles
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";

export default function MyApp({ Component, pageProps }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Header showMenu={showMenu} setShowMenu={setShowMenu} />

      <main>
        <Component {...pageProps} />
      </main>

      <Footer />

      <CookieBanner />
    </>
  );
}
