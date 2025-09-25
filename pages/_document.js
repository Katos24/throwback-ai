import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
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

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Inline critical CSS */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* CSS Reset and Critical Base Styles */
            *, *::before, *::after { box-sizing: border-box; }
            * { margin: 0; }
            html { height: 100%; scroll-behavior: smooth; }
            body {
              height: 100%;
              font-weight: 400;
              line-height: 1.6;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              background-color: #ffffff;
              color: #000000;
              overflow-x: hidden;
              overflow-y: auto;
            }
            #__next { isolation: isolate; min-height: 100vh; display: flex; flex-direction: column; }
            .app-container { min-height: 100vh; display: flex; flex-direction: column; }
            img, picture, video, canvas, svg { display: block; max-width: 100%; }
            input, button, textarea, select { font: inherit; }
            p, h1, h2, h3, h4, h5, h6 { overflow-wrap: break-word; }
            .main-content { flex: 1; display: flex; flex-direction: column; width: 100%; min-height: auto; }
            header { position: relative; z-index: 50; flex-shrink: 0; }
            footer { flex-shrink: 0; margin-top: auto; }
            h1, h2, h3, h4, h5, h6 { font-weight: 600; }
            .react-hot-toast-wrapper { position: fixed; z-index: 9999; pointer-events: none; }
            .react-hot-toast-wrapper > div { pointer-events: auto; }

            /* Decorative fonts placeholders - hidden until loaded */
            .gfs-didot-text, .press-start-text { visibility: hidden; }

            /* Once fonts are loaded */
            .fonts-loaded .gfs-didot-text { visibility: visible; font-family: 'Righteous', 'Fredoka One', cursive; }
            .fonts-loaded .press-start-text { visibility: visible; font-family: 'Courier New', Impact, 'Arial Black', sans-serif; }

            .loading { opacity: 0; transition: opacity 0.2s ease-in-out; }
            .loaded { opacity: 1; }

            button, a, [role="button"] { cursor: pointer; touch-action: manipulation; }
            a, button, input, select, textarea, [tabindex] { -webkit-tap-highlight-color: rgba(0,0,0,0.1); }
          `
        }} />
      </Head>

      <body className="antialiased">
        <Main />
        <NextScript />

        {/* Load decorative fonts after interactive - non-critical */}
        <Script
          id="load-fonts"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              const loadFonts = () => {
                const fonts = [
                // Core UI font
                'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',

                // 70s fonts
                'https://fonts.googleapis.com/css2?family=Righteous&family=Fredoka+One&display=swap',

                // 90s fonts
                'https://fonts.googleapis.com/css2?family=Courier+New:wght@400;700&family=Impact:wght@400&family=Arial+Black:wght@900&display=swap',

                // 2000s fonts
                'https://fonts.googleapis.com/css2?family=Tahoma:wght@400;700&family=Trebuchet+MS:wght@400;700&display=swap',

                // Decades section
                'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Righteous&display=swap'
              ];


                fonts.forEach(href => {
                  const link = document.createElement('link');
                  link.rel = 'stylesheet';
                  link.href = href;
                  document.head.appendChild(link);
                });

                document.documentElement.classList.add('fonts-loaded');
                document.body.classList.add('loaded');
              };

              if (document.readyState === 'complete') {
                setTimeout(loadFonts, 100);
              } else {
                window.addEventListener('load', () => setTimeout(loadFonts, 100));
              }

              ['click','keydown','mousemove','scroll','touchstart'].forEach(ev => {
                const handler = () => {
                  loadFonts();
                  ['click','keydown','mousemove','scroll','touchstart'].forEach(e => document.removeEventListener(e, handler));
                };
                document.addEventListener(ev, handler, { once: true });
              });
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
              gtag('config', 'G-JCY37JB8YP');
            `,
          }}
        />
      </body>
    </Html>
  );
}