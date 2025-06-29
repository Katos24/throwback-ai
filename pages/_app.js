// pages/_app.js
import { useState } from "react";
import "../styles/globals.css"; // global CSS including modal styles
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

export default function MyApp({ Component, pageProps }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);
  const openSignUp = () => setShowSignUp(true);
  const closeSignUp = () => setShowSignUp(false);

  return (
    <>
      <Header
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        onLoginClick={openLogin}
        onSignUpClick={openSignUp}
      />

      <Component
        {...pageProps}
        openLogin={openLogin}
        openSignUp={openSignUp}
      />

      <Footer />

      {showLogin && (
        <Modal onClose={closeLogin}>
          <LoginForm onClose={closeLogin} />
        </Modal>
      )}

      {showSignUp && (
        <Modal onClose={closeSignUp}>
          <SignupForm onClose={closeSignUp} />
        </Modal>
      )}
    </>
  );
}

function Modal({ children, onClose }) {
  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-content">
        <button onClick={onClose} className="modal-close" aria-label="Close modal">
          ×
        </button>
        {children}
      </div>
    </>
  );
}
