import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to external resources - critical performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* DNS prefetch for other resources */}
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="//widget.trustpilot.com" />

     
        {/* Social Sharing Meta Tags */}
        <meta property="og:title" content="ThrowbackAI – Restore Your Memories" />
        <meta property="og:description" content="Bring your old photos back to life with AI-powered restoration." />
        <meta property="og:image" content="https://throwbackai.app/images/Throwback-AI.jpg" />
        <meta property="og:url" content="https://throwbackai.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ThrowbackAI" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ThrowbackAI – Restore Your Memories" />
        <meta name="twitter:description" content="Bring your old photos back to life with AI-powered restoration." />
        <meta name="twitter:image" content="https://throwbackai.app/images/throwback-ai.jpg" />
        <meta name="twitter:url" content="https://throwbackai.app" />
        <meta name="twitter:site" content="@ThrowbackAI" />

        {/* TrustBox script - lazy load */}
        <script 
          type="text/javascript" 
          src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" 
          async
        />

        {/* Critical inline CSS - prevents flash */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Prevent any layout shift or flash */
            *, *::before, *::after { 
              box-sizing: border-box; 
              margin: 0; 
              padding: 0;
            }
            
            html { 
              height: 100%; 
              scroll-behavior: smooth;
            }
            
            /* Force scroll to top on page load */
            html, body {
              scroll-behavior: auto !important;
            }
            
            body {
              height: 100%;
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              font-weight: 400;
              line-height: 1.6;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              background-color: #0a0f20;
              color: #ffffff;
              overflow-x: hidden;
              overflow-y: auto;
            }
            
            #__next { 
              isolation: isolate; 
              min-height: 100vh; 
              display: flex; 
              flex-direction: column; 
            }
            
            .app-container { 
              min-height: 100vh; 
              display: flex; 
              flex-direction: column; 
            }
            
            img, picture, video, canvas, svg { 
              display: block; 
              max-width: 100%; 
            }
            
            input, button, textarea, select { 
              font: inherit; 
            }
            
            p, h1, h2, h3, h4, h5, h6 { 
              overflow-wrap: break-word; 
            }
            
            .main-content { 
              flex: 1; 
              display: flex; 
              flex-direction: column; 
              width: 100%; 
              min-height: auto; 
            }
            
            header { 
              position: relative; 
              z-index: 50; 
              flex-shrink: 0; 
            }
            
            footer { 
              flex-shrink: 0; 
              margin-top: auto; 
            }
            
            h1, h2, h3, h4, h5, h6 { 
              font-weight: 700; 
            }
            
            button, a, [role="button"] { 
              cursor: pointer; 
              touch-action: manipulation; 
            }
            
            a, button, input, select, textarea, [tabindex] { 
              -webkit-tap-highlight-color: rgba(0,0,0,0.1); 
            }

            /* Prevent flash of unstyled content */
            .slick-slider { 
              opacity: 1 !important; 
              visibility: visible !important; 
            }

            /* Loading state - prevent blank page */
            #__next:empty::before {
              content: '';
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: #0a0f20;
              z-index: 9999;
            }
          `
        }} />
      </Head>

      <body>
        <Main />
        <NextScript />

        {/* Load decorative fonts after page load - non-critical */}
        <Script
          id="load-decorative-fonts"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const loadDecoFonts = () => {
                  const fonts = [
                    'https://fonts.googleapis.com/css2?family=Righteous&family=Fredoka+One&display=swap',
                    'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap'
                  ];

                  fonts.forEach(href => {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = href;
                    document.head.appendChild(link);
                  });
                };

                if (document.readyState === 'complete') {
                  setTimeout(loadDecoFonts, 200);
                } else {
                  window.addEventListener('load', () => setTimeout(loadDecoFonts, 200));
                }
              })();
            `
          }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JCY37JB8YP"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JCY37JB8YP', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </body>
    </Html>
  );
}