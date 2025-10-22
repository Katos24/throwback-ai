// components/seo/HomepageSEO.js
import Head from "next/head";

const HomepageSEO = ({ 
  customTitle = null,
  customDescription = null,
  customKeywords = null,
  ogImage = null,
  canonicalUrl = "https://throwbackai.app"
}) => {
  const defaultTitle = "Restore Old Photos & Add Color to Black and White Pictures | 70s 80s 90s 2000s Photo Styles | Throwback AI";
  const defaultDescription = "Restore family photos, wedding pictures, and vintage memories. Add color to old black and white photos. Create viral 70s, 80s, 90s yearbook photos, and 2000s Y2K style transformations. AI photo restoration in seconds.";
  const defaultKeywords = "restore old photos, add color to old photos, colorize black and white photos, family photo restoration, wedding photo restoration, 70s style photos, 80s style photos, 90s yearbook photos, 2000s Y2K photos, vintage photo repair, retro photo filter, decades photo transformation, fix old photos, photo colorization service, AI photo restoration";

  const title = customTitle || defaultTitle;
  const description = customDescription || defaultDescription;
  const keywords = customKeywords || defaultKeywords;
  const imageUrl = ogImage || "https://throwbackai.app/images/restore-preview.png";
  const facebookPageUrl = 'https://www.facebook.com/profile.php?id=61578072554521';
  const facebookPageId = '61578072554521';

  // Unified structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${canonicalUrl}#website`,
        "url": canonicalUrl,
        "name": "Throwback AI",
        "description": "Professional AI photo restoration service specializing in family photos, wedding pictures, vintage memories, and retro decade transformations.",
        "publisher": {
          "@type": "Organization",
          "name": "Throwback AI",
          "url": canonicalUrl,
          "sameAs": [facebookPageUrl]
        }
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        "url": canonicalUrl,
        "name": title,
        "isPartOf": { "@id": `${canonicalUrl}#website` },
        "description": description
      },
      {
        "@type": "Service",
        "name": "AI Photo Restoration",
        "description": "Professional photo restoration service for family photos, wedding pictures, vintage memories, and retro decade transformations with AI colorization.",
        "provider": {
          "@type": "Organization",
          "name": "Throwback AI"
        },
        "serviceType": "Photo Restoration Service",
        "hasOfferingCatalog": {
          "@type": "OfferingCatalog",
          "name": "Photo Restoration & Transformation Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": { 
                "@type": "Service", 
                "name": "Family Photo Restoration", 
                "description": "Repair damaged family photos, fix tears, scratches, and restore faded memories" 
              }
            },
            {
              "@type": "Offer",
              "itemOffered": { 
                "@type": "Service", 
                "name": "Wedding Photo Restoration", 
                "description": "Restore vintage wedding pictures and anniversary photos" 
              }
            },
            {
              "@type": "Offer",
              "itemOffered": { 
                "@type": "Service", 
                "name": "Black and White Photo Colorization", 
                "description": "Add historically accurate colors to old black and white photographs" 
              }
            },
            {
              "@type": "Offer",
              "itemOffered": { 
                "@type": "Service", 
                "name": "70s Style Photo Transformation", 
                "description": "Transform photos into groovy 70s hippie and disco style" 
              }
            },
            {
              "@type": "Offer",
              "itemOffered": { 
                "@type": "Service", 
                "name": "80s Yearbook Photo Generator", 
                "description": "Create authentic 80s yearbook photos with neon and new wave effects" 
              }
            },
            {
              "@type": "Offer",
              "itemOffered": { 
                "@type": "Service", 
                "name": "90s Yearbook Photo Generator", 
                "description": "Transform photos into 90s grunge and alternative yearbook style" 
              }
            },
            {
              "@type": "Offer",
              "itemOffered": { 
                "@type": "Service", 
                "name": "2000s Y2K Photo Transformation", 
                "description": "Create Y2K era photos with emo, scene, and digital aesthetics" 
              }
            },
            {
              "@type": "Offer",
              "itemOffered": { 
                "@type": "Service", 
                "name": "Vintage Photo Repair", 
                "description": "Fix water damage, tears, and age-related deterioration in old photographs" 
              }
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What makes Throwback AI better than apps like Remini or MyHeritage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We don't use generic models or push subscriptions. Throwback AI is tailored for historic, sentimental photos and built by people who care about family legacy."
            }
          },
          {
            "@type": "Question",
            "name": "Is it really free to try?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! You get 1 free Photo Fix restoration. If you sign up you will also get an additional 50 credits!"
            }
          },
          {
            "@type": "Question",
            "name": "What happens to my photo after it's restored?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It's securely deleted within one hour. We never save, sell, or reuse your uploads."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use restored photos commercially?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. Once restored, they're yours to print, gift, publish, or share."
            }
          }
        ]
      }
    ]
  };

  return (
    <Head>
      {/* Standard SEO + Open Graph tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
    </Head>
  );
};

export default HomepageSEO;
