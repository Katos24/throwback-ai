import { useState } from "react";
import Link from "next/link";
import SignupForm from '../components/Auth/SignupForm';


export default function SignUp() {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <main style={{ maxWidth: 400, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1 style={{ marginBottom: "2rem" }}>Sign Up</h1>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
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
      <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        Already have an account? <Link href="/signin">Sign in here</Link>
      </p>
    </main>
  );
}
