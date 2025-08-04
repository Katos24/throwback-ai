import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Signup.module.css";
import { supabase } from "../lib/supabaseClient";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsRedirecting(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://throwbackai.app/auth/callback",
        queryParams: { prompt: "select_account" },
      },
    });

    if (error) {
      setErrorMsg(
        error.message ||
          "An error occurred during Google sign-in. Please try again."
      );
      setSuccessMsg("");
      setIsRedirecting(false);
    }
  };

  const handleMagicLinkSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "https://throwbackai.app/auth/callback",
      },
    });

    if (error) {
      setErrorMsg(error.message);
      setSuccessMsg("");
    } else {
      setSuccessMsg(
        "✅ Magic link sent! Check your email to complete signup/login."
      );
      setErrorMsg("");
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Sign Up | Anastasis</title>
        <meta
          name="description"
          content="Sign up for Anastasis to restore your family memories with AI-powered photo restoration."
        />
      </Head>

      <main className={styles.container}>
        <h1 className={styles.heading}>Sign Up</h1>

        {errorMsg && (
          <p className={styles.error} role="alert" aria-live="polite">
            {errorMsg}
          </p>
        )}
        {successMsg && (
          <p className={styles.success} role="status" aria-live="polite">
            {successMsg}
          </p>
        )}

        {/* Google Sign-In Button */}
        <button
          type="button"
          className={styles.googleButton}
          onClick={handleGoogleSignIn}
          disabled={isRedirecting}
          aria-label="Sign in with Google"
        >
          {isRedirecting ? (
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
                <path
                  fill="#4285F4"
                  d="M24 9.5c3.3 0 6.3 1.3 8.5 3.5l6.3-6.3C33.8 3.7 29.2 2 24 2 14.9 2 7.1 7.7 3.7 16.1l7.4 5.7C12.9 15 17.8 9.5 24 9.5z"
                />
                <path
                  fill="#34A853"
                  d="M46.5 24.3c0-1.5-.2-2.9-.5-4.3H24v8.2h12.7c-.5 2.7-2.1 4.9-4.5 6.4l7 5.4c4.2-3.9 6.7-9.6 6.7-15.7z"
                />
                <path
                  fill="#FBBC05"
                  d="M11.1 28.8c-.5-1.5-.5-3.1-.2-4.5l-7.3-5.6C1.4 22.7 0 27.2 0 32c0 4.9 1.9 9.3 5 12.7l7.3-5.7c-1.4-1.4-2.5-3.2-3.2-5.5z"
                />
                <path
                  fill="#EA4335"
                  d="M24 46c6 0 11-2 14.7-5.5l-7-5.4c-2 1.4-4.7 2.3-7.7 2.3-6.2 0-11.1-4.4-12.7-10.3l-7.3 5.7C7.1 42.2 14.8 46 24 46z"
                />
              </svg>
              Sign in with Google
            </>
          )}
        </button>

        {/* Magic Link Signup Form */}
        <form onSubmit={handleMagicLinkSignup} className={styles.form}>
          <label htmlFor="email" className={styles.label}>
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
            disabled={loading || isRedirecting}
          />
          <button
            type="submit"
            className={styles.buttonPrimary}
            disabled={loading || isRedirecting}
          >
            {loading ? "Sending..." : "Send Magic Link"}
          </button>
        </form>

        <p className={styles.infoText}>
          Want to sign up with Google instead? Just click the button above.
        </p>

        <p className={styles.bottomLink}>
          Already have an account? <Link href="/login">Login here</Link>
        </p>
      </main>
    </>
  );
}
