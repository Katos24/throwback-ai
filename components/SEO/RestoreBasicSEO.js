// components/SEO/RestoreBasicSEO.js
import Head from 'next/head';

export default function RestoreBasicSEO() {
  const siteUrl = 'https://throwbackai.app';
  const pageUrl = `${siteUrl}/replicate/restore-basic`;
  const ogImage = `${siteUrl}/images/throwback-ai.jpg`;
  const twitterImage = ogImage;
  const facebookPageUrl = 'https://www.facebook.com/profile.php?id=61578072554521';
  const facebookPageId = '61578072554521';

  return (
    <Head>
      <title>Restore Basic – AI Photo Restoration Tool | Throwback AI</title>
      <meta
        name="description"
        content="Restore old photos quickly and affordably with Throwback AI's Restore Basic. Remove scratches, enhance clarity, and bring your memories back to life using advanced AI technology."
      />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph */}
      <meta property="og:title" content="Restore Basic – AI Photo Restoration Tool | Throwback AI" />
      <meta
        property="og:description"
        content="Restore old photos quickly and affordably with Throwback AI's Restore Basic. Remove scratches, enhance clarity, and bring your memories back to life using advanced AI technology."
      />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content="Before and after AI photo restoration example" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Throwback AI" />

      {/* Facebook-specific */}
      <meta property="fb:pages" content={facebookPageId} />
      <meta property="article:publisher" content={facebookPageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Restore Basic – AI Photo Restoration Tool | Throwback AI" />
      <meta
        name="twitter:description"
        content="Restore old photos quickly and affordably with Throwback AI's Restore Basic. Remove scratches, enhance clarity, and bring your memories back to life using advanced AI technology."
      />
      <meta name="twitter:image" content={twitterImage} />

      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Throwback AI Restore Basic",
            "url": pageUrl,
            "applicationCategory": "Photo Editing",
            "operatingSystem": "Web",
            "description": "AI-powered Basic Restore tool for quick photo fixes — removes scratches, improves clarity, and enhances old photos.",
            "image": ogImage,
            "offers": {
              "@type": "Offer",
              "price": "1",
              "priceCurrency": "credits",
              "url": "https://throwbackai.app/pricing"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Throwback AI",
              "url": siteUrl,
              "sameAs": [facebookPageUrl]
            }
          }),
        }}
      />
    </Head>
  );
}