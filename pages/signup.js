import { useState } from "react";
import Link from "next/link";
import SignupForm from "../components/Auth/SignupForm";
import styles from "../styles/AuthPage.module.css";

export default function SignUp() {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <main className={styles.signupContainer}>
      <h1 className={styles.heading}>Sign Up</h1>

      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
      {successMsg && <p className={styles.success}>{successMsg}</p>}

      <SignupForm
        onSuccess={() => {
          setSuccessMsg("✅ Signup successful! Check your email to confirm your account.");
          setErrorMsg("");
        }}
        onError={(msg) => {
          setErrorMsg(msg);
          setSuccessMsg("");
        }}
      />

      <p className={styles.bottomLink}>
        Already have an account? <Link href="/signin">Sign in here</Link>
      </p>
    </main>
  );
}
