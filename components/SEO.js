// components/SEO.js
import Head from "next/head";

export default function SEO({ title, description, image, url }) {
  const defaultTitle = "Throwback AI | Restore Vintage Photos with AI";
  const defaultDescription =
    "Upload your vintage photos and bring them back to life using smart AI restoration.";
  const defaultImage = "https://throwbackai.app/images/social-default.jpg";
  const defaultUrl = "https://throwbackai.app";

  return (
    <Head>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />

      {/* Open Graph */}
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url || defaultUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />

      {/* Responsive */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}
