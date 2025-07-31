import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import styles from "../styles/Signup.module.css"; // Adjust path as needed

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // Basic email format validation
    if (!/.+@.+\..+/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp(
      { email },
      { redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback` }
    );

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccess(true);
      setResendCooldown(60);
    }
    setLoading(false);
  };

  const handleResend = async () => {
    if (resendCooldown) return;
    setResendCooldown(60);
    setErrorMsg("");
    // Call signUp again to resend magic link
    const { error } = await supabase.auth.signUp(
      { email },
      { redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback` }
    );
    if (error) setErrorMsg("Unable to resend. Please try again later.");
  };

  const handleGoogleSignIn = async () => {
    setIsRedirecting(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
        queryParams: { prompt: "select_account" },
      },
    });
    if (error) {
      setErrorMsg(error.message);
      setIsRedirecting(false);
    }
  };

  return (
    <main className={styles.signupContainer}>
      <h1 className={styles.heading}>Create Your Free Account</h1>

      {success ? (
        <div role="status" className={styles.successPanel} tabIndex={-1}>
          <h2>✅ Check Your Inbox</h2>
          <p>We just emailed <strong>{email}</strong> a magic link. Click it to complete sign-up.</p>
          <button
            onClick={handleResend}
            disabled={resendCooldown > 0}
            className={styles.resendButton}
          >
            {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend Email"}
          </button>
          <p className={styles.bottomLink}>
            Or <Link href="/login">log in</Link> if you already have an account.
          </p>
        </div>
      ) : (
        <>
          {errorMsg && <p className={styles.error}>{errorMsg}</p>}

          {/* Google Sign-In */}
          <button
            className={styles.googleButton}
            onClick={handleGoogleSignIn}
            disabled={isRedirecting}
            aria-label="Sign in with Google"
          >
            Sign in with Google
          </button>

          <p className={styles.infoText}>
            Or sign up with your email below.
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
              className={styles.input}
            />

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Sending link…" : "Send Magic Link"}
            </button>
          </form>

          <p className={styles.bottomLink}>
            Already have an account? <Link href="/login">Login here</Link>
          </p>
        </>
      )}
    </main>
  );
}
