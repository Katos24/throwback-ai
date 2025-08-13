import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";
import { LoginForm } from "../components/Auth/LoginForm";
import styles from "../styles/Login.module.css";

export default function LoginPage() {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState("");
  const [isRedirecting, setIsRedirecting] = useState({ google: false, facebook: false });

  // Google login
  const handleGoogleSignIn = async () => {
    setIsRedirecting((prev) => ({ ...prev, google: true }));
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
        queryParams: { prompt: "select_account" },
      },
    });
    if (error) {
      setErrorMsg(error.message || "An error occurred during Google sign-in. Please try again.");
      setIsRedirecting((prev) => ({ ...prev, google: false }));
    }
  };

  // Facebook login
  const handleFacebookSignIn = async () => {
    setIsRedirecting((prev) => ({ ...prev, facebook: true }));
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      setErrorMsg(error.message || "An error occurred during Facebook sign-in. Please try again.");
      setIsRedirecting((prev) => ({ ...prev, facebook: false }));
    }
  };

  return (
    <>
      <Head>
        <title>Login | Anastasis</title>
        <meta
          name="description"
          content="Log in to Anastasis - restore your family memories with AI."
        />
      </Head>

      <main className={styles.container}>
        <h1 className={styles.heading}>Log In</h1>

        {errorMsg && (
          <p className={styles.error} role="alert" aria-live="polite">
            {errorMsg}
          </p>
        )}

        {/* Social Login Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1rem" }}>
          {/* Google Login */}
          <button
            type="button"
            className={styles.googleButton}
            onClick={handleGoogleSignIn}
            disabled={isRedirecting.google || isRedirecting.facebook}
            aria-label="Log in with Google"
          >
            {isRedirecting.google ? (
              <span className={styles.spinner} aria-label="Loading" />
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  fill="none"
                  aria-hidden="true"
                  className={styles.googleIcon}
                  width="20"
                  height="20"
                >
                  <path fill="#4285F4" d="M24 9.5c3.3 0 6.3 1.3 8.5 3.5l6.3-6.3C33.8 3.7 29.2 2 24 2 14.9 2 7.1 7.7 3.7 16.1l7.4 5.7C12.9 15 17.8 9.5 24 9.5z" />
                  <path fill="#34A853" d="M46.5 24.3c0-1.5-.2-2.9-.5-4.3H24v8.2h12.7c-.5 2.7-2.1 4.9-4.5 6.4l7 5.4c4.2-3.9 6.7-9.6 6.7-15.7z" />
                  <path fill="#FBBC05" d="M11.1 28.8c-.5-1.5-.5-3.1-.2-4.5l-7.3-5.6C1.4 22.7 0 27.2 0 32c0 4.9 1.9 9.3 5 12.7l7.3-5.7c-1.4-1.4-2.5-3.2-3.2-5.5z" />
                  <path fill="#EA4335" d="M24 46c6 0 11-2 14.7-5.5l-7-5.4c-2 1.4-4.7 2.3-7.7 2.3-6.2 0-11.1-4.4-12.7-10.3l-7.3 5.7C7.1 42.2 14.8 46 24 46z" />
                </svg>
                Log in with Google
              </>
            )}
          </button>

          {/* Facebook Login */}
          <button
            type="button"
            className={styles.facebookButton}
            onClick={handleFacebookSignIn}
            disabled={isRedirecting.facebook || isRedirecting.google}
            aria-label="Log in with Facebook"
          >
            {isRedirecting.facebook ? (
              <span className={styles.spinner} aria-label="Loading" />
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  fill="none"
                  aria-hidden="true"
                  className={styles.facebookIcon}
                  width="20"
                  height="20"
                >
                  <path fill="#1877F2" d="M24 2C12.3 2 3 11.3 3 23c0 10.4 7.6 19 17.5 20.7V30h-5.3v-7h5.3v-5.3c0-5.2 3.1-8.1 7.9-8.1 2.3 0 4.7.4 4.7.4v5.2h-2.6c-2.6 0-3.4 1.6-3.4 3.2V23h6l-1 7h-5v13.7C37.4 42 45 33.4 45 23 45 11.3 35.7 2 24 2z" />
                </svg>
                Log in with Facebook
              </>
            )}
          </button>
        </div>

        <p className={styles.infoText}>
          Or log in with your email below. We will send you a magic link to access your account.
        </p>

        {/* Magic Link Email Login */}
        <LoginForm
          isDisabled={isRedirecting.google || isRedirecting.facebook}
        />

        <p className={styles.bottomLink}>
          Don’t have an account? <Link href="/signup">Sign up here</Link>
        </p>
      </main>
    </>
  );
}
