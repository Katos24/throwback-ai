import "../styles/globals.css";
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';


export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={original}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}