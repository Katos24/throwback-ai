import { useState } from "react";
import Link from "next/link";
import LoginForm from "../components/Auth/LoginForm";
import styles from "../styles/AuthPage.module.css";

export default function LoginPage() {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Log In</h1>

      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
      {successMsg && <p className={styles.success}>{successMsg}</p>}

      <LoginForm
        onSuccess={() => {
          setSuccessMsg("✅ Login successful!");
          setErrorMsg("");
        }}
        onError={(msg) => {
          setErrorMsg(msg);
          setSuccessMsg("");
        }}
      />

      <p className={styles.bottomLink}>
        Don’t have an account? <Link href="/signup">Sign up here</Link>
      </p>
    </main>
  );
}
