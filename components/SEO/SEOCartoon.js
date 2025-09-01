import Head from "next/head";

export default function SEOCartoon() {
  return (
    <Head>
      <title>AI Cartoon Photo Generator | Throwback AI</title>
      <meta name="description" content="Transform your photos into stunning cartoon-style artwork with AI. Choose from multiple cartoon styles and creative options for unique results." />
      <meta name="keywords" content="AI cartoon, cartoon photo, cartoon generator, cartoon avatar, cartoonize photo, AI art, cartoon styles, creative photo transformation, throwback AI" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://throwbackai.app/replicate/cartoon" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Throwback AI" />
      <meta property="og:title" content="AI Cartoon Photo Generator | Throwback AI" />
      <meta property="og:description" content="Transform your photos into stunning cartoon-style artwork with AI. Multiple cartoon styles and creative options for unique results." />
      <meta property="og:url" content="https://throwbackai.app/replicate/cartoon" />
      <meta property="og:image" content="https://throwbackai.app/images/cartoon-og.jpg" />
      <meta property="og:image:alt" content="AI-generated cartoon photo example by Throwback AI" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="AI Cartoon Photo Generator | Throwback AI" />
      <meta name="twitter:description" content="Transform your photos into stunning cartoon-style artwork with AI. Multiple cartoon styles and creative options for unique results." />
      <meta name="twitter:image" content="https://throwbackai.app/images/cartoon-og.jpg" />

      {/* Theme color */}
      <meta name="theme-color" content="#111827" />

      {/* Structured data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "AI Cartoon Photo Generator | Throwback AI",
            "url": "https://throwbackai.app/replicate/cartoon",
            "description": "Transform your photos into stunning cartoon-style artwork with AI. Choose from multiple cartoon styles and creative options for unique results.",
            "image": "https://throwbackai.app/images/cartoon-og.jpg",
            "publisher": {
              "@type": "Organization",
              "name": "Throwback AI",
              "url": "https://throwbackai.app/"
            },
            "about": {
              "@type": "Service",
              "name": "AI Cartoon Photo Generator",
              "description": "AI-powered tool to create cartoon-style portraits and avatars with multiple creative options."
            }
          }),
        }}
      />
    </Head>
  );
}