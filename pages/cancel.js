import Link from "next/link";

export default function Cancel() {
  return (
    <main
      style={{
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        maxWidth: 600,
        margin: "auto",
        textAlign: "center",
      }}
    >
      <h1>Subscription Canceled</h1>
      <p>Your subscription process was canceled. No payment was made.</p>
      <p>If you change your mind, you can always subscribe later.</p>
      <Link href="/pricing" legacyBehavior>
        <a
          style={{
            display: "inline-block",
            marginTop: "1.5rem",
            color: "#ff0080",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Back to Pricing
        </a>
      </Link>
    </main>
  );
}
