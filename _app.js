// pages/_app.js
import Head from "next/head";
import ScrollToTop from "../components/ScrollToTop";

export default function MyApp({ Component, pageProps }) {
  const defaultTitle = "Throwback AI – Advanced AI Photo Restoration";
  const defaultDescription =
    "Restore, enhance, and colorize your vintage photos with Throwback AI. Experience professional AI-powered photo restoration for black & white and color images.";
  const defaultUrl = "https://throwbackai.app";
  const defaultImage = "https://throwbackai.app/images/greek-after.png";

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{defaultTitle}</title>
        <meta name="description" content={defaultDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={defaultUrl} />
        <meta property="og:title" content={defaultTitle} />
        <meta property="og:description" content={defaultDescription} />
        <meta property="og:image" content={defaultImage} />
        <meta property="og:image:alt" content="Example of restored vintage photo by Throwback AI" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={defaultUrl} />
        <meta name="twitter:title" content={defaultTitle} />
        <meta name="twitter:description" content={defaultDescription} />
        <meta name="twitter:image" content={defaultImage} />

        {/* Canonical URL */}
        <link rel="canonical" href={defaultUrl} />
      </Head>

      <Component {...pageProps} />
      <ScrollToTop />
    </>
  );
}
