import Head from "next/head";

export default function SEOAvatar() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // WebPage
      {
        "@type": "WebPage",
        "@id": "https://throwbackai.app/replicate/avatar#webpage",
        "url": "https://throwbackai.app/replicate/avatar",
        "name": "AI Avatar Generator - Create Professional Avatars Instantly | Throwback AI",
        "description": "Transform your photos into stunning AI avatars in seconds. 50+ styles including professional headshots, fantasy characters, and anime. Try free with 50 credits!",
        "inLanguage": "en-US",
        "isPartOf": {
          "@id": "https://throwbackai.app/#website"
        },
        "primaryImageOfPage": {
          "@id": "https://throwbackai.app/images/avatar-card.jpg#primaryimage"
        },
        "datePublished": "2024-01-01T00:00:00+00:00",
        "dateModified": new Date().toISOString(),
        "breadcrumb": {
          "@id": "https://throwbackai.app/replicate/avatar#breadcrumb"
        }
      },
      // WebSite
      {
        "@type": "WebSite",
        "@id": "https://throwbackai.app/#website",
        "url": "https://throwbackai.app/",
        "name": "Throwback AI",
        "description": "AI-powered photo transformation tools",
        "publisher": {
          "@id": "https://throwbackai.app/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://throwbackai.app/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      // Organization
      {
        "@type": "Organization",
        "@id": "https://throwbackai.app/#organization",
        "name": "Throwback AI",
        "url": "https://throwbackai.app/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://throwbackai.app/logo.png",
          "width": 512,
          "height": 512
        },
        "sameAs": [
          // Add your social media URLs here
          // "https://twitter.com/throwbackai",
          // "https://facebook.com/throwbackai"
        ]
      },
      // SoftwareApplication
      {
        "@type": "SoftwareApplication",
        "name": "AI Avatar Generator",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "4.99",
          "priceCurrency": "USD",
          "description": "400 credits for avatar generation"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "1247",
          "bestRating": "5",
          "worstRating": "1"
        },
        "featureList": [
          "50+ avatar styles",
          "Professional headshots",
          "Fantasy and anime characters",
          "High-quality AI generation",
          "Fast processing",
          "Free trial with 50 credits"
        ]
      },
      // BreadcrumbList
      {
        "@type": "BreadcrumbList",
        "@id": "https://throwbackai.app/replicate/avatar#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://throwbackai.app/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "AI Tools",
            "item": "https://throwbackai.app/replicate"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Avatar Generator",
            "item": "https://throwbackai.app/replicate/avatar"
          }
        ]
      },
      // HowTo
      {
        "@type": "HowTo",
        "name": "How to Create an AI Avatar",
        "description": "Step-by-step guide to generate professional AI avatars",
        "totalTime": "PT2M",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Select Gender",
            "text": "Choose your gender preference for better AI results"
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Choose Style",
            "text": "Pick from 50+ styles including professional, fantasy, anime, and more"
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Upload Photo",
            "text": "Upload a clear photo of yourself (PNG, JPG, or HEIC)"
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Generate Avatar",
            "text": "Click generate and wait 30-60 seconds for your AI avatar"
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Download",
            "text": "Download your high-quality AI-generated avatar"
          }
        ]
      },
      // FAQPage
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How much does the AI Avatar Generator cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Each avatar costs 50 credits. New users get 50 free credits. Credit packages start at $4.99 for 400 credits (8 avatars)."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take to generate an avatar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Avatar generation typically takes 30-60 seconds. You'll see real-time progress updates during generation."
            }
          },
          {
            "@type": "Question",
            "name": "What styles are available?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer 50+ styles including professional headshots, fantasy characters, anime, cyberpunk, historical eras, and more. Browse the style gallery to see all options."
            }
          },
          {
            "@type": "Question",
            "name": "What image formats are supported?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can upload PNG, JPG, or HEIC images up to 10MB. For best results, use a clear, well-lit photo."
            }
          }
        ]
      }
    ]
  };

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>AI Avatar Generator - Create Professional Avatars Instantly | Throwback AI</title>
      <meta 
        name="title" 
        content="AI Avatar Generator - Create Professional Avatars Instantly | Throwback AI" 
      />
      <meta 
        name="description" 
        content="Transform your photos into stunning AI avatars in seconds. 50+ styles including professional headshots, fantasy characters, and anime. Try free with 50 credits! Fast, high-quality results." 
      />
      <meta 
        name="keywords" 
        content="AI avatar generator, AI headshot, professional avatar, anime avatar, fantasy avatar, profile picture generator, AI photo editor, avatar maker, business headshot AI, social media avatar, gaming avatar, D&D character creator, cyberpunk avatar, AI portrait generator, custom avatar, digital avatar" 
      />
      
      {/* Robots & Indexing */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://throwbackai.app/replicate/avatar" />
      
      {/* Language & Region */}
      <meta name="language" content="English" />
      <meta httpEquiv="content-language" content="en-US" />
      <link rel="alternate" hrefLang="en" href="https://throwbackai.app/replicate/avatar" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Throwback AI" />
      <meta property="og:title" content="AI Avatar Generator - Create Professional Avatars Instantly | Throwback AI" />
      <meta property="og:description" content="Transform your photos into stunning AI avatars in seconds. 50+ styles available. Try free with 50 credits!" />
      <meta property="og:url" content="https://throwbackai.app/replicate/avatar" />
      <meta property="og:image" content="https://throwbackai.app/images/avatar-card.jpg" />
      <meta property="og:image:secure_url" content="https://throwbackai.app/images/avatar-card.jpg" />
      <meta property="og:image:alt" content="AI Avatar Generator - Professional avatar examples" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="AI Avatar Generator - Create Professional Avatars Instantly" />
      <meta name="twitter:description" content="Transform your photos into stunning AI avatars. 50+ styles. Try free!" />
      <meta name="twitter:image" content="https://throwbackai.app/images/avatar-card.jpg" />
      <meta name="twitter:image:alt" content="AI Avatar Generator examples" />
      {/* Add your Twitter handle */}
      {/* <meta name="twitter:site" content="@throwbackai" /> */}
      {/* <meta name="twitter:creator" content="@throwbackai" /> */}
      
      {/* Additional SEO */}
      <meta name="author" content="Throwback AI" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#0a0b1e" />
      <meta name="color-scheme" content="dark light" />
      
      {/* Mobile App Meta */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Throwback AI" />
      
      {/* Performance & Security */}
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <link rel="dns-prefetch" href="//throwbackai.app" />
      <link rel="preconnect" href="https://replicate.delivery" crossOrigin="anonymous" />
      
      {/* Favicon & Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      {/* Alternative formats */}
      <link 
        rel="alternate" 
        type="application/rss+xml" 
        title="Throwback AI Blog RSS" 
        href="https://throwbackai.app/rss.xml" 
      />
    </Head>
  );
}