import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Social Sharing Meta Tags */}
        <meta property="og:title" content="ThrowbackAI – Restore Your Memories" />
        <meta
          property="og:description"
          content="Bring your old photos back to life with AI-powered restoration."
        />
        <meta
          property="og:image"
          content="https://throwbackai.app/images/Throwback-AI.jpg"
        />
        <meta property="og:url" content="https://throwbackai.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ThrowbackAI" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ThrowbackAI – Restore Your Memories" />
        <meta
          name="twitter:description"
          content="Bring your old photos back to life with AI-powered restoration."
        />
        <meta
          name="twitter:image"
          content="https://throwbackai.app/images/throwback-ai.jpg"
        />
        <meta name="twitter:url" content="https://throwbackai.app" />
        <meta name="twitter:site" content="@ThrowbackAI" />

        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        
        {/* Critical font preload - only Inter for immediate render */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link
            rel="stylesheet" 
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          />
        </noscript>
        
        {/* Inline critical CSS for immediate text rendering */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* System font fallbacks for immediate render */
            body {
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              font-weight: 400;
              line-height: 1.6;
            }
            
            /* Critical text elements */
            h1, h2, h3, h4, h5, h6 {
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              font-weight: 600;
            }
            
            /* Hide decorative text until fonts load */
            .gfs-didot-text, .press-start-text {
              visibility: hidden;
            }
            
            /* Show decorative text once fonts are loaded */
            .fonts-loaded .gfs-didot-text {
              visibility: visible;
              font-family: 'GFS Didot', Georgia, serif;
            }
            
            .fonts-loaded .press-start-text {
              visibility: visible;
              font-family: 'Press Start 2P', monospace;
            }
            
            /* Transition from system to custom fonts */
            .fonts-loaded body {
              font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            }
          `
        }} />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
        
        {/* Load non-critical fonts after page interactive */}
        <Script
          id="load-fonts"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Load decorative fonts after page is interactive
              const loadFonts = () => {
                const link1 = document.createElement('link');
                link1.rel = 'stylesheet';
                link1.href = 'https://fonts.googleapis.com/css2?family=GFS+Didot&display=swap';
                document.head.appendChild(link1);
                
                const link2 = document.createElement('link');
                link2.rel = 'stylesheet'; 
                link2.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
                document.head.appendChild(link2);
                
                // Mark fonts as loaded for CSS transitions
                link2.onload = () => {
                  document.documentElement.classList.add('fonts-loaded');
                };
              };
              
              // Load fonts after a short delay or on user interaction
              if (document.readyState === 'complete') {
                setTimeout(loadFonts, 100);
              } else {
                window.addEventListener('load', () => setTimeout(loadFonts, 100));
              }
              
              // Also load on first user interaction for better perceived performance
              const interactions = ['click', 'keydown', 'mousemove', 'scroll', 'touchstart'];
              const loadOnInteraction = () => {
                loadFonts();
                interactions.forEach(event => 
                  document.removeEventListener(event, loadOnInteraction, { passive: true })
                );
              };
              interactions.forEach(event => 
                document.addEventListener(event, loadOnInteraction, { passive: true })
              );
            `
          }}
        />
        
        {/* Defer Google Analytics */}
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
              gtag('config', 'G-JCY37JB8YP');
            `,
          }}
        />
      </body>
    </Html>
  );
}