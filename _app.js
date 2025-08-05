import ScrollToTop from "../components/ScrollToTop";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ScrollToTop />
    </>
  );
}
