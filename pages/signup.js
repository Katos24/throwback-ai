import { useState } from "react";
import Link from "next/link";
import SignupForm from "../components/Auth/SignupForm";
import styles from "../styles/AuthPage.module.css";
import { supabase } from "../lib/supabaseClient"; // Adjust path as needed

export default function SignUp() {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin, // 👈 Redirect to home page after sign-in
      },
    });

    if (error) {
      setErrorMsg(error.message);
      setSuccessMsg("");
    }
  };

  return (
    <main className={styles.signupContainer}>
      <h1 className={styles.heading}>Sign Up</h1>

      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
      {successMsg && <p className={styles.success}>{successMsg}</p>}

      <SignupForm
        onSuccess={() => {
          setSuccessMsg(
            "✅ Signup successful! Check your email to confirm your account."
          );
          setErrorMsg("");
        }}
        onError={(msg) => {
          setErrorMsg(msg);
          setSuccessMsg("");
        }}
      />

      <button
        className={styles.googleButton}
        onClick={handleGoogleSignIn}
      >
        Sign in with Google
      </button>

      <p className={styles.bottomLink}>
        Already have an account? <Link href="/login">Login here</Link>
      </p>
    </main>
  );
}
