import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=GFS+Didot&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />

        {/* Open Graph Meta Tags (Facebook, LinkedIn, etc.) */}
        <meta property="og:title" content="ThrowbackAI – Restore Your Memories" />
        <meta
          property="og:description"
          content="Bring your old photos back to life with AI-powered restoration."
        />
        <meta
          property="og:image"
          content="https://throwbackai.app/images/greek-after.png"
        />
        <meta property="og:url" content="https://throwbackai.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ThrowbackAI" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ThrowbackAI – Restore Your Memories" />
        <meta
          name="twitter:description"
          content="Bring your old photos back to life with AI-powered restoration."
        />
        <meta
          name="twitter:image"
          content="https://throwbackai.app/images/greek-after.png"
        />
        <meta name="twitter:url" content="https://throwbackai.app" />
        <meta name="twitter:site" content="@ThrowbackAI" /> {/* Optional: your Twitter handle */}
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
