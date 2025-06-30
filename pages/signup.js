import { useState } from "react";
import Link from "next/link";
import SignupForm from "../components/SignupForm";

export default function SignUp() {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSuccess = () => {
    setSuccessMsg("✅ Signup successful! Check your email to confirm your account.");
    setErrorMsg("");
  };

  const handleError = (msg) => {
    setErrorMsg(msg);
    setSuccessMsg("");
  };

  return (
    <main style={{ maxWidth: 400, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Sign Up</h1>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

      <SignupForm onSuccess={handleSuccess} onError={handleError} />

      <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        Already have an account? <Link href="/signin">Sign in here</Link>
      </p>
    </main>
  );
}
