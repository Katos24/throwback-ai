import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* ✅ Social Sharing Meta Tags FIRST to avoid Facebook inference issues */}
        <meta property="og:title" content="ThrowbackAI – Restore Your Memories" />
        <meta
          property="og:description"
          content="Bring your old photos back to life with AI-powered restoration."
        />
        <meta
          property="og:image"
          content="https://throwbackai.app/images/Throwback-AI.jpg"
        />
        <meta property="og:url" content="https://throwbackai.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ThrowbackAI" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ThrowbackAI – Restore Your Memories" />
        <meta
          name="twitter:description"
          content="Bring your old photos back to life with AI-powered restoration."
        />
        <meta
          name="twitter:image"
          content="https://throwbackai.app/images/throwback-ai.jpg"
        />
        <meta name="twitter:url" content="https://throwbackai.app" />
        <meta name="twitter:site" content="@ThrowbackAI" /> {/* Optional: your Twitter handle */}

        {/* 🎨 Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=GFS+Didot&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
