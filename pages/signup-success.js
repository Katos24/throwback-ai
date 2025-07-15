import Link from "next/link";

export default function SignupSuccess() {
  return (
    <main
      style={{
        maxWidth: 400,
        margin: "2rem auto",
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      <h1>✅ Sign-Up Successful!</h1>
      <p>Check your email to confirm your account.</p>
      <p>Once confirmed, you can sign in and start using premium features.</p>
      <Link
        href="/signin"
        style={{ color: "#0070f3", textDecoration: "underline", cursor: "pointer" }}
      >
        Go to Sign In
      </Link>
    </main>
  );
}
