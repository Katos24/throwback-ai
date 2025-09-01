import Head from "next/head";

export default function SEOAvatar() {
  return (
    <Head>
      <title>AI Avatar Generator | Throwback AI</title>
      <meta name="description" content="Transform your photos into amazing AI avatars with custom styles. Perfect for social media, business, and creative projects." />
      <meta name="keywords" content="AI avatar, avatar generator, AI portrait, professional avatar, social media avatar, business headshot, creative AI photo" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://throwbackai.app/replicate/avatar" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Throwback AI" />
      <meta property="og:title" content="AI Avatar Generator | Throwback AI" />
      <meta property="og:description" content="Transform your photos into amazing AI avatars with custom styles. Perfect for social media, business, and creative projects." />
      <meta property="og:url" content="https://throwbackai.app/replicate/avatar" />
      <meta property="og:image" content="https://throwbackai.app/images/avatar-og.jpg" />
      <meta property="og:image:alt" content="AI-generated avatar example by Throwback AI" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="AI Avatar Generator | Throwback AI" />
      <meta name="twitter:description" content="Transform your photos into amazing AI avatars with custom styles." />
      <meta name="twitter:image" content="https://throwbackai.app/images/avatar-og.jpg" />

      {/* Theme color */}
      <meta name="theme-color" content="#111827" />

      {/* Structured data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "AI Avatar Generator | Throwback AI",
            "url": "https://throwbackai.app/replicate/avatar",
            "description": "Transform your photos into amazing AI avatars with custom styles. Perfect for social media, business, and creative projects.",
            "image": "https://throwbackai.app/images/avatar-og.jpg",
            "publisher": {
              "@type": "Organization",
              "name": "Throwback AI",
              "url": "https://throwbackai.app/"
            }
          }),
        }}
      />
    </Head>
  );
}