import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect for Google Fonts - keep these */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        
        {/* Critical font preload - only load what's needed immediately */}
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
            .cinzel-text {
              visibility: hidden;
            }
            
            /* Show decorative text once fonts are loaded */
            .fonts-loaded .cinzel-text {
              visibility: visible;
              font-family: 'Cinzel', Georgia, serif;
            }
            
            /* Transition from system to custom fonts */
            .fonts-loaded body {
              font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            }
          `
        }} />
      </Head>
      <body>
        <Main />
        <NextScript />
        
        {/* Load non-critical fonts after page interactive */}
        <Script
          id="load-fonts"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Load additional font weights and Cinzel after page is interactive
              const loadFonts = () => {
                const link1 = document.createElement('link');
                link1.rel = 'stylesheet';
                link1.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;500&display=swap';
                document.head.appendChild(link1);
                
                const link2 = document.createElement('link');
                link2.rel = 'stylesheet'; 
                link2.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap';
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