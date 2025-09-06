import Head from "next/head";

export default function SEOYearbook() {
  return (
    <Head>
      <title>90s Yearbook Photo AI | Throwback AI</title>
      <meta name="description" content="Transform your photos into authentic 90s yearbook portraits with AI. Choose from multiple styles and characters for the ultimate retro look." />
      <meta name="keywords" content="90s yearbook, AI yearbook, retro photo, yearbook photo generator, 90s photo style, AI photo transformation, throwback AI, yearbook characters, 90s portrait, school photo AI" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://throwbackai.app/replicate/yearbook" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Throwback AI" />
      <meta property="og:title" content="90s Yearbook Photo AI | Throwback AI" />
      <meta property="og:description" content="Transform your photos into authentic 90s yearbook portraits with AI. Multiple styles and characters for the ultimate retro look." />
      <meta property="og:url" content="https://throwbackai.app/replicate/yearbook" />
      <meta property="og:image" content="https://throwbackai.app/images/yearbook-card.jpg" />
      <meta property="og:image:alt" content="AI-generated 90s yearbook photo example by Throwback AI" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="90s Yearbook Photo AI | Throwback AI" />
      <meta name="twitter:description" content="Transform your photos into authentic 90s yearbook portraits with AI. Multiple styles and characters for the ultimate retro look." />
      <meta name="twitter:image" content="https://throwbackai.app/images/yearbook-card.jpg" />

      {/* Theme color */}
      <meta name="theme-color" content="#111827" />

      {/* Structured data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "90s Yearbook Photo AI | Throwback AI",
            "url": "https://throwbackai.app/replicate/yearbook",
            "description": "Transform your photos into authentic 90s yearbook portraits with AI. Choose from multiple styles and characters for the ultimate retro look.",
            "image": "https://throwbackai.app/images/yearbook-card.jpg",
            "publisher": {
              "@type": "Organization",
              "name": "Throwback AI",
              "url": "https://throwbackai.app/"
            },
            "about": {
              "@type": "Service",
              "name": "90s Yearbook AI Photo Generator",
              "description": "AI-powered tool to create 90s yearbook style portraits with multiple characters and retro options."
            }
          }),
        }}
      />
    </Head>
  );
}